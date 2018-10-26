
import { Events, Vector3, Box3, Object3D, _Math } from "mmgl/src/index";
import _ from '../../../lib/underscore';


//默认坐标系的中心点与坐标系的原点都为世界坐标的[0,0,0]点
//惯性坐标系
class InertialSystem extends Events {
    constructor(root) {
        super();
        this._root = root;

        let opts = _.clone(this._root.opt);
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

        this.group = root.renderView.addGroup({ name: 'InertialSystem' });
        _.extend(true, this, this.setDefaultOpts(opts));
    }

    setDefaultOpts(opts) {
        return opts;
    }

    getBoundbox() {

        let _boundbox = new Box3();

        let _opt = this._root.opt.controls;
        let _frustumSize = this._root.renderView.mode == 'ortho' ? _opt.boxHeight * 0.8 : _opt.boxHeight;
        let _width = _opt.boxWidth;
        let _depth = _opt.boxDepth;
        
        //斜边
        let _hypotenuse =_opt.distance || (new Vector3(_width, 0, _depth)).length();

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
    draw() {

    }
    dispose(){

    }



}

export { InertialSystem };