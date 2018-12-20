import { Component } from "../Component";
import { Vector3 } from "mmgl/src/index";

class AxisLine extends Component {
    constructor(_coordSystem, opts) {
        super(_coordSystem);

        this.name = "AxisLine";
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
    getOrigin() {
        return this.origin.clone();
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
        this.axis = this._root.app.createLine(this.origin, this.dir, this.length, this.lineWidth, this.color)
    }

    update() {
        let pos = this.getOrigin();
        this.axis.traverse(obj => {
            if (obj.isLine2) {
                obj.position.copy(pos);
            }
        })
    }

    draw() {

        this.group.add(this.axis);

    }
    dispose() {
        let remove = [];
        this.group.traverse((obj) => {
            if (obj.isLine2) {
                if (obj.geometry) {
                    obj.geometry.dispose();
                }
                if (obj.material) {
                    obj.material.dispose();
                }
                remove.push(obj);

            }
        })
        while (remove.length) {
            let obj = remove.pop();
            obj.parent.remove(obj);
        }
    }

    resetData() {
        //dataOrg更改数据轴线暂时不需要更新
    }



}

export { AxisLine };