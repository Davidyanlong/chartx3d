
import {
    Scene,
    OrthographicCamera,
    PerspectiveCamera,
    Vector3,
    Math as _Math

} from "mmgl/src/index"

import { LabelView } from '../constants';

class View {
    constructor(_frameWork, viewName) {

        this._scene = new Scene();
        this._camera = null;

        this.name = viewName || "";

        this._frameWork = _frameWork;
        this.renderer = _frameWork.renderer;

        this.width = 0;
        this.height = 0;

        this.aspect = 1;
        this.fov = 45;
        this.near = 0.1;
        this.far = 10000;
        this.mode = null;

        this.controls = null;

        //todo:相机变化需要派发事件出来

    }

    setSize(width, height) {
        this.width = width;
        this.height = height;
        this.aspect = this.height ? this.width / this.height : 1;
        this.renderer.setPixelRatio(window.devicePixelRatio || 1);
        this.renderer.setSize(width, height);


    }

    setBackground(color) {
        this._scene.background = color;
    }
    setControls(ops) {
        this.controls = ops;
    }


    addObject(obj) {
        this._scene.add(obj);
    }


    removeObject(obj) {

        this._scene.remove(obj);
    }

    //mode: "ortho" || "perspective"    
    project(mode) {
        this.mode = mode;
        let controlsOpts = this.controls;

        let aspect = this.aspect;
        let frustumSize = controlsOpts.boxHeight;
        let distance = controlsOpts.distance;

        if (mode === 'perspective') {
            this._camera = new PerspectiveCamera(this.fov, this.aspect, this.near, this.far);
            //默认绘制的物体是贴近近裁面的,根据近裁面呈现高度为frustumSize的物体需要相机位置
            //let centerPosition = new Vector3(0, 0, (this.far - this.near)/2);


            // let vFOV = _Math.degToRad(this.fov); // convert vertical fov to radians

            // var dist = frustumSize / (2 * Math.tan(vFOV / 2));
            this._camera.position.set(0, 0, distance);



        } else {
            //给定一个大的投影空间,方便数据的计算
            this._camera = new OrthographicCamera(frustumSize * aspect / -2, frustumSize * aspect / 2, frustumSize / 2, frustumSize / - 2, this.near, this.far);
            this._camera.position.set(0, 0, distance);
        }

        // console.info("getVisableSize", this.getVisableSize());

    }

    createScreenProject() {
        let distance = this.controls.maxDistance;
        this._camera = new OrthographicCamera(0, this.width, 0, -this.height, this.near, this.far);
        this._camera.position.set(0, 0, distance);
    }



    getVisableSize(currPosition = new Vector3()) {

        let result = { width: 0, height: 0, ratio: 0 };

        if (this.mode == "ortho") {
            result.width = Math.round(this._camera.right - this._camera.left);
            result.height = Math.round(this._camera.top - this._camera.bottom);

        }

        if (this.mode == "perspective") {

            let cameraPosition = this._camera.position.clone();
            let dist = cameraPosition.distanceTo(currPosition);
            let vFOV = _Math.degToRad(this.fov); // convert vertical fov to radians
            let height = 2 * Math.tan(vFOV / 2) * dist;

            result.width = height * this.aspect;
            result.height = height;


        }
        if (this.width != 0) {
            result.ratio = result.width / this.width;
        }



        return result;

    }

    getObjectScale(object) {
        const objectWorldScale = new Vector3();
        return object.getWorldScale(objectWorldScale);
    }
    resize(_width, _height, frustumSize) {
        this.setSize(_width, _height);

        if (this.mode == 'perspective') {
            this._camera.aspect = this.aspect;
        } else {

            this._camera.left = frustumSize * this.aspect / -2;
            this._camera.right = frustumSize * this.aspect / 2;
            this._camera.top = frustumSize / 2
            this._camera.bottom = frustumSize / - 2;

        }
        //labelView的特殊更新
        if (this.name === LabelView) {

            this._camera.left = 0;
            this._camera.right = this.width;
            this._camera.top = 0
            this._camera.bottom = -this.height;
        }
        this._camera.updateProjectionMatrix();
    }

    dispose() {

        this._scene = null;
        this._camera = null;
        this._frameWork = null;
        this.renderer = null;
    }



}

export { View };