/**
 * 为了输入便捷,3D的笛卡尔坐标系,在配置中为Box
 */
import { global } from 'mmvis'
import { Cartesian3D } from "../../framework/coord/cartesian3d";

class Box extends Cartesian3D {
    constructor(root) {
        super(root)

        this.DefaultControls = {
            autoRotate: false,       //默认不自动旋转
            boxWidth: 1200,         //空间中X的最大值(最大宽度)  
            boxHeight: 1200,        //空间中Y的最大值(最大高度)  
            boxDepth: 500,         //空间中Z的最大值(最大深度)

            distance: 1500,        //默认相机距离
            maxDistance: 3000,     //最大相机距离
            minDistance: 600,      //最小相机距离 
            minZoom: 0.2,           //正交投影缩小的最小值
            maxZoom: 1.5,           //正交投影放大的最大值


            enableDamping: true,
            enablePan: false,
            enableKeys: false,
            autoRotateSpeed: 1.0,


            alpha: 10,    //绕X轴旋转
            beta: 40,      //绕Y轴旋转
            gamma: 0      //绕Z轴旋转
        }
        root.init(this.DefaultControls);
        super.init()

    }

}

global.registerComponent(Box, 'coord', 'box', 3);

export default Box;
