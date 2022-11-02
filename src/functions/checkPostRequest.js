"use strict";
exports.__esModule = true;
exports.checkPostRequest = void 0;
function checkPostRequest(user) {
    var userName = false;
    var age = false;
    var hobbies = false;
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
