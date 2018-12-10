
import { global } from "mmvis/src/index"

import Chart3d from './chart3d';


//坐标系
import Box from './components/coord/box';
import Polar3D from './components/coord/polar3d';

//graphs
import Bar from "./components/graphs/bar/index";
import Line from "./components/graphs/line/index"
import Area from "./components/graphs/area/index"
import Pie from "./components/graphs/pie/index"


// //components
import Tips from "./components/tips/index"
import MarkPoint from "./components/markpoint/index"


global.registerComponent(Chart3d, 'chart', 3);

//global.registerComponent( emptyCoord, 'coord' );
global.registerComponent(Box, 'coord', 'box', 3);
global.registerComponent(Polar3D, 'coord', 'polar3d', 3);

global.registerComponent(Bar, 'graphs', 'bar', 3);
global.registerComponent(Line, 'graphs', 'line', 3);
global.registerComponent(Area, 'graphs', 'area', 3);
global.registerComponent(Pie, 'graphs', 'pie', 3);



global.registerComponent(Tips, 'tips', 3);
global.registerComponent(MarkPoint, 'markpoint', 3);




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

export default chartx;
