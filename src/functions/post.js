"use strict";
exports.__esModule = true;
exports.post = void 0;
var uuid_1 = require("uuid");
var checkPostRequest_1 = require("./checkPostRequest");
var post = function (user, store) {
    if ((0, checkPostRequest_1.checkPostRequest)(user) === true) {
        var newUser = {
            "id": (0, uuid_1.v4)(),
            "name": user.name,
            "age": user.age,
            "hobbies": user.hobbies ? user.hobbies : []
        };
        store.push(newUser);
        return { "user": newUser, "code": 201 };
    }
    return {
        "user": "You must required all the fields",
        "code": 400
    };
};
exports.post = post;
