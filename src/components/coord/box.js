/**
 * 为了输入便捷,3D的笛卡尔坐标系,在配置中为Box
 */
import {Chart3d} from '../../chart3d';
import  {Cartesian3D}  from "../../framework/coord/cartesian3d";

class Box extends Chart3d{
    constructor(el, data, opts, graphs, components){
        super({el, data, opts, graphs, components})
        
        //box 就是Cartesian3D坐标系,直接指定
        let _cartesian3D = new Cartesian3D(this);
        this.setCoord(_cartesian3D);
    }
} 

export default Box;
