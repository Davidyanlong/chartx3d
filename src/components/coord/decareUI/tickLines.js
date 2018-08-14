import { Component } from '../../Component';
import { Vector3, Box3, Mesh } from 'mmgl/src/index';

// this.tickLine = {//刻度线
//     enabled: 1,
//     lineWidth: 1, //线宽
//     lineLength: 4, //线长
//     strokeStyle: '#cccccc',
//     // distance: 2,
//     offset: 2,
// };


class TickLines extends Component {
    constructor(coord,opts) {
        super(coord);

        //点的起点位置集合
        this.origins = [];

        //刻度线的绘制方向
        this.dir = new Vector3();

        //刻度线的宽带
        this.lineWidth = opts.lineWidth;

        //刻度线的长度
        //todo 轴线的长度是个数组 通过像素值转换
        this.length = opts.lineLength;

        this.color = opts.strokeStyle;

        this.offset = opts.offset;

        this._tickLine = null;

        this.group = this._root.renderView.addGroup({ name: 'tickLine' });
       
        this.group.visible = !!opts.enabled;
    }
    initData(axis, attribute) {
        let me = this;
        let _dir = new Vector3();
        let axisSectionLength = axis.length / (attribute.section.length - 1);
        let _offset = _dir.copy(me.dir).multiplyScalar(this._offset);
    
        attribute.section.forEach((num, index) => {
            //起点
            let startPoint = new Vector3();
           
            startPoint.copy(axis.dir);
            startPoint.multiplyScalar(axisSectionLength * index);
            startPoint.add(_offset);
            me.origins.push(startPoint);

        });


    }
    set length(len){
        let ratio = this._root.renderView.getVisableSize().ratio;
        this._length = len * ratio;
    }
    get length(){
        return this._length;
    }

    set offset(_offset){
        let ratio = this._root.renderView.getVisableSize().ratio;
        this._offset = _offset * ratio;
    }

    get offset(){
        return this._offset;
    }

    setDir(dir) {
        this.dir = dir;
    }
    drawStart() {
        this._tickLine = this._root.renderView.createLine(this.origins, this.dir, this._length, this.lineWidth, this.color);
    }

    draw() {
        this.group.add(this._tickLine);
    }

    getBoundBox() {
        let result = new Box3();
        result.makeEmpty();
        this._tickLine.traverse(function (mesh) {
            if (mesh instanceof Mesh) {
                mesh.geometry.computeBoundingBox();
                result.expandByPoint(mesh.geometry.boundingBox.min);
                result.expandByPoint(mesh.geometry.boundingBox.max);
            }
        });

        return result;
    }
}

export { TickLines };