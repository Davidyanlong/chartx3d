
import { Component, _ } from '../../Component';
import { Vector3, MeshBasicMaterial, MeshLambertMaterial, FrontSide, DoubleSide, MeshPhongMaterial, Color, Box3 } from 'mmgl/src/index';

//let renderOrder = 100;

class Bar extends Component {
    constructor(chart3d, opt) {
        super(chart3d.currCoord);

        this.type = "bar";
        this._type = "bar3d";

        this.node = {
            shapeType: 'cube',  //'cube'立方体  'cylinder'圆柱体  ,'cone'圆锥体 
            materialType: 'phong', //'lambert' 'phong' 'base'  作色方式
            // width: 0,
            // _width: 0,
            // maxWidth: 50,
            // minWidth: 1,
            // minHeight: 0,

            // radius: 3,
            fillStyle: null,
            // fillAlpha: 0.95,
            // _count: 0, //总共有多少个bar
            // xDis: null,
            // filter: null
        };

        this.label = {
            enabled: false,
            animation: true,
            fontColor: null, //如果有设置text.fontColor那么优先使用fontColor
            fontSize: 12,
            format: null,
            lineWidth: 0,
            strokeStyle: null,

            rotation: 0,
            align: "center",  //left center right
            verticalAlign: "bottom", //top middle bottom
            position: "top", //top,topRight,right,rightBottom,bottom,bottomLeft,left,leftTop,center
            offsetX: 0,
            offsetY: 0
        };

        //this.sort = null; //TODO:这个设置有问题，暂时所有sort相关的逻辑都注释掉

        // this._barsLen = 0;

        //this.txtsSp = null;

        this.proportion = false;//比例柱状图，比例图首先肯定是个堆叠图

        this.allGroupNum = 1;
        _.extend(true, this, opt);
        this.materialMap = new Map();
        this.init();

    }
    init() {
        this.barsGroup = this._root.app.addGroup({ name: 'bars_gruop' });

    }
    computePos() {
        let me = this;
        let fields = [], customField = [];
        if (!_.isArray(this.field)) {
            fields.push(this.field);
        } else {
            fields = this.field.slice(0);
        }
        this.allGroupNum = fields.length;
        let zSection = this._coordSystem.zAxisAttribute.getDataSection();
        let zCustomSection = this._coordSystem.zAxisAttribute._opt.dataSection || [];
        this.drawPosData = [];
        let xDatas = this._coordSystem.xAxisAttribute.dataOrg;
        let yAxisInfo = this._coordSystem.getYAxis(this.yAxisName);
        let yAxisAttribute = yAxisInfo.attr;

        let yDatas = yAxisAttribute.dataOrg;
        //x轴返回的数据是单列
        if (xDatas.length == 1) {
            xDatas = _.flatten(xDatas);
        }

        let yValidData = [];

        yValidData = yAxisAttribute.getPartDataOrg(this.field);
        if (this._coordSystem.coord.zAxis.dataSection) {
            customField = customField.concat(this._coordSystem.coord.zAxis.dataSection);
        }

        // zSection.forEach((zs, index) => {
        //     fields.forEach(fd => {

        //         if (zs == fd.toString()) {
        //             yValidData.push(yDatas[index]);
        //             if (zCustomSection.length > 0) {
        //                 customField.push(zCustomSection[index]);
        //             }

        //         }
        //     })
        // })
        //yDatas = _.flatten(yDatas);
        //let dd = false;
        let lastArray = [];

        let DataOrg = function () {
            //this.org = [];
            this.isStack = false;
            //this.stack = [];
            //具体XYZ的值
            this.value = null;
            //堆叠值
            this.stackValue = null
            //堆叠楼层
            this.floor = 0;
            //绘制的字段顺序
            this.level = 0;
            this.field = '';
            this.group = null;

            //
            //this.pos = null;
        };

        //let ceil = this.getCeilSize();
        let getZAxiaName = (fieldName) => {
            let index = -1;
            let name = '';
            _.each(zSection, (section = "", num) => {
                let ind = section.indexOf(fieldName);
                if (ind !== -1) {
                    index = num;
                    name = zSection[num];
                }
            });
            return name;
        }

        xDatas.forEach((xd, no) => {
            lastArray = [];
            yValidData.forEach((yda, index) => {
                let _fd = fields[index];
                let fieldName = fields.toString();
                let zd = getZAxiaName(fieldName);

                if (yda.length > 1) {
                    yda.forEach((ydad, num) => {

                        let ydadd = _.flatten(ydad).slice(0);
                        let _fdd = _fd[num];
                        ydadd.forEach((yd, i) => {
                            if (i === no) {
                                let _tmp = new DataOrg();
                                _tmp.floor = num;
                                _tmp.level = index + num;
                                _tmp.field = _fdd;
                                _tmp.group = (index + 1);
                                if (num > 0) {
                                    _tmp.isStack = true;
                                    _tmp.value = new Vector3(xd, yd, zd);
                                    _tmp.stackValue = new Vector3(xd, lastArray[i], zd);

                                } else {
                                    _tmp.isStack = true;
                                    _tmp.stackValue = new Vector3(xd, 0, zd);
                                    _tmp.value = new Vector3(xd, yd, zd);

                                }
                                me.drawPosData.push(_tmp);
                            }

                        })
                        _.flatten(ydad).slice(0).forEach((t, y) => {
                            lastArray[y] = (lastArray[y] || 0) + t;
                        })
                        //lastArray = _.flatten(ydad).slice(0);
                    })

                } else {
                    let _tmp = new DataOrg();
                    _tmp.field = _fd;
                    _tmp.group = (index + 1);
                    _.flatten(yda).slice(0).forEach((yd, i) => {
                        if (i === no) {
                            _tmp.value = new Vector3(xd, yd, zd);
                            me.drawPosData.push(_tmp);
                        }

                    })
                }

            })

        })
    }
    getMaterial(dataOrg) {
        let MaterilBar = null;
        switch (this.node.materialType) {
            case 'phong':
                MaterilBar = MeshPhongMaterial;
                break;
            case 'lambert':
                MaterilBar = MeshLambertMaterial
                break;
            case 'base':
                MaterilBar = MeshBasicMaterial
                break;
            default:
                MaterilBar = MeshPhongMaterial;
        }

        let _color = this._getColor(this.node.fillStyle, dataOrg);
        let material = null;
        //todo 鼠标移动高亮,需要为每个柱子设置单独的材质,后续考虑有没有其他办法减少材质
        // if (!this.materialMap.has(_color)) {
        material = new MaterilBar({
            color: _color,
            transparent: true,
            opacity: 1,
            depthTest: true,
            depthWrite: true,
            side: DoubleSide,
            // polygonOffset: true,
            // polygonOffsetFactor: 1,
            // polygonOffsetUnits: 1.5
        })
        //   this.materialMap.set(_color, material);
        // } else {
        //     material = this.materialMap.get(_color);
        // }


        return material;

    }
    draw() {
        let me = this;
        let app = this._root.app;
        this.computePos();
        let yAxisAttribute = this._coordSystem.getYAxis(this.yAxisName).attr;
        let ceil = this._coordSystem.getCeilSize();
        let getXAxisPosition = this._coordSystem.getXAxisPosition.bind(this._coordSystem);
        let getYAxisPosition = this._coordSystem.getYAxisPosition.bind(this._coordSystem);
        let getZAxisPosition = this._coordSystem.getZAxisPosition.bind(this._coordSystem);

        let boxWidth = ceil.x / this.allGroupNum * 0.7; //细分后柱子在单元格内的宽度
        //boxWidth = Math.max(1,boxWidth);
        let boxDepth = ceil.z * 0.7;
        //todo 这里考虑如果优化  防止柱子太宽
        boxDepth = boxDepth > boxWidth ? boxWidth : boxDepth;
        let boxHeight = 1;

        let scale = 0.9; //每个单元格柱子占用的百分比

        this.drawPosData.forEach(dataOrg => {

            let pos = new Vector3();
            let stack = new Vector3();
            pos.setX(getXAxisPosition(dataOrg.value.x));
            pos.setY(getYAxisPosition(dataOrg.value.y, yAxisAttribute));
            pos.setZ(getZAxisPosition(dataOrg.value.z));

            let span = ceil.x / (this.allGroupNum * 2) * scale;
            let step = (dataOrg.group - 1) * 2 + 1;

            stack.setX(pos.x + (span * step - ceil.x * 0.5 * scale) - boxWidth * 0.5);
            if (this.node.shapeType == 'cylinder' || 'cone' == this.node.shapeType) {

                stack.setZ(-pos.z + boxWidth * 0.5);
            } else {
                stack.setZ(-pos.z + boxDepth * 0.5);
            }

            if (dataOrg.isStack) {
                stack.setY(getYAxisPosition(dataOrg.stackValue.y, yAxisAttribute));

            } else {
                stack.setY(0);

            }
            boxHeight = Math.max(Math.abs(pos.y), 0.01);
            //console.log('boxHeight', boxHeight, dataOrg.value.y);

            // MeshLambertMaterial
            //MeshPhongMaterial

            let material = me.getMaterial(dataOrg);
            let box = null;

            if (this.node.shapeType == 'cone') {
                box = app.createCone(boxWidth, boxHeight, boxDepth, material);
                let boundbox = new Box3().setFromObject(box);
                stack.x += boundbox.getCenter().x;
            } else if (this.node.shapeType == 'cylinder') {
                box = app.createCylinder(boxWidth, boxHeight, boxDepth, material);
                let boundbox = new Box3().setFromObject(box);
                stack.x += boundbox.getCenter().x;
            } else {
                box = app.createBox(boxWidth, boxHeight, boxDepth, material);

            }




            box.position.copy(stack);
            let { x, y, z } = dataOrg.value;
            let { x: px, y: py, z: pz } = stack;
            box.userData.info = {
                title: z,
                value: {
                    x,
                    y,
                    z
                },
                pos: {
                    x: px,
                    y: py,
                    z: pz
                },
                color: this._getColor(this.node.fillStyle, dataOrg)
            }
            //box.renderOrder = renderOrder++;
            this.group.add(box);


            box.on('mouseover', function (e) {
                me.onMouseOver.call(this);
                me._root.fire({
                    type: 'tipShow',
                    event: e.event,
                    data: this.userData.info
                })
            });
            box.on('mouseout', function (e) {
                me.onMouseOut.call(this);
                me._root.fire({
                    type: 'tipHide',
                    event: e.event,
                    data: this.userData.info
                })
            });

            box.on('mousemove', function (e) {
                me._root.fire({
                    type: 'tipMove',
                    event: e.event,
                    data: this.userData.info
                })
            });


            box.on('click', this.onClick);

        });

    }
    onMouseOver(e) {
        //上下文中的this 是bar 对象
        this.userData.color = this.material.color.clone();
        //高亮
        let tempColor = {};
        this.material.color.getHSL(tempColor);
        this.material.setValues({ color: new Color().setHSL(tempColor.h, tempColor.s, tempColor.l + 0.1) });
    }
    onMouseOut() {
        this.material.setValues({ color: this.userData.color });
    }
    onClick(e) {
        //this.fire(e)
    }

    _getColor(c, dataOrg) {

        var color = this._coordSystem.getColor(dataOrg.field);
        //field对应的索引，， 取颜色这里不要用i
        if (_.isString(c)) {
            color = c
        };
        if (_.isArray(c)) {
            color = _.flatten(c)[_.indexOf(_flattenField, field)];
        };
        if (_.isFunction(c)) {
            color = c.apply(this, [rectData]);
        };

        return color;
    }
    dispose() {

        this.materialMap.clear();
        this.group.traverse((obj) => {
            if (obj.has('click', this.onClick)) {
                obj.off('click', this.onClick);
            }
            if (obj.has('mouseover', this.onMouseOver)) {
                obj.off('mouseover', this.onMouseOver);
            }
            if (obj.has('mouseout', this.onMouseOut)) {
                obj.off('mouseout', this.onMouseOut);
            }
        })


        super.dispose();

    }
    resetData() {
        this.dispose();
        this.draw();
    }

}

export default Bar;

