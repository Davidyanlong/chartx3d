import { Component, _ } from '../../Component';
import { Vector3, MeshBasicMaterial, MeshLambertMaterial, FrontSide, DoubleSide, MeshPhongMaterial, Color, CatmullRomCurve3 } from 'mmgl/src/index';

let renderOrder = 100;

class Line extends Component {
    constructor(chart3d, opt) {
        super(chart3d.currCoord);
        this.type = "line";

        this.line = { //线
            enabled: 1,
            shapeType: "brokenLine",//折线
            strokeStyle: '#ccc',
            lineWidth: 2,
            lineType: "solid",
            smooth: true
        };

        this.icon = { //节点 
            enabled     : 1, //是否有
            shapeType   : "circle",
            corner      : false, //模式[false || 0 = 都有节点 | true || 1 = 拐角才有节点]
            radius      : 3, //半径 icon 圆点的半径
            fillStyle   : '#ffffff',
            strokeStyle : null,
            lineWidth   : 2
        };

        this.area = { //填充
//            shapeType : "path",
            enabled   :1,
            fillStyle : null,
            alpha     : 0.3
        };


        _.extend(true, this, opt);
        this.init();

    }
    init() {

    }
    _getColor(c, dataOrg) {

        let yAxisAttribute = this._coordSystem.getYAxis(this.yAxisName).attr;
        var color = yAxisAttribute.getColor(dataOrg.field);

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
        let zSection = this._coordSystem.zAxisAttribute.getOrgSection();
        let zCustomSection = this._coordSystem.zAxisAttribute.getCustomSection();
        this.drawPosData = [];
        let xDatas = this._coordSystem.xAxisAttribute.data;
        let yAxisInfo = this._coordSystem.getYAxis(this.yAxisName);
        let yAxisAttribute = yAxisInfo.attr;

        let yDatas = yAxisAttribute.data;
        //x轴返回的数据是单列
        if (xDatas.length == 1) {
            xDatas = _.flatten(xDatas);
        }
        //todo 三维数据这里会有问题,需要整理清楚


        let yValidData = [];

        yValidData = yAxisAttribute.getData(this.field);
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
            return zCustomSection.length ? zCustomSection[index] : name;
        }

        let generate = (zd) => {
            xDatas.forEach((xd, no) => {
                lastArray = [];
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
            })
        }


        let fieldName = fields.toString();
        if (_.isEmpty(me._coordSystem.zAxisAttribute.field)) {
            let zd = getZAxiaName(fieldName);
            generate(zd);
        } else {

            zSection.forEach(zd => {
                generate(zd);
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
                linePoints[dataOrg.field].push(stack);
            } else {
                linePoints[dataOrg.value.z].push(stack);
            }

        })

        const DIVISONS = 200;
        for (let field in linePoints) {
            let _color = this._getColor(null, { field: field }) || "red";
            
            let points = null;
           
            if (me.line.smooth) {
                let curve = new CatmullRomCurve3(linePoints[field]);
                points = curve.getSpacedPoints(DIVISONS);
            } else {
                points = linePoints[field];
            }


            let line = app.createBrokenLine(points, 2, _color, true);

            this.group.add(line);


            //绘制区域
            let pointArr = [];
            points.forEach(point => {
                pointArr = pointArr.concat(point.toArray());
            });
            pointArr.unshift(pointArr[0], 0, pointArr[2]);
            pointArr.push(pointArr[(points.length - 1) * 3], 0, pointArr[(points.length - 1) * 3 + 2]);
            let polygon = app.createPolygonPlane(pointArr, { fillStyle: _color });
            this.group.add(polygon);


            //绘制node 点
            linePoints[field].forEach(point=>{
                
                //let node = app.createSphere(10,{fillStyle:_color});
                let node = app.createCirclePlane(10,{fillStyle:_color});
                node.position.copy(point);
                this.group.add(node);
            });
          

        }
    }
}

export { Line }