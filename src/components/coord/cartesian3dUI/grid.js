
import { AxisLine } from './axisLine';
import { Vector3, TextTexture, MeshBasicMaterial, BackSide, FrontSide, Mesh, Math as _Math, PlaneGeometry, DoubleSide, Box3 } from 'mmgl/src/index';
import { TickLines } from './tickLines';
import { Component } from '../../Component';
import _ from '../../../../lib/underscore';
import { numAddSymbol } from '../../../../utils/tools';

class Grid extends Component {
    constructor(_cartesionUI) {
        super(_cartesionUI._coordSystem);


        let opt = this._opt = _cartesionUI;

        // this.width = 0;
        // this.height = 0;

        // this.pos = {
        //     x: 0,
        //     y: 0
        // };

        this._cartesionUI = _cartesionUI;

        this.enabled = 1;

        this.line = {                                //x方向上的线
            enabled: 1,
            lineType: 'solid',                //线条类型(dashed = 虚线 | solid = 实线)
            strokeStyle: '#f0f0f0', //'#e5e5e5',
        };

        this.fill = {
            enabled: true,
            fillStyle: '#ccc',
            alpha: 0.9
        };


        _.extend(true, this, opt.grid);

        this.init();
    }
    init() {
        let me = this;
        this.group = this._root.renderView.addGroup({ name: 'grid' });

        this.leftGroup = this._root.renderView.addGroup({ name: 'leftGroup' });                     //x轴上的线集合
        this.rightGroup = this._root.renderView.addGroup({ name: 'rightGroup' });
        this.topGroup = this._root.renderView.addGroup({ name: 'topGroup' });
        this.bottomGroup = this._root.renderView.addGroup({ name: 'bottomGroup' });
        this.frontGroup = this._root.renderView.addGroup({ name: 'frontGroup' });
        this.backGroup = this._root.renderView.addGroup({ name: 'backGroup' });

        this.group.add(this.leftGroup);
        this.group.add(this.rightGroup);
        this.group.add(this.topGroup);
        this.group.add(this.bottomGroup);
        this.group.add(this.frontGroup);
        this.group.add(this.backGroup);

        this._root.orbitControls.on('change', () => {
            if (!me.enabled) return;
            let _faceInfo = me._cartesionUI.getFaceInfo();
            _.each(_faceInfo, (value, key) => {
                me[key + 'Group'].visible = value.visible;
            })

        })


    }



    drawFace() {
        let me = this;
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
            this.leftFace = me._root.renderView.createPlane(depth, height, undefined, _faceInfo.left, me.leftGroup, this.fill);
            this.rightFace = me._root.renderView.createPlane(depth, height, undefined, _faceInfo.right, me.rightGroup, this.fill);
            this.topFace = me._root.renderView.createPlane(width, depth, undefined, _faceInfo.top, me.topGroup, this.fill);
            this.bottomFace = me._root.renderView.createPlane(width, depth, undefined, _faceInfo.bottom, me.bottomGroup, this.fill);
            this.frontFace = me._root.renderView.createPlane(width, height, undefined, _faceInfo.front, me.frontGroup, this.fill);
            this.backFace = me._root.renderView.createPlane(width, height, undefined, _faceInfo.back, me.backGroup, this.fill);
        }

    }
    drawLine() {
        let me = this;
        const _coordSystem = this._coordSystem;

        let coordBoundBox = _coordSystem.getBoundbox();
        let _size = new Vector3(); //空间盒子的大小
        coordBoundBox.getSize(_size);
        let {
            x: width,
            y: height,
            z: depth
        } = _size;

        if (!me.line.enabled) {
            return;
        }
        //绘制左面的线条
        let LinesVectors = [];
        me._coordSystem.yAxisAttribute.section.forEach(num => {
            let posY = me._coordSystem.getYAxisPosition(num);
            LinesVectors.push(new Vector3(0, posY, 0));
            LinesVectors.push(new Vector3(0, posY, -depth));
        })

        me._coordSystem.zAxisAttribute.section.forEach(num => {
            let posZ = me._coordSystem.getZAxisPosition(num);
            LinesVectors.push(new Vector3(0, 0, -posZ));
            LinesVectors.push(new Vector3(0, height, -posZ));
        })
        let lines = me._root.renderView.createCommonLine(LinesVectors, this.line);
        me.leftGroup.add(lines);

        //绘制右面的线条
        LinesVectors = [];
        me._coordSystem.yAxisAttribute.section.forEach(num => {
            let posY = me._coordSystem.getYAxisPosition(num);
            LinesVectors.push(new Vector3(width, posY, 0));
            LinesVectors.push(new Vector3(width, posY, -depth));
        })

        me._coordSystem.zAxisAttribute.section.forEach(num => {
            let posZ = me._coordSystem.getZAxisPosition(num);
            LinesVectors.push(new Vector3(width, 0, -posZ));
            LinesVectors.push(new Vector3(width, height, -posZ));
        })
        lines = me._root.renderView.createCommonLine(LinesVectors, this.line);
        me.rightGroup.add(lines);

        //绘制上面的线条
        LinesVectors = [];
        me._coordSystem.xAxisAttribute.section.forEach(num => {
            let posX = me._coordSystem.getXAxisPosition(num);
            LinesVectors.push(new Vector3(posX, height, 0));
            LinesVectors.push(new Vector3(posX, height, -depth));
        })

        me._coordSystem.zAxisAttribute.section.forEach(num => {
            let posZ = me._coordSystem.getZAxisPosition(num);
            LinesVectors.push(new Vector3(0, height, -posZ));
            LinesVectors.push(new Vector3(width, height, -posZ));
        })
        lines = me._root.renderView.createCommonLine(LinesVectors, this.line);
        me.topGroup.add(lines);


        //绘制下面的线条
        LinesVectors = [];
        me._coordSystem.xAxisAttribute.section.forEach(num => {
            let posX = me._coordSystem.getXAxisPosition(num);
            LinesVectors.push(new Vector3(posX, 0, 0));
            LinesVectors.push(new Vector3(posX, 0, -depth));
        })

        me._coordSystem.zAxisAttribute.section.forEach(num => {
            let posZ = me._coordSystem.getZAxisPosition(num);
            LinesVectors.push(new Vector3(0, 0, -posZ));
            LinesVectors.push(new Vector3(width, 0, -posZ));
        })
        lines = me._root.renderView.createCommonLine(LinesVectors, this.line);
        me.bottomGroup.add(lines);

        //绘制前面的线条
        LinesVectors = [];
        me._coordSystem.xAxisAttribute.section.forEach(num => {
            let posX = me._coordSystem.getXAxisPosition(num);
            LinesVectors.push(new Vector3(posX, 0, 0));
            LinesVectors.push(new Vector3(posX, height, 0));
        })

        me._coordSystem.yAxisAttribute.section.forEach(num => {
            let posY = me._coordSystem.getYAxisPosition(num);
            LinesVectors.push(new Vector3(0, posY, 0));
            LinesVectors.push(new Vector3(width, posY, 0));
        })

        lines = me._root.renderView.createCommonLine(LinesVectors, this.line);
        me.frontGroup.add(lines);

        //绘制后面的线条
        LinesVectors = [];
        me._coordSystem.xAxisAttribute.section.forEach(num => {
            let posX = me._coordSystem.getXAxisPosition(num);
            LinesVectors.push(new Vector3(posX, 0, -depth));
            LinesVectors.push(new Vector3(posX, height, -depth));
        })

        me._coordSystem.yAxisAttribute.section.forEach(num => {
            let posY = me._coordSystem.getYAxisPosition(num);
            LinesVectors.push(new Vector3(0, posY, -depth));
            LinesVectors.push(new Vector3(width, posY, -depth));
        })
        lines = me._root.renderView.createCommonLine(LinesVectors, this.line);
        me.backGroup.add(lines);

    }

    draw() {
        this.drawFace();
        this.drawLine();
    }

}

export { Grid };

