
import { Events, Vector3, Box3 } from "mmgl/src/index";


//默认坐标系的中心点与坐标系的原点都为世界坐标的[0,0,0]点
class Coord3d extends Events {
    constructor(root) {
        super();
        this._root = root;
        //坐标原点
        this.origin = new Vector3(0, 0, 0);
        //中心的
        this.center = new Vector3(0, 0, 0);
        this.padding = {
            left: 100,
            top: 100,
            right: 100,
            bottom: 100,
            front: 0,
            back: 0
        }

        this.group = root.renderView.addGroup({ name: 'Coord3d' });

        console.log("from Coord3d boundbox",this.getBoundbox());

        

    }

    

    getBoundbox() {

        let aspect = this._root.aspect;
        let frustumSize = this._root.frustumSize;
        let boundbox = new Box3();

        let width = aspect * frustumSize;

        let minX = - width * 0.5 + this.padding.left;
        let minY = - frustumSize * 0.5 + this.padding.bottom;
        let minZ = 0 + this.padding.front;

        let maxX = width * 0.5 - this.padding.right;
        let maxY = frustumSize * 0.5 - this.padding.top;
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

    drawCoordUI() {
        //什么都不做
        return null;
    }



}

export { Coord3d };