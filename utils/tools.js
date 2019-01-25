import { _, cloneOptions, cloneData } from "mmvis";
import { Vector3, Color } from "mmgl/src/index";
/**
 * 数字千分位加','号
 * @param  {[Number]} $n [数字]
 * @param  {[type]} $s [千分位上的符号]
 * @return {[String]}    [根据$s提供的值 对千分位进行分隔 并且小数点上自动加上'.'号  组合成字符串]
 */
function numAddSymbol($n, $s) {
    var s = Number($n);
    var symbol = $s ? $s : ','
    if (!s) {
        return String($n);
    };
    if (s >= 1000) {
        var num = parseInt(s / 1000);
        return String($n.toString().replace(num, num + symbol))
    } else {
        return String($n);
    }
}

//从一堆点中找到最近的一个点
function findNearPointX(points, point) {
    let minDistance = Infinity;
    let result = new Vector3();
    points.forEach(p => {
        let distance = Math.abs(point.x - p.x);
        if (minDistance > distance) {
            minDistance = distance;
            result.copy(p);
        }
    })
    return result;

}


/** 
* 
* @param hex 例如:"#23ff45" 
* @param opacity 透明度 
* @returns {string} 
*/
function hexToRgba(hex, opacity) {
    return "rgba(" + parseInt("0x" + hex.slice(1, 3)) + "," + parseInt("0x" + hex.slice(3, 5)) + "," + parseInt("0x" + hex.slice(5, 7)) + "," + opacity + ")";
}

// r,g,b范围为[0,255],转换成h范围为[0,360]
// s,v为百分比形式，范围是[0,100],可根据需求做相应调整
function hexToHSV(hex) {
    let r = parseInt("0x" + hex.slice(1, 3)) / 255;
    let g = parseInt("0x" + hex.slice(3, 5)) / 255;
    let b = parseInt("0x" + hex.slice(5, 7)) / 255;

    var h, s, v;
    var min = Math.min(r, g, b);
    var max = v = Math.max(r, g, b);
    var l = (min + max) / 2;
    var difference = max - min;

    if (max == min) {
        h = 0;
    } else {
        switch (max) {
            case r: h = (g - b) / difference + (g < b ? 6 : 0); break;
            case g: h = 2.0 + (b - r) / difference; break;
            case b: h = 4.0 + (r - g) / difference; break;
        }
        h = Math.round(h * 60);
    }
    if (max == 0) {
        s = 0;
    } else {
        s = 1 - min / max;
    }
    s = Math.round(s * 100);
    v = Math.round(v * 100);
    return { h, s, v };

}

//输入的h范围为[0,360],s,l为百分比形式的数值,范围是[0,100] 
//输出r,g,b范围为[0,255],可根据需求做相应调整
function hsvToRgb(h, s, v) {
    var s = s / 100;
    var v = v / 100;
    var h1 = Math.floor(h / 60) % 6;
    var f = h / 60 - h1;
    var p = v * (1 - s);
    var q = v * (1 - f * s);
    var t = v * (1 - (1 - f) * s);
    var r, g, b;
    switch (h1) {
        case 0:
            r = v;
            g = t;
            b = p;
            break;
        case 1:
            r = q;
            g = v;
            b = p;
            break;
        case 2:
            r = p;
            g = v;
            b = t;
            break;
        case 3:
            r = p;
            g = q;
            b = v;
            break;
        case 4:
            r = t;
            g = p;
            b = v;
            break;
        case 5:
            r = v;
            g = p;
            b = q;
            break;
    }
    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

function getHSVShemes(hex) {
    let result = [];
    let hslColor = hexToHSV(hex);
    let S = [100, 99, 89, 78, 69, 59, 49, 39, 29, 19];
    let V = [57, 67, 77, 87, 97, 100, 100, 100, 100, 100];
    for (let i = 0; i < 10; i++) {
        let { h } = hslColor;
        result.push({
            h,
            s: S[i],
            v: V[i]
        })
    }
    result = result.map(item => {
        let { h, s, v } = item;
        let rgb = hsvToRgb(h, s, v);
        let str = "#";
        rgb.forEach(d => {
            str += d.toString(16).length == 1 ? '0' + d.toString(16) : d.toString(16);
        })
        return str;
    })
    return result;
}




export {
    numAddSymbol,
    cloneOptions,
    cloneData,
    findNearPointX,
    hexToRgba,
    hexToHSV,
    hsvToRgb,
    getHSVShemes
};