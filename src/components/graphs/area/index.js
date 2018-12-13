import { GraphObject, _ } from '../graph';
import { Vector3, MeshBasicMaterial, MeshLambertMaterial, FrontSide, DoubleSide, MeshPhongMaterial, Color, CatmullRomCurve3 } from 'mmgl/src/index';

let renderOrder = 100;
let __lastPosition = null;

class Area extends GraphObject {
    constructor(chart3d, opt) {
        super(chart3d);

        this.type = "area";
        this._type = "area3d";

        this.area = { //填充
            //            shapeType : "path",
            enabled: 1,
            fillStyle: null,
            alpha: 0.3,
            thickness: Infinity,
            smooth: true
        };


        _.extend(true, this, opt);
        this.init();

    }
    init() {
        this.textGroup = this._root.app.addGroup({
            name: 'text_groups'
        });
        this.textTempGroup = this._root.app.addGroup({
            name: 'text_temp_groups'
        });

        this.group.add(this.textGroup);
        this.group.add(this.textTempGroup);

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
        let ceil = this._coordSystem.getCeilSize();

        let boxDepth = ceil.z * 0.7;

        const DIVISONS = 200;
        for (let field in this.drawData) {
            let _color = this._getColor(null, { field: field }) || "red";
            let fieldObj = this.drawData[field];
            let points = null;
            // // //if (this.line.enabled) {
            // //     if (me.line.smooth) {

            let poses = fieldObj.map(item => {
                return item.pos;
            });
            if (this.area.smooth) {
                let curve = new CatmullRomCurve3(poses);
                points = curve.getSpacedPoints(DIVISONS);
            } else {
                points = poses;
            }


            let thickness = Math.max(0.1, Math.min(boxDepth, this.area.thickness));
            //绘制区域
            if (this.area.enabled) {
                points.unshift(points[0].clone().setY(0));
                points.push(points[(points.length - 1)].clone().setY(0));
                let polygon = app.createArea(points, thickness, { fillStyle: _color });

                polygon.name = "polygon_area_" + field;
                polygon.userData = fieldObj;
                let posZ = points[0].z;
                posZ = posZ - thickness * 0.5;

                polygon.position.setZ(posZ);
                this.group.add(polygon);
            }

        }
        me.bindEvent();
    }
    bindEvent() {
        this.group.traverse(obj => {
            if (obj.name && obj.name.includes("polygon_area_")) {
                obj.on('mousemove', (e) => {
                    this.onMouseMove(e);
                });
                obj.on("mouseout", (e) => {
                    this.onMouseOut(e);
                })
            }
        })
    }
    onMouseMove(e) {
        let currObj = e.intersects[0];
        let target = e.target;
        if (currObj) {
            let pos = currObj.point.clone();
            let locPos = this._coordSystem.group.worldToLocal(pos);
            let positions = target.userData.map(obj => {
                return obj.pos;
            });

            let currPoint = this._findPoint(positions, locPos);
            let currInfo = _.find(target.userData, item => {
                return item.pos.equals(currPoint);
            })

            if (!__lastPosition || !currPoint.equals(__lastPosition)) {
                this._showLabel(currInfo);
                this._root.fire({
                    type: 'tipShow',
                    event: e.event,
                    data: currInfo
                })
                __lastPosition = currPoint;
            }

            // console.log(currPoint);
        }
    }
    onMouseOut(e) {
        this.dispose(this.textTempGroup);
        this._root.fire({
            type: 'tipHide',
            event: e.event,
            data: null
        })
    }
    _showLabel(labelInfo) {
        let app = this._root.app;
        let val = labelInfo.value;
        let position = labelInfo.pos;

        let fontStyle = { fontSize: 50, fillStyle: labelInfo.color, strokeStyle: "#ccc", lineWidth: 2, isBold: true };
        let offset = 50;

        //干掉上一个显示
        this.dispose(this.textTempGroup);

        let textObj = app.creatSpriteText(val, fontStyle);
        textObj[0].position.copy(position);
        textObj[0].position.setY(offset + textObj[0].position.y);
        this.textTempGroup.add(textObj[0]);

    }
    _findPoint(points, point) {
        let minDistance = Infinity;
        let result = new Vector3();
        points.forEach(p => {
            let distance = point.distanceTo(p);
            if (minDistance > distance) {
                minDistance = distance;
                result.copy(p);
            }
        })
        return result;

    }
    resetData() {
        this.dispose();
        this.draw();
    }
}

export default Area;