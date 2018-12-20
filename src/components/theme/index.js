/**
 * 皮肤组件，不是一个具体的ui组件
 */
import { Component, _ } from "../Component";

export default class Theme extends Component {
    constructor(chart3d, theme) {
    
        super(chart3d.currCoord,chart3d);

        this.name = "Theme";
        this.colors = theme || [];
    }

    set(colors) {
        this.colors = colors;
        return this.colors;
    }

    get(ind) {
        var colors = this.colors;
        if (!_.isArray(colors)) {
            colors = [colors]
        };
        return colors;
    }

    mergeTo(colors) {
        if (!colors) {
            colors = [];
        };
        for (var i = 0, l = this.colors.length; i < l; i++) {
            if (colors[i]) {
                colors[i] = this.colors[i]
            } else {
                colors.push(this.colors[i]);
            }
        };

        return colors;
    }

}