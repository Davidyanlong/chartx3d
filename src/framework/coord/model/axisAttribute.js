import DataSection from '../../../../utils/datasection';
import _ from '../../../../lib/underscore';

class AxisAttribute {
    constructor(root) {
        this._root = root;
        this.field = '';
        this.data = null;
        this.section = [];
    }
    setField(val) {
        this.field = val;
        this.data = this.getAxisDataFrame(this.field);
    }

    setData(data) {
        this.data = data;
    }
    setDataSection(section) {
        this.section = section;
    }
    computeDataSection(joinArr = []) {
        let scetion = this._setDataSection(this.field);
        joinArr = joinArr.concat(scetion);
        let arr = _.flatten(joinArr);
        for (var i = 0, il = arr.length; i < il; i++) {
            arr[i] = Number(arr[i] || 0);
            if (isNaN(arr[i])) {
                arr.splice(i, 1);
                i--;
                il--;
            }
        };
        this.section = DataSection.section(arr);

    }
    _setDataSection(yFields) {
        //如果有堆叠，比如[ ["uv","pv"], "click" ]
        //那么这个 this.dataOrg， 也是个对应的结构
        //vLen就会等于2
        var vLen = 1;

        _.each(yFields, function (f) {
            if (_.isArray(f) && f.length > 1) {
                vLen = 2;
            }
        });

        if (vLen == 1) {
            return this._oneDimensional(yFields);
        };
        if (vLen == 2) {
            return this._twoDimensional(yFields);
        };

    }

    _oneDimensional(yFields) {
        let dataOrg = this.getAxisDataFrame(yFields);
        var arr = _.flatten(dataOrg); //_.flatten( data.org );

        for (var i = 0, il = arr.length; i < il; i++) {
            arr[i] = arr[i] || 0;
        };

        return arr;
    }

    //二维的yAxis设置，肯定是堆叠的比如柱状图，后续也会做堆叠的折线图， 就是面积图
    _twoDimensional(yFields) {
        let d = this.getAxisDataFrame(yFields);
        var arr = [];
        var min;
        _.each(d, function (d, i) {
            if (!d.length) {
                return
            };

            //有数据的情况下 
            if (!_.isArray(d[0])) {
                arr.push(d);
                return;
            };

            var varr = [];
            var len = d[0].length;
            var vLen = d.length;

            for (var i = 0; i < len; i++) {
                var up_count = 0;
                var up_i = 0;

                var down_count = 0;
                var down_i = 0;

                for (var ii = 0; ii < vLen; ii++) {
                    !min && (min = d[ii][i])
                    min = Math.min(min, d[ii][i]);

                    if (d[ii][i] >= 0) {
                        up_count += d[ii][i];
                        up_i++
                    } else {
                        down_count += d[ii][i];
                        down_i++
                    }
                }
                up_i && varr.push(up_count);
                down_i && varr.push(down_count);
            };
            arr.push(varr);
        });
        arr.push(min);
        return _.flatten(arr);
    }
    getAxisDataFrame(fields) {
        let dataFrame = this._root.dataFrame;

        return dataFrame.getDataOrg(fields, function (val) {
            if (val === undefined || val === null || val == "") {
                return val;
            }
            return (isNaN(Number(val)) ? val : Number(val))
        })

    }
}

export { AxisAttribute }