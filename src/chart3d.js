import $ from '../lib/dom';
import _ from '../lib/underscore';
import { parse2MatrixData } from "../utils/tools"
import { Application } from './framework/application';
import { InertialSystem } from './framework/coord/inertial';
import { Component } from './components/Component';
import DataFrame from "../utils/dataframe";
import { theme } from './theme';


import { Events } from 'mmgl/src/index';
import { OrbitControls } from './framework/OrbitControls';
import { Interaction } from './framework/interaction';
import { Vector3 } from 'mmgl/src/index';


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

        this._theme = theme.colors.slice(0);

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
            autoRotate: true,
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

        this.mainViewName = "main_view";
        this.labelViewName = "label_view";

        this.init();


    }
    init() {
        let me = this;
        let rendererOpts = _.extend({}, this.DefaultControls);
        this.opt.controls = this.opt.controls || {};
        let controlOpts = this.opt.controls = _.extend(rendererOpts, this.opt.controls);

        this._initRenderer(rendererOpts);


        let controls = this.orbitControls = new OrbitControls(this.renderView._camera, this.view);
        let interaction = this.interaction = new Interaction(this.rootStage, this.renderView._camera, this.view);



        controls.minDistance = controlOpts.minDistance;
        controls.maxDistance = controlOpts.maxDistance;

        controls.minZoom = controlOpts.minZoom;
        controls.maxZoom = controlOpts.maxZoom;
        controls.enableDamping = true;
        controls.enablePan = false;
        controls.enableKeys = false;
        controls.autoRotate = controlOpts.autoRotate;
        controls.autoRotateSpeed = 1.0

        //自动旋转时间
        // window.setTimeout(() => {
        //     controls.autoRotate = false;
        // }, 15000);

        //如果发生交互停止自动旋转
        controls.on('start', onStart);
        //有交互开始渲染
        this._onChangeBind = onChange.bind(me);
        controls.on('change', this._onChangeBind);

        this._onRenderBeforeBind = onRenderBefore.bind(controls);
        this.app._framework.on('renderbefore', this._onRenderBeforeBind);

        this._onRenderAfterBind = onRenderAfter.bind(interaction);
        this.app._framework.on('renderafter', this._onRenderAfterBind)

        interaction.on('refresh', this._onChangeBind);

        //同步主相机的位置和方向
        // controls.on('change', (e) => {
        //    this.labelView._camera.position.copy(e.target.object.position);
        //    this.labelView._camera.lookAt(e.target.target);
        // })

        //启动渲染进程
        this.app.launch();
        this._onWindowResizeBind = me.resize.bind(me);
        window.addEventListener('resize', this._onWindowResizeBind, false);

        //绑定tip事件
        this.bindEvent()
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
    addComponent(cmp, opts) {
        //todo 图像是否要分开,目前没有分开共用Component一个基类
        if (cmp.prototype instanceof Component) {

            let instance = new cmp(this, opts);
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

        //test Text

        // let lables = this.labelView.creatSpriteText(["测试label的展示", "第二个标签\n测试回车"]);
        // let pp =  [new Vector3(10, 0, 0), new Vector3(400, 80, 0)];
        // lables.forEach((label,i) => {
        //     let pos = pp[i].clone();
        //     label.position.copy(pos);
        //     this.labelGroup.add(label);
        // });

    }

    getComponent(name) {
        let _cmp = null;
        this.components.forEach(cmp => {
            if (cmp.constructor.name == name) {
                _cmp = cmp;
            }
        })
        return _cmp;
    }

    bindEvent() {


        this.on('tipShow', (e) => {
            let tips = this.getComponent('Tips');
            let { offsetX: x, offsetY: y } = e.event;
            if (tips !== null) {
                tips.show({
                    eventInfo: e.data,
                    pos: {
                        x,
                        y
                    }
                })
            }
        })
        this.on('tipHide', (e) => {

            let tips = this.getComponent('Tips');
            if (tips !== null) {
                tips.hide();
            }
        })


        this.on('tipMove', (e) => {

            let tips = this.getComponent('Tips');
            let { offsetX: x, offsetY: y } = e.event;
            if (tips !== null) {
                tips.show({
                    eventInfo: e.data,
                    pos: {
                        x,
                        y
                    }
                })
            }
        })

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
        let labelView = null;


        //正常绘制的view
        app.createView(this.mainViewName);
        //label 绘制的View
        app.createView(this.labelViewName);

        renderView = this.renderView = app.getView(this.mainViewName);

        labelView = this.labelView = app.getView(this.labelViewName);



        this.rootStage = app.addGroup({ name: 'rootStage' });
        renderView.addObject(this.rootStage);
        renderView.setSize(this.width, this.height);
        renderView.setBackground(0xFFFFFF);

        //默认透视投影
        renderView.setControls(rendererOpts);
        renderView.project('perspective'); //'ortho' | 'perspective',

        //初始化labelView
        this.labelGroup = app.addGroup({ name: 'labelsGroup' });
       
        //Y轴反转
        let _modelMatrix = this.labelGroup.matrix.elements;
        _modelMatrix[1] = - _modelMatrix[1];
        _modelMatrix[5] = - _modelMatrix[5];
        _modelMatrix[9] = - _modelMatrix[9];
        _modelMatrix[13] = - _modelMatrix[13];
        this.labelGroup.matrixAutoUpdate = false;

        labelView.addObject(this.labelGroup);
        labelView.setSize(this.width, this.height);
        //labelView.setBackground("rgba(0,0,0,0)");
        labelView.setControls(rendererOpts);
        //labelView.project('ortho'); //'ortho' | 'perspective',
        labelView.createScreenProject();

        //todo  相机控制同步

        this.stageView.appendChild(this.renderer.domElement);

        this.canvasDom = this.renderer.domElement;

    }
    resize() {
        this.width = this.el.offsetWidth;
        this.height = this.el.offsetHeight;
        this.renderView.resize(this.width, this.height, this.opt.controls.boxHeight);
    }

    //ind 如果有就获取对应索引的具体颜色值
    getTheme(ind) {
        var colors = this._theme;
        if (ind != undefined) {
            return colors[ind % colors.length]
        };
        return colors;
    }

    //数据变更后调用reset
    reset() {

    }

    resetData() {

    }
    dispose() {

        // function clearScene(obj) {
        //     if (obj.isMesh || obj.isLine || obj.isLine2 || obj.isSprite || obj.isTextSprite) {
        //         if (obj.geometry) {
        //             obj.geometry.dispose();
        //             //obj.geometry = null;
        //         }
        //         if (obj.material) {
        //             if (Array.isArray(obj.material)) {
        //                 obj.material.forEach(ma => {
        //                     if (ma.map) {
        //                         ma.map.dispose();
        //                     }
        //                     ma.dispose();
        //                 })
        //             } else {
        //                 if (obj.material.map) {
        //                     obj.material.map.dispose();
        //                 }
        //                 obj.material.dispose();

        //             }

        //             //obj.material = null;
        //         }

        //         obj = null;
        //     }
        //     else if (obj.isLight) {
        //         if (obj.parent) {
        //             // obj.parent.remove(obj);
        //         }
        //     } else {
        //         if (obj.children !== undefined) {
        //             while (obj.children.length > 0) {
        //                 clearScene(obj.children[0]);
        //                 obj.remove(obj.children[0]);
        //             }
        //         }
        //     }
        // }

        // clearScene(this.renderView._scene);

        //先销毁坐标系统
        this.currCoord.dispose();
        //销毁组件
        this.components.forEach(cmp => {
            cmp.dispose();
        })
        //初始化渲染状态
        this.renderer._state.reset();

        //清理渲染数据
        this.renderer.dispose();


        //清理事件
        this.orbitControls.off('start', onStart);
        this.orbitControls.off('change', this._onChangeBind);

        this.app._framework.off('renderbefore', this._onRenderBeforeBind);
        this._onRenderBeforeBind = null;

        this.app._framework.off('renderafter', this._onRenderAfterBind)
        this._onRenderAfterBind = null;

        this.interaction.off('refresh', this._onChangeBind);
        this._onChangeBind = null;

        window.removeEventListener('resize', this._onWindowResizeBind, false);
        this._onWindowResizeBind = null;

        this.interaction.dispose();
        this.orbitControls.dispose();

        this.app.dispose()

        //todo 内存对象清除优化


    }
}


function onStart() {
    this.autoRotate = false
};

function onChange(e) {
    this.app._framework.isUpdate = true;
}

function onRenderBefore() {
    if (this.position0.equals(this.object.position) && this.zoom0 === this.object.zoom) {
        return;
    }
    this.saveState();
    this.update();
}

function onRenderAfter() {
    this.update();
}
export { Chart3d };

