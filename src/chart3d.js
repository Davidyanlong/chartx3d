import $ from '../lib/dom';
import { parse2MatrixData } from "../utils/tools"
import { Application } from './framework/application';
import { Coord3d } from './framework/coord/coord3d';
import { Component } from './components/Component';
import DataFrame from "../utils/dataframe";

import { Events } from 'mmgl/src/index';


let _cid = 0;
class Chart3d extends Events {
    constructor(opt) {
        super();
        this.el = null;
        this.opt = opt;
        this.view = null;
        this.stageView = null;
        this.domView = null;
        this.canvasDom = null;
        this.width = 0;
        this.height = 0;
        this.renderer = null;
        this.renderView = null;

        this.currCoord = null;



        //初始化画布
        this._createDomContainer(opt);

        //初始化数据
        //不管传入的是data = [ ['xfield','yfield'] , ['2016', 111]]
        //还是 data = [ {xfiled, 2016, yfield: 1111} ]，这样的格式，
        //通过parse2MatrixData最终转换的是data = [ ['xfield','yfield'] , ['2016', 111]] 这样 chartx的数据格式
        //后面有些地方比如 一些graphs中会使用dataFrame.org，， 那么这个dataFrame.org和_data的区别是，
        //_data是全量数据， dataFrame.org是_data经过dataZoom运算过后的子集
        this._data = parse2MatrixData(opt.data);

        //三维引擎初始化
        //初始化渲染器

        //宽高比
        this.aspect = this.height !== 0 ? this.width / this.height : 1;

        //投影空间的全高默认值
        this.frustumSize = 1000;

        this._initRenderer();




        //初始化相机

        //默认正交投影
        this.renderView.project(this.aspect, this.frustumSize, 'or');

        //初始化物体的惯性坐标(放在具体的坐标系下)



        //组件管理机制,所有的组件都绘制在这个地方
        this.components = [];

        this.inited = false;
        this.dataFrame = this._initData(this._data); //每个图表的数据集合 都 存放在dataFrame中。

        this.setCoord(Coord3d);


    }
    init() {
        this.startDraw();
    }
    setCoord(coord) {
        if (coord === Coord3d || coord.prototype instanceof Coord3d) {
            this.currCoord = new coord(this);
            this.rootStage.add(this.currCoord.group);
        }
        this.currCoord.drawCoordUI()


    }
    //添加组件
    addComponent(cmp) {
        let idx = this.components.indexOf(cmp);
        if (idx !== -1) {
            this.components.splice(idx, 1);
        }

        if (cmp.prototype instanceof Component) {

            let instance = new cpm(this.currCoord);
            this.components.push(instance);
        }

    }

    drawComponent() {

        this.components.forEach(cmp => {
            this.currCoord.group.add(cmp.group);
        })
        this.draw();
    }

    startDraw() {
        this.app.render();
    }
    draw() {
        this.app._framework.isUpdate = true;
    }



    _createDomContainer(opt) {

        let viewObj = null;

        this._cid = "chartx3d_" + _cid++;;

        this.el = $.query(opt.el);

        this.width = this.el.offsetWidth;
        this.height = this.el.offsetHeight;

        viewObj = $.createView(this.width, this.height, this._cid);

        this.view = viewObj.view;
        this.stageView = viewObj.stageView;
        this.domView = viewObj.domView;

        this.el.innerHTML = "";
        this.el.appendChild(this.view);


        this.id = "chartx_" + this._cid;
        this.el.setAttribute("chart_id", this.id);
        this.el.setAttribute("chartx_version", "2.0");
    }

    _initData(data) {

        return DataFrame.call(this, data);
    }

    _initRenderer() {
        let app = this.app = new Application();
        this.renderer = app._framework.renderer;

        this.stageView.appendChild(this.renderer.domElement);
        this.canvasDom = this.renderer.domElement;
        let renderView = this.renderView = app.view[0];
        this.rootStage = renderView.addGroup({ name: 'rootStage' });
        renderView.addObject(this.rootStage);
        renderView.setSize(this.width, this.height);
        renderView.setBackground(0xFFFFFF);
    }
    resize() {
        //todo 窗口大小发生变化
    }
    //数据变更后调用reset
    reset() {

    }

    resetData(){
        
    }
}

export { Chart3d };