/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is not neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! unknown exports (runtime-defined) */
/*! exports [maybe provided (runtime-defined)] [unused] */
/*! runtime requirements:  */
eval("!window.addEventListener && function (WindowPrototype, DocumentPrototype, ElementPrototype, addEventListener, removeEventListener, dispatchEvent, registry) {\n  WindowPrototype[addEventListener] = DocumentPrototype[addEventListener] = ElementPrototype[addEventListener] = function (type, listener) {\n    var target = this;\n    registry.unshift([target, type, listener, function (event) {\n      event.currentTarget = target;\n\n      event.preventDefault = function () {\n        event.returnValue = false;\n      };\n\n      event.stopPropagation = function () {\n        event.cancelBubble = true;\n      };\n\n      event.target = event.srcElement || target;\n      listener.call(target, event);\n    }]);\n    this.attachEvent('on' + type, registry[0][3]);\n  };\n\n  WindowPrototype[removeEventListener] = DocumentPrototype[removeEventListener] = ElementPrototype[removeEventListener] = function (type, listener) {\n    for (var index = 0, register; register = registry[index]; ++index) {\n      if (register[0] == this && register[1] == type && register[2] == listener) {\n        return this.detachEvent('on' + type, registry.splice(index, 1)[0][3]);\n      }\n    }\n  };\n\n  WindowPrototype[dispatchEvent] = DocumentPrototype[dispatchEvent] = ElementPrototype[dispatchEvent] = function (eventObject) {\n    return this.fireEvent('on' + eventObject.type, eventObject);\n  };\n}(Window.prototype, HTMLDocument.prototype, Element.prototype, 'addEventListener', 'removeEventListener', 'dispatchEvent', []);\n\ndocument.createTextNode = function (data) {\n  const text = document.createElement('x-text');\n  text.innerText = data;\n  return text;\n};\n\nif (!('performance' in window)) {\n  window.performance = {};\n}\n\nvar perf = window.performance;\n\nwindow.performance.now = Date.now || function () {\n  return new Date().getTime();\n};\n\nif (!Array.isArray) {\n  Array.isArray = function (toString) {\n    var $ = toString.call([]);\n    return function isArray(object) {\n      return toString.call(object) === $;\n    };\n  }({}.toString);\n}\n\nif (!Array.prototype.forEach) {\n  Array.prototype.forEach = function (fn, scope) {\n    var i, len;\n\n    for (i = 0, len = this.length; i < len; ++i) {\n      if (i in this) {\n        fn.call(scope, this[i], i, this);\n      }\n    }\n  };\n}\n\nif (typeof Function.prototype.bind !== 'function') {\n  Function.prototype.bind = function () {\n    var fn = this;\n    var args = arguments;\n    return function () {\n      return fn.call.apply(fn, args);\n    };\n  };\n}\n\nif (!SVGElement) {\n  SVGElement = function () {// 暂时不支持 svg\n  };\n}\n\nif (!Array.prototype.some) {\n  Array.prototype.some = function (fun) {\n    if (this === void 0 || this === null) {\n      throw new TypeError();\n    }\n\n    var t = Object(this);\n    var len = t.length >>> 0;\n\n    if (typeof fun !== 'function') {\n      throw new TypeError();\n    }\n\n    var thisArg = arguments.length >= 2 ? arguments[1] : void 0;\n\n    for (var i = 0; i < len; i++) {\n      if (i in t && fun.call(thisArg, t[i], i, t)) {\n        return true;\n      }\n    }\n\n    return false;\n  };\n}\n/* \r\n  以下是对 webpack 的兼容处理\r\n*/\n\n\n;\n\nif (!/\\[native code\\]/.test(Object.create)) {\n  Object.create = function (a) {\n    var f = function () {};\n\n    f.prototype = a;\n    return new f();\n  };\n}\n\nvar origDefineProperty = Object.defineProperty;\n\nvar arePropertyDescriptorsSupported = function () {\n  var obj = {};\n\n  try {\n    origDefineProperty(obj, \"x\", {\n      enumerable: false,\n      value: obj\n    });\n\n    for (var _ in obj) {\n      return false;\n    }\n\n    return obj.x === obj;\n  } catch (e) {\n    return false;\n  }\n};\n\nvar supportsDescriptors = origDefineProperty && arePropertyDescriptorsSupported();\n\nif (!supportsDescriptors) {\n  Object.defineProperty = function (a, b, c) {\n    if (origDefineProperty && a.nodeType == 1) {\n      return origDefineProperty(a, b, c);\n    } else {\n      a[b] = c.value || c.get && c.get();\n    }\n  };\n}\n\n;\n\n//# sourceURL=webpack://fre-ie/./index.js?");
/******/ })()
;