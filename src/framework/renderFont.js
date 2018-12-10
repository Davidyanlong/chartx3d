import { Color, Math as _Math } from 'mmgl/src/index';

const _computeCanvasContent = (function () {
    let canvas = document.createElementNS('http://www.w3.org/1999/xhtml', 'canvas');
    let context = canvas.getContext("2d");
    return context;
})();


class RenderFont {
    constructor({
        scale = 0,
        fillStyle = '#333333',
        strokeStyle = null,
        lineWidth = 1,
        fontSize = 14,
        fontFamily = '微软雅黑,sans-serif',
        isBold = false,
        lineHeight = 1.2,
        defaultTextureWidth = 256,
        canvas = null
    } = {}) {
        this.scale = scale || window.devicePixelRatio || 1;
        this.style = {
            fillStyle,
            strokeStyle,
            lineWidth,
            fontSize,
            fontFamily,
            isBold,
            lineHeight,
        }
        this.style.textAlign = 'left';     //写死不给用户设置,方便计算文本的定位
        this.style.textBaseline = 'top';
        this.defaultTextureWidth = defaultTextureWidth;

        this._reNewline = /\r?\n/;

        this.canvas = canvas || document.createElementNS('http://www.w3.org/1999/xhtml', 'canvas');
        this.context = this.canvas.getContext("2d");

    }
    getFont() {
        return (this.style.isBold ? 'bold ' : 'normal ') + this.style.fontSize + 'px ' + this.style.fontFamily;
    }
    getTextWidth(txt, font = "") {
        let width = 0;
        if (_computeCanvasContent) {
            _computeCanvasContent.save();
            _computeCanvasContent.font = font || this.getFont();
            width = this._getTextWidth(_computeCanvasContent, this._getTextLines(txt))
            _computeCanvasContent.restore();
        };
        return width;
    }

    getTextHeight(txt) {
        return this._getTextHeight(this._getTextLines(txt));
    }
    _getTextWidth(ctx, textLines = []) {
        var maxWidth = 0;

        textLines.forEach(txt => {
            let currentLineWidth = ctx.measureText(txt).width;
            maxWidth = Math.max(maxWidth, currentLineWidth);
        });

        return maxWidth;
    }

    _getTextLines(txt) {
        txt = txt + "";
        return txt.split(this._reNewline);
    }

    _getTextHeight(textLines) {
        return this.style.fontSize * textLines.length * this.style.lineHeight;
    }

    //遍历文字列表,找出最长的文字
    computeUvsAndCanvasSize(texts) {
        let maxWidth = 0,
            maxHeight = 0,
            canvasWidth = 0,
            canvasHeight = 0,
            uvs = {},
            sizes = {};

        let cw = 0;
        let ch = 1;
        //计算需要的canvas高度
        texts.forEach(text => {
            let width = this.getTextWidth(text);
            maxWidth = Math.max(maxWidth, width);
            maxHeight = Math.max(maxHeight, this.getTextHeight(text));
            cw += width;
            if (cw > this.defaultTextureWidth) {
                ch++;
                cw = width;
            }
        });
        //一行就可以放得下
        if (ch == 1) {
            canvasWidth = _Math.ceilPowerOfTwo(cw);
            canvasHeight = _Math.ceilPowerOfTwo(maxHeight);
        } else {
            //todo 单个文字超过默认宽度的不考虑
            canvasWidth = this.defaultTextureWidth;
            canvasHeight = _Math.ceilPowerOfTwo(maxHeight * ch);
        }

        let st = 0; //开始位置
        cw = 0;
        ch = 0;

        //计算UV
        texts.forEach((text, index) => {
            let width = this.getTextWidth(text);
            let height = this.getTextHeight(text);
            sizes[text] = [width, height];
            st = cw;
            cw += width;
            if (index == 0) {
                ch = height;
            }

            if (cw < this.defaultTextureWidth) {

            } else {
                ch += height;
                cw = width;
                st = 0;
            }

            let _h = (canvasHeight - ch);
            let _w = cw;
            let _h2 = (canvasHeight - ch + height);
            uvs[text] = [
                st, _h,
                _w, _h,
                _w, _h2,
                st, _h2
            ];

        })




        return {
            canvasWidth,
            canvasHeight,
            maxHeight,
            maxWidth,
            uvs,
            sizes
        }

    }


    setCanvasSize(width, height) {

        this.canvas.width = width * this.scale;
        this.canvas.height = height * this.scale;
        this.canvas.style.width = width + "px";
        this.canvas.style.height = height + "px";
        this.context.scale(this.scale, this.scale);

        this.width = width;
        this.height = height;

        //透明清屏
        this.context.fillStyle = "rgba(0,0,0,0)";
        this.context.clearRect(0, 0, width * this.scale, height * this.scale);
    }

    drawTexts(texts) {
        let me = this;
        let UVs = {};

        let { maxWidth, maxHeight, canvasWidth, canvasHeight, uvs, sizes } = this.computeUvsAndCanvasSize(texts);
        this.setCanvasSize(canvasWidth, canvasHeight);

        me.context.fillStyle = me.style.fillStyle;
        if (me.style.strokeStyle) {
            me.context.strokeStyle = me.style.strokeStyle;
            me.context.lineWidth = me.style.lineWidth;
        }
        me.context.textAlign = me.style.textAlign;
        me.context.textBaseline = me.style.textBaseline;
        me.context.webkitImageSmoothingEnabled = true;

        me.context.font = this.getFont();


        texts.forEach(text => {
            let uv = uvs[text];

            UVs[text] = new Float32Array([
                uv[0] / canvasWidth, uv[1] / canvasHeight,
                uv[2] / canvasWidth, uv[3] / canvasHeight,
                uv[4] / canvasWidth, uv[5] / canvasHeight,
                uv[6] / canvasWidth, uv[7] / canvasHeight,
            ]);

            let txtArr = this._getTextLines(text);

            txtArr.forEach((txt, line) => {
                me.context.fillText(txt, uv[0], canvasHeight - uv[5] + this.style.fontSize * this.style.lineHeight * line);
                if (me.style.strokeStyle) {
                    me.context.strokeText(txt, uv[0], canvasHeight - uv[5] + this.style.fontSize * this.style.lineHeight * line);
                }
            });

        })

        if (window._debug) {
            //console.log('left,top', left, top, maxWidth, size.width);
            document.body.appendChild(me.canvas);

            me.canvas.style.position = "absolute";
            me.canvas.style.left = "700px";
            me.canvas.style.top = "0";

        }

        return {
            UVs,
            sizes,
            maxWidth,
            maxHeight
        };
    }


    measureText(txt) {
        return {
            width: this.getTextWidth(txt),
            height: this.getTextHeight(txt)
        }
    }


}

export { RenderFont };