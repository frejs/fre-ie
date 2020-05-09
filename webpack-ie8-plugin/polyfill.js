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
        return false;
    }
}

var supportsDescriptors = origDefineProperty && arePropertyDescriptorsSupported()

if (!supportsDescriptors) {
    Object.defineProperty = function (a, b, c) {
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
