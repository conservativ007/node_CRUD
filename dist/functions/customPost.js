"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.post = void 0;
const uuid_1 = require("uuid");
const checkPostRequest_1 = require("./checkPostRequest");
const post = (user, store) => {
    if ((0, checkPostRequest_1.checkPostRequest)(user)) {
        let newUser = {
            "id": (0, uuid_1.v4)(),
            "name": user.name,
            "age": user.age,
            "hobbies": user.hobbies ? user.hobbies : [],
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
