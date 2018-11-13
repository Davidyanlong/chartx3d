
import { global, cloneOptions, cloneData, dom } from "mmvis"

//空坐标系，当一些非坐标系图表，就直接创建在emptyCoord上面
import emptyCoord from './components/coord/index';

//坐标系
import Box from './components/coord/box';

//graphs
import Bar from "./components/graphs/bar/index";
import Line from "./components/graphs/line/index"

// //components
import Tips from "./components/tips/index"


var coord = {
    box: Box
}

var graphs = {
    bar: Bar,
    line: Line

}

var components = {
    tips: Tips,
}


//皮肤设定begin ---------------
//如果数据库中有项目皮肤
var projectTheme = []; //从数据库中查询出来设计师设置的项目皮肤
if( projectTheme && projectTheme.length ){
    global.setGlobalTheme( projectTheme );
};
//皮肤设定end -----------------







var Chartx = {
    create: function (el, data, opts) {
        let me = this;
        let chart = null;

        var _destroy = function () {
            me.instances[chart.id] = null;
            delete me.instances[chart.id];
        }

        //这个el如果之前有绘制过图表，那么就要在instances中找到图表实例，然后销毁
        var chart_id = dom.query(el).getAttribute("chart_id");
        if (chart_id != undefined) {
            var _chart = me.instances[chart_id];
            if (_chart) {
                _chart.destroy();
                _chart.off("destroy", _destroy)
            };
            delete me.instances[chart_id];
        };

        //默认为惯性坐标系
        let Coord = emptyCoord;

        if (opts.coord && opts.coord.type) {
            Coord = coord[opts.coord.type];
        };


        //try {

        chart = new Coord(el, data, opts, graphs, components);
        if (chart) {

            chart.draw();

            me.instances[chart.id] = chart;
            chart.on("destroy", _destroy);
        };
        //} catch(err){
        //    throw "Chatx Error：" + err
        //};
        return chart;
    },
    options: {}
};

for (var p in global) {
    Chartx[p] = global[p];
};


export default Chartx;