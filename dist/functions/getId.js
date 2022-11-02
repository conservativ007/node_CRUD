"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getId = void 0;
const uuid_1 = require("uuid");
function getId(person) {
    return Object.assign({ id: (0, uuid_1.v4)() }, person);
}
exports.getId = getId;
