
import { Component, _ } from '../Component';
import { AxisLine } from './axisLine';
import { Vector3, TextTexture, MeshBasicMaterial, BackSide, FrontSide, Mesh, Math as _Math, PlaneGeometry, DoubleSide, Box3 } from 'mmgl/src/index';
import { TickLines } from './tickLines';

import { numAddSymbol } from '../../../utils/tools';

class Grid extends Component {
    constructor(_cartesionUI) {
        super(_cartesionUI._coordSystem);

        this.name = "Grid";
        let opt = this._opt = this._coordSystem.coord.grid;
        this.coord = this._coordSystem.coord;

        this._cartesionUI = _cartesionUI;

        this.enabled = true;

        this.line = {                                //x方向上的线
            enabled: true,
            lineType: 'solid',                //线条类型(dashed = 虚线 | solid = 实线)
            strokeStyle: '#e5e5e5',
        };

        this.fill = {
            enabled: false,
            fillStyle: '#ccc',
            alpha: 0.1
        };


        _.extend(true, this, opt);

        this.init();
    }
    init() {
        let me = this;
        let app = this._root.app;

        this.leftGroup = app.addGroup({ name: 'leftGroup' });                     //x轴上的线集合
        this.rightGroup = app.addGroup({ name: 'rightGroup' });
        this.topGroup = app.addGroup({ name: 'topGroup' });
        this.bottomGroup = app.addGroup({ name: 'bottomGroup' });
        this.frontGroup = app.addGroup({ name: 'frontGroup' });
        this.backGroup = app.addGroup({ name: 'backGroup' });

        this.group.add(this.leftGroup);
        this.group.add(this.rightGroup);
        this.group.add(this.topGroup);
        this.group.add(this.bottomGroup);
        this.group.add(this.frontGroup);
        this.group.add(this.backGroup);

        this.group.renderOrder = -1;


        this._onChangeBind = () => {
            if (!me.enabled) return;
            let _faceInfo = me._cartesionUI.getFaceInfo();
            _.each(_faceInfo, (value, key) => {
                me[key + 'Group'].visible = value.visible;
            })

        };
        this._root.orbitControls.on('change', this._onChangeBind);

        this.width = this._coordSystem.xAxisAttribute.axisLength;
        this.height = this._coordSystem.getYAxis().attr.axisLength;
        this.depth = this._coordSystem.zAxisAttribute.axisLength;


    }



    drawFace() {

        let me = this;
        let app = me._root.app;
        if (!me.enabled) return;
        const _coordSystem = this._coordSystem;
        let _faceInfo = this._cartesionUI.getFaceInfo();


        if (me.fill.enabled) {

            //todo: 多次调用 group可能会重复加入,这里需要销毁以前的数据 reset统一处理吧
            //todo view中构建 materail 通过fill 使用同一份material
            this.leftFace = app.createPlane(this.depth, this.height, undefined, _faceInfo.left, me.leftGroup, this.fill);
            this.rightFace = app.createPlane(this.depth, this.height, undefined, _faceInfo.right, me.rightGroup, this.fill);
            this.topFace = app.createPlane(this.width, this.depth, undefined, _faceInfo.top, me.topGroup, this.fill);
            this.bottomFace = app.createPlane(this.width, this.depth, undefined, _faceInfo.bottom, me.bottomGroup, this.fill);
            this.frontFace = app.createPlane(this.width, this.height, undefined, _faceInfo.front, me.frontGroup, this.fill);
            this.backFace = app.createPlane(this.width, this.height, undefined, _faceInfo.back, me.backGroup, this.fill);
        }

    }
    drawLine() {
        //todo 原生的线条会出现锯齿,需要该用三角面来绘制
        let me = this;
        let app = me._root.app;
        if (!me.enabled) return;

        let xSection = me._coordSystem.xAxisAttribute.dataSectionLayout;
        let yAttribute = me._coordSystem.getYAxis().attr;
        let ySection = yAttribute.dataSectionLayout;
        let zSection = me._coordSystem.zAxisAttribute.dataSectionLayout;

        if (!me.line.enabled) {
            return;
        }
        //绘制左面的线条
        let LinesVectors = [];
        ySection.forEach(item => {
            let posY = item.pos;
            LinesVectors.push(new Vector3(0, posY, 0));
            LinesVectors.push(new Vector3(0, posY, -this.depth));
        })

        zSection.forEach(item => {
            let posZ = item.pos;
            LinesVectors.push(new Vector3(0, 0, -posZ));
            LinesVectors.push(new Vector3(0, this.height, -posZ));
        })
        let lines = app.createCommonLine(LinesVectors, this.line);
        me.leftGroup.add(lines);

        //绘制右面的线条
        LinesVectors = [];
        ySection.forEach(item => {
            let posY = item.pos;
            LinesVectors.push(new Vector3(this.width, posY, 0));
            LinesVectors.push(new Vector3(this.width, posY, -this.depth));
        })

        zSection.forEach(item => {
            let posZ = item.pos;
            LinesVectors.push(new Vector3(this.width, 0, -posZ));
            LinesVectors.push(new Vector3(this.width, this.height, -posZ));
        })
        lines = app.createCommonLine(LinesVectors, this.line);
        me.rightGroup.add(lines);

        //绘制上面的线条
        LinesVectors = [];
        xSection.forEach(item => {
            let posX = item.pos;
            LinesVectors.push(new Vector3(posX, this.height, 0));
            LinesVectors.push(new Vector3(posX, this.height, -this.depth));
        })

        zSection.forEach(item => {
            let posZ = item.pos;
            LinesVectors.push(new Vector3(0, this.height, -posZ));
            LinesVectors.push(new Vector3(this.width, this.height, -posZ));
        })
        lines = app.createCommonLine(LinesVectors, this.line);
        me.topGroup.add(lines);


        //绘制下面的线条
        LinesVectors = [];
        xSection.forEach(item => {
            let posX = item.pos;
            LinesVectors.push(new Vector3(posX, 0, 0));
            LinesVectors.push(new Vector3(posX, 0, -this.depth));
        })

        zSection.forEach(item => {
            let posZ = item.pos;
            LinesVectors.push(new Vector3(0, 0, -posZ));
            LinesVectors.push(new Vector3(this.width, 0, -posZ));
        })
        lines = app.createCommonLine(LinesVectors, this.line);
        me.bottomGroup.add(lines);

        //绘制前面的线条
        LinesVectors = [];
        xSection.forEach(item => {
            let posX = item.pos;
            LinesVectors.push(new Vector3(posX, 0, 0));
            LinesVectors.push(new Vector3(posX, this.height, 0));
        })

        ySection.forEach(item => {
            let posY = item.pos;
            LinesVectors.push(new Vector3(0, posY, 0));
            LinesVectors.push(new Vector3(this.width, posY, 0));
        })

        lines = app.createCommonLine(LinesVectors, this.line);
        me.frontGroup.add(lines);

        //绘制后面的线条
        LinesVectors = [];
        xSection.forEach(item => {
            let posX = item.pos;
            LinesVectors.push(new Vector3(posX, 0, -this.depth));
            LinesVectors.push(new Vector3(posX, this.height, -this.depth));
        })

        ySection.forEach(item => {
            let posY = item.pos;
            LinesVectors.push(new Vector3(0, posY, -this.depth));
            LinesVectors.push(new Vector3(this.width, posY, -this.depth));
        })
        lines = app.createCommonLine(LinesVectors, this.line);
        me.backGroup.add(lines);

    }

    draw() {
        this.drawFace();
        this.drawLine();
    }
    dispose() {
        super.dispose();
        this._root.orbitControls.off('change', this._onChangeBind);
        this._onChangeBind = null;
    }

    resetData() {
        this.dispose();

        this.width = this._coordSystem.xAxisAttribute.axisLength;
        this.height = this._coordSystem.getYAxis().attr.axisLength;
        this.depth = this._coordSystem.zAxisAttribute.axisLength;
        this.draw();
    }

}

export { Grid };

