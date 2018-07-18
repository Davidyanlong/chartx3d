import { Events, Group } from "mmgl/src/index";

//组件的标准
class Component extends Events {
    constructor(coord) {
        super();

        this._coord = coord;
        this._root = coord._root;

        // //每一个组件存放在一个Group中
        // this.group = new Group();
        // this.name = '';

    }

    //后续组件的公共部分可以提取到这里

}

export { Component };