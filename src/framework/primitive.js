import {
    Math as _Math,
    Vector2,
    Vector3,
    Matrix4,

    Float32BufferAttribute,
    BufferGeometry,

    TrianglesDrawMode,
    DoubleSide,

    Texture,
    Geometry,
    BoxGeometry,
    CylinderGeometry,
    LineGeometry,
    CircleBufferGeometry,
    SphereBufferGeometry,
    DoughnutBufferGeometry,
    DoughnutGeometry,
    Shape,
    ExtrudeBufferGeometry,

    MeshLambertMaterial,
    MeshBasicMaterial,
    MeshPhongMaterial,
    LineMeshMaterial,
    LineBasicMaterial,
    LineDashedMaterial,
    SpriteMaterial,

    Group,
    Mesh,
    Line,
    Line2,
    Sprite,

    Earcut
} from 'mmgl/src/index';

import { _ } from "mmvis/src/index";
import { RenderFont } from './renderFont';

const getBasicMaterial = () => {
    return new MeshBasicMaterial({
    });
}

//基本图元
const primitive = {

    //创建一个box
    createBox(width = 1, height = 1, depth = 1, materials = getBasicMaterial()) {

        // 初期把一个box 看作一个mesh  后期优化在渲染前做顶点合并
        let transMatrix = new Matrix4();
        let geometry = new BoxGeometry(1, 1, 1);

        let mesh = new Mesh(geometry, materials);

        //box 的中心的在正面下边的中点上,方便对box 高度和深度的变化
        geometry.vertices.forEach(vertice => {
            vertice.addScalar(0.5);
            //vertice.z *= -1;
        });
        // geometry.faces.forEach(face => {
        //     let a = face.a;
        //     face.a = face.b;
        //     face.b = a;
        // })
        // geometry.normalsNeedUpdate = true;
        // geometry.computeFaceNormals();

        // //更加给定的得数据变换box
        transMatrix.makeScale(width, height, depth);

        geometry.vertices.forEach(vertice => {
            vertice.applyMatrix4(transMatrix);
        });

        return mesh;
    },
    //创建一个圆柱体
    createCylinder(width = 1, height = 1, depth = 1, materials = getBasicMaterial()) {

        // 初期把一个box 看作一个mesh  后期优化在渲染前做顶点合并
        let transMatrix = new Matrix4();
        //let radius = width * 0.5;
        let part = 60;
        let geometry = new CylinderGeometry(1, 1, 1, part);

        let mesh = new Mesh(geometry, materials);

        //box 的中心的在正面下边的中点上,方便对box 高度和深度的变化
        geometry.vertices.forEach(vertice => {

            vertice.addScalar(0.5);

            //vertice.y -= 0.5;
            //vertice.z *= -1;
        });
        // geometry.faces.forEach(face => {
        //     let a = face.a;
        //     face.a = face.b;
        //     face.b = a;
        // })
        // geometry.normalsNeedUpdate = true;
        // geometry.computeFaceNormals();

        //更加给定的得数据变换box
        let radius = width * 0.5;

        transMatrix.makeScale(radius, height, radius);

        geometry.vertices.forEach(vertice => {
            vertice.applyMatrix4(transMatrix);
        });


        return mesh;


    },
    createCone(width = 1, height = 1, depth = 1, materials = getBasicMaterial()) {

        // 初期把一个box 看作一个mesh  后期优化在渲染前做顶点合并
        let transMatrix = new Matrix4();
        //let radius = width * 0.5;
        let geometry = new CylinderGeometry(0, 1, 1, 60);

        let mesh = new Mesh(geometry, materials);

        //box 的中心的在正面下边的中点上,方便对box 高度和深度的变化

        geometry.vertices.forEach(vertice => {

            vertice.addScalar(0.5);
            //vertice.y -= 0.5;
           // vertice.z *= -1;
        });

        // geometry.faces.forEach(face => {
        //     let a = face.a;
        //     face.a = face.b;
        //     face.b = a;
        // })
        // geometry.normalsNeedUpdate = true;
        // geometry.computeFaceNormals();

        //更加给定的得数据变换box
        let radius = width * 0.5;
        transMatrix.makeScale(radius, height, radius);

        geometry.vertices.forEach(vertice => {
            vertice.applyMatrix4(transMatrix);
        });


        return mesh;


    },

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

    },

    //绘制普通线条
    createCommonLine(points = [], lineStyle) {
        //let group = this._frameWork.addGroup({ name: 'commonLines' });

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
        // group.add(line);

        return line;

    },

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

    },

    //绘制折线
    createBrokenLine(points, lineWidth, lineColor) {
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
            triangleVertices = triangleVertices.concat(point.toArray());
        });
        lineMeshGeometry.setPositions(triangleVertices);
        let line = new Line2(lineMeshGeometry, matLine);
        line.drawMode = TrianglesDrawMode;
        line.computeLineDistances();
        return line;

    },

    //绘制圆形
    createCirclePlane(r, faceStyle, materials) {
        let geometry = new CircleBufferGeometry(r, 32);
        if (!materials) {

            materials = new SpriteMaterial({
                color: faceStyle.fillStyle || 0xffffff * Math.random(),
                transparent: true,
                opacity: faceStyle.alpha || 1,
                depthTest: true,
                depthWrite: false

            });
        }

        let sprite = new Sprite(materials);
        sprite.geometry = geometry;

        return sprite;

    },

    //绘制球
    createSphere(r, faceStyle, materials) {
        if (!materials) {

            materials = new MeshBasicMaterial({
                color: faceStyle.fillStyle || 0xffffff * Math.random(),
                transparent: true,
                opacity: faceStyle.alpha || 1,
                // polygonOffset: true,
                // polygonOffsetFactor: 1,
                // polygonOffsetUnits: 0.1,
                depthTest: true,
                depthWrite: false

            });
        }

        let geometry = new SphereBufferGeometry(r);

        let mesh = new Mesh(geometry, materials);

        return mesh;

    },

    //绘制文字label
    creatSpriteText(texts, fontStyle) {
        //相机变化距离,不改变大小
        //https://vouzamo.wordpress.com/2016/09/07/threejs-heads-up-display/
        //1、透视相机根据距离同时调整自己的缩放
        //2、或者在单独的场景使用正交投影渲染

        let labels = [];

        let renderFont = new RenderFont(fontStyle);

        if (!_.isArray(texts)) {
            texts = [texts];
        }

        let labelInfos = renderFont.drawTexts(texts);

        var position = new Float32Array([
            - 0.5, - 0.5, 0,
            0.5, - 0.5, 0,
            0.5, 0.5, 0,
            - 0.5, 0.5, 0,
        ]);

        let texture = new Texture();
        texture.image = renderFont.canvas;

        // texture.wrapS = RepeatWrapping;
        // texture.wrapT = RepeatWrapping;
        // texture.minFilter = LinearFilter;
        // texture.magFilter = LinearFilter;
        texture.needsUpdate = true;
        let spriteMatrial = new SpriteMaterial({
            map: texture,
            transparent: true,
            depthWrite: false
        });


        texts.forEach((text, index) => {
            let realSize = labelInfos.sizes[text];
            //realSize==[width,height]
            let scale = new Vector3(realSize[0] / realSize[1], 1, 1);
            scale.multiplyScalar(realSize[1]);
            let sprite = new Sprite(spriteMatrial);


            let geometry = new BufferGeometry();
            geometry.setIndex([0, 1, 2, 0, 2, 3]);
            geometry.addAttribute('position', new Float32BufferAttribute(position, 3, false))
            geometry.addAttribute('uv', new Float32BufferAttribute(labelInfos.UVs[text], 2, false));

            sprite.geometry = geometry;
            sprite.scale.copy(scale);
            sprite.userData = {
                text: text,
                size: realSize,
                maxWidth: labelInfos.maxWidth,
                maxHeight: labelInfos.maxHeight
            }

            //默认不进行裁剪
            sprite.frustumCulled = false;
            labels.push(sprite);

        })


        return labels;

    },

    //绘制多边形
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
        let triangles = Earcut.triangulate(points, null, 3);
        let geometry = new BufferGeometry();
        let positionBuffer = new Float32BufferAttribute(points, 3);
        geometry.addAttribute('position', positionBuffer);
        geometry.setIndex(triangles);

        let mesh = new Mesh(geometry, materials);

        return mesh;
    },

    createArea(points = [], depth, faceStyle = {}, materials) {
        if (!materials) {

            materials = new MeshPhongMaterial({
                color: faceStyle.fillStyle || 0xffffff * Math.random(),
                side: DoubleSide,
                transparent: true,
                opacity: faceStyle.alpha || 1.0,
                // polygonOffset: true,
                // polygonOffsetFactor: 1,
                // polygonOffsetUnits: 0.1,
                depthTest: true,
                depthWrite: true

            });
        }

        //earcut(data.vertices, data.holes, data.dimensions);
        // let triangles = earcut(points, null, 3);
        // let geometry = new BufferGeometry();
        // let positionBuffer = new Float32BufferAttribute(points, 3);
        // geometry.addAttribute('position', positionBuffer);
        // geometry.setIndex(triangles);

        let shape = new Shape(points);
        let extrudeSettings = {
            depth: depth || 50,
            bevelEnabled: true,
            bevelSegments: 2,
            steps: 1,
            bevelSize: 1,
            bevelThickness: 10
        };
        let geometry = new ExtrudeBufferGeometry(shape, extrudeSettings)
        let mesh = new Mesh(geometry, materials);

        return mesh;
    },


    //饼图的一个扇形角
    create3DPie(height, outterRadius, innerRadius = 0, startAngle, endAngle, materials) {
        let radialSegments = 32;
        let PI2 = Math.PI * 2;
        //与2D的饼图角度一直,并沿顺时针绘制  

        let _startAngle = _Math.degToRad(startAngle - 90);
        let _endAngle = _Math.degToRad(endAngle - 90);


        if (!materials) {

            materials = new MeshBasicMaterial({
                color: 0xffffff * Math.random(),
                side: DoubleSide,
                transparent: true,
                opacity: 1,
                depthTest: true,
                depthWrite: true
            });
        }
        let geometry = new DoughnutGeometry(outterRadius, height, innerRadius, radialSegments, (PI2 - _startAngle) % PI2, -(_endAngle - _startAngle));

        let mesh = new Mesh(geometry, materials);
        return mesh;

    }



}

export { primitive };