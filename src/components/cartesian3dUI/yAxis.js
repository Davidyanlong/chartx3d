
import { Component, _ } from '../Component';
import { AxisLine } from './axisLine';
import { Vector3, Box3, TextTexture, Vector2 } from 'mmgl/src/index';
import { TickLines } from './tickLines';
import { TickTexts } from './tickTexts';
import { numAddSymbol } from '../../../utils/tools';

class YAxis extends Component {
    constructor(_cartesionUI, opt) {
        super(_cartesionUI._coordSystem);

        this._opt = opt;
        this._coord = this._coordSystem.coord || {};
        this._cartesionUI = _cartesionUI;
        this.name = opt.name;

        //this.width = null; //第一次计算后就会有值
        //this.yMaxHeight = 0; //y轴最大高
        //this.height = 0; //y轴第一条线到原点的高

        // this.maxW = 0;    //最大文本的 width
        this.field = opt.field || [];   //这个 轴 上面的 field 不需要主动配置。可以从graphs中拿

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
            lineWidth: 1, //线宽像素
            lineLength: 20, //线长(空间单位)
            strokeStyle: '#333',
            offset: 0, //空间单位
        };
        this.axisLine = {//轴线
            enabled: 1,
            lineWidth: 1, //线宽像素
            strokeStyle: '#333'
        };
        this.label = {
            enabled: 1,
            fontColor: '#333',
            fontSize: 12,
            format: null,
            rotation: 0,
            textAlign: "right",       //水平方向对齐: left  right center 
            verticalAlign: 'middle',  //垂直方向对齐 top bottom middle
            lineHeight: 1,
            offset: { x: 0, y: 0, z: 40 }    //和刻度线的距离
        };

        this.origin = new Vector3();
        this.boundboxSize = new Vector3();
        this.axisAttribute = this._coordSystem.yAxisAttribute[this.name];

        
        _.extend(true, this, opt);

        this.init(opt);

        this.group.visible = !!this.enabled;
        this._getName();

    }

    init(opt) {
        let me = this;
        //extend会设置好this.field
        //先要矫正子啊field确保一定是个array
        if (!_.isArray(this.field)) {
            this.field = [this.field];
        };

        this._initData(this.axisAttribute);

        this.getOrigin();

        this._onChangeBind = () => {
            me._initModules();
        };

        this._root.orbitControls.on('change', this._onChangeBind);
        me._initModules();

    }
    _initModules() {
        if (!this.enabled) return;
        const _axisDir = new Vector3(0, 1, 0);
        const _coordSystem = this._coordSystem;
        const coordBoundBox = _coordSystem.getBoundbox();

        let {
            x: width,
            z: depth
        } = this.boundboxSize;

        let origin = this.origin.clone();

        let _tickLineDir = new Vector3(0, 0, 1);
        let _faceInfo = this._cartesionUI.getFaceInfo();
        let _textAlign = this.label.textAlign;
        let _offsetZ = this.label.offset.z + this.axisLine.lineWidth + this.tickLine.lineLength + this.tickLine.offset;

        if (_faceInfo.left.visible) {
            if (_faceInfo.back.visible) {
                //默认计算的原单origin
                _tickLineDir = new Vector3(0, 0, 1);
                _textAlign = 'right';

            } else {
                //默认计算的原单origin
                if (_coordSystem.coord.yAxis.length == 1) {
                    origin = new Vector3(0, 0, -depth);
                }
                _tickLineDir = new Vector3(0, 0, -1);
                _textAlign = 'left';
                _offsetZ *= -1;
            }
        } else {
            if (_faceInfo.back.visible) {
                origin.setX(width);
                _tickLineDir = new Vector3(0, 0, 1);
                _textAlign = 'left';
            } else {
                origin.setX(width);
                if (_coordSystem.coord.yAxis.length == 1) {
                    origin = new Vector3(width, 0, -depth);
                }
                _tickLineDir = new Vector3(0, 0, -1);
                _textAlign = 'right';
                _offsetZ *= -1;
            }
        }


        if (this._axisLine) {
            if (this._axisLine.getOrigin().equals(origin)) {
                return;
            }

            this._axisLine.setOrigin(origin);
            this._axisLine.update();


            this._tickLine.setDir(_tickLineDir);
            this._tickLine.initData(this._axisLine, this.axisAttribute, _coordSystem.getYAxisPosition);
            this._tickLine.update();



            this._tickText.setDir(_tickLineDir);
            this._tickText.initData(this._axisLine, this.axisAttribute, _coordSystem.getYAxisPosition);
            this._tickText.setTextAlign(_textAlign);
            this._tickText.offset.setZ(_offsetZ);


        } else {
            //初始化轴线
            this._axisLine = new AxisLine(_coordSystem, this.axisLine);
            this._axisLine.setDir(_axisDir);
            this._axisLine.setOrigin(origin);
            this._axisLine.setLength(this.axisAttribute.axisLength);
            this._axisLine.setGroupName('yAxisLine')
            this._axisLine.drawStart();

            this.group.add(this._axisLine.group);


            //初始化tickLine

            this._tickLine = new TickLines(_coordSystem, this.tickLine);
            this._tickLine.setDir(_tickLineDir);
            this._tickLine.initData(this._axisLine, this.axisAttribute);
            this._tickLine.drawStart();
            this.group.add(this._tickLine.group);



            // 初始化tickText
            this._tickText = new TickTexts(_coordSystem, this.label);
            this._tickText.offset.z = _offsetZ;

            this._tickText.setTextAlign(_textAlign);
            this._tickText.setDir(_tickLineDir);
            this._tickText.initData(this._axisLine, this.axisAttribute);

            this._tickText.drawStart(this._formatTextSection);
            //this.group.add(this._tickText.group);
            this._root.labelGroup.add(this._tickText.group)

        }

    }
    getOrigin() {

        //todo  后续可以通过mmvis生成,该方法放到坐标系,针对多轴给出不同的原点
        let _coordSystem = this._coordSystem;
        let coordBoundBox = _coordSystem.getBoundbox();
        let _size = new Vector3(); //空间盒子的大小
        coordBoundBox.getSize(_size);
        this.boundboxSize = _size.clone();
        let {
            z: depth
        } = _size;
        let origin = _coordSystem.getOrigin();


        let segment = _coordSystem.coord.yAxis.length;
        let index = _.indexOf(_coordSystem.coord.yAxis, this._opt);
        let step = 0;
        if (segment == 1) {
            step = 0;
        } else {
            step = index / (segment - 1);
        }
        origin.setZ(depth * -step);

        this.origin = origin;

    }
    updateAxis() {
        //这里可能需要重构
        //todo 根据相机移动计算tickLine & tickText的位置 
    }
    _getName() {

    }
    _initData(data) {
        var me = this;

        this.dataSection = data.getDataSection();

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

    draw() {
        //this._initModules();
        if (!this.enabled) return;
        this._axisLine.draw();
        this._tickLine.draw();
        this._tickText.draw();
        // console.log('y axis 100 pos: ', this._root.currCoord.getYAxisPosition(100));
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
        this.getOrigin();

        this._axisLine.resetData();
        this._tickLine.resetData(this._axisLine, this.axisAttribute);
        this._tickText.resetData(this._axisLine, this.axisAttribute,this._formatTextSection);
    }



}

export { YAxis };