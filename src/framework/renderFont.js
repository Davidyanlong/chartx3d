import { Color, Math as _Math } from 'mmgl/src/index';

class RenderFont {
    constructor(params = {}) {

        this.chartInfos = {};
        this.scale = params.scale || window.devicePixelRatio || 1;
        this.style = {
            color: params.color || new Color('#000'),
            fontSize: params.fontSize || 14,
            fontFamily: params.fontFamily || '微软雅黑,sans-serif',
            isBold: params.isBold || false,
            textAlign: params.textAlign || 'top',
            textBaseline: params.textBaseline || 'top',
            verticalAlign: params.verticalAlign || 'middle' // top , middle, bottom

        }

        //根据传入的文字内容自动计算 纹理的大小

        this.textureWidth = 2;
        this.textureHeight = 2;

        // this.rcpTextureWidth = 1 / this.textureWidth;
        // this.rcpTextureHeight = 1 / this.textureHeight;

        this.canvas = params.canvas || document.createElementNS('http://www.w3.org/1999/xhtml', 'canvas');
        this.context = this.canvas.getContext("2d");


    }

    setStyle(style) {
        //todo
    }

    drawText(text) {
        let me = this;
        let top = 0;
        let left = 0;
        let textMatric = me.measureText(text);
        let size = textMatric; //me.resetCanvasSize(textMatric);

        //调整文字在纹理中的位置
        //垂直方向
        let subWidth = size.height - textMatric.height;
        if (me.style.verticalAlign.toLowerCase() == 'middle') {
            if (subWidth) {
                top = subWidth * 0.5;
            }
        } else if (me.style.verticalAlign.toLowerCase() == 'bottom') {
            top = subWidth;
        }

        //水平方向
        let subHeight = size.width - textMatric.width;
        if (me.style.textAlign.toLowerCase() == 'center') {

            if (subHeight) {
                left = subHeight * 0.5 + textMatric.width * 0.5;
            }
        } else if (me.style.textAlign.toLowerCase() == 'right') {
            left = size.width;
        }


        me.context.fillStyle = "#" + me.style.color.getHexString();
        me.context.textAlign = me.style.textAlign;
        me.context.textBaseline = me.style.textBaseline;
        me.context.webkitImageSmoothingEnabled = true;
        me.context.font = me.style.isBold ? 'bold ' : 'normal ' + (me.style.fontSize * me.scale * 4) + 'px ' + me.style.fontFamily;
        // var offset = 0.8;
        // me.context.fillStyle = "#222222";
        // me.context.fillText(text, left - offset, top - offset);
        // me.context.fillStyle = "#222222";
        // me.context.fillText(text, left + offset, top - offset);
        // me.context.fillStyle = "#222222";
        // me.context.fillText(text, left - offset, top + offset);
        // me.context.fillStyle = "#222222";
        // me.context.fillText(text, left + offset, top + offset);
        me.context.fillStyle = "#" + me.style.color.getHexString();
        me.context.fillText(text, left, top);


        // charInfo.width = textMatric.width;
        // charInfo.height = textMatric.height;

        // charInfo.texcoords_left = (charInfo.left) * rcpTextureWidth;
        // charInfo.texcoords_right = (charInfo.left + charInfo.width) * rcpTextureWidth;
        // charInfo.texcoords_top = (charInfo.top) * rcpTextureHeight;
        // charInfo.texcoords_bottom = (charInfo.top + charInfo.height) * rcpTextureHeight;

    }

    drawTexts(texts) {
        let me = this;
        let maxWidth = -Infinity;
        let maxHeight = -Infinity;
        let top = 0;
        let left = 0;

        texts.forEach(text => {
            let size = me.measureText(text);
            if (maxWidth < size.width) {
                maxWidth = size.width;
            }
            if (maxHeight < size.height) {
                maxHeight = size.height;
            }
        });

        let canvasSize = me.resetCanvasSize({
            width: maxWidth * texts.length,
            height: maxHeight
        });

        texts.forEach((text, index) => {
            let size = me.measureText(text);
            //调整文字在纹理中的位置
            //垂直方向
            let subHeight = maxHeight - size.height;
            if (me.style.verticalAlign.toLowerCase() == 'middle') {
                //middle
                if (subHeight) {
                    top = subWidth * 0.5;
                }
            } else if (me.style.verticalAlign.toLowerCase() == 'bottom') {
                //bottom
                top = subHeight;
            } else {
                //top 
            }

            //水平方向
            let subWidth = maxWidth - size.width;
            if (me.style.textAlign.toLowerCase() == 'center') {

                if (subWidth > 0) {
                    left = maxWidth * index + subWidth * 0.5 + size.width * 0.5;
                }
            } else if (me.style.textAlign.toLowerCase() == 'right') {
                left = maxWidth * (index + 1);
            }

            me.context.fillStyle = "#" + me.style.color.getHexString();
            me.context.textAlign = me.style.textAlign;
            me.context.textBaseline = me.style.textBaseline;
            me.context.webkitImageSmoothingEnabled = true;

            me.context.font = me.style.isBold ? 'bold ' : 'normal ' + me.style.fontSize * me.scale + 'px ' + me.style.fontFamily;
            // var offset = 0.1;
            // me.context.fillStyle = "#222";
            // me.context.fillText(text, left - offset, top - offset);
            // me.context.fillStyle = "#222";
            // me.context.fillText(text, left + offset, top - offset);
            // me.context.fillStyle = "#222";
            // me.context.fillText(text, left - offset, top + offset);
            // me.context.fillStyle = "#222";
            // me.context.fillText(text, left + offset, top + offset);
            me.context.fillStyle = "#" + me.style.color.getHexString();

            //me.context.fillText(text, left * this.scale, top*this.scale);
            me.context.fillText(text, left , top);

            window._debug = true;
            if (window._debug) {
                console.log('left,top', left, top, maxWidth, size.width);
                document.body.appendChild(me.canvas);

                me.canvas.style.position = "absolute";
                me.canvas.style.left = "700px";
                me.canvas.style.top = "100px";
            }


        })
        return {
            width: maxWidth,
            height: maxHeight
        }
    }

    resetCanvasSize(size) {
        let me = this;

        let width = size.width;//_Math.ceilPowerOfTwo(size.width);
        let height = size.height;//_Math.ceilPowerOfTwo(size.height);

       

        me.canvas.width = width * this.scale;
        me.canvas.height = height * this.scale;

        me.canvas.style.width = width + 'px';
        me.canvas.style.height = height + 'px';

        me.context.scale( this.scale, this.scale);


        this.textureWidth = width;
        this.textureHeight = height;

        return {
            width,
            height
        }

    }

    measureText(text) {
        let size = null;
        let div = document.createElement("div");
        div.innerHTML = text;
        div.style.position = 'absolute';
        div.style.top = '-9999px';
        div.style.left = '-9999px';
        div.style.fontFamily = this.style.fontFamily;
        div.style.fontWeight = this.style.isBold ? 'bold' : 'normal';
        div.style.fontSize = this.style.fontSize  + 'px'; // or 'px'

        document.body.appendChild(div);
        size = {
            width: div.offsetWidth,
            height: div.offsetHeight
        }
        document.body.removeChild(div);
        div = null;

        return size;
    }

}

export { RenderFont };