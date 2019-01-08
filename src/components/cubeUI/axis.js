import { Component, _ } from "../Component";
import { TickLines } from '../cartesian3dUI/tickLines';
import { TickTexts } from '../cartesian3dUI/tickTexts';
import { Vector3 } from "mmgl/src/index";

class Axis extends Component {
    constructor(_cubeUI, opt) {
        super(_cubeUI._coordSystem);

        this.name = 'Axis';

        this._cubeUI = _cubeUI;

        this.enabled = true;

        this.tickLine = {
            enabled: 1,
            lineWidth: 1, //线宽像素
            lineLength: 5, //线长(空间单位)
            strokeStyle: '#333',
            offset: 0, //空间单位
        };

        this.label = {
            enabled: 1,
            fontColor: '#333',
            fontSize: 12,
            rotation: 0,
            format: null,
            offset: 0,
            maxLength: 0,
            textAlign: "center",       //水平方向对齐: left  right center 
            verticalAlign: 'bottom',  //垂直方向对齐 top bottom middle
            lineHeight: 1
        };
        //@params params包括 dataSection , 索引index，txt(canvax element) ，line(canvax element) 等属性
        this.filter = null; //function(params){}; 

        //原点
        this._origin = null;

        //轴的方向
        this._axisDir = null;

        //tickLine 的方向
        this._tickLineDir = null;

        _.extend(true, this, opt);

        this.axisAttribute = this._coordSystem.getAxisAttribute(opt.field);

        //默认不显示
        this.group.visible = false;

        this.init();

    }
    setVisibel(val) {
        this.group.visible = !!val;
    }
    setOrigin(pos) {
        this._origin = pos;
    }
    setAxisDir(dir) {
        this._axisDir = dir;
    }

    setTickLineDir(dir) {
        this._tickLineDir = dir;
    }


    init() {

        this._initData();
    }
    _initData() {

        this.field = this.axisAttribute.field
        this.dataSection = this.axisAttribute.dataSection;

        this._formatTextSection = [];
        this._textElements = [];
        this.dataSection.forEach((val, i) => {
            this._formatTextSection[i] = this._getFormatText(val, i);
        });

    }
    _getFormatText(val, i) {
        var res;
        if (_.isFunction(this.label.format)) {
            res = this.label.format.apply(this, arguments);

        } else {
            if (this.label.maxLength > 0) {
                if (val.length > this.label.maxLength) {
                    res = "";
                    let i = 0;
                    let l = val.length;
                    while (l--) {
                        if (i < this.label.maxLength) {
                            res += (val + '').charAt(val.length - l);
                            i++;
                        } else {
                            res += '\n';
                            res += (val + '').charAt(val.length - l);
                            i = 0;
                        }


                    }

                }
            }

        }
        if (!res) {
            res = val;
        }

        return res;
    }
    initModules() {

        let _coordSystem = this._coordSystem;
        this._tickLine = new TickLines(_coordSystem, this.tickLine);
        this._tickLine.setDir(this._tickLineDir);
        this._tickLine.initData({ dir: this._axisDir, origin: this._origin }, this.axisAttribute);

        this._tickLine.drawStart();
        this.group.add(this._tickLine.group);


        //初始化tickText
        let opt = _.clone(this.label);
        opt.offset = this._tickLineDir.clone().multiplyScalar(opt.offset);

        this._tickText = new TickTexts(_coordSystem, opt);
        this._tickText.offset.add(this._tickLineDir.clone().multiplyScalar(this.tickLine.lineWidth + this.tickLine.lineLength + this.tickLine.offset));

        this._tickText.setDir(this._tickLineDir);
        this._tickText.initData({ dir: this._axisDir, origin: this._origin }, this.axisAttribute);
        this._tickText.autoUpdataPostion = true;
        this._tickText.drawStart(this._formatTextSection);
        this.group.add(this._tickText.group)


    }
    draw() {
        this._tickLine.draw();
        this._tickText.draw();
    }
    resetData() {
        this._initData();
        this.axisAttribute = this._coordSystem.getAxisAttribute(this.field);
        this._tickLine.resetData({ dir: this._axisDir, origin: this._origin }, this.axisAttribute);
        this._tickText.resetData({ dir: this._axisDir, origin: this._origin }, this.axisAttribute, this._formatTextSection);
        this._tickText.autoUpdataPostion = true;
    }
}

export { Axis };