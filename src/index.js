
import { global } from "mmvis"

import './chart3d';

//坐标系
import './components/coord/box';
import './components/coord/polar3d';
import './components/coord/cube';

//graphs
import "./components/graphs/bar/index";
import  "./components/graphs/line/index"
import  "./components/graphs/area/index"
import "./components/graphs/pie/index"
import  "./components/graphs/heatmap/index"


// //components
import  "./components/tips/index"
import  "./components/markpoint/index"
import "./components/legend/index"
import  './components/theme/index'




//皮肤设定begin ---------------
//如果数据库中有项目皮肤
var projectTheme = []; //从数据库中查询出来设计师设置的项目皮肤
if (projectTheme && projectTheme.length) {
    global.setGlobalTheme(projectTheme);
};
//皮肤设定end -----------------

var chartx = {
    options: {}
};

for (var p in global) {
    chartx[p] = global[p];
};

chartx.__dimension = 3;

export default chartx;
