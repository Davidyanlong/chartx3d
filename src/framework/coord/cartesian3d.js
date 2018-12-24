
import { InertialSystem } from './inertial';
import { Vector3, Box3, Matrix3, Matrix4, Math as _Math, AmbientLight, PointLight, DirectionalLight } from 'mmgl/src/index'
import { Cartesian3DUI } from '../../components/cartesian3dUI/index'
import { _, dataSection, } from 'mmvis/src/index';
import { AxisAttribute } from './model/axisAttribute';


/** note: 
 * 获取所有的配置信息,取去配置中影响布局的相关参数
 * coord{
 *    xAsix:{}
 *    yAxis:[] 
 *    zAxis:{} 
 * }
 * 
 * graphs{}
 * 
 * makeline其他组件
 * 
 * 通过Data和相关的配置,给出各个坐标轴的DataSection,计算出各个轴上数据点对应的位置
 * 
 * ***/
const DEFAULT_AXIS = 'default_axis_for_Y';

class Cartesian3D extends InertialSystem {
    constructor(root) {
        super(root);

        this.type = "Cartesian3D";
        this.offset = new Vector3(0, 0, 0);

        this._coordUI = null;

        this.group.name = 'cartesian3dSystem';


    }
    setDefaultOpts(opts) {
        var me = this;
        this._zSection = [];
        me.coord = {
            xAxis: {
                //波峰波谷布局模型，默认是柱状图的，折线图种需要做覆盖
                layoutType: "rule", //"peak",  
                //默认为false，x轴的计量是否需要取整， 这样 比如某些情况下得柱状图的柱子间隔才均匀。
                //比如一像素间隔的柱状图，如果需要精确的绘制出来每个柱子的间距是1px， 就必须要把这里设置为true
                posParseToInt: false
            },
            yAxis: [], //y轴至少有一个
            zAxis: {
                enabled: true,
                field: '',
                layoutType: "rule",
                //   depth: 50     //最大深度是1000
            }
        };

        opts = _.clone(opts);

        //规范Y轴的定义,采用数组形式,如果没有定义就初始化为空数组
        if (opts.coord.yAxis) {
            var _nyarr = [];
            _.each(_.flatten([opts.coord.yAxis]), function (yopt, index) {
                //标记定义的Y轴信息是否在绘图中使用
                yopt._used = false;
                //如果坐标轴没有置顶名称,第一个为默认坐标轴,其余的将被舍弃
                if (_.isEmpty(yopt.name)) {
                    if (index == 0) {
                        yopt.name = DEFAULT_AXIS;
                    } else {
                        return;
                    }
                }
                _nyarr.push(_.clone(yopt));


            });
            opts.coord.yAxis = _nyarr;
        } else {
            opts.coord.yAxis = [];
        }



        let getYaxisInfo = (name) => {
            let _opt = null;
            if (opts.coord.yAxis) {
                _.each(_.flatten([opts.coord.yAxis]), function (yopt) {
                    if (yopt.name == name) {
                        yopt._used = true;
                        _opt = yopt
                    }
                })
            }
            return _opt;
        }



        //根据opt中得Graphs配置，来设置 coord.yAxis
        if (opts.graphs) {
            //有graphs的就要用找到这个graphs.field来设置coord.yAxis
            for (var i = 0; i < opts.graphs.length; i++) {

                var graphs = opts.graphs[i];
                this._zSection.push(graphs.field.toString());
                if (graphs.type == "bar") {
                    //如果graphs里面有柱状图，那么就整个xAxis都强制使用 peak 的layoutType
                    me.coord.xAxis.layoutType = "peak";
                    me.coord.zAxis.layoutType = "peak";
                }
                if (graphs.field) {
                    //没有配置field的话就不绘制这个 graphs了
                    //根据graphs中的数据整理y轴的数据
                    let _axisName = graphs.yAxisName;
                    if (!graphs.yAxisName) {
                        //没有指定坐标轴的名称,取默认轴
                        _axisName = DEFAULT_AXIS
                    }
                    //增加Y轴
                    let _tAxis = getYaxisInfo(_axisName)
                    if (!_tAxis) {
                        let _yAxisNew = {
                            field: [],
                            name: _axisName,
                            _used: true
                        }
                        if (_.isArray(graphs.field)) {
                            _yAxisNew.field = _yAxisNew.field.concat(graphs.field);
                        } else {
                            _yAxisNew.field.push(graphs.field)
                        }
                        opts.coord.yAxis.push(_yAxisNew);
                    } else {

                        if (_.isEmpty(_tAxis.field)) {
                            _tAxis.field = [];
                        }
                        if (_.isArray(_tAxis.field)) {
                            if (_.isArray(graphs.field)) {
                                _tAxis.field = _tAxis.field.concat(graphs.field);
                            } else {
                                _tAxis.field.push(graphs.field);
                            }
                        } else {
                            if (_.isArray(graphs.field)) {
                                _tAxis.field = [_tAxis.field].concat(graphs.field);
                            } else {
                                _tAxis.field = [_tAxis.field].push(graphs.field);
                            }
                        }
                    }

                } else {
                    //在，直角坐标系中，每个graphs一定要有一个field设置，如果没有，就去掉这个graphs
                    opts.graphs.splice(i--, 1);
                }
            }


        };
        //初始化Y轴的相关参数
        for (var i = 0; i < opts.coord.yAxis.length; i++) {
            if (!opts.coord.yAxis[i].layoutType) {
                opts.coord.yAxis[i].layoutType = 'proportion'; //默认布局
            }
            //没有field的Y轴是无效的配置
            if (_.isEmpty(opts.coord.yAxis[i].field) || opts.coord.yAxis[i]._used == false) {
                opts.coord.yAxis.splice(i--, 1);
            }
            if (opts.coord.yAxis[i]) {
                delete opts.coord.yAxis[i]._used;
            }

        };
        return opts;
    }

    init() {

        //先计算一次空间范围供计算坐标轴宽高使用
        this.getBoundbox();
        let { x: widith, y: height, z: depth } = this.boundbox.getSize();

        let opt = _.clone(this.coord);
        this.xAxisAttribute = new AxisAttribute(opt.xAxis, this.getAxisDataFrame(opt.xAxis.field)); //new AxisAttribute(this._root);
        this.xAxisAttribute.setDataSection();
        this.xAxisAttribute.setAxisLength(widith);

        //默认Y轴
        this.yAxisAttribute = Object.create(null);
        let axisCount = 0;
        opt.yAxis.forEach((yopt) => {
            let _yAxisAttr = this.yAxisAttribute[yopt.name];
            if (!_yAxisAttr) {
                _yAxisAttr = new AxisAttribute(yopt, this.getAxisDataFrame(yopt.field)) //new AxisAttribute(this._root);
                this.yAxisAttribute[yopt.name] = _yAxisAttr;
                _yAxisAttr.setDataSection();
                _yAxisAttr.setAxisLength(height);
                axisCount++;
            } else {
                console.error('Y轴设置报错了')
            }
        });

        //如果是多Y轴的情况
        if (axisCount > 1) {
            AxisAttribute.resetDataSection(this.yAxisAttribute);
        }




        //Z轴如果设置了filed,按照数据轴的正常逻辑进行,否则Z轴按照Graphs配置中
        //的索引显示对应的名称 
        if (!this.isExistZAxisField()) {
            let _sectionZ = [];
            this._root.opt.graphs.forEach((yOps) => {
                _sectionZ.push(yOps.field.toString());
            })

            this.zAxisAttribute = new AxisAttribute(opt.zAxis, [[_sectionZ]]);
            // this.zAxisAttribute.setDataSection();
            //  this.zAxisAttribute.calculateProps();


        } else {
            this.zAxisAttribute = new AxisAttribute(opt.zAxis, this.getAxisDataFrame(opt.zAxis.field));
        }
        this.zAxisAttribute.setDataSection()
        this.zAxisAttribute.setAxisLength(depth);

        this.fieldsMap = this._setFieldsMap();

        this.addLights();
        this.bindEvent();
    }

    _setFieldsMap() {
        var me = this;
        var fieldInd = 0;
        let opt = _.clone(this.coord);
        let getTheme = this._root.getTheme.bind(this._root);
        let _set = (fields) => {

            let _zField = this.isExistZAxisField();


            if (!fields) {
                var yAxis = opt.yAxis;
                if (!_.isArray(yAxis)) {
                    yAxis = [yAxis];
                };
                fields = [];
                _.each(yAxis, function (item, i) {
                    if (item.field) {
                        fields = fields.concat(item.field);
                    };
                });
            };

            if (_.isString(fields)) {
                fields = [fields];
            };

            var clone_fields = _.clone(fields);
            for (var i = 0, l = fields.length; i < l; i++) {
                if (_zField) {
                    //三维数据
                    let zDataSection = this.zAxisAttribute.getDataSection();
                    let len = zDataSection.length;
                    zDataSection.forEach((zf, zInd) => {
                        if (_.isString(fields[i])) {
                            clone_fields[i * len + zInd] = {
                                field: fields[i],
                                enabled: true,
                                // yAxis: me._getYaxisOfField(fields[i]),
                                color: getTheme(fieldInd),
                                ind: fieldInd++,
                                zInd: zInd,
                                [_zField]: zf

                            }
                        } else {
                            clone_fields[i] = _set(fields[i], fieldInd);
                        }
                    });
                } else {
                    //二维数据
                    if (_.isString(fields[i])) {

                        clone_fields[i] = {
                            field: fields[i],
                            enabled: true,
                            // yAxis: me._getYaxisOfField(fields[i]),
                            color: getTheme(fieldInd),
                            ind: fieldInd++,
                            zInd: 0
                        }

                    }
                    if (_.isArray(fields[i])) {
                        clone_fields[i] = _set(fields[i], fieldInd);
                    }
                }

            };

            return clone_fields;
        };

        return _set();
    }



    isExistZAxisField() {
        if (this.coord.zAxis && !_.isEmpty(this.coord.zAxis.field)
            && this.coord.zAxis.layoutType !== "proportion") {
            return this.coord.zAxis.field
        }
        return false;
    }

    getYAxis(name = DEFAULT_AXIS) {
        let yAxisAttr = this.yAxisAttribute[name];
        //如果没有指定名称,通知默认名称不存在,取第一个配置的Name
        if (!yAxisAttr) {
            name = this.coord.yAxis[0].name;
            yAxisAttr = this.yAxisAttribute[name];
        }

        let yOpts = _.clone(yAxisAttr._opt);
        return {
            attr: yAxisAttr,
            opts: yOpts
        }
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

        //如果指定了Z轴的宽度就不采用默认计算的宽度
        if (this._root.opt.coord.zAxis && this._root.opt.coord.zAxis.depth) {
            this.boundbox.max.z = this._root.opt.coord.zAxis.depth;
        }

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

    }

    addLights() {
        //加入灯光

        var ambientlight = new AmbientLight(0xffffff, 0.5); // soft white light

        this._root.rootStage.add(ambientlight);

        let center = this.center.clone();
        center = this._getWorldPos(center);
        //center.setY(0);

        let dirLights = [];
        let intensity = 0.5;
        let lightColor = 0xFFFFFF;
        let position = new Vector3(-1, -1, 1);

        let pointLight = [];

        pointLight[0] = new PointLight(lightColor, intensity);
        position = new Vector3(-1, 1, 1);
        position.multiplyScalar(10000);
        pointLight[0].position.copy(position);
        this._root.rootStage.add(pointLight[0]);


        pointLight[1] = new PointLight(lightColor, intensity);
        position = new Vector3(1, 1, 1);
        position.multiplyScalar(10000);
        pointLight[1].position.copy(position);
        this._root.rootStage.add(pointLight[1]);


        pointLight[2] = new PointLight(lightColor, intensity);
        position = new Vector3(-1, 1, -1);
        position.multiplyScalar(10000);
        pointLight[2].position.copy(position);
        this._root.rootStage.add(pointLight[2]);


        pointLight[3] = new PointLight(lightColor, intensity);
        position = new Vector3(1, 1, -1);
        position.multiplyScalar(1000);
        pointLight[3].position.copy(position);
        this._root.rootStage.add(pointLight[3]);




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

    drawUI() {
        super.drawUI();
        this._coordUI.draw();

    }

    getXAxisPosition(data) {
        return this.xAxisAttribute.getPosOfVal(data);
    }
    getYAxisPosition(data, yAxisAttribute) {
        return yAxisAttribute.getPosOfVal(data);
    }
    getZAxisPosition(data) {
        return this.zAxisAttribute.getPosOfVal(data);
    }

    getCeilSize() {

        let ceil = new Vector3();
        let size = this.boundbox.getSize();
        let dataLenX = this.xAxisAttribute.getDataSection().length;
        let dataLenY = this.getYAxis().attr.getDataSection().length;
        let dataLenZ = this.zAxisAttribute.getDataSection().length;

        // dataLenX = dataLenX - 1 > 0 ? dataLenX : 3;
        // dataLenY = dataLenY - 1 > 0 ? dataLenY : 3;
        // dataLenZ = dataLenZ - 1 > 0 ? dataLenZ : 3;
        if (this.coord.xAxis.layoutType == 'peak') {
            ceil.setX(size.x / (dataLenX));
        } else {
            ceil.setX(size.x / (dataLenX + 1));
        }

        ceil.setY(size.y / (dataLenY + 1));
        if (this.coord.zAxis.layoutType == 'peak') {
            ceil.setZ(size.z / (dataLenZ));
        } else {
            ceil.setZ(size.z / (dataLenZ + 1));
        }


        return ceil;

    }
    bindEvent() {
        let interaction = this._root.interaction;
        if (interaction) {
            interaction.on('move', (e) => {
                let dx = e.event.offsetX;
                let dy = e.event.offsetY;
                let pos = this.screenToWorld(dx, dy);
                console.log(dx, dy, pos);
            })
        }
    }



    dispose() {

        this._coordUI.dispose();
    }
    resetData() {
        let opt = _.clone(this.coord);
        this.xAxisAttribute.resetDataOrg(this.getAxisDataFrame(opt.xAxis.field));
        this.xAxisAttribute.setDataSection();
        this.xAxisAttribute.calculateProps();

        opt.yAxis.forEach((yopt) => {
            let _yAxisAttr = this.yAxisAttribute[yopt.name];
            if (_yAxisAttr) {
                _yAxisAttr.resetDataOrg(this.getAxisDataFrame(yopt.field));
                _yAxisAttr.setDataSection();
                _yAxisAttr.calculateProps();
            }
        })


        if (_.isEmpty(opt.zAxis.field)) {
            let _sectionZ = [];
            this._root.opt.graphs.forEach((yOps) => {
                _sectionZ.push(yOps.field.toString());
            })

            this.zAxisAttribute.resetDataOrg([[_sectionZ]]);

        } else {
            this.zAxisAttribute.resetDataOrg(this.getAxisDataFrame(opt.zAxis.field));
        }

        this.zAxisAttribute.setDataSection();
        this.zAxisAttribute.calculateProps();

        //UI组件resetData
        this._coordUI.resetData();
    }
}







export { Cartesian3D, DEFAULT_AXIS };