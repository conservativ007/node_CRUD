"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsers = void 0;
const getAllUsers = (store) => {
    return {
        code: 200,
        data: JSON.stringify(store)
    };
};
exports.getAllUsers = getAllUsers;
