import { global } from 'mmvis';
import { Component, _ } from '../../Component';
import { Vector3, MeshBasicMaterial, MeshLambertMaterial, FrontSide, DoubleSide, MeshPhongMaterial, Color, Box3, Math as _Math, CatmullRomCurve3 } from 'mmgl/src/index';

let renderOrder = 0;
class Pie extends Component {
    constructor(chart3d, opt) {
        super(chart3d.currCoord);

        this.name = 'Pie';
        this.type = "pie3d";

        this._type = "pie";

        this.field = null;
        this.sort = null; //默认不排序，可以配置为asc,desc

        //groupField主要是给legend用的， 所有在legend中需要显示的分组数据，都用groupField
        //其他图也都统一， 不要改
        this.groupField = null;
        this.maxHeight = 0;
        this.heightSort = null; //默认不排序，可以配置为asc,desc

        this.offsetRadius = 5;

        this.origin = {
            x: 0,
            y: 0,
            z: 0
        };

        this.node = {
            shapeType: "sector",

            radius: null, //每个扇形单元的半径，也可以配置一个字段，就成了丁格尔玫瑰图
            innerRadius: 0, //扇形的内圆半径
            outRadius: null,//最大外围半径
            minRadius: 10,//outRadius - innerRadius ， 也就是radius的最小值
            moveDis: 30, //要预留moveDis位置来hover sector 的时候外扩
            height: 50,
            fillStyle: null, //this.root.getTheme(),
            focus: {
                enabled: true,
            },
            select: {
                enabled: false,
                radius: 5,
                alpha: 0.7
            }
        };

        this.label = {
            field: null, //默认获取field的值，但是可以单独设置
            enabled: false,
            format: null,
            offset: 10
        };

        this.startAngle = -90;
        this.allAngles = 360;
        this.isInit = true;
        this.init(opt);

    }
    init(opt) {

        _.extend(true, this, opt);

        //计算一下图形的半径
        let attr = this._coordSystem.dataAttribute;
        //根据当前的boundbox,如果用户没有制定半径这里需要计算出来
        this._computerProps();
        attr.setOption(Object.assign({}, this));
        //已经在坐标系中传入构造函数中这里可以不传
        attr.setDataFrame();
        this.textGroup = this._root.app.addGroup({ name: 'pie_texts_gruop' });
        this._root.labelGroup.add(this.textGroup);
    }
    _computerProps() {

        let { x, y, z } = this._coordSystem.getSize();
        //根据配置情况重新修正 outRadius ，innerRadius ------------
        if (!this.node.outRadius) {
            var outRadius = Math.min(x, z) / 2;
            if (this.label.enabled) {
                //要预留moveDis位置来hover sector 的时候外扩
                outRadius -= this.node.moveDis;
            };
            this.node.outRadius = outRadius;
        };
        if (this.node.radius !== null && _.isNumber(this.node.radius)) {
            //如果用户有直接配置 radius，那么radius优先，用来计算
            this.node.radius = Math.max(this.node.radius, this.node.minRadius);
            //this.node.outRadius = this.node.innerRadius + this.node.radius;
            this.node.innerRadius = this.node.outRadius - this.node.radius;
        };

        //要保证sec具有一个最小的radius
        if (this.node.outRadius - this.node.innerRadius < this.node.minRadius) {
            this.node.innerRadius = this.node.outRadius - this.node.minRadius;
        };
        if (this.node.innerRadius < 0) {
            this.node.innerRadius = 0;
        };

        // end --------------------------------------------------
        if (!this.maxHeight) {
            this.maxHeight = y * 0.5;
        }


    }
    draw() {
        let me = this;
        let app = this._root.app;
        let attr = this._coordSystem.dataAttribute;
        let heights = [];


        attr.calculateProps();
        this.data = attr.getLayoutData();

        this.dispose();
        this.dispose(this.textGroup);

        this.data.forEach((item, i) => {
            if (!item.enabled) return;
            //文本格式化
            item.labelText = this._getLabelText(item);

            let material = new MeshPhongMaterial({
                color: item.color,
                transparent: true,
                opacity: 1.0,
                depthTest: true,
                depthWrite: true,
                side: DoubleSide,
                polygonOffset: true,
                polygonOffsetFactor: Math.sin(_Math.degToRad(item.midAngle)),
                polygonOffsetUnits: 1.5
            })
            heights.push(item.height);


            let sector = app.create3DPie(item.height, item.outRadius, item.innerRadius, item.startAngle, item.endAngle, material);

            sector.userData.midAngle = item.midAngle;
            //sector.renderOrder = renderOrder++;
            sector.name = Pie._pie_prefix + item.iNode;
            sector.userData.info = item;

            //如果设置了高度取相应的数据,需要给定一些间距,防止z-fighting,尤其室圆心位置
            if (item.heightField && item.innerRadius == 0) {
                let offset = this.data.length * this.offsetRadius / (2 * Math.PI);
                let x = offset * Math.cos(_Math.degToRad(item.midAngle));
                let z = offset * Math.sin(_Math.degToRad(item.midAngle))
                sector.position.set(x, 0, z);
            }

            this.group.add(sector);

        })
        this.adjustPosition(heights);
        if (this.label.enabled) {
            this._startWidgetLabel();
        };
        this.bindEvent();
    }

    bindEvent() {
        let me = this;

        this.__mouseover = function (e) {
            //上下文中的this 是bar 对象
            this.userData.color = this.material.color.clone();
            //高亮
            let tempColor = {};
            this.material.color.getHSL(tempColor);
            this.material.setValues({ color: new Color().setHSL(tempColor.h, tempColor.s, tempColor.l + 0.05) });

            let _data = this.userData.info;
            me._root.fire({
                type: 'tipShow',
                event: e.event,
                data: { nodes: [_data] }
            });

            me.fire({ type: 'sectorover', data: _data });
        };

        this.__mouseout = function (e) {
            this.material.setValues({ color: this.userData.color });
            let _data = this.userData.info;
            me._root.fire({
                type: 'tipHide',
                event: e.event,
                data: { nodes: [_data] }
            });
            me.fire({ type: 'sectorout', data: _data });
        };

        this.__mousemove = function (e) {
            let _data = this.userData.info;
            me._root.fire({
                type: 'tipMove',
                event: e.event,
                data: { nodes: [_data] }
            });
            me.fire({ type: 'sectormove', data: _data });
        };

        this.__click = function (e) {
            let _data = this.userData.info;

            if (!this.userData.isChecked) {
                this.userData.isChecked = true;
                //移动位置
                let moveDis = _data.moveDis;
                let pos = this.position.clone();
                this.userData.orgPosition = pos;
                let x = moveDis * Math.cos(_Math.degToRad(this.userData.midAngle));
                let z = moveDis * Math.sin(_Math.degToRad(this.userData.midAngle));
                this.position.set(x, pos.y, z)
            } else {
                this.userData.isChecked = false;
                if (this.userData.orgPosition) {
                    this.position.copy(this.userData.orgPosition);
                }
            }

            me.fire({ type: 'sectorclick', data: _data });
        }

        this.group.traverse(sector => {
            if (sector.name && sector.name.includes(Pie._pie_prefix)) {
                sector.on('mouseover', this.__mouseover);
                sector.on('mouseout', this.__mouseout);

                sector.on('mousemove', this.__mousemove);
                sector.on('click', this.__click);
            }
        });
    }


    _getLabelText(itemData) {
        var str;
        if (this.label.enabled) {
            if (this.label.format) {
                if (_.isFunction(this.label.format)) {
                    str = this.label.format(itemData.label, itemData);
                }
            } else {
                var _field = this.label.field || this.groupField
                if (_field) {
                    str = itemData.rowData[_field] + "：" + itemData.percentage + "%"
                } else {
                    str = itemData.percentage + "%"
                }
            }
        }
        return str;
    }



    _startWidgetLabel() {
        var me = this;
        let attr = this._coordSystem.dataAttribute;
        var data = attr.getLayoutData();
        var rMinPercentage = 0,
            lMinPercentage = 0,
            rMinY = 0,
            lMinY = 0;
        var quadrantsOrder = [];

        var quadrantInfo = [
            {
                indexs: [],
                count: 0
            }, {
                indexs: [],
                count: 0
            }, {
                indexs: [],
                count: 0
            }, {
                indexs: [],
                count: 0
            }
        ];

        //默认从top开始画
        var widgetInfo = {
            right: {
                startQuadrant: 4,
                endQuadrant: 1,
                clockwise: true,
                indexs: []
            },
            left: {
                startQuadrant: 3,
                endQuadrant: 2,
                clockwise: false,
                indexs: []
            }
        };

        for (var i = 0; i < data.length; i++) {
            var cur = data[i].quadrant;
            quadrantInfo[cur - 1].indexs.push(i);
            quadrantInfo[cur - 1].count++;
        }

        //1,3象限的绘制顺序需要反转
        if (quadrantInfo[0].count > 1) quadrantInfo[0].indexs.reverse();
        if (quadrantInfo[2].count > 1) quadrantInfo[2].indexs.reverse();

        if (quadrantInfo[0].count > quadrantInfo[3].count) {
            widgetInfo.right.startQuadrant = 1;
            widgetInfo.right.endQuadrant = 4;
            widgetInfo.right.clockwise = false;
        }

        if (quadrantInfo[1].count > quadrantInfo[2].count) {
            widgetInfo.left.startQuadrant = 2;
            widgetInfo.left.endQuadrant = 3;
            widgetInfo.left.clockwise = true;
        }

        widgetInfo.right.indexs = quadrantInfo[widgetInfo.right.startQuadrant - 1].indexs.concat(quadrantInfo[widgetInfo.right.endQuadrant - 1].indexs);
        widgetInfo.left.indexs = quadrantInfo[widgetInfo.left.startQuadrant - 1].indexs.concat(quadrantInfo[widgetInfo.left.endQuadrant - 1].indexs);

        var overflowIndexs, sortedIndexs;

        if (widgetInfo.right.indexs.length > me.textMaxCount) {
            sortedIndexs = widgetInfo.right.indexs.slice(0);
            sortedIndexs.sort(function (a, b) {
                return data[b].y - data[a].y;
            });
            overflowIndexs = sortedIndexs.slice(me.textMaxCount);
            rMinPercentage = data[overflowIndexs[0]].percentage;
            rMinY = data[overflowIndexs[0]].y;
        }
        if (widgetInfo.left.indexs.length > me.textMaxCount) {
            sortedIndexs = widgetInfo.left.indexs.slice(0);
            sortedIndexs.sort(function (a, b) {
                return data[b].y - data[a].y;
            });
            overflowIndexs = sortedIndexs.slice(me.textMaxCount);
            lMinPercentage = data[overflowIndexs[0]].percentage;
            lMinY = data[overflowIndexs[0]].y;
        }

        quadrantsOrder.push(widgetInfo.right.startQuadrant);
        quadrantsOrder.push(widgetInfo.right.endQuadrant);
        quadrantsOrder.push(widgetInfo.left.startQuadrant);
        quadrantsOrder.push(widgetInfo.left.endQuadrant);

        var ySpaceInfo = {}

        for (var i = 0; i < quadrantsOrder.length; i++) {
            var isEnd = i == 1 || i == 3;
            me._widgetLabel(quadrantsOrder[i], quadrantInfo[quadrantsOrder[i] - 1].indexs, lMinY, rMinY, isEnd, ySpaceInfo)
        }
    }

    _widgetLabel(quadrant, indexs, lmin, rmin, isEnd, ySpaceInfo) {
        var me = this;
        var count = 0;
        let attr = this._coordSystem.dataAttribute;
        var data = attr.getLayoutData();
        let labels = [];
        var minTxtDis = 15;
        var textOffsetX = 5;
        let app = this._root.app;

        var currentIndex;
        var preY, currentY, adjustX, txtDis, bwidth, bheight, bx, by;
        var yBound, remainingNum, remainingY;

        var clockwise = quadrant == 2 || quadrant == 4;
        var isleft = quadrant == 2 || quadrant == 3;
        var isup = quadrant == 3 || quadrant == 4;
        var minY = isleft ? lmin : rmin;

        //text的绘制顺序做修正，text的Y值在饼图上半部分（isup）时，Y值越小的先画，反之Y值在饼图下部分时，Y值越大的先画.
        if (indexs.length > 0) {
            indexs.sort(function (a, b) {
                return isup ? data[a].edgey - data[b].edgey : data[b].edgey - data[a].edgey;
            })
        }

        for (var i = 0; i < indexs.length; i++) {
            currentIndex = indexs[i];
            var itemData = data[currentIndex];

            var outCircleRadius = itemData.outRadius + itemData.moveDis;

            //若Y值小于最小值，不画text    
            if (!itemData.enabled || itemData.y < minY || count >= me.textMaxCount) continue
            count++;
            currentY = itemData.edgey;
            adjustX = Math.abs(itemData.edgex);
            txtDis = currentY - preY;

            if (i != 0 && ((Math.abs(txtDis) < minTxtDis) || (isup && txtDis < 0) || (!isup && txtDis > 0))) {
                currentY = isup ? preY + minTxtDis : preY - minTxtDis;
                if (outCircleRadius - Math.abs(currentY) > 0) {
                    adjustX = Math.sqrt(Math.pow(outCircleRadius, 2) - Math.pow(currentY, 2));
                }

                if ((isleft && (-adjustX > itemData.edgex)) || (!isleft && (adjustX < itemData.edgex))) {
                    adjustX = Math.abs(itemData.edgex);
                }
            }

            if (isEnd) {
                yBound = isleft ? ySpaceInfo.left : ySpaceInfo.right;
                remainingNum = indexs.length - i;
                remainingY = isup ? yBound - remainingNum * minTxtDis : yBound + remainingNum * minTxtDis;
                if ((isup && currentY > remainingY) || !isup && currentY < remainingY) {
                    currentY = remainingY;
                }
            }

            preY = currentY;
            if (!isEnd) {
                if (isleft) {
                    ySpaceInfo.left = preY;
                } else {
                    ySpaceInfo.right = preY;
                }
            };

            var currentX = (isleft ? -adjustX - textOffsetX : adjustX + textOffsetX);
            var globalX = currentX + me.origin.x;
            var globalY = currentY + me.origin.y;

            // if (globalX > me._graphs.root.width || globalY < 0 || globalY > me._graphs.root.height) {
            //     return;
            // };
            // var pathStr = "M" + itemData.centerx + "," + itemData.centery;
            // pathStr += "Q" + itemData.outx + "," + itemData.outy + "," + currentX + "," + currentY;

            let DIVISONS = 50;
            let linePoints = [
                new Vector3(itemData.centerx, 0, itemData.centery),
                new Vector3(itemData.outx, 0, itemData.outy),
                new Vector3(currentX, 0, currentY),
            ]


            let curve = new CatmullRomCurve3(linePoints);
            let points = curve.getSpacedPoints(DIVISONS);


            let line = app.createBrokenLine(points, 2, itemData.color, true);

            this.group.add(line);


            let label = app.creatSpriteText(itemData.labelText, { fontSize: 14, fillStyle: itemData.color });
            label[0].userData.position = new Vector3(currentX, 0, currentY);
            label[0].userData.dir = new Vector3(itemData.outx, 0, itemData.outy).sub(new Vector3(itemData.centerx, 0, itemData.centery))
            label[0].userData.dir.normalize();
            labels.push(label[0]);
        }

        labels.forEach((label, index) => {
            label.userData.position = label.userData.position
            label.matrixWorldNeedsUpdate = false;
            label.onBeforeRender = function (render, scene, camera) {
                //     //更新坐标后的位置
                let cross = me._coordSystem.getQuadrantByDir(this.userData.dir.clone());
                let pos = me._coordSystem.positionToScreen(this.userData.position.clone());
                //     //屏幕的位置
                let textSize = this.userData.size;
                let halfwidth = textSize[0] * 0.5;
                let halfHeight = textSize[1] * 0.5

                // let camearDir = new Vector3();
                // camera.getWorldDirection(camearDir);
                // let isSameDir = zDir.dot(camearDir);
                //right
                if (cross.y > 0) {
                    // let flag = isSameDir < 0 ? 1 : -1;
                    pos.setX(pos.x - halfwidth - me.label.offset);
                    // this.position.copy(pos);
                }
                //left
                if (cross.y < 0) {
                    // let flag = isSameDir < 0 ? -1 : 1;
                    pos.setX(pos.x + halfwidth + me.label.offset);
                    // this.position.copy(pos);
                }
                // if (me.verticalAlign == 'top') {
                //     pos.setY(pos.y - halfHeight);
                //     label.position.copy(pos);
                // }
                // if (me.verticalAlign == 'bottom') {
                //     pos.setY(pos.y + halfHeight);
                //     label.position.copy(pos);
                // }

                this.position.copy(pos);
                this.updateMatrixWorld(true);
            }
            this.textGroup.add(label);
        });


    }

    adjustPosition(heights) {

        //判断是否需要调整
        let isAdjust = _.uniq(heights).length > 1;
        if (!isAdjust) return;
        let maxHeight = _.max(heights);
        this.group.traverse(obj => {
            if (obj.isMesh && obj.geometry && (obj.geometry.type === "DoughnutBufferGeometry" || obj.geometry.type === "DoughnutGeometry")) {
                let offset = (maxHeight - obj.geometry.parameters.height) * 0.5;
                obj.position.setY(- offset);

            }
        })
    }
    dispose(group) {
        group = group || this.group;
        group.traverse((sector) => {
            if (sector.name && sector.name.includes(Pie._pie_prefix)) {
                sector.off('mouseover', this.__mouseover);
                sector.off('mouseout', this.__mouseout);

                sector.off('mousemove', this.__mousemove);
                sector.off('click', this.__click);
            }
        })


        super.dispose(group);

    }
    resetData() {
        this.dispose();
        let attr = this._coordSystem.dataAttribute;
        //根据当前的boundbox,如果用户没有制定半径这里需要计算出来
        this._computerProps();
        attr.setOption(Object.assign({}, this));
        //已经在坐标系中传入构造函数中这里可以不传
        attr.setDataFrame();
        this.draw();
    }


}

Pie._pie_prefix = "pie_one_";
global.registerComponent(Pie, 'graphs', 'pie', 3);
export default Pie;