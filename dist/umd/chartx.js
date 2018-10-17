(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (factory((global.Chartx = {})));
}(this, (function (exports) { 'use strict';

    /**
     * @class Events 事件对象
     * @description 事件对象
     * @author bujue
     */

    class Events {
        constructor() {}

        on(type, listener) {

            if (this._listeners === undefined) {
                this._listeners = {};
            }

            var listeners = this._listeners;

            if (listeners[type] === undefined) {

                listeners[type] = [];
            }

            if (listeners[type].indexOf(listener) === -1) {

                listeners[type].push(listener);
            }
        }

        has(type, listener) {

            if (this._listeners === undefined) return false;

            var listeners = this._listeners;

            return listeners[type] !== undefined && listeners[type].indexOf(listener) !== -1;
        }

        off(type, listener) {

            if (this._listeners === undefined) return;

            var listeners = this._listeners;
            var listenerArray = listeners[type];

            if (listenerArray !== undefined) {

                var index = listenerArray.indexOf(listener);

                if (index !== -1) {

                    listenerArray.splice(index, 1);
                }
            }
        }

        fire(event) {

            if (this._listeners === undefined) return;

            var listeners = this._listeners;
            var listenerArray = listeners[event.type];

            if (listenerArray !== undefined) {

                event.target = this;

                var array = listenerArray.slice(0);

                for (var i = 0, l = array.length; i < l; i++) {

                    array[i].call(this, event);
                }
            }
        }
    }

    const BackSide = 1;
    const DoubleSide = 2;
    const ClampToEdgeWrapping = 1001;
    const LinearFilter = 1006;
    const LinearMipMapLinearFilter = 1008;
    const UnsignedByteType = 1009;
    const RGBAFormat = 1023;
    const UVMapping = 300;
     //顶点颜色 去geometry.colors取色

    /**
     * @class Vector4
     * @description 用x,y,z,w 表示的四维向量 
     * @author bujue
     */

    const _Math = {
        DEG2RAD: Math.PI / 180,
        RAD2DEG: 180 / Math.PI,

        clamp(value, min, max) {

            return Math.max(min, Math.min(max, value));
        },
        // compute euclidian modulo of m % n
        // https://en.wikipedia.org/wiki/Modulo_operation

        euclideanModulo(n, m) {

            return (n % m + m) % m;
        },

        arrayMin(array) {

            if (array.length === 0) return Infinity;

            var min = array[0];

            for (var i = 1, l = array.length; i < l; ++i) {

                if (array[i] < min) min = array[i];
            }

            return min;
        },

        arrayMax(array) {

            if (array.length === 0) return -Infinity;

            var max = array[0];

            for (var i = 1, l = array.length; i < l; ++i) {

                if (array[i] > max) max = array[i];
            }

            return max;
        },
        //是否是2的幂次方
        isPowerOfTwo(value) {
            return (value & value - 1) === 0 && value !== 0;
        },
        //向下取一个数最接近的2的幂次方
        floorPowerOfTwo(value) {
            return Math.pow(2, Math.floor(Math.log(value) / Math.LN2));
        },
        //想上取一个数最接近的2的幂次方
        ceilPowerOfTwo: function (value) {
            return Math.pow(2, Math.ceil(Math.log(value) / Math.LN2));
        },

        degToRad(degrees) {
            return degrees * _Math.DEG2RAD;
        },

        radToDeg(radians) {
            return radians * _Math.RAD2DEG;
        }

    };

    // import { Matrix4 } from './Matrix4';
    // import { Quaternion } from './Quaternion';

    // var quaternion = new Quaternion();
    // var quaternion1 = new Quaternion();

    // var matrix = new Matrix4();
    // var matrix1 = new Matrix4();

    // var min = new Vector3();
    // var max = new Vector3();

    // var v1 = new Vector3();
    // var v2 = new Vector3();

    class Vector3$1 {

        constructor(x, y, z) {
            this.x = x || 0;
            this.y = y || 0;
            this.z = z || 0;
            this.isVector3 = true;
        }

        set(x, y, z) {

            this.x = x;
            this.y = y;
            this.z = z;

            return this;
        }

        setScalar(scalar) {

            this.x = scalar;
            this.y = scalar;
            this.z = scalar;

            return this;
        }

        setX(x) {

            this.x = x;

            return this;
        }

        setY(y) {

            this.y = y;

            return this;
        }

        setZ(z) {

            this.z = z;

            return this;
        }

        setComponent(index, value) {

            switch (index) {

                case 0:
                    this.x = value;break;
                case 1:
                    this.y = value;break;
                case 2:
                    this.z = value;break;
                default:
                    throw new Error('index is out of range: ' + index);

            }

            return this;
        }

        getComponent(index) {

            switch (index) {

                case 0:
                    return this.x;
                case 1:
                    return this.y;
                case 2:
                    return this.z;
                default:
                    throw new Error('index is out of range: ' + index);

            }
        }

        clone() {

            return new this.constructor(this.x, this.y, this.z);
        }

        copy(v) {

            this.x = v.x;
            this.y = v.y;
            this.z = v.z;

            return this;
        }

        add(v, w) {

            if (w !== undefined) {

                console.warn('Vector3: .add() now only accepts one argument. Use .addVectors( a, b ) instead.');
                return this.addVectors(v, w);
            }

            this.x += v.x;
            this.y += v.y;
            this.z += v.z;

            return this;
        }

        addScalar(s) {

            this.x += s;
            this.y += s;
            this.z += s;

            return this;
        }

        addVectors(a, b) {

            this.x = a.x + b.x;
            this.y = a.y + b.y;
            this.z = a.z + b.z;

            return this;
        }

        addScaledVector(v, s) {

            this.x += v.x * s;
            this.y += v.y * s;
            this.z += v.z * s;

            return this;
        }

        sub(v, w) {

            if (w !== undefined) {

                console.warn('Vector3: .sub() now only accepts one argument. Use .subVectors( a, b ) instead.');
                return this.subVectors(v, w);
            }

            this.x -= v.x;
            this.y -= v.y;
            this.z -= v.z;

            return this;
        }

        subScalar(s) {

            this.x -= s;
            this.y -= s;
            this.z -= s;

            return this;
        }

        subVectors(a, b) {

            this.x = a.x - b.x;
            this.y = a.y - b.y;
            this.z = a.z - b.z;

            return this;
        }

        multiply(v, w) {

            if (w !== undefined) {

                console.warn('Vector3: .multiply() now only accepts one argument. Use .multiplyVectors( a, b ) instead.');
                return this.multiplyVectors(v, w);
            }

            this.x *= v.x;
            this.y *= v.y;
            this.z *= v.z;

            return this;
        }

        multiplyScalar(scalar) {

            this.x *= scalar;
            this.y *= scalar;
            this.z *= scalar;

            return this;
        }

        multiplyVectors(a, b) {

            this.x = a.x * b.x;
            this.y = a.y * b.y;
            this.z = a.z * b.z;

            return this;
        }

        // applyEuler(euler) {

        //     if (!(euler && euler.isEuler)) {

        //         console.error('Vector3: .applyEuler() now expects an Euler rotation rather than a Vector3 and order.');

        //     }

        //     return this.applyQuaternion(quaternion.setFromEuler(euler));

        // }


        // applyAxisAngle(axis, angle) {

        //     return this.applyQuaternion(quaternion1.setFromAxisAngle(axis, angle));

        // }


        applyMatrix3(m) {

            var x = this.x,
                y = this.y,
                z = this.z;
            var e = m.elements;

            this.x = e[0] * x + e[3] * y + e[6] * z;
            this.y = e[1] * x + e[4] * y + e[7] * z;
            this.z = e[2] * x + e[5] * y + e[8] * z;

            return this;
        }

        applyMatrix4(m) {

            var x = this.x,
                y = this.y,
                z = this.z;
            var e = m.elements;

            var w = 1 / (e[3] * x + e[7] * y + e[11] * z + e[15]);

            this.x = (e[0] * x + e[4] * y + e[8] * z + e[12]) * w;
            this.y = (e[1] * x + e[5] * y + e[9] * z + e[13]) * w;
            this.z = (e[2] * x + e[6] * y + e[10] * z + e[14]) * w;

            return this;
        }

        applyQuaternion(q) {

            var x = this.x,
                y = this.y,
                z = this.z;
            var qx = q.x,
                qy = q.y,
                qz = q.z,
                qw = q.w;

            // calculate quat * vector

            var ix = qw * x + qy * z - qz * y;
            var iy = qw * y + qz * x - qx * z;
            var iz = qw * z + qx * y - qy * x;
            var iw = -qx * x - qy * y - qz * z;

            // calculate result * inverse quat

            this.x = ix * qw + iw * -qx + iy * -qz - iz * -qy;
            this.y = iy * qw + iw * -qy + iz * -qx - ix * -qz;
            this.z = iz * qw + iw * -qz + ix * -qy - iy * -qx;

            return this;
        }
        // project(camera) {

        //     matrix.multiplyMatrices(camera.projectionMatrix, matrix.getInverse(camera.matrixWorld));
        //     return this.applyMatrix4(matrix);

        // }


        // unproject(camera) {

        //     matrix1.multiplyMatrices(camera.matrixWorld, matrix1.getInverse(camera.projectionMatrix));
        //     return this.applyMatrix4(matrix1);

        // }


        transformDirection(m) {

            // input: Matrix4 affine matrix
            // vector interpreted as a direction

            var x = this.x,
                y = this.y,
                z = this.z;
            var e = m.elements;

            this.x = e[0] * x + e[4] * y + e[8] * z;
            this.y = e[1] * x + e[5] * y + e[9] * z;
            this.z = e[2] * x + e[6] * y + e[10] * z;

            return this.normalize();
        }

        divide(v) {

            this.x /= v.x;
            this.y /= v.y;
            this.z /= v.z;

            return this;
        }

        divideScalar(scalar) {

            return this.multiplyScalar(1 / scalar);
        }

        min(v) {

            this.x = Math.min(this.x, v.x);
            this.y = Math.min(this.y, v.y);
            this.z = Math.min(this.z, v.z);

            return this;
        }

        max(v) {

            this.x = Math.max(this.x, v.x);
            this.y = Math.max(this.y, v.y);
            this.z = Math.max(this.z, v.z);

            return this;
        }

        // clamp(min, max) {

        //     // assumes min < max, componentwise

        //     this.x = Math.max(min.x, Math.min(max.x, this.x));
        //     this.y = Math.max(min.y, Math.min(max.y, this.y));
        //     this.z = Math.max(min.z, Math.min(max.z, this.z));

        //     return this;

        // }

        // clampScalar(minVal, maxVal) {

        //     min.set(minVal, minVal, minVal);
        //     max.set(maxVal, maxVal, maxVal);

        //     return this.clamp(min, max);

        // }

        clampLength(min, max) {

            var length = this.length();

            return this.divideScalar(length || 1).multiplyScalar(Math.max(min, Math.min(max, length)));
        }

        floor() {

            this.x = Math.floor(this.x);
            this.y = Math.floor(this.y);
            this.z = Math.floor(this.z);

            return this;
        }

        ceil() {

            this.x = Math.ceil(this.x);
            this.y = Math.ceil(this.y);
            this.z = Math.ceil(this.z);

            return this;
        }

        round() {

            this.x = Math.round(this.x);
            this.y = Math.round(this.y);
            this.z = Math.round(this.z);

            return this;
        }

        roundToZero() {

            this.x = this.x < 0 ? Math.ceil(this.x) : Math.floor(this.x);
            this.y = this.y < 0 ? Math.ceil(this.y) : Math.floor(this.y);
            this.z = this.z < 0 ? Math.ceil(this.z) : Math.floor(this.z);

            return this;
        }

        negate() {

            this.x = -this.x;
            this.y = -this.y;
            this.z = -this.z;

            return this;
        }

        dot(v) {

            return this.x * v.x + this.y * v.y + this.z * v.z;
        }

        // TODO lengthSquared?

        lengthSq() {

            return this.x * this.x + this.y * this.y + this.z * this.z;
        }

        length() {

            return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
        }

        lengthManhattan() {

            return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z);
        }

        normalize() {

            return this.divideScalar(this.length() || 1);
        }

        setLength(length) {

            return this.normalize().multiplyScalar(length);
        }

        lerp(v, alpha) {

            this.x += (v.x - this.x) * alpha;
            this.y += (v.y - this.y) * alpha;
            this.z += (v.z - this.z) * alpha;

            return this;
        }

        lerpVectors(v1, v2, alpha) {

            return this.subVectors(v2, v1).multiplyScalar(alpha).add(v1);
        }

        cross(v, w) {

            if (w !== undefined) {

                console.warn('Vector3: .cross() now only accepts one argument. Use .crossVectors( a, b ) instead.');
                return this.crossVectors(v, w);
            }

            var x = this.x,
                y = this.y,
                z = this.z;

            this.x = y * v.z - z * v.y;
            this.y = z * v.x - x * v.z;
            this.z = x * v.y - y * v.x;

            return this;
        }

        crossVectors(a, b) {

            var ax = a.x,
                ay = a.y,
                az = a.z;
            var bx = b.x,
                by = b.y,
                bz = b.z;

            this.x = ay * bz - az * by;
            this.y = az * bx - ax * bz;
            this.z = ax * by - ay * bx;

            return this;
        }

        projectOnVector(vector) {

            var scalar = vector.dot(this) / vector.lengthSq();

            return this.copy(vector).multiplyScalar(scalar);
        }

        // projectOnPlane(planeNormal) {

        //     v1.copy(this).projectOnVector(planeNormal);

        //     return this.sub(v1);

        // }


        // reflect incident vector off plane orthogonal to normal
        // normal is assumed to have unit length


        // reflect(normal) {

        //     return this.sub(v2.copy(normal).multiplyScalar(2 * this.dot(normal)));

        // }


        angleTo(v) {

            var theta = this.dot(v) / Math.sqrt(this.lengthSq() * v.lengthSq());

            // clamp, to handle numerical problems

            return Math.acos(_Math.clamp(theta, -1, 1));
        }

        distanceTo(v) {

            return Math.sqrt(this.distanceToSquared(v));
        }

        distanceToSquared(v) {

            var dx = this.x - v.x,
                dy = this.y - v.y,
                dz = this.z - v.z;

            return dx * dx + dy * dy + dz * dz;
        }

        distanceToManhattan(v) {

            return Math.abs(this.x - v.x) + Math.abs(this.y - v.y) + Math.abs(this.z - v.z);
        }

        setFromSpherical(s) {

            var sinPhiRadius = Math.sin(s.phi) * s.radius;

            this.x = sinPhiRadius * Math.sin(s.theta);
            this.y = Math.cos(s.phi) * s.radius;
            this.z = sinPhiRadius * Math.cos(s.theta);

            return this;
        }

        setFromCylindrical(c) {

            this.x = c.radius * Math.sin(c.theta);
            this.y = c.y;
            this.z = c.radius * Math.cos(c.theta);

            return this;
        }

        setFromMatrixPosition(m) {

            var e = m.elements;

            this.x = e[12];
            this.y = e[13];
            this.z = e[14];

            return this;
        }

        setFromMatrixScale(m) {

            var sx = this.setFromMatrixColumn(m, 0).length();
            var sy = this.setFromMatrixColumn(m, 1).length();
            var sz = this.setFromMatrixColumn(m, 2).length();

            this.x = sx;
            this.y = sy;
            this.z = sz;

            return this;
        }

        setFromMatrixColumn(m, index) {

            return this.fromArray(m.elements, index * 4);
        }

        equals(v) {

            return v.x === this.x && v.y === this.y && v.z === this.z;
        }

        fromArray(array, offset) {

            if (offset === undefined) offset = 0;

            this.x = array[offset];
            this.y = array[offset + 1];
            this.z = array[offset + 2];

            return this;
        }

        toArray(array, offset) {

            if (array === undefined) array = [];
            if (offset === undefined) offset = 0;

            array[offset] = this.x;
            array[offset + 1] = this.y;
            array[offset + 2] = this.z;

            return array;
        }

        fromBufferAttribute(attribute, index, offset) {

            if (offset !== undefined) {

                console.warn('Vector3: offset has been removed from .fromBufferAttribute().');
            }

            this.x = attribute.getX(index);
            this.y = attribute.getY(index);
            this.z = attribute.getZ(index);

            return this;
        }
        clamp(min, max) {

            // assumes min < max, componentwise

            this.x = Math.max(min.x, Math.min(max.x, this.x));
            this.y = Math.max(min.y, Math.min(max.y, this.y));
            this.z = Math.max(min.z, Math.min(max.z, this.z));

            return this;
        }

        clampScalar(minVal, maxVal) {

            let min = new Vector3$1();
            let max = new Vector3$1();

            min.set(minVal, minVal, minVal);
            max.set(maxVal, maxVal, maxVal);

            return this.clamp(min, max);
        }

    }

    /**
     * @class Color
     * @description 颜色类
     * @author bujue
     */

    class Color$1 {
        constructor(r, g, b, a) {

            this.r = 1;
            this.g = 1;
            this.b = 1;
            this.a = 1;
            this.isColor = !0;
            if (g === undefined && b === undefined && a === undefined) {
                return this.set(r);
            }
            return this.setRGBA(r, g, b, a);
        }

        set(value) {
            if (value && value.isColor) {

                this.copy(value);
            } else if (typeof value === 'number') {

                this.setHex(value);
            } else if (typeof value === 'string') {

                this.setStyle(value);
            }

            return this;
        }
        //通过0xffffff 16进制赋值
        setHex(hex) {

            hex = Math.floor(hex);

            this.r = (hex >> 16 & 255) / 255;
            this.g = (hex >> 8 & 255) / 255;
            this.b = (hex & 255) / 255;

            return this;
        }
        //通过RGB方式设置颜色
        setRGB(r, g, b) {

            this.r = r;
            this.g = g;
            this.b = b;

            return this;
        }
        //通过RGBA方式设置颜色
        setRGBA(r, g, b, a) {

            this.r = r;
            this.g = g;
            this.b = b;
            this.a = a;

            return this;
        }
        //通过"#FFFFFF"方式设置颜色
        setStyle(style) {

            var m;

            if (m = /^((?:rgb|hsl)a?)\(\s*([^\)]*)\)/.exec(style)) {

                // rgb / hsl

                var color;
                var name = m[1];
                var components = m[2];

                switch (name) {

                    case 'rgb':
                    case 'rgba':
                        if (color = /^(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(,\s*([0-9]*\.?[0-9]+)\s*)?$/.exec(components)) {

                            // rgb(255,0,0) rgba(255,0,0,0.5)
                            this.r = Math.min(255, parseInt(color[1], 10)) / 255;
                            this.g = Math.min(255, parseInt(color[2], 10)) / 255;
                            this.b = Math.min(255, parseInt(color[3], 10)) / 255;

                            if (color[5]) {
                                if (color[5] > 1) {
                                    this.a = Math.min(255, parseInt(color[5], 10)) / 255;
                                } else {
                                    this.a = Math.min(1, color[5]);
                                }
                            }

                            return this;
                        }

                        if (color = /^(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(,\s*([0-9]*\.?[0-9]+)\s*)?$/.exec(components)) {

                            // rgb(100%,0%,0%) rgba(100%,0%,0%,0.5)
                            this.r = Math.min(100, parseInt(color[1], 10)) / 100;
                            this.g = Math.min(100, parseInt(color[2], 10)) / 100;
                            this.b = Math.min(100, parseInt(color[3], 10)) / 100;

                            if (color[5]) {
                                if (color[5] > 1) {
                                    this.a = Math.min(255, parseInt(color[5], 10)) / 255;
                                } else {
                                    this.a = Math.min(1, color[5]);
                                }
                            }

                            return this;
                        }

                        break;

                    case 'hsl':
                    case 'hsla':

                        if (color = /^([0-9]*\.?[0-9]+)\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(,\s*([0-9]*\.?[0-9]+)\s*)?$/.exec(components)) {

                            // hsl(120,50%,50%) hsla(120,50%,50%,0.5)
                            var h = parseFloat(color[1]) / 360;
                            var s = parseInt(color[2], 10) / 100;
                            var l = parseInt(color[3], 10) / 100;

                            if (color[5]) {
                                if (color[5] > 1) {
                                    this.a = Math.min(255, parseInt(color[5], 10)) / 255;
                                } else {
                                    this.a = Math.min(1, parseInt(color[5], 10));
                                }
                            }

                            return this.setHSL(h, s, l);
                        }

                        break;

                }
            } else if (m = /^\#([A-Fa-f0-9]+)$/.exec(style)) {

                // hex color

                var hex = m[1];
                var size = hex.length;

                if (size === 3) {

                    // #ff0
                    this.r = parseInt(hex.charAt(0) + hex.charAt(0), 16) / 255;
                    this.g = parseInt(hex.charAt(1) + hex.charAt(1), 16) / 255;
                    this.b = parseInt(hex.charAt(2) + hex.charAt(2), 16) / 255;

                    return this;
                } else if (size === 6) {

                    // #ff0000
                    this.r = parseInt(hex.charAt(0) + hex.charAt(1), 16) / 255;
                    this.g = parseInt(hex.charAt(2) + hex.charAt(3), 16) / 255;
                    this.b = parseInt(hex.charAt(4) + hex.charAt(5), 16) / 255;

                    return this;
                }
            }

            if (style && style.length > 0) {

                // color keywords
                var hex = ColorKeywords[style];

                if (hex !== undefined) {

                    // red
                    this.setHex(hex);
                } else {

                    // unknown color
                    console.warn('Color: Unknown color ' + style);
                }
            }

            return this;
        }

        copy(color) {

            this.r = color.r;
            this.g = color.g;
            this.b = color.b;

            return this;
        }

        setHSL(h, s, l) {
            return setHSL.call(this, h, s, l);
        }

        setHSLA(h, s, l, a) {
            let _color = setHSL.call(this, h, s, l);
            _color.a = a;
            return _color;
        }
        getHSL(target) {

            // h,s,l ranges are in 0.0 - 1.0

            if (target === undefined) {

                console.warn('Color: .getHSL() target is now required');
                target = { h: 0, s: 0, l: 0 };
            }

            var r = this.r,
                g = this.g,
                b = this.b;

            var max = Math.max(r, g, b);
            var min = Math.min(r, g, b);

            var hue, saturation;
            var lightness = (min + max) / 2.0;

            if (min === max) {

                hue = 0;
                saturation = 0;
            } else {

                var delta = max - min;

                saturation = lightness <= 0.5 ? delta / (max + min) : delta / (2 - max - min);

                switch (max) {

                    case r:
                        hue = (g - b) / delta + (g < b ? 6 : 0);break;
                    case g:
                        hue = (b - r) / delta + 2;break;
                    case b:
                        hue = (r - g) / delta + 4;break;

                }

                hue /= 6;
            }

            target.h = hue;
            target.s = saturation;
            target.l = lightness;

            return target;
        }

        clone() {
            return new this.constructor(this.r, this.g, this.b, this.a);
        }
        copy(color) {
            this.r = color.r;
            this.g = color.g;
            this.b = color.b;

            return this;
        }

        multiplyScalar(s) {

            this.r *= s;
            this.g *= s;
            this.b *= s;

            return this;
        }
        getHex() {

            return this.r * 255 << 16 ^ this.g * 255 << 8 ^ this.b * 255 << 0;
        }

        getHexString() {

            return ('000000' + this.getHex().toString(16)).slice(-6);
        }

    }

    var setHSL = function () {

        function hue2rgb(p, q, t) {

            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * 6 * (2 / 3 - t);
            return p;
        }

        return function setHSL(h, s, l) {

            // h,s,l ranges are in 0.0 - 1.0
            h = _Math.euclideanModulo(h, 1);
            s = _Math.clamp(s, 0, 1);
            l = _Math.clamp(l, 0, 1);

            if (s === 0) {

                this.r = this.g = this.b = l;
            } else {

                var p = l <= 0.5 ? l * (1 + s) : l + s - l * s;
                var q = 2 * l - p;

                this.r = hue2rgb(q, p, h + 1 / 3);
                this.g = hue2rgb(q, p, h);
                this.b = hue2rgb(q, p, h - 1 / 3);
            }

            return this;
        };
    }();

    var ColorKeywords = {
        'aliceblue': 0xF0F8FF, 'antiquewhite': 0xFAEBD7, 'aqua': 0x00FFFF, 'aquamarine': 0x7FFFD4, 'azure': 0xF0FFFF,
        'beige': 0xF5F5DC, 'bisque': 0xFFE4C4, 'black': 0x000000, 'blanchedalmond': 0xFFEBCD, 'blue': 0x0000FF, 'blueviolet': 0x8A2BE2,
        'brown': 0xA52A2A, 'burlywood': 0xDEB887, 'cadetblue': 0x5F9EA0, 'chartreuse': 0x7FFF00, 'chocolate': 0xD2691E, 'coral': 0xFF7F50,
        'cornflowerblue': 0x6495ED, 'cornsilk': 0xFFF8DC, 'crimson': 0xDC143C, 'cyan': 0x00FFFF, 'darkblue': 0x00008B, 'darkcyan': 0x008B8B,
        'darkgoldenrod': 0xB8860B, 'darkgray': 0xA9A9A9, 'darkgreen': 0x006400, 'darkgrey': 0xA9A9A9, 'darkkhaki': 0xBDB76B, 'darkmagenta': 0x8B008B,
        'darkolivegreen': 0x556B2F, 'darkorange': 0xFF8C00, 'darkorchid': 0x9932CC, 'darkred': 0x8B0000, 'darksalmon': 0xE9967A, 'darkseagreen': 0x8FBC8F,
        'darkslateblue': 0x483D8B, 'darkslategray': 0x2F4F4F, 'darkslategrey': 0x2F4F4F, 'darkturquoise': 0x00CED1, 'darkviolet': 0x9400D3,
        'deeppink': 0xFF1493, 'deepskyblue': 0x00BFFF, 'dimgray': 0x696969, 'dimgrey': 0x696969, 'dodgerblue': 0x1E90FF, 'firebrick': 0xB22222,
        'floralwhite': 0xFFFAF0, 'forestgreen': 0x228B22, 'fuchsia': 0xFF00FF, 'gainsboro': 0xDCDCDC, 'ghostwhite': 0xF8F8FF, 'gold': 0xFFD700,
        'goldenrod': 0xDAA520, 'gray': 0x808080, 'green': 0x008000, 'greenyellow': 0xADFF2F, 'grey': 0x808080, 'honeydew': 0xF0FFF0, 'hotpink': 0xFF69B4,
        'indianred': 0xCD5C5C, 'indigo': 0x4B0082, 'ivory': 0xFFFFF0, 'khaki': 0xF0E68C, 'lavender': 0xE6E6FA, 'lavenderblush': 0xFFF0F5, 'lawngreen': 0x7CFC00,
        'lemonchiffon': 0xFFFACD, 'lightblue': 0xADD8E6, 'lightcoral': 0xF08080, 'lightcyan': 0xE0FFFF, 'lightgoldenrodyellow': 0xFAFAD2, 'lightgray': 0xD3D3D3,
        'lightgreen': 0x90EE90, 'lightgrey': 0xD3D3D3, 'lightpink': 0xFFB6C1, 'lightsalmon': 0xFFA07A, 'lightseagreen': 0x20B2AA, 'lightskyblue': 0x87CEFA,
        'lightslategray': 0x778899, 'lightslategrey': 0x778899, 'lightsteelblue': 0xB0C4DE, 'lightyellow': 0xFFFFE0, 'lime': 0x00FF00, 'limegreen': 0x32CD32,
        'linen': 0xFAF0E6, 'magenta': 0xFF00FF, 'maroon': 0x800000, 'mediumaquamarine': 0x66CDAA, 'mediumblue': 0x0000CD, 'mediumorchid': 0xBA55D3,
        'mediumpurple': 0x9370DB, 'mediumseagreen': 0x3CB371, 'mediumslateblue': 0x7B68EE, 'mediumspringgreen': 0x00FA9A, 'mediumturquoise': 0x48D1CC,
        'mediumvioletred': 0xC71585, 'midnightblue': 0x191970, 'mintcream': 0xF5FFFA, 'mistyrose': 0xFFE4E1, 'moccasin': 0xFFE4B5, 'navajowhite': 0xFFDEAD,
        'navy': 0x000080, 'oldlace': 0xFDF5E6, 'olive': 0x808000, 'olivedrab': 0x6B8E23, 'orange': 0xFFA500, 'orangered': 0xFF4500, 'orchid': 0xDA70D6,
        'palegoldenrod': 0xEEE8AA, 'palegreen': 0x98FB98, 'paleturquoise': 0xAFEEEE, 'palevioletred': 0xDB7093, 'papayawhip': 0xFFEFD5, 'peachpuff': 0xFFDAB9,
        'peru': 0xCD853F, 'pink': 0xFFC0CB, 'plum': 0xDDA0DD, 'powderblue': 0xB0E0E6, 'purple': 0x800080, 'rebeccapurple': 0x663399, 'red': 0xFF0000, 'rosybrown': 0xBC8F8F,
        'royalblue': 0x4169E1, 'saddlebrown': 0x8B4513, 'salmon': 0xFA8072, 'sandybrown': 0xF4A460, 'seagreen': 0x2E8B57, 'seashell': 0xFFF5EE,
        'sienna': 0xA0522D, 'silver': 0xC0C0C0, 'skyblue': 0x87CEEB, 'slateblue': 0x6A5ACD, 'slategray': 0x708090, 'slategrey': 0x708090, 'snow': 0xFFFAFA,
        'springgreen': 0x00FF7F, 'steelblue': 0x4682B4, 'tan': 0xD2B48C, 'teal': 0x008080, 'thistle': 0xD8BFD8, 'tomato': 0xFF6347, 'turquoise': 0x40E0D0,
        'violet': 0xEE82EE, 'wheat': 0xF5DEB3, 'white': 0xFFFFFF, 'whitesmoke': 0xF5F5F5, 'yellow': 0xFFFF00, 'yellowgreen': 0x9ACD32
    };

    // var vector = new Vector3();
    // var matrix = new Matrix4();

    var v1 = new Vector3$1();
    var v2 = new Vector3$1();

    var x = new Vector3$1();
    var y = new Vector3$1();
    var z = new Vector3$1();

    class Matrix4 {
        constructor() {
            this.elements = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];

            if (arguments.length > 0) {

                console.error('Matrix4: the constructor no longer reads arguments. use .set() instead.');
            }
            this.isMatrix4 = true;
        }

        set(n11, n12, n13, n14, n21, n22, n23, n24, n31, n32, n33, n34, n41, n42, n43, n44) {

            var te = this.elements;

            te[0] = n11;te[4] = n12;te[8] = n13;te[12] = n14;
            te[1] = n21;te[5] = n22;te[9] = n23;te[13] = n24;
            te[2] = n31;te[6] = n32;te[10] = n33;te[14] = n34;
            te[3] = n41;te[7] = n42;te[11] = n43;te[15] = n44;

            return this;
        }

        identity() {

            this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);

            return this;
        }

        clone() {

            return new Matrix4().fromArray(this.elements);
        }

        copy(m) {

            var te = this.elements;
            var me = m.elements;

            te[0] = me[0];te[1] = me[1];te[2] = me[2];te[3] = me[3];
            te[4] = me[4];te[5] = me[5];te[6] = me[6];te[7] = me[7];
            te[8] = me[8];te[9] = me[9];te[10] = me[10];te[11] = me[11];
            te[12] = me[12];te[13] = me[13];te[14] = me[14];te[15] = me[15];

            return this;
        }

        copyPosition(m) {

            var te = this.elements,
                me = m.elements;

            te[12] = me[12];
            te[13] = me[13];
            te[14] = me[14];

            return this;
        }

        extractBasis(xAxis, yAxis, zAxis) {

            xAxis.setFromMatrixColumn(this, 0);
            yAxis.setFromMatrixColumn(this, 1);
            zAxis.setFromMatrixColumn(this, 2);

            return this;
        }

        makeBasis(xAxis, yAxis, zAxis) {

            this.set(xAxis.x, yAxis.x, zAxis.x, 0, xAxis.y, yAxis.y, zAxis.y, 0, xAxis.z, yAxis.z, zAxis.z, 0, 0, 0, 0, 1);

            return this;
        }

        extractRotation(m) {

            var te = this.elements;
            var me = m.elements;

            var scaleX = 1 / v1.setFromMatrixColumn(m, 0).length();
            var scaleY = 1 / v1.setFromMatrixColumn(m, 1).length();
            var scaleZ = 1 / v1.setFromMatrixColumn(m, 2).length();

            te[0] = me[0] * scaleX;
            te[1] = me[1] * scaleX;
            te[2] = me[2] * scaleX;

            te[4] = me[4] * scaleY;
            te[5] = me[5] * scaleY;
            te[6] = me[6] * scaleY;

            te[8] = me[8] * scaleZ;
            te[9] = me[9] * scaleZ;
            te[10] = me[10] * scaleZ;

            return this;
        }

        makeRotationFromEuler(euler) {

            if (!(euler && euler.isEuler)) {

                console.error('Matrix4: .makeRotationFromEuler() now expects a Euler rotation rather than a Vector3 and order.');
            }

            var te = this.elements;

            var x = euler.x,
                y = euler.y,
                z = euler.z;
            var a = Math.cos(x),
                b = Math.sin(x);
            var c = Math.cos(y),
                d = Math.sin(y);
            var e = Math.cos(z),
                f = Math.sin(z);

            if (euler.order === 'XYZ') {

                var ae = a * e,
                    af = a * f,
                    be = b * e,
                    bf = b * f;

                te[0] = c * e;
                te[4] = -c * f;
                te[8] = d;

                te[1] = af + be * d;
                te[5] = ae - bf * d;
                te[9] = -b * c;

                te[2] = bf - ae * d;
                te[6] = be + af * d;
                te[10] = a * c;
            } else if (euler.order === 'YXZ') {

                var ce = c * e,
                    cf = c * f,
                    de = d * e,
                    df = d * f;

                te[0] = ce + df * b;
                te[4] = de * b - cf;
                te[8] = a * d;

                te[1] = a * f;
                te[5] = a * e;
                te[9] = -b;

                te[2] = cf * b - de;
                te[6] = df + ce * b;
                te[10] = a * c;
            } else if (euler.order === 'ZXY') {

                var ce = c * e,
                    cf = c * f,
                    de = d * e,
                    df = d * f;

                te[0] = ce - df * b;
                te[4] = -a * f;
                te[8] = de + cf * b;

                te[1] = cf + de * b;
                te[5] = a * e;
                te[9] = df - ce * b;

                te[2] = -a * d;
                te[6] = b;
                te[10] = a * c;
            } else if (euler.order === 'ZYX') {

                var ae = a * e,
                    af = a * f,
                    be = b * e,
                    bf = b * f;

                te[0] = c * e;
                te[4] = be * d - af;
                te[8] = ae * d + bf;

                te[1] = c * f;
                te[5] = bf * d + ae;
                te[9] = af * d - be;

                te[2] = -d;
                te[6] = b * c;
                te[10] = a * c;
            } else if (euler.order === 'YZX') {

                var ac = a * c,
                    ad = a * d,
                    bc = b * c,
                    bd = b * d;

                te[0] = c * e;
                te[4] = bd - ac * f;
                te[8] = bc * f + ad;

                te[1] = f;
                te[5] = a * e;
                te[9] = -b * e;

                te[2] = -d * e;
                te[6] = ad * f + bc;
                te[10] = ac - bd * f;
            } else if (euler.order === 'XZY') {

                var ac = a * c,
                    ad = a * d,
                    bc = b * c,
                    bd = b * d;

                te[0] = c * e;
                te[4] = -f;
                te[8] = d * e;

                te[1] = ac * f + bd;
                te[5] = a * e;
                te[9] = ad * f - bc;

                te[2] = bc * f - ad;
                te[6] = b * e;
                te[10] = bd * f + ac;
            }

            // last column
            te[3] = 0;
            te[7] = 0;
            te[11] = 0;

            // bottom row
            te[12] = 0;
            te[13] = 0;
            te[14] = 0;
            te[15] = 1;

            return this;
        }

        makeRotationFromQuaternion(q) {

            var te = this.elements;

            var x = q._x,
                y = q._y,
                z = q._z,
                w = q._w;
            var x2 = x + x,
                y2 = y + y,
                z2 = z + z;
            var xx = x * x2,
                xy = x * y2,
                xz = x * z2;
            var yy = y * y2,
                yz = y * z2,
                zz = z * z2;
            var wx = w * x2,
                wy = w * y2,
                wz = w * z2;

            te[0] = 1 - (yy + zz);
            te[4] = xy - wz;
            te[8] = xz + wy;

            te[1] = xy + wz;
            te[5] = 1 - (xx + zz);
            te[9] = yz - wx;

            te[2] = xz - wy;
            te[6] = yz + wx;
            te[10] = 1 - (xx + yy);

            // last column
            te[3] = 0;
            te[7] = 0;
            te[11] = 0;

            // bottom row
            te[12] = 0;
            te[13] = 0;
            te[14] = 0;
            te[15] = 1;

            return this;
        }

        lookAt(eye, target, up) {

            var te = this.elements;

            z.subVectors(eye, target);

            if (z.lengthSq() === 0) {

                // eye and target are in the same position

                z.z = 1;
            }

            z.normalize();
            x.crossVectors(up, z);

            if (x.lengthSq() === 0) {

                // up and z are parallel

                if (Math.abs(up.z) === 1) {

                    z.x += 0.0001;
                } else {

                    z.z += 0.0001;
                }

                z.normalize();
                x.crossVectors(up, z);
            }

            x.normalize();
            y.crossVectors(z, x);

            te[0] = x.x;te[4] = y.x;te[8] = z.x;
            te[1] = x.y;te[5] = y.y;te[9] = z.y;
            te[2] = x.z;te[6] = y.z;te[10] = z.z;

            return this;
        }

        multiply(m, n) {

            if (n !== undefined) {

                console.warn('Matrix4: .multiply() now only accepts one argument. Use .multiplyMatrices( a, b ) instead.');
                return this.multiplyMatrices(m, n);
            }

            return this.multiplyMatrices(this, m);
        }

        premultiply(m) {

            return this.multiplyMatrices(m, this);
        }

        multiplyMatrices(a, b) {

            var ae = a.elements;
            var be = b.elements;
            var te = this.elements;

            var a11 = ae[0],
                a12 = ae[4],
                a13 = ae[8],
                a14 = ae[12];
            var a21 = ae[1],
                a22 = ae[5],
                a23 = ae[9],
                a24 = ae[13];
            var a31 = ae[2],
                a32 = ae[6],
                a33 = ae[10],
                a34 = ae[14];
            var a41 = ae[3],
                a42 = ae[7],
                a43 = ae[11],
                a44 = ae[15];

            var b11 = be[0],
                b12 = be[4],
                b13 = be[8],
                b14 = be[12];
            var b21 = be[1],
                b22 = be[5],
                b23 = be[9],
                b24 = be[13];
            var b31 = be[2],
                b32 = be[6],
                b33 = be[10],
                b34 = be[14];
            var b41 = be[3],
                b42 = be[7],
                b43 = be[11],
                b44 = be[15];

            te[0] = a11 * b11 + a12 * b21 + a13 * b31 + a14 * b41;
            te[4] = a11 * b12 + a12 * b22 + a13 * b32 + a14 * b42;
            te[8] = a11 * b13 + a12 * b23 + a13 * b33 + a14 * b43;
            te[12] = a11 * b14 + a12 * b24 + a13 * b34 + a14 * b44;

            te[1] = a21 * b11 + a22 * b21 + a23 * b31 + a24 * b41;
            te[5] = a21 * b12 + a22 * b22 + a23 * b32 + a24 * b42;
            te[9] = a21 * b13 + a22 * b23 + a23 * b33 + a24 * b43;
            te[13] = a21 * b14 + a22 * b24 + a23 * b34 + a24 * b44;

            te[2] = a31 * b11 + a32 * b21 + a33 * b31 + a34 * b41;
            te[6] = a31 * b12 + a32 * b22 + a33 * b32 + a34 * b42;
            te[10] = a31 * b13 + a32 * b23 + a33 * b33 + a34 * b43;
            te[14] = a31 * b14 + a32 * b24 + a33 * b34 + a34 * b44;

            te[3] = a41 * b11 + a42 * b21 + a43 * b31 + a44 * b41;
            te[7] = a41 * b12 + a42 * b22 + a43 * b32 + a44 * b42;
            te[11] = a41 * b13 + a42 * b23 + a43 * b33 + a44 * b43;
            te[15] = a41 * b14 + a42 * b24 + a43 * b34 + a44 * b44;

            return this;
        }

        multiplyScalar(s) {

            var te = this.elements;

            te[0] *= s;te[4] *= s;te[8] *= s;te[12] *= s;
            te[1] *= s;te[5] *= s;te[9] *= s;te[13] *= s;
            te[2] *= s;te[6] *= s;te[10] *= s;te[14] *= s;
            te[3] *= s;te[7] *= s;te[11] *= s;te[15] *= s;

            return this;
        }

        applyToBufferAttribute(attribute) {

            for (var i = 0, l = attribute.count; i < l; i++) {

                v2.x = attribute.getX(i);
                v2.y = attribute.getY(i);
                v2.z = attribute.getZ(i);

                v2.applyMatrix4(this);

                attribute.setXYZ(i, v2.x, v2.y, v2.z);
            }

            return attribute;
        }

        determinant() {

            var te = this.elements;

            var n11 = te[0],
                n12 = te[4],
                n13 = te[8],
                n14 = te[12];
            var n21 = te[1],
                n22 = te[5],
                n23 = te[9],
                n24 = te[13];
            var n31 = te[2],
                n32 = te[6],
                n33 = te[10],
                n34 = te[14];
            var n41 = te[3],
                n42 = te[7],
                n43 = te[11],
                n44 = te[15];

            //TODO: make this more efficient
            //( based on http://www.euclideanspace.com/maths/algebra/matrix/functions/inverse/fourD/index.htm )

            return n41 * (+n14 * n23 * n32 - n13 * n24 * n32 - n14 * n22 * n33 + n12 * n24 * n33 + n13 * n22 * n34 - n12 * n23 * n34) + n42 * (+n11 * n23 * n34 - n11 * n24 * n33 + n14 * n21 * n33 - n13 * n21 * n34 + n13 * n24 * n31 - n14 * n23 * n31) + n43 * (+n11 * n24 * n32 - n11 * n22 * n34 - n14 * n21 * n32 + n12 * n21 * n34 + n14 * n22 * n31 - n12 * n24 * n31) + n44 * (-n13 * n22 * n31 - n11 * n23 * n32 + n11 * n22 * n33 + n13 * n21 * n32 - n12 * n21 * n33 + n12 * n23 * n31);
        }

        transpose() {

            var te = this.elements;
            var tmp;

            tmp = te[1];te[1] = te[4];te[4] = tmp;
            tmp = te[2];te[2] = te[8];te[8] = tmp;
            tmp = te[6];te[6] = te[9];te[9] = tmp;

            tmp = te[3];te[3] = te[12];te[12] = tmp;
            tmp = te[7];te[7] = te[13];te[13] = tmp;
            tmp = te[11];te[11] = te[14];te[14] = tmp;

            return this;
        }

        setPosition(v) {

            var te = this.elements;

            te[12] = v.x;
            te[13] = v.y;
            te[14] = v.z;

            return this;
        }

        getInverse(m, throwOnDegenerate) {

            // based on http://www.euclideanspace.com/maths/algebra/matrix/functions/inverse/fourD/index.htm
            var te = this.elements,
                me = m.elements,
                n11 = me[0],
                n21 = me[1],
                n31 = me[2],
                n41 = me[3],
                n12 = me[4],
                n22 = me[5],
                n32 = me[6],
                n42 = me[7],
                n13 = me[8],
                n23 = me[9],
                n33 = me[10],
                n43 = me[11],
                n14 = me[12],
                n24 = me[13],
                n34 = me[14],
                n44 = me[15],
                t11 = n23 * n34 * n42 - n24 * n33 * n42 + n24 * n32 * n43 - n22 * n34 * n43 - n23 * n32 * n44 + n22 * n33 * n44,
                t12 = n14 * n33 * n42 - n13 * n34 * n42 - n14 * n32 * n43 + n12 * n34 * n43 + n13 * n32 * n44 - n12 * n33 * n44,
                t13 = n13 * n24 * n42 - n14 * n23 * n42 + n14 * n22 * n43 - n12 * n24 * n43 - n13 * n22 * n44 + n12 * n23 * n44,
                t14 = n14 * n23 * n32 - n13 * n24 * n32 - n14 * n22 * n33 + n12 * n24 * n33 + n13 * n22 * n34 - n12 * n23 * n34;

            var det = n11 * t11 + n21 * t12 + n31 * t13 + n41 * t14;

            if (det === 0) {

                var msg = "Matrix4: .getInverse() can't invert matrix, determinant is 0";

                if (throwOnDegenerate === true) {

                    throw new Error(msg);
                } else {

                    console.warn(msg);
                }

                return this.identity();
            }

            var detInv = 1 / det;

            te[0] = t11 * detInv;
            te[1] = (n24 * n33 * n41 - n23 * n34 * n41 - n24 * n31 * n43 + n21 * n34 * n43 + n23 * n31 * n44 - n21 * n33 * n44) * detInv;
            te[2] = (n22 * n34 * n41 - n24 * n32 * n41 + n24 * n31 * n42 - n21 * n34 * n42 - n22 * n31 * n44 + n21 * n32 * n44) * detInv;
            te[3] = (n23 * n32 * n41 - n22 * n33 * n41 - n23 * n31 * n42 + n21 * n33 * n42 + n22 * n31 * n43 - n21 * n32 * n43) * detInv;

            te[4] = t12 * detInv;
            te[5] = (n13 * n34 * n41 - n14 * n33 * n41 + n14 * n31 * n43 - n11 * n34 * n43 - n13 * n31 * n44 + n11 * n33 * n44) * detInv;
            te[6] = (n14 * n32 * n41 - n12 * n34 * n41 - n14 * n31 * n42 + n11 * n34 * n42 + n12 * n31 * n44 - n11 * n32 * n44) * detInv;
            te[7] = (n12 * n33 * n41 - n13 * n32 * n41 + n13 * n31 * n42 - n11 * n33 * n42 - n12 * n31 * n43 + n11 * n32 * n43) * detInv;

            te[8] = t13 * detInv;
            te[9] = (n14 * n23 * n41 - n13 * n24 * n41 - n14 * n21 * n43 + n11 * n24 * n43 + n13 * n21 * n44 - n11 * n23 * n44) * detInv;
            te[10] = (n12 * n24 * n41 - n14 * n22 * n41 + n14 * n21 * n42 - n11 * n24 * n42 - n12 * n21 * n44 + n11 * n22 * n44) * detInv;
            te[11] = (n13 * n22 * n41 - n12 * n23 * n41 - n13 * n21 * n42 + n11 * n23 * n42 + n12 * n21 * n43 - n11 * n22 * n43) * detInv;

            te[12] = t14 * detInv;
            te[13] = (n13 * n24 * n31 - n14 * n23 * n31 + n14 * n21 * n33 - n11 * n24 * n33 - n13 * n21 * n34 + n11 * n23 * n34) * detInv;
            te[14] = (n14 * n22 * n31 - n12 * n24 * n31 - n14 * n21 * n32 + n11 * n24 * n32 + n12 * n21 * n34 - n11 * n22 * n34) * detInv;
            te[15] = (n12 * n23 * n31 - n13 * n22 * n31 + n13 * n21 * n32 - n11 * n23 * n32 - n12 * n21 * n33 + n11 * n22 * n33) * detInv;

            return this;
        }

        scale(v) {

            var te = this.elements;
            var x = v.x,
                y = v.y,
                z = v.z;

            te[0] *= x;te[4] *= y;te[8] *= z;
            te[1] *= x;te[5] *= y;te[9] *= z;
            te[2] *= x;te[6] *= y;te[10] *= z;
            te[3] *= x;te[7] *= y;te[11] *= z;

            return this;
        }

        getMaxScaleOnAxis() {

            var te = this.elements;

            var scaleXSq = te[0] * te[0] + te[1] * te[1] + te[2] * te[2];
            var scaleYSq = te[4] * te[4] + te[5] * te[5] + te[6] * te[6];
            var scaleZSq = te[8] * te[8] + te[9] * te[9] + te[10] * te[10];

            return Math.sqrt(Math.max(scaleXSq, scaleYSq, scaleZSq));
        }

        makeTranslation(x, y, z) {

            this.set(1, 0, 0, x, 0, 1, 0, y, 0, 0, 1, z, 0, 0, 0, 1);

            return this;
        }

        makeRotationX(theta) {

            var c = Math.cos(theta),
                s = Math.sin(theta);

            this.set(1, 0, 0, 0, 0, c, -s, 0, 0, s, c, 0, 0, 0, 0, 1);

            return this;
        }

        makeRotationY(theta) {

            var c = Math.cos(theta),
                s = Math.sin(theta);

            this.set(c, 0, s, 0, 0, 1, 0, 0, -s, 0, c, 0, 0, 0, 0, 1);

            return this;
        }

        makeRotationZ(theta) {

            var c = Math.cos(theta),
                s = Math.sin(theta);

            this.set(c, -s, 0, 0, s, c, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);

            return this;
        }

        makeRotationAxis(axis, angle) {

            // Based on http://www.gamedev.net/reference/articles/article1199.asp

            var c = Math.cos(angle);
            var s = Math.sin(angle);
            var t = 1 - c;
            var x = axis.x,
                y = axis.y,
                z = axis.z;
            var tx = t * x,
                ty = t * y;

            this.set(tx * x + c, tx * y - s * z, tx * z + s * y, 0, tx * y + s * z, ty * y + c, ty * z - s * x, 0, tx * z - s * y, ty * z + s * x, t * z * z + c, 0, 0, 0, 0, 1);

            return this;
        }

        makeScale(x, y, z) {

            this.set(x, 0, 0, 0, 0, y, 0, 0, 0, 0, z, 0, 0, 0, 0, 1);

            return this;
        }

        makeShear(x, y, z) {

            this.set(1, y, z, 0, x, 1, z, 0, x, y, 1, 0, 0, 0, 0, 1);

            return this;
        }

        compose(position, quaternion, scale) {

            this.makeRotationFromQuaternion(quaternion);
            this.scale(scale);
            this.setPosition(position);

            return this;
        }

        decompose(position, quaternion, scale) {
            var _decompose = decompose.bind(this);
            return _decompose(position, quaternion, scale);
        }

        makePerspective(left, right, top, bottom, near, far) {

            if (far === undefined) {

                console.warn('Matrix4: .makePerspective() has been redefined and has a new signature. Please check the docs.');
            }

            var te = this.elements;
            var x = 2 * near / (right - left);
            var y = 2 * near / (top - bottom);

            var a = (right + left) / (right - left);
            var b = (top + bottom) / (top - bottom);
            var c = -(far + near) / (far - near);
            var d = -2 * far * near / (far - near);

            te[0] = x;te[4] = 0;te[8] = a;te[12] = 0;
            te[1] = 0;te[5] = y;te[9] = b;te[13] = 0;
            te[2] = 0;te[6] = 0;te[10] = c;te[14] = d;
            te[3] = 0;te[7] = 0;te[11] = -1;te[15] = 0;

            return this;
        }

        makeOrthographic(left, right, top, bottom, near, far) {

            var te = this.elements;
            var w = 1.0 / (right - left);
            var h = 1.0 / (top - bottom);
            var p = 1.0 / (far - near);

            var x = (right + left) * w;
            var y = (top + bottom) * h;
            var z = (far + near) * p;

            te[0] = 2 * w;te[4] = 0;te[8] = 0;te[12] = -x;
            te[1] = 0;te[5] = 2 * h;te[9] = 0;te[13] = -y;
            te[2] = 0;te[6] = 0;te[10] = -2 * p;te[14] = -z;
            te[3] = 0;te[7] = 0;te[11] = 0;te[15] = 1;

            return this;
        }

        equals(matrix) {

            var te = this.elements;
            var me = matrix.elements;

            for (var i = 0; i < 16; i++) {

                if (te[i] !== me[i]) return false;
            }

            return true;
        }

        fromArray(array, offset) {

            if (offset === undefined) offset = 0;

            for (var i = 0; i < 16; i++) {

                this.elements[i] = array[i + offset];
            }

            return this;
        }

        toArray(array, offset) {

            if (array === undefined) array = [];
            if (offset === undefined) offset = 0;

            var te = this.elements;

            array[offset] = te[0];
            array[offset + 1] = te[1];
            array[offset + 2] = te[2];
            array[offset + 3] = te[3];

            array[offset + 4] = te[4];
            array[offset + 5] = te[5];
            array[offset + 6] = te[6];
            array[offset + 7] = te[7];

            array[offset + 8] = te[8];
            array[offset + 9] = te[9];
            array[offset + 10] = te[10];
            array[offset + 11] = te[11];

            array[offset + 12] = te[12];
            array[offset + 13] = te[13];
            array[offset + 14] = te[14];
            array[offset + 15] = te[15];

            return array;
        }
    }

    var decompose = function () {

        var vector = new Vector3$1();
        var matrix = new Matrix4();

        return function decompose(position, quaternion, scale) {

            var te = this.elements;

            var sx = vector.set(te[0], te[1], te[2]).length();
            var sy = vector.set(te[4], te[5], te[6]).length();
            var sz = vector.set(te[8], te[9], te[10]).length();

            // if determine is negative, we need to invert one scale
            var det = this.determinant();
            if (det < 0) sx = -sx;

            position.x = te[12];
            position.y = te[13];
            position.z = te[14];

            // scale the rotation part
            matrix.copy(this);

            var invSX = 1 / sx;
            var invSY = 1 / sy;
            var invSZ = 1 / sz;

            matrix.elements[0] *= invSX;
            matrix.elements[1] *= invSX;
            matrix.elements[2] *= invSX;

            matrix.elements[4] *= invSY;
            matrix.elements[5] *= invSY;
            matrix.elements[6] *= invSY;

            matrix.elements[8] *= invSZ;
            matrix.elements[9] *= invSZ;
            matrix.elements[10] *= invSZ;

            quaternion.setFromRotationMatrix(matrix);

            scale.x = sx;
            scale.y = sy;
            scale.z = sz;

            return this;
        };
    }();

    class Box3 {
        constructor(min, max) {

            this.min = min !== undefined ? min : new Vector3$1(+Infinity, +Infinity, +Infinity);
            this.max = max !== undefined ? max : new Vector3$1(-Infinity, -Infinity, -Infinity);
            this.isBox3 = true;
        }
        set(min, max) {

            this.min.copy(min);
            this.max.copy(max);

            return this;
        }

        setFromArray(array) {

            var minX = +Infinity;
            var minY = +Infinity;
            var minZ = +Infinity;

            var maxX = -Infinity;
            var maxY = -Infinity;
            var maxZ = -Infinity;

            for (var i = 0, l = array.length; i < l; i += 3) {

                var x = array[i];
                var y = array[i + 1];
                var z = array[i + 2];

                if (x < minX) minX = x;
                if (y < minY) minY = y;
                if (z < minZ) minZ = z;

                if (x > maxX) maxX = x;
                if (y > maxY) maxY = y;
                if (z > maxZ) maxZ = z;
            }

            this.min.set(minX, minY, minZ);
            this.max.set(maxX, maxY, maxZ);

            return this;
        }

        setFromBufferAttribute(attribute) {

            var minX = +Infinity;
            var minY = +Infinity;
            var minZ = +Infinity;

            var maxX = -Infinity;
            var maxY = -Infinity;
            var maxZ = -Infinity;

            for (var i = 0, l = attribute.count; i < l; i++) {

                var x = attribute.getX(i);
                var y = attribute.getY(i);
                var z = attribute.getZ(i);

                if (x < minX) minX = x;
                if (y < minY) minY = y;
                if (z < minZ) minZ = z;

                if (x > maxX) maxX = x;
                if (y > maxY) maxY = y;
                if (z > maxZ) maxZ = z;
            }

            this.min.set(minX, minY, minZ);
            this.max.set(maxX, maxY, maxZ);

            return this;
        }

        setFromPoints(points) {

            this.makeEmpty();

            for (var i = 0, il = points.length; i < il; i++) {

                this.expandByPoint(points[i]);
            }

            return this;
        }

        setFromCenterAndSize(center, size) {

            return setFromCenterAndSize(center, size);
        }

        setFromObject(object) {

            this.makeEmpty();

            return this.expandByObject(object);
        }

        clone() {

            return new this.constructor().copy(this);
        }

        copy(box) {

            this.min.copy(box.min);
            this.max.copy(box.max);

            return this;
        }

        makeEmpty() {

            this.min.x = this.min.y = this.min.z = +Infinity;
            this.max.x = this.max.y = this.max.z = -Infinity;

            return this;
        }

        isEmpty() {

            // this is a more robust check for empty than ( volume <= 0 ) because volume can get positive with two negative axes

            return this.max.x < this.min.x || this.max.y < this.min.y || this.max.z < this.min.z;
        }

        getCenter(optionalTarget) {

            var result = optionalTarget || new Vector3$1();
            return this.isEmpty() ? result.set(0, 0, 0) : result.addVectors(this.min, this.max).multiplyScalar(0.5);
        }

        getSize(optionalTarget) {

            var result = optionalTarget || new Vector3$1();
            return this.isEmpty() ? result.set(0, 0, 0) : result.subVectors(this.max, this.min);
        }

        expandByPoint(point) {

            this.min.min(point);
            this.max.max(point);

            return this;
        }

        expandByVector(vector) {

            this.min.sub(vector);
            this.max.add(vector);

            return this;
        }

        expandByScalar(scalar) {

            this.min.addScalar(-scalar);
            this.max.addScalar(scalar);

            return this;
        }

        expandByObject(object) {
            return expandByObject.call(this, object);
        }

        containsPoint(point) {

            return point.x < this.min.x || point.x > this.max.x || point.y < this.min.y || point.y > this.max.y || point.z < this.min.z || point.z > this.max.z ? false : true;
        }

        containsBox(box) {

            return this.min.x <= box.min.x && box.max.x <= this.max.x && this.min.y <= box.min.y && box.max.y <= this.max.y && this.min.z <= box.min.z && box.max.z <= this.max.z;
        }

        getParameter(point, optionalTarget) {

            // This can potentially have a divide by zero if the box
            // has a size dimension of 0.

            var result = optionalTarget || new Vector3$1();

            return result.set((point.x - this.min.x) / (this.max.x - this.min.x), (point.y - this.min.y) / (this.max.y - this.min.y), (point.z - this.min.z) / (this.max.z - this.min.z));
        }

        intersectsBox(box) {

            // using 6 splitting planes to rule out intersections.
            return box.max.x < this.min.x || box.min.x > this.max.x || box.max.y < this.min.y || box.min.y > this.max.y || box.max.z < this.min.z || box.min.z > this.max.z ? false : true;
        }

        intersectsSphere(sphere) {
            return intersectsSphere(sphere);
        }

        intersectsPlane(plane) {

            // We compute the minimum and maximum dot product values. If those values
            // are on the same side (back or front) of the plane, then there is no intersection.

            var min, max;

            if (plane.normal.x > 0) {

                min = plane.normal.x * this.min.x;
                max = plane.normal.x * this.max.x;
            } else {

                min = plane.normal.x * this.max.x;
                max = plane.normal.x * this.min.x;
            }

            if (plane.normal.y > 0) {

                min += plane.normal.y * this.min.y;
                max += plane.normal.y * this.max.y;
            } else {

                min += plane.normal.y * this.max.y;
                max += plane.normal.y * this.min.y;
            }

            if (plane.normal.z > 0) {

                min += plane.normal.z * this.min.z;
                max += plane.normal.z * this.max.z;
            } else {

                min += plane.normal.z * this.max.z;
                max += plane.normal.z * this.min.z;
            }

            return min <= plane.constant && max >= plane.constant;
        }

        clampPoint(point, optionalTarget) {

            var result = optionalTarget || new Vector3$1();
            return result.copy(point).clamp(this.min, this.max);
        }

        distanceToPoint(point) {
            return distanceToPoint.call(this, point);
        }

        getBoundingSphere(optionalTarget) {
            return getBoundingSphere.call(this, optionalTarget);
        }

        intersect(box) {

            this.min.max(box.min);
            this.max.min(box.max);

            // ensure that if there is no overlap, the result is fully empty, not slightly empty with non-inf/+inf values that will cause subsequence intersects to erroneously return valid values.
            if (this.isEmpty()) this.makeEmpty();

            return this;
        }

        union(box) {

            this.min.min(box.min);
            this.max.max(box.max);

            return this;
        }

        applyMatrix4(matrix) {
            return applyMatrix4(matrix);
        }

        translate(offset) {

            this.min.add(offset);
            this.max.add(offset);

            return this;
        }

        equals(box) {

            return box.min.equals(this.min) && box.max.equals(this.max);
        }
    }

    var setFromCenterAndSize = function () {

        var v1 = new Vector3$1();

        return function setFromCenterAndSize(center, size) {

            var halfSize = v1.copy(size).multiplyScalar(0.5);

            this.min.copy(center).sub(halfSize);
            this.max.copy(center).add(halfSize);

            return this;
        };
    }();

    var expandByObject = function () {

        // Computes the world-axis-aligned bounding box of an object (including its children),
        // accounting for both the object's, and children's, world transforms

        var v1 = new Vector3$1();

        return function expandByObject(object) {

            var scope = this;

            object.updateMatrixWorld(true);

            object.traverse(function (node) {

                var i, l;

                var geometry = node.geometry;

                if (geometry !== undefined) {

                    if (geometry.isGeometry) {

                        var vertices = geometry.vertices;

                        for (i = 0, l = vertices.length; i < l; i++) {

                            v1.copy(vertices[i]);
                            v1.applyMatrix4(node.matrixWorld);

                            scope.expandByPoint(v1);
                        }
                    } else if (geometry.isBufferGeometry) {

                        var attribute = geometry.attributes.position;

                        if (attribute !== undefined) {

                            for (i = 0, l = attribute.count; i < l; i++) {

                                v1.fromBufferAttribute(attribute, i).applyMatrix4(node.matrixWorld);

                                scope.expandByPoint(v1);
                            }
                        }
                    }
                }
            });

            return this;
        };
    }();

    var intersectsSphere = function () {

        var closestPoint = new Vector3$1();

        return function intersectsSphere(sphere) {

            // Find the point on the AABB closest to the sphere center.
            this.clampPoint(sphere.center, closestPoint);

            // If that point is inside the sphere, the AABB and sphere intersect.
            return closestPoint.distanceToSquared(sphere.center) <= sphere.radius * sphere.radius;
        };
    }();

    var distanceToPoint = function () {

        var v1 = new Vector3$1();

        return function distanceToPoint(point) {

            var clampedPoint = v1.copy(point).clamp(this.min, this.max);
            return clampedPoint.sub(point).length();
        };
    }();

    var getBoundingSphere = function () {

        var v1 = new Vector3$1();

        return function getBoundingSphere(optionalTarget) {

            var result = optionalTarget || new Sphere();

            this.getCenter(result.center);

            result.radius = this.getSize(v1).length() * 0.5;

            return result;
        };
    }();

    var applyMatrix4 = function () {

        var points = [new Vector3$1(), new Vector3$1(), new Vector3$1(), new Vector3$1(), new Vector3$1(), new Vector3$1(), new Vector3$1(), new Vector3$1()];

        return function applyMatrix4(matrix) {

            // transform of empty box is an empty box.
            if (this.isEmpty()) return this;

            // NOTE: I am using a binary pattern to specify all 2^3 combinations below
            points[0].set(this.min.x, this.min.y, this.min.z).applyMatrix4(matrix); // 000
            points[1].set(this.min.x, this.min.y, this.max.z).applyMatrix4(matrix); // 001
            points[2].set(this.min.x, this.max.y, this.min.z).applyMatrix4(matrix); // 010
            points[3].set(this.min.x, this.max.y, this.max.z).applyMatrix4(matrix); // 011
            points[4].set(this.max.x, this.min.y, this.min.z).applyMatrix4(matrix); // 100
            points[5].set(this.max.x, this.min.y, this.max.z).applyMatrix4(matrix); // 101
            points[6].set(this.max.x, this.max.y, this.min.z).applyMatrix4(matrix); // 110
            points[7].set(this.max.x, this.max.y, this.max.z).applyMatrix4(matrix); // 111

            this.setFromPoints(points);

            return this;
        };
    }();

    class Sphere {
        constructor(center, radius) {
            this.center = center !== undefined ? center : new Vector3$1();
            this.radius = radius !== undefined ? radius : 0;
        }

        set(center, radius) {

            this.center.copy(center);
            this.radius = radius;

            return this;
        }

        setFromPoints(points, optionalCenter) {

            var center = this.center;
            var box = new Box3();

            if (optionalCenter !== undefined) {

                center.copy(optionalCenter);
            } else {

                box.setFromPoints(points).getCenter(center);
            }

            var maxRadiusSq = 0;

            for (var i = 0, il = points.length; i < il; i++) {

                maxRadiusSq = Math.max(maxRadiusSq, center.distanceToSquared(points[i]));
            }

            this.radius = Math.sqrt(maxRadiusSq);

            return this;
        }

        clone() {

            return new this.constructor().copy(this);
        }

        copy(sphere) {

            this.center.copy(sphere.center);
            this.radius = sphere.radius;

            return this;
        }

        empty() {

            return this.radius <= 0;
        }

        containsPoint(point) {

            return point.distanceToSquared(this.center) <= this.radius * this.radius;
        }

        distanceToPoint(point) {

            return point.distanceTo(this.center) - this.radius;
        }

        intersectsSphere(sphere) {

            var radiusSum = this.radius + sphere.radius;

            return sphere.center.distanceToSquared(this.center) <= radiusSum * radiusSum;
        }

        intersectsBox(box) {

            return box.intersectsSphere(this);
        }

        intersectsPlane(plane) {

            return Math.abs(plane.distanceToPoint(this.center)) <= this.radius;
        }

        clampPoint(point, optionalTarget) {

            var deltaLengthSq = this.center.distanceToSquared(point);

            var result = optionalTarget || new Vector3$1();

            result.copy(point);

            if (deltaLengthSq > this.radius * this.radius) {

                result.sub(this.center).normalize();
                result.multiplyScalar(this.radius).add(this.center);
            }

            return result;
        }

        getBoundingBox(optionalTarget) {

            var box = optionalTarget || new Box3();

            box.set(this.center, this.center);
            box.expandByScalar(this.radius);

            return box;
        }

        applyMatrix4(matrix) {

            this.center.applyMatrix4(matrix);
            this.radius = this.radius * matrix.getMaxScaleOnAxis();

            return this;
        }

        translate(offset) {

            this.center.add(offset);

            return this;
        }

        equals(sphere) {

            return sphere.center.equals(this.center) && sphere.radius === this.radius;
        }

    }

    var v1$1 = new Vector3$1();
    class Matrix3 {
        constructor() {
            this.elements = [1, 0, 0, 0, 1, 0, 0, 0, 1];

            if (arguments.length > 0) {

                console.error('Matrix3: the constructor no longer reads arguments. use .set() instead.');
            }
            this.isMatrix3 = true;
        }
        set(n11, n12, n13, n21, n22, n23, n31, n32, n33) {

            var te = this.elements;

            te[0] = n11;te[1] = n21;te[2] = n31;
            te[3] = n12;te[4] = n22;te[5] = n32;
            te[6] = n13;te[7] = n23;te[8] = n33;

            return this;
        }

        identity() {

            this.set(1, 0, 0, 0, 1, 0, 0, 0, 1);

            return this;
        }

        clone() {

            return new this.constructor().fromArray(this.elements);
        }

        copy(m) {

            var te = this.elements;
            var me = m.elements;

            te[0] = me[0];te[1] = me[1];te[2] = me[2];
            te[3] = me[3];te[4] = me[4];te[5] = me[5];
            te[6] = me[6];te[7] = me[7];te[8] = me[8];

            return this;
        }

        setFromMatrix4(m) {

            var me = m.elements;

            this.set(me[0], me[4], me[8], me[1], me[5], me[9], me[2], me[6], me[10]);

            return this;
        }

        applyToBufferAttribute(attribute) {

            for (var i = 0, l = attribute.count; i < l; i++) {

                v1$1.x = attribute.getX(i);
                v1$1.y = attribute.getY(i);
                v1$1.z = attribute.getZ(i);

                v1$1.applyMatrix3(this);

                attribute.setXYZ(i, v1$1.x, v1$1.y, v1$1.z);
            }

            return attribute;
        }

        setUvTransform(tx, ty, sx, sy, rotation, cx, cy) {

            var c = Math.cos(rotation);
            var s = Math.sin(rotation);

            this.set(sx * c, sx * s, -sx * (c * cx + s * cy) + cx + tx, -sy * s, sy * c, -sy * (-s * cx + c * cy) + cy + ty, 0, 0, 1);
        }

        multiply(m) {

            return this.multiplyMatrices(this, m);
        }

        premultiply(m) {

            return this.multiplyMatrices(m, this);
        }

        multiplyMatrices(a, b) {

            var ae = a.elements;
            var be = b.elements;
            var te = this.elements;

            var a11 = ae[0],
                a12 = ae[3],
                a13 = ae[6];
            var a21 = ae[1],
                a22 = ae[4],
                a23 = ae[7];
            var a31 = ae[2],
                a32 = ae[5],
                a33 = ae[8];

            var b11 = be[0],
                b12 = be[3],
                b13 = be[6];
            var b21 = be[1],
                b22 = be[4],
                b23 = be[7];
            var b31 = be[2],
                b32 = be[5],
                b33 = be[8];

            te[0] = a11 * b11 + a12 * b21 + a13 * b31;
            te[3] = a11 * b12 + a12 * b22 + a13 * b32;
            te[6] = a11 * b13 + a12 * b23 + a13 * b33;

            te[1] = a21 * b11 + a22 * b21 + a23 * b31;
            te[4] = a21 * b12 + a22 * b22 + a23 * b32;
            te[7] = a21 * b13 + a22 * b23 + a23 * b33;

            te[2] = a31 * b11 + a32 * b21 + a33 * b31;
            te[5] = a31 * b12 + a32 * b22 + a33 * b32;
            te[8] = a31 * b13 + a32 * b23 + a33 * b33;

            return this;
        }

        multiplyScalar(s) {

            var te = this.elements;

            te[0] *= s;te[3] *= s;te[6] *= s;
            te[1] *= s;te[4] *= s;te[7] *= s;
            te[2] *= s;te[5] *= s;te[8] *= s;

            return this;
        }

        determinant() {

            var te = this.elements;

            var a = te[0],
                b = te[1],
                c = te[2],
                d = te[3],
                e = te[4],
                f = te[5],
                g = te[6],
                h = te[7],
                i = te[8];

            return a * e * i - a * f * h - b * d * i + b * f * g + c * d * h - c * e * g;
        }

        getInverse(matrix, throwOnDegenerate) {

            if (matrix && matrix.isMatrix4) {

                console.error("Matrix3: .getInverse() no longer takes a Matrix4 argument.");
            }

            var me = matrix.elements,
                te = this.elements,
                n11 = me[0],
                n21 = me[1],
                n31 = me[2],
                n12 = me[3],
                n22 = me[4],
                n32 = me[5],
                n13 = me[6],
                n23 = me[7],
                n33 = me[8],
                t11 = n33 * n22 - n32 * n23,
                t12 = n32 * n13 - n33 * n12,
                t13 = n23 * n12 - n22 * n13,
                det = n11 * t11 + n21 * t12 + n31 * t13;

            if (det === 0) {

                var msg = "Matrix3: .getInverse() can't invert matrix, determinant is 0";

                if (throwOnDegenerate === true) {

                    throw new Error(msg);
                } else {

                    console.warn(msg);
                }

                return this.identity();
            }

            var detInv = 1 / det;

            te[0] = t11 * detInv;
            te[1] = (n31 * n23 - n33 * n21) * detInv;
            te[2] = (n32 * n21 - n31 * n22) * detInv;

            te[3] = t12 * detInv;
            te[4] = (n33 * n11 - n31 * n13) * detInv;
            te[5] = (n31 * n12 - n32 * n11) * detInv;

            te[6] = t13 * detInv;
            te[7] = (n21 * n13 - n23 * n11) * detInv;
            te[8] = (n22 * n11 - n21 * n12) * detInv;

            return this;
        }

        transpose() {

            var tmp,
                m = this.elements;

            tmp = m[1];m[1] = m[3];m[3] = tmp;
            tmp = m[2];m[2] = m[6];m[6] = tmp;
            tmp = m[5];m[5] = m[7];m[7] = tmp;

            return this;
        }

        getNormalMatrix(matrix4) {

            return this.setFromMatrix4(matrix4).getInverse(this).transpose();
        }

        transposeIntoArray(r) {

            var m = this.elements;

            r[0] = m[0];
            r[1] = m[3];
            r[2] = m[6];
            r[3] = m[1];
            r[4] = m[4];
            r[5] = m[7];
            r[6] = m[2];
            r[7] = m[5];
            r[8] = m[8];

            return this;
        }

        equals(matrix) {

            var te = this.elements;
            var me = matrix.elements;

            for (var i = 0; i < 9; i++) {

                if (te[i] !== me[i]) return false;
            }

            return true;
        }

        fromArray(array, offset) {

            if (offset === undefined) offset = 0;

            for (var i = 0; i < 9; i++) {

                this.elements[i] = array[i + offset];
            }

            return this;
        }

        toArray(array, offset) {

            if (array === undefined) array = [];
            if (offset === undefined) offset = 0;

            var te = this.elements;

            array[offset] = te[0];
            array[offset + 1] = te[1];
            array[offset + 2] = te[2];

            array[offset + 3] = te[3];
            array[offset + 4] = te[4];
            array[offset + 5] = te[5];

            array[offset + 6] = te[6];
            array[offset + 7] = te[7];
            array[offset + 8] = te[8];

            return array;
        }

    }

    var v1$2 = new Vector3$1();
    var v2$1 = new Vector3$1();

    var v3 = new Vector3$1();

    var v4 = new Vector3$1();
    var m1 = new Matrix3();

    class Plane {
        constructor(normal, constant) {
            // normal is assumed to be normalized

            this.normal = normal !== undefined ? normal : new Vector3$1(1, 0, 0);
            this.constant = constant !== undefined ? constant : 0;
        }

        set(normal, constant) {

            this.normal.copy(normal);
            this.constant = constant;

            return this;
        }

        setComponents(x, y, z, w) {

            this.normal.set(x, y, z);
            this.constant = w;

            return this;
        }

        setFromNormalAndCoplanarPoint(normal, point) {

            this.normal.copy(normal);
            this.constant = -point.dot(this.normal);

            return this;
        }

        setFromCoplanarPoints(a, b, c) {

            var normal = v1$2.subVectors(c, b).cross(v2$1.subVectors(a, b)).normalize();

            // Q: should an error be thrown if normal is zero (e.g. degenerate plane)?

            this.setFromNormalAndCoplanarPoint(normal, a);

            return this;
        }

        clone() {

            return new this.constructor().copy(this);
        }

        copy(plane) {

            this.normal.copy(plane.normal);
            this.constant = plane.constant;

            return this;
        }

        normalize() {

            // Note: will lead to a divide by zero if the plane is invalid.

            var inverseNormalLength = 1.0 / this.normal.length();
            this.normal.multiplyScalar(inverseNormalLength);
            this.constant *= inverseNormalLength;

            return this;
        }

        negate() {

            this.constant *= -1;
            this.normal.negate();

            return this;
        }

        distanceToPoint(point) {

            return this.normal.dot(point) + this.constant;
        }

        distanceToSphere(sphere) {

            return this.distanceToPoint(sphere.center) - sphere.radius;
        }

        projectPoint(point, optionalTarget) {

            var result = optionalTarget || new Vector3$1();

            return result.copy(this.normal).multiplyScalar(-this.distanceToPoint(point)).add(point);
        }
        intersectLine(line, optionalTarget) {

            var result = optionalTarget || new Vector3$1();

            var direction = line.delta(v3);

            var denominator = this.normal.dot(direction);

            if (denominator === 0) {

                // line is coplanar, return origin
                if (this.distanceToPoint(line.start) === 0) {

                    return result.copy(line.start);
                }

                // Unsure if this is the correct method to handle this case.
                return undefined;
            }

            var t = -(line.start.dot(this.normal) + this.constant) / denominator;

            if (t < 0 || t > 1) {

                return undefined;
            }

            return result.copy(direction).multiplyScalar(t).add(line.start);
        }

        intersectsLine(line) {

            // Note: this tests if a line intersects the plane, not whether it (or its end-points) are coplanar with it.

            var startSign = this.distanceToPoint(line.start);
            var endSign = this.distanceToPoint(line.end);

            return startSign < 0 && endSign > 0 || endSign < 0 && startSign > 0;
        }

        intersectsBox(box) {

            return box.intersectsPlane(this);
        }

        intersectsSphere(sphere) {

            return sphere.intersectsPlane(this);
        }

        coplanarPoint(optionalTarget) {

            var result = optionalTarget || new Vector3$1();

            return result.copy(this.normal).multiplyScalar(-this.constant);
        }

        applyMatrix4(matrix, optionalNormalMatrix) {

            var normalMatrix = optionalNormalMatrix || m1.getNormalMatrix(matrix);

            var referencePoint = this.coplanarPoint(v4).applyMatrix4(matrix);

            var normal = this.normal.applyMatrix3(normalMatrix).normalize();

            this.constant = -referencePoint.dot(normal);

            return this;
        }

        translate(offset) {

            this.constant -= offset.dot(this.normal);

            return this;
        }

        equals(plane) {

            return plane.normal.equals(this.normal) && plane.constant === this.constant;
        }
    }

    /**
     * @class WebGLProperties
     * @description 将Material相关的设置转换为对应的渲染参数并关联起来
     * @author bujue
     */

    /**
     * @description 获取运行环境的Webgl的支持能力
     * @author bujue
     * 
     * @returns
     * getMaxPrecision      获得Shader计算的最大精度 highp mediump lowp  
     * maxTextures          单个片段着色器能访问的纹理单元数，最低16，一般16或32, 获取纹理单元TEXTURE0，TEXTURE1，TEXTURE2...的最大数量
     * maxCombinedTextures  所有片段着色器总共能访问的纹理单元数（一个program可以有多个fragment shader），最低48，一般48~80 
     * maxTextureSize       可以接受的最大纹理如 2048 4096 8192
     * maxCubemapSize       可以接受的最大cube纹理如 2048 4096 8192
     * maxAttributes        最大可支持的顶点属性的个数 高性能的可以支持16个,低性能的小于这个数
     * maxVertexUniforms    顶点着色器中Uniform的最大个数 
     * maxFragmentUniforms  片元着色器中Uniform的最大个数
     * maxVaryings          着色器中最多的 VARYING 变量个数 
     */

    /**
     * @class Vector2
     * @description 二维向量
     * @author bujue
     */

    class Vector2 {
    	constructor(x, y) {
    		this.x = x || 0;
    		this.y = y || 0;
    		this.isVector2 = true;
    	}

    	get width() {

    		return this.x;
    	}

    	set width(value) {

    		this.x = value;
    	}

    	get height() {

    		return this.y;
    	}

    	set height(value) {

    		this.y = value;
    	}

    	set(x, y) {

    		this.x = x;
    		this.y = y;

    		return this;
    	}
    	clone() {

    		return new this.constructor(this.x, this.y);
    	}

    	copy(v) {

    		this.x = v.x;
    		this.y = v.y;

    		return this;
    	}

    	add(v, w) {

    		if (w !== undefined) {

    			console.warn('Vector2: .add() now only accepts one argument. Use .addVectors( a, b ) instead.');
    			return this.addVectors(v, w);
    		}

    		this.x += v.x;
    		this.y += v.y;

    		return this;
    	}

    	addScalar(s) {

    		this.x += s;
    		this.y += s;

    		return this;
    	}

    	addVectors(a, b) {

    		this.x = a.x + b.x;
    		this.y = a.y + b.y;

    		return this;
    	}

    	addScaledVector(v, s) {

    		this.x += v.x * s;
    		this.y += v.y * s;

    		return this;
    	}

    	sub(v, w) {

    		if (w !== undefined) {

    			console.warn('Vector2: .sub() now only accepts one argument. Use .subVectors( a, b ) instead.');
    			return this.subVectors(v, w);
    		}

    		this.x -= v.x;
    		this.y -= v.y;

    		return this;
    	}

    	subScalar(s) {

    		this.x -= s;
    		this.y -= s;

    		return this;
    	}

    	subVectors(a, b) {

    		this.x = a.x - b.x;
    		this.y = a.y - b.y;

    		return this;
    	}

    	multiply(v) {

    		this.x *= v.x;
    		this.y *= v.y;

    		return this;
    	}

    	multiplyScalar(scalar) {

    		this.x *= scalar;
    		this.y *= scalar;

    		return this;
    	}

    	divide(v) {

    		this.x /= v.x;
    		this.y /= v.y;

    		return this;
    	}

    	divideScalar(scalar) {

    		return this.multiplyScalar(1 / scalar);
    	}

    	fromBufferAttribute(attribute, index, offset) {

    		if (offset !== undefined) {

    			console.warn('Vector2: offset has been removed from .fromBufferAttribute().');
    		}

    		this.x = attribute.getX(index);
    		this.y = attribute.getY(index);

    		return this;
    	}

    }

    let UniformsLib = {
    	common: {

    		diffuse: { value: new Color$1(0xeeeeee) },
    		opacity: { value: 1.0 },

    		map: { value: null },
    		uvTransform: { value: new Matrix3() }

    	},
    	lights: {

    		ambientLightColor: { value: [] },

    		directionalLights: {
    			value: [], properties: {
    				direction: {},
    				color: {}
    			}
    		},

    		spotLights: {
    			value: [], properties: {
    				color: {},
    				position: {},
    				direction: {},
    				distance: {},
    				coneCos: {},
    				penumbraCos: {},
    				decay: {}
    			}
    		},

    		pointLights: {
    			value: [], properties: {
    				color: {},
    				position: {},
    				decay: {},
    				distance: {}
    			}
    		}

    	},
    	points: {

    		diffuse: { value: new Color$1(0xeeeeee) },
    		opacity: { value: 1.0 },
    		size: { value: 1.0 },
    		scale: { value: 1.0 },
    		map: { value: null },
    		uvTransform: { value: new Matrix3() }

    	},
    	line: {
    		scale: { value: 1 },
    		dashSize: { value: 1 },
    		totalSize: { value: 2 }
    	},
    	sprite: {

    		diffuse: { value: new Color$1(0xeeeeee) },
    		opacity: { value: 1.0 },
    		center: { value: new Vector2(0.5, 0.5) },
    		rotation: { value: 0.0 },
    		map: { value: null },
    		uvTransform: { value: new Matrix3() }

    	}
    };

    const UniformsUtils$1 = {

    	merge: function (uniforms) {

    		var merged = {};

    		for (var u = 0; u < uniforms.length; u++) {

    			var tmp = this.clone(uniforms[u]);

    			for (var p in tmp) {

    				merged[p] = tmp[p];
    			}
    		}

    		return merged;
    	},

    	clone: function (uniforms_src) {

    		var uniforms_dst = {};

    		for (var u in uniforms_src) {

    			uniforms_dst[u] = {};

    			for (var p in uniforms_src[u]) {

    				var parameter_src = uniforms_src[u][p];

    				if (parameter_src && (parameter_src.isColor || parameter_src.isMatrix3 || parameter_src.isMatrix4 || parameter_src.isVector2 || parameter_src.isVector3 || parameter_src.isVector4 || parameter_src.isTexture)) {

    					uniforms_dst[u][p] = parameter_src.clone();
    				} else if (Array.isArray(parameter_src)) {

    					uniforms_dst[u][p] = parameter_src.slice();
    				} else {

    					uniforms_dst[u][p] = parameter_src;
    				}
    			}
    		}

    		return uniforms_dst;
    	}

    };

    var meshbasic_frag = "uniform vec3 diffuse;\nuniform float opacity;\n#ifdef USE_COLOR\n\tvarying vec3 vColor;\n#endif\n#ifdef USE_MAP\n\tvarying vec2 vUv;\n\tuniform sampler2D map;\n#endif\nvoid main() {\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n#ifdef USE_MAP\n\tvec4 texelColor = texture2D( map, vUv );\n\tdiffuseColor *= texelColor;\n#endif\n#ifdef USE_COLOR\n\tdiffuseColor.rgb *= vColor;\n#endif\n\t\n\tgl_FragColor = diffuseColor;\n#ifdef PREMULTIPLIED_ALPHA\n\tgl_FragColor.rgb *= gl_FragColor.a;\n#endif\n}\n";

    var meshbasic_vert = "#if defined( USE_MAP ) \n\tvarying vec2 vUv;\n\tuniform mat3 uvTransform;\n#endif\n#ifdef USE_COLOR\n\tvarying vec3 vColor;\n#endif\nvoid main() {\n#if defined( USE_MAP ) \n\tvUv = ( uvTransform * vec3( uv, 1 ) ).xy;\n#endif\n#ifdef USE_COLOR\n\tvColor.xyz = color.xyz;\n#endif\n\t\n\tvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\n\tgl_Position = projectionMatrix * mvPosition;\n}";

    var linedashed_frag = "uniform vec3 diffuse;\nuniform float opacity;\nuniform float dashSize;\nuniform float totalSize;\nvarying float vLineDistance;\n#ifdef USE_COLOR\n\tvarying vec3 vColor;\n#endif\nvoid main() {\n\tif ( mod( vLineDistance, totalSize ) > dashSize ) {\n\t\tdiscard;\n\t}\n\tvec3 outgoingLight = vec3( 0.0 );\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n#ifdef USE_COLOR\n\t    diffuseColor.rgb *= vColor;\n#endif\n\toutgoingLight = diffuseColor.rgb;\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n#ifdef PREMULTIPLIED_ALPHA\n\tgl_FragColor.rgb *= gl_FragColor.a;\n#endif\t\n}\n";

    var linedashed_vert = "uniform float scale;\nattribute float lineDistance;\nvarying float vLineDistance;\n#ifdef USE_COLOR\n\tvarying vec3 vColor;\n#endif\nvoid main() {\n#ifdef USE_COLOR\n\t    vColor.xyz = color.xyz;\n#endif\n\tvLineDistance = scale * lineDistance;\n\tvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\n\tgl_Position = projectionMatrix * mvPosition;\n}\n";

    var points_frag = "uniform vec3 diffuse;\nuniform float opacity;\n#ifdef USE_COLOR\n\tvarying vec3 vColor;\n#endif\n#ifdef USE_MAP\n\tuniform mat3 uvTransform;\n\tuniform sampler2D map;\n#endif\nvoid main() {\n\tvec3 outgoingLight = vec3( 0.0 );\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n#ifdef USE_MAP\n\tvec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;\n\tvec4 mapTexel = texture2D( map, uv );\n\tdiffuseColor *=  mapTexel ;\n#endif\n#ifdef USE_COLOR\n\tdiffuseColor.rgb *= vColor;\n#endif\n\toutgoingLight = diffuseColor.rgb;\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n#ifdef PREMULTIPLIED_ALPHA\n\tgl_FragColor.rgb *= gl_FragColor.a;\n#endif\t\n}\n";

    var points_vert = "uniform float size;\nuniform float scale;\n#ifdef USE_COLOR\n\tvarying vec3 vColor;\n#endif\nvoid main() {\n\t#ifdef USE_COLOR\n\t    vColor.xyz = color.xyz;\n    #endif\n\tvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\n    gl_Position = projectionMatrix * mvPosition;\n\t#ifdef USE_SIZEATTENUATION\n\t\tgl_PointSize = size * ( scale / - mvPosition.z );\n\t#else\n\t\tgl_PointSize = size;\n\t#endif\n}\n";

    var meshlambert_frag = "uniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float opacity;\nvarying vec3 vLightFront;\n#ifdef DOUBLE_SIDED\n\tvarying vec3 vLightBack;\n#endif\n#define PI 3.14159265359\n#define PI2 6.28318530718\n#define PI_HALF 1.5707963267949\n#define RECIPROCAL_PI 0.31830988618\n#define RECIPROCAL_PI2 0.15915494\n#define LOG2 1.442695\n#define EPSILON 1e-6\n#define saturate(a) clamp( a, 0.0, 1.0 )\nstruct IncidentLight {\n\tvec3 color;\n\tvec3 direction;\n\tbool visible;\n};\nstruct GeometricContext {\n\tvec3 position;\n\tvec3 normal;\n\tvec3 viewDir;\n};\nstruct ReflectedLight {\n\tvec3 directDiffuse;\n\tvec3 directSpecular;\n\tvec3 indirectDiffuse;\n\tvec3 indirectSpecular;\n};\n#ifdef USE_COLOR\n\tvarying vec3 vColor;\n#endif\n#ifdef USE_MAP\n\tvarying vec2 vUv;\n#endif\n#ifdef USE_MAP\n\tuniform sampler2D map;\n#endif\nfloat punctualLightIntensityToIrradianceFactor( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {\n\tif( decayExponent > 0.0 ) {\n\t\treturn pow( saturate( -lightDistance / cutoffDistance + 1.0 ), decayExponent );\n\t}\n\treturn 1.0;\n}\nvec3 BRDF_Diffuse_Lambert( const in vec3 diffuseColor ) {\n\treturn RECIPROCAL_PI * diffuseColor;\n}\n    uniform vec3 ambientLightColor;\n#if NUM_DIR_LIGHTS > 0\n\tstruct DirectionalLight {\n\t\tvec3 direction;\n\t\tvec3 color;\n\t};\n\tuniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];\n\tvoid getDirectionalDirectLightIrradiance( const in DirectionalLight directionalLight, const in GeometricContext geometry, out IncidentLight directLight ) {\n\t\tdirectLight.color = directionalLight.color;\n\t\tdirectLight.direction = directionalLight.direction;\n\t\tdirectLight.visible = true;\n\t}\n#endif\n#if NUM_POINT_LIGHTS > 0\n\tstruct PointLight {\n\t\tvec3 position;\n\t\tvec3 color;\n\t\tfloat distance;\n\t\tfloat decay;\n\t};\n\tvoid getPointDirectLightIrradiance( const in PointLight pointLight, const in GeometricContext geometry, out IncidentLight directLight ) {\n\t\tvec3 lVector = pointLight.position - geometry.position;\n\t\tdirectLight.direction = normalize( lVector );\n\t\tfloat lightDistance = length( lVector );\n\t\tdirectLight.color = pointLight.color;\n\t\tdirectLight.visible = ( directLight.color != vec3( 0.0 ) );\n\t}\n#endif\n#if NUM_SPOT_LIGHTS > 0\n\tstruct SpotLight {\n\t\tvec3 position;\n\t\tvec3 direction;\n\t\tvec3 color;\n\t\tfloat distance;\n\t\tfloat decay;\n\t\tfloat coneCos;\n\t\tfloat penumbraCos;\n\t};\n\tuniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];\n\tvoid getSpotDirectLightIrradiance( const in SpotLight spotLight, const in GeometricContext geometry, out IncidentLight directLight  ) {\n\t\tvec3 lVector = spotLight.position - geometry.position;\n\t\tdirectLight.direction = normalize( lVector );\n\t\tfloat lightDistance = length( lVector );\n\t\tfloat angleCos = dot( directLight.direction, spotLight.direction );\n\t\tif ( angleCos > spotLight.coneCos ) {\n\t\t\tfloat spotEffect = smoothstep( spotLight.coneCos, spotLight.penumbraCos, angleCos );\n\t\t\tdirectLight.color = spotLight.color;\n\t\t\tdirectLight.color *= spotEffect * punctualLightIntensityToIrradianceFactor( lightDistance, spotLight.distance, spotLight.decay );\n\t\t\tdirectLight.visible = true;\n\t\t} else {\n\t\t\tdirectLight.color = vec3( 0.0 );\n\t\t\tdirectLight.visible = false;\n\t\t}\n\t}\n#endif\nvoid main() {\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n#ifdef USE_MAP\n\tvec4 texelColor = texture2D( map, vUv );\n\tdiffuseColor *= texelColor;\n#endif\n#ifdef USE_COLOR\n\tdiffuseColor.rgb *= vColor;\n#endif\n\treflectedLight.indirectDiffuse =  ambientLightColor;\n\treflectedLight.indirectDiffuse *= BRDF_Diffuse_Lambert( diffuseColor.rgb );\n\t#ifdef DOUBLE_SIDED\n\t\treflectedLight.directDiffuse = ( gl_FrontFacing ) ? vLightFront : vLightBack;\n\t#else\n\t\treflectedLight.directDiffuse = vLightFront;\n\t#endif\n\treflectedLight.directDiffuse *= BRDF_Diffuse_Lambert( diffuseColor.rgb );\n\tvec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n#ifdef PREMULTIPLIED_ALPHA\n\tgl_FragColor.rgb *= gl_FragColor.a;\n#endif\n}\n";

    var meshlambert_vert = "#define LAMBERT\nvarying vec3 vLightFront;\n#ifdef DOUBLE_SIDED\n\tvarying vec3 vLightBack;\n#endif\n#define PI 3.14159265359\n#define PI2 6.28318530718\n#define PI_HALF 1.5707963267949\n#define RECIPROCAL_PI 0.31830988618\n#define RECIPROCAL_PI2 0.15915494\n#define LOG2 1.442695\n#define EPSILON 1e-6\n#define saturate(a) clamp( a, 0.0, 1.0 )\nstruct IncidentLight {\n\tvec3 color;\n\tvec3 direction;\n\tbool visible;\n};\nstruct GeometricContext {\n\tvec3 position;\n\tvec3 normal;\n\tvec3 viewDir;\n};\n#ifdef USE_MAP\n\tvarying vec2 vUv;\n\tuniform mat3 uvTransform;\n#endif\nfloat punctualLightIntensityToIrradianceFactor( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {\n\tif( decayExponent > 0.0 ) {\n\t\treturn pow( saturate( -lightDistance / cutoffDistance + 1.0 ), decayExponent );\n\t}\n\treturn 1.0;\n}\nuniform vec3 ambientLightColor;\n#if NUM_DIR_LIGHTS > 0\n\tstruct DirectionalLight {\n\t\tvec3 direction;\n\t\tvec3 color;\n\t};\n\tuniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];\n\tvoid getDirectionalDirectLightIrradiance( const in DirectionalLight directionalLight, const in GeometricContext geometry, out IncidentLight directLight ) {\n\t\tdirectLight.color = directionalLight.color;\n\t\tdirectLight.direction = directionalLight.direction;\n\t\tdirectLight.visible = true;\n\t}\n#endif\n#if NUM_POINT_LIGHTS > 0\n\tstruct PointLight {\n\t\tvec3 position;\n\t\tvec3 color;\n\t\tfloat distance;\n\t\tfloat decay;\n\t};\n\tuniform PointLight pointLights[ NUM_POINT_LIGHTS ];\n\tvoid getPointDirectLightIrradiance( const in PointLight pointLight, const in GeometricContext geometry, out IncidentLight directLight ) {\n\t\tvec3 lVector = pointLight.position - geometry.position;\n\t\tdirectLight.direction = normalize( lVector );\n\t\tfloat lightDistance = length( lVector );\n\t\tdirectLight.color = pointLight.color;\n\t\tdirectLight.color *= punctualLightIntensityToIrradianceFactor( lightDistance, pointLight.distance, pointLight.decay );\n\t\tdirectLight.visible = ( directLight.color != vec3( 0.0 ) );\n\t}\n#endif\n#if NUM_SPOT_LIGHTS > 0\n\tstruct SpotLight {\n\t\tvec3 position;\n\t\tvec3 direction;\n\t\tvec3 color;\n\t\tfloat distance;\n\t\tfloat decay;\n\t\tfloat coneCos;\n\t\tfloat penumbraCos;\n\t};\n\tuniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];\n\tvoid getSpotDirectLightIrradiance( const in SpotLight spotLight, const in GeometricContext geometry, out IncidentLight directLight  ) {\n\t\tvec3 lVector = spotLight.position - geometry.position;\n\t\tdirectLight.direction = normalize( lVector );\n\t\tfloat lightDistance = length( lVector );\n\t\tfloat angleCos = dot( directLight.direction, spotLight.direction );\n\t\tif ( angleCos > spotLight.coneCos ) {\n\t\t\tfloat spotEffect = smoothstep( spotLight.coneCos, spotLight.penumbraCos, angleCos );\n\t\t\tdirectLight.color = spotLight.color;\n\t\t\tdirectLight.color *= spotEffect * punctualLightIntensityToIrradianceFactor( lightDistance, spotLight.distance, spotLight.decay );\n\t\t\tdirectLight.visible = true;\n\t\t} else {\n\t\t\tdirectLight.color = vec3( 0.0 );\n\t\t\tdirectLight.visible = false;\n\t\t}\n\t}\n#endif\n#ifdef USE_COLOR\n\tvarying vec3 vColor;\n#endif\nvoid main() {\n#ifdef USE_MAP  \n\tvUv = ( uvTransform * vec3( uv, 1 ) ).xy;\n#endif\n#ifdef USE_COLOR\n\tvColor.xyz = color.xyz;\n#endif\n\tvec3 objectNormal = vec3( normal );\n\tvec3 transformedNormal = normalMatrix * objectNormal;\n#ifdef FLIP_SIDED\n\ttransformedNormal = - transformedNormal;\n#endif\n\tvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\n\tgl_Position = projectionMatrix * mvPosition;\n\tvec3 diffuse = vec3( 1.0 );\n\tGeometricContext geometry;\n\tgeometry.position = mvPosition.xyz;\n\tgeometry.normal = normalize( transformedNormal );\n\tgeometry.viewDir = normalize( -mvPosition.xyz );\n\tGeometricContext backGeometry;\n\tbackGeometry.position = geometry.position;\n\tbackGeometry.normal = -geometry.normal;\n\tbackGeometry.viewDir = geometry.viewDir;\n\tvLightFront = vec3( 0.0 );\n#ifdef DOUBLE_SIDED\n\tvLightBack = vec3( 0.0 );\n#endif\n\tIncidentLight directLight;\n\tfloat dotNL;\n\tvec3 directLightColor_Diffuse;\n#if NUM_POINT_LIGHTS > 0\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {\n\t\tgetPointDirectLightIrradiance( pointLights[ i ], geometry, directLight );\n\t\tdotNL = dot( geometry.normal, directLight.direction );\n\t\tdirectLightColor_Diffuse = PI * directLight.color;\n\t\tvLightFront += saturate( dotNL ) * directLightColor_Diffuse;\n\t\t#ifdef DOUBLE_SIDED\n\t\t\tvLightBack += saturate( -dotNL ) * directLightColor_Diffuse;\n\t\t#endif\n\t}\n#endif\n#if NUM_SPOT_LIGHTS > 0\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {\n\t\tgetSpotDirectLightIrradiance( spotLights[ i ], geometry, directLight );\n\t\tdotNL = dot( geometry.normal, directLight.direction );\n\t\tdirectLightColor_Diffuse = PI * directLight.color;\n\t\tvLightFront += saturate( dotNL ) * directLightColor_Diffuse;\n\t\t#ifdef DOUBLE_SIDED\n\t\t\tvLightBack += saturate( -dotNL ) * directLightColor_Diffuse;\n\t\t#endif\n\t}\n#endif\n#if NUM_DIR_LIGHTS > 0\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {\n\t\tgetDirectionalDirectLightIrradiance( directionalLights[ i ], geometry, directLight );\n\t\tdotNL = dot( geometry.normal, directLight.direction );\n\t\tdirectLightColor_Diffuse = PI * directLight.color;\n\t\tvLightFront += saturate( dotNL ) * directLightColor_Diffuse;\n\t\t#ifdef DOUBLE_SIDED\n\t\t\tvLightBack += saturate( -dotNL ) * directLightColor_Diffuse;\n\t\t#endif\n\t}\n#endif\n}\n";

    var meshphong_frag = "#define PHONG\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform vec3 specular;\nuniform float shininess;\nuniform float opacity;\n#define PI 3.14159265359\n#define PI2 6.28318530718\n#define PI_HALF 1.5707963267949\n#define RECIPROCAL_PI 0.31830988618\n#define RECIPROCAL_PI2 0.15915494\n#define LOG2 1.442695\n#define EPSILON 1e-6\n#define saturate(a) clamp( a, 0.0, 1.0 )\nstruct IncidentLight {\n\tvec3 color;\n\tvec3 direction;\n\tbool visible;\n};\nstruct ReflectedLight {\n\tvec3 directDiffuse;\n\tvec3 directSpecular;\n\tvec3 indirectDiffuse;\n\tvec3 indirectSpecular;\n};\nstruct GeometricContext {\n\tvec3 position;\n\tvec3 normal;\n\tvec3 viewDir;\n};\nfloat punctualLightIntensityToIrradianceFactor( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {\n\tif( decayExponent > 0.0 ) {\n\t\treturn pow( saturate( -lightDistance / cutoffDistance + 1.0 ), decayExponent );\n\t}\n\treturn 1.0;\n}\n#ifdef USE_COLOR\n\tvarying vec3 vColor;\n#endif\n#ifdef  USE_MAP\n\tvarying vec2 vUv;\n    uniform sampler2D map;\n#endif\nuniform vec3 ambientLightColor;\nvec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {\n\tvec3 irradiance = ambientLightColor;\n\treturn irradiance;\n}\nvec3 BRDF_Diffuse_Lambert( const in vec3 diffuseColor ) {\n\treturn RECIPROCAL_PI * diffuseColor;\n}\nvec3 F_Schlick( const in vec3 specularColor, const in float dotLH ) {\n\tfloat fresnel = exp2( ( -5.55473 * dotLH - 6.98316 ) * dotLH );\n\treturn ( 1.0 - specularColor ) * fresnel + specularColor;\n}\nfloat G_BlinnPhong_Implicit( ) {\n\treturn 0.25;\n}\nfloat D_BlinnPhong( const in float shininess, const in float dotNH ) {\n\treturn RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );\n}\nvec3 BRDF_Specular_BlinnPhong( const in IncidentLight incidentLight, const in GeometricContext geometry, const in vec3 specularColor, const in float shininess ) {\n\tvec3 halfDir = normalize( incidentLight.direction + geometry.viewDir );\n\tfloat dotNH = saturate( dot( geometry.normal, halfDir ) );\n\tfloat dotLH = saturate( dot( incidentLight.direction, halfDir ) );\n\tvec3 F = F_Schlick( specularColor, dotLH );\n\tfloat G = G_BlinnPhong_Implicit( );\n\tfloat D = D_BlinnPhong( shininess, dotNH );\n\treturn F * ( G * D );\n}\n#if NUM_DIR_LIGHTS > 0\n\tstruct DirectionalLight {\n\t\tvec3 direction;\n\t\tvec3 color;\n\t};\n\tuniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];\n\tvoid getDirectionalDirectLightIrradiance( const in DirectionalLight directionalLight, const in GeometricContext geometry, out IncidentLight directLight ) {\n\t\tdirectLight.color = directionalLight.color;\n\t\tdirectLight.direction = directionalLight.direction;\n\t\tdirectLight.visible = true;\n\t}\n#endif\n#if NUM_POINT_LIGHTS > 0\n\tstruct PointLight {\n\t\tvec3 position;\n\t\tvec3 color;\n\t\tfloat distance;\n\t\tfloat decay;\n\t};\n\tuniform PointLight pointLights[ NUM_POINT_LIGHTS ];\n\tvoid getPointDirectLightIrradiance( const in PointLight pointLight, const in GeometricContext geometry, out IncidentLight directLight ) {\n\t\tvec3 lVector = pointLight.position - geometry.position;\n\t\tdirectLight.direction = normalize( lVector );\n\t\tfloat lightDistance = length( lVector );\n\t\tdirectLight.color = pointLight.color;\n\t\tdirectLight.color *= punctualLightIntensityToIrradianceFactor( lightDistance, pointLight.distance, pointLight.decay );\n\t\tdirectLight.visible = ( directLight.color != vec3( 0.0 ) );\n\t}\n#endif\n#if NUM_SPOT_LIGHTS > 0\n\tstruct SpotLight {\n\t\tvec3 position;\n\t\tvec3 direction;\n\t\tvec3 color;\n\t\tfloat distance;\n\t\tfloat decay;\n\t\tfloat coneCos;\n\t\tfloat penumbraCos;\n\t};\n\tuniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];\n\tvoid getSpotDirectLightIrradiance( const in SpotLight spotLight, const in GeometricContext geometry, out IncidentLight directLight  ) {\n\t\tvec3 lVector = spotLight.position - geometry.position;\n\t\tdirectLight.direction = normalize( lVector );\n\t\tfloat lightDistance = length( lVector );\n\t\tfloat angleCos = dot( directLight.direction, spotLight.direction );\n\t\tif ( angleCos > spotLight.coneCos ) {\n\t\t\tfloat spotEffect = smoothstep( spotLight.coneCos, spotLight.penumbraCos, angleCos );\n\t\t\tdirectLight.color = spotLight.color;\n\t\t\tdirectLight.color *= spotEffect * punctualLightIntensityToIrradianceFactor( lightDistance, spotLight.distance, spotLight.decay );\n\t\t\tdirectLight.visible = true;\n\t\t} else {\n\t\t\tdirectLight.color = vec3( 0.0 );\n\t\t\tdirectLight.visible = false;\n\t\t}\n\t}\n#endif\n    varying vec3 vViewPosition;\n\tvarying vec3 vNormal;\nstruct BlinnPhongMaterial {\n\tvec3\tdiffuseColor;\n\tvec3\tspecularColor;\n\tfloat\tspecularShininess;\n\tfloat\tspecularStrength;\n};\nvoid RE_Direct_BlinnPhong( const in IncidentLight directLight, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {\n\t\tfloat dotNL = saturate( dot( geometry.normal, directLight.direction ) );\n\t\tvec3 irradiance = dotNL * directLight.color;\n\t\tirradiance *= PI;\n\treflectedLight.directDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n\treflectedLight.directSpecular += irradiance * BRDF_Specular_BlinnPhong( directLight, geometry, material.specularColor, material.specularShininess ) * material.specularStrength;\n}\nvoid RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {\n\treflectedLight.indirectDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n}\n#define RE_Direct\t\t\t\tRE_Direct_BlinnPhong\n#define RE_IndirectDiffuse\t\tRE_IndirectDiffuse_BlinnPhong\nvoid main() {\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n#ifdef USE_MAP\n\tvec4 texelColor = texture2D( map, vUv );\n\tdiffuseColor *= texelColor;\n#endif\n#ifdef USE_COLOR\n\tdiffuseColor.rgb *= vColor;\n#endif\nfloat specularStrength = 1.0;\n\tvec3 normal = normalize( vNormal );\n#ifdef DOUBLE_SIDED\n\t\tnormal = normal * ( float( gl_FrontFacing ) * 2.0 - 1.0 );\n#endif\n\tBlinnPhongMaterial material;\n    material.diffuseColor = diffuseColor.rgb;\n    material.specularColor = specular;\n    material.specularShininess = shininess;\n    material.specularStrength = specularStrength;\n    GeometricContext geometry;\n    geometry.position = - vViewPosition;\n    geometry.normal = normal;\n    geometry.viewDir = normalize( vViewPosition );\n    IncidentLight directLight;\n#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )\n\tPointLight pointLight;\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {\n\t\tpointLight = pointLights[ i ];\n\t\tgetPointDirectLightIrradiance( pointLight, geometry, directLight );\n\t\tRE_Direct( directLight, geometry, material, reflectedLight );\n\t}\n#endif\n#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )\n\tSpotLight spotLight;\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {\n\t\tspotLight = spotLights[ i ];\n\t\tgetSpotDirectLightIrradiance( spotLight, geometry, directLight );\n\t\tRE_Direct( directLight, geometry, material, reflectedLight );\n\t}\n#endif\n#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )\n\tDirectionalLight directionalLight;\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {\n\t\tdirectionalLight = directionalLights[ i ];\n\t\tgetDirectionalDirectLightIrradiance( directionalLight, geometry, directLight );\n\t\tRE_Direct( directLight, geometry, material, reflectedLight );\n\t}\n#endif\n#if defined( RE_IndirectDiffuse )\n\tvec3 irradiance = getAmbientLightIrradiance( ambientLightColor );\n#endif\n#if defined( RE_IndirectSpecular )\n\tvec3 radiance = vec3( 0.0 );\n\tvec3 clearCoatRadiance = vec3( 0.0 );\n#endif\n#if defined( RE_IndirectDiffuse )\n\tRE_IndirectDiffuse( irradiance, geometry, material, reflectedLight );\n#endif\n#if defined( RE_IndirectSpecular )\n\tRE_IndirectSpecular( radiance, clearCoatRadiance, geometry, material, reflectedLight );\n#endif\n\tvec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n#ifdef PREMULTIPLIED_ALPHA\n\tgl_FragColor.rgb *= gl_FragColor.a;\n#endif\n}\n";

    var meshphong_vert = "#define PHONG\n    varying vec3 vViewPosition;\n\tvarying vec3 vNormal;\n#ifdef USE_MAP \n\tvarying vec2 vUv;\n\tuniform mat3 uvTransform;\n#endif\n#ifdef USE_COLOR\n\tvarying vec3 vColor;\n#endif\nvoid main() {\n#ifdef USE_MAP\n\tvUv = ( uvTransform * vec3( uv, 1 ) ).xy;\n#endif\n#ifdef USE_COLOR\n\tvColor.xyz = color.xyz;\n#endif\nvec3 objectNormal = vec3( normal );\nvec3 transformedNormal = normalMatrix * objectNormal;\n#ifdef FLIP_SIDED\n\ttransformedNormal = - transformedNormal;\n#endif\n\tvNormal = normalize( transformedNormal );\n\tvec3 transformed = vec3( position );\n\tvec4 mvPosition = modelViewMatrix * vec4( transformed, 1.0 );\n    gl_Position = projectionMatrix * mvPosition;\n\tvViewPosition = - mvPosition.xyz;\n}\n";

    var linemesh_frag = "uniform vec3 diffuse;\nuniform float opacity;\n#ifdef USE_DASH\n    uniform float dashSize;\n    uniform float totalSize;\n    varying float vLineDistance;\n#endif\n#ifdef USE_COLOR\n\tvarying vec3 vColor;\n#endif\nvarying vec2 vUv;\nvoid main() {\n    #ifdef USE_DASH\n        if ( vUv.y < - 1.0 || vUv.y > 1.0 ) discard;\n    if ( mod( vLineDistance, totalSize ) > dashSize ) {\n\t\tdiscard;\n\t}\n    #endif\n    if ( abs( vUv.y ) > 1.0 ) {\n        float a = vUv.x;\n        float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;\n        float len2 = a * a + b * b;\n        if ( len2 > 1.0 ) discard;\n    }\n    vec4 diffuseColor = vec4( diffuse, opacity );\n#ifdef USE_COLOR\n\tdiffuseColor.rgb *= vColor;\n#endif\n    gl_FragColor =vec4( diffuseColor.rgb, diffuseColor.a );\n#ifdef PREMULTIPLIED_ALPHA\n\tgl_FragColor.rgb *= gl_FragColor.a;\n#endif\n}";

    var linemesh_vert = "uniform float linewidth;\nuniform vec2 resolution;\nattribute vec3 instanceStart;\nattribute vec3 instanceEnd;\nattribute vec3 instanceColorStart;\nattribute vec3 instanceColorEnd;\nvarying vec2 vUv;\n#ifdef USE_COLOR\n\tvarying vec3 vColor;\n#endif\n#ifdef USE_DASH\n    uniform float scale;\n    attribute float instanceDistanceStart;\n    attribute float instanceDistanceEnd;\n    varying float vLineDistance;\n    \n#endif\nvoid trimSegment( const in vec4 start, inout vec4 end ) {\n    float a = projectionMatrix[ 2 ][ 2 ];    float b = projectionMatrix[ 3 ][ 2 ];    float nearEstimate = - 0.5 * b / a;\n    float alpha = ( nearEstimate - start.z ) / ( end.z - start.z );\n    end.xyz = mix( start.xyz, end.xyz, alpha );\n}\nvoid main() {\n#ifdef USE_COLOR\n        vColor.xyz = ( position.y < 0.5 ) ? instanceColorStart : instanceColorEnd;\n#endif\n#ifdef USE_DASH\n    vLineDistance = ( position.y < 0.5 ) ? scale * instanceDistanceStart : scale * instanceDistanceEnd;\n#endif\n    float aspect = resolution.x / resolution.y;\n    vUv = uv;\n    vec4 start = modelViewMatrix * vec4( instanceStart, 1.0 );\n    vec4 end = modelViewMatrix * vec4( instanceEnd, 1.0 );\n    bool perspective = ( projectionMatrix[ 2 ][ 3 ] == - 1.0 );    if ( perspective ) {\n        if ( start.z < 0.0 && end.z >= 0.0 ) {\n            trimSegment( start, end );\n        } else if ( end.z < 0.0 && start.z >= 0.0 ) {\n            trimSegment( end, start );\n        }\n    }\n    vec4 clipStart = projectionMatrix * start;\n    vec4 clipEnd = projectionMatrix * end;\n    vec2 ndcStart = clipStart.xy / clipStart.w;\n    vec2 ndcEnd = clipEnd.xy / clipEnd.w;\n    vec2 dir = ndcEnd - ndcStart;\n    dir.x *= aspect;\n    dir = normalize( dir );\n    vec2 offset = vec2( dir.y, - dir.x );\n    dir.x /= aspect;\n    offset.x /= aspect;\n    if ( position.x < 0.0 ) offset *= - 1.0;\n    if ( position.y < 0.0 ) {\n        offset += - dir;\n    } else if ( position.y > 1.0 ) {\n        offset += dir;\n    }\n    offset *= linewidth;\n    offset /= resolution.y;\n    vec4 clip = ( position.y < 0.5 ) ? clipStart : clipEnd;\n    offset *= clip.w;\n    clip.xy += offset;\n    gl_Position =clip;\n    vec4 mvPosition = ( position.y < 0.5 ) ? start : end;}";

    var sprite_frag = "uniform vec3 diffuse;\nuniform float opacity;\n#ifdef USE_MAP\n\tvarying vec2 vUv;\n#endif\n#ifdef USE_MAP\n\tuniform sampler2D map;\n#endif\nvoid main() {\n\tvec3 outgoingLight = vec3( 0.0 );\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n#ifdef USE_MAP\n\tvec4 texelColor = texture2D( map, vUv );\n\tdiffuseColor *= texelColor;\n#endif\n#ifdef ALPHATEST\n\tif ( diffuseColor.a < ALPHATEST ) discard;\n#endif\n\toutgoingLight = diffuseColor.rgb;\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n}";

    var sprite_vert = "uniform float rotation;\nuniform vec2 center;\n#ifdef USE_MAP\n\tvarying vec2 vUv;\n\tuniform mat3 uvTransform;\n#endif\nvoid main() {\n#ifdef USE_MAP\n\tvUv = ( uvTransform * vec3( uv, 1 ) ).xy;\n#endif\n\tvec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );\n\tvec2 scale;\n\tscale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );\n\tscale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );\n\t#ifndef USE_SIZEATTENUATION\n\t\tbool isPerspective = ( projectionMatrix[ 2 ][ 3 ] == - 1.0 );\n\t\tif ( isPerspective ) scale *= - mvPosition.z;\n\t#endif\n\tvec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;\n\tvec2 rotatedPosition;\n\trotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;\n\trotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;\n\tmvPosition.xy += rotatedPosition;\n\tgl_Position = projectionMatrix * mvPosition;\n}";

    const ShaderChunk = {

    	meshbasic_frag,
    	meshbasic_vert,

    	linedashed_vert,
    	linedashed_frag,

    	points_vert,
    	points_frag,

    	meshlambert_vert,
    	meshlambert_frag,

    	meshphong_vert,
    	meshphong_frag,

    	linemesh_vert,
    	linemesh_frag,

    	sprite_vert,
    	sprite_frag

    };

    let ShaderLib = {

    	basic: {

    		uniforms: UniformsUtils$1.merge([UniformsLib.common]),

    		vertexShader: ShaderChunk.meshbasic_vert,
    		fragmentShader: ShaderChunk.meshbasic_frag

    	},
    	lambert: {

    		uniforms: UniformsUtils$1.merge([UniformsLib.common, UniformsLib.lights, {
    			emissive: { value: new Color$1(0x000000) }
    		}]),

    		vertexShader: ShaderChunk.meshlambert_vert,
    		fragmentShader: ShaderChunk.meshlambert_frag

    	},
    	phong: {

    		uniforms: UniformsUtils$1.merge([UniformsLib.common, UniformsLib.lights, {
    			emissive: { value: new Color$1(0x000000) },
    			specular: { value: new Color$1(0x111111) },
    			shininess: { value: 30 }
    		}]),

    		vertexShader: ShaderChunk.meshphong_vert,
    		fragmentShader: ShaderChunk.meshphong_frag

    	},
    	dashed: {
    		uniforms: UniformsUtils$1.merge([UniformsLib.common, UniformsLib.line]),

    		vertexShader: ShaderChunk.linedashed_vert,
    		fragmentShader: ShaderChunk.linedashed_frag

    	},
    	linemesh: {
    		uniforms: UniformsUtils$1.merge([UniformsLib.common, UniformsLib.line, {
    			linewidth: { value: 1 },
    			resolution: { value: new Vector2(1, 1) }
    		}]),
    		vertexShader: ShaderChunk.linemesh_vert,
    		fragmentShader: ShaderChunk.linemesh_frag
    	},
    	points: {
    		uniforms: UniformsUtils$1.merge([UniformsLib.points]
    		//UniformsLib.fog
    		),

    		vertexShader: ShaderChunk.points_vert,
    		fragmentShader: ShaderChunk.points_frag

    	},
    	sprite: {

    		uniforms: UniformsUtils$1.merge([UniformsLib.sprite]
    		//UniformsLib.fog
    		),

    		vertexShader: ShaderChunk.sprite_vert,
    		fragmentShader: ShaderChunk.sprite_frag

    	}

    };

    let textureId = 0;
    class Texture extends Events {
        constructor(image, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy, encoding) {
            super();
            Object.defineProperty(this, 'id', { value: textureId++ });
            this.image = image !== undefined ? image : Texture.DEFAULT_IMAGE;

            this.mipmaps = [];
            this.mapping = mapping !== undefined ? mapping : Texture.DEFAULT_MAPPING;

            this.wrapS = wrapS !== undefined ? wrapS : ClampToEdgeWrapping;
            this.wrapT = wrapT !== undefined ? wrapT : ClampToEdgeWrapping;

            this.magFilter = magFilter !== undefined ? magFilter : LinearFilter;
            this.minFilter = minFilter !== undefined ? minFilter : LinearMipMapLinearFilter;

            this.anisotropy = anisotropy !== undefined ? anisotropy : 1;

            this.format = format !== undefined ? format : RGBAFormat;
            this.type = type !== undefined ? type : UnsignedByteType;

            this.offset = new Vector2(0, 0);
            this.repeat = new Vector2(1, 1);
            this.center = new Vector2(0, 0);
            this.rotation = 0;

            this.matrixAutoUpdate = true;
            this.matrix = new Matrix3();

            this.generateMipmaps = true;
            this.premultiplyAlpha = false;
            this.flipY = true;
            this.unpackAlignment = 4; // valid values: 1, 2, 4, 8 (see http://www.khronos.org/opengles/sdk/docs/man/xhtml/glPixelStorei.xml)

            //
            // Also changing the encoding after already used by a Material will not automatically make the Material
            // update.  You need to explicitly call Material.needsUpdate to trigger it to recompile.
            //this.encoding = encoding !== undefined ? encoding :  LinearEncoding;

            this.version = 0;
            this.onUpdate = null;

            this.isTexture = true;
        }

        set needsUpdate(value) {
            if (value === true) this.version++;
        }

        updateMatrix() {

            this.matrix.setUvTransform(this.offset.x, this.offset.y, this.repeat.x, this.repeat.y, this.rotation, this.center.x, this.center.y);
        }

        dispose() {

            this.fire({ type: 'dispose' });
        }

    }

    Texture.DEFAULT_IMAGE = undefined;
    Texture.DEFAULT_MAPPING = UVMapping;

    // Array Caches (provide typed arrays for temporary by size)

    let arrayCacheF32 = [];
    let arrayCacheI32 = [];

    let arrayUtils = {
        mat2array: new Float32Array(4),
        mat3array: new Float32Array(9),
        mat4array: new Float32Array(16),
        emptyTexture: new Texture(),
        // emptyCubeTexture: new CubeTexture(),
        arraysEqual(a, b) {

            if (a.length !== b.length) return false;

            for (let i = 0, l = a.length; i < l; i++) {

                if (a[i] !== b[i]) return false;
            }

            return true;
        },
        copyArray(a, b) {

            for (let i = 0, l = b.length; i < l; i++) {

                a[i] = b[i];
            }
        },
        flatten(array, nBlocks, blockSize) {

            var firstElem = array[0];

            if (firstElem <= 0 || firstElem > 0) return array;
            // unoptimized: ! isNaN( firstElem )
            // see http://jacksondunstan.com/articles/983

            var n = nBlocks * blockSize,
                r = arrayCacheF32[n];

            if (r === undefined) {

                r = new Float32Array(n);
                arrayCacheF32[n] = r;
            }

            if (nBlocks !== 0) {

                firstElem.toArray(r, 0);

                for (var i = 1, offset = 0; i !== nBlocks; ++i) {

                    offset += blockSize;
                    array[i].toArray(r, offset);
                }
            }

            return r;
        },
        allocTexUnits(renderer, n) {

            var r = arrayCacheI32[n];

            if (r === undefined) {

                r = new Int32Array(n);
                arrayCacheI32[n] = r;
            }

            for (var i = 0; i !== n; ++i) r[i] = renderer.allocTextureUnit();

            return r;
        }
    };

    /**
     * @class WebGLObjects
     * @description 通过更新帧来控制更新WebGLGemetries update
     * @author bujue
     */

    var matrix = new Matrix4();

    let lookAt = function () {

        // This method does not support objects with rotated and/or translated parent(s)

        let m1 = new Matrix4();
        let vector = new Vector3$1();

        return function lookAt(x, y, z) {

            if (x.isVector3) {

                vector.copy(x);
            } else {

                vector.set(x, y, z);
            }

            if (this.isCamera) {

                m1.lookAt(this.position, vector, this.up);
            } else {

                m1.lookAt(vector, this.position, this.up);
            }

            this.quaternion.setFromRotationMatrix(m1);
        };
    }();

    var v = new Vector3$1();
    var v1$4 = new Vector3$1();
    var v2$2 = new Vector3$1();
    var v3$1 = new Vector3$1();

    var segCenter = new Vector3$1();
    var segDir = new Vector3$1();
    var diff = new Vector3$1();

    var diff = new Vector3$1();
    var edge1 = new Vector3$1();
    var edge2 = new Vector3$1();
    var normal = new Vector3$1();

    class Ray {
        constructor(origin, direction) {
            this.origin = origin !== undefined ? origin : new Vector3$1();
            this.direction = direction !== undefined ? direction : new Vector3$1();
        }

        set(origin, direction) {

            this.origin.copy(origin);
            this.direction.copy(direction);

            return this;
        }

        clone() {

            return new this.constructor().copy(this);
        }

        copy(ray) {

            this.origin.copy(ray.origin);
            this.direction.copy(ray.direction);

            return this;
        }

        at(t, optionalTarget) {

            var result = optionalTarget || new Vector3$1();

            return result.copy(this.direction).multiplyScalar(t).add(this.origin);
        }

        lookAt(v) {

            this.direction.copy(v).sub(this.origin).normalize();

            return this;
        }

        recast(t) {

            this.origin.copy(this.at(t, v1$4));

            return this;
        }

        closestPointToPoint(point, optionalTarget) {

            var result = optionalTarget || new Vector3$1();
            result.subVectors(point, this.origin);
            var directionDistance = result.dot(this.direction);

            if (directionDistance < 0) {

                return result.copy(this.origin);
            }

            return result.copy(this.direction).multiplyScalar(directionDistance).add(this.origin);
        }

        distanceToPoint(point) {

            return Math.sqrt(this.distanceSqToPoint(point));
        }
        distanceSqToPoint(point) {

            var directionDistance = v2$2.subVectors(point, this.origin).dot(this.direction);

            // point behind the ray

            if (directionDistance < 0) {

                return this.origin.distanceToSquared(point);
            }

            v2$2.copy(this.direction).multiplyScalar(directionDistance).add(this.origin);

            return v2$2.distanceToSquared(point);
        }

        distanceSqToSegment(v0, v1, optionalPointOnRay, optionalPointOnSegment) {

            // from http://www.geometrictools.com/GTEngine/Include/Mathematics/GteDistRaySegment.h
            // It returns the min distance between the ray and the segment
            // defined by v0 and v1
            // It can also set two optional targets :
            // - The closest point on the ray
            // - The closest point on the segment

            segCenter.copy(v0).add(v1).multiplyScalar(0.5);
            segDir.copy(v1).sub(v0).normalize();
            diff.copy(this.origin).sub(segCenter);

            var segExtent = v0.distanceTo(v1) * 0.5;
            var a01 = -this.direction.dot(segDir);
            var b0 = diff.dot(this.direction);
            var b1 = -diff.dot(segDir);
            var c = diff.lengthSq();
            var det = Math.abs(1 - a01 * a01);
            var s0, s1, sqrDist, extDet;

            if (det > 0) {

                // The ray and segment are not parallel.

                s0 = a01 * b1 - b0;
                s1 = a01 * b0 - b1;
                extDet = segExtent * det;

                if (s0 >= 0) {

                    if (s1 >= -extDet) {

                        if (s1 <= extDet) {

                            // region 0
                            // Minimum at interior points of ray and segment.

                            var invDet = 1 / det;
                            s0 *= invDet;
                            s1 *= invDet;
                            sqrDist = s0 * (s0 + a01 * s1 + 2 * b0) + s1 * (a01 * s0 + s1 + 2 * b1) + c;
                        } else {

                            // region 1

                            s1 = segExtent;
                            s0 = Math.max(0, -(a01 * s1 + b0));
                            sqrDist = -s0 * s0 + s1 * (s1 + 2 * b1) + c;
                        }
                    } else {

                        // region 5

                        s1 = -segExtent;
                        s0 = Math.max(0, -(a01 * s1 + b0));
                        sqrDist = -s0 * s0 + s1 * (s1 + 2 * b1) + c;
                    }
                } else {

                    if (s1 <= -extDet) {

                        // region 4

                        s0 = Math.max(0, -(-a01 * segExtent + b0));
                        s1 = s0 > 0 ? -segExtent : Math.min(Math.max(-segExtent, -b1), segExtent);
                        sqrDist = -s0 * s0 + s1 * (s1 + 2 * b1) + c;
                    } else if (s1 <= extDet) {

                        // region 3

                        s0 = 0;
                        s1 = Math.min(Math.max(-segExtent, -b1), segExtent);
                        sqrDist = s1 * (s1 + 2 * b1) + c;
                    } else {

                        // region 2

                        s0 = Math.max(0, -(a01 * segExtent + b0));
                        s1 = s0 > 0 ? segExtent : Math.min(Math.max(-segExtent, -b1), segExtent);
                        sqrDist = -s0 * s0 + s1 * (s1 + 2 * b1) + c;
                    }
                }
            } else {

                // Ray and segment are parallel.

                s1 = a01 > 0 ? -segExtent : segExtent;
                s0 = Math.max(0, -(a01 * s1 + b0));
                sqrDist = -s0 * s0 + s1 * (s1 + 2 * b1) + c;
            }

            if (optionalPointOnRay) {

                optionalPointOnRay.copy(this.direction).multiplyScalar(s0).add(this.origin);
            }

            if (optionalPointOnSegment) {

                optionalPointOnSegment.copy(segDir).multiplyScalar(s1).add(segCenter);
            }

            return sqrDist;
        }

        intersectSphere(sphere, optionalTarget) {

            v3$1.subVectors(sphere.center, this.origin);
            var tca = v3$1.dot(this.direction);
            var d2 = v3$1.dot(v3$1) - tca * tca;
            var radius2 = sphere.radius * sphere.radius;

            if (d2 > radius2) return null;

            var thc = Math.sqrt(radius2 - d2);

            // t0 = first intersect point - entrance on front of sphere
            var t0 = tca - thc;

            // t1 = second intersect point - exit point on back of sphere
            var t1 = tca + thc;

            // test to see if both t0 and t1 are behind the ray - if so, return null
            if (t0 < 0 && t1 < 0) return null;

            // test to see if t0 is behind the ray:
            // if it is, the ray is inside the sphere, so return the second exit point scaled by t1,
            // in order to always return an intersect point that is in front of the ray.
            if (t0 < 0) return this.at(t1, optionalTarget);

            // else t0 is in front of the ray, so return the first collision point scaled by t0
            return this.at(t0, optionalTarget);
        }

        intersectsSphere(sphere) {

            return this.distanceToPoint(sphere.center) <= sphere.radius;
        }

        distanceToPlane(plane) {

            var denominator = plane.normal.dot(this.direction);

            if (denominator === 0) {

                // line is coplanar, return origin
                if (plane.distanceToPoint(this.origin) === 0) {

                    return 0;
                }

                // Null is preferable to undefined since undefined means.... it is undefined

                return null;
            }

            var t = -(this.origin.dot(plane.normal) + plane.constant) / denominator;

            // Return if the ray never intersects the plane

            return t >= 0 ? t : null;
        }

        intersectPlane(plane, optionalTarget) {

            var t = this.distanceToPlane(plane);

            if (t === null) {

                return null;
            }

            return this.at(t, optionalTarget);
        }

        intersectsPlane(plane) {

            // check if the ray lies on the plane first

            var distToPoint = plane.distanceToPoint(this.origin);

            if (distToPoint === 0) {

                return true;
            }

            var denominator = plane.normal.dot(this.direction);

            if (denominator * distToPoint < 0) {

                return true;
            }

            // ray origin is behind the plane (and is pointing behind it)

            return false;
        }

        intersectBox(box, optionalTarget) {

            var tmin, tmax, tymin, tymax, tzmin, tzmax;

            var invdirx = 1 / this.direction.x,
                invdiry = 1 / this.direction.y,
                invdirz = 1 / this.direction.z;

            var origin = this.origin;

            if (invdirx >= 0) {

                tmin = (box.min.x - origin.x) * invdirx;
                tmax = (box.max.x - origin.x) * invdirx;
            } else {

                tmin = (box.max.x - origin.x) * invdirx;
                tmax = (box.min.x - origin.x) * invdirx;
            }

            if (invdiry >= 0) {

                tymin = (box.min.y - origin.y) * invdiry;
                tymax = (box.max.y - origin.y) * invdiry;
            } else {

                tymin = (box.max.y - origin.y) * invdiry;
                tymax = (box.min.y - origin.y) * invdiry;
            }

            if (tmin > tymax || tymin > tmax) return null;

            // These lines also handle the case where tmin or tmax is NaN
            // (result of 0 * Infinity). x !== x returns true if x is NaN

            if (tymin > tmin || tmin !== tmin) tmin = tymin;

            if (tymax < tmax || tmax !== tmax) tmax = tymax;

            if (invdirz >= 0) {

                tzmin = (box.min.z - origin.z) * invdirz;
                tzmax = (box.max.z - origin.z) * invdirz;
            } else {

                tzmin = (box.max.z - origin.z) * invdirz;
                tzmax = (box.min.z - origin.z) * invdirz;
            }

            if (tmin > tzmax || tzmin > tmax) return null;

            if (tzmin > tmin || tmin !== tmin) tmin = tzmin;

            if (tzmax < tmax || tmax !== tmax) tmax = tzmax;

            //return point closest to the ray (positive side)

            if (tmax < 0) return null;

            return this.at(tmin >= 0 ? tmin : tmax, optionalTarget);
        }

        intersectsBox(box) {

            return this.intersectBox(box, v) !== null;
        }

        // Compute the offset origin, edges, and normal.
        intersectTriangle(a, b, c, backfaceCulling, optionalTarget) {

            // from http://www.geometrictools.com/GTEngine/Include/Mathematics/GteIntrRay3Triangle3.h

            edge1.subVectors(b, a);
            edge2.subVectors(c, a);
            normal.crossVectors(edge1, edge2);

            // Solve Q + t*D = b1*E1 + b2*E2 (Q = kDiff, D = ray direction,
            // E1 = kEdge1, E2 = kEdge2, N = Cross(E1,E2)) by
            //   |Dot(D,N)|*b1 = sign(Dot(D,N))*Dot(D,Cross(Q,E2))
            //   |Dot(D,N)|*b2 = sign(Dot(D,N))*Dot(D,Cross(E1,Q))
            //   |Dot(D,N)|*t = -sign(Dot(D,N))*Dot(Q,N)
            var DdN = this.direction.dot(normal);
            var sign;

            if (DdN > 0) {

                if (backfaceCulling) return null;
                sign = 1;
            } else if (DdN < 0) {

                sign = -1;
                DdN = -DdN;
            } else {

                return null;
            }

            diff.subVectors(this.origin, a);
            var DdQxE2 = sign * this.direction.dot(edge2.crossVectors(diff, edge2));

            // b1 < 0, no intersection
            if (DdQxE2 < 0) {

                return null;
            }

            var DdE1xQ = sign * this.direction.dot(edge1.cross(diff));

            // b2 < 0, no intersection
            if (DdE1xQ < 0) {

                return null;
            }

            // b1+b2 > 1, no intersection
            if (DdQxE2 + DdE1xQ > DdN) {

                return null;
            }

            // Line intersects triangle, check if ray does.
            var QdN = -sign * diff.dot(normal);

            // t < 0, no intersection
            if (QdN < 0) {

                return null;
            }

            // Ray intersects triangle.
            return this.at(QdN / DdN, optionalTarget);
        }

        applyMatrix4(matrix4) {

            this.origin.applyMatrix4(matrix4);
            this.direction.transformDirection(matrix4);

            return this;
        }

        equals(ray) {

            return ray.origin.equals(this.origin) && ray.direction.equals(this.direction);
        }
    }

    var startP = new Vector3$1();
    var startEnd = new Vector3$1();
    class Line3 {
        constructor(start, end) {
            this.start = start !== undefined ? start : new Vector3$1();
            this.end = end !== undefined ? end : new Vector3$1();
        }

        set(start, end) {

            this.start.copy(start);
            this.end.copy(end);

            return this;
        }

        clone() {

            return new this.constructor().copy(this);
        }

        copy(line) {

            this.start.copy(line.start);
            this.end.copy(line.end);

            return this;
        }

        getCenter(optionalTarget) {

            var result = optionalTarget || new Vector3$1();
            return result.addVectors(this.start, this.end).multiplyScalar(0.5);
        }

        delta(optionalTarget) {

            var result = optionalTarget || new Vector3$1();
            return result.subVectors(this.end, this.start);
        }

        distanceSq() {

            return this.start.distanceToSquared(this.end);
        }

        distance() {

            return this.start.distanceTo(this.end);
        }

        at(t, optionalTarget) {

            var result = optionalTarget || new Vector3$1();

            return this.delta(result).multiplyScalar(t).add(this.start);
        }

        closestPointToPointParameter(point, clampToLine) {

            startP.subVectors(point, this.start);
            startEnd.subVectors(this.end, this.start);

            var startEnd2 = startEnd.dot(startEnd);
            var startEnd_startP = startEnd.dot(startP);

            var t = startEnd_startP / startEnd2;

            if (clampToLine) {

                t = _Math.clamp(t, 0, 1);
            }

            return t;
        }

        closestPointToPoint(point, clampToLine, optionalTarget) {

            var t = this.closestPointToPointParameter(point, clampToLine);

            var result = optionalTarget || new Vector3$1();

            return this.delta(result).multiplyScalar(t).add(this.start);
        }

        applyMatrix4(matrix) {

            this.start.applyMatrix4(matrix);
            this.end.applyMatrix4(matrix);

            return this;
        }

        equals(line) {

            return line.start.equals(this.start) && line.end.equals(this.end);
        }
    }

    var v$1 = new Vector3$1();

    var v0 = new Vector3$1();
    var v1$5 = new Vector3$1();
    var v2$3 = new Vector3$1();

    var v4$1 = new Vector3$1();

    var v5 = new Vector3$1();
    var v6 = new Vector3$1();

    var plane = new Plane();
    var edgeList = [new Line3(), new Line3(), new Line3()];
    var projectedPoint = new Vector3$1();
    var closestPoint = new Vector3$1();

    class Triangle {
        constructor(a, b, c) {
            this.a = a !== undefined ? a : new Vector3$1();
            this.b = b !== undefined ? b : new Vector3$1();
            this.c = c !== undefined ? c : new Vector3$1();
        }

        static normal(a, b, c, optionalTarget) {

            var result = optionalTarget || new Vector3$1();

            result.subVectors(c, b);
            v$1.subVectors(a, b);
            result.cross(v$1);

            var resultLengthSq = result.lengthSq();
            if (resultLengthSq > 0) {

                return result.multiplyScalar(1 / Math.sqrt(resultLengthSq));
            }

            return result.set(0, 0, 0);
        }

        static getNormal(a, b, c, target) {
            return getNormal.call(this, a, b, c, target);
        }

        // static/instance method to calculate barycentric coordinates
        // based on: http://www.blackpawn.com/texts/pointinpoly/default.html
        static barycoordFromPoint(point, a, b, c, optionalTarget) {

            v0.subVectors(c, a);
            v1$5.subVectors(b, a);
            v2$3.subVectors(point, a);

            var dot00 = v0.dot(v0);
            var dot01 = v0.dot(v1$5);
            var dot02 = v0.dot(v2$3);
            var dot11 = v1$5.dot(v1$5);
            var dot12 = v1$5.dot(v2$3);

            var denom = dot00 * dot11 - dot01 * dot01;

            var result = optionalTarget || new Vector3$1();

            // collinear or singular triangle
            if (denom === 0) {

                // arbitrary location outside of triangle?
                // not sure if this is the best idea, maybe should be returning undefined
                return result.set(-2, -1, -1);
            }

            var invDenom = 1 / denom;
            var u = (dot11 * dot02 - dot01 * dot12) * invDenom;
            var v = (dot00 * dot12 - dot01 * dot02) * invDenom;

            // barycentric coordinates must always sum to 1
            return result.set(1 - u - v, v, u);
        }

        static containsPoint(point, a, b, c) {

            var result = Triangle.barycoordFromPoint(point, a, b, c, v4$1);

            return result.x >= 0 && result.y >= 0 && result.x + result.y <= 1;
        }

        set(a, b, c) {

            this.a.copy(a);
            this.b.copy(b);
            this.c.copy(c);

            return this;
        }

        setFromPointsAndIndices(points, i0, i1, i2) {

            this.a.copy(points[i0]);
            this.b.copy(points[i1]);
            this.c.copy(points[i2]);

            return this;
        }

        clone() {

            return new this.constructor().copy(this);
        }

        copy(triangle) {

            this.a.copy(triangle.a);
            this.b.copy(triangle.b);
            this.c.copy(triangle.c);

            return this;
        }

        // static/instance method to calculate barycentric coordinates
        // based on: http://www.blackpawn.com/texts/pointinpoly/default.html
        static getBarycoord(point, a, b, c, target) {
            return getBarycoord.call(this, point, a, b, c, target);
        }

        area() {

            v5.subVectors(this.c, this.b);
            v6.subVectors(this.a, this.b);

            return v5.cross(v6).length() * 0.5;
        }

        midpoint(optionalTarget) {

            var result = optionalTarget || new Vector3$1();
            return result.addVectors(this.a, this.b).add(this.c).multiplyScalar(1 / 3);
        }

        normal(optionalTarget) {

            return Triangle.normal(this.a, this.b, this.c, optionalTarget);
        }

        plane(optionalTarget) {

            var result = optionalTarget || new Plane();

            return result.setFromCoplanarPoints(this.a, this.b, this.c);
        }

        barycoordFromPoint(point, optionalTarget) {

            return Triangle.barycoordFromPoint(point, this.a, this.b, this.c, optionalTarget);
        }

        containsPoint(point) {

            return Triangle.containsPoint(point, this.a, this.b, this.c);
        }

        closestPointToPoint(point, optionalTarget) {

            var result = optionalTarget || new Vector3$1();
            var minDistance = Infinity;

            // project the point onto the plane of the triangle

            plane.setFromCoplanarPoints(this.a, this.b, this.c);
            plane.projectPoint(point, projectedPoint);

            // check if the projection lies within the triangle

            if (this.containsPoint(projectedPoint) === true) {

                // if so, this is the closest point

                result.copy(projectedPoint);
            } else {

                // if not, the point falls outside the triangle. the result is the closest point to the triangle's edges or vertices

                edgeList[0].set(this.a, this.b);
                edgeList[1].set(this.b, this.c);
                edgeList[2].set(this.c, this.a);

                for (var i = 0; i < edgeList.length; i++) {

                    edgeList[i].closestPointToPoint(projectedPoint, true, closestPoint);

                    var distance = projectedPoint.distanceToSquared(closestPoint);

                    if (distance < minDistance) {

                        minDistance = distance;

                        result.copy(closestPoint);
                    }
                }
            }

            return result;
        }

        equals(triangle) {

            return triangle.a.equals(this.a) && triangle.b.equals(this.b) && triangle.c.equals(this.c);
        }

    }

    let getBarycoord = function () {

        var v0 = new Vector3$1();
        var v1 = new Vector3$1();
        var v2 = new Vector3$1();

        return function getBarycoord(point, a, b, c, target) {

            v0.subVectors(c, a);
            v1.subVectors(b, a);
            v2.subVectors(point, a);

            var dot00 = v0.dot(v0);
            var dot01 = v0.dot(v1);
            var dot02 = v0.dot(v2);
            var dot11 = v1.dot(v1);
            var dot12 = v1.dot(v2);

            var denom = dot00 * dot11 - dot01 * dot01;

            if (target === undefined) {

                console.warn('Triangle: .getBarycoord() target is now required');
                target = new Vector3$1();
            }

            // collinear or singular triangle
            if (denom === 0) {

                // arbitrary location outside of triangle?
                // not sure if this is the best idea, maybe should be returning undefined
                return target.set(-2, -1, -1);
            }

            var invDenom = 1 / denom;
            var u = (dot11 * dot02 - dot01 * dot12) * invDenom;
            var v = (dot00 * dot12 - dot01 * dot02) * invDenom;

            // barycentric coordinates must always sum to 1
            return target.set(1 - u - v, v, u);
        };
    }();

    let getNormal = function () {

        var v0 = new Vector3$1();

        return function getNormal(a, b, c, target) {

            if (target === undefined) {

                console.warn('THREE.Triangle: .getNormal() target is now required');
                target = new Vector3$1();
            }

            target.subVectors(c, b);
            v0.subVectors(a, b);
            target.cross(v0);

            var targetLengthSq = target.lengthSq();
            if (targetLengthSq > 0) {

                return target.multiplyScalar(1 / Math.sqrt(targetLengthSq));
            }

            return target.set(0, 0, 0);
        };
    }();

    class Face3 {
        constructor(a, b, c, normal, color, materialIndex) {
            this.a = a;
            this.b = b;
            this.c = c;

            this.normal = normal && normal.isVector3 ? normal : new Vector3$1();
            this.vertexNormals = Array.isArray(normal) ? normal : [];

            this.color = color && color.isColor ? color : new Color$1();
            this.vertexColors = Array.isArray(color) ? color : [];

            this.materialIndex = materialIndex !== undefined ? materialIndex : 0;
        }
        clone() {

            return new this.constructor().copy(this);
        }

        copy(source) {

            this.a = source.a;
            this.b = source.b;
            this.c = source.c;

            this.normal.copy(source.normal);
            this.color.copy(source.color);

            this.materialIndex = source.materialIndex;

            for (var i = 0, il = source.vertexNormals.length; i < il; i++) {

                this.vertexNormals[i] = source.vertexNormals[i].clone();
            }

            for (var i = 0, il = source.vertexColors.length; i < il; i++) {

                this.vertexColors[i] = source.vertexColors[i].clone();
            }

            return this;
        }
    }

    let raycast = function () {

        var inverseMatrix = new Matrix4();
        var ray = new Ray();
        var sphere = new Sphere();

        var vA = new Vector3$1();
        var vB = new Vector3$1();
        var vC = new Vector3$1();

        var tempA = new Vector3$1();
        var tempB = new Vector3$1();
        var tempC = new Vector3$1();

        var uvA = new Vector2();
        var uvB = new Vector2();
        var uvC = new Vector2();

        var barycoord = new Vector3$1();

        var intersectionPoint = new Vector3$1();
        var intersectionPointWorld = new Vector3$1();

        function uvIntersection(point, p1, p2, p3, uv1, uv2, uv3) {

            Triangle.getBarycoord(point, p1, p2, p3, barycoord);

            uv1.multiplyScalar(barycoord.x);
            uv2.multiplyScalar(barycoord.y);
            uv3.multiplyScalar(barycoord.z);

            uv1.add(uv2).add(uv3);

            return uv1.clone();
        }

        function checkIntersection(object, material, raycaster, ray, pA, pB, pC, point) {

            var intersect;

            if (material.side === BackSide) {

                intersect = ray.intersectTriangle(pC, pB, pA, true, point);
            } else {

                intersect = ray.intersectTriangle(pA, pB, pC, material.side !== DoubleSide, point);
            }

            if (intersect === null) return null;

            intersectionPointWorld.copy(point);
            intersectionPointWorld.applyMatrix4(object.matrixWorld);

            var distance = raycaster.ray.origin.distanceTo(intersectionPointWorld);

            if (distance < raycaster.near || distance > raycaster.far) return null;

            return {
                distance: distance,
                point: intersectionPointWorld.clone(),
                object: object
            };
        }

        function checkBufferGeometryIntersection(object, raycaster, ray, position, uv, a, b, c) {

            vA.fromBufferAttribute(position, a);
            vB.fromBufferAttribute(position, b);
            vC.fromBufferAttribute(position, c);

            var intersection = checkIntersection(object, object.material, raycaster, ray, vA, vB, vC, intersectionPoint);

            if (intersection) {

                if (uv) {

                    uvA.fromBufferAttribute(uv, a);
                    uvB.fromBufferAttribute(uv, b);
                    uvC.fromBufferAttribute(uv, c);

                    intersection.uv = uvIntersection(intersectionPoint, vA, vB, vC, uvA, uvB, uvC);
                }

                var face = new Face3(a, b, c);
                Triangle.getNormal(vA, vB, vC, face.normal);

                intersection.face = face;
            }

            return intersection;
        }

        return function raycast(raycaster, intersects) {

            var geometry = this.geometry;
            var material = this.material;
            var matrixWorld = this.matrixWorld;

            if (material === undefined) return;

            // Checking boundingSphere distance to ray

            if (geometry.boundingSphere === null) geometry.computeBoundingSphere();

            sphere.copy(geometry.boundingSphere);
            sphere.applyMatrix4(matrixWorld);

            if (raycaster.ray.intersectsSphere(sphere) === false) return;

            //

            inverseMatrix.getInverse(matrixWorld);
            ray.copy(raycaster.ray).applyMatrix4(inverseMatrix);

            // Check boundingBox before continuing

            if (geometry.boundingBox !== null) {

                if (ray.intersectsBox(geometry.boundingBox) === false) return;
            }

            var intersection;

            if (geometry.isBufferGeometry) {

                var a, b, c;
                var index = geometry.index;
                var position = geometry.attributes.position;
                var uv = geometry.attributes.uv;
                var i, l;

                if (index !== null) {

                    // indexed buffer geometry

                    for (i = 0, l = index.count; i < l; i += 3) {

                        a = index.getX(i);
                        b = index.getX(i + 1);
                        c = index.getX(i + 2);

                        intersection = checkBufferGeometryIntersection(this, raycaster, ray, position, uv, a, b, c);

                        if (intersection) {

                            intersection.faceIndex = Math.floor(i / 3); // triangle number in indexed buffer semantics
                            intersects.push(intersection);
                        }
                    }
                } else if (position !== undefined) {

                    // non-indexed buffer geometry

                    for (i = 0, l = position.count; i < l; i += 3) {

                        a = i;
                        b = i + 1;
                        c = i + 2;

                        intersection = checkBufferGeometryIntersection(this, raycaster, ray, position, uv, a, b, c);

                        if (intersection) {

                            intersection.faceIndex = Math.floor(i / 3); // triangle number in non-indexed buffer semantics
                            intersects.push(intersection);
                        }
                    }
                }
            } else if (geometry.isGeometry) {

                var fvA, fvB, fvC;
                var isMultiMaterial = Array.isArray(material);

                var vertices = geometry.vertices;
                var faces = geometry.faces;
                var uvs;

                var faceVertexUvs = geometry.faceVertexUvs[0];
                if (faceVertexUvs.length > 0) uvs = faceVertexUvs;

                for (var f = 0, fl = faces.length; f < fl; f++) {

                    var face = faces[f];
                    var faceMaterial = isMultiMaterial ? material[face.materialIndex] : material;

                    if (faceMaterial === undefined) continue;

                    fvA = vertices[face.a];
                    fvB = vertices[face.b];
                    fvC = vertices[face.c];

                    if (faceMaterial.morphTargets === true) {

                        var morphTargets = geometry.morphTargets;
                        var morphInfluences = this.morphTargetInfluences;

                        vA.set(0, 0, 0);
                        vB.set(0, 0, 0);
                        vC.set(0, 0, 0);

                        for (var t = 0, tl = morphTargets.length; t < tl; t++) {

                            var influence = morphInfluences[t];

                            if (influence === 0) continue;

                            var targets = morphTargets[t].vertices;

                            vA.addScaledVector(tempA.subVectors(targets[face.a], fvA), influence);
                            vB.addScaledVector(tempB.subVectors(targets[face.b], fvB), influence);
                            vC.addScaledVector(tempC.subVectors(targets[face.c], fvC), influence);
                        }

                        vA.add(fvA);
                        vB.add(fvB);
                        vC.add(fvC);

                        fvA = vA;
                        fvB = vB;
                        fvC = vC;
                    }

                    intersection = checkIntersection(this, faceMaterial, raycaster, ray, fvA, fvB, fvC, intersectionPoint);

                    if (intersection) {

                        if (uvs && uvs[f]) {

                            var uvs_f = uvs[f];
                            uvA.copy(uvs_f[0]);
                            uvB.copy(uvs_f[1]);
                            uvC.copy(uvs_f[2]);

                            intersection.uv = uvIntersection(intersectionPoint, fvA, fvB, fvC, uvA, uvB, uvC);
                        }

                        intersection.face = face;
                        intersection.faceIndex = f;
                        intersects.push(intersection);
                    }
                }
            }
        };
    }();

    let raycast$1 = function () {

        var inverseMatrix = new Matrix4();
        var ray = new Ray();
        var sphere = new Sphere();

        return function raycast(raycaster, intersects) {

            var precision = raycaster.linePrecision;
            var precisionSq = precision * precision;

            var geometry = this.geometry;
            var matrixWorld = this.matrixWorld;

            // Checking boundingSphere distance to ray

            if (geometry.boundingSphere === null) geometry.computeBoundingSphere();

            sphere.copy(geometry.boundingSphere);
            sphere.applyMatrix4(matrixWorld);

            if (raycaster.ray.intersectsSphere(sphere) === false) return;

            //

            inverseMatrix.getInverse(matrixWorld);
            ray.copy(raycaster.ray).applyMatrix4(inverseMatrix);

            var vStart = new Vector3$1();
            var vEnd = new Vector3$1();
            var interSegment = new Vector3$1();
            var interRay = new Vector3$1();
            var step = 1;

            if (geometry.isBufferGeometry) {

                var index = geometry.index;
                var attributes = geometry.attributes;
                var positions = attributes.position.array;

                if (index !== null) {

                    var indices = index.array;

                    for (var i = 0, l = indices.length - 1; i < l; i += step) {

                        var a = indices[i];
                        var b = indices[i + 1];

                        vStart.fromArray(positions, a * 3);
                        vEnd.fromArray(positions, b * 3);

                        var distSq = ray.distanceSqToSegment(vStart, vEnd, interRay, interSegment);

                        if (distSq > precisionSq) continue;

                        interRay.applyMatrix4(this.matrixWorld); //Move back to world space for distance calculation

                        var distance = raycaster.ray.origin.distanceTo(interRay);

                        if (distance < raycaster.near || distance > raycaster.far) continue;

                        intersects.push({

                            distance: distance,
                            // What do we want? intersection point on the ray or on the segment??
                            // point: raycaster.ray.at( distance ),
                            point: interSegment.clone().applyMatrix4(this.matrixWorld),
                            index: i,
                            face: null,
                            faceIndex: null,
                            object: this

                        });
                    }
                } else {

                    for (var i = 0, l = positions.length / 3 - 1; i < l; i += step) {

                        vStart.fromArray(positions, 3 * i);
                        vEnd.fromArray(positions, 3 * i + 3);

                        var distSq = ray.distanceSqToSegment(vStart, vEnd, interRay, interSegment);

                        if (distSq > precisionSq) continue;

                        interRay.applyMatrix4(this.matrixWorld); //Move back to world space for distance calculation

                        var distance = raycaster.ray.origin.distanceTo(interRay);

                        if (distance < raycaster.near || distance > raycaster.far) continue;

                        intersects.push({

                            distance: distance,
                            // What do we want? intersection point on the ray or on the segment??
                            // point: raycaster.ray.at( distance ),
                            point: interSegment.clone().applyMatrix4(this.matrixWorld),
                            index: i,
                            face: null,
                            faceIndex: null,
                            object: this

                        });
                    }
                }
            } else if (geometry.isGeometry) {

                var vertices = geometry.vertices;
                var nbVertices = vertices.length;

                for (var i = 0; i < nbVertices - 1; i += step) {

                    var distSq = ray.distanceSqToSegment(vertices[i], vertices[i + 1], interRay, interSegment);

                    if (distSq > precisionSq) continue;

                    interRay.applyMatrix4(this.matrixWorld); //Move back to world space for distance calculation

                    var distance = raycaster.ray.origin.distanceTo(interRay);

                    if (distance < raycaster.near || distance > raycaster.far) continue;

                    intersects.push({

                        distance: distance,
                        // What do we want? intersection point on the ray or on the segment??
                        // point: raycaster.ray.at( distance ),
                        point: interSegment.clone().applyMatrix4(this.matrixWorld),
                        index: i,
                        face: null,
                        faceIndex: null,
                        object: this

                    });
                }
            }
        };
    }();

    let raycast$2 = function () {

        var inverseMatrix = new Matrix4();
        var ray = new Ray();
        var sphere = new Sphere();

        return function raycast(raycaster, intersects) {

            var object = this;
            var geometry = this.geometry;
            var matrixWorld = this.matrixWorld;
            var threshold = raycaster.params.Points.threshold;

            // Checking boundingSphere distance to ray

            if (geometry.boundingSphere === null) geometry.computeBoundingSphere();

            sphere.copy(geometry.boundingSphere);
            sphere.applyMatrix4(matrixWorld);
            sphere.radius += threshold;

            if (raycaster.ray.intersectsSphere(sphere) === false) return;

            //

            inverseMatrix.getInverse(matrixWorld);
            ray.copy(raycaster.ray).applyMatrix4(inverseMatrix);

            var localThreshold = threshold / ((this.scale.x + this.scale.y + this.scale.z) / 3);
            var localThresholdSq = localThreshold * localThreshold;
            var position = new Vector3$1();
            var intersectPoint = new Vector3$1();

            function testPoint(point, index) {

                var rayPointDistanceSq = ray.distanceSqToPoint(point);

                if (rayPointDistanceSq < localThresholdSq) {

                    ray.closestPointToPoint(point, intersectPoint);
                    intersectPoint.applyMatrix4(matrixWorld);

                    var distance = raycaster.ray.origin.distanceTo(intersectPoint);

                    if (distance < raycaster.near || distance > raycaster.far) return;

                    intersects.push({

                        distance: distance,
                        distanceToRay: Math.sqrt(rayPointDistanceSq),
                        point: intersectPoint.clone(),
                        index: index,
                        face: null,
                        object: object

                    });
                }
            }

            if (geometry.isBufferGeometry) {

                var index = geometry.index;
                var attributes = geometry.attributes;
                var positions = attributes.position.array;

                if (index !== null) {

                    var indices = index.array;

                    for (var i = 0, il = indices.length; i < il; i++) {

                        var a = indices[i];

                        position.fromArray(positions, a * 3);

                        testPoint(position, a);
                    }
                } else {

                    for (var i = 0, l = positions.length / 3; i < l; i++) {

                        position.fromArray(positions, i * 3);

                        testPoint(position, i);
                    }
                }
            } else {

                var vertices = geometry.vertices;

                for (var i = 0, l = vertices.length; i < l; i++) {

                    testPoint(vertices[i], i);
                }
            }
        };
    }();

    /**
     * @class BufferGeometry 三维几何体的基类
     * @description 实现三维几何体的一些基本操作
     * @author bujue
     */

    let geometryId = 0;
    class Geometry extends Events {
        constructor() {
            super();
            Object.defineProperty(this, 'id', { value: geometryId += 2 });
            this.type = 'Geometry';

            this.vertices = [];
            this.colors = [];
            this.faces = [];
            this.faceVertexUvs = [[]];

            this.isGeometry = true;

            this.lineDistances = []; //计算虚线需要
            this.boundingSphere = null;
            this.boundingBox = null;

            // update flags

            this.elementsNeedUpdate = false;
            this.verticesNeedUpdate = false;
            this.uvsNeedUpdate = false;
            this.normalsNeedUpdate = false;
            this.colorsNeedUpdate = false;
            this.lineDistancesNeedUpdate = false;
            this.groupsNeedUpdate = false;
        }

        fromBufferGeometry(geometry) {

            var scope = this;

            var indices = geometry.index !== null ? geometry.index.array : undefined;
            var attributes = geometry.attributes;

            var positions = attributes.position.array;
            var normals = attributes.normal !== undefined ? attributes.normal.array : undefined;
            var colors = attributes.color !== undefined ? attributes.color.array : undefined;
            var uvs = attributes.uv !== undefined ? attributes.uv.array : undefined;
            var uvs2 = attributes.uv2 !== undefined ? attributes.uv2.array : undefined;

            if (uvs2 !== undefined) this.faceVertexUvs[1] = [];

            var tempNormals = [];
            var tempUVs = [];
            var tempUVs2 = [];

            for (var i = 0, j = 0; i < positions.length; i += 3, j += 2) {

                scope.vertices.push(new Vector3$1(positions[i], positions[i + 1], positions[i + 2]));

                if (normals !== undefined) {

                    tempNormals.push(new Vector3$1(normals[i], normals[i + 1], normals[i + 2]));
                }

                if (colors !== undefined) {

                    scope.colors.push(new Color(colors[i], colors[i + 1], colors[i + 2]));
                }

                if (uvs !== undefined) {

                    tempUVs.push(new Vector2(uvs[j], uvs[j + 1]));
                }

                if (uvs2 !== undefined) {

                    tempUVs2.push(new Vector2(uvs2[j], uvs2[j + 1]));
                }
            }

            function addFace(a, b, c, materialIndex) {

                var vertexNormals = normals !== undefined ? [tempNormals[a].clone(), tempNormals[b].clone(), tempNormals[c].clone()] : [];
                var vertexColors = colors !== undefined ? [scope.colors[a].clone(), scope.colors[b].clone(), scope.colors[c].clone()] : [];

                var face = new Face3(a, b, c, vertexNormals, vertexColors, materialIndex);

                scope.faces.push(face);

                if (uvs !== undefined) {

                    scope.faceVertexUvs[0].push([tempUVs[a].clone(), tempUVs[b].clone(), tempUVs[c].clone()]);
                }

                if (uvs2 !== undefined) {

                    scope.faceVertexUvs[1].push([tempUVs2[a].clone(), tempUVs2[b].clone(), tempUVs2[c].clone()]);
                }
            }

            var groups = geometry.groups;

            if (groups.length > 0) {

                for (var i = 0; i < groups.length; i++) {

                    var group = groups[i];

                    var start = group.start;
                    var count = group.count;

                    for (var j = start, jl = start + count; j < jl; j += 3) {

                        if (indices !== undefined) {

                            addFace(indices[j], indices[j + 1], indices[j + 2], group.materialIndex);
                        } else {

                            addFace(j, j + 1, j + 2, group.materialIndex);
                        }
                    }
                }
            } else {

                if (indices !== undefined) {

                    for (var i = 0; i < indices.length; i += 3) {

                        addFace(indices[i], indices[i + 1], indices[i + 2]);
                    }
                } else {

                    for (var i = 0; i < positions.length / 3; i += 3) {

                        addFace(i, i + 1, i + 2);
                    }
                }
            }

            this.computeFaceNormals();

            if (geometry.boundingBox !== null) {

                this.boundingBox = geometry.boundingBox.clone();
            }

            if (geometry.boundingSphere !== null) {

                this.boundingSphere = geometry.boundingSphere.clone();
            }

            return this;
        }

        computeBoundingBox() {

            if (this.boundingBox === null) {

                this.boundingBox = new Box3();
            }

            this.boundingBox.setFromPoints(this.vertices);
        }

        computeBoundingSphere() {

            if (this.boundingSphere === null) {

                this.boundingSphere = new Sphere();
            }

            this.boundingSphere.setFromPoints(this.vertices);
        }

        computeFaceNormals() {

            var cb = new Vector3$1(),
                ab = new Vector3$1();

            for (var f = 0, fl = this.faces.length; f < fl; f++) {

                var face = this.faces[f];

                var vA = this.vertices[face.a];
                var vB = this.vertices[face.b];
                var vC = this.vertices[face.c];

                cb.subVectors(vC, vB);
                ab.subVectors(vA, vB);
                cb.cross(ab);

                cb.normalize();

                face.normal.copy(cb);
            }
        }

        /*
        * Checks for duplicate vertices with hashmap.
        * Duplicated vertices are removed
        * and faces' vertices are updated.
        */

        mergeVertices() {

            var verticesMap = {}; // Hashmap for looking up vertices by position coordinates (and making sure they are unique)
            var unique = [],
                changes = [];

            var v, key;
            var precisionPoints = 4; // number of decimal points, e.g. 4 for epsilon of 0.0001
            var precision = Math.pow(10, precisionPoints);
            var i, il, face;
            var indices, j, jl;

            for (i = 0, il = this.vertices.length; i < il; i++) {

                v = this.vertices[i];
                key = Math.round(v.x * precision) + '_' + Math.round(v.y * precision) + '_' + Math.round(v.z * precision);

                if (verticesMap[key] === undefined) {

                    verticesMap[key] = i;
                    unique.push(this.vertices[i]);
                    changes[i] = unique.length - 1;
                } else {

                    //console.log('Duplicate vertex found. ', i, ' could be using ', verticesMap[key]);
                    changes[i] = changes[verticesMap[key]];
                }
            }

            // if faces are completely degenerate after merging vertices, we
            // have to remove them from the geometry.
            var faceIndicesToRemove = [];

            for (i = 0, il = this.faces.length; i < il; i++) {

                face = this.faces[i];

                face.a = changes[face.a];
                face.b = changes[face.b];
                face.c = changes[face.c];

                indices = [face.a, face.b, face.c];

                // if any duplicate vertices are found in a Face3
                // we have to remove the face as nothing can be saved
                for (var n = 0; n < 3; n++) {

                    if (indices[n] === indices[(n + 1) % 3]) {

                        faceIndicesToRemove.push(i);
                        break;
                    }
                }
            }

            for (i = faceIndicesToRemove.length - 1; i >= 0; i--) {

                var idx = faceIndicesToRemove[i];

                this.faces.splice(idx, 1);

                for (j = 0, jl = this.faceVertexUvs.length; j < jl; j++) {

                    this.faceVertexUvs[j].splice(idx, 1);
                }
            }

            // Use unique set of vertices

            var diff = this.vertices.length - unique.length;
            this.vertices = unique;
            return diff;
        }

        clone() {
            return new Geometry().copy(this);
        }

        copy(source) {

            var i, il, j, jl, k, kl;

            // reset

            this.vertices = [];
            this.colors = [];
            this.faces = [];
            this.faceVertexUvs = [[]];
            this.morphTargets = [];
            this.morphNormals = [];
            this.skinWeights = [];
            this.skinIndices = [];
            this.lineDistances = [];
            this.boundingBox = null;
            this.boundingSphere = null;

            // name

            this.name = source.name;

            // vertices

            var vertices = source.vertices;

            for (i = 0, il = vertices.length; i < il; i++) {

                this.vertices.push(vertices[i].clone());
            }

            // colors

            var colors = source.colors;

            for (i = 0, il = colors.length; i < il; i++) {

                this.colors.push(colors[i].clone());
            }

            // faces

            var faces = source.faces;

            for (i = 0, il = faces.length; i < il; i++) {

                this.faces.push(faces[i].clone());
            }

            // face vertex uvs

            for (i = 0, il = source.faceVertexUvs.length; i < il; i++) {

                var faceVertexUvs = source.faceVertexUvs[i];

                if (this.faceVertexUvs[i] === undefined) {

                    this.faceVertexUvs[i] = [];
                }

                for (j = 0, jl = faceVertexUvs.length; j < jl; j++) {

                    var uvs = faceVertexUvs[j],
                        uvsCopy = [];

                    for (k = 0, kl = uvs.length; k < kl; k++) {

                        var uv = uvs[k];

                        uvsCopy.push(uv.clone());
                    }

                    this.faceVertexUvs[i].push(uvsCopy);
                }
            }

            // bounding box

            var boundingBox = source.boundingBox;

            if (boundingBox !== null) {

                this.boundingBox = boundingBox.clone();
            }

            // bounding sphere

            var boundingSphere = source.boundingSphere;

            if (boundingSphere !== null) {

                this.boundingSphere = boundingSphere.clone();
            }

            // update flags

            this.elementsNeedUpdate = source.elementsNeedUpdate;
            this.verticesNeedUpdate = source.verticesNeedUpdate;
            this.uvsNeedUpdate = source.uvsNeedUpdate;
            this.normalsNeedUpdate = source.normalsNeedUpdate;
            this.colorsNeedUpdate = source.colorsNeedUpdate;
            this.lineDistancesNeedUpdate = source.lineDistancesNeedUpdate;
            this.groupsNeedUpdate = source.groupsNeedUpdate;

            return this;
        }

        clone() {

            return new Geometry().copy(this);
        }

        copy(source) {

            let i, il, j, jl, k, kl;

            // reset

            this.vertices = [];
            this.colors = [];
            this.faces = [];
            this.faceVertexUvs = [[]];
            this.boundingBox = null;
            this.boundingSphere = null;

            // name

            this.name = source.name;

            // vertices

            let vertices = source.vertices;

            for (i = 0, il = vertices.length; i < il; i++) {

                this.vertices.push(vertices[i].clone());
            }

            // colors

            let colors = source.colors;

            for (i = 0, il = colors.length; i < il; i++) {

                this.colors.push(colors[i].clone());
            }

            // faces

            let faces = source.faces;

            for (i = 0, il = faces.length; i < il; i++) {

                this.faces.push(faces[i].clone());
            }

            // face vertex uvs

            for (i = 0, il = source.faceVertexUvs.length; i < il; i++) {

                var faceVertexUvs = source.faceVertexUvs[i];

                if (this.faceVertexUvs[i] === undefined) {

                    this.faceVertexUvs[i] = [];
                }

                for (j = 0, jl = faceVertexUvs.length; j < jl; j++) {

                    var uvs = faceVertexUvs[j],
                        uvsCopy = [];

                    for (k = 0, kl = uvs.length; k < kl; k++) {

                        var uv = uvs[k];

                        uvsCopy.push(uv.clone());
                    }

                    this.faceVertexUvs[i].push(uvsCopy);
                }
            }

            // bounding box

            var boundingBox = source.boundingBox;

            if (boundingBox !== null) {

                this.boundingBox = boundingBox.clone();
            }

            // bounding sphere

            var boundingSphere = source.boundingSphere;

            if (boundingSphere !== null) {

                this.boundingSphere = boundingSphere.clone();
            }

            // update flags

            this.elementsNeedUpdate = source.elementsNeedUpdate;
            this.verticesNeedUpdate = source.verticesNeedUpdate;
            this.uvsNeedUpdate = source.uvsNeedUpdate;
            this.normalsNeedUpdate = source.normalsNeedUpdate;
            this.colorsNeedUpdate = source.colorsNeedUpdate;
            this.lineDistancesNeedUpdate = source.lineDistancesNeedUpdate;
            this.groupsNeedUpdate = source.groupsNeedUpdate;

            return this;
        }

        dispose() {

            this.fire({ type: 'dispose' });
        }

    }

    //所有的预定几何体

    //所有的材质

    class Testrollup {
        constructor() {
            this.geo = new Geometry();
        }
    }

    exports.Testrollup = Testrollup;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
