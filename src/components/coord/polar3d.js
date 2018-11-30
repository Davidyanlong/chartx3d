/**
 * 对外发布的极坐标
 */
import { Cylindrical  } from "../../framework/coord/cylindrical";

class Polar3D extends Cylindrical {
    constructor(root) {
        super(root)

        
        this.DefaultControls = {
            autoRotate: false,       //默认不自动旋转
            boxWidth: 1200,         //空间中X的最大值(最大宽度)  
            boxHeight: 1200,        //空间中Y的最大值(最大高度)  
            boxDepth: 500,         //空间中Z的最大值(最大深度)

            distance: 1000,        //默认相机距离
            maxDistance: 1200,     //最大相机距离
            minDistance: 100,      //最小相机距离 
            minZoom: 0.2,           //正交投影缩小的最小值
            maxZoom: 1.5,           //正交投影放大的最大值

            alpha: 30,    //绕X轴旋转
            beta: 0,      //绕Y轴旋转
            gamma: 0      //绕Z轴旋转
        }
        root.init(this.DefaultControls);
        super.init()

    }
}

export default Polar3D;