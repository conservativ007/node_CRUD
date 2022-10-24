"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserId = void 0;
const getUserId = (user, store) => {
    let lastSlah = user.lastIndexOf("/");
    let userId = user.slice(lastSlah + 1);
    if (userId.length !== 36) {
        return {
            code: 400,
            data: "you must enter valid user id!"
        };
    }
    let foundUser = false;
    store.forEach((i) => {
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
