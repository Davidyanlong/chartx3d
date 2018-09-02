define(function () { 'use strict';

  var _ = {};
  var breaker = {};
  var ArrayProto = Array.prototype,
      ObjProto = Object.prototype,
      FuncProto = Function.prototype;

  // Create quick reference variables for speed access to core prototypes.
  var push = ArrayProto.push,
      slice = ArrayProto.slice,
      concat = ArrayProto.concat,
      toString = ObjProto.toString,
      hasOwnProperty = ObjProto.hasOwnProperty;

  // All **ECMAScript 5** native function implementations that we hope to use
  // are declared here.
  var nativeForEach = ArrayProto.forEach,
      nativeMap = ArrayProto.map,
      nativeFilter = ArrayProto.filter,
      nativeEvery = ArrayProto.every,
      nativeSome = ArrayProto.some,
      nativeIndexOf = ArrayProto.indexOf,
      nativeIsArray = Array.isArray,
      nativeKeys = Object.keys,
      nativeBind = FuncProto.bind;

  var shallowProperty = function (key) {
    return function (obj) {
      return obj == null ? void 0 : obj[key];
    };
  };
  var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
  var getLength = shallowProperty('length');
  var isArrayLike = function (collection) {
    var length = getLength(collection);
    return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
  };

  _.values = function (obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var values = new Array(length);
    for (var i = 0; i < length; i++) {
      values[i] = obj[keys[i]];
    }
    return values;
  };

  _.keys = nativeKeys || function (obj) {
    if (obj !== Object(obj)) throw new TypeError('Invalid object');
    var keys = [];
    for (var key in obj) if (_.has(obj, key)) keys.push(key);
    return keys;
  };

  _.has = function (obj, key) {
    return hasOwnProperty.call(obj, key);
  };

  var each = _.each = _.forEach = function (obj, iterator, context) {
    if (obj == null) return;
    if (nativeForEach && obj.forEach === nativeForEach) {
      obj.forEach(iterator, context);
    } else if (obj.length === +obj.length) {
      for (var i = 0, length = obj.length; i < length; i++) {
        if (iterator.call(context, obj[i], i, obj) === breaker) return;
      }
    } else {
      var keys = _.keys(obj);
      for (var i = 0, length = keys.length; i < length; i++) {
        if (iterator.call(context, obj[keys[i]], keys[i], obj) === breaker) return;
      }
    }
  };

  _.compact = function (array) {
    return _.filter(array, _.identity);
  };

  _.filter = _.select = function (obj, iterator, context) {
    var results = [];
    if (obj == null) return results;
    if (nativeFilter && obj.filter === nativeFilter) return obj.filter(iterator, context);
    each(obj, function (value, index, list) {
      if (iterator.call(context, value, index, list)) results.push(value);
    });
    return results;
  };

  each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp'], function (name) {
    _['is' + name] = function (obj) {
      return toString.call(obj) == '[object ' + name + ']';
    };
  });

  if (!_.isArguments(arguments)) {
    _.isArguments = function (obj) {
      return !!(obj && _.has(obj, 'callee'));
    };
  }

  {
    _.isFunction = function (obj) {
      return typeof obj === 'function';
    };
  }
  _.isFinite = function (obj) {
    return isFinite(obj) && !isNaN(parseFloat(obj));
  };

  _.isNaN = function (obj) {
    return _.isNumber(obj) && obj != +obj;
  };

  _.isBoolean = function (obj) {
    return obj === true || obj === false || toString.call(obj) == '[object Boolean]';
  };

  _.isNull = function (obj) {
    return obj === null;
  };

  _.isEmpty = function (obj) {
    if (obj == null) return true;
    if (_.isArray(obj) || _.isString(obj)) return obj.length === 0;
    for (var key in obj) if (_.has(obj, key)) return false;
    return true;
  };

  _.isElement = function (obj) {
    return !!(obj && obj.nodeType === 1);
  };

  _.isArray = nativeIsArray || function (obj) {
    return toString.call(obj) == '[object Array]';
  };

  _.isObject = function (obj) {
    return obj === Object(obj);
  };

  _.identity = function (value) {
    return value;
  };

  _.indexOf = function (array, item, isSorted) {
    if (array == null) return -1;
    var i = 0,
        length = array.length;
    if (isSorted) {
      if (typeof isSorted == 'number') {
        i = isSorted < 0 ? Math.max(0, length + isSorted) : isSorted;
      } else {
        i = _.sortedIndex(array, item);
        return array[i] === item ? i : -1;
      }
    }
    if (nativeIndexOf && array.indexOf === nativeIndexOf) return array.indexOf(item, isSorted);
    for (; i < length; i++) if (array[i] === item) return i;
    return -1;
  };

  _.isWindow = function (obj) {
    return obj != null && obj == obj.window;
  };

  // Internal implementation of a recursive `flatten` function.
  var flatten = function (input, shallow, output) {
    if (shallow && _.every(input, _.isArray)) {
      return concat.apply(output, input);
    }
    each(input, function (value) {
      if (_.isArray(value) || _.isArguments(value)) {
        shallow ? push.apply(output, value) : flatten(value, shallow, output);
      } else {
        output.push(value);
      }
    });
    return output;
  };

  // Flatten out an array, either recursively (by default), or just one level.
  _.flatten = function (array, shallow) {
    return flatten(array, shallow, []);
  };

  _.every = _.all = function (obj, iterator, context) {
    iterator || (iterator = _.identity);
    var result = true;
    if (obj == null) return result;
    if (nativeEvery && obj.every === nativeEvery) return obj.every(iterator, context);
    each(obj, function (value, index, list) {
      if (!(result = result && iterator.call(context, value, index, list))) return breaker;
    });
    return !!result;
  };

  // Return the minimum element (or element-based computation).
  _.min = function (obj, iterator, context) {
    if (!iterator && _.isArray(obj) && obj[0] === +obj[0] && obj.length < 65535) {
      return Math.min.apply(Math, obj);
    }
    if (!iterator && _.isEmpty(obj)) return Infinity;
    var result = { computed: Infinity, value: Infinity };
    each(obj, function (value, index, list) {
      var computed = iterator ? iterator.call(context, value, index, list) : value;
      computed < result.computed && (result = { value: value, computed: computed });
    });
    return result.value;
  };
  // Return the maximum element or (element-based computation).
  // Can't optimize arrays of integers longer than 65,535 elements.
  // See [WebKit Bug 80797](https://bugs.webkit.org/show_bug.cgi?id=80797)
  _.max = function (obj, iterator, context) {
    if (!iterator && _.isArray(obj) && obj[0] === +obj[0] && obj.length < 65535) {
      return Math.max.apply(Math, obj);
    }
    if (!iterator && _.isEmpty(obj)) return -Infinity;
    var result = { computed: -Infinity, value: -Infinity };
    each(obj, function (value, index, list) {
      var computed = iterator ? iterator.call(context, value, index, list) : value;
      computed > result.computed && (result = { value: value, computed: computed });
    });
    return result.value;
  };

  // Return the first value which passes a truth test. Aliased as `detect`.
  _.find = _.detect = function (obj, iterator, context) {
    var result;
    any(obj, function (value, index, list) {
      if (iterator.call(context, value, index, list)) {
        result = value;
        return true;
      }
    });
    return result;
  };
  // Determine if at least one element in the object matches a truth test.
  // Delegates to **ECMAScript 5**'s native `some` if available.
  // Aliased as `any`.
  var any = _.some = _.any = function (obj, iterator, context) {
    iterator || (iterator = _.identity);
    var result = false;
    if (obj == null) return result;
    if (nativeSome && obj.some === nativeSome) return obj.some(iterator, context);
    each(obj, function (value, index, list) {
      if (result || (result = iterator.call(context, value, index, list))) return breaker;
    });
    return !!result;
  };
  // Return a version of the array that does not contain the specified value(s).
  _.without = function (array) {
    return _.difference(array, slice.call(arguments, 1));
  };
  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function (array) {
    var rest = concat.apply(ArrayProto, slice.call(arguments, 1));
    return _.filter(array, function (value) {
      return !_.contains(rest, value);
    });
  };
  // Produce a duplicate-free version of the array. If the array has already
  // been sorted, you have the option of using a faster algorithm.
  // Aliased as `unique`.
  _.uniq = _.unique = function (array, isSorted, iterator, context) {
    if (_.isFunction(isSorted)) {
      context = iterator;
      iterator = isSorted;
      isSorted = false;
    }
    var initial = iterator ? _.map(array, iterator, context) : array;
    var results = [];
    var seen = [];
    each(initial, function (value, index) {
      if (isSorted ? !index || seen[seen.length - 1] !== value : !_.contains(seen, value)) {
        seen.push(value);
        results.push(array[index]);
      }
    });
    return results;
  };
  // Return the results of applying the iterator to each element.
  // Delegates to **ECMAScript 5**'s native `map` if available.
  _.map = _.collect = function (obj, iterator, context) {
    var results = [];
    if (obj == null) return results;
    if (nativeMap && obj.map === nativeMap) return obj.map(iterator, context);
    each(obj, function (value, index, list) {
      results.push(iterator.call(context, value, index, list));
    });
    return results;
  };
  // Determine if the array or object contains a given value (using `===`).
  // Aliased as `include`.
  _.contains = _.include = function (obj, target) {
    if (obj == null) return false;
    if (nativeIndexOf && obj.indexOf === nativeIndexOf) return obj.indexOf(target) != -1;
    return any(obj, function (value) {
      return value === target;
    });
  };

  // Convenience version of a common use case of `map`: fetching a property.
  _.pluck = function (obj, key) {
    return _.map(obj, function (value) {
      return value[key];
    });
  };

  // Return a random integer between min and max (inclusive).
  _.random = function (min, max) {
    if (max == null) {
      max = min;
      min = 0;
    }
    return min + Math.floor(Math.random() * (max - min + 1));
  };

  // Shuffle a collection.
  _.shuffle = function (obj) {
    return _.sample(obj, Infinity);
  };

  _.sample = function (obj, n, guard) {
    if (n == null || guard) {
      if (!isArrayLike(obj)) obj = _.values(obj);
      return obj[_.random(obj.length - 1)];
    }
    var sample = isArrayLike(obj) ? _.clone(obj) : _.values(obj);
    var length = getLength(sample);
    n = Math.max(Math.min(n, length), 0);
    var last = length - 1;
    for (var index = 0; index < n; index++) {
      var rand = _.random(index, last);
      var temp = sample[index];
      sample[index] = sample[rand];
      sample[rand] = temp;
    }
    return sample.slice(0, n);
  };

  /**
  *
  *如果是深度extend，第一个参数就设置为true
  */
  _.extend = function () {
    var options,
        name,
        src,
        copy,
        target = arguments[0] || {},
        i = 1,
        length = arguments.length,
        deep = false;
    if (typeof target === "boolean") {
      deep = target;
      target = arguments[1] || {};
      i = 2;
    }  if (typeof target !== "object" && !_.isFunction(target)) {
      target = {};
    }  if (length === i) {
      target = this;
      --i;
    }  for (; i < length; i++) {
      if ((options = arguments[i]) != null) {
        for (name in options) {
          src = target[name];
          copy = options[name];
          if (target === copy) {
            continue;
          }
          //if( deep && copy && _.isObject( copy ) &&  && !_.isArray( copy ) && !_.isFunction( copy ) ){
          if (deep && copy && _.isObject(copy) && copy.constructor === Object) {
            target[name] = _.extend(deep, src, copy);
          } else {
            target[name] = copy;
          }      }
      }
    }
    return target;
  };

  _.clone = function (obj) {
    if (!_.isObject(obj)) return obj;
    return _.isArray(obj) ? obj.slice() : _.extend(true, {}, obj);
  };

  _.isSafeObject = function (root, path) {
    path = path || '';
    root = _.clone(root);
    let arr = path.split('.');
    let result = true;
    arr.forEach(key => {
      if (root[key]) {
        root = root[key];
      } else {
        result = false;
      }
    });

    return result;
  };

  var $ = {

      // dom操作相关代码
      query(el) {
          if (_.isString(el)) {
              return document.getElementById(el);
          }
          if (el.nodeType == 1) {
              //则为一个element本身
              return el;
          }
          if (el.length) {
              return el[0];
          }
          return null;
      },

      createView(_width, _height, id) {
          var view = document.createElement("div");
          view.className = "canvax-view";
          view.style.cssText += "position:relative;width:100%;height:100%;";

          var stageView = document.createElement("div");
          stageView.style.cssText += "position:absolute;width:" + _width + "px;height:" + _height + "px;";

          //用来存放一些dom元素
          var domView = document.createElement("div");
          domView.style.cssText += "position:absolute;width:" + _width + "px;height:" + _height + "px;";

          view.appendChild(stageView);
          view.appendChild(domView);

          return {
              view: view,
              stageView: stageView,
              domView: domView
          };
      }

  };

  //如果应用传入的数据是[{name:name, sex:sex ...} , ...] 这样的数据，就自动转换为chartx需要的矩阵格式数据
  function parse2MatrixData(list) {
      if (list === undefined || list === null) {
          list = [];
      }    //检测第一个数据是否为一个array, 否就是传入了一个json格式的数据
      if (list.length > 0 && !_.isArray(list[0])) {
          var newArr = [];
          var fields = [];
          var fieldNum = 0;
          for (var i = 0, l = list.length; i < l; i++) {
              var row = list[i];
              if (i == 0) {
                  for (var f in row) {
                      fields.push(f);
                  }                newArr.push(fields);
                  fieldNum = fields.length;
              }            var _rowData = [];
              for (var ii = 0; ii < fieldNum; ii++) {
                  _rowData.push(row[fields[ii]]);
              }            newArr.push(_rowData);
          }
          return newArr;
      } else {
          return list;
      }
  }

  /**
   * 数字千分位加','号
   * @param  {[Number]} $n [数字]
   * @param  {[type]} $s [千分位上的符号]
   * @return {[String]}    [根据$s提供的值 对千分位进行分隔 并且小数点上自动加上'.'号  组合成字符串]
   */
  function numAddSymbol($n, $s) {
      var s = Number($n);
      var symbol = $s ? $s : ',';
      if (!s) {
          return String($n);
      }    if (s >= 1000) {
          var num = parseInt(s / 1000);
          return String($n.toString().replace(num, num + symbol));
      } else {
          return String($n);
      }
  }

  /**
   * @class Events 事件对象
   * @description 事件对象
   * @author bujue
   */

  class Events {
      constructor(){}
      
      on(type, listener) {

          if (this._listeners === undefined){
              this._listeners = {};
          }
            

          var listeners = this._listeners;

          if (listeners[type] === undefined) {

              listeners[type] = [];

          }

          if (listeners[type].indexOf(listener) === - 1) {

              listeners[type].push(listener);

          }

      }

      has(type, listener) {

          if (this._listeners === undefined) return false;

          var listeners = this._listeners;

          return listeners[type] !== undefined && listeners[type].indexOf(listener) !== - 1;

      }

      off(type, listener) {

          if (this._listeners === undefined) return;

          var listeners = this._listeners;
          var listenerArray = listeners[type];

          if (listenerArray !== undefined) {

              var index = listenerArray.indexOf(listener);

              if (index !== - 1) {

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

  var version = "0.0.20";

  const REVISION = version;

  //draw Line mode
  const LinesMode = 1;
  const LineLoopMode = 2;
  const LineStripMode = 3;

  //draw triangle  mode
  const TrianglesDrawMode = 4;
  const TriangleStripDrawMode = 5;
  const TriangleFanDrawMode = 6;








  //depth buffer 
  const NeverDepth = 0;
  const AlwaysDepth = 1;
  const LessDepth = 2;
  const LessEqualDepth = 3;
  const EqualDepth = 4;
  const GreaterEqualDepth = 5;
  const GreaterDepth = 6;
  const NotEqualDepth = 7;

  //cull face
  const CullFaceNone = 0;
  const CullFaceBack = 1;
  const CullFaceFront = 2;

  //draw side
  const FrontSide = 0;
  const BackSide = 1;
  const DoubleSide = 2;


  //blending 
  const NoBlending = 0;
  const NormalBlending = 1;
  const AdditiveBlending = 2;
  const SubtractiveBlending = 3;
  const MultiplyBlending = 4;
  const CustomBlending = 5;
  const AddEquation = 100;
  const SubtractEquation = 101;
  const ReverseSubtractEquation = 102;
  const ZeroFactor = 200;
  const OneFactor = 201;
  const SrcColorFactor = 202;
  const OneMinusSrcColorFactor = 203;
  const SrcAlphaFactor = 204;
  const OneMinusSrcAlphaFactor = 205;
  const DstAlphaFactor = 206;
  const OneMinusDstAlphaFactor = 207;
  const DstColorFactor = 208;
  const OneMinusDstColorFactor = 209;
  const SrcAlphaSaturateFactor = 210;

  //texture map  or format
  const RepeatWrapping = 1000;
  const ClampToEdgeWrapping = 1001;
  const MirroredRepeatWrapping = 1002;
  const NearestFilter = 1003;
  const NearestMipMapNearestFilter = 1004;
  const NearestMipMapLinearFilter = 1005;
  const LinearFilter = 1006;
  const LinearMipMapNearestFilter = 1007;
  const LinearMipMapLinearFilter = 1008;
  const UnsignedByteType = 1009;
  const ByteType = 1010;
  const ShortType = 1011;
  const UnsignedShortType = 1012;
  const IntType = 1013;
  const UnsignedIntType = 1014;
  const FloatType = 1015;
  const UnsignedShort4444Type = 1017;
  const UnsignedShort5551Type = 1018;
  const UnsignedShort565Type = 1019;
  const AlphaFormat = 1021;
  const RGBFormat = 1022;
  const RGBAFormat = 1023;
  const LuminanceFormat = 1024;
  const LuminanceAlphaFormat = 1025;
  const DepthFormat = 1026;
  const DepthStencilFormat = 1027;
  const UVMapping = 300;
  //material  
  const NoColors = 0; //不用颜色

  /**
   * @class Vector4
   * @description 用x,y,z,w 表示的四维向量 
   * @author bujue
   */
  class Vector4 {
      constructor(x, y, z, w) {
          this.x = x || 0;
          this.y = y || 0;
          this.z = z || 0;
          this.w = (w !== undefined) ? w : 1;
          this.isVector4 = true;
      }

      set(x, y, z, w) {

          this.x = x;
          this.y = y;
          this.z = z;
          this.w = w;

          return this;

      }

      //向量乘以一个常量
      multiplyScalar(scalar) {

          this.x *= scalar;
          this.y *= scalar;
          this.z *= scalar;
          this.w *= scalar;

          return this;

      }

      //判断两个四维向量是否相等
      equals(v) {

          return ((v.x === this.x) && (v.y === this.y) && (v.z === this.z) && (v.w === this.w));

      }
      //复制四维向量
      copy(v) {

          this.x = v.x;
          this.y = v.y;
          this.z = v.z;
          this.w = (v.w !== undefined) ? v.w : 1;

          return this;

      }

      applyMatrix4(m) {

          var x = this.x, y = this.y, z = this.z, w = this.w;
          var e = m.elements;

          this.x = e[0] * x + e[4] * y + e[8] * z + e[12] * w;
          this.y = e[1] * x + e[5] * y + e[9] * z + e[13] * w;
          this.z = e[2] * x + e[6] * y + e[10] * z + e[14] * w;
          this.w = e[3] * x + e[7] * y + e[11] * z + e[15] * w;

          return this;

      }
      normalize() {

          return this.divideScalar(this.length() || 1);

      }

      divideScalar(scalar) {

          return this.multiplyScalar(1 / scalar);

      }

      length () {

  		return Math.sqrt( this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w );

  	}

  }

  const _Math = {
      DEG2RAD: Math.PI / 180,
      RAD2DEG: 180 / Math.PI,

      clamp(value, min, max) {

          return Math.max(min, Math.min(max, value));

      },
      // compute euclidian modulo of m % n
      // https://en.wikipedia.org/wiki/Modulo_operation

      euclideanModulo(n, m) {

          return ((n % m) + m) % m;

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

          if (array.length === 0) return - Infinity;

          var max = array[0];

          for (var i = 1, l = array.length; i < l; ++i) {

              if (array[i] > max) max = array[i];

          }

          return max;

      },
      //是否是2的幂次方
      isPowerOfTwo(value) {
          return (value & (value - 1)) === 0 && value !== 0;
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

              case 0: this.x = value; break;
              case 1: this.y = value; break;
              case 2: this.z = value; break;
              default: throw new Error('index is out of range: ' + index);

          }

          return this;

      }

      getComponent(index) {

          switch (index) {

              case 0: return this.x;
              case 1: return this.y;
              case 2: return this.z;
              default: throw new Error('index is out of range: ' + index);

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

          var x = this.x, y = this.y, z = this.z;
          var e = m.elements;

          this.x = e[0] * x + e[3] * y + e[6] * z;
          this.y = e[1] * x + e[4] * y + e[7] * z;
          this.z = e[2] * x + e[5] * y + e[8] * z;

          return this;

      }

      applyMatrix4(m) {

          var x = this.x, y = this.y, z = this.z;
          var e = m.elements;

          var w = 1 / (e[3] * x + e[7] * y + e[11] * z + e[15]);

          this.x = (e[0] * x + e[4] * y + e[8] * z + e[12]) * w;
          this.y = (e[1] * x + e[5] * y + e[9] * z + e[13]) * w;
          this.z = (e[2] * x + e[6] * y + e[10] * z + e[14]) * w;

          return this;

      }

      applyQuaternion(q) {

          var x = this.x, y = this.y, z = this.z;
          var qx = q.x, qy = q.y, qz = q.z, qw = q.w;

          // calculate quat * vector

          var ix = qw * x + qy * z - qz * y;
          var iy = qw * y + qz * x - qx * z;
          var iz = qw * z + qx * y - qy * x;
          var iw = - qx * x - qy * y - qz * z;

          // calculate result * inverse quat

          this.x = ix * qw + iw * - qx + iy * - qz - iz * - qy;
          this.y = iy * qw + iw * - qy + iz * - qx - ix * - qz;
          this.z = iz * qw + iw * - qz + ix * - qy - iy * - qx;

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

          var x = this.x, y = this.y, z = this.z;
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

          this.x = (this.x < 0) ? Math.ceil(this.x) : Math.floor(this.x);
          this.y = (this.y < 0) ? Math.ceil(this.y) : Math.floor(this.y);
          this.z = (this.z < 0) ? Math.ceil(this.z) : Math.floor(this.z);

          return this;

      }

      negate() {

          this.x = - this.x;
          this.y = - this.y;
          this.z = - this.z;

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

          var x = this.x, y = this.y, z = this.z;

          this.x = y * v.z - z * v.y;
          this.y = z * v.x - x * v.z;
          this.z = x * v.y - y * v.x;

          return this;

      }

      crossVectors(a, b) {

          var ax = a.x, ay = a.y, az = a.z;
          var bx = b.x, by = b.y, bz = b.z;

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

          var theta = this.dot(v) / (Math.sqrt(this.lengthSq() * v.lengthSq()));

          // clamp, to handle numerical problems

          return Math.acos(_Math.clamp(theta, - 1, 1));

      }

      distanceTo(v) {

          return Math.sqrt(this.distanceToSquared(v));

      }

      distanceToSquared(v) {

          var dx = this.x - v.x, dy = this.y - v.y, dz = this.z - v.z;

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

          return ((v.x === this.x) && (v.y === this.y) && (v.z === this.z));

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
          return setHSL.call(this, h, s, l)
      }

      setHSLA(h, s, l, a) {
          let _color = setHSL.call(this, h, s, l);
          _color.a = a;
          return _color;
      }
      clone() {
          return new this.constructor(this.r, this.g, this.b);
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
      getHex () {

  		return ( this.r * 255 ) << 16 ^ ( this.g * 255 ) << 8 ^ ( this.b * 255 ) << 0;

      }

      getHexString() {

  		return ( '000000' + this.getHex().toString( 16 ) ).slice( - 6 );

  	}
      

  }

  var setHSL = (function () {

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

              var p = l <= 0.5 ? l * (1 + s) : l + s - (l * s);
              var q = (2 * l) - p;

              this.r = hue2rgb(q, p, h + 1 / 3);
              this.g = hue2rgb(q, p, h);
              this.b = hue2rgb(q, p, h - 1 / 3);

          }

          return this;

      };


  })();

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
          this.elements = [

              1, 0, 0, 0,
              0, 1, 0, 0,
              0, 0, 1, 0,
              0, 0, 0, 1

          ];

          if (arguments.length > 0) {

              console.error('Matrix4: the constructor no longer reads arguments. use .set() instead.');

          }
          this.isMatrix4 = true;
      }

      set(n11, n12, n13, n14, n21, n22, n23, n24, n31, n32, n33, n34, n41, n42, n43, n44) {

          var te = this.elements;

          te[0] = n11; te[4] = n12; te[8] = n13; te[12] = n14;
          te[1] = n21; te[5] = n22; te[9] = n23; te[13] = n24;
          te[2] = n31; te[6] = n32; te[10] = n33; te[14] = n34;
          te[3] = n41; te[7] = n42; te[11] = n43; te[15] = n44;

          return this;

      }

      identity() {

          this.set(

              1, 0, 0, 0,
              0, 1, 0, 0,
              0, 0, 1, 0,
              0, 0, 0, 1

          );

          return this;

      }

      clone() {

          return new Matrix4().fromArray(this.elements);

      }

      copy(m) {

          var te = this.elements;
          var me = m.elements;

          te[0] = me[0]; te[1] = me[1]; te[2] = me[2]; te[3] = me[3];
          te[4] = me[4]; te[5] = me[5]; te[6] = me[6]; te[7] = me[7];
          te[8] = me[8]; te[9] = me[9]; te[10] = me[10]; te[11] = me[11];
          te[12] = me[12]; te[13] = me[13]; te[14] = me[14]; te[15] = me[15];

          return this;

      }

      copyPosition(m) {

          var te = this.elements, me = m.elements;

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

          this.set(
              xAxis.x, yAxis.x, zAxis.x, 0,
              xAxis.y, yAxis.y, zAxis.y, 0,
              xAxis.z, yAxis.z, zAxis.z, 0,
              0, 0, 0, 1
          );

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

          var x = euler.x, y = euler.y, z = euler.z;
          var a = Math.cos(x), b = Math.sin(x);
          var c = Math.cos(y), d = Math.sin(y);
          var e = Math.cos(z), f = Math.sin(z);

          if (euler.order === 'XYZ') {

              var ae = a * e, af = a * f, be = b * e, bf = b * f;

              te[0] = c * e;
              te[4] = - c * f;
              te[8] = d;

              te[1] = af + be * d;
              te[5] = ae - bf * d;
              te[9] = - b * c;

              te[2] = bf - ae * d;
              te[6] = be + af * d;
              te[10] = a * c;

          } else if (euler.order === 'YXZ') {

              var ce = c * e, cf = c * f, de = d * e, df = d * f;

              te[0] = ce + df * b;
              te[4] = de * b - cf;
              te[8] = a * d;

              te[1] = a * f;
              te[5] = a * e;
              te[9] = - b;

              te[2] = cf * b - de;
              te[6] = df + ce * b;
              te[10] = a * c;

          } else if (euler.order === 'ZXY') {

              var ce = c * e, cf = c * f, de = d * e, df = d * f;

              te[0] = ce - df * b;
              te[4] = - a * f;
              te[8] = de + cf * b;

              te[1] = cf + de * b;
              te[5] = a * e;
              te[9] = df - ce * b;

              te[2] = - a * d;
              te[6] = b;
              te[10] = a * c;

          } else if (euler.order === 'ZYX') {

              var ae = a * e, af = a * f, be = b * e, bf = b * f;

              te[0] = c * e;
              te[4] = be * d - af;
              te[8] = ae * d + bf;

              te[1] = c * f;
              te[5] = bf * d + ae;
              te[9] = af * d - be;

              te[2] = - d;
              te[6] = b * c;
              te[10] = a * c;

          } else if (euler.order === 'YZX') {

              var ac = a * c, ad = a * d, bc = b * c, bd = b * d;

              te[0] = c * e;
              te[4] = bd - ac * f;
              te[8] = bc * f + ad;

              te[1] = f;
              te[5] = a * e;
              te[9] = - b * e;

              te[2] = - d * e;
              te[6] = ad * f + bc;
              te[10] = ac - bd * f;

          } else if (euler.order === 'XZY') {

              var ac = a * c, ad = a * d, bc = b * c, bd = b * d;

              te[0] = c * e;
              te[4] = - f;
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

          var x = q._x, y = q._y, z = q._z, w = q._w;
          var x2 = x + x, y2 = y + y, z2 = z + z;
          var xx = x * x2, xy = x * y2, xz = x * z2;
          var yy = y * y2, yz = y * z2, zz = z * z2;
          var wx = w * x2, wy = w * y2, wz = w * z2;

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

          te[0] = x.x; te[4] = y.x; te[8] = z.x;
          te[1] = x.y; te[5] = y.y; te[9] = z.y;
          te[2] = x.z; te[6] = y.z; te[10] = z.z;

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

          var a11 = ae[0], a12 = ae[4], a13 = ae[8], a14 = ae[12];
          var a21 = ae[1], a22 = ae[5], a23 = ae[9], a24 = ae[13];
          var a31 = ae[2], a32 = ae[6], a33 = ae[10], a34 = ae[14];
          var a41 = ae[3], a42 = ae[7], a43 = ae[11], a44 = ae[15];

          var b11 = be[0], b12 = be[4], b13 = be[8], b14 = be[12];
          var b21 = be[1], b22 = be[5], b23 = be[9], b24 = be[13];
          var b31 = be[2], b32 = be[6], b33 = be[10], b34 = be[14];
          var b41 = be[3], b42 = be[7], b43 = be[11], b44 = be[15];

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

          te[0] *= s; te[4] *= s; te[8] *= s; te[12] *= s;
          te[1] *= s; te[5] *= s; te[9] *= s; te[13] *= s;
          te[2] *= s; te[6] *= s; te[10] *= s; te[14] *= s;
          te[3] *= s; te[7] *= s; te[11] *= s; te[15] *= s;

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

          var n11 = te[0], n12 = te[4], n13 = te[8], n14 = te[12];
          var n21 = te[1], n22 = te[5], n23 = te[9], n24 = te[13];
          var n31 = te[2], n32 = te[6], n33 = te[10], n34 = te[14];
          var n41 = te[3], n42 = te[7], n43 = te[11], n44 = te[15];

          //TODO: make this more efficient
          //( based on http://www.euclideanspace.com/maths/algebra/matrix/functions/inverse/fourD/index.htm )

          return (
              n41 * (
                  + n14 * n23 * n32
                  - n13 * n24 * n32
                  - n14 * n22 * n33
                  + n12 * n24 * n33
                  + n13 * n22 * n34
                  - n12 * n23 * n34
              ) +
              n42 * (
                  + n11 * n23 * n34
                  - n11 * n24 * n33
                  + n14 * n21 * n33
                  - n13 * n21 * n34
                  + n13 * n24 * n31
                  - n14 * n23 * n31
              ) +
              n43 * (
                  + n11 * n24 * n32
                  - n11 * n22 * n34
                  - n14 * n21 * n32
                  + n12 * n21 * n34
                  + n14 * n22 * n31
                  - n12 * n24 * n31
              ) +
              n44 * (
                  - n13 * n22 * n31
                  - n11 * n23 * n32
                  + n11 * n22 * n33
                  + n13 * n21 * n32
                  - n12 * n21 * n33
                  + n12 * n23 * n31
              )

          );

      }

      transpose() {

          var te = this.elements;
          var tmp;

          tmp = te[1]; te[1] = te[4]; te[4] = tmp;
          tmp = te[2]; te[2] = te[8]; te[8] = tmp;
          tmp = te[6]; te[6] = te[9]; te[9] = tmp;

          tmp = te[3]; te[3] = te[12]; te[12] = tmp;
          tmp = te[7]; te[7] = te[13]; te[13] = tmp;
          tmp = te[11]; te[11] = te[14]; te[14] = tmp;

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

              n11 = me[0], n21 = me[1], n31 = me[2], n41 = me[3],
              n12 = me[4], n22 = me[5], n32 = me[6], n42 = me[7],
              n13 = me[8], n23 = me[9], n33 = me[10], n43 = me[11],
              n14 = me[12], n24 = me[13], n34 = me[14], n44 = me[15],

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
          var x = v.x, y = v.y, z = v.z;

          te[0] *= x; te[4] *= y; te[8] *= z;
          te[1] *= x; te[5] *= y; te[9] *= z;
          te[2] *= x; te[6] *= y; te[10] *= z;
          te[3] *= x; te[7] *= y; te[11] *= z;

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

          this.set(

              1, 0, 0, x,
              0, 1, 0, y,
              0, 0, 1, z,
              0, 0, 0, 1

          );

          return this;

      }

      makeRotationX(theta) {

          var c = Math.cos(theta), s = Math.sin(theta);

          this.set(

              1, 0, 0, 0,
              0, c, - s, 0,
              0, s, c, 0,
              0, 0, 0, 1

          );

          return this;

      }

      makeRotationY(theta) {

          var c = Math.cos(theta), s = Math.sin(theta);

          this.set(

              c, 0, s, 0,
              0, 1, 0, 0,
              - s, 0, c, 0,
              0, 0, 0, 1

          );

          return this;

      }

      makeRotationZ(theta) {

          var c = Math.cos(theta), s = Math.sin(theta);

          this.set(

              c, - s, 0, 0,
              s, c, 0, 0,
              0, 0, 1, 0,
              0, 0, 0, 1

          );

          return this;

      }

      makeRotationAxis(axis, angle) {

          // Based on http://www.gamedev.net/reference/articles/article1199.asp

          var c = Math.cos(angle);
          var s = Math.sin(angle);
          var t = 1 - c;
          var x = axis.x, y = axis.y, z = axis.z;
          var tx = t * x, ty = t * y;

          this.set(

              tx * x + c, tx * y - s * z, tx * z + s * y, 0,
              tx * y + s * z, ty * y + c, ty * z - s * x, 0,
              tx * z - s * y, ty * z + s * x, t * z * z + c, 0,
              0, 0, 0, 1

          );

          return this;

      }

      makeScale(x, y, z) {

          this.set(

              x, 0, 0, 0,
              0, y, 0, 0,
              0, 0, z, 0,
              0, 0, 0, 1

          );

          return this;

      }

      makeShear(x, y, z) {

          this.set(

              1, y, z, 0,
              x, 1, z, 0,
              x, y, 1, 0,
              0, 0, 0, 1

          );

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
          var c = - (far + near) / (far - near);
          var d = - 2 * far * near / (far - near);

          te[0] = x; te[4] = 0; te[8] = a; te[12] = 0;
          te[1] = 0; te[5] = y; te[9] = b; te[13] = 0;
          te[2] = 0; te[6] = 0; te[10] = c; te[14] = d;
          te[3] = 0; te[7] = 0; te[11] = - 1; te[15] = 0;

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

          te[0] = 2 * w; te[4] = 0; te[8] = 0; te[12] = - x;
          te[1] = 0; te[5] = 2 * h; te[9] = 0; te[13] = - y;
          te[2] = 0; te[6] = 0; te[10] = - 2 * p; te[14] = - z;
          te[3] = 0; te[7] = 0; te[11] = 0; te[15] = 1;

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

  var decompose = (function () {

      var vector = new Vector3$1();
      var matrix = new Matrix4();

      return function decompose(position, quaternion, scale) {

          var te = this.elements;

          var sx = vector.set(te[0], te[1], te[2]).length();
          var sy = vector.set(te[4], te[5], te[6]).length();
          var sz = vector.set(te[8], te[9], te[10]).length();

          // if determine is negative, we need to invert one scale
          var det = this.determinant();
          if (det < 0) sx = - sx;

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

  })();

  class Box3 {
      constructor(min, max) {

          this.min = (min !== undefined) ? min : new Vector3$1(+ Infinity, + Infinity, + Infinity);
          this.max = (max !== undefined) ? max : new Vector3$1(- Infinity, - Infinity, - Infinity);
          this.isBox3 = true;
      }
      set(min, max) {

          this.min.copy(min);
          this.max.copy(max);

          return this;

      }

      setFromArray(array) {

          var minX = + Infinity;
          var minY = + Infinity;
          var minZ = + Infinity;

          var maxX = - Infinity;
          var maxY = - Infinity;
          var maxZ = - Infinity;

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

          var minX = + Infinity;
          var minY = + Infinity;
          var minZ = + Infinity;

          var maxX = - Infinity;
          var maxY = - Infinity;
          var maxZ = - Infinity;

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

          return setFromCenterAndSize(center, size)

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

          this.min.x = this.min.y = this.min.z = + Infinity;
          this.max.x = this.max.y = this.max.z = - Infinity;

          return this;

      }

      isEmpty() {

          // this is a more robust check for empty than ( volume <= 0 ) because volume can get positive with two negative axes

          return (this.max.x < this.min.x) || (this.max.y < this.min.y) || (this.max.z < this.min.z);

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

          this.min.addScalar(- scalar);
          this.max.addScalar(scalar);

          return this;

      }

      expandByObject(object) {
          return expandByObject.call(this, object);
      }

      containsPoint(point) {

          return point.x < this.min.x || point.x > this.max.x ||
              point.y < this.min.y || point.y > this.max.y ||
              point.z < this.min.z || point.z > this.max.z ? false : true;

      }

      containsBox(box) {

          return this.min.x <= box.min.x && box.max.x <= this.max.x &&
              this.min.y <= box.min.y && box.max.y <= this.max.y &&
              this.min.z <= box.min.z && box.max.z <= this.max.z;

      }

      getParameter(point, optionalTarget) {

          // This can potentially have a divide by zero if the box
          // has a size dimension of 0.

          var result = optionalTarget || new Vector3$1();

          return result.set(
              (point.x - this.min.x) / (this.max.x - this.min.x),
              (point.y - this.min.y) / (this.max.y - this.min.y),
              (point.z - this.min.z) / (this.max.z - this.min.z)
          );

      }

      intersectsBox(box) {

          // using 6 splitting planes to rule out intersections.
          return box.max.x < this.min.x || box.min.x > this.max.x ||
              box.max.y < this.min.y || box.min.y > this.max.y ||
              box.max.z < this.min.z || box.min.z > this.max.z ? false : true;

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

          return (min <= plane.constant && max >= plane.constant);

      }

      clampPoint(point, optionalTarget) {

          var result = optionalTarget || new Vector3$1();
          return result.copy(point).clamp(this.min, this.max);

      }

      distanceToPoint(point) {
          return distanceToPoint.call(this,point);
      }

      getBoundingSphere(optionalTarget) {
          return getBoundingSphere.call(this,optionalTarget);
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

  var setFromCenterAndSize = (function () {

      var v1 = new Vector3$1();

      return function setFromCenterAndSize(center, size) {

          var halfSize = v1.copy(size).multiplyScalar(0.5);

          this.min.copy(center).sub(halfSize);
          this.max.copy(center).add(halfSize);

          return this;

      };

  })();

  var expandByObject = (function () {

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

  })();

  var intersectsSphere = (function () {

      var closestPoint = new Vector3$1();

      return function intersectsSphere(sphere) {

          // Find the point on the AABB closest to the sphere center.
          this.clampPoint(sphere.center, closestPoint);

          // If that point is inside the sphere, the AABB and sphere intersect.
          return closestPoint.distanceToSquared(sphere.center) <= (sphere.radius * sphere.radius);

      };

  })();

  var distanceToPoint = (function () {

      var v1 = new Vector3$1();

      return function distanceToPoint(point) {

          var clampedPoint = v1.copy(point).clamp(this.min, this.max);
          return clampedPoint.sub(point).length();

      };

  })();

  var getBoundingSphere = (function () {

      var v1 = new Vector3$1();

      return function getBoundingSphere(optionalTarget) {

          var result = optionalTarget || new Sphere();

          this.getCenter(result.center);

          result.radius = this.getSize(v1).length() * 0.5;

          return result;

      };

  })();

  var applyMatrix4 = (function () {

      var points = [
          new Vector3$1(),
          new Vector3$1(),
          new Vector3$1(),
          new Vector3$1(),
          new Vector3$1(),
          new Vector3$1(),
          new Vector3$1(),
          new Vector3$1()
      ];

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
          points[7].set(this.max.x, this.max.y, this.max.z).applyMatrix4(matrix);	// 111

          this.setFromPoints(points);

          return this;

      };

  })();

  class Sphere {
      constructor(center, radius) {
          this.center = (center !== undefined) ? center : new Vector3$1();
          this.radius = (radius !== undefined) ? radius : 0;
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

          return (this.radius <= 0);

      }

      containsPoint(point) {

          return (point.distanceToSquared(this.center) <= (this.radius * this.radius));

      }

      distanceToPoint(point) {

          return (point.distanceTo(this.center) - this.radius);

      }

      intersectsSphere(sphere) {

          var radiusSum = this.radius + sphere.radius;

          return sphere.center.distanceToSquared(this.center) <= (radiusSum * radiusSum);

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

          if (deltaLengthSq > (this.radius * this.radius)) {

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

          return sphere.center.equals(this.center) && (sphere.radius === this.radius);

      }

  }

  var v1$1 = new Vector3$1();
  class Matrix3 {
      constructor() {
          this.elements = [

              1, 0, 0,
              0, 1, 0,
              0, 0, 1

          ];

          if (arguments.length > 0) {

              console.error('Matrix3: the constructor no longer reads arguments. use .set() instead.');

          }
          this.isMatrix3 = true;
      }
      set(n11, n12, n13, n21, n22, n23, n31, n32, n33) {

          var te = this.elements;

          te[0] = n11; te[1] = n21; te[2] = n31;
          te[3] = n12; te[4] = n22; te[5] = n32;
          te[6] = n13; te[7] = n23; te[8] = n33;

          return this;

      }

      identity() {

          this.set(

              1, 0, 0,
              0, 1, 0,
              0, 0, 1

          );

          return this;

      }

      clone() {

          return new this.constructor().fromArray(this.elements);

      }

      copy(m) {

          var te = this.elements;
          var me = m.elements;

          te[0] = me[0]; te[1] = me[1]; te[2] = me[2];
          te[3] = me[3]; te[4] = me[4]; te[5] = me[5];
          te[6] = me[6]; te[7] = me[7]; te[8] = me[8];

          return this;

      }

      setFromMatrix4(m) {

          var me = m.elements;

          this.set(

              me[0], me[4], me[8],
              me[1], me[5], me[9],
              me[2], me[6], me[10]

          );

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

          this.set(
              sx * c, sx * s, - sx * (c * cx + s * cy) + cx + tx,
              - sy * s, sy * c, - sy * (- s * cx + c * cy) + cy + ty,
              0, 0, 1
          );

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

          var a11 = ae[0], a12 = ae[3], a13 = ae[6];
          var a21 = ae[1], a22 = ae[4], a23 = ae[7];
          var a31 = ae[2], a32 = ae[5], a33 = ae[8];

          var b11 = be[0], b12 = be[3], b13 = be[6];
          var b21 = be[1], b22 = be[4], b23 = be[7];
          var b31 = be[2], b32 = be[5], b33 = be[8];

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

          te[0] *= s; te[3] *= s; te[6] *= s;
          te[1] *= s; te[4] *= s; te[7] *= s;
          te[2] *= s; te[5] *= s; te[8] *= s;

          return this;

      }

      determinant() {

          var te = this.elements;

          var a = te[0], b = te[1], c = te[2],
              d = te[3], e = te[4], f = te[5],
              g = te[6], h = te[7], i = te[8];

          return a * e * i - a * f * h - b * d * i + b * f * g + c * d * h - c * e * g;

      }

      getInverse(matrix, throwOnDegenerate) {

          if (matrix && matrix.isMatrix4) {

              console.error("Matrix3: .getInverse() no longer takes a Matrix4 argument.");

          }

          var me = matrix.elements,
              te = this.elements,

              n11 = me[0], n21 = me[1], n31 = me[2],
              n12 = me[3], n22 = me[4], n32 = me[5],
              n13 = me[6], n23 = me[7], n33 = me[8],

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

          var tmp, m = this.elements;

          tmp = m[1]; m[1] = m[3]; m[3] = tmp;
          tmp = m[2]; m[2] = m[6]; m[6] = tmp;
          tmp = m[5]; m[5] = m[7]; m[7] = tmp;

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

          this.normal = (normal !== undefined) ? normal : new Vector3$1(1, 0, 0);
          this.constant = (constant !== undefined) ? constant : 0;
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
          this.constant = - point.dot(this.normal);

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

          this.constant *= - 1;
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

          return result.copy(this.normal).multiplyScalar(- this.distanceToPoint(point)).add(point);

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

          var t = - (line.start.dot(this.normal) + this.constant) / denominator;

          if (t < 0 || t > 1) {

              return undefined;

          }

          return result.copy(direction).multiplyScalar(t).add(line.start);

      }


      intersectsLine(line) {

          // Note: this tests if a line intersects the plane, not whether it (or its end-points) are coplanar with it.

          var startSign = this.distanceToPoint(line.start);
          var endSign = this.distanceToPoint(line.end);

          return (startSign < 0 && endSign > 0) || (endSign < 0 && startSign > 0);

      }

      intersectsBox(box) {

          return box.intersectsPlane(this);

      }

      intersectsSphere(sphere) {

          return sphere.intersectsPlane(this);

      }

      coplanarPoint(optionalTarget) {

          var result = optionalTarget || new Vector3$1();

          return result.copy(this.normal).multiplyScalar(- this.constant);

      }

      applyMatrix4(matrix, optionalNormalMatrix) {

          var normalMatrix = optionalNormalMatrix || m1.getNormalMatrix(matrix);

          var referencePoint = this.coplanarPoint(v4).applyMatrix4(matrix);

          var normal = this.normal.applyMatrix3(normalMatrix).normalize();

          this.constant = - referencePoint.dot(normal);

          return this;

      }

      translate(offset) {

          this.constant -= offset.dot(this.normal);

          return this;

      }

      equals(plane) {

          return plane.normal.equals(this.normal) && (plane.constant === this.constant);

      }
  }

  class Frustum {
      constructor(p0, p1, p2, p3, p4, p5) {
          this.planes = [

              (p0 !== undefined) ? p0 : new Plane(),
              (p1 !== undefined) ? p1 : new Plane(),
              (p2 !== undefined) ? p2 : new Plane(),
              (p3 !== undefined) ? p3 : new Plane(),
              (p4 !== undefined) ? p4 : new Plane(),
              (p5 !== undefined) ? p5 : new Plane()

          ];
      }

      set(p0, p1, p2, p3, p4, p5) {

          var planes = this.planes;

          planes[0].copy(p0);
          planes[1].copy(p1);
          planes[2].copy(p2);
          planes[3].copy(p3);
          planes[4].copy(p4);
          planes[5].copy(p5);

          return this;

      }

      clone() {

          return new this.constructor().copy(this);

      }

      copy(frustum) {

          var planes = this.planes;

          for (var i = 0; i < 6; i++) {

              planes[i].copy(frustum.planes[i]);

          }

          return this;

      }

      setFromMatrix(m) {

          var planes = this.planes;
          var me = m.elements;
          var me0 = me[0], me1 = me[1], me2 = me[2], me3 = me[3];
          var me4 = me[4], me5 = me[5], me6 = me[6], me7 = me[7];
          var me8 = me[8], me9 = me[9], me10 = me[10], me11 = me[11];
          var me12 = me[12], me13 = me[13], me14 = me[14], me15 = me[15];

          planes[0].setComponents(me3 - me0, me7 - me4, me11 - me8, me15 - me12).normalize();
          planes[1].setComponents(me3 + me0, me7 + me4, me11 + me8, me15 + me12).normalize();
          planes[2].setComponents(me3 + me1, me7 + me5, me11 + me9, me15 + me13).normalize();
          planes[3].setComponents(me3 - me1, me7 - me5, me11 - me9, me15 - me13).normalize();
          planes[4].setComponents(me3 - me2, me7 - me6, me11 - me10, me15 - me14).normalize();
          planes[5].setComponents(me3 + me2, me7 + me6, me11 + me10, me15 + me14).normalize();

          return this;

      }

      intersectsObject(object) {
          var cb = intersectsObject.bind(this);
          return cb(object);
      }


      intersectsSprite(sprite) {
          var cb = intersectsSprite.bind(this);
          return cb(sprite);
      }


      intersectsSphere(sphere) {

          var planes = this.planes;
          var center = sphere.center;
          var negRadius = - sphere.radius;

          for (var i = 0; i < 6; i++) {

              var distance = planes[i].distanceToPoint(center);

              if (distance < negRadius) {

                  return false;

              }

          }

          return true;

      }

      intersectsBox(box) {
          var cb = intersectsBox.bind(this);
          return cb(box);
      }



      containsPoint(point) {

          var planes = this.planes;

          for (var i = 0; i < 6; i++) {

              if (planes[i].distanceToPoint(point) < 0) {

                  return false;

              }

          }

          return true;

      }
  }

  var intersectsObject = (function () {

      var sphere = new Sphere();

      return function intersectsObject(object) {

          var geometry = object.geometry;

          if (geometry.boundingSphere === null)
              geometry.computeBoundingSphere();

          sphere.copy(geometry.boundingSphere)
              .applyMatrix4(object.matrixWorld);

          return this.intersectsSphere(sphere);

      };

  })();

  var intersectsSprite = (function () {

      var sphere = new Sphere();

      return function intersectsSprite(sprite) {

          sphere.center.set(0, 0, 0);
          sphere.radius = 0.7071067811865476;
          sphere.applyMatrix4(sprite.matrixWorld);

          return this.intersectsSphere(sphere);

      };

  })();

  var intersectsBox = (function () {

      var p1 = new Vector3$1(),
          p2 = new Vector3$1();

      return function intersectsBox(box) {

          var planes = this.planes;

          for (var i = 0; i < 6; i++) {

              var plane = planes[i];

              p1.x = plane.normal.x > 0 ? box.min.x : box.max.x;
              p2.x = plane.normal.x > 0 ? box.max.x : box.min.x;
              p1.y = plane.normal.y > 0 ? box.min.y : box.max.y;
              p2.y = plane.normal.y > 0 ? box.max.y : box.min.y;
              p1.z = plane.normal.z > 0 ? box.min.z : box.max.z;
              p2.z = plane.normal.z > 0 ? box.max.z : box.min.z;

              var d1 = plane.distanceToPoint(p1);
              var d2 = plane.distanceToPoint(p2);

              // if both outside plane, no intersection

              if (d1 < 0 && d2 < 0) {

                  return false;

              }

          }

          return true;

      };

  })();

  class WebGLExtensions {
      constructor(gl) {
          this._gl = gl;
          this.extensions = {};
      }
      get(name) {
          let _extension = this.extensions[name];
          if (_extension !== undefined) {
              return _extension;
          }

          _extension = this._gl.getExtension(name);

          if (_extension === null) {
              console.warn('WebGLRenderer: ' + name + ' extension not supported.');
          }

          this.extensions[name] = _extension;

          return _extension;


      }
  }

  /**
   * @class WebGLProperties
   * @description 将Material相关的设置转换为对应的渲染参数并关联起来
   * @author bujue
   */

  class WebGLProperties {
      constructor() {
          //WeakMap 可以通过一个对象作用key 再关联一个新的对象,  作为key的对象是弱引用
          this._properties = new WeakMap();
      }

      get(object) {

          let map = this._properties.get(object);

          if (map === undefined) {

              map = {};
              this._properties.set(object, map);

          }

          return map;

      }

      remove(object) {

          this._properties.delete(object);

      }

      update(object, key, value) {

          this._properties.get(object)[key] = value;

      }

      dispose() {

          this._properties = new WeakMap();

      }


  }

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

  class WebGLCapabilities {
      constructor(gl, parameters) {
          parameters = parameters || {};
          this._gl = gl;

          //单个片段着色器能访问的纹理单元数，最低16，一般16或32, 获取纹理单元TEXTURE0，TEXTURE1，TEXTURE2...的最大数量;
          this.maxTextures = gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS);
          //所有片段着色器总共能访问的纹理单元数（一个program可以有多个fragment shader），最低48，一般48~80
          this.maxCombinedTextures = gl.getParameter(gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS);

          //顶点着色器中最大的纹理单元  http://blog.sina.com.cn/s/blog_15ff4f4c80102whpt.html 
          //todo 暂时用不到
          //this.maxVertexTextures = gl.getParameter( gl.MAX_VERTEX_TEXTURE_IMAGE_UNITS );
          //可以接受的最大纹理如 2048 4096 8192
          this.maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE);
          //可以接受的最大cube纹理如 2048 4096 8192
          this.maxCubemapSize = gl.getParameter(gl.MAX_CUBE_MAP_TEXTURE_SIZE);
          //最大可支持的顶点属性的个数
          this.maxAttributes = gl.getParameter(gl.MAX_VERTEX_ATTRIBS);
          //顶点着色器中Uniform的最大个数
          this.maxVertexUniforms = gl.getParameter(gl.MAX_VERTEX_UNIFORM_VECTORS);
          //片元着色器中Uniform的最大个数 
          this.maxFragmentUniforms = gl.getParameter(gl.MAX_FRAGMENT_UNIFORM_VECTORS);
          //着色器中最多的 VARYING 变量个数  
          this.maxVaryings = gl.getParameter(gl.MAX_VARYING_VECTORS);

          //todo 单次绘制顶点的最大个数目前还不清楚如何获取
          this.precision = parameters.precision !== undefined ? parameters.precision : 'highp';
          this.precision = this.getMaxPrecision(this.precision);
      }

      //获得Shader计算的最大精度 highp mediump lowp  
      getMaxPrecision(precision) {
          let gl = this._gl;
          precision = precision || 'highp';
          if (precision === 'highp') {

              if (gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.HIGH_FLOAT).precision > 0 &&
                  gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.HIGH_FLOAT).precision > 0) {

                  return 'highp';

              }

              precision = 'mediump';

          }

          if (precision === 'mediump') {

              if (gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.MEDIUM_FLOAT).precision > 0 &&
                  gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.MEDIUM_FLOAT).precision > 0) {

                  return 'mediump';

              }

          }

          return 'lowp';

      }
  }

  /**
   * @description 获取运行环境的Webgl的支持能力
   * @author bujue
   */

  class WebGLUtils {
      constructor(gl) {
          this.gl = gl;
          this._map = {
              [RepeatWrapping]: gl.REPEAT,
              [ClampToEdgeWrapping]: gl.MIRRORED_REPEAT,
              [MirroredRepeatWrapping]: gl.MIRRORED_REPEAT,
              [NearestFilter]: gl.NEAREST,
              [NearestMipMapNearestFilter]: gl.NEAREST_MIPMAP_NEAREST,
              [NearestMipMapLinearFilter]: gl.NEAREST_MIPMAP_LINEAR,
              [LinearFilter]: gl.LINEAR,
              [LinearMipMapNearestFilter]: gl.LINEAR_MIPMAP_NEAREST,
              [LinearMipMapLinearFilter]: gl.LINEAR_MIPMAP_LINEAR,

              [UnsignedByteType]: gl.UNSIGNED_BYTE,
              [UnsignedShort4444Type]: gl.UNSIGNED_SHORT_4_4_4_4,
              [UnsignedShort5551Type]: gl.UNSIGNED_SHORT_5_5_5_1,
              [UnsignedShort565Type]: gl.UNSIGNED_SHORT_5_6_5,

              [ByteType]: gl.BYTE,
              [ShortType]: gl.SHORT,
              [UnsignedShortType]: gl.UNSIGNED_SHORT,
              [IntType]: gl.INT,
              [UnsignedIntType]: gl.UNSIGNED_INT,
              [FloatType]: gl.FLOAT,

              [AlphaFormat]: gl.ALPHA,
              [RGBFormat]: gl.RGB,
              [RGBAFormat]: gl.RGBA,
              [LuminanceFormat]: gl.LUMINANCE,
              [LuminanceAlphaFormat]: gl.LUMINANCE_ALPHA,
              [DepthFormat]: gl.DEPTH_COMPONENT,
              [DepthStencilFormat]: gl.DEPTH_STENCIL,

              [AddEquation]: gl.FUNC_ADD,
              [SubtractEquation]: gl.FUNC_SUBTRACT,
              [ReverseSubtractEquation]: gl.FUNC_REVERSE_SUBTRACT,

              [ZeroFactor]: gl.ZERO,
              [OneFactor]: gl.ONE,
              [SrcColorFactor]: gl.SRC_COLOR,
              [OneMinusSrcColorFactor]: gl.ONE_MINUS_SRC_COLOR,
              [SrcAlphaFactor]: gl.SRC_ALPHA,
              [OneMinusSrcAlphaFactor]: gl.ONE_MINUS_SRC_ALPHA,
              [DstAlphaFactor]: gl.DST_ALPHA,
              [OneMinusDstAlphaFactor]: gl.ONE_MINUS_DST_ALPHA,

              [DstColorFactor]: gl.DST_COLOR,
              [OneMinusDstColorFactor]: gl.ONE_MINUS_DST_COLOR,
              [SrcAlphaSaturateFactor]: gl.SRC_ALPHA_SATURATE,

          };
      }

      convert(p) {

          if (this._map[p] !== undefined) return this._map[p];
          return 0;
      }

  }

  class ColorBuffer {
      constructor(gl) {
          this.gl = gl;
          this._currentColorMask = null;
          this._currentColorClear = new Vector4(0, 0, 0, 0);
      }
      //关闭颜色通道 red green blue alpha
      setMask(colorMask) {
          if (this._currentColorMask !== colorMask) {

              this.gl.colorMask(colorMask, colorMask, colorMask, colorMask);
              this._currentColorMask = colorMask;

          }

      }
      //设置清除色 r g b a 为[0-1]
      setClear(r, g, b, a, premultipliedAlpha) {

          if (premultipliedAlpha === true) {

              r *= a; g *= a; b *= a;

          }


          let color = new Vector4(r, g, b, a);

          if (this._currentColorClear.equals(color) === false) {

              this.gl.clearColor(r, g, b, a);
              this._currentColorClear.copy(color);

          }
          color = null;

      }

      reset() {
          this._currentColorMask = null;
          this._currentColorClear.set(- 1, 0, 0, 0); // set to invalid state
      }



  }

  class DepthBuffer {
      constructor(gl) {
          this.gl = gl;
          this._currentDepthFunc = null;
          this._currentDepthClear = null;
          this._currentDepthMask = null;
          this._switch = new Switch(gl);
      }

      setTest(depthTest) {
          let gl = this.gl;
          if (depthTest) {

              this._switch.enable(gl.DEPTH_TEST);

          } else {

              this._switch.disable(gl.DEPTH_TEST);

          }

      }
      //不透明与透明物体共存是,绘制透明物体需要锁定深度缓冲即:setMask(true)
      setMask(depthMask) {
          let gl = this.gl;
          if (this._currentDepthMask !== depthMask) {

              gl.depthMask(depthMask);
              this._currentDepthMask = depthMask;

          }

      }

      setClear(depth) {
          let gl = this.gl;
          if (this._currentDepthClear !== depth) {

              gl.clearDepth(depth);
              this._currentDepthClear = depth;

          }

      }
      setFunc(depthFunc) {
          let gl = this.gl;

          if (this._currentDepthFunc !== depthFunc) {

              if (depthFunc) {

                  switch (depthFunc) {

                      case NeverDepth:

                          gl.depthFunc(gl.NEVER);
                          break;

                      case AlwaysDepth:

                          gl.depthFunc(gl.ALWAYS);
                          break;

                      case LessDepth:

                          gl.depthFunc(gl.LESS);
                          break;

                      case LessEqualDepth:

                          gl.depthFunc(gl.LEQUAL);
                          break;

                      case EqualDepth:

                          gl.depthFunc(gl.EQUAL);
                          break;

                      case GreaterEqualDepth:

                          gl.depthFunc(gl.GEQUAL);
                          break;

                      case GreaterDepth:

                          gl.depthFunc(gl.GREATER);
                          break;

                      case NotEqualDepth:

                          gl.depthFunc(gl.NOTEQUAL);
                          break;

                      default:

                          gl.depthFunc(gl.LEQUAL);

                  }

              } else {

                  gl.depthFunc(gl.LEQUAL);

              }

              this._currentDepthFunc = depthFunc;

          }

      }
      reset() {

          this._currentDepthMask = null;
          this._currentDepthFunc = null;
          this._currentDepthClear = null;

      }
  }

  class StencilBuffer {
      constructor(gl) {
          this.gl = gl;
          this.switch = new Switch(gl);
          this._currentStencilClear = null;
      }
      setTest(stencilTest) {
          let gl = this.gl;
          if (stencilTest) {

              this.switch.enable(gl.STENCIL_TEST);

          } else {

              this.switch.disable(gl.STENCIL_TEST);

          }

      }

      setClear(stencil) {

          if (this._currentStencilClear !== stencil) {

              this.gl.clearStencil(stencil);
              this._currentStencilClear = stencil;

          }

      }
      reset() {

          this._currentStencilClear = null;
      }
  }
  let capabilitiesSwitch = {};
  class Switch {
      constructor(gl) {
          this.gl = gl;
      }
      enable(id) {
          if (capabilitiesSwitch[id] !== true) {

              this.gl.enable(id);
              capabilitiesSwitch[id] = true;

          }
      }
      disable(id) {
          if (capabilitiesSwitch[id] !== false) {

              this.gl.disable(id);
              capabilitiesSwitch[id] = false;

          }
      }
      reset() {
          capabilitiesSwitch = {};
      }

  }

  class AttributeSwitch {
      constructor(gl, extensions) {
          this.gl = gl;
          this._extensions = extensions;
          let capabilities = new WebGLCapabilities(gl);
          let maxVertexAttributes = capabilities.maxAttributes;
          //回收
          capabilities = null;

          this._newAttributes = new Uint8Array(maxVertexAttributes);
          this._enabledAttributes = new Uint8Array(maxVertexAttributes);
          this._attributeDivisors = new Uint8Array(maxVertexAttributes);

      }

      initAttributes() {

          for (let i = 0, l = this._newAttributes.length; i < l; i++) {

              this._newAttributes[i] = 0;

          }

      }

      enableAttributeAndDivisor(attribute, meshPerAttribute) {

          this._newAttributes[attribute] = 1;

          if (this._enabledAttributes[attribute] === 0) {

              this.gl.enableVertexAttribArray(attribute);
              this._enabledAttributes[attribute] = 1;

          }

          if (this._attributeDivisors[attribute] !== meshPerAttribute) {

              let extension = this._extensions.get('ANGLE_instanced_arrays');

              extension.vertexAttribDivisorANGLE(attribute, meshPerAttribute);
              this._attributeDivisors[attribute] = meshPerAttribute;

          }

      }

      disableUnusedAttributes() {
          for (let i = 0, l = this._enabledAttributes.length; i !== l; ++i) {

              if (this._enabledAttributes[i] !== this._newAttributes[i]) {

                  this.gl.disableVertexAttribArray(i);
                  this._enabledAttributes[i] = 0;

              }

          }
      }
      reset() {

          for (var i = 0; i < this._enabledAttributes.length; i++) {

              if (this._enabledAttributes[i] === 1) {

                  this.gl.disableVertexAttribArray(i);
                  this._enabledAttributes[i] = 0;

              }

          }
      }




  }

  class BlendingState {

      constructor(gl) {
          this.gl = gl;

          this._currentBlendEquation = null;
          this._currentBlendSrc = null;
          this._currentBlendDst = null;
          this._currentBlendEquationAlpha = null;
          this._currentBlendSrcAlpha = null;
          this._currentBlendDstAlpha = null;

          this._switch = new Switch(gl);
      }

      setBlending(blending, blendEquation, blendSrc, blendDst, blendEquationAlpha, blendSrcAlpha, blendDstAlpha, premultipliedAlpha) {
          let gl = this.gl;

          let utils = new WebGLUtils(gl);

          if (blending !== NoBlending) {

              this._switch.enable(gl.BLEND);

          } else {

              this._switch.disable(gl.BLEND);

          }

          if (blending !== CustomBlending) {

              if (blending !== this._currentBlending || premultipliedAlpha !== this._currentPremultipledAlpha) {

                  switch (blending) {

                      case AdditiveBlending:

                          if (premultipliedAlpha) {

                              gl.blendEquationSeparate(gl.FUNC_ADD, gl.FUNC_ADD);
                              gl.blendFuncSeparate(gl.ONE, gl.ONE, gl.ONE, gl.ONE);

                          } else {

                              gl.blendEquation(gl.FUNC_ADD);
                              gl.blendFunc(gl.SRC_ALPHA, gl.ONE);

                          }
                          break;

                      case SubtractiveBlending:

                          if (premultipliedAlpha) {

                              gl.blendEquationSeparate(gl.FUNC_ADD, gl.FUNC_ADD);
                              gl.blendFuncSeparate(gl.ZERO, gl.ZERO, gl.ONE_MINUS_SRC_COLOR, gl.ONE_MINUS_SRC_ALPHA);

                          } else {

                              gl.blendEquation(gl.FUNC_ADD);
                              gl.blendFunc(gl.ZERO, gl.ONE_MINUS_SRC_COLOR);

                          }
                          break;

                      case MultiplyBlending:

                          if (premultipliedAlpha) {

                              gl.blendEquationSeparate(gl.FUNC_ADD, gl.FUNC_ADD);
                              gl.blendFuncSeparate(gl.ZERO, gl.SRC_COLOR, gl.ZERO, gl.SRC_ALPHA);

                          } else {

                              gl.blendEquation(gl.FUNC_ADD);
                              gl.blendFunc(gl.ZERO, gl.SRC_COLOR);

                          }
                          break;

                      default:

                          if (premultipliedAlpha) {

                              gl.blendEquationSeparate(gl.FUNC_ADD, gl.FUNC_ADD);
                              gl.blendFuncSeparate(gl.ONE, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

                          } else {

                              gl.blendEquationSeparate(gl.FUNC_ADD, gl.FUNC_ADD);
                              gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

                          }

                  }

              }

              this._currentBlendEquation = null;
              this._currentBlendSrc = null;
              this._currentBlendDst = null;
              this._currentBlendEquationAlpha = null;
              this._currentBlendSrcAlpha = null;
              this._currentBlendDstAlpha = null;


          } else {

              blendEquationAlpha = blendEquationAlpha || blendEquation;
              blendSrcAlpha = blendSrcAlpha || blendSrc;
              blendDstAlpha = blendDstAlpha || blendDst;

              if (blendEquation !== this._currentBlendEquation || blendEquationAlpha !== this._currentBlendEquationAlpha) {

                  gl.blendEquationSeparate(utils.convert(blendEquation), utils.convert(blendEquationAlpha));

                  this._currentBlendEquation = blendEquation;
                  this._currentBlendEquationAlpha = blendEquationAlpha;

              }

              if (blendSrc !== this._currentBlendSrc || blendDst !== this._currentBlendDst || blendSrcAlpha !== this._currentBlendSrcAlpha || blendDstAlpha !== this._currentBlendDstAlpha) {

                  gl.blendFuncSeparate(utils.convert(blendSrc), utils.convert(blendDst), utils.convert(blendSrcAlpha), utils.convert(blendDstAlpha));

                  this._currentBlendSrc = blendSrc;
                  this._currentBlendDst = blendDst;
                  this._currentBlendSrcAlpha = blendSrcAlpha;
                  this._currentBlendDstAlpha = blendDstAlpha;

              }

          }

          this._currentBlending = blending;
          this._currentPremultipledAlpha = premultipliedAlpha;
          utils = null;
      }
      reset() {
          this._currentBlendEquation = null;
          this._currentBlendSrc = null;
          this._currentBlendDst = null;
          this._currentBlendEquationAlpha = null;
          this._currentBlendSrcAlpha = null;
          this._currentBlendDstAlpha = null;
      }
  }

  class TextureState {
      constructor(gl) {
          this.gl = gl;

          this._currentTextureSlot = null;
          this._currentBoundTextures = {};
          this._currentTextureSlot = null;

          this._emptyTextures = {};

          this._emptyTextures[gl.TEXTURE_2D] = this.createTexture(gl.TEXTURE_2D, gl.TEXTURE_2D, 1);
          this._emptyTextures[gl.TEXTURE_CUBE_MAP] = this.createTexture(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_CUBE_MAP_POSITIVE_X, 6);

      }

      createTexture(type, target, count) {
          let gl = this.gl;
          let data = new Uint8Array(4); // 4 is required to match default unpack alignment of 4.
          let texture = gl.createTexture();

          gl.bindTexture(type, texture);
          gl.texParameteri(type, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
          gl.texParameteri(type, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

          for (var i = 0; i < count; i++) {

              gl.texImage2D(target + i, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, data);

          }

          return texture;

      }

      activeTexture(webglSlot) {
          let gl = this.gl;
          let _capabilities = new WebGLCapabilities(gl);
          let _maxTextures = _capabilities.maxCombinedTextures;

          if (webglSlot === undefined) webglSlot = gl.TEXTURE0 + _maxTextures - 1;

          if (this._currentTextureSlot !== webglSlot) {

              gl.activeTexture(webglSlot);
              this._currentTextureSlot = webglSlot;

          }
          _capabilities = null;

      }

      bindTexture(webglType, webglTexture) {
          let gl = this.gl;
          if (this._currentTextureSlot === null) {

              this.activeTexture();

          }

          let boundTexture = this._currentBoundTextures[this._currentTextureSlot];

          if (boundTexture === undefined) {

              boundTexture = { type: undefined, texture: undefined };
              this._currentBoundTextures[this._currentTextureSlot] = boundTexture;

          }

          if (boundTexture.type !== webglType || boundTexture.texture !== webglTexture) {

              gl.bindTexture(webglType, webglTexture || this._emptyTextures[webglType]);

              boundTexture.type = webglType;
              boundTexture.texture = webglTexture;

          }

      }
      texImage2D() {
          let gl = this.gl;
          try {
              gl.texImage2D.apply(gl, arguments);

          } catch (error) {
              console.error('WebGLState:', error);

          }

      }
      reset() {
          this._currentTextureSlot = null;
          this._currentBoundTextures = {};
          this._currentTextureSlot = null;
      }
  }

  function getLineWidthAvailable(gl) {
      let lineWidthAvailable = false;
      let version = 0;
      let glVersion = gl.getParameter(gl.VERSION);

      if (glVersion.indexOf('WebGL') !== - 1) {

          version = parseFloat(/^WebGL\ ([0-9])/.exec(glVersion)[1]);
          lineWidthAvailable = (version >= 1.0);

      } else if (glVersion.indexOf('OpenGL ES') !== - 1) {

          version = parseFloat(/^OpenGL\ ES\ ([0-9])/.exec(glVersion)[1]);
          lineWidthAvailable = (version >= 2.0);

      }
      return lineWidthAvailable;
  }




  class WebGLState {
      constructor(gl, extensions) {
          this.gl = gl;

          this.buffers = {
              color: new ColorBuffer(gl),
              depth: new DepthBuffer(gl),
              stencil: new StencilBuffer(gl)
          };

          this._attributeSwitch = new AttributeSwitch(gl, extensions);
          this._switch = new Switch(gl);

          this._currentProgram = null;
          this._blendingState = new BlendingState(gl);
          this._currentFlipSided = null;

          this._currentPolygonOffsetFactor = null;
          this._currentPolygonOffsetUnits = null;

          this._currentLineWidth = null;

          this._textureState = new TextureState(gl);
          this._currentViewport = new Vector4();

          this._initState(gl);

      }
      _initState(gl) {

          this.buffers.color.setClear(1, 1, 1, 1);
          this.buffers.depth.setClear(1);
          this.buffers.stencil.setClear(0);

          this._switch.enable(gl.DEPTH_TEST);
          this.buffers.depth.setFunc(LessEqualDepth);

          this.setFlipSided(false);
          this.setCullFace(CullFaceBack);
          this._switch.enable(gl.CULL_FACE);

          this._switch.enable(gl.BLEND);
          this.setBlending(NormalBlending);
      }

      initAttributes() {
          this._attributeSwitch.initAttributes();
      }
      enableAttribute(attribute) {
          this._attributeSwitch.enableAttributeAndDivisor(attribute,0);
      }
      disableUnusedAttributes() {
          this._attributeSwitch.disableUnusedAttributes();
      }

      enableAttributeAndDivisor(attribute, meshPerAttribute) {
          this._attributeSwitch.enableAttributeAndDivisor(attribute, meshPerAttribute);
      }

      enable(id) {
          this._switch.enable(id);
      }
      disable(id) {
          this._switch.disable(id);
      }

      useProgram(program) {

          if (this._currentProgram !== program) {

              this.gl.useProgram(program);

              this._currentProgram = program;

              return true;

          }

          return false;

      }

      setBlending(blending, blendEquation, blendSrc, blendDst, blendEquationAlpha, blendSrcAlpha, blendDstAlpha, premultipliedAlpha) {
          this._blendingState.setBlending(blending, blendEquation, blendSrc, blendDst, blendEquationAlpha, blendSrcAlpha, blendDstAlpha, premultipliedAlpha);
      }

      setMaterial(material, frontFaceCW) {
          let gl = this.gl;
          let depthBuffer = this.buffers.depth;
          let colorBuffer = this.buffers.color;
          //如果启用双面绘制,关闭背面剔除
          material.side === DoubleSide
              ? this._switch.disable(gl.CULL_FACE)
              : this._switch.enable(gl.CULL_FACE);

          let flipSided = (material.side === BackSide);
          if (frontFaceCW) flipSided = !flipSided;

          this.setFlipSided(flipSided);

          material.transparent === true
              ? this.setBlending(material.blending, material.blendEquation, material.blendSrc, material.blendDst, material.blendEquationAlpha, material.blendSrcAlpha, material.blendDstAlpha, material.premultipliedAlpha)
              : this.setBlending(NoBlending);

          depthBuffer.setFunc(material.depthFunc);
          depthBuffer.setTest(material.depthTest);
          depthBuffer.setMask(material.depthWrite);
          colorBuffer.setMask(material.colorWrite);

          this.setPolygonOffset(material.polygonOffset, material.polygonOffsetFactor, material.polygonOffsetUnits);

      }

      setFlipSided(flipSided) {
          let gl = this.gl;

          if (this._currentFlipSided !== flipSided) {

              if (flipSided) {

                  gl.frontFace(gl.CW);

              } else {

                  gl.frontFace(gl.CCW);

              }

              this._currentFlipSided = flipSided;

          }
      }

      setPolygonOffset(polygonOffset, factor, units) {

          let gl = this.gl;

          if (polygonOffset) {

              this._switch.enable(gl.POLYGON_OFFSET_FILL);

              if (this._currentPolygonOffsetFactor !== factor || this._currentPolygonOffsetUnits !== units) {

                  gl.polygonOffset(factor, units);

                  this._currentPolygonOffsetFactor = factor;
                  this._currentPolygonOffsetUnits = units;

              }

          } else {

              this._switch.disable(gl.POLYGON_OFFSET_FILL);

          }

      }
      setCullFace(cullFace) {

          let gl = this.gl;

          if (cullFace !== CullFaceNone) {

              this._switch.enable(gl.CULL_FACE);

              if (cullFace !== this._currentCullFace) {

                  if (cullFace === CullFaceBack) {

                      gl.cullFace(gl.BACK);

                  } else if (cullFace === CullFaceFront) {

                      gl.cullFace(gl.FRONT);

                  } else {

                      gl.cullFace(gl.FRONT_AND_BACK);

                  }

              }

          } else {

              this._switch.disable(gl.CULL_FACE);

          }

          this._currentCullFace = cullFace;

      }
      //设置线条宽度只有部分浏览器支持,目前Chrome不支持,safari支持
      //https://www.cnblogs.com/twaver/p/7228687.html?utm_source=itdadao&utm_medium=referral
      //三角面画线方案 https://github.com/mattdesl/webgl-lines
      setLineWidth(width) {

          if (width !== this._currentLineWidth) {

              if (getLineWidthAvailable(this.gl)) this.gl.lineWidth(width);

              this._currentLineWidth = width;

          }

      }

      activeTexture(webglSlot) {
          this._textureState.activeTexture(webglSlot);
      }

      bindTexture(webglType, webglTexture) {
          this._textureState.bindTexture(webglType, webglTexture);
      }
      texImage2D() {
          this._textureState.texImage2D.apply(this, arguments);
      }

      viewport(viewport) {
          let gl = this.gl;
          if (this._currentViewport.equals(viewport) === false) {

              gl.viewport(viewport.x, viewport.y, viewport.z, viewport.w);
              this._currentViewport.copy(viewport);
          }

      }
      reset() {

          this._attributeSwitch.reset();

          this._switch.reset();

          this._textureState.reset();


          this._currentProgram = null;

          this._blendingState.reset();


          this._currentFlipSided = null;
          this._currentCullFace = null;

          this.buffers.color.reset();
          this.buffers.depth.reset();
          this.buffers.stencil.reset();

      }

  }

  /**
   * @class WebGLAttributes
   * @description 根据上层的顶点属性Geometry数据,利用WeapMap绑定buffer相关数据,提供get update remove 方法
   *              获取Buffer 更新(创建)buffer  删除buffer
   * @author bujue
   */

  class WebGLAttributes {

      constructor(gl) {
          this._buffers = new WeakMap();
          this.gl = gl;
      }

      //attribute 对象为BufferAttribute 的实例对象
      //bufferType的值为 gl.ARRAY_BUFFER  或 gl.ELEMENT_ARRAY_BUFFER
      createBuffer(attribute, bufferType) {
          let gl = this.gl;
          let array = attribute.array;
          let usage = attribute.dynamic ? gl.DYNAMIC_DRAW : gl.STATIC_DRAW;

          let buffer = gl.createBuffer();

          gl.bindBuffer(bufferType, buffer);
          gl.bufferData(bufferType, array, usage);

          attribute.onUploadCallback();

          let type = typeArray2GLType(gl, array);

          return {
              buffer,
              type,
              bytesPerElement: array.BYTES_PER_ELEMENT,
              version: attribute.version
          };

      }

      updateBuffer(buffer, attribute, bufferType) {
          let gl = this.gl;
          let array = attribute.array;
          let updateRange = attribute.updateRange;

          gl.bindBuffer(bufferType, buffer);

          if (attribute.dynamic === false) {

              gl.bufferData(bufferType, array, gl.STATIC_DRAW);

          } else if (updateRange.count === - 1) {

              // Not using update ranges

              gl.bufferSubData(bufferType, 0, array);

          } else if (updateRange.count === 0) {

              console.error('WebGLObjects.updateBuffer: dynamic BufferAttribute marked as needsUpdate but updateRange.count is 0, ensure you are using set methods or updating manually.');

          } else {

              gl.bufferSubData(bufferType, updateRange.offset * array.BYTES_PER_ELEMENT,
                  array.subarray(updateRange.offset, updateRange.offset + updateRange.count));

              updateRange.count = - 1; // reset range

          }

      }


      get(attribute) {

          if (attribute.isInterleavedBufferAttribute) attribute = attribute.data;

          return this._buffers.get(attribute);

      }

      remove(attribute) {
          let gl = this.gl;
          if (attribute.isInterleavedBufferAttribute) attribute = attribute.data;

          let data = this._buffers.get(attribute);

          if (data) {

              gl.deleteBuffer(data.buffer);

              this._buffers.delete(attribute);

          }

      }

      update(attribute, bufferType) {

          if (attribute.isInterleavedBufferAttribute) attribute = attribute.data;

          let data = this._buffers.get(attribute);

          if (data === undefined) {

              this._buffers.set(attribute, this.createBuffer(attribute, bufferType));

          } else if (data.version < attribute.version) {

              this.updateBuffer(data.buffer, attribute, bufferType);

              data.version = attribute.version;

          }

      }
  }

  //todo 如果其他地方也用到同样的操作可以提取到WebGLUtils类中
  function typeArray2GLType(gl, array) {

      let type = gl.FLOAT;

      if (array instanceof Float32Array) {

          type = gl.FLOAT;

      } else if (array instanceof Float64Array) {

          console.warn('WebGLAttributes: Unsupported data buffer format: Float64Array.');

      } else if (array instanceof Uint16Array) {

          type = gl.UNSIGNED_SHORT;

      } else if (array instanceof Int16Array) {

          type = gl.SHORT;

      } else if (array instanceof Uint32Array) {

          type = gl.UNSIGNED_INT;

      } else if (array instanceof Int32Array) {

          type = gl.INT;

      } else if (array instanceof Int8Array) {

          type = gl.BYTE;

      } else if (array instanceof Uint8Array) {

          type = gl.UNSIGNED_BYTE;

      }
      return type;
  }

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

  /**
   * @class  BufferAttribute缓存属性
   * @description 这个类保存了和 缓存几何模型(BufferGeometry) 关联的属性数据。该类用来保存内置属性比如顶点位置、法相量和颜色等，也可以被用于保存自定义属性。
   * @author bujue
   */



  class BufferAttribute {

      constructor(array, itemSize, normalized) {

          if (Array.isArray(array)) {

              throw new TypeError('BufferAttribute: array should be a Typed Array.');

          }

          this.name = '';

          this.array = array;
          this.itemSize = itemSize;
          this.count = array !== undefined ? array.length / itemSize : 0;
          this.normalized = normalized === true;

          this.dynamic = false;
          this.updateRange = { offset: 0, count: - 1 };

          this.version = 0;
          this.isBufferAttribute = true;



      }

      set needsUpdate(value) {
          if (value === true) this.version++;
      }

      onUploadCallback() {

      }

      setDynamic(value) {

          this.dynamic = value;

          return this;

      }

      copyVector3sArray(vectors) {

          let array = this.array, offset = 0;

          for (let i = 0, l = vectors.length; i < l; i++) {

              let vector = vectors[i];

              if (vector === undefined) {

                  console.warn('BufferAttribute.copyVector3sArray(): vector is undefined', i);
                  vector = new Vector3$1();

              }

              array[offset++] = vector.x;
              array[offset++] = vector.y;
              array[offset++] = vector.z;

          }

          return this;
      }
      copyColorsArray(colors) {
          let array = this.array, offset = 0;

          for (let i = 0, l = colors.length; i < l; i++) {

              let color = colors[i];

              if (color === undefined) {

                  console.warn('BufferAttribute.copyColorsArray(): color is undefined', i);
                  color = new Color$1();

              }

              array[offset++] = color.r;
              array[offset++] = color.g;
              array[offset++] = color.b;

          }

          return this;
      }

      copyArray(array) {
          this.array.set(array);
          return this;
      }

      getX(index) {

          return this.array[index * this.itemSize];

      }

      setX(index, x) {

          this.array[index * this.itemSize] = x;

          return this;

      }

      getY(index) {

          return this.array[index * this.itemSize + 1];

      }

      setY(index, y) {

          this.array[index * this.itemSize + 1] = y;

          return this;

      }

      getZ(index) {

          return this.array[index * this.itemSize + 2];

      }

      setZ(index, z) {

          this.array[index * this.itemSize + 2] = z;

          return this;

      }
      getW(index) {

          return this.array[index * this.itemSize + 3];

      }

      setW(index, w) {

          this.array[index * this.itemSize + 3] = w;

          return this;

      }

      setXY(index, x, y) {

          this.setX(index, x);
          this.setY(index, y);

          return this;

      }

      setXYZ(index, x, y, z) {

          this.setXY(index, x, y);
          this.setZ(index, z);

          return this;

      }

      setXYZW(index, x, y, z, w) {

          this.setXYZ(index, x, y, z);
          this.setW(index, w);

          return this;

      }

      copyVector2sArray(vectors) {

          var array = this.array, offset = 0;

          for (var i = 0, l = vectors.length; i < l; i++) {

              var vector = vectors[i];

              if (vector === undefined) {

                  console.warn('BufferAttribute.copyVector2sArray(): vector is undefined', i);
                  vector = new Vector2();

              }

              array[offset++] = vector.x;
              array[offset++] = vector.y;

          }

          return this;

      }

      //todo 相关的方法使用到再定义

  }

  /**
   * @description
   * Uint16Array 类型数组表示二进制补码16位无符号整数的数组。内容初始化为0。
   * 范围在[0,65536]
   * 数组中每个元素的大小值为2
   */
  class Uint16BufferAttribute extends BufferAttribute {
      constructor(array, itemSize, normalized) {
          super(new Uint16Array(array), itemSize, normalized);
      }
  }

  /**
   * @description
   * Uint32Array 类型数组表示二进制补码32位无符号整数的数组。内容初始化为0。
   * 范围在[0,4294967296]
   * 数组中每个元素的大小值为4
   */
  class Uint32BufferAttribute extends BufferAttribute {
      constructor(array, itemSize, normalized) {
          super(new Uint32Array(array), itemSize, normalized);
      }
  }

  /**
   * @description
   * Float32Array 类型数组表示二进制补码32位的浮点数型数组。内容初始化为0。
   * 范围在[0,4294967296]
   * 数组中每个元素的大小值为4
   */
  class Float32BufferAttribute extends BufferAttribute {
      constructor(array, itemSize, normalized) {
          super(new Float32Array(array), itemSize, normalized);
      }
  }

  /**
   * @class DirectGeometry 缓存属性
   * @description 主要对一个几何体的不同面,采用不同Material 渲染
   * @author bujue
   */


  class DirectGeometry {
      constructor() {
          this.vertices = [];
          this.normals = [];
          this.colors = [];
          this.uvs = [];
          this.uvs2 = [];

          this.groups = [];



          this.boundingBox = null;
          this.boundingSphere = null;

          // update flags

          this.verticesNeedUpdate = false;
          this.normalsNeedUpdate = false;
          this.colorsNeedUpdate = false;
          this.uvsNeedUpdate = false;
          this.groupsNeedUpdate = false;
      }

      computeGroups(geometry) {

          let group;
          let groups = [];
          let materialIndex = undefined;

          let faces = geometry.faces;
          let i = 0;

          for (i = 0; i < faces.length; i++) {

              let face = faces[i];

              // materials

              if (face.materialIndex !== materialIndex) {

                  materialIndex = face.materialIndex;

                  if (group !== undefined) {

                      group.count = (i * 3) - group.start;
                      groups.push(group);

                  }

                  group = {
                      start: i * 3,
                      materialIndex: materialIndex
                  };

              }

          }

          if (group !== undefined) {

              group.count = (i * 3) - group.start;
              groups.push(group);

          }

          this.groups = groups;

      }

      fromGeometry(geometry) {

          let faces = geometry.faces;
          let vertices = geometry.vertices;
          let faceVertexUvs = geometry.faceVertexUvs;

          var hasFaceVertexUv = faceVertexUvs[0] && faceVertexUvs[0].length > 0;
          var hasFaceVertexUv2 = faceVertexUvs[1] && faceVertexUvs[1].length > 0;

          //todo  morphs 暂不开放


          //

          for (let i = 0; i < faces.length; i++) {

              let face = faces[i];

              this.vertices.push(vertices[face.a], vertices[face.b], vertices[face.c]);

              let vertexNormals = face.vertexNormals;

              if (vertexNormals.length === 3) {

                  this.normals.push(vertexNormals[0], vertexNormals[1], vertexNormals[2]);

              } else {

                  let normal = face.normal;

                  this.normals.push(normal, normal, normal);

              }

              let vertexColors = face.vertexColors;

              if (vertexColors.length === 3) {

                  this.colors.push(vertexColors[0], vertexColors[1], vertexColors[2]);

              } else {

                  let color = face.color;

                  this.colors.push(color, color, color);

              }
              if (hasFaceVertexUv === true) {

                  var vertexUvs = faceVertexUvs[0][i];

                  if (vertexUvs !== undefined) {

                      this.uvs.push(vertexUvs[0], vertexUvs[1], vertexUvs[2]);

                  } else {

                      console.warn('DirectGeometry.fromGeometry(): Undefined vertexUv ', i);

                      this.uvs.push(new Vector2(), new Vector2(), new Vector2());

                  }

              }

              if (hasFaceVertexUv2 === true) {

                  var vertexUvs = faceVertexUvs[1][i];

                  if (vertexUvs !== undefined) {

                      this.uvs2.push(vertexUvs[0], vertexUvs[1], vertexUvs[2]);

                  } else {

                      console.warn('DirectGeometry.fromGeometry(): Undefined vertexUv2 ', i);

                      this.uvs2.push(new Vector2(), new Vector2(), new Vector2());

                  }

              }

          }

          this.computeGroups(geometry);

          this.verticesNeedUpdate = geometry.verticesNeedUpdate;
          this.normalsNeedUpdate = geometry.normalsNeedUpdate;
          this.colorsNeedUpdate = geometry.colorsNeedUpdate;
          this.uvsNeedUpdate = geometry.uvsNeedUpdate;
          this.groupsNeedUpdate = geometry.groupsNeedUpdate;

          return this;

      }


  }

  /**
   * @class BufferGeometry 三维几何体的缓存基类
   * @description 实现三维几何体的一些基本操作
   * @author bujue
   */

  let bufferGeometryId = 1;
  class BufferGeometry extends Events {
      constructor() {
          super();
          Object.defineProperty(this, 'id', { value: bufferGeometryId += 2 });
          this.type = 'BufferGeometry';

          // 顶点索引
          this.index = null;

          //包含 position  normal uv
          this.attributes = {};

          this.isBufferGeometry = true;

          this.drawRange = { start: 0, count: Infinity };

          this.groups = [];

          this.boundingBox = null;
          this.boundingSphere = null;

          this.isBufferGeometry = true;


      }

      setIndex(index) {

          if (Array.isArray(index)) {

              this.index = new (_Math.arrayMax(index) > 65535 ? Uint32BufferAttribute : Uint16BufferAttribute)(index, 1);

          } else {

              this.index = index;

          }

      }

      getIndex() {

          return this.index;

      }

      addAttribute(name, attribute) {

          if (!(attribute && attribute.isBufferAttribute) && !(attribute && attribute.isInterleavedBufferAttribute)) {

              console.warn('BufferGeometry: .addAttribute() now expects ( name, attribute ).');

              this.addAttribute(name, new BufferAttribute(arguments[1], arguments[2]));

              return;

          }

          if (name === 'index') {

              console.warn('BufferGeometry.addAttribute: Use .setIndex() for index attribute.');
              this.setIndex(attribute);

              return;

          }

          this.attributes[name] = attribute;

          return this;

      }

      getAttribute(name) {

          return this.attributes[name];

      }

      removeAttribute(name) {

          delete this.attributes[name];

          return this;

      }
      setFromObject(object) {


          let geometry = object.geometry;

          if (object.isPoints || object.isLine) {

              let positions = new Float32BufferAttribute(geometry.vertices.length * 3, 3);
              let colors = new Float32BufferAttribute(geometry.colors.length * 3, 3);

              this.addAttribute('position', positions.copyVector3sArray(geometry.vertices));
              this.addAttribute('color', colors.copyColorsArray(geometry.colors));

              if (geometry.lineDistances && geometry.lineDistances.length === geometry.vertices.length) {

                  let lineDistances = new Float32BufferAttribute(geometry.lineDistances.length, 1);

                  this.addAttribute('lineDistance', lineDistances.copyArray(geometry.lineDistances));

              }

              if (geometry.boundingSphere !== null) {

                  this.boundingSphere = geometry.boundingSphere.clone();

              }

              if (geometry.boundingBox !== null) {

                  this.boundingBox = geometry.boundingBox.clone();

              }

          } else if (object.isMesh) {

              if (geometry && geometry.isGeometry) {

                  this.fromGeometry(geometry);

              }

          }

          return this;

      }

      fromGeometry(geometry) {

          geometry.__directGeometry = new DirectGeometry().fromGeometry(geometry);

          return this.fromDirectGeometry(geometry.__directGeometry);

      }

      fromDirectGeometry(geometry) {

          let positions = new Float32Array(geometry.vertices.length * 3);
          this.addAttribute('position', new BufferAttribute(positions, 3).copyVector3sArray(geometry.vertices));

          if (geometry.normals.length > 0) {

              let normals = new Float32Array(geometry.normals.length * 3);
              this.addAttribute('normal', new BufferAttribute(normals, 3).copyVector3sArray(geometry.normals));

          }

          if (geometry.colors.length > 0) {

              let colors = new Float32Array(geometry.colors.length * 3);
              this.addAttribute('color', new BufferAttribute(colors, 3).copyColorsArray(geometry.colors));

          }

          if (geometry.uvs.length > 0) {

              let uvs = new Float32Array(geometry.uvs.length * 2);
              this.addAttribute('uv', new BufferAttribute(uvs, 2).copyVector2sArray(geometry.uvs));

          }

          if (geometry.uvs2.length > 0) {

              let uvs2 = new Float32Array(geometry.uvs2.length * 2);
              this.addAttribute('uv2', new BufferAttribute(uvs2, 2).copyVector2sArray(geometry.uvs2));

          }

          // groups

          this.groups = geometry.groups;

          //todo  morphs 暂不开发



          //todo  skinning 暂不开发



          if (geometry.boundingSphere !== null) {

              this.boundingSphere = geometry.boundingSphere.clone();

          }

          if (geometry.boundingBox !== null) {

              this.boundingBox = geometry.boundingBox.clone();

          }

          return this;

      }
      updateFromObject(object) {

          var geometry = object.geometry;

          if (object.isMesh) {

              var direct = geometry.__directGeometry;

              if (geometry.elementsNeedUpdate === true) {

                  direct = undefined;
                  geometry.elementsNeedUpdate = false;

              }

              if (direct === undefined) {

                  return this.fromGeometry(geometry);

              }

              direct.verticesNeedUpdate = geometry.verticesNeedUpdate;
              direct.normalsNeedUpdate = geometry.normalsNeedUpdate;
              direct.colorsNeedUpdate = geometry.colorsNeedUpdate;
              direct.uvsNeedUpdate = geometry.uvsNeedUpdate;
              direct.groupsNeedUpdate = geometry.groupsNeedUpdate;

              geometry.verticesNeedUpdate = false;
              geometry.normalsNeedUpdate = false;
              geometry.colorsNeedUpdate = false;
              geometry.uvsNeedUpdate = false;
              geometry.groupsNeedUpdate = false;

              geometry = direct;

          }


      }

      computeBoundingBox() {

          if (this.boundingBox === null) {

              this.boundingBox = new Box3();

          }

          var position = this.attributes.position;

          if (position !== undefined) {

              this.boundingBox.setFromBufferAttribute(position);

          } else {

              this.boundingBox.makeEmpty();

          }

          if (isNaN(this.boundingBox.min.x) || isNaN(this.boundingBox.min.y) || isNaN(this.boundingBox.min.z)) {

              console.error('BufferGeometry.computeBoundingBox: Computed min/max have NaN values. The "position" attribute is likely to have NaN values.', this);

          }

      }

      computeBoundingSphere() {

          computeBoundingSphere.call(this);
      }

      addGroup(start, count, materialIndex) {

          this.groups.push({

              start: start,
              count: count,
              materialIndex: materialIndex !== undefined ? materialIndex : 0

          });

      }

      clearGroups() {

          this.groups = [];

      }

      clone() {

          return new BufferGeometry().copy(this);

      }

      copy(source) {

          var name, i, l;

          // reset

          this.index = null;
          this.attributes = {};
          this.morphAttributes = {};
          this.groups = [];
          this.boundingBox = null;
          this.boundingSphere = null;

          // name

          this.name = source.name;

          // index

          var index = source.index;

          if (index !== null) {

              this.setIndex(index.clone());

          }

          // attributes

          var attributes = source.attributes;

          for (name in attributes) {

              var attribute = attributes[name];
              this.addAttribute(name, attribute.clone());

          }



          // groups

          var groups = source.groups;

          for (i = 0, l = groups.length; i < l; i++) {

              var group = groups[i];
              this.addGroup(group.start, group.count, group.materialIndex);

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

          // draw range

          this.drawRange.start = source.drawRange.start;
          this.drawRange.count = source.drawRange.count;

          return this;

      }

      dispose() {

          this.fire({ type: 'dispose' });

      }
  }


  let computeBoundingSphere = (function () {

      var box = new Box3();
      var vector = new Vector3$1();

      return function computeBoundingSphere() {

          if (this.boundingSphere === null) {

              this.boundingSphere = new Sphere();

          }

          var position = this.attributes.position;

          if (position) {

              var center = this.boundingSphere.center;

              box.setFromBufferAttribute(position);
              box.getCenter(center);

              // hoping to find a boundingSphere with a radius smaller than the
              // boundingSphere of the boundingBox: sqrt(3) smaller in the best case

              var maxRadiusSq = 0;

              for (var i = 0, il = position.count; i < il; i++) {

                  vector.x = position.getX(i);
                  vector.y = position.getY(i);
                  vector.z = position.getZ(i);
                  maxRadiusSq = Math.max(maxRadiusSq, center.distanceToSquared(vector));

              }

              this.boundingSphere.radius = Math.sqrt(maxRadiusSq);

              if (isNaN(this.boundingSphere.radius)) {

                  console.error('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.', this);

              }

          }

      };

  })();

  /**
   * @class WebGLGeometries
   * @description 将上层的顶点属性分解后保存到WebGLAttribute对象中 update更新 WebGLAttribute的update 
   * @author bujue
   */

  class WebGLGeometries {
      constructor(gl, attributes, info) {
          this._gl = gl;
          this._geometries = {};
          this._attributes = attributes;
          this._info = info;
          this._wireframeAttributes = {};

      }


      get(object, geometry) {

          let buffergeometry = this._geometries[geometry.id];

          if (buffergeometry) return buffergeometry;

          geometry.on('dispose', onGeometryDispose.bind(this));

          if (geometry.isBufferGeometry) {

              buffergeometry = geometry;

          } else if (geometry.isGeometry) {

              if (geometry._bufferGeometry === undefined) {

                  geometry._bufferGeometry = new BufferGeometry().setFromObject(object);

              }

              buffergeometry = geometry._bufferGeometry;

          }

          this._geometries[geometry.id] = buffergeometry;

          this._info.memory.geometries++;

          return buffergeometry;

      }

      update(geometry) {

          let gl = this._gl;
          let index = geometry.index;
          let geometryAttributes = geometry.attributes;

          if (index !== null) {

              this._attributes.update(index, gl.ELEMENT_ARRAY_BUFFER);

          }

          for (let name in geometryAttributes) {

              this._attributes.update(geometryAttributes[name], gl.ARRAY_BUFFER);

          }

          // todo morph targets 暂时不开发


      }
      getWireframeAttribute(geometry) {

          let gl = this._gl;
          let arrayMax = _Math.arrayMax;
          let attribute = this._wireframeAttributes[geometry.id];

          if (attribute) return attribute;

          let indices = [];

          let geometryIndex = geometry.index;
          let geometryAttributes = geometry.attributes;

          // console.time( 'wireframe' );

          if (geometryIndex !== null) {

              let array = geometryIndex.array;

              for (let i = 0, l = array.length; i < l; i += 3) {

                  let a = array[i + 0];
                  let b = array[i + 1];
                  let c = array[i + 2];

                  indices.push(a, b, b, c, c, a);

              }

          } else {

              let array = geometryAttributes.position.array;

              for (let i = 0, l = (array.length / 3) - 1; i < l; i += 3) {

                  let a = i + 0;
                  let b = i + 1;
                  let c = i + 2;

                  indices.push(a, b, b, c, c, a);

              }

          }

          // console.timeEnd( 'wireframe' );

          attribute = new (arrayMax(indices) > 65535 ? Uint32BufferAttribute : Uint16BufferAttribute)(indices, 1);

          this._attributes.update(attribute, gl.ELEMENT_ARRAY_BUFFER);

          this._wireframeAttributes[geometry.id] = attribute;

          return attribute;

      }
  }

  function onGeometryDispose(event) {

      let geometry = event.target;
      let buffergeometry = this._geometries[geometry.id];
      if (!buffergeometry) return;

      if (buffergeometry.index !== null) {

          this._attributes.remove(buffergeometry.index);

      }

      for (let name in buffergeometry.attributes) {

          this._attributes.remove(buffergeometry.attributes[name]);

      }

      geometry.off('dispose', onGeometryDispose);

      delete this._geometries[geometry.id];

      // TODO Remove duplicate code

      let attribute = this._wireframeAttributes[geometry.id];

      if (attribute) {

          this._attributes.remove(attribute);
          delete this._wireframeAttributes[geometry.id];

      }

      // attribute = this._wireframeAttributes[buffergeometry.id];

      // if (attribute) {

      //     this._attributes.remove(attribute);
      //     delete this._wireframeAttributes[buffergeometry.id];

      // }

      //

      this._info.memory.geometries--;

  }

  let UniformsLib = {
  	common: {

  		diffuse: { value: new Color$1(0xeeeeee) },
  		opacity: { value: 1.0 },

  		map: { value: null },
  		uvTransform: { value: new Matrix3() },


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
  		},

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

  	merge: function ( uniforms ) {

  		var merged = {};

  		for ( var u = 0; u < uniforms.length; u ++ ) {

  			var tmp = this.clone( uniforms[ u ] );

  			for ( var p in tmp ) {

  				merged[ p ] = tmp[ p ];

  			}

  		}

  		return merged;

  	},

  	clone: function ( uniforms_src ) {

  		var uniforms_dst = {};

  		for ( var u in uniforms_src ) {

  			uniforms_dst[ u ] = {};

  			for ( var p in uniforms_src[ u ] ) {

  				var parameter_src = uniforms_src[ u ][ p ];

  				if ( parameter_src && ( parameter_src.isColor ||
  					parameter_src.isMatrix3 || parameter_src.isMatrix4 ||
  					parameter_src.isVector2 || parameter_src.isVector3 || parameter_src.isVector4 ||
  					parameter_src.isTexture ) ) {

  					uniforms_dst[ u ][ p ] = parameter_src.clone();

  				} else if ( Array.isArray( parameter_src ) ) {

  					uniforms_dst[ u ][ p ] = parameter_src.slice();

  				} else {

  					uniforms_dst[ u ][ p ] = parameter_src;

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

  		uniforms: UniformsUtils$1.merge([
  			UniformsLib.common
  		]),

  		vertexShader: ShaderChunk.meshbasic_vert,
  		fragmentShader: ShaderChunk.meshbasic_frag

  	},
  	lambert: {

  		uniforms: UniformsUtils$1.merge([
  			UniformsLib.common,
  			UniformsLib.lights,
  			{
  				emissive: { value: new Color$1(0x000000) }
  			}
  		]),

  		vertexShader: ShaderChunk.meshlambert_vert,
  		fragmentShader: ShaderChunk.meshlambert_frag

  	},
  	phong: {

  		uniforms: UniformsUtils$1.merge([
  			UniformsLib.common,
  			UniformsLib.lights,
  			{
  				emissive: { value: new Color$1(0x000000) },
  				specular: { value: new Color$1(0x111111) },
  				shininess: { value: 30 }
  			}
  		]),

  		vertexShader: ShaderChunk.meshphong_vert,
  		fragmentShader: ShaderChunk.meshphong_frag

  	},
  	dashed: {
  		uniforms: UniformsUtils$1.merge([
  			UniformsLib.common,
  			UniformsLib.line

  		]),

  		vertexShader: ShaderChunk.linedashed_vert,
  		fragmentShader: ShaderChunk.linedashed_frag

  	},
  	linemesh: {
  		uniforms: UniformsUtils$1.merge([
  			UniformsLib.common,
  			UniformsLib.line,
  			{
  				linewidth: { value: 1 },
  				resolution: { value: new Vector2(1, 1) },
  			}

  		]),
  		vertexShader: ShaderChunk.linemesh_vert,
  		fragmentShader: ShaderChunk.linemesh_frag
  	},
  	points: {
  		uniforms: UniformsUtils$1.merge([
  			UniformsLib.points,
  			//UniformsLib.fog
  		]),

  		vertexShader: ShaderChunk.points_vert,
  		fragmentShader: ShaderChunk.points_frag

  	},
  	sprite: {

  		uniforms: UniformsUtils$1.merge( [
  			UniformsLib.sprite,
  			//UniformsLib.fog
  		] ),

  		vertexShader: ShaderChunk.sprite_vert,
  		fragmentShader: ShaderChunk.sprite_frag

  	}

  };

  /**
   * @class WebGLInfo
   * @description 保存渲染的基本数据
   * @author bujue
   */

  class WebGLInfo {
      constructor(gl) {
          this.gl = gl;

          this.memory = {
              geometries: 0,
              textures: 0
          };

          this.render = {
              frame: 0,
              calls: 0,
              triangles: 0,
              points: 0,
              lines: 0
          };

          this.programs = null;
          this.autoReset = true;


      }

      update(count, mode, instanceCount) {

          let gl = this.gl;
          instanceCount = instanceCount || 1;

          this.render.calls++;

          switch (mode) {

              case gl.TRIANGLES:
                  this.render.triangles += instanceCount * (count / 3);
                  break;

              case gl.TRIANGLE_STRIP:
              case gl.TRIANGLE_FAN:
                  this.render.triangles += instanceCount * (count - 2);
                  break;

              case gl.LINES:
                  this.render.lines += instanceCount * (count / 2);
                  break;

              case gl.LINE_STRIP:
                  this.render.lines += instanceCount * (count - 1);
                  break;

              case gl.LINE_LOOP:
                  this.render.lines += instanceCount * count;
                  break;

              case gl.POINTS:
                  this.render.points += instanceCount * count;
                  break;

              default:
                  console.error('WebGLInfo: Unknown draw mode:', mode);
                  break;

          }

      }

      reset() {
          this.render.frame++;
          this.render.calls = 0;
          this.render.triangles = 0;
          this.render.points = 0;
          this.render.lines = 0;

      }

  }

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
          this.unpackAlignment = 4;	// valid values: 1, 2, 4, 8 (see http://www.khronos.org/opengles/sdk/docs/man/xhtml/glPixelStorei.xml)

          //
          // Also changing the encoding after already used by a Material will not automatically make the Material
          // update.  You need to explicitly call Material.needsUpdate to trigger it to recompile.
         // this.encoding = encoding !== undefined ? encoding :  LinearEncoding;

          this.version = 0;
          this.onUpdate = null;

          this.isTexture = true;

      }

      set needsUpdate(value) {
          if (value === true) this.version++;
      }

      updateMatrix () {

  		this.matrix.setUvTransform( this.offset.x, this.offset.y, this.repeat.x, this.repeat.y, this.rotation, this.center.x, this.center.y );

  	}

      dispose () {

  		this.fire( { type: 'dispose' } );

  	}

  }

  Texture.DEFAULT_IMAGE = undefined;
  Texture.DEFAULT_MAPPING = UVMapping;

  /**
   * @class WebGLUniforms
   * @description Uniform 变量的赋值,不同类型,底层提供不同的赋值方法
   * @author bujue
   * gl.uniform1f (floatUniformLoc, v); // for float
   * gl.uniform1fv(floatUniformLoc, [v]);   // for float or float array
   * gl.uniform2f (vec2UniformLoc,  v0, v1);// for vec2
   * gl.uniform2fv(vec2UniformLoc,  [v0, v1]);  // for vec2 or vec2 array
   * gl.uniform3f (vec3UniformLoc,  v0, v1, v2);// for vec3
   * gl.uniform3fv(vec3UniformLoc,  [v0, v1, v2]);  // for vec3 or vec3 array
   * gl.uniform4f (vec4UniformLoc,  v0, v1, v2, v4);// for vec4
   * gl.uniform4fv(vec4UniformLoc,  [v0, v1, v2, v4]);  // for vec4 or vec4 array

   * gl.uniformMatrix2fv(mat2UniformLoc, false, [  4x element array ])  // for mat2 or mat2 array
   * gl.uniformMatrix3fv(mat3UniformLoc, false, [  9x element array ])  // for mat3 or mat3 array
   * gl.uniformMatrix4fv(mat4UniformLoc, false, [ 17x element array ])  // for mat4 or mat4 array

   * gl.uniform1i (intUniformLoc,   v); // for int
   * gl.uniform1iv(intUniformLoc, [v]); // for int or int array
   * gl.uniform2i (ivec2UniformLoc, v0, v1);// for ivec2
   * gl.uniform2iv(ivec2UniformLoc, [v0, v1]);  // for ivec2 or ivec2 array
   * gl.uniform3i (ivec3UniformLoc, v0, v1, v2);// for ivec3
   * gl.uniform3iv(ivec3UniformLoc, [v0, v1, v2]);  // for ivec3 or ivec3 array
   * gl.uniform4i (ivec4UniformLoc, v0, v1, v2, v4);// for ivec4
   * gl.uniform4iv(ivec4UniformLoc, [v0, v1, v2, v4]);  // for ivec4 or ivec4 array

   * gl.uniform1i (sampler2DUniformLoc,   v);   // for sampler2D (textures)
   * gl.uniform1iv(sampler2DUniformLoc, [v]);   // for sampler2D or sampler2D array

   * gl.uniform1i (samplerCubeUniformLoc,   v); // for samplerCube (textures)
   * gl.uniform1iv(samplerCubeUniformLoc, [v]); // for samplerCube or samplerCube array
   */


  class WebGLUniforms {

      constructor(gl, program, renderer) {
          this._gl = gl;
          this._program = program;
          this._renderer = renderer;
          this.seq = [];
          this.map = {};

          let n = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);

          for (let i = 0; i < n; ++i) {

              let info = gl.getActiveUniform(program, i),
                  addr = gl.getUniformLocation(program, info.name);

              parseUniform(info, addr, this);

          }

      }

      setValue(name, value) {

          var u = this.map[name];

          if (u !== undefined) u.setValue(value, this._renderer);

      }

      setOptional(object, name) { //保留,暂时用不到

          var v = object[name];

          if (v !== undefined) this.setValue(name, v);

      }
      static upload(gl, seq, values, renderer) {

          for (var i = 0, n = seq.length; i !== n; ++i) {

              var u = seq[i],
                  v = values[u.id];

              if (v.needsUpdate !== false) {

                  // note: always updating when .needsUpdate is undefined
                  u.setValue(v.value, renderer);

              }

          }

      }
      static seqWithValue(seq, values) {

          var r = [];

          for (var i = 0, n = seq.length; i !== n; ++i) {

              var u = seq[i];
              if (u.id in values) r.push(u);

          }

          return r;

      }

  }

  class StructuredUniform {
      constructor(gl, id) {

          this._gl = gl;
          this.id = id;
          this.seq = [];
          this.map = {};
      }

      setValue(value) {

          // Note: Don't need an extra 'renderer' parameter, since samplers
          // are not allowed in structured uniforms.

          var seq = this.seq;

          for (var i = 0, n = seq.length; i !== n; ++i) {

              var u = seq[i];
              u.setValue(value[u.id]);

          }

      }
  }


  // --- Uniform Classes ---

  class SingleUniform {
      constructor(gl, id, activeInfo, addr) {
          this._gl = gl;
          this.id = id;
          this.addr = addr;
          this.cache = [];
          this.setValue = getSingularSetter(activeInfo.type);

          // this.path = activeInfo.name; // DEBUG

      }

  }



  class PureArrayUniform {
      constructor(gl, id, activeInfo, addr) {
          this._gl = gl;
          this.id = id;
          this.addr = addr;
          this.cache = [];
          this.size = activeInfo.size;
          this.setValue = getPureArraySetter(activeInfo.type);

          // this.path = activeInfo.name; // DEBUG

      }


  }

  function getSingularSetter(type) {
      switch (type) {

          case 0x1406: return setValue1f; // FLOAT
          case 0x8b50: return setValue2fv; // _VEC2
          case 0x8b51: return setValue3fv; // _VEC3
          case 0x8b52: return setValue4fv; // _VEC4

          case 0x8b5a: return setValue2fm; // _MAT2
          case 0x8b5b: return setValue3fm; // _MAT3
          case 0x8b5c: return setValue4fm; // _MAT4

          case 0x8b5e: case 0x8d66: return setValueT1; // SAMPLER_2D, SAMPLER_EXTERNAL_OES
          // case 0x8b60: return setValueT6; // SAMPLER_CUBE

          case 0x1404: case 0x8b56: return setValue1i; // INT, BOOL
          case 0x8b53: case 0x8b57: return setValue2iv; // _VEC2
          case 0x8b54: case 0x8b58: return setValue3iv; // _VEC3
          case 0x8b55: case 0x8b59: return setValue4iv; // _VEC4

      }
  }

  function getPureArraySetter(type) {

      switch (type) {

          case 0x1406: return setValue1fv; // FLOAT
          case 0x8b50: return setValueV2a; // _VEC2
          case 0x8b51: return setValueV3a; // _VEC3
          case 0x8b52: return setValueV4a; // _VEC4

          case 0x8b5a: return setValueM2a; // _MAT2
          case 0x8b5b: return setValueM3a; // _MAT3
          case 0x8b5c: return setValueM4a; // _MAT4

          case 0x8b5e: return setValueT1a; // SAMPLER_2D
          //  case 0x8b60: return setValueT6a; // SAMPLER_CUBE

          case 0x1404: case 0x8b56: return setValue1iv; // INT, BOOL
          case 0x8b53: case 0x8b57: return setValue2iv; // _VEC2
          case 0x8b54: case 0x8b58: return setValue3iv; // _VEC3
          case 0x8b55: case 0x8b59: return setValue4iv; // _VEC4

      }

  }


  function parseUniform(activeInfo, addr, container) {

      let RePathPart = /([\w\d_]+)(\])?(\[|\.)?/g;
      let path = activeInfo.name,
          pathLength = path.length;

      // reset RegExp object, because of the early exit of a previous run
      RePathPart.lastIndex = 0;

      while (true) {

          let match = RePathPart.exec(path),
              matchEnd = RePathPart.lastIndex,

              id = match[1],
              idIsIndex = match[2] === ']',
              subscript = match[3];

          if (idIsIndex) id = id | 0; // convert to integer

          if (subscript === undefined || subscript === '[' && matchEnd + 2 === pathLength) {

              // bare name or "pure" bottom-level array "[0]" suffix

              addUniform(container, subscript === undefined ?
                  new SingleUniform(container._gl, id, activeInfo, addr) :
                  new PureArrayUniform(container._gl, id, activeInfo, addr));

              break;

          } else {

              // step into inner node / create it in case it doesn't exist

              let map = container.map, next = map[id];

              if (next === undefined) {

                  next = new StructuredUniform(container._gl,id);
                  addUniform(container, next);

              }

              container = next;

          }

      }

  }

  function addUniform(container, uniformObject) {

      container.seq.push(uniformObject);
      container.map[uniformObject.id] = uniformObject;

  }
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

          for (var i = 0; i !== n; ++i)
              r[i] = renderer.allocTextureUnit();

          return r;

      }
  };

  // --- Setters ---


  function setValue1f(v) {

      let cache = this.cache;

      if (cache[0] === v) return;

      this._gl.uniform1f(this.addr, v);

      cache[0] = v;

  }

  function setValue1i(v) {

      let cache = this.cache;

      if (cache[0] === v) return;

      this._gl.uniform1i(this.addr, v);

      cache[0] = v;

  }

  // Single float vector (from flat array or MMGL.VectorN)

  function setValue2fv(v) {

      let cache = this.cache;

      if (v.x !== undefined) { //XY

          if (cache[0] !== v.x || cache[1] !== v.y) {

              this._gl.uniform2f(this.addr, v.x, v.y);

              cache[0] = v.x;
              cache[1] = v.y;

          }

      } else { //arr[2]

          if (arrayUtils.arraysEqual(cache, v)) return;

          this._gl.uniform2fv(this.addr, v);

          arrayUtils.copyArray(cache, v);

      }

  }

  function setValue3fv(v) {

      let cache = this.cache;

      if (v.x !== undefined) { //XYZ

          if (cache[0] !== v.x || cache[1] !== v.y || cache[2] !== v.z) {

              this._gl.uniform3f(this.addr, v.x, v.y, v.z);

              cache[0] = v.x;
              cache[1] = v.y;
              cache[2] = v.z;

          }

      } else if (v.r !== undefined) { //RGB

          if (cache[0] !== v.r || cache[1] !== v.g || cache[2] !== v.b) {

              this._gl.uniform3f(this.addr, v.r, v.g, v.b);

              cache[0] = v.r;
              cache[1] = v.g;
              cache[2] = v.b;

          }

      } else { //arr[3]

          if (arrayUtils.arraysEqual(cache, v)) return;

          this._gl.uniform3fv(this.addr, v);

          arrayUtils.copyArray(cache, v);

      }

  }

  function setValue4fv(v) {

      let cache = this.cache;

      if (v.x !== undefined) { //XYZW

          if (cache[0] !== v.x || cache[1] !== v.y || cache[2] !== v.z || cache[3] !== v.w) {

              this._gl.uniform4f(this.addr, v.x, v.y, v.z, v.w);

              cache[0] = v.x;
              cache[1] = v.y;
              cache[2] = v.z;
              cache[3] = v.w;

          }

      } else { //arr[4]

          if (arrayUtils.arraysEqual(cache, v)) return;

          this._gl.uniform4fv(this.addr, v);

          arrayUtils.copyArray(cache, v);

      }

  }

  // Single matrix (from flat array or MatrixN)

  function setValue2fm(v) {

      let cache = this.cache;
      let elements = v.elements;

      if (elements === undefined) {  //v is Float32Array 4

          if (arrayUtils.arraysEqual(cache, v)) return;

          this._gl.uniformMatrix2fv(this.addr, false, v);

          arrayUtils.copyArray(cache, v);

      } else {

          if (arrayUtils.arraysEqual(cache, elements)) return;

          arrayUtils.mat2array.set(elements);

          this._gl.uniformMatrix2fv(this.addr, false, arrayUtils.mat2array);

          arrayUtils.copyArray(cache, elements);

      }

  }

  function setValue3fm(v) {

      let cache = this.cache;
      let elements = v.elements;

      if (elements === undefined) {

          if (arrayUtils.arraysEqual(cache, v)) return;

          this._gl.uniformMatrix3fv(this.addr, false, v);

          arrayUtils.copyArray(cache, v);

      } else {

          if (arrayUtils.arraysEqual(cache, elements)) return;

          arrayUtils.mat3array.set(elements);

          this._gl.uniformMatrix3fv(this.addr, false, arrayUtils.mat3array);

          arrayUtils.copyArray(cache, elements);

      }

  }

  function setValue4fm(v) {

      let cache = this.cache;
      let elements = v.elements;

      if (elements === undefined) {

          if (arrayUtils.arraysEqual(cache, v)) return;

          this._gl.uniformMatrix4fv(this.addr, false, v);

          arrayUtils.copyArray(cache, v);

      } else {

          if (arrayUtils.arraysEqual(cache, elements)) return;

          arrayUtils.mat4array.set(elements);

          this._gl.uniformMatrix4fv(this.addr, false, arrayUtils.mat4array);

          arrayUtils.copyArray(cache, elements);

      }

  }

  // Single texture (2D / Cube)

  function setValueT1(v, renderer) {

      let cache = this.cache;
      let unit = renderer.allocTextureUnit();

      if (cache[0] !== unit) {

          this._gl.uniform1i(this.addr, unit);
          cache[0] = unit;

      }

      renderer.setTexture2D(v || arrayUtils.emptyTexture, unit);

  }

  // function setValueT6(v, renderer) {

  //     let cache = this.cache;
  //     let unit = renderer.allocTextureUnit();

  //     if (cache[0] !== unit) {

  //         this._gl.uniform1i(this.addr, unit);
  //         cache[0] = unit;

  //     }

  //     renderer.setTextureCube(v || arrayUtils.emptyCubeTexture, unit);

  // }

  // Integer / Boolean vectors or arrays thereof (always flat arrays)

  function setValue2iv(v) {

      let cache = this.cache;

      if (arrayUtils.arraysEqual(cache, v)) return;

      this._gl.uniform2iv(this.addr, v);

      arrayUtils.copyArray(cache, v);

  }

  function setValue3iv(v) {

      let cache = this.cache;

      if (arrayUtils.arraysEqual(cache, v)) return;

      this._gl.uniform3iv(this.addr, v);

      arrayUtils.copyArray(cache, v);

  }

  function setValue4iv(v) {

      let cache = this.cache;

      if (arrayUtils.arraysEqual(cache, v)) return;

      this._gl.uniform4iv(this.addr, v);

      arrayUtils.copyArray(cache, v);

  }


  // Array of scalars

  function setValue1fv(v) {

      let cache = this.cache;

      if (arrayUtils.arraysEqual(cache, v)) return;

      this._gl.uniform1fv(this.addr, v);

      arrayUtils.copyArray(cache, v);

  }
  function setValue1iv(v) {

      let cache = this.cache;

      if (arrayUtils.arraysEqual(cache, v)) return;

      this._gl.uniform1iv(this.addr, v);

      arrayUtils.copyArray(cache, v);

  }


  function setValueV2a(v) {

      this._gl.uniform2fv(this.addr, arrayUtils.flatten(v, this.size, 2));

  }

  function setValueV3a(v) {

      this._gl.uniform3fv(this.addr, arrayUtils.flatten(v, this.size, 3));

  }

  function setValueV4a(v) {

      this._gl.uniform4fv(this.addr, arrayUtils.flatten(v, this.size, 4));

  }


  function setValueM2a(v) {

      this._gl.uniformMatrix2fv(this.addr, false, arrayUtils.flatten(v, this.size, 4));

  }

  function setValueM3a(v) {

      this._gl.uniformMatrix3fv(this.addr, false, arrayUtils.flatten(v, this.size, 9));

  }

  function setValueM4a(v) {

      this._gl.uniformMatrix4fv(this.addr, false, arrayUtils.flatten(v, this.size, 16));

  }

  // Array of textures (2D / Cube)

  function setValueT1a(v, renderer) {

      let cache = this.cache;
      let n = v.length;

      let units = arrayUtils.allocTexUnits(renderer, n);

      if (arrayUtils.arraysEqual(cache, units) === false) {

          this._gl.uniform1iv(this.addr, units);
          arrayUtils.copyArray(cache, units);

      }

      for (let i = 0; i !== n; ++i) {

          renderer.setTexture2D(v[i] || arrayUtils.emptyTexture, units[i]);

      }

  }

  function addLineNumbers( string ) {

  	var lines = string.split( '\n' );

  	for ( var i = 0; i < lines.length; i ++ ) {

  		lines[ i ] = ( i + 1 ) + ': ' + lines[ i ];

  	}

  	return lines.join( '\n' );

  }

  function WebGLShader( gl, type, string ) {

  	var shader = gl.createShader( type );

  	gl.shaderSource( shader, string );
  	gl.compileShader( shader );

  	if ( gl.getShaderParameter( shader, gl.COMPILE_STATUS ) === false ) {

  		console.error( 'WebGLShader: Shader couldn\'t compile.' );

  	}

  	if ( gl.getShaderInfoLog( shader ) !== '' ) {

  		console.warn( 'WebGLShader: gl.getShaderInfoLog()', type === gl.VERTEX_SHADER ? 'vertex' : 'fragment', gl.getShaderInfoLog( shader ), addLineNumbers( string ) );

  	}

  	// --enable-privileged-webgl-extension
  	// console.log( type, gl.getExtension( 'WEBGL_debug_shaders' ).getTranslatedShaderSource( shader ) );

  	return shader;

  }

  /**
   * @class WebGLProgram
   * @description  组织shader code ,生成 program 对象
   * @author bujue
   */
  let programIdCount = 0;

  class WebGLProgram {
      constructor(gl, extensions, material, code, shader, parameters) {
          this._gl = gl;
          this._defines = material.defines;

          this._cachedUniforms = undefined;
          this._cachedAttributes = undefined;

          this.name = shader.name;
          this.id = programIdCount++;
          this.code = code;
          this.usedTimes = 1;
          this.program = null;
          this.vertexShader = '';
          this.fragmentShader = '';


          this._init(gl, extensions, material, shader, parameters);

      }
      _init(gl, extensions, material, shader, parameters) {

          let vertexShader = shader.vertexShader;
          let fragmentShader = shader.fragmentShader;

          let customExtensions = generateExtensions(material.extensions, parameters, extensions);

          let customDefines = generateDefines(this._defines);

          let program = this.program = gl.createProgram();

          let prefixVertex, prefixFragment;

          if (material.isRawShaderMaterial) {

              prefixVertex = [

                  customDefines

              ].filter(filterEmptyLine).join('\n');

              if (prefixVertex.length > 0) {

                  prefixVertex += '\n';

              }

              prefixFragment = [

                  customExtensions,
                  customDefines

              ].filter(filterEmptyLine).join('\n');

              if (prefixFragment.length > 0) {

                  prefixFragment += '\n';

              }

          } else {
              prefixVertex = [

                  'precision ' + parameters.precision + ' float;',
                  'precision ' + parameters.precision + ' int;',

                  '#define SHADER_NAME ' + shader.name,

                  //运用纹理作色
                  parameters.map ? '#define USE_MAP' : '',

                  //采用顶点作色
                  parameters.vertexColors ? '#define USE_COLOR' : '',

                  parameters.doubleSided ? '#define DOUBLE_SIDED' : '',
                  parameters.flipSided ? '#define FLIP_SIDED' : '',

                  //根据Z值的不同,点的大小递减
                  parameters.sizeAttenuation ? '#define USE_SIZEATTENUATION' : '',

                  //linemesh 是否是虚线
                  parameters.dashed ? '#define USE_DASH' : '',

                  'uniform mat4 modelMatrix;',
                  'uniform mat4 modelViewMatrix;',
                  'uniform mat4 projectionMatrix;',
                  'uniform mat4 viewMatrix;',
                  'uniform mat3 normalMatrix;',
                  'uniform vec3 cameraPosition;',

                  'attribute vec3 position;',
                  'attribute vec3 normal;',
                  'attribute vec2 uv;',

                  '#ifdef USE_COLOR',

                  '	attribute vec3 color;',

                  '#endif',

                  '\n'

              ].filter(filterEmptyLine).join('\n');

              prefixFragment = [

                  'precision ' + parameters.precision + ' float;',
                  'precision ' + parameters.precision + ' int;',

                  '#define SHADER_NAME ' + shader.name,


                  parameters.map ? '#define USE_MAP' : '',
                  parameters.vertexColors ? '#define USE_COLOR' : '',

                  parameters.doubleSided ? '#define DOUBLE_SIDED' : '',
                  parameters.flipSided ? '#define FLIP_SIDED' : '',

                  parameters.premultipliedAlpha ? '#define PREMULTIPLIED_ALPHA' : '',

                  //linemesh 是否是虚线
                  parameters.dashed ? '#define USE_DASH' : '',

                  'uniform mat4 viewMatrix;',
                  'uniform vec3 cameraPosition;',

                  '\n'

              ].filter(filterEmptyLine).join('\n');
          }
          vertexShader = replaceLightNums(vertexShader, parameters);
          fragmentShader = replaceLightNums(fragmentShader, parameters);

          vertexShader = unrollLoops(vertexShader);
          fragmentShader = unrollLoops(fragmentShader);

          let vertexGlsl = prefixVertex + vertexShader;
          let fragmentGlsl = prefixFragment + fragmentShader;

          console.log('*VERTEX*', vertexGlsl);
          console.log('*FRAGMENT*', fragmentGlsl);

          let glVertexShader = this.vertexShader = WebGLShader(gl, gl.VERTEX_SHADER, vertexGlsl);
          let glFragmentShader = this.fragmentShader = WebGLShader(gl, gl.FRAGMENT_SHADER, fragmentGlsl);

          gl.attachShader(program, glVertexShader);
          gl.attachShader(program, glFragmentShader);


          gl.linkProgram(program);

          let programLog = gl.getProgramInfoLog(program).trim();
          let vertexLog = gl.getShaderInfoLog(glVertexShader).trim();
          let fragmentLog = gl.getShaderInfoLog(glFragmentShader).trim();


          // console.log( '**VERTEX**', gl.getExtension( 'WEBGL_debug_shaders' ).getTranslatedShaderSource( glVertexShader ) );
          // console.log( '**FRAGMENT**', gl.getExtension( 'WEBGL_debug_shaders' ).getTranslatedShaderSource( glFragmentShader ) );

          if (gl.getProgramParameter(program, gl.LINK_STATUS) === false) {


              console.error('WebGLProgram: shader error: ', gl.getError(), 'gl.VALIDATE_STATUS', gl.getProgramParameter(program, gl.VALIDATE_STATUS), 'gl.getProgramInfoLog', programLog, vertexLog, fragmentLog);

          } else if (programLog !== '') {

              console.warn('WebGLProgram: gl.getProgramInfoLog()', programLog);

          }


          // clean up

          gl.deleteShader(glVertexShader);
          gl.deleteShader(glFragmentShader);
      }
      getUniforms() {

          let gl = this._gl;
          let program = this.program;

          if (this._cachedUniforms === undefined) {
              //todo 多重纹理的时候需要传递 renderer 
              //setTexture2D(texture , unit )
              //this._cachedUniforms = new WebGLUniforms(gl, program, renderer);
              this._cachedUniforms = new WebGLUniforms(gl, program);

          }

          return this._cachedUniforms;

      }

      getAttributes() { //获取shader中 atttribute对象的handle
          let gl = this._gl;
          let program = this.program;

          if (this._cachedAttributes === undefined) {
              this._cachedAttributes = {};
              let n = gl.getProgramParameter(program, gl.ACTIVE_ATTRIBUTES);

              for (var i = 0; i < n; i++) {

                  var info = gl.getActiveAttrib(program, i);
                  var name = info.name;

                  console.log('WebGLProgram: ACTIVE VERTEX ATTRIBUTE:', name, i);

                  this._cachedAttributes[name] = gl.getAttribLocation(program, name);

              }

          }

          return this._cachedAttributes;

      };
      destroy() {

          this._gl.deleteProgram(this.program);
          this.program = undefined;
      }
  }

  function replaceLightNums(string, parameters) {

      return string
          .replace(/NUM_DIR_LIGHTS/g, parameters.numDirLights)
          .replace(/NUM_SPOT_LIGHTS/g, parameters.numSpotLights)
          .replace(/NUM_POINT_LIGHTS/g, parameters.numPointLights);

  }

  function unrollLoops(string) {

      var pattern = /#pragma unroll_loop[\s]+?for \( int i \= (\d+)\; i < (\d+)\; i \+\+ \) \{([\s\S]+?)(?=\})\}/g;

      function replace(match, start, end, snippet) {

          var unroll = '';

          for (var i = parseInt(start); i < parseInt(end); i++) {

              unroll += snippet.replace(/\[ i \]/g, '[ ' + i + ' ]');

          }

          return unroll;

      }

      return string.replace(pattern, replace);

  }

  function generateExtensions(extensions, parameters, rendererExtensions) {

      extensions = extensions || {};

      var chunks = [
          (extensions.derivatives || parameters.envMapCubeUV || parameters.bumpMap || parameters.normalMap || parameters.flatShading) ? '#extension GL_OES_standard_derivatives : enable' : '',
          (extensions.fragDepth || parameters.logarithmicDepthBuffer) && rendererExtensions.get('EXT_frag_depth') ? '#extension GL_EXT_frag_depth : enable' : '',
          (extensions.drawBuffers) && rendererExtensions.get('WEBGL_draw_buffers') ? '#extension GL_EXT_draw_buffers : require' : '',
          (extensions.shaderTextureLOD || parameters.envMap) && rendererExtensions.get('EXT_shader_texture_lod') ? '#extension GL_EXT_shader_texture_lod : enable' : ''
      ];

      return chunks.filter(filterEmptyLine).join('\n');

  }

  function generateDefines(defines) {

      var chunks = [];

      for (var name in defines) {

          var value = defines[name];

          if (value === false) continue;

          chunks.push('#define ' + name + ' ' + value);

      }

      return chunks.join('\n');

  }

  function filterEmptyLine(string) {

      return string !== '';

  }

  class WebGLPrograms {
      constructor(gl, extensions, capabilities) {
          this.programs = [];
          this._gl = gl;
          this._extensions = extensions;
          this._capabilities = capabilities;

          this._shaderIDs = {

              MeshBasicMaterial: 'basic',
              LineBasicMaterial: 'basic',
              LineDashedMaterial: 'dashed',
              PointsMaterial: 'points',
              MeshLambertMaterial: 'lambert',
              MeshPhongMaterial: 'phong',
              LineMeshMaterial: 'linemesh',
              SpriteMaterial: 'sprite'
          };

      }

      getParameters(material, lights) {

          let shaderID = this._shaderIDs[material.type];
          let precision = this._capabilities.precision;

          if (material.precision !== null) {

              precision = this._capabilities.getMaxPrecision(material.precision);

              if (precision !== material.precision) {

                  console.warn('WebGLProgram.getParameters:', material.precision, 'not supported, using', precision, 'instead.');

              }

          }
          //shader Define值从这里取
          let parameters = {
              shaderID,
              precision,
              map: !!material.map,
              vertexColors: material.vertexColors,
              alphaTest: material.alphaTest,
              doubleSided: material.side === DoubleSide,
              flipSided: material.side === BackSide,
              dashed: !!material.dashed,
              sizeAttenuation:!!material.sizeAttenuation,
              premultipliedAlpha:!!material.premultipliedAlpha,

              numDirLights: lights.directional.length,
              numPointLights: lights.point.length,
              numSpotLights: lights.spot.length,

          };

          return parameters;

      }

      getProgramCode(material, parameters) {
          let array = [];
          //todo  关键字暂时都保留,后面优化去掉
          let parameterNames = [
              "precision", "supportsVertexTextures", "map", "mapEncoding", "envMap", "envMapMode", "envMapEncoding",
              "lightMap", "aoMap", "emissiveMap", "emissiveMapEncoding", "bumpMap", "normalMap", "displacementMap", "specularMap",
              "roughnessMap", "metalnessMap", "gradientMap",
              "alphaMap", "combine", "vertexColors", "fog", "useFog", "fogExp",
              "flatShading", "sizeAttenuation", "logarithmicDepthBuffer", "skinning",
              "maxBones", "useVertexTexture", "morphTargets", "morphNormals",
              "maxMorphTargets", "maxMorphNormals", "premultipliedAlpha",
              "numDirLights", "numPointLights", "numSpotLights", "numHemiLights", "numRectAreaLights",
              "shadowMapEnabled", "shadowMapType", "toneMapping", 'physicallyCorrectLights',
              "alphaTest", "doubleSided", "flipSided", "numClippingPlanes", "numClipIntersection", "depthPacking", "dithering", "dashed"
          ];
          if (parameters.shaderID) {

              array.push(parameters.shaderID);

          } else {

              array.push(material.fragmentShader);
              array.push(material.vertexShader);

          }

          if (material.defines !== undefined) {

              for (let name in material.defines) {

                  array.push(name);
                  array.push(material.defines[name]);

              }

          }

          for (let i = 0; i < parameterNames.length; i++) {

              array.push(parameters[parameterNames[i]]);

          }

          //array.push(material.onBeforeCompile.toString());


          return array.join();
      }

      acquireProgram(material, shader, parameters, code) {
          let program;

          // Check if code has been already compiled
          for (let p = 0, pl = this.programs.length; p < pl; p++) {

              let programInfo = this.programs[p];

              if (programInfo.code === code) {

                  program = programInfo;
                  ++program.usedTimes;

                  break;

              }

          }

          if (program === undefined) {

              program = new WebGLProgram(this._gl, this._extensions, material, code, shader, parameters);
              this.programs.push(program);

          }

          return program;
      }

      releaseProgram(program) {
          if (--program.usedTimes === 0) {

              // Remove from unordered set
              let i = this.programs.indexOf(program);

              this.programs[i] = this.programs[this.programs.length - 1];
              this.programs.pop();

              // Free WebGL resources
              program.destroy();

          }
      }
  }

  class WebGLRenderList {
      constructor() {
          this.renderItems = [];
          this.renderItemsIndex = 0;

          this.opaque = [];
          this.transparent = [];
      }
      init() {
          this.renderItemsIndex = 0;

          this.opaque.length = 0;
          this.transparent.length = 0;
      }
      push(object, geometry, material, z, group) {

          var renderItem = this.renderItems[this.renderItemsIndex];

          if (renderItem === undefined) {

              renderItem = {
                  id: object.id,
                  object: object,
                  geometry: geometry,
                  material: material,
                  program: material.program,
                  renderOrder: object.renderOrder,
                  z: z,
                  group: group
              };

              this.renderItems[this.renderItemsIndex] = renderItem;

          } else {

              renderItem.id = object.id;
              renderItem.object = object;
              renderItem.geometry = geometry;
              renderItem.material = material;
              renderItem.program = material.program;
              renderItem.renderOrder = object.renderOrder;
              renderItem.z = z;
              renderItem.group = group;

          }

          (material.transparent === true ? this.transparent : this.opaque).push(renderItem);

          this.renderItemsIndex++;

      }

      sort() {

          if (this.opaque.length > 1) this.opaque.sort(painterSortStable);
          if (this.transparent.length > 1) this.transparent.sort(reversePainterSortStable);

      }


  }

  function painterSortStable(a, b) {

      if (a.renderOrder !== b.renderOrder) {

          return a.renderOrder - b.renderOrder;

      } else if (a.program && b.program && a.program !== b.program) {

          return a.program.id - b.program.id;

      } else if (a.material.id !== b.material.id) {

          return a.material.id - b.material.id;

      } else if (a.z !== b.z) {

          return a.z - b.z;

      } else {

          return a.id - b.id;

      }

  }

  function reversePainterSortStable(a, b) {

      if (a.renderOrder !== b.renderOrder) {

          return a.renderOrder - b.renderOrder;

      } if (a.z !== b.z) {

          return b.z - a.z;

      } else {

          return a.id - b.id;

      }

  }

  class WebGLRenderLists {

      constructor() {
          this._lists = {};
      }

      get(scene, camera) {

          var hash = scene.id + ',' + camera.id;
          var list = this._lists[hash];

          if (list === undefined) {

              console.log('WebGLRenderLists:', hash);

              list = new WebGLRenderList();
              this._lists[hash] = list;

          }

          return list;

      }

      dispose() {

          this._lists = {};

      }


  }

  class WebGLBufferRenderer {
      constructor(gl, extensions,info) {
          this._mode = gl.TRIANGLES;
          this._gl = gl;
          this._info = info;
          this._extensions = extensions;
      }
      setMode(value) {

          this._mode = value;

      }

      render(start, count) {

          this._gl.drawArrays(this._mode, start, count);
          this._info.update(count, this._mode);
      }

      renderInstances( geometry, start, count ) {

  		let extension = this._extensions.get( 'ANGLE_instanced_arrays' );

  		if ( extension === null ) {

  			console.error( 'WebGLBufferRenderer: using InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.' );
  			return;

  		}

  		this._extension.drawArraysInstancedANGLE( mode, start, count, geometry.maxInstancedCount );

  		this._info.update( count, this._mode, geometry.maxInstancedCount );

  	}

  }

  /**
   * @class WebGLObjects
   * @description 通过更新帧来控制更新WebGLGemetries update
   * @author bujue
   */

  class WebGLObjects {
      constructor(geometries, info) {
          this._infoRender = info.render;
          this._updateList = {};
          this._geometries = geometries;
      }

      update(object) {

          let frame = this._infoRender.frame;
          let geometries = this._geometries;


          let geometry = object.geometry;
          var buffergeometry = geometries.get(object, geometry);

          // Update once per frame

          if (this._updateList[buffergeometry.id] !== frame) {

              if (geometry.isGeometry) {

                  buffergeometry.updateFromObject(object);

              }
              //创建buffer
              geometries.update(buffergeometry);

              this._updateList[buffergeometry.id] = frame;

          }

          return buffergeometry;

      }
      dispose() {

          this._updateList = {};

      }

  }

  class WebGLIndexedBufferRenderer {
      constructor(gl, extensions, info) {
          this._mode = gl.TRIANGLES;
          this._gl = gl;
          this._info = info;
          this._extensions = extensions;
          this._type = undefined;
          this._bytesPerElement = undefined;
      }

      setMode(value) {

          this._mode = value;

      }

      setIndex(value) {

          this._type = value.type;
          this._bytesPerElement = value.bytesPerElement;

      }

      render(start, count) {

          this._gl.drawElements(this._mode, count, this._type, start * this._bytesPerElement);

          this._info.update(count, this._mode);

      }

      renderInstances(geometry, start, count) {

          let extension = this._extensions.get('ANGLE_instanced_arrays');

          if (extension === null) {

              console.error('WebGLIndexedBufferRenderer: using InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.');
              return;

          }

          extension.drawElementsInstancedANGLE(this._mode, count, this._type, start * this._bytesPerElement, geometry.maxInstancedCount);

          this._info.update(count, this._mode, geometry.maxInstancedCount);

      }


  }

  class WebGLTextures {
      constructor(_gl, extensions, state, properties, capabilities, utils, info) {
          this.gl = _gl;
          this._properties = properties;
          this._info = info;
          this._state = state;
          this._capabilities = capabilities;
          this._utils = utils;
      }

      setTexture2D(texture, slot) {

          let _gl = this.gl;
          let textureProperties = this._properties.get(texture);

          if (texture.version > 0 && textureProperties.__version !== texture.version) {

              let image = texture.image;

              if (image === undefined) {

                  console.warn('WebGLRenderer: Texture marked for update but image is undefined', texture);

              } else if (image.complete === false) {

                  console.warn('WebGLRenderer: Texture marked for update but image is incomplete', texture);

              } else {

                  this._uploadTexture(textureProperties, texture, slot);
                  return;

              }

          }

          this._state.activeTexture(_gl.TEXTURE0 + slot);
          this._state.bindTexture(_gl.TEXTURE_2D, textureProperties.__webglTexture);
      }

      _uploadTexture(textureProperties, texture, slot) {

          let _gl = this.gl;
          let state = this._state;
          let utils = this._utils;

          if (textureProperties.__webglInit === undefined) {

              textureProperties.__webglInit = true;

              texture.on('dispose', onTextureDispose.bind(this));

              textureProperties.__webglTexture = _gl.createTexture();

              this._info.memory.textures++;

          }

          state.activeTexture(_gl.TEXTURE0 + slot);
          state.bindTexture(_gl.TEXTURE_2D, textureProperties.__webglTexture);

          //UNPACK_FLIP_Y_WEBGL 是否将纹理上下颠倒进行映射
          //https://yq.aliyun.com/articles/62464
          _gl.pixelStorei(_gl.UNPACK_FLIP_Y_WEBGL, texture.flipY);
          //对图片纹理的每个像素的R、G、B通道，乘以A的值后，并替换原先的值
          _gl.pixelStorei(_gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, texture.premultiplyAlpha);
          //纹理的像素对齐
          _gl.pixelStorei(_gl.UNPACK_ALIGNMENT, texture.unpackAlignment);

          let image = clampToMaxSize(texture.image, this._capabilities.maxTextureSize);

          if (textureNeedsPowerOfTwo(texture) && isPowerOfTwo(image) === false) {

              image = makePowerOfTwo(image);

          }

          let isPowerOfTwoImage = isPowerOfTwo(image),
              glFormat = utils.convert(texture.format),
              glType = utils.convert(texture.type);

          setTextureParameters.call(this, _gl.TEXTURE_2D, texture, isPowerOfTwoImage);

          let mipmap, mipmaps = texture.mipmaps;



          // regular Texture (image, video, canvas)

          // use manually created mipmaps if available
          // if there are no manual mipmaps
          // set 0 level mipmap and then use GL to generate other mipmap levels

          if (mipmaps.length > 0 && isPowerOfTwoImage) {

              for (var i = 0, il = mipmaps.length; i < il; i++) {

                  mipmap = mipmaps[i];
                  state.texImage2D(_gl.TEXTURE_2D, i, glFormat, glFormat, glType, mipmap);

              }

              texture.generateMipmaps = false;
              textureProperties.__maxMipLevel = mipmaps.length - 1;

          } else {

              state.texImage2D(_gl.TEXTURE_2D, 0, glFormat, glFormat, glType, image);
              textureProperties.__maxMipLevel = 0;

          }



          if (textureNeedsGenerateMipmaps(texture, isPowerOfTwoImage)) {

              generateMipmap.call(this, _gl.TEXTURE_2D, texture, image.width, image.height);

          }

          textureProperties.__version = texture.version;

          if (texture.onUpdate) texture.onUpdate(texture);
      }
  }

  function onTextureDispose(event) {

      var texture = event.target;

      texture.off('dispose', onTextureDispose);

      deallocateTexture.call(this, texture);

      this._info.memory.textures--;
  }
  function clampToMaxSize(image, maxSize) {

      if (image.width > maxSize || image.height > maxSize) {

          if ('data' in image) {

              console.warn('WebGLRenderer: image in DataTexture is too big (' + image.width + 'x' + image.height + ').');
              return;

          }

          // Warning: Scaling through the canvas will only work with images that use
          // premultiplied alpha.

          let scale = maxSize / Math.max(image.width, image.height);

          let canvas = document.createElementNS('http://www.w3.org/1999/xhtml', 'canvas');
          canvas.width = Math.floor(image.width * scale);
          canvas.height = Math.floor(image.height * scale);

          let context = canvas.getContext('2d');
          context.drawImage(image, 0, 0, image.width, image.height, 0, 0, canvas.width, canvas.height);

          console.warn('WebGLRenderer: image is too big (' + image.width + 'x' + image.height + '). Resized to ' + canvas.width + 'x' + canvas.height, image);

          return canvas;

      }

      return image;

  }

  function textureNeedsPowerOfTwo(texture) {

      return (texture.wrapS !== ClampToEdgeWrapping || texture.wrapT !== ClampToEdgeWrapping) ||
          (texture.minFilter !== NearestFilter && texture.minFilter !== LinearFilter);

  }

  function isPowerOfTwo(image) {

      return _Math.isPowerOfTwo(image.width) && _Math.isPowerOfTwo(image.height);

  }

  let _canvas;
  function makePowerOfTwo(image) {

      if (image instanceof HTMLImageElement || image instanceof HTMLCanvasElement || image instanceof ImageBitmap) {

          if (_canvas === undefined) _canvas = document.createElementNS('http://www.w3.org/1999/xhtml', 'canvas');

          _canvas.width = _Math.floorPowerOfTwo(image.width);
          _canvas.height = _Math.floorPowerOfTwo(image.height);

          var context = _canvas.getContext('2d');
          context.drawImage(image, 0, 0, _canvas.width, _canvas.height);

          console.warn('WebGLRenderer: image is not power of two (' + image.width + 'x' + image.height + '). Resized to ' + _canvas.width + 'x' + _canvas.height, image);

          return _canvas;

      }

      return image;

  }

  function setTextureParameters(textureType, texture, isPowerOfTwoImage) {

      let _gl = this.gl,
          utils = this._utils;

      if (isPowerOfTwoImage) {

          _gl.texParameteri(textureType, _gl.TEXTURE_WRAP_S, utils.convert(texture.wrapS));
          _gl.texParameteri(textureType, _gl.TEXTURE_WRAP_T, utils.convert(texture.wrapT));

          _gl.texParameteri(textureType, _gl.TEXTURE_MAG_FILTER, utils.convert(texture.magFilter));
          _gl.texParameteri(textureType, _gl.TEXTURE_MIN_FILTER, utils.convert(texture.minFilter));

      } else {

          _gl.texParameteri(textureType, _gl.TEXTURE_WRAP_S, _gl.CLAMP_TO_EDGE);
          _gl.texParameteri(textureType, _gl.TEXTURE_WRAP_T, _gl.CLAMP_TO_EDGE);

          if (texture.wrapS !== ClampToEdgeWrapping || texture.wrapT !== ClampToEdgeWrapping) {

              console.warn('WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to ClampToEdgeWrapping.', texture);

          }

          _gl.texParameteri(textureType, _gl.TEXTURE_MAG_FILTER, filterFallback.call(this, texture.magFilter));
          _gl.texParameteri(textureType, _gl.TEXTURE_MIN_FILTER, filterFallback.call(this, texture.minFilter));

          if (texture.minFilter !== NearestFilter && texture.minFilter !== LinearFilter) {

              console.warn('WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to NearestFilter or LinearFilter.', texture);

          }

      }



  }

  // Fallback filters for non-power-of-2 textures

  function filterFallback(f) {

      let _gl = this.gl;

      if (f === NearestFilter || f === NearestMipMapNearestFilter || f === NearestMipMapLinearFilter) {

          return _gl.NEAREST;

      }

      return _gl.LINEAR;

  }

  function deallocateTexture(texture) {
      let _gl = this.gl;
      let textureProperties = this._properties.get(texture);

      if (texture.image && textureProperties.__image__webglTextureCube) {

          // cube texture

          _gl.deleteTexture(textureProperties.__image__webglTextureCube);

      } else {

          // 2D texture

          if (textureProperties.__webglInit === undefined) return;

          _gl.deleteTexture(textureProperties.__webglTexture);

      }

      // remove all webgl properties
      this._properties.remove(texture);

  }

  function textureNeedsGenerateMipmaps(texture, isPowerOfTwo) {

      return texture.generateMipmaps && isPowerOfTwo &&
          texture.minFilter !== NearestFilter && texture.minFilter !== LinearFilter;

  }

  function generateMipmap(target, texture, width, height) {

      //生成多级纹理图
      this.gl.generateMipmap(target);

      var textureProperties = this._properties.get(texture);

      // Note: Math.log( x ) * Math.LOG2E used instead of Math.log2( x ) which is not supported by IE11
      textureProperties.__maxMipLevel = Math.log(Math.max(width, height)) * Math.LOG2E;

  }

  let webglLightsCount = 0;
  let _webGLLightsVector3 = new Vector3$1();
  class WebGLLights {
      constructor() {
          this.cache = new UniformsCache();
          this.state = {
              id: webglLightsCount++,
              hash: '',
              ambient: [0, 0, 0],
              directional: [],
              spot: [],
              point: []
          };
      }

      setup(lights, shadows, camera) {
          let r = 0, g = 0, b = 0;

          let directionalLength = 0;
          let pointLength = 0;
          let spotLength = 0;

          let state = this.state;
          let cache = this.cache;

          let viewMatrix = camera.matrixWorldInverse;

          for (let i = 0, l = lights.length; i < l; i++) {

              let light = lights[i];

              let color = light.color;
              let intensity = light.intensity;
              let distance = light.distance;




              if (light.isAmbientLight) {

                  r += color.r * intensity;
                  g += color.g * intensity;
                  b += color.b * intensity;

              } else if (light.isDirectionalLight) {

                  let uniforms = cache.get(light);

                  uniforms.color.copy(light.color).multiplyScalar(light.intensity);
                  uniforms.direction.setFromMatrixPosition(light.matrixWorld);
                  _webGLLightsVector3.setFromMatrixPosition(light.target.matrixWorld);
                  uniforms.direction.sub(_webGLLightsVector3);
                  uniforms.direction.transformDirection(viewMatrix);


                  state.directional[directionalLength] = uniforms;

                  directionalLength++;

              } else if (light.isSpotLight) {

                  var uniforms = cache.get(light);

                  uniforms.position.setFromMatrixPosition(light.matrixWorld);
                  uniforms.position.applyMatrix4(viewMatrix);

                  uniforms.color.copy(color).multiplyScalar(intensity);
                  uniforms.distance = distance;

                  uniforms.direction.setFromMatrixPosition(light.matrixWorld);
                  _webGLLightsVector3.setFromMatrixPosition(light.target.matrixWorld);
                  uniforms.direction.sub(_webGLLightsVector3);
                  uniforms.direction.transformDirection(viewMatrix);

                  uniforms.coneCos = Math.cos(light.angle);
                  uniforms.penumbraCos = Math.cos(light.angle * (1 - light.penumbra));
                  uniforms.decay = (light.distance === 0) ? 0.0 : light.decay;

                  state.spot[spotLength] = uniforms;

                  spotLength++;

              } else if (light.isPointLight) {

                  var uniforms = cache.get(light);

                  uniforms.position.setFromMatrixPosition(light.matrixWorld);
                  uniforms.position.applyMatrix4(viewMatrix);

                  uniforms.color.copy(light.color).multiplyScalar(light.intensity);
                  uniforms.distance = light.distance;
                  uniforms.decay = (light.distance === 0) ? 0.0 : light.decay;

                  state.point[pointLength] = uniforms;

                  pointLength++;

              }

          }

          state.ambient[0] = r;
          state.ambient[1] = g;
          state.ambient[2] = b;

          state.directional.length = directionalLength;
          state.spot.length = spotLength;
          state.point.length = pointLength;

          state.hash = state.id + ',' + directionalLength + ',' + pointLength + ',' + spotLength;

      }
      dispose() {
          this.cache.dispose();
          this.cache = null;
          this.state = null;
      }

  }

  class UniformsCache {
      constructor() {
          this._lights = {};
      }

      get(light) {

          let lights = this._lights;

          if (lights[light.id] !== undefined) {

              return lights[light.id];
          }

          let uniforms;

          switch (light.type) {

              case 'DirectionalLight':
                  uniforms = {
                      direction: new Vector3$1(),
                      color: new Color$1()
                  };
                  break;

              case 'SpotLight':
                  uniforms = {
                      position: new Vector3$1(),
                      direction: new Vector3$1(),
                      color: new Color$1(),
                      distance: 0,
                      coneCos: 0,
                      penumbraCos: 0,
                      decay: 0
                  };
                  break;

              case 'PointLight':
                  uniforms = {
                      position: new Vector3$1(),
                      color: new Color$1(),
                      distance: 0,
                      decay: 0
                  };
                  break;

              case 'HemisphereLight':
              case 'RectAreaLight':
                  console.error('没有实现 HemisphereLight 和 RectAreaLight 灯光');
          }

          lights[light.id] = uniforms;

          return uniforms;

      }
      dispose() {
          this._lights = null;
      }

  }

  class WebGLRenderState {
      constructor() {

          this.state = {
              lights: new WebGLLights(),
              lightsArray: [],
              spritesArray: []
          };

      }
      init() {
          this.state.spritesArray.length = 0;
          this.state.lightsArray.length = 0;
      }

      pushLight(light) {

          this.state.lightsArray.push(light);

      }

      pushSprite(sprite) {

          this.state.spritesArray.push(sprite);
      }

      setupLights(camera) {

          //todo 阴影为空
          let shadowsArray = [];

          this.state.lights.setup(this.state.lightsArray, shadowsArray, camera);

      }
      dispose() {
          this.state.lights.dispose();
          this.state = null;
      }

  }


  class WebGLRenderStates {
      constructor() {
          this._renderStates = {};
      }

      get(scene, camera) {

          let hash = scene.id + ',' + camera.id;

          let renderState = this._renderStates[hash];

          if (renderState === undefined) {

              renderState = new WebGLRenderState();
              this._renderStates[hash] = renderState;

          }

          return renderState;

      }

      dispose() {

          for (let key in this._renderStates) {
              this._renderStates[key] && this._renderStates[key].dispose();
          }

          this._renderStates = {};

      }

  }

  /**
   * @class WebGL渲染对象
   * @author bujue
   */
  class WebGLRenderer extends Events {
      constructor(params) {
          super();

          params = params || {};
          //canvas context 渲染对象的上下文
          this.gl = null;

          //canvasDOM 对象
          this.domElement = null;

          //私有变量
          this._width = 0;
          this._height = 0;
          this._isContextLost = false;                //是否丢失上下文

          this._pixelRatio = 1;                        //屏幕的pixelRatio,
          this._currentViewport = new Vector4();       //当前的渲染视口大小
          this._currentRenderList = null;
          this._currentRenderState = null;

          this._currentMaterialId = -1;                //初始化materialId
          this._currentCamera = null;                  //当前的相机
          this._currClearColor = new Color$1(0x000000);

          this._capabilities = null;                          //GPU渲染能力 
          this._state = null;                                 //GPU的状态管理 



          this._sortObjects = true;   // scene graph

          this._projScreenMatrix = new Matrix4();
          this._vector3 = new Vector3$1();
          this._frustum = new Frustum();

          this._init(params);
          this._initGLContext(params);
      }

      _init(parameters) {  //创建webGL对象上下文
          let me = this;
          parameters = parameters || {};

          console.log('WebGLRenderer', REVISION);

          /*
          * `alpha`：值为true，表示为上下文创建一个Alpha通道缓冲区；默认值为true；
          * `depth`：值为true，表示可以使用16位深缓冲区；默认值为true；
          * `stencil`：值为true，表示可以使用8位模板缓冲区；默认值为false；
          * `antialias`：值为true，表示将使用默认机制执行抗锯齿操作；默认值为true。
          * `premultipliedAlpha`：值为true，表示绘图缓冲区有预乘Alpha值；默认为true;
          * `preserveDrawingBuffer`：值为true；表示在绘图完成后保留绘图缓冲区；默认值为false。
          */
          let _canvas = parameters.canvas !== undefined ? parameters.canvas : document.createElementNS('http://www.w3.org/1999/xhtml', 'canvas'),
              _context = parameters.context !== undefined ? parameters.context : null,

              _alpha = parameters.alpha !== undefined ? parameters.alpha : false,
              _depth = parameters.depth !== undefined ? parameters.depth : true,
              _stencil = parameters.stencil !== undefined ? parameters.stencil : true,
              _antialias = parameters.antialias !== undefined ? parameters.antialias : false,
              _premultipliedAlpha = parameters.premultipliedAlpha !== undefined ? parameters.premultipliedAlpha : true,
              _preserveDrawingBuffer = parameters.preserveDrawingBuffer !== undefined ? parameters.preserveDrawingBuffer : false;


          me.domElement = _canvas;
          me.gl = _context;
          me._width = _canvas.width;
          me._height = _canvas.height;
          me._premultipliedAlpha = _premultipliedAlpha;

          try {

              let contextAttributes = {
                  alpha: _alpha,
                  depth: _depth,
                  stencil: _stencil,
                  antialias: _antialias,
                  premultipliedAlpha: _premultipliedAlpha,
                  preserveDrawingBuffer: _preserveDrawingBuffer
              };

              let _gl = _context || _canvas.getContext('webgl', contextAttributes) || _canvas.getContext('experimental-webgl', contextAttributes);

              if (_gl === null) {

                  if (_canvas.getContext('webgl') !== null) {

                      throw 'Error creating WebGL context with your selected attributes.';

                  } else {

                      throw 'Error creating WebGL context.';

                  }

              }

              me.gl = _gl;

              _canvas.addEventListener('webglcontextlost', onContextLost.bind(me), false);
              _canvas.addEventListener('webglcontextrestored', onContextRestore.bind(me), false);

          } catch (error) {

              console.error('WebGLRenderer: ' + error);

          }

          /**
              * @private
              * @description 上下文丢失
              * @param {*} event 
              */
          function onContextLost(event) {

              event.preventDefault();
              console.log('WebGLRenderer: Context Lost.');
              this._isContextLost = true;
              this.fire({ type: 'contextlost' });
          }
          /**
          * @private
          * @description 上下文恢复
          */
          function onContextRestore() {

              console.log('WebGLRenderer: Context Restored.');
              this._isContextLost = true;
              this._initGLContext(parametersÎ);
              this.fire({ type: 'contextrestore' });
          }

      }
      _initGLContext(parameters) {
          let me = this;
          let _gl = this.gl;
          let _width = this._width;
          let _height = this._height;
          let _viewport = new Vector4(0, 0, _width, _height);

          /**  
          *  
          *  WebGLUtils              gl常量管理
          *  WebGLCapabilities       gl能力数据
          *  WebGLState              gl状态管理
          *  WebGLInfo               保存渲染的基本数据
          *  WebGLProperties         可以有效的将上层Material传过来的对象与底层渲染的对象做关联但有不改变原对象,利用WeapMap实现
          *  WebGLAttributes         根据上层的顶点属性Geometry数据,利用WeapMap绑定buffer相关数据,提供get update remove 方法
          *  WebGLGeometries         将上层的顶点属性分解后保存到WebGLAttribute对象中 update更新 WebGLAttribute的update 
          *  WebGLObjects            通过更新帧来控制更新WebGLGemetries update
          *  WebGLMorphtargets       顶点动画,图表动画可以参考使用
          *  WebGLPrograms           programs的管理 
          *  WebGLTextures           纹理的预处理与参数设置与上传
          *  WebGLRenderLists        通过hash 构建一个Map WebGLRenderList 是真正的渲染列表 opaque transparent 
          *  WebGLRenderStates       灯光阴影的管理   WebGLLights.setup 将上次的灯光参数转换为shader格式的参数
          *  WebGLBackground         背景的绘制与更新, scene.background 可以是颜色 纹理 cube纹理
          *  WebGLBufferRenderer     drawArrays的提取及利用扩展 同一几何体多次绘制的实现
          *  WebGLIndexedBufferRenderer  drawElements 的提取,同上
          */

          this._extensions = new WebGLExtensions(_gl);
          this._extensions.get('ANGLE_instanced_arrays');

          this._utils = new WebGLUtils(_gl);
          this._info = new WebGLInfo(_gl);
          this._properties = new WebGLProperties();
          this._state = new WebGLState(_gl, this._extensions);
          this._renderStates = new WebGLRenderStates();
          this._capabilities = new WebGLCapabilities(_gl, parameters);
          this._textures = new WebGLTextures(_gl, null, this._state, this._properties, this._capabilities, this._utils, this._info);
          this._attributes = new WebGLAttributes(_gl);
          this._geometries = new WebGLGeometries(_gl, this._attributes, this._info);
          this._objects = new WebGLObjects(this._geometries, this._info);
          this._programCache = new WebGLPrograms(_gl, this._extensions, this._capabilities);
          this._renderLists = new WebGLRenderLists();
          this._bufferRenderer = new WebGLBufferRenderer(_gl, this._extensions, this._info);
          this._indexedBufferRenderer = new WebGLIndexedBufferRenderer(_gl, this._extensions, this._info);
          this._state.viewport(this._currentViewport.copy(_viewport).multiplyScalar(this._pixelRatio));


          //console.dir(this._capabilities);
          this._info.programs = this._programCache.programs;

          me.setSize(_width, _height, true);

      }

      getContext() {
          return this.gl;
      }

      getPixelRatio() {
          return this._pixelRatio;
      }

      getCurrentViewport() {
          return this._currentViewport;
      }

      getClearColor() {
          return this._currClearColor;
      }



      //设置设备像素比,默认是 1    
      setPixelRatio(value) {
          let _width = this._width;
          let _height = this._height;

          this._pixelRatio = value;
          this.setSize(_width, _height, false);
      }

      //设置可视区域大小
      setSize(width, height, updateStyle) {
          let me = this;
          let _pixelRatio = this._pixelRatio;
          let _canvas = me.domElement;


          _canvas.width = width * _pixelRatio;
          _canvas.height = height * _pixelRatio;

          //注意:updateStyle 只有完全等于false才不更新style
          if (updateStyle !== false) {

              _canvas.style.width = width + 'px';
              _canvas.style.height = height + 'px';

          }

          me.setViewport(0, 0, width, height);

      }

      //设置视口大小
      setViewport(x, y, width, height) {
          let gl = this.gl;
          let viewport = new Vector4(x, y, width, height);

          if (this._currentViewport.equals(viewport) === false) {

              this._currentViewport.copy(viewport).multiplyScalar(this._pixelRatio);

              this._state.viewport(this._currentViewport);
          }

      }
      //设置清除色
      setClearColor() {
          let _gl = this.gl;
          let [r, g, b, a] = arguments;
          let _color = this._currClearColor.set(r, g, b, a);
          this._state.buffers.color.setClear(_color.r, _color.g, _color.b, _color.a, this._premultipliedAlpha);
      }

      getClearAlpha() {
          return this._currClearColor.a;
      }

      setClearAlpha(alpha) {
          let _gl = this.gl;
          this._currClearColor.a = alpha;
          let _color = this._currClearColor;
          this._state.buffers.color.setClear(_color.r, _color.g, _color.b, _color.a, this._premultipliedAlpha);
      };

      //清除缓冲
      clear(color, depth, stencil) {
          let _gl = this.gl;
          let bits = 0;

          if (color === undefined || color) bits |= _gl.COLOR_BUFFER_BIT;
          if (depth === undefined || depth) bits |= _gl.DEPTH_BUFFER_BIT;
          if (stencil === undefined || stencil) bits |= _gl.STENCIL_BUFFER_BIT;

          _gl.clear(bits);

      }
      //清除颜色缓冲
      clearColor() {
          this.clear(true, false, false);
      }
      //清除深度缓冲
      clearDepth() {
          this.clear(false, true, false);
      }
      //清除模版缓冲
      clearStencil() {
          this.clear(false, false, true);
      }

      render(scene, camera) {

          if (!(camera && camera.isCamera)) {

              console.error('WebGLRenderer.render: camera is not an instance of Camera.');
              return;

          }
          _currentGeometryProgram = '';
          this._currentMaterialId = - 1;
          this._currentCamera = null;

          if (this._isContextLost) return;

          // 更新场景
          if (scene.autoUpdate === true) scene.updateMatrixWorld();

          //更新相机矩阵
          if (camera.parent === null) camera.updateMatrixWorld();

          this._projScreenMatrix.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse);
          this._frustum.setFromMatrix(this._projScreenMatrix);

          //初始化渲染队列

          this._currentRenderState = this._renderStates.get(scene, camera);
          this._currentRenderState.init();

          this._currentRenderList = this._renderLists.get(scene, camera);

          this._currentRenderList.init();

          //将渲染的几何对象和材质存放到渲染队列中
          projectObject.call(this, scene, camera, this._sortObjects);

          if (this._sortObjects === true) {
              this._currentRenderList.sort();
          }

          this._currentRenderState.setupLights(camera);

          if (this._info.autoReset) this._info.reset();

          scene.background === null ? this.setClearColor(this._currClearColor) : this.setClearColor(scene.background);
          this.clearColor(true);

          let opaqueObjects = this._currentRenderList.opaque;
          let transparentObjects = this._currentRenderList.transparent;

          // opaque pass (front-to-back order)

          if (opaqueObjects.length) renderObjects.call(this, opaqueObjects, scene, camera);

          // transparent pass (back-to-front order)

          if (transparentObjects.length) renderObjects.call(this, transparentObjects, scene, camera);





          this._state.buffers.depth.setTest(true);
          this._state.buffers.depth.setMask(true);
          this._state.buffers.color.setMask(true);

          this._state.setPolygonOffset(false);


          this._currentRenderList = null;
          this._currentRenderState = null;


      }
      renderBufferDirect(camera, fog, geometry, material, object, group) {

          let me = this;
          let _gl = this.gl;


          let frontFaceCW = (object.isMesh && object.matrixWorld.determinant() < 0);

          //通过Materail设置 CULL_FACE  Blend clearColor ClearDepth
          this._state.setMaterial(material, frontFaceCW);

          let program = setProgram.call(me, camera, fog, material, object);

          let updateBuffers = isUpdateBuffers(geometry, program, material);


          let index = geometry.index;
          let position = geometry.attributes.position;
          let rangeFactor = 1;

          if (material.wireframe === true) {

              index = this._geometries.getWireframeAttribute(geometry);
              rangeFactor = 2;

          }

          let attribute;
          let renderer = this._bufferRenderer;

          if (index !== null) {

              attribute = this._attributes.get(index);

              renderer = this._indexedBufferRenderer;
              renderer.setIndex(attribute);

          }

          if (updateBuffers) {

              setupVertexAttributes.call(this, material, program, geometry);

              if (index !== null) {

                  _gl.bindBuffer(_gl.ELEMENT_ARRAY_BUFFER, attribute.buffer);

              }

          }



          let dataCount = Infinity;

          if (index !== null) {

              dataCount = index.count;

          } else if (position !== undefined) {

              dataCount = position.count;

          }

          let rangeStart = geometry.drawRange.start * rangeFactor;
          let rangeCount = geometry.drawRange.count * rangeFactor;

          let groupStart = group !== null ? group.start * rangeFactor : 0;
          let groupCount = group !== null ? group.count * rangeFactor : Infinity;

          let drawStart = Math.max(rangeStart, groupStart);
          let drawEnd = Math.min(dataCount, rangeStart + rangeCount, groupStart + groupCount) - 1;

          let drawCount = Math.max(0, drawEnd - drawStart + 1);

          if (drawCount === 0) return;

          if (object.isMesh) {

              if (material.wireframe === true) {

                  this._state.setLineWidth(material.wireframeLinewidth * this._pixelRatio);
                  renderer.setMode(_gl.LINES);

              } else {

                  switch (object.drawMode) {

                      case TrianglesDrawMode:
                          renderer.setMode(_gl.TRIANGLES);
                          break;

                      case TriangleStripDrawMode:
                          renderer.setMode(_gl.TRIANGLE_STRIP);
                          break;

                      case TriangleFanDrawMode:
                          renderer.setMode(_gl.TRIANGLE_FAN);
                          break;

                  }
              }
          } else if (object.isLine) {
              let lineWidth = material.linewidth;

              if (lineWidth === undefined) lineWidth = 1; // Not using Line*Material

              this._state.setLineWidth(lineWidth * this._pixelRatio);


              switch (object.drawMode) {

                  case LinesMode:
                      renderer.setMode(_gl.LINES);
                      break;

                  case LineLoopMode:
                      renderer.setMode(_gl.LINE_LOOP);
                      break;

                  case LineStripMode:
                      renderer.setMode(_gl.LINE_STRIP);
                      break;

              }

          } else if (object.isPoints) {

              renderer.setMode(_gl.POINTS);

          } else if (object.isSprite) {

              renderer.setMode(_gl.TRIANGLES);

          }

          if (geometry && geometry.isInstancedBufferGeometry) {

              if (geometry.maxInstancedCount > 0) {

                  renderer.renderInstances(geometry, drawStart, drawCount);

              }

          } else {

              renderer.render(drawStart, drawCount);

          }

      }

      allocTextureUnit() {
          var textureUnit = _usedTextureUnits;

          if (textureUnit >= this._capabilities.maxTextures) {

              console.warn('WebGLRenderer: Trying to use ' + textureUnit + ' texture units while this GPU supports only ' + capabilities.maxTextures);

          }

          _usedTextureUnits += 1;

          return textureUnit;
      }

      setTexture2D(texture, slot) {
          //todo Use in WebGLUniforms
          this._textures.setTexture2D(texture, slot);
      }

      setTextureCube() {
          //todo Use in WebGLUniforms
      }

      dispose() {

          this._canvas.removeEventListener('webglcontextlost', onContextLost, false);
          this._canvas.removeEventListener('webglcontextrestored', onContextRestore, false);

          this._renderLists.dispose();
          this._renderStates.dispose();
          this._properties.dispose();
          this._objects.dispose();

          //vr.dispose();

          //stopAnimation();

      };
  }

  //判断是否更新了Buffer
  let _currentGeometryProgram = '';
  function isUpdateBuffers(geometry, program, material) {

      let geometryProgram = geometry.id + '_' + program.id + '_' + (material.wireframe === true);

      let updateBuffers = false;

      if (geometryProgram !== _currentGeometryProgram) {


          updateBuffers = true;
          _currentGeometryProgram = geometryProgram;

      }

      return updateBuffers;
  }

  //将渲染的几何对象和材质存放到渲染队列中
  function projectObject(object, camera, sortObjects) {

      if (object.visible === false) return;



      if (object.isLight) {

          this._currentRenderState.pushLight(object);

      } else if (object.isSprite) {

          if (!object.frustumCulled || this._frustum.intersectsSprite(object)) {

              if (sortObjects) {

                  this._vector3.setFromMatrixPosition(object.matrixWorld)
                      .applyMatrix4(this._projScreenMatrix);

              }

              var geometry = this._objects.update(object);
              var material = object.material;

              this._currentRenderList.push(object, geometry, material, this._vector3.z, null);

          }

      } else if (object.isMesh || object.isLine || object.isPoints) {

          if (!object.frustumCulled || this._frustum.intersectsObject(object)) {

              if (sortObjects) {

                  this._vector3.setFromMatrixPosition(object.matrixWorld)
                      .applyMatrix4(this._projScreenMatrix);

              }
              //创建好了attribute buffer
              let geometry = this._objects.update(object);
              let material = object.material;

              //如果是数组,表示geometry根据groups的分组进行分别绘制
              if (Array.isArray(material)) {

                  let groups = geometry.groups;

                  for (let i = 0, l = groups.length; i < l; i++) {

                      let group = groups[i];
                      let groupMaterial = material[group.materialIndex];

                      if (groupMaterial && groupMaterial.visible) {

                          this._currentRenderList.push(object, geometry, groupMaterial, this._vector3.z, group);

                      }

                  }

              } else if (material.visible) {

                  this._currentRenderList.push(object, geometry, material, this._vector3.z, null);

              }

          }



      }

      let children = object.children;

      for (let i = 0, l = children.length; i < l; i++) {

          projectObject.call(this, children[i], camera, sortObjects);

      }

  }

  function renderObjects(renderList, scene, camera) {
      for (let i = 0, l = renderList.length; i < l; i++) {

          let renderItem = renderList[i];

          let object = renderItem.object;
          let geometry = renderItem.geometry;
          let material = renderItem.material;
          let group = renderItem.group;

          renderObject.call(this, object, scene, camera, geometry, material, group);

      }
  }

  function renderObject(object, scene, camera, geometry, material, group) {

      object.onBeforeRender(this, scene, camera, geometry, material, group);
      this._currentRenderState = this._renderStates.get(scene, camera);

      object.modelViewMatrix.multiplyMatrices(camera.matrixWorldInverse, object.matrixWorld);
      object.normalMatrix.getNormalMatrix(object.modelViewMatrix);

      this.renderBufferDirect(camera, scene.fog, geometry, material, object, group);

      object.onAfterRender(this, scene, camera, geometry, material, group);
      // this._currentRenderState = renderStates.get( scene,  camera );
  }


  let _usedTextureUnits = 0;                  //当前纹理单元
  function setProgram(camera, fog, material, object) {
      _usedTextureUnits = 0;

      let materialProperties = this._properties.get(material);
      let lights = this._currentRenderState.state.lights;


      if (material.needsUpdate === false) {

          if (materialProperties.program === undefined) {

              material.needsUpdate = true;

          } else if (material.lights && materialProperties.lightsHash !== lights.state.hash) {

              material.needsUpdate = true;

          }

      }


      if (material.needsUpdate) {

          initMaterial.call(this, material, fog, object);
          material.needsUpdate = false;

      }

      let refreshProgram = false;
      let refreshMaterial = false;
      let refreshLights = false;

      let program = materialProperties.program,
          p_uniforms = program.getUniforms(),
          m_uniforms = materialProperties.shader.uniforms;

      if (this._state.useProgram(program.program)) {

          refreshProgram = true;
          refreshMaterial = true;
          refreshLights = true;

      }

      if (material.id !== this._currentMaterialId) {

          this._currentMaterialId = material.id;

          refreshMaterial = true;

      }

      if (refreshProgram || camera !== this._currentCamera) {

          p_uniforms.setValue('projectionMatrix', camera.projectionMatrix);

          if (camera !== this._currentCamera) {

              this._currentCamera = camera;
              refreshMaterial = true;
              refreshLights = true;

          }
      }


      if (refreshMaterial) {


          if (material.lights) {

              // the current material requires lighting info

              // note: all lighting uniforms are always set correctly
              // they simply reference the renderer's state for their
              // values
              //
              // use the current material's .needsUpdate flags to set
              // the GL state when required

              markUniformsLightsNeedsUpdate(m_uniforms, refreshLights);

          }

          if (material.isMeshBasicMaterial
              || material.isLineBasicMaterial
              || material.isMeshLambertMaterial
              || material.isMeshPhongMaterial
              || material.isPointsMaterial
              || material.isLineMeshMaterial
              || material.isSpriteMaterial) {
              if (material.color) {
                  m_uniforms.diffuse.value = material.color;
              }

              if (material.map) {
                  m_uniforms.map.value = material.map;
              }

              m_uniforms.opacity.value = material.opacity;

              if (material.emissive) {

                  m_uniforms.emissive.value.copy(material.emissive).multiplyScalar(material.emissiveIntensity);

              }

              if (material.map) {

                  if (material.map.matrixAutoUpdate === true) {
                      //更新纹理映射矩阵
                      material.map.updateMatrix();

                  }

                  m_uniforms.uvTransform.value.copy(material.map.matrix);
              }

          }

          function updateLineMaterial() {
              m_uniforms.dashSize.value = material.dashSize;
              m_uniforms.totalSize.value = material.dashSize + material.gapSize;
              m_uniforms.scale.value = material.scale;
          }

          if (material.isLineBasicMaterial) {

              if (material.isLineDashedMaterial) {
                  updateLineMaterial();
              }

          } else if (material.isMeshPhongMaterial) {

              m_uniforms.specular.value = material.specular;
              m_uniforms.shininess.value = Math.max(material.shininess, 1e-4); // to prevent pow( 0.0, 0.0 )

          }

          else if (material.isPointsMaterial) {

              m_uniforms.size.value = material.size * this._pixelRatio;
              m_uniforms.scale.value = this._height * 0.5;

          } else if (material.isSpriteMaterial) {

              m_uniforms.rotation.value = material.rotation;


          } else if (material.isLineMeshMaterial) {

              updateLineMaterial();
              m_uniforms.linewidth.value = material.linewidth;
              m_uniforms.resolution.value.copy(material.resolution);

          }



          WebGLUniforms.upload(this.gl, materialProperties.uniformsList, m_uniforms, this);

      }
      if (material.isShaderMaterial && material.uniformsNeedUpdate === true) {

          WebGLUniforms.upload(this.gl, materialProperties.uniformsList, m_uniforms, this);
          material.uniformsNeedUpdate = false;

      }

      if (material.isSpriteMaterial) {

          p_uniforms.setValue('center', object.center);

      }


      // common matrices

      p_uniforms.setValue('modelViewMatrix', object.modelViewMatrix);
      p_uniforms.setValue('normalMatrix', object.normalMatrix);
      p_uniforms.setValue('modelMatrix', object.matrixWorld);

      return program;

  }

  function initMaterial(material, fog, object) {

      let materialProperties = this._properties.get(material);
      let lights = this._currentRenderState.state.lights;
      let parameters = this._programCache.getParameters(material, lights.state);

      let code = this._programCache.getProgramCode(material, parameters);

      let program = materialProperties.program;
      let programChange = true;

      if (program === undefined) {

          // new material
          material.on('dispose', onMaterialDispose.bind(this));

      } else if (program.code !== code) {

          // changed glsl or parameters
          releaseMaterialProgramReference.call(this, material);

      } else if (materialProperties.lightsHash !== lights.state.hash) {

          properties.update(material, 'lightsHash', lights.state.hash);
          programChange = false;

      } else if (parameters.shaderID !== undefined) {

          // same glsl and uniform list
          return;

      } else {

          // only rebuild uniform list
          programChange = false;

      }

      if (programChange) {

          if (parameters.shaderID) {

              var shader = ShaderLib[parameters.shaderID];

              materialProperties.shader = {
                  name: material.type,
                  uniforms: UniformsUtils$1.clone(shader.uniforms),
                  vertexShader: shader.vertexShader,
                  fragmentShader: shader.fragmentShader
              };

          } else {
              //自定义shader
              materialProperties.shader = {
                  name: material.type,
                  uniforms: material.uniforms,
                  vertexShader: material.vertexShader,
                  fragmentShader: material.fragmentShader
              };

          }


          material.onBeforeCompile(materialProperties.shader, this);

          //WebGLProgram 对象
          program = this._programCache.acquireProgram(material, materialProperties.shader, parameters, code);

          materialProperties.program = program;
          material.program = program;

      }

      let programAttributes = program.getAttributes();


      let uniforms = materialProperties.shader.uniforms;


      // store the light setup it was created for

      materialProperties.lightsHash = lights.state.hash;

      if (material.lights) {

          // wire up the material to this renderer's lighting state

          uniforms.ambientLightColor.value = lights.state.ambient;
          uniforms.directionalLights.value = lights.state.directional;
          uniforms.spotLights.value = lights.state.spot;
          uniforms.pointLights.value = lights.state.point;

      }

      let progUniforms = materialProperties.program.getUniforms();
      let uniformsList = WebGLUniforms.seqWithValue(progUniforms.seq, uniforms);

      materialProperties.uniformsList = uniformsList;

  }

  function onMaterialDispose(event) {
      let me = this;
      let material = event.target;

      material.off('dispose', onMaterialDispose.bind(me));

      deallocateMaterial.call(this, material);
  }

  // Buffer deallocation

  function deallocateMaterial(material) {

      releaseMaterialProgramReference.call(this, material);

      this._properties.remove(material);

  }

  function releaseMaterialProgramReference(material) {
      var programInfo = this._properties.get(material).program;

      material.program = undefined;

      if (programInfo !== undefined) {

          this._programCache.releaseProgram(programInfo);

      }
  }

  function setupVertexAttributes(material, program, geometry) {

      if (geometry && geometry.isInstancedBufferGeometry) {

          if (this._extensions.get('ANGLE_instanced_arrays') === null) {

              console.error('WebGLRenderer.setupVertexAttributes: using InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.');
              return;

          }

      }


      this._state.initAttributes();
      let _gl = this.gl;
      let geometryAttributes = geometry.attributes;

      let programAttributes = program.getAttributes();
      let materialDefaultAttributeValues = material.defaultAttributeValues;

      for (let name in programAttributes) {

          let programAttribute = programAttributes[name];

          if (programAttribute >= 0) {

              let geometryAttribute = geometryAttributes[name];

              if (geometryAttribute !== undefined) {

                  let normalized = geometryAttribute.normalized;
                  let size = geometryAttribute.itemSize;

                  let attribute = this._attributes.get(geometryAttribute);

                  // TODO Attribute may not be available on context restore

                  if (attribute === undefined) continue;

                  let buffer = attribute.buffer;
                  let type = attribute.type;
                  let bytesPerElement = attribute.bytesPerElement;

                  if (geometryAttribute.isInterleavedBufferAttribute) {

                      var data = geometryAttribute.data;
                      var stride = data.stride;
                      var offset = geometryAttribute.offset;

                      if (data && data.isInstancedInterleavedBuffer) {

                          this._state.enableAttributeAndDivisor(programAttribute, data.meshPerAttribute);

                          if (geometry.maxInstancedCount === undefined) {

                              geometry.maxInstancedCount = data.meshPerAttribute * data.count;

                          }

                      } else {

                          this._state.enableAttribute(programAttribute);

                      }

                      _gl.bindBuffer(_gl.ARRAY_BUFFER, buffer);
                      _gl.vertexAttribPointer(programAttribute, size, type, normalized, stride * bytesPerElement, offset * bytesPerElement);

                  } else {

                      if (geometryAttribute.isInstancedBufferAttribute) {

                          this._state.enableAttributeAndDivisor(programAttribute, geometryAttribute.meshPerAttribute);

                          if (geometry.maxInstancedCount === undefined) {

                              geometry.maxInstancedCount = geometryAttribute.meshPerAttribute * geometryAttribute.count;

                          }

                      } else {

                          this._state.enableAttribute(programAttribute);
                      }


                      _gl.bindBuffer(_gl.ARRAY_BUFFER, buffer);
                      _gl.vertexAttribPointer(programAttribute, size, type, normalized, 0, 0);

                  }

              } else if (materialDefaultAttributeValues !== undefined) {
                  var value = materialDefaultAttributeValues[name];

                  if (value !== undefined) {

                      switch (value.length) {

                          case 2:
                              _gl.vertexAttrib2fv(programAttribute, value);
                              break;

                          case 3:
                              _gl.vertexAttrib3fv(programAttribute, value);
                              break;

                          case 4:
                              _gl.vertexAttrib4fv(programAttribute, value);
                              break;

                          default:
                              _gl.vertexAttrib1fv(programAttribute, value);

                      }

                  }
              }

          }

      }

      this._state.disableUnusedAttributes();

  }

  // If uniforms are marked as clean, they don't need to be loaded to the GPU.

  function markUniformsLightsNeedsUpdate(uniforms, value) {

      uniforms.ambientLightColor.needsUpdate = value;

      uniforms.directionalLights.needsUpdate = value;
      uniforms.pointLights.needsUpdate = value;
      uniforms.spotLights.needsUpdate = value;

  }

  var v1$3 = new Vector3$1();
  var r;

  var EPS = 0.000001;
  class Quaternion {
      constructor(x, y, z, w) {
          this._x = x || 0;
          this._y = y || 0;
          this._z = z || 0;
          this._w = (w !== undefined) ? w : 1;
      }



      get x() {
          return this._x;
      }
      set x(value) {
          this._x = value;
          this.onChangeCallback();
      }

      get y() {
          return this._y;
      }

      set y(value) {
          this._y = value;
          this.onChangeCallback();
      }

      get z() {
          return this._z;
      }

      set z(value) {
          this._z = value;
          this.onChangeCallback();

      }

      get w() {
          return this._w;
      }

      set w(value) {
          this._w = value;
          this.onChangeCallback();
      }



      static slerp(qa, qb, qm, t) {

          return qm.copy(qa).slerp(qb, t);

      }

      static slerpFlat(dst, dstOffset, src0, srcOffset0, src1, srcOffset1, t) {

          // fuzz-free, array-based Quaternion SLERP operation

          var x0 = src0[srcOffset0 + 0],
              y0 = src0[srcOffset0 + 1],
              z0 = src0[srcOffset0 + 2],
              w0 = src0[srcOffset0 + 3],

              x1 = src1[srcOffset1 + 0],
              y1 = src1[srcOffset1 + 1],
              z1 = src1[srcOffset1 + 2],
              w1 = src1[srcOffset1 + 3];

          if (w0 !== w1 || x0 !== x1 || y0 !== y1 || z0 !== z1) {

              var s = 1 - t,

                  cos = x0 * x1 + y0 * y1 + z0 * z1 + w0 * w1,

                  dir = (cos >= 0 ? 1 : - 1),
                  sqrSin = 1 - cos * cos;

              // Skip the Slerp for tiny steps to avoid numeric problems:
              if (sqrSin > Number.EPSILON) {

                  var sin = Math.sqrt(sqrSin),
                      len = Math.atan2(sin, cos * dir);

                  s = Math.sin(s * len) / sin;
                  t = Math.sin(t * len) / sin;

              }

              var tDir = t * dir;

              x0 = x0 * s + x1 * tDir;
              y0 = y0 * s + y1 * tDir;
              z0 = z0 * s + z1 * tDir;
              w0 = w0 * s + w1 * tDir;

              // Normalize in case we just did a lerp:
              if (s === 1 - t) {

                  var f = 1 / Math.sqrt(x0 * x0 + y0 * y0 + z0 * z0 + w0 * w0);

                  x0 *= f;
                  y0 *= f;
                  z0 *= f;
                  w0 *= f;

              }

          }

          dst[dstOffset] = x0;
          dst[dstOffset + 1] = y0;
          dst[dstOffset + 2] = z0;
          dst[dstOffset + 3] = w0;

      }

      set(x, y, z, w) {

          this._x = x;
          this._y = y;
          this._z = z;
          this._w = w;

          this.onChangeCallback();

          return this;

      }

      clone() {

          return new this.constructor(this._x, this._y, this._z, this._w);

      }

      copy(quaternion) {

          this._x = quaternion.x;
          this._y = quaternion.y;
          this._z = quaternion.z;
          this._w = quaternion.w;

          this.onChangeCallback();

          return this;

      }

      setFromEuler(euler, update) {

          if (!(euler && euler.isEuler)) {

              throw new Error('Quaternion: .setFromEuler() now expects an Euler rotation rather than a Vector3 and order.');

          }

          var x = euler._x, y = euler._y, z = euler._z, order = euler.order;

          // http://www.mathworks.com/matlabcentral/fileexchange/
          // 	20696-function-to-convert-between-dcm-euler-angles-quaternions-and-euler-vectors/
          //	content/SpinCalc.m

          var cos = Math.cos;
          var sin = Math.sin;

          var c1 = cos(x / 2);
          var c2 = cos(y / 2);
          var c3 = cos(z / 2);

          var s1 = sin(x / 2);
          var s2 = sin(y / 2);
          var s3 = sin(z / 2);

          if (order === 'XYZ') {

              this._x = s1 * c2 * c3 + c1 * s2 * s3;
              this._y = c1 * s2 * c3 - s1 * c2 * s3;
              this._z = c1 * c2 * s3 + s1 * s2 * c3;
              this._w = c1 * c2 * c3 - s1 * s2 * s3;

          } else if (order === 'YXZ') {

              this._x = s1 * c2 * c3 + c1 * s2 * s3;
              this._y = c1 * s2 * c3 - s1 * c2 * s3;
              this._z = c1 * c2 * s3 - s1 * s2 * c3;
              this._w = c1 * c2 * c3 + s1 * s2 * s3;

          } else if (order === 'ZXY') {

              this._x = s1 * c2 * c3 - c1 * s2 * s3;
              this._y = c1 * s2 * c3 + s1 * c2 * s3;
              this._z = c1 * c2 * s3 + s1 * s2 * c3;
              this._w = c1 * c2 * c3 - s1 * s2 * s3;

          } else if (order === 'ZYX') {

              this._x = s1 * c2 * c3 - c1 * s2 * s3;
              this._y = c1 * s2 * c3 + s1 * c2 * s3;
              this._z = c1 * c2 * s3 - s1 * s2 * c3;
              this._w = c1 * c2 * c3 + s1 * s2 * s3;

          } else if (order === 'YZX') {

              this._x = s1 * c2 * c3 + c1 * s2 * s3;
              this._y = c1 * s2 * c3 + s1 * c2 * s3;
              this._z = c1 * c2 * s3 - s1 * s2 * c3;
              this._w = c1 * c2 * c3 - s1 * s2 * s3;

          } else if (order === 'XZY') {

              this._x = s1 * c2 * c3 - c1 * s2 * s3;
              this._y = c1 * s2 * c3 - s1 * c2 * s3;
              this._z = c1 * c2 * s3 + s1 * s2 * c3;
              this._w = c1 * c2 * c3 + s1 * s2 * s3;

          }

          if (update !== false) this.onChangeCallback();

          return this;

      }

      setFromAxisAngle(axis, angle) {

          // http://www.euclideanspace.com/maths/geometry/rotations/conversions/angleToQuaternion/index.htm

          // assumes axis is normalized

          var halfAngle = angle / 2, s = Math.sin(halfAngle);

          this._x = axis.x * s;
          this._y = axis.y * s;
          this._z = axis.z * s;
          this._w = Math.cos(halfAngle);

          this.onChangeCallback();

          return this;

      }

      setFromRotationMatrix(m) {

          // http://www.euclideanspace.com/maths/geometry/rotations/conversions/matrixToQuaternion/index.htm

          // assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)

          var te = m.elements,

              m11 = te[0], m12 = te[4], m13 = te[8],
              m21 = te[1], m22 = te[5], m23 = te[9],
              m31 = te[2], m32 = te[6], m33 = te[10],

              trace = m11 + m22 + m33,
              s;

          if (trace > 0) {

              s = 0.5 / Math.sqrt(trace + 1.0);

              this._w = 0.25 / s;
              this._x = (m32 - m23) * s;
              this._y = (m13 - m31) * s;
              this._z = (m21 - m12) * s;

          } else if (m11 > m22 && m11 > m33) {

              s = 2.0 * Math.sqrt(1.0 + m11 - m22 - m33);

              this._w = (m32 - m23) / s;
              this._x = 0.25 * s;
              this._y = (m12 + m21) / s;
              this._z = (m13 + m31) / s;

          } else if (m22 > m33) {

              s = 2.0 * Math.sqrt(1.0 + m22 - m11 - m33);

              this._w = (m13 - m31) / s;
              this._x = (m12 + m21) / s;
              this._y = 0.25 * s;
              this._z = (m23 + m32) / s;

          } else {

              s = 2.0 * Math.sqrt(1.0 + m33 - m11 - m22);

              this._w = (m21 - m12) / s;
              this._x = (m13 + m31) / s;
              this._y = (m23 + m32) / s;
              this._z = 0.25 * s;

          }

          this.onChangeCallback();

          return this;

      }



      // assumes direction vectors vFrom and vTo are normalized


      setFromUnitVectors(vFrom, vTo) {

          if (v1$3 === undefined) v1$3 = new Vector3$1();

          r = vFrom.dot(vTo) + 1;

          if (r < EPS) {

              r = 0;

              if (Math.abs(vFrom.x) > Math.abs(vFrom.z)) {

                  v1$3.set(- vFrom.y, vFrom.x, 0);

              } else {

                  v1$3.set(0, - vFrom.z, vFrom.y);

              }

          } else {

              v1$3.crossVectors(vFrom, vTo);

          }

          this._x = v1$3.x;
          this._y = v1$3.y;
          this._z = v1$3.z;
          this._w = r;

          return this.normalize();

      }

      inverse() {

          return this.conjugate().normalize();

      }

      conjugate() {

          this._x *= - 1;
          this._y *= - 1;
          this._z *= - 1;

          this.onChangeCallback();

          return this;

      }

      dot(v) {

          return this._x * v._x + this._y * v._y + this._z * v._z + this._w * v._w;

      }

      lengthSq() {

          return this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w;

      }

      length() {

          return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w);

      }

      normalize() {

          var l = this.length();

          if (l === 0) {

              this._x = 0;
              this._y = 0;
              this._z = 0;
              this._w = 1;

          } else {

              l = 1 / l;

              this._x = this._x * l;
              this._y = this._y * l;
              this._z = this._z * l;
              this._w = this._w * l;

          }

          this.onChangeCallback();

          return this;

      }

      multiply(q, p) {

          if (p !== undefined) {

              console.warn('Quaternion: .multiply() now only accepts one argument. Use .multiplyQuaternions( a, b ) instead.');
              return this.multiplyQuaternions(q, p);

          }

          return this.multiplyQuaternions(this, q);

      }

      premultiply(q) {

          return this.multiplyQuaternions(q, this);

      }

      multiplyQuaternions(a, b) {

          // from http://www.euclideanspace.com/maths/algebra/realNormedAlgebra/quaternions/code/index.htm

          var qax = a._x, qay = a._y, qaz = a._z, qaw = a._w;
          var qbx = b._x, qby = b._y, qbz = b._z, qbw = b._w;

          this._x = qax * qbw + qaw * qbx + qay * qbz - qaz * qby;
          this._y = qay * qbw + qaw * qby + qaz * qbx - qax * qbz;
          this._z = qaz * qbw + qaw * qbz + qax * qby - qay * qbx;
          this._w = qaw * qbw - qax * qbx - qay * qby - qaz * qbz;

          this.onChangeCallback();

          return this;

      }

      slerp(qb, t) {

          if (t === 0) return this;
          if (t === 1) return this.copy(qb);

          var x = this._x, y = this._y, z = this._z, w = this._w;

          // http://www.euclideanspace.com/maths/algebra/realNormedAlgebra/quaternions/slerp/

          var cosHalfTheta = w * qb._w + x * qb._x + y * qb._y + z * qb._z;

          if (cosHalfTheta < 0) {

              this._w = - qb._w;
              this._x = - qb._x;
              this._y = - qb._y;
              this._z = - qb._z;

              cosHalfTheta = - cosHalfTheta;

          } else {

              this.copy(qb);

          }

          if (cosHalfTheta >= 1.0) {

              this._w = w;
              this._x = x;
              this._y = y;
              this._z = z;

              return this;

          }

          var sinHalfTheta = Math.sqrt(1.0 - cosHalfTheta * cosHalfTheta);

          if (Math.abs(sinHalfTheta) < 0.001) {

              this._w = 0.5 * (w + this._w);
              this._x = 0.5 * (x + this._x);
              this._y = 0.5 * (y + this._y);
              this._z = 0.5 * (z + this._z);

              return this;

          }

          var halfTheta = Math.atan2(sinHalfTheta, cosHalfTheta);
          var ratioA = Math.sin((1 - t) * halfTheta) / sinHalfTheta,
              ratioB = Math.sin(t * halfTheta) / sinHalfTheta;

          this._w = (w * ratioA + this._w * ratioB);
          this._x = (x * ratioA + this._x * ratioB);
          this._y = (y * ratioA + this._y * ratioB);
          this._z = (z * ratioA + this._z * ratioB);

          this.onChangeCallback();

          return this;

      }

      equals(quaternion) {

          return (quaternion._x === this._x) && (quaternion._y === this._y) && (quaternion._z === this._z) && (quaternion._w === this._w);

      }

      fromArray(array, offset) {

          if (offset === undefined) offset = 0;

          this._x = array[offset];
          this._y = array[offset + 1];
          this._z = array[offset + 2];
          this._w = array[offset + 3];

          this.onChangeCallback();

          return this;

      }

      toArray(array, offset) {

          if (array === undefined) array = [];
          if (offset === undefined) offset = 0;

          array[offset] = this._x;
          array[offset + 1] = this._y;
          array[offset + 2] = this._z;
          array[offset + 3] = this._w;

          return array;

      }

      onChange(callback) {

          this.onChangeCallback = callback;

          return this;

      }

      onChangeCallback() { }

  }

  var matrix = new Matrix4();
  var q = new Quaternion();
  class Euler {
      constructor(x, y, z, order) {
          this._x = x || 0;
          this._y = y || 0;
          this._z = z || 0;
          this._order = order || Euler.DefaultOrder;

          this.isEuler = true;
      }

      get x() {

          return this._x;

      }

      set x(value) {

          this._x = value;
          this.onChangeCallback();

      }



      get y() {

          return this._y;

      }

      set y(value) {

          this._y = value;
          this.onChangeCallback();

      }


      get z() {

          return this._z;

      }

      set z(value) {

          this._z = value;
          this.onChangeCallback();

      }



      get order() {

          return this._order;

      }

      set order(value) {

          this._order = value;
          this.onChangeCallback();

      }

      set(x, y, z, order) {

          this._x = x;
          this._y = y;
          this._z = z;
          this._order = order || this._order;

          this.onChangeCallback();

          return this;

      }

      clone() {

          return new this.constructor(this._x, this._y, this._z, this._order);

      }

      copy(euler) {

          this._x = euler._x;
          this._y = euler._y;
          this._z = euler._z;
          this._order = euler._order;

          this.onChangeCallback();

          return this;

      }

      setFromRotationMatrix(m, order, update) {

          var clamp = _Math.clamp;

          // assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)

          var te = m.elements;
          var m11 = te[0], m12 = te[4], m13 = te[8];
          var m21 = te[1], m22 = te[5], m23 = te[9];
          var m31 = te[2], m32 = te[6], m33 = te[10];

          order = order || this._order;

          if (order === 'XYZ') {

              this._y = Math.asin(clamp(m13, - 1, 1));

              if (Math.abs(m13) < 0.99999) {

                  this._x = Math.atan2(- m23, m33);
                  this._z = Math.atan2(- m12, m11);

              } else {

                  this._x = Math.atan2(m32, m22);
                  this._z = 0;

              }

          } else if (order === 'YXZ') {

              this._x = Math.asin(- clamp(m23, - 1, 1));

              if (Math.abs(m23) < 0.99999) {

                  this._y = Math.atan2(m13, m33);
                  this._z = Math.atan2(m21, m22);

              } else {

                  this._y = Math.atan2(- m31, m11);
                  this._z = 0;

              }

          } else if (order === 'ZXY') {

              this._x = Math.asin(clamp(m32, - 1, 1));

              if (Math.abs(m32) < 0.99999) {

                  this._y = Math.atan2(- m31, m33);
                  this._z = Math.atan2(- m12, m22);

              } else {

                  this._y = 0;
                  this._z = Math.atan2(m21, m11);

              }

          } else if (order === 'ZYX') {

              this._y = Math.asin(- clamp(m31, - 1, 1));

              if (Math.abs(m31) < 0.99999) {

                  this._x = Math.atan2(m32, m33);
                  this._z = Math.atan2(m21, m11);

              } else {

                  this._x = 0;
                  this._z = Math.atan2(- m12, m22);

              }

          } else if (order === 'YZX') {

              this._z = Math.asin(clamp(m21, - 1, 1));

              if (Math.abs(m21) < 0.99999) {

                  this._x = Math.atan2(- m23, m22);
                  this._y = Math.atan2(- m31, m11);

              } else {

                  this._x = 0;
                  this._y = Math.atan2(m13, m33);

              }

          } else if (order === 'XZY') {

              this._z = Math.asin(- clamp(m12, - 1, 1));

              if (Math.abs(m12) < 0.99999) {

                  this._x = Math.atan2(m32, m22);
                  this._y = Math.atan2(m13, m11);

              } else {

                  this._x = Math.atan2(- m23, m33);
                  this._y = 0;

              }

          } else {

              console.warn('Euler: .setFromRotationMatrix() given unsupported order: ' + order);

          }

          this._order = order;

          if (update !== false) this.onChangeCallback();

          return this;

      }

      setFromQuaternion(q, order, update) {

          matrix.makeRotationFromQuaternion(q);

          return this.setFromRotationMatrix(matrix, order, update);

      }

      setFromVector3(v, order) {

          return this.set(v.x, v.y, v.z, order || this._order);

      }


      // WARNING: this discards revolution information -bhouston



      reorder(newOrder) {

          q.setFromEuler(this);

          return this.setFromQuaternion(q, newOrder);

      }

      equals(euler) {

          return (euler._x === this._x) && (euler._y === this._y) && (euler._z === this._z) && (euler._order === this._order);

      }

      fromArray(array) {

          this._x = array[0];
          this._y = array[1];
          this._z = array[2];
          if (array[3] !== undefined) this._order = array[3];

          this.onChangeCallback();

          return this;

      }

      toArray(array, offset) {

          if (array === undefined) array = [];
          if (offset === undefined) offset = 0;

          array[offset] = this._x;
          array[offset + 1] = this._y;
          array[offset + 2] = this._z;
          array[offset + 3] = this._order;

          return array;

      }

      toVector3(optionalResult) {

          if (optionalResult) {

              return optionalResult.set(this._x, this._y, this._z);

          } else {

              return new Vector3$1(this._x, this._y, this._z);

          }

      }

      onChange(callback) {

          this.onChangeCallback = callback;

          return this;

      }

      onChangeCallback() { }


  }

  Euler.RotationOrders = ['XYZ', 'YZX', 'ZXY', 'XZY', 'YXZ', 'ZYX'];

  Euler.DefaultOrder = 'XYZ';

  /**
   * @class Object3D 三维对象的基类
   * @description 实现三维对象的的一些基本操作
   * @author bujue
   */
  let object3DId = 0;
  class Object3D extends Events {

      constructor() {
          super();
          Object.defineProperty(this, 'id', { value: object3DId++ });

          this.parent = null;
          this.children = [];


          this.up = Object3D.DefaultUp.clone();

          let position = new Vector3$1();
          let rotation = new Euler();
          let quaternion = new Quaternion();
          let scale = new Vector3$1(1, 1, 1);

          function onRotationChange() {

              quaternion.setFromEuler(rotation, false);

          }

          function onQuaternionChange() {

              rotation.setFromQuaternion(quaternion, undefined, false);

          }

          rotation.onChange(onRotationChange);
          quaternion.onChange(onQuaternionChange);

          Object.defineProperties(this, {
              position: {
                  enumerable: true,
                  value: position
              },
              rotation: {
                  enumerable: true,
                  value: rotation
              },
              quaternion: {
                  enumerable: true,
                  value: quaternion
              },
              scale: {
                  enumerable: true,
                  value: scale
              },
              modelViewMatrix: {
                  value: new Matrix4()
              },
              normalMatrix: {
                  value: new Matrix3()
              }
          });


          this.matrix = new Matrix4();
          this.matrixWorld = new Matrix4();

          this.matrixAutoUpdate = Object3D.DefaultMatrixAutoUpdate;
          this.matrixWorldNeedsUpdate = false;

          this.visible = true;

          this.castShadow = false;
          this.receiveShadow = false;

          this.frustumCulled = true;
          this.renderOrder = 0;

          this.userData = {};

      }

      get isObject3D() {
          return true;
      }

      onBeforeRender(renderer, scene, camera, geometry, material, group) {
          //继承实现 渲染前调用
      }
      onAfterRender(renderer, scene, camera, geometry, material, group) {
          //继承实现 渲染后调用
      }

      applyMatrix(matrix) {

          this.matrix.multiplyMatrices(matrix, this.matrix);

          this.matrix.decompose(this.position, this.quaternion, this.scale);

      }

      lookAt(x, y, z) {

          lookAt.call(this, x, y, z);
      }


      add(object) {
          if (arguments.length > 1) {

              for (let i = 0; i < arguments.length; i++) {

                  this.add(arguments[i]);

              }

              return this;

          }

          if (object === this) {

              console.error("Object3D.add: object can't be added as a child of itself.", object);
              return this;

          }

          if ((object && object.isObject3D)) {

              if (object.parent !== null) {

                  object.parent.remove(object);

              }

              object.parent = this;

              object.fire({ type: 'added' });

              this.children.push(object);

          } else {

              console.error("Object3D.add: object not an instance of Object3D.", object);

          }

          return this;
      }

      remove(object) {

          if (arguments.length > 1) {

              for (let i = 0; i < arguments.length; i++) {

                  this.remove(arguments[i]);

              }

              return this;

          }

          let index = this.children.indexOf(object);

          if (index !== - 1) {

              object.parent = null;

              object.fire({ type: 'removed' });

              this.children.splice(index, 1);

          }

          return this;
      }

      traverse(callback) {

          callback(this);

          let children = this.children;

          for (let i = 0, l = children.length; i < l; i++) {

              children[i].traverse(callback);

          }

      }


      updateMatrixWorld(force) {

          if (this.matrixAutoUpdate) this.updateMatrix();

          if (this.matrixWorldNeedsUpdate || force) {

              if (this.parent === null) {

                  this.matrixWorld.copy(this.matrix);

              } else {

                  this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix);

              }

              this.matrixWorldNeedsUpdate = false;

              force = true;

          }

          // update children

          let children = this.children;

          for (let i = 0, l = children.length; i < l; i++) {

              children[i].updateMatrixWorld(force);

          }

      }

      applyQuaternion(q) {

          this.quaternion.premultiply(q);

          return this;

      }

      setRotationFromAxisAngle(axis, angle) {

          // assumes axis is normalized

          this.quaternion.setFromAxisAngle(axis, angle);

      }

      setRotationFromEuler(euler) {

          this.quaternion.setFromEuler(euler, true);

      }

      setRotationFromMatrix(m) {

          // assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)

          this.quaternion.setFromRotationMatrix(m);

      }

      setRotationFromQuaternion(q) {

          // assumes q is normalized

          this.quaternion.copy(q);

      }

      updateMatrix() {

          this.matrix.compose(this.position, this.quaternion, this.scale);

          this.matrixWorldNeedsUpdate = true;

      }

      rotateX(angle) {

          let v1 = new Vector3$1(1, 0, 0);

          this.rotateOnAxis(v1, angle);

          v1 = null;

          return this;


      }

      rotateY(angle) {

          let v1 = new Vector3$1(0, 1, 0);

          this.rotateOnAxis(v1, angle);

          v1 = null;

          return this;



      }

      rotateZ(angle) {

          let v1 = new Vector3$1(0, 0, 1);

          this.rotateOnAxis(v1, angle);

          v1 = null;

          return this;

      }

      rotateOnAxis(axis, angle) {

          // rotate object on axis in object space
          // axis is assumed to be normalized

          let q1 = new Quaternion();

          q1.setFromAxisAngle(axis, angle);

          this.quaternion.multiply(q1);

          q1 = null;

          return this;
      }

      rotateOnWorldAxis(axis, angle) {

          // rotate object on axis in world space
          // axis is assumed to be normalized
          // method assumes no rotated parent

          let q1 = new Quaternion();

          q1.setFromAxisAngle(axis, angle);

          this.quaternion.premultiply(q1);

          return this;


      }

      translateOnAxis(axis, distance) {

          // translate object by distance along axis in object space
          // axis is assumed to be normalized

          let v1 = new Vector3$1();

          v1.copy(axis).applyQuaternion(this.quaternion);

          this.position.add(v1.multiplyScalar(distance));

          v1 = null;

          return this;

      }

      translateX(distance) {

          let v1 = new Vector3$1(1, 0, 0);

          this.translateOnAxis(v1, distance);

          v1 = null;

          return this;


      }

      translateY(distance) {

          let v1 = new Vector3$1(0, 1, 0);

          this.translateOnAxis(v1, distance);

          v1 = null;

          return this;

      }

      translateZ(distance) {

          let v1 = new Vector3$1(0, 0, 1);
          this.translateOnAxis(v1, distance);

          v1 = null;

          return this;


      }

      localToWorld(vector) {
          return vector.applyMatrix4(this.matrixWorld);
      }

      worldToLocal(vector) {

          let m1 = new Matrix4();
          return vector.applyMatrix4(m1.getInverse(this.matrixWorld));
      }
      getWorldPosition(target) {

          if (target === undefined) {

              console.warn('Object3D: .getWorldPosition() target is now required');
              target = new Vector3$1();

          }

          this.updateMatrixWorld(true);

          return target.setFromMatrixPosition(this.matrixWorld);

      }

      getWorldQuaternion(target) {

          return getWorldQuaternion.call(this, target)

      }

      getWorldScale(target) {

          return getWorldScale.call(this, target)

      }
      getWorldDirection(target) {
          return getWorldDirection.call(this, target);

      }

      raycast() { }

  }

  Object3D.DefaultUp = new Vector3$1(0, 1, 0);
  Object3D.DefaultMatrixAutoUpdate = true;


  let lookAt = (function () {

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

  })();


  let getWorldQuaternion = (function () {

      var position = new Vector3$1();
      var scale = new Vector3$1();

      return function getWorldQuaternion(target) {

          if (target === undefined) {

              console.warn('Object3D: .getWorldQuaternion() target is now required');
              target = new Quaternion();

          }

          this.updateMatrixWorld(true);

          this.matrixWorld.decompose(position, target, scale);

          return target;

      };

  })();


  let getWorldScale = (function () {

      var position = new Vector3$1();
      var quaternion = new Quaternion();

      return function getWorldScale(target) {

          if (target === undefined) {

              console.warn('Object3D: .getWorldScale() target is now required');
              target = new Vector3$1();

          }

          this.updateMatrixWorld(true);

          this.matrixWorld.decompose(position, quaternion, target);

          return target;

      };

  })();

  let getWorldDirection = (function () {

      var quaternion = new Quaternion();

      return function getWorldDirection(target) {

          if (target === undefined) {

              console.warn('Object3D: .getWorldDirection() target is now required');
              target = new Vector3$1();

          }

          this.getWorldQuaternion(quaternion);

          return target.set(0, 0, 1).applyQuaternion(quaternion);

      };

  })();

  /**
   * @class 场景对象
   * @author bujue
   */


  class Scene extends Object3D {
      constructor() {
          super();
          this.background=null;
          this.isScene = true;
          this.autoUpdate = true; // checked by the renderer
      }

  }

  /**
   * @class  分组
   * @description 主要是为了将部分对象做批量变换,同Sence,名称上更容易让读者理解
   * @author bujue
   */

  class Group extends Object3D {
      constructor() {
          super();
          this.type = 'Group';
      }
      
      get isGroup(){
          return true;
      }
  }

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
          this.origin = (origin !== undefined) ? origin : new Vector3$1();
          this.direction = (direction !== undefined) ? direction : new Vector3$1();
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
          var a01 = - this.direction.dot(segDir);
          var b0 = diff.dot(this.direction);
          var b1 = - diff.dot(segDir);
          var c = diff.lengthSq();
          var det = Math.abs(1 - a01 * a01);
          var s0, s1, sqrDist, extDet;

          if (det > 0) {

              // The ray and segment are not parallel.

              s0 = a01 * b1 - b0;
              s1 = a01 * b0 - b1;
              extDet = segExtent * det;

              if (s0 >= 0) {

                  if (s1 >= - extDet) {

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
                          s0 = Math.max(0, - (a01 * s1 + b0));
                          sqrDist = - s0 * s0 + s1 * (s1 + 2 * b1) + c;

                      }

                  } else {

                      // region 5

                      s1 = - segExtent;
                      s0 = Math.max(0, - (a01 * s1 + b0));
                      sqrDist = - s0 * s0 + s1 * (s1 + 2 * b1) + c;

                  }

              } else {

                  if (s1 <= - extDet) {

                      // region 4

                      s0 = Math.max(0, - (- a01 * segExtent + b0));
                      s1 = (s0 > 0) ? - segExtent : Math.min(Math.max(- segExtent, - b1), segExtent);
                      sqrDist = - s0 * s0 + s1 * (s1 + 2 * b1) + c;

                  } else if (s1 <= extDet) {

                      // region 3

                      s0 = 0;
                      s1 = Math.min(Math.max(- segExtent, - b1), segExtent);
                      sqrDist = s1 * (s1 + 2 * b1) + c;

                  } else {

                      // region 2

                      s0 = Math.max(0, - (a01 * segExtent + b0));
                      s1 = (s0 > 0) ? segExtent : Math.min(Math.max(- segExtent, - b1), segExtent);
                      sqrDist = - s0 * s0 + s1 * (s1 + 2 * b1) + c;

                  }

              }

          } else {

              // Ray and segment are parallel.

              s1 = (a01 > 0) ? - segExtent : segExtent;
              s0 = Math.max(0, - (a01 * s1 + b0));
              sqrDist = - s0 * s0 + s1 * (s1 + 2 * b1) + c;

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

          var t = - (this.origin.dot(plane.normal) + plane.constant) / denominator;

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

          if ((tmin > tymax) || (tymin > tmax)) return null;

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

          if ((tmin > tzmax) || (tzmin > tmax)) return null;

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

              sign = - 1;
              DdN = - DdN;

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
          var QdN = - sign * diff.dot(normal);

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
          this.start = (start !== undefined) ? start : new Vector3$1();
          this.end = (end !== undefined) ? end : new Vector3$1();
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
          this.a = (a !== undefined) ? a : new Vector3$1();
          this.b = (b !== undefined) ? b : new Vector3$1();
          this.c = (c !== undefined) ? c : new Vector3$1();
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

          var denom = (dot00 * dot11 - dot01 * dot01);

          var result = optionalTarget || new Vector3$1();

          // collinear or singular triangle
          if (denom === 0) {

              // arbitrary location outside of triangle?
              // not sure if this is the best idea, maybe should be returning undefined
              return result.set(- 2, - 1, - 1);

          }

          var invDenom = 1 / denom;
          var u = (dot11 * dot02 - dot01 * dot12) * invDenom;
          var v = (dot00 * dot12 - dot01 * dot02) * invDenom;

          // barycentric coordinates must always sum to 1
          return result.set(1 - u - v, v, u);

      }

      static containsPoint(point, a, b, c) {

          var result = Triangle.barycoordFromPoint(point, a, b, c, v4$1);

          return (result.x >= 0) && (result.y >= 0) && ((result.x + result.y) <= 1);

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
          return getBarycoord.call(this, point, a, b, c, target)
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

  let getBarycoord = (function () {

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

          var denom = (dot00 * dot11 - dot01 * dot01);

          if (target === undefined) {

              console.warn('Triangle: .getBarycoord() target is now required');
              target = new Vector3$1();

          }

          // collinear or singular triangle
          if (denom === 0) {

              // arbitrary location outside of triangle?
              // not sure if this is the best idea, maybe should be returning undefined
              return target.set(- 2, - 1, - 1);

          }

          var invDenom = 1 / denom;
          var u = (dot11 * dot02 - dot01 * dot12) * invDenom;
          var v = (dot00 * dot12 - dot01 * dot02) * invDenom;

          // barycentric coordinates must always sum to 1
          return target.set(1 - u - v, v, u);

      };

  }());


  let getNormal = (function () {

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

  }());

  class Face3 {
      constructor(a, b, c, normal, color, materialIndex) {
          this.a = a;
          this.b = b;
          this.c = c;

          this.normal = (normal && normal.isVector3) ? normal : new Vector3$1();
          this.vertexNormals = Array.isArray(normal) ? normal : [];

          this.color = (color && color.isColor) ? color : new Color$1();
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

  /**
   * @class  材质基类
   * @author bujue
   */
  let materialId = 0;

  class Material extends Events {
      constructor() {
          super();

          this.type = 'Material';
          Object.defineProperty(this, 'id', { value: materialId++ });

          this.opacity = 1;
          this.transparent = false;

          this.lights = true;
          this.depthFunc = LessEqualDepth;
          this.depthTest = true;
          this.depthWrite = true;

          this.blending = NormalBlending;
          this.side = FrontSide;
          this.vertexColors = NoColors;

          this.visible = true;
          this.needsUpdate = true;

          this.colorWrite = true;
          this.precision = null;

          this.polygonOffset = false;
          this.polygonOffsetFactor = 0;
          this.polygonOffsetUnits = 0;

          this.blendSrc = SrcAlphaFactor;
          this.blendDst = OneMinusSrcAlphaFactor;
          this.blendEquation = AddEquation;
          this.blendSrcAlpha = null;
          this.blendDstAlpha = null;
          this.blendEquationAlpha = null;

          this.premultipliedAlpha = false;

          this.userData = {};

          this.onBeforeCompile = function () { };
      }



      setValues(values) {

          if (values === undefined) return;

          for (var key in values) {

              var newValue = values[key];

              if (newValue === undefined) {

                  console.warn("Material: '" + key + "' parameter is undefined.");
                  continue;

              }

              // for backward compatability if shading is set in the constructor
              if (key === 'shading') {

                  console.warn(this.type + ': .shading has been removed. Use the boolean .flatShading instead.');
                  this.flatShading = (newValue === FlatShading) ? true : false;
                  continue;

              }

              var currentValue = this[key];

              if (currentValue === undefined) {

                  console.warn(this.type + ": '" + key + "' is not a property of this material.");
                  continue;

              }

              if (currentValue && currentValue.isColor) {

                  currentValue.set(newValue);

              } else if ((currentValue && currentValue.isVector3) && (newValue && newValue.isVector3)) {

                  currentValue.copy(newValue);

              } else if (key === 'overdraw') {

                  // ensure overdraw is backwards-compatible with legacy boolean type
                  this[key] = Number(newValue);

              } else {

                  this[key] = newValue;

              }

          }

      }

      clone() {

          return new this.constructor().copy(this);

      }

      copy(source) {

          this.name = source.name;

          this.lights = source.lights;

          this.blending = source.blending;
          this.side = source.side;
          this.flatShading = source.flatShading;
          this.vertexColors = source.vertexColors;

          this.opacity = source.opacity;
          this.transparent = source.transparent;

          this.blendSrc = source.blendSrc;
          this.blendDst = source.blendDst;
          this.blendEquation = source.blendEquation;
          this.blendSrcAlpha = source.blendSrcAlpha;
          this.blendDstAlpha = source.blendDstAlpha;
          this.blendEquationAlpha = source.blendEquationAlpha;

          this.depthFunc = source.depthFunc;
          this.depthTest = source.depthTest;
          this.depthWrite = source.depthWrite;

          this.colorWrite = source.colorWrite;

          this.precision = source.precision;

          this.polygonOffset = source.polygonOffset;
          this.polygonOffsetFactor = source.polygonOffsetFactor;
          this.polygonOffsetUnits = source.polygonOffsetUnits;


          this.alphaTest = source.alphaTest;
          this.premultipliedAlpha = source.premultipliedAlpha;

          this.visible = source.visible;

          return this;

      }
      get isMaterial() {
          return true;
      }

      dispose() {

          this.fire({ type: 'dispose' });

      }
  }

  class MeshBasicMaterial$$1 extends Material {
      constructor(parameters) {
          super();
          this.color = new Color$1(0xffffff); // emissive
          this.map = null;

          this.type = 'MeshBasicMaterial';
          this.wireframe = false;
          this.wireframeLinewidth = 1;

          //不接受灯光
          this.lights = false;

          this.setValues(parameters);
      }

      get isMeshBasicMaterial() {
          return true;
      }

      copy(source) {
          super.copy(source);

          this.color.copy(source.color);
          this.map = source.map;
          this.wireframe = source.wireframe;

          return this;
      }
  }

  /**
   * @class Mesh 渲染网格对象
   * @description 渲染的网格对象,包括geometry material
   * @author bujue
   */

  class Mesh extends Object3D {
      constructor(geometry, material) {
          super();

          this.geometry = geometry;
          this.material = material;

          this.drawMode = TrianglesDrawMode;

      }

      get isMesh(){
          return true;
      }

      setDrawMode(value) {

          this.drawMode = value;

      }

      raycast(raycaster, intersects) {
          raycast.call(this, raycaster, intersects);
      }


  }

  let raycast = (function () {

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

  }());

  class LineBasicMaterial extends Material {
      constructor(parameters) {
          super();
          this.type = 'LineBasicMaterial';
          this.color = new Color$1(0xffffff);
          this.linewidth = 1;

          //todo 暂不需要
          this.lights = false;


          this.setValues(parameters);
      }
      
      get isLineBasicMaterial() {
          return true;
      }

      copy(source) {
          super.copy(source);
          this.color.copy(source.color);
          this.linewidth = source.linewidth;

          return this;

      }
  }

  /**
   * @class  线条
   * @description 线条对象
   * @author bujue
   */

  class Line extends Object3D {
      constructor(geometry, material) {
          super();
          this.type = 'Line';

          this.geometry = geometry !== undefined ? geometry : new BufferGeometry();
          this.material = material !== undefined ? material : new LineBasicMaterial({ color: Math.random() * 0xffffff });
          this.drawMode = LinesMode;

          if (this.material.isLineDashedMaterial) {
              this.computeLineDistances();
          }

      }

      get isLine(){
          return true;
      }

      setDrawMode(value) {
          this.drawMode = value;
      }

      computeLineDistances() {
          computeLineDistances.call(this);
      }

      raycast(raycaster, intersects) {
          raycast$1.call(this, raycaster, intersects);
      }

  }

  let computeLineDistances = (function () {

      var start = new Vector3$1();
      var end = new Vector3$1();

      return function computeLineDistances() {

          var geometry = this.geometry;

          if (geometry.isBufferGeometry) {

              // we assume non-indexed geometry

              if (geometry.index === null) {

                  var positionAttribute = geometry.attributes.position;
                  var lineDistances = [];

                  for (var i = 0, l = positionAttribute.count; i < l; i += 2) {

                      start.fromBufferAttribute(positionAttribute, i);
                      end.fromBufferAttribute(positionAttribute, i + 1);

                      lineDistances[i] = (i === 0) ? 0 : lineDistances[i - 1];
                      lineDistances[i + 1] = lineDistances[i] + start.distanceTo(end);

                  }

                  geometry.addAttribute('lineDistance', new Float32BufferAttribute(lineDistances, 1));

              } 

          } else if (geometry.isGeometry) {

              var vertices = geometry.vertices;
              var lineDistances = geometry.lineDistances;

              for (var i = 0, l = vertices.length; i < l; i += 2) {

                  start.copy(vertices[i]);
                  end.copy(vertices[i + 1]);

                  lineDistances[i] = (i === 0) ? 0 : lineDistances[i - 1];
                  lineDistances[i + 1] = lineDistances[i] + start.distanceTo(end);

              }


          }

          return this;

      };

  })();


  let raycast$1 = (function () {

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
          var step =  1;

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

  }());

  class InterleavedBufferAttribute {
      constructor(interleavedBuffer, itemSize, offset, normalized) {

          this.data = interleavedBuffer;
          this.itemSize = itemSize;
          this.offset = offset;

          this.normalized = normalized === true;

          this.isInterleavedBufferAttribute = true;

      }
      get count() {
          return this.data.count;
      }

      get array() {
          return this.data.array;
      }

      setX(index, x) {

          this.data.array[index * this.data.stride + this.offset] = x;

          return this;

      }

      setY(index, y) {

          this.data.array[index * this.data.stride + this.offset + 1] = y;

          return this;

      }

      setZ(index, z) {

          this.data.array[index * this.data.stride + this.offset + 2] = z;

          return this;

      }

      setW(index, w) {

          this.data.array[index * this.data.stride + this.offset + 3] = w;

          return this;

      }

      getX(index) {

          return this.data.array[index * this.data.stride + this.offset];

      }

      getY(index) {

          return this.data.array[index * this.data.stride + this.offset + 1];

      }

      getZ(index) {

          return this.data.array[index * this.data.stride + this.offset + 2];

      }

      getW(index) {

          return this.data.array[index * this.data.stride + this.offset + 3];

      }

      setXY(index, x, y) {

          this.setX(index, x);
          this.setY(index, y);

          return this;

      }

      setXYZ(index, x, y, z) {

          this.setX(index, x);
          this.setY(index, y);
          this.setZ(index, z);

          return this;

      }

      setXYZW(index, x, y, z, w) {

          this.setX(index, x);
          this.setY(index, y);
          this.setZ(index, z);
          this.setW(index, w);

          return this;

      }

  }

  class InterleavedBuffer {
      constructor(array, stride) {

          this.array = array;
          this.stride = stride;
          this.count = array !== undefined ? array.length / stride : 0;

          this.dynamic = false;
          this.updateRange = { offset: 0, count: - 1 };

          this.version = 0;

          this.isInterleavedBuffer = true;

      }
      set needsUpdate(value) {
          if (value === true) this.version++;
      }

      onUploadCallback() { }

      setArray(array) {

          if (Array.isArray(array)) {

              throw new TypeError('BufferAttribute: array should be a Typed Array.');

          }

          this.count = array !== undefined ? array.length / this.stride : 0;
          this.array = array;

          return this;

      }

      setDynamic(value) {

          this.dynamic = value;

          return this;

      }

      copy(source) {

          this.array = new source.array.constructor(source.array);
          this.count = source.count;
          this.stride = source.stride;
          this.dynamic = source.dynamic;

          return this;

      }

      copyAt(index1, attribute, index2) {

          index1 *= this.stride;
          index2 *= attribute.stride;

          for (var i = 0, l = this.stride; i < l; i++) {

              this.array[index1 + i] = attribute.array[index2 + i];

          }

          return this;

      }

      set(value, offset) {

          if (offset === undefined) offset = 0;

          this.array.set(value, offset);

          return this;

      }

      clone() {

          return new this.constructor().copy(this);

      }

      onUpload(callback) {

          this.onUploadCallback = callback;

          return this;

      }


  }

  class InstancedInterleavedBuffer extends InterleavedBuffer {
      constructor(array, stride, meshPerAttribute) {

          super(array, stride);

          this.meshPerAttribute = meshPerAttribute || 1;
          this.isInstancedInterleavedBuffer = true;

      }

      copy(source) {

          super.copy(source);

          this.meshPerAttribute = source.meshPerAttribute;

          return this;

      }
  }

  class Line2 extends Mesh {
      constructor(geometry, material) {

          super(geometry, material);

          this.geometry = geometry !== undefined ? geometry : new THREE.LineGeometry();
          this.material = material !== undefined ? material : new THREE.LineMaterial({ color: Math.random() * 0xffffff });
      }
      
      get isLine2() {
          return true;
      }

      computeLineDistances() {
          computeLineDistances$1.call(this);
      }

  }

  let computeLineDistances$1 = (function () { // for backwards-compatability, but could be a method of LineSegmentsGeometry...

      var start = new Vector3$1();
      var end = new Vector3$1();

      return function computeLineDistances() {

          var geometry = this.geometry;

          var instanceStart = geometry.attributes.instanceStart;
          var instanceEnd = geometry.attributes.instanceEnd;
          var lineDistances = new Float32Array(2 * instanceStart.data.count);

          for (var i = 0, j = 0, l = instanceStart.data.count; i < l; i++ , j += 2) {

              start.fromBufferAttribute(instanceStart, i);
              end.fromBufferAttribute(instanceEnd, i);

              lineDistances[j] = (j === 0) ? 0 : lineDistances[j - 1];
              lineDistances[j + 1] = lineDistances[j] + start.distanceTo(end);

          }

          var instanceDistanceBuffer = new InstancedInterleavedBuffer(lineDistances, 2, 1); // d0, d1

          geometry.addAttribute('instanceDistanceStart', new InterleavedBufferAttribute(instanceDistanceBuffer, 1, 0)); // d0
          geometry.addAttribute('instanceDistanceEnd', new InterleavedBufferAttribute(instanceDistanceBuffer, 1, 1)); // d1

          return this;

      };

  }());

  let raycast$2 = (function () {

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

  }());

  class SpriteMaterial$$1 extends Material {
      constructor(parameters) {
          super();
          this.type = 'SpriteMaterial';

          this.color = new Color$1(0xffffff);
          this.map = null;

          this.rotation = 0;

          this.sizeAttenuation = true;

          this.lights = false;
          this.transparent = true;

          this.setValues(parameters);

      }

      get isSpriteMaterial() {
          return true
      }

      copy(source) {
          super.copy(source);

          this.color.copy(source.color);
          this.map = source.map;

          this.rotation = source.rotation;

          this.sizeAttenuation = source.sizeAttenuation;

          return this;
      }

  }

  var geometry;

  class Sprite extends Object3D {

      constructor(material) {
          super();
          this.type = 'Sprite';

          if (geometry === undefined) {

              geometry = new BufferGeometry();

              var float32Array = new Float32Array([
                  - 0.5, - 0.5, 0, 0, 0,
                  0.5, - 0.5, 0, 1, 0,
                  0.5, 0.5, 0, 1, 1,
                  - 0.5, 0.5, 0, 0, 1
              ]);

              var interleavedBuffer = new InterleavedBuffer(float32Array, 5);

              geometry.setIndex([0, 1, 2, 0, 2, 3]);
              geometry.addAttribute('position', new InterleavedBufferAttribute(interleavedBuffer, 3, 0, false));
              geometry.addAttribute('uv', new InterleavedBufferAttribute(interleavedBuffer, 2, 3, false));

          }

          this.geometry = geometry;

          this.material = (material !== undefined) ? material : new SpriteMaterial$$1();

          this.center = new Vector2(0.5, 0.5);
      }

      get isSprite() {
          return true;
      }

      raycast(raycaster, intersects) {
          raycast$3.call(this, raycaster, intersects);
      }
      clone() {

          return new this.constructor(this.material).copy(this);

      }

      copy(source) {

          Object3D.prototype.copy.call(this, source);

          if (source.center !== undefined) this.center.copy(source.center);

          return this;

      }

  }

  let raycast$3 = (function () {

      var intersectPoint = new Vector3$1();
      var worldScale = new Vector3$1();
      var mvPosition = new Vector3$1();

      var alignedPosition = new Vector2();
      var rotatedPosition = new Vector2();
      var viewWorldMatrix = new Matrix4();

      var vA = new Vector3$1();
      var vB = new Vector3$1();
      var vC = new Vector3$1();

      var uvA = new Vector2();
      var uvB = new Vector2();
      var uvC = new Vector2();

      function transformVertex(vertexPosition, mvPosition, center, scale, sin, cos) {

          // compute position in camera space
          alignedPosition.subVectors(vertexPosition, center).addScalar(0.5).multiply(scale);

          // to check if rotation is not zero
          if (sin !== undefined) {

              rotatedPosition.x = (cos * alignedPosition.x) - (sin * alignedPosition.y);
              rotatedPosition.y = (sin * alignedPosition.x) + (cos * alignedPosition.y);

          } else {

              rotatedPosition.copy(alignedPosition);

          }


          vertexPosition.copy(mvPosition);
          vertexPosition.x += rotatedPosition.x;
          vertexPosition.y += rotatedPosition.y;

          // transform to world space
          vertexPosition.applyMatrix4(viewWorldMatrix);

      }

      return function raycast(raycaster, intersects) {

          worldScale.setFromMatrixScale(this.matrixWorld);
          viewWorldMatrix.getInverse(this.modelViewMatrix).premultiply(this.matrixWorld);
          mvPosition.setFromMatrixPosition(this.modelViewMatrix);

          var rotation = this.material.rotation;
          var sin, cos;
          if (rotation !== 0) {

              cos = Math.cos(rotation);
              sin = Math.sin(rotation);

          }

          var center = this.center;

          transformVertex(vA.set(- 0.5, - 0.5, 0), mvPosition, center, worldScale, sin, cos);
          transformVertex(vB.set(0.5, - 0.5, 0), mvPosition, center, worldScale, sin, cos);
          transformVertex(vC.set(0.5, 0.5, 0), mvPosition, center, worldScale, sin, cos);

          uvA.set(0, 0);
          uvB.set(1, 0);
          uvC.set(1, 1);

          // check first triangle
          var intersect = raycaster.ray.intersectTriangle(vA, vB, vC, false, intersectPoint);

          if (intersect === null) {

              // check second triangle
              transformVertex(vB.set(- 0.5, 0.5, 0), mvPosition, center, worldScale, sin, cos);
              uvB.set(0, 1);

              intersect = raycaster.ray.intersectTriangle(vA, vC, vB, false, intersectPoint);
              if (intersect === null) {

                  return;

              }

          }

          var distance = raycaster.ray.origin.distanceTo(intersectPoint);

          if (distance < raycaster.near || distance > raycaster.far) return;

          intersects.push({

              distance: distance,
              point: intersectPoint.clone(),
              uv: Triangle.getUV(intersectPoint, vA, vB, vC, uvA, uvB, uvC, new Vector2()),
              face: null,
              object: this

          });

      };

  });

  class TextTexture extends Texture {
      constructor(
          { autoRedraw = true,
              text = '',
              textAlign = 'center',
              textLineHeight = 1.15,
              fontFamily = 'sans-serif',
              fontSize = 16,
              fontWeight = 'normal',
              fontVariant = 'normal',
              fontStyle = 'normal',
              fillStyle = 'white',
              lineWidth = 0,
              strokeStyle = 'black',
              padding = 0.25,
              magFilter = LinearFilter,
              minFilter = LinearFilter,
              mapping,
              wrapS,
              wrapT,
              format,
              type,
              anisotropy } = {}) {

          super(
              createCanvas(),
              mapping,
              wrapS,
              wrapT,
              magFilter,
              minFilter,
              format,
              type,
              anisotropy
          );

          this.autoRedraw = autoRedraw;
          this._text = text;
          this._textAlign = textAlign;
          this._textLineHeight = textLineHeight;
          this._fontFamily = fontFamily;
          this._fontSize = fontSize;
          this._fontWeight = fontWeight;
          this._fontVariant = fontVariant;
          this._fontStyle = fontStyle;
          this._fillStyle = fillStyle;
          this._lineWidth = lineWidth;
          this._strokeStyle = strokeStyle;
          this._padding = padding;

          this.redraw();


      }
      get isTextTexture() {
          return true;
      }
      redraw() {

          let ctx = this.image.getContext('2d');
          ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
          if (this.textWidthInPixels && this.textHeightInPixels) {
              ctx.canvas.width = this.imageWidthInPixels;
              ctx.canvas.height = this.imageHeightInPixels;

              ctx.font = this.font;
              ctx.textBaseline = 'middle';
              let left;
              switch (this.textAlign) {
                  case 'left':
                      ctx.textAlign = 'left';
                      left = this.paddingInPixels + this.lineWidthInPixels / 2;
                      break;
                  case 'right':
                      ctx.textAlign = 'right';
                      left = this.paddingInPixels + this.lineWidthInPixels / 2 + this.textWidthInPixels;
                      break;
                  case 'center':
                      ctx.textAlign = 'center';
                      left = this.paddingInPixels + this.lineWidthInPixels / 4 + this.textWidthInPixels / 2;
                      break;
              }
              let top = this.paddingInPixels + this.lineWidthInPixels / 2 + this.fontSize / 2;
              ctx.fillStyle = this.fillStyle;
              ctx.miterLimit = 1;
              ctx.lineWidth = this.lineWidthInPixels;
              ctx.strokeStyle = this.strokeStyle;
              
              this.textLines.forEach(text => {
                  if (this.lineWidth) {
                      ctx.strokeText(text, left, top);
                  }
                  ctx.fillText(text, left, top);
                  top += this.textLineHeightInPixels;
              });
          } else {
              ctx.canvas.width = ctx.canvas.height = 1;
          }
          this.needsUpdate = true;
      }

      _redrawIfAuto() {
          if (this.autoRedraw) {
              this.redraw();
          }
      }

      get text() {
          return this._text;
      }

      set text(value) {
          if (this._text !== value) {
              this._text = value;
              this._textLines = undefined;
              this._textWidthInPixels = undefined;
              this._redrawIfAuto();
          }
      }

      get textAlign() {
          return this._textAlign;
      }

      set textAlign(value) {
          if (this._textAlign !== value) {
              this._textAlign = value;
              this._redrawIfAuto();
          }
      }

      get textLines() {
          if (Lang_isUndefined(this._textLines)) {
              this._textLines = getTextLines(this.text);
          }
          return this._textLines;
      }

      get textLineHeight() {
          return this._textLineHeight;
      }

      set textLineHeight(value) {
          if (this._textLineHeight !== value) {
              this._textLineHeight = value;
              this._redrawIfAuto();
          }
      }

      get textLineHeightInPixels() {
          return this.fontSize * this.textLineHeight;
      }

      get fontFamily() {
          return this._fontFamily;
      }

      set fontFamily(value) {
          if (this._fontFamily !== value) {
              this._fontFamily = value;
              this._textWidthInPixels = undefined;
              this._redrawIfAuto();
          }
      }

      get fontSize() {
          return this._fontSize;
      }

      set fontSize(value) {
          if (this._fontSize !== value) {
              this._fontSize = value;
              this._textWidthInPixels = undefined;
              this._redrawIfAuto();
          }
      }

      get fontWeight() {
          return this._fontWeight;
      }

      set fontWeight(value) {
          if (this._fontWeight !== value) {
              this._fontWeight = value;
              this._textWidthInPixels = undefined;
              this._redrawIfAuto();
          }
      }

      get fontVariant() {
          return this._fontVariant;
      }

      set fontVariant(value) {
          if (this._fontVariant !== value) {
              this._fontVariant = value;
              this._textWidthInPixels = undefined;
              this._redrawIfAuto();
          }
      }

      get fontStyle() {
          return this._fontStyle;
      }

      set fontStyle(value) {
          if (this._fontStyle !== value) {
              this._fontStyle = value;
              this._textWidthInPixels = undefined;
              this._redrawIfAuto();
          }
      }

      get font() {
          return getFont(
              this.fontStyle,
              this.fontVariant,
              this.fontWeight,
              this.fontSize,
              this.fontFamily,
          );
      }

      get fillStyle() {
          return this._fillStyle;
      }

      set fillStyle(value) {
          if (this._fillStyle !== value) {
              this._fillStyle = value;
              this._redrawIfAuto();
          }
      }

      get lineWidth() {
          return this._lineWidth;
      }

      set lineWidth(value) {
          if (this._lineWidth !== value) {
              this._lineWidth = value;
              this._redrawIfAuto();
          }
      }

      get lineWidthInPixels() {
          return this._lineWidth * this.fontSize;
      }

      get strokeStyle() {
          return this._strokeStyle;
      }

      set strokeStyle(value) {
          if (this._strokeStyle !== value) {
              this._strokeStyle = value;
              this._redrawIfAuto();
          }
      }

      get textWidthInPixels() {
          if (Lang_isUndefined(this._textWidthInPixels)) {
              this._textWidthInPixels = getTextWidth(
                  this.textLines,
                  this.font,
              );
          }
          return this._textWidthInPixels;
      }

      get textHeight() {
          return this.textLineHeight * (this.textLines.length - 1) + 1;
      }

      get textHeightInPixels() {
          return this.textHeight * this.fontSize;
      }

      get padding() {
          return this._padding;
      }

      set padding(value) {
          if (this._padding !== value) {
              this._padding = value;
              this._redrawIfAuto();
          }
      }

      get paddingInPixels() {
          return this.padding * this.fontSize;
      }

      get imageWidthInPixels() {
          return this.textWidthInPixels + this.lineWidthInPixels + this.paddingInPixels * 2;
      }

      get imageHeight() {
          return this.textHeight + this.lineWidth + this.padding * 2;
      }

      get imageHeightInPixels() {
          return this.imageHeight * this.fontSize;
      }

      get imageAspect() {
          if (this.image.width && this.image.height) {
              return this.image.width / this.image.height;
          }
          return 1;
      }
      static getTextWidth(textLines, font) {
          return getTextWidth(textLines, font);
      }

  }

  function Lang_isUndefined(value) {
      return value === undefined;
  }
  function getTextLines(text) {
      return text ? text.split('\n') : [];
  }

  function getFont(fontStyle, fontVariant, fontWeight, fontSize, fontFamily) {
      return [fontStyle, fontVariant, fontWeight, `${fontSize}px`, fontFamily].join(' ');
  }


  function getTextWidth(textLines, font) {
      if (textLines.length) {
          let ctx = createCanvas().getContext('2d');
          ctx.font = font;
          return Array_max(textLines.map(text => ctx.measureText(text).width));
      }
      return 0;
  }


  function Array_max(array) {
      if (array.length > 0) {
          return array.reduce((maxValue, value) => Math.max(maxValue, value));
      }
  }


  function createCanvas() {
      return document.createElementNS('http://www.w3.org/1999/xhtml', 'canvas');
  }

  class TextSprite extends Sprite {
      constructor({
          fontSize = 16,
          redrawInterval = 1,
          material = {},
          texture = {},
      } = {}) {
          super(new SpriteMaterial$$1({ ...material, map: new TextTexture(texture) }));

          this.fontSize = fontSize;
          this.redrawInterval = redrawInterval;
          this.lastRedraw = 0;
      }

      get isTextSprite() {
          return true;
      }

      onBeforeRender(renderer, scene, camera) {
          this.redraw(renderer, camera);
      }
      updateScale(renderer, camera) {

          let actualFontSize = 1;
          let fontsize = this.fontSize;
          let height = 0;
          let screenHeight = renderer.domElement.clientHeight;
          if (camera.isOrthographicCamera) {
              height = camera.top - camera.bottom;
          } else {
              let cameraWorldPos = new Vector3$1();
              camera.updateMatrixWorld(true);
              cameraWorldPos.applyMatrix4(camera.matrixWorld);

              let pos = new Vector3$1();
              this.updateMatrixWorld(true);
              pos.applyMatrix4(this.matrixWorld);

              let dist = cameraWorldPos.distanceTo(pos);
              var vFOV = _Math.degToRad(camera.fov); // convert vertical fov to radians
               height = 2 * Math.tan(vFOV / 2) * dist; // visible height
              //投影位置全屏的Height 与 屏幕的高度比乘以字体的高度  
          }

          actualFontSize = height / screenHeight * fontsize;

          this.scale.set(this.material.map.imageAspect, 1, 1).multiplyScalar(actualFontSize);

      }

      // updateMatrix(...args) {
      //     this.updateScale(...args);
      //     return super.updateMatrix(...args);
      // }

      redraw(renderer, camera) {
          if (this.lastRedraw + this.redrawInterval < Date.now()) {
              if (this.redrawInterval) {
                  setTimeout(() => {
                      this.redrawNow(renderer, camera);
                  }, 1);
              } else {
                  this.redrawNow(renderer, camera);
              }
          }
      }

      redrawNow(renderer, camera) {
          this.updateScale(renderer, camera);
          this.material.map.autoRedraw = true;

          this.material.map.fontSize = _Math.ceilPowerOfTwo(getOptimalFontSize(this, renderer, camera));

          this.lastRedraw = Date.now();
      }

      dispose() {
          //todo 更改sprite 的渲染,不然回收有问题
          this.material.map.dispose();
          this.material.dispose();
      }

  }

  let getOptimalFontSize = (function () {
      const objectWorldPosition = new Vector3$1();
      const cameraWorldPosition = new Vector3$1();
      const objectWorldScale = new Vector3$1();
      return function getOptimalFontSize(object, renderer, camera) {
          if (renderer.domElement.width && renderer.domElement.height && object.material.map.textLines.length) {
              let distance = object.getWorldPosition(objectWorldPosition).distanceTo(camera.getWorldPosition(cameraWorldPosition));
              if (distance) {
                  let heightInPixels = object.getWorldScale(objectWorldScale).y * renderer.domElement.height / distance;
                  if (heightInPixels) {
                      return Math.round(heightInPixels / object.material.map.imageHeight);
                  }
              }
          }
          return 0;
      }

  })();

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

          this.lineDistances = [];     //计算虚线需要
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

          var cb = new Vector3$1(), ab = new Vector3$1();

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
          var unique = [], changes = [];

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

                  var uvs = faceVertexUvs[j], uvsCopy = [];

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

                  var uvs = faceVertexUvs[j], uvsCopy = [];

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

  // PlaneGeometry

  class PlaneGeometry extends Geometry {
      constructor(width, height, widthSegments, heightSegments) {

          super();

          this.type = 'PlaneGeometry';

          this.parameters = {
              width: width,
              height: height,
              widthSegments: widthSegments,
              heightSegments: heightSegments
          };

          this.fromBufferGeometry(new PlaneBufferGeometry(width, height, widthSegments, heightSegments));
          this.mergeVertices();

      }
  }

  // PlaneBufferGeometry

  class PlaneBufferGeometry extends BufferGeometry {
      constructor(width, height, widthSegments, heightSegments) {

          super();

          this.type = 'PlaneBufferGeometry';

          this.parameters = {
              width: width,
              height: height,
              widthSegments: widthSegments,
              heightSegments: heightSegments
          };

          var width_half = width / 2;
          var height_half = height / 2;

          var gridX = Math.floor(widthSegments) || 1;
          var gridY = Math.floor(heightSegments) || 1;

          var gridX1 = gridX + 1;
          var gridY1 = gridY + 1;

          var segment_width = width / gridX;
          var segment_height = height / gridY;

          var ix, iy;

          // buffers

          var indices = [];
          var vertices = [];
          var normals = [];
          var uvs = [];

          // generate vertices, normals and uvs

          for (iy = 0; iy < gridY1; iy++) {

              var y = iy * segment_height - height_half;

              for (ix = 0; ix < gridX1; ix++) {

                  var x = ix * segment_width - width_half;

                  vertices.push(x, - y, 0);

                  normals.push(0, 0, 1);

                  uvs.push(ix / gridX);
                  uvs.push(1 - (iy / gridY));

              }

          }

          // indices

          for (iy = 0; iy < gridY; iy++) {

              for (ix = 0; ix < gridX; ix++) {

                  var a = ix + gridX1 * iy;
                  var b = ix + gridX1 * (iy + 1);
                  var c = (ix + 1) + gridX1 * (iy + 1);
                  var d = (ix + 1) + gridX1 * iy;

                  // faces

                  indices.push(a, b, d);
                  indices.push(b, c, d);

              }

          }

          // build geometry

          this.setIndex(indices);
          this.addAttribute('position', new Float32BufferAttribute(vertices, 3));
          this.addAttribute('normal', new Float32BufferAttribute(normals, 3));
          this.addAttribute('uv', new Float32BufferAttribute(uvs, 2));

      }
  }

  // BoxGeometry

  class BoxGeometry extends Geometry {
      constructor(width, height, depth, widthSegments, heightSegments, depthSegments) {
          super();
          this.type = 'BoxGeometry';
          this.parameters = {
              width: width,
              height: height,
              depth: depth,
              widthSegments: widthSegments,
              heightSegments: heightSegments,
              depthSegments: depthSegments
          };

          this.fromBufferGeometry(new BoxBufferGeometry(width, height, depth, widthSegments, heightSegments, depthSegments));
          this.mergeVertices();
      }
  }
  // BoxBufferGeometry

  class BoxBufferGeometry extends BufferGeometry {
      constructor(width, height, depth, widthSegments, heightSegments, depthSegments) {
          super();

          this.type = 'BoxBufferGeometry';

          this.parameters = {
              width: width,
              height: height,
              depth: depth,
              widthSegments: widthSegments,
              heightSegments: heightSegments,
              depthSegments: depthSegments
          };

          var scope = this;

          // segments

          widthSegments = Math.floor(widthSegments) || 1;
          heightSegments = Math.floor(heightSegments) || 1;
          depthSegments = Math.floor(depthSegments) || 1;

          // buffers

          var indices = [];
          var vertices = [];
          var normals = [];
          var uvs = [];

          // helper variables

          var numberOfVertices = 0;
          var groupStart = 0;

          // build each side of the box geometry

          buildPlane('z', 'y', 'x', - 1, - 1, depth, height, width, depthSegments, heightSegments, 0); // px
          buildPlane('z', 'y', 'x', 1, - 1, depth, height, - width, depthSegments, heightSegments, 1); // nx
          buildPlane('x', 'z', 'y', 1, 1, width, depth, height, widthSegments, depthSegments, 2); // py
          buildPlane('x', 'z', 'y', 1, - 1, width, depth, - height, widthSegments, depthSegments, 3); // ny
          buildPlane('x', 'y', 'z', 1, - 1, width, height, depth, widthSegments, heightSegments, 4); // pz
          buildPlane('x', 'y', 'z', - 1, - 1, width, height, - depth, widthSegments, heightSegments, 5); // nz

          // build geometry

          this.setIndex(indices);
          this.addAttribute('position', new Float32BufferAttribute(vertices, 3));
          this.addAttribute('normal', new Float32BufferAttribute(normals, 3));
          this.addAttribute('uv', new Float32BufferAttribute(uvs, 2));

          function buildPlane(u, v, w, udir, vdir, width, height, depth, gridX, gridY, materialIndex) {

              var segmentWidth = width / gridX;
              var segmentHeight = height / gridY;

              var widthHalf = width / 2;
              var heightHalf = height / 2;
              var depthHalf = depth / 2;

              var gridX1 = gridX + 1;
              var gridY1 = gridY + 1;

              var vertexCounter = 0;
              var groupCount = 0;

              var ix, iy;

              var vector = new Vector3$1();

              // generate vertices, normals and uvs

              for (iy = 0; iy < gridY1; iy++) {

                  var y = iy * segmentHeight - heightHalf;

                  for (ix = 0; ix < gridX1; ix++) {

                      var x = ix * segmentWidth - widthHalf;

                      // set values to correct vector component

                      vector[u] = x * udir;
                      vector[v] = y * vdir;
                      vector[w] = depthHalf;

                      // now apply vector to vertex buffer

                      vertices.push(vector.x, vector.y, vector.z);

                      // set values to correct vector component

                      vector[u] = 0;
                      vector[v] = 0;
                      vector[w] = depth > 0 ? 1 : - 1;

                      // now apply vector to normal buffer

                      normals.push(vector.x, vector.y, vector.z);

                      // uvs

                      uvs.push(ix / gridX);
                      uvs.push(1 - (iy / gridY));

                      // counters

                      vertexCounter += 1;

                  }

              }

              // indices

              // 1. you need three indices to draw a single face
              // 2. a single segment consists of two faces
              // 3. so we need to generate six (2*3) indices per segment

              for (iy = 0; iy < gridY; iy++) {

                  for (ix = 0; ix < gridX; ix++) {

                      var a = numberOfVertices + ix + gridX1 * iy;
                      var b = numberOfVertices + ix + gridX1 * (iy + 1);
                      var c = numberOfVertices + (ix + 1) + gridX1 * (iy + 1);
                      var d = numberOfVertices + (ix + 1) + gridX1 * iy;

                      // faces

                      indices.push(a, b, d);
                      indices.push(b, c, d);

                      // increase counter

                      groupCount += 6;

                  }

              }

              // add a group to the geometry. this will ensure multi material support

              scope.addGroup(groupStart, groupCount, materialIndex);

              // calculate new start value for groups

              groupStart += groupCount;

              // update total number of vertices

              numberOfVertices += vertexCounter;
          }
      }
  }

  class InstancedBufferGeometry extends BufferGeometry {
      constructor() {

          super();

          this.type = 'InstancedBufferGeometry';
          this.maxInstancedCount = undefined;
          this.isInstancedBufferGeometry = true;

      }

      copy(source) {

          super.copy(source);

          this.maxInstancedCount = source.maxInstancedCount;

          return this;

      }

      clone() {

          return new this.coFnstructor().copy(this);

      }
  }

  class LineSegmentsGeometry extends InstancedBufferGeometry {
      constructor() {
          super();
          this.type = 'LineSegmentsGeometry';

          let positions = [- 1, 2, 0, 1, 2, 0, - 1, 1, 0, 1, 1, 0, - 1, 0, 0, 1, 0, 0, - 1, - 1, 0, 1, - 1, 0];
          let uvs = [- 1, 2, 1, 2, - 1, 1, 1, 1, - 1, - 1, 1, - 1, - 1, - 2, 1, - 2];
          let index = [0, 2, 1, 2, 3, 1, 2, 4, 3, 4, 5, 3, 4, 6, 5, 6, 7, 5];

          this.setIndex(index);
          this.addAttribute('position', new Float32BufferAttribute(positions, 3));
          this.addAttribute('uv', new Float32BufferAttribute(uvs, 2));

          this.isLineSegmentsGeometry = true;
      }

      applyMatrix(matrix) {

          let start = this.attributes.instanceStart;
          let end = this.attributes.instanceEnd;

          if (start !== undefined) {

              matrix.applyToBufferAttribute(start);

              matrix.applyToBufferAttribute(end);

              start.data.needsUpdate = true;

          }

          if (this.boundingBox !== null) {

              this.computeBoundingBox();

          }

          if (this.boundingSphere !== null) {

              this.computeBoundingSphere();

          }

          return this;

      }

      setPositions(array) {

          let instanceBuffer = getTypeArray(array); // xyz, xyz

          this.addAttribute('instanceStart', new InterleavedBufferAttribute(instanceBuffer, 3, 0)); // xyz
          this.addAttribute('instanceEnd', new InterleavedBufferAttribute(instanceBuffer, 3, 3)); // xyz

          //默认顶点颜色为白色
          if (this.getAttribute('instanceColorStart') === undefined &&
              this.getAttribute('instanceColorEnd') === undefined) {

              let colors = array.map(() => {
                  return 1.0;
              });
              setColors.call(this, colors);
          }

          this.computeBoundingBox();
          this.computeBoundingSphere();

          return this;

      }

      setColors(array) {
          return setColors.call(this, array);
      }

      computeBoundingBox() {

          computeBoundingBox.call(this);

      }

      computeBoundingSphere() {
          computeBoundingSphere$1.call(this);
      }

  }

  let setColors = function (array) {

      let instanceColorBuffer = getTypeArray(array);

      this.addAttribute('instanceColorStart', new InterleavedBufferAttribute(instanceColorBuffer, 3, 0)); // rgb
      this.addAttribute('instanceColorEnd', new InterleavedBufferAttribute(instanceColorBuffer, 3, 3)); // rgb

      return this;
  };

  let computeBoundingBox = (function () {

      let box = new Box3();

      return function computeBoundingBox() {

          if (this.boundingBox === null) {

              this.boundingBox = new Box3();

          }

          let start = this.attributes.instanceStart;
          let end = this.attributes.instanceEnd;

          if (start !== undefined && end !== undefined) {

              this.boundingBox.setFromBufferAttribute(start);

              box.setFromBufferAttribute(end);

              this.boundingBox.union(box);

          }

      };

  })();

  let computeBoundingSphere$1 = (function () {

      let vector = new Vector3$1();

      return function computeBoundingSphere() {

          if (this.boundingSphere === null) {

              this.boundingSphere = new Sphere();

          }

          if (this.boundingBox === null) {

              this.computeBoundingBox();

          }

          var start = this.attributes.instanceStart;
          var end = this.attributes.instanceEnd;

          if (start !== undefined && end !== undefined) {

              var center = this.boundingSphere.center;

              this.boundingBox.getCenter(center);

              var maxRadiusSq = 0;

              for (var i = 0, il = start.count; i < il; i++) {

                  vector.fromBufferAttribute(start, i);
                  maxRadiusSq = Math.max(maxRadiusSq, center.distanceToSquared(vector));

                  vector.fromBufferAttribute(end, i);
                  maxRadiusSq = Math.max(maxRadiusSq, center.distanceToSquared(vector));

              }

              this.boundingSphere.radius = Math.sqrt(maxRadiusSq);

              if (isNaN(this.boundingSphere.radius)) {

                  console.error('LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.', this);

              }

          }

      };

  })();


  function getTypeArray(array) {

      let typeArray;

      if (array instanceof Float32Array) {

          typeArray = array;

      } else if (Array.isArray(array)) {

          typeArray = new Float32Array(array);

      }

      return new InstancedInterleavedBuffer(typeArray, 6, 1);

  }

  class LineGeometry extends LineSegmentsGeometry {
      constructor() {
          super();
          this.type = 'LineGeometry';
          this.isLineGeometry = true;
      }

      setPositions(array) {

          let points = createVertexs(array);

          super.setPositions(points);

          return this;

      }

      setColors(array) {

          let colors = createVertexs(array);

          super.setColors(colors);

          return this;

      }

      fromLine(line) {

          var geometry = line.geometry;

          if (geometry.isGeometry) {

              this.setPositions(geometry.vertices);

          } else if (geometry.isBufferGeometry) {

              this.setPositions(geometry.position.array); // assumes non-indexed

          }

          // set colors, maybe

          return this;

      }

  }

  function createVertexs(array) {
      // converts [ x1, y1, z1,  x2, y2, z2, ... ] to pairs format
      let length = array.length - 3;
      let Vertexs = new Float32Array(2 * length);

      for (let i = 0; i < length; i += 3) {

          Vertexs[2 * i] = array[i];
          Vertexs[2 * i + 1] = array[i + 1];
          Vertexs[2 * i + 2] = array[i + 2];

          Vertexs[2 * i + 3] = array[i + 3];
          Vertexs[2 * i + 4] = array[i + 4];
          Vertexs[2 * i + 5] = array[i + 5];

      }

      return Vertexs;

  }

  //所有的预定几何体

  class LineDashedMaterial extends LineBasicMaterial {
      constructor(parameters) {
          super();

          this.type = 'LineDashedMaterial';

          //以下三个参数的配置与顶点数据的大小有关 

          this.scale = 1;        //虚线整体的缩放 
          this.dashSize = 3;     //虚线点的长度  
          this.gapSize = 1;      //虚线间距的大小

          this.setValues(parameters);

      }

      get isLineDashedMaterial() {
          return true;
      }

      copy(source) {

          super.copy(source);
          this.scale = source.scale;
          this.dashSize = source.dashSize;
          this.gapSize = source.gapSize;

          return this;
      }
  }

  class LineMeshMaterial extends Material {
      constructor(parameters) {
          super();
          this.type = 'LineMeshMaterial';
          this.color = new Color$1(0xffffff);
          this.linewidth = 1;

          this.dashed = false;
          this.scale = 1;        //虚线整体的缩放 
          this.dashSize = 3;     //虚线点的长度  
          this.gapSize = 1;      //虚线间距的大小

          this.resolution = new Vector2();

          //todo 暂不需要
          this.lights = false;


          this.setValues(parameters);
      }

      get isLineMeshMaterial() {
          return true;
      }

      copy(source) {
          super.copy(source);
          this.color.copy(source.color);
          this.linewidth = source.linewidth;
          this.scale = source.scale;
          this.dashSize = source.dashSize;
          this.gapSize = source.gapSize;
          this.dashed = source.dashed;

          this.resolution.copy(source.resolution);

          return this;

      }
  }

  //所有的材质

  class Camera extends Object3D {
      constructor() {
          super();

          //viewMatrix
          this.matrixWorldInverse = new Matrix4();
          this.projectionMatrix = new Matrix4();

          this.isCamera = true;
      }

      updateMatrixWorld(force) {

          super.updateMatrixWorld(force);

          this.matrixWorldInverse.getInverse(this.matrixWorld);

      }

      getWorldDirection(target) {
          return getWorldDirection$1.call(this, target);
      }


  }

  let getWorldDirection$1 = (function () {

      let quaternion = new Quaternion();

      return function getWorldDirection(target) {

          if (target === undefined) {

              console.warn('Camera: .getWorldDirection() target is now required');
              target = new Vector3();

          }

          this.getWorldQuaternion(quaternion);

          return target.set(0, 0, - 1).applyQuaternion(quaternion);

      };

  })();

  /**
   * @class 透视相机
   * @author bujue
   */

  class PerspectiveCamera extends Camera {
      constructor(fov, aspect, near, far) {
          super();

          this.type = 'PerspectiveCamera';

          this.fov = fov !== undefined ? fov : 50;
          this.zoom = 1;

          this.near = near !== undefined ? near : 0.1;
          this.far = far !== undefined ? far : 2000;
          this.focus = 10;

          this.aspect = aspect !== undefined ? aspect : 1;
          this.view = null;


          this.updateProjectionMatrix();

          this.isPerspectiveCamera = true;
      }

      updateProjectionMatrix() {

          var near = this.near,
              top = near * Math.tan(
                  _Math.DEG2RAD * 0.5 * this.fov) / this.zoom,
              height = 2 * top,
              width = this.aspect * height,
              left = - 0.5 * width,
              view = this.view;

          this.projectionMatrix.makePerspective(left, left + width, top, top - height, near, this.far);

      }
  }

  /**
   * @class 正交投影相机
   * @author bujue
   */

  class OrthographicCamera extends Camera {
      constructor(left, right, top, bottom, near, far ) {
          super();
          this.type = 'OrthographicCamera';

          this.zoom = 1;
          this.view = null;

          this.left = left;
          this.right = right;
          this.top = top;
          this.bottom = bottom;

          this.near = (near !== undefined) ? near : 0.1;
          this.far = (far !== undefined) ? far : 2000;

          this.isOrthographicCamera = true;

          this.updateProjectionMatrix();
      }

      updateProjectionMatrix() {

          var dx = (this.right - this.left) / (2 * this.zoom);
          var dy = (this.top - this.bottom) / (2 * this.zoom);
          var cx = (this.right + this.left) / 2;
          var cy = (this.top + this.bottom) / 2;

          var left = cx - dx;
          var right = cx + dx;
          var top = cy + dy;
          var bottom = cy - dy;

          this.projectionMatrix.makeOrthographic(left, right, top, bottom, this.near, this.far);

      }

  }

  /**
   * @author bhouston / http://clara.io
   * @author WestLangley / http://github.com/WestLangley
   *
   * Ref: https://en.wikipedia.org/wiki/Spherical_coordinate_system
   *
   * The poles (phi) are at the positive and negative y axis.
   * The equator starts at positive z.
   */

  class Spherical {
      constructor(radius, phi, theta) {

          this.radius = (radius !== undefined) ? radius : 1.0;
          this.phi = (phi !== undefined) ? phi : 0; // up / down towards top and bottom pole
          this.theta = (theta !== undefined) ? theta : 0; // around the equator of the sphere

          return this;

      }

      set(radius, phi, theta) {

          this.radius = radius;
          this.phi = phi;
          this.theta = theta;

          return this;

      }
      clone() {

          return new this.constructor().copy(this);

      }
      copy(other) {

          this.radius = other.radius;
          this.phi = other.phi;
          this.theta = other.theta;

          return this;

      }
      // restrict phi to be betwee EPS and PI-EPS
      makeSafe() {

          let EPS = 0.000001;
          this.phi = Math.max(EPS, Math.min(Math.PI - EPS, this.phi));

          return this;

      }

      setFromVector3(vec3) {

          this.radius = vec3.length();

          if (this.radius === 0) {

              this.theta = 0;
              this.phi = 0;

          } else {

              this.theta = Math.atan2(vec3.x, vec3.z); // equator angle around y-up axis
              this.phi = Math.acos(_Math.clamp(vec3.y / this.radius, - 1, 1)); // polar angle

          }

          return this;

      }
  }

  class Framework extends Events {
      constructor() {
          super();

          this.layers = [];
          this.isUpdate = true;
          this.currTick = new Date();
          this.lastTick = null;
          this.renderer = null;
      }

      init() {

          this._InitRender();
      }

      _InitRender() {

          //创建渲染器
          try {
              this.renderer = new WebGLRenderer({
                  alpha: true,
                  depth: true,
                  antialias: true,
                  premultipliedAlpha: true
              });
          } catch (e) {
              this.view.style.cssText = "display: flex;justify-content: center;align-items:center;font-size:16px;color:#666;width:100%;height:100%;";
              this.view.innerHTML = '很抱歉,您的浏览器不能展示3D图表!';
              console.error(e);
              return;
          }
      }

      render() {

          let redraw = this.isUpdate;
          this.isUpdate = false;
          this.fire({ type: 'renderbefore' });
          if (redraw) {
              this.layers.forEach(view => {

                  this.renderer.render(view._scene, view._camera);
              });
          }
      }

      renderFrame() {
          let me = this;
          this.render();
          window.renderFrame(function () {
              me.renderFrame();
          });
      }

      addView(view) {
          this.layers.push(view);
      }

      removeView(view) {

          //todo 移除view 后续需要进行垃圾回收
          var index = this.layers.indexOf(view);
          if (index >= 0) {
              this.layers.splice(index, 1);
          }
      }

  }

  window.renderFrame = function () {
      return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (tick, canvas) {
          window.setTimeout(tick, 1000 / 60);
      };
  }();

  class RenderFont {
      constructor(params = {}) {

          this.chartInfos = {};
          this.scale = params.scale || window.devicePixelRatio || 1;
          this.style = {
              color: params.color || new Color$1('#000'),
              fontSize: params.fontSize || 14,
              fontFamily: params.fontFamily || '微软雅黑,sans-serif',
              isBold: params.isBold || false,
              textAlign: params.textAlign || 'top',
              textBaseline: params.textBaseline || 'top',
              verticalAlign: params.verticalAlign || 'middle' // top , middle, bottom

              //根据传入的文字内容自动计算 纹理的大小

          };this.textureWidth = 2;
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
          me.context.font = me.style.isBold ? 'bold ' : 'normal ' + me.style.fontSize * me.scale * 4 + 'px ' + me.style.fontFamily;
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
              }
              //top 


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
              me.context.fillText(text, left, top);

              window._debug = true;
              if (window._debug) {
                  console.log('left,top', left, top, maxWidth, size.width);
                  document.body.appendChild(me.canvas);

                  me.canvas.style.position = "absolute";
                  me.canvas.style.left = "700px";
                  me.canvas.style.top = "100px";
              }
          });
          return {
              width: maxWidth,
              height: maxHeight
          };
      }

      resetCanvasSize(size) {
          let me = this;

          let width = size.width; //_Math.ceilPowerOfTwo(size.width);
          let height = size.height; //_Math.ceilPowerOfTwo(size.height);


          me.canvas.width = width * this.scale;
          me.canvas.height = height * this.scale;

          me.canvas.style.width = width + 'px';
          me.canvas.style.height = height + 'px';

          me.context.scale(this.scale, this.scale);

          this.textureWidth = width;
          this.textureHeight = height;

          return {
              width,
              height
          };
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
          div.style.fontSize = this.style.fontSize + 'px'; // or 'px'

          document.body.appendChild(div);
          size = {
              width: div.offsetWidth,
              height: div.offsetHeight
          };
          document.body.removeChild(div);
          div = null;

          return size;
      }

  }

  class View {
      constructor(_frameWork) {

          this._scene = new Scene();
          this._camera = null;

          this._frameWork = _frameWork;
          this.renderer = _frameWork.renderer;
          _frameWork.addView(this);
          this.width = 0;
          this.height = 0;

          this.aspect = 1;
          this.fov = 75;
          this.near = 0.1;
          this.far = 10000;
          this.mode = null;

          this.controls = null;

          //todo:相机变化需要派发事件出来
      }

      setSize(width, height) {
          this.width = width;
          this.height = height;
          this.aspect = this.height ? this.width / this.height : 1;
          this.renderer.setPixelRatio(window.devicePixelRatio || 1);
          this.renderer.setSize(width, height);
      }

      setBackground(color) {

          this._scene.background = color;
      }

      addObject(obj) {

          this._scene.add(obj);
      }

      addGroup(opt) {
          let _group = new Group();
          // _group.on('removed', function () {
          //     debugger
          //     if (this.geometry) {
          //         this.geometry.dispose();
          //     }
          //     if (this.material) {
          //         this.material.dispose();
          //     }
          // });
          _group.name = opt && opt.name || '';
          return _group;
      }

      removeObject(obj) {

          this._scene.remove(obj);
      }

      //mode: "ortho" || "perspective"    
      project(controlsOpts, mode) {
          this.mode = mode;
          this.controls = controlsOpts;

          let aspect = this.aspect;
          let frustumSize = controlsOpts.boxHeight;
          let distance = controlsOpts.distance;

          if (mode === 'perspective') {
              this._camera = new PerspectiveCamera(this.fov, this.aspect, this.near, this.far);
              //默认绘制的物体是贴近近裁面的,根据近裁面呈现高度为frustumSize的物体需要相机位置
              //let centerPosition = new Vector3(0, 0, (this.far - this.near)/2);


              // let vFOV = _Math.degToRad(this.fov); // convert vertical fov to radians

              // var dist = frustumSize / (2 * Math.tan(vFOV / 2));
              this._camera.position.set(0, 0, distance);
          } else {
              //给定一个大的投影空间,方便数据的计算
              this._camera = new OrthographicCamera(frustumSize * aspect / -2, frustumSize * aspect / 2, frustumSize / 2, frustumSize / -2, this.near, this.far);
              this._camera.position.set(0, 0, distance);
          }

          // console.info("getVisableSize", this.getVisableSize());
      }

      getVisableSize(currPosition = new Vector3$1()) {

          let result = { width: 0, height: 0, ratio: 0 };

          if (this.mode == "ortho") {
              result.width = Math.round(this._camera.right - this._camera.left);
              result.height = Math.round(this._camera.top - this._camera.bottom);
          }

          if (this.mode == "perspective") {

              let cameraPosition = this._camera.position.clone();
              let dist = cameraPosition.distanceTo(currPosition);
              let vFOV = _Math.degToRad(this.fov); // convert vertical fov to radians
              let height = 2 * Math.tan(vFOV / 2) * dist;

              result.width = height * this.aspect;
              result.height = height;
          }
          if (this.width != 0) {
              result.ratio = result.width / this.width;
          }

          return result;
      }

      //创建一个box
      createBox(width = 1, height = 1, depth = 1, materials = undefined) {

          if (!materials) {
              materials = new MeshBasicMaterial$$1();
          }

          // 初期把一个box 看作一个mesh  后期优化在渲染前做顶点合并
          let transMatrix = new Matrix4();
          let geometry = new BoxGeometry(1, 1, 1);

          let mesh = new Mesh(geometry, materials);

          //box 的中心的在正面下边的中点上,方便对box 高度和深度的变化
          geometry.vertices.forEach(vertice => {
              vertice.addScalar(0.5);
              vertice.z *= -1;
          });

          //更加给定的得数据变换box
          transMatrix.makeScale(width, height, depth);

          geometry.vertices.forEach(vertice => {
              vertice.applyMatrix4(transMatrix);
          });

          return mesh;
      }
      //创建一个面
      createPlane(width = 1, height = 1, materials = undefined, showInfo = {}, group = undefined, faceStyle = {}) {

          if (!materials) {
              materials = new MeshBasicMaterial$$1({
                  color: faceStyle.fillStyle || 0xffffff * Math.random(),
                  side: FrontSide,
                  transparent: true,
                  opacity: faceStyle.alpha || 1,
                  polygonOffset: true,
                  polygonOffsetFactor: 1,
                  polygonOffsetUnits: 0.3

              });
          }

          let planetGeometry = new PlaneGeometry(width, height);
          let planeMesh = new Mesh(planetGeometry, materials);

          if (showInfo.dir.equals(new Vector3$1(1, 0, 0))) {
              planeMesh.rotateY(_Math.degToRad(90));
          }
          if (showInfo.dir.equals(new Vector3$1(-1, 0, 0))) {
              planeMesh.rotateY(_Math.degToRad(-90));
          }

          if (showInfo.dir.equals(new Vector3$1(0, 1, 0))) {
              planeMesh.rotateX(_Math.degToRad(-90));
          }

          if (showInfo.dir.equals(new Vector3$1(0, -1, 0))) {
              planeMesh.rotateX(_Math.degToRad(90));
          }
          if (showInfo.dir.equals(new Vector3$1(0, 0, -1))) {
              planeMesh.rotateY(_Math.degToRad(180));
          }

          if (showInfo.center) {
              planeMesh.position.copy(showInfo.center);
          }
          if (group) {
              group.visible = showInfo.visible;
              group.add(planeMesh);
          }

          return planeMesh;
      }
      //绘制普通线条
      createCommonLine(points = [], lineStyle) {
          let group = this.addGroup({ name: 'commonLines' });

          let material = new LineBasicMaterial({
              color: lineStyle.strokeStyle
          });
          if (lineStyle.lineType == 'dashed') {
              material = new LineDashedMaterial({
                  color: lineStyle.strokeStyle
              });
          }

          let geometry = new Geometry();
          points.forEach(item => {
              geometry.vertices.push(item);
          });
          let line = new Line(geometry, material);
          group.add(line);

          return group;
      }

      //绘制线条
      createLine(origins, direction, length, lineWidth, lineColor) {

          let group = new Group();
          let line = null;

          direction.normalize();
          let matLine = new LineMeshMaterial({
              color: lineColor,
              linewidth: lineWidth, // in pixels
              resolution: new Vector2(this.width, this.height),
              dashed: false
          });

          if (!_.isArray(origins)) {
              origins = [origins];
          }
          let triangleVertices = [];
          origins.forEach(origin => {
              triangleVertices = [];
              triangleVertices.push([0, 0, 0]);

              let endPoint = new Vector3$1();
              //endPoint.copy([0,0,0]);
              let delta = new Vector3$1();
              delta.copy(direction);
              delta.multiplyScalar(length);
              endPoint.add(delta);

              triangleVertices.push(endPoint.toArray());
              let lineMeshGeometry = new LineGeometry();

              lineMeshGeometry.setPositions(_.flatten(triangleVertices));

              line = new Line2(lineMeshGeometry, matLine);
              line.drawMode = TrianglesDrawMode;
              line.computeLineDistances();
              line.scale.set(1, 1, 1);
              line.position.copy(origin);
              group.add(line);
          });

          return group;
      }

      creatSpriteText(texts, origins, fontStyle) {
          //相机变化距离,不改变大小
          //https://vouzamo.wordpress.com/2016/09/07/threejs-heads-up-display/
          //1、透视相机根据距离同时调整自己的缩放
          //2、或者在单独的场景使用正交投影渲染

          let textGroup = new Group();

          let renderFont = new RenderFont({
              verticalAlign: 'middle',
              textAlign: 'right'
          });
          //todo  模糊需要解决
          //label高度
          let spriteHeight = 14 * 4;

          fontStyle = {
              enabled: 1,
              fontColor: '#999',
              fontSize: 12,
              format: null,
              rotation: 0,
              marginToLine: 3 //和刻度线的距离
          };
          if (!_.isArray(texts)) {
              texts = [texts];
          }

          if (!_.isArray(origins)) {
              origins = [origins];
          }

          renderFont.setStyle(fontStyle);
          let maxSize = renderFont.drawTexts(texts);

          let size = maxSize; //renderFont.measureText(text);
          let spriteWidth = size.width / size.height * spriteHeight;

          texts.forEach((text, index) => {

              let texture = new Texture();
              texture.image = renderFont.canvas;
              texture.wrapS = RepeatWrapping;
              texture.wrapT = RepeatWrapping;
              texture.minFilter = LinearFilter;
              texture.magFilter = LinearFilter;

              texture.repeat.set(1 / texts.length, 1);
              texture.offset.set(index / texts.length, 0);

              texture.needsUpdate = true;

              let spriteMatrial = new SpriteMaterial$$1({
                  map: texture
              });

              let sprite = new Sprite(spriteMatrial);
              sprite.scale.set(spriteWidth, spriteHeight, 1);
              sprite.position.copy(origins[index]);

              textGroup.add(sprite);
          });

          return textGroup;
      }

      createTextSprite(text, fontSize, color) {
          let group = new Group();
          let sprite = new TextSprite({
              fontSize: fontSize,
              texture: { //纹理中需要的文字大小不需要指定,TextSprite会自动计算
                  padding: 0,
                  text: text,
                  fontFamily: 'SimHei, Arial, Helvetica, sans-serif'
              },
              material: {
                  color: color || 0x333333,
                  transparent: true
              }
          });
          group.add(sprite);
          return group;
      }

      getObjectScale(object) {
          const objectWorldScale = new Vector3$1();
          return object.getWorldScale(objectWorldScale);
      }
      resize(_width, _height, frustumSize) {
          this.setSize(_width, _height);
          if (this.mode == 'perspective') {
              this._camera.aspect = this.aspect;
          } else {

              this._camera.left = frustumSize * aspect / -2;
              this._camera.right = frustumSize * aspect / 2;
              this._camera.top = frustumSize / 2;
              this._camera.bottom = frustumSize / -2;
          }
          this._camera.updateProjectionMatrix();
      }

  }

  class Application {

      constructor() {

          this._framework = new Framework();
          this._framework.init();

          //默认值有一个view;
          this.view = [];

          this.createView();
      }

      launch() {
          this._framework.renderFrame();
      }

      createView() {
          this.view.push(new View(this._framework));
      }

  }

  //默认坐标系的中心点与坐标系的原点都为世界坐标的[0,0,0]点
  //惯性坐标系
  class InertialSystem extends Events {
      constructor(root) {
          super();
          this._root = root;

          let opts = _.clone(this._root.opt);
          this.coord = {};
          //坐标原点
          this.origin = new Vector3$1(0, 0, 0);
          //中心的
          this.center = new Vector3$1(0, 0, 0);

          this.padding = {
              left: 0,
              top: 0,
              right: 0,
              bottom: 0,
              front: 0,
              back: 0
          };

          this.group = root.renderView.addGroup({ name: 'InertialSystem' });

          _.extend(true, this, this.setDefaultOpts(opts));
      }

      setDefaultOpts(opts) {
          return opts;
      }

      getBoundbox() {

          let _boundbox = new Box3();

          let _opt = this._root.opt.controls;
          let _frustumSize = this._root.renderView.mode == 'ortho' ? _opt.boxHeight * 0.8 : _opt.boxHeight;
          let _width = _opt.boxWidth;
          let _depth = _opt.boxDepth;
          //斜边
          let _hypotenuse = new Vector3$1(_width, 0, _depth).length();

          let _ratio = this._root.renderView.getVisableSize(new Vector3$1(0, 0, -_hypotenuse)).ratio;

          let minX = -_width * 0.5 + this.padding.left * _ratio;
          let minY = -_frustumSize * 0.5 + this.padding.bottom * _ratio;
          let minZ = this.padding.front - _hypotenuse * 0.5 - _depth;

          let maxX = _width * 0.5 - this.padding.right * _ratio;
          let maxY = _frustumSize * 0.5 - this.padding.top * _ratio;
          let maxZ = -_hypotenuse * 0.5 + this.padding.back;

          _boundbox.min.set(minX, minY, minZ);
          _boundbox.max.set(maxX, maxY, maxZ);
          return _boundbox;
      }

      _getWorldPos(pos) {
          let posWorld = pos.clone();

          this.group.updateMatrixWorld();
          posWorld.applyMatrix4(this.group.matrixWorld);
          return posWorld;
      }

      dataToPoint(data, dir) {}

      pointToData() {}

      initCoordUI() {
          //什么都不做
          return null;
      }
      draw() {}

  }

  //组件的标准
  class Component extends Events {
      constructor(_coordSystem) {
          super();

          this._coordSystem = _coordSystem;
          this._root = _coordSystem._root;

          // //每一个组件存放在一个Group中
          // this.group = new Group();
          // this.name = '';
      }

      //后续组件的公共部分可以提取到这里

  }

  /**
  * 把原始的数据
  * field1 field2 field3
  *   1      2      3
  *   2      3      4
  * 这样的数据格式转换为内部的
  * [{field:'field1',index:0,data:[1,2]} ......]
  * 这样的结构化数据格式。
  */

  function DataFrame (data, opt) {

      var dataFrame = { //数据框架集合
          length: 0,
          org: [], //最原始的数据，一定是个行列式，因为如果发现是json格式数据，会自动转换为行列式
          data: [], //最原始的数据转化后的数据格式：[o,o,o] o={field:'val1',index:0,data:[1,2,3]}
          getRowData: _getRowData,
          getFieldData: _getFieldData,
          getDataOrg: getDataOrg,
          fields: [],
          range: {
              start: 0,
              end: 0
          }
      };

      if (!data || data.length == 0) {
          return dataFrame;
      }
      //检测第一个数据是否为一个array, 否就是传入了一个json格式的数据
      if (data.length > 0 && !_.isArray(data[0])) {
          data = parse2MatrixData(data);
          dataFrame.length = data.length;
      } else {
          dataFrame.length = data.length - 1;
      }
      //设置好数据区间end值
      dataFrame.range.end = dataFrame.length - 1;
      //然后检查opts中是否有dataZoom.range
      if (opt && opt.dataZoom && opt.dataZoom.range) {
          _.extend(dataFrame.range, opt.dataZoom.range);
      }
      dataFrame.org = data;
      dataFrame.fields = data[0] ? data[0] : []; //所有的字段集合;

      var total = []; //已经处理成[o,o,o]   o={field:'val1',index:0,data:[1,2,3]}
      for (var a = 0, al = dataFrame.fields.length; a < al; a++) {
          var o = {};
          o.field = dataFrame.fields[a];
          o.index = a;
          o.data = [];
          total.push(o);
      }    dataFrame.data = total;

      //填充好total的data并且把属于yAxis的设置为number
      for (var a = 1, al = data.length; a < al; a++) {
          for (var b = 0, bl = data[a].length; b < bl; b++) {

              /*
              var _val = data[a][b];
              if( !isNaN( _val ) ){
                  _val = Number( _val );
              };
              */

              total[b].data.push(data[a][b]);
          }
      }
      //会按照$field的格式转换成对应一一对应的 org 的结构
      function getDataOrg($field, format, totalList, lev) {

          if (!lev) lev = 0;

          var arr = totalList || total;
          if (!arr) {
              return;
          }
          if (!format) {
              format = function (e) {
                  return e;
              };
          }
          function _format(data) {
              for (var i = 0, l = data.length; i < l; i++) {
                  data[i] = format(data[i]);
              }            return data;
          }
          if (!_.isArray($field)) {
              $field = [$field];
          }
          //这个时候的arr只是totalList的过滤，还没有完全的按照$field 中的排序
          var newData = [];
          for (var i = 0, l = $field.length; i < l; i++) {
              if (_.isArray($field[i])) {
                  newData.push(getDataOrg($field[i], format, totalList, lev + 1));
              } else {

                  var _fieldData = newData;
                  if (!lev) {
                      _fieldData = [];
                  }                for (var ii = 0, iil = arr.length; ii < iil; ii++) {
                      if ($field[i] == arr[ii].field) {
                          _fieldData.push(_format(arr[ii].data.slice(dataFrame.range.start, dataFrame.range.end + 1)));
                          break;
                      }
                  }                if (!lev) {
                      newData.push(_fieldData);
                  }            }        }
          return newData;
      }
      /*
       * 获取某一行数据
      */
      function _getRowData(index) {
          var o = {};
          var data = dataFrame.data;
          for (var a = 0; a < data.length; a++) {
              o[data[a].field] = data[a].data[dataFrame.range.start + index];
          }        return o;
      }

      function _getFieldData(field) {
          var data;
          _.each(dataFrame.data, function (d) {
              if (d.field == field) {
                  data = d;
              }
          });
          if (data) {
              return data.data.slice(dataFrame.range.start, dataFrame.range.end + 1);
          } else {
              return [];
          }
      }
      return dataFrame;
  }

  // This set of controls performs orbiting, dollying (zooming), and panning.
  // Unlike TrackballControls, it maintains the "up" direction object.up (+Y by default).
  //
  //    Orbit - left mouse / touch: one-finger move
  //    Zoom - middle mouse, or mousewheel / touch: two-finger spread or squish
  //    Pan - right mouse, or arrow keys / touch: two-finger move

  const EPS$1 = 0.000001;
  const changeEvent = { type: 'change' };
  const startEvent = { type: 'start' };
  const endEvent = { type: 'end' };
  const MOUSE = { LEFT: 0, MIDDLE: 1, RIGHT: 2 };

  const STATE = { NONE: -1, ROTATE: 0, DOLLY: 1, PAN: 2, TOUCH_ROTATE: 3, TOUCH_DOLLY_PAN: 4 };

  class OrbitControls extends Events {
      constructor(object, domElement) {
          super();
          let scope = this;

          this.object = object;

          this.domElement = domElement !== undefined ? domElement : document;

          // Set to false to disable this control
          this.enabled = true;

          // "target" sets the location of focus, where the object orbits around
          this.target = new Vector3$1();

          // How far you can dolly in and out ( PerspectiveCamera only )
          this.minDistance = 0;
          this.maxDistance = Infinity;

          // How far you can zoom in and out ( OrthographicCamera only )
          this.minZoom = 0;
          this.maxZoom = Infinity;

          // How far you can orbit vertically, upper and lower limits.
          // Range is 0 to Math.PI radians.
          this.minPolarAngle = 0; // radians
          this.maxPolarAngle = Math.PI; // radians

          // How far you can orbit horizontally, upper and lower limits.
          // If set, must be a sub-interval of the interval [ - Math.PI, Math.PI ].
          this.minAzimuthAngle = -Infinity; // radians
          this.maxAzimuthAngle = Infinity; // radians

          // Set to true to enable damping (inertia)
          // If damping is enabled, you must call controls.update() in your animation loop
          this.enableDamping = false;
          this.dampingFactor = 0.25;

          // This option actually enables dollying in and out; left as "zoom" for backwards compatibility.
          // Set to false to disable zooming
          this.enableZoom = true;
          this.zoomSpeed = 1.0;

          // Set to false to disable rotating
          this.enableRotate = true;
          this.rotateSpeed = 1.0;

          // Set to false to disable panning
          this.enablePan = true;
          this.panSpeed = 1.0;
          this.screenSpacePanning = false; // if true, pan in screen-space
          this.keyPanSpeed = 7.0; // pixels moved per arrow key push

          // Set to true to automatically rotate around the target
          // If auto-rotate is enabled, you must call controls.update() in your animation loop
          this.autoRotate = false;
          this.autoRotateSpeed = 2.0; // 30 seconds per round when fps is 60

          // Set to false to disable use of the keys
          this.enableKeys = true;

          // The four arrow keys
          this.keys = { LEFT: 37, UP: 38, RIGHT: 39, BOTTOM: 40 };

          // Mouse buttons
          this.mouseButtons = { ORBIT: MOUSE.LEFT, ZOOM: MOUSE.MIDDLE, PAN: MOUSE.RIGHT };

          // for reset
          this.target0 = this.target.clone();
          this.position0 = this.object.position.clone();
          this.zoom0 = this.object.zoom;

          //
          // internals
          //

          this._state = STATE.NONE;
          // current position in spherical coordinates
          this._spherical = new Spherical();
          this._sphericalDelta = new Spherical();

          this._scale = 1;
          this._panOffset = new Vector3$1();
          this._zoomChanged = false;

          this._rotateStart = new Vector2();
          this._rotateEnd = new Vector2();
          this._rotateDelta = new Vector2();

          this._panStart = new Vector2();
          this._panEnd = new Vector2();
          this._panDelta = new Vector2();

          this._dollyStart = new Vector2();
          this._dollyEnd = new Vector2();
          this._dollyDelta = new Vector2();

          //

          scope.domElement.addEventListener('contextmenu', onContextMenu.bind(scope), false);

          scope.domElement.addEventListener('mousedown', onMouseDown.bind(scope), false);
          scope.domElement.addEventListener('wheel', onMouseWheel.bind(scope), false);

          scope.domElement.addEventListener('touchstart', onTouchStart.bind(scope), false);
          scope.domElement.addEventListener('touchend', onTouchEnd.bind(scope), false);
          scope.domElement.addEventListener('touchmove', onTouchMove.bind(scope), false);

          window.addEventListener('keydown', onKeyDown.bind(scope), false);

          this.update = function () {

              let offset = new Vector3$1();

              // so camera.up is the orbit axis
              let quat = new Quaternion().setFromUnitVectors(object.up, new Vector3$1(0, 1, 0));
              let quatInverse = quat.clone().inverse();

              let lastPosition = new Vector3$1();
              let lastQuaternion = new Quaternion();

              return function update() {

                  let position = scope.object.position;

                  offset.copy(position).sub(scope.target);

                  // rotate offset to "y-axis-is-up" space
                  offset.applyQuaternion(quat);

                  // angle from z-axis around y-axis
                  scope._spherical.setFromVector3(offset);

                  if (scope.autoRotate && this._state === STATE.NONE) {

                      rotateLeft.call(scope, getAutoRotationAngle.call(scope));
                  }

                  scope._spherical.theta += scope._sphericalDelta.theta;
                  scope._spherical.phi += scope._sphericalDelta.phi;

                  // restrict theta to be between desired limits
                  scope._spherical.theta = Math.max(scope.minAzimuthAngle, Math.min(scope.maxAzimuthAngle, scope._spherical.theta));

                  // restrict phi to be between desired limits
                  scope._spherical.phi = Math.max(scope.minPolarAngle, Math.min(scope.maxPolarAngle, scope._spherical.phi));

                  scope._spherical.makeSafe();

                  scope._spherical.radius *= scope._scale;

                  // restrict radius to be between desired limits
                  scope._spherical.radius = Math.max(scope.minDistance, Math.min(scope.maxDistance, scope._spherical.radius));

                  // move target to panned location
                  scope.target.add(scope._panOffset);

                  offset.setFromSpherical(scope._spherical);

                  // rotate offset back to "camera-up-vector-is-up" space
                  offset.applyQuaternion(quatInverse);

                  position.copy(scope.target).add(offset);

                  scope.object.lookAt(scope.target);

                  if (scope.enableDamping === true) {

                      scope._sphericalDelta.theta *= 1 - scope.dampingFactor;
                      scope._sphericalDelta.phi *= 1 - scope.dampingFactor;

                      scope._panOffset.multiplyScalar(1 - scope.dampingFactor);
                  } else {

                      scope._sphericalDelta.set(0, 0, 0);

                      scope._panOffset.set(0, 0, 0);
                  }

                  scope._scale = 1;

                  // update condition is:
                  // min(camera displacement, camera rotation in radians)^2 > EPS
                  // using small-angle approximation cos(x/2) = 1 - x^2 / 8

                  if (this._zoomChanged || lastPosition.distanceToSquared(scope.object.position) > EPS$1 || 8 * (1 - lastQuaternion.dot(scope.object.quaternion)) > EPS$1) {

                      scope.fire(changeEvent);

                      lastPosition.copy(scope.object.position);
                      lastQuaternion.copy(scope.object.quaternion);
                      this._zoomChanged = false;

                      return true;
                  }

                  return false;
              };
          }();

          // force an update at start
          this.update();
      }

      //
      // public methods
      //

      getPolarAngle() {

          return _spherical.phi;
      }

      getAzimuthalAngle() {

          return _spherical.theta;
      }

      saveState() {
          let scope = this;
          scope.target0.copy(scope.target);
          scope.position0.copy(scope.object.position);
          scope.zoom0 = scope.object.zoom;
      }

      reset() {
          let scope = this;
          scope.target.copy(scope.target0);
          scope.object.position.copy(scope.position0);
          scope.object.zoom = scope.zoom0;

          scope.object.updateProjectionMatrix();
          scope.fire(changeEvent);

          scope.update();

          scope._state = STATE.NONE;
      }

      // this method is exposed, but perhaps it would be better if we can make it private...
      // update() {
      //     update.call(this);
      // }

      dispose() {
          let scope = this;
          scope.domElement.removeEventListener('contextmenu', onContextMenu, false);
          scope.domElement.removeEventListener('mousedown', onMouseDown, false);
          scope.domElement.removeEventListener('wheel', onMouseWheel, false);

          scope.domElement.removeEventListener('touchstart', onTouchStart, false);
          scope.domElement.removeEventListener('touchend', onTouchEnd, false);
          scope.domElement.removeEventListener('touchmove', onTouchMove, false);

          document.removeEventListener('mousemove', onMouseMove, false);
          document.removeEventListener('mouseup', onMouseUp, false);

          window.removeEventListener('keydown', onKeyDown, false);

          //scope.dispatchEvent( { type: 'dispose' } ); // should this be added here?
      }

  }

  function getAutoRotationAngle() {

      return 2 * Math.PI / 60 / 60 * this.autoRotateSpeed;
  }

  function getZoomScale() {

      return Math.pow(0.95, this.zoomSpeed);
  }

  function rotateLeft(angle) {

      this._sphericalDelta.theta -= angle;
  }

  function rotateUp(angle) {

      this._sphericalDelta.phi -= angle;
  }

  var panLeft = function () {

      var v = new Vector3$1();

      return function panLeft(distance, objectMatrix) {

          v.setFromMatrixColumn(objectMatrix, 0); // get X column of objectMatrix
          v.multiplyScalar(-distance);

          this._panOffset.add(v);
      };
  }();

  let panUp = function () {
      let v = new Vector3$1();

      return function panUp(distance, objectMatrix) {

          if (this.screenSpacePanning === true) {

              v.setFromMatrixColumn(objectMatrix, 1);
          } else {

              v.setFromMatrixColumn(objectMatrix, 0);
              v.crossVectors(this.object.up, v);
          }

          v.multiplyScalar(distance);

          this._panOffset.add(v);
      };
  }();

  // deltaX and deltaY are in pixels; right and down are positive
  var pan = function () {

      var offset = new Vector3$1();

      return function pan(deltaX, deltaY) {
          let scope = this;
          var element = scope.domElement === document ? scope.domElement.body : scope.domElement;

          if (scope.object.isPerspectiveCamera) {

              // perspective
              var position = scope.object.position;
              offset.copy(position).sub(scope.target);
              var targetDistance = offset.length();

              // half of the fov is center to top of screen
              targetDistance *= Math.tan(scope.object.fov / 2 * Math.PI / 180.0);

              // we use only clientHeight here so aspect ratio does not distort speed
              panLeft.call(scope, 2 * deltaX * targetDistance / element.clientHeight, scope.object.matrix);
              panUp.call(scope, 2 * deltaY * targetDistance / element.clientHeight, scope.object.matrix);
          } else if (scope.object.isOrthographicCamera) {

              // orthographic
              panLeft.call(scope, deltaX * (scope.object.right - scope.object.left) / scope.object.zoom / element.clientWidth, scope.object.matrix);
              panUp.call(scope, deltaY * (scope.object.top - scope.object.bottom) / scope.object.zoom / element.clientHeight, scope.object.matrix);
          } else {

              // camera neither orthographic nor perspective
              console.warn('WARNING: OrbitControls.js encountered an unknown camera type - pan disabled.');
              scope.enablePan = false;
          }
      };
  }();

  function dollyIn(dollyScale) {
      let scope = this;
      if (scope.object.isPerspectiveCamera) {

          scope._scale /= dollyScale;
      } else if (scope.object.isOrthographicCamera) {

          scope.object.zoom = Math.max(scope.minZoom, Math.min(scope.maxZoom, scope.object.zoom * dollyScale));
          scope.object.updateProjectionMatrix();
          scope._zoomChanged = true;
      } else {

          console.warn('WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.');
          scope.enableZoom = false;
      }
  }

  function dollyOut(dollyScale) {
      let scope = this;
      if (scope.object.isPerspectiveCamera) {

          scope._scale *= dollyScale;
      } else if (scope.object.isOrthographicCamera) {

          scope.object.zoom = Math.max(scope.minZoom, Math.min(scope.maxZoom, scope.object.zoom / dollyScale));
          scope.object.updateProjectionMatrix();
          scope._zoomChanged = true;
      } else {

          console.warn('WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.');
          scope.enableZoom = false;
      }
  }

  //
  // event callbacks - update the object state
  //

  function handleMouseDownRotate(event) {

      //console.log( 'handleMouseDownRotate' );

      this._rotateStart.set(event.clientX, event.clientY);
  }

  function handleMouseDownDolly(event) {

      //console.log( 'handleMouseDownDolly' );

      this._dollyStart.set(event.clientX, event.clientY);
  }

  function handleMouseDownPan(event) {

      //console.log( 'handleMouseDownPan' );

      this._panStart.set(event.clientX, event.clientY);
  }

  function handleMouseMoveRotate(event) {
      let scope = this;
      //console.log( 'handleMouseMoveRotate' );

      scope._rotateEnd.set(event.clientX, event.clientY);

      scope._rotateDelta.subVectors(scope._rotateEnd, scope._rotateStart).multiplyScalar(scope.rotateSpeed);

      var element = scope.domElement === document ? scope.domElement.body : scope.domElement;

      rotateLeft.call(scope, 2 * Math.PI * scope._rotateDelta.x / element.clientHeight); // yes, height

      rotateUp.call(scope, 2 * Math.PI * scope._rotateDelta.y / element.clientHeight);

      scope._rotateStart.copy(scope._rotateEnd);

      scope.update();
  }

  function handleMouseMoveDolly(event) {
      let scope = this;
      //console.log( 'handleMouseMoveDolly' );

      scope._dollyEnd.set(event.clientX, event.clientY);

      scope._dollyDelta.subVectors(scope._dollyEnd, scope._dollyStart);

      if (scope._dollyDelta.y > 0) {

          dollyIn.call(scope, getZoomScale.call(scope));
      } else if (scope._dollyDelta.y < 0) {

          dollyOut.call(scope, getZoomScale.call(scope));
      }

      scope._dollyStart.copy(scope._dollyEnd);

      scope.update();
  }

  function handleMouseMovePan(event) {
      let scope = this;
      //console.log( 'handleMouseMovePan' );

      scope._panEnd.set(event.clientX, event.clientY);

      scope._panDelta.subVectors(scope._panEnd, scope._panStart).multiplyScalar(scope.panSpeed);

      pan.call(scope, scope._panDelta.x, scope._panDelta.y);

      scope._panStart.copy(scope._panEnd);

      scope.update();
  }

  function handleMouseUp(event) {

      // console.log( 'handleMouseUp' );

  }

  function handleMouseWheel(event) {
      let scope = this;
      // console.log( 'handleMouseWheel' );

      if (event.deltaY < 0) {

          dollyOut.call(scope, getZoomScale.call(scope));
      } else if (event.deltaY > 0) {

          dollyIn.call(scope, getZoomScale.call(scope));
      }

      scope.update();
  }

  function handleKeyDown(event) {
      let scope = this;
      //console.log( 'handleKeyDown' );

      switch (event.keyCode) {

          case scope.keys.UP:
              pan.call(scope, 0, scope.keyPanSpeed);
              scope.update();
              break;

          case scope.keys.BOTTOM:
              pan.call(scope, 0, -scope.keyPanSpeed);
              scope.update();
              break;

          case scope.keys.LEFT:
              pan.call(scope, scope.keyPanSpeed, 0);
              scope.update();
              break;

          case scope.keys.RIGHT:
              pan.call(scope, -scope.keyPanSpeed, 0);
              scope.update();
              break;

      }
  }

  function handleTouchStartRotate(event) {

      //console.log( 'handleTouchStartRotate' );

      this._rotateStart.set(event.touches[0].pageX, event.touches[0].pageY);
  }

  function handleTouchStartDollyPan(event) {
      let scope = this;
      //console.log( 'handleTouchStartDollyPan' );

      if (scope.enableZoom) {

          var dx = event.touches[0].pageX - event.touches[1].pageX;
          var dy = event.touches[0].pageY - event.touches[1].pageY;

          var distance = Math.sqrt(dx * dx + dy * dy);

          scope._dollyStart.set(0, distance);
      }

      if (scope.enablePan) {

          var x = 0.5 * (event.touches[0].pageX + event.touches[1].pageX);
          var y = 0.5 * (event.touches[0].pageY + event.touches[1].pageY);

          scope._panStart.set(x, y);
      }
  }

  function handleTouchMoveRotate(event) {
      let scope = this;
      //console.log( 'handleTouchMoveRotate' );

      scope._rotateEnd.set(event.touches[0].pageX, event.touches[0].pageY);

      scope._rotateDelta.subVectors(scope._rotateEnd, scope._rotateStart).multiplyScalar(scope.rotateSpeed);

      var element = scope.domElement === document ? scope.domElement.body : scope.domElement;

      rotateLeft.call(scope, 2 * Math.PI * scope._rotateDelta.x / element.clientHeight); // yes, height

      rotateUp.call(scope, 2 * Math.PI * scope._rotateDelta.y / element.clientHeight);

      scope._rotateStart.copy(scope._rotateEnd);

      scope.update();
  }

  function handleTouchMoveDollyPan(event) {
      let scope = this;
      //console.log( 'handleTouchMoveDollyPan' );

      if (scope.enableZoom) {

          var dx = event.touches[0].pageX - event.touches[1].pageX;
          var dy = event.touches[0].pageY - event.touches[1].pageY;

          var distance = Math.sqrt(dx * dx + dy * dy);

          scope._dollyEnd.set(0, distance);

          scope._dollyDelta.set(0, Math.pow(scope._dollyEnd.y / scope._dollyStart.y, scope.zoomSpeed));

          dollyIn.call(scope, scope._dollyDelta.y);

          scope._dollyStart.copy(scope._dollyEnd);
      }

      if (scope.enablePan) {

          var x = 0.5 * (event.touches[0].pageX + event.touches[1].pageX);
          var y = 0.5 * (event.touches[0].pageY + event.touches[1].pageY);

          scope._panEnd.set(x, y);

          scope._panDelta.subVectors(scope._panEnd, scope._panStart).multiplyScalar(scope.panSpeed);

          pan.call(scope, scope._panDelta.x, panDelta.y);

          scope._panStart.copy(scope._panEnd);
      }

      scope.update();
  }

  function handleTouchEnd(event) {}

  //console.log( 'handleTouchEnd' );

  //
  // event handlers - FSM: listen for events and reset state
  //

  function onMouseDown(event) {
      let scope = this;

      if (scope.enabled === false) return;

      event.preventDefault();

      switch (event.button) {

          case scope.mouseButtons.ORBIT:

              if (scope.enableRotate === false) return;

              handleMouseDownRotate.call(scope, event);

              scope._state = STATE.ROTATE;

              break;

          case scope.mouseButtons.ZOOM:

              if (scope.enableZoom === false) return;

              handleMouseDownDolly.call(scope, event);

              scope._state = STATE.DOLLY;

              break;

          case scope.mouseButtons.PAN:

              if (scope.enablePan === false) return;

              handleMouseDownPan.call(scope, event);

              scope._state = STATE.PAN;

              break;

      }

      if (scope._state !== STATE.NONE) {

          document.addEventListener('mousemove', onMouseMove.bind(scope), false);
          document.addEventListener('mouseup', onMouseUp.bind(scope), false);

          scope.fire(startEvent);
      }
  }

  function onMouseMove(event) {

      let scope = this;

      if (scope.enabled === false) return;

      event.preventDefault();

      switch (scope._state) {

          case STATE.ROTATE:

              if (scope.enableRotate === false) return;

              handleMouseMoveRotate.call(scope, event);

              break;

          case STATE.DOLLY:

              if (scope.enableZoom === false) return;

              handleMouseMoveDolly.call(scope, event);

              break;

          case STATE.PAN:

              if (scope.enablePan === false) return;

              handleMouseMovePan.call(scope, event);

              break;

      }
  }

  function onMouseUp(event) {

      let scope = this;

      if (scope.enabled === false) return;

      handleMouseUp.call(scope, event);

      document.removeEventListener('mousemove', onMouseMove.bind(scope), false);
      document.removeEventListener('mouseup', onMouseUp.bind(scope), false);

      scope.fire(endEvent);

      scope._state = STATE.NONE;
  }

  function onMouseWheel(event) {

      let scope = this;

      if (scope.enabled === false || scope.enableZoom === false || scope._state !== STATE.NONE && scope._state !== STATE.ROTATE) return;

      event.preventDefault();
      event.stopPropagation();

      scope.fire(startEvent);

      handleMouseWheel.call(scope, event);

      scope.fire(endEvent);
  }

  function onKeyDown(event) {
      let scope = this;

      if (scope.enabled === false || scope.enableKeys === false || scope.enablePan === false) return;

      handleKeyDown.call(scope, event);
  }

  function onTouchStart(event) {

      let scope = this;
      if (scope.enabled === false) return;

      event.preventDefault();

      switch (event.touches.length) {

          case 1:
              // one-fingered touch: rotate

              if (scope.enableRotate === false) return;

              handleTouchStartRotate.call(scope, event);

              scope._state = STATE.TOUCH_ROTATE;

              break;

          case 2:
              // two-fingered touch: dolly-pan

              if (scope.enableZoom === false && scope.enablePan === false) return;

              handleTouchStartDollyPan.call(scope, event);

              scope._state = STATE.TOUCH_DOLLY_PAN;

              break;

          default:

              scope._state = STATE.NONE;

      }

      if (scope._state !== STATE.NONE) {

          scope.fire(startEvent);
      }
  }

  function onTouchMove(event) {

      let scope = this;

      if (scope.enabled === false) return;

      event.preventDefault();
      event.stopPropagation();

      switch (event.touches.length) {

          case 1:
              // one-fingered touch: rotate

              if (scope.enableRotate === false) return;
              if (scope._state !== STATE.TOUCH_ROTATE) return; // is this needed?

              handleTouchMoveRotate.call(scope, event);

              break;

          case 2:
              // two-fingered touch: dolly-pan

              if (scope.enableZoom === false && scope.enablePan === false) return;
              if (scope._state !== STATE.TOUCH_DOLLY_PAN) return; // is this needed?

              handleTouchMoveDollyPan.call(scope, event);

              break;

          default:

              scope._state = STATE.NONE;

      }
  }

  function onTouchEnd(event) {
      let scope = this;
      if (scope.enabled === false) return;

      handleTouchEnd.call(scope, event);

      scope.fire(endEvent);

      scope._state = STATE.NONE;
  }

  function onContextMenu(event) {
      let scope = this;
      if (scope.enabled === false) return;

      event.preventDefault();
  }

  let _cid = 0;
  class Chart3d extends Events {
      constructor(opt) {
          super();

          this.domSelector = opt.el;
          this.opt = opt.opts;
          this.data = opt.data;

          this.el = null;
          this.view = null;
          this.domView = null;
          this.stageView = null;
          this.canvasDom = null; //画布DOM元素


          this.width = 0; //画布的宽
          this.height = 0; //画布的高 

          this.renderer = null;
          this.renderView = null;
          this.app = null;
          this.currCoord = null;

          //初始化画布
          this._createDomContainer(opt.el);

          //初始化数据
          //不管传入的是data = [ ['xfield','yfield'] , ['2016', 111]]
          //还是 data = [ {xfiled, 2016, yfield: 1111} ]，这样的格式，
          //通过parse2MatrixData最终转换的是data = [ ['xfield','yfield'] , ['2016', 111]] 这样 chartx的数据格式
          //后面有些地方比如 一些graphs中会使用dataFrame.org，， 那么这个dataFrame.org和_data的区别是，
          //_data是全量数据， dataFrame.org是_data经过dataZoom运算过后的子集
          this._data = parse2MatrixData(opt.data);

          //三维引擎初始化
          this.app = new Application();

          //初始化渲染器
          this.renderer = this.app._framework.renderer;

          this.DefaultControls = {
              boxWidth: 1000, //空间中X的最大值(最大宽度)  
              boxHeight: 1000, //空间中Y的最大值(最大高度)  
              boxDepth: 1000, //空间中Z的最大值(最大深度)

              distance: 1100, //默认相机距离
              maxDistance: 3000, //最大相机距离
              minDistance: 600, //最小相机距离 
              minZoom: 0.2, //正交投影缩小的最小值
              maxZoom: 1.5, //正交投影放大的最大值

              alpha: 40, //绕X轴旋转
              beta: 20, //绕Y轴旋转
              gamma: 0 //绕Z轴旋转


              //组件管理机制,所有的组件都绘制在这个地方
          };this.components = [];

          this.inited = false;
          this.dataFrame = this._initData(this._data, opt.opts); //每个图表的数据集合 都 存放在dataFrame中。


          this.init();
      }
      init() {
          let me = this;
          let rendererOpts = _.extend({}, this.DefaultControls);
          this.opt.controls = this.opt.controls || {};
          let controlOpts = this.opt.controls = _.extend(rendererOpts, this.opt.controls);

          this._initRenderer(rendererOpts);

          let controls = this.orbitControls = new OrbitControls(this.renderView._camera, this.view);

          controls.minDistance = controlOpts.minDistance;
          controls.maxDistance = controlOpts.maxDistance;

          controls.minZoom = controlOpts.minZoom;
          controls.maxZoom = controlOpts.maxZoom;
          controls.enableDamping = true;
          controls.enablePan = false;
          controls.enableKeys = false;
          controls.autoRotate = true;
          controls.autoRotateSpeed = 1.0;

          //自动旋转时间
          window.setTimeout(() => {
              controls.autoRotate = false;
          }, 15000);

          //如果发生交互停止自动旋转
          controls.on('start', () => {
              controls.autoRotate = false;
          });
          //有交互开始渲染
          controls.on('change', () => {
              me.app._framework.isUpdate = true;
          });

          this.app._framework.on('renderbefore', () => {
              if (controls.position0.equals(controls.object.position) && controls.zoom0 === controls.object.zoom) {
                  return;
              }
              controls.saveState();
              controls.update();
          });

          //启动渲染进程
          this.app.launch();
          window.addEventListener('resize', this.resize.bind(this), false);
      }
      setCoord(_Coord) {

          //初始化物体的惯性坐标(放在具体的坐标系下)
          if (_Coord === InertialSystem || _Coord.prototype instanceof InertialSystem) {
              this.currCoord = new _Coord(this);
              this.rootStage.add(this.currCoord.group);
          }
          this.currCoord.initCoordUI();
      }
      //添加组件
      addComponent(cmp) {
          let idx = this.components.indexOf(cmp);
          if (idx !== -1) {
              this.components.splice(idx, 1);
          }

          if (cmp.prototype instanceof Component) {

              let instance = new cpm(this.currCoord);
              this.components.push(instance);
          }
      }

      drawComponent() {
          //先绘制坐标系
          this.currCoord.draw();

          this.components.forEach(cmp => {
              this.currCoord.group.add(cmp.group);
              cmp.draw();
          });
      }

      draw() {
          this.drawComponent();
          this.app._framework.isUpdate = true;
      }

      _createDomContainer(_domSelector) {

          let viewObj = null;

          this._cid = "chartx3d_" + _cid++;
          this.el = $.query(_domSelector);

          this.width = this.el.offsetWidth;
          this.height = this.el.offsetHeight;

          viewObj = $.createView(this.width, this.height, this._cid);

          this.view = viewObj.view;
          this.stageView = viewObj.stageView;
          this.domView = viewObj.domView;

          this.el.innerHTML = "";
          this.el.appendChild(this.view);

          this.id = "chartx_" + this._cid;
          this.el.setAttribute("chart_id", this.id);
          this.el.setAttribute("chartx3d_version", "1.0");
      }

      _initData(data, opt) {

          return DataFrame.call(this, data, opt);
      }

      _initRenderer(rendererOpts) {
          let app = this.app;
          let renderView = null;
          this.stageView.appendChild(this.renderer.domElement);

          this.canvasDom = this.renderer.domElement;

          if (app.view.length > 0) {
              //默认使用第0个view
              renderView = this.renderView = app.view[0];
          }

          this.rootStage = renderView.addGroup({ name: 'rootStage' });
          renderView.addObject(this.rootStage);
          renderView.setSize(this.width, this.height);
          // renderView.setBackground(0xFFFFFF);

          //默认透视投影
          this.renderView.project(rendererOpts, 'perspective'); //'ortho' | 'perspective',
      }
      resize() {
          this.width = this.el.offsetWidth;
          this.height = this.el.offsetHeight;
          this.renderView.resize(this.width, this.height, this.opt.controls.boxHeight);
      }
      //数据变更后调用reset
      reset() {}

      resetData() {}
      destroy() {}
  }

  class AxisLine extends Component {
      constructor(_coordSystem, opts) {
          super(_coordSystem);

          // enabled: 1,
          // lineWidth: 1,
          // strokeStyle: '#cccccc'


          //轴的起点
          this.origin = new Vector3$1(0, 0, 0);

          //轴的方向
          this.dir = new Vector3$1(1, 0, 0);

          //轴的长度
          this.length = 1;

          //轴线的宽带
          this.lineWidth = opts.lineWidth || 2;

          //轴线的颜色 (默认黑色)
          this.color = opts.strokeStyle;

          this.axis = null;

          this.group = this._root.renderView.addGroup({ name: 'axisLine' });

          //不可见    
          this.group.visible = !!opts.enabled;
      }

      defaultStyle() {
          //todo
      }

      setStyle() {
          //todo
      }

      setOrigin(pos) {
          this.origin.copy(pos);
      }
      getOrigin() {
          return this.origin.clone();
      }

      setDir(dir) {
          this.dir.copy(dir);
      }

      setLength(length) {

          this.length = length;
      }

      setGroupName(name) {
          this.group.name = name;
      }

      drawStart() {
          this.axis = this._root.renderView.createLine(this.origin, this.dir, this.length, this.lineWidth, this.color);
      }

      draw() {

          this.group.add(this.axis);
      }
      dispose() {
          let remove = [];
          this.group.traverse(obj => {
              if (obj.isLine2) {
                  if (obj.geometry) {
                      obj.geometry.dispose();
                  }
                  if (obj.material) {
                      obj.material.dispose();
                  }
                  remove.push(obj);
              }
          });
          while (remove.length) {
              let obj = remove.pop();
              obj.parent.remove(obj);
          }
      }

      // getBoundBox() {
      //     let result = new Box3();

      //     this.axis.traverse(function (mesh) {
      //         if (mesh instanceof Mesh) {
      //             mesh.geometry.computeBoundingBox();
      //             result = mesh.geometry.boundingBox;
      //         }
      //     });

      //     //根据绘制的线宽计算三维空间的宽带

      //     let visableSize = this._root.renderView.getVisableSize();
      //     let width = 0, height = 0;
      //     //如果是y轴或者z轴计算轴的宽度
      //     if (this.dir.equals(new Vector3(0, 1, 0)) || this.dir.equals(new Vector3(0, 0, -1))) {
      //         width = visableSize.width / this._root.width
      //     }
      //     //如果x轴计算轴的高度
      //     if (this.dir.equals(new Vector3(1, 0, 0))) {
      //         height = visableSize.height / this._root.height;
      //     }

      //     result.min.x = result.min.x - width * 0.5;
      //     result.max.x = result.max.x + width * 0.5;

      //     result.min.y = result.min.y - height * 0.5;
      //     result.max.y = result.max.y + height * 0.5;

      //     return result;
      // }

  }

  // this.tickLine = {//刻度线
  //     enabled: 1,
  //     lineWidth: 1, //线宽
  //     lineLength: 4, //线长
  //     strokeStyle: '#cccccc',
  //     // distance: 2,
  //     offset: 2,
  // };


  class TickLines extends Component {
      constructor(_coordSystem, opts) {
          super(_coordSystem);

          //点的起点位置集合
          this.origins = [];

          //刻度线的绘制方向
          this.dir = new Vector3$1();

          //刻度线的宽带
          this.lineWidth = opts.lineWidth;

          //刻度线的长度
          //todo 轴线的长度是个数组 通过像素值转换
          this.length = opts.lineLength;

          this.color = opts.strokeStyle;

          this.offset = opts.offset;

          this._tickLine = null;

          this.group = this._root.renderView.addGroup({ name: 'tickLine' });

          this.group.visible = !!opts.enabled;
      }
      initData(axis, attribute, fn) {
          let me = this;
          let _dir = new Vector3$1();
          let _offset = _dir.copy(me.dir).multiplyScalar(this._offset);
          this.origins = [];
          attribute.section.forEach((num, index) => {
              //起点
              let val = fn.call(this._coordSystem, num);
              let startPoint = axis.dir.clone().multiplyScalar(val);
              startPoint.add(axis.origin);
              startPoint.add(_offset);
              me.origins.push(startPoint);
          });
      }
      set length(len) {
          let ratio = this._coordSystem.getRatioPixelToWorldByOrigin();
          this._length = len * ratio;
      }
      get length() {
          return this._length;
      }

      set offset(_offset) {
          let ratio = this._coordSystem.getRatioPixelToWorldByOrigin();
          this._offset = _offset * ratio;
      }

      get offset() {
          return this._offset;
      }

      setDir(dir) {
          this.dir = dir;
      }
      drawStart() {
          this._tickLine = this._root.renderView.createLine(this.origins, this.dir, this._length, this.lineWidth, this.color);
      }

      draw() {
          this.group.add(this._tickLine);
      }

      // getBoundBox() {
      //     let result = new Box3();
      //     result.makeEmpty();
      //     this._tickLine.traverse(function (mesh) {
      //         if (mesh instanceof Mesh) {
      //             mesh.geometry.computeBoundingBox();
      //             result.expandByPoint(mesh.geometry.boundingBox.min);
      //             result.expandByPoint(mesh.geometry.boundingBox.max);
      //         }
      //     });

      //     return result;
      // }
      dispose() {
          let remove = [];
          this.group.traverse(obj => {
              if (obj.isLine2) {
                  if (obj.geometry) {
                      obj.geometry.dispose();
                  }
                  if (obj.material) {
                      obj.material.dispose();
                  }
                  remove.push(obj);
              }
          });
          while (remove.length) {
              let obj = remove.pop();
              obj.parent.remove(obj);
          }
      }
  }

  // {
  //     enabled: 1,
  //     fontColor: '#999',
  //     fontSize: 16,
  //     format: null,
  //     rotation: 0,
  //     textAlign: null,//"right",
  //     lineHeight: 1,
  //     offset: 2     //和刻度线的距离
  // }
  class TickTexts extends Component {
      constructor(_coordSystem, opts) {
          super(_coordSystem);

          //起点位置集合
          this.origins = [];
          this.texts = [];

          this.fontColor = opts.fontColor || '#333';

          this.fontSize = opts.fontSize || 12;

          this.rotation = 0;

          this.textAlign = opts.textAlign;

          this.dir = new Vector3$1();

          this.offset = opts.offset;

          this._tickTextGroup = null;

          this.group = this._root.renderView.addGroup({ name: 'tickText' });

          this._tickTextGroup = this._root.renderView.addGroup({ name: 'tickTexts' });

          this.group.visible = !!opts.enabled;
          this.group.add(this._tickTextGroup);
      }

      // initData(axis, attribute) {
      //     let me = this;
      //     let _dir = new Vector3();
      //     let axisSectionLength = axis.length / (attribute.section.length - 1);
      //     let _offset = _dir.copy(me.dir).multiplyScalar(this._offset);

      //     attribute.section.forEach((num, index) => {
      //         //起点
      //         let startPoint = new Vector3();
      //         startPoint.copy(axis.dir);
      //         startPoint.multiplyScalar(axisSectionLength * index);
      //         startPoint.add(axis.origin);
      //         startPoint.add(_offset);
      //         me.origins.push(startPoint);
      //     });


      // }


      initData(axis, attribute, fn) {
          let me = this;
          let _dir = new Vector3$1();
          let _offset = _dir.copy(me.dir).multiplyScalar(this._offset);
          this.origins = [];

          attribute.section.forEach((num, index) => {
              //起点
              let val = fn.call(this._coordSystem, num);
              let startPoint = axis.dir.clone().multiplyScalar(val);
              startPoint.add(axis.origin);
              startPoint.add(_offset);
              me.origins.push(startPoint);
          });
      }

      set offset(_offset) {
          let ratio = this._coordSystem.getRatioPixelToWorldByOrigin();
          this._offset = _offset * ratio;
      }

      get offset() {
          return this._offset;
      }
      setDir(dir) {
          this.dir = dir;
      }
      drawStart(texts) {
          let me = this;

          // this._tickTextGroup.removeAll();
          //文本对齐计算
          let ratio = this._root.renderView.getVisableSize(me.origins[0]).ratio;
          let maxWidth = TextTexture.getTextWidth(texts, ['normal', 'normal', this.fontColor, this.fontSize].join(' '));

          (texts || []).forEach((text, index) => {
              let width = TextTexture.getTextWidth([text], ['normal', 'normal', me.fontColor, me.fontSize].join(' '));
              let obj = me._root.renderView.createTextSprite(text.toString(), me.fontSize, me.fontColor);
              obj.position.copy(me.origins[index]);
              if (me.textAlign == 'right') {
                  obj.position.add(new Vector3$1((maxWidth - width) * ratio / 2, 0, 0));
              }
              if (me.textAlign == 'left') {
                  obj.position.add(new Vector3$1(-(maxWidth - width) * ratio / 2, 0, 0));
              }
              me._tickTextGroup.add(obj);
          });
          //todo:通过计算最长文本在三维空间中的位置
          // this._tickTexts = this._root.renderView.creatSpriteText(this.texts, this.origins)
      }
      draw() {

          this.group.add(this._tickTextGroup);
      }
      // getBoundBox() {
      //     //todo 需要重构底层绘图引擎的Sprite的绘制,将Geometry转移到Sprite类中
      //     //没有计算文本旋转后的长度
      //     let result = new Box3();
      //     result.makeEmpty();
      //     this._tickTexts.traverse(function (sprite) {
      //         if (sprite instanceof Sprite) {
      //             let min = new Vector3();
      //             let max = new Vector3();
      //             let halfScale = new Vector3();
      //             halfScale.copy(sprite.scale);
      //             halfScale.multiplyScalar(0.5);
      //             min.copy(sprite.position);
      //             max.copy(sprite.position);

      //             min.sub(halfScale);
      //             max.add(halfScale);

      //             result.expandByPoint(min);
      //             result.expandByPoint(max);
      //         }
      //     });
      //     return result;
      // }
      dispose() {
          //todo sprite重构
          let remove = [];
          this.group.traverse(obj => {
              if (obj.isTextSprite) {
                  if (obj.geometry) {
                      obj.geometry.dispose();
                  }
                  if (obj.material) {
                      obj.material.dispose();
                      if (obj.material.map) {
                          obj.material.map.dispose();
                      }
                  }
                  remove.push(obj);
              }
          });
          while (remove.length) {
              let obj = remove.pop();
              obj.parent.remove(obj);
          }
      }

  }

  class YAxis extends Component {
      constructor(_cartesionUI) {
          super(_cartesionUI._coordSystem);
          let opt = this._opt = _cartesionUI;

          //this._coord = _coord || {};
          this._cartesionUI = _cartesionUI;

          this.width = null; //第一次计算后就会有值
          this.yMaxHeight = 0; //y轴最大高
          this.height = 0; //y轴第一条线到原点的高

          this.maxW = 0; //最大文本的 width
          this.field = []; //这个 轴 上面的 field 不需要主动配置。可以从graphs中拿

          this.title = {
              content: "",
              shapeType: "text",
              fontColor: '#999',
              fontSize: 12,
              offset: 2,
              textAlign: "center",
              textBaseline: "middle",
              strokeStyle: null,
              lineHeight: 0
          };
          this._title = null; //this.label对应的文本对象

          this.enabled = true;
          this.tickLine = { //刻度线
              enabled: 1,
              lineWidth: 1, //线宽
              lineLength: 4, //线长
              strokeStyle: '#cccccc',
              // distance: 2,
              offset: 0
          };
          this.axisLine = { //轴线
              enabled: 1,
              lineWidth: 2,
              strokeStyle: '#cccccc'
          };
          this.label = {
              enabled: 1,
              fontColor: '#999',
              fontSize: 12,
              format: null,
              rotation: 0,
              textAlign: "right",
              lineHeight: 1,
              offset: 2 //和刻度线的距离
          };

          if (opt.isH && (!opt.label || opt.label.rotaion === undefined)) {
              //如果是横向直角坐标系图
              this.label.rotation = 90;
          }
          this.pos = {
              x: 0,
              y: 0
          };
          this.align = "left"; //yAxis轴默认是再左边，但是再双轴的情况下，可能会right

          this.layoutData = []; //dataSection 对应的layout数据{y:-100, value:'1000'}
          this.dataSection = []; //从原数据 dataOrg 中 结果 datasection 重新计算后的数据
          this.waterLine = null; //水位data，需要混入 计算 dataSection， 如果有设置waterLineData， dataSection的最高水位不会低于这个值

          //默认的 dataSectionGroup = [ dataSection ], dataSection 其实就是 dataSectionGroup 去重后的一维版本
          this.dataSectionGroup = [];

          //如果middleweight有设置的话 dataSectionGroup 为被middleweight分割出来的n个数组>..[ [0,50 , 100],[100,500,1000] ]
          this.middleweight = null;

          this.dataOrg = data.org || []; //源数据

          this.group = null;

          this.baseNumber = null; //默认为0，如果dataSection最小值小于0，则baseNumber为最小值，如果dataSection最大值大于0，则baseNumber为最大值
          this.basePoint = null; //value为 baseNumber 的point {x,y}
          this.min = null;
          this.max = null; //后面加的，目前还没用

          this._yOriginTrans = 0; //当设置的 baseNumber 和datasection的min不同的时候，


          //过滤器，可以用来过滤哪些yaxis 的 节点是否显示已经颜色之类的
          //@params params包括 dataSection , 索引index，txt(canvax element) ，line(canvax element) 等属性
          this.filter = null; //function(params){}; 

          this.isH = false; //是否横向

          this.animation = false;

          this.sort = null; //"asc" //排序，默认从小到大, desc为从大到小，之所以不设置默认值为asc，是要用null来判断用户是否进行了配置

          this.layoutType = "proportion"; // rule , peak, proportion

          _.extend(true, this, opt.yAxis);

          this.init(opt, this._coordSystem.yAxisAttribute);

          this._getName();
      }

      init(opt, data) {
          let me = this;
          //extend会设置好this.field
          //先要矫正子啊field确保一定是个array
          if (!_.isArray(this.field)) {
              this.field = [this.field];
          }
          this._initData(data);

          this.group = this._root.renderView.addGroup({ name: 'yAxisLeft' });

          this._root.orbitControls.on('change', () => {

              me._initModules();
          });
          me._initModules();
      }
      _initModules() {
          if (!this.enabled) return;
          const _axisDir = new Vector3$1(0, 1, 0);
          const _coordSystem = this._coordSystem;
          let coordBoundBox = _coordSystem.getBoundbox();
          let _size = new Vector3$1(); //空间盒子的大小
          coordBoundBox.getSize(_size);
          let {
              x: width,
              y: height,
              z: depth
          } = _size;
          let origin = _coordSystem.getOrigin();
          let _tickLineDir = new Vector3$1(0, 0, 1);
          let _faceInfo = this._cartesionUI.getFaceInfo();

          if (_faceInfo.left.visible) {
              if (_faceInfo.back.visible) {
                  origin = _coordSystem.getOrigin();
                  _tickLineDir = new Vector3$1(0, 0, 1);
              } else {
                  origin = new Vector3$1(0, 0, -depth);
                  _tickLineDir = new Vector3$1(0, 0, -1);
              }
          } else {
              if (_faceInfo.back.visible) {
                  origin = new Vector3$1(width, 0, 0);
                  _tickLineDir = new Vector3$1(0, 0, 1);
              } else {
                  origin = new Vector3$1(width, 0, -depth);
                  _tickLineDir = new Vector3$1(0, 0, -1);
              }
          }

          if (this._axisLine) {
              if (this._axisLine.getOrigin().equals(origin)) {
                  return;
              }
              this._axisLine.dispose();
              this._axisLine.setOrigin(origin);
              this._axisLine.drawStart();
              this._axisLine.draw();

              //二次绘制
              this._tickLine.dispose();
              this._tickLine.setDir(_tickLineDir);
              this._tickLine.initData(this._axisLine, _coordSystem.yAxisAttribute, _coordSystem.getYAxisPosition);
              this._tickLine.drawStart();
              this._tickLine.draw();

              this._tickText.dispose();

              this._tickText.setDir(_tickLineDir);
              this._tickText.initData(this._axisLine, _coordSystem.yAxisAttribute, _coordSystem.getYAxisPosition);

              this._tickText.drawStart(this._formatTextSection);
              this._tickText.draw();
          } else {
              //初始化轴线
              this._axisLine = new AxisLine(_coordSystem, this.axisLine);
              this._axisLine.setDir(_axisDir);
              this._axisLine.setOrigin(origin);
              this._axisLine.setLength(coordBoundBox.max.y);
              this._axisLine.setGroupName('yAxisLine');
              this._axisLine.drawStart();

              this.group.add(this._axisLine.group);

              //初始化tickLine

              this._tickLine = new TickLines(_coordSystem, this.tickLine);
              this._tickLine.setDir(_tickLineDir);
              this._tickLine.initData(this._axisLine, _coordSystem.yAxisAttribute, _coordSystem.getYAxisPosition);
              this._tickLine.drawStart();
              this.group.add(this._tickLine.group);

              // 初始化tickText
              this._tickText = new TickTexts(_coordSystem, this.label);
              this._tickText.offset = this.label.offset + this.axisLine.lineWidth + this.tickLine.lineWidth + this.tickLine.offset + this._maxTextWidth / 2;

              this._tickText.setDir(_tickLineDir);
              this._tickText.initData(this._axisLine, _coordSystem.yAxisAttribute, _coordSystem.getYAxisPosition);

              this._tickText.drawStart(this._formatTextSection);
              this.group.add(this._tickText.group);
          }
      }
      updateAxis() {
          //这里可能需要重构
          //todo 根据相机移动计算tickLine & tickText的位置 
      }
      _getName() {}
      _initData(data) {
          var me = this;

          //如果用户传入了自定义的dataSection， 那么优先级最高
          if (!this._opt.dataSection) {

              this.dataSection = data.section;
          } else {
              this.dataSection = this._opt.dataSection;
          }
          //如果还是0
          if (this.dataSection.length == 0) {
              this.dataSection = [0];
          }
          // if( _.min(this.dataSection) < this._opt.min ){
          //     var minDiss = me._opt.min - _.min(me.dataSection);
          //     //如果用户有硬性要求min，而且计算出来的dataSection还是比min小的话
          //     _.each( this.dataSection, function( num, i ){
          //         me.dataSection[i] += minDiss;
          //     } );
          // };

          //如果有 middleweight 设置，就会重新设置dataSectionGroup
          this.dataSectionGroup = [_.clone(this.dataSection)];

          // this._sort();
          // this._setBottomAndBaseNumber();

          // this._middleweight(); //如果有middleweight配置，需要根据配置来重新矫正下datasection

          me._formatTextSection = [];
          me._textElements = [];
          _.each(me.dataSection, function (val, i) {
              me._formatTextSection[i] = me._getFormatText(val, i);
              //从_formatTextSection中取出对应的格式化后的文本

              // var txt = me._root.renderView.createTextSprite("" + me._formatTextSection[i], me.label.fontSize,me.label.fontColor)

              // // var txt = new Canvax.Display.Text(me._formatTextSection[i], {
              // //     context: {
              // //         fontSize: me.label.fontSize
              // //     }
              // // });

              // me._textElements[i] = txt;
          });

          if (this.label.rotation != 0) {
              //如果是旋转的文本，那么以右边为旋转中心点
              this.label.textAlign = "right";
          }
          //取第一个数据来判断xaxis的刻度值类型是否为 number
          !("minVal" in this._opt) && (this.minVal = _.min(this.dataSection));
          if (isNaN(this.minVal) || this.minVal == Infinity) {
              this.minVal = 0;
          }        !("maxVal" in this._opt) && (this.maxVal = _.max(this.dataSection));
          if (isNaN(this.maxVal) || this.maxVal == Infinity) {
              this.maxVal = 1;
          }
          this._getName();

          this._setYAxisWidth();
      }

      _getFormatText(val, i) {
          var res;
          if (_.isFunction(this.label.format)) {
              res = this.label.format.apply(this, arguments);
          } else {
              res = val;
          }

          if (_.isArray(res)) {
              res = numAddSymbol(res);
          }
          if (!res) {
              res = val;
          }        return res;
      }

      //设置布局
      setLayout(opt) {}

      draw() {
          //this._initModules();
          if (!this.enabled) return;
          this._axisLine.draw();
          this._tickLine.draw();
          this._tickText.draw();
          console.log('y axis 100 pos: ', this._root.currCoord.getYAxisPosition(100));
      }

      getBoundbox() {
          let result = new Box3();

          //轴线的boundBox
          let _axisLineBoundBox = this.axisLine.getBoundBox();

          //刻度线的boundBox
          let tickLineBoundBox = this.tickLine.getBoundBox();

          //刻度文本的boundBox
          let _axisTextBoundBox = this.tickText.getBoundBox();

          result.union(_axisLineBoundBox);
          result.union(tickLineBoundBox);
          result.union(_axisTextBoundBox);

          return result;
      }
      _setYAxisWidth() {
          //检测下文字的宽度
          var me = this;
          const _coordSystem = me._coordSystem;
          if (!me.enabled) {
              me.width = 0;
          } else {
              var _maxTextWidth = 0;

              if (this.label.enabled) {

                  //me._formatTextSection.forEach((val)=>{
                  let width = TextTexture.getTextWidth(me._formatTextSection, ['normal', 'normal', this.label.fontColor, this.label.fontSize].join(' '));
                  _maxTextWidth = Math.max(_maxTextWidth, width);
                  //})
                  // _.each(me.dataSection, function (val, i) {

                  //     //从_formatTextSection中取出对应的格式化后的文本
                  //     let txt = me._textElements[i];
                  //     let scale = me._root.renderView.getObjectScale(txt);

                  //     let textWidth = scale.x;
                  //     let textHeight = scale.y;

                  //     let width = textWidth; //文本在外接矩形width
                  //     let height = textHeight;//文本在外接矩形height

                  //     if (!!me.label.rotation) {
                  //         //有设置旋转
                  //         if (me.label.rotation == 90) {
                  //             width = textHeight;
                  //             height = textWidth;
                  //         } else {
                  //             let sinR = Math.sin(Math.abs(me.label.rotation) * Math.PI / 180);
                  //             let cosR = Math.cos(Math.abs(me.label.rotation) * Math.PI / 180);
                  //             height = parseInt(sinR * textWidth);
                  //             width = parseInt(cosR * textWidth);
                  //         };
                  //     };

                  //     _maxTextWidth = Math.max(_maxTextWidth, width);
                  //     console.log('width',width);
                  // });
              }
              //这里的计算宽度流出需要考虑一下
              this._maxTextWidth = _maxTextWidth;
              let ratio = _coordSystem.getRatioPixelToWorldByOrigin();
              this.width = (_maxTextWidth + this.tickLine.lineLength + this.tickLine.offset + this.label.offset + this.axisLine.lineWidth) * ratio;
              //this.width+=10;
              // if (this._title) {
              //     this.height += this._title.getTextHeight()
              // };
          }
      }

  }

  class XAxis extends Component {
      constructor(_cartesionUI) {
          super(_cartesionUI._coordSystem);
          let opt = this._opt = _cartesionUI;

          this._cartesionUI = _cartesionUI;
          this.width = 0;
          this.height = 0;

          this.title = {
              content: "",
              shapeType: "text",
              fontColor: '#999',
              fontSize: 12,
              offset: 2,
              textAlign: "center",
              textBaseline: "middle",
              strokeStyle: null,
              lineHeight: 0
          };
          this._title = null; //this.title对应的文本对象

          this.enabled = true;
          this.axisLine = {
              enabled: 1, //是否有轴线
              lineWidth: 2,
              strokeStyle: '#cccccc'
          };

          this.tickLine = {
              enabled: 1, //是否有刻度线
              lineWidth: 1, //线宽
              lineLength: 4, //线长
              offset: 2,
              strokeStyle: '#cccccc'
          };

          this.label = {
              enabled: 1,
              fontColor: '#999',
              fontSize: 12,
              rotation: 0,
              format: null,
              offset: 2,
              textAlign: "center",
              lineHeight: 1,
              evade: true //是否开启逃避检测，目前的逃避只是隐藏
          };
          if (opt.isH && (!opt.label || opt.label.rotaion === undefined)) {
              //如果是横向直角坐标系图
              this.label.rotation = 90;
          }
          this.maxTxtH = 0;

          this.pos = {
              x: 0,
              y: 0
          };

          this.dataOrg = []; //源数据
          this.dataSection = []; //默认就等于源数据,也可以用户自定义传入来指定

          this.layoutData = []; //{x:100, value:'1000',visible:true}

          this.sprite = null;

          //过滤器，可以用来过滤哪些yaxis 的 节点是否显示已经颜色之类的
          //@params params包括 dataSection , 索引index，txt(canvax element) ，line(canvax element) 等属性
          this.filter = null; //function(params){}; 

          this.isH = false; //是否为横向转向的x轴

          this.animation = false;

          //layoutType == "proportion"的时候才有效
          this.maxVal = null;
          this.minVal = null;

          this.ceilWidth = 0; //x方向一维均分长度, layoutType == peak 的时候要用到

          this.layoutType = "rule"; // rule（均分，起点在0） , peak（均分，起点在均分单位的中心）, proportion（实际数据真实位置，数据一定是number）

          //如果用户有手动的 trimLayout ，那么就全部visible为true，然后调用用户自己的过滤程序
          //trimLayout就事把arr种的每个元素的visible设置为true和false的过程
          //function
          this.trimLayout = null;

          this.posParseToInt = false; //比如在柱状图中，有得时候需要高精度的能间隔1px的柱子，那么x轴的计算也必须要都是整除的

          _.extend(true, this, opt.xAxis);

          this.init(opt, this._coordSystem.xAxisAttribute);
          //xAxis的field只有一个值,
          //this.field = _.flatten([this._coord.xAxisAttribute.field])[0];

      }
      init(opt, data) {
          let me = this;
          this.group = this._root.renderView.addGroup({ name: 'xAxis' });

          // this.rulesGroup = this._root.renderView.addGroup({ name: 'rulesSprite' });

          // this.group.add(this.rulesGroup);

          this._initHandle(data);

          this._root.orbitControls.on('change', () => {
              me._initModules();
          });
          me._initModules();
      }
      _initHandle(data) {
          var me = this;

          if (data && data.field) {
              this.field = data.field;
          }

          if (data && data.data) {
              this.dataOrg = _.flatten(data.data);
          }        if (!this._opt.dataSection && this.dataOrg) {
              //如果没有传入指定的dataSection，才需要计算dataSection
              this.dataSection = data.section; // this._initDataSection(this.dataOrg);
          }
          me._formatTextSection = [];
          me._textElements = [];
          _.each(me.dataSection, function (val, i) {
              me._formatTextSection[i] = me._getFormatText(val, i);
              //从_formatTextSection中取出对应的格式化后的文本

              // var txt = me._root.renderView.createTextSprite(""+me._formatTextSection[i],me.label.fontSize)

              // // var txt = new Canvax.Display.Text(me._formatTextSection[i], {
              // //     context: {
              // //         fontSize: me.label.fontSize
              // //     }
              // // });

              // me._textElements[i] = txt;
          });

          if (this.label.rotation != 0) {
              //如果是旋转的文本，那么以右边为旋转中心点
              this.label.textAlign = "right";
          }
          //取第一个数据来判断xaxis的刻度值类型是否为 number
          !("minVal" in this._opt) && (this.minVal = _.min(this.dataSection));
          if (isNaN(this.minVal) || this.minVal == Infinity) {
              this.minVal = 0;
          }        !("maxVal" in this._opt) && (this.maxVal = _.max(this.dataSection));
          if (isNaN(this.maxVal) || this.maxVal == Infinity) {
              this.maxVal = 1;
          }
          this._getName();

          this._setXAxisHeight();
      }
      _getFormatText(val, i) {
          var res;
          if (_.isFunction(this.label.format)) {
              res = this.label.format.apply(this, arguments);
          } else {
              res = val;
          }

          if (_.isArray(res)) {
              res = numAddSymbol(res);
          }
          if (!res) {
              res = val;
          }        return res;
      }
      _initModules() {
          //初始化轴线
          const _axisDir = new Vector3$1(1, 0, 0);
          const _coordSystem = this._coordSystem;
          let coordBoundBox = _coordSystem.getBoundbox();

          let _size = new Vector3$1(); //空间盒子的大小
          coordBoundBox.getSize(_size);
          let {
              x: width,
              y: height,
              z: depth
          } = _size;
          let origin = _coordSystem.getOrigin();
          let _tickLineDir = new Vector3$1(0, 0, 1);
          let _faceInfo = this._cartesionUI.getFaceInfo();

          if (_faceInfo.bottom.visible) {
              if (_faceInfo.back.visible) {
                  origin = _coordSystem.getOrigin();
                  _tickLineDir = new Vector3$1(0, 0, 1);
              } else {
                  origin = new Vector3$1(0, 0, -depth);
                  _tickLineDir = new Vector3$1(0, 0, -1);
              }
          } else {
              //top 可见
              if (_faceInfo.back.visible) {
                  origin = new Vector3$1(0, height, 0);
                  _tickLineDir = new Vector3$1(0, 0, 1);
              } else {
                  origin = new Vector3$1(0, height, -depth);
                  _tickLineDir = new Vector3$1(0, 0, -1);
              }
          }

          if (this._axisLine) {
              if (this._axisLine.getOrigin().equals(origin)) {
                  return;
              }
              this._axisLine.dispose();
              this._axisLine.setOrigin(origin);
              this._axisLine.drawStart();
              this._axisLine.draw();

              //二次绘制
              this._tickLine.dispose();
              this._tickLine.setDir(_tickLineDir);
              this._tickLine.initData(this._axisLine, _coordSystem.xAxisAttribute, _coordSystem.getXAxisPosition);
              this._tickLine.drawStart();
              this._tickLine.draw();

              this._tickText.dispose();

              this._tickText.setDir(_tickLineDir);
              this._tickText.initData(this._axisLine, _coordSystem.xAxisAttribute, _coordSystem.getXAxisPosition);

              this._tickText.drawStart(this._formatTextSection);
              this._tickText.draw();
          } else {

              this._axisLine = new AxisLine(_coordSystem, this.axisLine);
              this._axisLine.setDir(_axisDir);
              this._axisLine.setOrigin(origin);
              this._axisLine.setLength(coordBoundBox.max.x);
              this._axisLine.setGroupName('xAxisLine');
              this._axisLine.drawStart();

              this.group.add(this._axisLine.group);

              //初始化tickLine
              this._tickLine = new TickLines(_coordSystem, this.tickLine);
              this._tickLine.setDir(_tickLineDir);
              this._tickLine.initData(this._axisLine, _coordSystem.xAxisAttribute, _coordSystem.getXAxisPosition);
              this._tickLine.drawStart();

              this.group.add(this._tickLine.group);

              //初始化tickText
              this._tickText = new TickTexts(_coordSystem, this.label);
              this._tickText.offset = this.label.offset + this.axisLine.lineWidth + this.tickLine.lineWidth + this.tickLine.offset + 10;

              this._tickText.setDir(_tickLineDir);
              this._tickText.initData(this._axisLine, _coordSystem.xAxisAttribute, _coordSystem.getXAxisPosition);

              //this._tickText.initData(this._axisLine, _coordSystem.xAxisAttribute);
              this._tickText.drawStart(this._formatTextSection);
              this.group.add(this._tickText.group);
          }
      }
      _getName() {
          // if ( this.title.content ) {
          //     if( !this._title ){
          //         this._title = new Canvax.Display.Text(this.title.content, {
          //             context: {
          //                 fontSize: this.title.fontSize,
          //                 textAlign: this.title.textAlign,  //"center",//this.isH ? "center" : "left",
          //                 textBaseline: this.title.textBaseline,//"middle", //this.isH ? "top" : "middle",
          //                 fillStyle: this.title.fontColor,
          //                 strokeStyle: this.title.strokeStyle,
          //                 lineWidth : this.title.lineWidth,
          //                 rotation: this.isH ? -180 : 0
          //             }
          //         });
          //     } else {
          //         this._title.resetText( this.title.content );
          //     }
          // }
      }

      updateAxis() {
          //这里可能需要重构
          //todo 根据相机移动计算tickLine & tickText的位置 
      }

      _setXAxisHeight() {
          //检测下文字的高等
          var me = this;
          const _coordSystem = me._coordSystem;
          if (!me.enabled) {
              me.height = 0;
          } else {
              var _maxTextHeight = 0;

              if (this.label.enabled) {
                  let height = this.label.fontSize * 1.2;
                  _maxTextHeight = Math.max(_maxTextHeight, height);
              }
              let ratio = _coordSystem.getRatioPixelToWorldByOrigin();
              this.height = (_maxTextHeight + this.tickLine.lineLength + this.tickLine.offset + this.label.offset + this.axisLine.lineWidth) * ratio;
              this._maxTextHeight = _maxTextHeight;
              // if (this._title) {
              //     this.height += this._title.getTextHeight()
              // };
          }
      }
      //设置布局
      setLayout(opt) {}
      draw() {

          this._axisLine.draw();
          this._tickLine.draw();
          this._tickText.draw();

          //console.log('x axis 2 pos: ',this._root.currCoord.getXAxisPosition(2));

      }
  }

  class ZAxis extends Component {
      constructor(_cartesionUI) {
          super(_cartesionUI._coordSystem);
          let opt = this._opt = _cartesionUI;
          this._cartesionUI = _cartesionUI;
          //this._coord = _coord || {};

          this.width = 0;
          this.height = 0;

          this.title = {
              content: "",
              shapeType: "text",
              fontColor: '#999',
              fontSize: 12,
              offset: 2,
              textAlign: "center",
              textBaseline: "middle",
              strokeStyle: null,
              lineHeight: 0
          };
          this._title = null; //this.title对应的文本对象

          this.enabled = true;
          this.tickLine = {
              enabled: 1, //是否有刻度线
              lineWidth: 1, //线宽
              lineLength: 4, //线长
              offset: 2,
              strokeStyle: '#cccccc'
          };
          this.axisLine = {
              enabled: 1, //是否有轴线
              lineWidth: 2,
              strokeStyle: '#cccccc'
          };
          this.label = {
              enabled: 1,
              fontColor: '#999',
              fontSize: 12,
              rotation: 0,
              format: null,
              offset: 8,
              textAlign: "left",
              lineHeight: 1
              //  evade: true  //是否开启逃避检测，目前的逃避只是隐藏
          };
          if (opt.isH && (!opt.label || opt.label.rotaion === undefined)) {
              //如果是横向直角坐标系图
              this.label.rotation = 90;
          }
          // this.depth = 500;
          this.maxTxtH = 0;

          this.pos = {
              x: 0,
              y: 0
          };

          this.dataOrg = []; //源数据
          this.dataSection = []; //默认就等于源数据,也可以用户自定义传入来指定

          this.layoutData = []; //{x:100, value:'1000',visible:true}

          this.sprite = null;

          //过滤器，可以用来过滤哪些yaxis 的 节点是否显示已经颜色之类的
          //@params params包括 dataSection , 索引index，txt(canvax element) ，line(canvax element) 等属性
          this.filter = null; //function(params){}; 

          this.isH = false; //是否为横向转向的x轴

          this.animation = false;

          //layoutType == "proportion"的时候才有效
          this.maxVal = null;
          this.minVal = null;

          this.ceilWidth = 0; //x方向一维均分长度, layoutType == peak 的时候要用到

          this.layoutType = "peak"; // rule（均分，起点在0） , peak（均分，起点在均分单位的中心）, proportion（实际数据真实位置，数据一定是number）

          //如果用户有手动的 trimLayout ，那么就全部visible为true，然后调用用户自己的过滤程序
          //trimLayout就事把arr种的每个元素的visible设置为true和false的过程
          //function
          this.trimLayout = null;

          // if (!opt._coord.zAxisAttribute.section.length) {
          //     this.depth = 50;
          // }

          this.posParseToInt = false; //比如在柱状图中，有得时候需要高精度的能间隔1px的柱子，那么x轴的计算也必须要都是整除的
          _.extend(true, this, opt.zAxis);

          this.init(opt, this._coordSystem.zAxisAttribute);
      }
      init(opt, data) {
          let me = this;
          this.group = this._root.renderView.addGroup({ name: 'zAxis' });

          // this.rulesGroup = this._root.renderView.addGroup({ name: 'rulesSprite' });

          // this.group.add(this.rulesGroup);

          this._initHandle(data);
          this._root.orbitControls.on('change', () => {

              me._initModules();
          });
          me._initModules();
      }
      _initHandle(data) {
          var me = this;

          if (data && data.field) {
              this.field = data.field;
          }

          if (data && data.data) {
              this.dataOrg = _.flatten(data.data);
          }        if (!this._opt.dataSection && this.dataOrg) {
              //如果没有传入指定的dataSection，才需要计算dataSection
              this.dataSection = data.section; // this._initDataSection(this.dataOrg);
          }
          me._formatTextSection = [];
          me._textElements = [];
          _.each(me.dataSection, function (val, i) {
              me._formatTextSection[i] = me._getFormatText(val, i);
              //从_formatTextSection中取出对应的格式化后的文本

              // var txt = me._root.renderView.createTextSprite(""+me._formatTextSection[i],me.label.fontSize)

              // // var txt = new Canvax.Display.Text(me._formatTextSection[i], {
              // //     context: {
              // //         fontSize: me.label.fontSize
              // //     }
              // // });

              // me._textElements[i] = txt;
          });

          if (this.label.rotation != 0) {
              //如果是旋转的文本，那么以右边为旋转中心点
              this.label.textAlign = "right";
          }
          //取第一个数据来判断xaxis的刻度值类型是否为 number
          !("minVal" in this._opt) && (this.minVal = _.min(this.dataSection));
          if (isNaN(this.minVal) || this.minVal == Infinity) {
              this.minVal = 0;
          }        !("maxVal" in this._opt) && (this.maxVal = _.max(this.dataSection));
          if (isNaN(this.maxVal) || this.maxVal == Infinity) {
              this.maxVal = 1;
          }
          this._getName();

          this._setZAxisWidth();
      }
      _getFormatText(val, i) {
          var res;
          if (_.isFunction(this.label.format)) {
              res = this.label.format.apply(this, arguments);
          } else {
              res = val;
          }

          if (_.isArray(res)) {
              res = numAddSymbol(res);
          }
          if (!res) {
              res = val;
          }        return res;
      }
      _initModules() {

          //初始化轴线
          const _axisDir = new Vector3$1(0, 0, -1);
          const _coordSystem = this._coordSystem;
          let coordBoundBox = _coordSystem.getBoundbox();
          let _size = new Vector3$1();
          coordBoundBox.getSize(_size);

          let {
              x: width,
              y: height,
              z: depth
          } = _size;

          let origin = new Vector3$1(width, 0, 0);
          let _tickLineDir = new Vector3$1(1, 0, 0);
          let _faceInfo = this._cartesionUI.getFaceInfo();

          if (_faceInfo.bottom.visible) {
              if (_faceInfo.left.visible) {
                  origin = new Vector3$1(width, 0, 0);
                  _tickLineDir = new Vector3$1(1, 0, 0);
              } else {
                  origin = new Vector3$1(0, 0, 0);
                  _tickLineDir = new Vector3$1(-1, 0, 0);
              }
          } else {
              //top 可见
              if (_faceInfo.left.visible) {
                  origin = new Vector3$1(width, height, 0);
                  _tickLineDir = new Vector3$1(1, 0, 0);
              } else {
                  origin = new Vector3$1(0, height, 0);
                  _tickLineDir = new Vector3$1(-1, 0, 0);
              }
          }

          if (this._axisLine) {
              if (this._axisLine.getOrigin().equals(origin)) {
                  return;
              }
              this._axisLine.dispose();
              this._axisLine.setOrigin(origin);
              this._axisLine.drawStart();
              this._axisLine.draw();

              //二次绘制
              this._tickLine.dispose();
              this._tickLine.setDir(_tickLineDir);
              this._tickLine.initData(this._axisLine, _coordSystem.zAxisAttribute, _coordSystem.getZAxisPosition);
              this._tickLine.drawStart();
              this._tickLine.draw();

              this._tickText.dispose();

              this._tickText.setDir(_tickLineDir);
              this._tickText.initData(this._axisLine, _coordSystem.zAxisAttribute, _coordSystem.getZAxisPosition);

              this._tickText.drawStart(this._formatTextSection);
              this._tickText.draw();
          } else {
              this._axisLine = new AxisLine(_coordSystem, this.axisLine);
              this._axisLine.setDir(_axisDir);

              this._axisLine.setOrigin(origin);
              this._axisLine.setLength(depth);
              this._axisLine.setGroupName('zAxisLine');
              this._axisLine.drawStart();

              this.group.add(this._axisLine.group);

              //初始化tickLine

              this._tickLine = new TickLines(_coordSystem, this.tickLine);
              this._tickLine.setDir(_tickLineDir);
              this._tickLine.initData(this._axisLine, _coordSystem.zAxisAttribute, _coordSystem.getZAxisPosition);
              this._tickLine.drawStart();

              this.group.add(this._tickLine.group);

              //初始化tickText

              this._tickText = new TickTexts(_coordSystem, this.label);
              this._tickText.offset = this.label.offset + this.axisLine.lineWidth + this.tickLine.lineWidth + this.tickLine.offset + 20;

              this._tickText.setDir(_tickLineDir);
              this._tickText.initData(this._axisLine, _coordSystem.zAxisAttribute, _coordSystem.getZAxisPosition);

              //this._tickText.initData(this._axisLine, _coordSystem.zAxisAttribute);
              this._tickText.drawStart(this._formatTextSection);
              this.group.add(this._tickText.group);
          }
      }
      _getName() {
          // if ( this.title.content ) {
          //     if( !this._title ){
          //         this._title = new Canvax.Display.Text(this.title.content, {
          //             context: {
          //                 fontSize: this.title.fontSize,
          //                 textAlign: this.title.textAlign,  //"center",//this.isH ? "center" : "left",
          //                 textBaseline: this.title.textBaseline,//"middle", //this.isH ? "top" : "middle",
          //                 fillStyle: this.title.fontColor,
          //                 strokeStyle: this.title.strokeStyle,
          //                 lineWidth : this.title.lineWidth,
          //                 rotation: this.isH ? -180 : 0
          //             }
          //         });
          //     } else {
          //         this._title.resetText( this.title.content );
          //     }
          // }
      }

      _setZAxisWidth() {
          //检测下文字的宽度
          var me = this;
          const _coordSystem = me._coordSystem;
          if (!me.enabled) {
              me.width = 0;
          } else {
              var _maxTextWidth = 0;

              if (this.label.enabled) {

                  //me._formatTextSection.forEach((val)=>{
                  let width = TextTexture.getTextWidth(me._formatTextSection, ['normal', 'normal', this.label.fontColor, this.label.fontSize].join(' '));
                  _maxTextWidth = Math.max(_maxTextWidth, width);
                  //})
                  // _.each(me.dataSection, function (val, i) {

                  //     //从_formatTextSection中取出对应的格式化后的文本
                  //     let txt = me._textElements[i];
                  //     let scale = me._root.renderView.getObjectScale(txt);

                  //     let textWidth = scale.x;
                  //     let textHeight = scale.y;

                  //     let width = textWidth; //文本在外接矩形width
                  //     let height = textHeight;//文本在外接矩形height

                  //     if (!!me.label.rotation) {
                  //         //有设置旋转
                  //         if (me.label.rotation == 90) {
                  //             width = textHeight;
                  //             height = textWidth;
                  //         } else {
                  //             let sinR = Math.sin(Math.abs(me.label.rotation) * Math.PI / 180);
                  //             let cosR = Math.cos(Math.abs(me.label.rotation) * Math.PI / 180);
                  //             height = parseInt(sinR * textWidth);
                  //             width = parseInt(cosR * textWidth);
                  //         };
                  //     };

                  //     _maxTextWidth = Math.max(_maxTextWidth, width);
                  //     console.log('width',width);
                  // });
              }            this._maxTextWidth = _maxTextWidth;
              let ratio = _coordSystem.getRatioPixelToWorldByOrigin();
              this.width = (_maxTextWidth + this.tickLine.lineLength + this.tickLine.offset + this.label.offset + this.axisLine.lineWidth) * ratio;
              //this.width+=10;
              // if (this._title) {
              //     this.height += this._title.getTextHeight()
              // };
          }
      }
      //设置布局
      setLayout(opt) {}
      draw() {

          this._axisLine.draw();
          this._tickLine.draw();
          this._tickText.draw();

          // console.log('z axis 项目三 pos: ',this._root.currCoord.getZAxisPosition('项目三'));
      }
  }

  class Grid extends Component {
      constructor(_cartesionUI) {
          super(_cartesionUI._coordSystem);

          let opt = this._opt = _cartesionUI;

          // this.width = 0;
          // this.height = 0;

          // this.pos = {
          //     x: 0,
          //     y: 0
          // };

          this._cartesionUI = _cartesionUI;

          this.enabled = 1;

          this.line = { //x方向上的线
              enabled: 1,
              lineType: 'solid', //线条类型(dashed = 虚线 | solid = 实线)
              strokeStyle: '#f0f0f0' //'#e5e5e5',
          };

          this.fill = {
              enabled: true,
              fillStyle: '#ccc',
              alpha: 0.9
          };

          _.extend(true, this, opt.grid);

          this.init();
      }
      init() {
          let me = this;
          this.group = this._root.renderView.addGroup({ name: 'grid' });

          this.leftGroup = this._root.renderView.addGroup({ name: 'leftGroup' }); //x轴上的线集合
          this.rightGroup = this._root.renderView.addGroup({ name: 'rightGroup' });
          this.topGroup = this._root.renderView.addGroup({ name: 'topGroup' });
          this.bottomGroup = this._root.renderView.addGroup({ name: 'bottomGroup' });
          this.frontGroup = this._root.renderView.addGroup({ name: 'frontGroup' });
          this.backGroup = this._root.renderView.addGroup({ name: 'backGroup' });

          this.group.add(this.leftGroup);
          this.group.add(this.rightGroup);
          this.group.add(this.topGroup);
          this.group.add(this.bottomGroup);
          this.group.add(this.frontGroup);
          this.group.add(this.backGroup);

          this._root.orbitControls.on('change', () => {
              if (!me.enabled) return;
              let _faceInfo = me._cartesionUI.getFaceInfo();
              _.each(_faceInfo, (value, key) => {
                  me[key + 'Group'].visible = value.visible;
              });
          });
      }

      drawFace() {
          let me = this;
          const _coordSystem = this._coordSystem;
          let _faceInfo = this._cartesionUI.getFaceInfo();

          let coordBoundBox = _coordSystem.getBoundbox();
          let _size = new Vector3$1(); //空间盒子的大小
          coordBoundBox.getSize(_size);
          let {
              x: width,
              y: height,
              z: depth
          } = _size;
          if (me.fill.enabled) {

              //todo: 多次调用 group可能会重复加入,这里需要销毁以前的数据 reset统一处理吧
              //todo view中构建 materail 通过fill 使用同一份material
              this.leftFace = me._root.renderView.createPlane(depth, height, undefined, _faceInfo.left, me.leftGroup, this.fill);
              this.rightFace = me._root.renderView.createPlane(depth, height, undefined, _faceInfo.right, me.rightGroup, this.fill);
              this.topFace = me._root.renderView.createPlane(width, depth, undefined, _faceInfo.top, me.topGroup, this.fill);
              this.bottomFace = me._root.renderView.createPlane(width, depth, undefined, _faceInfo.bottom, me.bottomGroup, this.fill);
              this.frontFace = me._root.renderView.createPlane(width, height, undefined, _faceInfo.front, me.frontGroup, this.fill);
              this.backFace = me._root.renderView.createPlane(width, height, undefined, _faceInfo.back, me.backGroup, this.fill);
          }
      }
      drawLine() {
          let me = this;
          const _coordSystem = this._coordSystem;

          let coordBoundBox = _coordSystem.getBoundbox();
          let _size = new Vector3$1(); //空间盒子的大小
          coordBoundBox.getSize(_size);
          let {
              x: width,
              y: height,
              z: depth
          } = _size;

          if (!me.line.enabled) {
              return;
          }
          //绘制左面的线条
          let LinesVectors = [];
          me._coordSystem.yAxisAttribute.section.forEach(num => {
              let posY = me._coordSystem.getYAxisPosition(num);
              LinesVectors.push(new Vector3$1(0, posY, 0));
              LinesVectors.push(new Vector3$1(0, posY, -depth));
          });

          me._coordSystem.zAxisAttribute.section.forEach(num => {
              let posZ = me._coordSystem.getZAxisPosition(num);
              LinesVectors.push(new Vector3$1(0, 0, -posZ));
              LinesVectors.push(new Vector3$1(0, height, -posZ));
          });
          let lines = me._root.renderView.createCommonLine(LinesVectors, this.line);
          me.leftGroup.add(lines);

          //绘制右面的线条
          LinesVectors = [];
          me._coordSystem.yAxisAttribute.section.forEach(num => {
              let posY = me._coordSystem.getYAxisPosition(num);
              LinesVectors.push(new Vector3$1(width, posY, 0));
              LinesVectors.push(new Vector3$1(width, posY, -depth));
          });

          me._coordSystem.zAxisAttribute.section.forEach(num => {
              let posZ = me._coordSystem.getZAxisPosition(num);
              LinesVectors.push(new Vector3$1(width, 0, -posZ));
              LinesVectors.push(new Vector3$1(width, height, -posZ));
          });
          lines = me._root.renderView.createCommonLine(LinesVectors, this.line);
          me.rightGroup.add(lines);

          //绘制上面的线条
          LinesVectors = [];
          me._coordSystem.xAxisAttribute.section.forEach(num => {
              let posX = me._coordSystem.getXAxisPosition(num);
              LinesVectors.push(new Vector3$1(posX, height, 0));
              LinesVectors.push(new Vector3$1(posX, height, -depth));
          });

          me._coordSystem.zAxisAttribute.section.forEach(num => {
              let posZ = me._coordSystem.getZAxisPosition(num);
              LinesVectors.push(new Vector3$1(0, height, -posZ));
              LinesVectors.push(new Vector3$1(width, height, -posZ));
          });
          lines = me._root.renderView.createCommonLine(LinesVectors, this.line);
          me.topGroup.add(lines);

          //绘制下面的线条
          LinesVectors = [];
          me._coordSystem.xAxisAttribute.section.forEach(num => {
              let posX = me._coordSystem.getXAxisPosition(num);
              LinesVectors.push(new Vector3$1(posX, 0, 0));
              LinesVectors.push(new Vector3$1(posX, 0, -depth));
          });

          me._coordSystem.zAxisAttribute.section.forEach(num => {
              let posZ = me._coordSystem.getZAxisPosition(num);
              LinesVectors.push(new Vector3$1(0, 0, -posZ));
              LinesVectors.push(new Vector3$1(width, 0, -posZ));
          });
          lines = me._root.renderView.createCommonLine(LinesVectors, this.line);
          me.bottomGroup.add(lines);

          //绘制前面的线条
          LinesVectors = [];
          me._coordSystem.xAxisAttribute.section.forEach(num => {
              let posX = me._coordSystem.getXAxisPosition(num);
              LinesVectors.push(new Vector3$1(posX, 0, 0));
              LinesVectors.push(new Vector3$1(posX, height, 0));
          });

          me._coordSystem.yAxisAttribute.section.forEach(num => {
              let posY = me._coordSystem.getYAxisPosition(num);
              LinesVectors.push(new Vector3$1(0, posY, 0));
              LinesVectors.push(new Vector3$1(width, posY, 0));
          });

          lines = me._root.renderView.createCommonLine(LinesVectors, this.line);
          me.frontGroup.add(lines);

          //绘制后面的线条
          LinesVectors = [];
          me._coordSystem.xAxisAttribute.section.forEach(num => {
              let posX = me._coordSystem.getXAxisPosition(num);
              LinesVectors.push(new Vector3$1(posX, 0, -depth));
              LinesVectors.push(new Vector3$1(posX, height, -depth));
          });

          me._coordSystem.yAxisAttribute.section.forEach(num => {
              let posY = me._coordSystem.getYAxisPosition(num);
              LinesVectors.push(new Vector3$1(0, posY, -depth));
              LinesVectors.push(new Vector3$1(width, posY, -depth));
          });
          lines = me._root.renderView.createCommonLine(LinesVectors, this.line);
          me.backGroup.add(lines);
      }

      draw() {
          this.drawFace();
          this.drawLine();
      }

  }

  class Cartesian3DUI extends Component {
      constructor(_coordSystem) {
          super(_coordSystem);

          //坐标轴实例
          this._xAxis = null;
          this._yAxis = [];

          this._yAxisLeft = null;
          //暂时忽略_yAxisRight
          this._yAxisRight = null;

          this._zAxis = null;
          this._grid = null;

          let opt = _coordSystem.coord;

          this.type = "cartesian3d";

          this.horizontal = false;

          //配置信息
          this.xAxis = opt.xAxis || {};
          this.yAxis = opt.yAxis || [];
          this.zAxis = opt.zAxis || {};
          this.grid = opt.grid || {};

          _.extend(true, this, opt);

          if (opt.horizontal) {
              this.xAxis.isH = true;
              this.zAxis.isH = true;
              _.each(this.yAxis, function (yAxis) {
                  yAxis.isH = true;
              });
          }
          if ("enabled" in opt) {
              //如果有给直角坐标系做配置display，就直接通知到xAxis，yAxis，grid三个子组件
              _.extend(true, this.xAxis, {
                  enabled: opt.enabled
              });
              _.each(this.yAxis, function (yAxis) {
                  _.extend(true, yAxis, {
                      enabled: opt.enabled
                  });
              });

              this.grid.enabled = opt.enabled;
          }
          this.init(opt);
      }

      init(opt) {

          this.group = this._root.renderView.addGroup({ name: 'cartesian3dUI_root' });

          this._initModules();

          //todo z轴的宽度没有计算在内
          //todo  是否要计算offset值去更改最终原点的位置
          // let offset = new Vector3(this._yAxisLeft.width, this._xAxis.height, 0);
          //todo 三维空间中不需要考虑原点的移动 
          this._coordSystem.updateOrigin(new Vector3$1(0, 0, 0));
      }
      _initModules() {
          this._grid = new Grid(this);
          this.group.add(this._grid.group);

          this._xAxis = new XAxis(this);
          this.group.add(this._xAxis.group);

          //这里定义的是配置
          let yAxis = this.yAxis;
          let yAxisLeft;

          // yAxis 肯定是个数组
          if (!_.isArray(yAxis)) {
              yAxis = [yAxis];
          }
          //left是一定有的
          yAxisLeft = _.find(yAxis, function (ya) {
              return ya.align == "left";
          });

          if (yAxisLeft) {
              this._yAxisLeft = new YAxis(this);
              this._yAxisLeft.axis = yAxisLeft;
              this.group.add(this._yAxisLeft.group);
              this._yAxis.push(this._yAxisLeft);
          }

          //后续坐标系如果还受其他组件的影响,继续计算并加入进来

          // yAxisRight = _.find( yAxis , function( ya ){
          //     return ya.align == "right"
          // } );
          // if( yAxisRight ){
          //     yAxisRightDataFrame = this._getAxisDataFrame( yAxisRight.field )
          //     this._yAxisRight = new yAxisConstructor( yAxisRight, yAxisRightDataFrame );
          //     this._yAxisRight.axis = yAxisRight;
          //     this.sprite.addChild( this._yAxisRight.sprite );
          //     this._yAxis.push( this._yAxisRight );
          // };

          this._zAxis = new ZAxis(this);
          this.group.add(this._zAxis.group);
      }

      draw() {

          this._yAxisLeft.draw();
          this._xAxis.draw();
          this._zAxis.draw();
          this._grid.draw();
      }

      getFaceInfo() {
          //todo 待优化
          let _coordSystem = this._coordSystem;
          let coordBoundBox = _coordSystem.getBoundbox();
          let _size = new Vector3$1(); //空间盒子的大小
          coordBoundBox.getSize(_size);
          let {
              x: width,
              y: height,
              z: depth
          } = _size;

          let lfb = new Vector3$1(0, 0, 0),
              //左前下
          lft = new Vector3$1(0, height, 0),
              //左前上  
          lbb = new Vector3$1(0, 0, -depth),
              //左后下 
          lbt = new Vector3$1(0, height, -depth),
              //左后上

          rfb = new Vector3$1(width, 0, 0),
              //左前下
          rft = new Vector3$1(width, height, 0),
              //左前上  
          rbb = new Vector3$1(width, 0, -depth),
              //左后下 
          rbt = new Vector3$1(width, height, -depth); //左后上

          let cameraPos = new Vector3$1();
          this._root.renderView._camera.getWorldPosition(cameraPos);

          let zDir = new Vector3$1(0, 0, 1);
          let coordCenter = this._coordSystem._getWorldPos(this._coordSystem.center);
          let v = cameraPos.clone().sub(coordCenter).normalize();

          let result = {
              left: {
                  dir: new Vector3$1(1, 0, 0), //法线方向
                  center: new Box3().setFromPoints([lft, lft, lbb, lbt]).getCenter(),
                  visible: v.clone().cross(zDir).y <= 0
              },
              right: {
                  dir: new Vector3$1(-1, 0, 0), //法线方向
                  center: new Box3().setFromPoints([rft, rft, rbb, rbt]).getCenter(),
                  visible: v.clone().cross(zDir).y > 0
              },
              top: {
                  dir: new Vector3$1(0, -1, 0), //法线方向
                  center: new Box3().setFromPoints([lft, rft, lbt, rbt]).getCenter(),
                  visible: v.clone().cross(zDir).x < 0
              },
              bottom: {
                  dir: new Vector3$1(0, 1, 0), //法线方向
                  center: new Box3().setFromPoints([lfb, rfb, lbb, rbb]).getCenter(),
                  visible: v.clone().cross(zDir).x >= 0
              },
              front: {
                  dir: new Vector3$1(0, 0, -1),
                  center: new Box3().setFromPoints([lfb, rfb, rft, lft]).getCenter(),
                  visible: v.dot(zDir) < 0
              },
              back: {
                  dir: new Vector3$1(0, 0, 1),
                  center: new Box3().setFromPoints([lbb, rbb, rbt, lbt]).getCenter(),
                  visible: v.dot(zDir) >= 0
              }

          };

          return result;
      }

  }

  function normalizeTickInterval(interval, magnitude) {
      var normalized, i;
      // var multiples = [1, 2, 2.5, 5, 10];
      var multiples = [1, 2, 5, 10];
      // round to a tenfold of 1, 2, 2.5 or 5
      normalized = interval / magnitude;

      // normalize the interval to the nearest multiple
      for (var i = 0; i < multiples.length; i++) {
          interval = multiples[i];
          if (normalized <= (multiples[i] + (multiples[i + 1] || multiples[i])) / 2) {
              break;
          }
      }

      // multiply back to the correct magnitude
      interval *= magnitude;

      return interval;
  }

  function correctFloat(num) {
      return parseFloat(num.toPrecision(14));
  }

  function getLinearTickPositions(arr, $maxPart, $cfg) {

      arr = _.without(arr, undefined, null, "");

      var scale = $cfg && $cfg.scale ? parseFloat($cfg.scale) : 1;
      //返回的数组中的值 是否都为整数(思霏)  防止返回[8, 8.2, 8.4, 8.6, 8.8, 9]   应该返回[8, 9]
      var isInt = $cfg && $cfg.isInt ? 1 : 0;

      if (isNaN(scale)) {
          scale = 1;
      }
      var max = _.max(arr);
      var initMax = max;
      max *= scale;
      var min = _.min(arr);

      if (min == max) {
          if (max > 0) {
              min = 0;
              return [min, max];
              // min= Math.round(max/2);
          } else if (max < 0) {
              return [max, 0];
              //min = max*2;
          } else {
              max = 1;
              return [0, max];
          }
      }

      var length = max - min;
      if (length) {
          var tempmin = min; //保证min>0的时候不会出现负数
          min -= length * 0.05;
          // S.log(min +":"+ tempmin)
          if (min < 0 && tempmin >= 0) {
              min = 0;
          }
          max += length * 0.05;
      }

      var tickInterval = (max - min) * 0.3; //72 / 365;
      var magnitude = Math.pow(10, Math.floor(Math.log(tickInterval) / Math.LN10));

      tickInterval = normalizeTickInterval(tickInterval, magnitude);
      if (isInt) {
          tickInterval = Math.ceil(tickInterval);
      }

      var pos,
          lastPos,
          roundedMin = correctFloat(Math.floor(min / tickInterval) * tickInterval),
          roundedMax = correctFloat(Math.ceil(max / tickInterval) * tickInterval),
          tickPositions = [];

      // Populate the intermediate values
      pos = roundedMin;
      while (pos <= roundedMax) {

          // Place the tick on the rounded value
          tickPositions.push(pos);

          // Always add the raw tickInterval, not the corrected one.
          pos = correctFloat(pos + tickInterval);

          // If the interval is not big enough in the current min - max range to actually increase
          // the loop variable, we need to break out to prevent endless loop. Issue #619
          if (pos === lastPos) {
              break;
          }

          // Record the last value
          lastPos = pos;
      }
      if (tickPositions.length >= 3) {
          if (tickPositions[tickPositions.length - 2] >= initMax) {
              tickPositions.pop();
          }
      }
      return tickPositions;
  }

  var DataSection = {
      section: function ($arr, $maxPart, $cfg) {
          return _.uniq(getLinearTickPositions($arr, $maxPart, $cfg));
      }
  };

  /** note: 
   * 获取所有的配置信息,取去配置中影响布局的相关参数
   * coord{
   *    xAsix{}
   *    yAxis{} 
   *    zAxis{} 
   * }
   * 
   * graphs{}
   * 
   * makeline其他组件
   * 
   * 通过Data和相关的配置,给出各个坐标轴的DataSection,计算出各个轴上数据点对应的位置
   * 
   * ***/

  class Cartesian3D extends InertialSystem {
      constructor(root) {
          super(root);

          //相对与世界坐标的原点位置

          this.origin = new Vector3$1(0, 0, 0);
          this.center = new Vector3$1(0, 0, 0);

          this.offset = new Vector3$1(0, 0, 0);

          this.boundbox = new Box3();

          this.xAxisAttribute = new AxisAttribute();
          this.yAxisAttribute = new AxisAttribute();
          this.zAxisAttribute = new AxisAttribute();

          this._coordUI = null;

          this.init();
      }
      setDefaultOpts(opts) {
          //todo 先那里使用

          var me = this;
          me.coord = {
              xAxis: {
                  //波峰波谷布局模型，默认是柱状图的，折线图种需要做覆盖
                  layoutType: "rule", //"peak",  
                  //默认为false，x轴的计量是否需要取整， 这样 比如某些情况下得柱状图的柱子间隔才均匀。
                  //比如一像素间隔的柱状图，如果需要精确的绘制出来每个柱子的间距是1px， 就必须要把这里设置为true
                  posParseToInt: false
              },
              zAxis: {
                  field: '',
                  layoutType: "peak",
                  depth: 50 //最大深度是1000
              }
          };

          opts = _.clone(opts);
          if (opts.coord.yAxis) {
              var _nyarr = [];
              //TODO: 因为我们的deep extend 对于数组是整个对象引用过去，所以，这里需要
              //把每个子元素单独clone一遍，恩恩恩， 在canvax中优化extend对于array的处理
              _.each(_.flatten([opts.coord.yAxis]), function (yopt) {
                  _nyarr.push(_.clone(yopt));
              });
              opts.coord.yAxis = _nyarr;
          } else {
              opts.coord.yAxis = [];
          }

          //根据opt中得Graphs配置，来设置 coord.yAxis
          if (opts.graphs) {
              //有graphs的就要用找到这个graphs.field来设置coord.yAxis
              for (var i = 0; i < opts.graphs.length; i++) {
                  var graphs = opts.graphs[i];
                  if (graphs.type == "bar") {
                      //如果graphs里面有柱状图，那么就整个xAxis都强制使用 peak 的layoutType
                      me.coord.xAxis.layoutType = "peak";
                  }
                  if (graphs.field) {
                      //没有配置field的话就不绘制这个 graphs了
                      var align = "left"; //默认left
                      if (graphs.yAxisAlign == "right") {
                          align = "right";
                      }
                      var optsYaxisObj = null;
                      optsYaxisObj = _.find(opts.coord.yAxis, function (obj, i) {
                          return obj.align == align || !obj.align && i == (align == "left" ? 0 : 1);
                      });

                      if (!optsYaxisObj) {
                          optsYaxisObj = {
                              align: align,
                              field: []
                          };
                          opts.coord.yAxis.push(optsYaxisObj);
                      } else {
                          if (!optsYaxisObj.align) {
                              optsYaxisObj.align = align;
                          }
                      }

                      if (!optsYaxisObj.field) {
                          optsYaxisObj.field = [];
                      } else {
                          if (!_.isArray(optsYaxisObj.field)) {
                              optsYaxisObj.field = [optsYaxisObj.field];
                          }
                      }

                      if (_.isArray(graphs.field)) {
                          optsYaxisObj.field = optsYaxisObj.field.concat(graphs.field);
                      } else {
                          optsYaxisObj.field.push(graphs.field);
                      }
                  } else {
                      //在，直角坐标系中，每个graphs一定要有一个field设置，如果没有，就去掉这个graphs
                      opts.graphs.splice(i--, 1);
                  }
              }
          }        //再梳理一遍yAxis，get没有align的手动配置上align
          //要手动把yAxis 按照 left , right的顺序做次排序
          var _lys = [],
              _rys = [];
          _.each(opts.coord.yAxis, function (yAxis, i) {
              if (!yAxis.align) {
                  yAxis.align = i ? "right" : "left";
              }
              if (yAxis.align == "left") {
                  _lys.push(yAxis);
              } else {
                  _rys.push(yAxis);
              }
              if (!yAxis.layoutType) {
                  yAxis.layoutType = 'proportion'; //默认布局
              }
          });
          opts.coord.yAxis = _lys.concat(_rys);

          return opts;
      }

      getBoundbox() {
          //笛卡尔坐标的原点默认为左下方

          let baseBoundbox = super.getBoundbox();
          let offset = this.offset.clone();
          this.baseBoundbox = baseBoundbox;
          this.boundbox.min.set(0, 0, 0);
          this.boundbox.max.set(baseBoundbox.max.x - baseBoundbox.min.x - offset.x, baseBoundbox.max.y - baseBoundbox.min.y - offset.y, baseBoundbox.max.z - baseBoundbox.min.z - offset.z);
          this.center = this.boundbox.getCenter();
          this.center.setZ(-this.center.z);
          return this.boundbox;
      }
      //粗略计算在原点位置的世界线段的长度与屏幕像素的长度比
      getRatioPixelToWorldByOrigin() {
          let baseBoundbox = super.getBoundbox();
          let _origin = baseBoundbox.min.clone();
          _origin.setZ(baseBoundbox.max.z);
          let ratio = this._root.renderView.getVisableSize(_origin).ratio;
          return ratio;
      }
      init() {

          this.group = this._root.renderView.addGroup({ name: 'cartesian3dSystem' });
          let opt = _.clone(this._root.opt);

          //这个判断不安全
          if (_.isSafeObject(opt, 'coord.xAxis.field')) {
              this.xAxisAttribute.setField(opt.coord.xAxis.field);
              this.xAxisAttribute.setData(this._getAxisDataFrame(opt.coord.xAxis.field));

              if (!_.isSafeObject(opt, 'coord.xAxis.dataSection')) {
                  var arr = _.flatten(this.xAxisAttribute.data);

                  if (this.coord.xAxis.layoutType == "proportion") {
                      if (arr.length == 1) {
                          arr.push(0);
                          arr.push(arr[0] * 2);
                      }                    arr = arr.sort(function (a, b) {
                          return a - b;
                      });
                      arr = DataSection.section(arr);
                  }
                  this.xAxisAttribute.setDataSection(arr);
              }
          }

          //获取axisY
          let yFields = [];
          if (_.isSafeObject(opt, 'coord.yAxis.field')) {
              if (_.isArray(opt.coord.yAxis.field)) {
                  yFields = yFields.concat(opt.coord.yAxis.field);
              } else {
                  yFields.push(opt.coord.yAxis.field);
              }
          }

          opt.graphs && opt.graphs.forEach(cp => {
              if (_.isArray(cp.field)) {
                  yFields = yFields.concat(cp.field);
              } else {
                  yFields.push(cp.field);
              }
          });

          yFields = _.uniq(yFields);
          this.yAxisAttribute.setField(yFields);
          let dataOrgY = this._getAxisDataFrame(yFields);
          let _section = this._setDataSection(yFields);

          this.yAxisAttribute.setData(dataOrgY);
          if (!_.isSafeObject(opt, 'coord.yAxis.dataSection')) {
              let joinArr = [];
              if (_.isSafeObject(opt, "coord.yAxis.waterLine")) {
                  joinArr.push(opt.coord.yAxis.waterLine);
              }

              if (_.isSafeObject(opt, "coord.yAxis.min")) {
                  joinArr.push(opt.coord.yAxis.min);
              }            if (dataOrgY.length == 1) {
                  joinArr.push(dataOrgY[0] * 2);
              }
              // if( this._opt.baseNumber != undefined ){
              //     arr.push( this.baseNumber );
              // }; 
              // if( this._opt.minNumber != undefined ){
              //     arr.push( this.minNumber );
              // }; 
              // if( this._opt.maxNumber != undefined ){
              //     arr.push( this.maxNumber );
              // }; 


              this.yAxisAttribute.computeDataSection(joinArr);
          }

          if (_.isSafeObject(opt, 'coord.zAxis.field')) {
              this.zAxisAttribute.setField(opt.coord.zAxis.field);
              this.zAxisAttribute.setData(this._getAxisDataFrame(opt.coord.zAxis.field));

              if (!_.isSafeObject(opt, 'coord.zAxis.dataSection')) {
                  var arr = _.flatten(this.zAxisAttribute.data);

                  if (this.coord.zAxis.layoutType == "proportion") {
                      if (arr.length == 1) {
                          arr.push(0);
                          arr.push(arr[0] * 2);
                      }                    arr = arr.sort(function (a, b) {
                          return a - b;
                      });
                      arr = DataSection.section(arr);
                  }
                  this.zAxisAttribute.setDataSection(arr);
              }
          }

          //先计算一次空间范围供计算坐标轴宽高使用
          this.getBoundbox();
      }

      _setDataSection(yFields) {
          //如果有堆叠，比如[ ["uv","pv"], "click" ]
          //那么这个 this.dataOrg， 也是个对应的结构
          //vLen就会等于2
          var vLen = 1;

          _.each(yFields, function (f) {
              // vLen = Math.max( vLen, 1 );
              if (_.isArray(f) && f.length > 1) {
                  // _.each( f, function( _f ){
                  //     vLen = Math.max( vLen, 2 );
                  // } );
                  vLen = 2;
              }
          });

          if (vLen == 1) {
              return this._oneDimensional(yFields);
          }        if (vLen == 2) {
              return this._twoDimensional(yFields);
          }    }

      _oneDimensional(yFields) {
          debugger;
          let dataOrg = this._getAxisDataFrame(yFields);
          var arr = _.flatten(dataOrg); //_.flatten( data.org );

          for (var i = 0, il = arr.length; i < il; i++) {
              arr[i] = arr[i] || 0;
          }
          return arr;
      }

      //二维的yAxis设置，肯定是堆叠的比如柱状图，后续也会做堆叠的折线图， 就是面积图
      _twoDimensional(yFields) {
          let d = this._getAxisDataFrame(yFields);
          var arr = [];
          var min;
          _.each(d, function (d, i) {
              if (!d.length) {
                  return;
              }
              //有数据的情况下 
              if (!_.isArray(d[0])) {
                  arr.push(d);
                  return;
              }
              var varr = [];
              var len = d[0].length;
              var vLen = d.length;

              for (var i = 0; i < len; i++) {
                  var up_count = 0;
                  var up_i = 0;

                  var down_count = 0;
                  var down_i = 0;

                  for (var ii = 0; ii < vLen; ii++) {
                      !min && (min = d[ii][i]);
                      min = Math.min(min, d[ii][i]);

                      if (d[ii][i] >= 0) {
                          up_count += d[ii][i];
                          up_i++;
                      } else {
                          down_count += d[ii][i];
                          down_i++;
                      }
                  }
                  up_i && varr.push(up_count);
                  down_i && varr.push(down_count);
              }            arr.push(varr);
          });
          arr.push(min);
          return _.flatten(arr);
      }

      _getAxisDataFrame(fields) {
          let dataFrame = this._root.dataFrame;

          return dataFrame.getDataOrg(fields, function (val) {
              if (val === undefined || val === null || val == "") {
                  return val;
              }
              return isNaN(Number(val)) ? val : Number(val);
          });
      }
      //更新坐标原点
      updateOrigin(offset) {

          this.offset = offset.clone();

          this.boundbox = this.getBoundbox();

          this.setWorldOrigin();

          this.updatePosition();
      }

      updatePosition() {

          //更新相机姿态
          let center = this.center.clone();
          center = this._getWorldPos(center);
          let _renderView = this._root.renderView;
          let _camera = _renderView._camera;

          //相机默认的旋转角度
          let dist = _camera.position.distanceTo(center);
          let phi = _Math.degToRad(_renderView.controls.alpha); //(90-lat)*(Math.PI/180),
          let theta = _Math.degToRad(_renderView.controls.beta); // (lng+180)*(Math.PI/180),

          let y = dist * Math.sin(phi);
          let temp = dist * Math.cos(phi);
          let x = temp * Math.sin(theta);
          let z = temp * Math.cos(theta);
          //平移实现以中心点为圆心的旋转结果
          let newPos = new Vector3$1(x, y, z);
          newPos.add(center);
          _camera.position.copy(newPos);
          //相机朝向中心点 
          _camera.lookAt(center);

          //orbite target position
          this._root.orbitControls.target.copy(center);

          //测试中心点的位置
          let helpLine = this._root.renderView.createLine([center.clone()], new Vector3$1(1, 0, 0), 123, 1, 'red');
          let helpLine2 = this._root.renderView.createLine([center.clone()], new Vector3$1(-1, 0, 0), 500, 1, 'red');
          this._root.renderView._scene.add(helpLine);
          this._root.renderView._scene.add(helpLine2);
      }

      addLights() {
          //加入灯光


      }

      setWorldOrigin() {
          let baseBoundbox = super.getBoundbox();
          let offset = this.offset.clone();
          let pos = baseBoundbox.min.clone();
          pos.setZ(baseBoundbox.max.z);
          pos.add(offset);
          this.group.position.copy(pos);
      }
      getOrigin() {
          return this.origin.clone();
      }

      initCoordUI() {

          this._coordUI = new Cartesian3DUI(this);
          this.group.add(this._coordUI.group);
      }

      draw() {
          this._coordUI.draw();

          //测试
          // let ceil = this.getCeilSize();
          // let pos = new Vector3();
          // pos.setX(this.getXAxisPosition(2));
          // pos.setY(this.getYAxisPosition(100));
          // pos.setZ(this.getZAxisPosition('项目三'));
          // let boxWidth = ceil.x * 0.8;
          // let boxDepth = ceil.z * 0.8;
          // let boxHeight = Math.max(Math.abs(pos.y), 1);
          // let metaril = new MeshBasicMaterial({
          //     color: 'blue',
          //     // polygonOffset:true,
          //     // polygonOffsetFactor:2,
          //     // polygonOffsetUnits:2
          // })
          // let box = this._root.renderView.createBox(boxWidth, boxHeight, boxDepth, metaril);
          // box.position.set(pos.x - boxWidth * 0.5, 0, -pos.z + boxDepth * 0.5);

          // this.group.add(box);
      }

      getXAxisPosition(data) {
          let _val = 0;
          let _range = this.boundbox.max.x - this.boundbox.min.x;
          let dataLen = this.xAxisAttribute.section.length;
          let ind = _.indexOf(this.xAxisAttribute.section, data); //先不考虑不存在的值
          var layoutType = this.coord.xAxis.layoutType;
          if (dataLen == 1) {
              _val = _range / 2;
          } else {
              if (layoutType == "rule") {
                  //折线图的xyaxis就是 rule
                  _val = ind / (dataLen - 1) * _range;
              }            if (layoutType == "proportion") {
                  //按照数据真实的值在minVal - maxVal 区间中的比例值
                  // if (val == undefined) {
                  //     val = (ind * (this.maxVal - this.minVal) / (dataLen - 1)) + this.minVal;
                  // };
                  // x = _range * ((val - this.minVal) / (this.maxVal - this.minVal));
                  _val = _range * (data / (maxVal - minVal));
              }            if (layoutType == "peak") {
                  //柱状图的就是peak
                  var _ceilWidth = _range / dataLen;
                  // if (this.posParseToInt) {
                  //     _ceilWidth = parseInt(_ceilWidth);
                  // };

                  _val = _ceilWidth * (ind + 1) - _ceilWidth / 2;
              }        }
          if (isNaN(_val)) {
              _val = 0;
          }
          return _val;
      }
      getYAxisPosition(data) {
          let _val = 0;
          let _range = this.boundbox.max.y - this.boundbox.min.y;
          let dataLen = this.yAxisAttribute.section.length;
          let ind = _.indexOf(this.yAxisAttribute.section, data); //先不考虑不存在的值
          let _yAxisLeft = _.find(this.coord.yAxis, yaxis => {
              return yaxis.align == 'left';
          });
          let layoutType = _yAxisLeft.layoutType;

          let maxVal = Math.max.apply(null, this.yAxisAttribute.section);
          let minVal = Math.min.apply(null, this.yAxisAttribute.section);

          if (dataLen == 1) {
              _val = _range / 2;
          } else {
              if (layoutType == "rule") {
                  //折线图的xyaxis就是 rule
                  _val = ind / (dataLen - 1) * _range;
              }            if (layoutType == "proportion") {
                  //按照数据真实的值在minVal - maxVal 区间中的比例值
                  // if (val == undefined) {
                  //     val = (ind * (this.maxVal - this.minVal) / (dataLen - 1)) + this.minVal;
                  // };
                  _val = _range * (data / (maxVal - minVal));
              }            if (layoutType == "peak") {
                  //柱状图的就是peak
                  var _ceilWidth = _range / dataLen;
                  // if (this.posParseToInt) {
                  //     _ceilWidth = parseInt(_ceilWidth);
                  // };

                  _val = _ceilWidth * (ind + 1) - _ceilWidth / 2;
              }        }
          if (isNaN(_val)) {
              _val = 0;
          }
          return _val;
      }
      getZAxisPosition(data) {
          let _val = 0;
          let _range = this.boundbox.max.z - this.boundbox.min.z;
          let dataLen = this.zAxisAttribute.section.length;
          let ind = _.indexOf(this.zAxisAttribute.section, data); //先不考虑不存在的值
          var layoutType = this.coord.zAxis.layoutType;

          if (dataLen == 1) {
              _val = _range / 2;
          } else {
              if (layoutType == "rule") {
                  //折线图的xyaxis就是 rule
                  _val = ind / (dataLen - 1) * _range;
              }            if (layoutType == "proportion") {
                  //按照数据真实的值在minVal - maxVal 区间中的比例值
                  // if (val == undefined) {
                  //     val = (ind * (this.maxVal - this.minVal) / (dataLen - 1)) + this.minVal;
                  // };
                  // x = _range * ((val - this.minVal) / (this.maxVal - this.minVal));
                  _val = _range * (data / (maxVal - minVal));
              }            if (layoutType == "peak") {
                  //柱状图的就是peak
                  var _ceilWidth = _range / dataLen;
                  // if (this.posParseToInt) {
                  //     _ceilWidth = parseInt(_ceilWidth);
                  // };

                  _val = _ceilWidth * (ind + 1) - _ceilWidth / 2;
              }        }
          if (isNaN(_val)) {
              _val = 0;
          }
          return _val;
      }

      getCeilSize() {

          let ceil = new Vector3$1();
          let size = this.boundbox.getSize();
          let dataLenX = this.xAxisAttribute.section.length;
          let dataLenY = this.yAxisAttribute.section.length;
          let dataLenZ = this.zAxisAttribute.section.length;

          ceil.setX(size.x / (dataLenX - 1));
          ceil.setY(size.y / (dataLenY - 1));
          ceil.setZ(size.z / (dataLenZ - 1));

          return ceil;
      }

  }

  class AxisAttribute {
      constructor() {
          this.field = '';
          this.data = null;
          this.section = [];
      }
      setField(val) {
          this.field = val;
      }
      setData(data) {
          this.data = data;
      }
      setDataSection(section) {
          this.section = section;
      }
      computeDataSection(joinArr = []) {
          joinArr = joinArr.concat(this.data);
          let arr = _.flatten(joinArr);
          for (var i = 0, il = arr.length; i < il; i++) {
              arr[i] = Number(arr[i] || 0);
              if (isNaN(arr[i])) {
                  arr.splice(i, 1);
                  i--;
                  il--;
              }
          }        this.section = DataSection.section(arr);
      }
  }

  var coord = {
      // rect : Rect,
      // polar : Polar
      cartesian3d: Cartesian3D,
      coord3d: InertialSystem
  };

  var components = {}
  // theme : Theme,
  // legend : Legend,
  // dataZoom : DataZoom,
  // markLine : MarkLine,
  // markPoint : MarkPoint,
  // anchor : Anchor,
  // tips : Tips,
  // barTgi : BarTgi,
  // waterMark : WaterMark,
  // cross : Cross


  // //皮肤设定begin ---------------
  // //如果数据库中有项目皮肤
  // var projectTheme = []; //从数据库中查询出来设计师设置的项目皮肤
  // if( projectTheme && projectTheme.length ){
  //     globalTheme.set( projectTheme );
  // };
  //皮肤设定end -----------------


  ;var Chartx3d = {
      instances: {},
      create: function (el, data, opts) {
          let me = this;
          let chart = null;

          //这个el如果之前有绘制过图表，那么就要在instances中找到图表实例，然后销毁
          var chart_id = $.query(el).getAttribute("chart_id");
          if (chart_id != undefined) {
              var _chart = me.instances[chart_id];
              if (_chart) {
                  _chart.destroy();
              }            delete me.instances[chart_id];
          }
          //默认为惯性坐标系
          let Coord = InertialSystem;

          if (opts.coord && opts.coord.type) {
              Coord = coord[opts.coord.type];
          }
          chart = new Chart3d({ el, data, opts });

          chart.setCoord(Coord);

          for (var p in components) {
              chart.addComponent(components[p]);
          }

          //try {

          //chart = new Coord(el, data, opts, graphs, components);
          if (chart) {

              chart.draw();

              me.instances[chart.id] = chart;
              chart.on("destroy", function () {
                  me.instances[chart.id] = null;
                  delete me.instances[chart.id];
              });
          }        //} catch(err){
          //    throw "Chatx Error：" + err
          //};
          return chart;
      },
      options: {}
  };

  return Chartx3d;

});
