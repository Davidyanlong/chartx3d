
import { Framework } from "./framework";
import { View } from "./view";

class Application {

    constructor() {

        this._framework = new Framework();
        this._framework.init();

        //默认值有一个view;
        this.view = [];

        this.createView();

    }

    launch() {
        this._framework.renderFrame();
    }

    createView() {
        this.view.push(new View(this._framework))
    }
    dispose() {

        this.view.forEach(vw => {
            this._framework.removeView(vw);
            vw.dispose();
        })
        this._framework.stopRenderFrame();
        this._framework.renderer.dispose();
        this._framework.render = null;
        this.view = [];
    }



}

export { Application };