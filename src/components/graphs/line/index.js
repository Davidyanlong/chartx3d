import { GraphObject, _ } from '../graph';
import { findNearPointX } from "../../../../utils/tools";
import { Vector3, MeshBasicMaterial, MeshLambertMaterial, FrontSide, DoubleSide, MeshPhongMaterial, Color, CatmullRomCurve3 } from 'mmgl/src/index';

let renderOrder = 100;
let __lastPosition = null;
let __mousemove_lineEvent = null, __mouseout_lineEvent = null;
class Line extends GraphObject {
    constructor(chart3d, opt) {
        super(chart3d);

        this.name = 'Line';
        this.type = "line";
        this._type = "line3d";

        this.line = { //线
            enabled: 1,
            shapeType: "brokenLine",//折线
            strokeStyle: null,
            lineWidth: 2,
            lineType: "solid",
            smooth: true
        };

        this.icon = { //节点 
            enabled: 1, //是否有
            shapeType: "circle",
            corner: false, //模式[false || 0 = 都有节点 | true || 1 = 拐角才有节点]
            radius: 3, //半径 icon 圆点的半径
            fillStyle: '#ffffff',
            strokeStyle: null
        };

        this.area = { //填充
            //            shapeType : "path",
            enabled: 1,
            fillStyle: null,
            alpha: 0.3
        };


        _.extend(true, this, opt);
        this.init();

    }
    init() {
        this.lineGroup = this._root.app.addGroup({ name: 'line_lines_gruop' });
        this.areaGroup = this._root.app.addGroup({ name: 'line_areas_gruop' });
        this.nodeGroup = this._root.app.addGroup({ name: 'line_nodes_gruop' });
        this.group.add(this.lineGroup);
        this.group.add(this.areaGroup);
        this.group.add(this.nodeGroup);
    }
    _getColor(c, dataOrg) {

        var color = this._coordSystem.getColor(dataOrg.field);

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
    dataProcess() {
        super.dataProcess();
    }
    draw() {
        let me = this;
        let app = this._root.app;
        this.dataProcess();

        const DIVISONS = 200;
        for (let field in this.drawData) {
            let _color = this._getColor(this.line.strokeStyle, { field: field }) || "red";
            let fieldObj = this.drawData[field];
            let points = null, bottomPoints = [];

            let poses = fieldObj.map(item => {
                if (item.vInd > 0) {
                    bottomPoints.push(item.fromPos);
                    return new Vector3().copy(item.pos).setY(item.pos.y + item.fromPos.y);
                }
                return item.pos;
            });


            if (me.line.smooth) {
                let curve = new CatmullRomCurve3(poses);
                points = curve.getSpacedPoints(DIVISONS);
                if (bottomPoints.length > 0) {
                    let curve2 = new CatmullRomCurve3(bottomPoints);
                    bottomPoints = curve2.getSpacedPoints(DIVISONS);
                }
            } else {
                points = poses;
            }


            let line = app.createBrokenLine(points, this.line.lineWidth, _color, true);
            line.visible = !!this.line.enabled;
            this.lineGroup.add(line);


            //绘制区域
            let pointArr = [];
            points.forEach(point => {
                pointArr = pointArr.concat(point.toArray());
            });
            if (bottomPoints.length > 0) {
                //绘制堆叠区域
                for (let i = bottomPoints.length - 1; i >= 0; i--) {
                    pointArr = pointArr.concat(bottomPoints[i].toArray());
                }
            } else {
                //绘制普通的区域
                pointArr.unshift(pointArr[0], 0, pointArr[2]);
                pointArr.push(pointArr[(points.length - 1) * 3], 0, pointArr[(points.length - 1) * 3 + 2]);
            }

            let polygon = app.createPolygonPlane(pointArr, { fillStyle: _color });
            polygon.userData = fieldObj;
            polygon.visible = !!this.area.enabled;
            this.areaGroup.add(polygon);



            //绘制node 点

            poses.forEach(point => {

                //let node = app.createSphere(10,{fillStyle:_color});
                let node = app.createCirclePlane(10, { fillStyle: _color });
                node.position.copy(point);
                node.visible = !!this.icon.enabled
                this.nodeGroup.add(node);
            });

        }
        this.bindEvent();
    }
    bindEvent() {
        __mousemove_lineEvent = (e) => {
            let currObj = e.intersects[0];
            let target = e.target;
            if (currObj) {
                let pos = currObj.point.clone();
                let locPos = this._coordSystem.group.worldToLocal(pos);
                let positions = target.userData.map(obj => {
                    if (obj.vInd > 0) {
                        return new Vector3().copy(obj.pos).setY(obj.pos.y + obj.fromPos.y)
                    }
                    return obj.pos;
                });

                let currPoint = findNearPointX(positions, locPos);
                let currInfo = _.find(target.userData, item => {
                    let _pos = item.pos.clone();
                    if (item.vInd > 0) {
                        _pos = new Vector3().copy(item.pos).setY(item.pos.y + item.fromPos.y)
                    }
                    return _pos.equals(currPoint);
                })

                if (!__lastPosition || !currPoint.equals(__lastPosition)) {
                    //this._showLabel(currInfo);
                    this._root.fire({
                        type: 'tipShow',
                        event: e.event,
                        data: currInfo
                    })
                    __lastPosition = currPoint;
                    this.fire({ type: 'showLable', data: currInfo });
                }
                this.fire({ type: 'mousemove' })
                // console.log(currPoint);
            }
        };
        __mouseout_lineEvent = (e) => {
            if (this.textTempGroup) {

                // this.textTempGroup.traverse(item => {
                //     item.on('removed', (e) => {
                //         this.fire({ type: 'hideLable', data: e.target.userData });
                //     })
                // })
                // this.dispose(this.textTempGroup);
            }

            this._root.fire({
                type: 'tipHide',
                event: e.event,
                data: null
            })
            this.fire({ type: 'mouseout' });
        }
        this.areaGroup.traverse(obj => {
            obj.on('mousemove', __mousemove_lineEvent);
            obj.on("mouseout", __mouseout_lineEvent);
        })

        this.on('showLable', (e) => {
            this.nodeGroup.traverse(obj => {
                if (obj.userData.isScale) {
                    obj.userData.isScale = false;
                    obj.scale.multiplyScalar(0.5);
                }
                let _pos = e.data.pos.clone();
                if (e.data.vInd > 0) {
                    _pos = new Vector3().copy(e.data.pos).setY(e.data.pos.y + e.data.fromPos.y)
                }
                if (!obj.userData.isScale && obj.position.equals(_pos)) {
                    obj.userData.isScale = true;
                    obj.scale.multiplyScalar(2);
                }
            })
        })
        this.on('mouseout', (e) => {
            this.nodeGroup.traverse(obj => {
                if (obj.userData.isScale) {
                    obj.userData.isScale = false;
                    obj.scale.multiplyScalar(0.5);
                }
            })
        })
    }
    resetData() {
        this.dispose();
        this.draw();
    }
}

export default Line;