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