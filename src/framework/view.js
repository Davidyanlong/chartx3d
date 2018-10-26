
import {
    Camera,
    Scene,
    BoxGeometry,
    BufferGeometry,
    Float32BufferAttribute,
    CylinderGeometry,
    Mesh,
    MeshBasicMaterial,
    MeshLambertMaterial,
    Matrix4,
    Group,
    OrthographicCamera,
    PerspectiveCamera,
    Vector2,
    LineMeshMaterial,
    LineGeometry,
    Line2,
    Vector3,
    TrianglesDrawMode,
    Texture,
    Sprite,
    TextSprite,
    SpriteMaterial,
    RepeatWrapping,
    LinearFilter,
    Math as _Math,
    Color,
    Object3D,
    PlaneGeometry,
    DoubleSide,
    FrontSide,
    Geometry,
    Line,
    LineBasicMaterial,
    LineDashedMaterial


} from "mmgl/src/index"

import _ from "../../lib/underscore";
import { RenderFont } from './renderFont';
import earcut from "earcut";

class View {
    constructor(_frameWork) {

        this._scene = new Scene();
        this._camera = null;

        this._frameWork = _frameWork;
        this.renderer = _frameWork.renderer;
        _frameWork.addView(this);
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

    addObject(obj) {

        this._scene.add(obj);

    }

    addGroup(opt) {
        let _group = new Group();
        // _group.on('removed', function () {
        //     debugger
        //     if (this.geometry) {
        //         this.geometry.dispose();
        //     }
        //     if (this.material) {
        //         this.material.dispose();
        //     }
        // });
        _group.name = (opt && opt.name) || '';
        return _group;
    }

    removeObject(obj) {

        this._scene.remove(obj);
    }

    //mode: "ortho" || "perspective"    
    project(controlsOpts, mode) {
        this.mode = mode;
        this.controls = controlsOpts;

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

    //创建一个box
    createBox(width = 1, height = 1, depth = 1, materials = undefined) {



        if (!materials) {
            materials = new MeshLambertMaterial({
                // depthTest: true,
                // depthWrite: true
            });
        }

        // 初期把一个box 看作一个mesh  后期优化在渲染前做顶点合并
        let transMatrix = new Matrix4();
        let geometry = new BoxGeometry(1, 1, 1);

        let mesh = new Mesh(geometry, materials);

        //box 的中心的在正面下边的中点上,方便对box 高度和深度的变化
        geometry.vertices.forEach(vertice => {
            vertice.addScalar(0.5);
            vertice.z *= -1;
        });

        //更加给定的得数据变换box
        transMatrix.makeScale(width, height, depth);

        geometry.vertices.forEach(vertice => {
            vertice.applyMatrix4(transMatrix);
        });


        return mesh;


    }

    //创建一个圆柱体
    createCylinder(width = 1, height = 1, depth = 1, materials = undefined) {



        if (!materials) {
            materials = new MeshLambertMaterial({
                // depthTest: true,
                // depthWrite: true
            });
        }

        // 初期把一个box 看作一个mesh  后期优化在渲染前做顶点合并
        let transMatrix = new Matrix4();
        //let radius = width * 0.5;
        let geometry = new CylinderGeometry(1, 1, 1, 60);

        let mesh = new Mesh(geometry, materials);

        //box 的中心的在正面下边的中点上,方便对box 高度和深度的变化

        geometry.vertices.forEach(vertice => {

            vertice.addScalar(0.5);
            //vertice.y -= 0.5;
            vertice.z *= -1;
        });

        //更加给定的得数据变换box
        let radius = Math.min(width, width) * 0.5;
        transMatrix.makeScale(radius, height, radius);

        geometry.vertices.forEach(vertice => {
            vertice.applyMatrix4(transMatrix);
        });


        return mesh;


    }
    createCone(width = 1, height = 1, depth = 1, materials = undefined) {



        if (!materials) {
            materials = new MeshLambertMaterial({
                // depthTest: true,
                // depthWrite: true
            });
        }

        // 初期把一个box 看作一个mesh  后期优化在渲染前做顶点合并
        let transMatrix = new Matrix4();
        //let radius = width * 0.5;
        let geometry = new CylinderGeometry(0, 1, 1, 60);

        let mesh = new Mesh(geometry, materials);

        //box 的中心的在正面下边的中点上,方便对box 高度和深度的变化

        geometry.vertices.forEach(vertice => {

            vertice.addScalar(0.5);
            //vertice.y -= 0.5;
            vertice.z *= -1;
        });

        //更加给定的得数据变换box
        let radius = Math.min(width, width) * 0.5;
        transMatrix.makeScale(radius, height, radius);

        geometry.vertices.forEach(vertice => {
            vertice.applyMatrix4(transMatrix);
        });


        return mesh;


    }

    //创建一个面
    createPlane(width = 1, height = 1, materials = undefined, showInfo = {}, group = undefined, faceStyle = {}) {

        if (!materials) {

            materials = new MeshLambertMaterial({
                color: faceStyle.fillStyle || 0xffffff * Math.random(),
                side: FrontSide,
                transparent: true,
                opacity: faceStyle.alpha || 1,
                polygonOffset: true,
                polygonOffsetFactor: 1,
                polygonOffsetUnits: 0.1,
                depthTest: true,
                depthWrite: false

            });
        }

        let planetGeometry = new PlaneGeometry(width, height);
        let planeMesh = new Mesh(planetGeometry, materials);



        if (showInfo.dir.equals(new Vector3(1, 0, 0))) {
            planeMesh.rotateY(_Math.degToRad(90));
        }
        if (showInfo.dir.equals(new Vector3(-1, 0, 0))) {
            planeMesh.rotateY(_Math.degToRad(-90));
        }


        if (showInfo.dir.equals(new Vector3(0, 1, 0))) {
            planeMesh.rotateX(_Math.degToRad(-90));
        }

        if (showInfo.dir.equals(new Vector3(0, -1, 0))) {
            planeMesh.rotateX(_Math.degToRad(90));
        }
        if (showInfo.dir.equals(new Vector3(0, 0, -1))) {
            planeMesh.rotateY(_Math.degToRad(180));
        }

        if (showInfo.center) {
            planeMesh.position.copy(showInfo.center)

        }
        if (group) {
            group.visible = showInfo.visible;
            group.add(planeMesh);
        }
        planeMesh.renderOrder = -100;
        return planeMesh;

    }
    //绘制普通线条
    createCommonLine(points = [], lineStyle) {
        let group = this.addGroup({ name: 'commonLines' });

        let material = new LineBasicMaterial({
            color: lineStyle.strokeStyle,
            // transparent: true,
            depthTest: true,
            depthWrite: false

        });
        if (lineStyle.lineType == 'dashed') {
            material = new LineDashedMaterial({
                color: lineStyle.strokeStyle,
            })
        }


        let geometry = new Geometry();
        points.forEach(item => {
            geometry.vertices.push(item);
        })
        let line = new Line(geometry, material);
        // line.renderOrder=-110;
        group.add(line);

        return group;

    }

    //绘制线条
    createLine(origins, direction, length, lineWidth, lineColor) {

        let group = new Group();
        let lineMeshGeometry = null, line = null;

        direction.normalize()
        let matLine = new LineMeshMaterial({
            color: lineColor,
            transparent: true,
            linewidth: lineWidth, // in pixels
            resolution: new Vector2(this.width, this.height),
            dashed: false
        });

        if (!_.isArray(origins)) {
            origins = [origins];
        }
        let triangleVertices = [];
        origins.forEach(origin => {
            triangleVertices = [];
            triangleVertices.push([0, 0, 0]);

            let endPoint = new Vector3();
            //endPoint.copy([0,0,0]);
            let delta = new Vector3();
            delta.copy(direction);
            delta.multiplyScalar(length);
            endPoint.add(delta);

            triangleVertices.push(endPoint.toArray());
            let lineMeshGeometry = new LineGeometry();

            lineMeshGeometry.setPositions(_.flatten(triangleVertices));

            line = new Line2(lineMeshGeometry, matLine);
            line.drawMode = TrianglesDrawMode;
            line.computeLineDistances();
            line.scale.set(1, 1, 1);
            line.position.copy(origin);
            group.add(line);

        })


        return group;

    }

    //绘制折线(
    createBrokenLine(points, lineWidth, lineColor, isSmooth) {

        let matLine = new LineMeshMaterial({
            color: lineColor,
            linewidth: lineWidth, // in pixels
            resolution: new Vector2(this.width, this.height),
            dashed: false,
            depthTest: true,
            depthWrite: false
        });
        let lineMeshGeometry = new LineGeometry();



        let triangleVertices = [];
        points.forEach(point => {
            triangleVertices.push(point.toArray());
        })

        lineMeshGeometry.setPositions(_.flatten(triangleVertices));
        let line = new Line2(lineMeshGeometry, matLine);
        line.drawMode = TrianglesDrawMode;
        line.computeLineDistances();
        return line;

    }

    creatSpriteText(texts, origins, fontStyle) {
        //相机变化距离,不改变大小
        //https://vouzamo.wordpress.com/2016/09/07/threejs-heads-up-display/
        //1、透视相机根据距离同时调整自己的缩放
        //2、或者在单独的场景使用正交投影渲染

        let textGroup = new Group();

        let renderFont = new RenderFont({
            verticalAlign: 'middle',
            textAlign: 'right'
        });
        let maxWidth = -Infinity;
        let maxHeight = -Infinity;
        //todo  模糊需要解决
        //label高度
        let spriteHeight = 14 * 4;

        fontStyle = {
            enabled: 1,
            fontColor: '#999',
            fontSize: 12,
            format: null,
            rotation: 0,
            marginToLine: 3 //和刻度线的距离
        }
        if (!_.isArray(texts)) {
            texts = [texts];
        }

        if (!_.isArray(origins)) {
            origins = [origins];
        }

        renderFont.setStyle(fontStyle);
        let maxSize = renderFont.drawTexts(texts);

        let size = maxSize; //renderFont.measureText(text);
        let spriteWidth = size.width / size.height * spriteHeight;



        texts.forEach((text, index) => {

            let texture = new Texture();
            texture.image = renderFont.canvas;
            texture.wrapS = RepeatWrapping;
            texture.wrapT = RepeatWrapping;
            texture.minFilter = LinearFilter;
            texture.magFilter = LinearFilter;

            texture.repeat.set(1 / texts.length, 1);
            texture.offset.set(index / texts.length, 0);

            texture.needsUpdate = true;

            let spriteMatrial = new SpriteMaterial({
                map: texture
            });

            let sprite = new Sprite(spriteMatrial);
            sprite.scale.set(spriteWidth, spriteHeight, 1);
            sprite.position.copy(origins[index]);

            textGroup.add(sprite);

        })


        return textGroup;

    }

    createPolygonPlane(points = [], faceStyle = {}, materials) {

        if (!materials) {

            materials = new MeshBasicMaterial({
                color: faceStyle.fillStyle || 0xffffff * Math.random(),
                side: DoubleSide,
                transparent: true,
                opacity: faceStyle.alpha || 0.5,
                // polygonOffset: true,
                // polygonOffsetFactor: 1,
                // polygonOffsetUnits: 0.1,
                depthTest: true,
                depthWrite: false

            });
        }

        //earcut(data.vertices, data.holes, data.dimensions);
        let triangles = earcut(points, null, 3);
        let geometry = new BufferGeometry();
        let positionBuffer = new Float32BufferAttribute(points, 3);
        geometry.addAttribute('position', positionBuffer);
        geometry.setIndex(triangles);

        let mesh = new Mesh(geometry, materials);

        return mesh;
    }

    createTextSprite(text, fontSize, color) {
        let sprite = new TextSprite({
            fontSize: fontSize,
            texture: {  //纹理中需要的文字大小不需要指定,TextSprite会自动计算
                padding: 0,
                text: text,
                fontFamily: 'SimHei, Arial, Helvetica, sans-serif',
            },
            material: {
                color: color || 0x333333,
                transparent: true
            }
        });
        return sprite;
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

            this._camera.left = frustumSize * aspect / -2;
            this._camera.right = frustumSize * aspect / 2;
            this._camera.top = frustumSize / 2
            this._camera.bottom = frustumSize / - 2;

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