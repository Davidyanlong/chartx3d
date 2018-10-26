import { Component, _ } from '../../Component';
import { Vector3, MeshBasicMaterial, MeshLambertMaterial, FrontSide, DoubleSide, MeshPhongMaterial, Color } from 'mmgl/src/index';

let renderOrder = 100;

class Line extends Component {
    constructor(chart3d, opt) {
        super(chart3d.currCoord);
        this.type = "line";

        _.extend(true, this, opt);
        this.materialMap = new Map();
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

        let yValidData = [];

        yValidData = yAxisAttribute.getData(this.field);
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
    draw() {
        let me = this;
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
            linePoints[dataOrg.field] = linePoints[dataOrg.field] || [];
            if (dataOrg.isStack) {
                stack.setX(pos.x);
                stack.setY(getYAxisPosition(dataOrg.stackValue.y + dataOrg.value.y, yAxisAttribute));
                stack.setZ(-pos.z);

            } else {

                stack.setX(pos.x);
                stack.setY(pos.y);
                stack.setZ(-pos.z);

            }
            linePoints[dataOrg.field].push(stack);
        })

        for (let field in linePoints) {
            let _color = this._getColor(null, { field: field });
            let line = this._root.renderView.createBrokenLine(linePoints[field], 2, _color, false);
            this.group.add(line);

        }

        //绘制区域
        // createPolygonPlane(points = [], faceStyle = {}, materials)

        for (let field in linePoints) {
            let points = [];
            let _color = this._getColor(null, { field: field });
            linePoints[field].forEach(point => {
                points.push(point.toArray());

            });
            points.unshift([points[0][0], 0, points[0][2]]);
            points.push([points[points.length - 1][0], 0, points[points.length - 1][2]]);
            let polygon = this._root.renderView.createPolygonPlane(_.flatten(points), { fillStyle: _color });
            this.group.add(polygon);
        }

        console.log(linePoints);
        //debugger
    }
}

export { Line }