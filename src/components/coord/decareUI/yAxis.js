
import { AxisLine } from './axisLine';
import { Vector3, Box3, TextTexture } from 'mmgl/src/index';
import { TickLines } from './tickLines';
import { Component } from '../../Component';
import { TickTexts } from './tickTexts';
import _ from '../../../../lib/underscore';
import { numAddSymbol } from '../../../../utils/tools';

class YAxis extends Component {
    constructor(_coord) {
        super(_coord);

        let opt = this._coord;
        this._opt = opt;

        //this._coord = _coord || {};


        this.width = null; //第一次计算后就会有值
        this.yMaxHeight = 0; //y轴最大高
        this.height = 0; //y轴第一条线到原点的高

        this.maxW = 0;    //最大文本的 width
        this.field = [];   //这个 轴 上面的 field 不需要主动配置。可以从graphs中拿

        this.title = {
            content: "",
            shapeType: "text",
            fontColor: '#999',
            fontSize: 12,
            offset: 2,
            textAlign: "center",
            textBaseline: "middle",
            strokeStyle: null,
            lineHeight: 0
        };
        this._title = null; //this.label对应的文本对象

        this.enabled = true;
        this.tickLine = {//刻度线
            enabled: 1,
            lineWidth: 2, //线宽
            lineLength: 4, //线长
            strokeStyle: '#cccccc',
            // distance: 2,
            offset: 0,
        };
        this.axisLine = {//轴线
            enabled: 1,
            lineWidth: 1,
            strokeStyle: '#cccccc'
        };
        this.label = {
            enabled: 1,
            fontColor: '#999',
            fontSize: 12,
            format: null,
            rotation: 0,
            textAlign: "right",
            lineHeight: 1,
            offset: 2     //和刻度线的距离
        };

        if (opt.isH && (!opt.label || opt.label.rotaion === undefined)) {
            //如果是横向直角坐标系图
            this.label.rotation = 90;
        };

        this.pos = {
            x: 0,
            y: 0
        };
        this.align = "left"; //yAxis轴默认是再左边，但是再双轴的情况下，可能会right

        this.layoutData = []; //dataSection 对应的layout数据{y:-100, value:'1000'}
        this.dataSection = []; //从原数据 dataOrg 中 结果 datasection 重新计算后的数据
        this.waterLine = null; //水位data，需要混入 计算 dataSection， 如果有设置waterLineData， dataSection的最高水位不会低于这个值

        //默认的 dataSectionGroup = [ dataSection ], dataSection 其实就是 dataSectionGroup 去重后的一维版本
        this.dataSectionGroup = [];

        //如果middleweight有设置的话 dataSectionGroup 为被middleweight分割出来的n个数组>..[ [0,50 , 100],[100,500,1000] ]
        this.middleweight = null;

        this.dataOrg = data.org || []; //源数据

        this.group = null;

        this.baseNumber = null; //默认为0，如果dataSection最小值小于0，则baseNumber为最小值，如果dataSection最大值大于0，则baseNumber为最大值
        this.basePoint = null; //value为 baseNumber 的point {x,y}
        this.min = null;
        this.max = null; //后面加的，目前还没用

        this._yOriginTrans = 0;//当设置的 baseNumber 和datasection的min不同的时候，


        //过滤器，可以用来过滤哪些yaxis 的 节点是否显示已经颜色之类的
        //@params params包括 dataSection , 索引index，txt(canvax element) ，line(canvax element) 等属性
        this.filter = null; //function(params){}; 

        this.isH = false; //是否横向

        this.animation = false;

        this.sort = null; //"asc" //排序，默认从小到大, desc为从大到小，之所以不设置默认值为asc，是要用null来判断用户是否进行了配置

        this.layoutType = "proportion"; // rule , peak, proportion

        _.extend(true, this, opt);

        this.init(opt, this._coord.yAxisAttribute);

        this._getName();

    }

    init(opt, data) {



        //extend会设置好this.field
        //先要矫正子啊field确保一定是个array
        if (!_.isArray(this.field)) {
            this.field = [this.field];
        };

        this._initData(data);

        this.group = this._root.renderView.addGroup({ name: 'yAxisLeft' });
        // this.rulesGroup = this._root.renderView.addGroup({ name: 'rulesGroup' });
        // this.group.add(this.rulesGroup);

       
    }
    _initModules() {
        //初始化轴线
        const _axisDir = new Vector3(0, 1, 0);
        const _coord = this._coord;
        let coordBoundBox = _coord.getBoundbox();

        this._axisLine = new AxisLine(_coord, this.axisLine);
        this._axisLine.setDir(_axisDir);
        this._axisLine.setOrigin(coordBoundBox.min);
        this._axisLine.setLength(coordBoundBox.max.y);
        this._axisLine.setGroupName('yAxisLine')
        this._axisLine.drawStart();

        this.group.add(this._axisLine.group);


        //初始化tickLine
        const _tickLineDir = new Vector3(-1, 0, 0);
        this._tickLine = new TickLines(_coord, this.tickLine);
        this._tickLine.setDir(_tickLineDir);
        this._tickLine.initData(this._axisLine, _coord.yAxisAttribute);
        this._tickLine.drawStart();

         this.group.add(this._tickLine.group);


        //初始化tickText
        this._tickText = new TickTexts(_coord, this.label);
        this._tickText.offset += this.axisLine.lineWidth + this.tickLine.lineWidth + this.tickLine.offset+this._maxTextWidth/2;
       
        this._tickText.setDir(_tickLineDir);
        this._tickText.initData(this._axisLine, _coord.yAxisAttribute);
        this._tickText.drawStart(this._formatTextSection);
        this.group.add(this._tickText.group);


    }
    _getName() {

    }
    _initData(data) {
        var me = this;


        //如果用户传入了自定义的dataSection， 那么优先级最高
        if (!this._opt.dataSection) {

            this.dataSection = data.section;
        } else {
            this.dataSection = this._opt.dataSection;
        };

        //如果还是0
        if (this.dataSection.length == 0) {
            this.dataSection = [0]
        };

        // if( _.min(this.dataSection) < this._opt.min ){
        //     var minDiss = me._opt.min - _.min(me.dataSection);
        //     //如果用户有硬性要求min，而且计算出来的dataSection还是比min小的话
        //     _.each( this.dataSection, function( num, i ){
        //         me.dataSection[i] += minDiss;
        //     } );
        // };

        //如果有 middleweight 设置，就会重新设置dataSectionGroup
        this.dataSectionGroup = [_.clone(this.dataSection)];

        // this._sort();
        // this._setBottomAndBaseNumber();

        // this._middleweight(); //如果有middleweight配置，需要根据配置来重新矫正下datasection

        me._formatTextSection = [];
        me._textElements = [];
        _.each(me.dataSection, function (val, i) {
            me._formatTextSection[i] = me._getFormatText(val, i);
            //从_formatTextSection中取出对应的格式化后的文本

            // var txt = me._root.renderView.createTextSprite("" + me._formatTextSection[i], me.label.fontSize,me.label.fontColor)

            // // var txt = new Canvax.Display.Text(me._formatTextSection[i], {
            // //     context: {
            // //         fontSize: me.label.fontSize
            // //     }
            // // });

            // me._textElements[i] = txt;
        });

        if (this.label.rotation != 0) {
            //如果是旋转的文本，那么以右边为旋转中心点
            this.label.textAlign = "right";
        };

        //取第一个数据来判断xaxis的刻度值类型是否为 number
        !("minVal" in this._opt) && (this.minVal = _.min(this.dataSection));
        if (isNaN(this.minVal) || this.minVal == Infinity) {
            this.minVal = 0;
        };
        !("maxVal" in this._opt) && (this.maxVal = _.max(this.dataSection));
        if (isNaN(this.maxVal) || this.maxVal == Infinity) {
            this.maxVal = 1;
        };

        this._getName();

        this._setYAxisWidth();


    }

    _getFormatText(val, i) {
        var res;
        if (_.isFunction(this.label.format)) {
            res = this.label.format.apply(this, arguments);
        } else {
            res = val
        }

        if (_.isArray(res)) {
            res = numAddSymbol(res);
        }
        if (!res) {
            res = val;
        };
        return res;
    }

    //设置布局
    setLayout(opt) {

    }

    draw() {
        
        this._axisLine.draw();
        this._tickLine.draw();
        this._tickText.draw();
    }

    getBoundbox() {
        let result = new Box3();

        //轴线的boundBox
        let _axisLineBoundBox = this.axisLine.getBoundBox();

        //刻度线的boundBox
        let tickLineBoundBox = this.tickLine.getBoundBox();

        //刻度文本的boundBox
        let _axisTextBoundBox = this.tickText.getBoundBox();

        result.union(_axisLineBoundBox);
        result.union(tickLineBoundBox);
        result.union(_axisTextBoundBox);


        return result;

    }

    getAxisYWidth() {
        let boundbox = this.getBoundbox();
        return Math.round(boundbox.max.x - boundbox.min.x);
    }
    _setYAxisWidth() { //检测下文字的宽度
        var me = this;
        if (!me.enabled) {
            me.width = 0;
        } else {
            var _maxTextWidth = 0;

            if (this.label.enabled) {

                //me._formatTextSection.forEach((val)=>{
                    let width = TextTexture.getTextWidth(me._formatTextSection,['normal','normal',this.label.fontColor,this.label.fontSize].join(' '))
                    _maxTextWidth = Math.max(_maxTextWidth, width);
                //})
                // _.each(me.dataSection, function (val, i) {

                //     //从_formatTextSection中取出对应的格式化后的文本
                //     let txt = me._textElements[i];
                //     let scale = me._root.renderView.getObjectScale(txt);

                //     let textWidth = scale.x;
                //     let textHeight = scale.y;

                //     let width = textWidth; //文本在外接矩形width
                //     let height = textHeight;//文本在外接矩形height

                //     if (!!me.label.rotation) {
                //         //有设置旋转
                //         if (me.label.rotation == 90) {
                //             width = textHeight;
                //             height = textWidth;
                //         } else {
                //             let sinR = Math.sin(Math.abs(me.label.rotation) * Math.PI / 180);
                //             let cosR = Math.cos(Math.abs(me.label.rotation) * Math.PI / 180);
                //             height = parseInt(sinR * textWidth);
                //             width = parseInt(cosR * textWidth);
                //         };
                //     };

                //     _maxTextWidth = Math.max(_maxTextWidth, width);
                //     console.log('width',width);
                // });
            };
            this._maxTextWidth = _maxTextWidth;
            let ratio = me._root.renderView.getVisableSize().ratio;  
            this.width = (_maxTextWidth + this.tickLine.lineLength + this.tickLine.offset + this.label.offset + this.axisLine.lineWidth) * ratio;
            //this.width+=10;
            // if (this._title) {
            //     this.height += this._title.getTextHeight()
            // };

        }
    }


}

export { YAxis };