
import { InertialSystem } from './inertial';
import { Vector3, Box3, Matrix3, Matrix4, Math as _Math, AmbientLight, PointLight, DirectionalLight } from 'mmgl/src/index'
import { Cartesian3DUI } from '../../components/cartesian3dUI/index'
import _ from '../../../lib/underscore';
import { AxisAttribute } from './model/axisAttribute';
import DataSection from '../../../utils/datasection';


/** note: 
 * 获取所有的配置信息,取去配置中影响布局的相关参数
 * coord{
 *    xAsix{}
 *    yAxis{} 
 *    zAxis{} 
 * }
 * 
 * graphs{}
 * 
 * makeline其他组件
 * 
 * 通过Data和相关的配置,给出各个坐标轴的DataSection,计算出各个轴上数据点对应的位置
 * 
 * ***/

class Cartesian3D extends InertialSystem {
    constructor(root) {
        super(root);

        //相对与世界坐标的原点位置

        this.origin = new Vector3(0, 0, 0);
        this.center = new Vector3(0, 0, 0);

        this.offset = new Vector3(0, 0, 0);

        this.boundbox = new Box3();

        this.xAxisAttribute = new AxisAttribute(root);
        this.yAxisAttribute = new AxisAttribute(root);
        this.yAxisAttributeRight = new AxisAttribute(root);
        this.zAxisAttribute = new AxisAttribute(root);

        this._coordUI = null;

        this.init();

    }
    setDefaultOpts(opts) {
        var me = this;
        me.coord = {
            xAxis: {
                //波峰波谷布局模型，默认是柱状图的，折线图种需要做覆盖
                layoutType: "rule", //"peak",  
                //默认为false，x轴的计量是否需要取整， 这样 比如某些情况下得柱状图的柱子间隔才均匀。
                //比如一像素间隔的柱状图，如果需要精确的绘制出来每个柱子的间距是1px， 就必须要把这里设置为true
                posParseToInt: false
            },
            zAxis: {
                enabled: true,
                field: '',
                layoutType: "peak",
                depth: 50     //最大深度是1000
            }
        };

        opts = _.clone(opts);
        if (opts.coord.yAxis) {
            var _nyarr = [];
            //TODO: 因为我们的deep extend 对于数组是整个对象引用过去，所以，这里需要
            //把每个子元素单独clone一遍，恩恩恩， 在canvax中优化extend对于array的处理
            _.each(_.flatten([opts.coord.yAxis]), function (yopt) {
                _nyarr.push(_.clone(yopt));
            });
            opts.coord.yAxis = _nyarr;
        } else {
            opts.coord.yAxis = [];
        }


        //根据opt中得Graphs配置，来设置 coord.yAxis
        if (opts.graphs) {
            //有graphs的就要用找到这个graphs.field来设置coord.yAxis
            for (var i = 0; i < opts.graphs.length; i++) {
                var graphs = opts.graphs[i];
                if (graphs.type == "bar") {
                    //如果graphs里面有柱状图，那么就整个xAxis都强制使用 peak 的layoutType
                    me.coord.xAxis.layoutType = "peak";
                }
                if (graphs.field) {
                    //没有配置field的话就不绘制这个 graphs了
                    var align = "left"; //默认left
                    if (graphs.yAxisAlign == "right") {
                        align = "right";
                    };

                    var optsYaxisObj = null;
                    optsYaxisObj = _.find(opts.coord.yAxis, function (obj, i) {
                        return obj.align == align || (!obj.align && i == (align == "left" ? 0 : 1));
                    });

                    if (!optsYaxisObj) {
                        optsYaxisObj = {
                            align: align,
                            field: []
                        }
                        opts.coord.yAxis.push(optsYaxisObj);
                    } else {
                        if (!optsYaxisObj.align) {
                            optsYaxisObj.align = align;

                        }
                    }

                    if (!optsYaxisObj.field) {
                        optsYaxisObj.field = [];
                    } else {
                        if (!_.isArray(optsYaxisObj.field)) {
                            optsYaxisObj.field = [optsYaxisObj.field];
                        }
                    }

                    if (_.isArray(graphs.field)) {
                        optsYaxisObj.field = optsYaxisObj.field.concat(graphs.field)
                    } else {
                        optsYaxisObj.field.push(graphs.field)
                    }

                } else {
                    //在，直角坐标系中，每个graphs一定要有一个field设置，如果没有，就去掉这个graphs
                    opts.graphs.splice(i--, 1);
                }
            }



        };
        //再梳理一遍yAxis，get没有align的手动配置上align
        //要手动把yAxis 按照 left , right的顺序做次排序
        var _lys = [], _rys = [];
        _.each(opts.coord.yAxis, function (yAxis, i) {
            if (!yAxis.align) {
                yAxis.align = i ? "right" : "left";
            }
            if (yAxis.align == "left") {
                _lys.push(yAxis);
                opts.coord._yAxisLeft = yAxis;
            } else {
                _rys.push(yAxis);
                opts.coord._yAxisRight = yAxis;
            }
            if (!yAxis.layoutType) {
                yAxis.layoutType = 'proportion'; //默认布局
            }

        });
        opts.coord.yAxis = _lys.concat(_rys);



        return opts;
    }

    getBoundbox() {
        //笛卡尔坐标的原点默认为左下方

        let baseBoundbox = super.getBoundbox();
        let offset = this.offset.clone();
        this.baseBoundbox = baseBoundbox;
        this.boundbox.min.set(0, 0, 0);
        this.boundbox.max.set(baseBoundbox.max.x - baseBoundbox.min.x - offset.x,
            baseBoundbox.max.y - baseBoundbox.min.y - offset.y,
            baseBoundbox.max.z - baseBoundbox.min.z - offset.z
        )
        this.center = this.boundbox.getCenter();
        this.center.setZ(-this.center.z);
        return this.boundbox;

    }
    //粗略计算在原点位置的世界线段的长度与屏幕像素的长度比
    getRatioPixelToWorldByOrigin(_origin) {
        let baseBoundbox = super.getBoundbox();
        if (_origin === undefined) {
            _origin = baseBoundbox.min.clone();
            _origin.setZ(baseBoundbox.max.z);
        }
        let ratio = this._root.renderView.getVisableSize(_origin).ratio;
        return ratio;
    }
    init() {

        this.group = this._root.renderView.addGroup({ name: 'cartesian3dSystem' });
        let opt = _.clone(this._root.opt)

        //这个判断不安全
        if (_.isSafeObject(opt, 'coord.xAxis.field')) {
            this.xAxisAttribute.setField(opt.coord.xAxis.field);
        }
        var arr = _.flatten(this.xAxisAttribute.data);

        if (this.coord.xAxis.layoutType == "proportion") {
            if (arr.length == 1) {
                arr.push(0);
                arr.push(arr[0] * 2);
            };
            arr = arr.sort(function (a, b) { return a - b });
            arr = DataSection.section(arr)
        };


        this.xAxisAttribute.setOrgSection(arr);
        if (_.isSafeObject(opt, 'coord.xAxis.dataSection')) {
            this.xAxisAttribute.setCustomSection(opt.coord.xAxis.dataSection);
        }


        //获取axisY
        let yLeftFields = [], yRightFields = [];
        if (_.isSafeObject(opt, 'coord.yAxis.field')) {
            if (_.isArray(opt.coord.yAxis.field)) {
                if (!opt.coord.yaxis.align || opt.coord.yaxis.align == 'left') {
                    yLeftFields = yLeftFields.concat(opt.coord.yAxis.field);
                } else {
                    yRightFields = yRightFields.concat(opt.coord.yAxis.field);
                }

            } else {
                if (!opt.coord.yaxis.align || opt.coord.yaxis.align == 'left') {
                    yLeftFields.push(opt.coord.yAxis.field);
                } else {
                    yRightFields.push(opt.coord.yAxis.field);
                }
            }

        }

        opt.graphs && opt.graphs.forEach(cp => {
            if (_.isArray(cp.field)) {
                if (!cp.yAxisAlign || cp.yAxisAlign == 'left') {
                    yLeftFields = yLeftFields.concat(cp.field);
                } else {
                    yRightFields = yRightFields.concat(cp.field);
                }
            } else {
                if (!cp.yAxisAlign || cp.yAxisAlign == 'left') {
                    yLeftFields.push(cp.field);
                } else {
                    yRightFields.push(cp.field);
                }
            }
        })

        yLeftFields = _.uniq(yLeftFields);
        yRightFields = _.uniq(yRightFields);

        this.yAxisAttribute.setField(yLeftFields);
        this.yAxisAttributeRight.setField(yRightFields);

        let dataOrgYLeft = this.yAxisAttribute.data;
        let dataOrgYRight = this.yAxisAttributeRight.data;

        let joinArrLeft = [], joinArrRight = [];
        if (_.isSafeObject(opt, "coord.yAxis.waterLine")) {
            if (!opt.coord.yaxis.align || opt.coord.yaxis.align == 'left') {
                joinArrLeft.push(opt.coord.yAxis.waterLine);
            } else {
                joinArrRight.push(opt.coord.yAxis.waterLine)
            }
        }

        if (_.isSafeObject(opt, "coord.yAxis.min")) {
            if (!opt.coord.yaxis.align || opt.coord.yaxis.align == 'left') {
                joinArrLeft.push(opt.coord.yAxis.min);
            } else {
                joinArrRight.push(opt.coord.yAxis.min)
            }
        };
        if (dataOrgYLeft.length == 1 && !_.isArray(dataOrgYLeft[0])) {

            joinArrLeft.push(dataOrgY[0] * 2);
        };
        if (dataOrgYRight.length == 1 && !_.isArray(dataOrgYRight[0])) {

            joinArrRight.push(dataOrgY[0] * 2);
        };

        //joinArr = joinArr.concat(_section);
        if (this.coord._yAxisLeft.layoutType == 'proportion') {
            this.yAxisAttribute.computeDataSection(joinArrLeft);
        } else {
            var arr = _.flatten(this.yAxisAttribute.data);
            this.yAxisAttribute.setOrgSection(arr);
        }

        if (this.coord._yAxisRight && this.coord._yAxisRight.layoutType == '"proportion"') {
            this.yAxisAttributeRight.computeDataSection(joinArrRight);
        } else {
            var arr = _.flatten(this.yAxisAttributeRight.data);
            this.yAxisAttributeRight.setOrgSection(arr);
        }


        if (_.isSafeObject(opt, 'coord.yAxis.dataSection')) {
            if (!opt.coord.yaxis.align || opt.coord.yaxis.align == 'left') {
                this.yAxisAttribute.setCustomSection(opt.coord.yAxis.dataSection);
            } else {
                this.yAxisAttributeRight.setCustomSection(opt.coord.yAxis.dataSection);
            }
        }

        //Z轴的计算
        if (_.isSafeObject(opt, 'coord.zAxis.field')) {
            this.zAxisAttribute.setField(opt.coord.zAxis.field);
            //this.zAxisAttribute.setData(opt.coord.zAxis.field)

            // if (!_.isSafeObject(opt, 'coord.zAxis.dataSection')) {
            //     var arr = _.flatten(this.zAxisAttribute.data);
            //     if (this.coord.zAxis.layoutType == "proportion") {
            //         if (arr.length == 1) {
            //             arr.push(0);
            //             arr.push(arr[0] * 2);
            //         };
            //         arr = arr.sort(function (a, b) { return a - b });
            //         arr = DataSection.section(arr)
            //     };

            //     this.zAxisAttribute.setDataSection(arr);
            // }
        }

        //todo:没有指定具体的field,用Y轴的分组来作为z轴的scetion
        let _section = [];

        let yAxisObj = this.coord._yAxisLeft;
        yAxisObj.field.forEach(item => {
            _section.push(item.toString());
        });

        this.zAxisAttribute.setOrgSection(_section);


        if (_.isSafeObject(opt, 'coord.zAxis.dataSection')) {

            this.zAxisAttribute.setCustomSection(opt.coord.zAxis.dataSection);
        }

        //y轴的颜色值先预设好
        this.yAxisAttribute.setColors();
        //todo y轴右轴忽略

        //先计算一次空间范围供计算坐标轴宽高使用
        this.getBoundbox();
        this.addLights();
    }


    //更新坐标原点
    updateOrigin(offset) {

        this.offset = offset.clone();

        this.boundbox = this.getBoundbox();

        this.setWorldOrigin();

        this.updatePosition();

    }

    updatePosition() {

        //更新相机姿态
        let center = this.center.clone();
        center = this._getWorldPos(center);
        let _renderView = this._root.renderView;
        let _camera = _renderView._camera;

        //相机默认的旋转角度
        let dist = _camera.position.distanceTo(center);
        let phi = _Math.degToRad(_renderView.controls.alpha);   //(90-lat)*(Math.PI/180),
        let theta = _Math.degToRad(_renderView.controls.beta);   // (lng+180)*(Math.PI/180),

        let y = dist * Math.sin(phi);
        let temp = dist * Math.cos(phi);
        let x = temp * Math.sin(theta);
        let z = temp * Math.cos(theta);
        //平移实现以中心点为圆心的旋转结果
        let newPos = new Vector3(x, y, z);
        newPos.add(center);
        _camera.position.copy(newPos);
        //相机朝向中心点 
        _camera.lookAt(center);


        //orbite target position
        this._root.orbitControls.target.copy(center);


        //测试中心点的位置
        // let helpLine = this._root.renderView.createLine([center.clone()], new Vector3(1, 0, 0), 123, 1, 'red');
        // let helpLine2 = this._root.renderView.createLine([center.clone()], new Vector3(-1, 0, 0), 500, 1, 'red');
        // this._root.renderView._scene.add(helpLine);
        // this._root.renderView._scene.add(helpLine2);

    }

    addLights() {
        //加入灯光

        var ambientlight = new AmbientLight(0xffffff, 0.8); // soft white light

        this._root.rootStage.add(ambientlight);

        let center = this.center.clone();
        center = this._getWorldPos(center);
        //center.setY(0);

        let dirLights = [];
        let intensity = 0.8;
        let lightColor = 0xcccccc;
        let position = new Vector3(-1, -1, 1);

        dirLights[0] = new DirectionalLight(lightColor, intensity);
        position.multiplyScalar(10000);
        dirLights[0].position.copy(position);
        dirLights[0].target.position.copy(center);
        this._root.rootStage.add(dirLights[0]);


        dirLights[1] = new DirectionalLight(lightColor, intensity);
        position = new Vector3(1, -1, 1);
        position.multiplyScalar(10000);
        dirLights[1].position.copy(position);
        dirLights[1].target.position.copy(center);
        this._root.rootStage.add(dirLights[1]);


        // dirLights[2] = new DirectionalLight(lightColor, intensity);
        // position = new Vector3(-1, -1, -1);
        // position.multiplyScalar(10000);
        // dirLights[2].position.copy(position);
        // dirLights[2].target.position.copy(center);
        // this._root.rootStage.add(dirLights[2]);


        // dirLights[3] = new DirectionalLight(lightColor, intensity);
        // position = new Vector3(1, -1, -1);
        // position.multiplyScalar(10000);
        // dirLights[3].position.copy(position);
        // dirLights[3].target.position.copy(center);
        // this._root.rootStage.add(dirLights[3]);




        let pointLight = [];

        // pointLight[0] = new PointLight(lightColor, intensity);
        // position = new Vector3(-1, -1, 1);
        // position.multiplyScalar(10000);
        // pointLight[0].position.copy(position);
        // this._root.rootStage.add(pointLight[0]);


        // pointLight[1] = new PointLight(lightColor, intensity);
        // position = new Vector3(1, -1, 1);
        // position.multiplyScalar(10000);
        // pointLight[1].position.copy(position);
        // this._root.rootStage.add(pointLight[1]);


        // pointLight[2] = new PointLight(lightColor, intensity);
        // position = new Vector3(-1, -1, -1);
        // position.multiplyScalar(10000);
        // pointLight[2].position.copy(position);
        // this._root.rootStage.add(pointLight[2]);


        // pointLight[3] = new PointLight('#fff', 1);
        // position = new Vector3(1, -1, -1);
        // position.multiplyScalar(1000);
        // pointLight[3].position.copy(position);
        // this._root.rootStage.add(pointLight[3]);




    }

    setWorldOrigin() {
        let baseBoundbox = super.getBoundbox();
        let offset = this.offset.clone();
        let pos = baseBoundbox.min.clone();
        pos.setZ(baseBoundbox.max.z);
        pos.add(offset);
        this.group.position.copy(pos);
    }
    getOrigin() {
        return this.origin.clone();
    }

    initCoordUI() {

        this._coordUI = new Cartesian3DUI(this);
        this.group.add(this._coordUI.group);

    }

    draw() {
        this._coordUI.draw();

        //测试
        // let ceil = this.getCeilSize();
        // let pos = new Vector3();
        // pos.setX(this.getXAxisPosition(2));
        // pos.setY(this.getYAxisPosition(100));
        // pos.setZ(this.getZAxisPosition('页面访问数'));
        // let boxWidth = ceil.x * 0.8;
        // let boxDepth = ceil.z * 0.8;
        // let boxHeight = Math.max(Math.abs(pos.y), 1);
        // let metaril = new MeshBasicMaterial({
        //     color: 'blue',
        //     transparent:true,
        //     opacity:1
        //     // polygonOffset:true,
        //     // polygonOffsetFactor:1,
        //     // polygonOffsetUnits:0.1
        // })
        // let box = this._root.renderView.createBox(boxWidth, boxHeight, boxDepth, metaril);
        // box.position.set(pos.x - boxWidth * 0.5, 0, -pos.z + boxDepth * 0.5);
        // box.renderOrder = 100;
        // this.group.add(box);

    }

    getXAxisPosition(data) {
        let _val = 0;
        let _range = this.boundbox.max.x - this.boundbox.min.x;
        let dataLen = this.xAxisAttribute.getSection().length;
        let ind = _.indexOf(this.xAxisAttribute.getSection(), data);//先不考虑不存在的值
        var layoutType = this.coord.xAxis.layoutType;
        if (dataLen == 1) {
            _val = _range / 2;

        } else {
            if (layoutType == "rule") {
                //折线图的xyaxis就是 rule
                _val = ind / (dataLen - 1) * _range;
            };
            if (layoutType == "proportion") {
                //按照数据真实的值在minVal - maxVal 区间中的比例值
                // if (val == undefined) {
                //     val = (ind * (this.maxVal - this.minVal) / (dataLen - 1)) + this.minVal;
                // };
                // x = _range * ((val - this.minVal) / (this.maxVal - this.minVal));
                _val = _range * (data / (maxVal - minVal));
            };
            if (layoutType == "peak") {
                //柱状图的就是peak
                var _ceilWidth = _range / dataLen;
                // if (this.posParseToInt) {
                //     _ceilWidth = parseInt(_ceilWidth);
                // };

                _val = _ceilWidth * (ind + 1) - _ceilWidth / 2;
            };
        };

        if (isNaN(_val)) {
            _val = 0;
        };

        return _val;


    }
    getYAxisPosition(data) {
        let _val = 0;
        let _range = this.boundbox.max.y - this.boundbox.min.y;
        let dataLen = this.yAxisAttribute.getSection().length;
        let ind = _.indexOf(this.yAxisAttribute.getSection(), data);//先不考虑不存在的值

        let _yAxisLeft = _.find(this.coord.yAxis, yaxis => {
            return !yaxis.align || yaxis.align == 'left';
        })
        let layoutType = _yAxisLeft.layoutType;

        let maxVal = Math.max.apply(null, this.yAxisAttribute.getSection());
        let minVal = Math.min.apply(null, this.yAxisAttribute.getSection());

        if (dataLen == 1) {
            _val = _range / 2;

        } else {
            if (layoutType == "rule") {
                //折线图的xyaxis就是 rule
                _val = ind / (dataLen - 1) * _range;
            };
            if (layoutType == "proportion") {
                //按照数据真实的值在minVal - maxVal 区间中的比例值
                // if (val == undefined) {
                //     val = (ind * (this.maxVal - this.minVal) / (dataLen - 1)) + this.minVal;
                // };
                _val = _range * (data / (maxVal - minVal));
            };
            if (layoutType == "peak") {
                //柱状图的就是peak
                var _ceilWidth = _range / dataLen;
                // if (this.posParseToInt) {
                //     _ceilWidth = parseInt(_ceilWidth);
                // };

                _val = _ceilWidth * (ind + 1) - _ceilWidth / 2;
            };
        };

        if (isNaN(_val)) {
            _val = 0;
        };

        return _val;

    }
    getZAxisPosition(data) {
        let _val = 0;
        let _range = this.boundbox.max.z - this.boundbox.min.z;
        let dataLen = this.zAxisAttribute.getSection().length;
        let ind = _.indexOf(this.zAxisAttribute.getSection(), data);//先不考虑不存在的值
        var layoutType = this.coord.zAxis.layoutType;

        if (dataLen == 1) {
            _val = _range / 2;

        } else {
            if (layoutType == "rule") {
                //折线图的xyaxis就是 rule
                _val = ind / (dataLen - 1) * _range;
            };
            if (layoutType == "proportion") {
                //按照数据真实的值在minVal - maxVal 区间中的比例值
                // if (val == undefined) {
                //     val = (ind * (this.maxVal - this.minVal) / (dataLen - 1)) + this.minVal;
                // };
                // x = _range * ((val - this.minVal) / (this.maxVal - this.minVal));
                _val = _range * (data / (maxVal - minVal));
            };
            if (layoutType == "peak") {
                //柱状图的就是peak
                var _ceilWidth = _range / dataLen;
                // if (this.posParseToInt) {
                //     _ceilWidth = parseInt(_ceilWidth);
                // };

                _val = _ceilWidth * (ind + 1) - _ceilWidth / 2;
            };
        };

        if (isNaN(_val)) {
            _val = 0;
        };

        return _val;
    }

    getCeilSize() {

        let ceil = new Vector3();
        let size = this.boundbox.getSize();
        let dataLenX = this.xAxisAttribute.getSection().length;
        let dataLenY = this.yAxisAttribute.getSection().length;
        let dataLenZ = this.zAxisAttribute.getSection().length;

        // dataLenX = dataLenX - 1 > 0 ? dataLenX : 3;
        // dataLenY = dataLenY - 1 > 0 ? dataLenY : 3;
        // dataLenZ = dataLenZ - 1 > 0 ? dataLenZ : 3;

        ceil.setX(size.x / (dataLenX + 1));
        ceil.setY(size.y / (dataLenY + 1));
        ceil.setZ(size.z / (dataLenZ + 1));

        return ceil;

    }

    dispose() {

        this._coordUI.dispose();
    }



}






export { Cartesian3D };