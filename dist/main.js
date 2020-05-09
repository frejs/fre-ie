/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./polyfill.js":
/*!*********************!*\
  !*** ./polyfill.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("!window.addEventListener && function (WindowPrototype, DocumentPrototype, ElementPrototype, addEventListener, removeEventListener, dispatchEvent, registry) {\n  WindowPrototype[addEventListener] = DocumentPrototype[addEventListener] = ElementPrototype[addEventListener] = function (type, listener) {\n    var target = this;\n    registry.unshift([target, type, listener, function (event) {\n      event.currentTarget = target;\n\n      event.preventDefault = function () {\n        event.returnValue = false;\n      };\n\n      event.stopPropagation = function () {\n        event.cancelBubble = true;\n      };\n\n      event.target = event.srcElement || target;\n      listener.call(target, event);\n    }]);\n    this.attachEvent('on' + type, registry[0][3]);\n  };\n\n  WindowPrototype[removeEventListener] = DocumentPrototype[removeEventListener] = ElementPrototype[removeEventListener] = function (type, listener) {\n    for (var index = 0, register; register = registry[index]; ++index) {\n      if (register[0] == this && register[1] == type && register[2] == listener) {\n        return this.detachEvent('on' + type, registry.splice(index, 1)[0][3]);\n      }\n    }\n  };\n\n  WindowPrototype[dispatchEvent] = DocumentPrototype[dispatchEvent] = ElementPrototype[dispatchEvent] = function (eventObject) {\n    return this.fireEvent('on' + eventObject.type, eventObject);\n  };\n}(Window.prototype, HTMLDocument.prototype, Element.prototype, 'addEventListener', 'removeEventListener', 'dispatchEvent', []);\n\ndocument.createTextNode = function (data) {\n  var text = document.createElement('x-text');\n  text.innerText = data;\n  return text;\n};\n\nif (!('performance' in window)) {\n  window.performance = {};\n}\n\nvar perf = window.performance;\n\nwindow.performance.now = Date.now || function () {\n  return new Date().getTime();\n};\n\nif (!Array.isArray) {\n  Array.isArray = function (toString) {\n    var $ = toString.call([]);\n    return function isArray(object) {\n      return toString.call(object) === $;\n    };\n  }({}.toString);\n}\n\nif (!Array.prototype.forEach) {\n  Array.prototype.forEach = function (fn, scope) {\n    var i, len;\n\n    for (i = 0, len = this.length; i < len; ++i) {\n      if (i in this) {\n        fn.call(scope, this[i], i, this);\n      }\n    }\n  };\n}\n\nif (typeof Function.prototype.bind !== 'function') {\n  Function.prototype.bind = function () {\n    var fn = this;\n    var args = arguments;\n    return function () {\n      return fn.call.apply(fn, args);\n    };\n  };\n}\n\nif (!SVGElement) {\n  SVGElement = function SVGElement() {// 暂时不支持 svg\n  };\n}\n\nif (!Array.prototype.some) {\n  Array.prototype.some = function (fun) {\n    if (this === void 0 || this === null) {\n      throw new TypeError();\n    }\n\n    var t = Object(this);\n    var len = t.length >>> 0;\n\n    if (typeof fun !== 'function') {\n      throw new TypeError();\n    }\n\n    var thisArg = arguments.length >= 2 ? arguments[1] : void 0;\n\n    for (var i = 0; i < len; i++) {\n      if (i in t && fun.call(thisArg, t[i], i, t)) {\n        return true;\n      }\n    }\n\n    return false;\n  };\n}\n/* \r\n  以下是对 webpack 的兼容处理\r\n*/\n\n\n;\n\nif (!/\\[native code\\]/.test(Object.create)) {\n  Object.create = function (a) {\n    var f = function f() {};\n\n    f.prototype = a;\n    return new f();\n  };\n}\n\nvar origDefineProperty = Object.defineProperty;\n\nvar arePropertyDescriptorsSupported = function arePropertyDescriptorsSupported() {\n  var obj = {};\n\n  try {\n    origDefineProperty(obj, \"x\", {\n      enumerable: false,\n      value: obj\n    });\n\n    for (var _ in obj) {\n      return false;\n    }\n\n    return obj.x === obj;\n  } catch (e) {\n    return false;\n  }\n};\n\nvar supportsDescriptors = origDefineProperty && arePropertyDescriptorsSupported();\n\nif (!supportsDescriptors) {\n  Object.defineProperty = function (a, b, c) {\n    if (origDefineProperty && a.nodeType == 1) {\n      return origDefineProperty(a, b, c);\n    } else {\n      a[b] = c.value || c.get && c.get();\n    }\n  };\n}\n\n;\n\n//# sourceURL=webpack:///./polyfill.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _polyfill__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../polyfill */ \"./polyfill.js\");\n/* harmony import */ var _polyfill__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_polyfill__WEBPACK_IMPORTED_MODULE_0__);\n\n\nvar a = function a() {\n  return console.log(a);\n};\n\na();\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });