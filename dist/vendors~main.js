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
(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vendors~main"],{

/***/ "./node_modules/fre/dist/fre.esm.js":
/*!******************************************!*\
  !*** ./node_modules/fre/dist/fre.esm.js ***!
  \******************************************/
/*! exports provided: default, Fragment, createElement, h, memo, render, scheduleWork, useCallback, useEffect, useLayout, useLayoutEffect, useMemo, useReducer, useRef, useState */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Fragment\", function() { return Fragment; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createElement\", function() { return h; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"h\", function() { return h; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"memo\", function() { return memo; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"scheduleWork\", function() { return scheduleWork; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"useCallback\", function() { return useCallback; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"useEffect\", function() { return useEffect; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"useLayout\", function() { return useLayout; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"useLayoutEffect\", function() { return useLayout; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"useMemo\", function() { return useMemo; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"useReducer\", function() { return useReducer; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"useRef\", function() { return useRef; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"useState\", function() { return useState; });\nfunction _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }\n\nvar isArr = Array.isArray;\n\nvar isStr = function isStr(s) {\n  return typeof s === 'string' || typeof s === 'number';\n};\n\nvar MEMO = 0;\n\nfunction h(type, attrs) {\n  var props = attrs || {};\n  var key = props.key || null;\n  var ref = props.ref || null;\n  var children = [];\n\n  for (var i = 0; i < (arguments.length <= 2 ? 0 : arguments.length - 2); i++) {\n    var vnode = i + 2 < 2 || arguments.length <= i + 2 ? undefined : arguments[i + 2];\n    if (vnode == null || vnode === true || vnode === false) ;else if (isStr(vnode)) {\n      children.push(createText(vnode));\n    } else {\n      while (isArr(vnode) && vnode.some(function (v) {\n        return isArr(v);\n      })) {\n        var _ref;\n\n        vnode = (_ref = []).concat.apply(_ref, vnode);\n      }\n\n      children.push(vnode);\n    }\n  }\n\n  if (children.length) {\n    props.children = children.length === 1 ? children[0] : children;\n  }\n\n  delete props.key;\n  delete props.ref;\n  return {\n    type: type,\n    props: props,\n    key: key,\n    ref: ref\n  };\n}\n\nfunction createText(vnode) {\n  return {\n    type: 'text',\n    props: {\n      nodeValue: vnode\n    }\n  };\n}\n\nfunction Fragment(props) {\n  return props.children;\n}\n\nfunction memo(fn) {\n  fn.tag = MEMO;\n  return fn;\n}\n\nfunction updateElement(dom, oldProps, newProps) {\n  for (var name in _extends(_extends({}, oldProps), newProps)) {\n    var oldValue = oldProps[name];\n    var newValue = newProps[name];\n    if (oldValue == newValue || name === 'children') ;else if (name === 'style') {\n      for (var k in _extends(_extends({}, oldValue), newValue)) {\n        if (!(oldValue && newValue && oldValue[k] === newValue[k])) {\n          dom[name][k] = newValue && newValue[k] || '';\n        }\n      }\n    } else if (name[0] === 'o' && name[1] === 'n') {\n      name = name.slice(2).toLowerCase();\n      if (oldValue) dom.removeEventListener(name, oldValue);\n      dom.addEventListener(name, newValue);\n    } else if (name in dom) {\n      if (name === 'nodeValue') dom.innerText = newValue;\n      dom[name] = newValue == null ? '' : newValue;\n    } else if (newValue == null || newValue === false) {\n      dom.removeAttribute(name);\n    } else {\n      dom.setAttribute(name, newValue);\n    }\n  }\n}\n\nfunction createElement(fiber) {\n  var dom = fiber.type === 'text' ? document.createTextNode('') : fiber.tag === SVG ? document.createElementNS('http://www.w3.org/2000/svg', fiber.type) : document.createElement(fiber.type);\n  updateElement(dom, {}, fiber.props);\n  return dom;\n}\n\nvar cursor = 0;\n\nfunction resetCursor() {\n  cursor = 0;\n}\n\nfunction useState(initState) {\n  return useReducer(null, initState);\n}\n\nfunction useReducer(reducer, initState) {\n  var _getHook = getHook(cursor++),\n      hook = _getHook[0],\n      current = _getHook[1];\n\n  var setter = function setter(value) {\n    var newValue = reducer ? reducer(hook[0], value) : isFn(value) ? value(hook[0]) : value;\n\n    if (newValue !== hook[0]) {\n      hook[0] = newValue;\n      scheduleWork(current);\n    }\n  };\n\n  if (hook.length) {\n    return [hook[0], setter];\n  } else {\n    hook[0] = initState;\n    return [initState, setter];\n  }\n}\n\nfunction useEffect(cb, deps) {\n  return effectImpl(cb, deps, 'effect');\n}\n\nfunction useLayout(cb, deps) {\n  return effectImpl(cb, deps, 'layout');\n}\n\nfunction effectImpl(cb, deps, key) {\n  var _getHook2 = getHook(cursor++),\n      hook = _getHook2[0],\n      current = _getHook2[1];\n\n  if (isChanged(hook[1], deps)) {\n    hook[0] = useCallback(cb, deps);\n    hook[1] = deps;\n    current.hooks[key].push(hook);\n  }\n}\n\nfunction useMemo(cb, deps) {\n  var hook = getHook(cursor++)[0];\n\n  if (isChanged(hook[1], deps)) {\n    hook[1] = deps;\n    return hook[0] = cb();\n  }\n\n  return hook[0];\n}\n\nfunction useCallback(cb, deps) {\n  return useMemo(function () {\n    return cb;\n  }, deps);\n}\n\nfunction useRef(current) {\n  return useMemo(function () {\n    return {\n      current: current\n    };\n  }, []);\n}\n\nfunction getHook(cursor) {\n  var current = getCurrentFiber();\n  var hooks = current.hooks || (current.hooks = {\n    list: [],\n    effect: [],\n    layout: []\n  });\n\n  if (cursor >= hooks.list.length) {\n    hooks.list.push([]);\n  }\n\n  return [hooks.list[cursor], current];\n}\n\nfunction isChanged(a, b) {\n  return !a || b.some(function (arg, index) {\n    return arg !== a[index];\n  });\n}\n\nfunction push(heap, node) {\n  var i = heap.length;\n  heap.push(node);\n  siftUp(heap, node, i);\n}\n\nfunction pop(heap) {\n  var first = heap[0];\n  if (!first) return null;\n  var last = heap.pop();\n\n  if (last !== first) {\n    heap[0] = last;\n    siftDown(heap, last, 0);\n  }\n\n  return first;\n}\n\nfunction siftUp(heap, node, i) {\n  while (i > 0) {\n    var pi = i - 1 >>> 1;\n    var parent = heap[pi];\n    if (cmp(parent, node) <= 0) return;\n    heap[pi] = node;\n    heap[i] = parent;\n    i = pi;\n  }\n}\n\nfunction siftDown(heap, node, i) {\n  for (;;) {\n    var li = i * 2 + 1;\n    var left = heap[li];\n    if (li >= heap.length) return;\n    var ri = li + 1;\n    var right = heap[ri];\n    var ci = ri < heap.length && cmp(right, left) < 0 ? ri : li;\n    var child = heap[ci];\n    if (cmp(child, node) > 0) return;\n    heap[ci] = node;\n    heap[i] = child;\n    i = ci;\n  }\n}\n\nfunction cmp(a, b) {\n  return a.dueTime - b.dueTime;\n}\n\nfunction peek(heap) {\n  return heap[0] || null;\n}\n\nvar taskQueue = [];\nvar currentCallback = null;\nvar frameDeadline = 0;\nvar frameLength = 1000 / 60;\n\nfunction scheduleCallback(callback) {\n  var currentTime = getTime();\n  var startTime = currentTime;\n  var timeout = 3000;\n  var dueTime = startTime + timeout;\n  var newTask = {\n    callback: callback,\n    startTime: startTime,\n    dueTime: dueTime\n  };\n  push(taskQueue, newTask);\n  currentCallback = flush;\n  planWork();\n}\n\nfunction flush(iniTime) {\n  var currentTime = iniTime;\n  var currentTask = peek(taskQueue);\n\n  while (currentTask) {\n    var didout = currentTask.dueTime <= currentTime;\n    if (!didout && shouldYeild()) break;\n    var callback = currentTask.callback;\n    currentTask.callback = null;\n    var next = callback(didout);\n    next ? currentTask.callback = next : pop(taskQueue);\n    currentTask = peek(taskQueue);\n    currentTime = getTime();\n  }\n\n  return !!currentTask;\n}\n\nfunction flushWork() {\n  if (currentCallback) {\n    var currentTime = getTime();\n    frameDeadline = currentTime + frameLength;\n    var more = currentCallback(currentTime);\n    more ? planWork() : currentCallback = null;\n  }\n}\n\nvar planWork = function () {\n  if (typeof MessageChannel !== 'undefined') {\n    var _MessageChannel = new MessageChannel(),\n        port1 = _MessageChannel.port1,\n        port2 = _MessageChannel.port2;\n\n    port1.onmessage = flushWork;\n    return function (cb) {\n      return cb ? requestAnimationFrame(cb) : port2.postMessage(null);\n    };\n  }\n\n  return function (cb) {\n    return setTimeout(cb || flushWork);\n  };\n}();\n\nfunction shouldYeild() {\n  return getTime() >= frameDeadline;\n}\n\nvar getTime = function getTime() {\n  return performance.now();\n};\n\nvar NOWORK = 0;\nvar PLACE = 1;\nvar UPDATE = 2;\nvar DELETE = 3;\nvar SVG = 4;\nvar preCommit = null;\nvar currentFiber = null;\nvar WIP = null;\nvar updateQueue = [];\nvar commitQueue = [];\n\nfunction render(vnode, node, done) {\n  var rootFiber = {\n    node: node,\n    props: {\n      children: vnode\n    },\n    done: done\n  };\n  scheduleWork(rootFiber);\n}\n\nfunction scheduleWork(fiber) {\n  if (!fiber.dirty && (fiber.dirty = true)) {\n    updateQueue.push(fiber);\n  }\n\n  scheduleCallback(reconcileWork);\n}\n\nfunction reconcileWork(didout) {\n  if (!WIP) WIP = updateQueue.shift();\n\n  while (WIP && (!shouldYeild() || didout)) {\n    WIP = reconcile(WIP);\n  }\n\n  if (!didout && WIP) {\n    return reconcileWork.bind(null);\n  }\n\n  if (preCommit) commitWork(preCommit);\n  return null;\n}\n\nfunction reconcile(WIP) {\n  WIP.parentNode = getParentNode(WIP);\n  isFn(WIP.type) ? updateHOOK(WIP) : updateHost(WIP);\n  WIP.dirty = WIP.dirty ? false : 0;\n  WIP.oldProps = WIP.props;\n  commitQueue.push(WIP);\n  if (WIP.child) return WIP.child;\n\n  while (WIP) {\n    if (!preCommit && WIP.dirty === false) {\n      preCommit = WIP;\n      return null;\n    }\n\n    if (WIP.sibling) {\n      return WIP.sibling;\n    }\n\n    WIP = WIP.parent;\n  }\n}\n\nfunction updateHOOK(WIP) {\n  if (WIP.type.tag === MEMO && WIP.dirty == 0 && !shouldUpdate(WIP.oldProps, WIP.props)) {\n    cloneChildren(WIP);\n    return;\n  }\n\n  currentFiber = WIP;\n  WIP.type.fiber = WIP;\n  resetCursor();\n  var children = WIP.type(WIP.props);\n\n  if (isStr(children)) {\n    children = createText(children);\n  }\n\n  reconcileChildren(WIP, children);\n}\n\nfunction updateHost(WIP) {\n  if (!WIP.node) {\n    if (WIP.type === 'svg') WIP.tag = SVG;\n    WIP.node = createElement(WIP);\n  }\n\n  var p = WIP.parentNode || {};\n  WIP.insertPoint = p.last || null;\n  p.last = WIP;\n  WIP.node.last = null;\n  reconcileChildren(WIP, WIP.props.children);\n}\n\nfunction getParentNode(fiber) {\n  while (fiber = fiber.parent) {\n    if (!isFn(fiber.type)) return fiber.node;\n  }\n}\n\nfunction reconcileChildren(WIP, children) {\n  if (!children) return;\n  delete WIP.child;\n  var oldFibers = WIP.kids;\n  var newFibers = WIP.kids = hashfy(children);\n  var reused = {};\n\n  for (var k in oldFibers) {\n    var newFiber = newFibers[k];\n    var oldFiber = oldFibers[k];\n\n    if (newFiber && newFiber.type === oldFiber.type) {\n      reused[k] = oldFiber;\n    } else {\n      oldFiber.op = DELETE;\n      commitQueue.push(oldFiber);\n    }\n  }\n\n  var prevFiber = null;\n  var alternate = null;\n\n  for (var _k in newFibers) {\n    var _newFiber = newFibers[_k];\n    var _oldFiber = reused[_k];\n\n    if (_oldFiber) {\n      alternate = createFiber(_oldFiber, UPDATE);\n      _newFiber.op = UPDATE;\n      _newFiber = _extends(_extends({}, alternate), _newFiber);\n      _newFiber.lastProps = alternate.props;\n\n      if (shouldPlace(_newFiber)) {\n        _newFiber.op = PLACE;\n      }\n    } else {\n      _newFiber = createFiber(_newFiber, PLACE);\n    }\n\n    newFibers[_k] = _newFiber;\n    _newFiber.parent = WIP;\n\n    if (prevFiber) {\n      prevFiber.sibling = _newFiber;\n    } else {\n      if (WIP.tag === SVG) _newFiber.tag = SVG;\n      WIP.child = _newFiber;\n    }\n\n    prevFiber = _newFiber;\n  }\n\n  if (prevFiber) prevFiber.sibling = null;\n}\n\nfunction cloneChildren(fiber) {\n  if (!fiber.child) return;\n  var child = fiber.child;\n  var newChild = child;\n  newChild.op = NOWORK;\n  fiber.child = newChild;\n  newChild.parent = fiber;\n  newChild.sibling = null;\n}\n\nfunction shouldUpdate(a, b) {\n  for (var i in a) {\n    if (!(i in b)) return true;\n  }\n\n  for (var _i in b) {\n    if (a[_i] !== b[_i]) return true;\n  }\n\n  return false;\n}\n\nfunction shouldPlace(fiber) {\n  var p = fiber.parent;\n  if (isFn(p.type)) return p.key && !p.dirty;\n  return fiber.key;\n}\n\nfunction commitWork(fiber) {\n  commitQueue.forEach(function (c) {\n    return c.parent && commit(c);\n  });\n  fiber.done && fiber.done();\n  commitQueue = [];\n  preCommit = null;\n  WIP = null;\n}\n\nfunction commit(fiber) {\n  var _fiber = fiber,\n      op = _fiber.op,\n      parentNode = _fiber.parentNode,\n      node = _fiber.node,\n      ref = _fiber.ref,\n      hooks = _fiber.hooks;\n  if (op === NOWORK) ;else if (op === DELETE) {\n    hooks && hooks.list.forEach(cleanup);\n    cleanupRef(fiber.kids);\n\n    while (isFn(fiber.type)) {\n      fiber = fiber.child;\n    }\n\n    parentNode.removeChild(fiber.node);\n  } else if (isFn(fiber.type)) {\n    if (hooks) {\n      hooks.layout.forEach(cleanup);\n      hooks.layout.forEach(effect);\n      hooks.layout = [];\n      planWork(function () {\n        hooks.effect.forEach(cleanup);\n        hooks.effect.forEach(effect);\n        hooks.effect = [];\n      });\n    }\n  } else if (op === UPDATE) {\n    updateElement(node, fiber.lastProps, fiber.props);\n  } else {\n    var point = fiber.insertPoint ? fiber.insertPoint.node : null;\n    var after = point ? point.nextSibling : parentNode.firstChild;\n    if (after === node) return;\n    if (after === null && node === parentNode.lastChild) return;\n    parentNode.insertBefore(node, after);\n  }\n  refer(ref, node);\n}\n\nfunction createFiber(vnode, op) {\n  return _extends(_extends({}, vnode), {}, {\n    op: op\n  });\n}\n\nvar hashfy = function hashfy(c) {\n  var out = {};\n  isArr(c) ? c.forEach(function (v, i) {\n    return isArr(v) ? v.forEach(function (vi, j) {\n      return out[hs(i, j, vi.key)] = vi;\n    }) : out[hs(i, null, v.key)] = v;\n  }) : out[hs(0, null, c.key)] = c;\n  return out;\n};\n\nfunction refer(ref, dom) {\n  if (ref) isFn(ref) ? ref(dom) : ref.current = dom;\n}\n\nfunction cleanupRef(kids) {\n  for (var k in kids) {\n    var kid = kids[k];\n    refer(kid.ref, null);\n    if (kid.kids) cleanupRef(kid.kids);\n  }\n}\n\nvar cleanup = function cleanup(e) {\n  return e[2] && e[2]();\n};\n\nvar effect = function effect(e) {\n  var res = e[0]();\n  if (isFn(res)) e[2] = res;\n};\n\nvar getCurrentFiber = function getCurrentFiber() {\n  return currentFiber || null;\n};\n\nvar isFn = function isFn(fn) {\n  return typeof fn === 'function';\n};\n\nvar hs = function hs(i, j, k) {\n  return k != null && j != null ? '.' + i + '.' + k : j != null ? '.' + i + '.' + j : k != null ? '.' + k : '.' + i;\n};\n\nvar Fre = {\n  h: h,\n  Fragment: Fragment,\n  render: render,\n  scheduleWork: scheduleWork,\n  useState: useState,\n  useReducer: useReducer,\n  useEffect: useEffect,\n  useMemo: useMemo,\n  useCallback: useCallback,\n  useRef: useRef,\n  memo: memo\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (Fre);\n\n\n//# sourceURL=webpack:///./node_modules/fre/dist/fre.esm.js?");

/***/ })

}]);