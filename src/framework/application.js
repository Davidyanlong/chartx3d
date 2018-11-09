
import { Framework } from "./framework";
import { View } from "./view";

class Application {

    constructor() {

        this._framework = new Framework();
        this._framework.init();

    }

    launch() {
        this._framework.renderFrame();
    }

    createView(viewName) {
        let _view = new View(this._framework, viewName);
        this._framework.addView(_view);
    }

    getView(viewName) {
        let target = null;
        this._framework.layers.forEach(view => {
            if (view.name === viewName) {
                target = view;
            }
        });

        return target;
    }
    addGroup(opt) {
        return this._framework.addGroup(opt);
    }


    dispose() {

        this._views.forEach(vw => {
            this._framework.removeView(vw);
            vw.dispose();
        })
        this._framework.stopRenderFrame();
        this._framework.renderer.dispose();
        this._framework.render = null;
    }



}

export { Application };