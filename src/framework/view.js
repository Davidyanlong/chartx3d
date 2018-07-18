
import {
    Camera,
    Scene,
    BoxGeometry,
    Mesh,
    MeshBasicMaterial,
    Matrix4,
    Group,
    OrthographicCamera,
    Vector2,
    LineMeshMaterial,
    LineGeometry,
    Line2,
    Vector3,
    TrianglesDrawMode,
    Texture,
    Sprite,
    SpriteMaterial,
    RepeatWrapping

} from "mmgl/src/index"

import _ from "../../lib/underscore";
import { RenderFont } from './renderFont';


class View {
    constructor(_frameWork) {

        this._scene = new Scene();
        this._camera = new Camera();

        this._frameWork = _frameWork;
        this.renderer = _frameWork.renderer;
        _frameWork.addView(this);
        this.width = 0;
        this.height = 0;

    }

    setSize(width, height) {
        this.width = width;
        this.height = height;

        this.renderer.setPixelRatio(window.devicePixelRatio || 1);
        this.renderer.setSize(width, height, true);
    }

    setBackground(color) {

        this._scene.background = color;
    }

    addObject(obj) {

        this._scene.add(obj);

    }

    addGroup(opt) {
        let _group = new Group();
        _group.name = (opt && opt.name) || '';
        return _group;
    }

    removeObject(obj) {

        this._scene.remove(obj);
    }

    //mode: "ortho" || "perspective"    
    project(aspect, frustumSize, mode) {

        //渲染Label的时候使用正交投影,这样相机位置变化了,label大小不变

        if (mode === 'perspective') {

        } else {
            //给定一个大的投影空间,方便数据的计算
            this._camera = new OrthographicCamera(frustumSize * aspect / - 2, frustumSize * aspect / 2, frustumSize / 2, frustumSize / - 2, -1, 10000);
            this._camera.position.set(0, 0, 130);
        }

    }

    //创建一个box
    createBox(width = 1, height = 1, depth = 1, materials = undefined) {



        if (!materials) {
            materials = new MeshBasicMaterial();
        }

        // 初期把一个box 看作一个mesh  后期优化在渲染前做顶点合并
        let transMatrix = new Matrix4();
        let geometry = new BoxGeometry(1, 1, 1);

        let mesh = new Mesh(geometry, materials);

        //box 的中心的在正面下边的中点上,方便对box 高度和深度的变化
        geometry.vertices.forEach(vertice => {
            vertice.addScalar(0.5);
        });

        //更加给定的得数据变换box
        transMatrix.makeScale(width, height, depth);

        geometry.vertices.forEach(vertice => {
            vertice.applyMatrix4(transMatrix);
        });


        return mesh;


    }
    //绘制线条
    createLine(origins, direction, length, lineWidth, lineColor) {

        let group = new Group();
        let lineMeshGeometry = null, line = null;

        direction.normalize()
        let matLine = new LineMeshMaterial({
            color: lineColor,
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
            triangleVertices.push(origin.toArray());

            let endPoint = new Vector3();
            endPoint.copy(origin);
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
            group.add(line);

        })


        return group;

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
        let spriteHeight = 12 * 4;

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




}

export { View };