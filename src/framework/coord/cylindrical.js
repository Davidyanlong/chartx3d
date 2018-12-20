import { InertialSystem } from "./inertial";
import { Vector3, AmbientLight, DirectionalLight, PointLight, Math as _Math } from "mmgl/src/index";
import { PolarAttribute } from "./model/polarAttribute";
import { _ } from "mmvis/src/index";


/**
 * 柱坐标 Cylindrical Coordinates
 * x=rcosφ
 * z=rsinφ
 * y=y
 */


class Cylindrical extends InertialSystem {
    constructor(root) {
        super(root);

        //这里暂时没有使用到坐标系的相关操作,预留
        //this.height = 0;
        this.r = 0;

        this._coordUI = null;

        this.group.name = 'cylindricalcoordinates';
    }

    setDefaultOpts(opt) {
        var coord = {
            rAxis: {
                field: []
            }
        };

        //根据graphs.field 来 配置 coord.rAxis.field -------------------
        if (!_.isArray(coord.rAxis.field)) {
            coord.rAxis.field = [coord.rAxis.field];
        };
        if (opt.graphs) {
            //有graphs的就要用找到这个graphs.field来设置coord.rAxis
            var arrs = [];
            _.each(opt.graphs, function (graphs) {
                if (graphs.field) {
                    //没有配置field的话就不绘制这个 graphs了
                    var _fs = graphs.field;
                    if (!_.isArray(_fs)) {
                        _fs = [_fs];
                    };
                    arrs = arrs.concat(_fs);
                };
            });
        };
        coord.rAxis.field = coord.rAxis.field.concat(arrs);

        opt.coord = _.extend(true, coord, opt.coord);

        return opt
    }

    init() {
        this.getBoundbox();
        //由于部分配置来自与图形本身,这里暂不传人配置
        this.dataAttribute = new PolarAttribute({}, this._root.dataFrame);
        this.dataAttribute.registTheme(this._root.getTheme.bind(this._root));

        this.addLights();
        this.updatePosition();
    }
    getLegendData() {
        var legendData = [
            //{name: "uv", style: "#ff8533", enabled: true, ind: 0}
        ];

        this.dataAttribute.layoutData.forEach(item => {
            legendData.push(item);
        })
        // _.each( this.graphs, function( _g ){
        //     _.each( _g.getLegendData(), function( item ){

        //         if( _.find( legendData , function( d ){
        //             return d.name == item.name
        //         } ) ) return;

        //         var data = _.extend(true, {}, item);
        //         data.color = item.fillStyle || item.color || item.style;

        //         legendData.push( data )
        //     } );
        // } );
        return legendData;
    }
    getBoundbox() {

        this.boundbox = super.getBoundbox();
        return this.boundbox;
    }

    addLights() {
        //加入灯光

        var ambientlight = new AmbientLight(0xffffff, 0.8); // soft white light

        this._root.rootStage.add(ambientlight);

        let center = this.center.clone();
        center = this._getWorldPos(center);
        //center.setY(0);

        //     let dirLights = [];
        let intensity = 0.5;
        let lightColor = 0xcccccc;
        //     let position = new Vector3(-1, -1, 1);

        //     dirLights[0] = new DirectionalLight(lightColor, intensity);
        //     position.multiplyScalar(10000);
        //     dirLights[0].position.copy(position);
        //     dirLights[0].target.position.copy(center);
        //    // this._root.rootStage.add(dirLights[0]);


        //     dirLights[1] = new DirectionalLight(lightColor, intensity);
        //     position = new Vector3(1, -1, 1);
        //     position.multiplyScalar(10000);
        //     dirLights[1].position.copy(position);
        //     dirLights[1].target.position.copy(center);
        //     this._root.rootStage.add(dirLights[1]);


        //     dirLights[2] = new DirectionalLight(lightColor, intensity);
        //     position = new Vector3(-1, -1, -1);
        //     position.multiplyScalar(10000);
        //     dirLights[2].position.copy(position);
        //     dirLights[2].target.position.copy(center);
        //     this._root.rootStage.add(dirLights[2]);


        //     dirLights[3] = new DirectionalLight(lightColor, intensity);
        //     position = new Vector3(1, -1, -1);
        //     position.multiplyScalar(10000);
        //     dirLights[3].position.copy(position);
        //     dirLights[3].target.position.copy(center);
        //     this._root.rootStage.add(dirLights[3]);




        let pointLight = [];

        pointLight[0] = new PointLight(lightColor, intensity);
        let position = new Vector3(-1, 1, 1);
        position.multiplyScalar(10000);
        pointLight[0].position.copy(position);
        this._root.rootStage.add(pointLight[0]);


        pointLight[1] = new PointLight(lightColor, intensity);
        position = new Vector3(1, 1, 1);
        position.multiplyScalar(10000);
        pointLight[1].position.copy(position);
        this._root.rootStage.add(pointLight[1]);


        pointLight[2] = new PointLight(lightColor, intensity);
        position = new Vector3(-1, 1, -1);
        position.multiplyScalar(10000);
        pointLight[2].position.copy(position);
        this._root.rootStage.add(pointLight[2]);


        pointLight[3] = new PointLight(lightColor, intensity);
        position = new Vector3(1, 1, -1);
        position.multiplyScalar(1000);
        pointLight[3].position.copy(position);
        this._root.rootStage.add(pointLight[3]);

    }
    updatePosition() {

        //更新相机姿态
        let center = this.center.clone();
        center = this._getWorldPos(center);
        let _renderView = this._root.renderView;
        let _camera = _renderView._camera;

        //相机默认的旋转角度
        let dist = _camera.position.distanceTo(center);
        let phi = _Math.degToRad(_renderView.controls.alpha);   //(90-lat)*(Math.PI/180),
        let theta = _Math.degToRad(_renderView.controls.beta);   // (lng+180)*(Math.PI/180),

        let y = dist * Math.sin(phi);
        let temp = dist * Math.cos(phi);
        let x = temp * Math.sin(theta);
        let z = temp * Math.cos(theta);
        //平移实现以中心点为圆心的旋转结果
        let newPos = new Vector3(x, y, z);
        newPos.add(center);
        _camera.position.copy(newPos);
        //相机朝向中心点 
        _camera.lookAt(center);


        //orbite target position
        this._root.orbitControls.target.copy(center);


    }

    getQuadrantByDir(dir) {
        let _renderView = this._root.renderView;
        let _camera = _renderView._camera;
        let dirVectir = new Vector3();
        _camera.getWorldDirection(dirVectir);
        let cross = new Vector3();
        cross.crossVectors(dirVectir, dir);
        return cross;
        console.log("camrea dir:", dirVectir, dir, cross);
    }

    resetData() {
        this.dataAttribute.resetData();

        this.dataAttribute.registTheme(this._root.getTheme.bind(this._root));
        this.dataAttribute.setDataFrame(this._root.dataFrame);
        //UI组件resetData

    }

}

export { Cylindrical };