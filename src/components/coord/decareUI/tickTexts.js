
import { Component } from '../../Component';
import { Vector3 } from 'mmgl/src/index';


class TickTexts extends Component {
    constructor(coord) {
        super(coord);
        this._coord = coord;
        this._root = coord._root;

        //起点位置集合
        this.origins = [];
        this.texts = [];

        //刻度线的绘制方向
        //todo 这个值应该是一个数组,暂时先用一个值来替代
        this.offsets = new Vector3(-70, 0, 0);

        this.group = this._root.renderView.addGroup({ name: 'tickText' });

    }

    init(axis, attribute) {
        let me = this;

        let axisSectionLength = axis.length / (attribute.section.length - 1);
        this.texts = [];
        attribute.section.forEach((num, index) => {
            //起点
            let startPoint = new Vector3();
            startPoint.copy(axis.dir);
            startPoint.multiplyScalar(axisSectionLength * index);
            startPoint.add(this.offsets);
            me.origins.push(startPoint);
            //保存文本
            this.texts.push(num);

        });


    }

    draw() {

        let textGroup = this._root.renderView.creatSpriteText(this.texts,this.origins)
        this.group.add(textGroup);
    }




}

export { TickTexts };