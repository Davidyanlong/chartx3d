
import { Coord3d } from './coord3d';
import { Vector3, Box3, Matrix3, Matrix4 } from 'mmgl/src/index'
import { Decare3dUI } from '../../components/coord/decareUI/index'
import _ from '../../../lib/underscore';
import DataSection from '../../../utils/datasection';

class Decare3d extends Coord3d {
    constructor(root) {
        super(root);
        this._root = root;
        let baseBoundbox = super.getBoundbox();

        //相对与世界坐标的原点位置
        this.origin = baseBoundbox.min;
        this.center = new Vector3(0, 0, 0);

        this.group = root.renderView.addGroup({ name: 'Decare3d' });


        console.log("from Decare3d boundbox", this.getBoundbox());



        this.xAxisAttribute = new AxisAttribute();
        this.yAxisAttribute = new AxisAttribute();
        this.zAxisAttribute = new AxisAttribute();

        this.init();

    }
    getBoundbox() {
        //笛卡尔坐标的原点默认为左下方
        let boundbox = new Box3();
        let baseBoundbox = super.getBoundbox();

        boundbox.min.set(0, 0, 0);
        boundbox.max.set(baseBoundbox.max.x - this.origin.x,
            baseBoundbox.max.y - this.origin.y,
            baseBoundbox.max.z - this.origin.z,
        )

        return boundbox;

    }

    init() {
        // let view = this._root.renderView;
        // let camera = view._camera;
        let opt = this.opt = _.clone(this._root.opt.opts)


        //这个判断不安全
        if (_.isSafeObject(opt, 'coord.xAxis.field')) {
            this.xAxisAttribute.setField(opt.coord.xAxis.field);
            this.xAxisAttribute.setData(this._getAxisDataFrame(opt.coord.xAxis.field))
            if (!_.isSafeObject(opt, 'coord.xAxis.dataSection')) {
                this.xAxisAttribute.computeDataSection();
            }
        }

        //获取axisY
        let yFields = [];
        if (_.isSafeObject(opt, 'coord.yAxis.field')) {
            yFields.push(opt.coord.yAxis.field);
        }

        opt.graphs && opt.graphs.forEach(cp => {
            yFields.push(cp.field);
        })

        yFields = _.uniq(yFields);
        this.yAxisAttribute.setField(yFields);
        this.yAxisAttribute.setData(this._getAxisDataFrame(yFields))
        if (!_.isSafeObject(opt, 'coord.yAxis.dataSection')) {
            this.yAxisAttribute.computeDataSection();
        }


        //变换渲染图层的原点位置
        this.group.position.copy(this.origin);




    }

    _getAxisDataFrame(fields) {
        let dataFrame = this._root.dataFrame;
        return dataFrame.getDataOrg(fields, function (val) {
            if (val === undefined || val === null || val == "") {
                return val;
            }
            return (isNaN(Number(val)) ? val : Number(val))
        })

    }

    //根据局部坐标点,返回世界坐标点
    _getPos(pos) {

        let transMatrix = new Matrix4();

        transMatrix.makeTranslation(...this.origin.toArray())

        return pos.applyMatrix4(transMatrix);

    }

    drawCoordUI() {

        let coordUI = new Decare3dUI(this);
        this.group.add(coordUI.group);
    }

    dataToPoint() {

    }

    boundbox() {

    }
}


class AxisAttribute {
    constructor() {
        this.field = '';
        this.data = null;
        this.section = [];
    }
    setField(val) {
        this.field = val;
    }
    setData(data) {
        this.data = data;
    }
    computeDataSection() {
        let arr = _.flatten(this.data);
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
}



export { Decare3d };