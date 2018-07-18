import { Component } from '../../Component';
import { Vector3 } from 'mmgl/src/index';


class TickLines extends Component {
    constructor(coord) {
        super(coord);
        this._coord = coord;
        this._root = coord._root;

        //点的起点位置集合
        this.origins = [];

        //刻度线的绘制方向
        this.dir = new Vector3();

        //刻度线的宽带
        this.lineWidth = 1;

        //刻度线的长度
        //todo 轴线的长度是个数组
        this.length = 20;



        this.color = 0xff0000;

        this.group = this._root.renderView.addGroup({ name: 'tickLine' });

    }
    init(axis, attribute) {
        let me = this;

        let axisSectionLength = axis.length / (attribute.section.length-1);

        attribute.section.forEach((num, index) => {
            //起点
            let startPoint = new Vector3();
            startPoint.copy(axis.dir);
            startPoint.multiplyScalar(axisSectionLength * index);
            me.origins.push(startPoint);

        });
        

    }
    setDir(dir) {
        this.dir = dir;
    }

    draw() {
        
        let axis = this._root.renderView.createLine(this.origins, this.dir, this.length, this.lineWidth, this.color)
        this.group.add(axis);
    }




}

export { TickLines };