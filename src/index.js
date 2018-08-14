
// import global from "./global";
// import canvax from "canvax";

// //图表皮肤
// import globalTheme from "./theme";

// //空坐标系，当一些非坐标系图表，就直接创建在emptyCoord上面
// import emptyCoord from "./components/coord/index"

// //坐标系
// import Rect from "./components/coord/rect"
// import Polar from "./components/coord/polar"

// //graphs
// import Bar from "./components/graphs/bar/index"
// import Line from "./components/graphs/line/index"
// import Scat from "./components/graphs/scat/index"
// import Pie from "./components/graphs/pie/index"
// import Radar from "./components/graphs/radar/index"
// import Cloud from "./components/graphs/cloud/index"
// import Planet from "./components/graphs/planet/index"
// import Funnel from "./components/graphs/funnel/index"

// //components
// import Legend from "./components/legend/index"
// import DataZoom from "./components/datazoom/index"
// import MarkLine from "./components/markline/index"
// import MarkPoint from "./components/markpoint/index"
// import Anchor from "./components/anchor/index"
// import Tips from "./components/tips/index"
// import BarTgi from "./components/bartgi/index"
// import Theme from "./components/theme/index"
// import WaterMark from "./components/watermark/index"
// import Cross from "./components/cross/index"


import dom from '../lib/dom';


import { Chart3d } from './chart3d';
import { Coord3d } from './framework/coord/coord3d';
import { Decare3d as decare3d } from './framework/coord/decare3d';

var coord = {
    // rect : Rect,
    // polar : Polar
    decare3d
}

var graphs = {
    // bar   : Bar,
    // line  : Line,
    // scat  : Scat,
    // pie   : Pie,
    // radar : Radar,
    // cloud : Cloud,
    // planet: Planet,
    // funnel: Funnel

}

var components = {
    // theme : Theme,
    // legend : Legend,
    // dataZoom : DataZoom,
    // markLine : MarkLine,
    // markPoint : MarkPoint,
    // anchor : Anchor,
    // tips : Tips,
    // barTgi : BarTgi,
    // waterMark : WaterMark,
    // cross : Cross
}


// //皮肤设定begin ---------------
// //如果数据库中有项目皮肤
// var projectTheme = []; //从数据库中查询出来设计师设置的项目皮肤
// if( projectTheme && projectTheme.length ){
//     globalTheme.set( projectTheme );
// };
//皮肤设定end -----------------







var Chartx3d = {
    instances: {},
    create: function (el, data, opts) {
        let me = this;
        let chart = null;


        //这个el如果之前有绘制过图表，那么就要在instances中找到图表实例，然后销毁
        var chart_id = dom.query(el).getAttribute("chart_id");
        if (chart_id != undefined) {
            var _chart = me.instances[chart_id];
            if (_chart) {
                _chart.destroy();
            };
            delete me.instances[chart_id];
        };
        let Coord = Coord3d;

        if (opts.coord && opts.coord.type) {
            Coord = coord[opts.coord.type];
        };

        chart = new Chart3d({ el, data, opts });

        chart.setCoord(Coord);

        for (var p in components) {
            chart.addComponent(components[p]);
        }


        //try {

        //chart = new Coord(el, data, opts, graphs, components);
        if (chart) {

            chart.draw();

            me.instances[chart.id] = chart;
            chart.on("destroy", function () {
                me.instances[chart.id] = null;
                delete me.instances[chart.id];
            });
        };
        //} catch(err){
        //    throw "Chatx Error：" + err
        //};
        return chart;
    },
    options: {}
};

// for( var p in global ){
//     Chartx[ p ] = global[ p ];
// };


export default Chartx3d;