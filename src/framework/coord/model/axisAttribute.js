import { _, dataSection, axis as Axis } from 'mmvis/src/index';

class AxisAttribute extends Axis {
    constructor(opt, dataOrg) {
        super(opt, dataOrg);
    }

    getPartDataOrg(fields) {
        let result = [];
        let map = this._opt.field.map(item => {
            return item.toString();
        });
        fields.forEach(field=>{
            let index = _.indexOf(map, field.toString());
            result.push(this.dataOrg[index]);
        });
        return result;
        
    }
    //多轴重新计算数据集
    static resetDataSection(_axisAttributeDs) {
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
}

export { AxisAttribute }