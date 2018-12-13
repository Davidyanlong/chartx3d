import { Component, _ } from '../Component';
import { Vector3 } from 'mmgl/src/index';

class GraphObject extends Component {
    constructor(chart3d) {
        super(chart3d.currCoord);
        //todo 每个图表初始化前最基本的属性放在这里
        this.enabledField = [];
        this.drawData = [];
    }
    setEnabledField() {
        let _coord = this._coordSystem;
        let _zfield = _coord.isExistZAxisField();
        if (!_zfield) {
            this.enabledField = this._coordSystem.getEnabledFields(this.field);
        } else {
            let zSection = _coord.zAxisAttribute.getDataSection();
            this.enabledField = this._coordSystem.getEnabledFields(zSection);
        }
    }

    dataProcess() {
        //每一个图型组件在绘制前都需要进行数据处理,提取出来这里统一做首次处理
        if (this._coordSystem.type == "Cartesian3D") {
            this._cartesian3DProcess();
        }
    }

    _cartesian3DProcess() {
        let me = this;
        let _coord = this._coordSystem;
        let _xAxis = _coord.xAxisAttribute;
        let _zAxis = _coord.zAxisAttribute;
        let yAxisInfo = _coord.getYAxis(this.yAxisName);
        let _yAxis = yAxisInfo.attr;

        let zData, zNativeSection;


        //用来计算下面的hLen
        this.setEnabledField();
        this.drawData = {};

        var hLen = this.enabledField.length; //每组显示的个数

        //判断是是否提供了Z轴字段,也就是判断数据是二维数据还是三维数据
        let _zfield = _coord.isExistZAxisField();
        zNativeSection = _zAxis.getNativeDataSection();
        if (_zAxis.layoutType === 'proportion') {
            zData = _.flatten(_zAxis.dataOrg);
        } else {
            zData = _zAxis.getDataSection();

        }


        //然后计算出对于结构的dataOrg

        function generate(zVal, zInd) {
            //dataOrg和field是一一对应的
            let dataOrg = [];
            let rowDataOf;
            if (!_zfield) {
                dataOrg = me._root.dataFrame.getDataOrg(me.enabledField);
            } else {
                let orgVal = zNativeSection[zInd];
                let op = {
                    [_zfield]: orgVal
                };

                rowDataOf = me._root.dataFrame.getRowDataOf(op);
                let arr = [];
                arr = rowDataOf.map(item => {
                    return item[_yAxis.field];
                });
                dataOrg.push([arr]);
            }

            _.each(dataOrg, function (hData, b) {
                //hData，可以理解为一根竹子 横向的分组数据，这个hData上面还可能有纵向的堆叠
                //tempBarData 一根柱子的数据， 这个柱子是个数据，上面可以有n个子元素对应的竹节
                var tempBarData = [];
                let _vValue = 0;
                _.each(hData, function (vSectionData, v) {
                    tempBarData[v] = [];
                    //vSectionData 代表某个字段下面的一组数据比如 uv

                    let _dataLen = vSectionData.length;

                    //vSectionData为具体的一个field对应的一组数据
                    _.each(vSectionData, function (val, i) {

                        _vValue = 0;
                        if (v > 0) {
                            for (let t = 0; t < v; t++) {
                                _vValue += hData[t][i];
                            }
                        }

                        var vCount = val;
                        if (me.proportion) {
                            //先计算总量
                            vCount = 0;
                            _.each(hData, function (team, ti) {
                                vCount += team[i]
                            });
                        };



                        let z = 0;

                        z = - _zAxis.getPosOfVal(zVal);
                        zInd = _zAxis.getIndexOfVal(zVal);

                        let _field = null;
                        if (_zfield) {
                            _field = me.field.toString();
                        } else {
                            _field = me._getTargetField(b, v, i, me.enabledField);
                        }

                        let rowData = 0;
                        if (_zfield) {
                            rowData = rowDataOf[i]
                        } else {
                            rowData = me._root.dataFrame.getRowDataAt(i)
                        }

                        let xVal = rowData[_xAxis.field];
                        let x = _xAxis.getPosOfVal(xVal);

                        let y = 0, startY = 0;
                        if (me.proportion) {
                            y = val / vCount * _yAxis.axisLength;
                        } else {
                            y = _yAxis.getPosOfVal(val);
                            startY = _yAxis.getPosOfVal(_vValue);
                        };


                        var nodeData = new NodeData({
                            type: me.type,
                            value: val,
                            vInd: v,         //如果是堆叠图的话，这个node在堆叠中得位置
                            vCount: vCount,
                            groupIndex:b,

                            field: _field,
                            xField: _xAxis.field,
                            zField: _zAxis.field,
                            dataLen: _dataLen,

                            size: new Vector3(xVal, val, zVal),
                            pos: new Vector3(x, y, z),
                            fromPos: new Vector3(x, startY, z),
                            vValue: _vValue,
                            hLen:hLen,
                            iNode: i,
                            zNode: zInd,
                            rowData: rowData,
                            color: _zfield ? _coord.getColor(zVal) : _coord.getColor(_field)
                        });


                        let key = nodeData.field;
                        if (_zfield) {
                            key = zVal;
                        }
                        if (!me.drawData[key]) {
                            me.drawData[key] = tempBarData[v];
                        };

                        tempBarData[v].push(nodeData);

                    });
                });

            });
        }


        let fieldName = this.enabledField.toString();
        if (!_zfield) {
            let zInd = _.indexOf(zNativeSection, fieldName);
            generate(zData[zInd]);
        } else {
            zData.forEach((zd, zInd) => {
                generate(zd, zInd);
            });
        }
        return me.drawData;
    }
    _getTargetField(b, v, i, field) {
        if (_.isString(field)) {
            return field;
        } else if (_.isArray(field)) {
            var res = field[b];
            if (_.isString(res)) {
                return res;
            } else if (_.isArray(res)) {
                return res[v];
            };
        }
    }


}

class NodeData {
    constructor({ type = null,
        value = null,
        vInd = null,
        vCount = null,

        field = null,
        xField = null,
        zField = null,
        dataLen = 0,

        size,
        fromPos,

        iNode = null,
        zNode = null,
        rowData = null,
        color = null,
        vValue = null,
        pos = null,
        hLen=null,
        groupIndex=null } = {}) {
        this.init(type, value, vInd, vCount, field, xField, zField, dataLen, size, fromPos, iNode, zNode, rowData, color, vValue, pos,hLen,groupIndex);
    }
    init(type, value, vInd, vCount, field, xField, zField, dataLen, size, fromPos, iNode, zNode, rowData, color, vValue, pos,hLen,groupIndex) {
        this.type = type; //图型补充
        this.value = value; //对于在Y轴上的值
        this.vInd = vInd; //如果是堆叠图的话，这个node在堆叠中得位置
        this.vValue = vValue; //堆叠后的值

        this.vCount = vCount; //纵向方向的总数,比瑞堆叠了uv(100),pv(100),那么这个vCount就是200，比例柱状图的话，外部tips定制content的时候需要用到

        this.field = field;  //y轴对应的字段 
        this.xField = xField; //x轴对应的字段
        this.zField = zField; //z轴对应的字段 
        this.dataLen = dataLen;   //该字段对应的数据个数
        this.hLen = hLen;  //分组数据的总数
        this.groupIndex = groupIndex;   //分组的索引

        this.size = size || new Vector3(); //图像的大小数据
        this.pos = pos;  //值转换为位置的数据
        this.fromPos = fromPos || new Vector3();  //图像的位置


        this.iNode = iNode;        //相对于x轴的索引 
        this.zNode = zNode;        //相对于轴z的索引 
        this.rowData = rowData;     //本行数据
        this.color = color;       //颜色值
    }
}

export { GraphObject, _ }