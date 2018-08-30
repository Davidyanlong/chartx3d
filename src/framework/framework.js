
import { WebGLRenderer ,Events } from "mmgl/src/index"

class Framework extends Events {
    constructor() {
        super();

        this.layers = [];
        this.isUpdate = true;

        this.renderer = null;

    }

    init() {

        this._InitRender();

    }

    _InitRender() {

        //创建渲染器
        try {
            this.renderer = new WebGLRenderer({
                alpha: true,
                depth: true,
                antialias: true,
                premultipliedAlpha: true
            });

        } catch (e) {
            this.view.style.cssText = "display: flex;justify-content: center;align-items:center;font-size:16px;color:#666;width:100%;height:100%;";
            this.view.innerHTML = '很抱歉,您的浏览器不能展示3D图表!'
            console.error(e);
            return;
       }

    }



    render() {

        var redraw = this.isUpdate;
        //this.isUpdate = false;
        this.fire({ type: 'renderbefor' });
        if (redraw) {
            this.layers.forEach(view => {
              
                    this.renderer.render(view._scene, view._camera)
                
            });
        }
    }

    renderFrame() {
        let me = this;
        this.render();
        window.renderFrame(function () {
            me.renderFrame();
        })
    }

    addView(view) {
        this.layers.push(view);
    }

    removeView(view) {

        //todo 移除view 后续需要进行垃圾回收
        var index = this.layers.indexOf(view);
        if (index >= 0) {
            this.layers.splice(index, 1);
        }
    }



}


window.renderFrame = (function () {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (tick, canvas) {
        window.setTimeout(tick, 1000 / 60)
    }
})();

export { Framework };