"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.put = void 0;
function put(store, chunk, findUser) {
    var newStore = store.map(function (item) {
        if (item.id === findUser.id) {
            console.log("map: ", chunk);
            return __assign({ id: findUser.id }, chunk);
        }
        return item;
    });
    return newStore;
    console.log("newStore :", newStore);
    store = newStore;
    console.log("store :", store);
}
exports.put = put;
