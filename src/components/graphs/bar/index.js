
import { GraphObject, _ } from '../graph';
import { Vector3, MeshBasicMaterial, MeshLambertMaterial, FrontSide, DoubleSide, MeshPhongMaterial, Color, Box3 } from 'mmgl/src/index';

//let renderOrder = 100;
let __mouseover_barEvent = null, __mouseout_barEvent = null, __mousemove_barEvent = null, __click_barEvemt = null
class Bar extends GraphObject {
    constructor(chart3d, opt) {
        super(chart3d);

        this.type = "bar";
        this._type = "bar3d";

        this.node = {
            shapeType: 'cube',  //'cube'立方体  'cylinder'圆柱体  ,'cone'圆锥体 
            materialType: 'phong', //'lambert' 'phong' 'base'  作色方式
            // width: 0,
            // _width: 0,
            // maxWidth: 50,
            // minWidth: 1,
            // minHeight: 0,

            // radius: 3,
            fillStyle: null,
            // fillAlpha: 0.95,
            // _count: 0, //总共有多少个bar
            // xDis: null,
            // filter: null
        };

        this.label = {
            enabled: false,
            animation: true,
            fontColor: null, //如果有设置text.fontColor那么优先使用fontColor
            fontSize: 12,
            format: null,
            lineWidth: 0,
            strokeStyle: null,

            rotation: 0,
            align: "center",  //left center right
            verticalAlign: "bottom", //top middle bottom
            position: "top", //top,topRight,right,rightBottom,bottom,bottomLeft,left,leftTop,center
            offsetX: 0,
            offsetY: 0
        };

        //this.sort = null; //TODO:这个设置有问题，暂时所有sort相关的逻辑都注释掉

        // this._barsLen = 0;

        //this.txtsSp = null;

        this.proportion = false;//比例柱状图，比例图首先肯定是个堆叠图

        this.allGroupNum = 1;
        _.extend(true, this, opt);
        // this.materialMap = new Map();
        this.init();

    }
    init() {
        this.barsGroup = this._root.app.addGroup({ name: 'bars_gruop' });

    }
    dataProcess() {
        super.dataProcess();
        let ceil = this._coordSystem.getCeilSize();
        let boxDepth = ceil.z * 0.7;
        for (let field in this.drawData) {
            let fieldObj = this.drawData[field];
            fieldObj.forEach(item => {
                item.ceil = ceil;
                item.boxWidth = ceil.x / item.hLen * 0.7;
                item.boxHeight = item.pos.y;
                item.boxDepth = boxDepth > item.boxWidth ? item.boxWidth : boxDepth;
            })
        }
    }
    getMaterial(dataOrg) {
        let MaterilBar = null;
        switch (this.node.materialType) {
            case 'phong':
                MaterilBar = MeshPhongMaterial;
                break;
            case 'lambert':
                MaterilBar = MeshLambertMaterial
                break;
            case 'base':
                MaterilBar = MeshBasicMaterial
                break;
            default:
                MaterilBar = MeshPhongMaterial;
        }

        let _color = this._getColor(this.node.fillStyle, dataOrg);
        let material = null;
        //todo 鼠标移动高亮,需要为每个柱子设置单独的材质,后续考虑有没有其他办法减少材质
        // if (!this.materialMap.has(_color)) {
        material = new MaterilBar({
            color: _color,
            transparent: true,
            opacity: 1,
            depthTest: true,
            depthWrite: true,
            side: DoubleSide,
            // polygonOffset: true,
            // polygonOffsetFactor: 1,
            // polygonOffsetUnits: 1.5
        })
        //   this.materialMap.set(_color, material);
        // } else {
        //     material = this.materialMap.get(_color);
        // }


        return material;

    }
    draw() {
        let me = this;
        let app = this._root.app;
        this.dataProcess();
        let scale = 0.9; //每个单元格柱子占用的百分比
        for (let field in this.drawData) {
            let fieldObj = this.drawData[field];
            fieldObj.forEach(item => {
                let span = item.ceil.x / (item.hLen * 2) * scale;
                let step = item.groupIndex * 2 + 1;

                item.fromPos.setX(item.fromPos.x + (span * step - item.ceil.x * 0.5 * scale) - item.boxWidth * 0.5);
                if (this.node.shapeType == 'cylinder' || 'cone' == this.node.shapeType) {

                    item.fromPos.setZ(item.pos.z - item.boxWidth * 0.5);
                } else {
                    item.fromPos.setZ(item.pos.z - item.boxDepth * 0.5);
                }
                let boxHeight = Math.max((item.boxHeight), 0.01);

                let material = me.getMaterial(item);
                let obj = null;
                let boundbox = new Box3();
                let fromPos = item.fromPos.clone();
                if (this.node.shapeType == 'cone') {
                    obj = app.createCone(item.boxWidth, boxHeight, item.boxDepth, material);
                    boundbox.setFromObject(obj);
                    fromPos.x += boundbox.getCenter().x;
                } else if (this.node.shapeType == 'cylinder') {
                    obj = app.createCylinder(item.boxWidth, boxHeight, item.boxDepth, material);
                    boundbox.setFromObject(obj);
                    fromPos.x += boundbox.getCenter().x;
                } else {
                    obj = app.createBox(item.boxWidth, boxHeight, item.boxDepth, material);
                }
                obj.name = Bar._bar_prefix + this.node.shapeType + "_" + item.vInd + "_" + item.iNode
                obj.userData.info = item;
                obj.position.copy(fromPos);
                this.group.add(obj);

            })

        };

        this.bindEvent();

    }

    bindEvent() {
        let me = this;
        __mouseover_barEvent = function (e) {
            //上下文中的this 是bar 对象
            this.userData.color = this.material.color.clone();
            //高亮
            let tempColor = {};
            this.material.color.getHSL(tempColor);
            this.material.setValues({ color: new Color().setHSL(tempColor.h, tempColor.s, tempColor.l + 0.1) });

            me._root.fire({
                type: 'tipShow',
                event: e.event,
                data: this.userData.info
            });

            me.fire({ type: 'barover', data: this.userData.info });
        };
        __mouseout_barEvent = function (e) {
            this.material.setValues({ color: this.userData.color });
            me._root.fire({
                type: 'tipHide',
                event: e.event,
                data: this.userData.info
            });
            me.fire({ type: 'barout', data: this.userData.info });
        };

        __mousemove_barEvent = function (e) {
            me._root.fire({
                type: 'tipMove',
                event: e.event,
                data: this.userData.info
            });
            me.fire({ type: 'barmove', data: this.userData.info });
        }

        __click_barEvemt = function (e) {
            me.fire({ type: 'barclick', data: this.userData.info });
        }

        this.group.traverse(obj => {
            if (obj.name && obj.name.includes(Bar._bar_prefix)) {
                obj.on('mouseover', __mouseover_barEvent);
                obj.on('mouseout', __mouseout_barEvent);

                obj.on('mousemove', __mousemove_barEvent);
                obj.on('click', __click_barEvemt);
            }
        });
    }

    _getColor(c, dataOrg) {
        let field = dataOrg.field.split(',');
        var color = this._coordSystem.getColor(field);
        //field对应的索引，， 取颜色这里不要用i
        if (_.isString(c)) {
            color = c
        };
        if (_.isArray(c)) {
            color = _.flatten(c)[_.indexOf(_flattenField, field)];
        };
        if (_.isFunction(c)) {
            color = c.apply(this, [rectData]);
        };

        return color;
    }
    dispose() {

        //this.materialMap.clear();
        this.group.traverse((obj) => {
            if (obj.name && obj.name.includes(Bar._bar_prefix)) {
                obj.off('click', __click_barEvemt);
                obj.off('mouseover', __mouseover_barEvent);
                obj.off('mouseout', __mouseout_barEvent);
                obj.off('mousemove', __mousemove_barEvent);
            }
        })


        super.dispose();

    }
    resetData() {
        this.dispose();
        this.draw();
    }

}
Bar._bar_prefix = "bar_one_";
export default Bar;

