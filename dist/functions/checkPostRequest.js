"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkPostRequest = void 0;
function checkPostRequest(user) {
    let userName = false;
    let age = false;
    let hobbies = false;
    if (user.name && user.name.length > 3)
        userName = true;
    if (user.age && user.age > 0)
        age = true;
    if (user.hobbies && Array.isArray(user.hobbies))
        hobbies = true;
    if (userName === true && age === true && hobbies === true)
        return true;
    return false;
}
exports.checkPostRequest = checkPostRequest;
