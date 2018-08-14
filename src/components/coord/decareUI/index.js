import { Component } from "../../Component";
import { Vector3 } from "mmgl/src/index";
import { YAxis } from './yAxis';
import { XAxis } from './xAxis';
import { Grid } from './grid';
import _ from '../../../../lib/underscore';

class Decare3dUI extends Component {
    constructor(_coord) {
        super(_coord);

       

        this._xAxis = null;
        this._yAxis = [];

        this._yAxisLeft = null;
        this._yAxisRight = null;

        this._zAxis = null;
        this._grid = null;

        let opt = _coord.coord;



        this.type = "decare3d";

        this.horizontal = false;

        this.xAxis = opt.xAxis || {};
        this.yAxis = opt.yAxis || [];
        this.grid = opt.grid || {};

        _.extend(true, this, opt);

        if (opt.horizontal) {
            this.xAxis.isH = true;
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

            /*
            this.xAxis.enabled = opt.enabled;
            _.each( this.yAxis , function( yAxis ){
                yAxis.enabled = opt.enabled;
            });
            */

            this.grid.enabled = opt.enabled;
        };

        this.init(opt);

    }


    init(opt) {


        this.group = this._root.renderView.addGroup({ name: 'Decare3dUI' });

        this._initModules();
       
        let offset = new Vector3(this._yAxisLeft.width,this._xAxis.height,0);
        this._coord.updateOrigin(offset);
        
        //需要更新坐标系后绘制
        this._yAxisLeft._initModules();

        this._xAxis._initModules();

        //创建好了坐标系统后，设置 _fieldsDisplayMap 的值，
        // _fieldsDisplayMap 的结构里包含每个字段是否在显示状态的enabled 和 这个字段属于哪个yAxis
        //this.fieldsMap = this._setFieldsMap();



        //先绘制Y轴
        // this.axisY = new YAxis(this._coord);
        // let width = this.axisY.getAxisYWidth();



        //this.axisX = new XAxis(this._coord);



        //test
        //let pos = this._coord._getPos(new Vector3(0, 0, 0));
        //console.log("原点位置", pos);

        //let box = this._root.renderView.createBox(100, 100, 100);



        //this.group.add(this.axisY.group);
        // this.group.add(this.axisX.group);

        //this.group.add(box);
    }
    _initModules()
    {
        this._grid = new Grid( this );
        this.group.add( this._grid.group );

        //var _xAxisDataFrame = this._getAxisDataFrame(this.xAxis.field);
        this._xAxis = new XAxis(this);
        this.group.add(this._xAxis.group);

        

        //这里定义的是配置
        var yAxis = this.yAxis;
        var yAxisLeft, yAxisRight;
        var yAxisLeftDataFrame, yAxisRightDataFrame;

        // yAxis 肯定是个数组
        if( !_.isArray( yAxis ) ){
            yAxis = [ yAxis ];
        };

        //left是一定有的
        yAxisLeft = _.find( yAxis , function( ya ){
            return ya.align == "left"
        } );
    
        if( yAxisLeft ){
            //yAxisLeftDataFrame = this._getAxisDataFrame( yAxisLeft.field );
            this._yAxisLeft = new YAxis( this );
            this._yAxisLeft.axis = yAxisLeft;
            this.group.add( this._yAxisLeft.group );
            this._yAxis.push( this._yAxisLeft );
        }

        //后续坐标系如果还受其他组件的影响,继续计算并加入进来

        // yAxisRight = _.find( yAxis , function( ya ){
        //     return ya.align == "right"
        // } );
        // if( yAxisRight ){
        //     yAxisRightDataFrame = this._getAxisDataFrame( yAxisRight.field )
        //     this._yAxisRight = new yAxisConstructor( yAxisRight, yAxisRightDataFrame );
        //     this._yAxisRight.axis = yAxisRight;
        //     this.sprite.addChild( this._yAxisRight.sprite );
        //     this._yAxis.push( this._yAxisRight );
        // };
        
        //todo 更新坐标系

    }
    draw() {
        this._yAxisLeft.draw();
        this._xAxis.draw();
    }
}

export { Decare3dUI };