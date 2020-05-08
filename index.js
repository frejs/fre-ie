!window.addEventListener &&
  (function (WindowPrototype, DocumentPrototype, ElementPrototype, addEventListener, removeEventListener, dispatchEvent, registry) {
    WindowPrototype[addEventListener] = DocumentPrototype[addEventListener] = ElementPrototype[addEventListener] = function (type, listener) {
      var target = this

      registry.unshift([
        target,
        type,
        listener,
        function (event) {
          event.currentTarget = target
          event.preventDefault = function () {
            event.returnValue = false
          }
          event.stopPropagation = function () {
            event.cancelBubble = true
          }
          event.target = event.srcElement || target

          listener.call(target, event)
        },
      ])

      this.attachEvent('on' + type, registry[0][3])
    }

    WindowPrototype[removeEventListener] = DocumentPrototype[removeEventListener] = ElementPrototype[removeEventListener] = function (
      type,
      listener
    ) {
      for (var index = 0, register; (register = registry[index]); ++index) {
        if (register[0] == this && register[1] == type && register[2] == listener) {
          return this.detachEvent('on' + type, registry.splice(index, 1)[0][3])
        }
      }
    }

    WindowPrototype[dispatchEvent] = DocumentPrototype[dispatchEvent] = ElementPrototype[dispatchEvent] = function (eventObject) {
      return this.fireEvent('on' + eventObject.type, eventObject)
    }
  })(Window.prototype, HTMLDocument.prototype, Element.prototype, 'addEventListener', 'removeEventListener', 'dispatchEvent', [])

document.createTextNode = function (data) {
  const text = document.createElement('x-text')
  text.innerText = data

  return text
}

if (!('performance' in window)) {
  window.performance = {}
}
var perf = window.performance
window.performance.now =
  Date.now ||
  function () {
    return new Date().getTime()
  }

if (!Array.isArray) {
  Array.isArray = (function (toString) {
    var $ = toString.call([])
    return function isArray(object) {
      return toString.call(object) === $
    }
  })({}.toString)
}

if (!Array.prototype.forEach) {
  Array.prototype.forEach = function (fn, scope) {
    var i, len
    for (i = 0, len = this.length; i < len; ++i) {
      if (i in this) {
        fn.call(scope, this[i], i, this)
      }
    }
  }
}

if (typeof Function.prototype.bind !== 'function') {
  Function.prototype.bind = function () {
    var fn = this
    var args = arguments
    return function () {
      return fn.call.apply(fn, args)
    }
  }
}

if (!SVGElement) {
  SVGElement = function () {
    // 暂时不支持 svg
  }
}

if (!Array.prototype.some) {
  Array.prototype.some = function (fun) {
    if (this === void 0 || this === null) {
      throw new TypeError()
    }

    var t = Object(this)
    var len = t.length >>> 0
    if (typeof fun !== 'function') {
      throw new TypeError()
    }

    var thisArg = arguments.length >= 2 ? arguments[1] : void 0
    for (var i = 0; i < len; i++) {
      if (i in t && fun.call(thisArg, t[i], i, t)) {
        return true
      }
    }
    return false
  }
}
