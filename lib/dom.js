import _ from './underscore';

export default {

    // dom操作相关代码
    query(el) {
        if (_.isString(el)) {
            return document.getElementById(el)
        }
        if (el.nodeType == 1) {
            //则为一个element本身
            return el
        }
        if (el.length) {
            return el[0]
        }
        return null;
    },

    createView(_width, _height, id) {
        var view = document.createElement("div");
        view.className = "canvax-view";
        view.style.cssText += "position:relative;width:100%;height:100%;"

        var stageView = document.createElement("div");
        stageView.style.cssText += "position:absolute;width:" + _width + "px;height:" + _height + "px;"

        //用来存放一些dom元素
        var domView = document.createElement("div");
        domView.style.cssText += "position:absolute;width:" + _width + "px;height:" + _height + "px;"

        view.appendChild(stageView);
        view.appendChild(domView);

        return {
            view: view,
            stageView: stageView,
            domView: domView
        }
    }



}