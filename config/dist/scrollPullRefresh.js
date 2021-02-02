(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else if(typeof exports === 'object')
		exports["scrollPullRefresh"] = factory(require("react"));
	else
		root["scrollPullRefresh"] = factory(root["React"]);
})(self, function(__WEBPACK_EXTERNAL_MODULE__888__) {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 572:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(888);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }



var durationMap = {
  'noBounce': 2500,
  'weekBounce': 800,
  'strongBounce': 400
};
var bezierMap = {
  'noBounce': 'cubic-bezier(.17, .89, .45, 1)',
  'weekBounce': 'cubic-bezier(.25, .46, .45, .94)',
  'strongBounce': 'cubic-bezier(.25, .46, .45, .94)'
};

var ReactPullRefresh = function ReactPullRefresh(props) {
  var _props$onRefresh = props.onRefresh,
      onRefresh = _props$onRefresh === void 0 ? function () {} : _props$onRefresh,
      refreshing = props.refreshing,
      direction = props.direction,
      _props$distanceToRefr = props.distanceToRefresh,
      distanceToRefresh = _props$distanceToRefr === void 0 ? 25 : _props$distanceToRefr,
      children = props.children;
  var contentRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)();
  var contentWrapperRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)();

  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(),
      _useState2 = _slicedToArray(_useState, 2),
      scrollStyle = _useState2[0],
      setScrollStyle = _useState2[1];

  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      isStarted = _useState4[0],
      setIsStarted = _useState4[1];

  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({
    duration: 0,
    minY: 0,
    maxY: 0,
    pointY: 0,
    momentumStartY: 0,
    startY: 0,
    offsetY: 0,
    momentumTimeThreshold: 300,
    momentumYThreshold: 15,
    startTime: 0,
    nowTime: 0,
    bezier: 'linear',
    wrapperHeight: 0,
    _startScreenX: 0,
    _startScreenY: 0
  }),
      _useState6 = _slicedToArray(_useState5, 2),
      dragState = _useState6[0],
      setDragState = _useState6[1];

  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    var _contentRef$current$g = contentRef.current.getBoundingClientRect(),
        wrapperHeight = _contentRef$current$g.height;

    var _contentWrapperRef$cu = contentWrapperRef.current.getBoundingClientRect(),
        scrollHeight = _contentWrapperRef$cu.height;

    dragState.minY = wrapperHeight - scrollHeight;
    dragState.wrapperHeight = wrapperHeight;
    contentWrapperRef.current.addEventListener("transitionend", isNeedReset);
    setDragState(dragState);
    return distroy;
  }, []);

  var distroy = function distroy() {
    contentWrapperRef.current.removeEventListener("transitionend", isNeedReset);
    contentWrapperRef.current.removeEventListener("touchstart", _onTouchStart);
    contentWrapperRef.current.removeEventListener("touchmove", _onTouchMove);
    contentWrapperRef.current.removeEventListener("touchcancel", ontouchcancel);
  };

  var _onTouchStart = function onTouchStart(event) {
    var point = event.changedTouches[0];
    stop();
    setIsStarted(true);
    dragState.pointY = point.pageY;
    dragState._startScreenY = point.screenY;
    dragState._startScreenX = point.screenX;
    dragState.startTime = new Date().getTime();
    dragState.duration = 0;
    dragState.momentumStartY = dragState.startY = dragState.offsetY;
    setDragState(dragState);
  };

  var _onTouchMove = function onTouchMove(event) {
    if (!isStarted) return;
    var point = event.changedTouches[0]; // 使用 pageY 对比有问题

    var _screenY = point.screenY;
    var _screenX = point.screenX; // 横向滑动不处理

    if (Math.abs(_screenX - dragState._startScreenX) > 20 * window.devicePixelRatio) {
      return;
    }

    var deltaY = point.pageY - (dragState.pointY || 0); // 浮点数坐标会影响渲染速度

    var offsetY = Math.round((dragState.startY || 0) + deltaY); // 超出边界时增加阻力

    if (offsetY < dragState.minY || offsetY > dragState.maxY) {
      offsetY = Math.round((dragState.startY || 0) + deltaY / 3);
    }

    if (dragState.offsetY < dragState.minY - distanceToRefresh || dragState.offsetY > distanceToRefresh) {
      offsetY = Math.round((dragState.startY || 0) + deltaY / 3);
      return;
    }

    dragState.offsetY = offsetY;
    var now = new Date().getTime(); // 记录在触发惯性滑动条件下的偏移值和时间

    if (now - (dragState.startTime || 0) > dragState.momentumTimeThreshold) {
      dragState.momentumStartY = dragState.offsetY;
      dragState.startTime = now;
    }

    setDragState(dragState);
    setStyle(dragState);
  };

  var setStyle = function setStyle(_ref) {
    var offsetY = _ref.offsetY,
        duration = _ref.duration,
        bezier = _ref.bezier;
    setScrollStyle({
      'transform': "translate3d(0, ".concat(offsetY, "px, 0)"),
      'transitionDuration': "".concat(duration, "ms"),
      'transitionTimingFunction': bezier
    });
  };

  var ontouchcancel = function ontouchcancel(event) {
    if (!isStarted) return;
    setIsStarted(false);

    if (direction === 'up') {
      if (dragState.offsetY < dragState.minY - distanceToRefresh) {
        onRefresh();
        return;
      }
    }

    if (direction === 'down') {
      if (dragState.offsetY > distanceToRefresh) {
        onRefresh();
        return;
      }
    }

    if (isNeedReset()) return;
    var absDeltaY = Math.abs(dragState.offsetY - dragState.momentumStartY);
    var duration = new Date().getTime() - dragState.startTime; // 启动惯性滑动

    if (duration < dragState.momentumTimeThreshold && absDeltaY > dragState.momentumYThreshold) {
      var momentumData = momentum(dragState.offsetY, dragState.momentumStartY, duration);
      dragState.offsetY = Math.round(momentumData.destination);
      dragState.duration = momentumData.duration;
      dragState.bezier = momentumData.bezier;
      setDragState(dragState);
      setStyle(dragState);
    }
  };

  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    if (refreshing) {
      stop();
    } else {
      isNeedReset();
    }
  }, [refreshing]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    //dom有变化时更新dom高度
    var _contentRef$current$g2 = contentRef.current.getBoundingClientRect(),
        wrapperHeight = _contentRef$current$g2.height;

    var _contentWrapperRef$cu2 = contentWrapperRef.current.getBoundingClientRect(),
        scrollHeight = _contentWrapperRef$cu2.height;

    dragState.minY = wrapperHeight - scrollHeight;
    dragState.wrapperHeight = wrapperHeight;
    setDragState(dragState);
  }, [children]);
  /**
   * 超出边界重置位置
   */

  var isNeedReset = function isNeedReset() {
    var offsetY;

    if (dragState.offsetY < dragState.minY) {
      offsetY = dragState.minY;
    } else if (dragState.offsetY > dragState.maxY) {
      offsetY = dragState.maxY;
    }

    if (typeof offsetY !== 'undefined') {
      dragState.offsetY = offsetY;
      dragState.duration = 500;
      dragState.bezier = 'cubic-bezier(.165, .84, .44, 1)';
      setDragState(dragState);
      setStyle(dragState);
      return true;
    }

    return false;
  };

  var stop = function stop() {
    // 获取当前 translate 的位置
    var matrix = window.getComputedStyle(contentWrapperRef.current).getPropertyValue('transform');
    dragState.offsetY = Math.round(+matrix.split(')')[0].split(', ')[5]);
    setDragState(dragState);
    setStyle(dragState);
  };

  var momentum = function momentum(current, start, duration) {
    var type = 'noBounce'; // 惯性滑动加速度

    var deceleration = 0.003; // 回弹阻力

    var bounceRate = 10; // 强弱回弹的分割值

    var bounceThreshold = 300; // 回弹的最大限度

    var maxOverflowY = dragState.wrapperHeight / 6;
    var overflowY;
    var distance = current - start;
    var speed = 2 * Math.abs(distance) / duration;
    var destination = current + speed / deceleration * (distance < 0 ? -1 : 1);

    if (destination < dragState.minY) {
      overflowY = dragState.minY - destination;
      type = overflowY > bounceThreshold ? 'strongBounce' : 'weekBounce';
      destination = Math.max(dragState.minY - maxOverflowY, dragState.minY - overflowY / bounceRate);
    } else if (destination > dragState.maxY) {
      overflowY = destination - dragState.maxY;
      type = overflowY > bounceThreshold ? 'strongBounce' : 'weekBounce';
      destination = Math.min(dragState.maxY + maxOverflowY, dragState.maxY + overflowY / bounceRate);
    }

    return {
      destination: destination,
      duration: durationMap[type],
      bezier: bezierMap[type]
    };
  };

  var onMouseStart = function onMouseStart(event) {
    event.persist();
  };

  var onMouseMove = function onMouseMove(event) {
    event.persist();
    var eventTarget = event;
  };

  var onMouseUp = function onMouseUp(event) {};

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "hp-box",
    ref: contentRef,
    style: {
      height: "200px"
    }
  }, direction === 'down' && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "refresh-icon"
  }, "\u5237\u65B0\u4E2D....."), direction === 'up' && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "loading-icon"
  }, "\u52A0\u8F7D\u4E2D....."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    ref: contentWrapperRef,
    style: scrollStyle,
    onTouchStart: function onTouchStart(e) {
      return _onTouchStart(e);
    },
    onTouchMove: function onTouchMove(e) {
      return _onTouchMove(e);
    },
    onTouchCancel: function onTouchCancel(e) {
      return ontouchcancel(e);
    },
    onTouchEnd: function onTouchEnd(e) {
      return ontouchcancel(e);
    },
    className: "hp-wrapper"
  }, children));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ReactPullRefresh);

/***/ }),

/***/ 888:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__888__;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// module exports must be returned from runtime so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(572);
/******/ })()
.default;
});