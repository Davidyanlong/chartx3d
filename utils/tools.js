import { _, cloneOptions, cloneData, is3dOpt } from "mmvis/src/index";
import { Vector3 } from "mmgl/src/index";
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
function findNearPoint(points, point) {
    let minDistance = Infinity;
    let result = new Vector3();
    points.forEach(p => {
        let distance = point.distanceTo(p);
        if (minDistance > distance) {
            minDistance = distance;
            result.copy(p);
        }
    })
    return result;

}
export {
    numAddSymbol,
    cloneOptions,
    cloneData,
    is3dOpt,
    findNearPoint
};