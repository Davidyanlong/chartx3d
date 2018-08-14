
import { Coord3d } from './coord3d';
import { Vector3, Box3, Matrix3, Matrix4 } from 'mmgl/src/index'
import { Decare3dUI } from '../../components/coord/decareUI/index'
import _ from '../../../lib/underscore';
import DataSection from '../../../utils/datasection';


/** note: 
 * 获取所有的配置信息,取去配置中影响布局的相关参数
 * coord{
 *    xAsix{}
 *    yAxis{} 
 *    zAxis{} 
 * }
 * 
 * graphs{}
 * 
 * makeline其他组件
 * 
 * 通过Data和相关的配置,给出各个坐标轴的DataSection,计算出各个轴上数据点对应的位置
 * 
 * ***/

class Decare3d extends Coord3d {
    constructor(root) {
        super(root);
        this._root = root;
        let baseBoundbox = super.getBoundbox();

        //相对与世界坐标的原点位置
        this.origin = baseBoundbox.min;
       // this.center = new Vector3(0, 0, 0);

       
        this.xAxisAttribute = new AxisAttribute();
        this.yAxisAttribute = new AxisAttribute();
        this.zAxisAttribute = new AxisAttribute();

        this._coordUI = null;

        this.init();

    }
    setDefaultOpts(opts) {
        //todo 先那里使用

        var me = this;
        me.coord = {
            xAxis: {
                //波峰波谷布局模型，默认是柱状图的，折线图种需要做覆盖
                layoutType: "rule", //"peak",  
                //默认为false，x轴的计量是否需要取整， 这样 比如某些情况下得柱状图的柱子间隔才均匀。
                //比如一像素间隔的柱状图，如果需要精确的绘制出来每个柱子的间距是1px， 就必须要把这里设置为true
                posParseToInt: false
            }
        };
        
        opts = _.clone(opts);
        if (opts.coord.yAxis) {
            var _nyarr = [];
            //TODO: 因为我们的deep extend 对于数组是整个对象引用过去，所以，这里需要
            //把每个子元素单独clone一遍，恩恩恩， 在canvax中优化extend对于array的处理
            _.each(_.flatten([opts.coord.yAxis]), function (yopt) {
                _nyarr.push(_.clone(yopt));
            });
            opts.coord.yAxis = _nyarr;
        } else {
            opts.coord.yAxis = [];
        }

        //根据opt中得Graphs配置，来设置 coord.yAxis
        if (opts.graphs) {
            //有graphs的就要用找到这个graphs.field来设置coord.yAxis
            for (var i = 0; i < opts.graphs.length; i++) {
                var graphs = opts.graphs[i];
                if (graphs.type == "bar") {
                    //如果graphs里面有柱状图，那么就整个xAxis都强制使用 peak 的layoutType
                    me.coord.xAxis.layoutType = "peak";
                }
                if (graphs.field) {
                    //没有配置field的话就不绘制这个 graphs了
                    var align = "left"; //默认left
                    if (graphs.yAxisAlign == "right") {
                        align = "right";
                    };

                    var optsYaxisObj = null;
                    optsYaxisObj = _.find(opts.coord.yAxis, function (obj, i) {
                        return obj.align == align || (!obj.align && i == (align == "left" ? 0 : 1));
                    });

                    if (!optsYaxisObj) {
                        optsYaxisObj = {
                            align: align,
                            field: []
                        }
                        opts.coord.yAxis.push(optsYaxisObj);
                    } else {
                        if (!optsYaxisObj.align) {
                            optsYaxisObj.align = align;
                        }
                    }

                    if (!optsYaxisObj.field) {
                        optsYaxisObj.field = [];
                    } else {
                        if (!_.isArray(optsYaxisObj.field)) {
                            optsYaxisObj.field = [optsYaxisObj.field];
                        }
                    }

                    if (_.isArray(graphs.field)) {
                        optsYaxisObj.field = optsYaxisObj.field.concat(graphs.field)
                    } else {
                        optsYaxisObj.field.push(graphs.field)
                    }

                } else {
                    //在，直角坐标系中，每个graphs一定要有一个field设置，如果没有，就去掉这个graphs
                    opts.graphs.splice(i--, 1);
                }
            }



        };
        //再梳理一遍yAxis，get没有align的手动配置上align
        //要手动把yAxis 按照 left , right的顺序做次排序
        var _lys = [], _rys = [];
        _.each(opts.coord.yAxis, function (yAxis, i) {
            if (!yAxis.align) {
                yAxis.align = i ? "right" : "left";
            }
            if (yAxis.align == "left") {
                _lys.push(yAxis);
            } else {
                _rys.push(yAxis);
            }
        });
        opts.coord.yAxis = _lys.concat(_rys);


        //todo Z坐标初始化

        if (!opts.coord.zAxis) {
            this.coord.zAxis = {
                field: '',
                depth: 100     //最大深度是1000
            }
        }


        return opts;
    }

    getBoundbox() {
        //笛卡尔坐标的原点默认为左下方
        let boundbox = new Box3();
        let baseBoundbox = super.getBoundbox();

        boundbox.min.set(0, 0, 0);
        boundbox.max.set(baseBoundbox.max.x - this.origin.x,
            baseBoundbox.max.y - this.origin.y,
            baseBoundbox.max.z - this.origin.z,
        )

        return boundbox;

    }

    init() {

        this.group = this._root.renderView.addGroup({ name: 'Decare3d' });
        // let view = this._root.renderView;
        // let camera = view._camera;
        let opt = _.clone(this._root.opt.opts)

        //这个判断不安全
        if (_.isSafeObject(opt, 'coord.xAxis.field')) {
            this.xAxisAttribute.setField(opt.coord.xAxis.field);
            this.xAxisAttribute.setData(this._getAxisDataFrame(opt.coord.xAxis.field))

            if (!_.isSafeObject(opt, 'coord.xAxis.dataSection')) {
                var arr = _.flatten(this.xAxisAttribute.data);
                
                if( this.coord.xAxis.layoutType == "proportion" ){
                    if( arr.length == 1 ){
                    arr.push( 0 );
                    arr.push( arr[0]*2 );
                    };
                    arr = arr.sort(function(a,b){return a-b});
                    arr = DataSection.section(arr)
                };
        

                this.xAxisAttribute.setDataSection(arr);
            }
        }


        //获取axisY
        let yFields = [];
        if (_.isSafeObject(opt, 'coord.yAxis.field')) {
            if(_.isArray(opt.coord.yAxis.field)){
                yFields = yFields.concat(opt.coord.yAxis.field);
            }else{
                yFields.push(opt.coord.yAxis.field);
            }
           
        }

        opt.graphs && opt.graphs.forEach(cp => {
            if(_.isArray(cp.field)){
                yFields = yFields.concat(cp.field);
            }else{
                yFields.push(cp.field);
            }
        })

        yFields = _.uniq(yFields);
        this.yAxisAttribute.setField(yFields);
        let dataOrgY = this._getAxisDataFrame(yFields);
        let _section = this._setDataSection(yFields);


        this.yAxisAttribute.setData(dataOrgY)
        if (!_.isSafeObject(opt, 'coord.yAxis.dataSection')) {
            let joinArr = [];
            if( _.isSafeObject(opt,"coord.yAxis.waterLine") ){
                joinArr.push( opt.coord.yAxis.waterLine );
            }
    
            if( _.isSafeObject(opt,"coord.yAxis.min") ){
                joinArr.push( opt.coord.yAxis.min );
            };
            if( dataOrgY.length == 1 ){
                joinArr.push( dataOrgY[0]*2 );
            };
            
    
                // if( this._opt.baseNumber != undefined ){
                //     arr.push( this.baseNumber );
                // }; 
                // if( this._opt.minNumber != undefined ){
                //     arr.push( this.minNumber );
                // }; 
                // if( this._opt.maxNumber != undefined ){
                //     arr.push( this.maxNumber );
                // }; 
      

            this.yAxisAttribute.computeDataSection(joinArr);
        }


        //变换渲染图层的原点位置
        this.setOrigin(this.origin);

    }


    _setDataSection(yFields)
    {
        //如果有堆叠，比如[ ["uv","pv"], "click" ]
        //那么这个 this.dataOrg， 也是个对应的结构
        //vLen就会等于2
        var vLen = 1;

        _.each( yFields, function( f ){
           // vLen = Math.max( vLen, 1 );
            if( _.isArray( f ) && f.length>1){
                // _.each( f, function( _f ){
                //     vLen = Math.max( vLen, 2 );
                // } );
                vLen=2;
            }
        } );

        if( vLen == 1 ){
            return this._oneDimensional( yFields);
        };
        if( vLen == 2 ){
            return this._twoDimensional( yFields);
        };
        
    }

    _oneDimensional(yFields)
    {
        debugger
        let dataOrg = this._getAxisDataFrame(yFields);
        var arr = _.flatten( dataOrg ); //_.flatten( data.org );

        for( var i = 0, il=arr.length; i<il ; i++ ){
            arr[i] =  arr[i] || 0;
        };

        return arr;
    }

    //二维的yAxis设置，肯定是堆叠的比如柱状图，后续也会做堆叠的折线图， 就是面积图
    _twoDimensional(yFields)
    {
        let d = this._getAxisDataFrame(yFields);
        var arr = [];
        var min;
        _.each( d , function(d, i) {
            if (!d.length) {
                return
            };

            //有数据的情况下 
            if (!_.isArray(d[0])) {
                arr.push(d);
                return;
            };

            var varr = [];
            var len = d[0].length;
            var vLen = d.length;

            for (var i = 0; i < len; i++) {
                var up_count = 0;
                var up_i = 0;

                var down_count = 0;
                var down_i = 0;

                for (var ii = 0; ii < vLen; ii++) {
                    !min && (min = d[ii][i])
                    min = Math.min(min, d[ii][i]);

                    if (d[ii][i] >= 0) {
                        up_count += d[ii][i];
                        up_i++
                    } else {
                        down_count += d[ii][i];
                        down_i++
                    }
                }
                up_i && varr.push(up_count);
                down_i && varr.push(down_count);
            };
            arr.push(varr);
        });
        arr.push(min);
        return _.flatten(arr);
    }

    _getAxisDataFrame(fields) {
        let dataFrame = this._root.dataFrame;
        
        return dataFrame.getDataOrg(fields, function (val) {
            if (val === undefined || val === null || val == "") {
                return val;
            }
            return (isNaN(Number(val)) ? val : Number(val))
        })

    }
    //更新坐标原点
    updateOrigin(offset){
            
        offset.add(this.origin);
        this.setOrigin(offset);
        this.boundbox =  this.getBoundbox();

    }
    setOrigin(pos){
        this.origin.copy(pos);
        this.group.position.copy(pos); 
    }

    //根据世界坐标返回惯性坐标
    _getPos(pos) {

        let transMatrix = new Matrix4();

        transMatrix.makeTranslation(...this.origin.toArray())

        return pos.applyMatrix4(transMatrix);

    }

    initCoordUI() {

        this._coordUI = new Decare3dUI(this);
        this.group.add(this._coordUI.group);

    }

    draw() {
        this._coordUI.draw();
    }

    dataToPoint() {

    }

    boundbox() {

    }
}


class AxisAttribute {
    constructor() {
        this.field = '';
        this.data = null;
        this.section = [];
    }
    setField(val) {
        this.field = val;
    }
    setData(data) {
        this.data = data;
    }
    setDataSection(section) {
        this.section = section;
    }
    computeDataSection(joinArr=[]) {
        joinArr = joinArr.concat(this.data);
        let arr = _.flatten(joinArr);
        for (var i = 0, il = arr.length; i < il; i++) {
            arr[i] = Number(arr[i] || 0);
            if (isNaN(arr[i])) {
                arr.splice(i, 1);
                i--;
                il--;
            }
        };
        this.section = DataSection.section(arr);

    }
}



export { Decare3d };