
import { Framework } from "./framework";
import { View } from "./view";
import { primitive } from './primitive';

class Application {

    constructor(viewWidth, viewHeight) {

        this._framework = new Framework();
        this._framework.init();
        this.width = viewWidth;
        this.height = viewHeight;
    }

    launch() {
        this.resetState();
        this._framework.renderFrame();
    }

    createView(viewName) {
        let _view = new View(this._framework, viewName);
        this._framework.addView(_view);
        return _view;
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

        this._framework.layers.forEach(vw => {
            this._framework.removeView(vw);
            vw.dispose();
        })
        this._framework.stopRenderFrame();
        this._framework.renderer.dispose();
        this._framework.renderer = null;
    }
    resize(width, height, frustumSize) {
        this._framework.layers.forEach(vw => {
            vw.resize(width, height, frustumSize);
        })
    }
    forceRender() {
        this._framework.forceRender();
    }
    resetState(){
        this._framework.reset()
    }


}

Object.assign(Application.prototype, primitive);

export { Application };