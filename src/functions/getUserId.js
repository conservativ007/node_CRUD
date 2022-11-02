"use strict";
exports.__esModule = true;
exports.getUserId = void 0;
var getUserId = function (url, store) {
    var lastSlah = url.lastIndexOf("/");
    var userId = url.slice(lastSlah + 1);
    if (userId.length !== 36) {
        return {
            code: 400,
            data: "you must enter valid user id!"
        };
    }
    var foundUser = false;
    store.forEach(function (i) {
        if (i.id === userId) {
            foundUser = i;
            return;
        }
    });
    if (foundUser === false) {
        return {
            data: "user not found",
            code: 404
        };
    }
    return {
        data: foundUser,
        code: 200
    };
};
exports.getUserId = getUserId;
