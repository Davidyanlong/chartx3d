import { Events } from "mmgl/src/index";
import { _ } from 'mmvis/src/index';

//组件的标准
class Component extends Events {
    constructor(_coordSystem) {
        super();

        this._coordSystem = _coordSystem;
        this._root = _coordSystem._root;

        // //每一个组件存放在一个Group中
        // this.group = new Group();
        // this.name = '';
        this.group = this._root.app.addGroup({
            name: this.constructor.name.toLowerCase() + '_root'
        });
    }
    setGroupName(name) {
        this.group.name = name;
    }

    dispose() {
        let removes = [];
        this.group.traverse(obj => {
            if (obj.isMesh || obj.isLine || obj.isLine2 || obj.isSprite) {
                if (obj.geometry) {
                    obj.geometry.dispose();
                }
                if (obj.material) {
                    obj.material.dispose();
                }
                removes.push(obj);
            }
        });
        while (removes.length) {
            let obj = removes.pop();
            if (obj.parent) {
                obj.parent.remove(obj);
            } else {
                obj = null;
            }

        }
    }
    draw() {
        //基类不实现
    }
    resetData(){
        
    }
    //后续组件的公共部分可以提取到这里

}

export { Component, _ };