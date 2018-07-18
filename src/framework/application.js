
import { Framework } from "./framework";
import { View } from "./view";

class Application {

    constructor() {

        this._framework = new Framework();
        this._framework.init();

        //默认值有一个view;
        this.view = [];
        this.view[0] = new View(this._framework);


    }

    render() {

        this._framework.renderFrame();
    }

    createBox(width, height, depth) {

        let box = this.view.createBox(width, height, depth);
        this.view.addObject(box);
    }

}

export { Application };