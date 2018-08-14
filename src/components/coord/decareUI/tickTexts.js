
import { Component } from '../../Component';
import { Vector3, Box3, Sprite ,TextTexture} from 'mmgl/src/index';

// {
//     enabled: 1,
//     fontColor: '#999',
//     fontSize: 16,
//     format: null,
//     rotation: 0,
//     textAlign: null,//"right",
//     lineHeight: 1,
//     offset: 2     //和刻度线的距离
// }
class TickTexts extends Component {
    constructor(coord, opts) {
        super(coord);

        //起点位置集合
        this.origins = [];
        this.texts = [];

        this.fontColor = opts.fontColor || '#333';

        this.rotation = 0;

        this.textAlign = opts.textAlign;

        this.dir = new Vector3();

        this.offset = opts.offset;

        this._tickTextGroup = null;

        this.group = this._root.renderView.addGroup({ name: 'tickText' });

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

    set offset(_offset) {
        let ratio = this._root.renderView.getVisableSize().ratio;
        this._offset = _offset * ratio;
    }

    get offset() {
        return this._offset;
    }
    setDir(dir) {
        this.dir = dir;
    }
    drawStart(texts) {
        let me = this;
        this._tickTextGroup = this._root.renderView.addGroup({ name: 'tickTexts' });
       // this._tickTextGroup.removeAll();

       let ratio = this._root.renderView.getVisableSize().ratio;
       let maxWidth = TextTexture.getTextWidth(texts,['normal','normal',this.fontColor,this.fontSize].join(' '));
       
       (texts || []).forEach((text, index) => {
       let width = TextTexture.getTextWidth([text],['normal','normal',me.fontColor,me.fontSize].join(' '))
            let obj =me._root.renderView.createTextSprite(text.toString(), me.fontSize,me.fontColor)
            obj.position.copy(me.origins[index]);
            if(me.textAlign=='right'){
                obj.position.add(new Vector3((maxWidth-width)*ratio/2,0,0));
            }
            if(me.textAlign =='left'){
                obj.position.add(new Vector3(-(maxWidth-width)*ratio/2,0,0));
            }
            me._tickTextGroup.add(obj);
           
        })
        //todo:通过计算最长文本在三维空间中的位置
        // this._tickTexts = this._root.renderView.creatSpriteText(this.texts, this.origins)

    }
    draw() {

        this.group.add(this._tickTextGroup);
    }
    getBoundBox() {
        //todo 需要重构底层绘图引擎的Sprite的绘制,将Geometry转移到Sprite类中
        //没有计算文本旋转后的长度
        let result = new Box3();
        result.makeEmpty();
        this._tickTexts.traverse(function (sprite) {
            if (sprite instanceof Sprite) {
                let min = new Vector3();
                let max = new Vector3();
                let halfScale = new Vector3();
                halfScale.copy(sprite.scale);
                halfScale.multiplyScalar(0.5);
                min.copy(sprite.position);
                max.copy(sprite.position);

                min.sub(halfScale);
                max.add(halfScale);

                result.expandByPoint(min);
                result.expandByPoint(max);
            }
        });
        return result;
    }



}

export { TickTexts };