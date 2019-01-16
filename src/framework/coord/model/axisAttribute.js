import { _, dataSection, axis as Axis } from 'mmvis/src/index';

class AxisAttribute extends Axis {
    constructor(opt, dataOrg) {
        super(opt, dataOrg);
        this.field = opt.field || null;
        this.exclude = opt.exclude || '';

        if ("middleweight" in opt) {
            this.setMiddleweight(opt.middleweight);
        }
        this._nativeDataSection = [];
    }

    setDataSection(dataSection) {
        super.setDataSection(dataSection);
        if (this.layoutType !== 'proportion') {
            this.dataSection = _.uniq(this.dataSection); //this._getDataSection();
            //空数据需要去除
            this.dataSection.forEach((item, i) => {
                if (item === this.exclude) {
                    this.dataSection.splice(i, 1);
                }
            })
            this.dataSectionGroup = [this.dataSection];
        }
    }
    getNativeDataSection() {
        if (this._nativeDataSection.length > 0) {
            return this._nativeDataSection;
        }
        if (this._opt.dataSection) {
            if (this.layoutType !== "proportion") {

                //非proportion 也就是 rule peak 模式下面
                this._nativeDataSection = _.flatten(this.dataOrg);//this._getDataSection();
                this._nativeDataSection = _.uniq(this._nativeDataSection);
            } else {
                this._nativeDataSection = this.getDataSection();
            }
            this._nativeDataSection = this._nativeDataSection;
        } else {
            this._nativeDataSection = this.getDataSection();
        }
        return this._nativeDataSection;
    }

    getPartDataOrg(fields) {
        let result = [];
        let map = this._opt.field.map(item => {
            return item.toString();
        });

        let _fieldArr = _.isArray(fields) ? fields : [fields];
        _fieldArr.forEach(field => {
            let index = _.indexOf(map, field.toString());
            result.push(this.dataOrg[index]);
        });
        return result;

    }
    setMiddleweight(val) {
        this.middleweight = val;
    }
    //多轴重新计算数据集


    //OVERFLOW Class
    _getCellCount() {

        if (this._cellCount !== null) {
            return this._cellCount;
        };

        //总共有几个数据节点，默认平铺整个dataOrg，和x轴的需求刚好契合，而y轴目前不怎么需要用到这个
        var cellCount = 0;
        if (this.layoutType == "proportion") {
            cellCount = this.axisLength;
        } else {
            //todo 三维场景下,部分数据是重复的,所以直接在数据源中获取长度是不对的
            //if (this.dataOrg.length && this.dataOrg[0].length && this.dataOrg[0][0].length) {
            //    cellCount = this.dataOrg[0][0].length;
            //  }
            if (this.dataSection.length) {
                cellCount = this.dataSection.length;
            };
        };
        this._cellCount = cellCount;
        return cellCount;
    }
    getIndexOfVal(val) {

        var valInd = -1;
        if (this.layoutType == "proportion") {

            //先检查下 dataSectionLayout 中有没有对应的记录
            var _ind = this._getLayoutDataOf({ val: val }).ind;
            if (_ind != undefined) {
                return _ind;
            };

            //因为在proportion中index 就是 pos
            //所以这里要返回pos
            valInd = this.getPosOfVal(val);
        } else {
            var _ind = _.indexOf(this.dataSection, val);
            if (_ind != -1) {
                valInd = _ind;
            };

        }


        return valInd;
    }
}


AxisAttribute.resetDataSection = (_axisAttributeDs) => {
    let _dataSections = [];
    let maxSegment = 0;
    let minSegmentUser = Infinity;

    //如果用户制定了某个轴的dataSection,就采用用户制定的最短dataSection的个数定义Y轴的数据
    //否则则采用自动计算后最多的段,重新计算其他的坐标轴

    //先计算一下,需要划分的段数
    for (let key in _axisAttributeDs) {
        let _axisAtt = _axisAttributeDs[key];
        let _currSection = _axisAtt.getDataSection();;
        //用户设置了dataSection

        if (!_.isEmpty(_axisAtt._opt.dataSection)) {
            minSegmentUser = Math.min(minSegmentUser, _currSection.length);
        } else {
            maxSegment = Math.max(maxSegment, _currSection.length);
        }
        _dataSections.push(_currSection);
    }
    let segment = minSegmentUser !== Infinity ? minSegmentUser : maxSegment;
    for (let key in _axisAttributeDs) {
        let _axisAtt = _axisAttributeDs[key];
        let _section = _axisAtt.getDataSection();
        if (_section.length !== segment) {
            let step = (_section[_section.length - 1] - _section[0]) / (segment - 1);
            let newSection = [];

            for (let i = 0; i < segment; i++) {
                if (i == segment - 1) {
                    newSection.push(_section[_section.length - 1])
                } else {
                    //这里默认数据保留两位小数,后期通过坐标轴配置中的format进行自定义的格式化
                    let val = _section[0] + step * i;
                    if (val.toString().split(".")[1] && val.toString().split(".")[1].length > 2) {
                        newSection.push(+val.toFixed(2))
                    } else {
                        newSection.push(val);
                    }

                }
            }
            _axisAtt.setDataSection(newSection);
            _axisAtt.calculateProps();

        }


    }
}

export { AxisAttribute }