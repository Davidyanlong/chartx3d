
import { Component, _ } from '../Component';
import { Vector3 } from 'mmgl/src/index';

class TickTexts extends Component {
    constructor(_coordSystem, opts) {
        super(_coordSystem);

        this.name = 'TickTexts';
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
        this.labels = [];
    }


    initData(axis, attribute) {
        let me = this;
        let _offset = this.offset;
        me.origins = [];

        attribute.dataSectionLayout.forEach(item => {
            let val = item.pos;
            let startPoint = axis.dir.clone().multiplyScalar(val);
            startPoint.add(axis.origin);
            startPoint.add(_offset);
            me.origins.push(startPoint);

        });

        me.updataOrigins = this._updataOrigins(axis, attribute)
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

    _updataOrigins(axis, attribute) {
        let _axis = axis;
        let _attribute = attribute;
        return function () {
            this.initData(_axis, _attribute);
        }
    }
    getTextPos(text) {
        let index = _.indexOf(this.texts, text);
        if (index != -1) {
            return this.origins[index];
        }
        return new Vector3();
    }

    drawStart(texts = []) {
        let me = this;
        let app = me._root.app;
        let { fontSize, fontColor: color } = me;
        let zDir = new Vector3(0, 0, -1);
        this.texts = texts || this.texts;
        this.labels = [];
        let labels = app.creatSpriteText(texts, { fontSize, fillStyle: color });

        labels.forEach((label, index) => {
            label.userData.position = me.origins[index].clone();
            label.matrixWorldNeedsUpdate = false;
            label.onBeforeRender = function (render, scene, camera) {
                me.updataOrigins();

                //更新坐标后的位置

                let pos = me._coordSystem.positionToScreen(me.getTextPos(this.userData.text).clone());
                this.userData.pos = pos.clone();
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
            this.labels.push(label);
        });

    }
    draw() {

        this.group.add(this._tickTextGroup);
    }

    update() {
        //文字需要实时更新
    }

    dispose() {
        this.labels = [];
        let remove = [];
        this.group.traverse((obj) => {
            if (obj.isSprite) {
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
    resetData(axis, attribute, texts) {
        this.labels = [];
        this.initData(axis, attribute);
        this.dispose();
        this.drawStart(texts);
        //this.update();
        this.draw();

    }


}

export { TickTexts };