import { Component, _ } from "../Component";
import { Vector3, Box3 } from "mmgl/src/index";
import { YAxis } from './yAxis';
import { XAxis } from './xAxis';
import { ZAxis } from './zAxis';
import { Grid } from './grid';

class Cartesian3DUI extends Component {
    constructor(_coordSystem) {
        super(_coordSystem);

        //坐标轴实例
        this._xAxis = null;
        this._yAxis = [];

        this._zAxis = null;
        this._grid = null;

        let opt = _coordSystem.coord;

        this.type = "cartesian3d";

        this.horizontal = false;

        //配置信息
        this.xAxis = opt.xAxis || {};
        this.yAxis = opt.yAxis || [];
        this.zAxis = opt.zAxis || {};
        this.grid = opt.grid || {};

        _.extend(true, this, opt);

        if (opt.horizontal) {
            this.xAxis.isH = true;
            this.zAxis.isH = true;
            _.each(this.yAxis, function (yAxis) {
                yAxis.isH = true;
            });
        };


        if ("enabled" in opt) {
            //如果有给直角坐标系做配置display，就直接通知到xAxis，yAxis，grid三个子组件
            _.extend(true, this.xAxis, {
                enabled: opt.enabled
            });
            _.each(this.yAxis, function (yAxis) {
                _.extend(true, yAxis, {
                    enabled: opt.enabled
                });
            });

            _.extend(true, this.zAxis, {
                enabled: opt.enabled
            });

            this.grid.enabled = opt.enabled;
        };

        this.init(opt);

    }


    init(opt) {

        //多个Y轴单独构建一个组
        this.yAxisGroup = this._root.app.addGroup({
            name: 'yAxisGroup'
        });

        this._initModules();

        //todo z轴的宽度没有计算在内
        //todo  是否要计算offset值去更改最终原点的位置
        // let offset = new Vector3(this._yAxisLeft.width, this._xAxis.height, 0);
        //todo 三维空间中不需要考虑原点的移动 
        this._coordSystem.updateOrigin(new Vector3(0, 0, 0));




    }
    _initModules() {
        this._grid = new Grid(this);
        this.group.add(this._grid.group);

        this._xAxis = new XAxis(this);
        this.group.add(this._xAxis.group);


        this._zAxis = new ZAxis(this);
        this.group.add(this._zAxis.group);


        this.yAxis.forEach((opt) => {
            let _yAxis = new YAxis(this, opt)
            this._yAxis.push(_yAxis);
            this.yAxisGroup.add(_yAxis.group);
        });


        this.group.add(this.yAxisGroup);

    }

    draw() {

        // this._yAxisLeft.draw();
        this._yAxis.forEach(_yAxis => {
            _yAxis.draw();
        })
        this._xAxis.draw();
        this._zAxis.draw();
        this._grid.draw();

    }

    getFaceInfo() {
        //todo 待优化
        let _coordSystem = this._coordSystem;
        let coordBoundBox = _coordSystem.getBoundbox();
        let _size = new Vector3(); //空间盒子的大小
        coordBoundBox.getSize(_size);
        let {
            x: width,
            y: height,
            z: depth
        } = _size;

        let lfb = new Vector3(0, 0, 0),            //左前下
            lft = new Vector3(0, height, 0),       //左前上  
            lbb = new Vector3(0, 0, -depth),       //左后下 
            lbt = new Vector3(0, height, -depth),  //左后上

            rfb = new Vector3(width, 0, 0),            //左前下
            rft = new Vector3(width, height, 0),       //左前上  
            rbb = new Vector3(width, 0, -depth),       //左后下 
            rbt = new Vector3(width, height, -depth);  //左后上



        let zDir = new Vector3(0, 0, 1);
        let coordCenter = this._coordSystem._getWorldPos(this._coordSystem.center);
        let cameraPos = coordCenter.clone();
        this._root.renderView._camera.getWorldPosition(cameraPos);

        let result = {
            left: {
                dir: new Vector3(1, 0, 0),     //法线方向
                center: new Box3().setFromPoints([lft, lft, lbb, lbt]).getCenter(),
                visible: cameraPos.clone().cross(zDir).y <= 0
            },
            right: {
                dir: new Vector3(-1, 0, 0),     //法线方向
                center: new Box3().setFromPoints([rft, rft, rbb, rbt]).getCenter(),
                visible: cameraPos.clone().cross(zDir).y > 0
            },
            top: {
                dir: new Vector3(0, -1, 0),     //法线方向
                center: new Box3().setFromPoints([lft, rft, lbt, rbt]).getCenter(),
                visible: cameraPos.clone().cross(zDir).x < 0
            },
            bottom: {
                dir: new Vector3(0, 1, 0),     //法线方向
                center: new Box3().setFromPoints([lfb, rfb, lbb, rbb]).getCenter(),
                visible: cameraPos.clone().cross(zDir).x >= 0
            },
            front: {
                dir: new Vector3(0, 0, -1),
                center: new Box3().setFromPoints([lfb, rfb, rft, lft]).getCenter(),
                visible: cameraPos.dot(zDir) < 0
            },
            back: {
                dir: new Vector3(0, 0, 1),
                center: new Box3().setFromPoints([lbb, rbb, rbt, lbt]).getCenter(),
                visible: cameraPos.dot(zDir) >= 0
            }

        }

        return result;

    }
    dispose() {

        this._yAxis.forEach(_yAxis => {
            _yAxis.dispose();
        })
        this._xAxis.dispose();
        this._zAxis.dispose();
        this._grid.dispose();
    }
    resetData() {
        this._yAxis.forEach(_yAxis => {
            _yAxis.resetData();
        })
         this._xAxis.resetData();
         this._zAxis.resetData();
         this._grid.resetData();
    }

}

export { Cartesian3DUI };