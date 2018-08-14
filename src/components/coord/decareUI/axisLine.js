import { Component } from "../../Component";
import { Vector3, Box3, Mesh } from "mmgl/src/index";

class AxisLine extends Component {
    constructor(coord, opts) {
        super(coord);

        // enabled: 1,
        // lineWidth: 1,
        // strokeStyle: '#cccccc'


        //轴的起点
        this.origin = new Vector3(0, 0, 0);

        //轴的方向
        this.dir = new Vector3(1, 0, 0);

        //轴的长度
        this.length = 1;

        //轴线的宽带
        this.lineWidth = opts.lineWidth || 2;

        //轴线的颜色 (默认黑色)
        this.color = opts.strokeStyle;

        this.axis = null;

        this.group = this._root.renderView.addGroup({ name: 'axisLine' });

        //不可见    
        this.group.visible = !!opts.enabled;


    }

    defaultStyle() {
        //todo
    }

    setStyle() {
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

    drawStart() {
        this.axis = this._root.renderView.createLine(this.origin, this.dir, this.length, this.lineWidth, this.color)
    }

    draw() {

        this.group.add(this.axis);

    }

    getBoundBox() {
        let result = new Box3();

        this.axis.traverse(function (mesh) {
            if (mesh instanceof Mesh) {
                mesh.geometry.computeBoundingBox();
                result = mesh.geometry.boundingBox;
            }
        });

        //根据绘制的线宽计算三维空间的宽带

        let visableSize = this._root.renderView.getVisableSize();
        let width = 0, height = 0;
        //如果是y轴或者z轴计算轴的宽度
        if (this.dir.equals(new Vector3(0, 1, 0)) || this.dir.equals(new Vector3(0, 0, -1))) {
            width = visableSize.width / this._root.width
        }
        //如果x轴计算轴的高度
        if (this.dir.equals(new Vector3(1, 0, 0))) {
            height = visableSize.height / this._root.height;
        }

        result.min.x = result.min.x - width * 0.5;
        result.max.x = result.max.x + width * 0.5;

        result.min.y = result.min.y - height * 0.5;
        result.max.y = result.max.y + height * 0.5;

        return result;
    }

}

export { AxisLine };