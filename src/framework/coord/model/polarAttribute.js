import { Polar } from 'mmvis/src/index'

class PolarAttribute extends Polar {
    constructor(opt, dataFrame) {
        super(opt, dataFrame)
        this.field = opt.field || null;
        this.height = 0;
    }

    calculateProps() {

        let maxHeigh = 0, minHeight = 0;
        let opt = this._opt;
        if (this._isFiled(this._opt.node.height, this.getLayoutData()[0])) {
            this.getLayoutData().forEach(item => {
                let val = item.rowData[this._opt.node.height];
                maxHeigh = Math.max(maxHeigh, val);
                minHeight = Math.min(minHeight, val);
                item.heightField = this._opt.node.height;
                item.heightValue = val;
            })

        }
        this.getLayoutData().forEach((item, i) => {
            if (!!item.heightField) {
                item.height = parseInt(opt.maxHeight * ((item.heightValue - minHeight) / (maxHeigh - minHeight)) + minHeight);
            } else {
                item.height = opt.node.height;
            }

            item.color = this.getTheme(i);
        })
        if (opt.heightSort) {
            this.getLayoutData().sort((a, b) => {
                if (opt.heightSort == 'asc') {
                    return a.height - b.height;
                } else {
                    return b.height - a.height;
                }
            })
            //重新设定下ind
            this.getLayoutData().forEach((d, i) => {
                d.iNode = i;
            });
        }
        super.calculateProps();
    }
    registTheme(fn) {
        this.getTheme = fn || function () { };
    }


}

export { PolarAttribute };