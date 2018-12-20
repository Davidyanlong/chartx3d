
import { Component, _ } from "../Component";
import { DEFAULT_AXIS } from "../../framework/coord/cartesian3d";
import { Vector3 } from "mmgl/src/index";

class MarkPoint extends Component {
    constructor(chart3d, opt) {
        super(chart3d.currCoord);

        this.opt = opt;
        
        this.name = 'MarkPoint';
        this.type = "markline";
        this.markTo = null;
        this.active = 'max';   //max,min
        this.position = null  //点的位置,如果是一个二维数组绘制多个点
        this.data = null;

        this.label = {
            fontSize: 50,
            fillStyle: 'red',
            strokeStyle: "#eee",
            lineWidth: 2,
            isBold: true,
            offset: 50

        }

        this.icon = {

        }
        _.extend(true, this, opt);
        this.init();

    }

    init() {

        if (this.markTo) {
            let zField = this._coordSystem.isExistZAxisField();
            let zSection = this._coordSystem.zAxisAttribute.getNativeDataSection();
            let zCusSection = this._coordSystem.zAxisAttribute.getDataSection();

            if (zField) {
                this.data = [];
                zSection.forEach((val, i) => {
                    let _groups = this._root.dataFrame.getRowDataOf({ [zField]: val });
                    let arr = [];
                    _groups.forEach(item => {
                        arr.push(item[this.markTo]);
                    });
                    arr.zField = val;
                    if (zCusSection[i]) {
                        arr.zCusSection = zCusSection[i];
                    }
                    this.data.push(arr);
                })

            } else {
                this.data = this._coordSystem.getAxisDataFrame(this.markTo);
            }
        }
        this._coordSystem.group.add(this.group);
    }

    draw() {
        let app = this._root.app;
        let infos = [];
        //1、如果指定了position是具体的数组,就按照给定的值来绘制
        //2、如果指定了position是函数,就根据函数来计算
        //3、如果只制定了markTo,默认返回所有点,active是预设的一些方法,默认是最大最小值
        let drawPoints = [];

        if (this.position) {
            if (_.isFunction(this.position)) {
                drawPoints = this.position.call(this, this.data);
            }
            if (_.isArray(this.position)) {
                drawPoints = drawPoints.concat(this.position);
            }
        } else {
            if (this.active === 'max') {
                infos = this._getMaxValuePos();


            } else if (this.active === 'min') {
                infos = this._getMinValuePos();

            }
        }


        infos.forEach(item => {
            let fontStyle = this._getFontStyle(item.zValue);

            let textObj = app.creatSpriteText(item.val, fontStyle);
            textObj[0].position.fromArray(item.pos);
            textObj[0].position.setY(fontStyle.offset + textObj[0].position.y);
            this.group.add(textObj[0]);
        })


    }
    _getMaxValuePos() {
        let pos = [], arr, val;

        if (!this.data) {
            console.error('markpoint组件中请指定markTo字段')
        } else {
            if (_.isArray(this.data[0])) {
                this.data.forEach(dt => {
                    arr = _.flatten(dt);
                    val = Math.max.apply(null, arr);
                    pos.push(this._getValPos(val, dt));

                });
                return pos;
            } else {
                arr = _.flatten(this.data);
                val = Math.max.apply(null, arr);
                pos.push(this._getValPos(val));
                return pos;
            }

        }
        return [[0, 0, 0]];

    }
    _getMinValuePos() {
        let pos = [], arr, val;

        if (!this.data) {
            console.error('markpoint组件中请指定markTo字段')
        } else {
            if (_.isArray(this.data[0])) {
                this.data.forEach(dt => {
                    arr = _.flatten(dt);
                    val = Math.min.apply(null, arr);
                    pos.push(this._getValPos(val, dt));

                });
                return pos;
            } else {
                arr = _.flatten(this.data);
                val = Math.min.apply(null, arr);
                pos.push(this._getValPos(val));
                return pos;
            }

        }
        return [[0, 0, 0]];
    }
    _getValPos(val, dt) {
        let rootOpt = this._root.opt;
        let x, y, z;
        let zField = this._coordSystem.isExistZAxisField();
        //大数据获取XYZ

        let searchOpt = { [this.markTo]: val };
        if (dt && zField) {
            searchOpt[zField] = dt.zField;
        }
        let rowData = this._root.dataFrame.getRowDataOf(searchOpt)
        let attr = this._getYAttribute();

        y = this._coordSystem.getYAxisPosition(val, attr);

        x = this._coordSystem.getXAxisPosition(rowData[0][rootOpt.coord.xAxis.field]);
        if (rootOpt.coord.zAxis && rootOpt.coord.zAxis.field) {
            z = this._coordSystem.getZAxisPosition(dt.zCusSection);
        } else {
            z = this._coordSystem.getZAxisPosition(this.markTo);
        }

        return {
            val: val,
            pos: [x, y, -z],
            zValue: dt.zCusSection || this.markTo
        };
    }
    _getYAttribute() {
        let axisName = DEFAULT_AXIS;
        this._root.opt.graphs.forEach(item => {
            if (_.isArray(item.field)) {
                let _fields = _.flatten(this.field);
                let idx = _.indexOf(_fields, this.markTo);
                if (idx !== -1) {
                    axisName = item.yAxisName;
                }
            }
        })
        return this._coordSystem.getYAxis(axisName).attr;
    }
    _getFontStyle(field) {
        let _color;
        if (this.opt.label && this.opt.label.fillStyle) {
            return this.label;
        } else {

            _color = this._coordSystem.fieldMap[field].color;

        }
        return _.extend({}, this.label, { fillStyle: _color });

    }


}

export default MarkPoint;