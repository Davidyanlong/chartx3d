import { Component } from "../../Component";
import { Vector3, Color } from "mmgl/src/index";

class AxisLine extends Component {
    constructor(coord) {
        super(coord);

        //轴的起点
        this.origin = new Vector3(0, 0, 0);

        //轴的方向
        this.dir = new Vector3(1, 0, 0);

        //轴的长度
        this.length = 1;

        //轴线的宽带
        this.lineWidth = 2;

        //轴线的颜色 (默认黑色)
        this.color = 0xff0000;
        

        this.group = this._root.renderView.addGroup({ name: 'axisLine' });
        

    }

    defaultStyle(){
        //todo
    }

    setStyle(){
        //todo
    }

    setOrigin(pos) {
        this.origin.copy(pos);
    }

    setDir(dir) {
        this.dir.copy(dir);
    }

    setLength(length) {

        this.length = length;
    }

    setGroupName(name) {
        this.group.name = name;
    }


    draw() {

        let axis = this._root.renderView.createLine(this.origin, this.dir, this.length, this.lineWidth, this.color)
        this.group.add(axis);

    }

}

export { AxisLine };