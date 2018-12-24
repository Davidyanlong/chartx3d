import { GraphObject, _ } from '../graph';
import { Vector3, MeshBasicMaterial, MeshLambertMaterial, FrontSide, DoubleSide, MeshPhongMaterial, Color, CatmullRomCurve3 } from 'mmgl/src/index';

let renderOrder = 100;

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
            strokeStyle: null,
            lineWidth: 2
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
            let points = null;

            let poses = fieldObj.map(item => {
                if (item.vInd > 0) {
                    return new Vector3().copy(item.pos).setY(item.pos.y + item.fromPos.y);
                }
                return item.pos;
            });
            if (this.line.enabled) {
                if (me.line.smooth) {
                    let curve = new CatmullRomCurve3(poses);
                    points = curve.getSpacedPoints(DIVISONS);
                } else {
                    points = poses;
                }


                let line = app.createBrokenLine(points, 2, _color, true);

                this.group.add(line);
            }



            //绘制区域
            if (this.area.enabled) {
                let pointArr = [];
                points.forEach(point => {
                    pointArr = pointArr.concat(point.toArray());
                });
                pointArr.unshift(pointArr[0], 0, pointArr[2]);
                pointArr.push(pointArr[(points.length - 1) * 3], 0, pointArr[(points.length - 1) * 3 + 2]);
                let polygon = app.createPolygonPlane(pointArr, { fillStyle: _color });
                this.group.add(polygon);
            }


            //绘制node 点
            if (this.icon.enabled) {
                poses.forEach(point => {

                    //let node = app.createSphere(10,{fillStyle:_color});
                    let node = app.createCirclePlane(10, { fillStyle: _color });
                    node.position.copy(point);
                    this.group.add(node);
                });
            }



        }
        this.bindEvent();
    }
    bindEvent() {

    }
    resetData() {
        this.dispose();
        this.draw();
    }
}

export default Line;