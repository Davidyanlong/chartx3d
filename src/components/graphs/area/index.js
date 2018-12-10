import { Component, _ } from '../../Component';
import { Vector3, MeshBasicMaterial, MeshLambertMaterial, FrontSide, DoubleSide, MeshPhongMaterial, Color, CatmullRomCurve3 } from 'mmgl/src/index';

let renderOrder = 100;
let __lastPosition = null;

class Area extends Component {
    constructor(chart3d, opt) {
        super(chart3d.currCoord);

        this.type = "area";
        this._type = "area3d";

        // this.line = { //线
        //     enabled: 1,
        //     shapeType: "brokenLine",//折线
        //     strokeStyle: null,
        //     lineWidth: 2,
        //     lineType: "solid",
        //     smooth: true
        // };

        // this.icon = { //节点 
        //     enabled: 1, //是否有
        //     shapeType: "circle",
        //     corner: false, //模式[false || 0 = 都有节点 | true || 1 = 拐角才有节点]
        //     radius: 3, //半径 icon 圆点的半径
        //     fillStyle: '#ffffff',
        //     strokeStyle: null,
        //     lineWidth: 2
        // };

        this.area = { //填充
            //            shapeType : "path",
            enabled: 1,
            fillStyle: null,
            alpha: 0.3
        };


        _.extend(true, this, opt);
        this.init();

    }
    init() {
        this.textGroup = this._root.app.addGroup({
            name: 'text_groups'
        });
        this.textTempGroup = this._root.app.addGroup({
            name: 'text_temp_groups'
        });

        this.group.add(this.textGroup);
        this.group.add(this.textTempGroup);

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

    computePos() {
        let me = this;
        let fields = [], customField = [];
        if (!_.isArray(this.field)) {
            fields.push(this.field);
        } else {
            fields = this.field.slice(0);
        }
        let zSection = this._coordSystem.zAxisAttribute.getDataSection();
        let zNativeSection = this._coordSystem.zAxisAttribute.getNativeDataSection();
        this.drawPosData = [];

        let xDatas = this._coordSystem.xAxisAttribute.getDataSection();

        let yAxisInfo = this._coordSystem.getYAxis(this.yAxisName);
        let yAxisAttribute = yAxisInfo.attr;

        let yDatas = yAxisAttribute.dataOrg;
        //x轴返回的数据是单列
        if (xDatas.length == 1) {
            xDatas = _.flatten(xDatas);
        }
        //todo 三维数据这里会有问题,需要整理清楚


        let yValidData = [];

        yValidData = yAxisAttribute.getPartDataOrg(this.field);
        if (this._coordSystem.coord.zAxis.dataSection) {
            customField = customField.concat(this._coordSystem.coord.zAxis.dataSection);
        }


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

            //
            //this.pos = null;
        };

        //let ceil = this.getCeilSize();

        let generate = (zd, zInd) => {
            xDatas.forEach((xd, no) => {
                lastArray = [];
                if (_.isEmpty(me._coordSystem.zAxisAttribute.field)) {
                    yValidData.forEach((yda, index) => {
                        let _fd = fields[index];
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
                            _.flatten(yda).slice(0).forEach((yd, i) => {
                                if (i === no) {
                                    _tmp.value = new Vector3(xd, yd, zd);
                                    me.drawPosData.push(_tmp);
                                }

                            })
                        }
                    })
                } else {
                    let _tmp = new DataOrg();
                    let searchOpt = {};
                    let zdd = zd;
                    if (zNativeSection[zInd] == zd) {
                        zdd = zd;
                    } else {
                        zdd = zNativeSection[zInd];
                    }

                    searchOpt[me._coordSystem.zAxisAttribute.field] = zdd;
                    searchOpt[me._coordSystem.xAxisAttribute.field] = xd;
                    let yd = me._root.dataFrame && me._root.dataFrame.getRowDataOf(searchOpt);
                    if (yd.length > 0) {
                        _tmp.value = new Vector3(xd, yd[0][yAxisInfo.opts.field.toString()], zd);
                        me.drawPosData.push(_tmp);
                    }

                }

            })
        }


        let fieldName = fields.toString();
        if (_.isEmpty(me._coordSystem.zAxisAttribute.field)) {
            generate(fieldName);
        } else {
            zSection.forEach((zd, zInd) => {
                generate(zd, zInd);
            });
        }


    }
    draw() {
        let me = this;
        let app = this._root.app;
        let linePoints = {};
        this.computePos();
        let yAxisAttribute = this._coordSystem.getYAxis(this.yAxisName).attr;
        let ceil = this._coordSystem.getCeilSize();
        let getXAxisPosition = this._coordSystem.getXAxisPosition.bind(this._coordSystem);
        let getYAxisPosition = this._coordSystem.getYAxisPosition.bind(this._coordSystem);
        let getZAxisPosition = this._coordSystem.getZAxisPosition.bind(this._coordSystem);
        let boxWidth = ceil.x * 0.7;
        let boxDepth = ceil.z * 0.7;
        let boxHeight = 1;
        this.drawPosData.forEach(dataOrg => {
            let pos = new Vector3();
            let stack = new Vector3();
            pos.setX(getXAxisPosition(dataOrg.value.x));
            pos.setY(getYAxisPosition(dataOrg.value.y, yAxisAttribute));
            pos.setZ(getZAxisPosition(dataOrg.value.z));

            if (_.isEmpty(me._coordSystem.zAxisAttribute.field)) {
                linePoints[dataOrg.field] = linePoints[dataOrg.field] || [];
            } else {
                linePoints[dataOrg.value.z] = linePoints[dataOrg.value.z] || [];
            }

            if (dataOrg.isStack) {
                stack.setX(pos.x);
                stack.setY(getYAxisPosition(dataOrg.stackValue.y + dataOrg.value.y, yAxisAttribute));
                stack.setZ(-pos.z);

            } else {

                stack.setX(pos.x);
                stack.setY(pos.y);
                stack.setZ(-pos.z);

            }


            if (_.isEmpty(me._coordSystem.zAxisAttribute.field)) {
                linePoints[dataOrg.field].push({
                    pos: stack.clone(),
                    val: dataOrg.value.clone()
                });
            } else {
                linePoints[dataOrg.value.z].push({
                    pos: stack.clone(),
                    val: dataOrg.value.clone()
                });
            }

        })

        const DIVISONS = 200;
        for (let field in linePoints) {
            let _color = this._getColor(null, { field: field }) || "red";

            let points = null;
            // // //if (this.line.enabled) {
            // //     if (me.line.smooth) {
            let pos = linePoints[field].map(item => {
                return item.pos;
            });
            let curve = new CatmullRomCurve3(pos);
            points = curve.getSpacedPoints(DIVISONS);
            // //     } else {
            //points = linePoints[field];
            // // }

            // debugger;


            // let line = 

            // this.group.add(line);
            // //}

            let thickness = boxDepth;
            //绘制区域
            if (this.area.enabled) {
                //let pointArr = [];
                // points.forEach(point => {
                //     pointArr = pointArr.concat(point.toArray());
                // });
                points.unshift(points[0].clone().setY(0));
                points.push(points[(points.length - 1)].clone().setY(0));
                let polygon = app.createArea(points, thickness, { fillStyle: _color });

                polygon.name = "polygon_area_" + field;
                polygon.userData = {
                    infos: linePoints[field],
                    field

                    // values:dataOrg
                }
                let posZ = points[0].z;
                // if (points[0].z === 0) {
                //     posZ = points[0].z - thickness;
                // }else{
                posZ = posZ - thickness * 0.5;
                // }

                polygon.position.setZ(posZ);
                this.group.add(polygon);
            }



            //绘制node 点
            // if (this.icon.enabled) {
            //     linePoints[field].forEach(point => {

            //         //let node = app.createSphere(10,{fillStyle:_color});
            //         let node = app.createCirclePlane(10, { fillStyle: _color });
            //         node.position.copy(point);
            //         this.group.add(node);
            //     });
            // }

            //文字绘制
            // let fontStyle = { fontSize: 50, fillStyle: _color,strokeStyle:"#fff",lineWidth:1,isBold:true };
            // let offset = 50;
            // linePoints[field].forEach(node => {
            //     let val = yAxisAttribute.getValOfPos(node.y);

            //     let textObj = app.creatSpriteText(val, fontStyle);
            //     textObj[0].position.copy(node);
            //     textObj[0].position.setY(offset + textObj[0].position.y);
            //     this.textGroup.add(textObj[0]);
            // })


        }
        me.bindEvent();
    }
    bindEvent() {
        this.group.traverse(obj => {
            if (obj.name && obj.name.includes("polygon_area_")) {
                obj.on('mousemove', (e) => {
                    this.onMouseMove(e);
                });
                obj.on("mouseout", (e) => {
                    this.onMouseOut(e);
                })
            }
        })
    }
    onMouseMove(e) {
        let currObj = e.intersects[0];
        let target = e.target;
        if (currObj) {
            let pos = currObj.point.clone();
            let locPos = this._coordSystem.group.worldToLocal(pos);
            let positions = target.userData.infos.map(obj => {
                return obj.pos;
            });

            let currPoint = this._findPoint(positions, locPos);
            let currInfo = _.find(target.userData.infos, item => {
                return item.pos.equals(currPoint);
            })

            if (!__lastPosition || !currPoint.equals(__lastPosition)) {
                this._showLabel(currPoint, currInfo.val.y, target.userData.field);
                __lastPosition = currPoint;
            }

            // console.log(currPoint);
        }
    }
    onMouseOut(e) {
        this.dispose(this.textTempGroup);
    }
    _showLabel(position, val, field) {
        let app = this._root.app;
        let _color = this._getColor(null, { field: field }) || "red";
        let fontStyle = { fontSize: 50, fillStyle: _color, strokeStyle: "#ccc", lineWidth: 2, isBold: true };
        let offset = 50;

        //干掉上一个显示
        this.dispose(this.textTempGroup);

        //this.

        //let yAxisAttribute = this._coordSystem.getYAxis(this.yAxisName).attr;
        //let val = yAxisAttribute.getValOfPos(position.y);
        let textObj = app.creatSpriteText(val, fontStyle);
        textObj[0].position.copy(position);
        textObj[0].position.setY(offset + textObj[0].position.y);
        this.textTempGroup.add(textObj[0]);

    }
    _findPoint(points, point) {
        let minDistance = Infinity;
        let result = new Vector3();
        points.forEach(p => {
            let distance = point.distanceTo(p);
            if (minDistance > distance) {
                minDistance = distance;
                result.copy(p);
            }
        })
        return result;

    }
    resetData() {
        this.dispose();
        this.draw();
    }
}

export default Area;