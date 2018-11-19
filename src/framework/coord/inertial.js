
import { Events, Vector3, Box3, _Math } from "mmgl/src/index";
import { _ } from 'mmvis/src/index';


//默认坐标系的中心点与坐标系的原点都为世界坐标的[0,0,0]点
//惯性坐标系
class InertialSystem extends Events {
    constructor(root) {
        super();

        this._root = root;
        this.coord = {};

        //坐标原点
        this.origin = new Vector3(0, 0, 0);
        //中心的
        this.center = new Vector3(0, 0, 0);

        this.padding = {
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
            front: 0,
            back: 0
        }
      
        this.fieldMap={};
        this.group = root.app.addGroup({ name: 'InertialSystem' });
        _.extend(true, this, this.setDefaultOpts(root.opt));

    }

    setDefaultOpts(opts) {
        return opts;
    }

    getColor(field) {
        return this.fieldMap[field] && this.fieldMap[field].color;
    }

    getBoundbox() {

        let _boundbox = new Box3();

        let _opt = this._root.opt.coord.controls;
        let _frustumSize = this._root.renderView.mode == 'ortho' ? _opt.boxHeight * 0.8 : _opt.boxHeight;
        let _width = _opt.boxWidth;
        let _depth = _opt.boxDepth;

        //斜边
        let _hypotenuse = _opt.distance || (new Vector3(_width, 0, _depth)).length();

        let _ratio = this._root.renderView.getVisableSize(new Vector3(0, 0, -_hypotenuse)).ratio;

        let minX = - _width * 0.5 + this.padding.left * _ratio;
        let minY = - _frustumSize * 0.5 + this.padding.bottom * _ratio;
        let minZ = this.padding.front - _hypotenuse * 0.5 - _depth;

        let maxX = _width * 0.5 - this.padding.right * _ratio;
        let maxY = _frustumSize * 0.5 - this.padding.top * _ratio;
        let maxZ = - _hypotenuse * 0.5 + this.padding.back;

        _boundbox.min.set(minX, minY, minZ);
        _boundbox.max.set(maxX, maxY, maxZ);
        return _boundbox;
    }

    _getWorldPos(pos) {
        let posWorld = pos.clone();

        this.group.updateMatrixWorld();
        posWorld.applyMatrix4(this.group.matrixWorld);
        return posWorld;
    }


    dataToPoint(data, dir) {

    }


    pointToData() {

    }

    initCoordUI() {
        //什么都不做
        return null;
    }
    drawUI() {
        this._root.initComponent();
    }

    draw() {
        this._root.draw();
    }
    dispose() {

    }
    resetData(){

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

export { InertialSystem };