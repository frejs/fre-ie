var freie = (function (exports) {
  'use strict';

  !window.addEventListener && function (WindowPrototype, DocumentPrototype, ElementPrototype, addEventListener, removeEventListener, dispatchEvent, registry) {
    WindowPrototype[addEventListener] = DocumentPrototype[addEventListener] = ElementPrototype[addEventListener] = function (type, listener) {
      var target = this;

      registry.unshift([target, type, listener, function (event) {
        event.currentTarget = target;
        event.preventDefault = function () {
          event.returnValue = false;
        };
        event.stopPropagation = function () {
          event.cancelBubble = true;
        };
        event.target = event.srcElement || target;

        listener.call(target, event);
      }]);

      this.attachEvent('on' + type, registry[0][3]);
    };

    WindowPrototype[removeEventListener] = DocumentPrototype[removeEventListener] = ElementPrototype[removeEventListener] = function (type, listener) {
      for (var index = 0, register; register = registry[index]; ++index) {
        if (register[0] == this && register[1] == type && register[2] == listener) {
          return this.detachEvent('on' + type, registry.splice(index, 1)[0][3]);
        }
      }
    };

    WindowPrototype[dispatchEvent] = DocumentPrototype[dispatchEvent] = ElementPrototype[dispatchEvent] = function (eventObject) {
      return this.fireEvent('on' + eventObject.type, eventObject);
    };
  }(Window.prototype, HTMLDocument.prototype, Element.prototype, 'addEventListener', 'removeEventListener', 'dispatchEvent', []);

  document.createTextNode = function (data) {
    var text = document.createElement('x-text');
    text.innerText = data;

    return text;
  };

  if (!('performance' in window)) {
    window.performance = {};
  }
  var perf = window.performance;
  window.performance.now = perf.now || perf.mozNow || perf.msNow || perf.oNow || perf.webkitNow || Date.now || function () {
    return new Date().getTime();
  };

  if (!Array.isArray) {
    Array.isArray = function (toString) {
      var $ = toString.call([]);
      return function isArray(object) {
        return toString.call(object) === $;
      };
    }({}.toString);
  }

  if (!Array.prototype.forEach) {
    Array.prototype.forEach = function (fn, scope) {
      var i, len;
      for (i = 0, len = this.length; i < len; ++i) {
        if (i in this) {
          fn.call(scope, this[i], i, this);
        }
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

  if (!SVGElement) {
    SVGElement = function SVGElement() {
      // 暂时不支持 svg
    };
  }

  if (!Array.prototype.some) {
    Array.prototype.some = function (fun) {
      if (this === void 0 || this === null) {
        throw new TypeError();
      }

      var t = Object(this);
      var len = t.length >>> 0;
      if (typeof fun !== 'function') {
        throw new TypeError();
      }

      var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
      for (var i = 0; i < len; i++) {
        if (i in t && fun.call(thisArg, t[i], i, t)) {
          return true;
        }
      }

      return false;
    };
  }

  var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  var slicedToArray = function () {
    function sliceIterator(arr, i) {
      var _arr = [];
      var _n = true;
      var _d = false;
      var _e = undefined;

      try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);

          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"]) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }

      return _arr;
    }

    return function (arr, i) {
      if (Array.isArray(arr)) {
        return arr;
      } else if (Symbol.iterator in Object(arr)) {
        return sliceIterator(arr, i);
      } else {
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
      }
    };
  }();

  var toConsumableArray = function (arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

      return arr2;
    } else {
      return Array.from(arr);
    }
  };

  var isArr = Array.isArray;
  var isStr = function isStr(s) {
    return typeof s === 'string' || typeof s === 'number';
  };
  var MEMO = 0;

  function h(type, attrs) {
    var props = attrs || {};
    var key = props.key || null;
    var ref = props.ref || null;
    var children = [];

    for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key];
    }

    for (var i = 0; i < args.length; i++) {
      var vnode = args[i];
      if (vnode == null || vnode === true || vnode === false) ;else if (isStr(vnode)) {
        children.push(createText(vnode));
      } else {
        while (isArr(vnode) && vnode.some(function (v) {
          return isArr(v);
        })) {
          var _ref;

          vnode = (_ref = []).concat.apply(_ref, toConsumableArray(vnode));
        }
        children.push(vnode);
      }
    }

    if (children.length) {
      props.children = children.length === 1 ? children[0] : children;
    }

    delete props.key;
    delete props.ref;

    return { type: type, props: props, key: key, ref: ref };
  }

  function createText(vnode) {
    return { type: 'text', props: { innerText: vnode } };
  }

  function updateElement(dom, oldProps, newProps) {
    for (var name in _extends({}, oldProps, newProps)) {
      var oldValue = oldProps[name];
      var newValue = newProps[name];

      if (oldValue == newValue || name === 'children') ;else if (name === 'style') {
        for (var k in _extends({}, oldValue, newValue)) {
          if (!(oldValue && newValue && oldValue[k] === newValue[k])) {
            dom[name][k] = newValue && newValue[k] || '';
          }
        }
      } else if (name[0] === 'o' && name[1] === 'n') {
        name = name.slice(2).toLowerCase();
        if (oldValue) dom.removeEventListener(name, oldValue);
        dom.addEventListener(name, newValue);
      } else if (name in dom && !(dom instanceof SVGElement)) {
        dom[name] = newValue == null ? '' : newValue;
      } else if (newValue == null || newValue === false) {
        dom.removeAttribute(name);
      } else {
        dom.setAttribute(name, newValue);
      }
    }
  }

  function createElement(fiber) {
    var dom = fiber.type === 'text' ? document.createTextNode(fiber.props.innerText) : fiber.tag === SVG ? document.createElementNS('http://www.w3.org/2000/svg', fiber.type) : document.createElement(fiber.type);
    updateElement(dom, {}, fiber.props);
    return dom;
  }

  var cursor = 0;

  function resetCursor() {
    cursor = 0;
  }

  function useState(initState) {
    return useReducer(null, initState);
  }

  function useReducer(reducer, initState) {
    var _getHook = getHook(cursor++),
        _getHook2 = slicedToArray(_getHook, 2),
        hook = _getHook2[0],
        current = _getHook2[1];

    var setter = function setter(value) {
      var newValue = reducer ? reducer(hook[0], value) : isFn(value) ? value(hook[0]) : value;
      if (newValue !== hook[0]) {
        hook[0] = newValue;
        scheduleWork(current);
      }
    };

    if (hook.length) {
      return [hook[0], setter];
    } else {
      hook[0] = initState;
      return [initState, setter];
    }
  }

  function getHook(cursor) {
    var current = getCurrentFiber();
    var hooks = current.hooks || (current.hooks = { list: [], effect: [], layout: [] });
    if (cursor >= hooks.list.length) {
      hooks.list.push([]);
    }
    return [hooks.list[cursor], current];
  }

  function push(heap, node) {
    var i = heap.length;
    heap.push(node);
    siftUp(heap, node, i);
  }

  function pop(heap) {
    var first = heap[0];
    if (!first) return null;
    var last = heap.pop();
    if (last !== first) {
      heap[0] = last;
      siftDown(heap, last, 0);
    }
    return first;
  }

  function siftUp(heap, node, i) {
    while (i > 0) {
      var pi = i - 1 >>> 1;
      var parent = heap[pi];
      if (cmp(parent, node) <= 0) return;
      heap[pi] = node;
      heap[i] = parent;
      i = pi;
    }
  }

  function siftDown(heap, node, i) {
    for (;;) {
      var li = i * 2 + 1;
      var left = heap[li];
      if (li >= heap.length) return;
      var ri = li + 1;
      var right = heap[ri];
      var ci = ri < heap.length && cmp(right, left) < 0 ? ri : li;
      var child = heap[ci];
      if (cmp(child, node) > 0) return;
      heap[ci] = node;
      heap[i] = child;
      i = ci;
    }
  }

  function cmp(a, b) {
    return a.dueTime - b.dueTime;
  }

  function peek(heap) {
    return heap[0] || null;
  }

  var taskQueue = [];
  var currentCallback = null;
  var frameDeadline = 0;
  var frameLength = 1000 / 60;

  function scheduleCallback(callback) {
    var currentTime = getTime();
    var startTime = currentTime;
    var timeout = 3000;
    var dueTime = startTime + timeout;

    var newTask = {
      callback: callback,
      startTime: startTime,
      dueTime: dueTime
    };

    push(taskQueue, newTask);
    currentCallback = flush;
    planWork();
  }

  function flush(iniTime) {
    var currentTime = iniTime;
    var currentTask = peek(taskQueue);

    while (currentTask) {
      var didout = currentTask.dueTime <= currentTime;
      if (!didout && shouldYeild()) break;

      var callback = currentTask.callback;
      currentTask.callback = null;

      var next = callback(didout);
      next ? currentTask.callback = next : pop(taskQueue);

      currentTask = peek(taskQueue);
      currentTime = getTime();
    }

    return !!currentTask;
  }

  function flushWork() {
    if (currentCallback) {
      var currentTime = getTime();
      frameDeadline = currentTime + frameLength;
      var more = currentCallback(currentTime);
      more ? planWork() : currentCallback = null;
    }
  }

  var planWork = function () {
    if (typeof MessageChannel !== 'undefined') {
      var _ref2 = new MessageChannel(),
          port1 = _ref2.port1,
          port2 = _ref2.port2;

      port1.onmessage = flushWork;
      return function (cb) {
        return cb ? requestAnimationFrame(cb) : port2.postMessage(null);
      };
    }
    return function (cb) {
      return setTimeout(cb || flushWork);
    };
  }();

  function shouldYeild() {
    return getTime() >= frameDeadline;
  }

  var getTime = function getTime() {
    return performance.now();
  };

  var NOWORK = 0;
  var PLACE = 1;
  var UPDATE = 2;
  var DELETE = 3;

  var SVG = 4;

  var preCommit = null;
  var currentFiber = null;
  var WIP = null;
  var updateQueue = [];
  var commitQueue = [];

  function render(vnode, node, done) {
    var rootFiber = {
      node: node,
      props: { children: vnode },
      done: done
    };
    scheduleWork(rootFiber);
  }

  function scheduleWork(fiber) {
    if (!fiber.dirty && (fiber.dirty = true)) {
      updateQueue.push(fiber);
    }
    scheduleCallback(reconcileWork);
  }

  function reconcileWork(didout) {
    if (!WIP) WIP = updateQueue.shift();
    while (WIP && (!shouldYeild() || didout)) {
      WIP = reconcile(WIP);
    }
    if (!didout && WIP) {
      return reconcileWork.bind(null);
    }
    if (preCommit) commitWork(preCommit);
    return null;
  }

  function reconcile(WIP) {
    WIP.parentNode = getParentNode(WIP);
    isFn(WIP.type) ? updateHOOK(WIP) : updateHost(WIP);
    WIP.dirty = WIP.dirty ? false : 0;
    WIP.oldProps = WIP.props;
    commitQueue.push(WIP);

    if (WIP.child) return WIP.child;
    while (WIP) {
      if (!preCommit && WIP.dirty === false) {
        preCommit = WIP;
        return null;
      }
      if (WIP.sibling) {
        return WIP.sibling;
      }
      WIP = WIP.parent;
    }
  }

  function updateHOOK(WIP) {
    if (WIP.type.tag === MEMO && WIP.dirty == 0 && !shouldUpdate(WIP.oldProps, WIP.props)) {
      cloneChildren(WIP);
      return;
    }
    currentFiber = WIP;
    WIP.type.fiber = WIP;
    resetCursor();
    var children = WIP.type(WIP.props);
    if (isStr(children)) {
      children = createText(children);
    }
    reconcileChildren(WIP, children);
  }

  function updateHost(WIP) {
    if (!WIP.node) {
      if (WIP.type === 'svg') WIP.tag = SVG;
      WIP.node = createElement(WIP);
    }
    var p = WIP.parentNode || {};
    WIP.insertPoint = p.last || null;
    p.last = WIP;
    WIP.node.last = null;
    reconcileChildren(WIP, WIP.props.children);
  }

  function getParentNode(fiber) {
    while (fiber = fiber.parent) {
      if (!isFn(fiber.type)) return fiber.node;
    }
  }

  function reconcileChildren(WIP, children) {
    if (!children) return;
    delete WIP.child;
    var oldFibers = WIP.kids;
    var newFibers = WIP.kids = hashfy(children);

    var reused = {};

    for (var k in oldFibers) {
      var newFiber = newFibers[k];
      var oldFiber = oldFibers[k];

      if (newFiber && newFiber.type === oldFiber.type) {
        reused[k] = oldFiber;
      } else {
        oldFiber.op = DELETE;
        commitQueue.push(oldFiber);
      }
    }

    var prevFiber = null;
    var alternate = null;

    for (var _k in newFibers) {
      var _newFiber = newFibers[_k];
      var _oldFiber = reused[_k];

      if (_oldFiber) {
        alternate = createFiber(_oldFiber, UPDATE);
        _newFiber.op = UPDATE;
        _newFiber = _extends({}, alternate, _newFiber);
        _newFiber.lastProps = alternate.props;
        if (shouldPlace(_newFiber)) {
          _newFiber.op = PLACE;
        }
      } else {
        _newFiber = createFiber(_newFiber, PLACE);
      }

      newFibers[_k] = _newFiber;
      _newFiber.parent = WIP;

      if (prevFiber) {
        prevFiber.sibling = _newFiber;
      } else {
        if (WIP.tag === SVG) _newFiber.tag = SVG;
        WIP.child = _newFiber;
      }
      prevFiber = _newFiber;
    }

    if (prevFiber) prevFiber.sibling = null;
  }

  function cloneChildren(fiber) {
    if (!fiber.child) return;
    var child = fiber.child;
    var newChild = child;
    newChild.op = NOWORK;
    fiber.child = newChild;
    newChild.parent = fiber;
    newChild.sibling = null;
  }

  function shouldUpdate(a, b) {
    for (var i in a) {
      if (!(i in b)) return true;
    }for (var _i in b) {
      if (a[_i] !== b[_i]) return true;
    }return false;
  }

  function shouldPlace(fiber) {
    var p = fiber.parent;
    if (isFn(p.type)) return p.key && !p.dirty;
    return fiber.key;
  }

  function commitWork(fiber) {
    commitQueue.forEach(function (c) {
      return c.parent && commit(c);
    });
    fiber.done && fiber.done();
    commitQueue = [];
    preCommit = null;
    WIP = null;
  }

  function commit(fiber) {
    var _fiber = fiber,
        op = _fiber.op,
        parentNode = _fiber.parentNode,
        node = _fiber.node,
        ref = _fiber.ref,
        hooks = _fiber.hooks;

    if (op === NOWORK) ;else if (op === DELETE) {
      hooks && hooks.list.forEach(cleanup);
      cleanupRef(fiber.kids);
      while (isFn(fiber.type)) {
        fiber = fiber.child;
      }parentNode.removeChild(fiber.node);
    } else if (isFn(fiber.type)) {
      if (hooks) {
        hooks.layout.forEach(cleanup);
        hooks.layout.forEach(effect);
        hooks.layout = [];
        planWork(function () {
          hooks.effect.forEach(cleanup);
          hooks.effect.forEach(effect);
          hooks.effect = [];
        });
      }
    } else if (op === UPDATE) {
      updateElement(node, fiber.lastProps, fiber.props);
    } else {
      var point = fiber.insertPoint ? fiber.insertPoint.node : null;
      var after = point ? point.nextSibling : parentNode.firstChild;
      if (after === node) return;
      if (after === null && node === parentNode.lastChild) return;
      parentNode.insertBefore(node, after);
    }
    refer(ref, node);
  }

  function createFiber(vnode, op) {
    return _extends({}, vnode, { op: op });
  }

  var hashfy = function hashfy(c) {
    var out = {};
    isArr(c) ? c.forEach(function (v, i) {
      return isArr(v) ? v.forEach(function (vi, j) {
        return out[hs(i, j, vi.key)] = vi;
      }) : out[hs(i, null, v.key)] = v;
    }) : out[hs(0, null, c.key)] = c;
    return out;
  };

  function refer(ref, dom) {
    if (ref) isFn(ref) ? ref(dom) : ref.current = dom;
  }

  function cleanupRef(kids) {
    for (var k in kids) {
      var kid = kids[k];
      refer(kid.ref, null);
      if (kid.kids) cleanupRef(kid.kids);
    }
  }

  var cleanup = function cleanup(e) {
    return e[2] && e[2]();
  };

  var effect = function effect(e) {
    var res = e[0]();
    if (isFn(res)) e[2] = res;
  };

  var getCurrentFiber = function getCurrentFiber() {
    return currentFiber || null;
  };

  var isFn = function isFn(fn) {
    return typeof fn === 'function';
  };

  var hs = function hs(i, j, k) {
    return k != null && j != null ? '.' + i + '.' + k : j != null ? '.' + i + '.' + j : k != null ? '.' + k : '.' + i;
  };

  function App(props) {
    var _useState = useState(0),
        _useState2 = slicedToArray(_useState, 2),
        count = _useState2[0],
        setCount = _useState2[1];

    return h(
      'div',
      null,
      count,
      ' - ',
      props.foo,
      h(
        'button',
        { onClick: function onClick() {
            return setCount(count + 1);
          } },
        '+'
      )
    );
  }

  function begin(target) {
    render(h(App, { foo: 'bar' }), document.getElementById(target));
  }

  exports.begin = begin;

  return exports;

}({}));
//# sourceMappingURL=freie.js.map
