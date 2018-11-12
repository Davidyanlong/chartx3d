
import { Component, _ } from '../Component';
import { AxisLine } from './axisLine';
import { Vector3, TextTexture, MeshBasicMaterial, BackSide, FrontSide, Mesh, Math as _Math, PlaneGeometry, DoubleSide, Box3 } from 'mmgl/src/index';
import { TickLines } from './tickLines';

import { numAddSymbol } from '../../../utils/tools';

class Grid extends Component {
    constructor(_cartesionUI) {
        super(_cartesionUI._coordSystem);


        let opt = this._opt = this._coordSystem.coord.grid;
        this.coord = this._coordSystem.coord;

        // this.width = 0;
        // this.height = 0;

        // this.pos = {
        //     x: 0,
        //     y: 0
        // };

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


    }



    drawFace() {

        let me = this;
        let app = me._root.app;
        if (!me.enabled) return;
        const _coordSystem = this._coordSystem;
        let _faceInfo = this._cartesionUI.getFaceInfo();

        let coordBoundBox = _coordSystem.getBoundbox();
        let _size = new Vector3(); //空间盒子的大小
        coordBoundBox.getSize(_size);
        let {
            x: width,
            y: height,
            z: depth
        } = _size;
        if (me.fill.enabled) {

            //todo: 多次调用 group可能会重复加入,这里需要销毁以前的数据 reset统一处理吧
            //todo view中构建 materail 通过fill 使用同一份material
            this.leftFace = app.createPlane(depth, height, undefined, _faceInfo.left, me.leftGroup, this.fill);
            this.rightFace = app.createPlane(depth, height, undefined, _faceInfo.right, me.rightGroup, this.fill);
            this.topFace = app.createPlane(width, depth, undefined, _faceInfo.top, me.topGroup, this.fill);
            this.bottomFace = app.createPlane(width, depth, undefined, _faceInfo.bottom, me.bottomGroup, this.fill);
            this.frontFace = app.createPlane(width, height, undefined, _faceInfo.front, me.frontGroup, this.fill);
            this.backFace = app.createPlane(width, height, undefined, _faceInfo.back, me.backGroup, this.fill);
        }

    }
    drawLine() {
        //todo 原生的线条会出现锯齿,需要该用三角面来绘制
        let me = this;
        let app = me._root.app;
        if (!me.enabled) return;
        const _coordSystem = this._coordSystem;

        let coordBoundBox = _coordSystem.getBoundbox();
        let _size = new Vector3(); //空间盒子的大小

        coordBoundBox.getSize(_size);
        let {
            x: width,
            y: height,
            z: depth
        } = _size;

        let xSection = me._coordSystem.xAxisAttribute.getSection();
        let yAttribute = me._coordSystem.getYAxis().attr;
        let ySection = yAttribute.getSection();
        let zSection = me._coordSystem.zAxisAttribute.getSection();

        if (!me.line.enabled) {
            return;
        }
        //绘制左面的线条
        let LinesVectors = [];
        ySection.forEach(num => {
            let posY = me._coordSystem.getYAxisPosition(num,yAttribute);
            LinesVectors.push(new Vector3(0, posY, 0));
            LinesVectors.push(new Vector3(0, posY, -depth));
        })

        zSection.forEach(num => {
            let posZ = me._coordSystem.getZAxisPosition(num);
            LinesVectors.push(new Vector3(0, 0, -posZ));
            LinesVectors.push(new Vector3(0, height, -posZ));
        })
        let lines = app.createCommonLine(LinesVectors, this.line);
        me.leftGroup.add(lines);

        //绘制右面的线条
        LinesVectors = [];
        ySection.forEach(num => {
            let posY = me._coordSystem.getYAxisPosition(num,yAttribute);
            LinesVectors.push(new Vector3(width, posY, 0));
            LinesVectors.push(new Vector3(width, posY, -depth));
        })

        zSection.forEach(num => {
            let posZ = me._coordSystem.getZAxisPosition(num);
            LinesVectors.push(new Vector3(width, 0, -posZ));
            LinesVectors.push(new Vector3(width, height, -posZ));
        })
        lines = app.createCommonLine(LinesVectors, this.line);
        me.rightGroup.add(lines);

        //绘制上面的线条
        LinesVectors = [];
        xSection.forEach(num => {
            let posX = me._coordSystem.getXAxisPosition(num);
            LinesVectors.push(new Vector3(posX, height, 0));
            LinesVectors.push(new Vector3(posX, height, -depth));
        })

        zSection.forEach(num => {
            let posZ = me._coordSystem.getZAxisPosition(num);
            LinesVectors.push(new Vector3(0, height, -posZ));
            LinesVectors.push(new Vector3(width, height, -posZ));
        })
        lines = app.createCommonLine(LinesVectors, this.line);
        me.topGroup.add(lines);


        //绘制下面的线条
        LinesVectors = [];
        xSection.forEach(num => {
            let posX = me._coordSystem.getXAxisPosition(num);
            LinesVectors.push(new Vector3(posX, 0, 0));
            LinesVectors.push(new Vector3(posX, 0, -depth));
        })

        zSection.forEach(num => {
            let posZ = me._coordSystem.getZAxisPosition(num);
            LinesVectors.push(new Vector3(0, 0, -posZ));
            LinesVectors.push(new Vector3(width, 0, -posZ));
        })
        lines = app.createCommonLine(LinesVectors, this.line);
        me.bottomGroup.add(lines);

        //绘制前面的线条
        LinesVectors = [];
        xSection.forEach(num => {
            let posX = me._coordSystem.getXAxisPosition(num);
            LinesVectors.push(new Vector3(posX, 0, 0));
            LinesVectors.push(new Vector3(posX, height, 0));
        })

        ySection.forEach(num => {
            let posY = me._coordSystem.getYAxisPosition(num,yAttribute);
            LinesVectors.push(new Vector3(0, posY, 0));
            LinesVectors.push(new Vector3(width, posY, 0));
        })

        lines = app.createCommonLine(LinesVectors, this.line);
        me.frontGroup.add(lines);

        //绘制后面的线条
        LinesVectors = [];
        xSection.forEach(num => {
            let posX = me._coordSystem.getXAxisPosition(num);
            LinesVectors.push(new Vector3(posX, 0, -depth));
            LinesVectors.push(new Vector3(posX, height, -depth));
        })

        ySection.forEach(num => {
            let posY = me._coordSystem.getYAxisPosition(num,yAttribute);
            LinesVectors.push(new Vector3(0, posY, -depth));
            LinesVectors.push(new Vector3(width, posY, -depth));
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

}

export { Grid };

