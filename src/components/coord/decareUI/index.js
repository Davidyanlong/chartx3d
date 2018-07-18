import { Component } from "../../Component";
import { Vector3 } from "mmgl/src/index";
import { YAxis } from './yAxis';
import { XAxis } from './xAxis';

class Decare3dUI extends Component {
    constructor(coord) {
        super(coord);
        this._coord = coord;
        this._root = coord._root;
        this.group = this._root.renderView.addGroup({ name: 'Decare3dUI' });

        this.xAxis = null;
        this.yAxis = null;
        this.zAxis = null;

        this.init()
    }


    init() {

        //先绘制Y轴
        this.axisY = new YAxis(this._coord);

        


         this.axisX = new XAxis(this._coord);



        //test
        let pos = this._coord._getPos(new Vector3(0, 0, 0));
        console.log("原点位置", pos);

        let box = this._root.renderView.createBox(100, 100, 100);



        this.group.add(this.axisY.group);
        this.group.add(this.axisX.group);
        
        //this.group.add(box);
    }
}

export { Decare3dUI };