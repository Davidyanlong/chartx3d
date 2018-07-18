
import { AxisLine } from './axisLine';
import { Vector3 } from 'mmgl/src/index';
import { TickLines } from './tickLines';
import { Component } from '../../Component';

class XAxis extends Component {
    constructor(coord) {
        super(coord);

        //设置坐标轴的方向

        let coordBoundBox = coord.getBoundbox();



        this.group = this._root.renderView.addGroup({ name: 'xAxis' });

        this.axisLine = new AxisLine(coord);
        this.group.add(this.axisLine.group);

        //设置坐标轴的方向
        this.axisLine.setDir(new Vector3(1, 0, 0));

        this.axisLine.setOrigin(coordBoundBox.min);
        this.axisLine.setLength(coordBoundBox.max.x);
        this.axisLine.setGroupName('xAxisLine')
        this.axisLine.draw();



        //刻度线
        let tickOptions = {};
        this.tickLine = new TickLines(coord, tickOptions);
        this.group.add(this.tickLine.group);
        this.tickLine.setDir(new Vector3(0, -1, 0));
        this.tickLine.init(this.axisLine, coord.xAxisAttribute);

        this.tickLine.draw();

    }
}

export { XAxis };