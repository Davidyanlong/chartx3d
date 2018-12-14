
import { Component, _ } from '../Component';
import { AxisLine } from './axisLine';
import { Vector3, TextTexture } from 'mmgl/src/index';
import { TickLines } from './tickLines';
import { TickTexts } from './tickTexts';
import { numAddSymbol } from '../../../utils/tools';

class XAxis extends Component {
    constructor(_cartesionUI) {
        super(_cartesionUI._coordSystem);
        let opt = this._opt = this._coordSystem.coord.xAxis;

        this._cartesionUI = _cartesionUI;
        this.width = 0;
        this.height = 0;

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
        this._title = null; //this.title对应的文本对象

        this.enabled = true;
        this.axisLine = {
            enabled: 1, //是否有轴线
            lineWidth: 1,
            strokeStyle: '#333'
        };

        this.tickLine = {
            enabled: 1,
            lineWidth: 1, //线宽像素
            lineLength: 20, //线长(空间单位)
            strokeStyle: '#333',
            offset: 0, //空间单位
        };

        this.label = {
            enabled: 1,
            fontColor: '#333',
            fontSize: 12,
            rotation: 0,
            format: null,
            offset: { x: 20, y: 0, z: 40 },
            textAlign: "center",       //水平方向对齐: left  right center 
            verticalAlign: 'bottom',  //垂直方向对齐 top bottom middle
            lineHeight: 1,
            evade: true  //是否开启逃避检测，目前的逃避只是隐藏
        };
        if (opt.isH && (!opt.label || opt.label.rotaion === undefined)) {
            //如果是横向直角坐标系图
            this.label.rotation = 90;
        };

        this.maxTxtH = 0;

        this.pos = {
            x: 0,
            y: 0
        };

        // this.dataOrg = []; //源数据
        this.dataSection = []; //默认就等于源数据,也可以用户自定义传入来指定

        this.layoutData = []; //{x:100, value:'1000',visible:true}

        this.sprite = null;

        //过滤器，可以用来过滤哪些yaxis 的 节点是否显示已经颜色之类的
        //@params params包括 dataSection , 索引index，txt(canvax element) ，line(canvax element) 等属性
        this.filter = null; //function(params){}; 

        this.isH = false; //是否为横向转向的x轴

        this.animation = false;

        //layoutType == "proportion"的时候才有效
        this.maxVal = null;
        this.minVal = null;

        this.ceilWidth = 0; //x方向一维均分长度, layoutType == peak 的时候要用到

        this.layoutType = "rule"; // rule（均分，起点在0） , peak（均分，起点在均分单位的中心）, proportion（实际数据真实位置，数据一定是number）

        //如果用户有手动的 trimLayout ，那么就全部visible为true，然后调用用户自己的过滤程序
        //trimLayout就事把arr种的每个元素的visible设置为true和false的过程
        //function
        this.trimLayout = null;

        this.posParseToInt = false; //比如在柱状图中，有得时候需要高精度的能间隔1px的柱子，那么x轴的计算也必须要都是整除的

        _.extend(true, this, opt);

        // this.label.enabled = this.enabled && this.label.enabled;
        // this.tickLine.enabled = this.enabled && this.tickLine.enabled;
        // this.axisLine.enabled = this.enabled && this.axisLine.enabled;

        this.axisAttribute = this._coordSystem.xAxisAttribute;

        this.init(opt, this.axisAttribute);
        //xAxis的field只有一个值,
        //this.field = _.flatten([this._coord.xAxisAttribute.field])[0];
        this.group.visible = !!this.enabled;

    }
    init(opt, data) {
        let me = this;
        // this.rulesGroup = this._root.app.addGroup({ name: 'rulesSprite' });

        // this.group.add(this.rulesGroup);

        this._initData(data);

        this._onChangeBind = () => {
            me._initModules();
        };
        this._root.orbitControls.on('change', this._onChangeBind);
        me._initModules();
    }
    _initData(data) {
        var me = this;

        if (data && data.field) {
            this.field = data.field;
        }

        this.dataSection = data.dataSection;

        me._formatTextSection = [];
        me._textElements = [];
        _.each(me.dataSection, function (val, i) {
            me._formatTextSection[i] = me._getFormatText(val, i);
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
    _initModules() {
        //todo 这个方法后续重构

        //初始化轴线
        const _axisDir = new Vector3(1, 0, 0);
        const _coordSystem = this._coordSystem;
        let coordBoundBox = _coordSystem.getBoundbox();

        let _size = new Vector3(); //空间盒子的大小
        coordBoundBox.getSize(_size);
        let {
            x: width,
            y: height,
            z: depth
        } = _size;
        let origin = _coordSystem.getOrigin();
        let _tickLineDir = new Vector3(0, 0, 1);
        let _faceInfo = this._cartesionUI.getFaceInfo();
        let _verticalAlign = this.label.verticalAlign;
        let _offsetZ = this.label.offset.z + this.axisLine.lineWidth + this.tickLine.lineLength + this.tickLine.offset;

        if (_faceInfo.bottom.visible) {
            if (_faceInfo.back.visible) {
                origin = _coordSystem.getOrigin();
                _tickLineDir = new Vector3(0, 0, 1);
            } else {
                origin = new Vector3(0, 0, -depth);
                _tickLineDir = new Vector3(0, 0, -1);
                _offsetZ *= -1;
            }
            _verticalAlign = 'bottom';

        } else {
            //top 可见
            if (_faceInfo.back.visible) {
                origin = new Vector3(0, height, 0);
                _tickLineDir = new Vector3(0, 0, 1);

            } else {
                origin = new Vector3(0, height, -depth)
                _tickLineDir = new Vector3(0, 0, -1);
                _offsetZ *= -1;
            }
            _verticalAlign = 'top';
        }

        if (this._axisLine) {
            if (this._axisLine.getOrigin().equals(origin)) {
                return;
            }
            this._axisLine.setOrigin(origin);
            this._axisLine.update();

            //二次绘制
            this._tickLine.setDir(_tickLineDir);
            this._tickLine.initData(this._axisLine, this.axisAttribute, _coordSystem.getXAxisPosition);
            this._tickLine.update();

            this._tickText.setDir(_tickLineDir);
            this._tickText.offset.setZ(_offsetZ);
            this._tickText.initData(this._axisLine, this.axisAttribute, _coordSystem.getXAxisPosition);
            this._tickText.setVerticalAlign(_verticalAlign);


        } else {

            this._axisLine = new AxisLine(_coordSystem, this.axisLine);
            this._axisLine.setDir(_axisDir);
            this._axisLine.setOrigin(origin);
            this._axisLine.setLength(this.axisAttribute.axisLength);
            this._axisLine.setGroupName('xAxisLine')
            this._axisLine.drawStart();

            this.group.add(this._axisLine.group);

            //初始化tickLine
            this._tickLine = new TickLines(_coordSystem, this.tickLine);
            this._tickLine.setDir(_tickLineDir);
            this._tickLine.initData(this._axisLine, this.axisAttribute, _coordSystem.getXAxisPosition);
            this._tickLine.drawStart();

            this.group.add(this._tickLine.group);


            //初始化tickText
            this._tickText = new TickTexts(_coordSystem, this.label);

            this._tickText.offset.z += this.axisLine.lineWidth + this.tickLine.lineWidth + this.tickLine.offset;

            this._tickText.setVerticalAlign(_verticalAlign);
            this._tickText.setDir(_tickLineDir);
            this._tickText.initData(this._axisLine, this.axisAttribute, _coordSystem.getXAxisPosition);

            //this._tickText.initData(this._axisLine,this.axisAttribute);
            this._tickText.drawStart(this._formatTextSection);

            this._root.labelGroup.add(this._tickText.group)
            //this.group.add(this._tickText.group);

            this._tickText.labels.forEach((label, a) => {
                _.isFunction(this.filter) && this.filter({
                    layoutData: this.axisAttribute.dataSectionLayout,
                    index: a,
                    label: label,
                    line: this._tickLine.lines[a]
                });
            })



        }

    }
    _getName() {
        // if ( this.title.content ) {
        //     if( !this._title ){
        //         this._title = new Canvax.Display.Text(this.title.content, {
        //             context: {
        //                 fontSize: this.title.fontSize,
        //                 textAlign: this.title.textAlign,  //"center",//this.isH ? "center" : "left",
        //                 textBaseline: this.title.textBaseline,//"middle", //this.isH ? "top" : "middle",
        //                 fillStyle: this.title.fontColor,
        //                 strokeStyle: this.title.strokeStyle,
        //                 lineWidth : this.title.lineWidth,
        //                 rotation: this.isH ? -180 : 0
        //             }
        //         });
        //     } else {
        //         this._title.resetText( this.title.content );
        //     }
        // }
    }
    // evade() {
    //     //label个数
    //     let num = this.axisAttribute.dataSectionLayout.length;
    //     //轴长


    //     let labels = this._tickText.labels;
    //     let orgPoint1 = this._tickText.getTextPos(labels[0].userData.text);
    //     let orgPoint2 = this._tickText.getTextPos(labels[labels.length - 1].userData.text);
    //     let point1 = this._coordSystem.positionToScreen(orgPoint1.clone());
    //     let point2 = this._coordSystem.positionToScreen(orgPoint2.clone());
    //     //屏幕空间下的轴长
    //     let lengthInScreen = point2.distanceTo(point1);

    //     console.log(lengthInScreen);

    //     debugger

    // }

    draw() {

        this._axisLine.draw();
        this._tickLine.draw();
        this._tickText.draw();

        //console.log('x axis 2 pos: ',this._root.currCoord.getXAxisPosition(2));


    }
    dispose() {

        this._axisLine.dispose();
        this._tickLine.dispose();
        this._tickText.dispose();
        this._root.orbitControls.off('change', this._onChangeBind);
        this._onChangeBind = null;
    }
    resetData() {
        this._initData(this.axisAttribute);
        //this.getOrigin();

        this._axisLine.resetData();
        this._tickLine.resetData(this._axisLine, this.axisAttribute);
        this._tickText.resetData(this._axisLine, this.axisAttribute, this._formatTextSection);
    }
}

export { XAxis };