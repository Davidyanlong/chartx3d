
import { WebGLRenderer, Events, Group } from "mmgl/src/index"

class Framework extends Events {
    constructor() {
        super();

        this.layers = [];
        this.isUpdate = true;
        this.currTick = new Date().getTime();
        this.lastTick = null;
        this.renderer = null;
        this._groups = [];

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
                premultipliedAlpha: true,
                preserveDrawingBuffer: true
            });

            //this.render._sortObjects=false;

        } catch (e) {
            this.view.style.cssText = "display: flex;justify-content: center;align-items:center;font-size:16px;color:#666;width:100%;height:100%;";
            this.view.innerHTML = '很抱歉,您的浏览器不能展示3D图表!'
            console.error(e);
            return;
        }

    }



    render() {

        let redraw = this.isUpdate;

        if (this.lastTick - this.currTick > 1000 * 5) {
            this.isUpdate = false;
        }

        this.fire({ type: 'renderbefore' });
        if (redraw) {

            this.layers.forEach((view,index) => {
                if(this.layers.length>1 && index!==this.layers.length-1){
                    this.renderer.autoClear = true
                }else{
                    this.renderer.autoClear = false;
                }
                // if(this.layers.length>1 && index!==this.layers.length-1){}
                // else{
                    
                    this.renderer.render(view._scene, view._camera)
                //}
               

            });
            this.lastTick = new Date().getTime();
        }
        this.fire({ type: 'renderafter' });
    }

    renderFrame() {
        let me = this;
        this.render();
        this.frameId = window.requestAnimationFrame(function () {
            me.renderFrame();
        })
    }

    stopRenderFrame() {
        window.cancelAnimationFrame(this.frameId);
        this.frameId = null;
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

    addGroup(opt) {
        let _group = new Group();
        _group.on('removed', function () {
            if (this.geometry) {
                this.geometry.dispose();
            }
            if (this.material) {
                this.material.dispose();
            }
        });
        _group.name = (opt && opt.name) || '';
        this._groups.push(_group); //todo 收集起来方便后期处理或查询使用
        return _group;
    }



}




export { Framework };