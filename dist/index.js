"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const post_1 = require("./functions/post");
const getUserId_1 = require("./functions/getUserId");
const checkPutRequest_1 = require("./functions/checkPutRequest");
const put_1 = require("./functions/put");
// let testObj = {
//   name: "string",
//   age: 22,
//   hobbies: ["web development"]
// }
TestCrud();
function TestCrud() {
    const reqUrl = "/api/users";
    let store = [];
    const del = () => { };
    http_1.default.createServer((request, response) => {
        var _a;
        if (request.url === reqUrl && request.method === "GET") {
            response.statusCode = 200;
            response.end(JSON.stringify(store));
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
        if (request.method === "PUT") {
            let findUser = (0, checkPutRequest_1.checkPutRequest)(request.url, store);
            if (typeof findUser.code === "number") {
                response.statusCode = findUser.code;
                response.end(JSON.stringify(findUser.data));
            }
            request.on("data", (chunk) => {
                chunk = JSON.parse(chunk.toString());
                let newStore = (0, put_1.put)(store, chunk, findUser);
                store = newStore;
                response.end(JSON.stringify(chunk));
            });
        }
        if (request.method === "DELETE") {
            let url = request.url;
            let user = (0, getUserId_1.getUserId)(url, store);
            if (typeof user.data === "string") {
                response.statusCode = user.data.code;
                response.end(JSON.stringify(user.data));
            }
            let filteredStore = store.filter((i) => i.id !== user.data.id);
            store = filteredStore;
            response.statusCode = 204;
            response.end();
        }
        // response.end();
    }).listen(3000);
}
