// object-create-ie8
;if (!/\[native code\]/.test( Object.create )) {
    Object.create = function (a) {
        var f = function () { }
        f.prototype = a;
        return new f()
    }
}

// object-defineproperty-ie8
var origDefineProperty = Object.defineProperty;

var arePropertyDescriptorsSupported = function () {
    var obj = {};
    try {
        origDefineProperty(obj, "x", { enumerable: false, value: obj });
        for (var _ in obj) {
            return false;
        }
        return obj.x === obj;
    } catch (e) {
        /* this is IE 8. */
        return false;
    }
}

var supportsDescriptors = origDefineProperty && arePropertyDescriptorsSupported()

if (!supportsDescriptors) {
    Object.defineProperty = function (a, b, c) {
        //IE8支持修改元素节点的属性
        if (origDefineProperty && a.nodeType == 1) {
            return origDefineProperty(a, b, c);
        } else {
            a[b] = c.value || (c.get && c.get());
        }
    };
}

if (typeof Function.prototype.bind !== 'function') {
    Function.prototype.bind = function () {
      var fn = this;
      var args = arguments;
      return function () {
        return fn.call.apply(fn, args);
      };
    };
}

// if(!Array.indexOf){
//     Array.prototype.indexOf=function(searchElement,fromIndex){
//         var i=fromIndex,o=this,x=o.length,l=x>>>0;
//         if(l!==0 && (i=(i===Infinity||isNaN(i))?0:parseInt(i),i<l)){
//             x=Math;
//             i=x.max(i>=0?i:l-x.abs(i),0);
//             x=searchElement;
//             while(i<l){if(i in o && o[i]===x){return i;};i++;};
//         };
//         return -1;
//     };
// }

// if (!Object.keys) {
//     Object.keys = (function () {
//         return function (obj) {
//             var keys = [],
//                 key;

//             if (obj !== Object(obj)) {
//                 throw new TypeError('Invalid object');
//             }

//             for (key in obj) {
//                 if (obj.hasOwnProperty(key)) {
//                     keys[keys.length] = key;
//                 }
//             }
//             return keys;
//         };
//     }());
// }

// if (!Array.prototype.forEach) {
//     Array.prototype.forEach = function (fn, scope) {
//       var i, len;
//       for (i = 0, len = this.length; i < len; ++i) {
//         if (i in this) {
//           fn.call(scope, this[i], i, this);
//         };
//       };
//     };
// }

// if (!Array.prototype.some) {
//     Array.prototype.some = function (fun /*, thisArg */) {
//         'use strict';

//         if (this === void 0 || this === null) {
//             throw new TypeError();
//         }

//         var t = Object(this);
//         var len = t.length >>> 0;
//         if (typeof fun !== 'function') {
//             throw new TypeError();
//         }

//         var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
//         for (var i = 0; i < len; i++) {
//             if (i in t && fun.call(thisArg, t[i], i, t)) {
//                 return true;
//             }
//         }

//         return false;
//     };
// }

// if(!String.prototype.trim){
//     String.prototype.trim = ''.trim ||  function () {
//         return String(this).replace(/^\s+|\s+/g, '');
//     };
// }
/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"main": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./src/index.js","vendors~main"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./polyfill.js":
/*!*********************!*\
  !*** ./polyfill.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("!window.addEventListener && function (WP, DP, EP, a, r, d, rest) {\n  WP[a] = DP[a] = EP[a] = function (type, listener) {\n    var target = this;\n    rest.unshift([target, type, listener, function (event) {\n      event.currentTarget = target;\n\n      event.preventDefault = function () {\n        event.returnValue = false;\n      };\n\n      event.stopPropagation = function () {\n        event.cancelBubble = true;\n      };\n\n      event.target = event.srcElement || target;\n      listener.call(target, event);\n    }]);\n    this.attachEvent('on' + type, rest[0][3]);\n  };\n\n  WP[r] = DP[r] = EP[r] = function (type, listener) {\n    for (var index = 0, register; register = rest[index]; ++index) {\n      if (register[0] == this && register[1] == type && register[2] == listener) {\n        return this.detachEvent('on' + type, rest.splice(index, 1)[0][3]);\n      }\n    }\n  };\n\n  WP[d] = DP[d] = EP[d] = function (eventObject) {\n    return this.fireEvent('on' + eventObject.type, eventObject);\n  };\n}(Window.prototype, HTMLDocument.prototype, Element.prototype, 'a', 'r', 'd', []);\n\nif (!window.performance) {\n  window.performance = {};\n\n  window.performance.now = Date.now || function () {\n    return new Date().getTime();\n  };\n}\n\nif (!Array.isArray) {\n  Array.isArray = function (toString) {\n    var $ = toString.call([]);\n    return function isArray(object) {\n      return toString.call(object) === $;\n    };\n  }({}.toString);\n}\n\nif (!Array.prototype.forEach) {\n  Array.prototype.forEach = function (fn, scope) {\n    var i, len;\n\n    for (i = 0, len = this.length; i < len; ++i) {\n      if (i in this) {\n        fn.call(scope, this[i], i, this);\n      }\n    }\n  };\n}\n\nif (typeof Function.prototype.bind !== 'function') {\n  Function.prototype.bind = function () {\n    var fn = this;\n    var args = arguments;\n    return function () {\n      return fn.call.apply(fn, args);\n    };\n  };\n}\n\nif (!SVGElement) {\n  SVGElement = function SVGElement() {// 暂时不支持 svg\n  };\n}\n\nif (!Array.prototype.some) {\n  Array.prototype.some = function (fun) {\n    if (this === void 0 || this === null) {\n      throw new TypeError();\n    }\n\n    var t = Object(this);\n    var len = t.length >>> 0;\n\n    if (typeof fun !== 'function') {\n      throw new TypeError();\n    }\n\n    var thisArg = arguments.length >= 2 ? arguments[1] : void 0;\n\n    for (var i = 0; i < len; i++) {\n      if (i in t && fun.call(thisArg, t[i], i, t)) {\n        return true;\n      }\n    }\n\n    return false;\n  };\n}\n\nif (!document.createTextNode) {\n  document.createTextNode = function (data) {\n    var text = document.createElement('x-text');\n    text.innerText = data;\n    return text;\n  };\n}\n\n//# sourceURL=webpack:///./polyfill.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _polyfill__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../polyfill */ \"./polyfill.js\");\n/* harmony import */ var _polyfill__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_polyfill__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var fre__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! fre */ \"./node_modules/fre/dist/fre.esm.js\");\n\n\n\nfunction App(props) {\n  var _useState = Object(fre__WEBPACK_IMPORTED_MODULE_1__[\"useState\"])(0),\n      count = _useState[0],\n      setCount = _useState[1];\n\n  return Object(fre__WEBPACK_IMPORTED_MODULE_1__[\"h\"])(\"div\", null, count, \" - \", props.foo, Object(fre__WEBPACK_IMPORTED_MODULE_1__[\"h\"])(\"button\", {\n    onClick: function onClick() {\n      return setCount(count + 1);\n    }\n  }, \"+\"));\n}\n\nObject(fre__WEBPACK_IMPORTED_MODULE_1__[\"render\"])(Object(fre__WEBPACK_IMPORTED_MODULE_1__[\"h\"])(App, {\n  foo: \"bar\"\n}), document.getElementById('root'));\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });