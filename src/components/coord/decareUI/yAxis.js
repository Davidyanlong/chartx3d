
import { AxisLine } from './axisLine';
import { Vector3 } from 'mmgl/src/index';
import { TickLines } from './tickLines';
import { Component } from '../../Component';
import { TickTexts } from './tickTexts';

class YAxis extends Component {
    constructor(coord) {
        super(coord);
        let coordBoundBox = coord.getBoundbox();

        this.group = this._root.renderView.addGroup({ name: 'yAxis' });

        this.axisLine = new AxisLine(coord);
        this.group.add(this.axisLine.group);

        //设置坐标轴的方向
        this.axisLine.setDir(new Vector3(0, 1, 0));

        this.axisLine.setOrigin(coordBoundBox.min);
        this.axisLine.setLength(coordBoundBox.max.y);
        this.axisLine.setGroupName('yAxisLine')
        this.axisLine.draw();
        //不可见    
        //this.axisLine.group.visible = false;



        //传相关的tick 配置进去
        let tickLineOptions = {};
        this.tickLine = new TickLines(coord, tickLineOptions);
        this.group.add(this.tickLine.group);
        this.tickLine.setDir(new Vector3(-1, 0, 0));
        this.tickLine.init(this.axisLine, coord.yAxisAttribute);

        this.tickLine.draw();


        //绘制刻度值
        let tickTextOptions = {};
        this.tickText = new TickTexts(coord, tickTextOptions);
        this.group.add(this.tickText.group);
        this.tickText.init(this.axisLine, coord.yAxisAttribute);

        this.tickText.draw();


    }

    init() {

    }

    getBoundbox() {

    }



}

export { YAxis };