import { global } from 'mmvis';
import { Component, _ } from "../Component";

class Tips extends Component {
    constructor(chart3d, opt) {

        super(chart3d.currCoord);

        this.name = 'Tips';
        this.type = 'tips3d';
        this.tipDomContainer = chart3d.domView;
        this.cW = chart3d.width;  //容器的width
        this.cH = chart3d.height;  //容器的height

        this.dW = 0;  //html的tips内容width
        this.dH = 0;  //html的tips内容Height

        this.borderRadius = "5px";  //背景框的 圆角 

        this.sprite = null;
        this.content = null; //tips的详细内容

        this.fillStyle = "rgba(255,255,255,0.95)";//"#000000";
        this.fontColor = "#999";
        this.strokeStyle = "#ccc";

        this.position = "right"; //在鼠标的左（右）边

        this._tipDom = null;

        this.offsetX = 10; //tips内容到鼠标位置的偏移量x
        this.offsetY = 10; //tips内容到鼠标位置的偏移量y

        //所有调用tip的 event 上面 要附带有符合下面结构的eventInfo属性
        //会deepExtend到this.indo上面来
        this.eventInfo = null;

        this.positionInRange = true; //false; //tip的浮层是否限定在画布区域
        this.enabled = true; //tips是默认显示的

        this.pointer = 'line'; //tips的指针,默认为直线，可选为：'line' | 'region'(柱状图中一般用region)
        this.pointerAnim = true;
        this._tipsPointer = null;

        _.extend(true, this, opt);


        // this.sprite = new Canvax.Display.Sprite({
        //     id: "TipSprite"
        // });
        // var self = this;
        this.group.on("removed", () => {
            this._removeContent();
            this._tipDom = null;
        });
        //console.log('tips component loaded!');
    }



    show(e) {

        if (!this.enabled) return;

        if (e.eventInfo) {
            this.eventInfo = e.eventInfo;

            // var stage = e.target.getStage();
            // this.cW = stage.context.width;
            // this.cH = stage.context.height;

            var content = this._setContent(e);
            if (content) {
                this._setPosition(e);
                //this.sprite.toFront();

                //比如散点图，没有hover到点的时候，也要显示，所有放到最下面
                //反之，如果只有hover到点的时候才显示point，那么就放这里
                //this._tipsPointerShow(e);
            } else {
                this.hide();
            }

        };

        //this._tipsPointerShow(e)
    }

    move(e) {
        if (!this.enabled) return;

        if (e.eventInfo) {
            this.eventInfo = e.eventInfo;
            var content = this._setContent(e);
            if (content) {
                this._setPosition(e);

                //比如散点图，没有hover到点的时候，也要显示，所有放到最下面
                //反之，如果只有hover到点的时候才显示point，那么就放这里
                //this._tipsPointerMove(e)
            } else {
                //move的时候hide的只有dialogTips, pointer不想要隐藏
                //this.hide();
                this._hideDialogTips();
            }
        };
        this._tipsPointerMove(e)
    }

    hide() {
        if (!this.enabled) return;
        this._hideDialogTips();
        //this._tipsPointerHide()
    }

    _hideDialogTips() {
        if (this.eventInfo) {
            this.eventInfo = null;
            //this.sprite.removeAllChildren();
            this._removeContent();
        };
    }

    /**
     *@pos {x:0,y:0}
     */
    _setPosition(e) {
        if (!this.enabled) return;
        if (!this._tipDom) return;
        var pos = e.pos; // || e.target.localToGlobal(e.point);
        var x = this._checkX(pos.x + this.offsetX);
        var y = this._checkY(pos.y + this.offsetY);

        this._tipDom.style.cssText += ";visibility:visible;left:" + x + "px;top:" + y + "px;-webkit-touch-callout: none; -webkit-user-select: none; -khtml-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none;";

        if (this.position == "left") {
            this._tipDom.style.left = this._checkX(pos.x - this.offsetX - this._tipDom.offsetWidth) + "px";
        };
    }

    /**
     *content相关-------------------------
     */
    _creatTipDom(e) {
        var me = this;
        me._tipDom = document.createElement("div");
        me._tipDom.className = "chart-tips";
        me._tipDom.style.cssText += "；-moz-border-radius:" + me.borderRadius + "; -webkit-border-radius:" + me.borderRadius + "; border-radius:" + me.borderRadius + ";background:" + me.fillStyle + ";border:1px solid " + me.strokeStyle + ";visibility:hidden;position:absolute;enabled:inline-block;*enabled:inline;*zoom:1;padding:6px;color:" + me.fontColor + ";line-height:1.5"
        me._tipDom.style.cssText += "; -moz-box-shadow:1px 1px 3px " + me.strokeStyle + "; -webkit-box-shadow:1px 1px 3px " + me.strokeStyle + "; box-shadow:1px 1px 3px " + me.strokeStyle + ";"
        me._tipDom.style.cssText += "; border:none;white-space:nowrap;word-wrap:normal;"
        me._tipDom.style.cssText += "; text-align:left;"

        me.tipDomContainer.appendChild(this._tipDom);
    }

    _removeContent() {
        if (!this._tipDom) return;
        this.tipDomContainer.removeChild(this._tipDom);
        this._tipDom = null;
    }

    _setContent(e) {
        var tipxContent = this._getContent(e);
        if (!tipxContent && tipxContent !== 0) {
            return;
        };

        if (!this._tipDom) {
            this._creatTipDom(e)
        };

        this._tipDom.innerHTML = tipxContent;
        this.dW = this._tipDom.offsetWidth;
        this.dH = this._tipDom.offsetHeight;

        return tipxContent
    }

    _getContent(e) {

        let tipsContent;

        if (this.content) {
            tipsContent = _.isFunction(this.content) ? this.content(e.eventInfo) : this.content;
        } else {
            tipsContent = this._getDefaultContent(e.eventInfo);
        };

        return tipsContent;
    }

    _getDefaultContent(info) {
        var str = "";
        if (info.title !== undefined && info.title !== null && info.title !== "") {
            str += "<div style='font-size:14px;border-bottom:1px solid #f0f0f0;padding:4px;margin-bottom:6px;'>" + info.title + "</div>";
        };
        var style = info.color || info.fillStyle || info.strokeStyle;
        // var value = typeof (info.value) == "object" ? JSON.stringify(node.value) : numAddSymbol(node.value);

        str += "<div style='line-height:1.5;font-size:12px;padding:0 4px;'>"
        if (style) {
            str += "<div style='background:" + style + ";margin-right:8px;margin-top:5px;width:8px;height:8px;border-radius:4px;overflow:hidden;font-size:0;'></div>";
        };
        _.each(info.rowData, (value, key) => {
            if (key !== info.field) return;
            str += '<div><span style="margin-right:5px">- ' + key + ':</span><span>' + value + '</span></div>';
        })

        str += "</div>";

        _.each(info.nodes, function (node, i) {
            //value 是null 或者 undefined
            if (!node.value && node.value !== 0) {
                return;
            };


            if (style) {
                str += "<span style='background:" + style + ";margin-right:8px;margin-top:5px;float:left;width:8px;height:8px;border-radius:4px;overflow:hidden;font-size:0;'></span>";
            };
            str += node.value + "</div>";
        });
        return str;
    }


    /**
     *获取back要显示的x
     *并且校验是否超出了界限
     */
    _checkX(x) {
        if (this.positionInRange) {
            var w = this.dW + 2; //后面的2 是 两边的 linewidth
            if (x < 0) {
                x = 0;
            }
            if (x + w > this.cW) {
                x = this.cW - w;
            }
        }
        return x
    }

    /**
     *获取back要显示的x
     *并且校验是否超出了界限
     */
    _checkY(y) {
        if (this.positionInRange) {
            var h = this.dH + 2; //后面的2 是 两边的 linewidth
            if (y < 0) {
                y = 0;
            }
            if (y + h > this.cH) {
                y = this.cH - h;
            }
        }
        return y
    }


    _tipsPointerShow(e) {

    }

    _tipsPointerHide() {
        var _coord = this.root._coord;
        //目前只实现了直角坐标系的tipsPointer
        if (!_coord || _coord.type != 'rect') return;

        if (!this.pointer || !this._tipsPointer) return;
        //console.log("hide");
        this._tipsPointer.destroy();
        this._tipsPointer = null;
    }

    _tipsPointerMove(e) {


    }


}

global.registerComponent(Tips, 'tips', 3);

export default Tips;