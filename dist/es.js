function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _construct(Parent, args, Class) {
  if (_isNativeReflectConstruct()) {
    _construct = Reflect.construct;
  } else {
    _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) _setPrototypeOf(instance, Class.prototype);
      return instance;
    };
  }

  return _construct.apply(null, arguments);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();

  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
        result;

    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;

      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

function _superPropBase(object, property) {
  while (!Object.prototype.hasOwnProperty.call(object, property)) {
    object = _getPrototypeOf(object);
    if (object === null) break;
  }

  return object;
}

function _get(target, property, receiver) {
  if (typeof Reflect !== "undefined" && Reflect.get) {
    _get = Reflect.get;
  } else {
    _get = function _get(target, property, receiver) {
      var base = _superPropBase(target, property);

      if (!base) return;
      var desc = Object.getOwnPropertyDescriptor(base, property);

      if (desc.get) {
        return desc.get.call(receiver);
      }

      return desc.value;
    };
  }

  return _get(target, property, receiver || target);
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var _ = {};
var breaker = {};
var ArrayProto = Array.prototype,
    ObjProto = Object.prototype,
    FuncProto = Function.prototype; // Create quick reference variables for speed access to core prototypes.

var push = ArrayProto.push,
    slice = ArrayProto.slice,
    concat = ArrayProto.concat,
    toString = ObjProto.toString,
    hasOwnProperty = ObjProto.hasOwnProperty; // All **ECMAScript 5** native function implementations that we hope to use
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

var shallowProperty = function shallowProperty(key) {
  return function (obj) {
    return obj == null ? void 0 : obj[key];
  };
};

var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
var getLength = shallowProperty('length');

var isArrayLike = function isArrayLike(collection) {
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

  for (var key in obj) {
    if (_.has(obj, key)) keys.push(key);
  }

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
}); //if (!_.isArguments(arguments)) {

_.isArguments = function (obj) {
  return !!(obj && _.has(obj, 'callee'));
}; //}


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

  for (var key in obj) {
    if (_.has(obj, key)) return false;
  }

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

  for (; i < length; i++) {
    if (array[i] === item) return i;
  }

  return -1;
};

_.isWindow = function (obj) {
  return obj != null && obj == obj.window;
}; // Internal implementation of a recursive `flatten` function.


var flatten = function flatten(input, shallow, output) {
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
}; // Flatten out an array, either recursively (by default), or just one level.


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
}; // Return the minimum element (or element-based computation).


_.min = function (obj, iterator, context) {
  if (!iterator && _.isArray(obj) && obj[0] === +obj[0] && obj.length < 65535) {
    return Math.min.apply(Math, obj);
  }

  if (!iterator && _.isEmpty(obj)) return Infinity;
  var result = {
    computed: Infinity,
    value: Infinity
  };
  each(obj, function (value, index, list) {
    var computed = iterator ? iterator.call(context, value, index, list) : value;
    computed < result.computed && (result = {
      value: value,
      computed: computed
    });
  });
  return result.value;
}; // Return the maximum element or (element-based computation).
// Can't optimize arrays of integers longer than 65,535 elements.
// See [WebKit Bug 80797](https://bugs.webkit.org/show_bug.cgi?id=80797)


_.max = function (obj, iterator, context) {
  if (!iterator && _.isArray(obj) && obj[0] === +obj[0] && obj.length < 65535) {
    return Math.max.apply(Math, obj);
  }

  if (!iterator && _.isEmpty(obj)) return -Infinity;
  var result = {
    computed: -Infinity,
    value: -Infinity
  };
  each(obj, function (value, index, list) {
    var computed = iterator ? iterator.call(context, value, index, list) : value;
    computed > result.computed && (result = {
      value: value,
      computed: computed
    });
  });
  return result.value;
}; // Return the first value which passes a truth test. Aliased as `detect`.


_.find = _.detect = function (obj, iterator, context) {
  var result;
  any(obj, function (value, index, list) {
    if (iterator.call(context, value, index, list)) {
      result = value;
      return true;
    }
  });
  return result;
}; // Determine if at least one element in the object matches a truth test.
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
}; // Return a version of the array that does not contain the specified value(s).


_.without = function (array) {
  return _.difference(array, slice.call(arguments, 1));
}; // Take the difference between one array and a number of other arrays.
// Only the elements present in just the first array will remain.


_.difference = function (array) {
  var rest = concat.apply(ArrayProto, slice.call(arguments, 1));
  return _.filter(array, function (value) {
    return !_.contains(rest, value);
  });
}; // Produce a duplicate-free version of the array. If the array has already
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
}; // Return the results of applying the iterator to each element.
// Delegates to **ECMAScript 5**'s native `map` if available.


_.map = _.collect = function (obj, iterator, context) {
  var results = [];
  if (obj == null) return results;
  if (nativeMap && obj.map === nativeMap) return obj.map(iterator, context);
  each(obj, function (value, index, list) {
    results.push(iterator.call(context, value, index, list));
  });
  return results;
}; // Determine if the array or object contains a given value (using `===`).
// Aliased as `include`.


_.contains = _.include = function (obj, target) {
  if (obj == null) return false;
  if (nativeIndexOf && obj.indexOf === nativeIndexOf) return obj.indexOf(target) != -1;
  return any(obj, function (value) {
    return value === target;
  });
}; // Convenience version of a common use case of `map`: fetching a property.


_.pluck = function (obj, key) {
  return _.map(obj, function (value) {
    return value[key];
  });
}; // Return a random integer between min and max (inclusive).


_.random = function (min, max) {
  if (max == null) {
    max = min;
    min = 0;
  }

  return min + Math.floor(Math.random() * (max - min + 1));
}; // Shuffle a collection.


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
  }

  if (_typeof(target) !== "object" && !_.isFunction(target)) {
    target = {};
  }

  if (length === i) {
    target = this;
    --i;
  }

  for (; i < length; i++) {
    if ((options = arguments[i]) != null) {
      for (name in options) {
        src = target[name];
        copy = options[name];

        if (target === copy || copy === undefined) {
          continue;
        }

        if (deep && copy && _.isObject(copy) && copy.constructor === Object) {
          target[name] = _.extend(deep, src, copy);
        } else {
          target[name] = copy;
        }
      }
    }
  }

  return target;
};

_.clone = function (obj) {
  if (!_.isObject(obj)) return obj;
  return _.isArray(obj) ? obj.slice() : _.extend(true, {}, obj);
}; //********补存一些数学常用方法,暂放在这里文件下,后期多了单独成立一个类库  */
// compute euclidian modulo of m % n
// https://en.wikipedia.org/wiki/Modulo_operation


_.euclideanModulo = function (n, m) {
  return (n % m + m) % m;
};

_.DEG2RAD = Math.PI / 180;
_.RAD2DEG = 180 / Math.PI;

_.degToRad = function (degrees) {
  return degrees * _.DEG2RAD;
};

_.radToDeg = function (radians) {
  return radians * _.RAD2DEG;
};

function normalizeTickInterval(interval, magnitude) {
  var normalized, i; // var multiples = [1, 2, 2.5, 5, 10];

  var multiples = [1, 2, 5, 10]; // round to a tenfold of 1, 2, 2.5 or 5

  normalized = interval / magnitude; // normalize the interval to the nearest multiple

  for (var i = 0; i < multiples.length; i++) {
    interval = multiples[i];

    if (normalized <= (multiples[i] + (multiples[i + 1] || multiples[i])) / 2) {
      break;
    }
  } // multiply back to the correct magnitude


  interval *= magnitude;
  return interval;
}

function correctFloat(num) {
  return parseFloat(num.toPrecision(14));
}

function getLinearTickPositions(arr, $maxPart, $cfg) {
  arr = _.without(arr, undefined, null, "");
  var scale = $cfg && $cfg.scale ? parseFloat($cfg.scale) : 1; //返回的数组中的值 是否都为整数(思霏)  防止返回[8, 8.2, 8.4, 8.6, 8.8, 9]   应该返回[8, 9]

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
      return [min, max]; // min= Math.round(max/2);
    } else if (max < 0) {
      return [max, 0]; //min = max*2;
    } else {
      max = 1;
      return [0, max];
    }
  }

  var length = max - min;

  if (length) {
    var tempmin = min; //保证min>0的时候不会出现负数

    min -= length * 0.05; // S.log(min +":"+ tempmin)

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
      tickPositions = []; // Populate the intermediate values

  pos = roundedMin;

  while (pos <= roundedMax) {
    // Place the tick on the rounded value
    tickPositions.push(pos); // Always add the raw tickInterval, not the corrected one.

    pos = correctFloat(pos + tickInterval); // If the interval is not big enough in the current min - max range to actually increase
    // the loop variable, we need to break out to prevent endless loop. Issue #619

    if (pos === lastPos) {
      break;
    } // Record the last value


    lastPos = pos;
  }

  if (tickPositions.length >= 3) {
    if (tickPositions[tickPositions.length - 2] >= initMax) {
      tickPositions.pop();
    }
  }

  return tickPositions;
}

var dataSection = {
  section: function section($arr, $maxPart, $cfg) {
    return _.uniq(getLinearTickPositions($arr, $maxPart, $cfg));
  }
};

var cloneOptions = function cloneOptions(opt) {
  return _.clone(opt);
};

var cloneData = function cloneData(data) {
  return JSON.parse(JSON.stringify(data));
};

var getDefaultProps = function getDefaultProps(dProps) {
  var target = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  for (var p in dProps) {
    if (!!p.indexOf("_")) {
      if (!dProps[p] || !dProps[p].propertys) {
        //如果这个属性没有子属性了，那么就说明这个已经是叶子节点了
        if (_.isObject(dProps[p]) && !_.isFunction(dProps[p]) && !_.isArray(dProps[p])) {
          target[p] = dProps[p].default;
        } else {
          target[p] = dProps[p];
        }
      } else {
        target[p] = {};
        getDefaultProps(dProps[p].propertys, target[p]);
      }
    }
  }

  return target;
};

var axis = /*#__PURE__*/function () {
  _createClass(axis, null, [{
    key: "defaultProps",
    value: function defaultProps() {
      return {
        layoutType: {
          detail: '布局方式',
          default: 'proportion'
        },
        dataSection: {
          detail: '轴数据集',
          default: []
        },
        sectionHandler: {
          detail: '自定义dataSection的计算公式',
          default: null
        },
        waterLine: {
          detail: '水位线',
          default: null,
          documentation: '水位data，需要混入 计算 dataSection， 如果有设置waterLine， dataSection的最高水位不会低于这个值'
        },
        middleWeight: {
          detail: '区间分隔线',
          default: null,
          documentation: '如果middleweight有设置的话 dataSectionGroup 为被middleweight分割出来的n个数组>..[ [0,50 , 100],[100,500,1000] ]'
        },
        middleWeightPos: {
          detail: '区间分隔线的物理位置，百分比,默认 0.5 ',
          default: null
        },
        symmetric: {
          detail: '自动正负对称',
          default: false,
          documentation: 'proportion下，是否需要设置数据为正负对称的数据，比如 [ 0,5,10 ] = > [ -10, 0 10 ]，象限坐标系的时候需要'
        },
        origin: {
          detail: '轴的起源值',
          default: null,
          documentation: '\
                    1，如果数据中又正数和负数，则默认为0 <br />\
                    2，如果dataSection最小值小于0，则baseNumber为最小值<br />\
                    3，如果dataSection最大值大于0，则baseNumber为最大值<br />\
                    4，也可以由用户在第2、3种情况下强制配置为0，则section会补充满从0开始的刻度值\
                '
        },
        sort: {
          detail: '排序',
          default: null
        },
        posParseToInt: {
          detail: '是否位置计算取整',
          default: false,
          documentation: '比如在柱状图中，有得时候需要高精度的能间隔1px的柱子，那么x轴的计算也必须要都是整除的'
        }
      };
    }
  }]);

  function axis(opt, dataOrg) {
    _classCallCheck(this, axis);

    //源数据
    //这个是一个一定会有两层数组的数据结构，是一个标准的dataFrame数据
    // [ 
    //    [   
    //        [1,2,3],  
    //        [1,2,3]    //这样有堆叠的数据只会出现在proportion的axis里，至少目前是这样
    //    ] 
    //   ,[    
    //        [1,2,3] 
    //    ]   
    // ]
    this._opt = _.clone(opt);
    this.dataOrg = dataOrg || []; //3d中有引用到

    this.dataSectionLayout = []; //和dataSection一一对应的，每个值的pos，//get xxx OfPos的时候，要先来这里做一次寻找
    //轴总长
    //3d中有引用到

    this.axisLength = 1;
    this._cellCount = null;
    this._cellLength = null; //数据变动的时候要置空
    //默认的 dataSectionGroup = [ dataSection ], dataSection 其实就是 dataSectionGroup 去重后的一维版本

    this.dataSectionGroup = [];
    this.originPos = 0; //value为 origin 对应的pos位置

    this._originTrans = 0; //当设置的 origin 和datasection的min不同的时候，
    //min,max不需要外面配置，没意义

    this._min = null;
    this._max = null;

    _.extend(true, this, getDefaultProps(axis.defaultProps()), opt);
  }

  _createClass(axis, [{
    key: "resetDataOrg",
    value: function resetDataOrg(dataOrg) {
      //配置和数据变化
      this.dataSection = [];
      this.dataSectionGroup = [];
      this.dataOrg = dataOrg;
      this._cellCount = null;
      this._cellLength = null;
    }
  }, {
    key: "setAxisLength",
    value: function setAxisLength(length) {
      this.axisLength = length;
      this.calculateProps();
    }
  }, {
    key: "calculateProps",
    value: function calculateProps() {
      var me = this;

      if (this.layoutType == "proportion") {
        if (this._min == null) {
          this._min = _.min(this.dataSection);
        }

        if (this._max == null) {
          this._max = _.max(this.dataSection);
        }
        //如果用户设置了origin，那么就已用户的设置为准

        if (!("origin" in this._opt)) {
          this.origin = 0; //this.dataSection[0];//_.min( this.dataSection );

          if (_.max(this.dataSection) < 0) {
            this.origin = _.max(this.dataSection);
          }

          if (_.min(this.dataSection) > 0) {
            this.origin = _.min(this.dataSection);
          }
        }
        this._originTrans = this._getOriginTrans(this.origin);
        this.originPos = this.getPosOfVal(this.origin);
      }

      this.dataSectionLayout = [];

      _.each(this.dataSection, function (val, i) {
        var ind = i;

        if (me.layoutType == "proportion") {
          ind = me.getIndexOfVal(val);
        }
        var pos = parseInt(me.getPosOf({
          ind: i,
          val: val
        }), 10);
        me.dataSectionLayout.push({
          val: val,
          ind: ind,
          pos: pos
        });
      });
    }
  }, {
    key: "getDataSection",
    value: function getDataSection() {
      //对外返回的dataSection
      return this.dataSection;
    }
  }, {
    key: "setDataSection",
    value: function setDataSection(_dataSection) {
      var me = this; //如果用户没有配置dataSection，或者用户传了，但是传了个空数组，则自己组装dataSection

      if (_.isEmpty(_dataSection) && _.isEmpty(this._opt.dataSection)) {
        if (this.layoutType == "proportion") {
          var arr = this._getDataSection();

          if ("origin" in me._opt) {
            arr.push(me._opt.origin);
          }

          if (arr.length == 1) {
            arr.push(arr[0] * .5);
          }

          if (this.waterLine) {
            arr.push(this.waterLine);
          }

          if (this.symmetric) {
            //如果需要处理为对称数据
            var _min = _.min(arr);

            var _max = _.max(arr);

            if (Math.abs(_min) > Math.abs(_max)) {
              arr.push(Math.abs(_min));
            } else {
              arr.push(-Math.abs(_max));
            }
          }

          for (var ai = 0, al = arr.length; ai < al; ai++) {
            arr[ai] = Number(arr[ai]);

            if (isNaN(arr[ai])) {
              arr.splice(ai, 1);
              ai--;
              al--;
            }
          }

          if (_.isFunction(this.sectionHandler)) {
            this.dataSection = this.sectionHandler(arr);
          }

          if (!this.dataSection || !this.dataSection.length) {
            this.dataSection = dataSection.section(arr, 3);
          }

          if (this.symmetric) {
            //可能得到的区间是偶数， 非对称，强行补上
            var _min = _.min(this.dataSection);

            var _max = _.max(this.dataSection);

            if (Math.abs(_min) > Math.abs(_max)) {
              this.dataSection.push(Math.abs(_min));
            } else {
              this.dataSection.unshift(-Math.abs(_max));
            }
          }

          if (this.dataSection.length == 0) {
            this.dataSection = [0];
          }

          this.dataSectionGroup = [_.clone(this.dataSection)];

          this._middleweight(); //如果有middleweight配置，需要根据配置来重新矫正下datasection


          this._sort();
        } else {
          //非proportion 也就是 rule peak 模式下面
          this.dataSection = _.flatten(this.dataOrg); //this._getDataSection();

          this.dataSectionGroup = [this.dataSection];
        }
      } else {
        this.dataSection = _dataSection || this._opt.dataSection;
        this.dataSectionGroup = [this.dataSection];
      }

      this._middleWeightPos();
    }
  }, {
    key: "_getDataSection",
    value: function _getDataSection() {
      //如果有堆叠，比如[ ["uv","pv"], "click" ]
      //那么这个 this.dataOrg， 也是个对应的结构
      //vLen就会等于2
      var vLen = 1;

      _.each(this.dataOrg, function (arr) {
        vLen = Math.max(arr.length, vLen);
      });

      if (vLen == 1) {
        return this._oneDimensional();
      }

      if (vLen > 1) {
        return this._twoDimensional();
      }
    }
  }, {
    key: "_oneDimensional",
    value: function _oneDimensional() {
      var arr = _.flatten(this.dataOrg); //_.flatten( data.org );


      for (var i = 0, il = arr.length; i < il; i++) {
        arr[i] = arr[i] || 0;
      }
      return arr;
    } //二维的yAxis设置，肯定是堆叠的比如柱状图，后续也会做堆叠的折线图， 就是面积图

  }, {
    key: "_twoDimensional",
    value: function _twoDimensional() {
      var d = this.dataOrg;
      var arr = [];
      var min;

      _.each(d, function (d, i) {
        if (!d.length) {
          return;
        }

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
            var _val = d[ii][i];

            if (!_val && _val !== 0) {
              continue;
            }
            min == undefined && (min = _val);
            min = Math.min(min, _val);

            if (_val >= 0) {
              up_count += _val;
              up_i++;
            } else {
              down_count += _val;
              down_i++;
            }
          }

          up_i && varr.push(up_count);
          down_i && varr.push(down_count);
        }
        arr.push(varr);
      });

      arr.push(min);
      return _.flatten(arr);
    } //val 要被push到datasection 中去的 值
    //主要是用在markline等组件中，当自己的y值超出了yaxis的范围

  }, {
    key: "setWaterLine",
    value: function setWaterLine(val) {
      if (val <= this.waterLine) return;
      this.waterLine = val;

      if (val < _.min(this.dataSection) || val > _.max(this.dataSection)) {
        //waterLine不再当前section的区间内，需要重新计算整个datasection    
        this.setDataSection();
        this.calculateProps();
      }
    }
  }, {
    key: "_sort",
    value: function _sort() {
      if (this.sort) {
        var sort = this._getSortType();

        if (sort == "desc") {
          this.dataSection.reverse(); //dataSectionGroup 从里到外全部都要做一次 reverse， 这样就可以对应上 dataSection.reverse()

          _.each(this.dataSectionGroup, function (dsg, i) {
            dsg.reverse();
          });

          this.dataSectionGroup.reverse(); //dataSectionGroup reverse end
        }
      }
    }
  }, {
    key: "_getSortType",
    value: function _getSortType() {
      var _sort;

      if (_.isString(this.sort)) {
        _sort = this.sort;
      }

      if (!_sort) {
        _sort = "asc";
      }

      return _sort;
    }
  }, {
    key: "_middleweight",
    value: function _middleweight() {

      if (this.middleWeight) {
        //支持多个量级的设置
        if (!_.isArray(this.middleWeight)) {
          this.middleWeight = [this.middleWeight];
        }

        var dMin = _.min(this.dataSection);

        var dMax = _.max(this.dataSection);

        var newDS = [dMin];
        var newDSG = [];

        for (var i = 0, l = this.middleWeight.length; i < l; i++) {
          var preMiddleweight = dMin;

          if (i > 0) {
            preMiddleweight = this.middleWeight[i - 1];
          }
          var middleVal = preMiddleweight + parseInt((this.middleWeight[i] - preMiddleweight) / 2);
          newDS.push(middleVal);
          newDS.push(this.middleWeight[i]);
          newDSG.push([preMiddleweight, middleVal, this.middleWeight[i]]);
        }
        var lastMW = this.middleWeight.slice(-1)[0];

        if (dMax > lastMW) {
          newDS.push(lastMW + (dMax - lastMW) / 2);
          newDS.push(dMax);
          newDSG.push([lastMW, lastMW + (dMax - lastMW) / 2, dMax]);
        } //好了。 到这里用简单的规则重新拼接好了新的 dataSection


        this.dataSection = newDS;
        this.dataSectionGroup = newDSG;
      }
    }
  }, {
    key: "_middleWeightPos",
    value: function _middleWeightPos() {
      var me = this;

      if (this.middleWeightPos) {
        if (!_.isArray(this.middleWeightPos)) {
          this.middleWeightPos = [this.middleWeightPos];
        }
        //如果大于1了则默认按照均分设置

        var _count = 0;

        _.each(this.middleWeightPos, function (pos) {
          _count += pos;
        });

        if (_count < 1) {
          this.middleWeightPos.push(1 - _count);
        }

        if (_count > 1) {
          this.middleWeightPos = null;
        }
      }

      if (this.middleWeight) {
        if (!this.middleWeightPos) {
          this.middleWeightPos = [];
          var _prePos = 0;

          _.each(this.middleWeight, function () {
            var _pos = 1 / (me.middleWeight.length + 1);

            _prePos += _pos;
            me.middleWeightPos.push(_pos);
          });

          this.middleWeightPos.push(1 - _prePos);
        }
      } else {
        this.middleWeightPos = [1];
      }
    } //origin 对应 this.origin 的值

  }, {
    key: "_getOriginTrans",
    value: function _getOriginTrans(origin) {
      var pos = 0;
      var dsgLen = this.dataSectionGroup.length; //var groupLength = this.axisLength / dsgLen;

      for (var i = 0, l = dsgLen; i < l; i++) {
        var ds = this.dataSectionGroup[i];
        var groupLength = this.axisLength * this.middleWeightPos[i];
        var preGroupLenth = 0;

        _.each(this.middleWeightPos, function (mp, mi) {
          if (mi < i) {
            preGroupLenth += me.axisLength * mp;
          }
        });

        if (this.layoutType == "proportion") {
          var min = _.min(ds);

          var max = _.max(ds);

          var amountABS = Math.abs(max - min);

          if (origin >= min && origin <= max) {
            pos = (origin - min) / amountABS * groupLength + preGroupLenth;
            break;
          }
        }
      }

      if (this.sort == "desc") {
        //如果是倒序的
        pos = -(groupLength - pos);
      }
      return parseInt(pos);
    } //opt { val ind pos } 一次只能传一个

  }, {
    key: "_getLayoutDataOf",
    value: function _getLayoutDataOf(opt) {
      var props = ["val", "ind", "pos"];
      var prop;

      _.each(props, function (_p) {
        if (_p in opt) {
          prop = _p;
        }
      });

      var layoutData;

      _.each(this.dataSectionLayout, function (item) {
        if (item[prop] === opt[prop]) {
          layoutData = item;
        }
      });

      return layoutData || {};
    }
  }, {
    key: "getPosOfVal",
    value: function getPosOfVal(val) {
      /* val可能会重复，so 这里得到的会有问题，先去掉
      //先检查下 dataSectionLayout 中有没有对应的记录
      var _pos = this._getLayoutDataOf({ val : val }).pos;
      if( _pos != undefined ){
          return _pos;
      };
      */
      return this.getPosOf({
        val: val
      });
    }
  }, {
    key: "getPosOfInd",
    value: function getPosOfInd(ind) {
      //先检查下 dataSectionLayout 中有没有对应的记录
      var _pos = this._getLayoutDataOf({
        ind: ind
      }).pos;

      if (_pos != undefined) {
        return _pos;
      }
      return this.getPosOf({
        ind: ind
      });
    } //opt {val, ind} val 或者ind 一定有一个

  }, {
    key: "getPosOf",
    value: function getPosOf(opt) {
      var me = this;
      var pos;

      var cellCount = this._getCellCount(); //dataOrg上面的真实数据节点数，把轴分成了多少个节点


      if (this.layoutType == "proportion") {
        var dsgLen = this.dataSectionGroup.length; //var groupLength = this.axisLength / dsgLen;

        for (var i = 0, l = dsgLen; i < l; i++) {
          var ds = this.dataSectionGroup[i];
          var groupLength = this.axisLength * this.middleWeightPos[i];
          var preGroupLenth = 0;

          _.each(this.middleWeightPos, function (mp, mi) {
            if (mi < i) {
              preGroupLenth += me.axisLength * mp;
            }
          });

          var min = _.min(ds);

          var max = _.max(ds);

          var val = "val" in opt ? opt.val : this.getValOfInd(opt.ind);

          if (val >= min && val <= max) {
            var _origin = this.origin; //如果 origin 并不在这个区间

            if (_origin < min || _origin > max) {
              _origin = min;
            }
            var maxGroupDisABS = Math.max(Math.abs(max - _origin), Math.abs(_origin - min));
            var amountABS = Math.abs(max - min);
            var h = maxGroupDisABS / amountABS * groupLength;
            pos = (val - _origin) / maxGroupDisABS * h + preGroupLenth;

            if (isNaN(pos)) {
              pos = parseInt(preGroupLenth);
            }
            break;
          }
        }
      } else {
        if (cellCount == 1) {
          //如果只有一数据，那么就全部默认在正中间
          pos = this.axisLength / 2;
        } else {
          //TODO 这里在非proportion情况下，如果没有opt.ind 那么getIndexOfVal 其实是有风险的，
          //因为可能有多个数据的val一样
          var valInd = "ind" in opt ? opt.ind : this.getIndexOfVal(opt.val);

          if (valInd != -1) {
            if (this.layoutType == "rule") {
              //line 的xaxis就是 rule
              pos = valInd / (cellCount - 1) * this.axisLength;
            }

            if (this.layoutType == "peak") {
              //bar的xaxis就是 peak

              /*
              pos = (this.axisLength/cellCount) 
                    * (valInd+1) 
                    - (this.axisLength/cellCount)/2;
              */
              var _cellLength = this.getCellLength();

              pos = _cellLength * (valInd + 1) - _cellLength / 2;
            }
          }
        }
      }
      !pos && (pos = 0);
      pos = Number(pos.toFixed(1)) + this._originTrans;
      return Math.abs(pos);
    }
  }, {
    key: "getValOfPos",
    value: function getValOfPos(pos) {
      //先检查下 dataSectionLayout 中有没有对应的记录
      var _val = this._getLayoutDataOf({
        pos: pos
      }).val;

      if (_val != undefined) {
        return _val;
      }
      return this._getValOfInd(this.getIndexOfPos(pos));
    } //ds可选

  }, {
    key: "getValOfInd",
    value: function getValOfInd(ind) {
      //先检查下 dataSectionLayout 中有没有对应的记录
      var _val = this._getLayoutDataOf({
        ind: ind
      }).val;

      if (_val != undefined) {
        return _val;
      }
      return this._getValOfInd(ind);
      /*
      if (this.layoutType == "proportion") {
      
      } else {
          //这里的index是直接的对应dataOrg的索引
          var org = ds ? ds : _.flatten(this.dataOrg);
          return org[ind];
      };
      */
    } //这里的ind

  }, {
    key: "_getValOfInd",
    value: function _getValOfInd(ind, ds) {
      var me = this;

      var org = _.flatten(this.dataOrg);

      var val;

      if (this.layoutType == "proportion") {
        var dsgLen = this.dataSectionGroup.length; //var groupLength = this.axisLength / dsgLen;

        _.each(this.dataSectionGroup, function (ds, i) {
          var groupLength = me.axisLength * me.middleWeightPos[i];
          var preGroupLenth = 0;

          _.each(me.middleWeightPos, function (mp, mi) {
            if (mi < i) {
              preGroupLenth += me.axisLength * mp;
            }
          });

          if (parseInt(ind / groupLength) == i || i == me.dataSectionGroup.length - 1) {
            var min = _.min(ds);

            var max = _.max(ds);

            val = min + (max - min) / groupLength * (ind - preGroupLenth);
            return false;
          }
        });
      } else {
        val = org[ind];
      }
      return val;
    }
  }, {
    key: "getIndexOfPos",
    value: function getIndexOfPos(pos) {
      //先检查下 dataSectionLayout 中有没有对应的记录
      var _ind = this._getLayoutDataOf({
        pos: pos
      }).ind;

      if (_ind != undefined) {
        return _ind;
      }
      var ind = 0;
      var cellLength = this.getCellLengthOfPos(pos);

      var cellCount = this._getCellCount();

      if (this.layoutType == "proportion") {
        //proportion中的index以像素为单位 所以，传入的像素值就是index
        return pos;
      } else {
        if (this.layoutType == "peak") {
          ind = parseInt(pos / cellLength);

          if (ind == cellCount) {
            ind = cellCount - 1;
          }
        }

        if (this.layoutType == "rule") {
          ind = parseInt((pos + cellLength / 2) / cellLength);

          if (cellCount == 1) {
            //如果只有一个数据
            ind = 0;
          }
        }
      }
      return ind;
    }
  }, {
    key: "getIndexOfVal",
    value: function getIndexOfVal(val) {
      var valInd = -1;

      if (this.layoutType == "proportion") {
        //先检查下 dataSectionLayout 中有没有对应的记录
        var _ind = this._getLayoutDataOf({
          val: val
        }).ind;

        if (_ind != undefined) {
          return _ind;
        }
        //所以这里要返回pos

        valInd = this.getPosOfVal(val);
      } else {
        _.each(this.dataOrg, function (arr) {
          _.each(arr, function (list) {
            var _ind = _.indexOf(list, val);

            if (_ind != -1) {
              valInd = _ind;
            }
          });
        });
      }

      return valInd;
    }
  }, {
    key: "getCellLength",
    value: function getCellLength() {
      if (this._cellLength !== null) {
        return this._cellLength;
      }

      var axisLength = this.axisLength;
      var cellLength = axisLength;

      var cellCount = this._getCellCount();

      if (cellCount) {
        if (this.layoutType == "proportion") {
          cellLength = 1;
        } else {
          //默认按照 peak 也就是柱状图的需要的布局方式
          cellLength = axisLength / cellCount;

          if (this.layoutType == "rule") {
            if (cellCount == 1) {
              cellLength = axisLength / 2;
            } else {
              cellLength = axisLength / (cellCount - 1);
            }
          }

          if (this.posParseToInt) {
            cellLength = parseInt(cellLength);
          }
        }
      }
      this._cellLength = cellLength;
      return cellLength;
    } //这个getCellLengthOfPos接口主要是给tips用，因为tips中只有x信息

  }, {
    key: "getCellLengthOfPos",
    value: function getCellLengthOfPos(pos) {
      return this.getCellLength();
    } //pos目前没用到，给后续的高级功能预留接口

  }, {
    key: "getCellLengthOfInd",
    value: function getCellLengthOfInd(pos) {
      return this.getCellLength();
    }
  }, {
    key: "_getCellCount",
    value: function _getCellCount() {
      if (this._cellCount !== null) {
        return this._cellCount;
      }

      var cellCount = 0;

      if (this.layoutType == "proportion") {
        cellCount = this.axisLength;
      } else {
        if (this.dataOrg.length && this.dataOrg[0].length && this.dataOrg[0][0].length) {
          cellCount = this.dataOrg[0][0].length;
        }
      }
      this._cellCount = cellCount;
      return cellCount;
    }
  }]);

  return axis;
}();

/**
* 把原始的数据
* field1 field2 field3
*   1      2      3
*   2      3      4
* 这样的数据格式转换为内部的
* [{field:'field1',index:0,data:[1,2]} ......]
* 这样的结构化数据格式。
*/

function parse2MatrixData(list) {
  if (list === undefined || list === null) {
    list = [];
  }

  if (list.length > 0 && !_.isArray(list[0])) {
    var newArr = [];
    var fields = [];
    var fieldNum = 0;

    for (var i = 0, l = list.length; i < l; i++) {
      var row = list[i];

      if (i == 0) {
        for (var f in row) {
          fields.push(f);
        }
        newArr.push(fields);
        fieldNum = fields.length;
      }
      var _rowData = [];

      for (var ii = 0; ii < fieldNum; ii++) {
        _rowData.push(row[fields[ii]]);
      }
      newArr.push(_rowData);
    }
    return newArr;
  } else {
    return list;
  }
}

function dataFrame (data, opt) {
  //数据做一份拷贝，避免污染源数据
  data = JSON.parse(JSON.stringify(data));
  var dataFrame = {
    //数据框架集合
    length: 0,
    org: [],
    //最原始的数据，一定是个行列式，因为如果发现是json格式数据，会自动转换为行列式
    data: [],
    //最原始的数据转化后的数据格式：[o,o,o] o={field:'val1',index:0,data:[1,2,3]}
    getRowDataAt: _getRowDataAt,
    getRowDataOf: _getRowDataOf,
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

  if (data.length > 0 && !_.isArray(data[0])) {
    data = parse2MatrixData(data);
  }
  dataFrame.length = data.length - 1; //设置好数据区间end值

  dataFrame.range.end = dataFrame.length - 1; //然后检查opts中是否有dataZoom.range

  if (opt && opt.dataZoom && opt.dataZoom.range) {
    _.extend(dataFrame.range, opt.dataZoom.range);
  }

  if (data.length && data[0].length && !~data[0].indexOf("__index__")) {
    //如果数据中没有用户自己设置的__index__，那么就主动添加一个__index__，来记录元数据中的index
    for (var i = 0, l = data.length; i < l; i++) {
      if (!i) {
        data[0].push("__index__");
      } else {
        data[i].push(i - 1);
      }
    }
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
  }
  dataFrame.data = total; //填充好total的data并且把属于yAxis的设置为number

  for (var a = 1, al = data.length; a < al; a++) {
    for (var b = 0, bl = data[a].length; b < bl; b++) {
      var _val = data[a][b]; //如果用户传入的数据是个number，那么就转换为真正的Number吧
      //‘223’ --》 223

      if (!isNaN(_val) && _val !== "" && _val !== null) {
        _val = Number(_val);
      }
      total[b].data.push(_val); //total[b].data.push( data[a][b] );
    }
  }

  function getDataOrg($field, format, totalList, lev) {
    if (!lev) lev = 0;
    var arr = totalList || total;

    if (!arr) {
      return;
    }

    if (!format) {
      format = function format(e) {
        return e;
      };
    }

    function _format(data) {
      for (var i = 0, l = data.length; i < l; i++) {
        data[i] = format(data[i]);
      }
      return data;
    }

    if (!_.isArray($field)) {
      $field = [$field];
    }

    var newData = [];

    for (var i = 0, l = $field.length; i < l; i++) {

      if (_.isArray($field[i])) {
        newData.push(getDataOrg($field[i], format, totalList, lev + 1));
      } else {
        var _fieldData = newData;

        if (!lev) {
          _fieldData = [];
        }

        for (var ii = 0, iil = arr.length; ii < iil; ii++) {
          if ($field[i] == arr[ii].field) {

            _fieldData.push(_format(arr[ii].data.slice(dataFrame.range.start, dataFrame.range.end + 1)));

            break;
          }
        }

        if (!lev) {
          newData.push(_fieldData);
        }
      }
    }

    return newData;
  }
  /*
   * 获取某一行数据
  */

  function _getRowDataAt(index) {
    var o = {};
    var data = dataFrame.data;

    for (var a = 0; a < data.length; a++) {
      o[data[a].field] = data[a].data[dataFrame.range.start + index];
    }
    return o;
  }
  /**
   * obj => {uv: 100, pv: 10 ...}
   */


  function _getRowDataOf(obj) {
    !obj && (obj = {});
    var arr = [];
    var expCount = 0;

    for (var p in obj) {
      expCount++;
    }

    if (expCount) {
      for (var i = dataFrame.range.start; i <= dataFrame.range.end; i++) {
        var matchNum = 0;

        _.each(dataFrame.data, function (fd) {
          if (fd.field in obj && fd.data[i] == obj[fd.field]) {
            matchNum++;
          }
        });

        if (matchNum == expCount) {
          //说明这条数据是完全和查询
          arr.push(_getRowDataAt(i));
        }
      }
    }
    return arr;
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

var RESOLUTION = typeof window !== 'undefined' ? window.devicePixelRatio : 1;

var addOrRmoveEventHand = function addOrRmoveEventHand(domHand, ieHand) {
  if (document[domHand]) {
    var eventDomFn = function eventDomFn(el, type, fn) {
      if (el.length) {
        for (var i = 0; i < el.length; i++) {
          eventDomFn(el[i], type, fn);
        }
      } else {
        el[domHand](type, fn, false);
      }
    };
    return eventDomFn;
  } else {
    var eventFn = function eventFn(el, type, fn) {
      if (el.length) {
        for (var i = 0; i < el.length; i++) {
          eventFn(el[i], type, fn);
        }
      } else {
        el[ieHand]("on" + type, function () {
          return fn.call(el, window.event);
        });
      }
    };
    return eventFn;
  }
};

var $ = {
  // dom操作相关代码
  query: function query(el) {
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
  offset: function offset(el) {
    var box = el.getBoundingClientRect(),
        doc = el.ownerDocument,
        body = doc.body,
        docElem = doc.documentElement,
        // for ie  
    clientTop = docElem.clientTop || body.clientTop || 0,
        clientLeft = docElem.clientLeft || body.clientLeft || 0,
        // In Internet Explorer 7 getBoundingClientRect property is treated as physical, 
    // while others are logical. Make all logical, like in IE8. 
    zoom = 1;

    if (body.getBoundingClientRect) {
      var bound = body.getBoundingClientRect();
      zoom = (bound.right - bound.left) / body.clientWidth;
    }

    if (zoom > 1) {
      clientTop = 0;
      clientLeft = 0;
    }

    var top = box.top / zoom + (window.pageYOffset || docElem && docElem.scrollTop / zoom || body.scrollTop / zoom) - clientTop,
        left = box.left / zoom + (window.pageXOffset || docElem && docElem.scrollLeft / zoom || body.scrollLeft / zoom) - clientLeft;
    return {
      top: top,
      left: left
    };
  },
  addEvent: addOrRmoveEventHand("addEventListener", "attachEvent"),
  removeEvent: addOrRmoveEventHand("removeEventListener", "detachEvent"),
  pageX: function pageX(e) {
    if (e.pageX) return e.pageX;else if (e.clientX) return e.clientX + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft);else return null;
  },
  pageY: function pageY(e) {
    if (e.pageY) return e.pageY;else if (e.clientY) return e.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);else return null;
  },

  /**
   * 创建dom
   * @param {string} id dom id 待用
   * @param {string} type : dom type， such as canvas, div etc.
   */
  createCanvas: function createCanvas(_width, _height, id) {
    var canvas = document.createElement("canvas");
    canvas.style.position = 'absolute';
    canvas.style.width = _width + 'px';
    canvas.style.height = _height + 'px';
    canvas.style.left = 0;
    canvas.style.top = 0;
    canvas.setAttribute('width', _width * RESOLUTION);
    canvas.setAttribute('height', _height * RESOLUTION);
    canvas.setAttribute('id', id);
    return canvas;
  },
  createView: function createView(_width, _height, id) {
    var view = document.createElement("div");
    view.className = "canvax-view";
    view.style.cssText += "position:relative;width:100%;height:100%;";
    var stageView = document.createElement("div");
    stageView.style.cssText += "position:absolute;width:" + _width + "px;height:" + _height + "px;"; //用来存放一些dom元素

    var domView = document.createElement("div");
    domView.style.cssText += "position:absolute;width:" + _width + "px;height:" + _height + "px;";
    view.appendChild(stageView);
    view.appendChild(domView);
    return {
      view: view,
      stageView: stageView,
      domView: domView
    };
  } //dom相关代码结束

};

/**
 * 系统皮肤
 */
var _colors = ["#ff8533", "#73ace6", "#82d982", "#e673ac", "#cd6bed", "#8282d9", "#c0e650", "#e6ac73", "#6bcded", "#73e6ac", "#ed6bcd", "#9966cc"];
var globalTheme = {
  colors: _colors,
  set: function set(colors) {
    this.colors = colors;
    /*
    var me = this;
    _.each( colors, function( color , i ){
        me.colors[i] = color;
    } );
    */

    return this.colors;
  },
  get: function get() {
    return this.colors;
  }
};

var parse = {
  _eval: function _eval(code, target, paramName, paramValue) {
    return paramName ? new Function(paramName, code + "; return ".concat(target, ";"))(paramValue) : new Function(code + "; return ".concat(target, ";"))();
  },
  parse: function parse(code, range, data, variablesFromComponent) {
    try {
      var isVariablesDefined = range && range.length && range.length === 2 && range[1] > range[0]; // 若未定义

      if (!isVariablesDefined) {
        return this._eval(code, 'options');
      }

      var variablesInCode = this._eval(code, 'variables');

      if (typeof variablesInCode === 'function') {
        variablesInCode = variablesInCode(data) || {};
      }

      var variables = {};

      if (variablesFromComponent !== undefined) {
        variables = typeof variablesFromComponent === 'function' ? variablesFromComponent(data) : variablesFromComponent;
      }

      variables = _.extend(true, {}, variablesInCode, variables);
      var codeWithoutVariables = code.slice(0, range[0]) + code.slice(range[1]);
      return this._eval(codeWithoutVariables, 'options', 'variables', variables);
    } catch (e) {
      console.log('parse error');
      return {};
    }
  }
};

//图表皮肤
var globalAnimationEnabled = true; //是否开启全局的动画开关

var global = {
  create: function create(el, _data, _opt) {
    var chart = null;
    var me = this;
    var data = cloneData(_data);
    var opt = cloneOptions(_opt);

    var _destroy = function _destroy() {
      me.instances[chart.id] = null;
      delete me.instances[chart.id];
    }; //这个el如果之前有绘制过图表，那么就要在instances中找到图表实例，然后销毁


    var chart_id = $.query(el).getAttribute("chart_id");

    if (chart_id != undefined) {
      var _chart = me.instances[chart_id];

      if (_chart) {
        _chart.destroy();

        _chart.off && _chart.off("destroy", _destroy);
      }
      delete me.instances[chart_id];
    }

    var dimension = 2; //3d图表的话，本地调试的时候自己在全局chartx3d上面提供is3dOpt变量

    if (me.__dimension == 3 || me.is3dOpt && me.is3dOpt(_opt)) {
      dimension = 3;
    }

    var componentModules = me._getComponentModules(dimension); //如果用户没有配置coord，说明这个图表是一个默认目标系的图表，比如标签云


    var Chart = me._getComponentModule('chart', dimension); //try {


    chart = new Chart(el, data, opt, componentModules);

    if (chart) {
      chart.draw();
      me.instances[chart.id] = chart;
      chart.on("destroy", _destroy);
    }
    //    throw "Chatx Error：" + err
    //};

    return chart;
  },
  setGlobalTheme: function setGlobalTheme(colors) {
    globalTheme.set(colors);
  },
  getGlobalTheme: function getGlobalTheme() {
    return globalTheme.get();
  },
  instances: {},
  getChart: function getChart(chartId) {
    return this.instances[chartId];
  },
  resize: function resize() {
    //调用全局的这个resize方法，会把当前所有的 chart instances 都执行一遍resize
    for (var c in this.instances) {
      this.instances[c].resize();
    }
  },
  //第二个参数是用户要用来覆盖chartpark中的配置的options
  getOptionsOld: function getOptionsOld(chartPark_cid) {
    var JsonSerialize = {
      prefix: '[[JSON_FUN_PREFIX_',
      suffix: '_JSON_FUN_SUFFIX]]'
    };

    var parse$$1 = function parse$$1(string) {
      return JSON.parse(string, function (key, value) {
        if (typeof value === 'string' && value.indexOf(JsonSerialize.suffix) > 0 && value.indexOf(JsonSerialize.prefix) == 0) {
          return new Function('return ' + value.replace(JsonSerialize.prefix, '').replace(JsonSerialize.suffix, ''))();
        }
        return value;
      }) || {};
    };

    return parse$$1(decodeURIComponent(this.options[chartPark_cid] || '%7B%7D'));
  },
  getOptionsNew: function getOptionsNew(chartPark_cid, data, variables) {
    var chartConfig = this.options[chartPark_cid];
    var code = decodeURIComponent(chartConfig.code);
    var range = chartConfig.range;
    return parse.parse(code, range, data, variables);
  },

  /** 
   * 获取图表配置并解析
   * 
   * @param {int} chartPark_cid  chartpark图表id
   * @param {Object} userOptions 用户自定义图表options，若无chartPark_cid时默认使用该配置，否则使用该配置覆盖原chartpark中的图表配置
   * @param {Array} data 绘制图表使用的数据
   * @param {Object | Function} variables 用于覆盖chartpark图表配置的变量，为Function时，其返回值必须为Object
   * @returns {Object} 正常情况返回图表配置，否则返回{}
  */
  getOptions: function getOptions(chartPark_cid, userOptions, data, variables) {
    if (!this.options[chartPark_cid]) {
      return userOptions || {};
    }
    var chartConfig = this.options[chartPark_cid];
    var optionsFromChartPark = typeof chartConfig === 'string' ? this.getOptionsOld(chartPark_cid) : this.getOptionsNew(chartPark_cid, data || [], variables || {});

    if (userOptions) {
      optionsFromChartPark = _.extend(true, optionsFromChartPark, userOptions);
    }
    return optionsFromChartPark;
  },
  calculateOptions: function calculateOptions(chartPark_cid, data, variables) {
    return this.getOptions(chartPark_cid, undefined, data, variables);
  },
  components: {
    c_2d: {
      /*
      modules:{
          coord : {
              empty : ..,
              rect  : ..,
              ...
          },
          graphs : {
              //empty : .., //一般只有coord才会有empty
              bar   : ..,
              ...
          }
      },
      get: function( name, type ){}
      */
    },
    c_3d: {//所有3d组件,同上
    }
  },
  _getComponentModules: function _getComponentModules(dimension) {
    var comps = this.components.c_2d;

    if (dimension == 3) {
      comps = this.components.c_3d;
    }

    if (!comps.modules) {
      comps.modules = {};
    }

    if (!comps.get) {
      comps.get = function (name, type) {
        if (!type) {
          type = "empty";
        }
        name = name.toLowerCase();
        type = type.toLowerCase();
        var _module = comps.modules[name];

        if (_module && _module[type]) {
          return _module[type];
        }
      };
    }
    return comps;
  },

  /**
   * @param {compModule} 要注册进去的模块名称
   * @param {name} 要获取的comp名称
   * @param { dimension,type } 后面可以传传两个参数 
   * @param { dimension } 如果有四个参数，那么第三个肯定是type，第四个肯定是dimension 
   */
  registerComponent: function registerComponent(compModule, name) {
    var dimension = 2;
    var type = "empty";

    if (arguments.length == 3) {
      var arg2 = arguments[2];

      if (_.isNumber(arg2)) {
        if (arg2 == 3) {
          dimension = 3;
        }
      }

      if (_.isString(arg2)) {
        type = arg2;
      }
    }

    if (arguments.length == 4) {
      //那么肯定是有传 type  dimension 两个值
      type = arguments[2];

      if (arguments[3] == 3) {
        dimension = 3;
      }
    }

    var comps = this._getComponentModules(dimension).modules;

    name = name.toLowerCase();
    type = type.toLowerCase();
    var _comp = comps[name];

    if (!_comp) {
      _comp = comps[name] = {};
    }

    if (!_comp[type]) {
      _comp[type] = compModule;
    }
    return comps;
  },

  /**
   * 
   * @param {name} 要获取的comp名称
   * @param { dimension,type } 后面可以传传两个参数 
   * @param { dimension } 如果有三个参数，那么第二个肯定是type，第三个肯定是dimension 
   */
  _getComponentModule: function _getComponentModule(name) {
    var dimension = 2;
    var type = "empty";

    if (arguments.length == 2) {
      var arg1 = arguments[1];

      if (_.isNumber(arg1)) {
        if (arg1 == 3) {
          dimension = 3;
        }
      }

      if (_.isString(arg1)) {
        type = arg1;
      }
    }

    if (arguments.length == 3) {
      //那么肯定是有传 type  dimension 两个值
      type = arguments[1];

      if (arguments[2] == 3) {
        dimension = 3;
      }
    }
    name = name.toLowerCase();
    type = type.toLowerCase();

    var _comp = this._getComponentModules(dimension).modules[name];

    return _comp ? _comp[type] : undefined;
  },
  setAnimationEnabled: function setAnimationEnabled(bool) {
    globalAnimationEnabled = bool;
  },
  getAnimationEnabled: function getAnimationEnabled(bool) {
    return globalAnimationEnabled;
  },
  //所有布局算法
  layout: {},
  registerLayout: function registerLayout(name, algorithm) {
    this.layout[name] = algorithm;
  },
  props: {},
  getProps: function getProps() {
    //计算全量的 props 属性用来提供智能提示 begin
    //这部分代码没必要部署到 打包的环境， 只是chartpark需要用来做智能提示， 自动化测试
    var allProps = {};

    var allModules = this._getComponentModules().modules;

    var _loop = function _loop() {
      if (n == 'chart') return "continue";
      allProps[n] = {
        detail: n,
        propertys: {} //typeMap: {}

      };

      if (n == 'graphs') {
        _graphNames = _.map(allModules.graphs, function (val, key) {
          return key;
        });
        allProps.graphs.documentation = "可选的graphs类型有：\n" + _graphNames.join('\n');
      }
      allConstructorProps = {}; //整个原型链路上面的 defaultProps

      protoModule = null;

      for (mn in allModules[n]) {
        if (protoModule) break;
        protoModule = allModules[n][mn].prototype;
      }

      function _setProps(m) {
        var constructorModule = m.constructor.__proto__; //m.constructor;

        if (!constructorModule._isComponentRoot) {
          _setProps(constructorModule.prototype);
        }

        if (constructorModule.defaultProps && _.isFunction(constructorModule.defaultProps)) {
          var _dprops = constructorModule.defaultProps();

          _.extend(allConstructorProps, _dprops);
        }
      }

      _setProps(protoModule);

      allProps[n].propertys = _.extend(allConstructorProps, allProps[n].propertys);

      var _loop2 = function _loop2() {
        module = allModules[n][mn];
        moduleProps = module.defaultProps ? module.defaultProps() : {}; //处理props上面所有的 _props 依赖 begin

        function setChildProps(p) {
          if (p._props) {
            var _propsIsArray = _.isArray(p._props);

            for (var k in p._props) {
              if (!_propsIsArray) {
                p[k] = {
                  detail: k,
                  propertys: {}
                };
              }
              var _module = p._props[k];

              if (_module.defaultProps) {
                var _moduleProps;

                var allConstructorProps;

                (function () {
                  var _setProps = function _setProps(m) {
                    if (m.__proto__.__proto__) {
                      _setProps(m.__proto__);
                    }

                    if (m.defaultProps && _.isFunction(m.defaultProps)) {
                      var _dprops = m.defaultProps();

                      if (_dprops._props) {
                        //如果子元素还有 _props 依赖， 那么就继续处理
                        setChildProps(_dprops);
                      }
                      _dprops && _.extend(allConstructorProps, _dprops);
                    }
                  };

                  _moduleProps = _module.defaultProps(); //先把ta原型上面的所有属性都添加到 _moduleProps 

                  allConstructorProps = {};

                  _setProps(_module.__proto__);

                  _moduleProps = _.extend(allConstructorProps, _moduleProps);

                  if (_propsIsArray) {
                    _.extend(p, _moduleProps);
                  } else {
                    p[k].propertys = _moduleProps;
                    setChildProps(p[k].propertys);
                  }
                })();
              }
            }
          }
        }
        setChildProps(moduleProps); //处理props上面所有的 _props 依赖 end
        //这里不能用下面的 extend 方法，

        moduleProps = _.extend({}, allConstructorProps, moduleProps); //如果原型上面是有type 属性的，那么说明，自己是type分类路由的一个分支，放到typeMap下面

        if (allConstructorProps.type) {
          if (!allProps[n].typeMap) allProps[n].typeMap = {};

          if (n == 'graphs') {
            moduleProps.type.values = _graphNames;
            moduleProps.type.documentation = "可选的graphs类型有：\n" + _graphNames.join('\n');
          }
          allProps[n].typeMap[mn] = moduleProps;
        } else {
          _.extend(allProps[n].propertys, moduleProps);
        }
      };

      for (mn in allModules[n]) {
        _loop2();
      }
    };

    for (var n in allModules) {
      var _graphNames;

      var allConstructorProps;
      var protoModule;
      var mn;
      var mn;
      var module;
      var moduleProps;

      var _ret = _loop();

      if (_ret === "continue") continue;
    }
    this.props = allProps; //计算全量的 props 属性用来提供智能提示 begin

    return this.props;
  }
};

//十六进制颜色值的正则表达式

var aRound = 360; //一圈的度数

var Cos = Math.cos;
var Sin = Math.sin;

var Polar = /*#__PURE__*/function () {
  function Polar() {
    var opt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var dataFrame = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

    _classCallCheck(this, Polar);

    this._opt = _.clone(opt);
    this.dataFrame = dataFrame;
    this.axisLength = 1;
    this.dataOrg = [];
    this.startAngle = this._opt.startAngle;
    this.allAngles = Math.min(360, this._opt.allAngles);
    this.sort = this._opt.sort;
    this.layoutData = []; //和dataSection一一对应的，每个值的pos,agend,dregg,centerPos

    this.maxRadius = 0; //最大半径值

    this.minRadius = 0; //最小半径值 
  }

  _createClass(Polar, [{
    key: "calculateProps",
    value: function calculateProps() {
      var _this = this;

      var axisLength = 0;
      var percentage = 0;
      var currentAngle = 0;
      var opt = this._opt;
      var angle, endAngle, cosV, sinV, midAngle, quadrant;
      var percentFixedNum = 2;
      var outRadius = opt.node.outRadius;
      var innerRadius = opt.node.innerRadius;
      var moveDis = opt.node.moveDis;
      this.layoutData.forEach(function (item, i) {
        if (!item.enabled) return;
        axisLength += isNaN(+item.value) ? 0 : +item.value;

        if (item.radiusField) {
          _this.maxRadius = Math.max(item.radiusValue, axisLength);
          _this.minRadius = Math.min(item.radiusValue, axisLength);
        }
      });
      this.axisLength = axisLength;

      if (axisLength > 0) {
        //原始算法
        // currentAngle = + opt.startAngle % 360;
        // limitAngle = opt.allAngles + me.startAngle % me.allAngles;
        //新的算法
        //这里只是计算每个扇区的初始位置,所以这里求模就可以啦
        currentAngle = _.euclideanModulo(this.startAngle, aRound); // opt.allAngles = opt.allAngles > 0 ? opt.allAngles : aRound;
        // limitAngle = opt.allAngles + _.euclideanModulo(opt.startAngle, opt.allAngles);

        this.layoutData.forEach(function (item, i) {
          percentage = item.value / axisLength; //enabled为false的sec，比率就设置为0

          if (!item.enabled) {
            percentage = 0;
          }
          angle = _this.allAngles * percentage; //旧的算法
          // endAngle = currentAngle + angle > limitAngle ? limitAngle : me.currentAngle + angle;

          endAngle = currentAngle + angle;
          midAngle = currentAngle + angle * 0.5;
          cosV = Cos(_.degToRad(midAngle));
          sinV = Sin(_.degToRad(midAngle));
          cosV = cosV.toFixed(5);
          sinV = sinV.toFixed(5);
          quadrant = _this.getAuadrant(midAngle); //如果用户在配置中制定了半径字段,这里需要计算相对的半径比例值

          if (!!item.radiusField) {
            // var _rr = Number(item.rowData[opt.node.radius]);
            outRadius = parseInt((opt.node.outRadius - opt.node.innerRadius) * ((item.radiusValue - _this.minRadius) / (_this.maxRadius - _this.minRadius)) + opt.node.innerRadius);
          }

          _.extend(item, {
            outRadius: outRadius,
            innerRadius: innerRadius,
            startAngle: currentAngle,
            //起始角度
            endAngle: endAngle,
            //结束角度
            midAngle: midAngle,
            //中间角度
            moveDis: moveDis,
            outOffsetx: moveDis * 0.7 * cosV,
            //focus的事实外扩后圆心的坐标x
            outOffsety: moveDis * 0.7 * sinV,
            //focus的事实外扩后圆心的坐标y
            centerx: outRadius * cosV,
            centery: outRadius * sinV,
            outx: (outRadius + moveDis) * cosV,
            outy: (outRadius + moveDis) * sinV,
            edgex: (outRadius + moveDis) * cosV,
            edgey: (outRadius + moveDis) * sinV,
            orginPercentage: percentage,
            percentage: (percentage * 100).toFixed(percentFixedNum),
            quadrant: quadrant,
            //象限
            isRightSide: quadrant == 1 || quadrant == 4 ? 1 : 0,
            cosV: cosV,
            sinV: sinV
          });

          currentAngle += angle;
        });
      }
    }
    /**
     *  重设数据后,需要调用setDataFrame与calculateProps 重新计算layoutData
     * @param {ArryObject} dataFrame 
     */

  }, {
    key: "resetData",
    value: function resetData(dataFrame) {
      this.dataFrame = dataFrame || [];
      this.axisLength = 1;
      this.dataOrg = [];
      this.startAngle = this._opt.startAngle || -90;
      this.allAngles = this._opt.allAngles || 360;
      this.layoutData = [];
    }
  }, {
    key: "setOption",
    value: function setOption() {
      var opt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      Object.assign(this._opt, opt);
      this.startAngle = this._opt.startAngle;
      this.allAngles = Math.min(360, this._opt.allAngles);
      this.sort = this._opt.sort;
    }
  }, {
    key: "setDataFrame",
    value: function setDataFrame(dataFrame) {
      var _this2 = this;

      var data = [];
      var opt = this._opt;
      var field = opt.field;
      var labelField = opt.groupField || opt.label.field || opt.field;
      var radiusField = opt.node.radius;
      dataFrame = dataFrame || this.dataFrame;
      this.dataFrame = dataFrame;
      this.dataOrg = [];

      for (var i = 0, l = dataFrame.length; i < l; i++) {
        var rowData = dataFrame.getRowDataAt(i);
        var layoutData = {
          rowData: rowData,
          //把这一行数据给到layoutData引用起来
          enabled: true,
          //是否启用，显示在列表中
          value: rowData[field],
          label: rowData[labelField],
          iNode: i
        };
        this.dataOrg.push(rowData[field]);

        if (this._isFiled(radiusField, layoutData)) {
          layoutData.radiusField = radiusField;
          layoutData.radiusValue = rowData[radiusField];
        }

        data.push(layoutData);
      }

      if (this.sort) {
        this.dataOrg = [];
        data.sort(function (a, b) {
          if (_this2.sort == 'asc') {
            return a.value - b.value;
          } else {
            return b.value - a.value;
          }
        }); //重新设定下ind

        _.each(data, function (d, i) {
          d.iNode = i;

          _this2.dataOrg.push(d);
        });
      }
      this.layoutData = data;
      return data;
    }
  }, {
    key: "getLayoutData",
    value: function getLayoutData() {
      return this.layoutData || [];
    }
  }, {
    key: "_isFiled",
    value: function _isFiled(field, layoutData) {
      return field && _.isString(field) && field in layoutData.rowData;
    }
  }, {
    key: "getAuadrant",
    value: function getAuadrant(ang) {
      //获取象限
      ang = _.euclideanModulo(ang, aRound);
      var angleRatio = parseInt(ang / 90);
      var _quadrant = 0;

      switch (angleRatio) {
        case 0:
          _quadrant = 1;
          break;

        case 1:
          _quadrant = 2;
          break;

        case 2:
          _quadrant = 3;
          break;

        case 3:
        case 4:
          _quadrant = 4;
          break;
      }

      return _quadrant;
    }
    /**
     * 通过值或者索引返回数据集对象
     * @param {Object} opt {val:xxx} 或 {ind:xxx} 
     */

  }, {
    key: "_getLayoutDataOf",
    value: function _getLayoutDataOf(opt) {
      //先提供 具体值 和 索引的计算
      var props = [{
        val: "value"
      }, {
        ind: "iNode"
      }];
      var prop = props[Object.keys(opt)[0]];
      var layoutData;

      _.each(this.layoutData, function (item) {
        if (item[prop] === opt[prop]) {
          layoutData = item;
        }
      });

      return layoutData || {};
    }
  }, {
    key: "getRadiansAtR",
    value: function getRadiansAtR() {//基类不实现
    }
  }, {
    key: "getPointsOfR",
    value: function getPointsOfR(r, angleList) {
      var points = [];

      _.each(angleList, function (_a) {
        //弧度
        var _r = Math.PI * _a / 180;

        var point = Polar.getPointInRadianOfR(_r, r);
        points.push(point);
      });

      return points;
    }
  }]);

  return Polar;
}();

Polar.filterPointsInRect = function (points, origin, width, height) {
  for (var i = 0, l = points.length; i < l; i++) {
    if (!Polar.checkPointInRect(points[i], origin, width, height)) {
      //该点不在root rect范围内，去掉
      points.splice(i, 1);
      i--, l--;
    }
  }
  return points;
};

Polar.checkPointInRect = function (p, origin, width, height) {
  var _tansRoot = {
    x: p.x + origin.x,
    y: p.y + origin.y
  };
  return !(_tansRoot.x < 0 || _tansRoot.x > width || _tansRoot.y < 0 || _tansRoot.y > height);
}; //检查由n个相交点分割出来的圆弧是否在rect内


Polar.checkArcInRect = function (arc, r, origin, width, height) {
  var start = arc[0];
  var to = arc[1];
  var differenceR = to.radian - start.radian;

  if (to.radian < start.radian) {
    differenceR = Math.PI * 2 + to.radian - start.radian;
  }
  var middleR = (start.radian + differenceR / 2) % (Math.PI * 2);
  return Polar.checkPointInRect(Polar.getPointInRadianOfR(middleR, r), origin, width, height);
}; //获取某个点相对圆心的弧度值


Polar.getRadianInPoint = function (point) {
  var pi2 = Math.PI * 2;
  return (Math.atan2(point.y, point.x) + pi2) % pi2;
}; //获取某个弧度方向，半径为r的时候的point坐标点位置


Polar.getPointInRadianOfR = function (radian, r) {
  var pi = Math.PI;
  var x = Math.cos(radian) * r;

  if (radian == pi / 2 || radian == pi * 3 / 2) {
    //90度或者270度的时候
    x = 0;
  }
  var y = Math.sin(radian) * r;

  if (radian % pi == 0) {
    y = 0;
  }
  return {
    x: x,
    y: y
  };
};

Polar.getROfNum = function (num, dataSection, width, height) {
  var r = 0;

  var maxNum = _.max(dataSection);

  var minNum = 0; //Math.min( this.rAxis.dataSection );

  var maxR = parseInt(Math.max(width, height) / 2);
  r = maxR * ((num - minNum) / (maxNum - minNum));
  return r;
};

/**
 * Canvax
 *
 * @author 释剑 (李涛, litao.lt@alibaba-inc.com)
 *
 * canvas 上委托的事件管理
 */

var Event = function Event(evt) {
  var eventType = "CanvaxEvent";

  if (_.isString(evt)) {
    eventType = evt;
  }

  if (_.isObject(evt) && evt.type) {
    eventType = evt.type;

    _.extend(this, evt);
  }
  this.target = null;
  this.currentTarget = null;
  this.type = eventType;
  this.point = null;
  var me = this;
  this._stopPropagation = false; //默认不阻止事件冒泡

  this.stopPropagation = function () {
    me._stopPropagation = true;

    if (_.isObject(evt)) {
      evt._stopPropagation = true;
    }
  };

  this._preventDefault = false; //是否组织事件冒泡

  this.preventDefault = function () {
    me._preventDefault = true;

    if (_.isObject(evt)) {
      evt._preventDefault = true;
    }
  };
};

/**
 * Canvax
 *
 * @author 释剑 (李涛, litao.lt@alibaba-inc.com)
 *
 * canvas 上委托的事件管理
 */
var _mouseEvents = 'mousedown mouseup mouseover mousemove mouseout click dblclick wheel';
var types = {
  _types: _mouseEvents.split(/,| /),
  register: function register(evts) {
    if (!evts) {
      return;
    }

    if (_.isString(evts)) {
      evts = evts.split(/,| /);
    }
    this._types = _mouseEvents.split(/,| /).concat(evts);
  },
  get: function get() {
    return this._types;
  }
};

/**
 * Canvax
 *
 * @author 释剑 (李涛, litao.lt@alibaba-inc.com)
 *
 * 事件管理类
 */
/**
 * 构造函数.
 * @name EventDispatcher
 * @class EventDispatcher类是可调度事件的类的基类，它允许显示列表上的任何对象都是一个事件目标。
 */

var Manager = function Manager() {
  //事件映射表，格式为：{type1:[listener1, listener2], type2:[listener3, listener4]}
  this._eventMap = {};
};

Manager.prototype = {
  /**
   * 判断events里面是否有用户交互事件
   */
  _setEventEnable: function _setEventEnable() {
    var hasInteractionEvent = false;

    for (var t in this._eventMap) {
      if (_.indexOf(types.get(), t) > -1) {
        hasInteractionEvent = true;
      }
    }
    this._eventEnabled = hasInteractionEvent;
  },

  /*
   * 注册事件侦听器对象，以使侦听器能够接收事件通知。
   */
  _addEventListener: function _addEventListener(_type, listener) {
    if (typeof listener != "function") {
      //listener必须是个function呐亲
      return false;
    }

    var addResult = true;
    var self = this;
    var types$$1 = _type;

    if (_.isString(_type)) {
      types$$1 = _type.split(/,| /);
    }

    _.each(types$$1, function (type) {
      var map = self._eventMap[type];

      if (!map) {
        map = self._eventMap[type] = [];
        map.push(listener); //self._eventEnabled = true;

        self._setEventEnable();

        return true;
      }

      if (_.indexOf(map, listener) == -1) {
        map.push(listener); //self._eventEnabled = true;

        self._setEventEnable();

        return true;
      }

      addResult = false;
    });

    return addResult;
  },

  /**
   * 删除事件侦听器。
   */
  _removeEventListener: function _removeEventListener(type, listener) {
    if (arguments.length == 1) return this.removeEventListenerByType(type);
    var map = this._eventMap[type];

    if (!map) {
      return false;
    }

    for (var i = 0; i < map.length; i++) {
      var li = map[i];

      if (li === listener) {
        map.splice(i, 1);

        if (map.length == 0) {
          delete this._eventMap[type];

          this._setEventEnable(); //如果这个如果这个时候child没有任何事件侦听

          /*
          if(_.isEmpty(this._eventMap)){
              //那么该元素不再接受事件的检测
              this._eventEnabled = false;
          }
          */

        }

        return true;
      }
    }

    return false;
  },

  /**
   * 删除指定类型的所有事件侦听器。
   */
  _removeEventListenerByType: function _removeEventListenerByType(type) {
    var map = this._eventMap[type];

    if (!map) {
      delete this._eventMap[type];

      this._setEventEnable(); //如果这个如果这个时候child没有任何事件侦听

      /*
      if(_.isEmpty(this._eventMap)){
          //那么该元素不再接受事件的检测
          this._eventEnabled = false;
      }
      */


      return true;
    }

    return false;
  },

  /**
   * 删除所有事件侦听器。
   */
  _removeAllEventListeners: function _removeAllEventListeners() {
    this._eventMap = {};
    this._eventEnabled = false;
  },

  /**
  * 派发事件，调用事件侦听器。
  */
  _dispatchEvent: function _dispatchEvent(e) {
    var map = this._eventMap[e.type];

    if (map) {
      if (!e.target) e.target = this;
      if (!e.currentTarget) e.currentTarget = this;
      map = map.slice();

      for (var i = 0; i < map.length; i++) {
        var listener = map[i];

        if (typeof listener == "function") {
          listener.call(this, e);
        }
      }
    }

    if (!e._stopPropagation) {
      //向上冒泡
      if (this.parent) {
        e.currentTarget = this.parent;

        this.parent._dispatchEvent(e);
      }
    }

    return true;
  },

  /**
     * 检查是否为指定事件类型注册了任何侦听器。
     */
  _hasEventListener: function _hasEventListener(type) {
    var map = this._eventMap[type];
    return map != null && map.length > 0;
  }
};

var Dispatcher = /*#__PURE__*/function (_Manager) {
  _inherits(Dispatcher, _Manager);

  var _super = _createSuper(Dispatcher);

  function Dispatcher() {
    _classCallCheck(this, Dispatcher);

    return _super.call(this);
  }

  _createClass(Dispatcher, [{
    key: "on",
    value: function on(type, listener) {
      this._addEventListener(type, listener);

      return this;
    }
  }, {
    key: "addEventListener",
    value: function addEventListener(type, listener) {
      this._addEventListener(type, listener);

      return this;
    }
  }, {
    key: "un",
    value: function un(type, listener) {
      this._removeEventListener(type, listener);

      return this;
    }
  }, {
    key: "removeEventListener",
    value: function removeEventListener(type, listener) {
      this._removeEventListener(type, listener);

      return this;
    }
  }, {
    key: "removeEventListenerByType",
    value: function removeEventListenerByType(type) {
      this._removeEventListenerByType(type);

      return this;
    }
  }, {
    key: "removeAllEventListeners",
    value: function removeAllEventListeners() {
      this._removeAllEventListeners();

      return this;
    } //params 要传给evt的eventhandler处理函数的参数，会被merge到Canvax event中

  }, {
    key: "fire",
    value: function fire(eventType, params) {
      //{currentTarget,point,target,type,_stopPropagation}
      var e = new Event(eventType);

      if (params) {
        for (var p in params) {
          if (p != "type") {
            e[p] = params[p];
          }
        }
      }
      var me = this;

      _.each(eventType.split(" "), function (eType) {
        //然后，currentTarget要修正为自己
        e.currentTarget = me;
        me.dispatchEvent(e);
      });

      return this;
    }
  }, {
    key: "dispatchEvent",
    value: function dispatchEvent(evt) {
      //this instanceof DisplayObjectContainer ==> this.children
      //TODO: 这里import DisplayObjectContainer 的话，在displayObject里面的import EventDispatcher from "../event/EventDispatcher";
      //会得到一个undefined，感觉是成了一个循环依赖的问题，所以这里换用简单的判断来判断自己是一个容易，拥有children
      if (this.children && evt.point) {
        var target = this.getObjectsUnderPoint(evt.point, 1)[0];

        if (target) {
          target.dispatchEvent(evt);
        }

        return;
      }

      if (this.context && evt.type == "mouseover") {
        //记录dispatchEvent之前的心跳
        var preHeartBeat = this._heartBeatNum;
        var pregAlpha = this.context.$model.globalAlpha;

        this._dispatchEvent(evt);

        if (preHeartBeat != this._heartBeatNum) {
          this._hoverClass = true;

          if (this.hoverClone) {
            var canvax = this.getStage().parent; //然后clone一份obj，添加到_bufferStage 中

            var activShape = this.clone(true);
            activShape._transform = this.getConcatenatedMatrix();

            canvax._bufferStage.addChildAt(activShape, 0); //然后把自己隐藏了
            //用一个临时变量_globalAlpha 来存储自己之前的alpha


            this._globalAlpha = pregAlpha;
            this.context.globalAlpha = 0;
          }
        }

        return;
      }

      this._dispatchEvent(evt);

      if (this.context && evt.type == "mouseout") {
        if (this._hoverClass && this.hoverClone) {
          //说明刚刚over的时候有添加样式
          var canvax = this.getStage().parent;
          this._hoverClass = false;

          canvax._bufferStage.removeChildById(this.id);

          if (this._globalAlpha) {
            this.context.globalAlpha = this._globalAlpha;
            delete this._globalAlpha;
          }
        }
      }

      return this;
    }
  }, {
    key: "hasEvent",
    value: function hasEvent(type) {
      return this._hasEventListener(type);
    }
  }, {
    key: "hasEventListener",
    value: function hasEventListener(type) {
      return this._hasEventListener(type);
    }
  }, {
    key: "hover",
    value: function hover(overFun, outFun) {
      this.on("mouseover", overFun);
      this.on("mouseout", outFun);
      return this;
    }
  }, {
    key: "once",
    value: function once(type, listener) {
      var me = this;

      var onceHandle = function onceHandle() {
        listener.apply(me, arguments);
        this.un(type, onceHandle);
      };

      this.on(type, onceHandle);
      return this;
    }
  }]);

  return Dispatcher;
}(Manager);

/**
 * Canvax
 *
 * @author 释剑 (李涛, litao.lt@alibaba-inc.com)
 *
 */


var contains = document && document.compareDocumentPosition ? function (parent, child) {
  if (!child) {
    return false;
  }
  return !!(parent.compareDocumentPosition(child) & 16);
} : function (parent, child) {
  if (!child) {
    return false;
  }

  return child !== child && (parent.contains ? parent.contains(child) : true);
};

/**
 * @class Events 事件对象
 * @description 事件对象
 * @author bujue
 */
var Events = /*#__PURE__*/function () {
  function Events() {
    _classCallCheck(this, Events);
  }

  _createClass(Events, [{
    key: "on",
    value: function on(type, listener) {
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
  }, {
    key: "has",
    value: function has(type, listener) {
      if (this._listeners === undefined) return false;
      var listeners = this._listeners;
      return listeners[type] !== undefined && listeners[type].indexOf(listener) !== -1;
    }
  }, {
    key: "off",
    value: function off(type, listener) {
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
  }, {
    key: "fire",
    value: function fire(event) {
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
  }]);

  return Events;
}();

var version = "0.0.44";

var REVISION = version; //draw Point

var LinesMode = 1;
var LineLoopMode = 2;
var LineStripMode = 3; //draw triangle  mode

var TrianglesDrawMode = 4;
var TriangleStripDrawMode = 5;
var TriangleFanDrawMode = 6; //depth buffer 

var NeverDepth = 0;
var AlwaysDepth = 1;
var LessDepth = 2;
var LessEqualDepth = 3;
var EqualDepth = 4;
var GreaterEqualDepth = 5;
var GreaterDepth = 6;
var NotEqualDepth = 7; //cull face

var CullFaceNone = 0;
var CullFaceBack = 1;
var CullFaceFront = 2;

var FrontSide = 0;
var BackSide = 1;
var DoubleSide = 2; //blending 

var NoBlending = 0;
var NormalBlending = 1;
var AdditiveBlending = 2;
var SubtractiveBlending = 3;
var MultiplyBlending = 4;
var CustomBlending = 5;
var AddEquation = 100;
var SubtractEquation = 101;
var ReverseSubtractEquation = 102;
var ZeroFactor = 200;
var OneFactor = 201;
var SrcColorFactor = 202;
var OneMinusSrcColorFactor = 203;
var SrcAlphaFactor = 204;
var OneMinusSrcAlphaFactor = 205;
var DstAlphaFactor = 206;
var OneMinusDstAlphaFactor = 207;
var DstColorFactor = 208;
var OneMinusDstColorFactor = 209;
var SrcAlphaSaturateFactor = 210; //texture map  or format

var RepeatWrapping = 1000;
var ClampToEdgeWrapping = 1001;
var MirroredRepeatWrapping = 1002;
var NearestFilter = 1003;
var NearestMipMapNearestFilter = 1004;
var NearestMipMapLinearFilter = 1005;
var LinearFilter = 1006;
var LinearMipMapNearestFilter = 1007;
var LinearMipMapLinearFilter = 1008;
var UnsignedByteType = 1009;
var ByteType = 1010;
var ShortType = 1011;
var UnsignedShortType = 1012;
var IntType = 1013;
var UnsignedIntType = 1014;
var FloatType = 1015;
var HalfFloatType = 1016;
var UnsignedShort4444Type = 1017;
var UnsignedShort5551Type = 1018;
var UnsignedShort565Type = 1019;
var AlphaFormat = 1021;
var RGBFormat = 1022;
var RGBAFormat = 1023;
var LuminanceFormat = 1024;
var LuminanceAlphaFormat = 1025;
var DepthFormat = 1026;
var DepthStencilFormat = 1027;
var UVMapping = 300; //material  

var NoColors = 0; //不用颜色
 //顶点颜色 去geometry.colors取色

/**
 * @class Vector4
 * @description 用x,y,z,w 表示的四维向量 
 * @author bujue
 */
var Vector4 = /*#__PURE__*/function () {
  function Vector4(x, y, z, w) {
    _classCallCheck(this, Vector4);

    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;
    this.w = w !== undefined ? w : 1;
    this.isVector4 = true;
  }

  _createClass(Vector4, [{
    key: "set",
    value: function set(x, y, z, w) {
      this.x = x;
      this.y = y;
      this.z = z;
      this.w = w;
      return this;
    } //向量乘以一个常量

  }, {
    key: "multiplyScalar",
    value: function multiplyScalar(scalar) {
      this.x *= scalar;
      this.y *= scalar;
      this.z *= scalar;
      this.w *= scalar;
      return this;
    } //判断两个四维向量是否相等

  }, {
    key: "equals",
    value: function equals(v) {
      return v.x === this.x && v.y === this.y && v.z === this.z && v.w === this.w;
    } //复制四维向量

  }, {
    key: "copy",
    value: function copy(v) {
      this.x = v.x;
      this.y = v.y;
      this.z = v.z;
      this.w = v.w !== undefined ? v.w : 1;
      return this;
    }
  }, {
    key: "applyMatrix4",
    value: function applyMatrix4(m) {
      var x = this.x,
          y = this.y,
          z = this.z,
          w = this.w;
      var e = m.elements;
      this.x = e[0] * x + e[4] * y + e[8] * z + e[12] * w;
      this.y = e[1] * x + e[5] * y + e[9] * z + e[13] * w;
      this.z = e[2] * x + e[6] * y + e[10] * z + e[14] * w;
      this.w = e[3] * x + e[7] * y + e[11] * z + e[15] * w;
      return this;
    }
  }, {
    key: "normalize",
    value: function normalize() {
      return this.divideScalar(this.length() || 1);
    }
  }, {
    key: "divideScalar",
    value: function divideScalar(scalar) {
      return this.multiplyScalar(1 / scalar);
    }
  }, {
    key: "length",
    value: function length() {
      return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
    }
  }]);

  return Vector4;
}();

var _Math = {
  DEG2RAD: Math.PI / 180,
  RAD2DEG: 180 / Math.PI,
  clamp: function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  },
  // compute euclidian modulo of m % n
  // https://en.wikipedia.org/wiki/Modulo_operation
  euclideanModulo: function euclideanModulo(n, m) {
    return (n % m + m) % m;
  },
  arrayMin: function arrayMin(array) {
    if (array.length === 0) return Infinity;
    var min = array[0];

    for (var i = 1, l = array.length; i < l; ++i) {
      if (array[i] < min) min = array[i];
    }

    return min;
  },
  arrayMax: function arrayMax(array) {
    if (array.length === 0) return -Infinity;
    var max = array[0];

    for (var i = 1, l = array.length; i < l; ++i) {
      if (array[i] > max) max = array[i];
    }

    return max;
  },
  //是否是2的幂次方
  isPowerOfTwo: function isPowerOfTwo(value) {
    return (value & value - 1) === 0 && value !== 0;
  },
  //向下取一个数最接近的2的幂次方
  floorPowerOfTwo: function floorPowerOfTwo(value) {
    return Math.pow(2, Math.floor(Math.log(value) / Math.LN2));
  },
  //想上取一个数最接近的2的幂次方
  ceilPowerOfTwo: function ceilPowerOfTwo(value) {
    return Math.pow(2, Math.ceil(Math.log(value) / Math.LN2));
  },
  degToRad: function degToRad(degrees) {
    return degrees * _Math.DEG2RAD;
  },
  radToDeg: function radToDeg(radians) {
    return radians * _Math.RAD2DEG;
  }
};

// import { Quaternion } from './Quaternion';
// var quaternion = new Quaternion();
// var quaternion1 = new Quaternion();
// var matrix1 = new Matrix4();
// var min = new Vector3();
// var max = new Vector3();
// var v1 = new Vector3();
// var v2 = new Vector3();

var Vector3 = /*#__PURE__*/function () {
  function Vector3(x, y, z) {
    _classCallCheck(this, Vector3);

    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;
    this.isVector3 = true;
  }

  _createClass(Vector3, [{
    key: "set",
    value: function set(x, y, z) {
      this.x = x;
      this.y = y;
      this.z = z;
      return this;
    }
  }, {
    key: "setScalar",
    value: function setScalar(scalar) {
      this.x = scalar;
      this.y = scalar;
      this.z = scalar;
      return this;
    }
  }, {
    key: "setX",
    value: function setX(x) {
      this.x = x;
      return this;
    }
  }, {
    key: "setY",
    value: function setY(y) {
      this.y = y;
      return this;
    }
  }, {
    key: "setZ",
    value: function setZ(z) {
      this.z = z;
      return this;
    }
  }, {
    key: "setComponent",
    value: function setComponent(index, value) {
      switch (index) {
        case 0:
          this.x = value;
          break;

        case 1:
          this.y = value;
          break;

        case 2:
          this.z = value;
          break;

        default:
          throw new Error('index is out of range: ' + index);
      }

      return this;
    }
  }, {
    key: "getComponent",
    value: function getComponent(index) {
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
  }, {
    key: "clone",
    value: function clone() {
      return new this.constructor(this.x, this.y, this.z);
    }
  }, {
    key: "copy",
    value: function copy(v) {
      this.x = v.x;
      this.y = v.y;
      this.z = v.z;
      return this;
    }
  }, {
    key: "add",
    value: function add(v, w) {
      if (w !== undefined) {
        console.warn('Vector3: .add() now only accepts one argument. Use .addVectors( a, b ) instead.');
        return this.addVectors(v, w);
      }

      this.x += v.x;
      this.y += v.y;
      this.z += v.z;
      return this;
    }
  }, {
    key: "addScalar",
    value: function addScalar(s) {
      this.x += s;
      this.y += s;
      this.z += s;
      return this;
    }
  }, {
    key: "addVectors",
    value: function addVectors(a, b) {
      this.x = a.x + b.x;
      this.y = a.y + b.y;
      this.z = a.z + b.z;
      return this;
    }
  }, {
    key: "addScaledVector",
    value: function addScaledVector(v, s) {
      this.x += v.x * s;
      this.y += v.y * s;
      this.z += v.z * s;
      return this;
    }
  }, {
    key: "sub",
    value: function sub(v, w) {
      if (w !== undefined) {
        console.warn('Vector3: .sub() now only accepts one argument. Use .subVectors( a, b ) instead.');
        return this.subVectors(v, w);
      }

      this.x -= v.x;
      this.y -= v.y;
      this.z -= v.z;
      return this;
    }
  }, {
    key: "subScalar",
    value: function subScalar(s) {
      this.x -= s;
      this.y -= s;
      this.z -= s;
      return this;
    }
  }, {
    key: "subVectors",
    value: function subVectors(a, b) {
      this.x = a.x - b.x;
      this.y = a.y - b.y;
      this.z = a.z - b.z;
      return this;
    }
  }, {
    key: "multiply",
    value: function multiply(v, w) {
      if (w !== undefined) {
        console.warn('Vector3: .multiply() now only accepts one argument. Use .multiplyVectors( a, b ) instead.');
        return this.multiplyVectors(v, w);
      }

      this.x *= v.x;
      this.y *= v.y;
      this.z *= v.z;
      return this;
    }
  }, {
    key: "multiplyScalar",
    value: function multiplyScalar(scalar) {
      this.x *= scalar;
      this.y *= scalar;
      this.z *= scalar;
      return this;
    }
  }, {
    key: "multiplyVectors",
    value: function multiplyVectors(a, b) {
      this.x = a.x * b.x;
      this.y = a.y * b.y;
      this.z = a.z * b.z;
      return this;
    } // applyEuler(euler) {
    //     if (!(euler && euler.isEuler)) {
    //         console.error('Vector3: .applyEuler() now expects an Euler rotation rather than a Vector3 and order.');
    //     }
    //     return this.applyQuaternion(quaternion.setFromEuler(euler));
    // }
    // applyAxisAngle(axis, angle) {
    //     return this.applyQuaternion(quaternion1.setFromAxisAngle(axis, angle));
    // }

  }, {
    key: "applyMatrix3",
    value: function applyMatrix3(m) {
      var x = this.x,
          y = this.y,
          z = this.z;
      var e = m.elements;
      this.x = e[0] * x + e[3] * y + e[6] * z;
      this.y = e[1] * x + e[4] * y + e[7] * z;
      this.z = e[2] * x + e[5] * y + e[8] * z;
      return this;
    }
  }, {
    key: "applyMatrix4",
    value: function applyMatrix4(m) {
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
  }, {
    key: "applyQuaternion",
    value: function applyQuaternion(q) {
      var x = this.x,
          y = this.y,
          z = this.z;
      var qx = q.x,
          qy = q.y,
          qz = q.z,
          qw = q.w; // calculate quat * vector

      var ix = qw * x + qy * z - qz * y;
      var iy = qw * y + qz * x - qx * z;
      var iz = qw * z + qx * y - qy * x;
      var iw = -qx * x - qy * y - qz * z; // calculate result * inverse quat

      this.x = ix * qw + iw * -qx + iy * -qz - iz * -qy;
      this.y = iy * qw + iw * -qy + iz * -qx - ix * -qz;
      this.z = iz * qw + iw * -qz + ix * -qy - iy * -qx;
      return this;
    }
  }, {
    key: "project",
    value: function project(camera, matrix) {
      matrix.multiplyMatrices(camera.projectionMatrix, matrix.getInverse(camera.matrixWorld));
      return this.applyMatrix4(matrix);
    }
  }, {
    key: "unproject",
    value: function unproject(camera, matrix) {
      return this.applyMatrix4(matrix.getInverse(camera.projectionMatrix)).applyMatrix4(camera.matrixWorld);
    }
  }, {
    key: "transformDirection",
    value: function transformDirection(m) {
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
  }, {
    key: "divide",
    value: function divide(v) {
      this.x /= v.x;
      this.y /= v.y;
      this.z /= v.z;
      return this;
    }
  }, {
    key: "divideScalar",
    value: function divideScalar(scalar) {
      return this.multiplyScalar(1 / scalar);
    }
  }, {
    key: "min",
    value: function min(v) {
      this.x = Math.min(this.x, v.x);
      this.y = Math.min(this.y, v.y);
      this.z = Math.min(this.z, v.z);
      return this;
    }
  }, {
    key: "max",
    value: function max(v) {
      this.x = Math.max(this.x, v.x);
      this.y = Math.max(this.y, v.y);
      this.z = Math.max(this.z, v.z);
      return this;
    } // clamp(min, max) {
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

  }, {
    key: "clampLength",
    value: function clampLength(min, max) {
      var length = this.length();
      return this.divideScalar(length || 1).multiplyScalar(Math.max(min, Math.min(max, length)));
    }
  }, {
    key: "floor",
    value: function floor() {
      this.x = Math.floor(this.x);
      this.y = Math.floor(this.y);
      this.z = Math.floor(this.z);
      return this;
    }
  }, {
    key: "ceil",
    value: function ceil() {
      this.x = Math.ceil(this.x);
      this.y = Math.ceil(this.y);
      this.z = Math.ceil(this.z);
      return this;
    }
  }, {
    key: "round",
    value: function round() {
      this.x = Math.round(this.x);
      this.y = Math.round(this.y);
      this.z = Math.round(this.z);
      return this;
    }
  }, {
    key: "roundToZero",
    value: function roundToZero() {
      this.x = this.x < 0 ? Math.ceil(this.x) : Math.floor(this.x);
      this.y = this.y < 0 ? Math.ceil(this.y) : Math.floor(this.y);
      this.z = this.z < 0 ? Math.ceil(this.z) : Math.floor(this.z);
      return this;
    }
  }, {
    key: "negate",
    value: function negate() {
      this.x = -this.x;
      this.y = -this.y;
      this.z = -this.z;
      return this;
    }
  }, {
    key: "dot",
    value: function dot(v) {
      return this.x * v.x + this.y * v.y + this.z * v.z;
    } // TODO lengthSquared?

  }, {
    key: "lengthSq",
    value: function lengthSq() {
      return this.x * this.x + this.y * this.y + this.z * this.z;
    }
  }, {
    key: "length",
    value: function length() {
      return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }
  }, {
    key: "lengthManhattan",
    value: function lengthManhattan() {
      return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z);
    }
  }, {
    key: "normalize",
    value: function normalize() {
      return this.divideScalar(this.length() || 1);
    }
  }, {
    key: "setLength",
    value: function setLength(length) {
      return this.normalize().multiplyScalar(length);
    }
  }, {
    key: "lerp",
    value: function lerp(v, alpha) {
      this.x += (v.x - this.x) * alpha;
      this.y += (v.y - this.y) * alpha;
      this.z += (v.z - this.z) * alpha;
      return this;
    }
  }, {
    key: "lerpVectors",
    value: function lerpVectors(v1, v2, alpha) {
      return this.subVectors(v2, v1).multiplyScalar(alpha).add(v1);
    }
  }, {
    key: "cross",
    value: function cross(v, w) {
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
  }, {
    key: "crossVectors",
    value: function crossVectors(a, b) {
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
  }, {
    key: "projectOnVector",
    value: function projectOnVector(vector) {
      var scalar = vector.dot(this) / vector.lengthSq();
      return this.copy(vector).multiplyScalar(scalar);
    } // projectOnPlane(planeNormal) {
    //     v1.copy(this).projectOnVector(planeNormal);
    //     return this.sub(v1);
    // }
    // reflect incident vector off plane orthogonal to normal
    // normal is assumed to have unit length
    // reflect(normal) {
    //     return this.sub(v2.copy(normal).multiplyScalar(2 * this.dot(normal)));
    // }

  }, {
    key: "angleTo",
    value: function angleTo(v) {
      var theta = this.dot(v) / Math.sqrt(this.lengthSq() * v.lengthSq()); // clamp, to handle numerical problems

      return Math.acos(_Math.clamp(theta, -1, 1));
    }
  }, {
    key: "distanceTo",
    value: function distanceTo(v) {
      return Math.sqrt(this.distanceToSquared(v));
    }
  }, {
    key: "distanceToSquared",
    value: function distanceToSquared(v) {
      var dx = this.x - v.x,
          dy = this.y - v.y,
          dz = this.z - v.z;
      return dx * dx + dy * dy + dz * dz;
    }
  }, {
    key: "distanceToManhattan",
    value: function distanceToManhattan(v) {
      return Math.abs(this.x - v.x) + Math.abs(this.y - v.y) + Math.abs(this.z - v.z);
    }
  }, {
    key: "setFromSpherical",
    value: function setFromSpherical(s) {
      var sinPhiRadius = Math.sin(s.phi) * s.radius;
      this.x = sinPhiRadius * Math.sin(s.theta);
      this.y = Math.cos(s.phi) * s.radius;
      this.z = sinPhiRadius * Math.cos(s.theta);
      return this;
    }
  }, {
    key: "setFromCylindrical",
    value: function setFromCylindrical(c) {
      this.x = c.radius * Math.sin(c.theta);
      this.y = c.y;
      this.z = c.radius * Math.cos(c.theta);
      return this;
    }
  }, {
    key: "setFromMatrixPosition",
    value: function setFromMatrixPosition(m) {
      var e = m.elements;
      this.x = e[12];
      this.y = e[13];
      this.z = e[14];
      return this;
    }
  }, {
    key: "setFromMatrixScale",
    value: function setFromMatrixScale(m) {
      var sx = this.setFromMatrixColumn(m, 0).length();
      var sy = this.setFromMatrixColumn(m, 1).length();
      var sz = this.setFromMatrixColumn(m, 2).length();
      this.x = sx;
      this.y = sy;
      this.z = sz;
      return this;
    }
  }, {
    key: "setFromMatrixColumn",
    value: function setFromMatrixColumn(m, index) {
      return this.fromArray(m.elements, index * 4);
    }
  }, {
    key: "equals",
    value: function equals(v) {
      return v.x === this.x && v.y === this.y && v.z === this.z;
    }
  }, {
    key: "fromArray",
    value: function fromArray(array, offset) {
      if (offset === undefined) offset = 0;
      this.x = array[offset];
      this.y = array[offset + 1];
      this.z = array[offset + 2];
      return this;
    }
  }, {
    key: "toArray",
    value: function toArray(array, offset) {
      if (array === undefined) array = [];
      if (offset === undefined) offset = 0;
      array[offset] = this.x;
      array[offset + 1] = this.y;
      array[offset + 2] = this.z;
      return array;
    }
  }, {
    key: "fromBufferAttribute",
    value: function fromBufferAttribute(attribute, index, offset) {
      if (offset !== undefined) {
        console.warn('Vector3: offset has been removed from .fromBufferAttribute().');
      }

      this.x = attribute.getX(index);
      this.y = attribute.getY(index);
      this.z = attribute.getZ(index);
      return this;
    }
  }, {
    key: "clamp",
    value: function clamp(min, max) {
      // assumes min < max, componentwise
      this.x = Math.max(min.x, Math.min(max.x, this.x));
      this.y = Math.max(min.y, Math.min(max.y, this.y));
      this.z = Math.max(min.z, Math.min(max.z, this.z));
      return this;
    }
  }, {
    key: "clampScalar",
    value: function clampScalar(minVal, maxVal) {
      var min = new Vector3();
      var max = new Vector3();
      min.set(minVal, minVal, minVal);
      max.set(maxVal, maxVal, maxVal);
      return this.clamp(min, max);
    }
  }]);

  return Vector3;
}();

/**
 * @class Color
 * @description 颜色类
 * @author bujue
 */

var Color$1 = /*#__PURE__*/function () {
  function Color(r, g, b, a) {
    _classCallCheck(this, Color);

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

  _createClass(Color, [{
    key: "set",
    value: function set(value) {
      if (value && value.isColor) {
        this.copy(value);
      } else if (typeof value === 'number') {
        this.setHex(value);
      } else if (typeof value === 'string') {
        this.setStyle(value);
      }

      return this;
    } //通过0xffffff 16进制赋值

  }, {
    key: "setHex",
    value: function setHex(hex) {
      hex = Math.floor(hex);
      this.r = (hex >> 16 & 255) / 255;
      this.g = (hex >> 8 & 255) / 255;
      this.b = (hex & 255) / 255;
      return this;
    } //通过RGB方式设置颜色

  }, {
    key: "setRGB",
    value: function setRGB(r, g, b) {
      this.r = r;
      this.g = g;
      this.b = b;
      return this;
    } //通过RGBA方式设置颜色

  }, {
    key: "setRGBA",
    value: function setRGBA(r, g, b, a) {
      this.r = r;
      this.g = g;
      this.b = b;
      this.a = a;
      return this;
    } //通过"#FFFFFF"方式设置颜色

  }, {
    key: "setStyle",
    value: function setStyle(style) {
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
  }, {
    key: "copy",
    value: function copy(color) {
      this.r = color.r;
      this.g = color.g;
      this.b = color.b;
      return this;
    }
  }, {
    key: "setHSL",
    value: function setHSL(h, s, l) {
      return _setHSL.call(this, h, s, l);
    }
  }, {
    key: "setHSLA",
    value: function setHSLA(h, s, l, a) {
      var _color = _setHSL.call(this, h, s, l);

      _color.a = a;
      return _color;
    }
  }, {
    key: "getHSL",
    value: function getHSL(target) {
      // h,s,l ranges are in 0.0 - 1.0
      if (target === undefined) {
        console.warn('Color: .getHSL() target is now required');
        target = {
          h: 0,
          s: 0,
          l: 0
        };
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
            hue = (g - b) / delta + (g < b ? 6 : 0);
            break;

          case g:
            hue = (b - r) / delta + 2;
            break;

          case b:
            hue = (r - g) / delta + 4;
            break;
        }

        hue /= 6;
      }

      target.h = hue;
      target.s = saturation;
      target.l = lightness;
      return target;
    }
  }, {
    key: "clone",
    value: function clone() {
      return new this.constructor(this.r, this.g, this.b, this.a);
    }
  }, {
    key: "copy",
    value: function copy(color) {
      this.r = color.r;
      this.g = color.g;
      this.b = color.b;
      return this;
    }
  }, {
    key: "multiplyScalar",
    value: function multiplyScalar(s) {
      this.r *= s;
      this.g *= s;
      this.b *= s;
      return this;
    }
  }, {
    key: "getHex",
    value: function getHex() {
      return this.r * 255 << 16 ^ this.g * 255 << 8 ^ this.b * 255 << 0;
    }
  }, {
    key: "getHexString",
    value: function getHexString() {
      return ('000000' + this.getHex().toString(16)).slice(-6);
    }
  }]);

  return Color;
}();

var _setHSL = function () {
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
  'aliceblue': 0xF0F8FF,
  'antiquewhite': 0xFAEBD7,
  'aqua': 0x00FFFF,
  'aquamarine': 0x7FFFD4,
  'azure': 0xF0FFFF,
  'beige': 0xF5F5DC,
  'bisque': 0xFFE4C4,
  'black': 0x000000,
  'blanchedalmond': 0xFFEBCD,
  'blue': 0x0000FF,
  'blueviolet': 0x8A2BE2,
  'brown': 0xA52A2A,
  'burlywood': 0xDEB887,
  'cadetblue': 0x5F9EA0,
  'chartreuse': 0x7FFF00,
  'chocolate': 0xD2691E,
  'coral': 0xFF7F50,
  'cornflowerblue': 0x6495ED,
  'cornsilk': 0xFFF8DC,
  'crimson': 0xDC143C,
  'cyan': 0x00FFFF,
  'darkblue': 0x00008B,
  'darkcyan': 0x008B8B,
  'darkgoldenrod': 0xB8860B,
  'darkgray': 0xA9A9A9,
  'darkgreen': 0x006400,
  'darkgrey': 0xA9A9A9,
  'darkkhaki': 0xBDB76B,
  'darkmagenta': 0x8B008B,
  'darkolivegreen': 0x556B2F,
  'darkorange': 0xFF8C00,
  'darkorchid': 0x9932CC,
  'darkred': 0x8B0000,
  'darksalmon': 0xE9967A,
  'darkseagreen': 0x8FBC8F,
  'darkslateblue': 0x483D8B,
  'darkslategray': 0x2F4F4F,
  'darkslategrey': 0x2F4F4F,
  'darkturquoise': 0x00CED1,
  'darkviolet': 0x9400D3,
  'deeppink': 0xFF1493,
  'deepskyblue': 0x00BFFF,
  'dimgray': 0x696969,
  'dimgrey': 0x696969,
  'dodgerblue': 0x1E90FF,
  'firebrick': 0xB22222,
  'floralwhite': 0xFFFAF0,
  'forestgreen': 0x228B22,
  'fuchsia': 0xFF00FF,
  'gainsboro': 0xDCDCDC,
  'ghostwhite': 0xF8F8FF,
  'gold': 0xFFD700,
  'goldenrod': 0xDAA520,
  'gray': 0x808080,
  'green': 0x008000,
  'greenyellow': 0xADFF2F,
  'grey': 0x808080,
  'honeydew': 0xF0FFF0,
  'hotpink': 0xFF69B4,
  'indianred': 0xCD5C5C,
  'indigo': 0x4B0082,
  'ivory': 0xFFFFF0,
  'khaki': 0xF0E68C,
  'lavender': 0xE6E6FA,
  'lavenderblush': 0xFFF0F5,
  'lawngreen': 0x7CFC00,
  'lemonchiffon': 0xFFFACD,
  'lightblue': 0xADD8E6,
  'lightcoral': 0xF08080,
  'lightcyan': 0xE0FFFF,
  'lightgoldenrodyellow': 0xFAFAD2,
  'lightgray': 0xD3D3D3,
  'lightgreen': 0x90EE90,
  'lightgrey': 0xD3D3D3,
  'lightpink': 0xFFB6C1,
  'lightsalmon': 0xFFA07A,
  'lightseagreen': 0x20B2AA,
  'lightskyblue': 0x87CEFA,
  'lightslategray': 0x778899,
  'lightslategrey': 0x778899,
  'lightsteelblue': 0xB0C4DE,
  'lightyellow': 0xFFFFE0,
  'lime': 0x00FF00,
  'limegreen': 0x32CD32,
  'linen': 0xFAF0E6,
  'magenta': 0xFF00FF,
  'maroon': 0x800000,
  'mediumaquamarine': 0x66CDAA,
  'mediumblue': 0x0000CD,
  'mediumorchid': 0xBA55D3,
  'mediumpurple': 0x9370DB,
  'mediumseagreen': 0x3CB371,
  'mediumslateblue': 0x7B68EE,
  'mediumspringgreen': 0x00FA9A,
  'mediumturquoise': 0x48D1CC,
  'mediumvioletred': 0xC71585,
  'midnightblue': 0x191970,
  'mintcream': 0xF5FFFA,
  'mistyrose': 0xFFE4E1,
  'moccasin': 0xFFE4B5,
  'navajowhite': 0xFFDEAD,
  'navy': 0x000080,
  'oldlace': 0xFDF5E6,
  'olive': 0x808000,
  'olivedrab': 0x6B8E23,
  'orange': 0xFFA500,
  'orangered': 0xFF4500,
  'orchid': 0xDA70D6,
  'palegoldenrod': 0xEEE8AA,
  'palegreen': 0x98FB98,
  'paleturquoise': 0xAFEEEE,
  'palevioletred': 0xDB7093,
  'papayawhip': 0xFFEFD5,
  'peachpuff': 0xFFDAB9,
  'peru': 0xCD853F,
  'pink': 0xFFC0CB,
  'plum': 0xDDA0DD,
  'powderblue': 0xB0E0E6,
  'purple': 0x800080,
  'rebeccapurple': 0x663399,
  'red': 0xFF0000,
  'rosybrown': 0xBC8F8F,
  'royalblue': 0x4169E1,
  'saddlebrown': 0x8B4513,
  'salmon': 0xFA8072,
  'sandybrown': 0xF4A460,
  'seagreen': 0x2E8B57,
  'seashell': 0xFFF5EE,
  'sienna': 0xA0522D,
  'silver': 0xC0C0C0,
  'skyblue': 0x87CEEB,
  'slateblue': 0x6A5ACD,
  'slategray': 0x708090,
  'slategrey': 0x708090,
  'snow': 0xFFFAFA,
  'springgreen': 0x00FF7F,
  'steelblue': 0x4682B4,
  'tan': 0xD2B48C,
  'teal': 0x008080,
  'thistle': 0xD8BFD8,
  'tomato': 0xFF6347,
  'turquoise': 0x40E0D0,
  'violet': 0xEE82EE,
  'wheat': 0xF5DEB3,
  'white': 0xFFFFFF,
  'whitesmoke': 0xF5F5F5,
  'yellow': 0xFFFF00,
  'yellowgreen': 0x9ACD32
};

// var matrix = new Matrix4();

var v1 = new Vector3();
var v2 = new Vector3();
var x = new Vector3();
var y = new Vector3();
var z = new Vector3();

var Matrix4 = /*#__PURE__*/function () {
  function Matrix4() {
    _classCallCheck(this, Matrix4);

    this.elements = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];

    if (arguments.length > 0) {
      console.error('Matrix4: the constructor no longer reads arguments. use .set() instead.');
    }

    this.isMatrix4 = true;
  }

  _createClass(Matrix4, [{
    key: "set",
    value: function set(n11, n12, n13, n14, n21, n22, n23, n24, n31, n32, n33, n34, n41, n42, n43, n44) {
      var te = this.elements;
      te[0] = n11;
      te[4] = n12;
      te[8] = n13;
      te[12] = n14;
      te[1] = n21;
      te[5] = n22;
      te[9] = n23;
      te[13] = n24;
      te[2] = n31;
      te[6] = n32;
      te[10] = n33;
      te[14] = n34;
      te[3] = n41;
      te[7] = n42;
      te[11] = n43;
      te[15] = n44;
      return this;
    }
  }, {
    key: "identity",
    value: function identity() {
      this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
      return this;
    }
  }, {
    key: "clone",
    value: function clone() {
      return new Matrix4().fromArray(this.elements);
    }
  }, {
    key: "copy",
    value: function copy(m) {
      var te = this.elements;
      var me = m.elements;
      te[0] = me[0];
      te[1] = me[1];
      te[2] = me[2];
      te[3] = me[3];
      te[4] = me[4];
      te[5] = me[5];
      te[6] = me[6];
      te[7] = me[7];
      te[8] = me[8];
      te[9] = me[9];
      te[10] = me[10];
      te[11] = me[11];
      te[12] = me[12];
      te[13] = me[13];
      te[14] = me[14];
      te[15] = me[15];
      return this;
    }
  }, {
    key: "copyPosition",
    value: function copyPosition(m) {
      var te = this.elements,
          me = m.elements;
      te[12] = me[12];
      te[13] = me[13];
      te[14] = me[14];
      return this;
    }
  }, {
    key: "extractBasis",
    value: function extractBasis(xAxis, yAxis, zAxis) {
      xAxis.setFromMatrixColumn(this, 0);
      yAxis.setFromMatrixColumn(this, 1);
      zAxis.setFromMatrixColumn(this, 2);
      return this;
    }
  }, {
    key: "makeBasis",
    value: function makeBasis(xAxis, yAxis, zAxis) {
      this.set(xAxis.x, yAxis.x, zAxis.x, 0, xAxis.y, yAxis.y, zAxis.y, 0, xAxis.z, yAxis.z, zAxis.z, 0, 0, 0, 0, 1);
      return this;
    }
  }, {
    key: "extractRotation",
    value: function extractRotation(m) {
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
  }, {
    key: "makeRotationFromEuler",
    value: function makeRotationFromEuler(euler) {
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
      } // last column


      te[3] = 0;
      te[7] = 0;
      te[11] = 0; // bottom row

      te[12] = 0;
      te[13] = 0;
      te[14] = 0;
      te[15] = 1;
      return this;
    }
  }, {
    key: "makeRotationFromQuaternion",
    value: function makeRotationFromQuaternion(q) {
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
      te[10] = 1 - (xx + yy); // last column

      te[3] = 0;
      te[7] = 0;
      te[11] = 0; // bottom row

      te[12] = 0;
      te[13] = 0;
      te[14] = 0;
      te[15] = 1;
      return this;
    }
  }, {
    key: "lookAt",
    value: function lookAt(eye, target, up) {
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
      te[0] = x.x;
      te[4] = y.x;
      te[8] = z.x;
      te[1] = x.y;
      te[5] = y.y;
      te[9] = z.y;
      te[2] = x.z;
      te[6] = y.z;
      te[10] = z.z;
      return this;
    }
  }, {
    key: "multiply",
    value: function multiply(m, n) {
      if (n !== undefined) {
        console.warn('Matrix4: .multiply() now only accepts one argument. Use .multiplyMatrices( a, b ) instead.');
        return this.multiplyMatrices(m, n);
      }

      return this.multiplyMatrices(this, m);
    }
  }, {
    key: "premultiply",
    value: function premultiply(m) {
      return this.multiplyMatrices(m, this);
    }
  }, {
    key: "multiplyMatrices",
    value: function multiplyMatrices(a, b) {
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
  }, {
    key: "multiplyScalar",
    value: function multiplyScalar(s) {
      var te = this.elements;
      te[0] *= s;
      te[4] *= s;
      te[8] *= s;
      te[12] *= s;
      te[1] *= s;
      te[5] *= s;
      te[9] *= s;
      te[13] *= s;
      te[2] *= s;
      te[6] *= s;
      te[10] *= s;
      te[14] *= s;
      te[3] *= s;
      te[7] *= s;
      te[11] *= s;
      te[15] *= s;
      return this;
    }
  }, {
    key: "applyToBufferAttribute",
    value: function applyToBufferAttribute(attribute) {
      for (var i = 0, l = attribute.count; i < l; i++) {
        v2.x = attribute.getX(i);
        v2.y = attribute.getY(i);
        v2.z = attribute.getZ(i);
        v2.applyMatrix4(this);
        attribute.setXYZ(i, v2.x, v2.y, v2.z);
      }

      return attribute;
    }
  }, {
    key: "determinant",
    value: function determinant() {
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
          n44 = te[15]; //TODO: make this more efficient
      //( based on http://www.euclideanspace.com/maths/algebra/matrix/functions/inverse/fourD/index.htm )

      return n41 * (+n14 * n23 * n32 - n13 * n24 * n32 - n14 * n22 * n33 + n12 * n24 * n33 + n13 * n22 * n34 - n12 * n23 * n34) + n42 * (+n11 * n23 * n34 - n11 * n24 * n33 + n14 * n21 * n33 - n13 * n21 * n34 + n13 * n24 * n31 - n14 * n23 * n31) + n43 * (+n11 * n24 * n32 - n11 * n22 * n34 - n14 * n21 * n32 + n12 * n21 * n34 + n14 * n22 * n31 - n12 * n24 * n31) + n44 * (-n13 * n22 * n31 - n11 * n23 * n32 + n11 * n22 * n33 + n13 * n21 * n32 - n12 * n21 * n33 + n12 * n23 * n31);
    }
  }, {
    key: "transpose",
    value: function transpose() {
      var te = this.elements;
      var tmp;
      tmp = te[1];
      te[1] = te[4];
      te[4] = tmp;
      tmp = te[2];
      te[2] = te[8];
      te[8] = tmp;
      tmp = te[6];
      te[6] = te[9];
      te[9] = tmp;
      tmp = te[3];
      te[3] = te[12];
      te[12] = tmp;
      tmp = te[7];
      te[7] = te[13];
      te[13] = tmp;
      tmp = te[11];
      te[11] = te[14];
      te[14] = tmp;
      return this;
    }
  }, {
    key: "setPosition",
    value: function setPosition(v) {
      var te = this.elements;
      te[12] = v.x;
      te[13] = v.y;
      te[14] = v.z;
      return this;
    }
  }, {
    key: "getInverse",
    value: function getInverse(m, throwOnDegenerate) {
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
  }, {
    key: "scale",
    value: function scale(v) {
      var te = this.elements;
      var x = v.x,
          y = v.y,
          z = v.z;
      te[0] *= x;
      te[4] *= y;
      te[8] *= z;
      te[1] *= x;
      te[5] *= y;
      te[9] *= z;
      te[2] *= x;
      te[6] *= y;
      te[10] *= z;
      te[3] *= x;
      te[7] *= y;
      te[11] *= z;
      return this;
    }
  }, {
    key: "getMaxScaleOnAxis",
    value: function getMaxScaleOnAxis() {
      var te = this.elements;
      var scaleXSq = te[0] * te[0] + te[1] * te[1] + te[2] * te[2];
      var scaleYSq = te[4] * te[4] + te[5] * te[5] + te[6] * te[6];
      var scaleZSq = te[8] * te[8] + te[9] * te[9] + te[10] * te[10];
      return Math.sqrt(Math.max(scaleXSq, scaleYSq, scaleZSq));
    }
  }, {
    key: "makeTranslation",
    value: function makeTranslation(x, y, z) {
      this.set(1, 0, 0, x, 0, 1, 0, y, 0, 0, 1, z, 0, 0, 0, 1);
      return this;
    }
  }, {
    key: "makeRotationX",
    value: function makeRotationX(theta) {
      var c = Math.cos(theta),
          s = Math.sin(theta);
      this.set(1, 0, 0, 0, 0, c, -s, 0, 0, s, c, 0, 0, 0, 0, 1);
      return this;
    }
  }, {
    key: "makeRotationY",
    value: function makeRotationY(theta) {
      var c = Math.cos(theta),
          s = Math.sin(theta);
      this.set(c, 0, s, 0, 0, 1, 0, 0, -s, 0, c, 0, 0, 0, 0, 1);
      return this;
    }
  }, {
    key: "makeRotationZ",
    value: function makeRotationZ(theta) {
      var c = Math.cos(theta),
          s = Math.sin(theta);
      this.set(c, -s, 0, 0, s, c, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
      return this;
    }
  }, {
    key: "makeRotationAxis",
    value: function makeRotationAxis(axis, angle) {
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
  }, {
    key: "makeScale",
    value: function makeScale(x, y, z) {
      this.set(x, 0, 0, 0, 0, y, 0, 0, 0, 0, z, 0, 0, 0, 0, 1);
      return this;
    }
  }, {
    key: "makeShear",
    value: function makeShear(x, y, z) {
      this.set(1, y, z, 0, x, 1, z, 0, x, y, 1, 0, 0, 0, 0, 1);
      return this;
    }
  }, {
    key: "compose",
    value: function compose(position, quaternion, scale) {
      this.makeRotationFromQuaternion(quaternion);
      this.scale(scale);
      this.setPosition(position);
      return this;
    }
  }, {
    key: "decompose",
    value: function decompose(position, quaternion, scale) {
      var _decompose = _decompose2.bind(this);

      return _decompose(position, quaternion, scale);
    }
  }, {
    key: "makePerspective",
    value: function makePerspective(left, right, top, bottom, near, far) {
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
      te[0] = x;
      te[4] = 0;
      te[8] = a;
      te[12] = 0;
      te[1] = 0;
      te[5] = y;
      te[9] = b;
      te[13] = 0;
      te[2] = 0;
      te[6] = 0;
      te[10] = c;
      te[14] = d;
      te[3] = 0;
      te[7] = 0;
      te[11] = -1;
      te[15] = 0;
      return this;
    }
  }, {
    key: "makeOrthographic",
    value: function makeOrthographic(left, right, top, bottom, near, far) {
      var te = this.elements;
      var w = 1.0 / (right - left);
      var h = 1.0 / (top - bottom);
      var p = 1.0 / (far - near);
      var x = (right + left) * w;
      var y = (top + bottom) * h;
      var z = (far + near) * p;
      te[0] = 2 * w;
      te[4] = 0;
      te[8] = 0;
      te[12] = -x;
      te[1] = 0;
      te[5] = 2 * h;
      te[9] = 0;
      te[13] = -y;
      te[2] = 0;
      te[6] = 0;
      te[10] = -2 * p;
      te[14] = -z;
      te[3] = 0;
      te[7] = 0;
      te[11] = 0;
      te[15] = 1;
      return this;
    }
  }, {
    key: "equals",
    value: function equals(matrix) {
      var te = this.elements;
      var me = matrix.elements;

      for (var i = 0; i < 16; i++) {
        if (te[i] !== me[i]) return false;
      }

      return true;
    }
  }, {
    key: "fromArray",
    value: function fromArray(array, offset) {
      if (offset === undefined) offset = 0;

      for (var i = 0; i < 16; i++) {
        this.elements[i] = array[i + offset];
      }

      return this;
    }
  }, {
    key: "toArray",
    value: function toArray(array, offset) {
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
  }]);

  return Matrix4;
}();

var _decompose2 = function () {
  var vector = new Vector3();
  var matrix = new Matrix4();
  return function decompose(position, quaternion, scale) {
    var te = this.elements;
    var sx = vector.set(te[0], te[1], te[2]).length();
    var sy = vector.set(te[4], te[5], te[6]).length();
    var sz = vector.set(te[8], te[9], te[10]).length(); // if determine is negative, we need to invert one scale

    var det = this.determinant();
    if (det < 0) sx = -sx;
    position.x = te[12];
    position.y = te[13];
    position.z = te[14]; // scale the rotation part

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

var Box3 = /*#__PURE__*/function () {
  function Box3(min, max) {
    _classCallCheck(this, Box3);

    this.min = min !== undefined ? min : new Vector3(+Infinity, +Infinity, +Infinity);
    this.max = max !== undefined ? max : new Vector3(-Infinity, -Infinity, -Infinity);
    this.isBox3 = true;
  }

  _createClass(Box3, [{
    key: "set",
    value: function set(min, max) {
      this.min.copy(min);
      this.max.copy(max);
      return this;
    }
  }, {
    key: "setFromArray",
    value: function setFromArray(array) {
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
  }, {
    key: "setFromBufferAttribute",
    value: function setFromBufferAttribute(attribute) {
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
  }, {
    key: "setFromPoints",
    value: function setFromPoints(points) {
      this.makeEmpty();

      for (var i = 0, il = points.length; i < il; i++) {
        this.expandByPoint(points[i]);
      }

      return this;
    }
  }, {
    key: "setFromCenterAndSize",
    value: function setFromCenterAndSize(center, size) {
      return _setFromCenterAndSize(center, size);
    }
  }, {
    key: "setFromObject",
    value: function setFromObject(object) {
      this.makeEmpty();
      return this.expandByObject(object);
    }
  }, {
    key: "clone",
    value: function clone() {
      return new this.constructor().copy(this);
    }
  }, {
    key: "copy",
    value: function copy(box) {
      this.min.copy(box.min);
      this.max.copy(box.max);
      return this;
    }
  }, {
    key: "makeEmpty",
    value: function makeEmpty() {
      this.min.x = this.min.y = this.min.z = +Infinity;
      this.max.x = this.max.y = this.max.z = -Infinity;
      return this;
    }
  }, {
    key: "isEmpty",
    value: function isEmpty() {
      // this is a more robust check for empty than ( volume <= 0 ) because volume can get positive with two negative axes
      return this.max.x < this.min.x || this.max.y < this.min.y || this.max.z < this.min.z;
    }
  }, {
    key: "getCenter",
    value: function getCenter(optionalTarget) {
      var result = optionalTarget || new Vector3();
      return this.isEmpty() ? result.set(0, 0, 0) : result.addVectors(this.min, this.max).multiplyScalar(0.5);
    }
  }, {
    key: "getSize",
    value: function getSize(optionalTarget) {
      var result = optionalTarget || new Vector3();
      return this.isEmpty() ? result.set(0, 0, 0) : result.subVectors(this.max, this.min);
    }
  }, {
    key: "expandByPoint",
    value: function expandByPoint(point) {
      this.min.min(point);
      this.max.max(point);
      return this;
    }
  }, {
    key: "expandByVector",
    value: function expandByVector(vector) {
      this.min.sub(vector);
      this.max.add(vector);
      return this;
    }
  }, {
    key: "expandByScalar",
    value: function expandByScalar(scalar) {
      this.min.addScalar(-scalar);
      this.max.addScalar(scalar);
      return this;
    }
  }, {
    key: "expandByObject",
    value: function expandByObject(object) {
      return _expandByObject.call(this, object);
    }
  }, {
    key: "containsPoint",
    value: function containsPoint(point) {
      return point.x < this.min.x || point.x > this.max.x || point.y < this.min.y || point.y > this.max.y || point.z < this.min.z || point.z > this.max.z ? false : true;
    }
  }, {
    key: "containsBox",
    value: function containsBox(box) {
      return this.min.x <= box.min.x && box.max.x <= this.max.x && this.min.y <= box.min.y && box.max.y <= this.max.y && this.min.z <= box.min.z && box.max.z <= this.max.z;
    }
  }, {
    key: "getParameter",
    value: function getParameter(point, optionalTarget) {
      // This can potentially have a divide by zero if the box
      // has a size dimension of 0.
      var result = optionalTarget || new Vector3();
      return result.set((point.x - this.min.x) / (this.max.x - this.min.x), (point.y - this.min.y) / (this.max.y - this.min.y), (point.z - this.min.z) / (this.max.z - this.min.z));
    }
  }, {
    key: "intersectsBox",
    value: function intersectsBox(box) {
      // using 6 splitting planes to rule out intersections.
      return box.max.x < this.min.x || box.min.x > this.max.x || box.max.y < this.min.y || box.min.y > this.max.y || box.max.z < this.min.z || box.min.z > this.max.z ? false : true;
    }
  }, {
    key: "intersectsSphere",
    value: function intersectsSphere(sphere) {
      return _intersectsSphere(sphere);
    }
  }, {
    key: "intersectsPlane",
    value: function intersectsPlane(plane) {
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
  }, {
    key: "clampPoint",
    value: function clampPoint(point, optionalTarget) {
      var result = optionalTarget || new Vector3();
      return result.copy(point).clamp(this.min, this.max);
    }
  }, {
    key: "distanceToPoint",
    value: function distanceToPoint(point) {
      return _distanceToPoint.call(this, point);
    }
  }, {
    key: "getBoundingSphere",
    value: function getBoundingSphere(optionalTarget) {
      return _getBoundingSphere.call(this, optionalTarget);
    }
  }, {
    key: "intersect",
    value: function intersect(box) {
      this.min.max(box.min);
      this.max.min(box.max); // ensure that if there is no overlap, the result is fully empty, not slightly empty with non-inf/+inf values that will cause subsequence intersects to erroneously return valid values.

      if (this.isEmpty()) this.makeEmpty();
      return this;
    }
  }, {
    key: "union",
    value: function union(box) {
      this.min.min(box.min);
      this.max.max(box.max);
      return this;
    }
  }, {
    key: "applyMatrix4",
    value: function applyMatrix4(matrix) {
      return _applyMatrix(matrix);
    }
  }, {
    key: "translate",
    value: function translate(offset) {
      this.min.add(offset);
      this.max.add(offset);
      return this;
    }
  }, {
    key: "equals",
    value: function equals(box) {
      return box.min.equals(this.min) && box.max.equals(this.max);
    }
  }]);

  return Box3;
}();

var _setFromCenterAndSize = function () {
  var v1 = new Vector3();
  return function setFromCenterAndSize(center, size) {
    var halfSize = v1.copy(size).multiplyScalar(0.5);
    this.min.copy(center).sub(halfSize);
    this.max.copy(center).add(halfSize);
    return this;
  };
}();

var _expandByObject = function () {
  // Computes the world-axis-aligned bounding box of an object (including its children),
  // accounting for both the object's, and children's, world transforms
  var v1 = new Vector3();
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

var _intersectsSphere = function () {
  var closestPoint = new Vector3();
  return function intersectsSphere(sphere) {
    // Find the point on the AABB closest to the sphere center.
    this.clampPoint(sphere.center, closestPoint); // If that point is inside the sphere, the AABB and sphere intersect.

    return closestPoint.distanceToSquared(sphere.center) <= sphere.radius * sphere.radius;
  };
}();

var _distanceToPoint = function () {
  var v1 = new Vector3();
  return function distanceToPoint(point) {
    var clampedPoint = v1.copy(point).clamp(this.min, this.max);
    return clampedPoint.sub(point).length();
  };
}();

var _getBoundingSphere = function () {
  var v1 = new Vector3();
  return function getBoundingSphere(optionalTarget) {
    var result = optionalTarget || new Sphere();
    this.getCenter(result.center);
    result.radius = this.getSize(v1).length() * 0.5;
    return result;
  };
}();

var _applyMatrix = function () {
  var points = [new Vector3(), new Vector3(), new Vector3(), new Vector3(), new Vector3(), new Vector3(), new Vector3(), new Vector3()];
  return function applyMatrix4(matrix) {
    // transform of empty box is an empty box.
    if (this.isEmpty()) return this; // NOTE: I am using a binary pattern to specify all 2^3 combinations below

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

var Sphere = /*#__PURE__*/function () {
  function Sphere(center, radius) {
    _classCallCheck(this, Sphere);

    this.center = center !== undefined ? center : new Vector3();
    this.radius = radius !== undefined ? radius : 0;
  }

  _createClass(Sphere, [{
    key: "set",
    value: function set(center, radius) {
      this.center.copy(center);
      this.radius = radius;
      return this;
    }
  }, {
    key: "setFromPoints",
    value: function setFromPoints(points, optionalCenter) {
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
  }, {
    key: "clone",
    value: function clone() {
      return new this.constructor().copy(this);
    }
  }, {
    key: "copy",
    value: function copy(sphere) {
      this.center.copy(sphere.center);
      this.radius = sphere.radius;
      return this;
    }
  }, {
    key: "empty",
    value: function empty() {
      return this.radius <= 0;
    }
  }, {
    key: "containsPoint",
    value: function containsPoint(point) {
      return point.distanceToSquared(this.center) <= this.radius * this.radius;
    }
  }, {
    key: "distanceToPoint",
    value: function distanceToPoint(point) {
      return point.distanceTo(this.center) - this.radius;
    }
  }, {
    key: "intersectsSphere",
    value: function intersectsSphere(sphere) {
      var radiusSum = this.radius + sphere.radius;
      return sphere.center.distanceToSquared(this.center) <= radiusSum * radiusSum;
    }
  }, {
    key: "intersectsBox",
    value: function intersectsBox(box) {
      return box.intersectsSphere(this);
    }
  }, {
    key: "intersectsPlane",
    value: function intersectsPlane(plane) {
      return Math.abs(plane.distanceToPoint(this.center)) <= this.radius;
    }
  }, {
    key: "clampPoint",
    value: function clampPoint(point, optionalTarget) {
      var deltaLengthSq = this.center.distanceToSquared(point);
      var result = optionalTarget || new Vector3();
      result.copy(point);

      if (deltaLengthSq > this.radius * this.radius) {
        result.sub(this.center).normalize();
        result.multiplyScalar(this.radius).add(this.center);
      }

      return result;
    }
  }, {
    key: "getBoundingBox",
    value: function getBoundingBox(optionalTarget) {
      var box = optionalTarget || new Box3();
      box.set(this.center, this.center);
      box.expandByScalar(this.radius);
      return box;
    }
  }, {
    key: "applyMatrix4",
    value: function applyMatrix4(matrix) {
      this.center.applyMatrix4(matrix);
      this.radius = this.radius * matrix.getMaxScaleOnAxis();
      return this;
    }
  }, {
    key: "translate",
    value: function translate(offset) {
      this.center.add(offset);
      return this;
    }
  }, {
    key: "equals",
    value: function equals(sphere) {
      return sphere.center.equals(this.center) && sphere.radius === this.radius;
    }
  }]);

  return Sphere;
}();

var v1$1 = new Vector3();

var Matrix3 = /*#__PURE__*/function () {
  function Matrix3() {
    _classCallCheck(this, Matrix3);

    this.elements = [1, 0, 0, 0, 1, 0, 0, 0, 1];

    if (arguments.length > 0) {
      console.error('Matrix3: the constructor no longer reads arguments. use .set() instead.');
    }

    this.isMatrix3 = true;
  }

  _createClass(Matrix3, [{
    key: "set",
    value: function set(n11, n12, n13, n21, n22, n23, n31, n32, n33) {
      var te = this.elements;
      te[0] = n11;
      te[1] = n21;
      te[2] = n31;
      te[3] = n12;
      te[4] = n22;
      te[5] = n32;
      te[6] = n13;
      te[7] = n23;
      te[8] = n33;
      return this;
    }
  }, {
    key: "identity",
    value: function identity() {
      this.set(1, 0, 0, 0, 1, 0, 0, 0, 1);
      return this;
    }
  }, {
    key: "clone",
    value: function clone() {
      return new this.constructor().fromArray(this.elements);
    }
  }, {
    key: "copy",
    value: function copy(m) {
      var te = this.elements;
      var me = m.elements;
      te[0] = me[0];
      te[1] = me[1];
      te[2] = me[2];
      te[3] = me[3];
      te[4] = me[4];
      te[5] = me[5];
      te[6] = me[6];
      te[7] = me[7];
      te[8] = me[8];
      return this;
    }
  }, {
    key: "setFromMatrix4",
    value: function setFromMatrix4(m) {
      var me = m.elements;
      this.set(me[0], me[4], me[8], me[1], me[5], me[9], me[2], me[6], me[10]);
      return this;
    }
  }, {
    key: "applyToBufferAttribute",
    value: function applyToBufferAttribute(attribute) {
      for (var i = 0, l = attribute.count; i < l; i++) {
        v1$1.x = attribute.getX(i);
        v1$1.y = attribute.getY(i);
        v1$1.z = attribute.getZ(i);
        v1$1.applyMatrix3(this);
        attribute.setXYZ(i, v1$1.x, v1$1.y, v1$1.z);
      }

      return attribute;
    }
  }, {
    key: "setUvTransform",
    value: function setUvTransform(tx, ty, sx, sy, rotation, cx, cy) {
      var c = Math.cos(rotation);
      var s = Math.sin(rotation);
      this.set(sx * c, sx * s, -sx * (c * cx + s * cy) + cx + tx, -sy * s, sy * c, -sy * (-s * cx + c * cy) + cy + ty, 0, 0, 1);
    }
  }, {
    key: "multiply",
    value: function multiply(m) {
      return this.multiplyMatrices(this, m);
    }
  }, {
    key: "premultiply",
    value: function premultiply(m) {
      return this.multiplyMatrices(m, this);
    }
  }, {
    key: "multiplyMatrices",
    value: function multiplyMatrices(a, b) {
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
  }, {
    key: "multiplyScalar",
    value: function multiplyScalar(s) {
      var te = this.elements;
      te[0] *= s;
      te[3] *= s;
      te[6] *= s;
      te[1] *= s;
      te[4] *= s;
      te[7] *= s;
      te[2] *= s;
      te[5] *= s;
      te[8] *= s;
      return this;
    }
  }, {
    key: "determinant",
    value: function determinant() {
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
  }, {
    key: "getInverse",
    value: function getInverse(matrix, throwOnDegenerate) {
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
  }, {
    key: "transpose",
    value: function transpose() {
      var tmp,
          m = this.elements;
      tmp = m[1];
      m[1] = m[3];
      m[3] = tmp;
      tmp = m[2];
      m[2] = m[6];
      m[6] = tmp;
      tmp = m[5];
      m[5] = m[7];
      m[7] = tmp;
      return this;
    }
  }, {
    key: "getNormalMatrix",
    value: function getNormalMatrix(matrix4) {
      return this.setFromMatrix4(matrix4).getInverse(this).transpose();
    }
  }, {
    key: "transposeIntoArray",
    value: function transposeIntoArray(r) {
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
  }, {
    key: "equals",
    value: function equals(matrix) {
      var te = this.elements;
      var me = matrix.elements;

      for (var i = 0; i < 9; i++) {
        if (te[i] !== me[i]) return false;
      }

      return true;
    }
  }, {
    key: "fromArray",
    value: function fromArray(array, offset) {
      if (offset === undefined) offset = 0;

      for (var i = 0; i < 9; i++) {
        this.elements[i] = array[i + offset];
      }

      return this;
    }
  }, {
    key: "toArray",
    value: function toArray(array, offset) {
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
  }]);

  return Matrix3;
}();

var v1$2 = new Vector3();
var v2$1 = new Vector3();
var v3 = new Vector3();
var v4 = new Vector3();
var m1 = new Matrix3();

var Plane = /*#__PURE__*/function () {
  function Plane(normal, constant) {
    _classCallCheck(this, Plane);

    // normal is assumed to be normalized
    this.normal = normal !== undefined ? normal : new Vector3(1, 0, 0);
    this.constant = constant !== undefined ? constant : 0;
  }

  _createClass(Plane, [{
    key: "set",
    value: function set(normal, constant) {
      this.normal.copy(normal);
      this.constant = constant;
      return this;
    }
  }, {
    key: "setComponents",
    value: function setComponents(x, y, z, w) {
      this.normal.set(x, y, z);
      this.constant = w;
      return this;
    }
  }, {
    key: "setFromNormalAndCoplanarPoint",
    value: function setFromNormalAndCoplanarPoint(normal, point) {
      this.normal.copy(normal);
      this.constant = -point.dot(this.normal);
      return this;
    }
  }, {
    key: "setFromCoplanarPoints",
    value: function setFromCoplanarPoints(a, b, c) {
      var normal = v1$2.subVectors(c, b).cross(v2$1.subVectors(a, b)).normalize(); // Q: should an error be thrown if normal is zero (e.g. degenerate plane)?

      this.setFromNormalAndCoplanarPoint(normal, a);
      return this;
    }
  }, {
    key: "clone",
    value: function clone() {
      return new this.constructor().copy(this);
    }
  }, {
    key: "copy",
    value: function copy(plane) {
      this.normal.copy(plane.normal);
      this.constant = plane.constant;
      return this;
    }
  }, {
    key: "normalize",
    value: function normalize() {
      // Note: will lead to a divide by zero if the plane is invalid.
      var inverseNormalLength = 1.0 / this.normal.length();
      this.normal.multiplyScalar(inverseNormalLength);
      this.constant *= inverseNormalLength;
      return this;
    }
  }, {
    key: "negate",
    value: function negate() {
      this.constant *= -1;
      this.normal.negate();
      return this;
    }
  }, {
    key: "distanceToPoint",
    value: function distanceToPoint(point) {
      return this.normal.dot(point) + this.constant;
    }
  }, {
    key: "distanceToSphere",
    value: function distanceToSphere(sphere) {
      return this.distanceToPoint(sphere.center) - sphere.radius;
    }
  }, {
    key: "projectPoint",
    value: function projectPoint(point, optionalTarget) {
      var result = optionalTarget || new Vector3();
      return result.copy(this.normal).multiplyScalar(-this.distanceToPoint(point)).add(point);
    }
  }, {
    key: "intersectLine",
    value: function intersectLine(line, optionalTarget) {
      var result = optionalTarget || new Vector3();
      var direction = line.delta(v3);
      var denominator = this.normal.dot(direction);

      if (denominator === 0) {
        // line is coplanar, return origin
        if (this.distanceToPoint(line.start) === 0) {
          return result.copy(line.start);
        } // Unsure if this is the correct method to handle this case.


        return undefined;
      }

      var t = -(line.start.dot(this.normal) + this.constant) / denominator;

      if (t < 0 || t > 1) {
        return undefined;
      }

      return result.copy(direction).multiplyScalar(t).add(line.start);
    }
  }, {
    key: "intersectsLine",
    value: function intersectsLine(line) {
      // Note: this tests if a line intersects the plane, not whether it (or its end-points) are coplanar with it.
      var startSign = this.distanceToPoint(line.start);
      var endSign = this.distanceToPoint(line.end);
      return startSign < 0 && endSign > 0 || endSign < 0 && startSign > 0;
    }
  }, {
    key: "intersectsBox",
    value: function intersectsBox(box) {
      return box.intersectsPlane(this);
    }
  }, {
    key: "intersectsSphere",
    value: function intersectsSphere(sphere) {
      return sphere.intersectsPlane(this);
    }
  }, {
    key: "coplanarPoint",
    value: function coplanarPoint(optionalTarget) {
      var result = optionalTarget || new Vector3();
      return result.copy(this.normal).multiplyScalar(-this.constant);
    }
  }, {
    key: "applyMatrix4",
    value: function applyMatrix4(matrix, optionalNormalMatrix) {
      var normalMatrix = optionalNormalMatrix || m1.getNormalMatrix(matrix);
      var referencePoint = this.coplanarPoint(v4).applyMatrix4(matrix);
      var normal = this.normal.applyMatrix3(normalMatrix).normalize();
      this.constant = -referencePoint.dot(normal);
      return this;
    }
  }, {
    key: "translate",
    value: function translate(offset) {
      this.constant -= offset.dot(this.normal);
      return this;
    }
  }, {
    key: "equals",
    value: function equals(plane) {
      return plane.normal.equals(this.normal) && plane.constant === this.constant;
    }
  }]);

  return Plane;
}();

var Frustum = /*#__PURE__*/function () {
  function Frustum(p0, p1, p2, p3, p4, p5) {
    _classCallCheck(this, Frustum);

    this.planes = [p0 !== undefined ? p0 : new Plane(), p1 !== undefined ? p1 : new Plane(), p2 !== undefined ? p2 : new Plane(), p3 !== undefined ? p3 : new Plane(), p4 !== undefined ? p4 : new Plane(), p5 !== undefined ? p5 : new Plane()];
  }

  _createClass(Frustum, [{
    key: "set",
    value: function set(p0, p1, p2, p3, p4, p5) {
      var planes = this.planes;
      planes[0].copy(p0);
      planes[1].copy(p1);
      planes[2].copy(p2);
      planes[3].copy(p3);
      planes[4].copy(p4);
      planes[5].copy(p5);
      return this;
    }
  }, {
    key: "clone",
    value: function clone() {
      return new this.constructor().copy(this);
    }
  }, {
    key: "copy",
    value: function copy(frustum) {
      var planes = this.planes;

      for (var i = 0; i < 6; i++) {
        planes[i].copy(frustum.planes[i]);
      }

      return this;
    }
  }, {
    key: "setFromMatrix",
    value: function setFromMatrix(m) {
      var planes = this.planes;
      var me = m.elements;
      var me0 = me[0],
          me1 = me[1],
          me2 = me[2],
          me3 = me[3];
      var me4 = me[4],
          me5 = me[5],
          me6 = me[6],
          me7 = me[7];
      var me8 = me[8],
          me9 = me[9],
          me10 = me[10],
          me11 = me[11];
      var me12 = me[12],
          me13 = me[13],
          me14 = me[14],
          me15 = me[15];
      planes[0].setComponents(me3 - me0, me7 - me4, me11 - me8, me15 - me12).normalize();
      planes[1].setComponents(me3 + me0, me7 + me4, me11 + me8, me15 + me12).normalize();
      planes[2].setComponents(me3 + me1, me7 + me5, me11 + me9, me15 + me13).normalize();
      planes[3].setComponents(me3 - me1, me7 - me5, me11 - me9, me15 - me13).normalize();
      planes[4].setComponents(me3 - me2, me7 - me6, me11 - me10, me15 - me14).normalize();
      planes[5].setComponents(me3 + me2, me7 + me6, me11 + me10, me15 + me14).normalize();
      return this;
    }
  }, {
    key: "intersectsObject",
    value: function intersectsObject(object) {
      var cb = _intersectsObject.bind(this);

      return cb(object);
    }
  }, {
    key: "intersectsSprite",
    value: function intersectsSprite(sprite) {
      var cb = _intersectsSprite.bind(this);

      return cb(sprite);
    }
  }, {
    key: "intersectsSphere",
    value: function intersectsSphere(sphere) {
      var planes = this.planes;
      var center = sphere.center;
      var negRadius = -sphere.radius;

      for (var i = 0; i < 6; i++) {
        var distance = planes[i].distanceToPoint(center);

        if (distance < negRadius) {
          return false;
        }
      }

      return true;
    }
  }, {
    key: "intersectsBox",
    value: function intersectsBox(box) {
      var cb = _intersectsBox.bind(this);

      return cb(box);
    }
  }, {
    key: "containsPoint",
    value: function containsPoint(point) {
      var planes = this.planes;

      for (var i = 0; i < 6; i++) {
        if (planes[i].distanceToPoint(point) < 0) {
          return false;
        }
      }

      return true;
    }
  }]);

  return Frustum;
}();

var _intersectsObject = function () {
  var sphere = new Sphere();
  return function intersectsObject(object) {
    var geometry = object.geometry;
    if (geometry.boundingSphere === null) geometry.computeBoundingSphere();
    sphere.copy(geometry.boundingSphere).applyMatrix4(object.matrixWorld);
    return this.intersectsSphere(sphere);
  };
}();

var _intersectsSprite = function () {
  var sphere = new Sphere();
  return function intersectsSprite(sprite) {
    sphere.center.set(0, 0, 0);
    sphere.radius = 0.7071067811865476;
    sphere.applyMatrix4(sprite.matrixWorld);
    return this.intersectsSphere(sphere);
  };
}();

var _intersectsBox = function () {
  var p1 = new Vector3(),
      p2 = new Vector3();
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
      var d2 = plane.distanceToPoint(p2); // if both outside plane, no intersection

      if (d1 < 0 && d2 < 0) {
        return false;
      }
    }

    return true;
  };
}();

var WebGLExtensions = /*#__PURE__*/function () {
  function WebGLExtensions(gl) {
    _classCallCheck(this, WebGLExtensions);

    this._gl = gl;
    this.extensions = {};
  }

  _createClass(WebGLExtensions, [{
    key: "get",
    value: function get(name) {
      var _extension = this.extensions[name];

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
  }]);

  return WebGLExtensions;
}();

/**
 * @class WebGLProperties
 * @description 将Material相关的设置转换为对应的渲染参数并关联起来
 * @author bujue
 */
var WebGLProperties = /*#__PURE__*/function () {
  function WebGLProperties() {
    _classCallCheck(this, WebGLProperties);

    //WeakMap 可以通过一个对象作用key 再关联一个新的对象,  作为key的对象是弱引用
    this._properties = new WeakMap();
  }

  _createClass(WebGLProperties, [{
    key: "get",
    value: function get(object) {
      var map = this._properties.get(object);

      if (map === undefined) {
        map = {};

        this._properties.set(object, map);
      }

      return map;
    }
  }, {
    key: "remove",
    value: function remove(object) {
      this._properties.delete(object);
    }
  }, {
    key: "update",
    value: function update(object, key, value) {
      this._properties.get(object)[key] = value;
    }
  }, {
    key: "dispose",
    value: function dispose() {
      this._properties = new WeakMap();
    }
  }]);

  return WebGLProperties;
}();

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
var WebGLCapabilities = /*#__PURE__*/function () {
  function WebGLCapabilities(gl, parameters) {
    _classCallCheck(this, WebGLCapabilities);

    parameters = parameters || {};
    this._gl = gl; //单个片段着色器能访问的纹理单元数，最低16，一般16或32, 获取纹理单元TEXTURE0，TEXTURE1，TEXTURE2...的最大数量;

    this.maxTextures = gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS); //所有片段着色器总共能访问的纹理单元数（一个program可以有多个fragment shader），最低48，一般48~80

    this.maxCombinedTextures = gl.getParameter(gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS); //顶点着色器中最大的纹理单元  http://blog.sina.com.cn/s/blog_15ff4f4c80102whpt.html 
    //todo 暂时用不到
    //this.maxVertexTextures = gl.getParameter( gl.MAX_VERTEX_TEXTURE_IMAGE_UNITS );
    //可以接受的最大纹理如 2048 4096 8192

    this.maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE); //可以接受的最大cube纹理如 2048 4096 8192

    this.maxCubemapSize = gl.getParameter(gl.MAX_CUBE_MAP_TEXTURE_SIZE); //最大可支持的顶点属性的个数

    this.maxAttributes = gl.getParameter(gl.MAX_VERTEX_ATTRIBS); //顶点着色器中Uniform的最大个数

    this.maxVertexUniforms = gl.getParameter(gl.MAX_VERTEX_UNIFORM_VECTORS); //片元着色器中Uniform的最大个数 

    this.maxFragmentUniforms = gl.getParameter(gl.MAX_FRAGMENT_UNIFORM_VECTORS); //着色器中最多的 VARYING 变量个数  

    this.maxVaryings = gl.getParameter(gl.MAX_VARYING_VECTORS); //todo 单次绘制顶点的最大个数目前还不清楚如何获取

    this.precision = parameters.precision !== undefined ? parameters.precision : 'highp';
    this.precision = this.getMaxPrecision(this.precision);
  } //获得Shader计算的最大精度 highp mediump lowp  


  _createClass(WebGLCapabilities, [{
    key: "getMaxPrecision",
    value: function getMaxPrecision(precision) {
      var gl = this._gl;
      precision = precision || 'highp';

      if (precision === 'highp') {
        if (gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.HIGH_FLOAT).precision > 0 && gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.HIGH_FLOAT).precision > 0) {
          return 'highp';
        }

        precision = 'mediump';
      }

      if (precision === 'mediump') {
        if (gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.MEDIUM_FLOAT).precision > 0 && gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.MEDIUM_FLOAT).precision > 0) {
          return 'mediump';
        }
      }

      return 'lowp';
    }
  }]);

  return WebGLCapabilities;
}();

/**
 * @description 获取运行环境的Webgl的支持能力
 * @author bujue
 */

var WebGLUtils = /*#__PURE__*/function () {
  function WebGLUtils(gl) {
    var _this$_map;

    _classCallCheck(this, WebGLUtils);

    this.gl = gl;
    this._map = (_this$_map = {}, _defineProperty(_this$_map, RepeatWrapping, gl.REPEAT), _defineProperty(_this$_map, ClampToEdgeWrapping, gl.CLAMP_TO_EDGE), _defineProperty(_this$_map, MirroredRepeatWrapping, gl.MIRRORED_REPEAT), _defineProperty(_this$_map, NearestFilter, gl.NEAREST), _defineProperty(_this$_map, NearestMipMapNearestFilter, gl.NEAREST_MIPMAP_NEAREST), _defineProperty(_this$_map, NearestMipMapLinearFilter, gl.NEAREST_MIPMAP_LINEAR), _defineProperty(_this$_map, LinearFilter, gl.LINEAR), _defineProperty(_this$_map, LinearMipMapNearestFilter, gl.LINEAR_MIPMAP_NEAREST), _defineProperty(_this$_map, LinearMipMapLinearFilter, gl.LINEAR_MIPMAP_LINEAR), _defineProperty(_this$_map, UnsignedByteType, gl.UNSIGNED_BYTE), _defineProperty(_this$_map, UnsignedShort4444Type, gl.UNSIGNED_SHORT_4_4_4_4), _defineProperty(_this$_map, UnsignedShort5551Type, gl.UNSIGNED_SHORT_5_5_5_1), _defineProperty(_this$_map, UnsignedShort565Type, gl.UNSIGNED_SHORT_5_6_5), _defineProperty(_this$_map, ByteType, gl.BYTE), _defineProperty(_this$_map, ShortType, gl.SHORT), _defineProperty(_this$_map, UnsignedShortType, gl.UNSIGNED_SHORT), _defineProperty(_this$_map, IntType, gl.INT), _defineProperty(_this$_map, UnsignedIntType, gl.UNSIGNED_INT), _defineProperty(_this$_map, FloatType, gl.FLOAT), _defineProperty(_this$_map, AlphaFormat, gl.ALPHA), _defineProperty(_this$_map, RGBFormat, gl.RGB), _defineProperty(_this$_map, RGBAFormat, gl.RGBA), _defineProperty(_this$_map, LuminanceFormat, gl.LUMINANCE), _defineProperty(_this$_map, LuminanceAlphaFormat, gl.LUMINANCE_ALPHA), _defineProperty(_this$_map, DepthFormat, gl.DEPTH_COMPONENT), _defineProperty(_this$_map, DepthStencilFormat, gl.DEPTH_STENCIL), _defineProperty(_this$_map, AddEquation, gl.FUNC_ADD), _defineProperty(_this$_map, SubtractEquation, gl.FUNC_SUBTRACT), _defineProperty(_this$_map, ReverseSubtractEquation, gl.FUNC_REVERSE_SUBTRACT), _defineProperty(_this$_map, ZeroFactor, gl.ZERO), _defineProperty(_this$_map, OneFactor, gl.ONE), _defineProperty(_this$_map, SrcColorFactor, gl.SRC_COLOR), _defineProperty(_this$_map, OneMinusSrcColorFactor, gl.ONE_MINUS_SRC_COLOR), _defineProperty(_this$_map, SrcAlphaFactor, gl.SRC_ALPHA), _defineProperty(_this$_map, OneMinusSrcAlphaFactor, gl.ONE_MINUS_SRC_ALPHA), _defineProperty(_this$_map, DstAlphaFactor, gl.DST_ALPHA), _defineProperty(_this$_map, OneMinusDstAlphaFactor, gl.ONE_MINUS_DST_ALPHA), _defineProperty(_this$_map, DstColorFactor, gl.DST_COLOR), _defineProperty(_this$_map, OneMinusDstColorFactor, gl.ONE_MINUS_DST_COLOR), _defineProperty(_this$_map, SrcAlphaSaturateFactor, gl.SRC_ALPHA_SATURATE), _this$_map);
  }

  _createClass(WebGLUtils, [{
    key: "convert",
    value: function convert(p) {
      if (this._map[p] !== undefined) return this._map[p];
      return 0;
    }
  }]);

  return WebGLUtils;
}();

var ColorBuffer = /*#__PURE__*/function () {
  function ColorBuffer(gl) {
    _classCallCheck(this, ColorBuffer);

    this.gl = gl;
    this._currentColorMask = null;
    this._currentColorClear = new Vector4(0, 0, 0, 0);
  } //关闭颜色通道 red green blue alpha


  _createClass(ColorBuffer, [{
    key: "setMask",
    value: function setMask(colorMask) {
      if (this._currentColorMask !== colorMask) {
        this.gl.colorMask(colorMask, colorMask, colorMask, colorMask);
        this._currentColorMask = colorMask;
      }
    } //设置清除色 r g b a 为[0-1]

  }, {
    key: "setClear",
    value: function setClear(r, g, b, a, premultipliedAlpha) {
      if (premultipliedAlpha === true) {
        r *= a;
        g *= a;
        b *= a;
      }

      var color = new Vector4(r, g, b, a);

      if (this._currentColorClear.equals(color) === false) {
        this.gl.clearColor(r, g, b, a);

        this._currentColorClear.copy(color);
      }

      color = null;
    }
  }, {
    key: "reset",
    value: function reset() {
      this._currentColorMask = null;

      this._currentColorClear.set(-1, 0, 0, 0); // set to invalid state

    }
  }]);

  return ColorBuffer;
}();

var DepthBuffer = /*#__PURE__*/function () {
  function DepthBuffer(gl) {
    _classCallCheck(this, DepthBuffer);

    this.gl = gl;
    this._currentDepthFunc = null;
    this._currentDepthClear = null;
    this._currentDepthMask = null;
    this._switch = new Switch(gl);
  }

  _createClass(DepthBuffer, [{
    key: "setTest",
    value: function setTest(depthTest) {
      var gl = this.gl;

      if (depthTest) {
        this._switch.enable(gl.DEPTH_TEST);
      } else {
        this._switch.disable(gl.DEPTH_TEST);
      }
    } //不透明与透明物体共存是,绘制透明物体需要锁定深度缓冲即:setMask(true)

  }, {
    key: "setMask",
    value: function setMask(depthMask) {
      var gl = this.gl;

      if (this._currentDepthMask !== depthMask) {
        gl.depthMask(depthMask);
        this._currentDepthMask = depthMask;
      }
    }
  }, {
    key: "setClear",
    value: function setClear(depth) {
      var gl = this.gl;

      if (this._currentDepthClear !== depth) {
        gl.clearDepth(depth);
        this._currentDepthClear = depth;
      }
    }
  }, {
    key: "setFunc",
    value: function setFunc(depthFunc) {
      var gl = this.gl;

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
  }, {
    key: "reset",
    value: function reset() {
      this._currentDepthMask = null;
      this._currentDepthFunc = null;
      this._currentDepthClear = null;
    }
  }]);

  return DepthBuffer;
}();

var StencilBuffer = /*#__PURE__*/function () {
  function StencilBuffer(gl) {
    _classCallCheck(this, StencilBuffer);

    this.gl = gl;
    this.switch = new Switch(gl);
    this._currentStencilClear = null;
  }

  _createClass(StencilBuffer, [{
    key: "setTest",
    value: function setTest(stencilTest) {
      var gl = this.gl;

      if (stencilTest) {
        this.switch.enable(gl.STENCIL_TEST);
      } else {
        this.switch.disable(gl.STENCIL_TEST);
      }
    }
  }, {
    key: "setClear",
    value: function setClear(stencil) {
      if (this._currentStencilClear !== stencil) {
        this.gl.clearStencil(stencil);
        this._currentStencilClear = stencil;
      }
    }
  }, {
    key: "reset",
    value: function reset() {
      this._currentStencilClear = null;
    }
  }]);

  return StencilBuffer;
}();

var capabilitiesSwitch = {};

var Switch = /*#__PURE__*/function () {
  function Switch(gl) {
    _classCallCheck(this, Switch);

    this.gl = gl;
  }

  _createClass(Switch, [{
    key: "enable",
    value: function enable(id) {
      if (capabilitiesSwitch[id] !== true) {
        this.gl.enable(id);
        capabilitiesSwitch[id] = true;
      }
    }
  }, {
    key: "disable",
    value: function disable(id) {
      if (capabilitiesSwitch[id] !== false) {
        this.gl.disable(id);
        capabilitiesSwitch[id] = false;
      }
    }
  }, {
    key: "reset",
    value: function reset() {
      capabilitiesSwitch = {};
    }
  }]);

  return Switch;
}();

var AttributeSwitch = /*#__PURE__*/function () {
  function AttributeSwitch(gl, extensions, capabilities) {
    _classCallCheck(this, AttributeSwitch);

    this.gl = gl;
    this._extensions = extensions;
    var maxVertexAttributes = capabilities.maxAttributes;
    this._newAttributes = new Uint8Array(maxVertexAttributes);
    this._enabledAttributes = new Uint8Array(maxVertexAttributes);
    this._attributeDivisors = new Uint8Array(maxVertexAttributes);
  }

  _createClass(AttributeSwitch, [{
    key: "initAttributes",
    value: function initAttributes() {
      for (var i = 0, l = this._newAttributes.length; i < l; i++) {
        this._newAttributes[i] = 0;
      }
    }
  }, {
    key: "enableAttributeAndDivisor",
    value: function enableAttributeAndDivisor(attribute, meshPerAttribute) {
      this._newAttributes[attribute] = 1;

      if (this._enabledAttributes[attribute] === 0) {
        this.gl.enableVertexAttribArray(attribute);
        this._enabledAttributes[attribute] = 1;
      }

      if (this._attributeDivisors[attribute] !== meshPerAttribute) {
        var extension = this._extensions.get('ANGLE_instanced_arrays');

        extension.vertexAttribDivisorANGLE(attribute, meshPerAttribute);
        this._attributeDivisors[attribute] = meshPerAttribute;
      }
    }
  }, {
    key: "disableUnusedAttributes",
    value: function disableUnusedAttributes() {
      for (var i = 0, l = this._enabledAttributes.length; i !== l; ++i) {
        if (this._enabledAttributes[i] !== this._newAttributes[i]) {
          this.gl.disableVertexAttribArray(i);
          this._enabledAttributes[i] = 0;
        }
      }
    }
  }, {
    key: "reset",
    value: function reset() {
      for (var i = 0; i < this._enabledAttributes.length; i++) {
        if (this._enabledAttributes[i] === 1) {
          this.gl.disableVertexAttribArray(i);
          this._enabledAttributes[i] = 0;
        }
      }
    }
  }]);

  return AttributeSwitch;
}();

var BlendingState = /*#__PURE__*/function () {
  function BlendingState(gl) {
    _classCallCheck(this, BlendingState);

    this.gl = gl;
    this._currentBlendEquation = null;
    this._currentBlendSrc = null;
    this._currentBlendDst = null;
    this._currentBlendEquationAlpha = null;
    this._currentBlendSrcAlpha = null;
    this._currentBlendDstAlpha = null;
    this._switch = new Switch(gl);
  }

  _createClass(BlendingState, [{
    key: "setBlending",
    value: function setBlending(blending, blendEquation, blendSrc, blendDst, blendEquationAlpha, blendSrcAlpha, blendDstAlpha, premultipliedAlpha) {
      var gl = this.gl;
      var utils = new WebGLUtils(gl);

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
  }, {
    key: "reset",
    value: function reset() {
      this._currentBlendEquation = null;
      this._currentBlendSrc = null;
      this._currentBlendDst = null;
      this._currentBlendEquationAlpha = null;
      this._currentBlendSrcAlpha = null;
      this._currentBlendDstAlpha = null;
    }
  }]);

  return BlendingState;
}();

var TextureState = /*#__PURE__*/function () {
  function TextureState(gl, capabilities) {
    _classCallCheck(this, TextureState);

    this.gl = gl;
    this._capabilities = capabilities;
    this._currentTextureSlot = null;
    this._currentBoundTextures = {};
    this._currentTextureSlot = null;
    this._emptyTextures = {};
    this._emptyTextures[gl.TEXTURE_2D] = this.createTexture(gl.TEXTURE_2D, gl.TEXTURE_2D, 1);
    this._emptyTextures[gl.TEXTURE_CUBE_MAP] = this.createTexture(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_CUBE_MAP_POSITIVE_X, 6);
  }

  _createClass(TextureState, [{
    key: "createTexture",
    value: function createTexture(type, target, count) {
      var gl = this.gl;
      var data = new Uint8Array(4); // 4 is required to match default unpack alignment of 4.

      var texture = gl.createTexture();
      gl.bindTexture(type, texture);
      gl.texParameteri(type, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
      gl.texParameteri(type, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

      for (var i = 0; i < count; i++) {
        gl.texImage2D(target + i, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, data);
      }

      return texture;
    }
  }, {
    key: "activeTexture",
    value: function activeTexture(webglSlot) {
      var gl = this.gl;
      var _capabilities = this._capabilities;
      var _maxTextures = _capabilities.maxCombinedTextures;
      if (webglSlot === undefined) webglSlot = gl.TEXTURE0 + _maxTextures - 1;

      if (this._currentTextureSlot !== webglSlot) {
        gl.activeTexture(webglSlot);
        this._currentTextureSlot = webglSlot;
      }
    }
  }, {
    key: "bindTexture",
    value: function bindTexture(webglType, webglTexture) {
      var gl = this.gl;

      if (this._currentTextureSlot === null) {
        this.activeTexture();
      }

      var boundTexture = this._currentBoundTextures[this._currentTextureSlot];

      if (boundTexture === undefined) {
        boundTexture = {
          type: undefined,
          texture: undefined
        };
        this._currentBoundTextures[this._currentTextureSlot] = boundTexture;
      }

      if (boundTexture.type !== webglType || boundTexture.texture !== webglTexture) {
        gl.bindTexture(webglType, webglTexture || this._emptyTextures[webglType]);
        boundTexture.type = webglType;
        boundTexture.texture = webglTexture;
      }
    }
  }, {
    key: "texImage2D",
    value: function texImage2D() {
      var gl = this.gl;

      try {
        gl.texImage2D.apply(gl, arguments);
      } catch (error) {
        console.error('WebGLState:', error);
      }
    }
  }, {
    key: "reset",
    value: function reset() {
      this._currentTextureSlot = null;
      this._currentBoundTextures = {};
      this._currentTextureSlot = null;
    }
  }]);

  return TextureState;
}();

function getLineWidthAvailable(gl) {
  var lineWidthAvailable = false;
  var version = 0;
  var glVersion = gl.getParameter(gl.VERSION);

  if (glVersion.indexOf('WebGL') !== -1) {
    version = parseFloat(/^WebGL\ ([0-9])/.exec(glVersion)[1]);
    lineWidthAvailable = version >= 1.0;
  } else if (glVersion.indexOf('OpenGL ES') !== -1) {
    version = parseFloat(/^OpenGL\ ES\ ([0-9])/.exec(glVersion)[1]);
    lineWidthAvailable = version >= 2.0;
  }

  return lineWidthAvailable;
}

var WebGLState = /*#__PURE__*/function () {
  function WebGLState(gl, extensions, capabilities) {
    _classCallCheck(this, WebGLState);

    this.gl = gl;
    this.buffers = {
      color: new ColorBuffer(gl),
      depth: new DepthBuffer(gl),
      stencil: new StencilBuffer(gl)
    };
    this._attributeSwitch = new AttributeSwitch(gl, extensions, capabilities);
    this._switch = new Switch(gl);
    this._currentProgram = null;
    this._blendingState = new BlendingState(gl);
    this._currentFlipSided = null;
    this._currentPolygonOffsetFactor = null;
    this._currentPolygonOffsetUnits = null;
    this._currentLineWidth = null;
    this._textureState = new TextureState(gl, capabilities);
    this._currentViewport = new Vector4();

    this._initState(gl);
  }

  _createClass(WebGLState, [{
    key: "_initState",
    value: function _initState(gl) {
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
  }, {
    key: "initAttributes",
    value: function initAttributes() {
      this._attributeSwitch.initAttributes();
    }
  }, {
    key: "enableAttribute",
    value: function enableAttribute(attribute) {
      this._attributeSwitch.enableAttributeAndDivisor(attribute, 0);
    }
  }, {
    key: "disableUnusedAttributes",
    value: function disableUnusedAttributes() {
      this._attributeSwitch.disableUnusedAttributes();
    }
  }, {
    key: "enableAttributeAndDivisor",
    value: function enableAttributeAndDivisor(attribute, meshPerAttribute) {
      this._attributeSwitch.enableAttributeAndDivisor(attribute, meshPerAttribute);
    }
  }, {
    key: "enable",
    value: function enable(id) {
      this._switch.enable(id);
    }
  }, {
    key: "disable",
    value: function disable(id) {
      this._switch.disable(id);
    }
  }, {
    key: "useProgram",
    value: function useProgram(program) {
      if (this._currentProgram !== program) {
        this.gl.useProgram(program);
        this._currentProgram = program;
        return true;
      }

      return false;
    }
  }, {
    key: "setBlending",
    value: function setBlending(blending, blendEquation, blendSrc, blendDst, blendEquationAlpha, blendSrcAlpha, blendDstAlpha, premultipliedAlpha) {
      this._blendingState.setBlending(blending, blendEquation, blendSrc, blendDst, blendEquationAlpha, blendSrcAlpha, blendDstAlpha, premultipliedAlpha);
    }
  }, {
    key: "setMaterial",
    value: function setMaterial(material, frontFaceCW) {
      var gl = this.gl;
      var depthBuffer = this.buffers.depth;
      var colorBuffer = this.buffers.color; //如果启用双面绘制,关闭背面剔除

      material.side === DoubleSide ? this._switch.disable(gl.CULL_FACE) : this._switch.enable(gl.CULL_FACE);
      var flipSided = material.side === BackSide;
      if (frontFaceCW) flipSided = !flipSided;
      this.setFlipSided(flipSided);
      material.transparent === true ? this.setBlending(material.blending, material.blendEquation, material.blendSrc, material.blendDst, material.blendEquationAlpha, material.blendSrcAlpha, material.blendDstAlpha, material.premultipliedAlpha) : this.setBlending(NoBlending);
      depthBuffer.setFunc(material.depthFunc);
      depthBuffer.setTest(material.depthTest);
      depthBuffer.setMask(material.depthWrite);
      colorBuffer.setMask(material.colorWrite);
      this.setPolygonOffset(material.polygonOffset, material.polygonOffsetFactor, material.polygonOffsetUnits);
    }
  }, {
    key: "setFlipSided",
    value: function setFlipSided(flipSided) {
      var gl = this.gl;

      if (this._currentFlipSided !== flipSided) {
        if (flipSided) {
          gl.frontFace(gl.CW);
        } else {
          gl.frontFace(gl.CCW);
        }

        this._currentFlipSided = flipSided;
      }
    }
  }, {
    key: "setPolygonOffset",
    value: function setPolygonOffset(polygonOffset, factor, units) {
      var gl = this.gl;

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
  }, {
    key: "setCullFace",
    value: function setCullFace(cullFace) {
      var gl = this.gl;

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
    } //设置线条宽度只有部分浏览器支持,目前Chrome不支持,safari支持
    //https://www.cnblogs.com/twaver/p/7228687.html?utm_source=itdadao&utm_medium=referral
    //三角面画线方案 https://github.com/mattdesl/webgl-lines

  }, {
    key: "setLineWidth",
    value: function setLineWidth(width) {
      if (width !== this._currentLineWidth) {
        if (getLineWidthAvailable(this.gl)) this.gl.lineWidth(width);
        this._currentLineWidth = width;
      }
    }
  }, {
    key: "activeTexture",
    value: function activeTexture(webglSlot) {
      this._textureState.activeTexture(webglSlot);
    }
  }, {
    key: "bindTexture",
    value: function bindTexture(webglType, webglTexture) {
      this._textureState.bindTexture(webglType, webglTexture);
    }
  }, {
    key: "texImage2D",
    value: function texImage2D() {
      this._textureState.texImage2D.apply(this, arguments);
    }
  }, {
    key: "viewport",
    value: function viewport(_viewport) {
      var gl = this.gl;

      if (this._currentViewport.equals(_viewport) === false) {
        gl.viewport(_viewport.x, _viewport.y, _viewport.z, _viewport.w);

        this._currentViewport.copy(_viewport);
      }
    }
  }, {
    key: "reset",
    value: function reset() {
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
  }]);

  return WebGLState;
}();

/**
 * @class WebGLAttributes
 * @description 根据上层的顶点属性Geometry数据,利用WeapMap绑定buffer相关数据,提供get update remove 方法
 *              获取Buffer 更新(创建)buffer  删除buffer
 * @author bujue
 */
var WebGLAttributes = /*#__PURE__*/function () {
  function WebGLAttributes(gl) {
    _classCallCheck(this, WebGLAttributes);

    this._buffers = new WeakMap();
    this.gl = gl;
  } //attribute 对象为BufferAttribute 的实例对象
  //bufferType的值为 gl.ARRAY_BUFFER  或 gl.ELEMENT_ARRAY_BUFFER


  _createClass(WebGLAttributes, [{
    key: "createBuffer",
    value: function createBuffer(attribute, bufferType) {
      var gl = this.gl;
      var array = attribute.array;
      var usage = attribute.dynamic ? gl.DYNAMIC_DRAW : gl.STATIC_DRAW;
      var buffer = gl.createBuffer();
      gl.bindBuffer(bufferType, buffer);
      gl.bufferData(bufferType, array, usage);
      attribute.onUploadCallback();
      var type = typeArray2GLType(gl, array);
      return {
        buffer: buffer,
        type: type,
        bytesPerElement: array.BYTES_PER_ELEMENT,
        version: attribute.version
      };
    }
  }, {
    key: "updateBuffer",
    value: function updateBuffer(buffer, attribute, bufferType) {
      var gl = this.gl;
      var array = attribute.array;
      var updateRange = attribute.updateRange;
      gl.bindBuffer(bufferType, buffer);

      if (attribute.dynamic === false) {
        gl.bufferData(bufferType, array, gl.STATIC_DRAW);
      } else if (updateRange.count === -1) {
        // Not using update ranges
        gl.bufferSubData(bufferType, 0, array);
      } else if (updateRange.count === 0) {
        console.error('WebGLObjects.updateBuffer: dynamic BufferAttribute marked as needsUpdate but updateRange.count is 0, ensure you are using set methods or updating manually.');
      } else {
        gl.bufferSubData(bufferType, updateRange.offset * array.BYTES_PER_ELEMENT, array.subarray(updateRange.offset, updateRange.offset + updateRange.count));
        updateRange.count = -1; // reset range
      }
    }
  }, {
    key: "get",
    value: function get(attribute) {
      if (attribute.isInterleavedBufferAttribute) attribute = attribute.data;
      return this._buffers.get(attribute);
    }
  }, {
    key: "remove",
    value: function remove(attribute) {
      var gl = this.gl;
      if (attribute.isInterleavedBufferAttribute) attribute = attribute.data;

      var data = this._buffers.get(attribute);

      if (data) {
        gl.deleteBuffer(data.buffer);

        this._buffers.delete(attribute);
      }
    }
  }, {
    key: "update",
    value: function update(attribute, bufferType) {
      if (attribute.isInterleavedBufferAttribute) attribute = attribute.data;

      var data = this._buffers.get(attribute);

      if (data === undefined) {
        this._buffers.set(attribute, this.createBuffer(attribute, bufferType));
      } else if (data.version < attribute.version) {
        this.updateBuffer(data.buffer, attribute, bufferType);
        data.version = attribute.version;
      }
    }
  }]);

  return WebGLAttributes;
}(); //todo 如果其他地方也用到同样的操作可以提取到WebGLUtils类中


function typeArray2GLType(gl, array) {
  var type = gl.FLOAT;

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
var Vector2 = /*#__PURE__*/function () {
  function Vector2(x, y) {
    _classCallCheck(this, Vector2);

    this.x = x || 0;
    this.y = y || 0;
    this.isVector2 = true;
  }

  _createClass(Vector2, [{
    key: "set",
    value: function set(x, y) {
      this.x = x;
      this.y = y;
      return this;
    }
  }, {
    key: "clone",
    value: function clone() {
      return new this.constructor(this.x, this.y);
    }
  }, {
    key: "copy",
    value: function copy(v) {
      this.x = v.x;
      this.y = v.y;
      return this;
    }
  }, {
    key: "add",
    value: function add(v, w) {
      if (w !== undefined) {
        console.warn('Vector2: .add() now only accepts one argument. Use .addVectors( a, b ) instead.');
        return this.addVectors(v, w);
      }

      this.x += v.x;
      this.y += v.y;
      return this;
    }
  }, {
    key: "addScalar",
    value: function addScalar(s) {
      this.x += s;
      this.y += s;
      return this;
    }
  }, {
    key: "addVectors",
    value: function addVectors(a, b) {
      this.x = a.x + b.x;
      this.y = a.y + b.y;
      return this;
    }
  }, {
    key: "addScaledVector",
    value: function addScaledVector(v, s) {
      this.x += v.x * s;
      this.y += v.y * s;
      return this;
    }
  }, {
    key: "sub",
    value: function sub(v, w) {
      if (w !== undefined) {
        console.warn('Vector2: .sub() now only accepts one argument. Use .subVectors( a, b ) instead.');
        return this.subVectors(v, w);
      }

      this.x -= v.x;
      this.y -= v.y;
      return this;
    }
  }, {
    key: "subScalar",
    value: function subScalar(s) {
      this.x -= s;
      this.y -= s;
      return this;
    }
  }, {
    key: "subVectors",
    value: function subVectors(a, b) {
      this.x = a.x - b.x;
      this.y = a.y - b.y;
      return this;
    }
  }, {
    key: "multiply",
    value: function multiply(v) {
      this.x *= v.x;
      this.y *= v.y;
      return this;
    }
  }, {
    key: "multiplyScalar",
    value: function multiplyScalar(scalar) {
      this.x *= scalar;
      this.y *= scalar;
      return this;
    }
  }, {
    key: "divide",
    value: function divide(v) {
      this.x /= v.x;
      this.y /= v.y;
      return this;
    }
  }, {
    key: "divideScalar",
    value: function divideScalar(scalar) {
      return this.multiplyScalar(1 / scalar);
    }
  }, {
    key: "fromBufferAttribute",
    value: function fromBufferAttribute(attribute, index, offset) {
      if (offset !== undefined) {
        console.warn('Vector2: offset has been removed from .fromBufferAttribute().');
      }

      this.x = attribute.getX(index);
      this.y = attribute.getY(index);
      return this;
    }
  }, {
    key: "equals",
    value: function equals(v) {
      return v.x === this.x && v.y === this.y;
    }
  }, {
    key: "width",
    get: function get() {
      return this.x;
    },
    set: function set(value) {
      this.x = value;
    }
  }, {
    key: "height",
    get: function get() {
      return this.y;
    },
    set: function set(value) {
      this.y = value;
    }
  }]);

  return Vector2;
}();

/**
 * @class  BufferAttribute缓存属性
 * @description 这个类保存了和 缓存几何模型(BufferGeometry) 关联的属性数据。该类用来保存内置属性比如顶点位置、法相量和颜色等，也可以被用于保存自定义属性。
 * @author bujue
 */

var BufferAttribute = /*#__PURE__*/function () {
  function BufferAttribute(array, itemSize, normalized) {
    _classCallCheck(this, BufferAttribute);

    if (Array.isArray(array)) {
      throw new TypeError('BufferAttribute: array should be a Typed Array.');
    }

    this.name = '';
    this.array = array;
    this.itemSize = itemSize;
    this.count = array !== undefined ? array.length / itemSize : 0;
    this.normalized = normalized === true;
    this.dynamic = false;
    this.updateRange = {
      offset: 0,
      count: -1
    };
    this.version = 0;
    this.isBufferAttribute = true;
  }

  _createClass(BufferAttribute, [{
    key: "onUploadCallback",
    value: function onUploadCallback() {}
  }, {
    key: "setDynamic",
    value: function setDynamic(value) {
      this.dynamic = value;
      return this;
    }
  }, {
    key: "copyVector3sArray",
    value: function copyVector3sArray(vectors) {
      var array = this.array,
          offset = 0;

      for (var i = 0, l = vectors.length; i < l; i++) {
        var vector = vectors[i];

        if (vector === undefined) {
          console.warn('BufferAttribute.copyVector3sArray(): vector is undefined', i);
          vector = new Vector3();
        }

        array[offset++] = vector.x;
        array[offset++] = vector.y;
        array[offset++] = vector.z;
      }

      return this;
    }
  }, {
    key: "copyColorsArray",
    value: function copyColorsArray(colors) {
      var array = this.array,
          offset = 0;

      for (var i = 0, l = colors.length; i < l; i++) {
        var color = colors[i];

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
  }, {
    key: "copyArray",
    value: function copyArray(array) {
      this.array.set(array);
      return this;
    }
  }, {
    key: "getX",
    value: function getX(index) {
      return this.array[index * this.itemSize];
    }
  }, {
    key: "setX",
    value: function setX(index, x) {
      this.array[index * this.itemSize] = x;
      return this;
    }
  }, {
    key: "getY",
    value: function getY(index) {
      return this.array[index * this.itemSize + 1];
    }
  }, {
    key: "setY",
    value: function setY(index, y) {
      this.array[index * this.itemSize + 1] = y;
      return this;
    }
  }, {
    key: "getZ",
    value: function getZ(index) {
      return this.array[index * this.itemSize + 2];
    }
  }, {
    key: "setZ",
    value: function setZ(index, z) {
      this.array[index * this.itemSize + 2] = z;
      return this;
    }
  }, {
    key: "getW",
    value: function getW(index) {
      return this.array[index * this.itemSize + 3];
    }
  }, {
    key: "setW",
    value: function setW(index, w) {
      this.array[index * this.itemSize + 3] = w;
      return this;
    }
  }, {
    key: "setXY",
    value: function setXY(index, x, y) {
      this.setX(index, x);
      this.setY(index, y);
      return this;
    }
  }, {
    key: "setXYZ",
    value: function setXYZ(index, x, y, z) {
      this.setXY(index, x, y);
      this.setZ(index, z);
      return this;
    }
  }, {
    key: "setXYZW",
    value: function setXYZW(index, x, y, z, w) {
      this.setXYZ(index, x, y, z);
      this.setW(index, w);
      return this;
    }
  }, {
    key: "copyVector2sArray",
    value: function copyVector2sArray(vectors) {
      var array = this.array,
          offset = 0;

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
    } //todo 相关的方法使用到再定义

  }, {
    key: "needsUpdate",
    set: function set(value) {
      if (value === true) this.version++;
    }
  }]);

  return BufferAttribute;
}();
/**
 * @description
 * Int8Array 类型数组表示二进制补码8位有符号整数的数组。内容初始化为0。
 * 范围在[-255,255]
 * 数组中每个元素的大小值为1
 */


var Int8BufferAttribute = /*#__PURE__*/function (_BufferAttribute) {
  _inherits(Int8BufferAttribute, _BufferAttribute);

  var _super = _createSuper(Int8BufferAttribute);

  function Int8BufferAttribute(array, itemSize, normalized) {
    _classCallCheck(this, Int8BufferAttribute);

    return _super.call(this, new Int8Array(array), itemSize, normalized);
  }

  return Int8BufferAttribute;
}(BufferAttribute);
/**
 * @description 
 * Uint8Array 数组类型表示一个8位无符号整型数组，创建时内容被初始化为0。
 * 范围在[0,255]
 * 数组中每个元素的大小值为1
 */


var Uint8BufferAttribute = /*#__PURE__*/function (_BufferAttribute2) {
  _inherits(Uint8BufferAttribute, _BufferAttribute2);

  var _super2 = _createSuper(Uint8BufferAttribute);

  function Uint8BufferAttribute(array, itemSize, normalized) {
    _classCallCheck(this, Uint8BufferAttribute);

    return _super2.call(this, new Uint8Array(array), itemSize, normalized);
  }

  return Uint8BufferAttribute;
}(BufferAttribute);
/**
 * @description
 * Uint8ClampedArray（8位无符号整型固定数组）如果你指定一个在 [0,255] 区间外的值，它将被替换为0或255；如果你指定一个非整数，那么它将被设置为最接近它的整数。（数组）内容被初始化为0。
 * 范围在[0,255]
 * 数组中每个元素的大小值为1
 */


var Uint8ClampedBufferAttribute = /*#__PURE__*/function (_BufferAttribute3) {
  _inherits(Uint8ClampedBufferAttribute, _BufferAttribute3);

  var _super3 = _createSuper(Uint8ClampedBufferAttribute);

  function Uint8ClampedBufferAttribute(array, itemSize, normalized) {
    _classCallCheck(this, Uint8ClampedBufferAttribute);

    return _super3.call(this, new Uint8ClampedArray(array), itemSize, normalized);
  }

  return Uint8ClampedBufferAttribute;
}(BufferAttribute);
/**
 * @description
 * Int16Array 类型数组表示二进制补码16位有符号整数的数组。内容初始化为0。
 * 范围在[-65535,65536]
 * 数组中每个元素的大小值为2
 */


var Int16BufferAttribute = /*#__PURE__*/function (_BufferAttribute4) {
  _inherits(Int16BufferAttribute, _BufferAttribute4);

  var _super4 = _createSuper(Int16BufferAttribute);

  function Int16BufferAttribute(array, itemSize, normalized) {
    _classCallCheck(this, Int16BufferAttribute);

    return _super4.call(this, new Int16Array(array), itemSize, normalized);
  }

  return Int16BufferAttribute;
}(BufferAttribute);
/**
 * @description
 * Uint16Array 类型数组表示二进制补码16位无符号整数的数组。内容初始化为0。
 * 范围在[0,65536]
 * 数组中每个元素的大小值为2
 */


var Uint16BufferAttribute = /*#__PURE__*/function (_BufferAttribute5) {
  _inherits(Uint16BufferAttribute, _BufferAttribute5);

  var _super5 = _createSuper(Uint16BufferAttribute);

  function Uint16BufferAttribute(array, itemSize, normalized) {
    _classCallCheck(this, Uint16BufferAttribute);

    return _super5.call(this, new Uint16Array(array), itemSize, normalized);
  }

  return Uint16BufferAttribute;
}(BufferAttribute);
/**
 * @description
 * Int32Array 类型数组表示二进制补码32位有符号整数的数组。内容初始化为0。
 * 范围在[-4294967295,4294967296]
 * 数组中每个元素的大小值为4
 */


var Int32BufferAttribute = /*#__PURE__*/function (_BufferAttribute6) {
  _inherits(Int32BufferAttribute, _BufferAttribute6);

  var _super6 = _createSuper(Int32BufferAttribute);

  function Int32BufferAttribute(array, itemSize, normalized) {
    _classCallCheck(this, Int32BufferAttribute);

    return _super6.call(this, new Int32Array(array), itemSize, normalized);
  }

  return Int32BufferAttribute;
}(BufferAttribute);
/**
 * @description
 * Uint32Array 类型数组表示二进制补码32位无符号整数的数组。内容初始化为0。
 * 范围在[0,4294967296]
 * 数组中每个元素的大小值为4
 */


var Uint32BufferAttribute = /*#__PURE__*/function (_BufferAttribute7) {
  _inherits(Uint32BufferAttribute, _BufferAttribute7);

  var _super7 = _createSuper(Uint32BufferAttribute);

  function Uint32BufferAttribute(array, itemSize, normalized) {
    _classCallCheck(this, Uint32BufferAttribute);

    return _super7.call(this, new Uint32Array(array), itemSize, normalized);
  }

  return Uint32BufferAttribute;
}(BufferAttribute);
/**
 * @description
 * Float32Array 类型数组表示二进制补码32位的浮点数型数组。内容初始化为0。
 * 范围在[0,4294967296]
 * 数组中每个元素的大小值为4
 */


var Float32BufferAttribute = /*#__PURE__*/function (_BufferAttribute8) {
  _inherits(Float32BufferAttribute, _BufferAttribute8);

  var _super8 = _createSuper(Float32BufferAttribute);

  function Float32BufferAttribute(array, itemSize, normalized) {
    _classCallCheck(this, Float32BufferAttribute);

    return _super8.call(this, new Float32Array(array), itemSize, normalized);
  }

  return Float32BufferAttribute;
}(BufferAttribute);
/**
 * @description
 * Float64Array 类型数组表示二进制补码64位的浮点数型数组。内容初始化为0。
 * 数组中每个元素的大小值为8
 */


var Float64BufferAttribute = /*#__PURE__*/function (_BufferAttribute9) {
  _inherits(Float64BufferAttribute, _BufferAttribute9);

  var _super9 = _createSuper(Float64BufferAttribute);

  function Float64BufferAttribute(array, itemSize, normalized) {
    _classCallCheck(this, Float64BufferAttribute);

    return _super9.call(this, new Float64Array(array), itemSize, normalized);
  }

  return Float64BufferAttribute;
}(BufferAttribute);

/**
 * @class DirectGeometry 缓存属性
 * @description 主要对一个几何体的不同面,采用不同Material 渲染
 * @author bujue
 */

var DirectGeometry = /*#__PURE__*/function () {
  function DirectGeometry() {
    _classCallCheck(this, DirectGeometry);

    this.vertices = [];
    this.normals = [];
    this.colors = [];
    this.uvs = [];
    this.uvs2 = [];
    this.groups = [];
    this.boundingBox = null;
    this.boundingSphere = null; // update flags

    this.verticesNeedUpdate = false;
    this.normalsNeedUpdate = false;
    this.colorsNeedUpdate = false;
    this.uvsNeedUpdate = false;
    this.groupsNeedUpdate = false;
  }

  _createClass(DirectGeometry, [{
    key: "computeGroups",
    value: function computeGroups(geometry) {
      var group;
      var groups = [];
      var materialIndex = undefined;
      var faces = geometry.faces;
      var i = 0;

      for (i = 0; i < faces.length; i++) {
        var face = faces[i]; // materials

        if (face.materialIndex !== materialIndex) {
          materialIndex = face.materialIndex;

          if (group !== undefined) {
            group.count = i * 3 - group.start;
            groups.push(group);
          }

          group = {
            start: i * 3,
            materialIndex: materialIndex
          };
        }
      }

      if (group !== undefined) {
        group.count = i * 3 - group.start;
        groups.push(group);
      }

      this.groups = groups;
    }
  }, {
    key: "fromGeometry",
    value: function fromGeometry(geometry) {
      var faces = geometry.faces;
      var vertices = geometry.vertices;
      var faceVertexUvs = geometry.faceVertexUvs;
      var hasFaceVertexUv = faceVertexUvs[0] && faceVertexUvs[0].length > 0;
      var hasFaceVertexUv2 = faceVertexUvs[1] && faceVertexUvs[1].length > 0; //todo  morphs 暂不开放
      //

      for (var i = 0; i < faces.length; i++) {
        var face = faces[i];
        this.vertices.push(vertices[face.a], vertices[face.b], vertices[face.c]);
        var vertexNormals = face.vertexNormals;

        if (vertexNormals.length === 3) {
          this.normals.push(vertexNormals[0], vertexNormals[1], vertexNormals[2]);
        } else {
          var normal = face.normal;
          this.normals.push(normal, normal, normal);
        }

        var vertexColors = face.vertexColors;

        if (vertexColors.length === 3) {
          this.colors.push(vertexColors[0], vertexColors[1], vertexColors[2]);
        } else {
          var color = face.color;
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
  }]);

  return DirectGeometry;
}();

/**
 * @class BufferGeometry 三维几何体的缓存基类
 * @description 实现三维几何体的一些基本操作
 * @author bujue
 */

var bufferGeometryId = 1;

var BufferGeometry = /*#__PURE__*/function (_Events) {
  _inherits(BufferGeometry, _Events);

  var _super = _createSuper(BufferGeometry);

  function BufferGeometry() {
    var _this;

    _classCallCheck(this, BufferGeometry);

    _this = _super.call(this);
    Object.defineProperty(_assertThisInitialized(_this), 'id', {
      value: bufferGeometryId += 2
    });
    _this.type = 'BufferGeometry'; // 顶点索引

    _this.index = null; //包含 position  normal uv

    _this.attributes = {};
    _this.isBufferGeometry = true;
    _this.drawRange = {
      start: 0,
      count: Infinity
    };
    _this.groups = [];
    _this.boundingBox = null;
    _this.boundingSphere = null;
    _this.isBufferGeometry = true;
    return _this;
  }

  _createClass(BufferGeometry, [{
    key: "setIndex",
    value: function setIndex(index) {
      if (Array.isArray(index)) {
        this.index = new (_Math.arrayMax(index) > 65535 ? Uint32BufferAttribute : Uint16BufferAttribute)(index, 1);
      } else {
        this.index = index;
      }
    }
  }, {
    key: "getIndex",
    value: function getIndex() {
      return this.index;
    }
  }, {
    key: "addAttribute",
    value: function addAttribute(name, attribute) {
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
  }, {
    key: "getAttribute",
    value: function getAttribute(name) {
      return this.attributes[name];
    }
  }, {
    key: "removeAttribute",
    value: function removeAttribute(name) {
      delete this.attributes[name];
      return this;
    }
  }, {
    key: "setFromObject",
    value: function setFromObject(object) {
      var geometry = object.geometry;

      if (object.isPoints || object.isLine) {
        var positions = new Float32BufferAttribute(geometry.vertices.length * 3, 3);
        var colors = new Float32BufferAttribute(geometry.colors.length * 3, 3);
        this.addAttribute('position', positions.copyVector3sArray(geometry.vertices));
        this.addAttribute('color', colors.copyColorsArray(geometry.colors));

        if (geometry.lineDistances && geometry.lineDistances.length === geometry.vertices.length) {
          var lineDistances = new Float32BufferAttribute(geometry.lineDistances.length, 1);
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
  }, {
    key: "fromGeometry",
    value: function fromGeometry(geometry) {
      geometry.__directGeometry = new DirectGeometry().fromGeometry(geometry);
      return this.fromDirectGeometry(geometry.__directGeometry);
    }
  }, {
    key: "fromDirectGeometry",
    value: function fromDirectGeometry(geometry) {
      var positions = new Float32Array(geometry.vertices.length * 3);
      this.addAttribute('position', new BufferAttribute(positions, 3).copyVector3sArray(geometry.vertices));

      if (geometry.normals.length > 0) {
        var normals = new Float32Array(geometry.normals.length * 3);
        this.addAttribute('normal', new BufferAttribute(normals, 3).copyVector3sArray(geometry.normals));
      }

      if (geometry.colors.length > 0) {
        var colors = new Float32Array(geometry.colors.length * 3);
        this.addAttribute('color', new BufferAttribute(colors, 3).copyColorsArray(geometry.colors));
      }

      if (geometry.uvs.length > 0) {
        var uvs = new Float32Array(geometry.uvs.length * 2);
        this.addAttribute('uv', new BufferAttribute(uvs, 2).copyVector2sArray(geometry.uvs));
      }

      if (geometry.uvs2.length > 0) {
        var uvs2 = new Float32Array(geometry.uvs2.length * 2);
        this.addAttribute('uv2', new BufferAttribute(uvs2, 2).copyVector2sArray(geometry.uvs2));
      } // groups


      this.groups = geometry.groups; //todo  morphs 暂不开发
      //todo  skinning 暂不开发

      if (geometry.boundingSphere !== null) {
        this.boundingSphere = geometry.boundingSphere.clone();
      }

      if (geometry.boundingBox !== null) {
        this.boundingBox = geometry.boundingBox.clone();
      }

      return this;
    }
  }, {
    key: "updateFromObject",
    value: function updateFromObject(object) {
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
  }, {
    key: "computeBoundingBox",
    value: function computeBoundingBox() {
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
  }, {
    key: "computeBoundingSphere",
    value: function computeBoundingSphere() {
      _computeBoundingSphere.call(this);
    }
  }, {
    key: "computeVertexNormals",
    value: function computeVertexNormals() {
      var index = this.index;
      var attributes = this.attributes;
      var groups = this.groups;

      if (attributes.position) {
        var positions = attributes.position.array;

        if (attributes.normal === undefined) {
          this.addAttribute('normal', new BufferAttribute(new Float32Array(positions.length), 3));
        } else {
          // reset existing normals to zero
          var array = attributes.normal.array;

          for (var i = 0, il = array.length; i < il; i++) {
            array[i] = 0;
          }
        }

        var normals = attributes.normal.array;
        var vA, vB, vC;
        var pA = new Vector3(),
            pB = new Vector3(),
            pC = new Vector3();
        var cb = new Vector3(),
            ab = new Vector3(); // indexed elements

        if (index) {
          var indices = index.array;

          if (groups.length === 0) {
            this.addGroup(0, indices.length);
          }

          for (var j = 0, jl = groups.length; j < jl; ++j) {
            var group = groups[j];
            var start = group.start;
            var count = group.count;

            for (var i = start, il = start + count; i < il; i += 3) {
              vA = indices[i + 0] * 3;
              vB = indices[i + 1] * 3;
              vC = indices[i + 2] * 3;
              pA.fromArray(positions, vA);
              pB.fromArray(positions, vB);
              pC.fromArray(positions, vC);
              cb.subVectors(pC, pB);
              ab.subVectors(pA, pB);
              cb.cross(ab);
              normals[vA] += cb.x;
              normals[vA + 1] += cb.y;
              normals[vA + 2] += cb.z;
              normals[vB] += cb.x;
              normals[vB + 1] += cb.y;
              normals[vB + 2] += cb.z;
              normals[vC] += cb.x;
              normals[vC + 1] += cb.y;
              normals[vC + 2] += cb.z;
            }
          }
        } else {
          // non-indexed elements (unconnected triangle soup)
          for (var i = 0, il = positions.length; i < il; i += 9) {
            pA.fromArray(positions, i);
            pB.fromArray(positions, i + 3);
            pC.fromArray(positions, i + 6);
            cb.subVectors(pC, pB);
            ab.subVectors(pA, pB);
            cb.cross(ab);
            normals[i] = cb.x;
            normals[i + 1] = cb.y;
            normals[i + 2] = cb.z;
            normals[i + 3] = cb.x;
            normals[i + 4] = cb.y;
            normals[i + 5] = cb.z;
            normals[i + 6] = cb.x;
            normals[i + 7] = cb.y;
            normals[i + 8] = cb.z;
          }
        }

        this.normalizeNormals();
        attributes.normal.needsUpdate = true;
      }
    }
  }, {
    key: "normalizeNormals",
    value: function normalizeNormals() {
      var vector = new Vector3();
      var normals = this.attributes.normal;

      for (var i = 0, il = normals.count; i < il; i++) {
        vector.x = normals.getX(i);
        vector.y = normals.getY(i);
        vector.z = normals.getZ(i);
        vector.normalize();
        normals.setXYZ(i, vector.x, vector.y, vector.z);
      }

      vector = null;
    }
  }, {
    key: "addGroup",
    value: function addGroup(start, count, materialIndex) {
      this.groups.push({
        start: start,
        count: count,
        materialIndex: materialIndex !== undefined ? materialIndex : 0
      });
    }
  }, {
    key: "clearGroups",
    value: function clearGroups() {
      this.groups = [];
    }
  }, {
    key: "clone",
    value: function clone() {
      return new BufferGeometry().copy(this);
    }
  }, {
    key: "copy",
    value: function copy(source) {
      var name, i, l; // reset

      this.index = null;
      this.attributes = {};
      this.morphAttributes = {};
      this.groups = [];
      this.boundingBox = null;
      this.boundingSphere = null; // name

      this.name = source.name; // index

      var index = source.index;

      if (index !== null) {
        this.setIndex(index.clone());
      } // attributes


      var attributes = source.attributes;

      for (name in attributes) {
        var attribute = attributes[name];
        this.addAttribute(name, attribute.clone());
      } // groups


      var groups = source.groups;

      for (i = 0, l = groups.length; i < l; i++) {
        var group = groups[i];
        this.addGroup(group.start, group.count, group.materialIndex);
      } // bounding box


      var boundingBox = source.boundingBox;

      if (boundingBox !== null) {
        this.boundingBox = boundingBox.clone();
      } // bounding sphere


      var boundingSphere = source.boundingSphere;

      if (boundingSphere !== null) {
        this.boundingSphere = boundingSphere.clone();
      } // draw range


      this.drawRange.start = source.drawRange.start;
      this.drawRange.count = source.drawRange.count;
      return this;
    }
  }, {
    key: "dispose",
    value: function dispose() {
      this.fire({
        type: 'dispose'
      });
    }
  }]);

  return BufferGeometry;
}(Events);

var _computeBoundingSphere = function () {
  var box = new Box3();
  var vector = new Vector3();
  return function computeBoundingSphere() {
    if (this.boundingSphere === null) {
      this.boundingSphere = new Sphere();
    }

    var position = this.attributes.position;

    if (position) {
      var center = this.boundingSphere.center;
      box.setFromBufferAttribute(position);
      box.getCenter(center); // hoping to find a boundingSphere with a radius smaller than the
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
}();

/**
 * @class WebGLGeometries
 * @description 将上层的顶点属性分解后保存到WebGLAttribute对象中 update更新 WebGLAttribute的update 
 * @author bujue
 */

var WebGLGeometries = /*#__PURE__*/function () {
  function WebGLGeometries(gl, attributes, info) {
    _classCallCheck(this, WebGLGeometries);

    this._gl = gl;
    this._geometries = {};
    this._attributes = attributes;
    this._info = info;
    this._wireframeAttributes = {};
  }

  _createClass(WebGLGeometries, [{
    key: "get",
    value: function get(object, geometry) {
      var buffergeometry = this._geometries[geometry.id];
      if (buffergeometry) return buffergeometry;
      this._onGeometryDisposeBind = onGeometryDispose.bind(this);
      geometry.on('dispose', this._onGeometryDisposeBind);

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
  }, {
    key: "update",
    value: function update(geometry) {
      var gl = this._gl;
      var index = geometry.index;
      var geometryAttributes = geometry.attributes;

      if (index !== null) {
        this._attributes.update(index, gl.ELEMENT_ARRAY_BUFFER);
      }

      for (var name in geometryAttributes) {
        this._attributes.update(geometryAttributes[name], gl.ARRAY_BUFFER);
      } // todo morph targets 暂时不开发

    }
  }, {
    key: "getWireframeAttribute",
    value: function getWireframeAttribute(geometry) {
      var gl = this._gl;
      var arrayMax = _Math.arrayMax;
      var attribute = this._wireframeAttributes[geometry.id];
      if (attribute) return attribute;
      var indices = [];
      var geometryIndex = geometry.index;
      var geometryAttributes = geometry.attributes; // console.time( 'wireframe' );

      if (geometryIndex !== null) {
        var array = geometryIndex.array;

        for (var i = 0, l = array.length; i < l; i += 3) {
          var a = array[i + 0];
          var b = array[i + 1];
          var c = array[i + 2];
          indices.push(a, b, b, c, c, a);
        }
      } else {
        var _array = geometryAttributes.position.array;

        for (var _i = 0, _l = _array.length / 3 - 1; _i < _l; _i += 3) {
          var _a = _i + 0;

          var _b = _i + 1;

          var _c = _i + 2;

          indices.push(_a, _b, _b, _c, _c, _a);
        }
      } // console.timeEnd( 'wireframe' );


      attribute = new (arrayMax(indices) > 65535 ? Uint32BufferAttribute : Uint16BufferAttribute)(indices, 1);

      this._attributes.update(attribute, gl.ELEMENT_ARRAY_BUFFER);

      this._wireframeAttributes[geometry.id] = attribute;
      return attribute;
    }
  }]);

  return WebGLGeometries;
}();

function onGeometryDispose(event) {
  var geometry = event.target;
  var buffergeometry = this._geometries[geometry.id];
  if (!buffergeometry) return;

  if (buffergeometry.index !== null) {
    this._attributes.remove(buffergeometry.index);
  }

  for (var name in buffergeometry.attributes) {
    this._attributes.remove(buffergeometry.attributes[name]);
  }

  geometry.off('dispose', this._onGeometryDisposeBind);
  this._onGeometryDisposeBind = null;
  delete this._geometries[geometry.id]; // TODO Remove duplicate code

  var attribute = this._wireframeAttributes[geometry.id];

  if (attribute) {
    this._attributes.remove(attribute);

    delete this._wireframeAttributes[geometry.id];
  } // attribute = this._wireframeAttributes[buffergeometry.id];
  // if (attribute) {
  //     this._attributes.remove(attribute);
  //     delete this._wireframeAttributes[buffergeometry.id];
  // }
  //


  this._info.memory.geometries--;
}

var UniformsLib = {
  common: {
    diffuse: {
      value: new Color$1(0xeeeeee)
    },
    opacity: {
      value: 1.0
    },
    map: {
      value: null
    },
    uvTransform: {
      value: new Matrix3()
    }
  },
  lights: {
    ambientLightColor: {
      value: []
    },
    directionalLights: {
      value: [],
      properties: {
        direction: {},
        color: {}
      }
    },
    spotLights: {
      value: [],
      properties: {
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
      value: [],
      properties: {
        color: {},
        position: {},
        decay: {},
        distance: {}
      }
    }
  },
  points: {
    diffuse: {
      value: new Color$1(0xeeeeee)
    },
    opacity: {
      value: 1.0
    },
    size: {
      value: 1.0
    },
    scale: {
      value: 1.0
    },
    map: {
      value: null
    },
    uvTransform: {
      value: new Matrix3()
    }
  },
  line: {
    scale: {
      value: 1
    },
    dashSize: {
      value: 1
    },
    totalSize: {
      value: 2
    }
  },
  sprite: {
    diffuse: {
      value: new Color$1(0xeeeeee)
    },
    opacity: {
      value: 1.0
    },
    center: {
      value: new Vector2(0.5, 0.5)
    },
    rotation: {
      value: 0.0
    },
    map: {
      value: null
    },
    uvTransform: {
      value: new Matrix3()
    }
  }
};

var UniformsUtils$1 = {
  merge: function merge(uniforms) {
    var merged = {};

    for (var u = 0; u < uniforms.length; u++) {
      var tmp = this.clone(uniforms[u]);

      for (var p in tmp) {
        merged[p] = tmp[p];
      }
    }

    return merged;
  },
  clone: function clone(uniforms_src) {
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

var ShaderChunk = {
  meshbasic_frag: meshbasic_frag,
  meshbasic_vert: meshbasic_vert,
  linedashed_vert: linedashed_vert,
  linedashed_frag: linedashed_frag,
  points_vert: points_vert,
  points_frag: points_frag,
  meshlambert_vert: meshlambert_vert,
  meshlambert_frag: meshlambert_frag,
  meshphong_vert: meshphong_vert,
  meshphong_frag: meshphong_frag,
  linemesh_vert: linemesh_vert,
  linemesh_frag: linemesh_frag,
  sprite_vert: sprite_vert,
  sprite_frag: sprite_frag
};

var ShaderLib = {
  basic: {
    uniforms: UniformsUtils$1.merge([UniformsLib.common]),
    vertexShader: ShaderChunk.meshbasic_vert,
    fragmentShader: ShaderChunk.meshbasic_frag
  },
  lambert: {
    uniforms: UniformsUtils$1.merge([UniformsLib.common, UniformsLib.lights, {
      emissive: {
        value: new Color$1(0x000000)
      }
    }]),
    vertexShader: ShaderChunk.meshlambert_vert,
    fragmentShader: ShaderChunk.meshlambert_frag
  },
  phong: {
    uniforms: UniformsUtils$1.merge([UniformsLib.common, UniformsLib.lights, {
      emissive: {
        value: new Color$1(0x000000)
      },
      specular: {
        value: new Color$1(0x111111)
      },
      shininess: {
        value: 30
      }
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
      linewidth: {
        value: 1
      },
      resolution: {
        value: new Vector2(1, 1)
      }
    }]),
    vertexShader: ShaderChunk.linemesh_vert,
    fragmentShader: ShaderChunk.linemesh_frag
  },
  points: {
    uniforms: UniformsUtils$1.merge([UniformsLib.points //UniformsLib.fog
    ]),
    vertexShader: ShaderChunk.points_vert,
    fragmentShader: ShaderChunk.points_frag
  },
  sprite: {
    uniforms: UniformsUtils$1.merge([UniformsLib.sprite //UniformsLib.fog
    ]),
    vertexShader: ShaderChunk.sprite_vert,
    fragmentShader: ShaderChunk.sprite_frag
  }
};

/**
 * @class WebGLInfo
 * @description 保存渲染的基本数据
 * @author bujue
 */
var WebGLInfo = /*#__PURE__*/function () {
  function WebGLInfo(gl) {
    _classCallCheck(this, WebGLInfo);

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

  _createClass(WebGLInfo, [{
    key: "update",
    value: function update(count, mode, instanceCount) {
      var gl = this.gl;
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
  }, {
    key: "reset",
    value: function reset() {
      this.render.frame++;
      this.render.calls = 0;
      this.render.triangles = 0;
      this.render.points = 0;
      this.render.lines = 0;
    }
  }]);

  return WebGLInfo;
}();

var textureId = 0;

var Texture = /*#__PURE__*/function (_Events) {
  _inherits(Texture, _Events);

  var _super = _createSuper(Texture);

  function Texture(image, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy, encoding) {
    var _this;

    _classCallCheck(this, Texture);

    _this = _super.call(this);
    Object.defineProperty(_assertThisInitialized(_this), 'id', {
      value: textureId++
    });
    _this.image = image !== undefined ? image : Texture.DEFAULT_IMAGE;
    _this.mipmaps = [];
    _this.mapping = mapping !== undefined ? mapping : Texture.DEFAULT_MAPPING;
    _this.wrapS = wrapS !== undefined ? wrapS : ClampToEdgeWrapping;
    _this.wrapT = wrapT !== undefined ? wrapT : ClampToEdgeWrapping;
    _this.magFilter = magFilter !== undefined ? magFilter : LinearFilter;
    _this.minFilter = minFilter !== undefined ? minFilter : LinearMipMapLinearFilter;
    _this.anisotropy = anisotropy !== undefined ? anisotropy : 1;
    _this.format = format !== undefined ? format : RGBAFormat;
    _this.type = type !== undefined ? type : UnsignedByteType;
    _this.offset = new Vector2(0, 0);
    _this.repeat = new Vector2(1, 1);
    _this.center = new Vector2(0, 0);
    _this.rotation = 0;
    _this.matrixAutoUpdate = true;
    _this.matrix = new Matrix3();
    _this.generateMipmaps = true;
    _this.premultiplyAlpha = false;
    _this.flipY = true;
    _this.unpackAlignment = 4; // valid values: 1, 2, 4, 8 (see http://www.khronos.org/opengles/sdk/docs/man/xhtml/glPixelStorei.xml)
    //
    // Also changing the encoding after already used by a Material will not automatically make the Material
    // update.  You need to explicitly call Material.needsUpdate to trigger it to recompile.
    //this.encoding = encoding !== undefined ? encoding :  LinearEncoding;

    _this.version = 0;
    _this.onUpdate = null;
    _this.isTexture = true;
    return _this;
  }

  _createClass(Texture, [{
    key: "updateMatrix",
    value: function updateMatrix() {
      this.matrix.setUvTransform(this.offset.x, this.offset.y, this.repeat.x, this.repeat.y, this.rotation, this.center.x, this.center.y);
    }
  }, {
    key: "dispose",
    value: function dispose() {
      this.fire({
        type: 'dispose'
      });
    }
  }, {
    key: "needsUpdate",
    set: function set(value) {
      if (value === true) this.version++;
    }
  }]);

  return Texture;
}(Events);

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

var WebGLUniforms = /*#__PURE__*/function () {
  function WebGLUniforms(gl, program, renderer) {
    _classCallCheck(this, WebGLUniforms);

    this._gl = gl;
    this._program = program;
    this._renderer = renderer;
    this.seq = [];
    this.map = {};
    var n = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);

    for (var i = 0; i < n; ++i) {
      var info = gl.getActiveUniform(program, i),
          addr = gl.getUniformLocation(program, info.name);
      parseUniform(info, addr, this);
    }
  }

  _createClass(WebGLUniforms, [{
    key: "setValue",
    value: function setValue(name, value) {
      var u = this.map[name];
      if (u !== undefined) u.setValue(value, this._renderer);
    }
  }, {
    key: "setOptional",
    value: function setOptional(object, name) {
      //保留,暂时用不到
      var v = object[name];
      if (v !== undefined) this.setValue(name, v);
    }
  }]);

  return WebGLUniforms;
}();

WebGLUniforms.upload = function (gl, seq, values, renderer) {
  for (var i = 0, n = seq.length; i !== n; ++i) {
    var u = seq[i],
        v = values[u.id];

    if (v.needsUpdate !== false) {
      // note: always updating when .needsUpdate is undefined
      u.setValue(v.value, renderer);
    }
  }
};

WebGLUniforms.seqWithValue = function (seq, values) {
  var r = [];

  for (var i = 0, n = seq.length; i !== n; ++i) {
    var u = seq[i];
    if (u.id in values) r.push(u);
  }

  return r;
};

var StructuredUniform = /*#__PURE__*/function () {
  function StructuredUniform(gl, id) {
    _classCallCheck(this, StructuredUniform);

    this._gl = gl;
    this.id = id;
    this.seq = [];
    this.map = {};
  }

  _createClass(StructuredUniform, [{
    key: "setValue",
    value: function setValue(value) {
      // Note: Don't need an extra 'renderer' parameter, since samplers
      // are not allowed in structured uniforms.
      var seq = this.seq;

      for (var i = 0, n = seq.length; i !== n; ++i) {
        var u = seq[i];
        u.setValue(value[u.id]);
      }
    }
  }]);

  return StructuredUniform;
}(); // --- Uniform Classes ---


var SingleUniform = function SingleUniform(gl, id, activeInfo, addr) {
  _classCallCheck(this, SingleUniform);

  this._gl = gl;
  this.id = id;
  this.addr = addr;
  this.cache = [];
  this.setValue = getSingularSetter(activeInfo.type); // this.path = activeInfo.name; // DEBUG
};

var PureArrayUniform = function PureArrayUniform(gl, id, activeInfo, addr) {
  _classCallCheck(this, PureArrayUniform);

  this._gl = gl;
  this.id = id;
  this.addr = addr;
  this.cache = [];
  this.size = activeInfo.size;
  this.setValue = getPureArraySetter(activeInfo.type); // this.path = activeInfo.name; // DEBUG
};

function getSingularSetter(type) {
  switch (type) {
    case 0x1406:
      return setValue1f;
    // FLOAT

    case 0x8b50:
      return setValue2fv;
    // _VEC2

    case 0x8b51:
      return setValue3fv;
    // _VEC3

    case 0x8b52:
      return setValue4fv;
    // _VEC4

    case 0x8b5a:
      return setValue2fm;
    // _MAT2

    case 0x8b5b:
      return setValue3fm;
    // _MAT3

    case 0x8b5c:
      return setValue4fm;
    // _MAT4

    case 0x8b5e:
    case 0x8d66:
      return setValueT1;
    // SAMPLER_2D, SAMPLER_EXTERNAL_OES
    // case 0x8b60: return setValueT6; // SAMPLER_CUBE

    case 0x1404:
    case 0x8b56:
      return setValue1i;
    // INT, BOOL

    case 0x8b53:
    case 0x8b57:
      return setValue2iv;
    // _VEC2

    case 0x8b54:
    case 0x8b58:
      return setValue3iv;
    // _VEC3

    case 0x8b55:
    case 0x8b59:
      return setValue4iv;
    // _VEC4
  }
}

function getPureArraySetter(type) {
  switch (type) {
    case 0x1406:
      return setValue1fv;
    // FLOAT

    case 0x8b50:
      return setValueV2a;
    // _VEC2

    case 0x8b51:
      return setValueV3a;
    // _VEC3

    case 0x8b52:
      return setValueV4a;
    // _VEC4

    case 0x8b5a:
      return setValueM2a;
    // _MAT2

    case 0x8b5b:
      return setValueM3a;
    // _MAT3

    case 0x8b5c:
      return setValueM4a;
    // _MAT4

    case 0x8b5e:
      return setValueT1a;
    // SAMPLER_2D
    //  case 0x8b60: return setValueT6a; // SAMPLER_CUBE

    case 0x1404:
    case 0x8b56:
      return setValue1iv;
    // INT, BOOL

    case 0x8b53:
    case 0x8b57:
      return setValue2iv;
    // _VEC2

    case 0x8b54:
    case 0x8b58:
      return setValue3iv;
    // _VEC3

    case 0x8b55:
    case 0x8b59:
      return setValue4iv;
    // _VEC4
  }
}

function parseUniform(activeInfo, addr, container) {
  var RePathPart = /([\w\d_]+)(\])?(\[|\.)?/g;
  var path = activeInfo.name,
      pathLength = path.length; // reset RegExp object, because of the early exit of a previous run

  RePathPart.lastIndex = 0;

  while (true) {
    var match = RePathPart.exec(path),
        matchEnd = RePathPart.lastIndex,
        id = match[1],
        idIsIndex = match[2] === ']',
        subscript = match[3];
    if (idIsIndex) id = id | 0; // convert to integer

    if (subscript === undefined || subscript === '[' && matchEnd + 2 === pathLength) {
      // bare name or "pure" bottom-level array "[0]" suffix
      addUniform(container, subscript === undefined ? new SingleUniform(container._gl, id, activeInfo, addr) : new PureArrayUniform(container._gl, id, activeInfo, addr));
      break;
    } else {
      // step into inner node / create it in case it doesn't exist
      var map = container.map,
          next = map[id];

      if (next === undefined) {
        next = new StructuredUniform(container._gl, id);
        addUniform(container, next);
      }

      container = next;
    }
  }
}

function addUniform(container, uniformObject) {
  container.seq.push(uniformObject);
  container.map[uniformObject.id] = uniformObject;
} // Array Caches (provide typed arrays for temporary by size)


var arrayCacheF32 = [];
var arrayCacheI32 = [];
var arrayUtils = {
  mat2array: new Float32Array(4),
  mat3array: new Float32Array(9),
  mat4array: new Float32Array(16),
  emptyTexture: new Texture(),
  // emptyCubeTexture: new CubeTexture(),
  arraysEqual: function arraysEqual(a, b) {
    if (a.length !== b.length) return false;

    for (var i = 0, l = a.length; i < l; i++) {
      if (a[i] !== b[i]) return false;
    }

    return true;
  },
  copyArray: function copyArray(a, b) {
    for (var i = 0, l = b.length; i < l; i++) {
      a[i] = b[i];
    }
  },
  flatten: function flatten(array, nBlocks, blockSize) {
    var firstElem = array[0];
    if (firstElem <= 0 || firstElem > 0) return array; // unoptimized: ! isNaN( firstElem )
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
  allocTexUnits: function allocTexUnits(renderer, n) {
    var r = arrayCacheI32[n];

    if (r === undefined) {
      r = new Int32Array(n);
      arrayCacheI32[n] = r;
    }

    for (var i = 0; i !== n; ++i) {
      r[i] = renderer.allocTextureUnit();
    }

    return r;
  }
}; // --- Setters ---

function setValue1f(v) {
  var cache = this.cache;
  if (cache[0] === v) return;

  this._gl.uniform1f(this.addr, v);

  cache[0] = v;
}

function setValue1i(v) {
  var cache = this.cache;
  if (cache[0] === v) return;

  this._gl.uniform1i(this.addr, v);

  cache[0] = v;
} // Single float vector (from flat array or MMGL.VectorN)


function setValue2fv(v) {
  var cache = this.cache;

  if (v.x !== undefined) {
    //XY
    if (cache[0] !== v.x || cache[1] !== v.y) {
      this._gl.uniform2f(this.addr, v.x, v.y);

      cache[0] = v.x;
      cache[1] = v.y;
    }
  } else {
    //arr[2]
    if (arrayUtils.arraysEqual(cache, v)) return;

    this._gl.uniform2fv(this.addr, v);

    arrayUtils.copyArray(cache, v);
  }
}

function setValue3fv(v) {
  var cache = this.cache;

  if (v.x !== undefined) {
    //XYZ
    if (cache[0] !== v.x || cache[1] !== v.y || cache[2] !== v.z) {
      this._gl.uniform3f(this.addr, v.x, v.y, v.z);

      cache[0] = v.x;
      cache[1] = v.y;
      cache[2] = v.z;
    }
  } else if (v.r !== undefined) {
    //RGB
    if (cache[0] !== v.r || cache[1] !== v.g || cache[2] !== v.b) {
      this._gl.uniform3f(this.addr, v.r, v.g, v.b);

      cache[0] = v.r;
      cache[1] = v.g;
      cache[2] = v.b;
    }
  } else {
    //arr[3]
    if (arrayUtils.arraysEqual(cache, v)) return;

    this._gl.uniform3fv(this.addr, v);

    arrayUtils.copyArray(cache, v);
  }
}

function setValue4fv(v) {
  var cache = this.cache;

  if (v.x !== undefined) {
    //XYZW
    if (cache[0] !== v.x || cache[1] !== v.y || cache[2] !== v.z || cache[3] !== v.w) {
      this._gl.uniform4f(this.addr, v.x, v.y, v.z, v.w);

      cache[0] = v.x;
      cache[1] = v.y;
      cache[2] = v.z;
      cache[3] = v.w;
    }
  } else if (v.r !== undefined) {
    //rgba
    if (cache[0] !== v.r || cache[1] !== v.g || cache[2] !== v.b || cache[3] !== v.a) {
      this._gl.uniform4f(this.addr, v.r, v.g, v.b, v.a);

      cache[0] = v.r;
      cache[1] = v.g;
      cache[2] = v.b;
      cache[2] = v.a;
    }
  } else {
    //arr[4]
    if (arrayUtils.arraysEqual(cache, v)) return;

    this._gl.uniform4fv(this.addr, v);

    arrayUtils.copyArray(cache, v);
  }
} // Single matrix (from flat array or MatrixN)


function setValue2fm(v) {
  var cache = this.cache;
  var elements = v.elements;

  if (elements === undefined) {
    //v is Float32Array 4
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
  var cache = this.cache;
  var elements = v.elements;

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
  var cache = this.cache;
  var elements = v.elements;

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
} // Single texture (2D / Cube)


function setValueT1(v, renderer) {
  var cache = this.cache;
  var unit = renderer.allocTextureUnit();

  if (cache[0] !== unit) {
    this._gl.uniform1i(this.addr, unit);

    cache[0] = unit;
  }

  renderer.setTexture2D(v || arrayUtils.emptyTexture, unit);
} // function setValueT6(v, renderer) {
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
  var cache = this.cache;
  if (arrayUtils.arraysEqual(cache, v)) return;

  this._gl.uniform2iv(this.addr, v);

  arrayUtils.copyArray(cache, v);
}

function setValue3iv(v) {
  var cache = this.cache;
  if (arrayUtils.arraysEqual(cache, v)) return;

  this._gl.uniform3iv(this.addr, v);

  arrayUtils.copyArray(cache, v);
}

function setValue4iv(v) {
  var cache = this.cache;
  if (arrayUtils.arraysEqual(cache, v)) return;

  this._gl.uniform4iv(this.addr, v);

  arrayUtils.copyArray(cache, v);
} // Array of scalars


function setValue1fv(v) {
  var cache = this.cache;
  if (arrayUtils.arraysEqual(cache, v)) return;

  this._gl.uniform1fv(this.addr, v);

  arrayUtils.copyArray(cache, v);
}

function setValue1iv(v) {
  var cache = this.cache;
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
} // Array of textures (2D / Cube)


function setValueT1a(v, renderer) {
  var cache = this.cache;
  var n = v.length;
  var units = arrayUtils.allocTexUnits(renderer, n);

  if (arrayUtils.arraysEqual(cache, units) === false) {
    this._gl.uniform1iv(this.addr, units);

    arrayUtils.copyArray(cache, units);
  }

  for (var i = 0; i !== n; ++i) {
    renderer.setTexture2D(v[i] || arrayUtils.emptyTexture, units[i]);
  }
} // function setValueT6a(v, renderer) {

function addLineNumbers(string) {
  var lines = string.split('\n');

  for (var i = 0; i < lines.length; i++) {
    lines[i] = i + 1 + ': ' + lines[i];
  }

  return lines.join('\n');
}

function WebGLShader(gl, type, string) {
  var shader = gl.createShader(type);
  gl.shaderSource(shader, string);
  gl.compileShader(shader);

  if (gl.getShaderParameter(shader, gl.COMPILE_STATUS) === false) {
    console.error('WebGLShader: Shader couldn\'t compile.');
  }

  if (gl.getShaderInfoLog(shader) !== '') {
    console.warn('WebGLShader: gl.getShaderInfoLog()', type === gl.VERTEX_SHADER ? 'vertex' : 'fragment', gl.getShaderInfoLog(shader), addLineNumbers(string));
  } // --enable-privileged-webgl-extension
  // console.log( type, gl.getExtension( 'WEBGL_debug_shaders' ).getTranslatedShaderSource( shader ) );


  return shader;
}

/**
 * @class WebGLProgram
 * @description  组织shader code ,生成 program 对象
 * @author bujue
 */

var programIdCount = 0;

var WebGLProgram = /*#__PURE__*/function () {
  function WebGLProgram(gl, extensions, material, code, shader, parameters) {
    _classCallCheck(this, WebGLProgram);

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

  _createClass(WebGLProgram, [{
    key: "_init",
    value: function _init(gl, extensions, material, shader, parameters) {
      var vertexShader = shader.vertexShader;
      var fragmentShader = shader.fragmentShader;
      var customExtensions = generateExtensions(material.extensions, parameters, extensions);
      var customDefines = generateDefines(this._defines);
      var program = this.program = gl.createProgram();
      var prefixVertex, prefixFragment;

      if (material.isRawShaderMaterial) {
        prefixVertex = [customDefines].filter(filterEmptyLine).join('\n');

        if (prefixVertex.length > 0) {
          prefixVertex += '\n';
        }

        prefixFragment = [customExtensions, customDefines].filter(filterEmptyLine).join('\n');

        if (prefixFragment.length > 0) {
          prefixFragment += '\n';
        }
      } else {
        prefixVertex = ['precision ' + parameters.precision + ' float;', 'precision ' + parameters.precision + ' int;', '#define SHADER_NAME ' + shader.name, //运用纹理作色
        parameters.map ? '#define USE_MAP' : '', //采用顶点作色
        parameters.vertexColors ? '#define USE_COLOR' : '', parameters.doubleSided ? '#define DOUBLE_SIDED' : '', parameters.flipSided ? '#define FLIP_SIDED' : '', //根据Z值的不同,点的大小递减
        parameters.sizeAttenuation ? '#define USE_SIZEATTENUATION' : '', //linemesh 是否是虚线
        parameters.dashed ? '#define USE_DASH' : '', 'uniform mat4 modelMatrix;', 'uniform mat4 modelViewMatrix;', 'uniform mat4 projectionMatrix;', 'uniform mat4 viewMatrix;', 'uniform mat3 normalMatrix;', 'uniform vec3 cameraPosition;', 'attribute vec3 position;', 'attribute vec3 normal;', 'attribute vec2 uv;', '#ifdef USE_COLOR', '	attribute vec3 color;', '#endif', '\n'].filter(filterEmptyLine).join('\n');
        prefixFragment = ['precision ' + parameters.precision + ' float;', 'precision ' + parameters.precision + ' int;', '#define SHADER_NAME ' + shader.name, parameters.map ? '#define USE_MAP' : '', parameters.vertexColors ? '#define USE_COLOR' : '', parameters.doubleSided ? '#define DOUBLE_SIDED' : '', parameters.flipSided ? '#define FLIP_SIDED' : '', parameters.premultipliedAlpha ? '#define PREMULTIPLIED_ALPHA' : '', //linemesh 是否是虚线
        parameters.dashed ? '#define USE_DASH' : '', 'uniform mat4 viewMatrix;', 'uniform vec3 cameraPosition;', '\n'].filter(filterEmptyLine).join('\n');
      }

      vertexShader = replaceLightNums(vertexShader, parameters);
      fragmentShader = replaceLightNums(fragmentShader, parameters);
      vertexShader = unrollLoops(vertexShader);
      fragmentShader = unrollLoops(fragmentShader);
      var vertexGlsl = prefixVertex + vertexShader;
      var fragmentGlsl = prefixFragment + fragmentShader; // console.log('*VERTEX*', vertexGlsl);
      // console.log('*FRAGMENT*', fragmentGlsl);

      var glVertexShader = this.vertexShader = WebGLShader(gl, gl.VERTEX_SHADER, vertexGlsl);
      var glFragmentShader = this.fragmentShader = WebGLShader(gl, gl.FRAGMENT_SHADER, fragmentGlsl);
      gl.attachShader(program, glVertexShader);
      gl.attachShader(program, glFragmentShader);
      gl.linkProgram(program);
      var programLog = gl.getProgramInfoLog(program).trim();
      var vertexLog = gl.getShaderInfoLog(glVertexShader).trim();
      var fragmentLog = gl.getShaderInfoLog(glFragmentShader).trim(); // console.log( '**VERTEX**', gl.getExtension( 'WEBGL_debug_shaders' ).getTranslatedShaderSource( glVertexShader ) );
      // console.log( '**FRAGMENT**', gl.getExtension( 'WEBGL_debug_shaders' ).getTranslatedShaderSource( glFragmentShader ) );

      if (gl.getProgramParameter(program, gl.LINK_STATUS) === false) {
        console.error('WebGLProgram: shader error: ', gl.getError(), 'gl.VALIDATE_STATUS', gl.getProgramParameter(program, gl.VALIDATE_STATUS), 'gl.getProgramInfoLog', programLog, vertexLog, fragmentLog);
      } else if (programLog !== '') {
        console.warn('WebGLProgram: gl.getProgramInfoLog()', programLog);
      } // clean up


      gl.deleteShader(glVertexShader);
      gl.deleteShader(glFragmentShader);
    }
  }, {
    key: "getUniforms",
    value: function getUniforms() {
      var gl = this._gl;
      var program = this.program;

      if (this._cachedUniforms === undefined) {
        //todo 多重纹理的时候需要传递 renderer 
        //setTexture2D(texture , unit )
        //this._cachedUniforms = new WebGLUniforms(gl, program, renderer);
        this._cachedUniforms = new WebGLUniforms(gl, program);
      }

      return this._cachedUniforms;
    }
  }, {
    key: "getAttributes",
    value: function getAttributes() {
      //获取shader中 atttribute对象的handle
      var gl = this._gl;
      var program = this.program;

      if (this._cachedAttributes === undefined) {
        this._cachedAttributes = {};
        var n = gl.getProgramParameter(program, gl.ACTIVE_ATTRIBUTES);

        for (var i = 0; i < n; i++) {
          var info = gl.getActiveAttrib(program, i);
          var name = info.name; //console.log('WebGLProgram: ACTIVE VERTEX ATTRIBUTE:', name, i);

          this._cachedAttributes[name] = gl.getAttribLocation(program, name);
        }
      }

      return this._cachedAttributes;
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this._gl.deleteProgram(this.program);

      this.program = undefined;
    }
  }]);

  return WebGLProgram;
}();

function replaceLightNums(string, parameters) {
  return string.replace(/NUM_DIR_LIGHTS/g, parameters.numDirLights).replace(/NUM_SPOT_LIGHTS/g, parameters.numSpotLights).replace(/NUM_POINT_LIGHTS/g, parameters.numPointLights);
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
  var chunks = [extensions.derivatives || parameters.envMapCubeUV || parameters.bumpMap || parameters.normalMap || parameters.flatShading ? '#extension GL_OES_standard_derivatives : enable' : '', (extensions.fragDepth || parameters.logarithmicDepthBuffer) && rendererExtensions.get('EXT_frag_depth') ? '#extension GL_EXT_frag_depth : enable' : '', extensions.drawBuffers && rendererExtensions.get('WEBGL_draw_buffers') ? '#extension GL_EXT_draw_buffers : require' : '', (extensions.shaderTextureLOD || parameters.envMap) && rendererExtensions.get('EXT_shader_texture_lod') ? '#extension GL_EXT_shader_texture_lod : enable' : ''];
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

var WebGLPrograms = /*#__PURE__*/function () {
  function WebGLPrograms(gl, extensions, capabilities) {
    _classCallCheck(this, WebGLPrograms);

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

  _createClass(WebGLPrograms, [{
    key: "getParameters",
    value: function getParameters(material, lights) {
      var shaderID = this._shaderIDs[material.type];
      var precision = this._capabilities.precision;

      if (material.precision !== null) {
        precision = this._capabilities.getMaxPrecision(material.precision);

        if (precision !== material.precision) {
          console.warn('WebGLProgram.getParameters:', material.precision, 'not supported, using', precision, 'instead.');
        }
      } //shader Define值从这里取


      var parameters = {
        shaderID: shaderID,
        precision: precision,
        map: !!material.map,
        vertexColors: material.vertexColors,
        alphaTest: material.alphaTest,
        doubleSided: material.side === DoubleSide,
        flipSided: material.side === BackSide,
        dashed: !!material.dashed,
        sizeAttenuation: !!material.sizeAttenuation,
        premultipliedAlpha: !!material.premultipliedAlpha,
        numDirLights: lights.directional.length,
        numPointLights: lights.point.length,
        numSpotLights: lights.spot.length
      };
      return parameters;
    }
  }, {
    key: "getProgramCode",
    value: function getProgramCode(material, parameters) {
      var array = []; //todo  关键字暂时都保留,后面优化去掉

      var parameterNames = ["precision", "supportsVertexTextures", "map", "mapEncoding", "envMap", "envMapMode", "envMapEncoding", "lightMap", "aoMap", "emissiveMap", "emissiveMapEncoding", "bumpMap", "normalMap", "displacementMap", "specularMap", "roughnessMap", "metalnessMap", "gradientMap", "alphaMap", "combine", "vertexColors", "fog", "useFog", "fogExp", "flatShading", "sizeAttenuation", "logarithmicDepthBuffer", "skinning", "maxBones", "useVertexTexture", "morphTargets", "morphNormals", "maxMorphTargets", "maxMorphNormals", "premultipliedAlpha", "numDirLights", "numPointLights", "numSpotLights", "numHemiLights", "numRectAreaLights", "shadowMapEnabled", "shadowMapType", "toneMapping", 'physicallyCorrectLights', "alphaTest", "doubleSided", "flipSided", "numClippingPlanes", "numClipIntersection", "depthPacking", "dithering", "dashed"];

      if (parameters.shaderID) {
        array.push(parameters.shaderID);
      } else {
        array.push(material.fragmentShader);
        array.push(material.vertexShader);
      }

      if (material.defines !== undefined) {
        for (var name in material.defines) {
          array.push(name);
          array.push(material.defines[name]);
        }
      }

      for (var i = 0; i < parameterNames.length; i++) {
        array.push(parameters[parameterNames[i]]);
      } //array.push(material.onBeforeCompile.toString());


      return array.join();
    }
  }, {
    key: "acquireProgram",
    value: function acquireProgram(material, shader, parameters, code) {
      var program; // Check if code has been already compiled

      for (var p = 0, pl = this.programs.length; p < pl; p++) {
        var programInfo = this.programs[p];

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
  }, {
    key: "releaseProgram",
    value: function releaseProgram(program) {
      if (--program.usedTimes === 0) {
        // Remove from unordered set
        var i = this.programs.indexOf(program);
        this.programs[i] = this.programs[this.programs.length - 1];
        this.programs.pop(); // Free WebGL resources

        program.destroy();
      }
    }
  }]);

  return WebGLPrograms;
}();

var WebGLRenderList = /*#__PURE__*/function () {
  function WebGLRenderList() {
    _classCallCheck(this, WebGLRenderList);

    this.renderItems = [];
    this.renderItemsIndex = 0;
    this.opaque = [];
    this.transparent = [];
  }

  _createClass(WebGLRenderList, [{
    key: "init",
    value: function init() {
      this.renderItemsIndex = 0;
      this.opaque.length = 0;
      this.transparent.length = 0;
    }
  }, {
    key: "push",
    value: function push(object, geometry, material, z, group) {
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
  }, {
    key: "sort",
    value: function sort() {
      if (this.opaque.length > 1) this.opaque.sort(painterSortStable);
      if (this.transparent.length > 1) this.transparent.sort(reversePainterSortStable);
    }
  }]);

  return WebGLRenderList;
}();

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
  }

  if (a.z !== b.z) {
    return b.z - a.z;
  } else {
    return a.id - b.id;
  }
}

var WebGLRenderLists = /*#__PURE__*/function () {
  function WebGLRenderLists() {
    _classCallCheck(this, WebGLRenderLists);

    this._lists = {};
  }

  _createClass(WebGLRenderLists, [{
    key: "get",
    value: function get(scene, camera) {
      var hash = scene.id + ',' + camera.id;
      var list = this._lists[hash];

      if (list === undefined) {
        //console.log('WebGLRenderLists:', hash);
        list = new WebGLRenderList();
        this._lists[hash] = list;
      }

      return list;
    }
  }, {
    key: "dispose",
    value: function dispose() {
      this._lists = {};
    }
  }]);

  return WebGLRenderLists;
}();

var WebGLBufferRenderer = /*#__PURE__*/function () {
  function WebGLBufferRenderer(gl, extensions, info) {
    _classCallCheck(this, WebGLBufferRenderer);

    this._mode = gl.TRIANGLES;
    this._gl = gl;
    this._info = info;
    this._extensions = extensions;
  }

  _createClass(WebGLBufferRenderer, [{
    key: "setMode",
    value: function setMode(value) {
      this._mode = value;
    }
  }, {
    key: "render",
    value: function render(start, count) {
      this._gl.drawArrays(this._mode, start, count);

      this._info.update(count, this._mode);
    }
  }, {
    key: "renderInstances",
    value: function renderInstances(geometry, start, count) {
      var extension = this._extensions.get('ANGLE_instanced_arrays');

      if (extension === null) {
        console.error('WebGLBufferRenderer: using InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.');
        return;
      }

      this._extension.drawArraysInstancedANGLE(mode, start, count, geometry.maxInstancedCount);

      this._info.update(count, this._mode, geometry.maxInstancedCount);
    }
  }]);

  return WebGLBufferRenderer;
}();

/**
 * @class WebGLObjects
 * @description 通过更新帧来控制更新WebGLGemetries update
 * @author bujue
 */
var WebGLObjects = /*#__PURE__*/function () {
  function WebGLObjects(geometries, info) {
    _classCallCheck(this, WebGLObjects);

    this._infoRender = info.render;
    this._updateList = {};
    this._geometries = geometries;
  }

  _createClass(WebGLObjects, [{
    key: "update",
    value: function update(object) {
      var frame = this._infoRender.frame;
      var geometries = this._geometries;
      var geometry = object.geometry;
      var buffergeometry = geometries.get(object, geometry); // Update once per frame

      if (this._updateList[buffergeometry.id] !== frame) {
        if (geometry.isGeometry) {
          buffergeometry.updateFromObject(object);
        } //创建buffer


        geometries.update(buffergeometry);
        this._updateList[buffergeometry.id] = frame;
      }

      return buffergeometry;
    }
  }, {
    key: "dispose",
    value: function dispose() {
      this._updateList = {};
    }
  }]);

  return WebGLObjects;
}();

var WebGLIndexedBufferRenderer = /*#__PURE__*/function () {
  function WebGLIndexedBufferRenderer(gl, extensions, info) {
    _classCallCheck(this, WebGLIndexedBufferRenderer);

    this._mode = gl.TRIANGLES;
    this._gl = gl;
    this._info = info;
    this._extensions = extensions;
    this._type = undefined;
    this._bytesPerElement = undefined;
  }

  _createClass(WebGLIndexedBufferRenderer, [{
    key: "setMode",
    value: function setMode(value) {
      this._mode = value;
    }
  }, {
    key: "setIndex",
    value: function setIndex(value) {
      this._type = value.type;
      this._bytesPerElement = value.bytesPerElement;
    }
  }, {
    key: "render",
    value: function render(start, count) {
      this._gl.drawElements(this._mode, count, this._type, start * this._bytesPerElement);

      this._info.update(count, this._mode);
    }
  }, {
    key: "renderInstances",
    value: function renderInstances(geometry, start, count) {
      var extension = this._extensions.get('ANGLE_instanced_arrays');

      if (extension === null) {
        console.error('WebGLIndexedBufferRenderer: using InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.');
        return;
      }

      extension.drawElementsInstancedANGLE(this._mode, count, this._type, start * this._bytesPerElement, geometry.maxInstancedCount);

      this._info.update(count, this._mode, geometry.maxInstancedCount);
    }
  }]);

  return WebGLIndexedBufferRenderer;
}();

var WebGLTextures = /*#__PURE__*/function () {
  function WebGLTextures(_gl, extensions, state, properties, capabilities, utils, info) {
    _classCallCheck(this, WebGLTextures);

    this.gl = _gl;
    this._properties = properties;
    this._info = info;
    this._state = state;
    this.extensions = extensions;
    this._capabilities = capabilities;
    this._utils = utils;
  }

  _createClass(WebGLTextures, [{
    key: "setTexture2D",
    value: function setTexture2D(texture, slot) {
      var _gl = this.gl;

      var textureProperties = this._properties.get(texture);

      if (texture.version > 0 && textureProperties.__version !== texture.version) {
        var image = texture.image;

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
  }, {
    key: "_uploadTexture",
    value: function _uploadTexture(textureProperties, texture, slot) {
      var _gl = this.gl;
      var state = this._state;
      var utils = this._utils;

      if (textureProperties.__webglInit === undefined) {
        textureProperties.__webglInit = true;
        this._onTextureDisposeBind = onTextureDispose.bind(this);
        texture.on('dispose', this._onTextureDisposeBind);
        textureProperties.__webglTexture = _gl.createTexture();
        this._info.memory.textures++;
      }

      state.activeTexture(_gl.TEXTURE0 + slot);
      state.bindTexture(_gl.TEXTURE_2D, textureProperties.__webglTexture); //UNPACK_FLIP_Y_WEBGL 是否将纹理上下颠倒进行映射
      //https://yq.aliyun.com/articles/62464

      _gl.pixelStorei(_gl.UNPACK_FLIP_Y_WEBGL, texture.flipY); //对图片纹理的每个像素的R、G、B通道，乘以A的值后，并替换原先的值


      _gl.pixelStorei(_gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, texture.premultiplyAlpha); //纹理的像素对齐


      _gl.pixelStorei(_gl.UNPACK_ALIGNMENT, texture.unpackAlignment);

      var image = clampToMaxSize(texture.image, this._capabilities.maxTextureSize);

      if (textureNeedsPowerOfTwo(texture) && isPowerOfTwo(image) === false) {
        image = makePowerOfTwo(image);
      }

      var isPowerOfTwoImage = isPowerOfTwo(image),
          glFormat = utils.convert(texture.format),
          glType = utils.convert(texture.type);
      setTextureParameters.call(this, _gl.TEXTURE_2D, texture, isPowerOfTwoImage);
      var mipmap,
          mipmaps = texture.mipmaps; // regular Texture (image, video, canvas)
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
  }]);

  return WebGLTextures;
}();

function onTextureDispose(event) {
  var texture = event.target;
  texture.off('dispose', this._onTextureDisposeBind);
  this._onTextureDisposeBind = null;
  deallocateTexture.call(this, texture);
  this._info.memory.textures--;
}

function clampToMaxSize(image, maxSize) {
  if (image.width > maxSize || image.height > maxSize) {
    if ('data' in image) {
      console.warn('WebGLRenderer: image in DataTexture is too big (' + image.width + 'x' + image.height + ').');
      return;
    } // Warning: Scaling through the canvas will only work with images that use
    // premultiplied alpha.


    var scale = maxSize / Math.max(image.width, image.height);
    var canvas = document.createElementNS('http://www.w3.org/1999/xhtml', 'canvas');
    canvas.width = Math.floor(image.width * scale);
    canvas.height = Math.floor(image.height * scale);
    var context = canvas.getContext('2d');
    context.drawImage(image, 0, 0, image.width, image.height, 0, 0, canvas.width, canvas.height);
    console.warn('WebGLRenderer: image is too big (' + image.width + 'x' + image.height + '). Resized to ' + canvas.width + 'x' + canvas.height, image);
    return canvas;
  }

  return image;
}

function textureNeedsPowerOfTwo(texture) {
  return texture.wrapS !== ClampToEdgeWrapping || texture.wrapT !== ClampToEdgeWrapping || texture.minFilter !== NearestFilter && texture.minFilter !== LinearFilter;
}

function isPowerOfTwo(image) {
  return _Math.isPowerOfTwo(image.width) && _Math.isPowerOfTwo(image.height);
}

var _canvas;

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
  var _gl = this.gl,
      extensions = this.extensions,
      utils = this._utils,
      properties = this._properties,
      extension;

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

  extension = extensions.get('EXT_texture_filter_anisotropic');

  if (extension) {
    if (texture.type === FloatType && extensions.get('OES_texture_float_linear') === null) return;
    if (texture.type === HalfFloatType && extensions.get('OES_texture_half_float_linear') === null) return;

    if (texture.anisotropy > 1 || properties.get(texture).__currentAnisotropy) {
      _gl.texParameterf(textureType, extension.TEXTURE_MAX_ANISOTROPY_EXT, Math.min(texture.anisotropy, capabilities.getMaxAnisotropy()));

      properties.get(texture).__currentAnisotropy = texture.anisotropy;
    }
  }
} // Fallback filters for non-power-of-2 textures


function filterFallback(f) {
  var _gl = this.gl;

  if (f === NearestFilter || f === NearestMipMapNearestFilter || f === NearestMipMapLinearFilter) {
    return _gl.NEAREST;
  }

  return _gl.LINEAR;
}

function deallocateTexture(texture) {
  var _gl = this.gl;

  var textureProperties = this._properties.get(texture);

  if (texture.image && textureProperties.__image__webglTextureCube) {
    // cube texture
    _gl.deleteTexture(textureProperties.__image__webglTextureCube);
  } else {
    // 2D texture
    if (textureProperties.__webglInit === undefined) return;

    _gl.deleteTexture(textureProperties.__webglTexture);
  } // remove all webgl properties


  this._properties.remove(texture);
}

function textureNeedsGenerateMipmaps(texture, isPowerOfTwo) {
  return texture.generateMipmaps && isPowerOfTwo && texture.minFilter !== NearestFilter && texture.minFilter !== LinearFilter;
}

function generateMipmap(target, texture, width, height) {
  //生成多级纹理图
  this.gl.generateMipmap(target);

  var textureProperties = this._properties.get(texture); // Note: Math.log( x ) * Math.LOG2E used instead of Math.log2( x ) which is not supported by IE11


  textureProperties.__maxMipLevel = Math.log(Math.max(width, height)) * Math.LOG2E;
}

var webglLightsCount = 0;

var _webGLLightsVector3 = new Vector3();

var WebGLLights = /*#__PURE__*/function () {
  function WebGLLights() {
    _classCallCheck(this, WebGLLights);

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

  _createClass(WebGLLights, [{
    key: "setup",
    value: function setup(lights, shadows, camera) {
      var r = 0,
          g = 0,
          b = 0;
      var directionalLength = 0;
      var pointLength = 0;
      var spotLength = 0;
      var state = this.state;
      var cache = this.cache;
      var viewMatrix = camera.matrixWorldInverse;

      for (var i = 0, l = lights.length; i < l; i++) {
        var light = lights[i];
        var color = light.color;
        var intensity = light.intensity;
        var distance = light.distance;

        if (light.isAmbientLight) {
          r += color.r * intensity;
          g += color.g * intensity;
          b += color.b * intensity;
        } else if (light.isDirectionalLight) {
          var _uniforms = cache.get(light);

          _uniforms.color.copy(light.color).multiplyScalar(light.intensity);

          _uniforms.direction.setFromMatrixPosition(light.matrixWorld);

          _webGLLightsVector3.setFromMatrixPosition(light.target.matrixWorld);

          _uniforms.direction.sub(_webGLLightsVector3);

          _uniforms.direction.transformDirection(viewMatrix);

          state.directional[directionalLength] = _uniforms;
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
          uniforms.decay = light.distance === 0 ? 0.0 : light.decay;
          state.spot[spotLength] = uniforms;
          spotLength++;
        } else if (light.isPointLight) {
          var uniforms = cache.get(light);
          uniforms.position.setFromMatrixPosition(light.matrixWorld);
          uniforms.position.applyMatrix4(viewMatrix);
          uniforms.color.copy(light.color).multiplyScalar(light.intensity);
          uniforms.distance = light.distance;
          uniforms.decay = light.distance === 0 ? 0.0 : light.decay;
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
  }, {
    key: "dispose",
    value: function dispose() {
      this.cache.dispose();
      this.cache = null;
      this.state = null;
    }
  }]);

  return WebGLLights;
}();

var UniformsCache = /*#__PURE__*/function () {
  function UniformsCache() {
    _classCallCheck(this, UniformsCache);

    this._lights = {};
  }

  _createClass(UniformsCache, [{
    key: "get",
    value: function get(light) {
      var lights = this._lights;

      if (lights[light.id] !== undefined) {
        return lights[light.id];
      }

      var uniforms;

      switch (light.type) {
        case 'DirectionalLight':
          uniforms = {
            direction: new Vector3(),
            color: new Color$1()
          };
          break;

        case 'SpotLight':
          uniforms = {
            position: new Vector3(),
            direction: new Vector3(),
            color: new Color$1(),
            distance: 0,
            coneCos: 0,
            penumbraCos: 0,
            decay: 0
          };
          break;

        case 'PointLight':
          uniforms = {
            position: new Vector3(),
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
  }, {
    key: "dispose",
    value: function dispose() {
      this._lights = null;
    }
  }]);

  return UniformsCache;
}();

var WebGLRenderState = /*#__PURE__*/function () {
  function WebGLRenderState() {
    _classCallCheck(this, WebGLRenderState);

    this.state = {
      lights: new WebGLLights(),
      lightsArray: [],
      spritesArray: []
    };
  }

  _createClass(WebGLRenderState, [{
    key: "init",
    value: function init() {
      this.state.spritesArray.length = 0;
      this.state.lightsArray.length = 0;
    }
  }, {
    key: "pushLight",
    value: function pushLight(light) {
      this.state.lightsArray.push(light);
    }
  }, {
    key: "pushSprite",
    value: function pushSprite(sprite) {
      this.state.spritesArray.push(sprite);
    }
  }, {
    key: "setupLights",
    value: function setupLights(camera) {
      //todo 阴影为空
      var shadowsArray = [];
      this.state.lights.setup(this.state.lightsArray, shadowsArray, camera);
    }
  }, {
    key: "dispose",
    value: function dispose() {
      this.state.lights.dispose();
      this.state = null;
    }
  }]);

  return WebGLRenderState;
}();

var WebGLRenderStates = /*#__PURE__*/function () {
  function WebGLRenderStates() {
    _classCallCheck(this, WebGLRenderStates);

    this._renderStates = {};
  }

  _createClass(WebGLRenderStates, [{
    key: "get",
    value: function get(scene, camera) {
      var hash = scene.id + ',' + camera.id;
      var renderState = this._renderStates[hash];

      if (renderState === undefined) {
        renderState = new WebGLRenderState();
        this._renderStates[hash] = renderState;
      }

      return renderState;
    }
  }, {
    key: "dispose",
    value: function dispose() {
      for (var key in this._renderStates) {
        this._renderStates[key] && this._renderStates[key].dispose();
      }

      this._renderStates = {};
    }
  }]);

  return WebGLRenderStates;
}();

/**
 * @class WebGL渲染对象
 * @author bujue
 */

var WebGLRenderer = /*#__PURE__*/function (_Events) {
  _inherits(WebGLRenderer, _Events);

  var _super = _createSuper(WebGLRenderer);

  function WebGLRenderer(params) {
    var _this;

    _classCallCheck(this, WebGLRenderer);

    _this = _super.call(this);
    params = params || {}; //canvas context 渲染对象的上下文

    _this.gl = null; //canvasDOM 对象

    _this.domElement = null; //私有变量

    _this._width = 0;
    _this._height = 0;
    _this._isContextLost = false; //是否丢失上下文

    _this._pixelRatio = 1; //屏幕的pixelRatio,

    _this._currentViewport = new Vector4(); //当前的渲染视口大小

    _this._currentRenderList = null;
    _this._currentRenderState = null;
    _this._currentMaterialId = -1; //初始化materialId

    _this._currentCamera = null; //当前的相机

    _this._currClearColor = new Color$1(0x000000);
    _this._capabilities = null; //GPU渲染能力 

    _this._state = null; //GPU的状态管理 

    _this._sortObjects = true; // scene graph

    _this._projScreenMatrix = new Matrix4();
    _this._vector3 = new Vector3();
    _this._frustum = new Frustum(); // clearing

    _this.autoClear = true;
    _this.autoClearColor = true;
    _this.autoClearDepth = true;
    _this.autoClearStencil = true;

    _this._init(params);

    _this._initGLContext(params);

    return _this;
  }

  _createClass(WebGLRenderer, [{
    key: "_init",
    value: function _init(parameters) {
      //创建webGL对象上下文
      var me = this;
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

      var _canvas = parameters.canvas !== undefined ? parameters.canvas : document.createElementNS('http://www.w3.org/1999/xhtml', 'canvas'),
          _context = parameters.context !== undefined ? parameters.context : null,
          _alpha = parameters.alpha !== undefined ? parameters.alpha : false,
          _depth = parameters.depth !== undefined ? parameters.depth : true,
          _stencil = parameters.stencil !== undefined ? parameters.stencil : true,
          _antialias = parameters.antialias !== undefined ? parameters.antialias : false,
          _premultipliedAlpha = parameters.premultipliedAlpha !== undefined ? parameters.premultipliedAlpha : true,
          _preserveDrawingBuffer = parameters.preserveDrawingBuffer !== undefined ? parameters.preserveDrawingBuffer : false,
          _powerPreference = parameters.powerPreference !== undefined ? parameters.powerPreference : 'default';

      me.domElement = _canvas;
      me.gl = _context;
      me._width = _canvas.width;
      me._height = _canvas.height;
      me._premultipliedAlpha = _premultipliedAlpha;

      try {
        var contextAttributes = {
          alpha: _alpha,
          depth: _depth,
          stencil: _stencil,
          antialias: _antialias,
          premultipliedAlpha: _premultipliedAlpha,
          preserveDrawingBuffer: _preserveDrawingBuffer,
          powerPreference: _powerPreference
        };

        var _gl = _context || _canvas.getContext('webgl', contextAttributes) || _canvas.getContext('experimental-webgl', contextAttributes);

        if (_gl === null) {
          if (_canvas.getContext('webgl') !== null) {
            throw 'Error creating WebGL context with your selected attributes.';
          } else {
            throw 'Error creating WebGL context.';
          }
        }

        me.gl = _gl;
        me._onContextLostBind = onContextLost.bind(me);
        me._onContextRestoreBind = onContextRestore.bind(me);

        _canvas.addEventListener('webglcontextlost', me._onContextLostBind, false);

        _canvas.addEventListener('webglcontextrestored', me._onContextRestoreBind, false); // Some experimental-webgl implementations do not have getShaderPrecisionFormat


        if (_gl.getShaderPrecisionFormat === undefined) {
          _gl.getShaderPrecisionFormat = function () {
            return {
              'rangeMin': 1,
              'rangeMax': 1,
              'precision': 1
            };
          };
        }
      } catch (error) {
        console.error('WebGLRenderer: ' + error);
      }
    }
  }, {
    key: "_initGLContext",
    value: function _initGLContext(parameters) {
      var _gl = this.gl;
      var _width = this._width;
      var _height = this._height;

      var _viewport = new Vector4(0, 0, _width, _height);
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
      this._capabilities = new WebGLCapabilities(_gl, parameters);
      this._state = new WebGLState(_gl, this._extensions, this._capabilities);
      this._renderStates = new WebGLRenderStates();
      this._textures = new WebGLTextures(_gl, this._extensions, this._state, this._properties, this._capabilities, this._utils, this._info);
      this._attributes = new WebGLAttributes(_gl);
      this._geometries = new WebGLGeometries(_gl, this._attributes, this._info);
      this._objects = new WebGLObjects(this._geometries, this._info);
      this._programCache = new WebGLPrograms(_gl, this._extensions, this._capabilities);
      this._renderLists = new WebGLRenderLists();
      this._bufferRenderer = new WebGLBufferRenderer(_gl, this._extensions, this._info);
      this._indexedBufferRenderer = new WebGLIndexedBufferRenderer(_gl, this._extensions, this._info);

      this._state.viewport(this._currentViewport.copy(_viewport).multiplyScalar(this._pixelRatio)); //console.dir(this._capabilities);


      this._info.programs = this._programCache.programs; //me.setSize(_width, _height, true);
    }
  }, {
    key: "getContext",
    value: function getContext() {
      return this.gl;
    }
  }, {
    key: "getPixelRatio",
    value: function getPixelRatio() {
      return this._pixelRatio;
    }
  }, {
    key: "getCurrentViewport",
    value: function getCurrentViewport() {
      return this._currentViewport;
    }
  }, {
    key: "getClearColor",
    value: function getClearColor() {
      return this._currClearColor;
    } //设置设备像素比,默认是 1    

  }, {
    key: "setPixelRatio",
    value: function setPixelRatio(value) {
      var _width = this._width;
      var _height = this._height;
      this._pixelRatio = value;
      this.setSize(_width, _height, false);
    } //设置可视区域大小

  }, {
    key: "setSize",
    value: function setSize(width, height, updateStyle) {
      var me = this;
      var _pixelRatio = this._pixelRatio;
      var _canvas = me.domElement;
      this._width = width;
      this._height = height;
      _canvas.width = width * _pixelRatio;
      _canvas.height = height * _pixelRatio; //注意:updateStyle 只有完全等于false才不更新style

      if (updateStyle !== false) {
        _canvas.style.width = width + 'px';
        _canvas.style.height = height + 'px';
      }

      me.setViewport(0, 0, width, height);
    } //设置视口大小

  }, {
    key: "setViewport",
    value: function setViewport(x, y, width, height) {
      var gl = this.gl;
      var viewport = new Vector4(x, y, width, height); //if (this._currentViewport.equals(viewport) === false) {

      this._currentViewport.copy(viewport).multiplyScalar(this._pixelRatio);

      this._state.viewport(this._currentViewport); //}

    } //设置清除色

  }, {
    key: "setClearColor",
    value: function setClearColor() {
      var _gl = this.gl;

      var _arguments = Array.prototype.slice.call(arguments),
          r = _arguments[0],
          g = _arguments[1],
          b = _arguments[2],
          a = _arguments[3];

      var _color = this._currClearColor.set(r, g, b, a);

      this._state.buffers.color.setClear(_color.r, _color.g, _color.b, _color.a, this._premultipliedAlpha);
    }
  }, {
    key: "getClearAlpha",
    value: function getClearAlpha() {
      return this._currClearColor.a;
    }
  }, {
    key: "setClearAlpha",
    value: function setClearAlpha(alpha) {
      var _gl = this.gl;
      this._currClearColor.a = alpha;
      var _color = this._currClearColor;

      this._state.buffers.color.setClear(_color.r, _color.g, _color.b, _color.a, this._premultipliedAlpha);
    }
  }, {
    key: "clear",
    //清除缓冲
    value: function clear(color, depth, stencil) {
      var _gl = this.gl;
      var bits = 0;
      if (color === undefined || color) bits |= _gl.COLOR_BUFFER_BIT;
      if (depth === undefined || depth) bits |= _gl.DEPTH_BUFFER_BIT;
      if (stencil === undefined || stencil) bits |= _gl.STENCIL_BUFFER_BIT;

      _gl.clear(bits);
    } //清除颜色缓冲

  }, {
    key: "clearColor",
    value: function clearColor() {
      this.clear(true, false, false);
    } //清除深度缓冲

  }, {
    key: "clearDepth",
    value: function clearDepth() {
      this.clear(false, true, false);
    } //清除模版缓冲

  }, {
    key: "clearStencil",
    value: function clearStencil() {
      this.clear(false, false, true);
    }
  }, {
    key: "render",
    value: function render(scene, camera, forceClear) {
      if (!(camera && camera.isCamera)) {
        console.error('WebGLRenderer.render: camera is not an instance of Camera.');
        return;
      }

      _currentGeometryProgram = '';
      this._currentMaterialId = -1;
      this._currentCamera = null;
      if (this._isContextLost) return; // 更新场景

      if (scene.autoUpdate === true) scene.updateMatrixWorld(); //更新相机矩阵

      if (camera.parent === null) camera.updateMatrixWorld();

      this._projScreenMatrix.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse);

      this._frustum.setFromMatrix(this._projScreenMatrix); //初始化渲染队列


      this._currentRenderState = this._renderStates.get(scene, camera);

      this._currentRenderState.init();

      this._currentRenderList = this._renderLists.get(scene, camera);

      this._currentRenderList.init(); //将渲染的几何对象和材质存放到渲染队列中


      projectObject.call(this, scene, camera, this._sortObjects);

      if (this._sortObjects === true) {
        this._currentRenderList.sort();
      }

      this._currentRenderState.setupLights(camera);

      if (this._info.autoReset) this._info.reset();

      if (this.autoClear || forceClear) {
        scene.background === null ? this.setClearColor(this._currClearColor) : this.setClearColor(scene.background);
        this.clear(this.autoClearColor, this.autoClearDepth, this.autoClearStencil);
      }

      var opaqueObjects = this._currentRenderList.opaque;
      var transparentObjects = this._currentRenderList.transparent; // opaque pass (front-to-back order)

      if (opaqueObjects.length) renderObjects.call(this, opaqueObjects, scene, camera); // transparent pass (back-to-front order)

      if (transparentObjects.length) renderObjects.call(this, transparentObjects, scene, camera);

      this._state.buffers.depth.setTest(true);

      this._state.buffers.depth.setMask(true);

      this._state.buffers.color.setMask(true);

      this._state.setPolygonOffset(false);

      this._currentRenderList = null;
      this._currentRenderState = null;
    }
  }, {
    key: "renderBufferDirect",
    value: function renderBufferDirect(camera, fog, geometry, material, object, group) {
      var me = this;
      var _gl = this.gl;
      var frontFaceCW = object.isMesh && object.matrixWorld.determinant() < 0; //通过Materail设置 CULL_FACE  Blend clearColor ClearDepth

      this._state.setMaterial(material, frontFaceCW);

      var program = setProgram.call(me, camera, fog, material, object);
      var updateBuffers = isUpdateBuffers(geometry, program, material);
      var index = geometry.index;
      var position = geometry.attributes.position;
      var rangeFactor = 1;

      if (material.wireframe === true) {
        index = this._geometries.getWireframeAttribute(geometry);
        rangeFactor = 2;
      }

      var attribute;
      var renderer = this._bufferRenderer;

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

      var dataCount = Infinity;

      if (index !== null) {
        dataCount = index.count;
      } else if (position !== undefined) {
        dataCount = position.count;
      }

      var rangeStart = geometry.drawRange.start * rangeFactor;
      var rangeCount = geometry.drawRange.count * rangeFactor;
      var groupStart = group !== null ? group.start * rangeFactor : 0;
      var groupCount = group !== null ? group.count * rangeFactor : Infinity;
      var drawStart = Math.max(rangeStart, groupStart);
      var drawEnd = Math.min(dataCount, rangeStart + rangeCount, groupStart + groupCount) - 1;
      var drawCount = Math.max(0, drawEnd - drawStart + 1);
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
        var lineWidth = material.linewidth;
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
  }, {
    key: "allocTextureUnit",
    value: function allocTextureUnit() {
      var textureUnit = _usedTextureUnits;

      if (textureUnit >= this._capabilities.maxTextures) {
        console.warn('WebGLRenderer: Trying to use ' + textureUnit + ' texture units while this GPU supports only ' + capabilities.maxTextures);
      }

      _usedTextureUnits += 1;
      return textureUnit;
    }
  }, {
    key: "setTexture2D",
    value: function setTexture2D(texture, slot) {
      //todo Use in WebGLUniforms
      this._textures.setTexture2D(texture, slot);
    }
  }, {
    key: "setTextureCube",
    value: function setTextureCube() {//todo Use in WebGLUniforms
    }
  }, {
    key: "dispose",
    value: function dispose() {
      this.domElement.removeEventListener('webglcontextlost', this._onContextLostBind, false);
      this.domElement.removeEventListener('webglcontextrestored', this._onContextRestoreBind, false);
      this._onContextLostBind = null;
      this._onContextRestoreBind = null;

      this._renderLists.dispose();

      this._renderStates.dispose();

      this._properties.dispose();

      this._objects.dispose(); //vr.dispose();
      //stopAnimation();

    }
  }]);

  return WebGLRenderer;
}(Events); //判断是否更新了Buffer


var _currentGeometryProgram = '';

function isUpdateBuffers(geometry, program, material) {
  var geometryProgram = geometry.id + '_' + program.id + '_' + (material.wireframe === true);
  var updateBuffers = false;

  if (geometryProgram !== _currentGeometryProgram) {
    updateBuffers = true;
    _currentGeometryProgram = geometryProgram;
  }

  return updateBuffers;
} //将渲染的几何对象和材质存放到渲染队列中


function projectObject(object, camera, sortObjects) {
  if (object.visible === false) return;

  if (object.isLight) {
    this._currentRenderState.pushLight(object);
  } else if (object.isSprite) {
    if (!object.frustumCulled || this._frustum.intersectsSprite(object)) {
      if (sortObjects) {
        this._vector3.setFromMatrixPosition(object.matrixWorld).applyMatrix4(this._projScreenMatrix);
      }

      var geometry = this._objects.update(object);

      var material = object.material;

      this._currentRenderList.push(object, geometry, material, this._vector3.z, null);
    }
  } else if (object.isMesh || object.isLine || object.isPoints) {
    if (!object.frustumCulled || this._frustum.intersectsObject(object)) {
      if (sortObjects) {
        this._vector3.setFromMatrixPosition(object.matrixWorld).applyMatrix4(this._projScreenMatrix);
      } //创建好了attribute buffer


      var _geometry = this._objects.update(object);

      var _material = object.material; //如果是数组,表示geometry根据groups的分组进行分别绘制

      if (Array.isArray(_material)) {
        var groups = _geometry.groups;

        for (var i = 0, l = groups.length; i < l; i++) {
          var group = groups[i];
          var groupMaterial = _material[group.materialIndex];

          if (groupMaterial && groupMaterial.visible) {
            this._currentRenderList.push(object, _geometry, groupMaterial, this._vector3.z, group);
          }
        }
      } else if (_material.visible) {
        this._currentRenderList.push(object, _geometry, _material, this._vector3.z, null);
      }
    }
  }

  var children = object.children;

  for (var _i = 0, _l = children.length; _i < _l; _i++) {
    projectObject.call(this, children[_i], camera, sortObjects);
  }
}

function renderObjects(renderList, scene, camera) {
  for (var i = 0, l = renderList.length; i < l; i++) {
    var renderItem = renderList[i];
    var object = renderItem.object;
    var geometry = renderItem.geometry;
    var material = renderItem.material;
    var group = renderItem.group;
    renderObject.call(this, object, scene, camera, geometry, material, group);
  }
}

function renderObject(object, scene, camera, geometry, material, group) {
  object.onBeforeRender(this, scene, camera, geometry, material, group);
  this._currentRenderState = this._renderStates.get(scene, camera);
  object.modelViewMatrix.multiplyMatrices(camera.matrixWorldInverse, object.matrixWorld);
  object.normalMatrix.getNormalMatrix(object.modelViewMatrix);
  this.renderBufferDirect(camera, scene.fog, geometry, material, object, group);
  object.onAfterRender(this, scene, camera, geometry, material, group); // this._currentRenderState = renderStates.get( scene,  camera );
}

var _usedTextureUnits = 0; //当前纹理单元

function setProgram(camera, fog, material, object) {
  _usedTextureUnits = 0;

  var materialProperties = this._properties.get(material);

  var lights = this._currentRenderState.state.lights;

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

  var refreshProgram = false;
  var refreshMaterial = false;
  var refreshLights = false;
  var program = materialProperties.program,
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
    var updateLineMaterial = function updateLineMaterial() {
      m_uniforms.dashSize.value = material.dashSize;
      m_uniforms.totalSize.value = material.dashSize + material.gapSize;
      m_uniforms.scale.value = material.scale;
    };

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

    if (material.isMeshBasicMaterial || material.isLineBasicMaterial || material.isMeshLambertMaterial || material.isMeshPhongMaterial || material.isPointsMaterial || material.isLineMeshMaterial || material.isSpriteMaterial) {
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

    if (material.isLineBasicMaterial) {
      if (material.isLineDashedMaterial) {
        updateLineMaterial();
      }
    } else if (material.isMeshPhongMaterial) {
      m_uniforms.specular.value = material.specular;
      m_uniforms.shininess.value = Math.max(material.shininess, 1e-4); // to prevent pow( 0.0, 0.0 )
    } else if (material.isPointsMaterial) {
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
  } // common matrices


  p_uniforms.setValue('modelViewMatrix', object.modelViewMatrix);
  p_uniforms.setValue('normalMatrix', object.normalMatrix);
  p_uniforms.setValue('modelMatrix', object.matrixWorld);
  return program;
}

function initMaterial(material, fog, object) {
  var materialProperties = this._properties.get(material);

  var lights = this._currentRenderState.state.lights;

  var parameters = this._programCache.getParameters(material, lights.state);

  var code = this._programCache.getProgramCode(material, parameters);

  var program = materialProperties.program;
  var programChange = true;

  if (program === undefined) {
    // new material
    this._onMaterialDispose = onMaterialDispose.bind(this);
    material.on('dispose', this._onMaterialDispose);
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

    material.onBeforeCompile(materialProperties.shader, this); //WebGLProgram 对象

    program = this._programCache.acquireProgram(material, materialProperties.shader, parameters, code);
    materialProperties.program = program;
    material.program = program;
  }

  var programAttributes = program.getAttributes();
  var uniforms = materialProperties.shader.uniforms; // store the light setup it was created for

  materialProperties.lightsHash = lights.state.hash;

  if (material.lights) {
    // wire up the material to this renderer's lighting state
    uniforms.ambientLightColor.value = lights.state.ambient;
    uniforms.directionalLights.value = lights.state.directional;
    uniforms.spotLights.value = lights.state.spot;
    uniforms.pointLights.value = lights.state.point;
  }

  var progUniforms = materialProperties.program.getUniforms();
  var uniformsList = WebGLUniforms.seqWithValue(progUniforms.seq, uniforms);
  materialProperties.uniformsList = uniformsList;
}

function onMaterialDispose(event) {
  var material = event.target;
  material.off('dispose', this._onMaterialDispose);
  this._onMaterialDispose = null;
  deallocateMaterial.call(this, material);
} // Buffer deallocation


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

  var _gl = this.gl;
  var geometryAttributes = geometry.attributes;
  var programAttributes = program.getAttributes();
  var materialDefaultAttributeValues = material.defaultAttributeValues;

  for (var name in programAttributes) {
    var programAttribute = programAttributes[name];

    if (programAttribute >= 0) {
      var geometryAttribute = geometryAttributes[name];

      if (geometryAttribute !== undefined) {
        var normalized = geometryAttribute.normalized;
        var size = geometryAttribute.itemSize;

        var attribute = this._attributes.get(geometryAttribute); // TODO Attribute may not be available on context restore


        if (attribute === undefined) continue;
        var buffer = attribute.buffer;
        var type = attribute.type;
        var bytesPerElement = attribute.bytesPerElement;

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
} // If uniforms are marked as clean, they don't need to be loaded to the GPU.


function markUniformsLightsNeedsUpdate(uniforms, value) {
  uniforms.ambientLightColor.needsUpdate = value;
  uniforms.directionalLights.needsUpdate = value;
  uniforms.pointLights.needsUpdate = value;
  uniforms.spotLights.needsUpdate = value;
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
  this.fire({
    type: 'contextlost'
  });
}
/**
* @private
* @description 上下文恢复
*/


function onContextRestore() {
  console.log('WebGLRenderer: Context Restored.');
  this._isContextLost = true;

  this._initGLContext(parametersÎ);

  this.fire({
    type: 'contextrestore'
  });
}

var v1$3 = new Vector3();
var r;
var EPS = 0.000001;

var Quaternion = /*#__PURE__*/function () {
  function Quaternion(x, y, z, w) {
    _classCallCheck(this, Quaternion);

    this._x = x || 0;
    this._y = y || 0;
    this._z = z || 0;
    this._w = w !== undefined ? w : 1;
  }

  _createClass(Quaternion, [{
    key: "set",
    value: function set(x, y, z, w) {
      this._x = x;
      this._y = y;
      this._z = z;
      this._w = w;
      this.onChangeCallback();
      return this;
    }
  }, {
    key: "clone",
    value: function clone() {
      return new this.constructor(this._x, this._y, this._z, this._w);
    }
  }, {
    key: "copy",
    value: function copy(quaternion) {
      this._x = quaternion.x;
      this._y = quaternion.y;
      this._z = quaternion.z;
      this._w = quaternion.w;
      this.onChangeCallback();
      return this;
    }
  }, {
    key: "setFromEuler",
    value: function setFromEuler(euler, update) {
      if (!(euler && euler.isEuler)) {
        throw new Error('Quaternion: .setFromEuler() now expects an Euler rotation rather than a Vector3 and order.');
      }

      var x = euler._x,
          y = euler._y,
          z = euler._z,
          order = euler.order; // http://www.mathworks.com/matlabcentral/fileexchange/
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
  }, {
    key: "setFromAxisAngle",
    value: function setFromAxisAngle(axis, angle) {
      // http://www.euclideanspace.com/maths/geometry/rotations/conversions/angleToQuaternion/index.htm
      // assumes axis is normalized
      var halfAngle = angle / 2,
          s = Math.sin(halfAngle);
      this._x = axis.x * s;
      this._y = axis.y * s;
      this._z = axis.z * s;
      this._w = Math.cos(halfAngle);
      this.onChangeCallback();
      return this;
    }
  }, {
    key: "setFromRotationMatrix",
    value: function setFromRotationMatrix(m) {
      // http://www.euclideanspace.com/maths/geometry/rotations/conversions/matrixToQuaternion/index.htm
      // assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)
      var te = m.elements,
          m11 = te[0],
          m12 = te[4],
          m13 = te[8],
          m21 = te[1],
          m22 = te[5],
          m23 = te[9],
          m31 = te[2],
          m32 = te[6],
          m33 = te[10],
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
    } // assumes direction vectors vFrom and vTo are normalized

  }, {
    key: "setFromUnitVectors",
    value: function setFromUnitVectors(vFrom, vTo) {
      if (v1$3 === undefined) v1$3 = new Vector3();
      r = vFrom.dot(vTo) + 1;

      if (r < EPS) {
        r = 0;

        if (Math.abs(vFrom.x) > Math.abs(vFrom.z)) {
          v1$3.set(-vFrom.y, vFrom.x, 0);
        } else {
          v1$3.set(0, -vFrom.z, vFrom.y);
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
  }, {
    key: "inverse",
    value: function inverse() {
      return this.conjugate().normalize();
    }
  }, {
    key: "conjugate",
    value: function conjugate() {
      this._x *= -1;
      this._y *= -1;
      this._z *= -1;
      this.onChangeCallback();
      return this;
    }
  }, {
    key: "dot",
    value: function dot(v) {
      return this._x * v._x + this._y * v._y + this._z * v._z + this._w * v._w;
    }
  }, {
    key: "lengthSq",
    value: function lengthSq() {
      return this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w;
    }
  }, {
    key: "length",
    value: function length() {
      return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w);
    }
  }, {
    key: "normalize",
    value: function normalize() {
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
  }, {
    key: "multiply",
    value: function multiply(q, p) {
      if (p !== undefined) {
        console.warn('Quaternion: .multiply() now only accepts one argument. Use .multiplyQuaternions( a, b ) instead.');
        return this.multiplyQuaternions(q, p);
      }

      return this.multiplyQuaternions(this, q);
    }
  }, {
    key: "premultiply",
    value: function premultiply(q) {
      return this.multiplyQuaternions(q, this);
    }
  }, {
    key: "multiplyQuaternions",
    value: function multiplyQuaternions(a, b) {
      // from http://www.euclideanspace.com/maths/algebra/realNormedAlgebra/quaternions/code/index.htm
      var qax = a._x,
          qay = a._y,
          qaz = a._z,
          qaw = a._w;
      var qbx = b._x,
          qby = b._y,
          qbz = b._z,
          qbw = b._w;
      this._x = qax * qbw + qaw * qbx + qay * qbz - qaz * qby;
      this._y = qay * qbw + qaw * qby + qaz * qbx - qax * qbz;
      this._z = qaz * qbw + qaw * qbz + qax * qby - qay * qbx;
      this._w = qaw * qbw - qax * qbx - qay * qby - qaz * qbz;
      this.onChangeCallback();
      return this;
    }
  }, {
    key: "slerp",
    value: function slerp(qb, t) {
      if (t === 0) return this;
      if (t === 1) return this.copy(qb);
      var x = this._x,
          y = this._y,
          z = this._z,
          w = this._w; // http://www.euclideanspace.com/maths/algebra/realNormedAlgebra/quaternions/slerp/

      var cosHalfTheta = w * qb._w + x * qb._x + y * qb._y + z * qb._z;

      if (cosHalfTheta < 0) {
        this._w = -qb._w;
        this._x = -qb._x;
        this._y = -qb._y;
        this._z = -qb._z;
        cosHalfTheta = -cosHalfTheta;
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
      this._w = w * ratioA + this._w * ratioB;
      this._x = x * ratioA + this._x * ratioB;
      this._y = y * ratioA + this._y * ratioB;
      this._z = z * ratioA + this._z * ratioB;
      this.onChangeCallback();
      return this;
    }
  }, {
    key: "equals",
    value: function equals(quaternion) {
      return quaternion._x === this._x && quaternion._y === this._y && quaternion._z === this._z && quaternion._w === this._w;
    }
  }, {
    key: "fromArray",
    value: function fromArray(array, offset) {
      if (offset === undefined) offset = 0;
      this._x = array[offset];
      this._y = array[offset + 1];
      this._z = array[offset + 2];
      this._w = array[offset + 3];
      this.onChangeCallback();
      return this;
    }
  }, {
    key: "toArray",
    value: function toArray(array, offset) {
      if (array === undefined) array = [];
      if (offset === undefined) offset = 0;
      array[offset] = this._x;
      array[offset + 1] = this._y;
      array[offset + 2] = this._z;
      array[offset + 3] = this._w;
      return array;
    }
  }, {
    key: "onChange",
    value: function onChange(callback) {
      this.onChangeCallback = callback;
      return this;
    }
  }, {
    key: "onChangeCallback",
    value: function onChangeCallback() {}
  }, {
    key: "x",
    get: function get() {
      return this._x;
    },
    set: function set(value) {
      this._x = value;
      this.onChangeCallback();
    }
  }, {
    key: "y",
    get: function get() {
      return this._y;
    },
    set: function set(value) {
      this._y = value;
      this.onChangeCallback();
    }
  }, {
    key: "z",
    get: function get() {
      return this._z;
    },
    set: function set(value) {
      this._z = value;
      this.onChangeCallback();
    }
  }, {
    key: "w",
    get: function get() {
      return this._w;
    },
    set: function set(value) {
      this._w = value;
      this.onChangeCallback();
    }
  }]);

  return Quaternion;
}();

Quaternion.slerp = function (qa, qb, qm, t) {
  return qm.copy(qa).slerp(qb, t);
};

Quaternion.slerpFlat = function (dst, dstOffset, src0, srcOffset0, src1, srcOffset1, t) {
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
        dir = cos >= 0 ? 1 : -1,
        sqrSin = 1 - cos * cos; // Skip the Slerp for tiny steps to avoid numeric problems:

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
    w0 = w0 * s + w1 * tDir; // Normalize in case we just did a lerp:

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
};

var matrix = new Matrix4();
var q = new Quaternion();

var Euler = /*#__PURE__*/function () {
  function Euler(x, y, z, order) {
    _classCallCheck(this, Euler);

    this._x = x || 0;
    this._y = y || 0;
    this._z = z || 0;
    this._order = order || Euler.DefaultOrder;
    this.isEuler = true;
  }

  _createClass(Euler, [{
    key: "set",
    value: function set(x, y, z, order) {
      this._x = x;
      this._y = y;
      this._z = z;
      this._order = order || this._order;
      this.onChangeCallback();
      return this;
    }
  }, {
    key: "clone",
    value: function clone() {
      return new this.constructor(this._x, this._y, this._z, this._order);
    }
  }, {
    key: "copy",
    value: function copy(euler) {
      this._x = euler._x;
      this._y = euler._y;
      this._z = euler._z;
      this._order = euler._order;
      this.onChangeCallback();
      return this;
    }
  }, {
    key: "setFromRotationMatrix",
    value: function setFromRotationMatrix(m, order, update) {
      var clamp = _Math.clamp; // assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)

      var te = m.elements;
      var m11 = te[0],
          m12 = te[4],
          m13 = te[8];
      var m21 = te[1],
          m22 = te[5],
          m23 = te[9];
      var m31 = te[2],
          m32 = te[6],
          m33 = te[10];
      order = order || this._order;

      if (order === 'XYZ') {
        this._y = Math.asin(clamp(m13, -1, 1));

        if (Math.abs(m13) < 0.99999) {
          this._x = Math.atan2(-m23, m33);
          this._z = Math.atan2(-m12, m11);
        } else {
          this._x = Math.atan2(m32, m22);
          this._z = 0;
        }
      } else if (order === 'YXZ') {
        this._x = Math.asin(-clamp(m23, -1, 1));

        if (Math.abs(m23) < 0.99999) {
          this._y = Math.atan2(m13, m33);
          this._z = Math.atan2(m21, m22);
        } else {
          this._y = Math.atan2(-m31, m11);
          this._z = 0;
        }
      } else if (order === 'ZXY') {
        this._x = Math.asin(clamp(m32, -1, 1));

        if (Math.abs(m32) < 0.99999) {
          this._y = Math.atan2(-m31, m33);
          this._z = Math.atan2(-m12, m22);
        } else {
          this._y = 0;
          this._z = Math.atan2(m21, m11);
        }
      } else if (order === 'ZYX') {
        this._y = Math.asin(-clamp(m31, -1, 1));

        if (Math.abs(m31) < 0.99999) {
          this._x = Math.atan2(m32, m33);
          this._z = Math.atan2(m21, m11);
        } else {
          this._x = 0;
          this._z = Math.atan2(-m12, m22);
        }
      } else if (order === 'YZX') {
        this._z = Math.asin(clamp(m21, -1, 1));

        if (Math.abs(m21) < 0.99999) {
          this._x = Math.atan2(-m23, m22);
          this._y = Math.atan2(-m31, m11);
        } else {
          this._x = 0;
          this._y = Math.atan2(m13, m33);
        }
      } else if (order === 'XZY') {
        this._z = Math.asin(-clamp(m12, -1, 1));

        if (Math.abs(m12) < 0.99999) {
          this._x = Math.atan2(m32, m22);
          this._y = Math.atan2(m13, m11);
        } else {
          this._x = Math.atan2(-m23, m33);
          this._y = 0;
        }
      } else {
        console.warn('Euler: .setFromRotationMatrix() given unsupported order: ' + order);
      }

      this._order = order;
      if (update !== false) this.onChangeCallback();
      return this;
    }
  }, {
    key: "setFromQuaternion",
    value: function setFromQuaternion(q, order, update) {
      matrix.makeRotationFromQuaternion(q);
      return this.setFromRotationMatrix(matrix, order, update);
    }
  }, {
    key: "setFromVector3",
    value: function setFromVector3(v, order) {
      return this.set(v.x, v.y, v.z, order || this._order);
    } // WARNING: this discards revolution information -bhouston

  }, {
    key: "reorder",
    value: function reorder(newOrder) {
      q.setFromEuler(this);
      return this.setFromQuaternion(q, newOrder);
    }
  }, {
    key: "equals",
    value: function equals(euler) {
      return euler._x === this._x && euler._y === this._y && euler._z === this._z && euler._order === this._order;
    }
  }, {
    key: "fromArray",
    value: function fromArray(array) {
      this._x = array[0];
      this._y = array[1];
      this._z = array[2];
      if (array[3] !== undefined) this._order = array[3];
      this.onChangeCallback();
      return this;
    }
  }, {
    key: "toArray",
    value: function toArray(array, offset) {
      if (array === undefined) array = [];
      if (offset === undefined) offset = 0;
      array[offset] = this._x;
      array[offset + 1] = this._y;
      array[offset + 2] = this._z;
      array[offset + 3] = this._order;
      return array;
    }
  }, {
    key: "toVector3",
    value: function toVector3(optionalResult) {
      if (optionalResult) {
        return optionalResult.set(this._x, this._y, this._z);
      } else {
        return new Vector3(this._x, this._y, this._z);
      }
    }
  }, {
    key: "onChange",
    value: function onChange(callback) {
      this.onChangeCallback = callback;
      return this;
    }
  }, {
    key: "onChangeCallback",
    value: function onChangeCallback() {}
  }, {
    key: "x",
    get: function get() {
      return this._x;
    },
    set: function set(value) {
      this._x = value;
      this.onChangeCallback();
    }
  }, {
    key: "y",
    get: function get() {
      return this._y;
    },
    set: function set(value) {
      this._y = value;
      this.onChangeCallback();
    }
  }, {
    key: "z",
    get: function get() {
      return this._z;
    },
    set: function set(value) {
      this._z = value;
      this.onChangeCallback();
    }
  }, {
    key: "order",
    get: function get() {
      return this._order;
    },
    set: function set(value) {
      this._order = value;
      this.onChangeCallback();
    }
  }]);

  return Euler;
}();

Euler.RotationOrders = ['XYZ', 'YZX', 'ZXY', 'XZY', 'YXZ', 'ZYX'];
Euler.DefaultOrder = 'XYZ';

/**
 * @class Object3D 三维对象的基类
 * @description 实现三维对象的的一些基本操作
 * @author bujue
 */

var object3DId = 0;

var Object3D = /*#__PURE__*/function (_Events) {
  _inherits(Object3D, _Events);

  var _super = _createSuper(Object3D);

  function Object3D() {
    var _this;

    _classCallCheck(this, Object3D);

    _this = _super.call(this);
    Object.defineProperty(_assertThisInitialized(_this), 'id', {
      value: object3DId++
    });
    _this.parent = null;
    _this.children = [];
    _this.up = Object3D.DefaultUp.clone();
    var position = new Vector3();
    var rotation = new Euler();
    var quaternion = new Quaternion();
    var scale = new Vector3(1, 1, 1);

    function onRotationChange() {
      quaternion.setFromEuler(rotation, false);
    }

    function onQuaternionChange() {
      rotation.setFromQuaternion(quaternion, undefined, false);
    }

    rotation.onChange(onRotationChange);
    quaternion.onChange(onQuaternionChange);
    Object.defineProperties(_assertThisInitialized(_this), {
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
    _this.matrix = new Matrix4();
    _this.matrixWorld = new Matrix4();
    _this.matrixAutoUpdate = Object3D.DefaultMatrixAutoUpdate;
    _this.matrixWorldNeedsUpdate = false;
    _this.visible = true;
    _this.castShadow = false;
    _this.receiveShadow = false;
    _this.frustumCulled = true;
    _this.renderOrder = 0;
    _this.userData = {};
    return _this;
  }

  _createClass(Object3D, [{
    key: "onBeforeRender",
    value: function onBeforeRender(renderer, scene, camera, geometry, material, group) {//继承实现 渲染前调用
    }
  }, {
    key: "onAfterRender",
    value: function onAfterRender(renderer, scene, camera, geometry, material, group) {//继承实现 渲染后调用
    }
  }, {
    key: "applyMatrix",
    value: function applyMatrix(matrix) {
      this.matrix.multiplyMatrices(matrix, this.matrix);
      this.matrix.decompose(this.position, this.quaternion, this.scale);
    }
  }, {
    key: "lookAt",
    value: function lookAt(x, y, z) {
      _lookAt.call(this, x, y, z);
    }
  }, {
    key: "add",
    value: function add(object) {
      if (arguments.length > 1) {
        for (var i = 0; i < arguments.length; i++) {
          this.add(arguments[i]);
        }

        return this;
      }

      if (object === this) {
        console.error("Object3D.add: object can't be added as a child of itself.", object);
        return this;
      }

      if (object && object.isObject3D) {
        if (object.parent !== null) {
          object.parent.remove(object);
        }

        object.parent = this;
        object.fire({
          type: 'added'
        });
        this.children.push(object);
      } else {
        console.error("Object3D.add: object not an instance of Object3D.", object);
      }

      return this;
    }
  }, {
    key: "remove",
    value: function remove(object) {
      if (arguments.length > 1) {
        for (var i = 0; i < arguments.length; i++) {
          this.remove(arguments[i]);
        }

        return this;
      }

      var index = this.children.indexOf(object);

      if (index !== -1) {
        object.parent = null;
        object.fire({
          type: 'removed'
        });
        this.children.splice(index, 1);
      }

      return this;
    }
  }, {
    key: "traverse",
    value: function traverse(callback) {
      callback(this);
      var children = this.children;

      for (var i = 0, l = children.length; i < l; i++) {
        children[i].traverse(callback);
      }
    }
  }, {
    key: "updateMatrixWorld",
    value: function updateMatrixWorld(force) {
      if (this.matrixAutoUpdate) this.updateMatrix();

      if (this.matrixWorldNeedsUpdate || force) {
        if (this.parent === null) {
          this.matrixWorld.copy(this.matrix);
        } else {
          this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix);
        }

        this.matrixWorldNeedsUpdate = false;
        force = true;
      } // update children


      var children = this.children;

      for (var i = 0, l = children.length; i < l; i++) {
        children[i].updateMatrixWorld(force);
      }
    }
  }, {
    key: "applyQuaternion",
    value: function applyQuaternion(q) {
      this.quaternion.premultiply(q);
      return this;
    }
  }, {
    key: "setRotationFromAxisAngle",
    value: function setRotationFromAxisAngle(axis, angle) {
      // assumes axis is normalized
      this.quaternion.setFromAxisAngle(axis, angle);
    }
  }, {
    key: "setRotationFromEuler",
    value: function setRotationFromEuler(euler) {
      this.quaternion.setFromEuler(euler, true);
    }
  }, {
    key: "setRotationFromMatrix",
    value: function setRotationFromMatrix(m) {
      // assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)
      this.quaternion.setFromRotationMatrix(m);
    }
  }, {
    key: "setRotationFromQuaternion",
    value: function setRotationFromQuaternion(q) {
      // assumes q is normalized
      this.quaternion.copy(q);
    }
  }, {
    key: "updateMatrix",
    value: function updateMatrix() {
      this.matrix.compose(this.position, this.quaternion, this.scale);
      this.matrixWorldNeedsUpdate = true;
    }
  }, {
    key: "rotateX",
    value: function rotateX(angle) {
      var v1 = new Vector3(1, 0, 0);
      this.rotateOnAxis(v1, angle);
      v1 = null;
      return this;
    }
  }, {
    key: "rotateY",
    value: function rotateY(angle) {
      var v1 = new Vector3(0, 1, 0);
      this.rotateOnAxis(v1, angle);
      v1 = null;
      return this;
    }
  }, {
    key: "rotateZ",
    value: function rotateZ(angle) {
      var v1 = new Vector3(0, 0, 1);
      this.rotateOnAxis(v1, angle);
      v1 = null;
      return this;
    }
  }, {
    key: "rotateOnAxis",
    value: function rotateOnAxis(axis, angle) {
      // rotate object on axis in object space
      // axis is assumed to be normalized
      var q1 = new Quaternion();
      q1.setFromAxisAngle(axis, angle);
      this.quaternion.multiply(q1);
      q1 = null;
      return this;
    }
  }, {
    key: "rotateOnWorldAxis",
    value: function rotateOnWorldAxis(axis, angle) {
      // rotate object on axis in world space
      // axis is assumed to be normalized
      // method assumes no rotated parent
      var q1 = new Quaternion();
      q1.setFromAxisAngle(axis, angle);
      this.quaternion.premultiply(q1);
      return this;
    }
  }, {
    key: "translateOnAxis",
    value: function translateOnAxis(axis, distance) {
      // translate object by distance along axis in object space
      // axis is assumed to be normalized
      var v1 = new Vector3();
      v1.copy(axis).applyQuaternion(this.quaternion);
      this.position.add(v1.multiplyScalar(distance));
      v1 = null;
      return this;
    }
  }, {
    key: "translateX",
    value: function translateX(distance) {
      var v1 = new Vector3(1, 0, 0);
      this.translateOnAxis(v1, distance);
      v1 = null;
      return this;
    }
  }, {
    key: "translateY",
    value: function translateY(distance) {
      var v1 = new Vector3(0, 1, 0);
      this.translateOnAxis(v1, distance);
      v1 = null;
      return this;
    }
  }, {
    key: "translateZ",
    value: function translateZ(distance) {
      var v1 = new Vector3(0, 0, 1);
      this.translateOnAxis(v1, distance);
      v1 = null;
      return this;
    }
  }, {
    key: "localToWorld",
    value: function localToWorld(vector) {
      return vector.applyMatrix4(this.matrixWorld);
    }
  }, {
    key: "worldToLocal",
    value: function worldToLocal(vector) {
      var m1 = new Matrix4();
      return vector.applyMatrix4(m1.getInverse(this.matrixWorld));
    }
  }, {
    key: "getWorldPosition",
    value: function getWorldPosition(target) {
      if (target === undefined) {
        console.warn('Object3D: .getWorldPosition() target is now required');
        target = new Vector3();
      }

      this.updateMatrixWorld(true);
      return target.setFromMatrixPosition(this.matrixWorld);
    }
  }, {
    key: "getWorldQuaternion",
    value: function getWorldQuaternion(target) {
      return _getWorldQuaternion.call(this, target);
    }
  }, {
    key: "getWorldScale",
    value: function getWorldScale(target) {
      return _getWorldScale.call(this, target);
    }
  }, {
    key: "getWorldDirection",
    value: function getWorldDirection(target) {
      return _getWorldDirection.call(this, target);
    }
  }, {
    key: "raycast",
    value: function raycast() {}
  }, {
    key: "isObject3D",
    get: function get() {
      return true;
    }
  }]);

  return Object3D;
}(Events);

Object3D.DefaultUp = new Vector3(0, 1, 0);
Object3D.DefaultMatrixAutoUpdate = true;

var _lookAt = function () {
  // This method does not support objects with rotated and/or translated parent(s)
  var m1 = new Matrix4();
  var vector = new Vector3();
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

var _getWorldQuaternion = function () {
  var position = new Vector3();
  var scale = new Vector3();
  return function getWorldQuaternion(target) {
    if (target === undefined) {
      console.warn('Object3D: .getWorldQuaternion() target is now required');
      target = new Quaternion();
    }

    this.updateMatrixWorld(true);
    this.matrixWorld.decompose(position, target, scale);
    return target;
  };
}();

var _getWorldScale = function () {
  var position = new Vector3();
  var quaternion = new Quaternion();
  return function getWorldScale(target) {
    if (target === undefined) {
      console.warn('Object3D: .getWorldScale() target is now required');
      target = new Vector3();
    }

    this.updateMatrixWorld(true);
    this.matrixWorld.decompose(position, quaternion, target);
    return target;
  };
}();

var _getWorldDirection = function () {
  var quaternion = new Quaternion();
  return function getWorldDirection(target) {
    if (target === undefined) {
      console.warn('Object3D: .getWorldDirection() target is now required');
      target = new Vector3();
    }

    this.getWorldQuaternion(quaternion);
    return target.set(0, 0, 1).applyQuaternion(quaternion);
  };
}();

/**
 * @class 场景对象
 * @author bujue
 */

var Scene = /*#__PURE__*/function (_Object3D) {
  _inherits(Scene, _Object3D);

  var _super = _createSuper(Scene);

  function Scene() {
    var _this;

    _classCallCheck(this, Scene);

    _this = _super.call(this);
    _this.background = null;
    _this.isScene = true;
    _this.autoUpdate = true; // checked by the renderer

    return _this;
  }

  return Scene;
}(Object3D);

/**
 * @class  分组
 * @description 主要是为了将部分对象做批量变换,同Sence,名称上更容易让读者理解
 * @author bujue
 */

var Group = /*#__PURE__*/function (_Object3D) {
  _inherits(Group, _Object3D);

  var _super = _createSuper(Group);

  function Group() {
    var _this;

    _classCallCheck(this, Group);

    _this = _super.call(this);
    _this.type = 'Group';
    return _this;
  }

  _createClass(Group, [{
    key: "isGroup",
    get: function get() {
      return true;
    }
  }]);

  return Group;
}(Object3D);

var v = new Vector3();
var v1$4 = new Vector3();
var v2$2 = new Vector3();
var v3$1 = new Vector3();
var segCenter = new Vector3();
var segDir = new Vector3();
var diff = new Vector3();
var diff = new Vector3();
var edge1 = new Vector3();
var edge2 = new Vector3();
var normal = new Vector3();

var Ray = /*#__PURE__*/function () {
  function Ray(origin, direction) {
    _classCallCheck(this, Ray);

    this.origin = origin !== undefined ? origin : new Vector3();
    this.direction = direction !== undefined ? direction : new Vector3();
  }

  _createClass(Ray, [{
    key: "set",
    value: function set(origin, direction) {
      this.origin.copy(origin);
      this.direction.copy(direction);
      return this;
    }
  }, {
    key: "clone",
    value: function clone() {
      return new this.constructor().copy(this);
    }
  }, {
    key: "copy",
    value: function copy(ray) {
      this.origin.copy(ray.origin);
      this.direction.copy(ray.direction);
      return this;
    }
  }, {
    key: "at",
    value: function at(t, optionalTarget) {
      var result = optionalTarget || new Vector3();
      return result.copy(this.direction).multiplyScalar(t).add(this.origin);
    }
  }, {
    key: "lookAt",
    value: function lookAt(v) {
      this.direction.copy(v).sub(this.origin).normalize();
      return this;
    }
  }, {
    key: "recast",
    value: function recast(t) {
      this.origin.copy(this.at(t, v1$4));
      return this;
    }
  }, {
    key: "closestPointToPoint",
    value: function closestPointToPoint(point, optionalTarget) {
      var result = optionalTarget || new Vector3();
      result.subVectors(point, this.origin);
      var directionDistance = result.dot(this.direction);

      if (directionDistance < 0) {
        return result.copy(this.origin);
      }

      return result.copy(this.direction).multiplyScalar(directionDistance).add(this.origin);
    }
  }, {
    key: "distanceToPoint",
    value: function distanceToPoint(point) {
      return Math.sqrt(this.distanceSqToPoint(point));
    }
  }, {
    key: "distanceSqToPoint",
    value: function distanceSqToPoint(point) {
      var directionDistance = v2$2.subVectors(point, this.origin).dot(this.direction); // point behind the ray

      if (directionDistance < 0) {
        return this.origin.distanceToSquared(point);
      }

      v2$2.copy(this.direction).multiplyScalar(directionDistance).add(this.origin);
      return v2$2.distanceToSquared(point);
    }
  }, {
    key: "distanceSqToSegment",
    value: function distanceSqToSegment(v0, v1, optionalPointOnRay, optionalPointOnSegment) {
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
  }, {
    key: "intersectSphere",
    value: function intersectSphere(sphere, optionalTarget) {
      v3$1.subVectors(sphere.center, this.origin);
      var tca = v3$1.dot(this.direction);
      var d2 = v3$1.dot(v3$1) - tca * tca;
      var radius2 = sphere.radius * sphere.radius;
      if (d2 > radius2) return null;
      var thc = Math.sqrt(radius2 - d2); // t0 = first intersect point - entrance on front of sphere

      var t0 = tca - thc; // t1 = second intersect point - exit point on back of sphere

      var t1 = tca + thc; // test to see if both t0 and t1 are behind the ray - if so, return null

      if (t0 < 0 && t1 < 0) return null; // test to see if t0 is behind the ray:
      // if it is, the ray is inside the sphere, so return the second exit point scaled by t1,
      // in order to always return an intersect point that is in front of the ray.

      if (t0 < 0) return this.at(t1, optionalTarget); // else t0 is in front of the ray, so return the first collision point scaled by t0

      return this.at(t0, optionalTarget);
    }
  }, {
    key: "intersectsSphere",
    value: function intersectsSphere(sphere) {
      return this.distanceToPoint(sphere.center) <= sphere.radius;
    }
  }, {
    key: "distanceToPlane",
    value: function distanceToPlane(plane) {
      var denominator = plane.normal.dot(this.direction);

      if (denominator === 0) {
        // line is coplanar, return origin
        if (plane.distanceToPoint(this.origin) === 0) {
          return 0;
        } // Null is preferable to undefined since undefined means.... it is undefined


        return null;
      }

      var t = -(this.origin.dot(plane.normal) + plane.constant) / denominator; // Return if the ray never intersects the plane

      return t >= 0 ? t : null;
    }
  }, {
    key: "intersectPlane",
    value: function intersectPlane(plane, optionalTarget) {
      var t = this.distanceToPlane(plane);

      if (t === null) {
        return null;
      }

      return this.at(t, optionalTarget);
    }
  }, {
    key: "intersectsPlane",
    value: function intersectsPlane(plane) {
      // check if the ray lies on the plane first
      var distToPoint = plane.distanceToPoint(this.origin);

      if (distToPoint === 0) {
        return true;
      }

      var denominator = plane.normal.dot(this.direction);

      if (denominator * distToPoint < 0) {
        return true;
      } // ray origin is behind the plane (and is pointing behind it)


      return false;
    }
  }, {
    key: "intersectBox",
    value: function intersectBox(box, optionalTarget) {
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

      if (tmin > tymax || tymin > tmax) return null; // These lines also handle the case where tmin or tmax is NaN
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
      if (tzmax < tmax || tmax !== tmax) tmax = tzmax; //return point closest to the ray (positive side)

      if (tmax < 0) return null;
      return this.at(tmin >= 0 ? tmin : tmax, optionalTarget);
    }
  }, {
    key: "intersectsBox",
    value: function intersectsBox(box) {
      return this.intersectBox(box, v) !== null;
    } // Compute the offset origin, edges, and normal.

  }, {
    key: "intersectTriangle",
    value: function intersectTriangle(a, b, c, backfaceCulling, optionalTarget) {
      // from http://www.geometrictools.com/GTEngine/Include/Mathematics/GteIntrRay3Triangle3.h
      edge1.subVectors(b, a);
      edge2.subVectors(c, a);
      normal.crossVectors(edge1, edge2); // Solve Q + t*D = b1*E1 + b2*E2 (Q = kDiff, D = ray direction,
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
      var DdQxE2 = sign * this.direction.dot(edge2.crossVectors(diff, edge2)); // b1 < 0, no intersection

      if (DdQxE2 < 0) {
        return null;
      }

      var DdE1xQ = sign * this.direction.dot(edge1.cross(diff)); // b2 < 0, no intersection

      if (DdE1xQ < 0) {
        return null;
      } // b1+b2 > 1, no intersection


      if (DdQxE2 + DdE1xQ > DdN) {
        return null;
      } // Line intersects triangle, check if ray does.


      var QdN = -sign * diff.dot(normal); // t < 0, no intersection

      if (QdN < 0) {
        return null;
      } // Ray intersects triangle.


      return this.at(QdN / DdN, optionalTarget);
    }
  }, {
    key: "applyMatrix4",
    value: function applyMatrix4(matrix4) {
      this.origin.applyMatrix4(matrix4);
      this.direction.transformDirection(matrix4);
      return this;
    }
  }, {
    key: "equals",
    value: function equals(ray) {
      return ray.origin.equals(this.origin) && ray.direction.equals(this.direction);
    }
  }]);

  return Ray;
}();

var startP = new Vector3();
var startEnd = new Vector3();

var Line3 = /*#__PURE__*/function () {
  function Line3(start, end) {
    _classCallCheck(this, Line3);

    this.start = start !== undefined ? start : new Vector3();
    this.end = end !== undefined ? end : new Vector3();
  }

  _createClass(Line3, [{
    key: "set",
    value: function set(start, end) {
      this.start.copy(start);
      this.end.copy(end);
      return this;
    }
  }, {
    key: "clone",
    value: function clone() {
      return new this.constructor().copy(this);
    }
  }, {
    key: "copy",
    value: function copy(line) {
      this.start.copy(line.start);
      this.end.copy(line.end);
      return this;
    }
  }, {
    key: "getCenter",
    value: function getCenter(optionalTarget) {
      var result = optionalTarget || new Vector3();
      return result.addVectors(this.start, this.end).multiplyScalar(0.5);
    }
  }, {
    key: "delta",
    value: function delta(optionalTarget) {
      var result = optionalTarget || new Vector3();
      return result.subVectors(this.end, this.start);
    }
  }, {
    key: "distanceSq",
    value: function distanceSq() {
      return this.start.distanceToSquared(this.end);
    }
  }, {
    key: "distance",
    value: function distance() {
      return this.start.distanceTo(this.end);
    }
  }, {
    key: "at",
    value: function at(t, optionalTarget) {
      var result = optionalTarget || new Vector3();
      return this.delta(result).multiplyScalar(t).add(this.start);
    }
  }, {
    key: "closestPointToPointParameter",
    value: function closestPointToPointParameter(point, clampToLine) {
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
  }, {
    key: "closestPointToPoint",
    value: function closestPointToPoint(point, clampToLine, optionalTarget) {
      var t = this.closestPointToPointParameter(point, clampToLine);
      var result = optionalTarget || new Vector3();
      return this.delta(result).multiplyScalar(t).add(this.start);
    }
  }, {
    key: "applyMatrix4",
    value: function applyMatrix4(matrix) {
      this.start.applyMatrix4(matrix);
      this.end.applyMatrix4(matrix);
      return this;
    }
  }, {
    key: "equals",
    value: function equals(line) {
      return line.start.equals(this.start) && line.end.equals(this.end);
    }
  }]);

  return Line3;
}();

var v$1 = new Vector3();
var v0 = new Vector3();
var v1$5 = new Vector3();
var v2$3 = new Vector3();
var v4$1 = new Vector3();
var v5 = new Vector3();
var v6 = new Vector3();
var plane = new Plane();
var edgeList = [new Line3(), new Line3(), new Line3()];
var projectedPoint = new Vector3();
var closestPoint = new Vector3();

var Triangle = /*#__PURE__*/function () {
  function Triangle(a, b, c) {
    _classCallCheck(this, Triangle);

    this.a = a !== undefined ? a : new Vector3();
    this.b = b !== undefined ? b : new Vector3();
    this.c = c !== undefined ? c : new Vector3();
  }

  _createClass(Triangle, [{
    key: "set",
    value: function set(a, b, c) {
      this.a.copy(a);
      this.b.copy(b);
      this.c.copy(c);
      return this;
    }
  }, {
    key: "setFromPointsAndIndices",
    value: function setFromPointsAndIndices(points, i0, i1, i2) {
      this.a.copy(points[i0]);
      this.b.copy(points[i1]);
      this.c.copy(points[i2]);
      return this;
    }
  }, {
    key: "clone",
    value: function clone() {
      return new this.constructor().copy(this);
    }
  }, {
    key: "copy",
    value: function copy(triangle) {
      this.a.copy(triangle.a);
      this.b.copy(triangle.b);
      this.c.copy(triangle.c);
      return this;
    } // based on: http://www.blackpawn.com/texts/pointinpoly/default.html

  }, {
    key: "area",
    value: function area() {
      v5.subVectors(this.c, this.b);
      v6.subVectors(this.a, this.b);
      return v5.cross(v6).length() * 0.5;
    }
  }, {
    key: "midpoint",
    value: function midpoint(optionalTarget) {
      var result = optionalTarget || new Vector3();
      return result.addVectors(this.a, this.b).add(this.c).multiplyScalar(1 / 3);
    }
  }, {
    key: "normal",
    value: function normal(optionalTarget) {
      return Triangle.normal(this.a, this.b, this.c, optionalTarget);
    }
  }, {
    key: "plane",
    value: function plane(optionalTarget) {
      var result = optionalTarget || new Plane();
      return result.setFromCoplanarPoints(this.a, this.b, this.c);
    }
  }, {
    key: "barycoordFromPoint",
    value: function barycoordFromPoint(point, optionalTarget) {
      return Triangle.barycoordFromPoint(point, this.a, this.b, this.c, optionalTarget);
    }
  }, {
    key: "containsPoint",
    value: function containsPoint(point) {
      return Triangle.containsPoint(point, this.a, this.b, this.c);
    }
  }, {
    key: "closestPointToPoint",
    value: function closestPointToPoint(point, optionalTarget) {
      var result = optionalTarget || new Vector3();
      var minDistance = Infinity; // project the point onto the plane of the triangle

      plane.setFromCoplanarPoints(this.a, this.b, this.c);
      plane.projectPoint(point, projectedPoint); // check if the projection lies within the triangle

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
  }, {
    key: "equals",
    value: function equals(triangle) {
      return triangle.a.equals(this.a) && triangle.b.equals(this.b) && triangle.c.equals(this.c);
    }
  }]);

  return Triangle;
}();

var getUV = function () {
  var barycoord = new Vector3();
  return function getUV(point, p1, p2, p3, uv1, uv2, uv3, target) {
    this.getBarycoord(point, p1, p2, p3, barycoord);
    target.set(0, 0);
    target.addScaledVector(uv1, barycoord.x);
    target.addScaledVector(uv2, barycoord.y);
    target.addScaledVector(uv3, barycoord.z);
    return target;
  };
}();

var getBarycoord = function () {
  var v0 = new Vector3();
  var v1 = new Vector3();
  var v2 = new Vector3();
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
      target = new Vector3();
    } // collinear or singular triangle


    if (denom === 0) {
      // arbitrary location outside of triangle?
      // not sure if this is the best idea, maybe should be returning undefined
      return target.set(-2, -1, -1);
    }

    var invDenom = 1 / denom;
    var u = (dot11 * dot02 - dot01 * dot12) * invDenom;
    var v = (dot00 * dot12 - dot01 * dot02) * invDenom; // barycentric coordinates must always sum to 1

    return target.set(1 - u - v, v, u);
  };
}();

Triangle.getUV = function (point, p1, p2, p3, uv1, uv2, uv3, target) {
  return getUV.call(Triangle, point, p1, p2, p3, uv1, uv2, uv3, target);
};

Triangle.getBarycoord = function (point, a, b, c, target) {
  return getBarycoord.call(Triangle, point, a, b, c, target);
};

Triangle.normal = function (a, b, c, optionalTarget) {
  var result = optionalTarget || new Vector3();
  result.subVectors(c, b);
  v$1.subVectors(a, b);
  result.cross(v$1);
  var resultLengthSq = result.lengthSq();

  if (resultLengthSq > 0) {
    return result.multiplyScalar(1 / Math.sqrt(resultLengthSq));
  }

  return result.set(0, 0, 0);
};

Triangle.getNormal = function (a, b, c, target) {
  return getNormal.call(Triangle, a, b, c, target);
}; // based on: http://www.blackpawn.com/texts/pointinpoly/default.html


Triangle.barycoordFromPoint = function (point, a, b, c, optionalTarget) {
  v0.subVectors(c, a);
  v1$5.subVectors(b, a);
  v2$3.subVectors(point, a);
  var dot00 = v0.dot(v0);
  var dot01 = v0.dot(v1$5);
  var dot02 = v0.dot(v2$3);
  var dot11 = v1$5.dot(v1$5);
  var dot12 = v1$5.dot(v2$3);
  var denom = dot00 * dot11 - dot01 * dot01;
  var result = optionalTarget || new Vector3(); // collinear or singular triangle

  if (denom === 0) {
    // arbitrary location outside of triangle?
    // not sure if this is the best idea, maybe should be returning undefined
    return result.set(-2, -1, -1);
  }

  var invDenom = 1 / denom;
  var u = (dot11 * dot02 - dot01 * dot12) * invDenom;
  var v = (dot00 * dot12 - dot01 * dot02) * invDenom; // barycentric coordinates must always sum to 1

  return result.set(1 - u - v, v, u);
};

Triangle.containsPoint = function (point, a, b, c) {
  var result = Triangle.barycoordFromPoint(point, a, b, c, v4$1);
  return result.x >= 0 && result.y >= 0 && result.x + result.y <= 1;
};

var getNormal = function () {
  var v0 = new Vector3();
  return function getNormal(a, b, c, target) {
    if (target === undefined) {
      console.warn('THREE.Triangle: .getNormal() target is now required');
      target = new Vector3();
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

var Face3 = /*#__PURE__*/function () {
  function Face3(a, b, c, normal, color, materialIndex) {
    _classCallCheck(this, Face3);

    this.a = a;
    this.b = b;
    this.c = c;
    this.normal = normal && normal.isVector3 ? normal : new Vector3();
    this.vertexNormals = Array.isArray(normal) ? normal : [];
    this.color = color && color.isColor ? color : new Color$1();
    this.vertexColors = Array.isArray(color) ? color : [];
    this.materialIndex = materialIndex !== undefined ? materialIndex : 0;
  }

  _createClass(Face3, [{
    key: "clone",
    value: function clone() {
      return new this.constructor().copy(this);
    }
  }, {
    key: "copy",
    value: function copy(source) {
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
  }]);

  return Face3;
}();

/**
 * @class  材质基类
 * @author bujue
 */

var materialId = 0;

var Material = /*#__PURE__*/function (_Events) {
  _inherits(Material, _Events);

  var _super = _createSuper(Material);

  function Material() {
    var _this;

    _classCallCheck(this, Material);

    _this = _super.call(this);
    _this.type = 'Material';
    Object.defineProperty(_assertThisInitialized(_this), 'id', {
      value: materialId++
    });
    _this.opacity = 1;
    _this.transparent = false;
    _this.lights = true;
    _this.depthFunc = LessEqualDepth;
    _this.depthTest = true;
    _this.depthWrite = true;
    _this.blending = NormalBlending;
    _this.side = FrontSide;
    _this.vertexColors = NoColors;
    _this.visible = true;
    _this.needsUpdate = true;
    _this.colorWrite = true;
    _this.precision = null;
    _this.polygonOffset = false;
    _this.polygonOffsetFactor = 0;
    _this.polygonOffsetUnits = 0;
    _this.blendSrc = SrcAlphaFactor;
    _this.blendDst = OneMinusSrcAlphaFactor;
    _this.blendEquation = AddEquation;
    _this.blendSrcAlpha = null;
    _this.blendDstAlpha = null;
    _this.blendEquationAlpha = null;
    _this.premultipliedAlpha = false;
    _this.userData = {};

    _this.onBeforeCompile = function () {};

    return _this;
  }

  _createClass(Material, [{
    key: "setValues",
    value: function setValues(values) {
      if (values === undefined) return;

      for (var key in values) {
        var newValue = values[key];

        if (newValue === undefined) {
          console.warn("Material: '" + key + "' parameter is undefined.");
          continue;
        } // for backward compatability if shading is set in the constructor
        // if (key === 'shading') {
        //     console.warn(this.type + ': .shading has been removed. Use the boolean .flatShading instead.');
        //     this.flatShading = (newValue === FlatShading) ? true : false;
        //     continue;
        // }


        var currentValue = this[key];

        if (currentValue === undefined) {
          console.warn(this.type + ": '" + key + "' is not a property of this material.");
          continue;
        }

        if (currentValue && currentValue.isColor) {
          currentValue.set(newValue);
        } else if (currentValue && currentValue.isVector3 && newValue && newValue.isVector3) {
          currentValue.copy(newValue);
        } else if (key === 'overdraw') {
          // ensure overdraw is backwards-compatible with legacy boolean type
          this[key] = Number(newValue);
        } else {
          this[key] = newValue;
        }
      }
    }
  }, {
    key: "clone",
    value: function clone() {
      return new this.constructor().copy(this);
    }
  }, {
    key: "copy",
    value: function copy(source) {
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
  }, {
    key: "dispose",
    value: function dispose() {
      this.fire({
        type: 'dispose'
      });
    }
  }, {
    key: "isMaterial",
    get: function get() {
      return true;
    }
  }]);

  return Material;
}(Events);

var MeshBasicMaterial$$1 = /*#__PURE__*/function (_Material) {
  _inherits(MeshBasicMaterial$$1, _Material);

  var _super = _createSuper(MeshBasicMaterial$$1);

  function MeshBasicMaterial$$1(parameters) {
    var _this;

    _classCallCheck(this, MeshBasicMaterial$$1);

    _this = _super.call(this);
    _this.color = new Color$1(0xffffff); // emissive

    _this.map = null;
    _this.type = 'MeshBasicMaterial';
    _this.wireframe = false;
    _this.wireframeLinewidth = 1; //不接受灯光

    _this.lights = false;

    _this.setValues(parameters);

    return _this;
  }

  _createClass(MeshBasicMaterial$$1, [{
    key: "copy",
    value: function copy(source) {
      _get(_getPrototypeOf(MeshBasicMaterial$$1.prototype), "copy", this).call(this, source);

      this.color.copy(source.color);
      this.map = source.map;
      this.wireframe = source.wireframe;
      return this;
    }
  }, {
    key: "isMeshBasicMaterial",
    get: function get$$1() {
      return true;
    }
  }]);

  return MeshBasicMaterial$$1;
}(Material);

/**
 * @class Mesh 渲染网格对象
 * @description 渲染的网格对象,包括geometry material
 * @author bujue
 */

var Mesh = /*#__PURE__*/function (_Object3D) {
  _inherits(Mesh, _Object3D);

  var _super = _createSuper(Mesh);

  function Mesh(geometry, material) {
    var _this;

    _classCallCheck(this, Mesh);

    _this = _super.call(this);
    _this.geometry = geometry;
    _this.material = material;
    _this.drawMode = TrianglesDrawMode;
    return _this;
  }

  _createClass(Mesh, [{
    key: "setDrawMode",
    value: function setDrawMode(value) {
      this.drawMode = value;
    }
  }, {
    key: "raycast",
    value: function raycast(raycaster, intersects) {
      _raycast.call(this, raycaster, intersects);
    }
  }, {
    key: "isMesh",
    get: function get() {
      return true;
    }
  }]);

  return Mesh;
}(Object3D);

var _raycast = function () {
  var inverseMatrix = new Matrix4();
  var ray = new Ray();
  var sphere = new Sphere();
  var vA = new Vector3();
  var vB = new Vector3();
  var vC = new Vector3();
  var tempA = new Vector3();
  var tempB = new Vector3();
  var tempC = new Vector3();
  var uvA = new Vector2();
  var uvB = new Vector2();
  var uvC = new Vector2();
  var barycoord = new Vector3();
  var intersectionPoint = new Vector3();
  var intersectionPointWorld = new Vector3();

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
    if (material === undefined) return; // Checking boundingSphere distance to ray

    if (geometry.boundingSphere === null) geometry.computeBoundingSphere();
    sphere.copy(geometry.boundingSphere);
    sphere.applyMatrix4(matrixWorld);
    if (raycaster.ray.intersectsSphere(sphere) === false) return; //

    inverseMatrix.getInverse(matrixWorld);
    ray.copy(raycaster.ray).applyMatrix4(inverseMatrix); // Check boundingBox before continuing

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

var LineBasicMaterial = /*#__PURE__*/function (_Material) {
  _inherits(LineBasicMaterial, _Material);

  var _super = _createSuper(LineBasicMaterial);

  function LineBasicMaterial(parameters) {
    var _this;

    _classCallCheck(this, LineBasicMaterial);

    _this = _super.call(this);
    _this.type = 'LineBasicMaterial';
    _this.color = new Color$1(0xffffff);
    _this.linewidth = 1; //todo 暂不需要

    _this.lights = false;

    _this.setValues(parameters);

    return _this;
  }

  _createClass(LineBasicMaterial, [{
    key: "copy",
    value: function copy(source) {
      _get(_getPrototypeOf(LineBasicMaterial.prototype), "copy", this).call(this, source);

      this.color.copy(source.color);
      this.linewidth = source.linewidth;
      return this;
    }
  }, {
    key: "isLineBasicMaterial",
    get: function get$$1() {
      return true;
    }
  }]);

  return LineBasicMaterial;
}(Material);

/**
 * @class  线条
 * @description 线条对象
 * @author bujue
 */

var Line = /*#__PURE__*/function (_Object3D) {
  _inherits(Line, _Object3D);

  var _super = _createSuper(Line);

  function Line(geometry, material) {
    var _this;

    _classCallCheck(this, Line);

    _this = _super.call(this);
    _this.type = 'Line';
    _this.geometry = geometry !== undefined ? geometry : new BufferGeometry();
    _this.material = material !== undefined ? material : new LineBasicMaterial({
      color: Math.random() * 0xffffff
    });
    _this.drawMode = LinesMode;

    if (_this.material.isLineDashedMaterial) {
      _this.computeLineDistances();
    }

    return _this;
  }

  _createClass(Line, [{
    key: "setDrawMode",
    value: function setDrawMode(value) {
      this.drawMode = value;
    }
  }, {
    key: "computeLineDistances",
    value: function computeLineDistances() {
      _computeLineDistances.call(this);
    }
  }, {
    key: "raycast",
    value: function raycast(raycaster, intersects) {
      _raycast$1.call(this, raycaster, intersects);
    }
  }, {
    key: "isLine",
    get: function get() {
      return true;
    }
  }]);

  return Line;
}(Object3D);

var _computeLineDistances = function () {
  var start = new Vector3();
  var end = new Vector3();
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
          lineDistances[i] = i === 0 ? 0 : lineDistances[i - 1];
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
        lineDistances[i] = i === 0 ? 0 : lineDistances[i - 1];
        lineDistances[i + 1] = lineDistances[i] + start.distanceTo(end);
      }
    }

    return this;
  };
}();

var _raycast$1 = function () {
  var inverseMatrix = new Matrix4();
  var ray = new Ray();
  var sphere = new Sphere();
  return function raycast(raycaster, intersects) {
    var precision = raycaster.linePrecision;
    var precisionSq = precision * precision;
    var geometry = this.geometry;
    var matrixWorld = this.matrixWorld; // Checking boundingSphere distance to ray

    if (geometry.boundingSphere === null) geometry.computeBoundingSphere();
    sphere.copy(geometry.boundingSphere);
    sphere.applyMatrix4(matrixWorld);
    if (raycaster.ray.intersectsSphere(sphere) === false) return; //

    inverseMatrix.getInverse(matrixWorld);
    ray.copy(raycaster.ray).applyMatrix4(inverseMatrix);
    var vStart = new Vector3();
    var vEnd = new Vector3();
    var interSegment = new Vector3();
    var interRay = new Vector3();
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

var InstancedBufferGeometry = /*#__PURE__*/function (_BufferGeometry) {
  _inherits(InstancedBufferGeometry, _BufferGeometry);

  var _super = _createSuper(InstancedBufferGeometry);

  function InstancedBufferGeometry() {
    var _this;

    _classCallCheck(this, InstancedBufferGeometry);

    _this = _super.call(this);
    _this.type = 'InstancedBufferGeometry';
    _this.maxInstancedCount = undefined;
    _this.isInstancedBufferGeometry = true;
    return _this;
  }

  _createClass(InstancedBufferGeometry, [{
    key: "copy",
    value: function copy(source) {
      _get(_getPrototypeOf(InstancedBufferGeometry.prototype), "copy", this).call(this, source);

      this.maxInstancedCount = source.maxInstancedCount;
      return this;
    }
  }, {
    key: "clone",
    value: function clone() {
      return new this.coFnstructor().copy(this);
    }
  }]);

  return InstancedBufferGeometry;
}(BufferGeometry);

var InterleavedBuffer = /*#__PURE__*/function () {
  function InterleavedBuffer(array, stride) {
    _classCallCheck(this, InterleavedBuffer);

    this.array = array;
    this.stride = stride;
    this.count = array !== undefined ? array.length / stride : 0;
    this.dynamic = false;
    this.updateRange = {
      offset: 0,
      count: -1
    };
    this.version = 0;
    this.isInterleavedBuffer = true;
  }

  _createClass(InterleavedBuffer, [{
    key: "onUploadCallback",
    value: function onUploadCallback() {}
  }, {
    key: "setArray",
    value: function setArray(array) {
      if (Array.isArray(array)) {
        throw new TypeError('BufferAttribute: array should be a Typed Array.');
      }

      this.count = array !== undefined ? array.length / this.stride : 0;
      this.array = array;
      return this;
    }
  }, {
    key: "setDynamic",
    value: function setDynamic(value) {
      this.dynamic = value;
      return this;
    }
  }, {
    key: "copy",
    value: function copy(source) {
      this.array = new source.array.constructor(source.array);
      this.count = source.count;
      this.stride = source.stride;
      this.dynamic = source.dynamic;
      return this;
    }
  }, {
    key: "copyAt",
    value: function copyAt(index1, attribute, index2) {
      index1 *= this.stride;
      index2 *= attribute.stride;

      for (var i = 0, l = this.stride; i < l; i++) {
        this.array[index1 + i] = attribute.array[index2 + i];
      }

      return this;
    }
  }, {
    key: "set",
    value: function set(value, offset) {
      if (offset === undefined) offset = 0;
      this.array.set(value, offset);
      return this;
    }
  }, {
    key: "clone",
    value: function clone() {
      return new this.constructor().copy(this);
    }
  }, {
    key: "onUpload",
    value: function onUpload(callback) {
      this.onUploadCallback = callback;
      return this;
    }
  }, {
    key: "needsUpdate",
    set: function set(value) {
      if (value === true) this.version++;
    }
  }]);

  return InterleavedBuffer;
}();

var InstancedInterleavedBuffer = /*#__PURE__*/function (_InterleavedBuffer) {
  _inherits(InstancedInterleavedBuffer, _InterleavedBuffer);

  var _super = _createSuper(InstancedInterleavedBuffer);

  function InstancedInterleavedBuffer(array, stride, meshPerAttribute) {
    var _this;

    _classCallCheck(this, InstancedInterleavedBuffer);

    _this = _super.call(this, array, stride);
    _this.meshPerAttribute = meshPerAttribute || 1;
    _this.isInstancedInterleavedBuffer = true;
    return _this;
  }

  _createClass(InstancedInterleavedBuffer, [{
    key: "copy",
    value: function copy(source) {
      _get(_getPrototypeOf(InstancedInterleavedBuffer.prototype), "copy", this).call(this, source);

      this.meshPerAttribute = source.meshPerAttribute;
      return this;
    }
  }]);

  return InstancedInterleavedBuffer;
}(InterleavedBuffer);

var InterleavedBufferAttribute = /*#__PURE__*/function () {
  function InterleavedBufferAttribute(interleavedBuffer, itemSize, offset, normalized) {
    _classCallCheck(this, InterleavedBufferAttribute);

    this.data = interleavedBuffer;
    this.itemSize = itemSize;
    this.offset = offset;
    this.normalized = normalized === true;
    this.isInterleavedBufferAttribute = true;
  }

  _createClass(InterleavedBufferAttribute, [{
    key: "setX",
    value: function setX(index, x) {
      this.data.array[index * this.data.stride + this.offset] = x;
      return this;
    }
  }, {
    key: "setY",
    value: function setY(index, y) {
      this.data.array[index * this.data.stride + this.offset + 1] = y;
      return this;
    }
  }, {
    key: "setZ",
    value: function setZ(index, z) {
      this.data.array[index * this.data.stride + this.offset + 2] = z;
      return this;
    }
  }, {
    key: "setW",
    value: function setW(index, w) {
      this.data.array[index * this.data.stride + this.offset + 3] = w;
      return this;
    }
  }, {
    key: "getX",
    value: function getX(index) {
      return this.data.array[index * this.data.stride + this.offset];
    }
  }, {
    key: "getY",
    value: function getY(index) {
      return this.data.array[index * this.data.stride + this.offset + 1];
    }
  }, {
    key: "getZ",
    value: function getZ(index) {
      return this.data.array[index * this.data.stride + this.offset + 2];
    }
  }, {
    key: "getW",
    value: function getW(index) {
      return this.data.array[index * this.data.stride + this.offset + 3];
    }
  }, {
    key: "setXY",
    value: function setXY(index, x, y) {
      this.setX(index, x);
      this.setY(index, y);
      return this;
    }
  }, {
    key: "setXYZ",
    value: function setXYZ(index, x, y, z) {
      this.setX(index, x);
      this.setY(index, y);
      this.setZ(index, z);
      return this;
    }
  }, {
    key: "setXYZW",
    value: function setXYZW(index, x, y, z, w) {
      this.setX(index, x);
      this.setY(index, y);
      this.setZ(index, z);
      this.setW(index, w);
      return this;
    }
  }, {
    key: "count",
    get: function get() {
      return this.data.count;
    }
  }, {
    key: "array",
    get: function get() {
      return this.data.array;
    }
  }]);

  return InterleavedBufferAttribute;
}();

var LineSegmentsGeometry = /*#__PURE__*/function (_InstancedBufferGeome) {
  _inherits(LineSegmentsGeometry, _InstancedBufferGeome);

  var _super = _createSuper(LineSegmentsGeometry);

  function LineSegmentsGeometry() {
    var _this;

    _classCallCheck(this, LineSegmentsGeometry);

    _this = _super.call(this);
    _this.type = 'LineSegmentsGeometry';
    var positions = [-1, 2, 0, 1, 2, 0, -1, 1, 0, 1, 1, 0, -1, 0, 0, 1, 0, 0, -1, -1, 0, 1, -1, 0];
    var uvs = [-1, 2, 1, 2, -1, 1, 1, 1, -1, -1, 1, -1, -1, -2, 1, -2];
    var index = [0, 2, 1, 2, 3, 1, 2, 4, 3, 4, 5, 3, 4, 6, 5, 6, 7, 5];

    _this.setIndex(index);

    _this.addAttribute('position', new Float32BufferAttribute(positions, 3));

    _this.addAttribute('uv', new Float32BufferAttribute(uvs, 2));

    _this.isLineSegmentsGeometry = true;
    return _this;
  }

  _createClass(LineSegmentsGeometry, [{
    key: "applyMatrix",
    value: function applyMatrix(matrix) {
      var start = this.attributes.instanceStart;
      var end = this.attributes.instanceEnd;

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
  }, {
    key: "setPositions",
    value: function setPositions(array) {
      var instanceBuffer = getTypeArray(array); // xyz, xyz

      this.addAttribute('instanceStart', new InterleavedBufferAttribute(instanceBuffer, 3, 0)); // xyz

      this.addAttribute('instanceEnd', new InterleavedBufferAttribute(instanceBuffer, 3, 3)); // xyz
      //默认顶点颜色为白色

      if (this.getAttribute('instanceColorStart') === undefined && this.getAttribute('instanceColorEnd') === undefined) {
        var colors = array.map(function () {
          return 1.0;
        });

        _setColors.call(this, colors);
      }

      this.computeBoundingBox();
      this.computeBoundingSphere();
      return this;
    }
  }, {
    key: "setColors",
    value: function setColors(array) {
      return _setColors.call(this, array);
    }
  }, {
    key: "computeBoundingBox",
    value: function computeBoundingBox() {
      _computeBoundingBox.call(this);
    }
  }, {
    key: "computeBoundingSphere",
    value: function computeBoundingSphere() {
      _computeBoundingSphere$1.call(this);
    }
  }]);

  return LineSegmentsGeometry;
}(InstancedBufferGeometry);

var _setColors = function _setColors(array) {
  var instanceColorBuffer = getTypeArray(array);
  this.addAttribute('instanceColorStart', new InterleavedBufferAttribute(instanceColorBuffer, 3, 0)); // rgb

  this.addAttribute('instanceColorEnd', new InterleavedBufferAttribute(instanceColorBuffer, 3, 3)); // rgb

  return this;
};

var _computeBoundingBox = function () {
  var box = new Box3();
  return function computeBoundingBox() {
    if (this.boundingBox === null) {
      this.boundingBox = new Box3();
    }

    var start = this.attributes.instanceStart;
    var end = this.attributes.instanceEnd;

    if (start !== undefined && end !== undefined) {
      this.boundingBox.setFromBufferAttribute(start);
      box.setFromBufferAttribute(end);
      this.boundingBox.union(box);
    }
  };
}();

var _computeBoundingSphere$1 = function () {
  var vector = new Vector3();
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
}();

function getTypeArray(array) {
  var typeArray;

  if (array instanceof Float32Array) {
    typeArray = array;
  } else if (Array.isArray(array)) {
    typeArray = new Float32Array(array);
  }

  return new InstancedInterleavedBuffer(typeArray, 6, 1);
}

var LineGeometry = /*#__PURE__*/function (_LineSegmentsGeometry) {
  _inherits(LineGeometry, _LineSegmentsGeometry);

  var _super = _createSuper(LineGeometry);

  function LineGeometry() {
    var _this;

    _classCallCheck(this, LineGeometry);

    _this = _super.call(this);
    _this.type = 'LineGeometry';
    _this.isLineGeometry = true;
    return _this;
  }

  _createClass(LineGeometry, [{
    key: "setPositions",
    value: function setPositions(array) {
      var points = createVertexs(array);

      _get(_getPrototypeOf(LineGeometry.prototype), "setPositions", this).call(this, points);

      return this;
    }
  }, {
    key: "setColors",
    value: function setColors(array) {
      var colors = createVertexs(array);

      _get(_getPrototypeOf(LineGeometry.prototype), "setColors", this).call(this, colors);

      return this;
    }
  }, {
    key: "fromLine",
    value: function fromLine(line) {
      var geometry = line.geometry;

      if (geometry.isGeometry) {
        this.setPositions(geometry.vertices);
      } else if (geometry.isBufferGeometry) {
        this.setPositions(geometry.position.array); // assumes non-indexed
      } // set colors, maybe


      return this;
    }
  }]);

  return LineGeometry;
}(LineSegmentsGeometry);

function createVertexs(array) {
  // converts [ x1, y1, z1,  x2, y2, z2, ... ] to pairs format
  var length = array.length - 3;
  var Vertexs = new Float32Array(2 * length);

  for (var i = 0; i < length; i += 3) {
    Vertexs[2 * i] = array[i];
    Vertexs[2 * i + 1] = array[i + 1];
    Vertexs[2 * i + 2] = array[i + 2];
    Vertexs[2 * i + 3] = array[i + 3];
    Vertexs[2 * i + 4] = array[i + 4];
    Vertexs[2 * i + 5] = array[i + 5];
  }

  return Vertexs;
}

var LineMeshMaterial = /*#__PURE__*/function (_Material) {
  _inherits(LineMeshMaterial, _Material);

  var _super = _createSuper(LineMeshMaterial);

  function LineMeshMaterial(parameters) {
    var _this;

    _classCallCheck(this, LineMeshMaterial);

    _this = _super.call(this);
    _this.type = 'LineMeshMaterial';
    _this.color = new Color$1(0xffffff);
    _this.linewidth = 1;
    _this.dashed = false;
    _this.scale = 1; //虚线整体的缩放 

    _this.dashSize = 3; //虚线点的长度  

    _this.gapSize = 1; //虚线间距的大小

    _this.resolution = new Vector2(); //todo 暂不需要

    _this.lights = false;

    _this.setValues(parameters);

    return _this;
  }

  _createClass(LineMeshMaterial, [{
    key: "copy",
    value: function copy(source) {
      _get(_getPrototypeOf(LineMeshMaterial.prototype), "copy", this).call(this, source);

      this.color.copy(source.color);
      this.linewidth = source.linewidth;
      this.scale = source.scale;
      this.dashSize = source.dashSize;
      this.gapSize = source.gapSize;
      this.dashed = source.dashed;
      this.resolution.copy(source.resolution);
      return this;
    }
  }, {
    key: "isLineMeshMaterial",
    get: function get$$1() {
      return true;
    }
  }]);

  return LineMeshMaterial;
}(Material);

var Line2 = /*#__PURE__*/function (_Mesh) {
  _inherits(Line2, _Mesh);

  var _super = _createSuper(Line2);

  function Line2(geometry, material) {
    var _this;

    _classCallCheck(this, Line2);

    _this = _super.call(this, geometry, material);
    _this.geometry = geometry !== undefined ? geometry : new LineGeometry();
    _this.material = material !== undefined ? material : new LineMeshMaterial({
      color: Math.random() * 0xffffff
    });
    return _this;
  }

  _createClass(Line2, [{
    key: "computeLineDistances",
    value: function computeLineDistances() {
      _computeLineDistances$1.call(this);
    }
  }, {
    key: "isLine2",
    get: function get() {
      return true;
    }
  }]);

  return Line2;
}(Mesh);

var _computeLineDistances$1 = function () {
  // for backwards-compatability, but could be a method of LineSegmentsGeometry...
  var start = new Vector3();
  var end = new Vector3();
  return function computeLineDistances() {
    var geometry = this.geometry;
    var instanceStart = geometry.attributes.instanceStart;
    var instanceEnd = geometry.attributes.instanceEnd;
    var lineDistances = new Float32Array(2 * instanceStart.data.count);

    for (var i = 0, j = 0, l = instanceStart.data.count; i < l; i++, j += 2) {
      start.fromBufferAttribute(instanceStart, i);
      end.fromBufferAttribute(instanceEnd, i);
      lineDistances[j] = j === 0 ? 0 : lineDistances[j - 1];
      lineDistances[j + 1] = lineDistances[j] + start.distanceTo(end);
    }

    var instanceDistanceBuffer = new InstancedInterleavedBuffer(lineDistances, 2, 1); // d0, d1

    geometry.addAttribute('instanceDistanceStart', new InterleavedBufferAttribute(instanceDistanceBuffer, 1, 0)); // d0

    geometry.addAttribute('instanceDistanceEnd', new InterleavedBufferAttribute(instanceDistanceBuffer, 1, 1)); // d1

    return this;
  };
}();

var PointsMaterial = /*#__PURE__*/function (_Material) {
  _inherits(PointsMaterial, _Material);

  var _super = _createSuper(PointsMaterial);

  function PointsMaterial(parameters) {
    var _this;

    _classCallCheck(this, PointsMaterial);

    _this = _super.call(this);
    _this.type = 'PointsMaterial';
    _this.color = new Color$1(0xffffff);
    _this.map = null; //点的大小

    _this.size = 1; //启用/禁用随距离而发生尺寸衰减

    _this.sizeAttenuation = true; //不接受灯光

    _this.lights = false;

    _this.setValues(parameters);

    return _this;
  }

  _createClass(PointsMaterial, [{
    key: "copy",
    value: function copy(source) {
      _get(_getPrototypeOf(PointsMaterial.prototype), "copy", this).call(this, source);

      this.color.copy(source.color);
      this.map = source.map;
      this.size = source.size;
      this.sizeAttenuation = source.sizeAttenuation;
      return this;
    }
  }, {
    key: "isPointsMaterial",
    get: function get$$1() {
      return true;
    }
  }]);

  return PointsMaterial;
}(Material);

var Points = /*#__PURE__*/function (_Object3D) {
  _inherits(Points, _Object3D);

  var _super = _createSuper(Points);

  function Points(geometry, material) {
    var _this;

    _classCallCheck(this, Points);

    _this = _super.call(this);
    _this.type = 'Points';
    _this.geometry = geometry !== undefined ? geometry : new BufferGeometry();
    _this.material = material !== undefined ? material : new PointsMaterial({
      color: Math.random() * 0xffffff
    });
    return _this;
  }

  _createClass(Points, [{
    key: "raycast",
    value: function raycast(raycaster, intersects) {
      _raycast$2.call(this, raycaster, intersects);
    }
  }, {
    key: "isPoints",
    get: function get() {
      return true;
    }
  }]);

  return Points;
}(Object3D);

var _raycast$2 = function () {
  var inverseMatrix = new Matrix4();
  var ray = new Ray();
  var sphere = new Sphere();
  return function raycast(raycaster, intersects) {
    var object = this;
    var geometry = this.geometry;
    var matrixWorld = this.matrixWorld;
    var threshold = raycaster.params.Points.threshold; // Checking boundingSphere distance to ray

    if (geometry.boundingSphere === null) geometry.computeBoundingSphere();
    sphere.copy(geometry.boundingSphere);
    sphere.applyMatrix4(matrixWorld);
    sphere.radius += threshold;
    if (raycaster.ray.intersectsSphere(sphere) === false) return; //

    inverseMatrix.getInverse(matrixWorld);
    ray.copy(raycaster.ray).applyMatrix4(inverseMatrix);
    var localThreshold = threshold / ((this.scale.x + this.scale.y + this.scale.z) / 3);
    var localThresholdSq = localThreshold * localThreshold;
    var position = new Vector3();
    var intersectPoint = new Vector3();

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

var SpriteMaterial$$1 = /*#__PURE__*/function (_Material) {
  _inherits(SpriteMaterial$$1, _Material);

  var _super = _createSuper(SpriteMaterial$$1);

  function SpriteMaterial$$1(parameters) {
    var _this;

    _classCallCheck(this, SpriteMaterial$$1);

    _this = _super.call(this);
    _this.type = 'SpriteMaterial';
    _this.color = new Color$1(0xffffff);
    _this.map = null;
    _this.rotation = 0;
    _this.sizeAttenuation = true;
    _this.lights = false;
    _this.transparent = true;

    _this.setValues(parameters);

    return _this;
  }

  _createClass(SpriteMaterial$$1, [{
    key: "copy",
    value: function copy(source) {
      _get(_getPrototypeOf(SpriteMaterial$$1.prototype), "copy", this).call(this, source);

      this.color.copy(source.color);
      this.map = source.map;
      this.rotation = source.rotation;
      this.sizeAttenuation = source.sizeAttenuation;
      return this;
    }
  }, {
    key: "isSpriteMaterial",
    get: function get$$1() {
      return true;
    }
  }]);

  return SpriteMaterial$$1;
}(Material);

var geometry;

var Sprite = /*#__PURE__*/function (_Object3D) {
  _inherits(Sprite, _Object3D);

  var _super = _createSuper(Sprite);

  function Sprite(material) {
    var _this;

    _classCallCheck(this, Sprite);

    _this = _super.call(this);
    _this.type = 'Sprite';

    if (geometry === undefined) {
      geometry = new BufferGeometry();
      var float32Array = new Float32Array([-0.5, -0.5, 0, 0, 0, 0.5, -0.5, 0, 1, 0, 0.5, 0.5, 0, 1, 1, -0.5, 0.5, 0, 0, 1]);
      var interleavedBuffer = new InterleavedBuffer(float32Array, 5);
      geometry.setIndex([0, 1, 2, 0, 2, 3]);
      geometry.addAttribute('position', new InterleavedBufferAttribute(interleavedBuffer, 3, 0, false));
      geometry.addAttribute('uv', new InterleavedBufferAttribute(interleavedBuffer, 2, 3, false));
    }

    _this.geometry = geometry;
    _this.material = material !== undefined ? material : new SpriteMaterial$$1();
    _this.center = new Vector2(0.5, 0.5);
    return _this;
  }

  _createClass(Sprite, [{
    key: "raycast",
    value: function raycast(raycaster, intersects) {
      _raycast$3.call(this, raycaster, intersects);
    }
  }, {
    key: "clone",
    value: function clone() {
      return new this.constructor(this.material).copy(this);
    }
  }, {
    key: "copy",
    value: function copy(source) {
      Object3D.prototype.copy.call(this, source);
      if (source.center !== undefined) this.center.copy(source.center);
      return this;
    }
  }, {
    key: "isSprite",
    get: function get() {
      return true;
    }
  }]);

  return Sprite;
}(Object3D);

var _raycast$3 = function () {
  var intersectPoint = new Vector3();
  var worldScale = new Vector3();
  var mvPosition = new Vector3();
  var alignedPosition = new Vector2();
  var rotatedPosition = new Vector2();
  var viewWorldMatrix = new Matrix4();
  var vA = new Vector3();
  var vB = new Vector3();
  var vC = new Vector3();
  var uvA = new Vector2();
  var uvB = new Vector2();
  var uvC = new Vector2();

  function transformVertex(vertexPosition, mvPosition, center, scale, sin, cos) {
    // compute position in camera space
    alignedPosition.subVectors(vertexPosition, center).addScalar(0.5).multiply(scale); // to check if rotation is not zero

    if (sin !== undefined) {
      rotatedPosition.x = cos * alignedPosition.x - sin * alignedPosition.y;
      rotatedPosition.y = sin * alignedPosition.x + cos * alignedPosition.y;
    } else {
      rotatedPosition.copy(alignedPosition);
    }

    vertexPosition.copy(mvPosition);
    vertexPosition.x += rotatedPosition.x;
    vertexPosition.y += rotatedPosition.y; // transform to world space

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
    transformVertex(vA.set(-0.5, -0.5, 0), mvPosition, center, worldScale, sin, cos);
    transformVertex(vB.set(0.5, -0.5, 0), mvPosition, center, worldScale, sin, cos);
    transformVertex(vC.set(0.5, 0.5, 0), mvPosition, center, worldScale, sin, cos);
    uvA.set(0, 0);
    uvB.set(1, 0);
    uvC.set(1, 1); // check first triangle

    var intersect = raycaster.ray.intersectTriangle(vA, vB, vC, false, intersectPoint);

    if (intersect === null) {
      // check second triangle
      transformVertex(vB.set(-0.5, 0.5, 0), mvPosition, center, worldScale, sin, cos);
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
}();

var TextTexture = /*#__PURE__*/function (_Texture) {
  _inherits(TextTexture, _Texture);

  var _super = _createSuper(TextTexture);

  function TextTexture() {
    var _this;

    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$autoRedraw = _ref.autoRedraw,
        autoRedraw = _ref$autoRedraw === void 0 ? true : _ref$autoRedraw,
        _ref$text = _ref.text,
        text = _ref$text === void 0 ? '' : _ref$text,
        _ref$textAlign = _ref.textAlign,
        textAlign = _ref$textAlign === void 0 ? 'center' : _ref$textAlign,
        _ref$textLineHeight = _ref.textLineHeight,
        textLineHeight = _ref$textLineHeight === void 0 ? 1.15 : _ref$textLineHeight,
        _ref$fontFamily = _ref.fontFamily,
        fontFamily = _ref$fontFamily === void 0 ? 'sans-serif' : _ref$fontFamily,
        _ref$fontSize = _ref.fontSize,
        fontSize = _ref$fontSize === void 0 ? 16 : _ref$fontSize,
        _ref$fontWeight = _ref.fontWeight,
        fontWeight = _ref$fontWeight === void 0 ? 'normal' : _ref$fontWeight,
        _ref$fontVariant = _ref.fontVariant,
        fontVariant = _ref$fontVariant === void 0 ? 'normal' : _ref$fontVariant,
        _ref$fontStyle = _ref.fontStyle,
        fontStyle = _ref$fontStyle === void 0 ? 'normal' : _ref$fontStyle,
        _ref$fillStyle = _ref.fillStyle,
        fillStyle = _ref$fillStyle === void 0 ? 'white' : _ref$fillStyle,
        _ref$lineWidth = _ref.lineWidth,
        lineWidth = _ref$lineWidth === void 0 ? 0 : _ref$lineWidth,
        _ref$strokeStyle = _ref.strokeStyle,
        strokeStyle = _ref$strokeStyle === void 0 ? 'black' : _ref$strokeStyle,
        _ref$padding = _ref.padding,
        padding = _ref$padding === void 0 ? 0.25 : _ref$padding,
        _ref$magFilter = _ref.magFilter,
        magFilter = _ref$magFilter === void 0 ? LinearFilter : _ref$magFilter,
        _ref$minFilter = _ref.minFilter,
        minFilter = _ref$minFilter === void 0 ? LinearFilter : _ref$minFilter,
        mapping = _ref.mapping,
        wrapS = _ref.wrapS,
        wrapT = _ref.wrapT,
        format = _ref.format,
        type = _ref.type,
        anisotropy = _ref.anisotropy;

    _classCallCheck(this, TextTexture);

    _this = _super.call(this, createCanvas(), mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy);
    _this.autoRedraw = autoRedraw;
    _this._text = text;
    _this._textAlign = textAlign;
    _this._textLineHeight = textLineHeight;
    _this._fontFamily = fontFamily;
    _this._fontSize = fontSize;
    _this._fontWeight = fontWeight;
    _this._fontVariant = fontVariant;
    _this._fontStyle = fontStyle;
    _this._fillStyle = fillStyle;
    _this._lineWidth = lineWidth;
    _this._strokeStyle = strokeStyle;
    _this._padding = padding;

    _this.redraw();

    return _this;
  }

  _createClass(TextTexture, [{
    key: "redraw",
    value: function redraw() {
      var _this2 = this;

      var ctx = this.image.getContext('2d');
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

      if (this.textWidthInPixels && this.textHeightInPixels) {
        ctx.canvas.width = this.imageWidthInPixels;
        ctx.canvas.height = this.imageHeightInPixels;
        ctx.font = this.font;
        ctx.textBaseline = 'middle';
        var left;

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

        var top = this.paddingInPixels + this.lineWidthInPixels / 2 + this.fontSize / 2;
        ctx.fillStyle = this.fillStyle;
        ctx.miterLimit = 1;
        ctx.lineWidth = this.lineWidthInPixels;
        ctx.strokeStyle = this.strokeStyle;
        this.textLines.forEach(function (text) {
          if (_this2.lineWidth) {
            ctx.strokeText(text, left, top);
          }

          ctx.fillText(text, left, top);
          top += _this2.textLineHeightInPixels;
        });
      } else {
        ctx.canvas.width = ctx.canvas.height = 1;
      }

      this.needsUpdate = true;
    }
  }, {
    key: "_redrawIfAuto",
    value: function _redrawIfAuto() {
      if (this.autoRedraw) {
        this.redraw();
      }
    }
  }, {
    key: "isTextTexture",
    get: function get() {
      return true;
    }
  }, {
    key: "text",
    get: function get() {
      return this._text;
    },
    set: function set(value) {
      if (this._text !== value) {
        this._text = value;
        this._textLines = undefined;
        this._textWidthInPixels = undefined;

        this._redrawIfAuto();
      }
    }
  }, {
    key: "textAlign",
    get: function get() {
      return this._textAlign;
    },
    set: function set(value) {
      if (this._textAlign !== value) {
        this._textAlign = value;

        this._redrawIfAuto();
      }
    }
  }, {
    key: "textLines",
    get: function get() {
      if (Lang_isUndefined(this._textLines)) {
        this._textLines = getTextLines(this.text);
      }

      return this._textLines;
    }
  }, {
    key: "textLineHeight",
    get: function get() {
      return this._textLineHeight;
    },
    set: function set(value) {
      if (this._textLineHeight !== value) {
        this._textLineHeight = value;

        this._redrawIfAuto();
      }
    }
  }, {
    key: "textLineHeightInPixels",
    get: function get() {
      return this.fontSize * this.textLineHeight;
    }
  }, {
    key: "fontFamily",
    get: function get() {
      return this._fontFamily;
    },
    set: function set(value) {
      if (this._fontFamily !== value) {
        this._fontFamily = value;
        this._textWidthInPixels = undefined;

        this._redrawIfAuto();
      }
    }
  }, {
    key: "fontSize",
    get: function get() {
      return this._fontSize;
    },
    set: function set(value) {
      if (this._fontSize !== value) {
        this._fontSize = value;
        this._textWidthInPixels = undefined;

        this._redrawIfAuto();
      }
    }
  }, {
    key: "fontWeight",
    get: function get() {
      return this._fontWeight;
    },
    set: function set(value) {
      if (this._fontWeight !== value) {
        this._fontWeight = value;
        this._textWidthInPixels = undefined;

        this._redrawIfAuto();
      }
    }
  }, {
    key: "fontVariant",
    get: function get() {
      return this._fontVariant;
    },
    set: function set(value) {
      if (this._fontVariant !== value) {
        this._fontVariant = value;
        this._textWidthInPixels = undefined;

        this._redrawIfAuto();
      }
    }
  }, {
    key: "fontStyle",
    get: function get() {
      return this._fontStyle;
    },
    set: function set(value) {
      if (this._fontStyle !== value) {
        this._fontStyle = value;
        this._textWidthInPixels = undefined;

        this._redrawIfAuto();
      }
    }
  }, {
    key: "font",
    get: function get() {
      return getFont(this.fontStyle, this.fontVariant, this.fontWeight, this.fontSize, this.fontFamily);
    }
  }, {
    key: "fillStyle",
    get: function get() {
      return this._fillStyle;
    },
    set: function set(value) {
      if (this._fillStyle !== value) {
        this._fillStyle = value;

        this._redrawIfAuto();
      }
    }
  }, {
    key: "lineWidth",
    get: function get() {
      return this._lineWidth;
    },
    set: function set(value) {
      if (this._lineWidth !== value) {
        this._lineWidth = value;

        this._redrawIfAuto();
      }
    }
  }, {
    key: "lineWidthInPixels",
    get: function get() {
      return this._lineWidth * this.fontSize;
    }
  }, {
    key: "strokeStyle",
    get: function get() {
      return this._strokeStyle;
    },
    set: function set(value) {
      if (this._strokeStyle !== value) {
        this._strokeStyle = value;

        this._redrawIfAuto();
      }
    }
  }, {
    key: "textWidthInPixels",
    get: function get() {
      if (Lang_isUndefined(this._textWidthInPixels)) {
        this._textWidthInPixels = getTextWidth(this.textLines, this.font);
      }

      return this._textWidthInPixels;
    }
  }, {
    key: "textHeight",
    get: function get() {
      return this.textLineHeight * (this.textLines.length - 1) + 1;
    }
  }, {
    key: "textHeightInPixels",
    get: function get() {
      return this.textHeight * this.fontSize;
    }
  }, {
    key: "padding",
    get: function get() {
      return this._padding;
    },
    set: function set(value) {
      if (this._padding !== value) {
        this._padding = value;

        this._redrawIfAuto();
      }
    }
  }, {
    key: "paddingInPixels",
    get: function get() {
      return this.padding * this.fontSize;
    }
  }, {
    key: "imageWidthInPixels",
    get: function get() {
      return this.textWidthInPixels + this.lineWidthInPixels + this.paddingInPixels * 2;
    }
  }, {
    key: "imageHeight",
    get: function get() {
      return this.textHeight + this.lineWidth + this.padding * 2;
    }
  }, {
    key: "imageHeightInPixels",
    get: function get() {
      return this.imageHeight * this.fontSize;
    }
  }, {
    key: "imageAspect",
    get: function get() {
      if (this.image.width && this.image.height) {
        return this.image.width / this.image.height;
      }

      return 1;
    }
  }]);

  return TextTexture;
}(Texture);

TextTexture.getTextWidth = function (textLines, font) {
  return getTextWidth(textLines, font);
};

function Lang_isUndefined(value) {
  return value === undefined;
}

function getTextLines(text) {
  return text ? text.split('\n') : [];
}

function getFont(fontStyle, fontVariant, fontWeight, fontSize, fontFamily) {
  return [fontStyle, fontVariant, fontWeight, "".concat(fontSize, "px"), fontFamily].join(' ');
}

function getTextWidth(textLines, font) {
  if (textLines.length) {
    var ctx = createCanvas().getContext('2d');
    ctx.font = font;
    return Array_max(textLines.map(function (text) {
      return ctx.measureText(text).width;
    }));
  }

  return 0;
}

function Array_max(array) {
  if (array.length > 0) {
    return array.reduce(function (maxValue, value) {
      return Math.max(maxValue, value);
    });
  }
}

function createCanvas() {
  return document.createElementNS('http://www.w3.org/1999/xhtml', 'canvas');
}

var TextSprite = /*#__PURE__*/function (_Sprite) {
  _inherits(TextSprite, _Sprite);

  var _super = _createSuper(TextSprite);

  function TextSprite() {
    var _this;

    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$fontSize = _ref.fontSize,
        fontSize = _ref$fontSize === void 0 ? 16 : _ref$fontSize,
        _ref$redrawInterval = _ref.redrawInterval,
        redrawInterval = _ref$redrawInterval === void 0 ? 1 : _ref$redrawInterval,
        _ref$material = _ref.material,
        material = _ref$material === void 0 ? {} : _ref$material,
        _ref$texture = _ref.texture,
        texture = _ref$texture === void 0 ? {} : _ref$texture;

    _classCallCheck(this, TextSprite);

    var params = {};

    for (var key in material) {
      params[key] = material[key];
    }

    params['map'] = new TextTexture(texture);
    _this = _super.call(this, new SpriteMaterial$$1(params));
    _this.fontSize = fontSize;
    _this.redrawInterval = redrawInterval;
    _this.lastRedraw = 0;
    return _this;
  }

  _createClass(TextSprite, [{
    key: "onBeforeRender",
    value: function onBeforeRender(renderer, scene, camera) {
      this.redraw(renderer, camera);
    }
  }, {
    key: "updateScale",
    value: function updateScale(renderer, camera) {
      var actualFontSize = 1;
      var fontsize = this.fontSize;
      var height = 0;
      var screenHeight = renderer.domElement.clientHeight;

      if (camera.isOrthographicCamera) {
        height = camera.top - camera.bottom;
      } else {
        var cameraWorldPos = new Vector3();
        camera.updateMatrixWorld(true);
        cameraWorldPos.applyMatrix4(camera.matrixWorld);
        var pos = new Vector3();
        this.updateMatrixWorld(true);
        pos.applyMatrix4(this.matrixWorld);
        var dist = cameraWorldPos.distanceTo(pos);

        var vFOV = _Math.degToRad(camera.fov); // convert vertical fov to radians


        height = 2 * Math.tan(vFOV / 2) * dist; // visible height
        //投影位置全屏的Height 与 屏幕的高度比乘以字体的高度  
      }

      actualFontSize = height / screenHeight * fontsize;
      this.scale.set(this.material.map.imageAspect, 1, 1).multiplyScalar(actualFontSize);
    } // updateMatrix(...args) {
    //     this.updateScale(...args);
    //     return super.updateMatrix(...args);
    // }

  }, {
    key: "redraw",
    value: function redraw(renderer, camera) {
      var _this2 = this;

      if (this.lastRedraw + this.redrawInterval < Date.now()) {
        if (this.redrawInterval) {
          setTimeout(function () {
            _this2.redrawNow(renderer, camera);
          }, 1);
        } else {
          this.redrawNow(renderer, camera);
        }
      }
    }
  }, {
    key: "redrawNow",
    value: function redrawNow(renderer, camera) {
      this.updateScale(renderer, camera);
      this.material.map.autoRedraw = true;
      this.material.map.fontSize = _Math.ceilPowerOfTwo(getOptimalFontSize(this, renderer, camera));
      this.lastRedraw = Date.now();
    }
  }, {
    key: "dispose",
    value: function dispose() {
      //todo 更改sprite 的渲染,不然回收有问题
      this.material.map.dispose();
      this.material.dispose();
    }
  }, {
    key: "isTextSprite",
    get: function get() {
      return true;
    }
  }]);

  return TextSprite;
}(Sprite);

var getOptimalFontSize = function () {
  var objectWorldPosition = new Vector3();
  var cameraWorldPosition = new Vector3();
  var objectWorldScale = new Vector3();
  return function getOptimalFontSize(object, renderer, camera) {
    if (renderer.domElement.width && renderer.domElement.height && object.material.map.textLines.length) {
      var distance = object.getWorldPosition(objectWorldPosition).distanceTo(camera.getWorldPosition(cameraWorldPosition));

      if (distance) {
        var heightInPixels = object.getWorldScale(objectWorldScale).y * renderer.domElement.height / distance;

        if (heightInPixels) {
          return Math.round(heightInPixels / object.material.map.imageHeight);
        }
      }
    }

    return 0;
  };
}();

/**
 * @class BufferGeometry 三维几何体的基类
 * @description 实现三维几何体的一些基本操作
 * @author bujue
 */

var geometryId = 0;

var Geometry = /*#__PURE__*/function (_Events) {
  _inherits(Geometry, _Events);

  var _super = _createSuper(Geometry);

  function Geometry() {
    var _this;

    _classCallCheck(this, Geometry);

    _this = _super.call(this);
    Object.defineProperty(_assertThisInitialized(_this), 'id', {
      value: geometryId += 2
    });
    _this.type = 'Geometry';
    _this.vertices = [];
    _this.colors = [];
    _this.faces = [];
    _this.faceVertexUvs = [[]];
    _this.isGeometry = true;
    _this.lineDistances = []; //计算虚线需要

    _this.boundingSphere = null;
    _this.boundingBox = null; // update flags

    _this.elementsNeedUpdate = false;
    _this.verticesNeedUpdate = false;
    _this.uvsNeedUpdate = false;
    _this.normalsNeedUpdate = false;
    _this.colorsNeedUpdate = false;
    _this.lineDistancesNeedUpdate = false;
    _this.groupsNeedUpdate = false;
    return _this;
  }

  _createClass(Geometry, [{
    key: "fromBufferGeometry",
    value: function fromBufferGeometry(geometry) {
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
        scope.vertices.push(new Vector3(positions[i], positions[i + 1], positions[i + 2]));

        if (normals !== undefined) {
          tempNormals.push(new Vector3(normals[i], normals[i + 1], normals[i + 2]));
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
  }, {
    key: "computeBoundingBox",
    value: function computeBoundingBox() {
      if (this.boundingBox === null) {
        this.boundingBox = new Box3();
      }

      this.boundingBox.setFromPoints(this.vertices);
    }
  }, {
    key: "computeBoundingSphere",
    value: function computeBoundingSphere() {
      if (this.boundingSphere === null) {
        this.boundingSphere = new Sphere();
      }

      this.boundingSphere.setFromPoints(this.vertices);
    }
  }, {
    key: "computeFaceNormals",
    value: function computeFaceNormals() {
      var cb = new Vector3(),
          ab = new Vector3();

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

  }, {
    key: "mergeVertices",
    value: function mergeVertices() {
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
      } // if faces are completely degenerate after merging vertices, we
      // have to remove them from the geometry.


      var faceIndicesToRemove = [];

      for (i = 0, il = this.faces.length; i < il; i++) {
        face = this.faces[i];
        face.a = changes[face.a];
        face.b = changes[face.b];
        face.c = changes[face.c];
        indices = [face.a, face.b, face.c]; // if any duplicate vertices are found in a Face3
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
      } // Use unique set of vertices


      var diff = this.vertices.length - unique.length;
      this.vertices = unique;
      return diff;
    }
  }, {
    key: "clone",
    value: function clone() {
      return new Geometry().copy(this);
    }
  }, {
    key: "copy",
    value: function copy(source) {
      var i, il, j, jl, k, kl; // reset

      this.vertices = [];
      this.colors = [];
      this.faces = [];
      this.faceVertexUvs = [[]];
      this.boundingBox = null;
      this.boundingSphere = null; // name

      this.name = source.name; // vertices

      var vertices = source.vertices;

      for (i = 0, il = vertices.length; i < il; i++) {
        this.vertices.push(vertices[i].clone());
      } // colors


      var colors = source.colors;

      for (i = 0, il = colors.length; i < il; i++) {
        this.colors.push(colors[i].clone());
      } // faces


      var faces = source.faces;

      for (i = 0, il = faces.length; i < il; i++) {
        this.faces.push(faces[i].clone());
      } // face vertex uvs


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
      } // bounding box


      var boundingBox = source.boundingBox;

      if (boundingBox !== null) {
        this.boundingBox = boundingBox.clone();
      } // bounding sphere


      var boundingSphere = source.boundingSphere;

      if (boundingSphere !== null) {
        this.boundingSphere = boundingSphere.clone();
      } // update flags


      this.elementsNeedUpdate = source.elementsNeedUpdate;
      this.verticesNeedUpdate = source.verticesNeedUpdate;
      this.uvsNeedUpdate = source.uvsNeedUpdate;
      this.normalsNeedUpdate = source.normalsNeedUpdate;
      this.colorsNeedUpdate = source.colorsNeedUpdate;
      this.lineDistancesNeedUpdate = source.lineDistancesNeedUpdate;
      this.groupsNeedUpdate = source.groupsNeedUpdate;
      return this;
    }
  }, {
    key: "dispose",
    value: function dispose() {
      this.fire({
        type: 'dispose'
      });
    }
  }]);

  return Geometry;
}(Events);

var CircleGeometry = /*#__PURE__*/function (_Geometry) {
  _inherits(CircleGeometry, _Geometry);

  var _super = _createSuper(CircleGeometry);

  function CircleGeometry(radius, segments, thetaStart, thetaLength) {
    var _this;

    _classCallCheck(this, CircleGeometry);

    _this = _super.call(this);
    _this.type = 'CircleGeometry';
    _this.parameters = {
      radius: radius,
      segments: segments,
      thetaStart: thetaStart,
      thetaLength: thetaLength
    };

    _this.fromBufferGeometry(new CircleBufferGeometry(radius, segments, thetaStart, thetaLength));

    _this.mergeVertices();

    return _this;
  }

  return CircleGeometry;
}(Geometry); // CircleBufferGeometry


var CircleBufferGeometry = /*#__PURE__*/function (_BufferGeometry) {
  _inherits(CircleBufferGeometry, _BufferGeometry);

  var _super2 = _createSuper(CircleBufferGeometry);

  function CircleBufferGeometry(radius, segments, thetaStart, thetaLength) {
    var _this2;

    _classCallCheck(this, CircleBufferGeometry);

    _this2 = _super2.call(this);
    _this2.type = 'CircleBufferGeometry';
    _this2.parameters = {
      radius: radius,
      segments: segments,
      thetaStart: thetaStart,
      thetaLength: thetaLength
    };
    radius = radius || 50;
    segments = segments !== undefined ? Math.max(3, segments) : 8;
    thetaStart = thetaStart !== undefined ? thetaStart : 0;
    thetaLength = thetaLength !== undefined ? thetaLength : Math.PI * 2; // buffers

    var indices = [];
    var vertices = [];
    var normals = [];
    var uvs = []; // helper variables

    var i, s;
    var vertex = new Vector3();
    var uv = new Vector2(); // center point

    vertices.push(0, 0, 0);
    normals.push(0, 0, 1);
    uvs.push(0.5, 0.5);

    for (s = 0, i = 3; s <= segments; s++, i += 3) {
      var segment = thetaStart + s / segments * thetaLength; // vertex

      vertex.x = radius * Math.cos(segment);
      vertex.y = radius * Math.sin(segment);
      vertices.push(vertex.x, vertex.y, vertex.z); // normal

      normals.push(0, 0, 1); // uvs

      uv.x = (vertices[i] / radius + 1) / 2;
      uv.y = (vertices[i + 1] / radius + 1) / 2;
      uvs.push(uv.x, uv.y);
    } // indices


    for (i = 1; i <= segments; i++) {
      indices.push(i, i + 1, 0);
    } // build geometry


    _this2.setIndex(indices);

    _this2.addAttribute('position', new Float32BufferAttribute(vertices, 3));

    _this2.addAttribute('normal', new Float32BufferAttribute(normals, 3));

    _this2.addAttribute('uv', new Float32BufferAttribute(uvs, 2));

    return _this2;
  }

  return CircleBufferGeometry;
}(BufferGeometry);

var PlaneGeometry = /*#__PURE__*/function (_Geometry) {
  _inherits(PlaneGeometry, _Geometry);

  var _super = _createSuper(PlaneGeometry);

  function PlaneGeometry(width, height, widthSegments, heightSegments) {
    var _this;

    _classCallCheck(this, PlaneGeometry);

    _this = _super.call(this);
    _this.type = 'PlaneGeometry';
    _this.parameters = {
      width: width,
      height: height,
      widthSegments: widthSegments,
      heightSegments: heightSegments
    };

    _this.fromBufferGeometry(new PlaneBufferGeometry(width, height, widthSegments, heightSegments));

    _this.mergeVertices();

    return _this;
  }

  return PlaneGeometry;
}(Geometry); // PlaneBufferGeometry


var PlaneBufferGeometry = /*#__PURE__*/function (_BufferGeometry) {
  _inherits(PlaneBufferGeometry, _BufferGeometry);

  var _super2 = _createSuper(PlaneBufferGeometry);

  function PlaneBufferGeometry(width, height, widthSegments, heightSegments) {
    var _this2;

    _classCallCheck(this, PlaneBufferGeometry);

    _this2 = _super2.call(this);
    _this2.type = 'PlaneBufferGeometry';
    _this2.parameters = {
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
    var ix, iy; // buffers

    var indices = [];
    var vertices = [];
    var normals = [];
    var uvs = []; // generate vertices, normals and uvs

    for (iy = 0; iy < gridY1; iy++) {
      var y = iy * segment_height - height_half;

      for (ix = 0; ix < gridX1; ix++) {
        var x = ix * segment_width - width_half;
        vertices.push(x, -y, 0);
        normals.push(0, 0, 1);
        uvs.push(ix / gridX);
        uvs.push(1 - iy / gridY);
      }
    } // indices


    for (iy = 0; iy < gridY; iy++) {
      for (ix = 0; ix < gridX; ix++) {
        var a = ix + gridX1 * iy;
        var b = ix + gridX1 * (iy + 1);
        var c = ix + 1 + gridX1 * (iy + 1);
        var d = ix + 1 + gridX1 * iy; // faces

        indices.push(a, b, d);
        indices.push(b, c, d);
      }
    } // build geometry


    _this2.setIndex(indices);

    _this2.addAttribute('position', new Float32BufferAttribute(vertices, 3));

    _this2.addAttribute('normal', new Float32BufferAttribute(normals, 3));

    _this2.addAttribute('uv', new Float32BufferAttribute(uvs, 2));

    return _this2;
  }

  return PlaneBufferGeometry;
}(BufferGeometry);

var BoxGeometry = /*#__PURE__*/function (_Geometry) {
  _inherits(BoxGeometry, _Geometry);

  var _super = _createSuper(BoxGeometry);

  function BoxGeometry(width, height, depth, widthSegments, heightSegments, depthSegments) {
    var _this;

    _classCallCheck(this, BoxGeometry);

    _this = _super.call(this);
    _this.type = 'BoxGeometry';
    _this.parameters = {
      width: width,
      height: height,
      depth: depth,
      widthSegments: widthSegments,
      heightSegments: heightSegments,
      depthSegments: depthSegments
    };

    _this.fromBufferGeometry(new BoxBufferGeometry(width, height, depth, widthSegments, heightSegments, depthSegments));

    _this.mergeVertices();

    return _this;
  }

  return BoxGeometry;
}(Geometry); // BoxBufferGeometry


var BoxBufferGeometry = /*#__PURE__*/function (_BufferGeometry) {
  _inherits(BoxBufferGeometry, _BufferGeometry);

  var _super2 = _createSuper(BoxBufferGeometry);

  function BoxBufferGeometry(width, height, depth, widthSegments, heightSegments, depthSegments) {
    var _this2;

    _classCallCheck(this, BoxBufferGeometry);

    _this2 = _super2.call(this);
    _this2.type = 'BoxBufferGeometry';
    _this2.parameters = {
      width: width,
      height: height,
      depth: depth,
      widthSegments: widthSegments,
      heightSegments: heightSegments,
      depthSegments: depthSegments
    };

    var scope = _assertThisInitialized(_this2); // segments


    widthSegments = Math.floor(widthSegments) || 1;
    heightSegments = Math.floor(heightSegments) || 1;
    depthSegments = Math.floor(depthSegments) || 1; // buffers

    var indices = [];
    var vertices = [];
    var normals = [];
    var uvs = []; // helper variables

    var numberOfVertices = 0;
    var groupStart = 0; // build each side of the box geometry

    buildPlane('z', 'y', 'x', -1, -1, depth, height, width, depthSegments, heightSegments, 0); // px

    buildPlane('z', 'y', 'x', 1, -1, depth, height, -width, depthSegments, heightSegments, 1); // nx

    buildPlane('x', 'z', 'y', 1, 1, width, depth, height, widthSegments, depthSegments, 2); // py

    buildPlane('x', 'z', 'y', 1, -1, width, depth, -height, widthSegments, depthSegments, 3); // ny

    buildPlane('x', 'y', 'z', 1, -1, width, height, depth, widthSegments, heightSegments, 4); // pz

    buildPlane('x', 'y', 'z', -1, -1, width, height, -depth, widthSegments, heightSegments, 5); // nz
    // build geometry

    _this2.setIndex(indices);

    _this2.addAttribute('position', new Float32BufferAttribute(vertices, 3));

    _this2.addAttribute('normal', new Float32BufferAttribute(normals, 3));

    _this2.addAttribute('uv', new Float32BufferAttribute(uvs, 2));

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
      var vector = new Vector3(); // generate vertices, normals and uvs

      for (iy = 0; iy < gridY1; iy++) {
        var y = iy * segmentHeight - heightHalf;

        for (ix = 0; ix < gridX1; ix++) {
          var x = ix * segmentWidth - widthHalf; // set values to correct vector component

          vector[u] = x * udir;
          vector[v] = y * vdir;
          vector[w] = depthHalf; // now apply vector to vertex buffer

          vertices.push(vector.x, vector.y, vector.z); // set values to correct vector component

          vector[u] = 0;
          vector[v] = 0;
          vector[w] = depth > 0 ? 1 : -1; // now apply vector to normal buffer

          normals.push(vector.x, vector.y, vector.z); // uvs

          uvs.push(ix / gridX);
          uvs.push(1 - iy / gridY); // counters

          vertexCounter += 1;
        }
      } // indices
      // 1. you need three indices to draw a single face
      // 2. a single segment consists of two faces
      // 3. so we need to generate six (2*3) indices per segment


      for (iy = 0; iy < gridY; iy++) {
        for (ix = 0; ix < gridX; ix++) {
          var a = numberOfVertices + ix + gridX1 * iy;
          var b = numberOfVertices + ix + gridX1 * (iy + 1);
          var c = numberOfVertices + (ix + 1) + gridX1 * (iy + 1);
          var d = numberOfVertices + (ix + 1) + gridX1 * iy; // faces

          indices.push(a, b, d);
          indices.push(b, c, d); // increase counter

          groupCount += 6;
        }
      } // add a group to the geometry. this will ensure multi material support


      scope.addGroup(groupStart, groupCount, materialIndex); // calculate new start value for groups

      groupStart += groupCount; // update total number of vertices

      numberOfVertices += vertexCounter;
    }

    return _this2;
  }

  return BoxBufferGeometry;
}(BufferGeometry);

var SphereGeometry = /*#__PURE__*/function (_Geometry) {
  _inherits(SphereGeometry, _Geometry);

  var _super = _createSuper(SphereGeometry);

  function SphereGeometry(radius, widthSegments, heightSegments, phiStart, phiLength, thetaStart, thetaLength) {
    var _this;

    _classCallCheck(this, SphereGeometry);

    _this = _super.call(this);
    _this.type = 'SphereGeometry';
    _this.parameters = {
      radius: radius,
      widthSegments: widthSegments,
      heightSegments: heightSegments,
      phiStart: phiStart,
      phiLength: phiLength,
      thetaStart: thetaStart,
      thetaLength: thetaLength
    };

    _this.fromBufferGeometry(new SphereBufferGeometry(radius, widthSegments, heightSegments, phiStart, phiLength, thetaStart, thetaLength));

    _this.mergeVertices();

    return _this;
  }

  return SphereGeometry;
}(Geometry); // SphereBufferGeometry


var SphereBufferGeometry = /*#__PURE__*/function (_BufferGeometry) {
  _inherits(SphereBufferGeometry, _BufferGeometry);

  var _super2 = _createSuper(SphereBufferGeometry);

  function SphereBufferGeometry(radius, widthSegments, heightSegments, phiStart, phiLength, thetaStart, thetaLength) {
    var _this2;

    _classCallCheck(this, SphereBufferGeometry);

    _this2 = _super2.call(this);
    _this2.type = 'SphereBufferGeometry';
    _this2.parameters = {
      radius: radius,
      widthSegments: widthSegments,
      heightSegments: heightSegments,
      phiStart: phiStart,
      phiLength: phiLength,
      thetaStart: thetaStart,
      thetaLength: thetaLength
    };
    radius = radius || 50;
    widthSegments = Math.max(3, Math.floor(widthSegments) || 8);
    heightSegments = Math.max(2, Math.floor(heightSegments) || 6);
    phiStart = phiStart !== undefined ? phiStart : 0;
    phiLength = phiLength !== undefined ? phiLength : Math.PI * 2;
    thetaStart = thetaStart !== undefined ? thetaStart : 0;
    thetaLength = thetaLength !== undefined ? thetaLength : Math.PI;
    var thetaEnd = thetaStart + thetaLength;
    var ix, iy;
    var index = 0;
    var grid = [];
    var vertex = new Vector3();
    var normal = new Vector3(); // buffers

    var indices = [];
    var vertices = [];
    var normals = [];
    var uvs = []; // generate vertices, normals and uvs

    for (iy = 0; iy <= heightSegments; iy++) {
      var verticesRow = [];
      var v = iy / heightSegments;

      for (ix = 0; ix <= widthSegments; ix++) {
        var u = ix / widthSegments; // vertex

        vertex.x = -radius * Math.cos(phiStart + u * phiLength) * Math.sin(thetaStart + v * thetaLength);
        vertex.y = radius * Math.cos(thetaStart + v * thetaLength);
        vertex.z = radius * Math.sin(phiStart + u * phiLength) * Math.sin(thetaStart + v * thetaLength);
        vertices.push(vertex.x, vertex.y, vertex.z); // normal

        normal.set(vertex.x, vertex.y, vertex.z).normalize();
        normals.push(normal.x, normal.y, normal.z); // uv

        uvs.push(u, 1 - v);
        verticesRow.push(index++);
      }

      grid.push(verticesRow);
    } // indices


    for (iy = 0; iy < heightSegments; iy++) {
      for (ix = 0; ix < widthSegments; ix++) {
        var a = grid[iy][ix + 1];
        var b = grid[iy][ix];
        var c = grid[iy + 1][ix];
        var d = grid[iy + 1][ix + 1];
        if (iy !== 0 || thetaStart > 0) indices.push(a, b, d);
        if (iy !== heightSegments - 1 || thetaEnd < Math.PI) indices.push(b, c, d);
      }
    } // build geometry


    _this2.setIndex(indices);

    _this2.addAttribute('position', new Float32BufferAttribute(vertices, 3));

    _this2.addAttribute('normal', new Float32BufferAttribute(normals, 3));

    _this2.addAttribute('uv', new Float32BufferAttribute(uvs, 2));

    return _this2;
  }

  return SphereBufferGeometry;
}(BufferGeometry);

var CylinderGeometry = /*#__PURE__*/function (_Geometry) {
  _inherits(CylinderGeometry, _Geometry);

  var _super = _createSuper(CylinderGeometry);

  function CylinderGeometry(radiusTop, radiusBottom, height, radialSegments, heightSegments, openEnded, thetaStart, thetaLength) {
    var _this;

    _classCallCheck(this, CylinderGeometry);

    _this = _super.call(this);
    _this.type = 'CylinderGeometry';
    _this.parameters = {
      radiusTop: radiusTop,
      radiusBottom: radiusBottom,
      height: height,
      radialSegments: radialSegments,
      heightSegments: heightSegments,
      openEnded: openEnded,
      thetaStart: thetaStart,
      thetaLength: thetaLength
    };

    _this.fromBufferGeometry(new CylinderBufferGeometry(radiusTop, radiusBottom, height, radialSegments, heightSegments, openEnded, thetaStart, thetaLength));

    _this.mergeVertices();

    return _this;
  }

  return CylinderGeometry;
}(Geometry); // CylinderBufferGeometry


var CylinderBufferGeometry = /*#__PURE__*/function (_BufferGeometry) {
  _inherits(CylinderBufferGeometry, _BufferGeometry);

  var _super2 = _createSuper(CylinderBufferGeometry);

  function CylinderBufferGeometry(radiusTop, radiusBottom, height, radialSegments, heightSegments, openEnded, thetaStart, thetaLength) {
    var _this2;

    _classCallCheck(this, CylinderBufferGeometry);

    _this2 = _super2.call(this);
    _this2.type = 'CylinderBufferGeometry';
    _this2.parameters = {
      radiusTop: radiusTop,
      radiusBottom: radiusBottom,
      height: height,
      radialSegments: radialSegments,
      heightSegments: heightSegments,
      openEnded: openEnded,
      thetaStart: thetaStart,
      thetaLength: thetaLength
    };

    var scope = _assertThisInitialized(_this2);

    radiusTop = radiusTop !== undefined ? radiusTop : 20;
    radiusBottom = radiusBottom !== undefined ? radiusBottom : 20;
    height = height !== undefined ? height : 100;
    radialSegments = Math.floor(radialSegments) || 8;
    heightSegments = Math.floor(heightSegments) || 1;
    openEnded = openEnded !== undefined ? openEnded : false;
    thetaStart = thetaStart !== undefined ? thetaStart : 0.0;
    thetaLength = thetaLength !== undefined ? thetaLength : 2.0 * Math.PI; // buffers

    var indices = [];
    var vertices = [];
    var normals = [];
    var uvs = []; // helper variables

    var index = 0;
    var indexArray = [];
    var halfHeight = height / 2;
    var groupStart = 0; // generate geometry

    generateTorso();

    if (openEnded === false) {
      if (radiusTop > 0) generateCap(true);
      if (radiusBottom > 0) generateCap(false);
    } // build geometry


    _this2.setIndex(indices);

    _this2.addAttribute('position', new Float32BufferAttribute(vertices, 3));

    _this2.addAttribute('normal', new Float32BufferAttribute(normals, 3));

    _this2.addAttribute('uv', new Float32BufferAttribute(uvs, 2));

    function generateTorso() {
      var x, y;
      var normal = new Vector3();
      var vertex = new Vector3();
      var groupCount = 0; // this will be used to calculate the normal

      var slope = (radiusBottom - radiusTop) / height; // generate vertices, normals and uvs

      for (y = 0; y <= heightSegments; y++) {
        var indexRow = [];
        var v = y / heightSegments; // calculate the radius of the current row

        var radius = v * (radiusBottom - radiusTop) + radiusTop;

        for (x = 0; x <= radialSegments; x++) {
          var u = x / radialSegments;
          var theta = u * thetaLength + thetaStart;
          var sinTheta = Math.sin(theta);
          var cosTheta = Math.cos(theta); // vertex

          vertex.x = radius * sinTheta;
          vertex.y = -v * height + halfHeight;
          vertex.z = radius * cosTheta;
          vertices.push(vertex.x, vertex.y, vertex.z); // normal

          normal.set(sinTheta, slope, cosTheta).normalize();
          normals.push(normal.x, normal.y, normal.z); // uv

          uvs.push(u, 1 - v); // save index of vertex in respective row

          indexRow.push(index++);
        } // now save vertices of the row in our index array


        indexArray.push(indexRow);
      } // generate indices


      for (x = 0; x < radialSegments; x++) {
        for (y = 0; y < heightSegments; y++) {
          // we use the index array to access the correct indices
          var a = indexArray[y][x];
          var b = indexArray[y + 1][x];
          var c = indexArray[y + 1][x + 1];
          var d = indexArray[y][x + 1]; // faces

          indices.push(a, b, d);
          indices.push(b, c, d); // update group counter

          groupCount += 6;
        }
      } // add a group to the geometry. this will ensure multi material support


      scope.addGroup(groupStart, groupCount, 0); // calculate new start value for groups

      groupStart += groupCount;
    }

    function generateCap(top) {
      var x, centerIndexStart, centerIndexEnd;
      var uv = new Vector2();
      var vertex = new Vector3();
      var groupCount = 0;
      var radius = top === true ? radiusTop : radiusBottom;
      var sign = top === true ? 1 : -1; // save the index of the first center vertex

      centerIndexStart = index; // first we generate the center vertex data of the cap.
      // because the geometry needs one set of uvs per face,
      // we must generate a center vertex per face/segment

      for (x = 1; x <= radialSegments; x++) {
        // vertex
        vertices.push(0, halfHeight * sign, 0); // normal

        normals.push(0, sign, 0); // uv

        uvs.push(0.5, 0.5); // increase index

        index++;
      } // save the index of the last center vertex


      centerIndexEnd = index; // now we generate the surrounding vertices, normals and uvs

      for (x = 0; x <= radialSegments; x++) {
        var u = x / radialSegments;
        var theta = u * thetaLength + thetaStart;
        var cosTheta = Math.cos(theta);
        var sinTheta = Math.sin(theta); // vertex

        vertex.x = radius * sinTheta;
        vertex.y = halfHeight * sign;
        vertex.z = radius * cosTheta;
        vertices.push(vertex.x, vertex.y, vertex.z); // normal

        normals.push(0, sign, 0); // uv

        uv.x = cosTheta * 0.5 + 0.5;
        uv.y = sinTheta * 0.5 * sign + 0.5;
        uvs.push(uv.x, uv.y); // increase index

        index++;
      } // generate indices


      for (x = 0; x < radialSegments; x++) {
        var c = centerIndexStart + x;
        var i = centerIndexEnd + x;

        if (top === true) {
          // face top
          indices.push(i, i + 1, c);
        } else {
          // face bottom
          indices.push(i + 1, i, c);
        }

        groupCount += 3;
      } // add a group to the geometry. this will ensure multi material support


      scope.addGroup(groupStart, groupCount, top === true ? 1 : 2); // calculate new start value for groups

      groupStart += groupCount;
    }

    return _this2;
  }

  return CylinderBufferGeometry;
}(BufferGeometry);

var DoughnutGeometry = /*#__PURE__*/function (_Geometry) {
  _inherits(DoughnutGeometry, _Geometry);

  var _super = _createSuper(DoughnutGeometry);

  /**
   * 
   * @param {number} outterRadius 外径 
   * @param {number} height 高度 
   * @param {number} innerRadius 内径
   * @param {number} radialSegments 顶面拆分个数
   * @param {number} thetaStart 开始弧度
   * @param {number} thetaLength 结束弧度
   */
  function DoughnutGeometry(outterRadius, height) {
    var _this;

    var innerRadius = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var radialSegments = arguments.length > 3 ? arguments[3] : undefined;
    var thetaStart = arguments.length > 4 ? arguments[4] : undefined;
    var thetaLength = arguments.length > 5 ? arguments[5] : undefined;

    _classCallCheck(this, DoughnutGeometry);

    _this = _super.call(this);
    _this.type = 'DoughnutGeometry';
    _this.parameters = {
      outterRadius: outterRadius,
      height: height,
      innerRadius: innerRadius,
      radialSegments: radialSegments,
      thetaStart: thetaStart,
      thetaLength: thetaLength
    };

    _this.fromBufferGeometry(new DoughnutBufferGeometry(outterRadius, height, innerRadius, radialSegments, thetaStart, thetaLength));

    _this.mergeVertices();

    return _this;
  }

  return DoughnutGeometry;
}(Geometry); // DoughnutBufferGeometry


var DoughnutBufferGeometry = /*#__PURE__*/function (_BufferGeometry) {
  _inherits(DoughnutBufferGeometry, _BufferGeometry);

  var _super2 = _createSuper(DoughnutBufferGeometry);

  function DoughnutBufferGeometry(outterRadius, height) {
    var _this2;

    var innerRadius = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var radialSegments = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 32;
    var thetaStart = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
    var thetaLength = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 2.0 * Math.PI;

    _classCallCheck(this, DoughnutBufferGeometry);

    _this2 = _super2.call(this);
    _this2.type = 'DoughnutBufferGeometry';
    _this2.parameters = {
      outterRadius: outterRadius,
      height: height,
      innerRadius: innerRadius,
      radialSegments: radialSegments,
      thetaStart: thetaStart,
      thetaLength: thetaLength
    };

    var scope = _assertThisInitialized(_this2); // buffers


    var indices = [];
    var vertices = [];
    var normals = [];
    var uvs = []; // helper variables

    var index = 0;
    var indexArray = [];
    var halfHeight = height / 2;
    var groupStart = 0;
    thetaLength = Math.min(thetaLength, Math.PI * 2); // generate geometry

    generateTopBottom(outterRadius, innerRadius, height);
    generateOutterInnerFace(outterRadius, innerRadius, height);

    if (thetaLength !== Math.PI * 2) {
      generateLeftRightFace();
    } // build geometry


    _this2.setIndex(indices);

    _this2.addAttribute('position', new Float32BufferAttribute(vertices, 3)); //  this.addAttribute('normal', new Float32BufferAttribute(normals, 3));


    _this2.addAttribute('uv', new Float32BufferAttribute(uvs, 2));

    function generateTopBottom(outterRadius, innerRadius, height) {
      var groupCount = 0;
      var x, y;
      var normal = new Vector3();
      var vertex = new Vector3();
      var heightSegments = 1;

      for (y = 0; y <= heightSegments; y++) {
        var indexRow = [];
        var v = y / heightSegments;

        for (x = 0; x <= radialSegments; x++) {
          var u = x / radialSegments;
          var theta = u * thetaLength + thetaStart;
          var sinTheta = Math.sin(theta);
          var cosTheta = Math.cos(theta);

          if (innerRadius > 0) {
            vertex.x = innerRadius * sinTheta;
            vertex.y = -v * height + halfHeight;
            vertex.z = innerRadius * cosTheta;
            vertices.push(vertex.x, vertex.y, vertex.z);
            indexRow.push(index++);
            uvs.push(u, v);
            normal.set(0, -1, 0);
            normals.push(normal.x, normal.y, normal.z);
          } else {
            if (indexRow.length === 0) {
              indexRow.push(index++);
              var length = vertices.length;
              vertices[length] = 0;
              vertices[length + 1] = -v * height + halfHeight;
              vertices[length + 2] = 0; // uv

              var uvLen = uvs.length;
              uvs[uvLen] = 0.5;
              uvs[uvLen + 1] = 0; // // normal
              // if (y == heightSegments) {
              //     normal.set(0, 1, 0);
              // } else {

              normal.set(0, -1, 0); // }

              normals.push(normal.x, normal.y, normal.z);
            }
          } // vertex


          vertex.x = outterRadius * sinTheta;
          vertex.y = -v * height + halfHeight;
          vertex.z = outterRadius * cosTheta;
          vertices.push(vertex.x, vertex.y, vertex.z); // uv

          uvs.push(u, 1 - v); // normal
          // if (y == heightSegments) {
          //     normal.set(0, 1, 0);
          // } else {

          normal.set(0, -1, 0); //}

          normals.push(normal.x, normal.y, normal.z);
          indexRow.push(index++);
        } // now save vertices of the row in our index array


        indexArray.push(indexRow);
      } // top bottom indices


      for (y = 0; y <= heightSegments; y++) {
        groupCount = 0;

        for (x = 0; x < radialSegments; x++) {
          if (innerRadius > 0) {
            var a = indexArray[y][2 * x + 1];
            var b = indexArray[y][2 * x];
            var c = indexArray[y][2 * x + 2];
            var d = indexArray[y][2 * x + 3]; // faces

            indices.push(a, b, d);
            indices.push(b, c, d); // update group counter

            groupCount += 6;
          } else {
            var a = indexArray[y][x + 1];
            var b = indexArray[y][0];
            var c = indexArray[y][x + 2]; // faces

            indices.push(a, b, c);
            groupCount += 3;
          }
        } // add a group to the geometry. this will ensure multi material support


        scope.addGroup(groupStart, groupCount, 0); // calculate new start value for groups

        groupStart += groupCount;
      }
    }

    function generateOutterInnerFace(outterRadius, innerRadius, height) {
      var groupCount = 0;
      var x, y;
      var normal = new Vector3();
      var vertex = new Vector3();
      var heightSegments = 1;

      for (y = 0; y <= heightSegments; y++) {
        var indexRow = [];
        var v = y / heightSegments;

        for (x = 0; x <= radialSegments; x++) {
          var u = x / radialSegments;
          var theta = u * thetaLength + thetaStart;
          var sinTheta = Math.sin(theta);
          var cosTheta = Math.cos(theta);

          if (innerRadius > 0) {
            vertex.x = innerRadius * sinTheta;
            vertex.y = -v * height + halfHeight;
            vertex.z = innerRadius * cosTheta;
            vertices.push(vertex.x, vertex.y, vertex.z);
            indexRow.push(index++);
            uvs.push(u, v);
            normal.set(sinTheta, 0, cosTheta).normalize();
            normals.push(normal.x, normal.y, normal.z);
          } // vertex


          vertex.x = outterRadius * sinTheta;
          vertex.y = -v * height + halfHeight;
          vertex.z = outterRadius * cosTheta;
          vertices.push(vertex.x, vertex.y, vertex.z); // uv

          uvs.push(u, 1 - v); // normal
          // if (y == heightSegments) {
          //     normal.set(0, 1, 0);
          // } else {

          normal.set(sinTheta, 0, cosTheta).normalize(); //}

          normals.push(normal.x, normal.y, normal.z);
          indexRow.push(index++);
        } // now save vertices of the row in our index array


        indexArray.push(indexRow);
      } // outter inner indices
      //如果内径为0,内侧面就不需要绘制了


      var faceNum = innerRadius === 0 ? 0 : 1;
      var indexLen = indexArray.length - 2;
      var a, b, c, d;

      for (var t = 0; t <= faceNum; t++) {
        groupCount = 0;

        for (x = 0; x < radialSegments; x++) {
          if (t == 0) {
            if (faceNum === t) {
              a = indexArray[y][x];
              b = indexArray[y + 1][x];
              c = indexArray[y + 1][x + 1];
              d = indexArray[y][x + 1];
            } else {
              a = indexArray[indexLen][2 * x + 1];
              b = indexArray[indexLen + 1][2 * x + 1];
              c = indexArray[indexLen + 1][2 * x + 3];
              d = indexArray[indexLen][2 * x + 3];
            }
          } else {
            a = indexArray[indexLen][2 * x];
            b = indexArray[indexLen + 1][2 * x];
            c = indexArray[indexLen + 1][2 * x + 2];
            d = indexArray[indexLen][2 * x + 2];
          } // faces


          indices.push(a, b, d);
          indices.push(b, c, d); // update group counter

          groupCount += 6;
        } // add a group to the geometry. this will ensure multi material support


        scope.addGroup(groupStart, groupCount, 0); // calculate new start value for groups

        groupStart += groupCount;
      }
    }

    function generateLeftRightFace() {
      //left
      var a, b, c, d;
      a = indexArray[0][1];
      b = indexArray[1][1];
      c = indexArray[1][0];
      d = indexArray[0][0];

      function generateFace(a, b, c, d) {
        var groupCount = 0;
        var indexRow = [];
        var normal = new Vector3();
        [a, b, c, d].forEach(function (no, ind) {
          vertices.push(vertices[3 * no], vertices[3 * no + 1], vertices[3 * no + 2]); // uv

          uvs.push(ind < 2 ? 0 : 1, ind == 0 || ind == 3 ? 1 : 0);
          var vec1 = new Vector3(vertices[3 * d], vertices[3 * d + 1], vertices[3 * d + 2]);
          vec1.sub(new Vector3(vertices[3 * a], vertices[3 * a + 1], vertices[3 * a + 2]));
          var vec2 = new Vector3(0, -1, 0);
          normal = vec1.cross(vec2);
          normal.normalize();
          normals.push(normal.x, normal.y, normal.z);
          indexRow.push(index++);
        });
        indexArray.push(indexRow);
        a = indexRow[0];
        b = indexRow[1];
        c = indexRow[2];
        d = indexRow[3]; // faces

        indices.push(a, b, d);
        indices.push(b, c, d); // update group counter

        groupCount += 6;
        scope.addGroup(groupStart, groupCount, 0);
        groupStart += groupCount;
      }

      generateFace(a, b, c, d); //right

      var len = indexArray[0].length - 1;

      if (innerRadius > 0) {
        a = indexArray[0][len - 1];
        b = indexArray[1][len - 1];
        c = indexArray[1][len];
        d = indexArray[0][len];
      } else {
        a = indexArray[0][len];
        b = indexArray[1][len];
        c = indexArray[1][0];
        d = indexArray[0][0];
      }

      generateFace(a, b, c, d);
    }

    return _this2;
  }

  return DoughnutBufferGeometry;
}(BufferGeometry);

/**
 * @author Mugen87 / https://github.com/Mugen87
 * Port from https://github.com/mapbox/earcut (v2.1.2)
 */
var Earcut = {
  triangulate: function triangulate(data, holeIndices, dim) {
    dim = dim || 2;
    var hasHoles = holeIndices && holeIndices.length,
        outerLen = hasHoles ? holeIndices[0] * dim : data.length,
        outerNode = linkedList(data, 0, outerLen, dim, true),
        triangles = [];
    if (!outerNode) return triangles;
    var minX, minY, maxX, maxY, x, y, invSize;
    if (hasHoles) outerNode = eliminateHoles(data, holeIndices, outerNode, dim); // if the shape is not too simple, we'll use z-order curve hash later; calculate polygon bbox

    if (data.length > 80 * dim) {
      minX = maxX = data[0];
      minY = maxY = data[1];

      for (var i = dim; i < outerLen; i += dim) {
        x = data[i];
        y = data[i + 1];
        if (x < minX) minX = x;
        if (y < minY) minY = y;
        if (x > maxX) maxX = x;
        if (y > maxY) maxY = y;
      } // minX, minY and invSize are later used to transform coords into integers for z-order calculation


      invSize = Math.max(maxX - minX, maxY - minY);
      invSize = invSize !== 0 ? 1 / invSize : 0;
    }

    earcutLinked(outerNode, triangles, dim, minX, minY, invSize);
    return triangles;
  }
}; // create a circular doubly linked list from polygon points in the specified winding order

function linkedList(data, start, end, dim, clockwise) {
  var i, last;

  if (clockwise === signedArea(data, start, end, dim) > 0) {
    for (i = start; i < end; i += dim) {
      last = insertNode(i, data[i], data[i + 1], last);
    }
  } else {
    for (i = end - dim; i >= start; i -= dim) {
      last = insertNode(i, data[i], data[i + 1], last);
    }
  }

  if (last && equals(last, last.next)) {
    removeNode(last);
    last = last.next;
  }

  return last;
} // eliminate colinear or duplicate points


function filterPoints(start, end) {
  if (!start) return start;
  if (!end) end = start;
  var p = start,
      again;

  do {
    again = false;

    if (!p.steiner && (equals(p, p.next) || area(p.prev, p, p.next) === 0)) {
      removeNode(p);
      p = end = p.prev;
      if (p === p.next) break;
      again = true;
    } else {
      p = p.next;
    }
  } while (again || p !== end);

  return end;
} // main ear slicing loop which triangulates a polygon (given as a linked list)


function earcutLinked(ear, triangles, dim, minX, minY, invSize, pass) {
  if (!ear) return; // interlink polygon nodes in z-order

  if (!pass && invSize) indexCurve(ear, minX, minY, invSize);
  var stop = ear,
      prev,
      next; // iterate through ears, slicing them one by one

  while (ear.prev !== ear.next) {
    prev = ear.prev;
    next = ear.next;

    if (invSize ? isEarHashed(ear, minX, minY, invSize) : isEar(ear)) {
      // cut off the triangle
      triangles.push(prev.i / dim);
      triangles.push(ear.i / dim);
      triangles.push(next.i / dim);
      removeNode(ear); // skipping the next vertice leads to less sliver triangles

      ear = next.next;
      stop = next.next;
      continue;
    }

    ear = next; // if we looped through the whole remaining polygon and can't find any more ears

    if (ear === stop) {
      // try filtering points and slicing again
      if (!pass) {
        earcutLinked(filterPoints(ear), triangles, dim, minX, minY, invSize, 1); // if this didn't work, try curing all small self-intersections locally
      } else if (pass === 1) {
        ear = cureLocalIntersections(ear, triangles, dim);
        earcutLinked(ear, triangles, dim, minX, minY, invSize, 2); // as a last resort, try splitting the remaining polygon into two
      } else if (pass === 2) {
        splitEarcut(ear, triangles, dim, minX, minY, invSize);
      }

      break;
    }
  }
} // check whether a polygon node forms a valid ear with adjacent nodes


function isEar(ear) {
  var a = ear.prev,
      b = ear,
      c = ear.next;
  if (area(a, b, c) >= 0) return false; // reflex, can't be an ear
  // now make sure we don't have other points inside the potential ear

  var p = ear.next.next;

  while (p !== ear.prev) {
    if (pointInTriangle(a.x, a.y, b.x, b.y, c.x, c.y, p.x, p.y) && area(p.prev, p, p.next) >= 0) {
      return false;
    }

    p = p.next;
  }

  return true;
}

function isEarHashed(ear, minX, minY, invSize) {
  var a = ear.prev,
      b = ear,
      c = ear.next;
  if (area(a, b, c) >= 0) return false; // reflex, can't be an ear
  // triangle bbox; min & max are calculated like this for speed

  var minTX = a.x < b.x ? a.x < c.x ? a.x : c.x : b.x < c.x ? b.x : c.x,
      minTY = a.y < b.y ? a.y < c.y ? a.y : c.y : b.y < c.y ? b.y : c.y,
      maxTX = a.x > b.x ? a.x > c.x ? a.x : c.x : b.x > c.x ? b.x : c.x,
      maxTY = a.y > b.y ? a.y > c.y ? a.y : c.y : b.y > c.y ? b.y : c.y; // z-order range for the current triangle bbox;

  var minZ = zOrder(minTX, minTY, minX, minY, invSize),
      maxZ = zOrder(maxTX, maxTY, minX, minY, invSize); // first look for points inside the triangle in increasing z-order

  var p = ear.nextZ;

  while (p && p.z <= maxZ) {
    if (p !== ear.prev && p !== ear.next && pointInTriangle(a.x, a.y, b.x, b.y, c.x, c.y, p.x, p.y) && area(p.prev, p, p.next) >= 0) return false;
    p = p.nextZ;
  } // then look for points in decreasing z-order


  p = ear.prevZ;

  while (p && p.z >= minZ) {
    if (p !== ear.prev && p !== ear.next && pointInTriangle(a.x, a.y, b.x, b.y, c.x, c.y, p.x, p.y) && area(p.prev, p, p.next) >= 0) return false;
    p = p.prevZ;
  }

  return true;
} // go through all polygon nodes and cure small local self-intersections


function cureLocalIntersections(start, triangles, dim) {
  var p = start;

  do {
    var a = p.prev,
        b = p.next.next;

    if (!equals(a, b) && intersects(a, p, p.next, b) && locallyInside(a, b) && locallyInside(b, a)) {
      triangles.push(a.i / dim);
      triangles.push(p.i / dim);
      triangles.push(b.i / dim); // remove two nodes involved

      removeNode(p);
      removeNode(p.next);
      p = start = b;
    }

    p = p.next;
  } while (p !== start);

  return p;
} // try splitting polygon into two and triangulate them independently


function splitEarcut(start, triangles, dim, minX, minY, invSize) {
  // look for a valid diagonal that divides the polygon into two
  var a = start;

  do {
    var b = a.next.next;

    while (b !== a.prev) {
      if (a.i !== b.i && isValidDiagonal(a, b)) {
        // split the polygon in two by the diagonal
        var c = splitPolygon(a, b); // filter colinear points around the cuts

        a = filterPoints(a, a.next);
        c = filterPoints(c, c.next); // run earcut on each half

        earcutLinked(a, triangles, dim, minX, minY, invSize);
        earcutLinked(c, triangles, dim, minX, minY, invSize);
        return;
      }

      b = b.next;
    }

    a = a.next;
  } while (a !== start);
} // link every hole into the outer loop, producing a single-ring polygon without holes


function eliminateHoles(data, holeIndices, outerNode, dim) {
  var queue = [],
      i,
      len,
      start,
      end,
      list;

  for (i = 0, len = holeIndices.length; i < len; i++) {
    start = holeIndices[i] * dim;
    end = i < len - 1 ? holeIndices[i + 1] * dim : data.length;
    list = linkedList(data, start, end, dim, false);
    if (list === list.next) list.steiner = true;
    queue.push(getLeftmost(list));
  }

  queue.sort(compareX); // process holes from left to right

  for (i = 0; i < queue.length; i++) {
    eliminateHole(queue[i], outerNode);
    outerNode = filterPoints(outerNode, outerNode.next);
  }

  return outerNode;
}

function compareX(a, b) {
  return a.x - b.x;
} // find a bridge between vertices that connects hole with an outer ring and and link it


function eliminateHole(hole, outerNode) {
  outerNode = findHoleBridge(hole, outerNode);

  if (outerNode) {
    var b = splitPolygon(outerNode, hole);
    filterPoints(b, b.next);
  }
} // David Eberly's algorithm for finding a bridge between hole and outer polygon


function findHoleBridge(hole, outerNode) {
  var p = outerNode,
      hx = hole.x,
      hy = hole.y,
      qx = -Infinity,
      m; // find a segment intersected by a ray from the hole's leftmost point to the left;
  // segment's endpoint with lesser x will be potential connection point

  do {
    if (hy <= p.y && hy >= p.next.y && p.next.y !== p.y) {
      var x = p.x + (hy - p.y) * (p.next.x - p.x) / (p.next.y - p.y);

      if (x <= hx && x > qx) {
        qx = x;

        if (x === hx) {
          if (hy === p.y) return p;
          if (hy === p.next.y) return p.next;
        }

        m = p.x < p.next.x ? p : p.next;
      }
    }

    p = p.next;
  } while (p !== outerNode);

  if (!m) return null;
  if (hx === qx) return m.prev; // hole touches outer segment; pick lower endpoint
  // look for points inside the triangle of hole point, segment intersection and endpoint;
  // if there are no points found, we have a valid connection;
  // otherwise choose the point of the minimum angle with the ray as connection point

  var stop = m,
      mx = m.x,
      my = m.y,
      tanMin = Infinity,
      tan;
  p = m.next;

  while (p !== stop) {
    if (hx >= p.x && p.x >= mx && hx !== p.x && pointInTriangle(hy < my ? hx : qx, hy, mx, my, hy < my ? qx : hx, hy, p.x, p.y)) {
      tan = Math.abs(hy - p.y) / (hx - p.x); // tangential

      if ((tan < tanMin || tan === tanMin && p.x > m.x) && locallyInside(p, hole)) {
        m = p;
        tanMin = tan;
      }
    }

    p = p.next;
  }

  return m;
} // interlink polygon nodes in z-order


function indexCurve(start, minX, minY, invSize) {
  var p = start;

  do {
    if (p.z === null) p.z = zOrder(p.x, p.y, minX, minY, invSize);
    p.prevZ = p.prev;
    p.nextZ = p.next;
    p = p.next;
  } while (p !== start);

  p.prevZ.nextZ = null;
  p.prevZ = null;
  sortLinked(p);
} // Simon Tatham's linked list merge sort algorithm
// http://www.chiark.greenend.org.uk/~sgtatham/algorithms/listsort.html


function sortLinked(list) {
  var i,
      p,
      q,
      e,
      tail,
      numMerges,
      pSize,
      qSize,
      inSize = 1;

  do {
    p = list;
    list = null;
    tail = null;
    numMerges = 0;

    while (p) {
      numMerges++;
      q = p;
      pSize = 0;

      for (i = 0; i < inSize; i++) {
        pSize++;
        q = q.nextZ;
        if (!q) break;
      }

      qSize = inSize;

      while (pSize > 0 || qSize > 0 && q) {
        if (pSize !== 0 && (qSize === 0 || !q || p.z <= q.z)) {
          e = p;
          p = p.nextZ;
          pSize--;
        } else {
          e = q;
          q = q.nextZ;
          qSize--;
        }

        if (tail) tail.nextZ = e;else list = e;
        e.prevZ = tail;
        tail = e;
      }

      p = q;
    }

    tail.nextZ = null;
    inSize *= 2;
  } while (numMerges > 1);

  return list;
} // z-order of a point given coords and inverse of the longer side of data bbox


function zOrder(x, y, minX, minY, invSize) {
  // coords are transformed into non-negative 15-bit integer range
  x = 32767 * (x - minX) * invSize;
  y = 32767 * (y - minY) * invSize;
  x = (x | x << 8) & 0x00FF00FF;
  x = (x | x << 4) & 0x0F0F0F0F;
  x = (x | x << 2) & 0x33333333;
  x = (x | x << 1) & 0x55555555;
  y = (y | y << 8) & 0x00FF00FF;
  y = (y | y << 4) & 0x0F0F0F0F;
  y = (y | y << 2) & 0x33333333;
  y = (y | y << 1) & 0x55555555;
  return x | y << 1;
} // find the leftmost node of a polygon ring


function getLeftmost(start) {
  var p = start,
      leftmost = start;

  do {
    if (p.x < leftmost.x) leftmost = p;
    p = p.next;
  } while (p !== start);

  return leftmost;
} // check if a point lies within a convex triangle


function pointInTriangle(ax, ay, bx, by, cx, cy, px, py) {
  return (cx - px) * (ay - py) - (ax - px) * (cy - py) >= 0 && (ax - px) * (by - py) - (bx - px) * (ay - py) >= 0 && (bx - px) * (cy - py) - (cx - px) * (by - py) >= 0;
} // check if a diagonal between two polygon nodes is valid (lies in polygon interior)


function isValidDiagonal(a, b) {
  return a.next.i !== b.i && a.prev.i !== b.i && !intersectsPolygon(a, b) && locallyInside(a, b) && locallyInside(b, a) && middleInside(a, b);
} // signed area of a triangle


function area(p, q, r) {
  return (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);
} // check if two points are equal


function equals(p1, p2) {
  return p1.x === p2.x && p1.y === p2.y;
} // check if two segments intersect


function intersects(p1, q1, p2, q2) {
  if (equals(p1, q1) && equals(p2, q2) || equals(p1, q2) && equals(p2, q1)) return true;
  return area(p1, q1, p2) > 0 !== area(p1, q1, q2) > 0 && area(p2, q2, p1) > 0 !== area(p2, q2, q1) > 0;
} // check if a polygon diagonal intersects any polygon segments


function intersectsPolygon(a, b) {
  var p = a;

  do {
    if (p.i !== a.i && p.next.i !== a.i && p.i !== b.i && p.next.i !== b.i && intersects(p, p.next, a, b)) {
      return true;
    }

    p = p.next;
  } while (p !== a);

  return false;
} // check if a polygon diagonal is locally inside the polygon


function locallyInside(a, b) {
  return area(a.prev, a, a.next) < 0 ? area(a, b, a.next) >= 0 && area(a, a.prev, b) >= 0 : area(a, b, a.prev) < 0 || area(a, a.next, b) < 0;
} // check if the middle point of a polygon diagonal is inside the polygon


function middleInside(a, b) {
  var p = a,
      inside = false,
      px = (a.x + b.x) / 2,
      py = (a.y + b.y) / 2;

  do {
    if (p.y > py !== p.next.y > py && p.next.y !== p.y && px < (p.next.x - p.x) * (py - p.y) / (p.next.y - p.y) + p.x) {
      inside = !inside;
    }

    p = p.next;
  } while (p !== a);

  return inside;
} // link two polygon vertices with a bridge; if the vertices belong to the same ring, it splits polygon into two;
// if one belongs to the outer ring and another to a hole, it merges it into a single ring


function splitPolygon(a, b) {
  var a2 = new Node(a.i, a.x, a.y),
      b2 = new Node(b.i, b.x, b.y),
      an = a.next,
      bp = b.prev;
  a.next = b;
  b.prev = a;
  a2.next = an;
  an.prev = a2;
  b2.next = a2;
  a2.prev = b2;
  bp.next = b2;
  b2.prev = bp;
  return b2;
} // create a node and optionally link it with previous one (in a circular doubly linked list)


function insertNode(i, x, y, last) {
  var p = new Node(i, x, y);

  if (!last) {
    p.prev = p;
    p.next = p;
  } else {
    p.next = last.next;
    p.prev = last;
    last.next.prev = p;
    last.next = p;
  }

  return p;
}

function removeNode(p) {
  p.next.prev = p.prev;
  p.prev.next = p.next;
  if (p.prevZ) p.prevZ.nextZ = p.nextZ;
  if (p.nextZ) p.nextZ.prevZ = p.prevZ;
}

function Node(i, x, y) {
  // vertice index in coordinates array
  this.i = i; // vertex coordinates

  this.x = x;
  this.y = y; // previous and next vertice nodes in a polygon ring

  this.prev = null;
  this.next = null; // z-order curve value

  this.z = null; // previous and next nodes in z-order

  this.prevZ = null;
  this.nextZ = null; // indicates whether this is a steiner point

  this.steiner = false;
}

function signedArea(data, start, end, dim) {
  var sum = 0;

  for (var i = start, j = end - dim; i < end; i += dim) {
    sum += (data[j] - data[i]) * (data[i + 1] + data[j + 1]);
    j = i;
  }

  return sum;
}

/**
 * @author zz85 / http://www.lab4games.net/zz85/blog
 */
var ShapeUtils = {
  // calculate area of the contour polygon
  area: function area(contour) {
    var n = contour.length;
    var a = 0.0;

    for (var p = n - 1, q = 0; q < n; p = q++) {
      a += contour[p].x * contour[q].y - contour[q].x * contour[p].y;
    }

    return a * 0.5;
  },
  isClockWise: function isClockWise(pts) {
    return ShapeUtils.area(pts) < 0;
  },
  triangulateShape: function triangulateShape(contour, holes) {
    var vertices = []; // flat array of vertices like [ x0,y0, x1,y1, x2,y2, ... ]

    var holeIndices = []; // array of hole indices

    var faces = []; // final array of vertex indices like [ [ a,b,d ], [ b,c,d ] ]

    removeDupEndPts(contour);
    addContour(vertices, contour); //

    var holeIndex = contour.length;
    holes.forEach(removeDupEndPts);

    for (var i = 0; i < holes.length; i++) {
      holeIndices.push(holeIndex);
      holeIndex += holes[i].length;
      addContour(vertices, holes[i]);
    } //


    var triangles = Earcut.triangulate(vertices, holeIndices); //

    for (var i = 0; i < triangles.length; i += 3) {
      faces.push(triangles.slice(i, i + 3));
    }

    return faces;
  }
};

function removeDupEndPts(points) {
  var l = points.length;

  if (l > 2 && points[l - 1].equals(points[0])) {
    points.pop();
  }
}

function addContour(vertices, contour) {
  for (var i = 0; i < contour.length; i++) {
    vertices.push(contour[i].x);
    vertices.push(contour[i].y);
  }
}

var ExtrudeGeometry = /*#__PURE__*/function (_Geometry) {
  _inherits(ExtrudeGeometry, _Geometry);

  var _super = _createSuper(ExtrudeGeometry);

  function ExtrudeGeometry(shapes, options) {
    var _this;

    _classCallCheck(this, ExtrudeGeometry);

    _this = _super.call(this);
    _this.type = 'ExtrudeGeometry';
    _this.parameters = {
      shapes: shapes,
      options: options
    };

    _this.fromBufferGeometry(new ExtrudeBufferGeometry(shapes, options));

    _this.mergeVertices();

    return _this;
  }

  return ExtrudeGeometry;
}(Geometry); // ExtrudeBufferGeometry


var ExtrudeBufferGeometry = /*#__PURE__*/function (_BufferGeometry) {
  _inherits(ExtrudeBufferGeometry, _BufferGeometry);

  var _super2 = _createSuper(ExtrudeBufferGeometry);

  function ExtrudeBufferGeometry(shapes, options) {
    var _this2;

    _classCallCheck(this, ExtrudeBufferGeometry);

    _this2 = _super2.call(this);
    _this2.type = 'ExtrudeBufferGeometry';
    _this2.parameters = {
      shapes: shapes,
      options: options
    };
    shapes = Array.isArray(shapes) ? shapes : [shapes];

    var scope = _assertThisInitialized(_this2);

    var verticesArray = [];
    var uvArray = [];

    for (var i = 0, l = shapes.length; i < l; i++) {
      var shape = shapes[i];
      addShape(shape);
    } // build geometry


    _this2.addAttribute('position', new Float32BufferAttribute(verticesArray, 3));

    _this2.addAttribute('uv', new Float32BufferAttribute(uvArray, 2));

    _this2.computeVertexNormals(); // functions


    function addShape(shape) {
      var placeholder = []; // options

      var curveSegments = options.curveSegments !== undefined ? options.curveSegments : 12;
      var steps = options.steps !== undefined ? options.steps : 1;
      var depth = options.depth !== undefined ? options.depth : 100;
      var bevelEnabled = options.bevelEnabled !== undefined ? options.bevelEnabled : true;
      var bevelThickness = options.bevelThickness !== undefined ? options.bevelThickness : 6;
      var bevelSize = options.bevelSize !== undefined ? options.bevelSize : bevelThickness - 2;
      var bevelSegments = options.bevelSegments !== undefined ? options.bevelSegments : 3;
      var extrudePath = options.extrudePath;
      var uvgen = options.UVGenerator !== undefined ? options.UVGenerator : WorldUVGenerator; // deprecated options

      if (options.amount !== undefined) {
        console.warn('THREE.ExtrudeBufferGeometry: amount has been renamed to depth.');
        depth = options.amount;
      } //


      var extrudePts,
          extrudeByPath = false;
      var splineTube, binormal, normal, position2;

      if (extrudePath) {
        extrudePts = extrudePath.getSpacedPoints(steps);
        extrudeByPath = true;
        bevelEnabled = false; // bevels not supported for path extrusion
        // SETUP TNB variables
        // TODO1 - have a .isClosed in spline?

        splineTube = extrudePath.computeFrenetFrames(steps, false); // console.log(splineTube, 'splineTube', splineTube.normals.length, 'steps', steps, 'extrudePts', extrudePts.length);

        binormal = new Vector3();
        normal = new Vector3();
        position2 = new Vector3();
      } // Safeguards if bevels are not enabled


      if (!bevelEnabled) {
        bevelSegments = 0;
        bevelThickness = 0;
        bevelSize = 0;
      } // Variables initialization


      var ahole, h, hl; // looping of holes

      var shapePoints = shape.extractPoints(curveSegments);
      var vertices = shapePoints.shape;
      var holes = shapePoints.holes;
      var reverse = !ShapeUtils.isClockWise(vertices);

      if (reverse) {
        vertices = vertices.reverse(); // Maybe we should also check if holes are in the opposite direction, just to be safe ...

        for (h = 0, hl = holes.length; h < hl; h++) {
          ahole = holes[h];

          if (ShapeUtils.isClockWise(ahole)) {
            holes[h] = ahole.reverse();
          }
        }
      }

      var faces = ShapeUtils.triangulateShape(vertices, holes);
      /* Vertices */

      var contour = vertices; // vertices has all points but contour has only points of circumference

      for (h = 0, hl = holes.length; h < hl; h++) {
        ahole = holes[h];
        vertices = vertices.concat(ahole);
      }

      function scalePt2(pt, vec, size) {
        if (!vec) console.error("THREE.ExtrudeGeometry: vec does not exist");
        return vec.clone().multiplyScalar(size).add(pt);
      }

      var b,
          bs,
          t,
          z,
          vert,
          vlen = vertices.length,
          face,
          flen = faces.length; // Find directions for point movement

      function getBevelVec(inPt, inPrev, inNext) {
        // computes for inPt the corresponding point inPt' on a new contour
        //   shifted by 1 unit (length of normalized vector) to the left
        // if we walk along contour clockwise, this new contour is outside the old one
        //
        // inPt' is the intersection of the two lines parallel to the two
        //  adjacent edges of inPt at a distance of 1 unit on the left side.
        var v_trans_x, v_trans_y, shrink_by; // resulting translation vector for inPt
        // good reading for geometry algorithms (here: line-line intersection)
        // http://geomalgorithms.com/a05-_intersect-1.html

        var v_prev_x = inPt.x - inPrev.x,
            v_prev_y = inPt.y - inPrev.y;
        var v_next_x = inNext.x - inPt.x,
            v_next_y = inNext.y - inPt.y;
        var v_prev_lensq = v_prev_x * v_prev_x + v_prev_y * v_prev_y; // check for collinear edges

        var collinear0 = v_prev_x * v_next_y - v_prev_y * v_next_x;

        if (Math.abs(collinear0) > Number.EPSILON) {
          // not collinear
          // length of vectors for normalizing
          var v_prev_len = Math.sqrt(v_prev_lensq);
          var v_next_len = Math.sqrt(v_next_x * v_next_x + v_next_y * v_next_y); // shift adjacent points by unit vectors to the left

          var ptPrevShift_x = inPrev.x - v_prev_y / v_prev_len;
          var ptPrevShift_y = inPrev.y + v_prev_x / v_prev_len;
          var ptNextShift_x = inNext.x - v_next_y / v_next_len;
          var ptNextShift_y = inNext.y + v_next_x / v_next_len; // scaling factor for v_prev to intersection point

          var sf = ((ptNextShift_x - ptPrevShift_x) * v_next_y - (ptNextShift_y - ptPrevShift_y) * v_next_x) / (v_prev_x * v_next_y - v_prev_y * v_next_x); // vector from inPt to intersection point

          v_trans_x = ptPrevShift_x + v_prev_x * sf - inPt.x;
          v_trans_y = ptPrevShift_y + v_prev_y * sf - inPt.y; // Don't normalize!, otherwise sharp corners become ugly
          //  but prevent crazy spikes

          var v_trans_lensq = v_trans_x * v_trans_x + v_trans_y * v_trans_y;

          if (v_trans_lensq <= 2) {
            return new Vector2(v_trans_x, v_trans_y);
          } else {
            shrink_by = Math.sqrt(v_trans_lensq / 2);
          }
        } else {
          // handle special case of collinear edges
          var direction_eq = false; // assumes: opposite

          if (v_prev_x > Number.EPSILON) {
            if (v_next_x > Number.EPSILON) {
              direction_eq = true;
            }
          } else {
            if (v_prev_x < -Number.EPSILON) {
              if (v_next_x < -Number.EPSILON) {
                direction_eq = true;
              }
            } else {
              if (Math.sign(v_prev_y) === Math.sign(v_next_y)) {
                direction_eq = true;
              }
            }
          }

          if (direction_eq) {
            // console.log("Warning: lines are a straight sequence");
            v_trans_x = -v_prev_y;
            v_trans_y = v_prev_x;
            shrink_by = Math.sqrt(v_prev_lensq);
          } else {
            // console.log("Warning: lines are a straight spike");
            v_trans_x = v_prev_x;
            v_trans_y = v_prev_y;
            shrink_by = Math.sqrt(v_prev_lensq / 2);
          }
        }

        return new Vector2(v_trans_x / shrink_by, v_trans_y / shrink_by);
      }

      var contourMovements = [];

      for (var i = 0, il = contour.length, j = il - 1, k = i + 1; i < il; i++, j++, k++) {
        if (j === il) j = 0;
        if (k === il) k = 0; //  (j)---(i)---(k)
        // console.log('i,j,k', i, j , k)

        contourMovements[i] = getBevelVec(contour[i], contour[j], contour[k]);
      }

      var holesMovements = [],
          oneHoleMovements,
          verticesMovements = contourMovements.concat();

      for (h = 0, hl = holes.length; h < hl; h++) {
        ahole = holes[h];
        oneHoleMovements = [];

        for (i = 0, il = ahole.length, j = il - 1, k = i + 1; i < il; i++, j++, k++) {
          if (j === il) j = 0;
          if (k === il) k = 0; //  (j)---(i)---(k)

          oneHoleMovements[i] = getBevelVec(ahole[i], ahole[j], ahole[k]);
        }

        holesMovements.push(oneHoleMovements);
        verticesMovements = verticesMovements.concat(oneHoleMovements);
      } // Loop bevelSegments, 1 for the front, 1 for the back


      for (b = 0; b < bevelSegments; b++) {
        //for ( b = bevelSegments; b > 0; b -- ) {
        t = b / bevelSegments;
        z = bevelThickness * Math.cos(t * Math.PI / 2);
        bs = bevelSize * Math.sin(t * Math.PI / 2); // contract shape

        for (i = 0, il = contour.length; i < il; i++) {
          vert = scalePt2(contour[i], contourMovements[i], bs);
          v(vert.x, vert.y, -z);
        } // expand holes


        for (h = 0, hl = holes.length; h < hl; h++) {
          ahole = holes[h];
          oneHoleMovements = holesMovements[h];

          for (i = 0, il = ahole.length; i < il; i++) {
            vert = scalePt2(ahole[i], oneHoleMovements[i], bs);
            v(vert.x, vert.y, -z);
          }
        }
      }

      bs = bevelSize; // Back facing vertices

      for (i = 0; i < vlen; i++) {
        vert = bevelEnabled ? scalePt2(vertices[i], verticesMovements[i], bs) : vertices[i];

        if (!extrudeByPath) {
          v(vert.x, vert.y, 0);
        } else {
          // v( vert.x, vert.y + extrudePts[ 0 ].y, extrudePts[ 0 ].x );
          normal.copy(splineTube.normals[0]).multiplyScalar(vert.x);
          binormal.copy(splineTube.binormals[0]).multiplyScalar(vert.y);
          position2.copy(extrudePts[0]).add(normal).add(binormal);
          v(position2.x, position2.y, position2.z);
        }
      } // Add stepped vertices...
      // Including front facing vertices


      var s;

      for (s = 1; s <= steps; s++) {
        for (i = 0; i < vlen; i++) {
          vert = bevelEnabled ? scalePt2(vertices[i], verticesMovements[i], bs) : vertices[i];

          if (!extrudeByPath) {
            v(vert.x, vert.y, depth / steps * s);
          } else {
            // v( vert.x, vert.y + extrudePts[ s - 1 ].y, extrudePts[ s - 1 ].x );
            normal.copy(splineTube.normals[s]).multiplyScalar(vert.x);
            binormal.copy(splineTube.binormals[s]).multiplyScalar(vert.y);
            position2.copy(extrudePts[s]).add(normal).add(binormal);
            v(position2.x, position2.y, position2.z);
          }
        }
      } // Add bevel segments planes
      //for ( b = 1; b <= bevelSegments; b ++ ) {


      for (b = bevelSegments - 1; b >= 0; b--) {
        t = b / bevelSegments;
        z = bevelThickness * Math.cos(t * Math.PI / 2);
        bs = bevelSize * Math.sin(t * Math.PI / 2); // contract shape

        for (i = 0, il = contour.length; i < il; i++) {
          vert = scalePt2(contour[i], contourMovements[i], bs);
          v(vert.x, vert.y, depth + z);
        } // expand holes


        for (h = 0, hl = holes.length; h < hl; h++) {
          ahole = holes[h];
          oneHoleMovements = holesMovements[h];

          for (i = 0, il = ahole.length; i < il; i++) {
            vert = scalePt2(ahole[i], oneHoleMovements[i], bs);

            if (!extrudeByPath) {
              v(vert.x, vert.y, depth + z);
            } else {
              v(vert.x, vert.y + extrudePts[steps - 1].y, extrudePts[steps - 1].x + z);
            }
          }
        }
      }
      /* Faces */
      // Top and bottom faces


      buildLidFaces(); // Sides faces

      buildSideFaces(); /////  Internal functions

      function buildLidFaces() {
        var start = verticesArray.length / 3;

        if (bevelEnabled) {
          var layer = 0; // steps + 1

          var offset = vlen * layer; // Bottom faces

          for (i = 0; i < flen; i++) {
            face = faces[i];
            f3(face[2] + offset, face[1] + offset, face[0] + offset);
          }

          layer = steps + bevelSegments * 2;
          offset = vlen * layer; // Top faces

          for (i = 0; i < flen; i++) {
            face = faces[i];
            f3(face[0] + offset, face[1] + offset, face[2] + offset);
          }
        } else {
          // Bottom faces
          for (i = 0; i < flen; i++) {
            face = faces[i];
            f3(face[2], face[1], face[0]);
          } // Top faces


          for (i = 0; i < flen; i++) {
            face = faces[i];
            f3(face[0] + vlen * steps, face[1] + vlen * steps, face[2] + vlen * steps);
          }
        }

        scope.addGroup(start, verticesArray.length / 3 - start, 0);
      } // Create faces for the z-sides of the shape


      function buildSideFaces() {
        var start = verticesArray.length / 3;
        var layeroffset = 0;
        sidewalls(contour, layeroffset);
        layeroffset += contour.length;

        for (h = 0, hl = holes.length; h < hl; h++) {
          ahole = holes[h];
          sidewalls(ahole, layeroffset); //, true

          layeroffset += ahole.length;
        }

        scope.addGroup(start, verticesArray.length / 3 - start, 1);
      }

      function sidewalls(contour, layeroffset) {
        var j, k;
        i = contour.length;

        while (--i >= 0) {
          j = i;
          k = i - 1;
          if (k < 0) k = contour.length - 1; //console.log('b', i,j, i-1, k,vertices.length);

          var s = 0,
              sl = steps + bevelSegments * 2;

          for (s = 0; s < sl; s++) {
            var slen1 = vlen * s;
            var slen2 = vlen * (s + 1);
            var a = layeroffset + j + slen1,
                b = layeroffset + k + slen1,
                c = layeroffset + k + slen2,
                d = layeroffset + j + slen2;
            f4(a, b, c, d);
          }
        }
      }

      function v(x, y, z) {
        placeholder.push(x);
        placeholder.push(y);
        placeholder.push(z);
      }

      function f3(a, b, c) {
        addVertex(a);
        addVertex(b);
        addVertex(c);
        var nextIndex = verticesArray.length / 3;
        var uvs = uvgen.generateTopUV(scope, verticesArray, nextIndex - 3, nextIndex - 2, nextIndex - 1);
        addUV(uvs[0]);
        addUV(uvs[1]);
        addUV(uvs[2]);
      }

      function f4(a, b, c, d) {
        addVertex(a);
        addVertex(b);
        addVertex(d);
        addVertex(b);
        addVertex(c);
        addVertex(d);
        var nextIndex = verticesArray.length / 3;
        var uvs = uvgen.generateSideWallUV(scope, verticesArray, nextIndex - 6, nextIndex - 3, nextIndex - 2, nextIndex - 1);
        addUV(uvs[0]);
        addUV(uvs[1]);
        addUV(uvs[3]);
        addUV(uvs[1]);
        addUV(uvs[2]);
        addUV(uvs[3]);
      }

      function addVertex(index) {
        verticesArray.push(placeholder[index * 3 + 0]);
        verticesArray.push(placeholder[index * 3 + 1]);
        verticesArray.push(placeholder[index * 3 + 2]);
      }

      function addUV(vector2) {
        uvArray.push(vector2.x);
        uvArray.push(vector2.y);
      }
    }

    return _this2;
  }

  return ExtrudeBufferGeometry;
}(BufferGeometry);

var WorldUVGenerator = {
  generateTopUV: function generateTopUV(geometry, vertices, indexA, indexB, indexC) {
    var a_x = vertices[indexA * 3];
    var a_y = vertices[indexA * 3 + 1];
    var b_x = vertices[indexB * 3];
    var b_y = vertices[indexB * 3 + 1];
    var c_x = vertices[indexC * 3];
    var c_y = vertices[indexC * 3 + 1];
    return [new Vector2(a_x, a_y), new Vector2(b_x, b_y), new Vector2(c_x, c_y)];
  },
  generateSideWallUV: function generateSideWallUV(geometry, vertices, indexA, indexB, indexC, indexD) {
    var a_x = vertices[indexA * 3];
    var a_y = vertices[indexA * 3 + 1];
    var a_z = vertices[indexA * 3 + 2];
    var b_x = vertices[indexB * 3];
    var b_y = vertices[indexB * 3 + 1];
    var b_z = vertices[indexB * 3 + 2];
    var c_x = vertices[indexC * 3];
    var c_y = vertices[indexC * 3 + 1];
    var c_z = vertices[indexC * 3 + 2];
    var d_x = vertices[indexD * 3];
    var d_y = vertices[indexD * 3 + 1];
    var d_z = vertices[indexD * 3 + 2];

    if (Math.abs(a_y - b_y) < 0.01) {
      return [new Vector2(a_x, 1 - a_z), new Vector2(b_x, 1 - b_z), new Vector2(c_x, 1 - c_z), new Vector2(d_x, 1 - d_z)];
    } else {
      return [new Vector2(a_y, 1 - a_z), new Vector2(b_y, 1 - b_z), new Vector2(c_y, 1 - c_z), new Vector2(d_y, 1 - d_z)];
    }
  }
};

//所有的预定几何体

var MeshLambertMaterial = /*#__PURE__*/function (_Material) {
  _inherits(MeshLambertMaterial, _Material);

  var _super = _createSuper(MeshLambertMaterial);

  function MeshLambertMaterial(parameters) {
    var _this;

    _classCallCheck(this, MeshLambertMaterial);

    _this = _super.call(this);
    _this.type = 'MeshLambertMaterial';
    _this.color = new Color$1(0xffffff); // diffuse

    _this.map = null; //设置放射光颜色

    _this.emissive = new Color$1(0x000000); //设置放射光贴图强度

    _this.emissiveIntensity = 1.0;
    _this.wireframe = false;
    _this.wireframeLinewidth = 1;

    _this.setValues(parameters);

    return _this;
  }

  _createClass(MeshLambertMaterial, [{
    key: "copy",
    value: function copy(source) {
      _get(_getPrototypeOf(MeshLambertMaterial.prototype), "copy", this).call(this, source);

      this.color.copy(source.color);
      this.map = source.map;
      this.emissive.copy(source.emissive);
      this.emissiveIntensity = source.emissiveIntensity;
      this.wireframe = source.wireframe;
      this.wireframeLinewidth = source.wireframeLinewidth;
      return this;
    }
  }, {
    key: "isMeshLambertMaterial",
    get: function get$$1() {
      return true;
    }
  }]);

  return MeshLambertMaterial;
}(Material);

var MeshPhongMaterial = /*#__PURE__*/function (_Material) {
  _inherits(MeshPhongMaterial, _Material);

  var _super = _createSuper(MeshPhongMaterial);

  function MeshPhongMaterial(parameters) {
    var _this;

    _classCallCheck(this, MeshPhongMaterial);

    _this = _super.call(this);
    _this.type = 'MeshPhongMaterial';
    _this.color = new Color$1(0xffffff); // diffuse
    //高亮的颜色 todo:目前测试没有效果

    _this.specular = new Color$1(0x111111); //设置亮度

    _this.shininess = 30;
    _this.map = null; //设置放射光颜色

    _this.emissive = new Color$1(0x000000); //设置放射光贴图强度

    _this.emissiveIntensity = 1.0;
    _this.wireframe = false;
    _this.wireframeLinewidth = 1;

    _this.setValues(parameters);

    return _this;
  }

  _createClass(MeshPhongMaterial, [{
    key: "copy",
    value: function copy(source) {
      _get(_getPrototypeOf(MeshPhongMaterial.prototype), "copy", this).call(this, source);

      this.color.copy(source.color);
      this.specular.copy(source.specular);
      this.shininess = source.shininess;
      this.map = source.map;
      this.emissive.copy(source.emissive);
      this.emissiveIntensity = source.emissiveIntensity;
      this.wireframe = source.wireframe;
      this.wireframeLinewidth = source.wireframeLinewidth;
      return this;
    }
  }, {
    key: "isMeshPhongMaterial",
    get: function get$$1() {
      return true;
    }
  }]);

  return MeshPhongMaterial;
}(Material);

var LineDashedMaterial = /*#__PURE__*/function (_LineBasicMaterial) {
  _inherits(LineDashedMaterial, _LineBasicMaterial);

  var _super = _createSuper(LineDashedMaterial);

  function LineDashedMaterial(parameters) {
    var _this;

    _classCallCheck(this, LineDashedMaterial);

    _this = _super.call(this);
    _this.type = 'LineDashedMaterial'; //以下三个参数的配置与顶点数据的大小有关 

    _this.scale = 1; //虚线整体的缩放 

    _this.dashSize = 3; //虚线点的长度  

    _this.gapSize = 1; //虚线间距的大小

    _this.setValues(parameters);

    return _this;
  }

  _createClass(LineDashedMaterial, [{
    key: "copy",
    value: function copy(source) {
      _get(_getPrototypeOf(LineDashedMaterial.prototype), "copy", this).call(this, source);

      this.scale = source.scale;
      this.dashSize = source.dashSize;
      this.gapSize = source.gapSize;
      return this;
    }
  }, {
    key: "isLineDashedMaterial",
    get: function get$$1() {
      return true;
    }
  }]);

  return LineDashedMaterial;
}(LineBasicMaterial);

var ShaderMaterial = /*#__PURE__*/function (_Material) {
  _inherits(ShaderMaterial, _Material);

  var _super = _createSuper(ShaderMaterial);

  function ShaderMaterial(parameters) {
    var _this;

    _classCallCheck(this, ShaderMaterial);

    _this = _super.call(this);
    _this.type = 'ShaderMaterial';
    _this.defines = {};
    _this.uniforms = {};
    _this.vertexShader = 'void main() {\n\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}';
    _this.fragmentShader = 'void main() {\n\tgl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );\n}';
    _this.linewidth = 1;
    _this.wireframe = false;
    _this.wireframeLinewidth = 1;
    _this.lights = false; // When rendered geometry doesn't include these attributes but the material does,
    // use these default values in WebGL. This avoids errors when buffer data is missing.

    _this.defaultAttributeValues = {
      'color': [1, 1, 1],
      'uv': [0, 0],
      'uv2': [0, 0]
    };
    _this.index0AttributeName = undefined;
    _this.uniformsNeedUpdate = false;

    if (parameters !== undefined) {
      if (parameters.attributes !== undefined) {
        console.error('ShaderMaterial: attributes should now be defined in BufferGeometry instead.');
      }

      _this.setValues(parameters);
    }

    return _this;
  }

  _createClass(ShaderMaterial, [{
    key: "copy",
    value: function copy(source) {
      _get(_getPrototypeOf(ShaderMaterial.prototype), "copy", this).call(this, source);

      this.fragmentShader = source.fragmentShader;
      this.vertexShader = source.vertexShader;
      this.uniforms = UniformsUtils.clone(source.uniforms);
      this.defines = Object.assign({}, source.defines);
      this.wireframe = source.wireframe;
      this.wireframeLinewidth = source.wireframeLinewidth;
      this.lights = source.lights;
      return this;
    }
  }, {
    key: "isShaderMaterial",
    get: function get$$1() {
      return true;
    }
  }]);

  return ShaderMaterial;
}(Material);

var RawShaderMaterial = /*#__PURE__*/function (_ShaderMaterial) {
  _inherits(RawShaderMaterial, _ShaderMaterial);

  var _super = _createSuper(RawShaderMaterial);

  function RawShaderMaterial(parameters) {
    var _this;

    _classCallCheck(this, RawShaderMaterial);

    _this = _super.call(this, parameters);
    _this.type = 'RawShaderMaterial';
    return _this;
  }

  _createClass(RawShaderMaterial, [{
    key: "isRawShaderMaterial",
    get: function get() {
      return true;
    }
  }]);

  return RawShaderMaterial;
}(ShaderMaterial);

//所有的材质

var Light = /*#__PURE__*/function (_Object3D) {
  _inherits(Light, _Object3D);

  var _super = _createSuper(Light);

  function Light(color, intensity) {
    var _this;

    _classCallCheck(this, Light);

    _this = _super.call(this);
    _this.type = 'Light';
    _this.color = new Color$1(color);
    _this.intensity = intensity !== undefined ? intensity : 1;
    return _this;
  }

  _createClass(Light, [{
    key: "isLight",
    get: function get() {
      return true;
    }
  }]);

  return Light;
}(Object3D);

var SpotLight = /*#__PURE__*/function (_Light) {
  _inherits(SpotLight, _Light);

  var _super = _createSuper(SpotLight);

  function SpotLight(color, intensity, distance, angle, penumbra, decay) {
    var _this;

    _classCallCheck(this, SpotLight);

    _this = _super.call(this, color, intensity);
    _this.type = 'SpotLight';

    _this.position.copy(Object3D.DefaultUp);

    _this.updateMatrix();

    _this.target = new Object3D();
    _this.distance = distance !== undefined ? distance : 0;
    _this.angle = angle !== undefined ? angle : Math.PI / 3;
    _this.penumbra = penumbra !== undefined ? penumbra : 0;
    _this.decay = decay !== undefined ? decay : 1; // for physically correct lights, should be 2.

    return _this;
  }

  _createClass(SpotLight, [{
    key: "isSpotLight",
    get: function get() {
      return true;
    } // intensity = power per solid angle.
    // ref: equation (17) from https://seblagarde.files.wordpress.com/2015/07/course_notes_moving_frostbite_to_pbr_v32.pdf

  }, {
    key: "power",
    get: function get() {
      return this.intensity * Math.PI;
    },
    set: function set(power) {
      this.intensity = power / Math.PI;
    }
  }]);

  return SpotLight;
}(Light);

var PointLight = /*#__PURE__*/function (_Light) {
  _inherits(PointLight, _Light);

  var _super = _createSuper(PointLight);

  function PointLight(color, intensity, distance, decay) {
    var _this;

    _classCallCheck(this, PointLight);

    _this = _super.call(this, color, intensity);
    _this.type = 'PointLight';
    _this.distance = distance !== undefined ? distance : 0;
    _this.decay = decay !== undefined ? decay : 1; // for physically correct lights, should be 2.

    return _this;
  }

  _createClass(PointLight, [{
    key: "isPointLight",
    get: function get() {
      return true;
    } // intensity = power per solid angle.
    // ref: equation (15) from https://seblagarde.files.wordpress.com/2015/07/course_notes_moving_frostbite_to_pbr_v32.pdf

  }, {
    key: "power",
    get: function get() {
      return this.intensity * 4 * Math.PI;
    },
    set: function set(power) {
      this.intensity = power / (4 * Math.PI);
    }
  }]);

  return PointLight;
}(Light);

var DirectionalLight = /*#__PURE__*/function (_Light) {
  _inherits(DirectionalLight, _Light);

  var _super = _createSuper(DirectionalLight);

  function DirectionalLight(color, intensity) {
    var _this;

    _classCallCheck(this, DirectionalLight);

    _this = _super.call(this, color, intensity);
    _this.type = 'DirectionalLight';

    _this.position.copy(Object3D.DefaultUp);

    _this.updateMatrix();

    _this.target = new Object3D();
    return _this;
  }

  _createClass(DirectionalLight, [{
    key: "isDirectionalLight",
    get: function get() {
      return true;
    }
  }]);

  return DirectionalLight;
}(Light);

var AmbientLight = /*#__PURE__*/function (_Light) {
  _inherits(AmbientLight, _Light);

  var _super = _createSuper(AmbientLight);

  function AmbientLight(color, intensity) {
    var _this;

    _classCallCheck(this, AmbientLight);

    _this = _super.call(this, color, intensity);
    _this.type = 'AmbientLight';
    return _this;
  }

  _createClass(AmbientLight, [{
    key: "isAmbientLight",
    get: function get() {
      return true;
    }
  }]);

  return AmbientLight;
}(Light);

var Camera = /*#__PURE__*/function (_Object3D) {
  _inherits(Camera, _Object3D);

  var _super = _createSuper(Camera);

  function Camera() {
    var _this;

    _classCallCheck(this, Camera);

    _this = _super.call(this); //viewMatrix

    _this.matrixWorldInverse = new Matrix4();
    _this.projectionMatrix = new Matrix4();
    _this.isCamera = true;
    return _this;
  }

  _createClass(Camera, [{
    key: "updateMatrixWorld",
    value: function updateMatrixWorld(force) {
      _get(_getPrototypeOf(Camera.prototype), "updateMatrixWorld", this).call(this, force);

      this.matrixWorldInverse.getInverse(this.matrixWorld);
    }
  }, {
    key: "getWorldDirection",
    value: function getWorldDirection(target) {
      return _getWorldDirection$1.call(this, target);
    }
  }]);

  return Camera;
}(Object3D);

var _getWorldDirection$1 = function () {
  var quaternion = new Quaternion();
  return function getWorldDirection(target) {
    if (target === undefined) {
      console.warn('Camera: .getWorldDirection() target is now required');
      target = new Vector3();
    }

    this.getWorldQuaternion(quaternion);
    return target.set(0, 0, -1).applyQuaternion(quaternion);
  };
}();

/**
 * @class 透视相机
 * @author bujue
 */

var PerspectiveCamera = /*#__PURE__*/function (_Camera) {
  _inherits(PerspectiveCamera, _Camera);

  var _super = _createSuper(PerspectiveCamera);

  function PerspectiveCamera(fov, aspect, near, far) {
    var _this;

    _classCallCheck(this, PerspectiveCamera);

    _this = _super.call(this);
    _this.type = 'PerspectiveCamera';
    _this.fov = fov !== undefined ? fov : 50;
    _this.zoom = 1;
    _this.near = near !== undefined ? near : 0.1;
    _this.far = far !== undefined ? far : 2000;
    _this.focus = 10;
    _this.aspect = aspect !== undefined ? aspect : 1;
    _this.view = null;

    _this.updateProjectionMatrix();

    _this.isPerspectiveCamera = true;
    return _this;
  }

  _createClass(PerspectiveCamera, [{
    key: "updateProjectionMatrix",
    value: function updateProjectionMatrix() {
      var near = this.near,
          top = near * Math.tan(_Math.DEG2RAD * 0.5 * this.fov) / this.zoom,
          height = 2 * top,
          width = this.aspect * height,
          left = -0.5 * width,
          view = this.view;
      this.projectionMatrix.makePerspective(left, left + width, top, top - height, near, this.far);
    }
  }]);

  return PerspectiveCamera;
}(Camera);

/**
 * @class 正交投影相机
 * @author bujue
 */

var OrthographicCamera = /*#__PURE__*/function (_Camera) {
  _inherits(OrthographicCamera, _Camera);

  var _super = _createSuper(OrthographicCamera);

  function OrthographicCamera(left, right, top, bottom, near, far) {
    var _this;

    _classCallCheck(this, OrthographicCamera);

    _this = _super.call(this);
    _this.type = 'OrthographicCamera';
    _this.zoom = 1;
    _this.view = null;
    _this.left = left;
    _this.right = right;
    _this.top = top;
    _this.bottom = bottom;
    _this.near = near !== undefined ? near : 0.1;
    _this.far = far !== undefined ? far : 2000;
    _this.isOrthographicCamera = true;

    _this.updateProjectionMatrix();

    return _this;
  }

  _createClass(OrthographicCamera, [{
    key: "updateProjectionMatrix",
    value: function updateProjectionMatrix() {
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
  }]);

  return OrthographicCamera;
}(Camera);

var InstancedBufferAttribute = /*#__PURE__*/function (_BufferAttribute) {
  _inherits(InstancedBufferAttribute, _BufferAttribute);

  var _super = _createSuper(InstancedBufferAttribute);

  function InstancedBufferAttribute(array, itemSize, meshPerAttribute) {
    var _this;

    _classCallCheck(this, InstancedBufferAttribute);

    _this = _super.call(this);
    BufferAttribute.call(_assertThisInitialized(_this), array, itemSize);
    _this.meshPerAttribute = meshPerAttribute || 1;
    _this.isInstancedBufferAttribute = true;
    return _this;
  }

  _createClass(InstancedBufferAttribute, [{
    key: "copy",
    value: function copy(source) {
      _get(_getPrototypeOf(InstancedBufferAttribute.prototype), "copy", this).call(this, source);

      this.meshPerAttribute = source.meshPerAttribute;
      return this;
    }
  }]);

  return InstancedBufferAttribute;
}(BufferAttribute);

var Raycaster$$1 = /*#__PURE__*/function () {
  function Raycaster$$1(origin, direction, near, far) {
    _classCallCheck(this, Raycaster$$1);

    //direction is assumed to be normalized (for accurate distance calculations)
    this.ray = new Ray(origin, direction);
    this.near = near || 0;
    this.far = far || Infinity;
    this.params = {
      Mesh: {},
      Line: {},
      LOD: {},
      Points: {
        threshold: 1
      },
      Sprite: {}
    };
    this.linePrecision = 1;
  }

  _createClass(Raycaster$$1, [{
    key: "set",
    value: function set(origin, direction) {
      // direction is assumed to be normalized (for accurate distance calculations)
      this.ray.set(origin, direction);
    }
  }, {
    key: "setFromCamera",
    value: function setFromCamera(coords, camera) {
      //upproject
      var matrix1 = new Matrix4();
      matrix1.multiplyMatrices(camera.matrixWorld, matrix1.getInverse(camera.projectionMatrix));

      if (camera && camera.isPerspectiveCamera) {
        this.ray.origin.setFromMatrixPosition(camera.matrixWorld);
        this.ray.direction.set(coords.x, coords.y, 0.5).applyMatrix4(matrix1).sub(this.ray.origin).normalize();
      } else if (camera && camera.isOrthographicCamera) {
        this.ray.origin.set(coords.x, coords.y, (camera.near + camera.far) / (camera.near - camera.far)).applyMatrix4(matrix1); // set origin in plane of camera

        this.ray.direction.set(0, 0, -1).transformDirection(camera.matrixWorld);
      } else {
        console.error('Raycaster: Unsupported camera type.');
      }
    }
  }, {
    key: "intersectObject",
    value: function intersectObject(object, recursive, optionalTarget) {
      var intersects = optionalTarget || [];

      _intersectObject(object, this, intersects, recursive);

      intersects.sort(ascSort);
      return intersects;
    } //返回值结构 [ { distance, point, face, faceIndex, indices, object }, ... ]
    //*注意*，对于网格，面（faces）必须朝向射线原点，这样才能被检测到；通过背面的射线的交叉点将不被检测到。 为了光线投射一个对象的正反两面，你得设置 material 的 side 属性为 THREE.DoubleSide

  }, {
    key: "intersectObjects",
    value: function intersectObjects(objects, recursive, optionalTarget) {
      var intersects = optionalTarget || [];

      if (Array.isArray(objects) === false) {
        console.warn('Raycaster.intersectObjects: objects is not an Array.');
        return intersects;
      }

      for (var i = 0, l = objects.length; i < l; i++) {
        _intersectObject(objects[i], this, intersects, recursive);
      }

      intersects.sort(ascSort);
      return intersects;
    }
  }]);

  return Raycaster$$1;
}();

function ascSort(a, b) {
  return a.distance - b.distance;
}

function _intersectObject(object, raycaster, intersects, recursive) {
  if (object.visible === false) return;
  object.raycast(raycaster, intersects);

  if (recursive === true) {
    var children = object.children;

    for (var i = 0, l = children.length; i < l; i++) {
      _intersectObject(children[i], raycaster, intersects, true);
    }
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

var Spherical = /*#__PURE__*/function () {
  function Spherical(radius, phi, theta) {
    _classCallCheck(this, Spherical);

    this.radius = radius !== undefined ? radius : 1.0;
    this.phi = phi !== undefined ? phi : 0; // up / down towards top and bottom pole

    this.theta = theta !== undefined ? theta : 0; // around the equator of the sphere

    return this;
  }

  _createClass(Spherical, [{
    key: "set",
    value: function set(radius, phi, theta) {
      this.radius = radius;
      this.phi = phi;
      this.theta = theta;
      return this;
    }
  }, {
    key: "clone",
    value: function clone() {
      return new this.constructor().copy(this);
    }
  }, {
    key: "copy",
    value: function copy(other) {
      this.radius = other.radius;
      this.phi = other.phi;
      this.theta = other.theta;
      return this;
    } // restrict phi to be betwee EPS and PI-EPS

  }, {
    key: "makeSafe",
    value: function makeSafe() {
      var EPS = 0.000001;
      this.phi = Math.max(EPS, Math.min(Math.PI - EPS, this.phi));
      return this;
    }
  }, {
    key: "setFromVector3",
    value: function setFromVector3(vec3) {
      this.radius = vec3.length();

      if (this.radius === 0) {
        this.theta = 0;
        this.phi = 0;
      } else {
        this.theta = Math.atan2(vec3.x, vec3.z); // equator angle around y-up axis

        this.phi = Math.acos(_Math.clamp(vec3.y / this.radius, -1, 1)); // polar angle
      }

      return this;
    }
  }]);

  return Spherical;
}();

/**
 * @author zz85 / http://www.lab4games.net/zz85/blog
 * Extensible curve object
 *
 * Some common of curve methods:
 * .getPoint( t, optionalTarget ), .getTangent( t )
 * .getPointAt( u, optionalTarget ), .getTangentAt( u )
 * .getPoints(), .getSpacedPoints()
 * .getLength()
 * .updateArcLengths()
 *
 * This following curves inherit from THREE.Curve:
 *
 * -- 2D curves --
 * THREE.ArcCurve
 * THREE.CubicBezierCurve
 * THREE.EllipseCurve
 * THREE.LineCurve
 * THREE.QuadraticBezierCurve
 * THREE.SplineCurve
 *
 * -- 3D curves --
 * THREE.CatmullRomCurve3
 * THREE.CubicBezierCurve3
 * THREE.LineCurve3
 * THREE.QuadraticBezierCurve3
 *
 * A series of curves can be represented as a THREE.CurvePath.
 *
 **/

/**************************************************************
 *	Abstract Curve base class
 **************************************************************/

var Curve = /*#__PURE__*/function () {
  function Curve() {
    _classCallCheck(this, Curve);

    this.type = 'Curve';
    this.arcLengthDivisions = 200;
  } // Virtual base class method to overwrite and implement in subclasses
  //	- t [0 .. 1]


  _createClass(Curve, [{
    key: "getPoint",
    value: function getPoint()
    /* t, optionalTarget */
    {
      console.warn('THREE.Curve: .getPoint() not implemented.');
      return null;
    } // Get point at relative position in curve according to arc length
    // - u [0 .. 1]

  }, {
    key: "getPointAt",
    value: function getPointAt(u, optionalTarget) {
      var t = this.getUtoTmapping(u);
      return this.getPoint(t, optionalTarget);
    } // Get sequence of points using getPoint( t )

  }, {
    key: "getPoints",
    value: function getPoints(divisions) {
      if (divisions === undefined) divisions = 5;
      var points = [];

      for (var d = 0; d <= divisions; d++) {
        points.push(this.getPoint(d / divisions));
      }

      return points;
    } // Get sequence of points using getPointAt( u )

  }, {
    key: "getSpacedPoints",
    value: function getSpacedPoints(divisions) {
      if (divisions === undefined) divisions = 5;
      var points = [];

      for (var d = 0; d <= divisions; d++) {
        points.push(this.getPointAt(d / divisions));
      }

      return points;
    } // Get total curve arc length

  }, {
    key: "getLength",
    value: function getLength() {
      var lengths = this.getLengths();
      return lengths[lengths.length - 1];
    } // Get list of cumulative segment lengths

  }, {
    key: "getLengths",
    value: function getLengths(divisions) {
      if (divisions === undefined) divisions = this.arcLengthDivisions;

      if (this.cacheArcLengths && this.cacheArcLengths.length === divisions + 1 && !this.needsUpdate) {
        return this.cacheArcLengths;
      }

      this.needsUpdate = false;
      var cache = [];
      var current,
          last = this.getPoint(0);
      var p,
          sum = 0;
      cache.push(0);

      for (p = 1; p <= divisions; p++) {
        current = this.getPoint(p / divisions);
        sum += current.distanceTo(last);
        cache.push(sum);
        last = current;
      }

      this.cacheArcLengths = cache;
      return cache; // { sums: cache, sum: sum }; Sum is in the last element.
    }
  }, {
    key: "updateArcLengths",
    value: function updateArcLengths() {
      this.needsUpdate = true;
      this.getLengths();
    } // Given u ( 0 .. 1 ), get a t to find p. This gives you points which are equidistant

  }, {
    key: "getUtoTmapping",
    value: function getUtoTmapping(u, distance) {
      var arcLengths = this.getLengths();
      var i = 0,
          il = arcLengths.length;
      var targetArcLength; // The targeted u distance value to get

      if (distance) {
        targetArcLength = distance;
      } else {
        targetArcLength = u * arcLengths[il - 1];
      } // binary search for the index with largest value smaller than target u distance


      var low = 0,
          high = il - 1,
          comparison;

      while (low <= high) {
        i = Math.floor(low + (high - low) / 2); // less likely to overflow, though probably not issue here, JS doesn't really have integers, all numbers are floats

        comparison = arcLengths[i] - targetArcLength;

        if (comparison < 0) {
          low = i + 1;
        } else if (comparison > 0) {
          high = i - 1;
        } else {
          high = i;
          break; // DONE
        }
      }

      i = high;

      if (arcLengths[i] === targetArcLength) {
        return i / (il - 1);
      } // we could get finer grain at lengths, or use simple interpolation between two points


      var lengthBefore = arcLengths[i];
      var lengthAfter = arcLengths[i + 1];
      var segmentLength = lengthAfter - lengthBefore; // determine where we are between the 'before' and 'after' points

      var segmentFraction = (targetArcLength - lengthBefore) / segmentLength; // add that fractional amount to t

      var t = (i + segmentFraction) / (il - 1);
      return t;
    } // Returns a unit vector tangent at t
    // In case any sub curve does not implement its tangent derivation,
    // 2 points a small delta apart will be used to find its gradient
    // which seems to give a reasonable approximation

  }, {
    key: "getTangent",
    value: function getTangent(t) {
      var delta = 0.0001;
      var t1 = t - delta;
      var t2 = t + delta; // Capping in case of danger

      if (t1 < 0) t1 = 0;
      if (t2 > 1) t2 = 1;
      var pt1 = this.getPoint(t1);
      var pt2 = this.getPoint(t2);
      var vec = pt2.clone().sub(pt1);
      return vec.normalize();
    }
  }, {
    key: "getTangentAt",
    value: function getTangentAt(u) {
      var t = this.getUtoTmapping(u);
      return this.getTangent(t);
    }
  }, {
    key: "computeFrenetFrames",
    value: function computeFrenetFrames(segments, closed) {
      // see http://www.cs.indiana.edu/pub/techreports/TR425.pdf
      var normal = new Vector3();
      var tangents = [];
      var normals = [];
      var binormals = [];
      var vec = new Vector3();
      var mat = new Matrix4();
      var i, u, theta; // compute the tangent vectors for each segment on the curve

      for (i = 0; i <= segments; i++) {
        u = i / segments;
        tangents[i] = this.getTangentAt(u);
        tangents[i].normalize();
      } // select an initial normal vector perpendicular to the first tangent vector,
      // and in the direction of the minimum tangent xyz component


      normals[0] = new Vector3();
      binormals[0] = new Vector3();
      var min = Number.MAX_VALUE;
      var tx = Math.abs(tangents[0].x);
      var ty = Math.abs(tangents[0].y);
      var tz = Math.abs(tangents[0].z);

      if (tx <= min) {
        min = tx;
        normal.set(1, 0, 0);
      }

      if (ty <= min) {
        min = ty;
        normal.set(0, 1, 0);
      }

      if (tz <= min) {
        normal.set(0, 0, 1);
      }

      vec.crossVectors(tangents[0], normal).normalize();
      normals[0].crossVectors(tangents[0], vec);
      binormals[0].crossVectors(tangents[0], normals[0]); // compute the slowly-varying normal and binormal vectors for each segment on the curve

      for (i = 1; i <= segments; i++) {
        normals[i] = normals[i - 1].clone();
        binormals[i] = binormals[i - 1].clone();
        vec.crossVectors(tangents[i - 1], tangents[i]);

        if (vec.length() > Number.EPSILON) {
          vec.normalize();
          theta = Math.acos(_Math.clamp(tangents[i - 1].dot(tangents[i]), -1, 1)); // clamp for floating pt errors

          normals[i].applyMatrix4(mat.makeRotationAxis(vec, theta));
        }

        binormals[i].crossVectors(tangents[i], normals[i]);
      } // if the curve is closed, postprocess the vectors so the first and last normal vectors are the same


      if (closed === true) {
        theta = Math.acos(_Math.clamp(normals[0].dot(normals[segments]), -1, 1));
        theta /= segments;

        if (tangents[0].dot(vec.crossVectors(normals[0], normals[segments])) > 0) {
          theta = -theta;
        }

        for (i = 1; i <= segments; i++) {
          // twist a little...
          normals[i].applyMatrix4(mat.makeRotationAxis(tangents[i], theta * i));
          binormals[i].crossVectors(tangents[i], normals[i]);
        }
      }

      return {
        tangents: tangents,
        normals: normals,
        binormals: binormals
      };
    }
  }, {
    key: "clone",
    value: function clone() {
      return new this.constructor().copy(this);
    }
  }, {
    key: "copy",
    value: function copy(source) {
      this.arcLengthDivisions = source.arcLengthDivisions;
      return this;
    }
  }, {
    key: "toJSON",
    value: function toJSON() {
      var data = {
        metadata: {
          version: 4.5,
          type: 'Curve',
          generator: 'Curve.toJSON'
        }
      };
      data.arcLengthDivisions = this.arcLengthDivisions;
      data.type = this.type;
      return data;
    }
  }, {
    key: "fromJSON",
    value: function fromJSON(json) {
      this.arcLengthDivisions = json.arcLengthDivisions;
      return this;
    }
  }]);

  return Curve;
}();

var EllipseCurve = /*#__PURE__*/function (_Curve) {
  _inherits(EllipseCurve, _Curve);

  var _super = _createSuper(EllipseCurve);

  function EllipseCurve(aX, aY, xRadius, yRadius, aStartAngle, aEndAngle, aClockwise, aRotation) {
    var _this;

    _classCallCheck(this, EllipseCurve);

    _this = _super.call(this);
    _this.type = 'EllipseCurve';
    _this.aX = aX || 0;
    _this.aY = aY || 0;
    _this.xRadius = xRadius || 1;
    _this.yRadius = yRadius || 1;
    _this.aStartAngle = aStartAngle || 0;
    _this.aEndAngle = aEndAngle || 2 * Math.PI;
    _this.aClockwise = aClockwise || false;
    _this.aRotation = aRotation || 0;
    return _this;
  }

  _createClass(EllipseCurve, [{
    key: "getPoint",
    value: function getPoint(t, optionalTarget) {
      var point = optionalTarget || new Vector2();
      var twoPi = Math.PI * 2;
      var deltaAngle = this.aEndAngle - this.aStartAngle;
      var samePoints = Math.abs(deltaAngle) < Number.EPSILON; // ensures that deltaAngle is 0 .. 2 PI

      while (deltaAngle < 0) {
        deltaAngle += twoPi;
      }

      while (deltaAngle > twoPi) {
        deltaAngle -= twoPi;
      }

      if (deltaAngle < Number.EPSILON) {
        if (samePoints) {
          deltaAngle = 0;
        } else {
          deltaAngle = twoPi;
        }
      }

      if (this.aClockwise === true && !samePoints) {
        if (deltaAngle === twoPi) {
          deltaAngle = -twoPi;
        } else {
          deltaAngle = deltaAngle - twoPi;
        }
      }

      var angle = this.aStartAngle + t * deltaAngle;
      var x = this.aX + this.xRadius * Math.cos(angle);
      var y = this.aY + this.yRadius * Math.sin(angle);

      if (this.aRotation !== 0) {
        var cos = Math.cos(this.aRotation);
        var sin = Math.sin(this.aRotation);
        var tx = x - this.aX;
        var ty = y - this.aY; // Rotate the point about the center of the ellipse.

        x = tx * cos - ty * sin + this.aX;
        y = tx * sin + ty * cos + this.aY;
      }

      return point.set(x, y);
    }
  }, {
    key: "copy",
    value: function copy(source) {
      Curve.prototype.copy.call(this, source);
      this.aX = source.aX;
      this.aY = source.aY;
      this.xRadius = source.xRadius;
      this.yRadius = source.yRadius;
      this.aStartAngle = source.aStartAngle;
      this.aEndAngle = source.aEndAngle;
      this.aClockwise = source.aClockwise;
      this.aRotation = source.aRotation;
      return this;
    }
  }, {
    key: "isEllipseCurve",
    get: function get() {
      return true;
    }
  }]);

  return EllipseCurve;
}(Curve);

var ArcCurve = /*#__PURE__*/function (_EllipseCurve) {
  _inherits(ArcCurve, _EllipseCurve);

  var _super = _createSuper(ArcCurve);

  function ArcCurve(aX, aY, aRadius, aStartAngle, aEndAngle, aClockwise) {
    var _this;

    _classCallCheck(this, ArcCurve);

    _this = _super.call(this, aX, aY, aRadius, aRadius, aStartAngle, aEndAngle, aClockwise);
    _this.type = 'ArcCurve';
    return _this;
  }

  _createClass(ArcCurve, [{
    key: "isArcCurve",
    get: function get() {
      return true;
    }
  }]);

  return ArcCurve;
}(EllipseCurve);

/**
 * @author zz85 https://github.com/zz85
 *
 * Centripetal CatmullRom Curve - which is useful for avoiding
 * cusps and self-intersections in non-uniform catmull rom curves.
 * http://www.cemyuksel.com/research/catmullrom_param/catmullrom.pdf
 *
 * curve.type accepts centripetal(default), chordal and catmullrom
 * curve.tension is used for catmullrom which defaults to 0.5
 */

/*
Based on an optimized c++ solution in
 - http://stackoverflow.com/questions/9489736/catmull-rom-curve-with-no-cusps-and-no-self-intersections/
 - http://ideone.com/NoEbVM

This CubicPoly class could be used for reusing some variables and calculations,
but for three.js curve use, it could be possible inlined and flatten into a single function call
which can be placed in CurveUtils.
*/

function CubicPoly() {
  var c0 = 0,
      c1 = 0,
      c2 = 0,
      c3 = 0;
  /*
   * Compute coefficients for a cubic polynomial
   *   p(s) = c0 + c1*s + c2*s^2 + c3*s^3
   * such that
   *   p(0) = x0, p(1) = x1
   *  and
   *   p'(0) = t0, p'(1) = t1.
   */

  function init(x0, x1, t0, t1) {
    c0 = x0;
    c1 = t0;
    c2 = -3 * x0 + 3 * x1 - 2 * t0 - t1;
    c3 = 2 * x0 - 2 * x1 + t0 + t1;
  }

  return {
    initCatmullRom: function initCatmullRom(x0, x1, x2, x3, tension) {
      init(x1, x2, tension * (x2 - x0), tension * (x3 - x1));
    },
    initNonuniformCatmullRom: function initNonuniformCatmullRom(x0, x1, x2, x3, dt0, dt1, dt2) {
      // compute tangents when parameterized in [t1,t2]
      var t1 = (x1 - x0) / dt0 - (x2 - x0) / (dt0 + dt1) + (x2 - x1) / dt1;
      var t2 = (x2 - x1) / dt1 - (x3 - x1) / (dt1 + dt2) + (x3 - x2) / dt2; // rescale tangents for parametrization in [0,1]

      t1 *= dt1;
      t2 *= dt1;
      init(x1, x2, t1, t2);
    },
    calc: function calc(t) {
      var t2 = t * t;
      var t3 = t2 * t;
      return c0 + c1 * t + c2 * t2 + c3 * t3;
    }
  };
} //


var tmp = new Vector3();
var px = new CubicPoly(),
    py = new CubicPoly(),
    pz = new CubicPoly();

var CatmullRomCurve3 = /*#__PURE__*/function (_Curve) {
  _inherits(CatmullRomCurve3, _Curve);

  var _super = _createSuper(CatmullRomCurve3);

  function CatmullRomCurve3() {
    var _this;

    var points = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var closed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var curveType = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'centripetal';
    var tension = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0.5;

    _classCallCheck(this, CatmullRomCurve3);

    _this = _super.call(this);
    _this.type = 'CatmullRomCurve3';
    _this.points = points;
    _this.closed = closed;
    _this.curveType = curveType;
    _this.tension = tension;
    return _this;
  }

  _createClass(CatmullRomCurve3, [{
    key: "getPoint",
    value: function getPoint() {
      var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var optionalTarget = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new Vector3();
      var point = optionalTarget;
      var points = this.points;
      var l = points.length;
      var p = (l - (this.closed ? 0 : 1)) * t;
      var intPoint = Math.floor(p);
      var weight = p - intPoint;

      if (this.closed) {
        intPoint += intPoint > 0 ? 0 : (Math.floor(Math.abs(intPoint) / l) + 1) * l;
      } else if (weight === 0 && intPoint === l - 1) {
        intPoint = l - 2;
        weight = 1;
      }

      var p0, p1, p2, p3; // 4 points

      if (this.closed || intPoint > 0) {
        p0 = points[(intPoint - 1) % l];
      } else {
        // extrapolate first point
        tmp.subVectors(points[0], points[1]).add(points[0]);
        p0 = tmp;
      }

      p1 = points[intPoint % l];
      p2 = points[(intPoint + 1) % l];

      if (this.closed || intPoint + 2 < l) {
        p3 = points[(intPoint + 2) % l];
      } else {
        // extrapolate last point
        tmp.subVectors(points[l - 1], points[l - 2]).add(points[l - 1]);
        p3 = tmp;
      }

      if (this.curveType === 'centripetal' || this.curveType === 'chordal') {
        // init Centripetal / Chordal Catmull-Rom
        var pow = this.curveType === 'chordal' ? 0.5 : 0.25;
        var dt0 = Math.pow(p0.distanceToSquared(p1), pow);
        var dt1 = Math.pow(p1.distanceToSquared(p2), pow);
        var dt2 = Math.pow(p2.distanceToSquared(p3), pow); // safety check for repeated points

        if (dt1 < 1e-4) dt1 = 1.0;
        if (dt0 < 1e-4) dt0 = dt1;
        if (dt2 < 1e-4) dt2 = dt1;
        px.initNonuniformCatmullRom(p0.x, p1.x, p2.x, p3.x, dt0, dt1, dt2);
        py.initNonuniformCatmullRom(p0.y, p1.y, p2.y, p3.y, dt0, dt1, dt2);
        pz.initNonuniformCatmullRom(p0.z, p1.z, p2.z, p3.z, dt0, dt1, dt2);
      } else if (this.curveType === 'catmullrom') {
        px.initCatmullRom(p0.x, p1.x, p2.x, p3.x, this.tension);
        py.initCatmullRom(p0.y, p1.y, p2.y, p3.y, this.tension);
        pz.initCatmullRom(p0.z, p1.z, p2.z, p3.z, this.tension);
      }

      point.set(px.calc(weight), py.calc(weight), pz.calc(weight));
      return point;
    }
  }, {
    key: "copy",
    value: function copy(source) {
      _get(_getPrototypeOf(CatmullRomCurve3.prototype), "copy", this).call(this, source);

      this.points = [];

      for (var i = 0, l = source.points.length; i < l; i++) {
        var point = source.points[i];
        this.points.push(point.clone());
      }

      this.closed = source.closed;
      this.curveType = source.curveType;
      this.tension = source.tension;
      return this;
    }
  }, {
    key: "toJSON",
    value: function toJSON() {
      var data = _get(_getPrototypeOf(CatmullRomCurve3.prototype), "toJSON", this).call(this);

      data.points = [];

      for (var i = 0, l = this.points.length; i < l; i++) {
        var point = this.points[i];
        data.points.push(point.toArray());
      }

      data.closed = this.closed;
      data.curveType = this.curveType;
      data.tension = this.tension;
      return data;
    }
  }, {
    key: "fromJSON",
    value: function fromJSON(json) {
      _get(_getPrototypeOf(CatmullRomCurve3.prototype), "fromJSON", this).call(this, json);

      this.points = [];

      for (var i = 0, l = json.points.length; i < l; i++) {
        var point = json.points[i];
        this.points.push(new Vector3().fromArray(point));
      }

      this.closed = json.closed;
      this.curveType = json.curveType;
      this.tension = json.tension;
      return this;
    }
  }, {
    key: "isCatmullRomCurve3",
    get: function get$$1() {
      return true;
    }
  }]);

  return CatmullRomCurve3;
}(Curve);

/**
 * @author zz85 / http://www.lab4games.net/zz85/blog
 *
 * Bezier Curves formulas obtained from
 * http://en.wikipedia.org/wiki/Bézier_curve
 */
function CatmullRom(t, p0, p1, p2, p3) {
  var v0 = (p2 - p0) * 0.5;
  var v1 = (p3 - p1) * 0.5;
  var t2 = t * t;
  var t3 = t * t2;
  return (2 * p1 - 2 * p2 + v0 + v1) * t3 + (-3 * p1 + 3 * p2 - 2 * v0 - v1) * t2 + v0 * t + p1;
} //


function QuadraticBezierP0(t, p) {
  var k = 1 - t;
  return k * k * p;
}

function QuadraticBezierP1(t, p) {
  return 2 * (1 - t) * t * p;
}

function QuadraticBezierP2(t, p) {
  return t * t * p;
}

function QuadraticBezier(t, p0, p1, p2) {
  return QuadraticBezierP0(t, p0) + QuadraticBezierP1(t, p1) + QuadraticBezierP2(t, p2);
} //


function CubicBezierP0(t, p) {
  var k = 1 - t;
  return k * k * k * p;
}

function CubicBezierP1(t, p) {
  var k = 1 - t;
  return 3 * k * k * t * p;
}

function CubicBezierP2(t, p) {
  return 3 * (1 - t) * t * t * p;
}

function CubicBezierP3(t, p) {
  return t * t * t * p;
}

function CubicBezier(t, p0, p1, p2, p3) {
  return CubicBezierP0(t, p0) + CubicBezierP1(t, p1) + CubicBezierP2(t, p2) + CubicBezierP3(t, p3);
}

var CubicBezierCurve = /*#__PURE__*/function (_Curve) {
  _inherits(CubicBezierCurve, _Curve);

  var _super = _createSuper(CubicBezierCurve);

  function CubicBezierCurve(v0, v1, v2, v3) {
    var _this;

    _classCallCheck(this, CubicBezierCurve);

    _this = _super.call(this);
    _this.type = 'CubicBezierCurve';
    _this.v0 = v0 || new Vector2();
    _this.v1 = v1 || new Vector2();
    _this.v2 = v2 || new Vector2();
    _this.v3 = v3 || new Vector2();
    return _this;
  }

  _createClass(CubicBezierCurve, [{
    key: "getPoint",
    value: function getPoint(t, optionalTarget) {
      var point = optionalTarget || new Vector2();
      var v0 = this.v0,
          v1 = this.v1,
          v2 = this.v2,
          v3 = this.v3;
      point.set(CubicBezier(t, v0.x, v1.x, v2.x, v3.x), CubicBezier(t, v0.y, v1.y, v2.y, v3.y));
      return point;
    }
  }, {
    key: "copy",
    value: function copy(source) {
      Curve.prototype.copy.call(this, source);
      this.v0.copy(source.v0);
      this.v1.copy(source.v1);
      this.v2.copy(source.v2);
      this.v3.copy(source.v3);
      return this;
    }
  }, {
    key: "isCubicBezierCurve",
    get: function get() {
      return true;
    }
  }]);

  return CubicBezierCurve;
}(Curve);

var CubicBezierCurve3 = /*#__PURE__*/function (_Curve) {
  _inherits(CubicBezierCurve3, _Curve);

  var _super = _createSuper(CubicBezierCurve3);

  function CubicBezierCurve3(v0, v1, v2, v3) {
    var _this;

    _classCallCheck(this, CubicBezierCurve3);

    _this = _super.call(this);
    _this.type = 'CubicBezierCurve3';
    _this.v0 = v0 || new Vector3();
    _this.v1 = v1 || new Vector3();
    _this.v2 = v2 || new Vector3();
    _this.v3 = v3 || new Vector3();
    return _this;
  }

  _createClass(CubicBezierCurve3, [{
    key: "getPoint",
    value: function getPoint(t, optionalTarget) {
      var point = optionalTarget || new Vector3();
      var v0 = this.v0,
          v1 = this.v1,
          v2 = this.v2,
          v3 = this.v3;
      point.set(CubicBezier(t, v0.x, v1.x, v2.x, v3.x), CubicBezier(t, v0.y, v1.y, v2.y, v3.y), CubicBezier(t, v0.z, v1.z, v2.z, v3.z));
      return point;
    }
  }, {
    key: "copy",
    value: function copy(source) {
      _get(_getPrototypeOf(CubicBezierCurve3.prototype), "copy", this).call(this, source);

      this.v0.copy(source.v0);
      this.v1.copy(source.v1);
      this.v2.copy(source.v2);
      this.v3.copy(source.v3);
      return this;
    }
  }, {
    key: "isCubicBezierCurve3",
    get: function get$$1() {
      return true;
    }
  }]);

  return CubicBezierCurve3;
}(Curve);

var LineCurve = /*#__PURE__*/function (_Curve) {
  _inherits(LineCurve, _Curve);

  var _super = _createSuper(LineCurve);

  function LineCurve(v1, v2) {
    var _this;

    _classCallCheck(this, LineCurve);

    _this = _super.call(this);
    _this.type = 'LineCurve';
    _this.v1 = v1 || new Vector2();
    _this.v2 = v2 || new Vector2();
    return _this;
  }

  _createClass(LineCurve, [{
    key: "getPoint",
    value: function getPoint(t, optionalTarget) {
      var point = optionalTarget || new Vector2();

      if (t === 1) {
        point.copy(this.v2);
      } else {
        point.copy(this.v2).sub(this.v1);
        point.multiplyScalar(t).add(this.v1);
      }

      return point;
    }
  }, {
    key: "getPointAt",
    // Line curve is linear, so we can overwrite default getPointAt
    value: function getPointAt(u, optionalTarget) {
      return this.getPoint(u, optionalTarget);
    }
  }, {
    key: "getTangent",
    value: function getTangent()
    /* t */
    {
      var tangent = this.v2.clone().sub(this.v1);
      return tangent.normalize();
    }
  }, {
    key: "copy",
    value: function copy(source) {
      _get(_getPrototypeOf(LineCurve.prototype), "copy", this).call(this, source);

      this.v1.copy(source.v1);
      this.v2.copy(source.v2);
      return this;
    }
  }, {
    key: "isLineCurve",
    get: function get$$1() {
      return true;
    }
  }]);

  return LineCurve;
}(Curve);

var LineCurve3 = /*#__PURE__*/function (_Curve) {
  _inherits(LineCurve3, _Curve);

  var _super = _createSuper(LineCurve3);

  function LineCurve3(v1, v2) {
    var _this;

    _classCallCheck(this, LineCurve3);

    _this = _super.call(this);
    _this.type = 'LineCurve3';
    _this.v1 = v1 || new Vector3();
    _this.v2 = v2 || new Vector3();
    return _this;
  }

  _createClass(LineCurve3, [{
    key: "getPoint",
    value: function getPoint(t, optionalTarget) {
      var point = optionalTarget || new Vector3();

      if (t === 1) {
        point.copy(this.v2);
      } else {
        point.copy(this.v2).sub(this.v1);
        point.multiplyScalar(t).add(this.v1);
      }

      return point;
    } // Line curve is linear, so we can overwrite default getPointAt

  }, {
    key: "getPointAt",
    value: function getPointAt(u, optionalTarget) {
      return this.getPoint(u, optionalTarget);
    }
  }, {
    key: "copy",
    value: function copy(source) {
      _get(_getPrototypeOf(LineCurve3.prototype), "copy", this).call(this, source);

      this.v1.copy(source.v1);
      this.v2.copy(source.v2);
      return this;
    }
  }, {
    key: "isLineCurve3",
    get: function get$$1() {
      return true;
    }
  }]);

  return LineCurve3;
}(Curve);

var QuadraticBezierCurve = /*#__PURE__*/function (_Curve) {
  _inherits(QuadraticBezierCurve, _Curve);

  var _super = _createSuper(QuadraticBezierCurve);

  function QuadraticBezierCurve(v0, v1, v2) {
    var _this;

    _classCallCheck(this, QuadraticBezierCurve);

    _this = _super.call(this);
    _this.type = 'QuadraticBezierCurve';
    _this.v0 = v0 || new Vector2();
    _this.v1 = v1 || new Vector2();
    _this.v2 = v2 || new Vector2();
    return _this;
  }

  _createClass(QuadraticBezierCurve, [{
    key: "getPoint",
    value: function getPoint(t, optionalTarget) {
      var point = optionalTarget || new Vector2();
      var v0 = this.v0,
          v1 = this.v1,
          v2 = this.v2;
      point.set(QuadraticBezier(t, v0.x, v1.x, v2.x), QuadraticBezier(t, v0.y, v1.y, v2.y));
      return point;
    }
  }, {
    key: "copy",
    value: function copy(source) {
      _get(_getPrototypeOf(QuadraticBezierCurve.prototype), "copy", this).call(this, source);

      this.v0.copy(source.v0);
      this.v1.copy(source.v1);
      this.v2.copy(source.v2);
      return this;
    }
  }, {
    key: "isQuadraticBezierCurve",
    get: function get$$1() {
      return true;
    }
  }]);

  return QuadraticBezierCurve;
}(Curve);

var QuadraticBezierCurve3 = /*#__PURE__*/function (_Curve) {
  _inherits(QuadraticBezierCurve3, _Curve);

  var _super = _createSuper(QuadraticBezierCurve3);

  function QuadraticBezierCurve3(v0, v1, v2) {
    var _this;

    _classCallCheck(this, QuadraticBezierCurve3);

    _this = _super.call(this);
    _this.type = 'QuadraticBezierCurve3';
    _this.v0 = v0 || new Vector3();
    _this.v1 = v1 || new Vector3();
    _this.v2 = v2 || new Vector3();
    return _this;
  }

  _createClass(QuadraticBezierCurve3, [{
    key: "getPoint",
    value: function getPoint(t, optionalTarget) {
      var point = optionalTarget || new Vector3();
      var v0 = this.v0,
          v1 = this.v1,
          v2 = this.v2;
      point.set(QuadraticBezier(t, v0.x, v1.x, v2.x), QuadraticBezier(t, v0.y, v1.y, v2.y), QuadraticBezier(t, v0.z, v1.z, v2.z));
      return point;
    }
  }, {
    key: "copy",
    value: function copy(source) {
      _get(_getPrototypeOf(QuadraticBezierCurve3.prototype), "copy", this).call(this, source);

      this.v0.copy(source.v0);
      this.v1.copy(source.v1);
      this.v2.copy(source.v2);
      return this;
    }
  }, {
    key: "isQuadraticBezierCurve3",
    get: function get$$1() {
      return true;
    }
  }]);

  return QuadraticBezierCurve3;
}(Curve);

var SplineCurve = /*#__PURE__*/function (_Curve) {
  _inherits(SplineCurve, _Curve);

  var _super = _createSuper(SplineCurve);

  function SplineCurve(points
  /* array of Vector2 */
  ) {
    var _this;

    _classCallCheck(this, SplineCurve);

    _this = _super.call(this);
    _this.type = 'SplineCurve';
    _this.points = points || [];
    return _this;
  }

  _createClass(SplineCurve, [{
    key: "getPoint",
    value: function getPoint(t, optionalTarget) {
      var point = optionalTarget || new Vector2();
      var points = this.points;
      var p = (points.length - 1) * t;
      var intPoint = Math.floor(p);
      var weight = p - intPoint;
      var p0 = points[intPoint === 0 ? intPoint : intPoint - 1];
      var p1 = points[intPoint];
      var p2 = points[intPoint > points.length - 2 ? points.length - 1 : intPoint + 1];
      var p3 = points[intPoint > points.length - 3 ? points.length - 1 : intPoint + 2];
      point.set(CatmullRom(weight, p0.x, p1.x, p2.x, p3.x), CatmullRom(weight, p0.y, p1.y, p2.y, p3.y));
      return point;
    }
  }, {
    key: "copy",
    value: function copy(source) {
      _get(_getPrototypeOf(SplineCurve.prototype), "copy", this).call(this, source);

      this.points = [];

      for (var i = 0, l = source.points.length; i < l; i++) {
        var point = source.points[i];
        this.points.push(point.clone());
      }

      return this;
    }
  }, {
    key: "isSplineCurve",
    get: function get$$1() {
      return true;
    }
  }]);

  return SplineCurve;
}(Curve);

/**
 * @author zz85 / http://www.lab4games.net/zz85/blog
 *
 **/

/**************************************************************
 *	Curved Path - a curve path is simply a array of connected
 *  curves, but retains the api of a curve
 **************************************************************/

var CurvePath = /*#__PURE__*/function (_Curve) {
  _inherits(CurvePath, _Curve);

  var _super = _createSuper(CurvePath);

  function CurvePath() {
    var _this;

    _classCallCheck(this, CurvePath);

    _this = _super.call(this);
    _this.type = 'CurvePath';
    _this.curves = [];
    _this.autoClose = false; // Automatically closes the path

    return _this;
  }

  _createClass(CurvePath, [{
    key: "add",
    value: function add(curve) {
      this.curves.push(curve);
    }
  }, {
    key: "closePath",
    value: function closePath() {
      // Add a line curve if start and end of lines are not connected
      var startPoint = this.curves[0].getPoint(0);
      var endPoint = this.curves[this.curves.length - 1].getPoint(1);

      if (!startPoint.equals(endPoint)) {
        this.curves.push(new LineCurve(endPoint, startPoint));
      }
    } // To get accurate point with reference to
    // entire path distance at time t,
    // following has to be done:
    // 1. Length of each sub path have to be known
    // 2. Locate and identify type of curve
    // 3. Get t for the curve
    // 4. Return curve.getPointAt(t')

  }, {
    key: "getPoint",
    value: function getPoint(t) {
      var d = t * this.getLength();
      var curveLengths = this.getCurveLengths();
      var i = 0; // To think about boundaries points.

      while (i < curveLengths.length) {
        if (curveLengths[i] >= d) {
          var diff = curveLengths[i] - d;
          var curve = this.curves[i];
          var segmentLength = curve.getLength();
          var u = segmentLength === 0 ? 0 : 1 - diff / segmentLength;
          return curve.getPointAt(u);
        }

        i++;
      }

      return null; // loop where sum != 0, sum > d , sum+1 <d
    } // We cannot use the default THREE.Curve getPoint() with getLength() because in
    // THREE.Curve, getLength() depends on getPoint() but in THREE.CurvePath
    // getPoint() depends on getLength

  }, {
    key: "getLength",
    value: function getLength() {
      var lens = this.getCurveLengths();
      return lens[lens.length - 1];
    } // cacheLengths must be recalculated.

  }, {
    key: "updateArcLengths",
    value: function updateArcLengths() {
      this.needsUpdate = true;
      this.cacheLengths = null;
      this.getCurveLengths();
    } // Compute lengths and cache them
    // We cannot overwrite getLengths() because UtoT mapping uses it.

  }, {
    key: "getCurveLengths",
    value: function getCurveLengths() {
      // We use cache values if curves and cache array are same length
      if (this.cacheLengths && this.cacheLengths.length === this.curves.length) {
        return this.cacheLengths;
      } // Get length of sub-curve
      // Push sums into cached array


      var lengths = [],
          sums = 0;

      for (var i = 0, l = this.curves.length; i < l; i++) {
        sums += this.curves[i].getLength();
        lengths.push(sums);
      }

      this.cacheLengths = lengths;
      return lengths;
    }
  }, {
    key: "getSpacedPoints",
    value: function getSpacedPoints(divisions) {
      if (divisions === undefined) divisions = 40;
      var points = [];

      for (var i = 0; i <= divisions; i++) {
        points.push(this.getPoint(i / divisions));
      }

      if (this.autoClose) {
        points.push(points[0]);
      }

      return points;
    }
  }, {
    key: "getPoints",
    value: function getPoints(divisions) {
      divisions = divisions || 12;
      var points = [],
          last;

      for (var i = 0, curves = this.curves; i < curves.length; i++) {
        var curve = curves[i];
        var resolution = curve && curve.isEllipseCurve ? divisions * 2 : curve && curve.isLineCurve ? 1 : curve && curve.isSplineCurve ? divisions * curve.points.length : divisions;
        var pts = curve.getPoints(resolution);

        for (var j = 0; j < pts.length; j++) {
          var point = pts[j];
          if (last && last.equals(point)) continue; // ensures no consecutive points are duplicates

          points.push(point);
          last = point;
        }
      }

      if (this.autoClose && points.length > 1 && !points[points.length - 1].equals(points[0])) {
        points.push(points[0]);
      }

      return points;
    }
  }, {
    key: "copy",
    value: function copy(source) {
      Curve.prototype.copy.call(this, source);
      this.curves = [];

      for (var i = 0, l = source.curves.length; i < l; i++) {
        var curve = source.curves[i];
        this.curves.push(curve.clone());
      }

      this.autoClose = source.autoClose;
      return this;
    }
  }]);

  return CurvePath;
}(Curve);

/**
 * @author zz85 / http://www.lab4games.net/zz85/blog
 * Creates free form 2d path using series of points, lines or curves.
 **/

var Path = /*#__PURE__*/function (_CurvePath) {
  _inherits(Path, _CurvePath);

  var _super = _createSuper(Path);

  function Path(points) {
    var _this;

    _classCallCheck(this, Path);

    _this = _super.call(this);
    _this.type = 'Path';
    _this.currentPoint = new Vector2();

    if (points) {
      _this.setFromPoints(points);
    }

    return _this;
  }

  _createClass(Path, [{
    key: "setFromPoints",
    value: function setFromPoints(points) {
      this.moveTo(points[0].x, points[0].y);

      for (var i = 1, l = points.length; i < l; i++) {
        this.lineTo(points[i].x, points[i].y);
      }
    }
  }, {
    key: "moveTo",
    value: function moveTo(x, y) {
      this.currentPoint.set(x, y); // TODO consider referencing vectors instead of copying?
    }
  }, {
    key: "lineTo",
    value: function lineTo(x, y) {
      var curve = new LineCurve(this.currentPoint.clone(), new Vector2(x, y));
      this.curves.push(curve);
      this.currentPoint.set(x, y);
    }
  }, {
    key: "quadraticCurveTo",
    value: function quadraticCurveTo(aCPx, aCPy, aX, aY) {
      var curve = new QuadraticBezierCurve(this.currentPoint.clone(), new Vector2(aCPx, aCPy), new Vector2(aX, aY));
      this.curves.push(curve);
      this.currentPoint.set(aX, aY);
    }
  }, {
    key: "bezierCurveTo",
    value: function bezierCurveTo(aCP1x, aCP1y, aCP2x, aCP2y, aX, aY) {
      var curve = new CubicBezierCurve(this.currentPoint.clone(), new Vector2(aCP1x, aCP1y), new Vector2(aCP2x, aCP2y), new Vector2(aX, aY));
      this.curves.push(curve);
      this.currentPoint.set(aX, aY);
    }
  }, {
    key: "splineThru",
    value: function splineThru(pts
    /*Array of Vector*/
    ) {
      var npts = [this.currentPoint.clone()].concat(pts);
      var curve = new SplineCurve(npts);
      this.curves.push(curve);
      this.currentPoint.copy(pts[pts.length - 1]);
    }
  }, {
    key: "arc",
    value: function arc(aX, aY, aRadius, aStartAngle, aEndAngle, aClockwise) {
      var x0 = this.currentPoint.x;
      var y0 = this.currentPoint.y;
      this.absarc(aX + x0, aY + y0, aRadius, aStartAngle, aEndAngle, aClockwise);
    }
  }, {
    key: "absarc",
    value: function absarc(aX, aY, aRadius, aStartAngle, aEndAngle, aClockwise) {
      this.absellipse(aX, aY, aRadius, aRadius, aStartAngle, aEndAngle, aClockwise);
    }
  }, {
    key: "ellipse",
    value: function ellipse(aX, aY, xRadius, yRadius, aStartAngle, aEndAngle, aClockwise, aRotation) {
      var x0 = this.currentPoint.x;
      var y0 = this.currentPoint.y;
      this.absellipse(aX + x0, aY + y0, xRadius, yRadius, aStartAngle, aEndAngle, aClockwise, aRotation);
    }
  }, {
    key: "absellipse",
    value: function absellipse(aX, aY, xRadius, yRadius, aStartAngle, aEndAngle, aClockwise, aRotation) {
      var curve = new EllipseCurve(aX, aY, xRadius, yRadius, aStartAngle, aEndAngle, aClockwise, aRotation);

      if (this.curves.length > 0) {
        // if a previous curve is present, attempt to join
        var firstPoint = curve.getPoint(0);

        if (!firstPoint.equals(this.currentPoint)) {
          this.lineTo(firstPoint.x, firstPoint.y);
        }
      }

      this.curves.push(curve);
      var lastPoint = curve.getPoint(1);
      this.currentPoint.copy(lastPoint);
    }
  }, {
    key: "copy",
    value: function copy(source) {
      _get(_getPrototypeOf(Path.prototype), "copy", this).call(this, source);

      this.currentPoint.copy(source.currentPoint);
      return this;
    }
  }]);

  return Path;
}(CurvePath);

/**
 * @author zz85 / http://www.lab4games.net/zz85/blog
 * Defines a 2d shape plane using paths.
 **/
// STEP 1 Create a path.
// STEP 2 Turn path into shape.
// STEP 3 ExtrudeGeometry takes in Shape/Shapes
// STEP 3a - Extract points from each shape, turn to vertices
// STEP 3b - Triangulate each shape, add faces.

var Shape = /*#__PURE__*/function (_Path) {
  _inherits(Shape, _Path);

  var _super = _createSuper(Shape);

  function Shape(points) {
    var _this;

    _classCallCheck(this, Shape);

    _this = _super.call(this, points); //this.uuid = _Math.generateUUID();

    _this.type = 'Shape';
    _this.holes = [];
    return _this;
  }

  _createClass(Shape, [{
    key: "getPointsHoles",
    value: function getPointsHoles(divisions) {
      var holesPts = [];

      for (var i = 0, l = this.holes.length; i < l; i++) {
        holesPts[i] = this.holes[i].getPoints(divisions);
      }

      return holesPts;
    } // get points of shape and holes (keypoints based on segments parameter)

  }, {
    key: "extractPoints",
    value: function extractPoints(divisions) {
      return {
        shape: this.getPoints(divisions),
        holes: this.getPointsHoles(divisions)
      };
    }
  }, {
    key: "copy",
    value: function copy(source) {
      _get(_getPrototypeOf(Shape.prototype), "copy", this).call(this, source);

      this.holes = [];

      for (var i = 0, l = source.holes.length; i < l; i++) {
        var hole = source.holes[i];
        this.holes.push(hole.clone());
      }

      return this;
    }
  }]);

  return Shape;
}(Path);

var ShapePath = /*#__PURE__*/function () {
  function ShapePath() {
    _classCallCheck(this, ShapePath);

    this.type = 'ShapePath';
    this.color = new Color$1();
    this.subPaths = [];
    this.currentPath = null;
  }

  _createClass(ShapePath, [{
    key: "moveTo",
    value: function moveTo(x, y) {
      this.currentPath = new Path();
      this.subPaths.push(this.currentPath);
      this.currentPath.moveTo(x, y);
    }
  }, {
    key: "lineTo",
    value: function lineTo(x, y) {
      this.currentPath.lineTo(x, y);
    }
  }, {
    key: "quadraticCurveTo",
    value: function quadraticCurveTo(aCPx, aCPy, aX, aY) {
      this.currentPath.quadraticCurveTo(aCPx, aCPy, aX, aY);
    }
  }, {
    key: "bezierCurveTo",
    value: function bezierCurveTo(aCP1x, aCP1y, aCP2x, aCP2y, aX, aY) {
      this.currentPath.bezierCurveTo(aCP1x, aCP1y, aCP2x, aCP2y, aX, aY);
    }
  }, {
    key: "splineThru",
    value: function splineThru(pts) {
      this.currentPath.splineThru(pts);
    }
  }, {
    key: "toShapes",
    value: function toShapes(isCCW, noHoles) {
      function toShapesNoHoles(inSubpaths) {
        var shapes = [];

        for (var i = 0, l = inSubpaths.length; i < l; i++) {
          var tmpPath = inSubpaths[i];
          var tmpShape = new Shape();
          tmpShape.curves = tmpPath.curves;
          shapes.push(tmpShape);
        }

        return shapes;
      }

      function isPointInsidePolygon(inPt, inPolygon) {
        var polyLen = inPolygon.length; // inPt on polygon contour => immediate success    or
        // toggling of inside/outside at every single! intersection point of an edge
        //  with the horizontal line through inPt, left of inPt
        //  not counting lowerY endpoints of edges and whole edges on that line

        var inside = false;

        for (var p = polyLen - 1, q = 0; q < polyLen; p = q++) {
          var edgeLowPt = inPolygon[p];
          var edgeHighPt = inPolygon[q];
          var edgeDx = edgeHighPt.x - edgeLowPt.x;
          var edgeDy = edgeHighPt.y - edgeLowPt.y;

          if (Math.abs(edgeDy) > Number.EPSILON) {
            // not parallel
            if (edgeDy < 0) {
              edgeLowPt = inPolygon[q];
              edgeDx = -edgeDx;
              edgeHighPt = inPolygon[p];
              edgeDy = -edgeDy;
            }

            if (inPt.y < edgeLowPt.y || inPt.y > edgeHighPt.y) continue;

            if (inPt.y === edgeLowPt.y) {
              if (inPt.x === edgeLowPt.x) return true; // inPt is on contour ?
              // continue;				// no intersection or edgeLowPt => doesn't count !!!
            } else {
              var perpEdge = edgeDy * (inPt.x - edgeLowPt.x) - edgeDx * (inPt.y - edgeLowPt.y);
              if (perpEdge === 0) return true; // inPt is on contour ?

              if (perpEdge < 0) continue;
              inside = !inside; // true intersection left of inPt
            }
          } else {
            // parallel or collinear
            if (inPt.y !== edgeLowPt.y) continue; // parallel
            // edge lies on the same horizontal line as inPt

            if (edgeHighPt.x <= inPt.x && inPt.x <= edgeLowPt.x || edgeLowPt.x <= inPt.x && inPt.x <= edgeHighPt.x) return true; // inPt: Point on contour !
            // continue;
          }
        }

        return inside;
      }

      var isClockWise = ShapeUtils.isClockWise;
      var subPaths = this.subPaths;
      if (subPaths.length === 0) return [];
      if (noHoles === true) return toShapesNoHoles(subPaths);
      var solid,
          tmpPath,
          tmpShape,
          shapes = [];

      if (subPaths.length === 1) {
        tmpPath = subPaths[0];
        tmpShape = new Shape();
        tmpShape.curves = tmpPath.curves;
        shapes.push(tmpShape);
        return shapes;
      }

      var holesFirst = !isClockWise(subPaths[0].getPoints());
      holesFirst = isCCW ? !holesFirst : holesFirst; // console.log("Holes first", holesFirst);

      var betterShapeHoles = [];
      var newShapes = [];
      var newShapeHoles = [];
      var mainIdx = 0;
      var tmpPoints;
      newShapes[mainIdx] = undefined;
      newShapeHoles[mainIdx] = [];

      for (var i = 0, l = subPaths.length; i < l; i++) {
        tmpPath = subPaths[i];
        tmpPoints = tmpPath.getPoints();
        solid = isClockWise(tmpPoints);
        solid = isCCW ? !solid : solid;

        if (solid) {
          if (!holesFirst && newShapes[mainIdx]) mainIdx++;
          newShapes[mainIdx] = {
            s: new Shape(),
            p: tmpPoints
          };
          newShapes[mainIdx].s.curves = tmpPath.curves;
          if (holesFirst) mainIdx++;
          newShapeHoles[mainIdx] = []; //console.log('cw', i);
        } else {
          newShapeHoles[mainIdx].push({
            h: tmpPath,
            p: tmpPoints[0]
          }); //console.log('ccw', i);
        }
      } // only Holes? -> probably all Shapes with wrong orientation


      if (!newShapes[0]) return toShapesNoHoles(subPaths);

      if (newShapes.length > 1) {
        var ambiguous = false;
        var toChange = [];

        for (var sIdx = 0, sLen = newShapes.length; sIdx < sLen; sIdx++) {
          betterShapeHoles[sIdx] = [];
        }

        for (var sIdx = 0, sLen = newShapes.length; sIdx < sLen; sIdx++) {
          var sho = newShapeHoles[sIdx];

          for (var hIdx = 0; hIdx < sho.length; hIdx++) {
            var ho = sho[hIdx];
            var hole_unassigned = true;

            for (var s2Idx = 0; s2Idx < newShapes.length; s2Idx++) {
              if (isPointInsidePolygon(ho.p, newShapes[s2Idx].p)) {
                if (sIdx !== s2Idx) toChange.push({
                  froms: sIdx,
                  tos: s2Idx,
                  hole: hIdx
                });

                if (hole_unassigned) {
                  hole_unassigned = false;
                  betterShapeHoles[s2Idx].push(ho);
                } else {
                  ambiguous = true;
                }
              }
            }

            if (hole_unassigned) {
              betterShapeHoles[sIdx].push(ho);
            }
          }
        } // console.log("ambiguous: ", ambiguous);


        if (toChange.length > 0) {
          // console.log("to change: ", toChange);
          if (!ambiguous) newShapeHoles = betterShapeHoles;
        }
      }

      var tmpHoles;

      for (var i = 0, il = newShapes.length; i < il; i++) {
        tmpShape = newShapes[i].s;
        shapes.push(tmpShape);
        tmpHoles = newShapeHoles[i];

        for (var j = 0, jl = tmpHoles.length; j < jl; j++) {
          tmpShape.holes.push(tmpHoles[j].h);
        }
      } //console.log("shape", shapes);


      return shapes;
    }
  }]);

  return ShapePath;
}();

var Framework = /*#__PURE__*/function (_Events) {
  _inherits(Framework, _Events);

  var _super = _createSuper(Framework);

  function Framework() {
    var _this;

    _classCallCheck(this, Framework);

    _this = _super.call(this);
    _this.layers = [];
    _this.isUpdate = true;
    _this.currTick = new Date().getTime();
    _this.lastTick = null;
    _this.renderer = null;
    _this._groups = [];
    return _this;
  }

  _createClass(Framework, [{
    key: "init",
    value: function init() {
      this._InitRender();
    }
  }, {
    key: "_InitRender",
    value: function _InitRender() {
      //创建渲染器
      try {
        this.renderer = new WebGLRenderer({
          alpha: true,
          depth: true,
          antialias: true,
          premultipliedAlpha: true,
          preserveDrawingBuffer: true,
          logarithmicDepthBuffer: true
        }); //this.render._sortObjects=false;
      } catch (e) {
        this.view.style.cssText = "display: flex;justify-content: center;align-items:center;font-size:16px;color:#666;width:100%;height:100%;";
        this.view.innerHTML = '很抱歉,您的浏览器不能展示3D图表,请使用<a href="" target="blank">Chrome浏览器</a>!';
        console.error(e);
        return;
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var redraw = this.isUpdate;

      if (this.lastTick - this.currTick > 1000) {
        this.isUpdate = false;
      }

      this.fire({
        type: 'renderbefore'
      });

      if (redraw) {
        this.layers.forEach(function (view, index) {
          //reset时候又可能暂时渲染上下午丢失
          if (!_this2.renderer) return;

          _this2.renderer.setClearAlpha(0);

          if (_this2.layers.length > 1 && index !== _this2.layers.length - 1) {
            _this2.renderer.autoClear = true;
          } else {
            _this2.renderer.autoClear = false;
          } // if(this.layers.length>1 && index!==this.layers.length-1){}
          // else{
          // if(view._camera.type==="OrthographicCamera"){
          //     debugger
          // }


          _this2.renderer.render(view._scene, view._camera); //}

        });
        this.lastTick = new Date().getTime();
      }

      this.fire({
        type: 'renderafter'
      });
    }
  }, {
    key: "renderFrame",
    value: function renderFrame() {
      var me = this;
      this.render();
      this.frameId = window.requestAnimationFrame(function () {
        me.renderFrame();
      });
    }
  }, {
    key: "stopRenderFrame",
    value: function stopRenderFrame() {
      window.cancelAnimationFrame(this.frameId);
      this.frameId = null;
    }
  }, {
    key: "addView",
    value: function addView(view) {
      this.layers.push(view);
    }
  }, {
    key: "removeView",
    value: function removeView(view) {
      //todo 移除view 后续需要进行垃圾回收
      var index = this.layers.indexOf(view);

      if (index >= 0) {
        this.layers.splice(index, 1);
      }
    }
    /**
     * 
     * @param {name:"名称",flipY:"是否Y轴反转"}  
     */

  }, {
    key: "addGroup",
    value: function addGroup(_ref) {
      var _ref$name = _ref.name,
          name = _ref$name === void 0 ? '' : _ref$name,
          _ref$flipY = _ref.flipY,
          flipY = _ref$flipY === void 0 ? false : _ref$flipY;

      var _group = new Group();

      _group.on('removed', function () {
        if (this.geometry) {
          this.geometry.dispose();
        }

        if (this.material) {
          this.material.dispose();
        }
      });

      _group.name = name; //是否Y轴反转

      if (flipY) {
        var _modelMatrix = _group.matrix.elements;
        _modelMatrix[1] = -_modelMatrix[1];
        _modelMatrix[5] = -_modelMatrix[5];
        _modelMatrix[9] = -_modelMatrix[9];
        _modelMatrix[13] = -_modelMatrix[13];
        _group.matrixAutoUpdate = false;
      }

      this._groups.push(_group); //todo 收集起来方便后期处理或查询使用


      return _group;
    }
  }, {
    key: "forceRender",
    value: function forceRender() {
      //强行开启绘制
      this.isUpdate = true;
    }
  }, {
    key: "resetState",
    value: function resetState() {
      if (this.renderer) {
        this.renderer._state.reset();
      }
    }
  }]);

  return Framework;
}(Events);

var version$1 = "0.0.34";

//viewName 
var MainView = 'main_view';
var LabelView = 'label_view';
var VERSION = version$1; //停靠位置

var DUCK = {
  LEFT: 'left',
  TOP: 'top',
  BOTTOM: 'bottom',
  RIGHT: 'right',
  CENTER: 'center',
  TOPLEFT: 'topLeft',
  TOPRIGHT: 'topRight',
  BOTTOMLEFT: 'bottomLeft',
  BOTTOMRIGHT: 'bottomRight'
}; //立方体六个面的名称

var FaceNames = {
  LEFT: 'left',
  RIGHT: 'right',
  TOP: 'top',
  BOTTOM: 'bottom',
  FRONT: 'front',
  BACK: 'back'
};

var View = /*#__PURE__*/function () {
  function View(_frameWork, viewName) {
    _classCallCheck(this, View);

    this._scene = new Scene();
    this._camera = null;
    this.name = viewName || "";
    this._frameWork = _frameWork;
    this.renderer = _frameWork.renderer;
    this.width = 0;
    this.height = 0;
    this.aspect = 1;
    this.fov = 45;
    this.near = 0.1;
    this.far = 10000;
    this.mode = null;
    this.raycaster = new Raycaster$$1();
    this.controls = null;
  }

  _createClass(View, [{
    key: "getCamera",
    value: function getCamera() {
      return this._camera;
    }
  }, {
    key: "getScene",
    value: function getScene() {
      return this._scene;
    }
  }, {
    key: "getRaycaster",
    value: function getRaycaster(pos) {
      this.raycaster.setFromCamera(pos, this._camera);
      return this.raycaster;
    }
  }, {
    key: "setSize",
    value: function setSize(width, height) {
      this.width = width;
      this.height = height;
      this.aspect = this.height ? this.width / this.height : 1;
      this.renderer.setPixelRatio(window.devicePixelRatio || 1);
      this.renderer.setSize(width, height);
    }
  }, {
    key: "setBackground",
    value: function setBackground(color) {
      this._scene.background = color;
    }
  }, {
    key: "setControls",
    value: function setControls(ops) {
      this.controls = ops;
    }
  }, {
    key: "addObject",
    value: function addObject(obj) {
      this._scene.add(obj);
    }
  }, {
    key: "removeObject",
    value: function removeObject(obj) {
      this._scene.remove(obj);
    } //mode: "ortho" || "perspective"    

  }, {
    key: "project",
    value: function project(mode) {
      this.mode = mode;
      var controlsOpts = this.controls;
      var aspect = this.aspect; //let frustumSize = controlsOpts.boxHeight;

      var distance = controlsOpts.distance;

      if (mode === 'perspective') {
        this._camera = new PerspectiveCamera(this.fov, this.aspect, this.near, this.far); //默认绘制的物体是贴近近裁面的,根据近裁面呈现高度为frustumSize的物体需要相机位置
        //let centerPosition = new Vector3(0, 0, (this.far - this.near)/2);
        // let vFOV = _Math.degToRad(this.fov); // convert vertical fov to radians
        // var dist = frustumSize / (2 * Math.tan(vFOV / 2));

        this._camera.position.set(0, 0, distance);
      } else {
        //给定一个大的投影空间,方便数据的计算
        //this._camera = new OrthographicCamera(frustumSize * aspect / -2, frustumSize * aspect / 2, frustumSize / 2, frustumSize / - 2, this.near, this.far);
        this._camera = new OrthographicCamera(controlsOpts.boxWidth / -2, controlsOpts.boxWidth / 2, controlsOpts.boxHeight / 2, controlsOpts.boxHeight / -2, this.near, this.far);

        this._camera.position.set(0, 0, distance);
      } // console.info("getVisableSize", this.getVisableSize());

    }
  }, {
    key: "createScreenProject",
    value: function createScreenProject() {
      var distance = this.controls.maxDistance;
      this._camera = new OrthographicCamera(0, this.width, 0, -this.height, this.near, this.far);

      this._camera.position.set(0, 0, distance);
    }
  }, {
    key: "getVisableSize",
    value: function getVisableSize() {
      var currPosition = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Vector3();
      var result = {
        width: 0,
        height: 0,
        ratio: 0
      };

      if (this.mode == "ortho") {
        result.width = Math.round(this._camera.right - this._camera.left);
        result.height = Math.round(this._camera.top - this._camera.bottom);
      }

      if (this.mode == "perspective") {
        var cameraPosition = this._camera.position.clone();

        var dist = cameraPosition.distanceTo(currPosition);

        var vFOV = _Math.degToRad(this.fov); // convert vertical fov to radians


        var height = 2 * Math.tan(vFOV / 2) * dist;
        result.width = height * this.aspect;
        result.height = height;
      }

      if (this.width != 0) {
        result.ratio = result.width / this.width;
      }

      return result;
    }
  }, {
    key: "getObjectScale",
    value: function getObjectScale(object) {
      var objectWorldScale = new Vector3();
      return object.getWorldScale(objectWorldScale);
    }
  }, {
    key: "resize",
    value: function resize(_width, _height, frustumSize) {
      this.setSize(_width, _height);

      if (this.mode == 'perspective') {
        this._camera.aspect = this.aspect;
      } else {
        this._camera.left = frustumSize * this.aspect / -2;
        this._camera.right = frustumSize * this.aspect / 2;
        this._camera.top = frustumSize / 2;
        this._camera.bottom = frustumSize / -2;
      } //labelView的特殊更新


      if (this.name === LabelView) {
        this._camera.left = 0;
        this._camera.right = this.width;
        this._camera.top = 0;
        this._camera.bottom = -this.height;
      }

      this._camera.updateProjectionMatrix();
    }
  }, {
    key: "dispose",
    value: function dispose() {
      this._scene = null;
      this._camera = null;
      this._frameWork = null;
      this.renderer = null;
    }
  }]);

  return View;
}();

var _computeCanvasContent = function () {
  var canvas = document.createElementNS('http://www.w3.org/1999/xhtml', 'canvas');
  var context = canvas.getContext("2d");
  return context;
}();

var RenderFont = /*#__PURE__*/function () {
  function RenderFont() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$scale = _ref.scale,
        scale = _ref$scale === void 0 ? 0 : _ref$scale,
        _ref$fillStyle = _ref.fillStyle,
        fillStyle = _ref$fillStyle === void 0 ? '#333333' : _ref$fillStyle,
        _ref$strokeStyle = _ref.strokeStyle,
        strokeStyle = _ref$strokeStyle === void 0 ? null : _ref$strokeStyle,
        _ref$lineWidth = _ref.lineWidth,
        lineWidth = _ref$lineWidth === void 0 ? 1 : _ref$lineWidth,
        _ref$fontSize = _ref.fontSize,
        fontSize = _ref$fontSize === void 0 ? 14 : _ref$fontSize,
        _ref$fontFamily = _ref.fontFamily,
        fontFamily = _ref$fontFamily === void 0 ? '微软雅黑,sans-serif' : _ref$fontFamily,
        _ref$isBold = _ref.isBold,
        isBold = _ref$isBold === void 0 ? false : _ref$isBold,
        _ref$lineHeight = _ref.lineHeight,
        lineHeight = _ref$lineHeight === void 0 ? 1.2 : _ref$lineHeight,
        _ref$defaultTextureWi = _ref.defaultTextureWidth,
        defaultTextureWidth = _ref$defaultTextureWi === void 0 ? 256 : _ref$defaultTextureWi,
        _ref$canvas = _ref.canvas,
        canvas = _ref$canvas === void 0 ? null : _ref$canvas;

    _classCallCheck(this, RenderFont);

    this.scale = scale || window.devicePixelRatio || 1;
    this.style = {
      fillStyle: fillStyle,
      strokeStyle: strokeStyle,
      lineWidth: lineWidth,
      fontSize: fontSize,
      fontFamily: fontFamily,
      isBold: isBold,
      lineHeight: lineHeight
    };
    this.style.textAlign = 'left'; //写死不给用户设置,方便计算文本的定位

    this.style.textBaseline = 'top';
    this.defaultTextureWidth = defaultTextureWidth;
    this._reNewline = /\r?\n/;
    this.canvas = canvas || document.createElementNS('http://www.w3.org/1999/xhtml', 'canvas');
    this.context = this.canvas.getContext("2d"); //debug 调试使用
    //document.body.appendChild(this.canvas);
  }

  _createClass(RenderFont, [{
    key: "getFont",
    value: function getFont() {
      return (this.style.isBold ? 'bold ' : 'normal ') + this.style.fontSize + 'px ' + this.style.fontFamily;
    }
  }, {
    key: "getTextWidth",
    value: function getTextWidth(txt) {
      var font = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
      var width = 0;

      if (_computeCanvasContent) {
        _computeCanvasContent.save();

        _computeCanvasContent.font = font || this.getFont();
        width = this._getTextWidth(_computeCanvasContent, this._getTextLines(txt));

        _computeCanvasContent.restore();
      }
      return width;
    }
  }, {
    key: "getTextHeight",
    value: function getTextHeight(txt) {
      return this._getTextHeight(this._getTextLines(txt));
    }
  }, {
    key: "_getTextWidth",
    value: function _getTextWidth(ctx) {
      var textLines = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      var maxWidth = 0;
      textLines.forEach(function (txt) {
        var currentLineWidth = ctx.measureText(txt).width;
        maxWidth = Math.max(maxWidth, currentLineWidth);
      });
      return maxWidth;
    }
  }, {
    key: "_getTextLines",
    value: function _getTextLines(txt) {
      txt = txt + "";
      return txt.split(this._reNewline);
    }
  }, {
    key: "_getTextHeight",
    value: function _getTextHeight(textLines) {
      return this.style.fontSize * textLines.length * this.style.lineHeight;
    } //遍历文字列表,找出最长的文字

  }, {
    key: "computeUvsAndCanvasSize",
    value: function computeUvsAndCanvasSize(texts) {
      var _this = this;

      var maxWidth = 0,
          maxHeight = 0,
          canvasWidth = 0,
          canvasHeight = 0,
          uvs = {},
          sizes = {};
      var cw = 0;
      var ch = 1; //计算需要的canvas高度

      texts.forEach(function (text) {
        var width = _this.getTextWidth(text);

        maxWidth = Math.max(maxWidth, width);
        maxHeight = Math.max(maxHeight, _this.getTextHeight(text));
        cw += width;

        if (cw > _this.defaultTextureWidth) {
          ch++;
          cw = width;
        }
      }); //一行就可以放得下

      if (ch == 1) {
        canvasWidth = _Math.ceilPowerOfTwo(cw);
        canvasHeight = _Math.ceilPowerOfTwo(maxHeight);
      } else {
        //todo 单个文字超过默认宽度的不考虑
        canvasWidth = this.defaultTextureWidth;
        canvasHeight = _Math.ceilPowerOfTwo(maxHeight * ch);
      }

      var st = 0; //开始位置

      cw = 0;
      ch = 0; //计算UV

      texts.forEach(function (text, index) {
        var width = _this.getTextWidth(text);

        var height = _this.getTextHeight(text); // console.log(text, width, height);


        sizes[text] = [width, height];
        st = cw;
        cw += width;

        if (index == 0) {
          ch = maxHeight;
        }

        if (cw < _this.defaultTextureWidth) ; else {
          ch += maxHeight;
          cw = width;
          st = 0;
        }

        var _h = canvasHeight - ch;

        var _w = cw;

        var _h2 = canvasHeight - ch + height;

        uvs[text] = [st, _h, _w, _h, _w, _h2, st, _h2];
      });
      return {
        canvasWidth: canvasWidth,
        canvasHeight: canvasHeight,
        maxHeight: maxHeight,
        maxWidth: maxWidth,
        uvs: uvs,
        sizes: sizes
      };
    }
  }, {
    key: "setCanvasSize",
    value: function setCanvasSize(width, height) {
      this.canvas.width = width * this.scale;
      this.canvas.height = height * this.scale;
      this.canvas.style.width = width + "px";
      this.canvas.style.height = height + "px";
      this.context.scale(this.scale, this.scale);
      this.width = width;
      this.height = height; //透明清屏

      this.context.fillStyle = "rgba(0,0,0,1)";
      this.context.clearRect(0, 0, width * this.scale, height * this.scale);
    }
  }, {
    key: "drawTexts",
    value: function drawTexts(texts) {
      var _this2 = this;

      var me = this;
      var UVs = {};

      var _this$computeUvsAndCa = this.computeUvsAndCanvasSize(texts),
          maxWidth = _this$computeUvsAndCa.maxWidth,
          maxHeight = _this$computeUvsAndCa.maxHeight,
          canvasWidth = _this$computeUvsAndCa.canvasWidth,
          canvasHeight = _this$computeUvsAndCa.canvasHeight,
          uvs = _this$computeUvsAndCa.uvs,
          sizes = _this$computeUvsAndCa.sizes;

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
      texts.forEach(function (text) {
        var uv = uvs[text];
        UVs[text] = new Float32Array([uv[0] / canvasWidth, uv[1] / canvasHeight, uv[2] / canvasWidth, uv[3] / canvasHeight, uv[4] / canvasWidth, uv[5] / canvasHeight, uv[6] / canvasWidth, uv[7] / canvasHeight]);

        var txtArr = _this2._getTextLines(text);

        txtArr.forEach(function (txt, line) {
          if (me.style.strokeStyle) {
            me.context.strokeText(txt, uv[0], canvasHeight - uv[5] + _this2.style.fontSize * _this2.style.lineHeight * line);
          }

          me.context.fillText(txt, uv[0], canvasHeight - uv[5] + _this2.style.fontSize * _this2.style.lineHeight * line);
        });
      });

      if (window._debug) {
        //console.log('left,top', left, top, maxWidth, size.width);
        document.body.appendChild(me.canvas);
        me.canvas.style.position = "absolute";
        me.canvas.style.left = "700px";
        me.canvas.style.top = "0";
      }

      return {
        UVs: UVs,
        sizes: sizes,
        maxWidth: maxWidth,
        maxHeight: maxHeight
      };
    }
  }, {
    key: "measureText",
    value: function measureText(txt) {
      return {
        width: this.getTextWidth(txt),
        height: this.getTextHeight(txt)
      };
    }
  }]);

  return RenderFont;
}();

var getBasicMaterial = function getBasicMaterial() {
  return new MeshBasicMaterial$$1({
    color: 0xffffff * Math.random()
  });
}; //基本图元


var primitive = {
  //创建一个box
  createBox: function createBox() {
    var width = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
    var height = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    var depth = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
    var materials = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : getBasicMaterial();
    // 初期把一个box 看作一个mesh  后期优化在渲染前做顶点合并
    var transMatrix = new Matrix4();
    var geometry = new BoxGeometry(1, 1, 1);
    var mesh = new Mesh(geometry, materials); //box 的中心的在正面下边的中点上,方便对box 高度和深度的变化

    geometry.vertices.forEach(function (vertice) {
      vertice.addScalar(0.5); //vertice.z *= -1;
    }); // geometry.faces.forEach(face => {
    //     let a = face.a;
    //     face.a = face.b;
    //     face.b = a;
    // })
    // geometry.normalsNeedUpdate = true;
    // geometry.computeFaceNormals();
    // //更加给定的得数据变换box

    transMatrix.makeScale(width, height, depth);
    geometry.vertices.forEach(function (vertice) {
      vertice.applyMatrix4(transMatrix);
    });
    return mesh;
  },
  //创建一个圆柱体
  createCylinder: function createCylinder() {
    var width = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
    var height = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    var materials = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : getBasicMaterial();
    // 初期把一个box 看作一个mesh  后期优化在渲染前做顶点合并
    var transMatrix = new Matrix4(); //let radius = width * 0.5;

    var part = 60;
    var geometry = new CylinderGeometry(1, 1, 1, part);
    var mesh = new Mesh(geometry, materials); //box 的中心的在正面下边的中点上,方便对box 高度和深度的变化

    geometry.vertices.forEach(function (vertice) {
      vertice.addScalar(0.5); //vertice.y -= 0.5;
      //vertice.z *= -1;
    }); // geometry.faces.forEach(face => {
    //     let a = face.a;
    //     face.a = face.b;
    //     face.b = a;
    // })
    // geometry.normalsNeedUpdate = true;
    // geometry.computeFaceNormals();
    //更加给定的得数据变换box

    var radius = width * 0.5;
    transMatrix.makeScale(radius, height, radius);
    geometry.vertices.forEach(function (vertice) {
      vertice.applyMatrix4(transMatrix);
    });
    return mesh;
  },
  createCone: function createCone() {
    var width = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
    var height = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    var materials = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : getBasicMaterial();
    // 初期把一个box 看作一个mesh  后期优化在渲染前做顶点合并
    var transMatrix = new Matrix4(); //let radius = width * 0.5;

    var geometry = new CylinderGeometry(0, 1, 1, 60);
    var mesh = new Mesh(geometry, materials); //box 的中心的在正面下边的中点上,方便对box 高度和深度的变化

    geometry.vertices.forEach(function (vertice) {
      vertice.addScalar(0.5); //vertice.y -= 0.5;
      // vertice.z *= -1;
    }); // geometry.faces.forEach(face => {
    //     let a = face.a;
    //     face.a = face.b;
    //     face.b = a;
    // })
    // geometry.normalsNeedUpdate = true;
    // geometry.computeFaceNormals();
    //更加给定的得数据变换box

    var radius = width * 0.5;
    transMatrix.makeScale(radius, height, radius);
    geometry.vertices.forEach(function (vertice) {
      vertice.applyMatrix4(transMatrix);
    });
    return mesh;
  },
  //创建一个面
  createPlane: function createPlane() {
    var width = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
    var height = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    var materials = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
    var showInfo = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {
      dir: new Vector3()
    };
    var group = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : undefined;
    var faceStyle = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {};

    if (!materials) {
      materials = new MeshLambertMaterial({
        color: faceStyle.fillStyle || 0xffffff * Math.random(),
        side: FrontSide,
        transparent: true,
        opacity: faceStyle.alpha || 1,
        polygonOffset: true,
        polygonOffsetFactor: 1,
        polygonOffsetUnits: 0.1,
        depthTest: true,
        depthWrite: false
      });
    }

    var planetGeometry = new PlaneGeometry(width, height);
    var planeMesh = new Mesh(planetGeometry, materials);

    if (showInfo.dir.equals(new Vector3(1, 0, 0))) {
      planeMesh.rotateY(_Math.degToRad(90));
    }

    if (showInfo.dir.equals(new Vector3(-1, 0, 0))) {
      planeMesh.rotateY(_Math.degToRad(-90));
    }

    if (showInfo.dir.equals(new Vector3(0, 1, 0))) {
      planeMesh.rotateX(_Math.degToRad(-90));
    }

    if (showInfo.dir.equals(new Vector3(0, -1, 0))) {
      planeMesh.rotateX(_Math.degToRad(90));
    }

    if (showInfo.dir.equals(new Vector3(0, 0, -1))) {
      planeMesh.rotateY(_Math.degToRad(180));
    }

    if (showInfo.center) {
      planeMesh.position.copy(showInfo.center);
    }

    if (group) {
      group.visible = showInfo.visible;
      group.add(planeMesh);
    }

    planeMesh.renderOrder = -100;
    return planeMesh;
  },
  //绘制普通线条
  createCommonLine: function createCommonLine() {
    var points = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var lineStyle = arguments.length > 1 ? arguments[1] : undefined;
    //let group = this._frameWork.addGroup({ name: 'commonLines' });
    var material = new LineBasicMaterial({
      color: lineStyle.strokeStyle,
      // transparent: true,
      depthTest: true,
      depthWrite: false
    });

    if (lineStyle.lineType == 'dashed') {
      material = new LineDashedMaterial({
        color: lineStyle.strokeStyle
      });
    }

    var geometry = new Geometry();
    points.forEach(function (item) {
      geometry.vertices.push(item);
    });
    var line = new Line(geometry, material); // line.renderOrder=-110;
    // group.add(line);

    return line;
  },
  //绘制线条
  createLine: function createLine(origins, direction, length, lineWidth, lineColor) {
    var group = new Group();
    var line = null;
    direction.normalize();
    var matLine = new LineMeshMaterial({
      color: lineColor,
      transparent: true,
      linewidth: lineWidth,
      // in pixels
      resolution: new Vector2(this.width, this.height),
      dashed: false
    });

    if (!_.isArray(origins)) {
      origins = [origins];
    }

    var triangleVertices = [];
    origins.forEach(function (origin) {
      triangleVertices = [];
      triangleVertices.push([0, 0, 0]);
      var endPoint = new Vector3(); //endPoint.copy([0,0,0]);

      var delta = new Vector3();
      delta.copy(direction);
      delta.multiplyScalar(length);
      endPoint.add(delta);
      triangleVertices.push(endPoint.toArray());
      var lineMeshGeometry = new LineGeometry();
      lineMeshGeometry.setPositions(_.flatten(triangleVertices));
      line = new Line2(lineMeshGeometry, matLine);
      line.drawMode = TrianglesDrawMode;
      line.computeLineDistances();
      line.scale.set(1, 1, 1);
      line.position.copy(origin);
      group.add(line);
    });
    return group;
  },
  //绘制折线
  createBrokenLine: function createBrokenLine(points, lineWidth, lineColor) {
    var matLine = new LineMeshMaterial({
      color: lineColor,
      linewidth: lineWidth,
      // in pixels
      resolution: new Vector2(this.width, this.height),
      dashed: false,
      depthTest: true,
      depthWrite: false
    });
    var lineMeshGeometry = new LineGeometry();
    var triangleVertices = [];
    points.forEach(function (point) {
      triangleVertices = triangleVertices.concat(point.toArray());
    });
    lineMeshGeometry.setPositions(triangleVertices);
    var line = new Line2(lineMeshGeometry, matLine);
    line.drawMode = TrianglesDrawMode;
    line.computeLineDistances();
    return line;
  },
  //绘制圆形
  createCirclePlane: function createCirclePlane(r, faceStyle, materials) {
    var geometry = new CircleBufferGeometry(r, 32);

    if (!materials) {
      materials = new SpriteMaterial$$1({
        color: faceStyle.fillStyle || 0xffffff * Math.random(),
        transparent: true,
        opacity: faceStyle.alpha || 1,
        depthTest: true,
        depthWrite: false
      });
    }

    var sprite = new Sprite(materials);
    sprite.geometry = geometry;
    return sprite;
  },
  //绘制球
  createSphere: function createSphere(r, faceStyle, materials) {
    if (!materials) {
      materials = new MeshBasicMaterial$$1({
        color: faceStyle.fillStyle || 0xffffff * Math.random(),
        transparent: true,
        opacity: faceStyle.alpha || 1,
        // polygonOffset: true,
        // polygonOffsetFactor: 1,
        // polygonOffsetUnits: 0.1,
        depthTest: true,
        depthWrite: false
      });
    }

    var geometry = new SphereBufferGeometry(r);
    var mesh = new Mesh(geometry, materials);
    return mesh;
  },
  //绘制文字label
  creatSpriteText: function creatSpriteText(texts, fontStyle) {
    //相机变化距离,不改变大小
    //https://vouzamo.wordpress.com/2016/09/07/threejs-heads-up-display/
    //1、透视相机根据距离同时调整自己的缩放
    //2、或者在单独的场景使用正交投影渲染
    var labels = [];
    var renderFont = new RenderFont(fontStyle);

    if (!_.isArray(texts)) {
      texts = [texts];
    }

    var labelInfos = renderFont.drawTexts(texts);
    var position = new Float32Array([-0.5, -0.5, 0, 0.5, -0.5, 0, 0.5, 0.5, 0, -0.5, 0.5, 0]);
    var texture = new Texture();
    texture.image = renderFont.canvas;
    texture.wrapS = RepeatWrapping;
    texture.wrapT = RepeatWrapping;
    texture.minFilter = LinearFilter;
    texture.magFilter = LinearFilter;
    texture.needsUpdate = true;
    var spriteMatrial = new SpriteMaterial$$1({
      color: fontStyle.fillStyle,
      map: texture,
      transparent: true,
      depthWrite: false
    });
    texts.forEach(function (text, index$$1) {
      var realSize = labelInfos.sizes[text]; //realSize==[width,height]

      var scale = new Vector3(realSize[0], realSize[1], 1); //scale.multiplyScalar(realSize[1]);
      //debugger

      var sprite = new Sprite(spriteMatrial);
      var geometry = new BufferGeometry();
      geometry.setIndex([0, 1, 2, 0, 2, 3]);
      geometry.addAttribute('position', new Float32BufferAttribute(position, 3, false));
      geometry.addAttribute('uv', new Float32BufferAttribute(labelInfos.UVs[text], 2, false));
      sprite.geometry = geometry;
      sprite.scale.copy(scale);
      sprite.userData = {
        text: text,
        size: realSize,
        maxWidth: labelInfos.maxWidth,
        maxHeight: labelInfos.maxHeight
      }; //默认不进行裁剪

      sprite.frustumCulled = false;
      labels.push(sprite);
    });
    return labels;
  },
  //绘制多边形
  createPolygonPlane: function createPolygonPlane() {
    var points = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var faceStyle = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var materials = arguments.length > 2 ? arguments[2] : undefined;

    if (!materials) {
      materials = new MeshBasicMaterial$$1({
        color: faceStyle.fillStyle || 0xffffff * Math.random(),
        side: DoubleSide,
        transparent: true,
        opacity: faceStyle.alpha || 0.2,
        // polygonOffset: true,
        // polygonOffsetFactor: 1,
        // polygonOffsetUnits: 0.1,
        depthTest: true,
        depthWrite: false
      });
    } //earcut(data.vertices, data.holes, data.dimensions);


    var triangles = Earcut.triangulate(points, null, 3);
    var geometry = new BufferGeometry();
    var positionBuffer = new Float32BufferAttribute(points, 3);
    geometry.addAttribute('position', positionBuffer);
    geometry.setIndex(triangles);
    var mesh = new Mesh(geometry, materials);
    return mesh;
  },
  createArea: function createArea() {
    var points = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var depth = arguments.length > 1 ? arguments[1] : undefined;
    var faceStyle = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var materials = arguments.length > 3 ? arguments[3] : undefined;

    if (!materials) {
      materials = new MeshPhongMaterial({
        color: faceStyle.fillStyle || 0xffffff * Math.random(),
        side: DoubleSide,
        transparent: true,
        opacity: faceStyle.alpha || 1.0,
        // polygonOffset: true,
        // polygonOffsetFactor: 1,
        // polygonOffsetUnits: 0.1,
        depthTest: true,
        depthWrite: true
      });
    } //earcut(data.vertices, data.holes, data.dimensions);
    // let triangles = earcut(points, null, 3);
    // let geometry = new BufferGeometry();
    // let positionBuffer = new Float32BufferAttribute(points, 3);
    // geometry.addAttribute('position', positionBuffer);
    // geometry.setIndex(triangles);


    var shape = new Shape(points);
    var extrudeSettings = {
      depth: depth || 50,
      bevelEnabled: true,
      bevelSegments: 2,
      steps: 1,
      bevelSize: 1,
      bevelThickness: 10
    };
    var geometry = new ExtrudeBufferGeometry(shape, extrudeSettings);
    var mesh = new Mesh(geometry, materials);
    return mesh;
  },
  //饼图的一个扇形角
  create3DPie: function create3DPie(height, outterRadius) {
    var innerRadius = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var startAngle = arguments.length > 3 ? arguments[3] : undefined;
    var endAngle = arguments.length > 4 ? arguments[4] : undefined;
    var materials = arguments.length > 5 ? arguments[5] : undefined;
    var radialSegments = 32;
    var PI2 = Math.PI * 2; //与2D的饼图角度一直,并沿顺时针绘制  

    var _startAngle = _Math.degToRad(startAngle - 90);

    var _endAngle = _Math.degToRad(endAngle - 90);

    if (!materials) {
      materials = new MeshBasicMaterial$$1({
        color: 0xffffff * Math.random(),
        side: DoubleSide,
        transparent: true,
        opacity: 1,
        depthTest: true,
        depthWrite: true
      });
    }

    var geometry = new DoughnutGeometry(outterRadius, height, innerRadius, radialSegments, (PI2 - _startAngle) % PI2, -(_endAngle - _startAngle));
    var mesh = new Mesh(geometry, materials);
    return mesh;
  }
};

var Application = /*#__PURE__*/function () {
  function Application(viewWidth, viewHeight) {
    _classCallCheck(this, Application);

    this._framework = new Framework();

    this._framework.init();

    this.width = viewWidth;
    this.height = viewHeight;
  }

  _createClass(Application, [{
    key: "launch",
    value: function launch() {
      this.resetState();

      this._framework.renderFrame();
    }
  }, {
    key: "createView",
    value: function createView(viewName) {
      var _view = new View(this._framework, viewName);

      this._framework.addView(_view);

      return _view;
    }
  }, {
    key: "getView",
    value: function getView(viewName) {
      var target = null;

      this._framework.layers.forEach(function (view) {
        if (view.name === viewName) {
          target = view;
        }
      });

      return target;
    }
  }, {
    key: "addGroup",
    value: function addGroup(opt) {
      return this._framework.addGroup(opt);
    }
  }, {
    key: "dispose",
    value: function dispose() {
      var _this = this;

      this._framework.layers.forEach(function (vw) {
        _this._framework.removeView(vw);

        vw.dispose();
      });

      this._framework.stopRenderFrame();

      this._framework.renderer.dispose();

      this._framework.renderer = null;
    }
  }, {
    key: "resize",
    value: function resize(width, height, frustumSize) {
      this._framework.layers.forEach(function (vw) {
        vw.resize(width, height, frustumSize);
      });
    }
  }, {
    key: "forceRender",
    value: function forceRender() {
      this._framework.forceRender();
    }
  }, {
    key: "resetState",
    value: function resetState() {
      this._framework.resetState();
    }
  }]);

  return Application;
}();

Object.assign(Application.prototype, primitive);

//惯性坐标系

var InertialSystem = /*#__PURE__*/function (_Events) {
  _inherits(InertialSystem, _Events);

  var _super = _createSuper(InertialSystem);

  function InertialSystem(root) {
    var _this;

    _classCallCheck(this, InertialSystem);

    _this = _super.call(this);
    _this._root = root;
    _this.coord = {}; //坐标原点

    _this.origin = new Vector3(0, 0, 0); //中心的

    _this.center = new Vector3(0, 0, 0);
    _this.boundbox = new Box3();
    _this.size = new Vector3();
    _this.baseBoundbox = new Box3();
    _this.padding = {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
      front: 0,
      back: 0
    };
    _this.width = root.width;
    _this.height = root.height;
    _this.fieldMap = [];
    _this.group = root.app.addGroup({
      name: 'InertialSystem'
    });

    _.extend(true, _assertThisInitialized(_this), _this.setDefaultOpts(root.opt));

    return _this;
  }

  _createClass(InertialSystem, [{
    key: "setDefaultOpts",
    value: function setDefaultOpts(opts) {
      return opts;
    }
  }, {
    key: "init",
    value: function init() {}
  }, {
    key: "addLights",
    value: function addLights() {
      //加入灯光
      var ambientlight = new AmbientLight(0xffffff, 0.8); // soft white light

      this._root.rootStage.add(ambientlight);

      var center = this.center.clone();
      center = this._getWorldPos(center); //center.setY(0);
      //     let dirLights = [];

      var intensity = 0.5;
      var lightColor = 0xcccccc; //     let position = new Vector3(-1, -1, 1);
      //     dirLights[0] = new DirectionalLight(lightColor, intensity);
      //     position.multiplyScalar(10000);
      //     dirLights[0].position.copy(position);
      //     dirLights[0].target.position.copy(center);
      //    // this._root.rootStage.add(dirLights[0]);
      //     dirLights[1] = new DirectionalLight(lightColor, intensity);
      //     position = new Vector3(1, -1, 1);
      //     position.multiplyScalar(10000);
      //     dirLights[1].position.copy(position);
      //     dirLights[1].target.position.copy(center);
      //     this._root.rootStage.add(dirLights[1]);
      //     dirLights[2] = new DirectionalLight(lightColor, intensity);
      //     position = new Vector3(-1, -1, -1);
      //     position.multiplyScalar(10000);
      //     dirLights[2].position.copy(position);
      //     dirLights[2].target.position.copy(center);
      //     this._root.rootStage.add(dirLights[2]);
      //     dirLights[3] = new DirectionalLight(lightColor, intensity);
      //     position = new Vector3(1, -1, -1);
      //     position.multiplyScalar(10000);
      //     dirLights[3].position.copy(position);
      //     dirLights[3].target.position.copy(center);
      //     this._root.rootStage.add(dirLights[3]);

      var pointLight = [];
      pointLight[0] = new PointLight(lightColor, intensity);
      var position = new Vector3(-1, 1, 1);
      position.multiplyScalar(10000);
      pointLight[0].position.copy(position);

      this._root.rootStage.add(pointLight[0]);

      pointLight[1] = new PointLight(lightColor, intensity);
      position = new Vector3(1, 1, 1);
      position.multiplyScalar(10000);
      pointLight[1].position.copy(position);

      this._root.rootStage.add(pointLight[1]);

      pointLight[2] = new PointLight(lightColor, intensity);
      position = new Vector3(-1, 1, -1);
      position.multiplyScalar(10000);
      pointLight[2].position.copy(position);

      this._root.rootStage.add(pointLight[2]);

      pointLight[3] = new PointLight(lightColor, intensity);
      position = new Vector3(1, 1, -1);
      position.multiplyScalar(1000);
      pointLight[3].position.copy(position);

      this._root.rootStage.add(pointLight[3]);
    }
  }, {
    key: "updatePosition",
    value: function updatePosition(center) {
      //更新相机姿态
      center = center || this.center.clone();
      center = this._getWorldPos(center);
      var _renderView = this._root.renderView;
      var _camera = _renderView._camera; //相机默认的旋转角度

      var dist = _camera.position.distanceTo(center);

      var phi = _Math.degToRad(_renderView.controls.alpha); //(90-lat)*(Math.PI/180),


      var theta = _Math.degToRad(_renderView.controls.beta); // (lng+180)*(Math.PI/180),


      var y = dist * Math.sin(phi);
      var temp = dist * Math.cos(phi);
      var x = temp * Math.sin(theta);
      var z = temp * Math.cos(theta); //平移实现以中心点为圆心的旋转结果

      var newPos = new Vector3(x, y, z);
      newPos.add(center);

      _camera.position.copy(newPos); //相机朝向中心点 


      _camera.lookAt(center); //orbite target position


      this._root.orbitControls.target.copy(center);
    }
  }, {
    key: "getEnabledFields",
    value: function getEnabledFields(fields) {
      if (fields) {
        //如果有传参数 fields 进来，那么就把这个指定的 fields 过滤掉 enabled==false的field
        //只留下enabled的field 结构
        return this.filterEnabledFields(fields);
      }
      //     left: [], right:[]
      // };
      // _.each( this.fieldsMap, function( bamboo, b ){
      //     if( _.isArray( bamboo ) ){
      //         //多节竹子，堆叠
      //         var align;
      //         var fields = [];
      //         //设置完fields后，返回这个group属于left还是right的axis
      //         _.each( bamboo, function( obj, v ){
      //             if( obj.field && obj.enabled ){
      //                 align = obj.yAxis.align;
      //                 fields.push( obj.field );
      //             }
      //         } );
      //         fields.length && fmap[ align ].push( fields );
      //     } else {
      //         //单节棍
      //         if( bamboo.field && bamboo.enabled ){
      //             fmap[ bamboo.yAxis.align ].push( bamboo.field );
      //         }
      //     };
      // } );
      // return fmap;
    }
  }, {
    key: "filterEnabledFields",
    value: function filterEnabledFields(fields) {
      var me = this;
      var arr = [];
      if (!_.isArray(fields)) fields = [fields];

      _.each(fields, function (f) {
        if (!_.isArray(f)) {
          if (me.getFieldMap(f).enabled) {
            arr.push(f);
          }
        } else {
          //如果这个是个纵向数据，说明就是堆叠配置
          var varr = [];

          _.each(f, function (v_f) {
            if (me.getFieldMap(v_f).enabled) {
              varr.push(v_f);
            }
          });

          if (varr.length) {
            arr.push(varr);
          }
        }
      });

      return arr;
    }
  }, {
    key: "getFieldMap",
    value: function getFieldMap(field) {
      var _this2 = this;

      var searchOpt = null;
      var fieldMap = null;

      var get = function get(maps) {
        if (maps) {
          var zField = _this2.isExistZAxisField && _this2.isExistZAxisField();

          if (zField) {
            searchOpt = {
              key: zField,
              value: field
            };
          } else {
            searchOpt = {
              key: 'field',
              value: field
            };
          }

          _.each(maps, function (map, i) {
            if (_.isArray(map)) {
              get(map);
            } else if (map[searchOpt.key] == searchOpt.value) {
              fieldMap = map;
              return false;
            }
          });
        }
      };

      get(this.fieldsMap);
      return fieldMap;
    }
  }, {
    key: "getColor",
    value: function getColor(field) {
      return this.getFieldMap(field) && this.getFieldMap(field).color;
    }
  }, {
    key: "getLegendData",
    value: function getLegendData() {
      var me = this;
      var data = [];

      _.each(_.flatten(me.fieldsMap), function (map, i) {
        //因为yAxis上面是可以单独自己配置field的，所以，这部分要过滤出 legend data
        var isGraphsField = false;

        _.each(me.graphs, function (gopt) {
          if (_.indexOf(_.flatten([gopt.field]), map.field) > -1) {
            isGraphsField = true;
            return false;
          }
        });

        if (isGraphsField) {
          data.push({
            enabled: map.enabled,
            name: map.field,
            field: map.field,
            ind: map.ind,
            color: map.color,
            yAxis: map.yAxis
          });
        }
      });

      return data;
    }
  }, {
    key: "getBoundbox",
    value: function getBoundbox() {
      var _boundbox = new Box3();

      var _opt = this._root.opt.coord.controls; //let _frustumSize = this._root.renderView.mode == 'ortho' ? _opt.boxHeight * 0.8 : _opt.boxHeight;

      var _height = _opt.boxHeight;
      var _width = _opt.boxWidth;
      var _depth = _opt.boxDepth; //斜边

      var _hypotenuse = _opt.distance || new Vector3(_width, 0, _depth).length();

      var _ratio = this._root.renderView.getVisableSize(new Vector3(0, 0, -_hypotenuse)).ratio;

      var minX = -_width * 0.5 + this.padding.left * _ratio; // let minY = - _frustumSize * 0.5 + this.padding.bottom * _ratio;

      var minY = -_height * 0.5 + this.padding.bottom * _ratio;
      var minZ = this.padding.front - _hypotenuse * 0.5 - _depth;
      var maxX = _width * 0.5 - this.padding.right * _ratio; //let maxY = _frustumSize * 0.5 - this.padding.top * _ratio;

      var maxY = _height * 0.5 - this.padding.top * _ratio;
      var maxZ = -_hypotenuse * 0.5 + this.padding.back;

      _boundbox.min.set(minX, minY, minZ);

      _boundbox.max.set(maxX, maxY, maxZ);

      this.baseBoundbox = _boundbox;
      return _boundbox;
    }
  }, {
    key: "_getWorldPos",
    value: function _getWorldPos(pos) {
      var posWorld = pos.clone();
      this.group.updateMatrixWorld();
      posWorld.applyMatrix4(this.group.matrixWorld);
      return posWorld;
    }
  }, {
    key: "getSize",
    value: function getSize() {
      if (this.boundbox.isEmpty()) {
        this.boundbox = this.getBoundbox();
      }

      this.size = this.boundbox.getSize();
      return this.size;
    }
  }, {
    key: "dataToPoint",
    value: function dataToPoint(data, dir) {}
  }, {
    key: "pointToData",
    value: function pointToData() {}
  }, {
    key: "initCoordUI",
    value: function initCoordUI() {
      //什么都不做
      return null;
    }
  }, {
    key: "drawUI",
    value: function drawUI() {// this._root.initComponent();
    }
  }, {
    key: "dispose",
    value: function dispose() {}
  }, {
    key: "resetData",
    value: function resetData() {}
  }, {
    key: "getAxisDataFrame",
    value: function getAxisDataFrame(fields) {
      var dataFrame$$1 = this._root.dataFrame;
      return dataFrame$$1.getDataOrg(fields, function (val) {
        if (val === undefined || val === null || val == "") {
          return val;
        }

        return isNaN(Number(val)) ? val : Number(val);
      });
    }
  }, {
    key: "positionToScreen",
    value: function positionToScreen(pos) {
      return _positionToScreen.call(this, pos);
    }
  }, {
    key: "screenToWorld",
    value: function screenToWorld(dx, dy) {
      return _screenToWorld.call(this, dx, dy);
    }
  }]);

  return InertialSystem;
}(Events);

var _positionToScreen = function () {
  var matrix = new Matrix4();
  return function (pos) {
    var pCam = this._root.renderView._camera;
    var widthHalf = 0.5 * this._root.width;
    var heightHalf = 0.5 * this._root.height;
    var target = this.group.localToWorld(pos);
    target.project(pCam, matrix);
    target.x = target.x * widthHalf + widthHalf;
    target.y = -(target.y * heightHalf) + heightHalf;
    return target;
  };
}();

var _screenToWorld = function () {
  var matrix = new Matrix4(); //可能有问题,未测试

  return function (dx, dy) {
    var pCam = this._root.renderView.getCamera();

    var widthHalf = this._root.width * 0.5;
    var heightHalf = this._root.height * 0.5;
    var mouse = new Vector2();
    mouse.x = dx / widthHalf - 1;
    mouse.y = -dy / heightHalf + 1; //新建一个三维单位向量 假设z方向就是0.5
    //根据照相机，把这个向量转换到视点坐标系

    var target = new Vector3(mouse.x, mouse.y, 0.5).unproject(pCam, matrix); // let target = this.group.localToWorld(pos);
    // target.project(pCam, matrix);
    // target.x = (target.x * widthHalf) + widthHalf;
    // target.y = (- (target.y * heightHalf) + heightHalf);

    return target;
  };
}();

var Component = /*#__PURE__*/function (_Events) {
  _inherits(Component, _Events);

  var _super = _createSuper(Component);

  function Component(_coordSystem, root) {
    var _this;

    _classCallCheck(this, Component);

    _this = _super.call(this);
    _this._coordSystem = _coordSystem;
    _this._root = _coordSystem ? _coordSystem._root : root; // //每一个组件存放在一个Group中
    // this.group = new Group();
    // this.name = '';

    _this.group = _this._root.app.addGroup({
      name: _this.constructor.name.toLowerCase() + '_root'
    });
    _this.__mouseover = null;
    _this.__mouseout = null;
    _this.__mousemove = null;
    _this.__click = null;
    return _this;
  }

  _createClass(Component, [{
    key: "setGroupName",
    value: function setGroupName(name) {
      this.group.name = name;
    }
  }, {
    key: "dispose",
    value: function dispose(group) {
      var removes = [];
      group = group || this.group;
      group.traverse(function (obj) {
        if (obj.isMesh || obj.isLine || obj.isLine2 || obj.isSprite) {
          if (obj.geometry) {
            obj.geometry.dispose();
          }

          if (obj.material) {
            obj.material.dispose();
          }

          removes.push(obj);
        }
      });

      while (removes.length) {
        var obj = removes.pop();

        if (obj.parent) {
          obj.parent.remove(obj);
        } else {
          obj = null;
        }
      }

      this.__mouseover = null;
      this.__mouseout = null;
      this.__mousemove = null;
      this.__click = null;
    }
  }, {
    key: "draw",
    value: function draw() {//基类不实现
    }
  }, {
    key: "resetData",
    value: function resetData() {} //后续组件的公共部分可以提取到这里

  }]);

  return Component;
}(Events);

var AxisLine = /*#__PURE__*/function (_Component) {
  _inherits(AxisLine, _Component);

  var _super = _createSuper(AxisLine);

  function AxisLine(_coordSystem, opts) {
    var _this;

    _classCallCheck(this, AxisLine);

    _this = _super.call(this, _coordSystem);
    _this.name = "AxisLine"; //轴的起点

    _this.origin = new Vector3(0, 0, 0); //轴的方向

    _this.dir = new Vector3(1, 0, 0); //轴的长度

    _this.length = 1; //轴线的宽带

    _this.lineWidth = opts.lineWidth || 2; //轴线的颜色 (默认黑色)

    _this.color = opts.strokeStyle;
    _this.axis = null; //不可见    

    _this.group.visible = !!opts.enabled;
    return _this;
  }

  _createClass(AxisLine, [{
    key: "defaultStyle",
    value: function defaultStyle() {//todo
    }
  }, {
    key: "setStyle",
    value: function setStyle() {//todo
    }
  }, {
    key: "setOrigin",
    value: function setOrigin(pos) {
      this.origin.copy(pos);
    }
  }, {
    key: "getOrigin",
    value: function getOrigin() {
      return this.origin.clone();
    }
  }, {
    key: "setDir",
    value: function setDir(dir) {
      this.dir.copy(dir);
    }
  }, {
    key: "setLength",
    value: function setLength(length) {
      this.length = length;
    }
  }, {
    key: "setGroupName",
    value: function setGroupName(name) {
      this.group.name = name;
    }
  }, {
    key: "drawStart",
    value: function drawStart() {
      this.axis = this._root.app.createLine(this.origin, this.dir, this.length, this.lineWidth, this.color);
    }
  }, {
    key: "update",
    value: function update() {
      var pos = this.getOrigin();
      this.axis.traverse(function (obj) {
        if (obj.isLine2) {
          obj.position.copy(pos);
        }
      });
    }
  }, {
    key: "draw",
    value: function draw() {
      this.group.add(this.axis);
    }
  }, {
    key: "dispose",
    value: function dispose() {
      var remove = [];
      this.group.traverse(function (obj) {
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
        var obj = remove.pop();
        obj.parent.remove(obj);
      }
    }
  }, {
    key: "resetData",
    value: function resetData() {//dataOrg更改数据轴线暂时不需要更新
    }
  }]);

  return AxisLine;
}(Component);

var TickLines = /*#__PURE__*/function (_Component) {
  _inherits(TickLines, _Component);

  var _super = _createSuper(TickLines);

  function TickLines(_coordSystem, opts) {
    var _this;

    _classCallCheck(this, TickLines);

    _this = _super.call(this, _coordSystem);
    _this.name = 'TickLines'; //点的起点位置集合

    _this.origins = []; //刻度线的绘制方向

    _this.dir = new Vector3(); //刻度线的宽带

    _this.lineWidth = opts.lineWidth; //刻度线的长度
    //todo 轴线的长度是个数组 通过像素值转换

    _this.length = opts.lineLength;
    _this.color = opts.strokeStyle;
    _this.offset = opts.offset;
    _this._tickLine = null;
    _this.lines = [];
    _this.group.visible = !!opts.enabled;
    return _this;
  }

  _createClass(TickLines, [{
    key: "initData",
    value: function initData(axis, attribute) {
      var me = this;

      var _dir = new Vector3();

      var _offset = _dir.copy(me.dir).multiplyScalar(this._offset);

      this.origins = [];
      attribute.dataSectionLayout.forEach(function (item) {
        var val = item.pos;
        var startPoint = axis.dir.clone().multiplyScalar(val);
        startPoint.add(axis.origin);
        startPoint.add(_offset);
        me.origins.push(startPoint);
      });
    }
  }, {
    key: "setDir",
    value: function setDir(dir) {
      this.dir = dir;
    }
  }, {
    key: "drawStart",
    value: function drawStart() {
      var _this2 = this;

      this.lines = [];
      this._tickLine = this._root.app.createLine(this.origins, this.dir, this._length, this.lineWidth, this.color);

      this._tickLine.traverse(function (obj) {
        if (obj.isLine2) {
          _this2.lines.push(obj);
        }
      });
    }
  }, {
    key: "update",
    value: function update() {
      var origins = this.origins;
      var triangleVertices = [];
      var endPoint = null;
      var direction = this.dir.clone();
      var length = this._length;
      var i = 0;

      this._tickLine.traverse(function (obj) {
        if (obj.isLine2) {
          triangleVertices = [];
          triangleVertices.push([0, 0, 0]);
          endPoint = new Vector3();
          endPoint.copy(direction);
          endPoint.multiplyScalar(length);
          triangleVertices.push(endPoint.toArray());
          obj.geometry.setPositions(_.flatten(triangleVertices));
          obj.position.copy(origins[i]);
          i++;
        }
      });
    }
  }, {
    key: "draw",
    value: function draw() {
      this.group.add(this._tickLine);
    }
  }, {
    key: "dispose",
    value: function dispose() {
      this.lines = [];
      var remove = [];
      this.group.traverse(function (obj) {
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
        var obj = remove.pop();
        obj.parent.remove(obj);
      }
    }
  }, {
    key: "resetData",
    value: function resetData(axis, attribute) {
      this.lines = [];
      this.initData(axis, attribute);
      this.dispose();
      this.drawStart();
      this.update();
      this.draw();
    }
  }, {
    key: "length",
    set: function set(len) {
      this._length = len;
    },
    get: function get() {
      return this._length;
    }
  }, {
    key: "offset",
    set: function set(_offset) {
      this._offset = _offset;
    },
    get: function get() {
      return this._offset;
    }
  }]);

  return TickLines;
}(Component);

var TickTexts = /*#__PURE__*/function (_Component) {
  _inherits(TickTexts, _Component);

  var _super = _createSuper(TickTexts);

  function TickTexts(_coordSystem, opts) {
    var _this;

    _classCallCheck(this, TickTexts);

    _this = _super.call(this, _coordSystem);
    _this.name = 'TickTexts'; //起点位置集合

    _this.origins = [];
    _this.texts = [];
    _this.fontColor = opts.fontColor || '#333';
    _this.fontSize = opts.fontSize || 12;
    _this.rotation = opts.rotation || 0;
    _this.origin = null;
    _this.textAlign = opts.textAlign;
    _this.verticalAlign = opts.verticalAlign;
    _this.dir = new Vector3();
    _this.offset = _construct(Vector3, _toConsumableArray(Object.values(opts.offset))) || new Vector3();
    _this._tickTextGroup = null;
    _this._tickTextGroup = _this._root.app.addGroup({
      name: 'tickTexts'
    });
    _this.group.visible = !!opts.enabled;

    _this.group.add(_this._tickTextGroup);

    _this.labels = [];
    _this.autoUpdataPostion = false;
    return _this;
  }

  _createClass(TickTexts, [{
    key: "initData",
    value: function initData(axis, attribute) {
      var me = this;
      var _offset = this.offset;
      me.origins = [];
      attribute.dataSectionLayout.forEach(function (item) {
        var val = item.pos;
        var startPoint = axis.dir.clone().multiplyScalar(val);
        startPoint.add(axis.origin);
        startPoint.add(_offset);
        me.origins.push(startPoint);
      });
      me.updataOrigins = this._updataOrigins(axis, attribute);
    }
  }, {
    key: "setDir",
    value: function setDir(dir) {
      this.dir = dir;
    }
  }, {
    key: "setTextAlign",
    value: function setTextAlign(align) {
      this.textAlign = align;
    }
  }, {
    key: "setVerticalAlign",
    value: function setVerticalAlign(align) {
      this.verticalAlign = align;
    }
  }, {
    key: "_updataOrigins",
    value: function _updataOrigins(axis, attribute) {
      var _axis = axis;
      var _attribute = attribute;
      return function () {
        this.initData(_axis, _attribute);
      };
    }
  }, {
    key: "getTextPos",
    value: function getTextPos(text) {
      var index = _.indexOf(this.texts, text);

      if (index != -1) {
        return this.origins[index];
      }

      return new Vector3();
    }
  }, {
    key: "drawStart",
    value: function drawStart() {
      var _this2 = this;

      var texts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var me = this;
      var app = me._root.app;
      var fontSize = me.fontSize,
          color = me.fontColor;
      var zDir = new Vector3(0, 0, -1);
      this.texts = texts || this.texts;
      this.labels = [];
      var labels = app.creatSpriteText(texts, {
        fontSize: fontSize,
        fillStyle: color
      });
      labels.forEach(function (label, index) {
        label.userData.position = me.origins[index].clone();

        if (me.autoUpdataPostion) {
          var _dir = new Vector3(1, 0, 0);

          if (_this2.dir.z > 0) {
            _dir = new Vector3(0, 0, -1);
          }

          label.position.copy(me.origins[index].clone());

          if (_this2.textAlign === 'right') {
            label.position.sub(_dir.multiplyScalar(label.userData.size[0] * 0.5));
          }

          if (_this2.textAlign === 'left') {
            _dir.multiplyScalar(-1);

            label.position.sub(_dir.multiplyScalar(label.userData.size[0] * 0.5));
          }

          if (_this2.textAlign === 'center') ; //根据文字高度，调整位置


          if (_this2.dir.equals(new Vector3(0, 1, 0)) || _this2.dir.equals(new Vector3(0, -1, 0))) {
            label.position.add(_this2.dir.clone().multiplyScalar(label.userData.size[1] * 0.5));
          }

          if (_this2.rotation !== 0) {
            label.material.rotation = _Math.degToRad(_this2.rotation);
            label.center.set(1, 0.5);
          } //旋转后的位置便宜
          // if(this.rotation!==0){
          //    let offsetX= label.userData.size[0] * 0.5 * Math.cos(_Math.degToRad(this.rotation));
          //    let offsetY= label.userData.size[0]* 0.5 * Math.sin(_Math.degToRad(this.rotation));
          //    label.position.sub(new Vector3(offsetX,offsetY,0));
          // }

        } else {
          label.matrixWorldNeedsUpdate = false;

          label.onBeforeRender = function (render, scene, camera) {
            me.updataOrigins(); //更新坐标后的位置

            var pos = me._coordSystem.positionToScreen(me.getTextPos(this.userData.text).clone());

            this.userData.pos = pos.clone(); //屏幕的位置

            var textSize = this.userData.size;
            var halfwidth = textSize[0] * 0.5;
            var halfHeight = textSize[1] * 0.5;
            var camearDir = new Vector3();
            camera.getWorldDirection(camearDir);
            var isSameDir = zDir.dot(camearDir);

            if (me.textAlign == 'right') {
              var flag = isSameDir < 0 ? 1 : -1;
              pos.setX(pos.x + halfwidth * flag);
              label.position.copy(pos);
            }

            if (me.textAlign == 'left') {
              var _flag = isSameDir < 0 ? -1 : 1;

              pos.setX(pos.x + halfwidth * _flag);
              label.position.copy(pos);
            }

            if (me.verticalAlign == 'top') {
              pos.setY(pos.y - halfHeight);
              label.position.copy(pos);
            }

            if (me.verticalAlign == 'bottom') {
              pos.setY(pos.y + halfHeight);
              label.position.copy(pos);
            }

            this.position.copy(pos);
            this.updateMatrixWorld(true);
          };
        } // console.log(JSON.stringify(label.userData), label.position.toArray());


        me._tickTextGroup.add(label); // me._tickTextGroup.add(point);


        _this2.labels.push(label);
      });
    }
  }, {
    key: "draw",
    value: function draw() {
      this.group.add(this._tickTextGroup);
    }
  }, {
    key: "update",
    value: function update() {//文字需要实时更新
    }
  }, {
    key: "dispose",
    value: function dispose() {
      this.labels = [];
      var remove = [];
      this.group.traverse(function (obj) {
        if (obj.isSprite) {
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
        var obj = remove.pop();
        obj.parent.remove(obj);
      }
    }
  }, {
    key: "resetData",
    value: function resetData(axis, attribute, texts) {
      this.labels = [];
      this.initData(axis, attribute);
      this.dispose();
      this.drawStart(texts); //this.update();

      this.draw();
    }
  }]);

  return TickTexts;
}(Component);

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
  }

  if (s >= 1000) {
    var num = parseInt(s / 1000);
    return String($n.toString().replace(num, num + symbol));
  } else {
    return String($n);
  }
} //从一堆点中找到最近的一个点


function findNearPointX(points, point) {
  var minDistance = Infinity;
  var result = new Vector3();
  points.forEach(function (p) {
    var distance = Math.abs(point.x - p.x);

    if (minDistance > distance) {
      minDistance = distance;
      result.copy(p);
    }
  });
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
} // r,g,b范围为[0,255],转换成h范围为[0,360]
// s,v为百分比形式，范围是[0,100],可根据需求做相应调整


function hexToHSV(hex) {
  var r = parseInt("0x" + hex.slice(1, 3)) / 255;
  var g = parseInt("0x" + hex.slice(3, 5)) / 255;
  var b = parseInt("0x" + hex.slice(5, 7)) / 255;
  var h, s, v;
  var min = Math.min(r, g, b);
  var max = v = Math.max(r, g, b);
  var difference = max - min;

  if (max == min) {
    h = 0;
  } else {
    switch (max) {
      case r:
        h = (g - b) / difference + (g < b ? 6 : 0);
        break;

      case g:
        h = 2.0 + (b - r) / difference;
        break;

      case b:
        h = 4.0 + (r - g) / difference;
        break;
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
  return {
    h: h,
    s: s,
    v: v
  };
} //输入的h范围为[0,360],s,l为百分比形式的数值,范围是[0,100] 
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
  var result = [];
  var hslColor = hexToHSV(hex);
  var S = [100, 99, 89, 78, 69, 59, 49, 39, 29, 19];
  var V = [57, 67, 77, 87, 97, 100, 100, 100, 100, 100];

  for (var i = 0; i < 10; i++) {
    var h = hslColor.h;
    result.push({
      h: h,
      s: S[i],
      v: V[i]
    });
  }

  result = result.map(function (item) {
    var h = item.h,
        s = item.s,
        v = item.v;
    var rgb = hsvToRgb(h, s, v);
    var str = "#";
    rgb.forEach(function (d) {
      str += d.toString(16).length == 1 ? '0' + d.toString(16) : d.toString(16);
    });
    return str;
  });
  return result;
}

var YAxis = /*#__PURE__*/function (_Component) {
  _inherits(YAxis, _Component);

  var _super = _createSuper(YAxis);

  function YAxis(_cartesionUI, opt) {
    var _this;

    _classCallCheck(this, YAxis);

    _this = _super.call(this, _cartesionUI._coordSystem);
    _this.name = 'YAxis';
    _this._opt = opt;
    _this._coord = _this._coordSystem.coord || {};
    _this._cartesionUI = _cartesionUI;
    _this.name = opt.name; //this.width = null; //第一次计算后就会有值
    //this.yMaxHeight = 0; //y轴最大高
    //this.height = 0; //y轴第一条线到原点的高
    // this.maxW = 0;    //最大文本的 width

    _this.field = opt.field || []; //这个 轴 上面的 field 不需要主动配置。可以从graphs中拿

    _this.title = {
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
    _this._title = null; //this.label对应的文本对象

    _this.enabled = true;
    _this.tickLine = {
      //刻度线
      enabled: 1,
      lineWidth: 1,
      //线宽像素
      lineLength: 20,
      //线长(空间单位)
      strokeStyle: '#333',
      offset: 0 //空间单位

    };
    _this.axisLine = {
      //轴线
      enabled: 1,
      lineWidth: 1,
      //线宽像素
      strokeStyle: '#333'
    };
    _this.label = {
      enabled: 1,
      fontColor: '#333',
      fontSize: 12,
      format: null,
      rotation: 0,
      textAlign: "right",
      //水平方向对齐: left  right center 
      verticalAlign: 'middle',
      //垂直方向对齐 top bottom middle
      lineHeight: 1,
      offset: {
        x: 0,
        y: 0,
        z: 40
      } //和刻度线的距离

    };
    _this.origin = new Vector3();
    _this.boundboxSize = new Vector3();
    _this.axisAttribute = _this._coordSystem.yAxisAttribute[_this.name];

    _.extend(true, _assertThisInitialized(_this), opt);

    _this.init(opt);

    _this.group.visible = !!_this.enabled;

    _this._getName();

    return _this;
  }

  _createClass(YAxis, [{
    key: "init",
    value: function init(opt) {
      var me = this; //extend会设置好this.field
      //先要矫正子啊field确保一定是个array

      if (!_.isArray(this.field)) {
        this.field = [this.field];
      }

      this._initData(this.axisAttribute);

      this.getOrigin();

      this._onChangeBind = function () {
        me._initModules();
      };

      this._root.orbitControls.on('change', this._onChangeBind);

      me._initModules();
    }
  }, {
    key: "_initModules",
    value: function _initModules() {
      if (!this.enabled) return;

      var _axisDir = new Vector3(0, 1, 0);

      var _coordSystem = this._coordSystem;

      var coordBoundBox = _coordSystem.getBoundbox();

      var _this$boundboxSize = this.boundboxSize,
          width = _this$boundboxSize.x,
          depth = _this$boundboxSize.z;
      var origin = this.origin.clone();

      var _tickLineDir = new Vector3(0, 0, 1);

      var _faceInfo = this._cartesionUI.getFaceInfo();

      var _textAlign = this.label.textAlign;

      var _offsetZ = this.label.offset.z + this.axisLine.lineWidth + this.tickLine.lineLength + this.tickLine.offset;

      if (_faceInfo.left.visible) {
        if (_faceInfo.back.visible) {
          //默认计算的原单origin
          _tickLineDir = new Vector3(0, 0, 1);
          _textAlign = 'right';
        } else {
          //默认计算的原单origin
          if (_coordSystem.coord.yAxis.length == 1) {
            origin = new Vector3(0, 0, -depth);
          }

          _tickLineDir = new Vector3(0, 0, -1);
          _textAlign = 'left';
          _offsetZ *= -1;
        }
      } else {
        if (_faceInfo.back.visible) {
          origin.setX(width);
          _tickLineDir = new Vector3(0, 0, 1);
          _textAlign = 'left';
        } else {
          origin.setX(width);

          if (_coordSystem.coord.yAxis.length == 1) {
            origin = new Vector3(width, 0, -depth);
          }

          _tickLineDir = new Vector3(0, 0, -1);
          _textAlign = 'right';
          _offsetZ *= -1;
        }
      }

      if (this._axisLine) {
        if (this._axisLine.getOrigin().equals(origin)) {
          return;
        }

        this._axisLine.setOrigin(origin);

        this._axisLine.update();

        this._tickLine.setDir(_tickLineDir);

        this._tickLine.initData(this._axisLine, this.axisAttribute, _coordSystem.getYAxisPosition);

        this._tickLine.update();

        this._tickText.setDir(_tickLineDir);

        this._tickText.initData(this._axisLine, this.axisAttribute, _coordSystem.getYAxisPosition);

        this._tickText.setTextAlign(_textAlign);

        this._tickText.offset.setZ(_offsetZ);
      } else {
        //初始化轴线
        this._axisLine = new AxisLine(_coordSystem, this.axisLine);

        this._axisLine.setDir(_axisDir);

        this._axisLine.setOrigin(origin);

        this._axisLine.setLength(this.axisAttribute.axisLength);

        this._axisLine.setGroupName('yAxisLine');

        this._axisLine.drawStart();

        this.group.add(this._axisLine.group); //初始化tickLine

        this._tickLine = new TickLines(_coordSystem, this.tickLine);

        this._tickLine.setDir(_tickLineDir);

        this._tickLine.initData(this._axisLine, this.axisAttribute);

        this._tickLine.drawStart();

        this.group.add(this._tickLine.group); // 初始化tickText

        this._tickText = new TickTexts(_coordSystem, this.label);
        this._tickText.offset.z = _offsetZ;

        this._tickText.setTextAlign(_textAlign);

        this._tickText.setDir(_tickLineDir);

        this._tickText.initData(this._axisLine, this.axisAttribute);

        this._tickText.drawStart(this._formatTextSection); //this.group.add(this._tickText.group);


        this._root.labelGroup.add(this._tickText.group);
      }
    }
  }, {
    key: "getOrigin",
    value: function getOrigin() {
      //todo  后续可以通过mmvis生成,该方法放到坐标系,针对多轴给出不同的原点
      var _coordSystem = this._coordSystem;

      var coordBoundBox = _coordSystem.getBoundbox();

      var _size = new Vector3(); //空间盒子的大小


      coordBoundBox.getSize(_size);
      this.boundboxSize = _size.clone();
      var depth = _size.z;

      var origin = _coordSystem.getOrigin();

      var segment = _coordSystem.coord.yAxis.length;

      var index = _.indexOf(_coordSystem.coord.yAxis, this._opt);

      var step = 0;

      if (segment == 1) {
        step = 0;
      } else {
        step = index / (segment - 1);
      }

      origin.setZ(depth * -step);
      this.origin = origin;
    }
  }, {
    key: "updateAxis",
    value: function updateAxis() {//这里可能需要重构
      //todo 根据相机移动计算tickLine & tickText的位置 
    }
  }, {
    key: "_getName",
    value: function _getName() {}
  }, {
    key: "_initData",
    value: function _initData(data) {
      var me = this;
      this.dataSection = data.getDataSection();
      me._formatTextSection = [];
      me._textElements = [];

      _.each(me.dataSection, function (val, i) {
        me._formatTextSection[i] = me._getFormatText(val, i);
      });

      if (this.label.rotation != 0) {
        //如果是旋转的文本，那么以右边为旋转中心点
        this.label.textAlign = "right";
      }

      !("minVal" in this._opt) && (this.minVal = _.min(this.dataSection));

      if (isNaN(this.minVal) || this.minVal == Infinity) {
        this.minVal = 0;
      }
      !("maxVal" in this._opt) && (this.maxVal = _.max(this.dataSection));

      if (isNaN(this.maxVal) || this.maxVal == Infinity) {
        this.maxVal = 1;
      }

      this._getName();
    }
  }, {
    key: "_getFormatText",
    value: function _getFormatText(val, i) {
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
      }
      return res;
    }
  }, {
    key: "draw",
    value: function draw() {
      //this._initModules();
      if (!this.enabled) return;

      this._axisLine.draw();

      this._tickLine.draw();

      this._tickText.draw(); // console.log('y axis 100 pos: ', this._root.currCoord.getYAxisPosition(100));

    }
  }, {
    key: "dispose",
    value: function dispose() {
      this._axisLine.dispose();

      this._tickLine.dispose();

      this._tickText.dispose();

      this._root.orbitControls.off('change', this._onChangeBind);

      this._onChangeBind = null;
    }
  }, {
    key: "resetData",
    value: function resetData() {
      this._initData(this.axisAttribute);

      this.getOrigin();

      this._axisLine.resetData();

      this._tickLine.resetData(this._axisLine, this.axisAttribute);

      this._tickText.resetData(this._axisLine, this.axisAttribute, this._formatTextSection);
    }
  }]);

  return YAxis;
}(Component);

var XAxis = /*#__PURE__*/function (_Component) {
  _inherits(XAxis, _Component);

  var _super = _createSuper(XAxis);

  function XAxis(_cartesionUI) {
    var _this;

    _classCallCheck(this, XAxis);

    _this = _super.call(this, _cartesionUI._coordSystem);
    _this.name = 'XAxis';
    var opt = _this._opt = _this._coordSystem.coord.xAxis;
    _this._cartesionUI = _cartesionUI;
    _this.width = 0;
    _this.height = 0;
    _this.title = {
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
    _this._title = null; //this.title对应的文本对象

    _this.enabled = true;
    _this.axisLine = {
      enabled: 1,
      //是否有轴线
      lineWidth: 1,
      strokeStyle: '#333'
    };
    _this.tickLine = {
      enabled: 1,
      lineWidth: 1,
      //线宽像素
      lineLength: 20,
      //线长(空间单位)
      strokeStyle: '#333',
      offset: 0 //空间单位

    };
    _this.label = {
      enabled: 1,
      fontColor: '#333',
      fontSize: 12,
      rotation: 0,
      format: null,
      offset: {
        x: 20,
        y: 0,
        z: 40
      },
      textAlign: "center",
      //水平方向对齐: left  right center 
      verticalAlign: 'bottom',
      //垂直方向对齐 top bottom middle
      lineHeight: 1,
      evade: true //是否开启逃避检测，目前的逃避只是隐藏

    };

    if (opt.isH && (!opt.label || opt.label.rotaion === undefined)) {
      //如果是横向直角坐标系图
      _this.label.rotation = 90;
    }
    _this.maxTxtH = 0;
    _this.pos = {
      x: 0,
      y: 0
    }; // this.dataOrg = []; //源数据

    _this.dataSection = []; //默认就等于源数据,也可以用户自定义传入来指定

    _this.layoutData = []; //{x:100, value:'1000',visible:true}

    _this.sprite = null; //过滤器，可以用来过滤哪些yaxis 的 节点是否显示已经颜色之类的
    //@params params包括 dataSection , 索引index，txt(canvax element) ，line(canvax element) 等属性

    _this.filter = null; //function(params){}; 

    _this.isH = false; //是否为横向转向的x轴

    _this.animation = false; //layoutType == "proportion"的时候才有效

    _this.maxVal = null;
    _this.minVal = null;
    _this.ceilWidth = 0; //x方向一维均分长度, layoutType == peak 的时候要用到

    _this.layoutType = "rule"; // rule（均分，起点在0） , peak（均分，起点在均分单位的中心）, proportion（实际数据真实位置，数据一定是number）
    //如果用户有手动的 trimLayout ，那么就全部visible为true，然后调用用户自己的过滤程序
    //trimLayout就事把arr种的每个元素的visible设置为true和false的过程
    //function

    _this.trimLayout = null;
    _this.posParseToInt = false; //比如在柱状图中，有得时候需要高精度的能间隔1px的柱子，那么x轴的计算也必须要都是整除的

    _.extend(true, _assertThisInitialized(_this), opt); // this.label.enabled = this.enabled && this.label.enabled;
    // this.tickLine.enabled = this.enabled && this.tickLine.enabled;
    // this.axisLine.enabled = this.enabled && this.axisLine.enabled;


    _this.axisAttribute = _this._coordSystem.xAxisAttribute;

    _this.init(opt, _this.axisAttribute); //xAxis的field只有一个值,
    //this.field = _.flatten([this._coord.xAxisAttribute.field])[0];


    _this.group.visible = !!_this.enabled;
    return _this;
  }

  _createClass(XAxis, [{
    key: "init",
    value: function init(opt, data) {
      var me = this; // this.rulesGroup = this._root.app.addGroup({ name: 'rulesSprite' });
      // this.group.add(this.rulesGroup);

      this._initData(data);

      this._onChangeBind = function () {
        me._initModules();
      };

      this._root.orbitControls.on('change', this._onChangeBind);

      me._initModules();
    }
  }, {
    key: "_initData",
    value: function _initData(data) {
      var me = this;

      if (data && data.field) {
        this.field = data.field;
      }

      this.dataSection = data.dataSection;
      me._formatTextSection = [];
      me._textElements = [];

      _.each(me.dataSection, function (val, i) {
        me._formatTextSection[i] = me._getFormatText(val, i);
      });

      if (this.label.rotation != 0) {
        //如果是旋转的文本，那么以右边为旋转中心点
        this.label.textAlign = "right";
      }

      !("minVal" in this._opt) && (this.minVal = _.min(this.dataSection));

      if (isNaN(this.minVal) || this.minVal == Infinity) {
        this.minVal = 0;
      }
      !("maxVal" in this._opt) && (this.maxVal = _.max(this.dataSection));

      if (isNaN(this.maxVal) || this.maxVal == Infinity) {
        this.maxVal = 1;
      }

      this._getName();
    }
  }, {
    key: "_getFormatText",
    value: function _getFormatText(val, i) {
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
      }
      return res;
    }
  }, {
    key: "_initModules",
    value: function _initModules() {
      var _this2 = this;

      //todo 这个方法后续重构
      //初始化轴线
      var _axisDir = new Vector3(1, 0, 0);

      var _coordSystem = this._coordSystem;

      var coordBoundBox = _coordSystem.getBoundbox();

      var _size = new Vector3(); //空间盒子的大小


      coordBoundBox.getSize(_size);
      var height = _size.y,
          depth = _size.z;

      var origin = _coordSystem.getOrigin();

      var _tickLineDir = new Vector3(0, 0, 1);

      var _faceInfo = this._cartesionUI.getFaceInfo();

      var _verticalAlign = this.label.verticalAlign;

      var _offsetZ = this.label.offset.z + this.axisLine.lineWidth + this.tickLine.lineLength + this.tickLine.offset;

      if (_faceInfo.bottom.visible) {
        if (_faceInfo.back.visible) {
          origin = _coordSystem.getOrigin();
          _tickLineDir = new Vector3(0, 0, 1);
        } else {
          origin = new Vector3(0, 0, -depth);
          _tickLineDir = new Vector3(0, 0, -1);
          _offsetZ *= -1;
        }

        _verticalAlign = 'bottom';
      } else {
        //top 可见
        if (_faceInfo.back.visible) {
          origin = new Vector3(0, height, 0);
          _tickLineDir = new Vector3(0, 0, 1);
        } else {
          origin = new Vector3(0, height, -depth);
          _tickLineDir = new Vector3(0, 0, -1);
          _offsetZ *= -1;
        }

        _verticalAlign = 'top';
      }

      if (this._axisLine) {
        if (this._axisLine.getOrigin().equals(origin)) {
          return;
        }

        this._axisLine.setOrigin(origin);

        this._axisLine.update(); //二次绘制


        this._tickLine.setDir(_tickLineDir);

        this._tickLine.initData(this._axisLine, this.axisAttribute, _coordSystem.getXAxisPosition);

        this._tickLine.update();

        this._tickText.setDir(_tickLineDir);

        this._tickText.offset.setZ(_offsetZ);

        this._tickText.initData(this._axisLine, this.axisAttribute, _coordSystem.getXAxisPosition);

        this._tickText.setVerticalAlign(_verticalAlign);
      } else {
        this._axisLine = new AxisLine(_coordSystem, this.axisLine);

        this._axisLine.setDir(_axisDir);

        this._axisLine.setOrigin(origin);

        this._axisLine.setLength(this.axisAttribute.axisLength);

        this._axisLine.setGroupName('xAxisLine');

        this._axisLine.drawStart();

        this.group.add(this._axisLine.group); //初始化tickLine

        this._tickLine = new TickLines(_coordSystem, this.tickLine);

        this._tickLine.setDir(_tickLineDir);

        this._tickLine.initData(this._axisLine, this.axisAttribute, _coordSystem.getXAxisPosition);

        this._tickLine.drawStart();

        this.group.add(this._tickLine.group); //初始化tickText

        this._tickText = new TickTexts(_coordSystem, this.label);
        this._tickText.offset.z += this.axisLine.lineWidth + this.tickLine.lineWidth + this.tickLine.offset;

        this._tickText.setVerticalAlign(_verticalAlign);

        this._tickText.setDir(_tickLineDir);

        this._tickText.initData(this._axisLine, this.axisAttribute, _coordSystem.getXAxisPosition); //this._tickText.initData(this._axisLine,this.axisAttribute);


        this._tickText.drawStart(this._formatTextSection);

        this._root.labelGroup.add(this._tickText.group); //this.group.add(this._tickText.group);


        this._tickText.labels.forEach(function (label, a) {
          _.isFunction(_this2.filter) && _this2.filter({
            layoutData: _this2.axisAttribute.dataSectionLayout,
            index: a,
            label: label,
            line: _this2._tickLine.lines[a]
          });
        });
      }
    }
  }, {
    key: "_getName",
    value: function _getName() {// if ( this.title.content ) {
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
    } // evade() {
    //     //label个数
    //     let num = this.axisAttribute.dataSectionLayout.length;
    //     //轴长
    //     let labels = this._tickText.labels;
    //     let orgPoint1 = this._tickText.getTextPos(labels[0].userData.text);
    //     let orgPoint2 = this._tickText.getTextPos(labels[labels.length - 1].userData.text);
    //     let point1 = this._coordSystem.positionToScreen(orgPoint1.clone());
    //     let point2 = this._coordSystem.positionToScreen(orgPoint2.clone());
    //     //屏幕空间下的轴长
    //     let lengthInScreen = point2.distanceTo(point1);
    //     console.log(lengthInScreen);
    //     debugger
    // }

  }, {
    key: "draw",
    value: function draw() {
      this._axisLine.draw();

      this._tickLine.draw();

      this._tickText.draw(); //console.log('x axis 2 pos: ',this._root.currCoord.getXAxisPosition(2));

    }
  }, {
    key: "dispose",
    value: function dispose() {
      this._axisLine.dispose();

      this._tickLine.dispose();

      this._tickText.dispose();

      this._root.orbitControls.off('change', this._onChangeBind);

      this._onChangeBind = null;
    }
  }, {
    key: "resetData",
    value: function resetData() {
      this._initData(this.axisAttribute); //this.getOrigin();


      this._axisLine.resetData();

      this._tickLine.resetData(this._axisLine, this.axisAttribute);

      this._tickText.resetData(this._axisLine, this.axisAttribute, this._formatTextSection);
    }
  }]);

  return XAxis;
}(Component);

var ZAxis = /*#__PURE__*/function (_Component) {
  _inherits(ZAxis, _Component);

  var _super = _createSuper(ZAxis);

  function ZAxis(_cartesionUI) {
    var _this;

    _classCallCheck(this, ZAxis);

    _this = _super.call(this, _cartesionUI._coordSystem);
    _this.name = 'ZAxis';
    var opt = _this._opt = _this._coordSystem.coord.zAxis;
    _this._cartesionUI = _cartesionUI;
    _this._coord = _this._coordSystem.coord || {};
    _this.width = 0;
    _this.height = 0;
    _this.title = {
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
    _this._title = null; //this.title对应的文本对象

    _this.enabled = true;
    _this.tickLine = {
      enabled: 1,
      lineWidth: 1,
      //线宽像素
      lineLength: 20,
      //线长(空间单位)
      strokeStyle: '#333',
      offset: 0 //空间单位

    };
    _this.axisLine = {
      enabled: 1,
      //是否有轴线
      lineWidth: 1,
      strokeStyle: '#333'
    };
    _this.label = {
      enabled: 1,
      fontColor: '#333',
      fontSize: 12,
      rotation: 0,
      format: null,
      offset: {
        x: 40,
        y: 0,
        z: 0
      },
      textAlign: "left",
      //水平方向对齐: left  right center 
      verticalAlign: 'middle',
      //垂直方向对齐 top bottom middle
      lineHeight: 1 //  evade: true  //是否开启逃避检测，目前的逃避只是隐藏

    };

    if (opt.isH && (!opt.label || opt.label.rotaion === undefined)) {
      //如果是横向直角坐标系图
      _this.label.rotation = 90;
    }

    _this.maxTxtH = 0;
    _this.pos = {
      x: 0,
      y: 0
    }; //this.dataOrg = []; //源数据

    _this.dataSection = []; //默认就等于源数据,也可以用户自定义传入来指定

    _this.layoutData = []; //{x:100, value:'1000',visible:true}

    _this.sprite = null; //过滤器，可以用来过滤哪些yaxis 的 节点是否显示已经颜色之类的
    //@params params包括 dataSection , 索引index，txt(canvax element) ，line(canvax element) 等属性

    _this.filter = null; //function(params){}; 

    _this.isH = false; //是否为横向转向的x轴

    _this.animation = false; //layoutType == "proportion"的时候才有效

    _this.maxVal = null;
    _this.minVal = null;
    _this.ceilWidth = 0; //x方向一维均分长度, layoutType == peak 的时候要用到

    _this.layoutType = "peak"; // rule（均分，起点在0） , peak（均分，起点在均分单位的中心）, proportion（实际数据真实位置，数据一定是number）
    //如果用户有手动的 trimLayout ，那么就全部visible为true，然后调用用户自己的过滤程序
    //trimLayout就事把arr种的每个元素的visible设置为true和false的过程
    //function

    _this.trimLayout = null; // if (!opt._coord.zAxisAttribute.section.length) {
    //     this.depth = 50;
    // }

    _this.posParseToInt = false; //比如在柱状图中，有得时候需要高精度的能间隔1px的柱子，那么x轴的计算也必须要都是整除的

    _.extend(true, _assertThisInitialized(_this), opt);

    _this.label.enabled = _this.enabled && _this.label.enabled;
    _this.tickLine.enabled = _this.enabled && _this.tickLine.enabled;
    _this.axisLine.enabled = _this.enabled && _this.axisLine.enabled;
    _this.axisAttribute = _this._coordSystem.zAxisAttribute;

    _this.init(opt, _this.axisAttribute);

    _this.group.visible = !!_this.enabled;
    return _this;
  }

  _createClass(ZAxis, [{
    key: "init",
    value: function init(opt, data) {
      var me = this; // this.rulesGroup = this._root.app.addGroup({ name: 'rulesSprite' });
      // this.group.add(this.rulesGroup);

      this._initData(data);

      this._onChangeBind = function () {
        me._initModules();
      };

      this._root.orbitControls.on('change', this._onChangeBind);

      me._initModules();
    }
  }, {
    key: "_initData",
    value: function _initData(data) {
      var me = this;

      if (data && data.field) {
        this.field = data.field;
      }

      this.dataSection = data.getDataSection();
      var zCustomSection = data._opt.dataSection || [];
      me._formatTextSection = [];
      me._textElements = [];

      _.each(me.dataSection, function (val, i) {
        val = zCustomSection[i] || val;
        me._formatTextSection[i] = me._getFormatText(val, i);
      });

      if (this.label.rotation != 0) {
        //如果是旋转的文本，那么以右边为旋转中心点
        this.label.textAlign = "right";
      }

      !("minVal" in this._opt) && (this.minVal = _.min(this.dataSection));

      if (isNaN(this.minVal) || this.minVal == Infinity) {
        this.minVal = 0;
      }
      !("maxVal" in this._opt) && (this.maxVal = _.max(this.dataSection));

      if (isNaN(this.maxVal) || this.maxVal == Infinity) {
        this.maxVal = 1;
      }

      this._getName();

      this._setZAxisWidth();
    }
  }, {
    key: "_getFormatText",
    value: function _getFormatText(val, i) {
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
      }
      return res;
    }
  }, {
    key: "_initModules",
    value: function _initModules() {
      //初始化轴线
      var _axisDir = new Vector3(0, 0, -1);

      var _coordSystem = this._coordSystem;

      var coordBoundBox = _coordSystem.getBoundbox();

      var _size = new Vector3();

      coordBoundBox.getSize(_size);
      var width = _size.x,
          height = _size.y;
      var origin = new Vector3(width, 0, 0);

      var _tickLineDir = new Vector3(1, 0, 0);

      var _faceInfo = this._cartesionUI.getFaceInfo();

      var _textAlign = this.label.textAlign;

      var _offsetX = this.label.offset.x + this.axisLine.lineWidth + this.tickLine.lineLength + this.tickLine.offset;

      if (_faceInfo.bottom.visible) {
        if (_faceInfo.left.visible) {
          origin = new Vector3(width, 0, 0);
          _tickLineDir = new Vector3(1, 0, 0);
        } else {
          origin = new Vector3(0, 0, 0);
          _tickLineDir = new Vector3(-1, 0, 0);
        }

        if (_faceInfo.front.visible) {
          if (_faceInfo.left.visible) {
            _textAlign = 'right';
          } else {
            _textAlign = 'left';
            _offsetX = -_offsetX;
          }
        } else {
          if (_faceInfo.left.visible) {
            _textAlign = 'left';
          } else {
            _textAlign = 'right';
            _offsetX = -_offsetX;
          }
        }
      } else {
        //top 可见
        if (_faceInfo.left.visible) {
          origin = new Vector3(width, height, 0);
          _tickLineDir = new Vector3(1, 0, 0);
        } else {
          origin = new Vector3(0, height, 0);
          _tickLineDir = new Vector3(-1, 0, 0);
        }

        if (_faceInfo.front.visible) {
          if (_faceInfo.left.visible) {
            _textAlign = 'right';
          } else {
            _textAlign = 'left';
            _offsetX = -_offsetX;
          }
        } else {
          if (_faceInfo.left.visible) {
            _textAlign = 'left';
          } else {
            _textAlign = 'right';
            _offsetX = -_offsetX;
          }
        }
      }

      if (this._axisLine) {
        if (this._axisLine.getOrigin().equals(origin)) {
          return;
        } //this._axisLine.dispose();


        this._axisLine.setOrigin(origin);

        this._axisLine.update(); // this._axisLine.drawStart();
        // this._axisLine.draw();
        //二次绘制
        // this._tickLine.dispose();


        this._tickLine.setDir(_tickLineDir);

        this._tickLine.initData(this._axisLine, this.axisAttribute, _coordSystem.getZAxisPosition);

        this._tickLine.update(); // this._tickLine.drawStart();
        // this._tickLine.draw();
        //this._tickText.dispose();


        this._tickText.setDir(_tickLineDir);

        this._tickText.initData(this._axisLine, this.axisAttribute, _coordSystem.getZAxisPosition);

        this._tickText.setTextAlign(_textAlign);

        this._tickText.offset.setX(_offsetX); // this._tickText.drawStart(this._formatTextSection);
        // this._tickText.draw();

      } else {
        this._axisLine = new AxisLine(_coordSystem, this.axisLine);

        this._axisLine.setDir(_axisDir);

        this._axisLine.setOrigin(origin);

        this._axisLine.setLength(this.axisAttribute.axisLength);

        this._axisLine.setGroupName('zAxisLine');

        this._axisLine.drawStart();

        this.group.add(this._axisLine.group); //初始化tickLine

        this._tickLine = new TickLines(_coordSystem, this.tickLine);

        this._tickLine.setDir(_tickLineDir);

        this._tickLine.initData(this._axisLine, this.axisAttribute, _coordSystem.getZAxisPosition);

        this._tickLine.drawStart();

        this.group.add(this._tickLine.group); //初始化tickText

        this._tickText = new TickTexts(_coordSystem, this.label);
        this._tickText.offset.x = _offsetX;

        this._tickText.setDir(_tickLineDir);

        this._tickText.initData(this._axisLine, this.axisAttribute, _coordSystem.getZAxisPosition); //this._tickText.initData(this._axisLine, _coordSystem.zAxisAttribute);


        this._tickText.drawStart(this._formatTextSection); //this.group.add(this._tickText.group);


        this._root.labelGroup.add(this._tickText.group);
      }
    }
  }, {
    key: "_getName",
    value: function _getName() {// if ( this.title.content ) {
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
  }, {
    key: "_setZAxisWidth",
    value: function _setZAxisWidth() {
      //检测下文字的宽度
      var me = this;
      var _coordSystem = me._coordSystem;

      if (!me.enabled) {
        me.width = 0;
      } else {
        var _maxTextWidth = 0;

        if (this.label.enabled) {
          //me._formatTextSection.forEach((val)=>{
          var width = TextTexture.getTextWidth(me._formatTextSection, ['normal', 'normal', this.label.fontColor, this.label.fontSize].join(' '));
          _maxTextWidth = Math.max(_maxTextWidth, width); //})
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
        this._maxTextWidth = _maxTextWidth;

        var ratio = _coordSystem.getRatioPixelToWorldByOrigin();

        this.width = (_maxTextWidth + this.tickLine.lineLength + this.tickLine.offset + this.label.offset + this.axisLine.lineWidth) * ratio; //this.width+=10;
        // if (this._title) {
        //     this.height += this._title.getTextHeight()
        // };
      }
    } //设置布局

  }, {
    key: "setLayout",
    value: function setLayout(opt) {}
  }, {
    key: "draw",
    value: function draw() {
      this._axisLine.draw();

      this._tickLine.draw();

      this._tickText.draw(); // console.log('z axis 项目三 pos: ',this._root.currCoord.getZAxisPosition('项目三'));

    }
  }, {
    key: "dispose",
    value: function dispose() {
      this._axisLine.dispose();

      this._tickLine.dispose();

      this._tickText.dispose();

      this._root.orbitControls.off('change', this._onChangeBind);

      this._onChangeBind = null;
    }
  }, {
    key: "resetData",
    value: function resetData() {
      this._initData(this.axisAttribute); //this.getOrigin();


      this._axisLine.resetData();

      this._tickLine.resetData(this._axisLine, this.axisAttribute);

      this._tickText.resetData(this._axisLine, this.axisAttribute, this._formatTextSection);
    }
  }]);

  return ZAxis;
}(Component);

var Grid = /*#__PURE__*/function (_Component) {
  _inherits(Grid, _Component);

  var _super = _createSuper(Grid);

  function Grid(_cartesionUI) {
    var _this;

    _classCallCheck(this, Grid);

    _this = _super.call(this, _cartesionUI._coordSystem);
    _this.name = "Grid";
    var opt = _this._opt = _this._coordSystem.coord.grid;
    _this.coord = _this._coordSystem.coord;
    _this._cartesionUI = _cartesionUI;
    _this.enabled = true;
    _this.line = {
      //x方向上的线
      enabled: true,
      lineType: 'solid',
      //线条类型(dashed = 虚线 | solid = 实线)
      strokeStyle: '#e5e5e5'
    };
    _this.fill = {
      enabled: false,
      fillStyle: '#ccc',
      alpha: 0.1
    };

    _.extend(true, _assertThisInitialized(_this), opt);

    _this.init();

    return _this;
  }

  _createClass(Grid, [{
    key: "init",
    value: function init() {
      var me = this;
      var app = this._root.app;
      this.leftGroup = app.addGroup({
        name: 'leftGroup'
      }); //x轴上的线集合

      this.rightGroup = app.addGroup({
        name: 'rightGroup'
      });
      this.topGroup = app.addGroup({
        name: 'topGroup'
      });
      this.bottomGroup = app.addGroup({
        name: 'bottomGroup'
      });
      this.frontGroup = app.addGroup({
        name: 'frontGroup'
      });
      this.backGroup = app.addGroup({
        name: 'backGroup'
      });
      this.group.add(this.leftGroup);
      this.group.add(this.rightGroup);
      this.group.add(this.topGroup);
      this.group.add(this.bottomGroup);
      this.group.add(this.frontGroup);
      this.group.add(this.backGroup);
      this.group.renderOrder = -1;

      this._onChangeBind = function () {
        if (!me.enabled) return;

        var _faceInfo = me._cartesionUI.getFaceInfo();

        _.each(_faceInfo, function (value, key) {
          me[key + 'Group'].visible = value.visible;
        });
      };

      this._root.orbitControls.on('change', this._onChangeBind);

      this.width = this._coordSystem.xAxisAttribute.axisLength;
      this.height = this._coordSystem.getYAxis().attr.axisLength;
      this.depth = this._coordSystem.zAxisAttribute.axisLength;
    }
  }, {
    key: "drawFace",
    value: function drawFace() {
      var me = this;
      var app = me._root.app;
      if (!me.enabled) return;
      var _coordSystem = this._coordSystem;

      var _faceInfo = this._cartesionUI.getFaceInfo();

      if (me.fill.enabled) {
        //todo: 多次调用 group可能会重复加入,这里需要销毁以前的数据 reset统一处理吧
        //todo view中构建 materail 通过fill 使用同一份material
        this.leftFace = app.createPlane(this.depth, this.height, undefined, _faceInfo.left, me.leftGroup, this.fill);
        this.rightFace = app.createPlane(this.depth, this.height, undefined, _faceInfo.right, me.rightGroup, this.fill);
        this.topFace = app.createPlane(this.width, this.depth, undefined, _faceInfo.top, me.topGroup, this.fill);
        this.bottomFace = app.createPlane(this.width, this.depth, undefined, _faceInfo.bottom, me.bottomGroup, this.fill);
        this.frontFace = app.createPlane(this.width, this.height, undefined, _faceInfo.front, me.frontGroup, this.fill);
        this.backFace = app.createPlane(this.width, this.height, undefined, _faceInfo.back, me.backGroup, this.fill);
      }
    }
  }, {
    key: "drawLine",
    value: function drawLine() {
      var _this2 = this;

      //todo 原生的线条会出现锯齿,需要该用三角面来绘制
      var me = this;
      var app = me._root.app;
      if (!me.enabled) return;
      var xSection = me._coordSystem.xAxisAttribute.dataSectionLayout;

      var yAttribute = me._coordSystem.getYAxis().attr;

      var ySection = yAttribute.dataSectionLayout;
      var zSection = me._coordSystem.zAxisAttribute.dataSectionLayout;

      if (!me.line.enabled) {
        return;
      } //绘制左面的线条


      var LinesVectors = [];
      ySection.forEach(function (item) {
        var posY = item.pos;
        LinesVectors.push(new Vector3(0, posY, 0));
        LinesVectors.push(new Vector3(0, posY, -_this2.depth));
      });
      zSection.forEach(function (item) {
        var posZ = item.pos;
        LinesVectors.push(new Vector3(0, 0, -posZ));
        LinesVectors.push(new Vector3(0, _this2.height, -posZ));
      });
      var lines = app.createCommonLine(LinesVectors, this.line);
      me.leftGroup.add(lines); //绘制右面的线条

      LinesVectors = [];
      ySection.forEach(function (item) {
        var posY = item.pos;
        LinesVectors.push(new Vector3(_this2.width, posY, 0));
        LinesVectors.push(new Vector3(_this2.width, posY, -_this2.depth));
      });
      zSection.forEach(function (item) {
        var posZ = item.pos;
        LinesVectors.push(new Vector3(_this2.width, 0, -posZ));
        LinesVectors.push(new Vector3(_this2.width, _this2.height, -posZ));
      });
      lines = app.createCommonLine(LinesVectors, this.line);
      me.rightGroup.add(lines); //绘制上面的线条

      LinesVectors = [];
      xSection.forEach(function (item) {
        var posX = item.pos;
        LinesVectors.push(new Vector3(posX, _this2.height, 0));
        LinesVectors.push(new Vector3(posX, _this2.height, -_this2.depth));
      });
      zSection.forEach(function (item) {
        var posZ = item.pos;
        LinesVectors.push(new Vector3(0, _this2.height, -posZ));
        LinesVectors.push(new Vector3(_this2.width, _this2.height, -posZ));
      });
      lines = app.createCommonLine(LinesVectors, this.line);
      me.topGroup.add(lines); //绘制下面的线条

      LinesVectors = [];
      xSection.forEach(function (item) {
        var posX = item.pos;
        LinesVectors.push(new Vector3(posX, 0, 0));
        LinesVectors.push(new Vector3(posX, 0, -_this2.depth));
      });
      zSection.forEach(function (item) {
        var posZ = item.pos;
        LinesVectors.push(new Vector3(0, 0, -posZ));
        LinesVectors.push(new Vector3(_this2.width, 0, -posZ));
      });
      lines = app.createCommonLine(LinesVectors, this.line);
      me.bottomGroup.add(lines); //绘制前面的线条

      LinesVectors = [];
      xSection.forEach(function (item) {
        var posX = item.pos;
        LinesVectors.push(new Vector3(posX, 0, 0));
        LinesVectors.push(new Vector3(posX, _this2.height, 0));
      });
      ySection.forEach(function (item) {
        var posY = item.pos;
        LinesVectors.push(new Vector3(0, posY, 0));
        LinesVectors.push(new Vector3(_this2.width, posY, 0));
      });
      lines = app.createCommonLine(LinesVectors, this.line);
      me.frontGroup.add(lines); //绘制后面的线条

      LinesVectors = [];
      xSection.forEach(function (item) {
        var posX = item.pos;
        LinesVectors.push(new Vector3(posX, 0, -_this2.depth));
        LinesVectors.push(new Vector3(posX, _this2.height, -_this2.depth));
      });
      ySection.forEach(function (item) {
        var posY = item.pos;
        LinesVectors.push(new Vector3(0, posY, -_this2.depth));
        LinesVectors.push(new Vector3(_this2.width, posY, -_this2.depth));
      });
      lines = app.createCommonLine(LinesVectors, this.line);
      me.backGroup.add(lines);
    }
  }, {
    key: "draw",
    value: function draw() {
      this.drawFace();
      this.drawLine();
    }
  }, {
    key: "dispose",
    value: function dispose() {
      _get(_getPrototypeOf(Grid.prototype), "dispose", this).call(this);

      this._root.orbitControls.off('change', this._onChangeBind);

      this._onChangeBind = null;
    }
  }, {
    key: "resetData",
    value: function resetData() {
      this.dispose();
      this.width = this._coordSystem.xAxisAttribute.axisLength;
      this.height = this._coordSystem.getYAxis().attr.axisLength;
      this.depth = this._coordSystem.zAxisAttribute.axisLength;
      this.draw();
    }
  }]);

  return Grid;
}(Component);

var Cartesian3DUI = /*#__PURE__*/function (_Component) {
  _inherits(Cartesian3DUI, _Component);

  var _super = _createSuper(Cartesian3DUI);

  function Cartesian3DUI(_coordSystem) {
    var _this;

    _classCallCheck(this, Cartesian3DUI);

    _this = _super.call(this, _coordSystem); //坐标轴实例

    _this._xAxis = null;
    _this._yAxis = [];
    _this._zAxis = null;
    _this._grid = null;
    var opt = _coordSystem.coord;
    _this.type = "cartesian3d";
    _this.name = 'Cartesian3DUI';
    _this.horizontal = false; //配置信息

    _this.xAxis = opt.xAxis || {};
    _this.yAxis = opt.yAxis || [];
    _this.zAxis = opt.zAxis || {};
    _this.grid = opt.grid || {};

    _.extend(true, _assertThisInitialized(_this), opt);

    if (opt.horizontal) {
      _this.xAxis.isH = true;
      _this.zAxis.isH = true;

      _.each(_this.yAxis, function (yAxis) {
        yAxis.isH = true;
      });
    }

    if ("enabled" in opt) {
      //如果有给直角坐标系做配置display，就直接通知到xAxis，yAxis，grid三个子组件
      _.extend(true, _this.xAxis, {
        enabled: opt.enabled
      });

      _.each(_this.yAxis, function (yAxis) {
        _.extend(true, yAxis, {
          enabled: opt.enabled
        });
      });

      _.extend(true, _this.zAxis, {
        enabled: opt.enabled
      });

      _this.grid.enabled = opt.enabled;
    }

    _this.init(opt);

    return _this;
  }

  _createClass(Cartesian3DUI, [{
    key: "init",
    value: function init(opt) {
      //多个Y轴单独构建一个组
      this.yAxisGroup = this._root.app.addGroup({
        name: 'yAxisGroup'
      });

      this._initModules(); //todo z轴的宽度没有计算在内
      //todo  是否要计算offset值去更改最终原点的位置
      // let offset = new Vector3(this._yAxisLeft.width, this._xAxis.height, 0);
      //todo 三维空间中不需要考虑原点的移动 


      this._coordSystem.updateOrigin(new Vector3(0, 0, 0));
    }
  }, {
    key: "_initModules",
    value: function _initModules() {
      var _this2 = this;

      this._grid = new Grid(this);
      this.group.add(this._grid.group);
      this._xAxis = new XAxis(this);
      this.group.add(this._xAxis.group);
      this._zAxis = new ZAxis(this);
      this.group.add(this._zAxis.group);
      this.yAxis.forEach(function (opt) {
        var _yAxis = new YAxis(_this2, opt);

        _this2._yAxis.push(_yAxis);

        _this2.yAxisGroup.add(_yAxis.group);
      });
      this.group.add(this.yAxisGroup);
    }
  }, {
    key: "draw",
    value: function draw() {
      // this._yAxisLeft.draw();
      this._yAxis.forEach(function (_yAxis) {
        _yAxis.draw();
      });

      this._xAxis.draw();

      this._zAxis.draw();

      this._grid.draw();
    }
  }, {
    key: "getFaceInfo",
    value: function getFaceInfo() {
      //todo 待优化
      var _coordSystem = this._coordSystem;

      var coordBoundBox = _coordSystem.getBoundbox();

      var _size = new Vector3(); //空间盒子的大小


      coordBoundBox.getSize(_size);
      var width = _size.x,
          height = _size.y,
          depth = _size.z;
      var lfb = new Vector3(0, 0, 0),
          //左前下
      lft = new Vector3(0, height, 0),
          //左前上  
      lbb = new Vector3(0, 0, -depth),
          //左后下 
      lbt = new Vector3(0, height, -depth),
          //左后上
      rfb = new Vector3(width, 0, 0),
          //左前下
      rft = new Vector3(width, height, 0),
          //左前上  
      rbb = new Vector3(width, 0, -depth),
          //左后下 
      rbt = new Vector3(width, height, -depth); //左后上

      var zDir = new Vector3(0, 0, 1);

      var coordCenter = this._coordSystem._getWorldPos(this._coordSystem.center);

      var cameraPos = coordCenter.clone();

      this._root.renderView._camera.getWorldPosition(cameraPos);

      var result = {
        left: {
          dir: new Vector3(1, 0, 0),
          //法线方向
          center: new Box3().setFromPoints([lft, lft, lbb, lbt]).getCenter(),
          visible: cameraPos.clone().cross(zDir).y <= 0
        },
        right: {
          dir: new Vector3(-1, 0, 0),
          //法线方向
          center: new Box3().setFromPoints([rft, rft, rbb, rbt]).getCenter(),
          visible: cameraPos.clone().cross(zDir).y > 0
        },
        top: {
          dir: new Vector3(0, -1, 0),
          //法线方向
          center: new Box3().setFromPoints([lft, rft, lbt, rbt]).getCenter(),
          visible: cameraPos.clone().cross(zDir).x < 0
        },
        bottom: {
          dir: new Vector3(0, 1, 0),
          //法线方向
          center: new Box3().setFromPoints([lfb, rfb, lbb, rbb]).getCenter(),
          visible: cameraPos.clone().cross(zDir).x >= 0
        },
        front: {
          dir: new Vector3(0, 0, -1),
          center: new Box3().setFromPoints([lfb, rfb, rft, lft]).getCenter(),
          visible: cameraPos.dot(zDir) < 0
        },
        back: {
          dir: new Vector3(0, 0, 1),
          center: new Box3().setFromPoints([lbb, rbb, rbt, lbt]).getCenter(),
          visible: cameraPos.dot(zDir) >= 0
        }
      };
      return result;
    }
  }, {
    key: "dispose",
    value: function dispose() {
      this._yAxis.forEach(function (_yAxis) {
        _yAxis.dispose();
      });

      this._xAxis.dispose();

      this._zAxis.dispose();

      this._grid.dispose();
    }
  }, {
    key: "resetData",
    value: function resetData() {
      this._yAxis.forEach(function (_yAxis) {
        _yAxis.resetData();
      });

      this._xAxis.resetData();

      this._zAxis.resetData();

      this._grid.resetData();
    }
  }]);

  return Cartesian3DUI;
}(Component);

var AxisAttribute = /*#__PURE__*/function (_Axis) {
  _inherits(AxisAttribute, _Axis);

  var _super = _createSuper(AxisAttribute);

  function AxisAttribute(opt, dataOrg) {
    var _this;

    _classCallCheck(this, AxisAttribute);

    _this = _super.call(this, opt, dataOrg);
    _this.field = opt.field || null;
    _this.exclude = opt.exclude || ['', undefined, null];

    if ("middleweight" in opt) {
      _this.setMiddleweight(opt.middleweight);
    }

    _this._nativeDataSection = [];
    return _this;
  }

  _createClass(AxisAttribute, [{
    key: "setDataSection",
    value: function setDataSection(dataSection$$1) {
      var _this2 = this;

      _get(_getPrototypeOf(AxisAttribute.prototype), "setDataSection", this).call(this, dataSection$$1);

      if (this.layoutType !== 'proportion') {
        this.dataSection = _.uniq(this.dataSection); //this._getDataSection();
        //空数据需要去除

        this.dataSection.forEach(function (item, i) {
          if (_this2.exclude.indexOf(item) !== -1) {
            _this2.dataSection.splice(i, 1);
          }
        });
        this.dataSectionGroup = [this.dataSection];
      }
    }
  }, {
    key: "getNativeDataSection",
    value: function getNativeDataSection() {
      if (this._nativeDataSection.length > 0) {
        return this._nativeDataSection;
      }

      if (this._opt.dataSection) {
        if (this.layoutType !== "proportion") {
          //非proportion 也就是 rule peak 模式下面
          this._nativeDataSection = _.flatten(this.dataOrg); //this._getDataSection();

          this._nativeDataSection = _.uniq(this._nativeDataSection);
        } else {
          this._nativeDataSection = this.getDataSection();
        }

        this._nativeDataSection = this._nativeDataSection;
      } else {
        this._nativeDataSection = this.getDataSection();
      }

      return this._nativeDataSection;
    }
  }, {
    key: "getPartDataOrg",
    value: function getPartDataOrg(fields) {
      var _this3 = this;

      var result = [];

      var map = this._opt.field.map(function (item) {
        return item.toString();
      });

      var _fieldArr = _.isArray(fields) ? fields : [fields];

      _fieldArr.forEach(function (field) {
        var index$$1 = _.indexOf(map, field.toString());

        result.push(_this3.dataOrg[index$$1]);
      });

      return result;
    }
  }, {
    key: "setMiddleweight",
    value: function setMiddleweight(val) {
      this.middleweight = val;
    } //多轴重新计算数据集
    //OVERFLOW Class

  }, {
    key: "_getCellCount",
    value: function _getCellCount() {
      if (this._cellCount !== null) {
        return this._cellCount;
      }

      var cellCount = 0;

      if (this.layoutType == "proportion") {
        cellCount = this.axisLength;
      } else {
        //todo 三维场景下,部分数据是重复的,所以直接在数据源中获取长度是不对的
        //if (this.dataOrg.length && this.dataOrg[0].length && this.dataOrg[0][0].length) {
        //    cellCount = this.dataOrg[0][0].length;
        //  }
        if (this.dataSection.length) {
          cellCount = this.dataSection.length;
        }
      }
      this._cellCount = cellCount;
      return cellCount;
    }
  }, {
    key: "getIndexOfVal",
    value: function getIndexOfVal(val) {
      var valInd = -1;

      if (this.layoutType == "proportion") {
        //先检查下 dataSectionLayout 中有没有对应的记录
        var _ind = this._getLayoutDataOf({
          val: val
        }).ind;

        if (_ind != undefined) {
          return _ind;
        }
        //所以这里要返回pos

        valInd = this.getPosOfVal(val);
      } else {
        var _ind = _.indexOf(this.dataSection, val);

        if (_ind != -1) {
          valInd = _ind;
        }
      }

      return valInd;
    }
  }]);

  return AxisAttribute;
}(axis);

AxisAttribute.resetDataSection = function (_axisAttributeDs) {
  var maxSegment = 0;
  var minSegmentUser = Infinity; //如果用户制定了某个轴的dataSection,就采用用户制定的最短dataSection的个数定义Y轴的数据
  //否则则采用自动计算后最多的段,重新计算其他的坐标轴
  //先计算一下,需要划分的段数

  for (var key in _axisAttributeDs) {
    var _axisAtt = _axisAttributeDs[key];

    var _currSection = _axisAtt.getDataSection();

    if (!_.isEmpty(_axisAtt._opt.dataSection)) {
      minSegmentUser = Math.min(minSegmentUser, _currSection.length);
    } else {
      maxSegment = Math.max(maxSegment, _currSection.length);
    }
  }

  var segment = minSegmentUser !== Infinity ? minSegmentUser : maxSegment;

  for (var _key in _axisAttributeDs) {
    var _axisAtt2 = _axisAttributeDs[_key];

    var _section = _axisAtt2.getDataSection();

    if (_section.length !== segment) {
      var step = (_section[_section.length - 1] - _section[0]) / (segment - 1);
      var newSection = [];

      for (var i = 0; i < segment; i++) {
        if (i == segment - 1) {
          newSection.push(_section[_section.length - 1]);
        } else {
          //这里默认数据保留两位小数,后期通过坐标轴配置中的format进行自定义的格式化
          var val = _section[0] + step * i;

          if (val.toString().split(".")[1] && val.toString().split(".")[1].length > 2) {
            newSection.push(+val.toFixed(2));
          } else {
            newSection.push(val);
          }
        }
      }

      _axisAtt2.setDataSection(newSection);

      _axisAtt2.calculateProps();
    }
  }
};

/** note: 
 * 获取所有的配置信息,取去配置中影响布局的相关参数
 * coord{
 *    xAsix:{}
 *    yAxis:[] 
 *    zAxis:{} 
 * }
 * 
 * graphs{}
 * 
 * makeline其他组件
 * 
 * 通过Data和相关的配置,给出各个坐标轴的DataSection,计算出各个轴上数据点对应的位置
 * 
 * ***/

var DEFAULT_AXIS = 'default_axis_for_Y';

var Cartesian3D = /*#__PURE__*/function (_InertialSystem) {
  _inherits(Cartesian3D, _InertialSystem);

  var _super = _createSuper(Cartesian3D);

  function Cartesian3D(root) {
    var _this;

    _classCallCheck(this, Cartesian3D);

    _this = _super.call(this, root);
    _this.type = "Cartesian3D";
    _this.offset = new Vector3(0, 0, 0);
    _this._coordUI = null;
    _this.group.name = 'cartesian3dSystem';
    return _this;
  }

  _createClass(Cartesian3D, [{
    key: "setDefaultOpts",
    value: function setDefaultOpts(opts) {
      var me = this;
      this._zSection = [];
      me.coord = {
        xAxis: {
          //波峰波谷布局模型，默认是柱状图的，折线图种需要做覆盖
          layoutType: "rule",
          //"peak",  
          //默认为false，x轴的计量是否需要取整， 这样 比如某些情况下得柱状图的柱子间隔才均匀。
          //比如一像素间隔的柱状图，如果需要精确的绘制出来每个柱子的间距是1px， 就必须要把这里设置为true
          posParseToInt: false
        },
        yAxis: [],
        //y轴至少有一个
        zAxis: {
          enabled: true,
          field: '',
          layoutType: "rule" //   depth: 50     //最大深度是1000

        }
      };
      opts = _.clone(opts); //规范Y轴的定义,采用数组形式,如果没有定义就初始化为空数组

      if (opts.coord.yAxis) {
        var _nyarr = [];

        _.each(_.flatten([opts.coord.yAxis]), function (yopt, index$$1) {
          //标记定义的Y轴信息是否在绘图中使用
          yopt._used = false; //如果坐标轴没有置顶名称,第一个为默认坐标轴,其余的将被舍弃

          if (_.isEmpty(yopt.name)) {
            if (index$$1 == 0) {
              yopt.name = DEFAULT_AXIS;
            } else {
              return;
            }
          }

          _nyarr.push(_.clone(yopt));
        });

        opts.coord.yAxis = _nyarr;
      } else {
        opts.coord.yAxis = [];
      }

      var getYaxisInfo = function getYaxisInfo(name) {
        var _opt = null;

        if (opts.coord.yAxis) {
          _.each(_.flatten([opts.coord.yAxis]), function (yopt) {
            if (yopt.name == name) {
              yopt._used = true;
              _opt = yopt;
            }
          });
        }

        return _opt;
      }; //根据opt中得Graphs配置，来设置 coord.yAxis


      if (opts.graphs) {
        //有graphs的就要用找到这个graphs.field来设置coord.yAxis
        for (var i = 0; i < opts.graphs.length; i++) {
          var graphs = opts.graphs[i];

          this._zSection.push(graphs.field.toString());

          if (graphs.type == "bar") {
            //如果graphs里面有柱状图，那么就整个xAxis都强制使用 peak 的layoutType
            me.coord.xAxis.layoutType = "peak";
            me.coord.zAxis.layoutType = "peak";
          }

          if (graphs.field) {
            //没有配置field的话就不绘制这个 graphs了
            //根据graphs中的数据整理y轴的数据
            var _axisName = graphs.yAxisName;

            if (!graphs.yAxisName) {
              //没有指定坐标轴的名称,取默认轴
              _axisName = DEFAULT_AXIS;
            } //增加Y轴


            var _tAxis = getYaxisInfo(_axisName);

            if (!_tAxis) {
              var _yAxisNew = {
                field: [],
                name: _axisName,
                _used: true
              };

              if (_.isArray(graphs.field)) {
                _yAxisNew.field = _yAxisNew.field.concat(graphs.field);
              } else {
                _yAxisNew.field.push(graphs.field);
              }

              opts.coord.yAxis.push(_yAxisNew);
            } else {
              if (_.isEmpty(_tAxis.field)) {
                _tAxis.field = [];
              }

              if (_.isArray(_tAxis.field)) {
                if (_.isArray(graphs.field)) {
                  _tAxis.field = _tAxis.field.concat(graphs.field);
                } else {
                  _tAxis.field.push(graphs.field);
                }
              } else {
                if (_.isArray(graphs.field)) {
                  _tAxis.field = [_tAxis.field].concat(graphs.field);
                } else {
                  _tAxis.field = [_tAxis.field].push(graphs.field);
                }
              }
            }
          } else {
            //在，直角坐标系中，每个graphs一定要有一个field设置，如果没有，就去掉这个graphs
            opts.graphs.splice(i--, 1);
          }
        }
      }

      for (var i = 0; i < opts.coord.yAxis.length; i++) {
        if (!opts.coord.yAxis[i].layoutType) {
          opts.coord.yAxis[i].layoutType = 'proportion'; //默认布局
        } //没有field的Y轴是无效的配置


        if (_.isEmpty(opts.coord.yAxis[i].field) || opts.coord.yAxis[i]._used == false) {
          opts.coord.yAxis.splice(i--, 1);
        }

        if (opts.coord.yAxis[i]) {
          delete opts.coord.yAxis[i]._used;
        }
      }
      return opts;
    }
  }, {
    key: "init",
    value: function init() {
      var _this2 = this;

      //先计算一次空间范围供计算坐标轴宽高使用
      this.getBoundbox();

      var _this$boundbox$getSiz = this.boundbox.getSize(),
          widith = _this$boundbox$getSiz.x,
          height = _this$boundbox$getSiz.y,
          depth = _this$boundbox$getSiz.z;

      var opt = _.clone(this.coord);

      this.xAxisAttribute = new AxisAttribute(opt.xAxis, this.getAxisDataFrame(opt.xAxis.field)); //new AxisAttribute(this._root);

      this.xAxisAttribute.setDataSection();
      this.xAxisAttribute.setAxisLength(widith); //默认Y轴

      this.yAxisAttribute = Object.create(null);
      var axisCount = 0;
      opt.yAxis.forEach(function (yopt) {
        var _yAxisAttr = _this2.yAxisAttribute[yopt.name];

        if (!_yAxisAttr) {
          _yAxisAttr = new AxisAttribute(yopt, _this2.getAxisDataFrame(yopt.field)); //new AxisAttribute(this._root);

          _this2.yAxisAttribute[yopt.name] = _yAxisAttr;

          _yAxisAttr.setDataSection();

          _yAxisAttr.setAxisLength(height);

          axisCount++;
        } else {
          console.error('Y轴设置报错了');
        }
      }); //如果是多Y轴的情况

      if (axisCount > 1) {
        AxisAttribute.resetDataSection(this.yAxisAttribute);
      } //Z轴如果设置了filed,按照数据轴的正常逻辑进行,否则Z轴按照Graphs配置中
      //的索引显示对应的名称 


      if (!this.isExistZAxisField()) {
        var _sectionZ = [];

        this._root.opt.graphs.forEach(function (yOps) {
          _sectionZ.push(yOps.field.toString());
        });

        this.zAxisAttribute = new AxisAttribute(opt.zAxis, [[_sectionZ]]); // this.zAxisAttribute.setDataSection();
        //  this.zAxisAttribute.calculateProps();
      } else {
        this.zAxisAttribute = new AxisAttribute(opt.zAxis, this.getAxisDataFrame(opt.zAxis.field));
      }

      this.zAxisAttribute.setDataSection();
      this.zAxisAttribute.setAxisLength(depth);
      this.fieldsMap = this._setFieldsMap();
      this.addLights();
      this.bindEvent();
    }
  }, {
    key: "_setFieldsMap",
    value: function _setFieldsMap() {
      var _this3 = this;
      var fieldInd = 0;

      var opt = _.clone(this.coord);

      var getTheme = this._root.getTheme.bind(this._root);

      var _set$$1 = function _set$$1(fields) {
        var _zField = _this3.isExistZAxisField();

        if (!fields) {
          var yAxis = opt.yAxis;

          if (!_.isArray(yAxis)) {
            yAxis = [yAxis];
          }
          fields = [];

          _.each(yAxis, function (item, i) {
            if (item.field) {
              fields = fields.concat(item.field);
            }
          });
        }

        if (_.isString(fields)) {
          fields = [fields];
        }

        var clone_fields = _.clone(fields);

        for (var i = 0, l = fields.length; i < l; i++) {
          if (_zField) {
            (function () {
              //三维数据
              var zDataSection = _this3.zAxisAttribute.getDataSection();

              var len = zDataSection.length;
              zDataSection.forEach(function (zf, zInd) {
                if (_.isString(fields[i])) {
                  clone_fields[i * len + zInd] = _defineProperty({
                    field: fields[i],
                    enabled: true,
                    // yAxis: me._getYaxisOfField(fields[i]),
                    color: getTheme(fieldInd),
                    ind: fieldInd++,
                    zInd: zInd
                  }, _zField, zf);
                } else {
                  clone_fields[i] = _set$$1(fields[i], fieldInd);
                }
              });
            })();
          } else {
            //二维数据
            if (_.isString(fields[i])) {
              clone_fields[i] = {
                field: fields[i],
                enabled: true,
                // yAxis: me._getYaxisOfField(fields[i]),
                color: getTheme(fieldInd),
                ind: fieldInd++,
                zInd: 0
              };
            }

            if (_.isArray(fields[i])) {
              clone_fields[i] = _set$$1(fields[i], fieldInd);
            }
          }
        }
        return clone_fields;
      };

      return _set$$1();
    }
  }, {
    key: "isExistZAxisField",
    value: function isExistZAxisField() {
      if (this.coord.zAxis && !_.isEmpty(this.coord.zAxis.field) && this.coord.zAxis.layoutType !== "proportion") {
        return this.coord.zAxis.field;
      }

      return false;
    }
  }, {
    key: "getYAxis",
    value: function getYAxis() {
      var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT_AXIS;
      var yAxisAttr = this.yAxisAttribute[name]; //如果没有指定名称,通知默认名称不存在,取第一个配置的Name

      if (!yAxisAttr) {
        name = this.coord.yAxis[0].name;
        yAxisAttr = this.yAxisAttribute[name];
      }

      var yOpts = _.clone(yAxisAttr._opt);

      return {
        attr: yAxisAttr,
        opts: yOpts
      };
    }
  }, {
    key: "getBoundbox",
    value: function getBoundbox() {
      //笛卡尔坐标的原点默认为左下方
      var baseBoundbox = _get(_getPrototypeOf(Cartesian3D.prototype), "getBoundbox", this).call(this);

      var offset = this.offset.clone();
      this.baseBoundbox = baseBoundbox;
      this.boundbox.min.set(0, 0, 0);
      this.boundbox.max.set(baseBoundbox.max.x - baseBoundbox.min.x - offset.x, baseBoundbox.max.y - baseBoundbox.min.y - offset.y, baseBoundbox.max.z - baseBoundbox.min.z - offset.z); //如果指定了Z轴的宽度就不采用默认计算的宽度

      if (this._root.opt.coord.zAxis && this._root.opt.coord.zAxis.depth) {
        this.boundbox.max.z = this._root.opt.coord.zAxis.depth;
      }

      this.center = this.boundbox.getCenter();
      this.center.setZ(-this.center.z);
      return this.boundbox;
    } //粗略计算在原点位置的世界线段的长度与屏幕像素的长度比

  }, {
    key: "getRatioPixelToWorldByOrigin",
    value: function getRatioPixelToWorldByOrigin(_origin) {
      var baseBoundbox = _get(_getPrototypeOf(Cartesian3D.prototype), "getBoundbox", this).call(this);

      if (_origin === undefined) {
        _origin = baseBoundbox.min.clone();

        _origin.setZ(baseBoundbox.max.z);
      }

      var ratio = this._root.renderView.getVisableSize(_origin).ratio;

      return ratio;
    } //更新坐标原点

  }, {
    key: "updateOrigin",
    value: function updateOrigin(offset) {
      this.offset = offset.clone();
      this.boundbox = this.getBoundbox();
      this.setWorldOrigin();
      this.updatePosition();
    } // updatePosition() {
    //     //更新相机姿态
    //     let center = this.center.clone();
    //     center = this._getWorldPos(center);
    //     let _renderView = this._root.renderView;
    //     let _camera = _renderView._camera;
    //     //相机默认的旋转角度
    //     let dist = _camera.position.distanceTo(center);
    //     let phi = _Math.degToRad(_renderView.controls.alpha);   //(90-lat)*(Math.PI/180),
    //     let theta = _Math.degToRad(_renderView.controls.beta);   // (lng+180)*(Math.PI/180),
    //     let y = dist * Math.sin(phi);
    //     let temp = dist * Math.cos(phi);
    //     let x = temp * Math.sin(theta);
    //     let z = temp * Math.cos(theta);
    //     //平移实现以中心点为圆心的旋转结果
    //     let newPos = new Vector3(x, y, z);
    //     newPos.add(center);
    //     _camera.position.copy(newPos);
    //     //相机朝向中心点 
    //     _camera.lookAt(center);
    //     //orbite target position
    //     this._root.orbitControls.target.copy(center);
    // }

  }, {
    key: "addLights",
    value: function addLights() {
      //加入灯光
      var ambientlight = new AmbientLight(0xffffff, 0.5); // soft white light

      this._root.rootStage.add(ambientlight);

      var center = this.center.clone();
      center = this._getWorldPos(center); //center.setY(0);
      var intensity = 0.5;
      var lightColor = 0xFFFFFF;
      var position = new Vector3(-1, -1, 1);
      var pointLight = [];
      pointLight[0] = new PointLight(lightColor, intensity);
      position = new Vector3(-1, 1, 1);
      position.multiplyScalar(10000);
      pointLight[0].position.copy(position);

      this._root.rootStage.add(pointLight[0]);

      pointLight[1] = new PointLight(lightColor, intensity);
      position = new Vector3(1, 1, 1);
      position.multiplyScalar(10000);
      pointLight[1].position.copy(position);

      this._root.rootStage.add(pointLight[1]);

      pointLight[2] = new PointLight(lightColor, intensity);
      position = new Vector3(-1, 1, -1);
      position.multiplyScalar(10000);
      pointLight[2].position.copy(position);

      this._root.rootStage.add(pointLight[2]);

      pointLight[3] = new PointLight(lightColor, intensity);
      position = new Vector3(1, 1, -1);
      position.multiplyScalar(1000);
      pointLight[3].position.copy(position);

      this._root.rootStage.add(pointLight[3]);
    }
  }, {
    key: "setWorldOrigin",
    value: function setWorldOrigin() {
      var baseBoundbox = _get(_getPrototypeOf(Cartesian3D.prototype), "getBoundbox", this).call(this);

      var offset = this.offset.clone();
      var pos = baseBoundbox.min.clone();
      pos.setZ(baseBoundbox.max.z);
      pos.add(offset);
      this.group.position.copy(pos);
    }
  }, {
    key: "getOrigin",
    value: function getOrigin() {
      return this.origin.clone();
    }
  }, {
    key: "initCoordUI",
    value: function initCoordUI() {
      this._coordUI = new Cartesian3DUI(this);
      this.group.add(this._coordUI.group);
    }
  }, {
    key: "drawUI",
    value: function drawUI() {
      _get(_getPrototypeOf(Cartesian3D.prototype), "drawUI", this).call(this);

      this._coordUI.draw();
    }
  }, {
    key: "getXAxisPosition",
    value: function getXAxisPosition(data) {
      return this.xAxisAttribute.getPosOfVal(data);
    }
  }, {
    key: "getYAxisPosition",
    value: function getYAxisPosition(data, yAxisAttribute) {
      return yAxisAttribute.getPosOfVal(data);
    }
  }, {
    key: "getZAxisPosition",
    value: function getZAxisPosition(data) {
      return this.zAxisAttribute.getPosOfVal(data);
    }
  }, {
    key: "getCeilSize",
    value: function getCeilSize() {
      var ceil = new Vector3();
      var size = this.boundbox.getSize();
      var dataLenX = this.xAxisAttribute.getDataSection().length;
      var dataLenY = this.getYAxis().attr.getDataSection().length;
      var dataLenZ = this.zAxisAttribute.getDataSection().length; // dataLenX = dataLenX - 1 > 0 ? dataLenX : 3;
      // dataLenY = dataLenY - 1 > 0 ? dataLenY : 3;
      // dataLenZ = dataLenZ - 1 > 0 ? dataLenZ : 3;

      if (this.coord.xAxis.layoutType == 'peak') {
        ceil.setX(size.x / dataLenX);
      } else {
        ceil.setX(size.x / (dataLenX + 1));
      }

      ceil.setY(size.y / (dataLenY + 1));

      if (this.coord.zAxis.layoutType == 'peak') {
        ceil.setZ(size.z / dataLenZ);
      } else {
        ceil.setZ(size.z / (dataLenZ + 1));
      }

      return ceil;
    }
  }, {
    key: "bindEvent",
    value: function bindEvent() {
      var _this4 = this;

      var interaction = this._root.interaction;

      if (interaction) {
        interaction.on('move', function (e) {
          var dx = e.event.offsetX;
          var dy = e.event.offsetY;

          var pos = _this4.screenToWorld(dx, dy); // console.log(dx, dy, pos);

        });
      }
    }
  }, {
    key: "dispose",
    value: function dispose() {
      this._coordUI.dispose();
    }
  }, {
    key: "resetData",
    value: function resetData() {
      var _this5 = this;

      var opt = _.clone(this.coord);

      this.xAxisAttribute.resetDataOrg(this.getAxisDataFrame(opt.xAxis.field));
      this.xAxisAttribute.setDataSection();
      this.xAxisAttribute.calculateProps();
      opt.yAxis.forEach(function (yopt) {
        var _yAxisAttr = _this5.yAxisAttribute[yopt.name];

        if (_yAxisAttr) {
          _yAxisAttr.resetDataOrg(_this5.getAxisDataFrame(yopt.field));

          _yAxisAttr.setDataSection();

          _yAxisAttr.calculateProps();
        }
      });

      if (_.isEmpty(opt.zAxis.field)) {
        var _sectionZ = [];

        this._root.opt.graphs.forEach(function (yOps) {
          _sectionZ.push(yOps.field.toString());
        });

        this.zAxisAttribute.resetDataOrg([[_sectionZ]]);
      } else {
        this.zAxisAttribute.resetDataOrg(this.getAxisDataFrame(opt.zAxis.field));
      }

      this.zAxisAttribute.setDataSection();
      this.zAxisAttribute.calculateProps(); //UI组件resetData

      this._coordUI.resetData();
    }
  }]);

  return Cartesian3D;
}(InertialSystem);

// Unlike TrackballControls, it maintains the "up" direction object.up (+Y by default).
//
//    Orbit - left mouse / touch: one-finger move
//    Zoom - middle mouse, or mousewheel / touch: two-finger spread or squish
//    Pan - right mouse, or arrow keys / touch: two-finger move

var EPS$1 = 0.000001;
var changeEvent = {
  type: 'change'
};
var startEvent = {
  type: 'start'
};
var endEvent = {
  type: 'end'
};
var MOUSE = {
  LEFT: 0,
  MIDDLE: 1,
  RIGHT: 2
};
var STATE = {
  NONE: -1,
  ROTATE: 0,
  DOLLY: 1,
  PAN: 2,
  TOUCH_ROTATE: 3,
  TOUCH_DOLLY_PAN: 4
};

var OrbitControls = /*#__PURE__*/function (_Events) {
  _inherits(OrbitControls, _Events);

  var _super = _createSuper(OrbitControls);

  function OrbitControls(object, domElement) {
    var _this;

    _classCallCheck(this, OrbitControls);

    _this = _super.call(this);

    var scope = _assertThisInitialized(_this);

    _this.object = object;
    _this.domElement = domElement !== undefined ? domElement : document; // Set to false to disable this control

    _this.enabled = true; // "target" sets the location of focus, where the object orbits around

    _this.target = new Vector3(); // How far you can dolly in and out ( PerspectiveCamera only )

    _this.minDistance = 0;
    _this.maxDistance = Infinity; // How far you can zoom in and out ( OrthographicCamera only )

    _this.minZoom = 0;
    _this.maxZoom = Infinity; // How far you can orbit vertically, upper and lower limits.
    // Range is 0 to Math.PI radians.

    _this.minPolarAngle = 0; // radians

    _this.maxPolarAngle = Math.PI; // radians
    // How far you can orbit horizontally, upper and lower limits.
    // If set, must be a sub-interval of the interval [ - Math.PI, Math.PI ].

    _this.minAzimuthAngle = -Infinity; // radians

    _this.maxAzimuthAngle = Infinity; // radians
    // Set to true to enable damping (inertia)
    // If damping is enabled, you must call controls.update() in your animation loop

    _this.enableDamping = false;
    _this.dampingFactor = 0.25; // This option actually enables dollying in and out; left as "zoom" for backwards compatibility.
    // Set to false to disable zooming

    _this.enableZoom = true;
    _this.zoomSpeed = 1.0; // Set to false to disable rotating

    _this.enableRotate = true;
    _this.rotateSpeed = 1.0; // Set to false to disable panning

    _this.enablePan = true;
    _this.panSpeed = 1.0;
    _this.screenSpacePanning = false; // if true, pan in screen-space

    _this.keyPanSpeed = 7.0; // pixels moved per arrow key push
    // Set to true to automatically rotate around the target
    // If auto-rotate is enabled, you must call controls.update() in your animation loop

    _this.autoRotate = false;
    _this.autoRotateSpeed = 2.0; // 30 seconds per round when fps is 60
    // Set to false to disable use of the keys

    _this.enableKeys = true; // The four arrow keys

    _this.keys = {
      LEFT: 37,
      UP: 38,
      RIGHT: 39,
      BOTTOM: 40
    }; // Mouse buttons

    _this.mouseButtons = {
      ORBIT: MOUSE.LEFT,
      ZOOM: MOUSE.MIDDLE,
      PAN: MOUSE.RIGHT
    }; // for reset

    _this.target0 = _this.target.clone();
    _this.position0 = _this.object.position.clone();
    _this.zoom0 = _this.object.zoom; //
    // internals
    //

    _this._state = STATE.NONE; // current position in spherical coordinates

    _this._spherical = new Spherical();
    _this._sphericalDelta = new Spherical();
    _this._scale = 1;
    _this._panOffset = new Vector3();
    _this._zoomChanged = false;
    _this._rotateStart = new Vector2();
    _this._rotateEnd = new Vector2();
    _this._rotateDelta = new Vector2();
    _this._panStart = new Vector2();
    _this._panEnd = new Vector2();
    _this._panDelta = new Vector2();
    _this._dollyStart = new Vector2();
    _this._dollyEnd = new Vector2();
    _this._dollyDelta = new Vector2();
    scope._onContextMenubind = onContextMenu.bind(scope);
    scope._onMouseDownbind = onMouseDown.bind(scope);
    scope._onMouseWheelbind = onMouseWheel.bind(scope);
    scope._onTouchStartbind = onTouchStart.bind(scope);
    scope._onTouchEndbind = onTouchEnd.bind(scope);
    scope._onTouchMove = onTouchMove.bind(scope);
    scope._onKeyDownbind = onKeyDown.bind(scope);
    scope.domElement.addEventListener('contextmenu', _this._onContextMenubind, false);
    scope.domElement.addEventListener('mousedown', _this._onMouseDownbind, false);
    scope.domElement.addEventListener('wheel', _this._onMouseWheelbind, false);
    scope.domElement.addEventListener('touchstart', _this._onTouchStartbind, false);
    scope.domElement.addEventListener('touchend', _this._onTouchEndbind, false);
    scope.domElement.addEventListener('touchmove', _this._onTouchMove, false);
    window.addEventListener('keydown', _this._onKeyDownbind, false);

    _this.update = function () {
      var offset = new Vector3(); // so camera.up is the orbit axis

      var quat = new Quaternion().setFromUnitVectors(object.up, new Vector3(0, 1, 0));
      var quatInverse = quat.clone().inverse();
      var lastPosition = new Vector3();
      var lastQuaternion = new Quaternion();
      return function update() {
        var position = scope.object.position;
        offset.copy(position).sub(scope.target); // rotate offset to "y-axis-is-up" space

        offset.applyQuaternion(quat); // angle from z-axis around y-axis

        scope._spherical.setFromVector3(offset);

        if (scope.autoRotate && this._state === STATE.NONE) {
          rotateLeft.call(scope, getAutoRotationAngle.call(scope));
        }

        scope._spherical.theta += scope._sphericalDelta.theta;
        scope._spherical.phi += scope._sphericalDelta.phi; // restrict theta to be between desired limits

        scope._spherical.theta = Math.max(scope.minAzimuthAngle, Math.min(scope.maxAzimuthAngle, scope._spherical.theta)); // restrict phi to be between desired limits

        scope._spherical.phi = Math.max(scope.minPolarAngle, Math.min(scope.maxPolarAngle, scope._spherical.phi));

        scope._spherical.makeSafe();

        scope._spherical.radius *= scope._scale; // restrict radius to be between desired limits

        scope._spherical.radius = Math.max(scope.minDistance, Math.min(scope.maxDistance, scope._spherical.radius)); // move target to panned location

        scope.target.add(scope._panOffset);
        offset.setFromSpherical(scope._spherical); // rotate offset back to "camera-up-vector-is-up" space

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

        scope._scale = 1; // update condition is:
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
    }(); // force an update at start


    _this.update();

    return _this;
  } //
  // public methods
  //


  _createClass(OrbitControls, [{
    key: "getPolarAngle",
    value: function getPolarAngle() {
      return _spherical.phi;
    }
  }, {
    key: "getAzimuthalAngle",
    value: function getAzimuthalAngle() {
      return _spherical.theta;
    }
  }, {
    key: "saveState",
    value: function saveState() {
      var scope = this;
      scope.target0.copy(scope.target);
      scope.position0.copy(scope.object.position);
      scope.zoom0 = scope.object.zoom;
    }
  }, {
    key: "reset",
    value: function reset() {
      var scope = this;
      scope.target.copy(scope.target0);
      scope.object.position.copy(scope.position0);
      scope.object.zoom = scope.zoom0;
      scope.object.updateProjectionMatrix();
      scope.fire(changeEvent);
      scope.update();
      scope._state = STATE.NONE;
    } // this method is exposed, but perhaps it would be better if we can make it private...
    // update() {
    //     update.call(this);
    // }

  }, {
    key: "dispose",
    value: function dispose() {
      var scope = this;
      scope.domElement.removeEventListener('contextmenu', scope._onContextMenubind, false);
      scope.domElement.removeEventListener('mousedown', scope._onMouseDownbind, false);
      scope.domElement.removeEventListener('wheel', scope._onMouseWheelbind, false);
      scope.domElement.removeEventListener('touchstart', scope.onTouchStart, false);
      scope.domElement.removeEventListener('touchend', scope._onTouchEndbind, false);
      scope.domElement.removeEventListener('touchmove', scope._onTouchMove, false);
      document.removeEventListener('mousemove', scope._onMouseMovebind, false);
      document.removeEventListener('mouseup', scope._onMouseUpbind, false);
      window.removeEventListener('keydown', scope._onKeyDownbind, false);
      scope._onContextMenubind = null;
      scope._onMouseDownbind = null;
      scope._onMouseWheelbind = null;
      scope.onTouchStart = null;
      scope._onTouchEndbind = null;
      scope._onTouchMove = null;
      scope._onMouseMovebind = null;
      scope._onMouseUpbind = null;
      scope._onKeyDownbind = null; //scope.dispatchEvent( { type: 'dispose' } ); // should this be added here?
    }
  }]);

  return OrbitControls;
}(Events);

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
  var v = new Vector3();
  return function panLeft(distance, objectMatrix) {
    v.setFromMatrixColumn(objectMatrix, 0); // get X column of objectMatrix

    v.multiplyScalar(-distance);

    this._panOffset.add(v);
  };
}();

var panUp = function () {
  var v = new Vector3();
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
}(); // deltaX and deltaY are in pixels; right and down are positive


var pan = function () {
  var offset = new Vector3();
  return function pan(deltaX, deltaY) {
    var scope = this;
    var element = scope.domElement === document ? scope.domElement.body : scope.domElement;

    if (scope.object.isPerspectiveCamera) {
      // perspective
      var position = scope.object.position;
      offset.copy(position).sub(scope.target);
      var targetDistance = offset.length(); // half of the fov is center to top of screen

      targetDistance *= Math.tan(scope.object.fov / 2 * Math.PI / 180.0); // we use only clientHeight here so aspect ratio does not distort speed

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
  var scope = this;

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
  var scope = this;

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
} //
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
  var scope = this; //console.log( 'handleMouseMoveRotate' );

  scope._rotateEnd.set(event.clientX, event.clientY);

  scope._rotateDelta.subVectors(scope._rotateEnd, scope._rotateStart).multiplyScalar(scope.rotateSpeed);

  var element = scope.domElement === document ? scope.domElement.body : scope.domElement;
  rotateLeft.call(scope, 2 * Math.PI * scope._rotateDelta.x / element.clientHeight); // yes, height

  rotateUp.call(scope, 2 * Math.PI * scope._rotateDelta.y / element.clientHeight);

  scope._rotateStart.copy(scope._rotateEnd);

  scope.update();
}

function handleMouseMoveDolly(event) {
  var scope = this; //console.log( 'handleMouseMoveDolly' );

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
  var scope = this; //console.log( 'handleMouseMovePan' );

  scope._panEnd.set(event.clientX, event.clientY);

  scope._panDelta.subVectors(scope._panEnd, scope._panStart).multiplyScalar(scope.panSpeed);

  pan.call(scope, scope._panDelta.x, scope._panDelta.y);

  scope._panStart.copy(scope._panEnd);

  scope.update();
}

function handleMouseUp(event) {// console.log( 'handleMouseUp' );
}

function handleMouseWheel(event) {
  var scope = this; // console.log( 'handleMouseWheel' );

  if (event.deltaY < 0) {
    dollyOut.call(scope, getZoomScale.call(scope));
  } else if (event.deltaY > 0) {
    dollyIn.call(scope, getZoomScale.call(scope));
  }

  scope.update();
}

function handleKeyDown(event) {
  var scope = this; //console.log( 'handleKeyDown' );

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
  var scope = this; //console.log( 'handleTouchStartDollyPan' );

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
  var scope = this; //console.log( 'handleTouchMoveRotate' );

  scope._rotateEnd.set(event.touches[0].pageX, event.touches[0].pageY);

  scope._rotateDelta.subVectors(scope._rotateEnd, scope._rotateStart).multiplyScalar(scope.rotateSpeed);

  var element = scope.domElement === document ? scope.domElement.body : scope.domElement;
  rotateLeft.call(scope, 2 * Math.PI * scope._rotateDelta.x / element.clientHeight); // yes, height

  rotateUp.call(scope, 2 * Math.PI * scope._rotateDelta.y / element.clientHeight);

  scope._rotateStart.copy(scope._rotateEnd);

  scope.update();
}

function handleTouchMoveDollyPan(event) {
  var scope = this; //console.log( 'handleTouchMoveDollyPan' );

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

function handleTouchEnd(event) {//console.log( 'handleTouchEnd' );
} //
// event handlers - FSM: listen for events and reset state
//


function onMouseDown(event) {
  var scope = this;
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
    scope._onMouseMovebind = onMouseMove.bind(scope);
    scope._onMouseUpbind = onMouseUp.bind(scope);
    document.addEventListener('mousemove', scope._onMouseMovebind, false);
    document.addEventListener('mouseup', scope._onMouseUpbind, false);
    scope.fire(startEvent);
  }
}

function onMouseMove(event) {
  var scope = this;
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
  var scope = this;
  if (scope.enabled === false) return;
  handleMouseUp.call(scope, event);
  document.removeEventListener('mousemove', onMouseMove.bind(scope), false);
  document.removeEventListener('mouseup', onMouseUp.bind(scope), false);
  scope.fire(endEvent);
  scope._state = STATE.NONE;
}

function onMouseWheel(event) {
  var scope = this;
  if (scope.enabled === false || scope.enableZoom === false || scope._state !== STATE.NONE && scope._state !== STATE.ROTATE) return;
  event.preventDefault();
  event.stopPropagation();
  scope.fire(startEvent);
  handleMouseWheel.call(scope, event);
  scope.fire(endEvent);
}

function onKeyDown(event) {
  var scope = this;
  if (scope.enabled === false || scope.enableKeys === false || scope.enablePan === false) return;
  handleKeyDown.call(scope, event);
}

function onTouchStart(event) {
  var scope = this;
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
  var scope = this;
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
  var scope = this;
  if (scope.enabled === false) return;
  handleTouchEnd.call(scope, event);
  scope.fire(endEvent);
  scope._state = STATE.NONE;
}

function onContextMenu(event) {
  var scope = this;
  if (scope.enabled === false) return;
  event.preventDefault();
}

var Interaction = /*#__PURE__*/function (_Events) {
  _inherits(Interaction, _Events);

  var _super = _createSuper(Interaction);

  function Interaction(domElement) {
    var _this;

    _classCallCheck(this, Interaction);

    _this = _super.call(this);

    var scope = _assertThisInitialized(_this);

    _this.currMousePos = new Vector2();
    _this.views = [];
    _this.domElement = domElement !== undefined ? domElement : document;
    _this._onMouseMovebind = scope.onMouseMove.bind(scope);
    _this._onMousedownbind = scope.onMousedown.bind(scope);
    _this._onMouseupbind = scope.onMouseup.bind(scope);

    _this.domElement.addEventListener('mousemove', _this._onMouseMovebind, false);

    _this.domElement.addEventListener('mousedown', _this._onMousedownbind, false);

    _this.domElement.addEventListener('mouseup', _this._onMouseupbind, false);

    _this.lastPos = null; //避免多次触发

    _this.isChange = false;
    _this.isMouseOver = false;
    _this.isMouseOut = false;
    _this.isClick = false;
    _this.EVENT = null;
    return _this;
  }

  _createClass(Interaction, [{
    key: "addView",
    value: function addView(view) {
      view.target = null;
      this.views.push(view);
    }
  }, {
    key: "update",
    value: function update() {
      var _this2 = this;

      this.views.forEach(function (view) {
        if (_this2.isChange) {
          view.isChange = true;
        }
      });
      if (this.isChange) this.isChange = false;
      this.views.forEach(function (view, i) {
        var scene = view.getScene();
        if (!view.isChange) return;
        view.isChange = false;
        var raycaster = view.getRaycaster(_this2.currMousePos); // calculate objects intersecting the picking ray

        var intersects = raycaster.intersectObjects(scene.children, true); //console.log('intersects', intersects.length, '----' + i + '-----');
        //没有绑定事件的不往下计算

        if (intersects.length > 0) {
          for (var _i = 0, l = intersects.length; _i < l; _i++) {
            if (_.isEmpty(intersects[_i].object._listeners)) {
              intersects.splice(_i, 1);
              l--;
              _i--;
            }
          }
        }

        if (intersects.length > 0) {
          if (intersects[0].object == view.target) {
            if (view.target) {
              view.target.fire({
                type: 'mousemove',
                event: _this2.EVENT,
                intersects: intersects
              });
            }

            if (!_this2.isMouseOver) {
              view.target.fire({
                type: 'mouseover',
                event: _this2.EVENT,
                intersects: intersects
              });
              _this2.isMouseOver = true;
              _this2.isMouseOut = false;
            }

            if (_this2.isClick) {
              view.target.fire({
                type: 'click',
                event: _this2.EVENT,
                intersects: intersects
              });
              _this2.isClick = false;
            }
          } else {
            if (view.target !== null && !_this2.isMouseOut) {
              view.target.fire({
                type: 'mouseout',
                event: _this2.EVENT,
                intersects: intersects
              });
              _this2.isMouseOut = true;
              _this2.isMouseOver = false; // console.log({ type: 'mouseout' })
            }

            view.target = intersects[0].object;
          }
        } else {
          if (view.target !== null && !_this2.isMouseOut) {
            view.target.fire({
              type: 'mouseout',
              event: _this2.EVENT,
              intersects: intersects
            });
            view.target = null;
            _this2.isMouseOut = true;
            _this2.isMouseOver = false; //console.log({ type: 'mouseout' })
          }
        }
      });
    }
  }, {
    key: "dispose",
    value: function dispose() {
      var scope = this;

      if (scope.domElement) {
        // scope.domElement.removeEventListener('contextmenu', onContextMenu, false);
        scope.domElement.removeEventListener('mousedown', scope._onMousedownbind, false);
        scope.domElement.removeEventListener('mouseup', scope._onMouseupbind, false); // scope.domElement.removeEventListener('wheel', onMouseWheel, false);
        // scope.domElement.removeEventListener('touchstart', onTouchStart, false);
        // scope.domElement.removeEventListener('touchend', onTouchEnd, false);
        // scope.domElement.removeEventListener('touchmove', onTouchMove, false);

        scope.domElement.removeEventListener('mousemove', scope._onMouseMovebind, false); // document.removeEventListener('mouseup', onMouseUp, false);
        // window.removeEventListener('keydown', onKeyDown, false);
      }

      scope._onMousedownbind = null;
      scope._onMouseupbind = null;
      scope._onMouseMovebind = null;
      this.currMousePos = null;
      this.views = [];
      this.domElement = null;
      this.lastPos = null;
      this.isChange = false;
      this.isMouseOver = false;
      this.isMouseOut = false;
      this.isClick = false;
      this.EVENT = null;
    }
  }, {
    key: "onMousedown",
    value: function onMousedown(e) {
      //this.isClick = true;
      this.EVENT = event;
      var x = e.x,
          y = e.y;
      this.lastPos = {
        x: x,
        y: y
      }; //console.log('down', x, y);
    }
  }, {
    key: "onMouseup",
    value: function onMouseup(e) {
      var _this3 = this;

      this.isChange = true;
      var x = e.x,
          y = e.y; //console.log('up', x, y);

      if (x == this.lastPos.x && y == this.lastPos.y) {
        this.isClick = true;
        this.fire({
          type: 'click',
          event: event
        }); // console.log('click');

        this.lastPos = {
          x: -1,
          y: -1
        };
      }

      setTimeout(function () {
        _this3.fire({
          type: 'refresh'
        });
      }, 16);
      this.EVENT = event; //console.log('refresh');
    }
  }, {
    key: "onMouseMove",
    value: function onMouseMove(event) {
      event.preventDefault();
      this.currMousePos.x = event.offsetX / this.domElement.clientWidth * 2 - 1;
      this.currMousePos.y = -(event.offsetY / this.domElement.clientHeight) * 2 + 1;
      this.fire({
        type: 'move',
        event: event
      });
      this.fire({
        type: 'refresh'
      });
      this.EVENT = event;
      this.isChange = true;
    }
  }]);

  return Interaction;
}(Events);

var __tipShowEvent = null,
    __tipHideEvent = null,
    __tipMoveEvent = null,
    __redraw = null;
var _cid = 0;

var Chart3d = /*#__PURE__*/function (_Events) {
  _inherits(Chart3d, _Events);

  var _super = _createSuper(Chart3d);

  function Chart3d(node, data, opt, componentModules) {
    var _this;

    _classCallCheck(this, Chart3d);

    _this = _super.call(this);
    console.log('Chart3D ', VERSION);
    _this.domSelector = node;
    _this.opt = opt;
    _this.data = data;
    _this.componentModules = componentModules;
    _this.el = null;
    _this.view = null;
    _this.domView = null;
    _this.stageView = null;
    _this.canvasDom = null; //画布DOM元素

    _this.width = 0; //画布的宽

    _this.height = 0; //画布的高 

    _this.renderer = null;
    _this.renderView = null;
    _this.app = null;
    _this.currCoord = null; //初始化画布

    _this._createDomContainer(node); // //初始化数据
    // //不管传入的是data = [ ['xfield','yfield'] , ['2016', 111]]
    // //还是 data = [ {xfiled, 2016, yfield: 1111} ]，这样的格式，
    // //通过parse2MatrixData最终转换的是data = [ ['xfield','yfield'] , ['2016', 111]] 这样 chartx的数据格式
    // //后面有些地方比如 一些graphs中会使用dataFrame.org，， 那么这个dataFrame.org和_data的区别是，
    // //_data是全量数据， dataFrame.org是_data经过dataZoom运算过后的子集
    // this._data = parse2MatrixData(data);
    //三维引擎初始化


    _this.app = new Application(_this.width, _this.height); //初始化渲染器

    _this.renderer = _this.app._framework.renderer; //组件管理机制,所有的组件都绘制在这个地方

    _this.components = [];
    _this.inited = false;
    _this.dataFrame = _this._initData(_this.data, {}); //每个图表的数据集合 都 存放在dataFrame中。

    _this.initComponent();

    return _this;
  }

  _createClass(Chart3d, [{
    key: "init",
    value: function init(DefaultControls) {
      var me = this;

      var rendererOpts = _.extend({}, DefaultControls);

      this.opt.coord.controls = this.opt.coord.controls || {};

      var controlOpts = this.opt.coord.controls = _.extend(rendererOpts, this.opt.coord.controls);

      this._initRenderer(rendererOpts);

      var controls = this.orbitControls = new OrbitControls(this.renderView._camera, this.view);
      var interaction = this.interaction = new Interaction(this.view);
      interaction.addView(this.labelView);
      interaction.addView(this.renderView); // controls.minDistance = controlOpts.minDistance;
      // controls.maxDistance = controlOpts.maxDistance;
      // controls.minZoom = controlOpts.minZoom;
      // controls.maxZoom = controlOpts.maxZoom;
      // controls.enableDamping = true;
      // controls.enablePan = false;
      // controls.enableKeys = false;
      // controls.autoRotate = controlOpts.autoRotate;
      // controls.autoRotateSpeed = 1.0;

      _.extend(true, controls, controlOpts); //自动旋转时间


      if (controls.autoRotate) {
        window.setTimeout(function () {
          controls.autoRotate = false;
        }, 15000);
      } //如果发生交互停止自动旋转


      controls.on('start', onStart); //有交互开始渲染

      this._onChangeBind = onChange.bind(me);
      controls.on('change', this._onChangeBind);
      this._onRenderBeforeBind = onRenderBefore.bind(controls);

      this.app._framework.on('renderbefore', this._onRenderBeforeBind);

      this._onRenderAfterBind = onRenderAfter.bind(interaction);

      this.app._framework.on('renderafter', this._onRenderAfterBind);

      interaction.on('refresh', this._onChangeBind); // //同步主相机的位置和方向
      // controls.on('change', (e) => {
      //    this.labelView._camera.position.copy(e.target.object.position);
      //    this.labelView._camera.lookAt(e.target.target);
      // })
      //启动渲染进程

      this.app.launch();
      this._onWindowResizeBind = me.resize.bind(me);
      window.addEventListener('resize', this._onWindowResizeBind, false); //绑定tip事件

      this.bindEvent();
    }
  }, {
    key: "setCoord",
    value: function setCoord(_Coord) {
      //初始化物体的惯性坐标(放在具体的坐标系下)
      if (_Coord === InertialSystem || _Coord.prototype instanceof InertialSystem) {
        this.currCoord = new _Coord(this); // this.currCoord = _Coord;

        this.rootStage.add(this.currCoord.group);
      }
    }
  }, {
    key: "getCoord",
    value: function getCoord() {
      return this.currCoord;
    }
  }, {
    key: "initComponent",
    value: function initComponent() {
      var opts = this.opt;
      this.components = []; //先初始化皮肤组件

      if ('theme' in opts) {
        var theme = this.componentModules.get('theme');

        if (theme) {
          this.addComponent(theme, opts.theme);
        }
      } //先初始化坐标系


      var coord = this.componentModules.get('coord', opts.coord.type);

      if (!coord) {
        coord = InertialSystem;
      }

      this.setCoord(coord); //加载graph组件

      for (var t = 0; t < opts.graphs.length; t++) {
        var key = opts.graphs[t].type;
        var comp = this.componentModules.get('graphs', key);

        if (comp) {
          this.addComponent(comp, opts.graphs[t]);
        }
      } //加载其他组件


      for (var p in opts) {
        if (p === 'coord') continue;
        if (p === 'graphs') continue;

        if (_.isArray(opts[p])) {
          for (var _t = 0; _t < opts[p].length; _t++) {
            var _key = opts[p][_t].type;

            var _comp = this.componentModules.get(p, _key);

            this.addComponent(_comp, opts[p][_t]);
          }
        } else {
          var _comp2 = this.componentModules.get(p);

          if (_comp2) {
            this.addComponent(_comp2, opts[p]);
          }
        }
      }
    } //添加组件

  }, {
    key: "addComponent",
    value: function addComponent(cmp, opts) {
      //todo 图像是否要分开,目前没有分开共用Component一个基类
      if (cmp.prototype instanceof Component) {
        var instance = new cmp(this, opts);
        this.components.push(instance);
      }
    }
  }, {
    key: "drawComponent",
    value: function drawComponent() {
      var _this2 = this;

      //先绘制坐标系
      this.currCoord.drawUI();
      this.components.forEach(function (cmp) {
        _this2.currCoord.group.add(cmp.group);

        cmp.draw();
      });
    }
  }, {
    key: "draw",
    value: function draw() {
      this.currCoord.initCoordUI();
      this.drawComponent();
      this.app.forceRender();
    }
  }, {
    key: "getComponent",
    value: function getComponent(query) {
      var cmp = this.getComponents(query)[0];
      return !cmp ? null : cmp;
    }
  }, {
    key: "getComponents",
    value: function getComponents(query) {
      var arr = [];
      var result = true;
      this.components.forEach(function (cmp) {
        result = true;

        for (var key in query) {
          if (_.isString(cmp[key]) && _.isString(query[key])) {
            result = result && cmp[key].toLowerCase() == query[key].toLowerCase();
          } else {
            result = result && cmp[key] == query[key];
          }
        }

        if (result) {
          arr.push(cmp);
        }
      });
      return arr;
    }
  }, {
    key: "bindEvent",
    value: function bindEvent() {
      var _this3 = this;

      __redraw = function __redraw(e) {
        if (_this3.currCoord) {
          _this3.currCoord.fire({
            type: 'legendchange',
            data: e.data
          });
        }

        _this3.draw();
      };

      this.on('legendchange', __redraw);
      var TipName = 'Tips';

      __tipShowEvent = function __tipShowEvent(e) {
        var tips = _this3.getComponent({
          name: TipName
        });

        var _e$event = e.event,
            x = _e$event.offsetX,
            y = _e$event.offsetY;

        if (tips !== null) {
          var _title = e.data.xField ? e.data.rowData[e.data.xField] : "";

          tips.show({
            eventInfo: _.extend({
              title: _title
            }, e.data),
            pos: {
              x: x,
              y: y
            }
          });
        }
      };

      __tipHideEvent = function __tipHideEvent(e) {
        var tips = _this3.getComponent({
          name: TipName
        });

        if (tips !== null) {
          tips.hide();
        }
      };

      __tipMoveEvent = function __tipMoveEvent(e) {
        var tips = _this3.getComponent({
          name: TipName
        });

        var _e$event2 = e.event,
            x = _e$event2.offsetX,
            y = _e$event2.offsetY;

        var _title = e.data.xField ? e.data.rowData[e.data.xField] : "";

        if (tips !== null) {
          tips.show({
            eventInfo: _.extend({
              title: _title
            }, e.data),
            pos: {
              x: x,
              y: y
            }
          });
        }
      };

      this.on('tipShow', __tipShowEvent);
      this.on('tipHide', __tipHideEvent);
      this.on('tipMove', __tipMoveEvent);
    }
  }, {
    key: "_createDomContainer",
    value: function _createDomContainer(_domSelector) {
      var viewObj = null;
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
  }, {
    key: "_initData",
    value: function _initData(data, opt) {
      return dataFrame.call(this, data, opt);
    }
  }, {
    key: "_initRenderer",
    value: function _initRenderer(rendererOpts) {
      var app = this.app; //正常绘制的view

      var renderView = this.renderView = app.createView(MainView); //label 绘制的View

      var labelView = this.labelView = app.createView(LabelView); // let renderView = this.renderView = app.getView(MainView);
      // let labelView = this.labelView = app.getView(LabelView);

      this.rootStage = app.addGroup({
        name: 'rootStage'
      });
      renderView.addObject(this.rootStage);
      renderView.setSize(this.width, this.height);
      renderView.setBackground(0xFFFFFF); //默认透视投影

      renderView.setControls(rendererOpts);
      renderView.project('perspective'); //'ortho' | 'perspective',
      //初始化labelView

      this.labelGroup = app.addGroup({
        name: 'labelsGroup',
        flipY: true
      });
      labelView.addObject(this.labelGroup);
      labelView.setSize(this.width, this.height); //labelView.setBackground("rgba(0,0,0,0)");

      labelView.setControls(rendererOpts); //labelView.project('ortho'); //'ortho' | 'perspective',

      labelView.createScreenProject();

      if (this.canvasDom) {
        this.stageView.removeChild(this.canvasDom);
        this.canvasDom = null;
      }

      this.stageView.appendChild(this.renderer.domElement);
      this.canvasDom = this.renderer.domElement;
    }
  }, {
    key: "resize",
    value: function resize() {
      this.width = this.el.offsetWidth;
      this.height = this.el.offsetHeight;
      this.app.resize(this.width, this.height, this.opt.coord.controls.boxHeight);
    } //ind 如果有就获取对应索引的具体颜色值

  }, {
    key: "getTheme",
    value: function getTheme(ind) {
      var colors = global.getGlobalTheme();

      var _theme = this.getComponent({
        name: 'theme'
      });

      if (_theme) {
        colors = _theme.get();
      }

      if (ind != undefined) {
        return colors[ind % colors.length] || "#ccc";
      }
      return colors;
    } //数据变更后调用reset

  }, {
    key: "reset",
    value: function reset(opt, data) {
      !opt && (opt = {}); //配置初始化

      _.extend(true, this.opt, opt); //数据初始化


      if (data) {
        this.data = data; //this._data = parse2MatrixData(data);

        this.dataFrame = this._initData(this.data, {});
      }
      this.dispose(); //三维引擎初始化

      this.app = new Application(this.width, this.height); //初始化渲染器

      this.renderer = this.app._framework.renderer;
      this.init(); //坐标系重新初始化

      var coord = null;

      if (this.opt.coord.type == 'box') {
        coord = new Cartesian3D(this);
      }

      this.setCoord(coord); //组件重新初始化

      this.components = [];
      this.initComponent();
      this.draw();
    }
    /*
     * 只响应数据的变化，不涉及配置变化
     * 
     * @dataTrigger 一般是触发这个data reset的一些场景数据，
     * 比如如果是 datazoom 触发的， 就会有 trigger数据{ name:'datazoom', left:1,right:1 }
     */

  }, {
    key: "resetData",
    value: function resetData(data, dataTrigger) {
      //销毁默认绑定的事件
      // this.off('tipShow', __tipShowEvent);
      // this.off('tipHide', __tipHideEvent)
      // this.off('tipMove', __tipMoveEvent)
      //this.off('legendchange', __redraw);
      if (data) {
        this.data = data; //this._data = parse2MatrixData(data);

        this.dataFrame = this._initData(this.data, this.opt);
      }
      this.currCoord.resetData();
      this.components.forEach(function (cmp) {
        cmp.resetData();
      });
      this.fire({
        type: 'resetData'
      });
      this.app.forceRender();
    }
  }, {
    key: "destroy",
    value: function destroy() {
      //外部调用适配
      this.dispose();
      this.fire({
        type: 'destroy'
      });
    }
  }, {
    key: "dispose",
    value: function dispose() {
      //销毁默认绑定的事件
      this.off('tipShow', __tipShowEvent);
      this.off('tipHide', __tipHideEvent);
      this.off('tipMove', __tipMoveEvent); //先销毁坐标系统

      if (this.currCoord) {
        this.currCoord.dispose();
      } //销毁组件


      this.components.forEach(function (cmp) {
        cmp.dispose();
      });
      this.components = []; //初始化渲染状态

      if (this.app) {
        this.app.resetState();
      } //清理渲染数据


      if (this.renderer) {
        this.renderer.dispose();
      } //清理事件


      if (this.orbitControls) {
        this.orbitControls.off('start', onStart);
        this.orbitControls.off('change', this._onChangeBind);
        this.orbitControls.dispose();
      }

      if (this.app) {
        this.app._framework.off('renderbefore', this._onRenderBeforeBind);

        this._onRenderBeforeBind = null;

        this.app._framework.off('renderafter', this._onRenderAfterBind);

        this._onRenderAfterBind = null;
        this.app.dispose();
      }

      if (this.interaction) {
        this.interaction.off('refresh', this._onChangeBind);
        this._onChangeBind = null;
        this.interaction.dispose();
      }

      window.removeEventListener('resize', this._onWindowResizeBind, false);
      this._onWindowResizeBind = null;
      this.app = null;
      this.renderer = null;
      this.currCoord = null; //todo 内存对象清除优化
    }
  }]);

  return Chart3d;
}(Events);

function onStart() {
  this.autoRotate = false;
}

function onChange(e) {
  this.app.forceRender();
}

function onRenderBefore() {
  if (this.position0.equals(this.object.position) && this.zoom0 === this.object.zoom) {
    return;
  }

  this.saveState();
  this.update();
}

function onRenderAfter() {
  this.update();
}

global.registerComponent(Chart3d, 'chart', 3);

var Box = /*#__PURE__*/function (_Cartesian3D) {
  _inherits(Box, _Cartesian3D);

  var _super = _createSuper(Box);

  function Box(root) {
    var _thisSuper, _this;

    _classCallCheck(this, Box);

    _this = _super.call(this, root);
    _this.DefaultControls = {
      autoRotate: false,
      //默认不自动旋转
      boxWidth: 1200,
      //空间中X的最大值(最大宽度)  
      boxHeight: 1200,
      //空间中Y的最大值(最大高度)  
      boxDepth: 500,
      //空间中Z的最大值(最大深度)
      distance: 1500,
      //默认相机距离
      maxDistance: 3000,
      //最大相机距离
      minDistance: 600,
      //最小相机距离 
      minZoom: 0.2,
      //正交投影缩小的最小值
      maxZoom: 1.5,
      //正交投影放大的最大值
      enableDamping: true,
      enablePan: false,
      enableKeys: false,
      autoRotateSpeed: 1.0,
      alpha: 10,
      //绕X轴旋转
      beta: 40,
      //绕Y轴旋转
      gamma: 0 //绕Z轴旋转

    };
    root.init(_this.DefaultControls);

    _get((_thisSuper = _assertThisInitialized(_this), _getPrototypeOf(Box.prototype)), "init", _thisSuper).call(_thisSuper);

    return _this;
  }

  return Box;
}(Cartesian3D);

global.registerComponent(Box, 'coord', 'box', 3);

var PolarAttribute = /*#__PURE__*/function (_Polar) {
  _inherits(PolarAttribute, _Polar);

  var _super = _createSuper(PolarAttribute);

  function PolarAttribute(opt, dataFrame$$1) {
    var _this;

    _classCallCheck(this, PolarAttribute);

    _this = _super.call(this, opt, dataFrame$$1);
    _this.field = opt.field || null;
    _this.height = 0;
    return _this;
  }

  _createClass(PolarAttribute, [{
    key: "calculateProps",
    value: function calculateProps() {
      var _this2 = this;

      var maxHeigh = 0,
          minHeight = 0;
      var opt = this._opt;

      if (this._isFiled(this._opt.node.height, this.getLayoutData()[0])) {
        this.getLayoutData().forEach(function (item) {
          var val = item.rowData[_this2._opt.node.height];
          maxHeigh = Math.max(maxHeigh, val);
          minHeight = Math.min(minHeight, val);
          item.heightField = _this2._opt.node.height;
          item.heightValue = val;
        });
      }

      this.getLayoutData().forEach(function (item, i) {
        if (!!item.heightField) {
          item.height = parseInt(opt.maxHeight * ((item.heightValue - minHeight) / (maxHeigh - minHeight)) + minHeight);
        } else {
          item.height = opt.node.height;
        }

        item.color = _this2.getTheme(i);
      });

      if (opt.heightSort) {
        this.getLayoutData().sort(function (a, b) {
          if (opt.heightSort == 'asc') {
            return a.height - b.height;
          } else {
            return b.height - a.height;
          }
        }); //重新设定下ind

        this.getLayoutData().forEach(function (d, i) {
          d.iNode = i;
        });
      }

      _get(_getPrototypeOf(PolarAttribute.prototype), "calculateProps", this).call(this);
    }
  }, {
    key: "registTheme",
    value: function registTheme(fn) {
      this.getTheme = fn || function () {};
    }
  }]);

  return PolarAttribute;
}(Polar);

/**
 * 柱坐标 Cylindrical Coordinates
 * x=rcosφ
 * z=rsinφ
 * y=y
 */

var Cylindrical = /*#__PURE__*/function (_InertialSystem) {
  _inherits(Cylindrical, _InertialSystem);

  var _super = _createSuper(Cylindrical);

  function Cylindrical(root) {
    var _this;

    _classCallCheck(this, Cylindrical);

    _this = _super.call(this, root); //这里暂时没有使用到坐标系的相关操作,预留
    //this.height = 0;

    _this.r = 0;
    _this._coordUI = null;
    _this.group.name = 'cylindricalcoordinates';
    return _this;
  }

  _createClass(Cylindrical, [{
    key: "setDefaultOpts",
    value: function setDefaultOpts(opt) {
      var coord = {
        rAxis: {
          field: []
        }
      }; //根据graphs.field 来 配置 coord.rAxis.field -------------------

      if (!_.isArray(coord.rAxis.field)) {
        coord.rAxis.field = [coord.rAxis.field];
      }

      if (opt.graphs) {
        //有graphs的就要用找到这个graphs.field来设置coord.rAxis
        var arrs = [];

        _.each(opt.graphs, function (graphs) {
          if (graphs.field) {
            //没有配置field的话就不绘制这个 graphs了
            var _fs = graphs.field;

            if (!_.isArray(_fs)) {
              _fs = [_fs];
            }
            arrs = arrs.concat(_fs);
          }
        });
      }
      coord.rAxis.field = coord.rAxis.field.concat(arrs);
      opt.coord = _.extend(true, coord, opt.coord);
      return opt;
    }
  }, {
    key: "init",
    value: function init() {
      this.getBoundbox(); //由于部分配置来自与图形本身,这里暂不传人配置

      this.dataAttribute = new PolarAttribute({}, this._root.dataFrame);
      this.dataAttribute.registTheme(this._root.getTheme.bind(this._root));
      this.addLights();
      this.updatePosition();
    }
  }, {
    key: "getLegendData",
    value: function getLegendData() {
      var legendData = [//{name: "uv", style: "#ff8533", enabled: true, ind: 0}
      ];
      this.dataAttribute.layoutData.forEach(function (item, i) {
        item.ind = i;
        legendData.push(item);
      }); // _.each( this.graphs, function( _g ){
      //     _.each( _g.getLegendData(), function( item ){
      //         if( _.find( legendData , function( d ){
      //             return d.name == item.name
      //         } ) ) return;
      //         var data = _.extend(true, {}, item);
      //         data.color = item.fillStyle || item.color || item.style;
      //         legendData.push( data )
      //     } );
      // } );

      return legendData;
    }
  }, {
    key: "getBoundbox",
    value: function getBoundbox() {
      this.boundbox = _get(_getPrototypeOf(Cylindrical.prototype), "getBoundbox", this).call(this);
      return this.boundbox;
    } // addLights() {
    //     //加入灯光
    //     var ambientlight = new AmbientLight(0xffffff, 0.8); // soft white light
    //     this._root.rootStage.add(ambientlight);
    //     let center = this.center.clone();
    //     center = this._getWorldPos(center);
    //     //center.setY(0);
    //     //     let dirLights = [];
    //     let intensity = 0.5;
    //     let lightColor = 0xcccccc;
    //     //     let position = new Vector3(-1, -1, 1);
    //     //     dirLights[0] = new DirectionalLight(lightColor, intensity);
    //     //     position.multiplyScalar(10000);
    //     //     dirLights[0].position.copy(position);
    //     //     dirLights[0].target.position.copy(center);
    //     //    // this._root.rootStage.add(dirLights[0]);
    //     //     dirLights[1] = new DirectionalLight(lightColor, intensity);
    //     //     position = new Vector3(1, -1, 1);
    //     //     position.multiplyScalar(10000);
    //     //     dirLights[1].position.copy(position);
    //     //     dirLights[1].target.position.copy(center);
    //     //     this._root.rootStage.add(dirLights[1]);
    //     //     dirLights[2] = new DirectionalLight(lightColor, intensity);
    //     //     position = new Vector3(-1, -1, -1);
    //     //     position.multiplyScalar(10000);
    //     //     dirLights[2].position.copy(position);
    //     //     dirLights[2].target.position.copy(center);
    //     //     this._root.rootStage.add(dirLights[2]);
    //     //     dirLights[3] = new DirectionalLight(lightColor, intensity);
    //     //     position = new Vector3(1, -1, -1);
    //     //     position.multiplyScalar(10000);
    //     //     dirLights[3].position.copy(position);
    //     //     dirLights[3].target.position.copy(center);
    //     //     this._root.rootStage.add(dirLights[3]);
    //     let pointLight = [];
    //     pointLight[0] = new PointLight(lightColor, intensity);
    //     let position = new Vector3(-1, 1, 1);
    //     position.multiplyScalar(10000);
    //     pointLight[0].position.copy(position);
    //     this._root.rootStage.add(pointLight[0]);
    //     pointLight[1] = new PointLight(lightColor, intensity);
    //     position = new Vector3(1, 1, 1);
    //     position.multiplyScalar(10000);
    //     pointLight[1].position.copy(position);
    //     this._root.rootStage.add(pointLight[1]);
    //     pointLight[2] = new PointLight(lightColor, intensity);
    //     position = new Vector3(-1, 1, -1);
    //     position.multiplyScalar(10000);
    //     pointLight[2].position.copy(position);
    //     this._root.rootStage.add(pointLight[2]);
    //     pointLight[3] = new PointLight(lightColor, intensity);
    //     position = new Vector3(1, 1, -1);
    //     position.multiplyScalar(1000);
    //     pointLight[3].position.copy(position);
    //     this._root.rootStage.add(pointLight[3]);
    // }
    // updatePosition() {
    //     //更新相机姿态
    //     let center = this.center.clone();
    //     center = this._getWorldPos(center);
    //     let _renderView = this._root.renderView;
    //     let _camera = _renderView._camera;
    //     //相机默认的旋转角度
    //     let dist = _camera.position.distanceTo(center);
    //     let phi = _Math.degToRad(_renderView.controls.alpha);   //(90-lat)*(Math.PI/180),
    //     let theta = _Math.degToRad(_renderView.controls.beta);   // (lng+180)*(Math.PI/180),
    //     let y = dist * Math.sin(phi);
    //     let temp = dist * Math.cos(phi);
    //     let x = temp * Math.sin(theta);
    //     let z = temp * Math.cos(theta);
    //     //平移实现以中心点为圆心的旋转结果
    //     let newPos = new Vector3(x, y, z);
    //     newPos.add(center);
    //     _camera.position.copy(newPos);
    //     //相机朝向中心点 
    //     _camera.lookAt(center);
    //     //orbite target position
    //     this._root.orbitControls.target.copy(center);
    // }

  }, {
    key: "getQuadrantByDir",
    value: function getQuadrantByDir(dir) {
      var _renderView = this._root.renderView;
      var _camera = _renderView._camera;
      var dirVectir = new Vector3();

      _camera.getWorldDirection(dirVectir);

      var cross = new Vector3();
      cross.crossVectors(dirVectir, dir);
      return cross;
      console.log("camrea dir:", dirVectir, dir, cross);
    }
  }, {
    key: "resetData",
    value: function resetData() {
      this.dataAttribute.resetData();
      this.dataAttribute.registTheme(this._root.getTheme.bind(this._root));
      this.dataAttribute.setDataFrame(this._root.dataFrame); //UI组件resetData
    }
  }]);

  return Cylindrical;
}(InertialSystem);

var Polar3D = /*#__PURE__*/function (_Cylindrical) {
  _inherits(Polar3D, _Cylindrical);

  var _super = _createSuper(Polar3D);

  function Polar3D(root) {
    var _thisSuper, _this;

    _classCallCheck(this, Polar3D);

    _this = _super.call(this, root);
    _this.DefaultControls = {
      autoRotate: false,
      //默认不自动旋转
      boxWidth: 1200,
      //空间中X的最大值(最大宽度)  
      boxHeight: 1200,
      //空间中Y的最大值(最大高度)  
      boxDepth: 500,
      //空间中Z的最大值(最大深度)
      distance: 1000,
      //默认相机距离
      maxDistance: 1200,
      //最大相机距离
      minDistance: 100,
      //最小相机距离 
      minZoom: 0.2,
      //正交投影缩小的最小值
      maxZoom: 1.5,
      //正交投影放大的最大值
      alpha: 30,
      //绕X轴旋转
      beta: 0,
      //绕Y轴旋转
      gamma: 0 //绕Z轴旋转

    };
    root.init(_this.DefaultControls);

    _get((_thisSuper = _assertThisInitialized(_this), _getPrototypeOf(Polar3D.prototype)), "init", _thisSuper).call(_thisSuper);

    return _this;
  }

  return Polar3D;
}(Cylindrical);

global.registerComponent(Polar3D, 'coord', 'polar3d', 3);

var Axis = /*#__PURE__*/function (_Component) {
  _inherits(Axis, _Component);

  var _super = _createSuper(Axis);

  function Axis(_cubeUI, opt) {
    var _this;

    _classCallCheck(this, Axis);

    _this = _super.call(this, _cubeUI._coordSystem);
    _this.name = 'Axis';
    _this._cubeUI = _cubeUI;
    _this.enabled = true;
    _this.tickLine = {
      enabled: 1,
      lineWidth: 1,
      //线宽像素
      lineLength: 5,
      //线长(空间单位)
      strokeStyle: '#333',
      offset: 0 //空间单位

    };
    _this.label = {
      enabled: 1,
      fontColor: '#333',
      fontSize: 12,
      rotation: 0,
      format: null,
      offset: 0,
      maxLength: 0,
      textAlign: "center",
      //水平方向对齐: left  right center 
      verticalAlign: 'bottom',
      //垂直方向对齐 top bottom middle
      lineHeight: 1
    }; //@params params包括 dataSection , 索引index，txt(canvax element) ，line(canvax element) 等属性

    _this.filter = null; //function(params){}; 
    //原点

    _this._origin = null; //轴的方向

    _this._axisDir = null; //tickLine 的方向

    _this._tickLineDir = null;

    _.extend(true, _assertThisInitialized(_this), opt);

    _this.axisAttribute = _this._coordSystem.getAxisAttribute(opt.field); //默认不显示

    _this.group.visible = false;

    _this.init();

    return _this;
  }

  _createClass(Axis, [{
    key: "setVisibel",
    value: function setVisibel(val) {
      this.group.visible = !!val;
    }
  }, {
    key: "setOrigin",
    value: function setOrigin(pos) {
      this._origin = pos;
    }
  }, {
    key: "setAxisDir",
    value: function setAxisDir(dir) {
      this._axisDir = dir;
    }
  }, {
    key: "setTickLineDir",
    value: function setTickLineDir(dir) {
      this._tickLineDir = dir;
    }
  }, {
    key: "init",
    value: function init() {
      this._initData();
    }
  }, {
    key: "_initData",
    value: function _initData() {
      var _this2 = this;

      this.field = this.axisAttribute.field;
      this.dataSection = this.axisAttribute.dataSection;
      this._formatTextSection = [];
      this._textElements = [];
      this.dataSection.forEach(function (val, i) {
        _this2._formatTextSection[i] = _this2._getFormatText(val, i);
      });
    }
  }, {
    key: "_getFormatText",
    value: function _getFormatText(val, i) {
      var res;

      if (_.isFunction(this.label.format)) {
        res = this.label.format.apply(this, arguments);
      } else {
        if (this.label.maxLength > 0) {
          if (val && val.length > this.label.maxLength) {
            res = "";
            var _i = 0;
            var l = val.length;

            while (l) {
              if (_i < this.label.maxLength) {
                res += (val + '').charAt(val.length - l);
                _i++;
              } else {
                res += '\n';
                res += (val + '').charAt(val.length - l);
                _i = 0;
              }

              l--;
            }
          }
        }
      }

      if (!res) {
        res = val;
      }

      return res;
    }
  }, {
    key: "initModules",
    value: function initModules() {
      var _coordSystem = this._coordSystem;
      this._tickLine = new TickLines(_coordSystem, this.tickLine);

      this._tickLine.setDir(this._tickLineDir);

      this._tickLine.initData({
        dir: this._axisDir,
        origin: this._origin
      }, this.axisAttribute);

      this._tickLine.drawStart();

      this.group.add(this._tickLine.group); //初始化tickText

      var opt = _.clone(this.label); //只有旋转就需要采用中间对齐


      if (opt.rotation != 0) {
        opt.textAlign = 'center';
      }

      opt.offset = this._tickLineDir.clone().multiplyScalar(opt.offset);
      this._tickText = new TickTexts(_coordSystem, opt);

      this._tickText.offset.add(this._tickLineDir.clone().multiplyScalar(this.tickLine.lineLength + this.tickLine.offset + this.tickLine.lineWidth));

      this._tickText.setDir(this._tickLineDir);

      this._tickText.initData({
        dir: this._axisDir,
        origin: this._origin
      }, this.axisAttribute);

      this._tickText.autoUpdataPostion = true;

      this._tickText.drawStart(this._formatTextSection);

      this.group.add(this._tickText.group);
    }
  }, {
    key: "draw",
    value: function draw() {
      this._tickLine.draw();

      this._tickText.draw();
    }
  }, {
    key: "dispose",
    value: function dispose() {
      this._tickLine.dispose();

      this._tickText.dispose();

      this.axisAttribute = null;
    }
  }, {
    key: "resetData",
    value: function resetData() {
      this._initData();

      this.axisAttribute = this._coordSystem.getAxisAttribute(this.field);

      this._tickLine.resetData({
        dir: this._axisDir,
        origin: this._origin
      }, this.axisAttribute);

      this._tickText.resetData({
        dir: this._axisDir,
        origin: this._origin
      }, this.axisAttribute, this._formatTextSection);

      this._tickText.autoUpdataPostion = true;
    }
  }]);

  return Axis;
}(Component);

var CubeUI = /*#__PURE__*/function (_Component) {
  _inherits(CubeUI, _Component);

  var _super = _createSuper(CubeUI);

  function CubeUI(_coordSystem) {
    var _this;

    _classCallCheck(this, CubeUI);

    _this = _super.call(this, _coordSystem);
    _this.name = 'CubeUI';
    _this.faceAxises = {};

    for (var key in FaceNames) {
      _this.faceAxises[FaceNames[key]] = [];
    }

    _this.init();

    return _this;
  }

  _createClass(CubeUI, [{
    key: "init",
    value: function init() {
      this._initModules();
    }
  }, {
    key: "_initModules",
    value: function _initModules() {
      var _coordSystem = this._coordSystem;
      var opt = null;
      var axises = this.faceAxises; //_dir === 'FRONT'

      {
        var origin = _coordSystem.getOriginPosition(FaceNames.FRONT); //初始化X轴


        opt = _.clone(_coordSystem.coord.xAxis);
        var xAxis = new Axis(this, opt);
        xAxis.setOrigin(origin.clone());
        xAxis.setAxisDir(new Vector3(1, 0, 0));
        xAxis.setTickLineDir(new Vector3(0, -1, 0));
        xAxis.initModules();
        this.group.add(xAxis.group);
        axises[FaceNames.FRONT].push(xAxis); //初始化Y轴

        opt = _.clone(_coordSystem.coord.yAxis);
        var yAxis = new Axis(this, opt);
        yAxis.setOrigin(origin.clone());
        yAxis.setAxisDir(new Vector3(0, 1, 0));
        yAxis.setTickLineDir(new Vector3(-1, 0, 0));
        yAxis.initModules();
        this.group.add(yAxis.group);
        axises[FaceNames.FRONT].push(yAxis);
      } //_dir === 'BACK'

      {
        var _origin = _coordSystem.getOriginPosition(FaceNames.BACK); //初始化X轴


        opt = _.clone(_coordSystem.coord.xAxis);

        var _xAxis = new Axis(this, opt);

        _xAxis.setOrigin(_origin.clone());

        _xAxis.setAxisDir(new Vector3(-1, 0, 0));

        _xAxis.setTickLineDir(new Vector3(0, -1, 0));

        _xAxis.initModules();

        this.group.add(_xAxis.group);
        axises[FaceNames.BACK].push(_xAxis); //初始化Y轴

        opt = _.clone(_coordSystem.coord.yAxis);

        var _yAxis = new Axis(this, opt);

        _yAxis.setOrigin(_origin.clone());

        _yAxis.setAxisDir(new Vector3(0, 1, 0));

        _yAxis.setTickLineDir(new Vector3(1, 0, 0));

        _yAxis.initModules();

        this.group.add(_yAxis.group);
        axises[FaceNames.BACK].push(_yAxis);
      } //_dir === 'LEFT'

      {
        var _origin2 = _coordSystem.getOriginPosition(FaceNames.LEFT); //初始化X轴 实际为Z轴


        opt = _.clone(_coordSystem.coord.xAxis);
        opt.field = _coordSystem.coord.zAxis.field;

        var _xAxis2 = new Axis(this, opt);

        _xAxis2.setOrigin(_origin2.clone());

        _xAxis2.setAxisDir(new Vector3(0, 0, 1));

        _xAxis2.setTickLineDir(new Vector3(0, -1, 0));

        _xAxis2.initModules();

        this.group.add(_xAxis2.group);
        axises[FaceNames.LEFT].push(_xAxis2); //初始化Y轴

        opt = _.clone(_coordSystem.coord.yAxis);
        opt.label.textAlign = 'right';

        var _yAxis2 = new Axis(this, opt);

        _yAxis2.setOrigin(_origin2.clone());

        _yAxis2.setAxisDir(new Vector3(0, 1, 0));

        _yAxis2.setTickLineDir(new Vector3(0, 0, -1));

        _yAxis2.initModules();

        this.group.add(_yAxis2.group);
        axises[FaceNames.LEFT].push(_yAxis2);
      } //_dir === 'RIGHT'

      {
        var _origin3 = _coordSystem.getOriginPosition(FaceNames.RIGHT); //测试原地
        // let point = new Mesh(new CircleBufferGeometry(2), new MeshBasicMaterial({ color: 'red' }));
        // let pos = origin.clone();
        // pos.z += 0;
        // point.position.copy(pos);
        // this.group.add(point);
        //初始化X轴 实际为Z轴


        opt = _.clone(_coordSystem.coord.xAxis);
        opt.field = _coordSystem.coord.zAxis.field;

        var _xAxis3 = new Axis(this, opt);

        _xAxis3.setOrigin(_origin3.clone());

        _xAxis3.setAxisDir(new Vector3(0, 0, -1));

        _xAxis3.setTickLineDir(new Vector3(0, -1, 0));

        _xAxis3.initModules();

        this.group.add(_xAxis3.group);
        axises[FaceNames.RIGHT].push(_xAxis3); //初始化Y轴

        opt = _.clone(_coordSystem.coord.yAxis); //opt.label.offset = 40;
        //opt.label.textAlign = "";

        var _yAxis3 = new Axis(this, opt);

        _yAxis3.setOrigin(_origin3.clone());

        _yAxis3.setAxisDir(new Vector3(0, 1, 0));

        _yAxis3.setTickLineDir(new Vector3(0, 0, 1));

        _yAxis3.initModules();

        this.group.add(_yAxis3.group);
        axises[FaceNames.RIGHT].push(_yAxis3);
      } //_dir === 'TOP'

      {
        var _origin4 = _coordSystem.getOriginPosition(FaceNames.TOP); //初始化X轴


        opt = _.clone(_coordSystem.coord.xAxis);

        var _xAxis4 = new Axis(this, opt);

        _xAxis4.setOrigin(_origin4.clone());

        _xAxis4.setAxisDir(new Vector3(1, 0, 0));

        _xAxis4.setTickLineDir(new Vector3(0, 0, 1));

        _xAxis4.initModules();

        this.group.add(_xAxis4.group);
        axises[FaceNames.TOP].push(_xAxis4); //修复top面 X轴label的位置

        _xAxis4.group.traverse(function (label) {
          if (label.type == "Sprite") {
            label.position.add(new Vector3(0, 0, 1).multiplyScalar(label.userData.size[1] * 0.5));
          }
        }); //
        //初始化Y轴 实际为Z轴


        opt = _.clone(_coordSystem.coord.yAxis);
        opt.field = _coordSystem.coord.zAxis.field; //opt.label.textAlign = 'right';

        var _yAxis4 = new Axis(this, opt);

        _yAxis4.setOrigin(_origin4.clone());

        _yAxis4.setAxisDir(new Vector3(0, 0, -1));

        _yAxis4.setTickLineDir(new Vector3(-1, 0, 0));

        _yAxis4.initModules();

        this.group.add(_yAxis4.group);
        axises[FaceNames.TOP].push(_yAxis4);
      } //_dir === 'BOTTOM'

      {
        var _origin5 = _coordSystem.getOriginPosition(FaceNames.BOTTOM); //初始化X轴


        opt = _.clone(_coordSystem.coord.xAxis);

        var _xAxis5 = new Axis(this, opt);

        _xAxis5.setOrigin(_origin5.clone());

        _xAxis5.setAxisDir(new Vector3(1, 0, 0));

        _xAxis5.setTickLineDir(new Vector3(0, 0, -1));

        _xAxis5.initModules();

        this.group.add(_xAxis5.group);
        axises[FaceNames.BOTTOM].push(_xAxis5); //初始化Y轴 实际为Z轴

        opt = _.clone(_coordSystem.coord.yAxis);
        opt.field = _coordSystem.coord.zAxis.field;

        var _yAxis5 = new Axis(this, opt);

        _yAxis5.setOrigin(_origin5.clone());

        _yAxis5.setAxisDir(new Vector3(0, 0, 1));

        _yAxis5.setTickLineDir(new Vector3(-1, 0, 0));

        _yAxis5.initModules();

        this.group.add(_yAxis5.group);
        axises[FaceNames.BOTTOM].push(_yAxis5);
      }
      {
        var _this$_coordSystem$ge = this._coordSystem.getGraphAreaSize(),
            width = _this$_coordSystem$ge.width,
            height = _this$_coordSystem$ge.height,
            depth = _this$_coordSystem$ge.depth;

        var getBasicMaterial = function getBasicMaterial() {
          return new MeshLambertMaterial({
            polygonOffset: true,
            polygonOffsetFactor: 1,
            polygonOffsetUnits: 0.1,
            color: '#FFFFFF'
          });
        };

        var geometry = new BoxGeometry(width, height, depth);
        this.box = new Mesh(geometry, getBasicMaterial());
      }
    }
  }, {
    key: "hideAxis",
    value: function hideAxis() {
      for (var key in FaceNames) {
        var name = FaceNames[key];
        this.faceAxises[name].forEach(function (axis) {
          axis.setVisibel(false);
        });
      }
    }
  }, {
    key: "showAxis",
    value: function showAxis() {
      var _this2 = this;

      var dir = this._coordSystem.getDirection();

      var _loop = function _loop(key) {
        var name = FaceNames[key];

        _this2.faceAxises[name].forEach(function (axis) {
          axis.setVisibel(false);

          if (name == dir) {
            axis.setVisibel(true);
          }
        });
      };

      for (var key in FaceNames) {
        _loop(key);
      }
    }
  }, {
    key: "draw",
    value: function draw() {
      var _this3 = this;

      // let app = this._root.app;
      // app._framework.on('renderbefore', () => {
      //     // box.rotation.x+=0.01;
      // })
      this.group.add(this.box);

      var dir = this._coordSystem.getDirection();

      var _loop2 = function _loop2(key) {
        var name = FaceNames[key];

        _this3.faceAxises[name].forEach(function (axis) {
          axis.setVisibel(false);

          if (name == dir) {
            axis.setVisibel(true);
          }

          axis.draw();
        });
      };

      for (var key in FaceNames) {
        _loop2(key);
      }
    }
  }, {
    key: "dispose",
    value: function dispose() {
      for (var key in FaceNames) {
        var name = FaceNames[key];
        this.faceAxises[name].forEach(function (axis) {
          axis.dispose();
        });
      }

      this.faceAxises = null;

      _get(_getPrototypeOf(CubeUI.prototype), "dispose", this).call(this, this.box);
    }
  }, {
    key: "resetData",
    value: function resetData() {
      for (var key in FaceNames) {
        var name = FaceNames[key];
        this.faceAxises[name].forEach(function (axis) {
          axis.resetData();
        });
      }
    }
  }]);

  return CubeUI;
}(Component);

var Cube = /*#__PURE__*/function (_InertialSystem) {
  _inherits(Cube, _InertialSystem);

  var _super = _createSuper(Cube);

  function Cube(root) {
    var _this;

    _classCallCheck(this, Cube);

    _this = _super.call(this, root); // let ratio = root.width / root.height;
    // let _frustumSize = 800;

    _this.availableGraph = {
      widthRatio: 0.8,
      heightRatio: 0.7
    };
    _this.DefaultControls = {
      autoRotate: false,
      //默认不自动旋转
      boxWidth: _this.width,
      //空间中X的最大值(最大宽度)  
      boxHeight: _this.height,
      //空间中Y的最大值(最大高度)  
      boxDepth: _this.height,
      //空间中Z的最大值(最大深度)
      distance: 1600,
      //默认相机距离
      maxDistance: 3000,
      //最大相机距离
      minDistance: 600,
      //最小相机距离 
      minZoom: 0.2,
      //正交投影缩小的最小值
      maxZoom: 1.5,
      //正交投影放大的最大值
      enableDamping: true,
      enablePan: false,
      enableKeys: false,
      autoRotateSpeed: 1.0,
      alpha: 5,
      //绕X轴旋转
      beta: 5,
      //绕Y轴旋转
      gamma: 0 //绕Z轴旋转

    }; //默认坐标系原点偏移
    //默认Y轴文字最大预留160,X轴文字最大100

    _this.offset = new Vector3(Math.min(160, _this.width * 0.1), Math.min(100, _this.height * 0.1), 0); //this.offset.set(0,0,0);
    //构建的数据集

    _this._attributes = [];

    if (_this.coord.offset) {
      _this.offset.copy(_this.coord.offset);
    }

    root.init(_this.DefaultControls);
    root.renderView.project('ortho');

    _this.init();

    return _this;
  } //基类调用 初始化配置


  _createClass(Cube, [{
    key: "setDefaultOpts",
    value: function setDefaultOpts(opts) {
      var defaultCoord = {
        xAxis: {
          layoutType: "peak",
          //"peak",  
          label: {
            textAlign: "center",
            //水平方向对齐: left  right center 
            offset: 2
          }
        },
        yAxis: {
          layoutType: "peak",
          //"peak",
          label: {
            textAlign: "right",
            offset: 2
          }
        },
        zAxis: {
          layoutType: "peak",
          label: {
            textAlign: "center",
            offset: 2
          }
        }
      };
      opts.coord = _.extend(true, defaultCoord, opts.coord); //当旋转到右侧的时候,由于存值一定的倾斜,就会看到cube的后面,
      //所以,这里默认在后面再次绘制前面的内容

      if (opts.graphs) {
        //判断是否配置了后面
        if (!opts.graphs.some(function (item) {
          return item.face === FaceNames.BACK;
        })) {
          var frontFaceOpt = opts.graphs.filter(function (item) {
            return item.face === FaceNames.FRONT;
          });
          var backFaceOpt = {};

          if (frontFaceOpt.length > 0) {
            _.extend(true, backFaceOpt, frontFaceOpt[0]);

            backFaceOpt.face = FaceNames.BACK;
            opts.graphs.push(backFaceOpt);
          }
        }
      }

      return opts;
    }
  }, {
    key: "init",
    value: function init() {
      var opt = _.clone(this.coord);

      var size = this.getGraphAreaSize();
      this.xAxisAttribute = new AxisAttribute(opt.xAxis, this.getAxisDataFrame(opt.xAxis.field));
      this.xAxisAttribute.setDataSection();
      this.xAxisAttribute.setAxisLength(size.width);

      this._attributes.push(this.xAxisAttribute);

      this.yAxisAttribute = new AxisAttribute(opt.yAxis, this.getAxisDataFrame(opt.yAxis.field));
      this.yAxisAttribute.setDataSection();
      this.yAxisAttribute.setAxisLength(size.height);

      this._attributes.push(this.yAxisAttribute);

      this.zAxisAttribute = new AxisAttribute(opt.zAxis, this.getAxisDataFrame(opt.zAxis.field));
      this.zAxisAttribute.setDataSection();
      this.zAxisAttribute.setAxisLength(size.depth);

      this._attributes.push(this.zAxisAttribute);

      this.addLights();
      this.updatePosition();
      this.group.position.copy(this.offset.clone().multiplyScalar(0.5));
      this.bindEvent();
      this.rotationCube = this.rotationCube();
    }
  }, {
    key: "bindEvent",
    value: function bindEvent() {
      var _this2 = this;

      this.__planeclick = function (e) {
        var dir = _this2.getDirection();

        for (var face in FaceNames) {
          if (FaceNames[face] !== dir) {
            var cmp = _this2._root.getComponent({
              name: "Heatmap_" + FaceNames[face]
            });

            if (cmp) {
              cmp.cancelSelect();
            }
          }
        }
      };

      this.__legendchange = function (e) {
        var face = e.data && e.data.face;
        if (!face) return;

        _this2.rotationTo(face);
      }; //取消上次的选中


      this.on('planeclick', this.__planeclick); //图例

      this.on('legendchange', this.__legendchange);
    }
  }, {
    key: "rotationTo",
    value: function rotationTo(face, duration) {
      var second = 0.5;
      duration = duration || 1000 * second; // 持续的时间

      var params = null;

      switch (face) {
        case FaceNames.FRONT:
          params = {
            alpha: 5,
            bata: 5,
            gamma: 0,
            duration: duration
          };
          break;

        case FaceNames.RIGHT:
          params = {
            alpha: 5,
            bata: 95,
            gamma: 0,
            duration: duration
          };
          break;

        case FaceNames.TOP:
          params = {
            alpha: 95,
            bata: 0,
            gamma: 5,
            duration: duration
          };
          break;

        default:
          params = {
            alpha: 5,
            bata: 5,
            gamma: 0,
            duration: duration
          };
      }

      this.rotationCube(params.alpha, params.bata, params.gamma, params.duration);
    }
  }, {
    key: "rotationCube",
    value: function rotationCube() {
      var _this3 = this;

      var controlOps = this._root.opt.coord.controls;
      var alpha = controlOps.alpha,
          beta = controlOps.beta,
          gamma = controlOps.gamma;
      return function (alphaEnd, betaEnd, gammaEnd, duration) {
        _this3._coordUI.hideAxis();

        var alphaStart = alpha;
        var spanAlpha = alphaEnd - alphaStart; //发生的变化

        var betaStart = beta;
        var spanBeta = betaEnd - betaStart; //发生的变化

        var gammaStart = gamma;
        var spanGamma = gammaEnd - gammaStart; //发生的变化

        var currDate = new Date().getTime();

        var fn = function fn() {
          var pass = new Date().getTime() - currDate;

          if (pass <= duration) {
            alpha = alphaStart + spanAlpha * pass / duration;
            beta = betaStart + spanBeta * pass / duration;
            gamma = gammaStart + spanGamma * pass / duration;
            _this3.group.rotation.x = _Math.degToRad(alpha);
            _this3.group.rotation.y = _Math.degToRad(-beta);
            _this3.group.rotation.z = _Math.degToRad(gamma);
          } else {
            alpha = alphaEnd;
            beta = betaEnd;
            gamma = gammaEnd;
            _this3.group.rotation.x = _Math.degToRad(alpha);
            _this3.group.rotation.y = _Math.degToRad(-beta);
            _this3.group.rotation.z = _Math.degToRad(gamma);

            _this3._coordUI.showAxis();

            _this3._root.app._framework.off('renderbefore', fn);
          }

          _this3._root.app.forceRender();
        };

        _this3._root.app._framework.on('renderbefore', fn);
      };
    }
  }, {
    key: "addLights",
    value: function addLights() {
      //加入灯光
      var ambientlight = new AmbientLight(0xffffff, 1); // soft white light

      this._root.rootStage.add(ambientlight);

      var center = this.center.clone();
      center = this._getWorldPos(center); //center.setY(0);

      var dirLights = [];
      var intensity = 1.0;
      var lightColor = 0xFFFFFF;
      var position = new Vector3(0.5, 0.5, 1);
      dirLights[0] = new DirectionalLight(lightColor, intensity);
      position.multiplyScalar(10000);
      dirLights[0].position.copy(position);
      dirLights[0].target.position.copy(center);

      this._root.rootStage.add(dirLights[0]);
    }
  }, {
    key: "initCoordUI",
    value: function initCoordUI() {
      if (this._coordUI) {
        this._coordUI.dispose();
      }

      this._coordUI = new CubeUI(this);
      this.group.add(this._coordUI.group);
    }
  }, {
    key: "getGraphAreaSize",
    value: function getGraphAreaSize() {
      var _this$getSize$sub = this.getSize().sub(this.offset),
          width = _this$getSize$sub.x,
          height = _this$getSize$sub.y,
          depth = _this$getSize$sub.z; //深度和宽度一直


      return {
        width: width * this.availableGraph.widthRatio,
        height: height * this.availableGraph.heightRatio,
        depth: Math.min(width, height) * this.availableGraph.heightRatio
      };
    }
  }, {
    key: "getOriginPosition",
    value: function getOriginPosition(dir) {
      var _this$getGraphAreaSiz = this.getGraphAreaSize(),
          width = _this$getGraphAreaSiz.width,
          height = _this$getGraphAreaSiz.height,
          depth = _this$getGraphAreaSiz.depth;

      var origin = new Vector3();
      dir = dir || this.getDirection(); //正面

      if (dir === FaceNames.FRONT) {
        origin.set(-width * 0.5, -height * 0.5, depth * 0.5);
      } //右面


      if (dir === FaceNames.RIGHT) {
        origin.set(width * 0.5, -height * 0.5, depth * 0.5);
      } //上面


      if (dir === FaceNames.TOP) {
        origin.set(-width * 0.5, height * 0.5, depth * 0.5);
      } //后面


      if (dir === FaceNames.BACK) {
        origin.set(width * 0.5, -height * 0.5, -depth * 0.5);
      } //左面


      if (dir === FaceNames.LEFT) {
        origin.set(-width * 0.5, -height * 0.5, -depth * 0.5);
      } //底面


      if (dir === FaceNames.BOTTOM) {
        origin.set(-width * 0.5, -height * 0.5, -depth * 0.5);
      }

      return origin;
    }
  }, {
    key: "getDirection",
    value: function getDirection() {
      var dir = new Vector3();
      this.group.getWorldDirection(dir); //cos(45)=0.7071067811865476
      //面对我们的cube面

      if (dir.dot(new Vector3(0, 0, 1)) > 0.7) {
        return FaceNames.FRONT;
      } else if (dir.dot(new Vector3(-1, 0, 0)) > 0.7) {
        return FaceNames.RIGHT;
      } else if (dir.dot(new Vector3(0, -1, 0)) > 0.7) {
        return FaceNames.TOP;
      } else if (dir.dot(new Vector3(1, 0, 0)) > 0.7) {
        return FaceNames.LEFT;
      } else if (dir.dot(new Vector3(0, 1, 0)) > 0.7) {
        return FaceNames.BOTTOM;
      } else if (dir.dot(new Vector3(0, 0, -1)) > 0.7) {
        return FaceNames.BACK;
      }

      return null;
    }
  }, {
    key: "updatePosition",
    value: function updatePosition() {
      //渲染对象,非相机
      var controlOps = this._root.opt.coord.controls;

      var phi = _Math.degToRad(controlOps.alpha); //(90-lat)*(Math.PI/180),


      var theta = _Math.degToRad(-controlOps.beta);

      var gamma = _Math.degToRad(controlOps.gamma);

      this.group.rotateX(phi);
      this.group.rotateY(theta);
      this.group.rotateZ(gamma); //防止旋转碰到相机

      var len = new Vector3(controlOps.boxWidth, controlOps.boxHeight, controlOps.boxDepth).length();

      this._root.renderView._camera.position.setZ(len);
    }
  }, {
    key: "drawUI",
    value: function drawUI() {
      this._coordUI.draw();

      this._root.app._framework.on('renderbefore', function () {// this.group.rotation.x+=0.01;
      });
    }
  }, {
    key: "getAxisAttribute",
    value: function getAxisAttribute(field) {
      var attribute = null;

      this._attributes.forEach(function (attr) {
        if (_.isArray(field)) {
          if (JSON.stringify(field) == JSON.stringify(attr.field)) {
            attribute = att;
          }
        } else {
          if (attr.field == field) {
            attribute = attr;
          }
        }
      });

      return attribute;
    }
  }, {
    key: "resetData",
    value: function resetData() {
      var opt = _.clone(this.coord);

      this.xAxisAttribute.resetDataOrg(this.getAxisDataFrame(opt.xAxis.field));
      this.xAxisAttribute.setDataSection();
      this.xAxisAttribute.calculateProps();
      this.yAxisAttribute.resetDataOrg(this.getAxisDataFrame(opt.yAxis.field));
      this.yAxisAttribute.setDataSection();
      this.yAxisAttribute.calculateProps();
      this.zAxisAttribute.resetDataOrg(this.getAxisDataFrame(opt.zAxis.field));
      this.zAxisAttribute.setDataSection();
      this.zAxisAttribute.calculateProps(); //UI组件resetData

      this._coordUI.resetData();
    }
  }, {
    key: "dispose",
    value: function dispose() {
      if (this.__planeclick) {
        this.off('planeclick', this.__planeclick);
      }

      if (this.__legendchange) {
        this.off('legendchange', this.__legendchange);
      }

      if (this._coordUI) {
        this._coordUI.dispose();
      }

      this._attributes = [];
    }
  }]);

  return Cube;
}(InertialSystem);

global.registerComponent(Cube, 'coord', 'cube', 3);

var GraphObject = /*#__PURE__*/function (_Component) {
  _inherits(GraphObject, _Component);

  var _super = _createSuper(GraphObject);

  function GraphObject(chart3d) {
    var _this;

    _classCallCheck(this, GraphObject);

    _this = _super.call(this, chart3d.currCoord); //todo 每个图表初始化前最基本的属性放在这里

    _this.enabledField = [];
    _this.drawData = [];
    return _this;
  }

  _createClass(GraphObject, [{
    key: "setEnabledField",
    value: function setEnabledField() {
      var _coord = this._coordSystem;

      var _zfield = _coord.isExistZAxisField();

      if (!_zfield) {
        this.enabledField = this._coordSystem.getEnabledFields(this.field);
      } else {
        var zSection = _coord.zAxisAttribute.getDataSection();

        this.enabledField = this._coordSystem.getEnabledFields(zSection);
      }
    }
  }, {
    key: "dataProcess",
    value: function dataProcess() {
      //每一个图型组件在绘制前都需要进行数据处理,提取出来这里统一做首次处理
      if (this._coordSystem.type == "Cartesian3D") {
        this._cartesian3DProcess();
      }
    }
  }, {
    key: "_cartesian3DProcess",
    value: function _cartesian3DProcess() {
      var me = this;
      var _coord = this._coordSystem;
      var _xAxis = _coord.xAxisAttribute;
      var _zAxis = _coord.zAxisAttribute;

      var yAxisInfo = _coord.getYAxis(this.yAxisName);

      var _yAxis = yAxisInfo.attr;
      var zData, zNativeSection; //用来计算下面的hLen

      this.setEnabledField();
      this.drawData = {};
      var hLen = this.enabledField.length; //每组显示的个数
      //判断是是否提供了Z轴字段,也就是判断数据是二维数据还是三维数据

      var _zfield = _coord.isExistZAxisField();

      zNativeSection = _zAxis.getNativeDataSection();

      if (_zAxis.layoutType === 'proportion') {
        zData = _.flatten(_zAxis.dataOrg);
      } else {
        zData = _zAxis.getDataSection();
      } //然后计算出对于结构的dataOrg


      function generate(zVal, zInd) {
        //dataOrg和field是一一对应的
        var dataOrg = [];
        var rowDataOf;

        if (!_zfield) {
          dataOrg = me._root.dataFrame.getDataOrg(me.enabledField);
        } else {
          var orgVal = zNativeSection[zInd];

          var op = _defineProperty({}, _zfield, orgVal);

          rowDataOf = me._root.dataFrame.getRowDataOf(op);
          var arr = [];
          arr = rowDataOf.map(function (item) {
            return item[_yAxis.field];
          });
          dataOrg.push([arr]);
        }

        _.each(dataOrg, function (hData, b) {
          //hData，可以理解为一根竹子 横向的分组数据，这个hData上面还可能有纵向的堆叠
          //tempBarData 一根柱子的数据， 这个柱子是个数据，上面可以有n个子元素对应的竹节
          var tempBarData = [];
          var _vValue = 0;

          _.each(hData, function (vSectionData, v) {
            tempBarData[v] = []; //vSectionData 代表某个字段下面的一组数据比如 uv

            var _dataLen = vSectionData.length; //vSectionData为具体的一个field对应的一组数据

            _.each(vSectionData, function (val, i) {
              _vValue = 0;

              if (v > 0) {
                for (var t = 0; t < v; t++) {
                  _vValue += hData[t][i];
                }
              }

              var vCount = val;

              if (me.proportion) {
                //先计算总量
                vCount = 0;

                _.each(hData, function (team, ti) {
                  vCount += team[i];
                });
              }
              var z = 0;
              z = -_zAxis.getPosOfVal(zVal);
              zInd = _zAxis.getIndexOfVal(zVal);
              var _field = null;

              if (_zfield) {
                _field = me.field.toString();
              } else {
                _field = me._getTargetField(b, v, i, me.enabledField);
              }

              var rowData = 0;

              if (_zfield) {
                rowData = rowDataOf[i];
              } else {
                rowData = me._root.dataFrame.getRowDataAt(i);
              }

              var xVal = rowData[_xAxis.field];

              var x = _xAxis.getPosOfVal(xVal);

              var y = 0,
                  startY = 0;

              if (me.proportion) {
                y = val / vCount * _yAxis.axisLength;
              } else {
                y = _yAxis.getPosOfVal(val);
                startY = _yAxis.getPosOfVal(_vValue);
              }
              var nodeData = new NodeData({
                type: me.type,
                value: val,
                vInd: v,
                //如果是堆叠图的话，这个node在堆叠中得位置
                vCount: vCount,
                groupIndex: b,
                field: _field,
                xField: _xAxis.field,
                zField: _zAxis.field,
                dataLen: _dataLen,
                size: new Vector3(xVal, val, zVal),
                pos: new Vector3(x, y, z),
                fromPos: new Vector3(x, startY, z),
                vValue: _vValue,
                hLen: hLen,
                iNode: i,
                zNode: zInd,
                rowData: rowData,
                color: _zfield ? _coord.getColor(zVal) : _coord.getColor(_field)
              });
              var key = nodeData.field;

              if (_zfield) {
                key = zVal;
              }

              if (!me.drawData[key]) {
                me.drawData[key] = tempBarData[v];
              }
              tempBarData[v].push(nodeData);
            });
          });
        });
      }

      var fieldName = this.enabledField.toString();

      if (!_zfield) {
        var zInd = _.indexOf(zNativeSection, fieldName);

        generate(zData[zInd]);
      } else {
        zData.forEach(function (zd, zInd) {
          generate(zd, zInd);
        });
      }

      return me.drawData;
    }
  }, {
    key: "_getTargetField",
    value: function _getTargetField(b, v, i, field) {
      if (_.isString(field)) {
        return field;
      } else if (_.isArray(field)) {
        var res = field[b];

        if (_.isString(res)) {
          return res;
        } else if (_.isArray(res)) {
          return res[v];
        }
      }
    }
  }]);

  return GraphObject;
}(Component);

var NodeData = /*#__PURE__*/function () {
  function NodeData() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$type = _ref.type,
        type = _ref$type === void 0 ? null : _ref$type,
        _ref$value = _ref.value,
        value = _ref$value === void 0 ? null : _ref$value,
        _ref$vInd = _ref.vInd,
        vInd = _ref$vInd === void 0 ? null : _ref$vInd,
        _ref$vCount = _ref.vCount,
        vCount = _ref$vCount === void 0 ? null : _ref$vCount,
        _ref$field = _ref.field,
        field = _ref$field === void 0 ? null : _ref$field,
        _ref$xField = _ref.xField,
        xField = _ref$xField === void 0 ? null : _ref$xField,
        _ref$zField = _ref.zField,
        zField = _ref$zField === void 0 ? null : _ref$zField,
        _ref$dataLen = _ref.dataLen,
        dataLen = _ref$dataLen === void 0 ? 0 : _ref$dataLen,
        size = _ref.size,
        fromPos = _ref.fromPos,
        _ref$iNode = _ref.iNode,
        iNode = _ref$iNode === void 0 ? null : _ref$iNode,
        _ref$zNode = _ref.zNode,
        zNode = _ref$zNode === void 0 ? null : _ref$zNode,
        _ref$rowData = _ref.rowData,
        rowData = _ref$rowData === void 0 ? null : _ref$rowData,
        _ref$color = _ref.color,
        color = _ref$color === void 0 ? null : _ref$color,
        _ref$vValue = _ref.vValue,
        vValue = _ref$vValue === void 0 ? null : _ref$vValue,
        _ref$pos = _ref.pos,
        pos = _ref$pos === void 0 ? null : _ref$pos,
        _ref$hLen = _ref.hLen,
        hLen = _ref$hLen === void 0 ? null : _ref$hLen,
        _ref$groupIndex = _ref.groupIndex,
        groupIndex = _ref$groupIndex === void 0 ? null : _ref$groupIndex;

    _classCallCheck(this, NodeData);

    this.init(type, value, vInd, vCount, field, xField, zField, dataLen, size, fromPos, iNode, zNode, rowData, color, vValue, pos, hLen, groupIndex);
  }

  _createClass(NodeData, [{
    key: "init",
    value: function init(type, value, vInd, vCount, field, xField, zField, dataLen, size, fromPos, iNode, zNode, rowData, color, vValue, pos, hLen, groupIndex) {
      this.type = type; //图型补充

      this.value = value; //对于在Y轴上的值

      this.vInd = vInd; //如果是堆叠图的话，这个node在堆叠中得位置

      this.vValue = vValue; //堆叠后的值

      this.vCount = vCount; //纵向方向的总数,比瑞堆叠了uv(100),pv(100),那么这个vCount就是200，比例柱状图的话，外部tips定制content的时候需要用到

      this.field = field; //y轴对应的字段 

      this.xField = xField; //x轴对应的字段

      this.zField = zField; //z轴对应的字段 

      this.dataLen = dataLen; //该字段对应的数据个数

      this.hLen = hLen; //分组数据的总数

      this.groupIndex = groupIndex; //分组的索引

      this.size = size || new Vector3(); //图像的大小数据

      this.pos = pos; //值转换为位置的数据

      this.fromPos = fromPos || new Vector3(); //图像的位置

      this.iNode = iNode; //相对于x轴的索引 

      this.zNode = zNode; //相对于轴z的索引 

      this.rowData = rowData; //本行数据

      this.color = color; //颜色值
    }
  }]);

  return NodeData;
}();

var Bar = /*#__PURE__*/function (_GraphObject) {
  _inherits(Bar, _GraphObject);

  var _super = _createSuper(Bar);

  function Bar(chart3d, opt) {
    var _this;

    _classCallCheck(this, Bar);

    _this = _super.call(this, chart3d);
    _this.name = 'Bar';
    _this.type = "bar";
    _this._type = "bar3d";
    _this.node = {
      shapeType: 'cube',
      //'cube'立方体  'cylinder'圆柱体  ,'cone'圆锥体 
      materialType: 'phong',
      //'lambert' 'phong' 'base'  作色方式
      // width: 0,
      // _width: 0,
      // maxWidth: 50,
      // minWidth: 1,
      // minHeight: 0,
      // radius: 3,
      fillStyle: null // fillAlpha: 0.95,
      // _count: 0, //总共有多少个bar
      // xDis: null,
      // filter: null

    };
    _this.label = {
      enabled: false,
      animation: true,
      fontColor: null,
      //如果有设置text.fontColor那么优先使用fontColor
      fontSize: 12,
      format: null,
      lineWidth: 0,
      strokeStyle: null,
      rotation: 0,
      align: "center",
      //left center right
      verticalAlign: "bottom",
      //top middle bottom
      position: "top",
      //top,topRight,right,rightBottom,bottom,bottomLeft,left,leftTop,center
      offsetX: 0,
      offsetY: 0
    }; //this.sort = null; //TODO:这个设置有问题，暂时所有sort相关的逻辑都注释掉
    // this._barsLen = 0;
    //this.txtsSp = null;

    _this.proportion = false; //比例柱状图，比例图首先肯定是个堆叠图

    _this.allGroupNum = 1;

    _.extend(true, _assertThisInitialized(_this), opt); // this.materialMap = new Map();


    _this.init();

    return _this;
  }

  _createClass(Bar, [{
    key: "init",
    value: function init() {
      this.barsGroup = this._root.app.addGroup({
        name: 'bars_gruop'
      });
    }
  }, {
    key: "dataProcess",
    value: function dataProcess() {
      _get(_getPrototypeOf(Bar.prototype), "dataProcess", this).call(this);

      var ceil = this._coordSystem.getCeilSize();

      var boxDepth = ceil.z * 0.7;

      for (var field in this.drawData) {
        var fieldObj = this.drawData[field];
        fieldObj.forEach(function (item) {
          item.ceil = ceil;
          item.boxWidth = ceil.x / item.hLen * 0.7;
          item.boxHeight = item.pos.y;
          item.boxDepth = boxDepth > item.boxWidth ? item.boxWidth : boxDepth;
        });
      }
    }
  }, {
    key: "getMaterial",
    value: function getMaterial(dataOrg) {
      var MaterilBar = null;

      switch (this.node.materialType) {
        case 'phong':
          MaterilBar = MeshPhongMaterial;
          break;

        case 'lambert':
          MaterilBar = MeshLambertMaterial;
          break;

        case 'base':
          MaterilBar = MeshBasicMaterial$$1;
          break;

        default:
          MaterilBar = MeshPhongMaterial;
      }

      var _color = this._getColor(this.node.fillStyle, dataOrg);

      var material = null; //todo 鼠标移动高亮,需要为每个柱子设置单独的材质,后续考虑有没有其他办法减少材质
      // if (!this.materialMap.has(_color)) {

      material = new MaterilBar({
        color: _color,
        transparent: true,
        opacity: 1,
        depthTest: true,
        depthWrite: true,
        side: DoubleSide // polygonOffset: true,
        // polygonOffsetFactor: 1,
        // polygonOffsetUnits: 1.5

      }); //   this.materialMap.set(_color, material);
      // } else {
      //     material = this.materialMap.get(_color);
      // }

      return material;
    }
  }, {
    key: "draw",
    value: function draw() {
      var _this2 = this;

      var me = this;
      var app = this._root.app;
      this.dataProcess();
      var scale = 0.9; //每个单元格柱子占用的百分比

      for (var field in this.drawData) {
        var fieldObj = this.drawData[field];
        fieldObj.forEach(function (item) {
          var span = item.ceil.x / (item.hLen * 2) * scale;
          var step = item.groupIndex * 2 + 1;
          item.fromPos.setX(item.fromPos.x + (span * step - item.ceil.x * 0.5 * scale) - item.boxWidth * 0.5);

          if (_this2.node.shapeType == 'cylinder' || 'cone' == _this2.node.shapeType) {
            item.fromPos.setZ(item.pos.z - item.boxWidth * 0.5);
          } else {
            item.fromPos.setZ(item.pos.z - item.boxDepth * 0.5);
          }

          var boxHeight = Math.max(item.boxHeight, 0.01);
          var material = me.getMaterial(item);
          var obj = null;
          var boundbox = new Box3();
          var fromPos = item.fromPos.clone();

          if (_this2.node.shapeType == 'cone') {
            obj = app.createCone(item.boxWidth, boxHeight, item.boxDepth, material);
            boundbox.setFromObject(obj);
            fromPos.x += boundbox.getCenter().x;
          } else if (_this2.node.shapeType == 'cylinder') {
            obj = app.createCylinder(item.boxWidth, boxHeight, item.boxDepth, material);
            boundbox.setFromObject(obj);
            fromPos.x += boundbox.getCenter().x;
          } else {
            obj = app.createBox(item.boxWidth, boxHeight, item.boxDepth, material);
          }

          obj.name = Bar._bar_prefix + _this2.node.shapeType + "_" + item.vInd + "_" + item.iNode;
          obj.userData.info = item;
          obj.position.copy(fromPos);

          _this2.group.add(obj);
        });
      }
      this.bindEvent();
    }
  }, {
    key: "bindEvent",
    value: function bindEvent() {
      var _this3 = this;

      var me = this;

      this.__mouseover = function (e) {
        //上下文中的this 是bar 对象
        this.userData.color = this.material.color.clone(); //高亮

        var tempColor = {};
        this.material.color.getHSL(tempColor);
        this.material.setValues({
          color: new Color$1().setHSL(tempColor.h, tempColor.s, tempColor.l + 0.1)
        });

        me._root.fire({
          type: 'tipShow',
          event: e.event,
          data: this.userData.info
        });

        me.fire({
          type: 'barover',
          data: this.userData.info
        });
      };

      this.__mouseout = function (e) {
        this.material.setValues({
          color: this.userData.color
        });

        me._root.fire({
          type: 'tipHide',
          event: e.event,
          data: this.userData.info
        });

        me.fire({
          type: 'barout',
          data: this.userData.info
        });
      };

      this.__mousemove = function (e) {
        me._root.fire({
          type: 'tipMove',
          event: e.event,
          data: this.userData.info
        });

        me.fire({
          type: 'barmove',
          data: this.userData.info
        });
      };

      this.__click = function (e) {
        me.fire({
          type: 'barclick',
          data: this.userData.info
        });
      };

      this.group.traverse(function (obj) {
        if (obj.name && obj.name.includes(Bar._bar_prefix)) {
          obj.on('mouseover', _this3.__mouseover);
          obj.on('mouseout', _this3.__mouseout);
          obj.on('mousemove', _this3.__mousemove);
          obj.on('click', _this3.__click);
        }
      });
    }
  }, {
    key: "_getColor",
    value: function _getColor(c, dataOrg) {
      var field = dataOrg.field.split(',');

      var color$$1 = this._coordSystem.getColor(field); //field对应的索引，， 取颜色这里不要用i


      if (_.isString(c)) {
        color$$1 = c;
      }

      if (_.isArray(c)) {
        color$$1 = _.flatten(c)[_.indexOf(_flattenField, field)];
      }

      if (_.isFunction(c)) {
        color$$1 = c.apply(this, [rectData]);
      }
      return color$$1;
    }
  }, {
    key: "dispose",
    value: function dispose() {
      var _this4 = this;

      //this.materialMap.clear();
      this.group.traverse(function (obj) {
        if (obj.name && obj.name.includes(Bar._bar_prefix)) {
          obj.off('click', _this4.__click);
          obj.off('mouseover', _this4.__mouseover);
          obj.off('mouseout', _this4.__mouseout);
          obj.off('mousemove', _this4.__mousemove);
        }
      });

      _get(_getPrototypeOf(Bar.prototype), "dispose", this).call(this);
    }
  }, {
    key: "resetData",
    value: function resetData() {
      this.dispose();
      this.draw();
    }
  }]);

  return Bar;
}(GraphObject);

Bar._bar_prefix = "bar_one_";
global.registerComponent(Bar, 'graphs', 'bar', 3);

var __lastPosition = null;

var Line$1 = /*#__PURE__*/function (_GraphObject) {
  _inherits(Line$$1, _GraphObject);

  var _super = _createSuper(Line$$1);

  function Line$$1(chart3d, opt) {
    var _this;

    _classCallCheck(this, Line$$1);

    _this = _super.call(this, chart3d);
    _this.name = 'Line';
    _this.type = "line";
    _this._type = "line3d";
    _this.line = {
      //线
      enabled: 1,
      shapeType: "brokenLine",
      //折线
      strokeStyle: null,
      lineWidth: 2,
      lineType: "solid",
      smooth: true
    };
    _this.icon = {
      //节点 
      enabled: 1,
      //是否有
      shapeType: "circle",
      corner: false,
      //模式[false || 0 = 都有节点 | true || 1 = 拐角才有节点]
      radius: 3,
      //半径 icon 圆点的半径
      fillStyle: '#ffffff',
      strokeStyle: null
    };
    _this.area = {
      //填充
      //            shapeType : "path",
      enabled: 1,
      fillStyle: null,
      alpha: 0.3
    };

    _.extend(true, _assertThisInitialized(_this), opt);

    _this.init();

    return _this;
  }

  _createClass(Line$$1, [{
    key: "init",
    value: function init() {
      this.lineGroup = this._root.app.addGroup({
        name: 'line_lines_gruop'
      });
      this.areaGroup = this._root.app.addGroup({
        name: 'line_areas_gruop'
      });
      this.nodeGroup = this._root.app.addGroup({
        name: 'line_nodes_gruop'
      });
      this.group.add(this.lineGroup);
      this.group.add(this.areaGroup);
      this.group.add(this.nodeGroup);
    }
  }, {
    key: "_getColor",
    value: function _getColor(c, dataOrg) {
      var color$$1 = this._coordSystem.getColor(dataOrg.field); //field对应的索引，， 取颜色这里不要用i


      if (_.isString(c)) {
        color$$1 = c;
      }

      if (_.isArray(c)) {
        color$$1 = _.flatten(c)[_.indexOf(_flattenField, field)];
      }

      if (_.isFunction(c)) {
        color$$1 = c.apply(this, [rectData]);
      }
      return color$$1;
    }
  }, {
    key: "dataProcess",
    value: function dataProcess() {
      _get(_getPrototypeOf(Line$$1.prototype), "dataProcess", this).call(this);
    }
  }, {
    key: "draw",
    value: function draw() {
      var _this2 = this;

      var me = this;
      var app = this._root.app;
      this.dataProcess();
      var DIVISONS = 200;

      var _loop = function _loop(_field) {
        var _color = _this2._getColor(_this2.line.strokeStyle, {
          field: _field
        }) || "red";

        var fieldObj = _this2.drawData[_field];
        var points = null,
            bottomPoints = [];
        var poses = fieldObj.map(function (item) {
          if (item.vInd > 0) {
            bottomPoints.push(item.fromPos);
            return new Vector3().copy(item.pos).setY(item.pos.y + item.fromPos.y);
          }

          return item.pos;
        });

        if (me.line.smooth) {
          var curve = new CatmullRomCurve3(poses);
          points = curve.getSpacedPoints(DIVISONS);

          if (bottomPoints.length > 0) {
            var curve2 = new CatmullRomCurve3(bottomPoints);
            bottomPoints = curve2.getSpacedPoints(DIVISONS);
          }
        } else {
          points = poses;
        }

        var line = app.createBrokenLine(points, _this2.line.lineWidth, _color, true);
        line.visible = !!_this2.line.enabled;

        _this2.lineGroup.add(line); //绘制区域


        var pointArr = [];
        points.forEach(function (point) {
          pointArr = pointArr.concat(point.toArray());
        });

        if (bottomPoints.length > 0) {
          //绘制堆叠区域
          for (var i = bottomPoints.length - 1; i >= 0; i--) {
            pointArr = pointArr.concat(bottomPoints[i].toArray());
          }
        } else {
          //绘制普通的区域
          pointArr.unshift(pointArr[0], 0, pointArr[2]);
          pointArr.push(pointArr[(points.length - 1) * 3], 0, pointArr[(points.length - 1) * 3 + 2]);
        }

        var polygon = app.createPolygonPlane(pointArr, {
          fillStyle: _color
        });
        polygon.userData = fieldObj;
        polygon.visible = !!_this2.area.enabled;

        _this2.areaGroup.add(polygon); //绘制node 点


        poses.forEach(function (point) {
          //let node = app.createSphere(10,{fillStyle:_color});
          var node = app.createCirclePlane(10, {
            fillStyle: _color
          });
          node.position.copy(point);
          node.visible = !!_this2.icon.enabled;

          _this2.nodeGroup.add(node);
        });
      };

      for (var _field in this.drawData) {
        _loop(_field);
      }

      this.bindEvent();
    }
  }, {
    key: "bindEvent",
    value: function bindEvent() {
      var _this3 = this;

      this.__mousemove = function (e) {
        var currObj = e.intersects[0];
        var target = e.target;

        if (currObj) {
          var pos = currObj.point.clone();

          var locPos = _this3._coordSystem.group.worldToLocal(pos);

          var positions = target.userData.map(function (obj) {
            if (obj.vInd > 0) {
              return new Vector3().copy(obj.pos).setY(obj.pos.y + obj.fromPos.y);
            }

            return obj.pos;
          });
          var currPoint = findNearPointX(positions, locPos);

          var currInfo = _.find(target.userData, function (item) {
            var _pos = item.pos.clone();

            if (item.vInd > 0) {
              _pos = new Vector3().copy(item.pos).setY(item.pos.y + item.fromPos.y);
            }

            return _pos.equals(currPoint);
          });

          if (!__lastPosition || !currPoint.equals(__lastPosition)) {
            //this._showLabel(currInfo);
            _this3._root.fire({
              type: 'tipShow',
              event: e.event,
              data: currInfo
            });

            __lastPosition = currPoint;

            _this3.fire({
              type: 'showLable',
              data: currInfo
            });
          }

          _this3.fire({
            type: 'mousemove'
          }); // console.log(currPoint);

        }
      };

      this.__mouseout = function (e) {
        if (_this3.textTempGroup) ;

        _this3._root.fire({
          type: 'tipHide',
          event: e.event,
          data: null
        });

        _this3.fire({
          type: 'mouseout'
        });
      };

      this.areaGroup.traverse(function (obj) {
        obj.on('mousemove', _this3.__mousemove);
        obj.on("mouseout", _this3.__mouseout);
      });
      this.on('showLable', function (e) {
        _this3.nodeGroup.traverse(function (obj) {
          if (obj.userData.isScale) {
            obj.userData.isScale = false;
            obj.scale.multiplyScalar(0.5);
          }

          var _pos = e.data.pos.clone();

          if (e.data.vInd > 0) {
            _pos = new Vector3().copy(e.data.pos).setY(e.data.pos.y + e.data.fromPos.y);
          }

          if (!obj.userData.isScale && obj.position.equals(_pos)) {
            obj.userData.isScale = true;
            obj.scale.multiplyScalar(2);
          }
        });
      });
      this.on('mouseout', function (e) {
        _this3.nodeGroup.traverse(function (obj) {
          if (obj.userData.isScale) {
            obj.userData.isScale = false;
            obj.scale.multiplyScalar(0.5);
          }
        });
      });
    }
  }, {
    key: "dispose",
    value: function dispose() {
      var _this4 = this;

      this.areaGroup.traverse(function (obj) {
        obj.off('mousemove', _this4.__mousemove);
        obj.off("mouseout", _this4.__mouseout);
      });

      _get(_getPrototypeOf(Line$$1.prototype), "dispose", this).call(this);
    }
  }, {
    key: "resetData",
    value: function resetData() {
      this.dispose();
      this.draw();
    }
  }]);

  return Line$$1;
}(GraphObject);

global.registerComponent(Line$1, 'graphs', 'line', 3);

var __lastPosition$1 = null;

var Area = /*#__PURE__*/function (_GraphObject) {
  _inherits(Area, _GraphObject);

  var _super = _createSuper(Area);

  function Area(chart3d, opt) {
    var _this;

    _classCallCheck(this, Area);

    _this = _super.call(this, chart3d);
    _this.name = "Area";
    _this.type = "area";
    _this._type = "area3d";
    _this.area = {
      //填充
      //            shapeType : "path",
      enabled: 1,
      fillStyle: null,
      alpha: 0.3,
      thickness: Infinity,
      smooth: true
    };

    _.extend(true, _assertThisInitialized(_this), opt);

    _this.init();

    return _this;
  }

  _createClass(Area, [{
    key: "init",
    value: function init() {
      this.textGroup = this._root.app.addGroup({
        name: 'text_groups'
      });
      this.textTempGroup = this._root.app.addGroup({
        name: 'text_temp_groups'
      });
      this.group.add(this.textGroup);
      this.group.add(this.textTempGroup);
    }
  }, {
    key: "_getColor",
    value: function _getColor(c, dataOrg) {
      var color$$1 = this._coordSystem.getColor(dataOrg.field); //field对应的索引，， 取颜色这里不要用i


      if (_.isString(c)) {
        color$$1 = c;
      }

      if (_.isArray(c)) {
        color$$1 = _.flatten(c)[_.indexOf(_flattenField, field)];
      }

      if (_.isFunction(c)) {
        color$$1 = c.apply(this, [rectData]);
      }
      return color$$1;
    }
  }, {
    key: "dataProcess",
    value: function dataProcess() {
      _get(_getPrototypeOf(Area.prototype), "dataProcess", this).call(this);
    }
  }, {
    key: "draw",
    value: function draw() {
      var me = this;
      var app = this._root.app;
      this.dataProcess();

      var ceil = this._coordSystem.getCeilSize();

      var boxDepth = ceil.z * 0.7;
      var DIVISONS = 200;

      for (var _field in this.drawData) {
        var _color = this._getColor(null, {
          field: _field
        }) || "red";

        var fieldObj = this.drawData[_field];
        var points = null; // // //if (this.line.enabled) {
        // //     if (me.line.smooth) {

        var poses = fieldObj.map(function (item) {
          return item.pos;
        });

        if (this.area.smooth) {
          var curve = new CatmullRomCurve3(poses);
          points = curve.getSpacedPoints(DIVISONS);
        } else {
          points = poses;
        }

        var thickness = Math.max(0.1, Math.min(boxDepth, this.area.thickness)); //绘制区域

        points.unshift(points[0].clone().setY(0));
        points.push(points[points.length - 1].clone().setY(0));
        var polygon = app.createArea(points, thickness, {
          fillStyle: _color
        });
        polygon.name = Area._area_prefix + _field;
        polygon.userData = fieldObj;
        var posZ = points[0].z;
        posZ = posZ - thickness * 0.5;
        polygon.visible = !!this.area.enabled;
        polygon.position.setZ(posZ);
        this.group.add(polygon);
      }

      me.bindEvent();
    }
  }, {
    key: "bindEvent",
    value: function bindEvent() {
      var _this2 = this;

      this.__mousemove = function (e) {
        var currObj = e.intersects[0];
        var target = e.target;

        if (currObj) {
          var pos = currObj.point.clone();

          var locPos = _this2._coordSystem.group.worldToLocal(pos);

          var positions = target.userData.map(function (obj) {
            return obj.pos;
          });
          var currPoint = findNearPointX(positions, locPos);

          var currInfo = _.find(target.userData, function (item) {
            return item.pos.equals(currPoint);
          });

          if (!__lastPosition$1 || !currPoint.equals(__lastPosition$1)) {
            _this2._showLabel(currInfo);

            _this2._root.fire({
              type: 'tipShow',
              event: e.event,
              data: currInfo
            });

            __lastPosition$1 = currPoint;

            _this2.fire({
              type: 'showLable',
              data: currInfo
            });
          }

          _this2.fire({
            type: 'mousemove'
          }); // console.log(currPoint);

        }
      };

      this.__mouseout = function (e) {
        if (_this2.textTempGroup) {
          _this2.textTempGroup.traverse(function (item) {
            item.on('removed', function (e) {
              _this2.fire({
                type: 'hideLable',
                data: e.target.userData
              });
            });
          });

          _this2.dispose(_this2.textTempGroup);
        }

        _this2._root.fire({
          type: 'tipHide',
          event: e.event,
          data: null
        });

        _this2.fire({
          type: 'mouseout'
        });
      };

      this.group.traverse(function (obj) {
        if (obj.name && obj.name.includes(Area._area_prefix)) {
          obj.on('mousemove', _this2.__mousemove);
          obj.on("mouseout", _this2.__mouseout);
        }
      });
    }
  }, {
    key: "_showLabel",
    value: function _showLabel(labelInfo) {
      var app = this._root.app;
      var val = labelInfo.value;
      var position = labelInfo.pos;
      var fontStyle = {
        fontSize: 50,
        fillStyle: labelInfo.color,
        strokeStyle: "#ccc",
        lineWidth: 2,
        isBold: true
      };
      var offset = 50; //干掉上一个显示

      this.dispose(this.textTempGroup);
      var textObj = app.creatSpriteText(val, fontStyle);
      textObj[0].position.copy(position);
      textObj[0].position.setY(offset + textObj[0].position.y);
      this.textTempGroup.add(textObj[0]);
    }
  }, {
    key: "resetData",
    value: function resetData() {
      this.dispose();
      this.draw();
    }
  }, {
    key: "dispose",
    value: function dispose(group) {
      var _this3 = this;

      //删除所有事件
      group = group || this.group;
      group.traverse(function (obj) {
        if (obj.name && obj.name.includes(Area._area_prefix)) {
          obj.off('mousemove', _this3.__mousemove);
          obj.off("mouseout", _this3.__mouseout);
        }
      });

      _get(_getPrototypeOf(Area.prototype), "dispose", this).call(this, group);
    }
  }]);

  return Area;
}(GraphObject);

Area._area_prefix = 'polygon_area_';
global.registerComponent(Area, 'graphs', 'area', 3);

var Pie = /*#__PURE__*/function (_Component) {
  _inherits(Pie, _Component);

  var _super = _createSuper(Pie);

  function Pie(chart3d, opt) {
    var _this;

    _classCallCheck(this, Pie);

    _this = _super.call(this, chart3d.currCoord);
    _this.name = 'Pie';
    _this.type = "pie3d";
    _this._type = "pie";
    _this.field = null;
    _this.sort = null; //默认不排序，可以配置为asc,desc
    //groupField主要是给legend用的， 所有在legend中需要显示的分组数据，都用groupField
    //其他图也都统一， 不要改

    _this.groupField = null;
    _this.maxHeight = 0;
    _this.heightSort = null; //默认不排序，可以配置为asc,desc

    _this.offsetRadius = 5;
    _this.origin = {
      x: 0,
      y: 0,
      z: 0
    };
    _this.node = {
      shapeType: "sector",
      radius: null,
      //每个扇形单元的半径，也可以配置一个字段，就成了丁格尔玫瑰图
      innerRadius: 0,
      //扇形的内圆半径
      outRadius: null,
      //最大外围半径
      minRadius: 10,
      //outRadius - innerRadius ， 也就是radius的最小值
      moveDis: 30,
      //要预留moveDis位置来hover sector 的时候外扩
      height: 50,
      fillStyle: null,
      //this.root.getTheme(),
      focus: {
        enabled: true
      },
      select: {
        enabled: false,
        radius: 5,
        alpha: 0.7
      }
    };
    _this.label = {
      field: null,
      //默认获取field的值，但是可以单独设置
      enabled: false,
      format: null,
      offset: 10
    };
    _this.startAngle = -90;
    _this.allAngles = 360;
    _this.isInit = true;

    _this.init(opt);

    return _this;
  }

  _createClass(Pie, [{
    key: "init",
    value: function init(opt) {
      _.extend(true, this, opt); //计算一下图形的半径


      var attr = this._coordSystem.dataAttribute; //根据当前的boundbox,如果用户没有制定半径这里需要计算出来

      this._computerProps();

      attr.setOption(Object.assign({}, this)); //已经在坐标系中传入构造函数中这里可以不传

      attr.setDataFrame();
      this.textGroup = this._root.app.addGroup({
        name: 'pie_texts_gruop'
      });

      this._root.labelGroup.add(this.textGroup);
    }
  }, {
    key: "_computerProps",
    value: function _computerProps() {
      var _this$_coordSystem$ge = this._coordSystem.getSize(),
          x = _this$_coordSystem$ge.x,
          y = _this$_coordSystem$ge.y,
          z = _this$_coordSystem$ge.z; //根据配置情况重新修正 outRadius ，innerRadius ------------


      if (!this.node.outRadius) {
        var outRadius = Math.min(x, z) / 2;

        if (this.label.enabled) {
          //要预留moveDis位置来hover sector 的时候外扩
          outRadius -= this.node.moveDis;
        }
        this.node.outRadius = outRadius;
      }

      if (this.node.radius !== null && _.isNumber(this.node.radius)) {
        //如果用户有直接配置 radius，那么radius优先，用来计算
        this.node.radius = Math.max(this.node.radius, this.node.minRadius); //this.node.outRadius = this.node.innerRadius + this.node.radius;

        this.node.innerRadius = this.node.outRadius - this.node.radius;
      }

      if (this.node.outRadius - this.node.innerRadius < this.node.minRadius) {
        this.node.innerRadius = this.node.outRadius - this.node.minRadius;
      }

      if (this.node.innerRadius < 0) {
        this.node.innerRadius = 0;
      }

      if (!this.maxHeight) {
        this.maxHeight = y * 0.5;
      }
    }
  }, {
    key: "draw",
    value: function draw() {
      var _this2 = this;
      var app = this._root.app;
      var attr = this._coordSystem.dataAttribute;
      var heights = [];
      attr.calculateProps();
      this.data = attr.getLayoutData();
      this.dispose();
      this.dispose(this.textGroup);
      this.data.forEach(function (item, i) {
        if (!item.enabled) return; //文本格式化

        item.labelText = _this2._getLabelText(item);
        var material = new MeshPhongMaterial({
          color: item.color,
          transparent: true,
          opacity: 1.0,
          depthTest: true,
          depthWrite: true,
          side: DoubleSide,
          polygonOffset: true,
          polygonOffsetFactor: Math.sin(_Math.degToRad(item.midAngle)),
          polygonOffsetUnits: 1.5
        });
        heights.push(item.height);
        var sector = app.create3DPie(item.height, item.outRadius, item.innerRadius, item.startAngle, item.endAngle, material);
        sector.userData.midAngle = item.midAngle; //sector.renderOrder = renderOrder++;

        sector.name = Pie._pie_prefix + item.iNode;
        sector.userData.info = item; //如果设置了高度取相应的数据,需要给定一些间距,防止z-fighting,尤其室圆心位置

        if (item.heightField && item.innerRadius == 0) {
          var offset = _this2.data.length * _this2.offsetRadius / (2 * Math.PI);
          var x = offset * Math.cos(_Math.degToRad(item.midAngle));
          var z = offset * Math.sin(_Math.degToRad(item.midAngle));
          sector.position.set(x, 0, z);
        }

        _this2.group.add(sector);
      });
      this.adjustPosition(heights);

      if (this.label.enabled) {
        this._startWidgetLabel();
      }
      this.bindEvent();
    }
  }, {
    key: "bindEvent",
    value: function bindEvent() {
      var _this3 = this;

      var me = this;

      this.__mouseover = function (e) {
        //上下文中的this 是bar 对象
        this.userData.color = this.material.color.clone(); //高亮

        var tempColor = {};
        this.material.color.getHSL(tempColor);
        this.material.setValues({
          color: new Color$1().setHSL(tempColor.h, tempColor.s, tempColor.l + 0.05)
        });
        var _data = this.userData.info;

        me._root.fire({
          type: 'tipShow',
          event: e.event,
          data: {
            nodes: [_data]
          }
        });

        me.fire({
          type: 'sectorover',
          data: _data
        });
      };

      this.__mouseout = function (e) {
        this.material.setValues({
          color: this.userData.color
        });
        var _data = this.userData.info;

        me._root.fire({
          type: 'tipHide',
          event: e.event,
          data: {
            nodes: [_data]
          }
        });

        me.fire({
          type: 'sectorout',
          data: _data
        });
      };

      this.__mousemove = function (e) {
        var _data = this.userData.info;

        me._root.fire({
          type: 'tipMove',
          event: e.event,
          data: {
            nodes: [_data]
          }
        });

        me.fire({
          type: 'sectormove',
          data: _data
        });
      };

      this.__click = function (e) {
        var _data = this.userData.info;

        if (!this.userData.isChecked) {
          this.userData.isChecked = true; //移动位置

          var moveDis = _data.moveDis;
          var pos = this.position.clone();
          this.userData.orgPosition = pos;
          var x = moveDis * Math.cos(_Math.degToRad(this.userData.midAngle));
          var z = moveDis * Math.sin(_Math.degToRad(this.userData.midAngle));
          this.position.set(x, pos.y, z);
        } else {
          this.userData.isChecked = false;

          if (this.userData.orgPosition) {
            this.position.copy(this.userData.orgPosition);
          }
        }

        me.fire({
          type: 'sectorclick',
          data: _data
        });
      };

      this.group.traverse(function (sector) {
        if (sector.name && sector.name.includes(Pie._pie_prefix)) {
          sector.on('mouseover', _this3.__mouseover);
          sector.on('mouseout', _this3.__mouseout);
          sector.on('mousemove', _this3.__mousemove);
          sector.on('click', _this3.__click);
        }
      });
    }
  }, {
    key: "_getLabelText",
    value: function _getLabelText(itemData) {
      var str;

      if (this.label.enabled) {
        if (this.label.format) {
          if (_.isFunction(this.label.format)) {
            str = this.label.format(itemData.label, itemData);
          }
        } else {
          var _field = this.label.field || this.groupField;

          if (_field) {
            str = itemData.rowData[_field] + "：" + itemData.percentage + "%";
          } else {
            str = itemData.percentage + "%";
          }
        }
      }

      return str;
    }
  }, {
    key: "_startWidgetLabel",
    value: function _startWidgetLabel() {
      var me = this;
      var attr = this._coordSystem.dataAttribute;
      var data = attr.getLayoutData();
      var rMinPercentage = 0,
          lMinPercentage = 0,
          rMinY = 0,
          lMinY = 0;
      var quadrantsOrder = [];
      var quadrantInfo = [{
        indexs: [],
        count: 0
      }, {
        indexs: [],
        count: 0
      }, {
        indexs: [],
        count: 0
      }, {
        indexs: [],
        count: 0
      }]; //默认从top开始画

      var widgetInfo = {
        right: {
          startQuadrant: 4,
          endQuadrant: 1,
          clockwise: true,
          indexs: []
        },
        left: {
          startQuadrant: 3,
          endQuadrant: 2,
          clockwise: false,
          indexs: []
        }
      };

      for (var i = 0; i < data.length; i++) {
        var cur = data[i].quadrant;
        quadrantInfo[cur - 1].indexs.push(i);
        quadrantInfo[cur - 1].count++;
      } //1,3象限的绘制顺序需要反转


      if (quadrantInfo[0].count > 1) quadrantInfo[0].indexs.reverse();
      if (quadrantInfo[2].count > 1) quadrantInfo[2].indexs.reverse();

      if (quadrantInfo[0].count > quadrantInfo[3].count) {
        widgetInfo.right.startQuadrant = 1;
        widgetInfo.right.endQuadrant = 4;
        widgetInfo.right.clockwise = false;
      }

      if (quadrantInfo[1].count > quadrantInfo[2].count) {
        widgetInfo.left.startQuadrant = 2;
        widgetInfo.left.endQuadrant = 3;
        widgetInfo.left.clockwise = true;
      }

      widgetInfo.right.indexs = quadrantInfo[widgetInfo.right.startQuadrant - 1].indexs.concat(quadrantInfo[widgetInfo.right.endQuadrant - 1].indexs);
      widgetInfo.left.indexs = quadrantInfo[widgetInfo.left.startQuadrant - 1].indexs.concat(quadrantInfo[widgetInfo.left.endQuadrant - 1].indexs);
      var overflowIndexs, sortedIndexs;

      if (widgetInfo.right.indexs.length > me.textMaxCount) {
        sortedIndexs = widgetInfo.right.indexs.slice(0);
        sortedIndexs.sort(function (a, b) {
          return data[b].y - data[a].y;
        });
        overflowIndexs = sortedIndexs.slice(me.textMaxCount);
        rMinPercentage = data[overflowIndexs[0]].percentage;
        rMinY = data[overflowIndexs[0]].y;
      }

      if (widgetInfo.left.indexs.length > me.textMaxCount) {
        sortedIndexs = widgetInfo.left.indexs.slice(0);
        sortedIndexs.sort(function (a, b) {
          return data[b].y - data[a].y;
        });
        overflowIndexs = sortedIndexs.slice(me.textMaxCount);
        lMinPercentage = data[overflowIndexs[0]].percentage;
        lMinY = data[overflowIndexs[0]].y;
      }

      quadrantsOrder.push(widgetInfo.right.startQuadrant);
      quadrantsOrder.push(widgetInfo.right.endQuadrant);
      quadrantsOrder.push(widgetInfo.left.startQuadrant);
      quadrantsOrder.push(widgetInfo.left.endQuadrant);
      var ySpaceInfo = {};

      for (var i = 0; i < quadrantsOrder.length; i++) {
        var isEnd = i == 1 || i == 3;

        me._widgetLabel(quadrantsOrder[i], quadrantInfo[quadrantsOrder[i] - 1].indexs, lMinY, rMinY, isEnd, ySpaceInfo);
      }
    }
  }, {
    key: "_widgetLabel",
    value: function _widgetLabel(quadrant, indexs, lmin, rmin, isEnd, ySpaceInfo) {
      var _this4 = this;

      var me = this;
      var count = 0;
      var attr = this._coordSystem.dataAttribute;
      var data = attr.getLayoutData();
      var labels = [];
      var minTxtDis = 15;
      var textOffsetX = 5;
      var app = this._root.app;
      var currentIndex;
      var preY, currentY, adjustX, txtDis;
      var yBound, remainingNum, remainingY;
      var isleft = quadrant == 2 || quadrant == 3;
      var isup = quadrant == 3 || quadrant == 4;
      var minY = isleft ? lmin : rmin; //text的绘制顺序做修正，text的Y值在饼图上半部分（isup）时，Y值越小的先画，反之Y值在饼图下部分时，Y值越大的先画.

      if (indexs.length > 0) {
        indexs.sort(function (a, b) {
          return isup ? data[a].edgey - data[b].edgey : data[b].edgey - data[a].edgey;
        });
      }

      for (var i = 0; i < indexs.length; i++) {
        currentIndex = indexs[i];
        var itemData = data[currentIndex];
        var outCircleRadius = itemData.outRadius + itemData.moveDis; //若Y值小于最小值，不画text    

        if (!itemData.enabled || itemData.y < minY || count >= me.textMaxCount) continue;
        count++;
        currentY = itemData.edgey;
        adjustX = Math.abs(itemData.edgex);
        txtDis = currentY - preY;

        if (i != 0 && (Math.abs(txtDis) < minTxtDis || isup && txtDis < 0 || !isup && txtDis > 0)) {
          currentY = isup ? preY + minTxtDis : preY - minTxtDis;

          if (outCircleRadius - Math.abs(currentY) > 0) {
            adjustX = Math.sqrt(Math.pow(outCircleRadius, 2) - Math.pow(currentY, 2));
          }

          if (isleft && -adjustX > itemData.edgex || !isleft && adjustX < itemData.edgex) {
            adjustX = Math.abs(itemData.edgex);
          }
        }

        if (isEnd) {
          yBound = isleft ? ySpaceInfo.left : ySpaceInfo.right;
          remainingNum = indexs.length - i;
          remainingY = isup ? yBound - remainingNum * minTxtDis : yBound + remainingNum * minTxtDis;

          if (isup && currentY > remainingY || !isup && currentY < remainingY) {
            currentY = remainingY;
          }
        }

        preY = currentY;

        if (!isEnd) {
          if (isleft) {
            ySpaceInfo.left = preY;
          } else {
            ySpaceInfo.right = preY;
          }
        }
        var currentX = isleft ? -adjustX - textOffsetX : adjustX + textOffsetX;
        var globalX = currentX + me.origin.x;
        var globalY = currentY + me.origin.y; // if (globalX > me._graphs.root.width || globalY < 0 || globalY > me._graphs.root.height) {
        //     return;
        // };
        // var pathStr = "M" + itemData.centerx + "," + itemData.centery;
        // pathStr += "Q" + itemData.outx + "," + itemData.outy + "," + currentX + "," + currentY;

        var DIVISONS = 50;
        var linePoints = [new Vector3(itemData.centerx, 0, itemData.centery), new Vector3(itemData.outx, 0, itemData.outy), new Vector3(currentX, 0, currentY)];
        var curve = new CatmullRomCurve3(linePoints);
        var points = curve.getSpacedPoints(DIVISONS);
        var line = app.createBrokenLine(points, 2, itemData.color, true);
        this.group.add(line);
        var label = app.creatSpriteText(itemData.labelText, {
          fontSize: 14,
          fillStyle: itemData.color
        });
        label[0].userData.position = new Vector3(currentX, 0, currentY);
        label[0].userData.dir = new Vector3(itemData.outx, 0, itemData.outy).sub(new Vector3(itemData.centerx, 0, itemData.centery));
        label[0].userData.dir.normalize();
        labels.push(label[0]);
      }

      labels.forEach(function (label, index$$1) {
        label.userData.position = label.userData.position;
        label.matrixWorldNeedsUpdate = false;

        label.onBeforeRender = function (render, scene, camera) {
          //     //更新坐标后的位置
          var cross = me._coordSystem.getQuadrantByDir(this.userData.dir.clone());

          var pos = me._coordSystem.positionToScreen(this.userData.position.clone()); //     //屏幕的位置


          var textSize = this.userData.size;
          var halfwidth = textSize[0] * 0.5;
          var halfHeight = textSize[1] * 0.5; // let camearDir = new Vector3();
          // camera.getWorldDirection(camearDir);
          // let isSameDir = zDir.dot(camearDir);
          //right

          if (cross.y > 0) {
            // let flag = isSameDir < 0 ? 1 : -1;
            pos.setX(pos.x - halfwidth - me.label.offset); // this.position.copy(pos);
          } //left


          if (cross.y < 0) {
            // let flag = isSameDir < 0 ? -1 : 1;
            pos.setX(pos.x + halfwidth + me.label.offset); // this.position.copy(pos);
          } // if (me.verticalAlign == 'top') {
          //     pos.setY(pos.y - halfHeight);
          //     label.position.copy(pos);
          // }
          // if (me.verticalAlign == 'bottom') {
          //     pos.setY(pos.y + halfHeight);
          //     label.position.copy(pos);
          // }


          this.position.copy(pos);
          this.updateMatrixWorld(true);
        };

        _this4.textGroup.add(label);
      });
    }
  }, {
    key: "adjustPosition",
    value: function adjustPosition(heights) {
      //判断是否需要调整
      var isAdjust = _.uniq(heights).length > 1;
      if (!isAdjust) return;

      var maxHeight = _.max(heights);

      this.group.traverse(function (obj) {
        if (obj.isMesh && obj.geometry && (obj.geometry.type === "DoughnutBufferGeometry" || obj.geometry.type === "DoughnutGeometry")) {
          var offset = (maxHeight - obj.geometry.parameters.height) * 0.5;
          obj.position.setY(-offset);
        }
      });
    }
  }, {
    key: "dispose",
    value: function dispose(group) {
      var _this5 = this;

      group = group || this.group;
      group.traverse(function (sector) {
        if (sector.name && sector.name.includes(Pie._pie_prefix)) {
          sector.off('mouseover', _this5.__mouseover);
          sector.off('mouseout', _this5.__mouseout);
          sector.off('mousemove', _this5.__mousemove);
          sector.off('click', _this5.__click);
        }
      });

      _get(_getPrototypeOf(Pie.prototype), "dispose", this).call(this, group);
    }
  }, {
    key: "resetData",
    value: function resetData() {
      this.dispose();
      var attr = this._coordSystem.dataAttribute; //根据当前的boundbox,如果用户没有制定半径这里需要计算出来

      this._computerProps();

      attr.setOption(Object.assign({}, this)); //已经在坐标系中传入构造函数中这里可以不传

      attr.setDataFrame();
      this.draw();
    }
  }]);

  return Pie;
}(Component);

Pie._pie_prefix = "pie_one_";
global.registerComponent(Pie, 'graphs', 'pie', 3);

var Heatmap = /*#__PURE__*/function (_GraphObject) {
  _inherits(Heatmap, _GraphObject);

  var _super = _createSuper(Heatmap);

  function Heatmap(chart3d, opt) {
    var _this;

    _classCallCheck(this, Heatmap);

    _this = _super.call(this, chart3d);
    var _colorMap = {
      front: '#0A2A91',
      back: '#0A2A91',
      top: '#910044',
      right: '#007878'
    };
    _this.type = "heatmap";
    _this._type = "heatmap3d";
    _this.face = 'front'; //绘制在box的那个面上
    //颜色默认值

    _this.colorScheme = _colorMap[_this.face];
    _this.area = {
      //填充
      shapeType: "rect",
      enabled: 1,
      fillStyle: null,
      alpha: 1.0,
      highColor: 'yellow',
      defaultColor: '#F5F5F6'
    };
    _this.label = {
      enabled: 1,
      strokeStyle: '#333333',
      lineWidth: 2,
      fillStyle: '#FFFFFF',
      fontSize: 16
    };
    _this.gap = 1;

    _.extend(true, _assertThisInitialized(_this), opt);

    _this.name = "Heatmap_" + _this.face;
    _this._colors = [];

    _this.init();

    _this.setGroupName('heatmap_root_' + _this.face);

    return _this;
  }

  _createClass(Heatmap, [{
    key: "init",
    value: function init() {
      this.planeGroup = this._root.app.addGroup({
        name: 'plane_groups'
      });
      this.textGroup = this._root.app.addGroup({
        name: 'text_groups'
      });
      this.group.add(this.planeGroup);
      this.group.add(this.textGroup);

      var _this$_coordSystem$ge = this._coordSystem.getGraphAreaSize(),
          width = _this$_coordSystem$ge.width,
          height = _this$_coordSystem$ge.height,
          depth = _this$_coordSystem$ge.depth;

      if (this.face === FaceNames.BACK) {
        this.group.rotateY(_Math.degToRad(180));
        this.group.translateZ(depth);
        this.group.translateX(-width);
      }

      if (this.face === FaceNames.TOP) {
        this.group.rotateX(_Math.degToRad(-90));
        this.group.translateY(-height * 0.5 - depth * 0.5);
        this.group.translateZ(height * 0.5 - depth * 0.5);
      }

      if (this.face === FaceNames.BOTTOM) {
        this.group.rotateX(_Math.degToRad(90));
        this.group.translateZ(depth);
      }

      if (this.face === FaceNames.RIGHT) {
        this.group.rotateY(_Math.degToRad(90));
        this.group.translateX(-width * 0.5 - depth * 0.5);
        this.group.translateZ(width * 0.5 - depth * 0.5);
      }

      if (this.face === FaceNames.LEFT) {
        this.group.rotateY(_Math.degToRad(-90));
        this.group.translateX(width * 0.5 - height * 0.5);
        this.group.translateZ(depth * 0.5 + width * 0.5);
      }

      this._initData();
    }
  }, {
    key: "_initData",
    value: function _initData() {
      var _this2 = this;

      this.xAttr = this._coordSystem.xAxisAttribute;
      this.yAttr = this._coordSystem.yAxisAttribute;
      this.zAttr = this._coordSystem.zAxisAttribute;
      var xData = this.xAttr.dataSectionLayout;
      var yData = this.yAttr.dataSectionLayout;
      var zData = this.zAttr.dataSectionLayout;
      var data1 = [],
          data2 = [];
      var dataFrame$$1 = this._root.dataFrame;
      this.drawData = [];

      var origin = this._coordSystem.getOriginPosition(this.face.toLowerCase());

      if (this.face === FaceNames.FRONT) {
        data1 = xData.concat([]);
        data1.attr = this.xAttr;
        data2 = yData.concat([]);
        data2.attr = this.yAttr;
      }

      if (this.face === FaceNames.BACK) {
        data1 = xData.concat([]);
        data1.attr = this.xAttr;
        data2 = yData.concat([]);
        data2.attr = this.yAttr;
      }

      if (this.face === FaceNames.TOP) {
        data1 = xData.concat([]);
        data1.attr = this.xAttr;
        data2 = zData.concat([]);
        data2.attr = this.zAttr;
      }

      if (this.face === FaceNames.BOTTOM) {
        data1 = xData.concat([]);
        data1.attr = this.xAttr;
        data2 = zData.concat([]);
        data2.attr = this.zAttr;
      }

      if (this.face === FaceNames.RIGHT) {
        data1 = zData.concat([]);
        data1.attr = this.zAttr;
        data2 = yData.concat([]);
        data2.attr = this.yAttr;
      }

      if (this.face === FaceNames.LEFT) {
        data1 = zData.concat([]);
        data1.attr = this.zAttr;
        data2 = yData.concat([]);
        data2.attr = this.yAttr;
      }

      data1.forEach(function (xd, xi) {
        data2.forEach(function (yd, yi) {
          var _dataFrame$getRowData;

          var rowDatas = dataFrame$$1.getRowDataOf((_dataFrame$getRowData = {}, _defineProperty(_dataFrame$getRowData, data1.attr.field, xd.val), _defineProperty(_dataFrame$getRowData, data2.attr.field, yd.val), _dataFrame$getRowData));
          if (!rowDatas.length) return;
          var score = rowDatas[0][_this2.field];

          var _color = _this2.getColorByScore(score);

          _this2.drawData.push({
            value: score,
            color: _color,
            rowData: rowDatas[0],
            field: _this2.field,
            iNode: xi + yi,
            face: _this2.face,
            data: rowDatas[0],
            pos: new Vector3(xd.pos, yd.pos, 0).add(origin),
            width: data1.attr.getCellLength() - _this2.gap * 2,
            height: data2.attr.getCellLength() - _this2.gap * 2
          });
        });
      });
    }
  }, {
    key: "draw",
    value: function draw() {
      var _this3 = this;

      this.dispose();
      this.drawData.forEach(function (item, i) {
        var score = item.data[_this3.field] || 0.5;

        var materials = _this3.getMaterial(score);

        var planetGeometry = new PlaneGeometry(item.width, item.height);
        var plane = new Mesh(planetGeometry, materials);
        plane.userData.info = item;
        plane.name = Heatmap._heatmap_plane_prefix + _this3.face + '_' + i;
        plane.position.copy(item.pos);

        _this3.planeGroup.add(plane); //写文字


        if (item.data[_this3.field]) {
          var labels = _this3.createText(item.data[_this3.field], {
            fontSize: _this3.label.fontSize,
            fillStyle: _this3.label.fillStyle,
            strokeStyle: hexToRgba(_this3.label.strokeStyle, 0.1),
            lineWidth: _this3.label.lineWidth
          });

          var pos = item.pos.clone();
          labels[0].position.copy(pos);

          _this3.textGroup.add(labels[0]);
        }
      });
      this.bindEvent();
    }
  }, {
    key: "bindEvent",
    value: function bindEvent() {
      var _this4 = this;

      var me = this;

      var isTrigger = function isTrigger() {
        return me._coordSystem.getDirection() === me.face.toLowerCase();
      };

      this.__mouseover = function (e) {
        if (!isTrigger()) return; //let score = this.userData.info.data[me.field] || 1;

        this.material = me.getMaterial(me.colorScheme, 10, me.area.highColor);
        this.material.needsUpdate = true;

        me._root.fire({
          type: 'tipShow',
          event: e.event,
          data: this.userData.info
        });

        me.fire({
          type: 'planeover',
          data: this.userData.info
        });
      };

      this.__mouseout = function (e) {
        if (!isTrigger()) return;
        var score = this.userData.info.data[me.field];

        if (!this.userData.select) {
          this.material = me.getMaterial(score);
          this.material.needsUpdate = true;
        }

        me._root.fire({
          type: 'tipHide',
          event: e.event,
          data: this.userData.info
        });

        me.fire({
          type: 'planeout',
          data: this.userData.info
        });
      };

      this.__mousemove = function (e) {
        if (!isTrigger()) return;

        me._root.fire({
          type: 'tipMove',
          event: e.event,
          data: this.userData.info
        });

        me.fire({
          type: 'planemove',
          data: this.userData.info
        });
      };

      this.__click = function (e) {
        if (!isTrigger()) return;
        me.cancelSelect();

        if (!e.target.userData.select) {
          this.material = me.getMaterial(10, me.area.highColor);
          this.material.needsUpdate = true;
          e.target.userData.select = true;
        }

        me._coordSystem.fire({
          type: 'planeclick',
          data: this.userData.info
        });
      };

      this.group.traverse(function (obj) {
        if (obj.name && obj.name.includes(Heatmap._heatmap_plane_prefix + _this4.face)) {
          obj.on('mouseover', _this4.__mouseover);
          obj.on('mouseout', _this4.__mouseout);
          obj.on('mousemove', _this4.__mousemove);
          obj.on('click', _this4.__click);
        }
      });
    }
  }, {
    key: "getMaterial",
    value: function getMaterial(score, highColor) {
      this.materialMap = this.materialMap || {};
      var key = this.face + "_" + (highColor ? "999" : score);

      if (this.materialMap[key]) {
        return this.materialMap[key];
      }

      var _color = this.getColorByScore(score);

      this.materialMap[key] = new MeshBasicMaterial$$1({
        color: highColor ? highColor : _color || 0xffffff,
        side: FrontSide,
        transparent: true,
        opacity: 1.0,
        //_.isFunction(colorScheme) ? 1.0 : score * 0.1,
        depthTest: true,
        depthWrite: false
      });
      return this.materialMap[key];
    }
  }, {
    key: "createText",
    value: function createText(texts, fontStyle) {
      var labels = []; // console.log(JSON.stringify(fontStyle));

      var renderFont = new RenderFont(fontStyle);

      if (!_.isArray(texts)) {
        texts = [texts];
      }

      var labelInfos = renderFont.drawTexts(texts);
      var position = new Float32Array([-0.5, -0.5, 0, 0.5, -0.5, 0, 0.5, 0.5, 0, -0.5, 0.5, 0]);
      var texture = new Texture();
      texture.image = renderFont.canvas;
      texture.wrapS = RepeatWrapping;
      texture.wrapT = RepeatWrapping;
      texture.minFilter = LinearFilter;
      texture.magFilter = LinearFilter;
      texture.anisotropy = 1;
      texture.needsUpdate = true;
      var textMatrial = new MeshBasicMaterial$$1({
        color: '#FFFFFF',
        //fontStyle.fillStyle,
        map: texture,
        transparent: true,
        // polygonOffset: true,
        // polygonOffsetFactor: 1,
        // polygonOffsetUnits: 0.5,
        depthWrite: false
      });
      var geometry = new BufferGeometry();
      geometry.setIndex([0, 1, 2, 0, 2, 3]);
      geometry.addAttribute('position', new Float32BufferAttribute(position, 3, false));
      texts.forEach(function (text, index$$1) {
        geometry.addAttribute('uv', new Float32BufferAttribute(labelInfos.UVs[text], 2, false));
        var realSize = labelInfos.sizes[text]; //realSize==[width,height]

        var scale = new Vector3(realSize[0] / realSize[1], 1, 1);
        scale.multiplyScalar(realSize[1]);
        var txtObj = new Mesh(geometry, textMatrial);
        txtObj.name = "mesh_text_" + text + "_" + index$$1;
        txtObj.scale.copy(scale);
        txtObj.userData = {
          text: text,
          size: realSize,
          maxWidth: labelInfos.maxWidth,
          maxHeight: labelInfos.maxHeight
        }; //默认不进行裁剪

        txtObj.frustumCulled = false;
        labels.push(txtObj);
      });
      return labels;
    }
  }, {
    key: "cancelSelect",
    value: function cancelSelect() {
      var _this5 = this;

      this.group.traverse(function (obj) {
        if (obj.name && obj.name.includes(Heatmap._heatmap_plane_prefix + _this5.face)) {
          var score = obj.userData.info.data[_this5.field] || 1;

          if (obj.userData.select !== false) {
            obj.userData.select = false;
            obj.material = _this5.getMaterial(score);
            obj.material.needsUpdate = true;
          }
        }
      });
    }
  }, {
    key: "getColorByScore",
    value: function getColorByScore(score) {
      //如果用户指定了颜色值,计算色系
      if (this._colors.length == 0 && _.isString(this.colorScheme)) {
        this._colors = getHSVShemes(this.colorScheme) || [];

        this._colors.reverse(); // console.log(this.face, this._colors);

      }

      if (_.isFunction(this.colorScheme)) {
        return this.colorScheme.call(this, score);
      } else {
        return this._colors[score - 1] || this.area.defaultColor;
      }
    }
  }, {
    key: "dispose",
    value: function dispose(group) {
      var _this6 = this;

      //删除所有事件
      group = group || this.group;
      group.traverse(function (obj) {
        if (obj.name && obj.name.includes(Heatmap._heatmap_plane_prefix + _this6.face)) {
          obj.off('mouseover', _this6.__mouseover);
          obj.off('mouseout', _this6.__mouseout);
          obj.off('mousemove', _this6.__mousemove);
          obj.off('click', _this6.__click);
        }
      });
      var highMaterial = this.getMaterial(10, this.area.highColor);
      highMaterial.dispose(); //this.materialMap = null;

      _get(_getPrototypeOf(Heatmap.prototype), "dispose", this).call(this, group);
    }
  }, {
    key: "resetData",
    value: function resetData() {
      this._initData();

      this.materialMap = {};
      this.dispose();
      this.draw();
    }
  }]);

  return Heatmap;
}(GraphObject);

Heatmap._heatmap_plane_prefix = 'heatmap_one_plane_';
global.registerComponent(Heatmap, 'graphs', 'heatmap', 3);

var Tips = /*#__PURE__*/function (_Component) {
  _inherits(Tips, _Component);

  var _super = _createSuper(Tips);

  function Tips(chart3d, opt) {
    var _this;

    _classCallCheck(this, Tips);

    _this = _super.call(this, chart3d.currCoord);
    _this.name = 'Tips';
    _this.type = 'tips3d';
    _this.tipDomContainer = chart3d.domView;
    _this.cW = chart3d.width; //容器的width

    _this.cH = chart3d.height; //容器的height

    _this.dW = 0; //html的tips内容width

    _this.dH = 0; //html的tips内容Height

    _this.borderRadius = "5px"; //背景框的 圆角 

    _this.sprite = null;
    _this.content = null; //tips的详细内容

    _this.fillStyle = "rgba(255,255,255,0.95)"; //"#000000";

    _this.fontColor = "#999";
    _this.strokeStyle = "#ccc";
    _this.position = "right"; //在鼠标的左（右）边

    _this._tipDom = null;
    _this.offsetX = 10; //tips内容到鼠标位置的偏移量x

    _this.offsetY = 10; //tips内容到鼠标位置的偏移量y
    //所有调用tip的 event 上面 要附带有符合下面结构的eventInfo属性
    //会deepExtend到this.indo上面来

    _this.eventInfo = null;
    _this.positionInRange = true; //false; //tip的浮层是否限定在画布区域

    _this.enabled = true; //tips是默认显示的

    _this.pointer = 'line'; //tips的指针,默认为直线，可选为：'line' | 'region'(柱状图中一般用region)

    _this.pointerAnim = true;
    _this._tipsPointer = null;

    _.extend(true, _assertThisInitialized(_this), opt); // this.sprite = new Canvax.Display.Sprite({
    //     id: "TipSprite"
    // });
    // var self = this;


    _this.group.on("removed", function () {
      _this._removeContent();

      _this._tipDom = null;
    }); //console.log('tips component loaded!');


    return _this;
  }

  _createClass(Tips, [{
    key: "show",
    value: function show(e) {
      if (!this.enabled) return;

      if (e.eventInfo) {
        this.eventInfo = e.eventInfo; // var stage = e.target.getStage();
        // this.cW = stage.context.width;
        // this.cH = stage.context.height;

        var content = this._setContent(e);

        if (content) {
          this._setPosition(e); //this.sprite.toFront();
          //比如散点图，没有hover到点的时候，也要显示，所有放到最下面
          //反之，如果只有hover到点的时候才显示point，那么就放这里
          //this._tipsPointerShow(e);

        } else {
          this.hide();
        }
      }
    }
  }, {
    key: "move",
    value: function move(e) {
      if (!this.enabled) return;

      if (e.eventInfo) {
        this.eventInfo = e.eventInfo;

        var content = this._setContent(e);

        if (content) {
          this._setPosition(e); //比如散点图，没有hover到点的时候，也要显示，所有放到最下面
          //反之，如果只有hover到点的时候才显示point，那么就放这里
          //this._tipsPointerMove(e)

        } else {
          //move的时候hide的只有dialogTips, pointer不想要隐藏
          //this.hide();
          this._hideDialogTips();
        }
      }

      this._tipsPointerMove(e);
    }
  }, {
    key: "hide",
    value: function hide() {
      if (!this.enabled) return;

      this._hideDialogTips(); //this._tipsPointerHide()

    }
  }, {
    key: "_hideDialogTips",
    value: function _hideDialogTips() {
      if (this.eventInfo) {
        this.eventInfo = null; //this.sprite.removeAllChildren();

        this._removeContent();
      }
    }
    /**
     *@pos {x:0,y:0}
     */

  }, {
    key: "_setPosition",
    value: function _setPosition(e) {
      if (!this.enabled) return;
      if (!this._tipDom) return;
      var pos = e.pos; // || e.target.localToGlobal(e.point);

      var x = this._checkX(pos.x + this.offsetX);

      var y = this._checkY(pos.y + this.offsetY);

      this._tipDom.style.cssText += ";visibility:visible;left:" + x + "px;top:" + y + "px;-webkit-touch-callout: none; -webkit-user-select: none; -khtml-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none;";

      if (this.position == "left") {
        this._tipDom.style.left = this._checkX(pos.x - this.offsetX - this._tipDom.offsetWidth) + "px";
      }
    }
    /**
     *content相关-------------------------
     */

  }, {
    key: "_creatTipDom",
    value: function _creatTipDom(e) {
      var me = this;
      me._tipDom = document.createElement("div");
      me._tipDom.className = "chart-tips";
      me._tipDom.style.cssText += "；-moz-border-radius:" + me.borderRadius + "; -webkit-border-radius:" + me.borderRadius + "; border-radius:" + me.borderRadius + ";background:" + me.fillStyle + ";border:1px solid " + me.strokeStyle + ";visibility:hidden;position:absolute;enabled:inline-block;*enabled:inline;*zoom:1;padding:6px;color:" + me.fontColor + ";line-height:1.5";
      me._tipDom.style.cssText += "; -moz-box-shadow:1px 1px 3px " + me.strokeStyle + "; -webkit-box-shadow:1px 1px 3px " + me.strokeStyle + "; box-shadow:1px 1px 3px " + me.strokeStyle + ";";
      me._tipDom.style.cssText += "; border:none;white-space:nowrap;word-wrap:normal;";
      me._tipDom.style.cssText += "; text-align:left;";
      me.tipDomContainer.appendChild(this._tipDom);
    }
  }, {
    key: "_removeContent",
    value: function _removeContent() {
      if (!this._tipDom) return;
      this.tipDomContainer.removeChild(this._tipDom);
      this._tipDom = null;
    }
  }, {
    key: "_setContent",
    value: function _setContent(e) {
      var tipxContent = this._getContent(e);

      if (!tipxContent && tipxContent !== 0) {
        return;
      }

      if (!this._tipDom) {
        this._creatTipDom(e);
      }
      this._tipDom.innerHTML = tipxContent;
      this.dW = this._tipDom.offsetWidth;
      this.dH = this._tipDom.offsetHeight;
      return tipxContent;
    }
  }, {
    key: "_getContent",
    value: function _getContent(e) {
      var tipsContent;

      if (this.content) {
        tipsContent = _.isFunction(this.content) ? this.content(e.eventInfo) : this.content;
      } else {
        tipsContent = this._getDefaultContent(e.eventInfo);
      }
      return tipsContent;
    }
  }, {
    key: "_getDefaultContent",
    value: function _getDefaultContent(info) {
      var str = "";

      if (info.title !== undefined && info.title !== null && info.title !== "") {
        str += "<div style='font-size:14px;border-bottom:1px solid #f0f0f0;padding:4px;margin-bottom:6px;'>" + info.title + "</div>";
      }
      var style = info.color || info.fillStyle || info.strokeStyle; // var value = typeof (info.value) == "object" ? JSON.stringify(node.value) : numAddSymbol(node.value);

      str += "<div style='line-height:1.5;font-size:12px;padding:0 4px;'>";

      if (style) {
        str += "<div style='background:" + style + ";margin-right:8px;margin-top:5px;width:8px;height:8px;border-radius:4px;overflow:hidden;font-size:0;'></div>";
      }

      _.each(info.rowData, function (value, key) {
        if (key !== info.field) return;
        str += '<div><span style="margin-right:5px">- ' + key + ':</span><span>' + value + '</span></div>';
      });

      str += "</div>";

      _.each(info.nodes, function (node, i) {
        //value 是null 或者 undefined
        if (!node.value && node.value !== 0) {
          return;
        }

        if (style) {
          str += "<span style='background:" + style + ";margin-right:8px;margin-top:5px;float:left;width:8px;height:8px;border-radius:4px;overflow:hidden;font-size:0;'></span>";
        }
        str += node.value + "</div>";
      });

      return str;
    }
    /**
     *获取back要显示的x
     *并且校验是否超出了界限
     */

  }, {
    key: "_checkX",
    value: function _checkX(x) {
      if (this.positionInRange) {
        var w = this.dW + 2; //后面的2 是 两边的 linewidth

        if (x < 0) {
          x = 0;
        }

        if (x + w > this.cW) {
          x = this.cW - w;
        }
      }

      return x;
    }
    /**
     *获取back要显示的x
     *并且校验是否超出了界限
     */

  }, {
    key: "_checkY",
    value: function _checkY(y) {
      if (this.positionInRange) {
        var h = this.dH + 2; //后面的2 是 两边的 linewidth

        if (y < 0) {
          y = 0;
        }

        if (y + h > this.cH) {
          y = this.cH - h;
        }
      }

      return y;
    }
  }, {
    key: "_tipsPointerShow",
    value: function _tipsPointerShow(e) {}
  }, {
    key: "_tipsPointerHide",
    value: function _tipsPointerHide() {
      var _coord = this.root._coord; //目前只实现了直角坐标系的tipsPointer

      if (!_coord || _coord.type != 'rect') return;
      if (!this.pointer || !this._tipsPointer) return; //console.log("hide");

      this._tipsPointer.destroy();

      this._tipsPointer = null;
    }
  }, {
    key: "_tipsPointerMove",
    value: function _tipsPointerMove(e) {}
  }]);

  return Tips;
}(Component);

global.registerComponent(Tips, 'tips', 3);

var MarkPoint = /*#__PURE__*/function (_Component) {
  _inherits(MarkPoint, _Component);

  var _super = _createSuper(MarkPoint);

  function MarkPoint(chart3d, opt) {
    var _this;

    _classCallCheck(this, MarkPoint);

    _this = _super.call(this, chart3d.currCoord);
    _this.opt = opt;
    _this.name = 'MarkPoint';
    _this.type = "markline";
    _this.markTo = null;
    _this.active = 'max'; //max,min

    _this.position = null; //点的位置,如果是一个二维数组绘制多个点

    _this.data = null;
    _this.label = {
      fontSize: 50,
      fillStyle: 'red',
      strokeStyle: "#eee",
      lineWidth: 2,
      isBold: true,
      offset: 50
    };
    _this.icon = {};

    _.extend(true, _assertThisInitialized(_this), opt);

    _this.init();

    return _this;
  }

  _createClass(MarkPoint, [{
    key: "init",
    value: function init() {
      var _this2 = this;

      if (this.markTo) {
        var zField = this._coordSystem.isExistZAxisField();

        var zSection = this._coordSystem.zAxisAttribute.getNativeDataSection();

        var zCusSection = this._coordSystem.zAxisAttribute.getDataSection();

        if (zField) {
          this.data = [];
          zSection.forEach(function (val, i) {
            var _groups = _this2._root.dataFrame.getRowDataOf(_defineProperty({}, zField, val));

            var arr = [];

            _groups.forEach(function (item) {
              arr.push(item[_this2.markTo]);
            });

            arr.zField = val;

            if (zCusSection[i]) {
              arr.zCusSection = zCusSection[i];
            }

            _this2.data.push(arr);
          });
        } else {
          this.data = this._coordSystem.getAxisDataFrame(this.markTo);
        }
      }

      this._coordSystem.group.add(this.group);
    }
  }, {
    key: "draw",
    value: function draw() {
      var _this3 = this;

      var app = this._root.app;
      var infos = []; //1、如果指定了position是具体的数组,就按照给定的值来绘制
      //2、如果指定了position是函数,就根据函数来计算
      //3、如果只制定了markTo,默认返回所有点,active是预设的一些方法,默认是最大最小值

      var drawPoints = [];

      if (this.position) {
        if (_.isFunction(this.position)) {
          drawPoints = this.position.call(this, this.data);
        }

        if (_.isArray(this.position)) {
          drawPoints = drawPoints.concat(this.position);
        }
      } else {
        if (this.active === 'max') {
          infos = this._getMaxValuePos();
        } else if (this.active === 'min') {
          infos = this._getMinValuePos();
        }
      }

      infos.forEach(function (item) {
        var fontStyle = _this3._getFontStyle(item.zValue);

        var textObj = app.creatSpriteText(item.val, fontStyle);
        textObj[0].position.fromArray(item.pos);
        textObj[0].position.setY(fontStyle.offset + textObj[0].position.y);

        _this3.group.add(textObj[0]);
      });
    }
  }, {
    key: "_getMaxValuePos",
    value: function _getMaxValuePos() {
      var _this4 = this;

      var pos = [],
          arr,
          val;

      if (!this.data) {
        console.error('markpoint组件中请指定markTo字段');
      } else {
        if (_.isArray(this.data[0])) {
          this.data.forEach(function (dt) {
            arr = _.flatten(dt);
            val = Math.max.apply(null, arr);
            pos.push(_this4._getValPos(val, dt));
          });
          return pos;
        } else {
          arr = _.flatten(this.data);
          val = Math.max.apply(null, arr);
          pos.push(this._getValPos(val));
          return pos;
        }
      }

      return [[0, 0, 0]];
    }
  }, {
    key: "_getMinValuePos",
    value: function _getMinValuePos() {
      var _this5 = this;

      var pos = [],
          arr,
          val;

      if (!this.data) {
        console.error('markpoint组件中请指定markTo字段');
      } else {
        if (_.isArray(this.data[0])) {
          this.data.forEach(function (dt) {
            arr = _.flatten(dt);
            val = Math.min.apply(null, arr);
            pos.push(_this5._getValPos(val, dt));
          });
          return pos;
        } else {
          arr = _.flatten(this.data);
          val = Math.min.apply(null, arr);
          pos.push(this._getValPos(val));
          return pos;
        }
      }

      return [[0, 0, 0]];
    }
  }, {
    key: "_getValPos",
    value: function _getValPos(val, dt) {
      var rootOpt = this._root.opt;
      var x, y, z;

      var zField = this._coordSystem.isExistZAxisField(); //大数据获取XYZ


      var searchOpt = _defineProperty({}, this.markTo, val);

      if (dt && zField) {
        searchOpt[zField] = dt.zField;
      }

      var rowData = this._root.dataFrame.getRowDataOf(searchOpt);

      var attr = this._getYAttribute();

      y = this._coordSystem.getYAxisPosition(val, attr);
      x = this._coordSystem.getXAxisPosition(rowData[0][rootOpt.coord.xAxis.field]);

      if (rootOpt.coord.zAxis && rootOpt.coord.zAxis.field) {
        z = this._coordSystem.getZAxisPosition(dt.zCusSection);
      } else {
        z = this._coordSystem.getZAxisPosition(this.markTo);
      }

      return {
        val: val,
        pos: [x, y, -z],
        zValue: dt.zCusSection || this.markTo
      };
    }
  }, {
    key: "_getYAttribute",
    value: function _getYAttribute() {
      var _this6 = this;

      var axisName = DEFAULT_AXIS;

      this._root.opt.graphs.forEach(function (item) {
        if (_.isArray(item.field)) {
          var _fields = _.flatten(_this6.field);

          var idx = _.indexOf(_fields, _this6.markTo);

          if (idx !== -1) {
            axisName = item.yAxisName;
          }
        }
      });

      return this._coordSystem.getYAxis(axisName).attr;
    }
  }, {
    key: "_getFontStyle",
    value: function _getFontStyle(field) {
      var _color;

      if (this.opt.label && this.opt.label.fillStyle) {
        return this.label;
      } else {
        _color = this._coordSystem.fieldMap[field].color;
      }

      return _.extend({}, this.label, {
        fillStyle: _color
      });
    }
  }]);

  return MarkPoint;
}(Component);

global.registerComponent(MarkPoint, 'markpoint', 3);

var __legend_clickEvent = null;

var Legend = /*#__PURE__*/function (_Component) {
  _inherits(Legend, _Component);

  var _super = _createSuper(Legend);

  function Legend(chart3d, opt) {
    var _this;

    _classCallCheck(this, Legend);

    _this = _super.call(this, chart3d.currCoord);
    _this.name = "Legend";
    _this.type = "legend3d";
    _this.mode = 'checkbox'; //checkbox  radio

    _this.opt = opt;
    /* data的数据结构为
    [
        //descartes中用到的时候还会带入yAxis
        {name: "uv", color: "#ff8533", field: '' ...如果手动传入数据只需要前面这三个 enabled: true, ind: 0, } //外部只需要传field和fillStyle就行了 activate是内部状态
    ]
    */

    _this.data = null; //一般来讲，比如柱状图折线图等，是按照传入的field来分组来设置图例的，那么legend.field都是null
    //但是还有一种情况就是，是按照同一个field中的数据去重后来分组的，比如散点图中sex属性的男女两个分组作为图例，
    //以及pie饼图中的每个数据的name字段都是作为一个图例
    //那么就想要给legend主动设置一个field字段，然后legend自己从dataFrame中拿到这个field的数据来去重，然后分组做为图例
    //这是一个很屌的设计

    _this.field = null;
    _this.margin = {
      top: 10,
      right: 10,
      bottom: 10,
      left: 10
    };
    _this.icon = {
      height: 22,
      width: "auto",
      shapeType: "circle",
      radius: 5,
      lineWidth: 1,
      fillStyle: "#999",
      onChecked: function onChecked() {},
      onUnChecked: function onUnChecked() {}
    };
    _this.label = {
      textAlign: "left",
      textBaseline: "middle",
      fillStyle: "#333",
      //obj.color
      cursor: "pointer",
      fontSize: 14,
      format: function format(name, info) {
        return name;
      }
    }; //this.onChecked=function(){};
    //this.onUnChecked=function(){};

    _this._labelColor = "#999"; // this.position = "right"; //图例所在的方向top,right,bottom,left

    _this.direction = "h"; //横向 top,bottom --> h left,right -- >v

    _this.position = DUCK.TOPLEFT; //left top  bottom right  center  topLeft  topRight bottomLeft  bottomRight

    _this.offsetX = 0;
    _this.offsetY = 0;

    _.extend(true, _assertThisInitialized(_this), {
      icon: {
        onChecked: function onChecked(obj) {},
        onUnChecked: function onUnChecked(obj) {}
      }
    }, opt);

    _this.isInit = true;
    return _this;
  }

  _createClass(Legend, [{
    key: "_getLegendData",
    value: function _getLegendData(opt) {
      var legendData = opt.data;

      if (legendData) {
        _.each(legendData, function (item, i) {
          item.enabled = 'enabled' in item ? item.enabled : true;
          item.ind = i;
        });

        delete opt.data;
      } else {
        legendData = this._coordSystem.getLegendData();
      }
      return legendData || [];
    }
  }, {
    key: "layout",
    value: function layout() {
      var currCoord = this._coordSystem; // if (this.direction == "h") {
      //     app.padding[this.position] += (this.height + this.margin.top + this.margin.bottom);
      // } else {
      //     app.padding[this.position] += (this.width + this.margin.left + this.margin.right);
      // };
      //default lefttop

      var pos = {
        x: currCoord.padding.left + this.margin.left,
        y: currCoord.padding.top + this.margin.top
      };

      switch (this.position && this.position.toLocaleLowerCase()) {
        case DUCK.TOPRIGHT.toLocaleLowerCase():
          pos.x = currCoord.width - this.width - currCoord.padding.right - this.margin.right;
          pos.y = currCoord.padding.top + this.margin.top;
          break;

        case DUCK.BOTTOMLEFT.toLocaleLowerCase():
          pos.x = currCoord.padding.left + this.margin.left;
          pos.y = currCoord.height - currCoord.padding.bottom - this.margin.bottom - this.height;
          break;

        case DUCK.BOTTOMRIGHT.toLocaleLowerCase():
          pos.x = currCoord.width - this.width - currCoord.padding.right - this.margin.right;
          pos.y = currCoord.height - currCoord.padding.bottom - this.margin.bottom - this.height;
          break;

        case DUCK.LEFT.toLocaleLowerCase():
          pos.x = currCoord.padding.left + this.margin.left;
          pos.y = (currCoord.height - currCoord.padding.bottom - this.margin.bottom - this.height) * 0.5;
          break;

        case DUCK.RIGHT.toLocaleLowerCase():
          pos.x = currCoord.width - this.width - currCoord.padding.right - this.margin.right;
          pos.y = (currCoord.height - currCoord.padding.bottom - this.margin.bottom - this.height) * 0.5;
          break;

        case DUCK.TOP.toLocaleLowerCase():
          pos.x = (currCoord.width - this.width - currCoord.padding.right - this.margin.right) * 0.5;
          pos.y = currCoord.padding.top + this.margin.top;
          break;

        case DUCK.BOTTOM.toLocaleLowerCase():
          pos.x = (currCoord.width - this.width - currCoord.padding.right - this.margin.right) * 0.5;
          pos.y = currCoord.height - currCoord.padding.bottom - this.margin.bottom - this.height;
          break;

        case DUCK.CENTER.toLocaleLowerCase():
          pos.x = (currCoord.width - this.width - currCoord.padding.right - this.margin.right) * 0.5;
          pos.y = (currCoord.height - currCoord.padding.bottom - this.margin.bottom - this.height) * 0.5;
      }

      pos.x += this.offsetX;
      pos.y += this.offsetY;
      this.pos = pos;
    }
  }, {
    key: "draw",
    value: function draw() {
      this.widget();
      this.layout();
      this.group.position.set(this.pos.x, this.pos.y, 0);
    }
  }, {
    key: "widget",
    value: function widget() {
      var me = this;
      var app = this._root.app;
      var currCoord = this._coordSystem;

      if (this.isInit) {
        this.isInit = false;
        this.data = this._getLegendData(this.opt);
      }

      var viewWidth = currCoord.width - currCoord.padding.left - currCoord.padding.right - this.margin.left - this.margin.right;
      var viewHeight = currCoord.height - currCoord.padding.top - currCoord.padding.bottom - this.margin.top - this.margin.bottom;
      this.dispose();
      var maxItemWidth = 0;
      var width = 0,
          height = 0;
      var x = 0,
          y = 0;
      var rows = 1;
      var isOver = false; //如果legend过多

      __legend_clickEvent = this._getInfoHandler.bind(this);

      _.each(this.data, function (obj, i) {
        if (isOver) return;

        var _icon = app.createCirclePlane(me.icon.radius, {
          fillStyle: !obj.enabled ? "#ccc" : obj.color || me._labelColor
        });

        _icon.name = Legend._legend_prefix + "icon_" + i;

        _icon.position.set(me.icon.radius, me.icon.height / 3, 0);

        _icon.on("click", __legend_clickEvent);

        var txtArr = app.creatSpriteText(me.label.format(obj.name || obj.label, obj), {
          fillStyle: me.label.fillStyle,
          fontSize: me.label.fontSize,
          textAlign: me.label.textAlign,
          textBaseline: me.label.textBaseline
        });
        var txt = txtArr[0];
        txt.name = Legend._legend_prefix + "txt_" + i;
        txt.on("click", __legend_clickEvent);
        var txtW = txt.userData.size && txt.userData.size[0];
        var itemW = txtW + me.icon.radius * 3 + 20;
        txt.position.set(me.icon.radius * 3 + txtW * 0.5, me.icon.height / 3, 0);
        maxItemWidth = Math.max(maxItemWidth, itemW);
        var spItemC = {
          height: me.icon.height
        };

        if (me.direction == "v") {
          if (y + me.icon.height > viewHeight) {
            if (x > viewWidth) {
              isOver = true;
              return;
            }
            x += maxItemWidth;
            y = 0;
          }
          spItemC.x = x;
          spItemC.y = y;
          y += me.icon.height;
          height = Math.max(height, y);
        } else {
          //横向排布
          if (x + itemW > viewWidth) {
            if (me.icon.height * (rows + 1) > viewHeight) {
              isOver = true;
              return;
            }

            x = 0;
            rows++;
          }
          spItemC.x = x;
          spItemC.y = me.icon.height * (rows - 1);
          x += itemW;
          width = Math.max(width, x);
        }
        //     id: "legend_field_" + i,
        //     context: spItemC
        // });

        var _group = app.addGroup({
          name: Legend._legend_prefix + i
        });

        _group.position.set(spItemC.x, spItemC.y, 0);

        _group.userData.info = obj;

        _group.add(_icon);

        _group.add(txt);

        me.group.add(_group); // sprite.context.width = itemW;
        // me.sprite.addChild(sprite);
        // sprite.on("click", function (e) {
        //     //只有一个field的时候，不支持取消
        //     if (_.filter(me.data, function (obj) { return obj.enabled }).length == 1) {
        //         if (obj.enabled) {
        //             return;
        //         }
        //     };
        //     obj.enabled = !obj.enabled;
        //     _icon.context.fillStyle = !obj.enabled ? "#ccc" : (obj.color || me._labelColor);

        if (obj.enabled) {
          me.icon.onChecked(obj);
        } else {
          me.icon.onUnChecked(obj);
        } // });

      });

      if (this.direction == "h") {
        me.width = width;
        me.height = me.icon.height * rows;
      } else {
        me.width = x + maxItemWidth;
        me.height = height;
      }

      this._root.labelGroup.add(this.group); //me.width = me.sprite.context.width  = width;
      //me.height = me.sprite.context.height = height;

    }
  }, {
    key: "_getInfoHandler",
    value: function _getInfoHandler(e) {
      var info = e.target.parent.userData.info;

      if (this.mode === 'radio') {
        _.each(this.data, function (item) {
          if (item.ind !== info.ind) {
            item.enabled = false;
          } else {
            item.enabled = true;
          }
        });
      }

      if (this.mode === 'checkbox') {
        info.enabled = !info.enabled;
      }

      if (info) {
        // this._root.fire({ type: 'redraw', data: info });
        this._root.fire({
          type: 'legendchange',
          data: info
        });
      }
    }
  }, {
    key: "dispose",
    value: function dispose(group) {
      group = group || this.group;
      this.group.traverse(function (obj) {
        if (obj.name.indexOf(Legend._legend_prefix) !== -1) {
          obj.off('click', __legend_clickEvent);
        }
      });

      _get(_getPrototypeOf(Legend.prototype), "dispose", this).call(this, group);
    }
  }]);

  return Legend;
}(Component);

Legend._legend_prefix = "legend_field_";
global.registerComponent(Legend, 'legend', 3);

var Theme = /*#__PURE__*/function (_Component) {
  _inherits(Theme, _Component);

  var _super = _createSuper(Theme);

  function Theme(chart3d, theme) {
    var _this;

    _classCallCheck(this, Theme);

    _this = _super.call(this, chart3d.currCoord, chart3d);
    _this.name = "Theme";
    _this.colors = theme || [];
    return _this;
  }

  _createClass(Theme, [{
    key: "set",
    value: function set(colors) {
      this.colors = colors;
      return this.colors;
    }
  }, {
    key: "get",
    value: function get(ind) {
      var colors = this.colors;

      if (!_.isArray(colors)) {
        colors = [colors];
      }
      return colors;
    }
  }, {
    key: "mergeTo",
    value: function mergeTo(colors) {
      if (!colors) {
        colors = [];
      }

      for (var i = 0, l = this.colors.length; i < l; i++) {
        if (colors[i]) {
          colors[i] = this.colors[i];
        } else {
          colors.push(this.colors[i]);
        }
      }
      return colors;
    }
  }]);

  return Theme;
}(Component);

global.registerComponent(Theme, 'theme', 3);

//如果数据库中有项目皮肤

var projectTheme = []; //从数据库中查询出来设计师设置的项目皮肤

if (projectTheme && projectTheme.length) {
  global.setGlobalTheme(projectTheme);
}

var chartx = {
  options: {}
};

for (var p in global) {
  chartx[p] = global[p];
}
chartx.__dimension = 3;

export default chartx;
