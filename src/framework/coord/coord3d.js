
import { Events, Vector3, Box3 } from "mmgl/src/index";
import _ from '../../../lib/underscore';


//默认坐标系的中心点与坐标系的原点都为世界坐标的[0,0,0]点
class Coord3d extends Events {
    constructor(root) {
        super();
        this._root = root;

        let opts = _.clone(this._root.opt.opts);
        this.coord = {};
        //坐标原点
        this.origin = new Vector3(0, 0, 0);
        //中心的
        this.center = new Vector3(0, 0, 0);
        this.padding = {
            left: 20,
            top: 20,
            right: 20,
            bottom: 20,
            front: 0,
            back: 0
        }

        this.group = root.renderView.addGroup({ name: 'Coord3d' });

        //console.log("from Coord3d boundbox",this.getBoundbox());


        // this._graphs = [];
        // if (opts.graphs) {
        //     opts.graphs = _.flatten([opts.graphs]);
        // };

        _.extend(true, this, this.setDefaultOpts(opts));

    }

    setDefaultOpts(opts) {
        return opts;
    }

    getBoundbox() {
        let ratio = this._root.renderView.getVisableSize().ratio;
        let aspect = this._root.aspect;
        let frustumSize = this._root.frustumSize;
        let boundbox = new Box3();

        let width = aspect * frustumSize;

        let minX = - width * 0.5 + this.padding.left * ratio;
        let minY = - frustumSize * 0.5 + this.padding.bottom * ratio;
        let minZ = 0 + this.padding.front ;

        let maxX = width * 0.5 - this.padding.right * ratio;
        let maxY = frustumSize * 0.5 - this.padding.top * ratio;
        let maxZ = 1000 - this.padding.back

        boundbox.min.set(minX, minY, minZ);
        boundbox.max.set(maxX, maxY, maxZ);
        return boundbox;
    }

    _getPos(pos) {

    }

    dataToPoint(data, dir) {

    }


    pointToData() {

    }

    initCoordUI() {
        //什么都不做
        return null;
    }
    draw(){

    }



}

export { Coord3d };