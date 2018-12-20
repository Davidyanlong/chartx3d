import { Component, _ } from "../Component";
import { DUCK } from "../../constants";

//const Circle = Canvax.Shapes.Circle
let __legend_clickEvent = null;
class Legend extends Component {
    constructor(chart3d, opt) {
        super(chart3d.currCoord);
        this.name = "legend";
        this.type = "legend3d";

        this.opt = opt;

        /* data的数据结构为
        [
            //descartes中用到的时候还会带入yAxis
            {name: "uv", color: "#ff8533", field: '' ...如果手动传入数据只需要前面这三个 enabled: true, ind: 0, } //外部只需要传field和fillStyle就行了 activate是内部状态
        ]
        */
        this.data = null;

        //一般来讲，比如柱状图折线图等，是按照传入的field来分组来设置图例的，那么legend.field都是null
        //但是还有一种情况就是，是按照同一个field中的数据去重后来分组的，比如散点图中sex属性的男女两个分组作为图例，
        //以及pie饼图中的每个数据的name字段都是作为一个图例
        //那么就想要给legend主动设置一个field字段，然后legend自己从dataFrame中拿到这个field的数据来去重，然后分组做为图例
        //这是一个很屌的设计
        this.field = null;

        this.margin = {
            top: 10, right: 10, bottom: 10, left: 10
        };

        this.icon = {
            height: 22,
            width: "auto",
            shapeType: "circle",
            radius: 5,
            lineWidth: 1,
            fillStyle: "#999",
            onChecked: function () { },
            onUnChecked: function () { }
        };

        this.label = {
            textAlign: "left",
            textBaseline: "middle",
            fillStyle: "#333", //obj.color
            cursor: "pointer",
            fontSize: 14,
            format: function (name, info) {
                return name
            }
        };

        //this.onChecked=function(){};
        //this.onUnChecked=function(){};

        this._labelColor = "#999";
        // this.position = "right"; //图例所在的方向top,right,bottom,left
        this.direction = "h"; //横向 top,bottom --> h left,right -- >v

        this.position = DUCK.TOPLEFT; //left top  bottom right  center  topLeft  topRight bottomLeft  bottomRight
        this.offsetX = 0;
        this.offsetY = 0;


        _.extend(true, this, {
            icon: {
                onChecked: function (obj) {
                },
                onUnChecked: function (obj) {
                }
            }
        }, opt);

        this.isInit = true;



    }

    _getLegendData(opt) {
        var legendData = opt.data;
        if (legendData) {
            _.each(legendData, function (item, i) {
                item.enabled = true;
                item.ind = i;
            });
            delete opt.data;
        } else {
            legendData = this._coordSystem.getLegendData();
        };
        return legendData || [];
    }

    layout() {
        let currCoord = this._coordSystem;

        // if (this.direction == "h") {
        //     app.padding[this.position] += (this.height + this.margin.top + this.margin.bottom);
        // } else {
        //     app.padding[this.position] += (this.width + this.margin.left + this.margin.right);
        // };

        //default lefttop
        var pos = {
            x: currCoord.padding.left + this.margin.left,
            y: currCoord.padding.top + this.margin.top
        };

        switch (this.position && this.position.toLocaleLowerCase()) {
            case DUCK.TOPRIGHT.toLocaleLowerCase():
                pos.x = currCoord.width - this.width - currCoord.padding.right - this.margin.right;
                pos.y = currCoord.padding.top + this.margin.top;
                break;
            case DUCK.BOTTOMLEFT.toLocaleLowerCase():
                pos.x = currCoord.padding.left + this.margin.left;
                pos.y = currCoord.height - currCoord.padding.bottom - this.margin.bottom - this.height;
                break;
            case DUCK.BOTTOMRIGHT.toLocaleLowerCase():
                pos.x = currCoord.width - this.width - currCoord.padding.right - this.margin.right;
                pos.y = currCoord.height - currCoord.padding.bottom - this.margin.bottom - this.height;
                break;
            case DUCK.LEFT.toLocaleLowerCase():
                pos.x = currCoord.padding.left + this.margin.left;
                pos.y = (currCoord.height - currCoord.padding.bottom - this.margin.bottom - this.height) * 0.5;
                break;
            case DUCK.RIGHT.toLocaleLowerCase():
                pos.x = currCoord.width - this.width - currCoord.padding.right - this.margin.right;
                pos.y = (currCoord.height - currCoord.padding.bottom - this.margin.bottom - this.height) * 0.5;
                break;
            case DUCK.TOP.toLocaleLowerCase():
                pos.x = (currCoord.width - this.width - currCoord.padding.right - this.margin.right) * 0.5;
                pos.y = currCoord.padding.top + this.margin.top;
                break;
            case DUCK.BOTTOM.toLocaleLowerCase():
                pos.x = (currCoord.width - this.width - currCoord.padding.right - this.margin.right) * 0.5;
                pos.y = currCoord.height - currCoord.padding.bottom - this.margin.bottom - this.height;
                break;
            case DUCK.CENTER.toLocaleLowerCase():
                pos.x = (currCoord.width - this.width - currCoord.padding.right - this.margin.right) * 0.5;
                pos.y = (currCoord.height - currCoord.padding.bottom - this.margin.bottom - this.height) * 0.5;

        }

        pos.x += this.offsetX;
        pos.y += this.offsetY;
        this.pos = pos;
    }


    draw() {
        this.widget();
        this.layout();
        this.group.position.set(this.pos.x, this.pos.y, 0);

    }

    widget() {
        var me = this;
        let app = this._root.app;
        let currCoord = this._coordSystem
        if (this.isInit) {
            this.isInit = false;
            this.data = this._getLegendData(this.opt);

        }
        var viewWidth = currCoord.width - currCoord.padding.left - currCoord.padding.right - this.margin.left - this.margin.right;
        var viewHeight = currCoord.height - currCoord.padding.top - currCoord.padding.bottom - this.margin.top - this.margin.bottom;

        var maxItemWidth = 0;
        var width = 0, height = 0;
        var x = 0, y = 0;
        var rows = 1;
        this.dispose();
        var isOver = false; //如果legend过多
        __legend_clickEvent = this._getInfoHandler.bind(this);
        _.each(this.data, function (obj, i) {

            if (isOver) return;

            var _icon = app.createCirclePlane(me.icon.radius, {
                fillStyle: !obj.enabled ? "#ccc" : (obj.color || me._labelColor)
            });
            _icon.name = Legend._legend_prefix + "icon_" + i;
            _icon.position.set(me.icon.radius, me.icon.height / 3, 0);

            _icon.on("click", __legend_clickEvent);

            let txtArr = app.creatSpriteText(me.label.format(obj.name || obj.label, obj), {
                fillStyle: me.label.fillStyle,
                fontSize: me.label.fontSize,
                textAlign: me.label.textAlign,
                textBaseline: me.label.textBaseline,
            });
            let txt = txtArr[0];
            txt.name = Legend._legend_prefix + "txt_" + i;

            txt.on("click", __legend_clickEvent);

            var txtW = txt.userData.size && txt.userData.size[0];
            var itemW = txtW + me.icon.radius * 3 + 20;
            txt.position.set(me.icon.radius * 3 + txtW * 0.5, me.icon.height / 3, 0);
            maxItemWidth = Math.max(maxItemWidth, itemW);

            var spItemC = {
                height: me.icon.height
            };
            if (me.direction == "v") {
                if (y + me.icon.height > viewHeight) {
                    if (x > viewWidth) {
                        isOver = true;
                        return;
                    };
                    x += maxItemWidth;
                    y = 0;
                };
                spItemC.x = x;
                spItemC.y = y;
                y += me.icon.height;
                height = Math.max(height, y);
            } else {
                //横向排布
                if (x + itemW > viewWidth) {
                    if (me.icon.height * (rows + 1) > viewHeight) {
                        isOver = true;
                        return;
                    }
                    x = 0;
                    rows++;
                };

                spItemC.x = x;
                spItemC.y = me.icon.height * (rows - 1);
                x += itemW;
                width = Math.max(width, x);
            };

            // var sprite = new Canvax.Display.Sprite({
            //     id: "legend_field_" + i,
            //     context: spItemC
            // });

            let _group = app.addGroup({
                name: Legend._legend_prefix + i
            });
            _group.position.set(spItemC.x, spItemC.y, 0);
            _group.userData.info = obj;
            _group.add(_icon);
            _group.add(txt);
            me.group.add(_group);

            // sprite.context.width = itemW;
            // me.sprite.addChild(sprite);

            // sprite.on("click", function (e) {

            //     //只有一个field的时候，不支持取消
            //     if (_.filter(me.data, function (obj) { return obj.enabled }).length == 1) {
            //         if (obj.enabled) {
            //             return;
            //         }
            //     };

            //     obj.enabled = !obj.enabled;

            //     _icon.context.fillStyle = !obj.enabled ? "#ccc" : (obj.color || me._labelColor);

            if (obj.enabled) {
                me.icon.onChecked(obj);
            } else {
                me.icon.onUnChecked(obj);
            }
            // });

        });

        if (this.direction == "h") {
            me.width = width;
            me.height = me.icon.height * rows;
        } else {
            me.width = x + maxItemWidth;
            me.height = height;
        }

        this._root.labelGroup.add(this.group);
        //me.width = me.sprite.context.width  = width;
        //me.height = me.sprite.context.height = height;
    }

    _getInfoHandler(e) {
        let info = e.target.parent.userData.info
        if (info) {
            info.enabled = !info.enabled;
            this._root.fire({ type: 'redraw', data: info });
        }
    }
    dispose(group) {
        group = group || this.group;
        this.group.traverse(obj => {
            if (obj.name.indexOf(Legend._legend_prefix) !== -1) {
                obj.off('click', __legend_clickEvent);
            }
        })
        super.dispose(group);

    }
}
Legend._legend_prefix = "legend_field_";


export default Legend;