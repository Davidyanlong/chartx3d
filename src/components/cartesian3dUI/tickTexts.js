
import { Component, _ } from '../Component';
import { Vector3, TextTexture, Box3, Matrix4 } from 'mmgl/src/index';

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
    constructor(_coordSystem, opts) {
        super(_coordSystem);

        //起点位置集合
        this.origins = [];
        this.texts = [];

        this.fontColor = opts.fontColor || '#333';

        this.fontSize = opts.fontSize || 12;

        this.rotation = 0;

        this.origin = null;

        this.textAlign = opts.textAlign;

        this.verticalAlign = opts.verticalAlign;

        this.dir = new Vector3();

        this.offset = new Vector3(...Object.values(opts.offset)) || new Vector3();

        this._tickTextGroup = null;

        this._tickTextGroup = this._root.app.addGroup({ name: 'tickTexts' });

        this.group.visible = !!opts.enabled;
        this.group.add(this._tickTextGroup);
    }


    initData(axis, attribute, fn) {
        let me = this;
        let _dir = me.dir.clone();
        //let _offset = _dir.multiplyScalar(this.offset);
        let _offset = this.offset;
        me.origins = [];

        attribute.getSection().forEach((num, index) => {
            //起点
            let val = fn.call(this._coordSystem, num, attribute)
            let startPoint = axis.dir.clone().multiplyScalar(val);
            startPoint.add(axis.origin);
            startPoint.add(_offset);
            me.origins.push(startPoint);

        });

        me.updataOrigins = this._updataOrigins(axis, attribute, fn)
    }

    setDir(dir) {
        this.dir = dir;
    }
    setTextAlign(align) {
        this.textAlign = align;
    }
    setVerticalAlign(align) {
        this.verticalAlign = align;
    }

    _updataOrigins(axis, attribute, fn) {
        let _axis = axis;
        let _attribute = attribute;
        let _fn = fn;
        return function () {
            this.initData(_axis, _attribute, _fn);
        }
    }
    getTextPos(text) {
        let index = _.indexOf(this.texts, text);
        if (index != -1) {
            return this.origins[index];
        }
        return null;
    }

    drawStart(texts) {
        let me = this;
        let app = me._root.app;
        texts = texts || [];
        let { fontSize, fontColor: color } = me;
        let zDir = new Vector3(0, 0, -1);
        this.texts = texts;

        let labels = app.creatSpriteText(texts, { fontSize, color });

        labels.forEach((label, index) => {
            label.userData.position = me.origins[index].clone();
            label.matrixWorldNeedsUpdate = false;
            label.onBeforeRender = function (render, scene, camera) {
                me.updataOrigins();

                //更新坐标后的位置
                
                let pos = me._coordSystem.positionToScreen(me.getTextPos(this.userData.text).clone());
                //屏幕的位置
                let textSize = this.userData.size;
                let halfwidth = textSize[0] * 0.5;
                let halfHeight = textSize[1] * 0.5

                let camearDir = new Vector3();
                camera.getWorldDirection(camearDir);
                let isSameDir = zDir.dot(camearDir);

                if (me.textAlign == 'right') {
                    let flag = isSameDir < 0 ? 1 : -1;
                    pos.setX(pos.x + halfwidth * flag);
                    label.position.copy(pos);
                }
                if (me.textAlign == 'left') {
                    let flag = isSameDir < 0 ? -1 : 1;
                    pos.setX(pos.x + halfwidth * flag);
                    label.position.copy(pos);
                }
                if (me.verticalAlign == 'top') {
                    pos.setY(pos.y - halfHeight);
                    label.position.copy(pos);
                }
                if (me.verticalAlign == 'bottom') {
                    pos.setY(pos.y + halfHeight);
                    label.position.copy(pos);
                }

                this.position.copy(pos);
                this.updateMatrixWorld(true);
            }
            me._tickTextGroup.add(label);
        });

    }
    draw() {

        this.group.add(this._tickTextGroup);
    }

    update() {
        //文字需要实时更新
    }
    // getBoundBox() {
    //     //todo 需要重构底层绘图引擎的Sprite的绘制,将Geometry转移到Sprite类中
    //     //没有计算文本旋转后的长度
    //     let result = new Box3();
    //     result.makeEmpty();
    //     this._tickTexts.traverse(function (sprite) {
    //         if (sprite instanceof Sprite) {
    //             let min = new Vector3();
    //             let max = new Vector3();
    //             let halfScale = new Vector3();
    //             halfScale.copy(sprite.scale);
    //             halfScale.multiplyScalar(0.5);
    //             min.copy(sprite.position);
    //             max.copy(sprite.position);

    //             min.sub(halfScale);
    //             max.add(halfScale);

    //             result.expandByPoint(min);
    //             result.expandByPoint(max);
    //         }
    //     });
    //     return result;
    // }
    dispose() {
        let remove = [];
        this.group.traverse((obj) => {
            if (obj.isTextSprite) {
                if (obj.geometry) {
                    obj.geometry.dispose();
                }
                if (obj.material) {
                    obj.material.dispose();
                    if (obj.material.map) {
                        obj.material.map.dispose();
                    }
                }
                remove.push(obj);

            }
        });
        while (remove.length) {
            let obj = remove.pop();
            obj.parent.remove(obj);
        }

    }


}

export { TickTexts };