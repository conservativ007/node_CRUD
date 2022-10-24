"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const post_1 = require("./functions/post");
const getUserId_1 = require("./functions/getUserId");
// let testObj = {
//   name: "string",
//   age: 22,
//   hobbies: ["web development"]
// }
TestCrud();
function TestCrud() {
    const reqUrl = "/api/users";
    const store = [];
    const getAllUsers = () => {
        return {
            code: 200,
            data: JSON.stringify(store)
        };
    };
    const put = () => { };
    const del = () => { };
    http_1.default.createServer((request, response) => {
        var _a;
        if (request.url === reqUrl && request.method === "GET") {
            response.statusCode = getAllUsers().code;
            response.end(getAllUsers().data);
        }
        if (request.method === "GET" && ((_a = request.url) === null || _a === void 0 ? void 0 : _a.startsWith("/api/users/"))) {
            let x = (0, getUserId_1.getUserId)(request.url, store);
            response.statusCode = x.code;
            response.end(JSON.stringify(x.data));
        }
        if (request.url === reqUrl && request.method === "POST") {
            let x;
            request.on("data", (chunk) => {
                chunk = JSON.parse(chunk.toString());
                x = (0, post_1.post)(chunk, store);
                response.statusCode = x.code;
                response.end(JSON.stringify(x.user));
            });
        }
        // response.end();
    }).listen(3000);
}
