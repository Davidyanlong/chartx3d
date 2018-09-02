import $ from '../lib/dom';
import _ from '../lib/underscore';
import { parse2MatrixData } from "../utils/tools"
import { Application } from './framework/application';
import { InertialSystem } from './framework/coord/inertial';
import { Component } from './components/Component';
import DataFrame from "../utils/dataframe";


import { Events } from 'mmgl/src/index';
import { OrbitControls } from './framework/OrbitControls';


let _cid = 0;
class Chart3d extends Events {
    constructor(opt) {
        super();


        this.domSelector = opt.el;
        this.opt = opt.opts;
        this.data = opt.data;

        this.el = null;
        this.view = null;
        this.domView = null;
        this.stageView = null;
        this.canvasDom = null;   //画布DOM元素


        this.width = 0;     //画布的宽
        this.height = 0;    //画布的高 

        this.renderer = null;
        this.renderView = null;
        this.app = null;
        this.currCoord = null;



        //初始化画布
        this._createDomContainer(opt.el);

        //初始化数据
        //不管传入的是data = [ ['xfield','yfield'] , ['2016', 111]]
        //还是 data = [ {xfiled, 2016, yfield: 1111} ]，这样的格式，
        //通过parse2MatrixData最终转换的是data = [ ['xfield','yfield'] , ['2016', 111]] 这样 chartx的数据格式
        //后面有些地方比如 一些graphs中会使用dataFrame.org，， 那么这个dataFrame.org和_data的区别是，
        //_data是全量数据， dataFrame.org是_data经过dataZoom运算过后的子集
        this._data = parse2MatrixData(opt.data);

        //三维引擎初始化
        this.app = new Application();


        //初始化渲染器
        this.renderer = this.app._framework.renderer;

        this.DefaultControls = {
            boxWidth: 1000,         //空间中X的最大值(最大宽度)  
            boxHeight: 1000,        //空间中Y的最大值(最大高度)  
            boxDepth: 1000,         //空间中Z的最大值(最大深度)

            distance: 1100,        //默认相机距离
            maxDistance: 3000,     //最大相机距离
            minDistance: 600,      //最小相机距离 
            minZoom: 0.2,           //正交投影缩小的最小值
            maxZoom: 1.5,           //正交投影放大的最大值

            alpha: 40,    //绕X轴旋转
            beta: 20,      //绕Y轴旋转
            gamma: 0      //绕Z轴旋转
        }


        //组件管理机制,所有的组件都绘制在这个地方
        this.components = [];

        this.inited = false;
        this.dataFrame = this._initData(this._data, opt.opts); //每个图表的数据集合 都 存放在dataFrame中。


        this.init();


    }
    init() {
        let me = this;
        let rendererOpts = _.extend({}, this.DefaultControls);
        this.opt.controls = this.opt.controls || {};
        let controlOpts = this.opt.controls = _.extend(rendererOpts, this.opt.controls);

        this._initRenderer(rendererOpts);




        let controls = this.orbitControls = new OrbitControls(this.renderView._camera, this.view);


        controls.minDistance = controlOpts.minDistance;
        controls.maxDistance = controlOpts.maxDistance;

        controls.minZoom = controlOpts.minZoom;
        controls.maxZoom = controlOpts.maxZoom;
        controls.enableDamping = true;
        controls.enablePan = false;
        controls.enableKeys = false;
        controls.autoRotate = true;
        controls.autoRotateSpeed = 1.0

        //自动旋转时间
        window.setTimeout(() => {
            controls.autoRotate = false;
        }, 15000);

        //如果发生交互停止自动旋转
        controls.on('start', () => {
            controls.autoRotate = false
        });
        //有交互开始渲染
        controls.on('change', () => {
            me.app._framework.isUpdate = true;
        });

        this.app._framework.on('renderbefore', () => {
            if (controls.position0.equals(controls.object.position) && controls.zoom0 === controls.object.zoom) {
                return;
            }
            controls.saveState();
            controls.update();

        });

        //启动渲染进程
        this.app.launch();
        window.addEventListener('resize', this.resize.bind(this), false);
    }
    setCoord(_Coord) {

        //初始化物体的惯性坐标(放在具体的坐标系下)
        if (_Coord === InertialSystem || _Coord.prototype instanceof InertialSystem) {
            this.currCoord = new _Coord(this);
            this.rootStage.add(this.currCoord.group);
        }
        this.currCoord.initCoordUI();

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
        //先绘制坐标系
        this.currCoord.draw();

        this.components.forEach(cmp => {
            this.currCoord.group.add(cmp.group);
            cmp.draw();
        })
    }

    draw() {
        this.drawComponent();
        this.app._framework.isUpdate = true;
    }



    _createDomContainer(_domSelector) {

        let viewObj = null;

        this._cid = "chartx3d_" + _cid++;;

        this.el = $.query(_domSelector);

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
        this.el.setAttribute("chartx3d_version", "1.0");
    }

    _initData(data, opt) {

        return DataFrame.call(this, data, opt);
    }

    _initRenderer(rendererOpts) {
        let app = this.app;
        let renderView = null;
        this.stageView.appendChild(this.renderer.domElement);

        this.canvasDom = this.renderer.domElement;

        if (app.view.length > 0) { //默认使用第0个view
            renderView = this.renderView = app.view[0];
        }


        this.rootStage = renderView.addGroup({ name: 'rootStage' });
        renderView.addObject(this.rootStage);
        renderView.setSize(this.width, this.height);
        // renderView.setBackground(0xFFFFFF);

        //默认透视投影
        this.renderView.project(rendererOpts, 'perspective'); //'ortho' | 'perspective',
    }
    resize() {
        this.width = this.el.offsetWidth;
        this.height = this.el.offsetHeight;
        this.renderView.resize(this.width, this.height, this.opt.controls.boxHeight);
    }
    //数据变更后调用reset
    reset() {

    }

    resetData() {

    }
    destroy() {

    }
}

export { Chart3d };

