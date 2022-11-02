"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
require("dotenv/config");
const post_1 = require("./functions/post");
const getUserId_1 = require("./functions/getUserId");
const put_1 = require("./functions/put");
const PORT = process.env.PORT || 3000;
const reqUrlOne = "/api/users";
const reqUrlTwo = "/api/users/";
let store = [];
const server = http_1.default.createServer((request, response) => {
    var _a;
    if (request.url === reqUrlOne && request.method === "GET") {
        response.statusCode = 200;
        response.end(JSON.stringify(store));
        return;
    }
    if (request.method === "GET" && ((_a = request.url) === null || _a === void 0 ? void 0 : _a.startsWith("/api/users/"))) {
        if (request.url === reqUrlTwo) {
            response.end(JSON.stringify(store));
            return;
        }
        let x = (0, getUserId_1.getUserId)(request.url, store);
        response.statusCode = x.code;
        response.end(JSON.stringify(x.data));
        return;
    }
    if (request.url === reqUrlTwo && request.method === "POST") {
        let newPerson;
        let x;
        request.on("data", (chunk) => {
            newPerson = JSON.parse(chunk.toString());
            x = (0, post_1.post)(newPerson, store);
            response.statusCode = x.code;
            response.end(JSON.stringify(x.user));
        });
        return;
    }
    if (request.method === "PUT") {
        let url = request.url;
        let findUser = (0, getUserId_1.getUserId)(url, store);
        if (typeof findUser.data === "string") {
            response.statusCode = findUser.code;
            response.end(JSON.stringify(findUser.data));
        }
        request.on("data", (chunk) => {
            chunk = JSON.parse(chunk.toString());
            let newStore = (0, put_1.put)(store, chunk, findUser.data);
            store = newStore;
            response.end(JSON.stringify(chunk));
        });
        return;
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
        return;
    }
    response.statusCode = 404;
    response.end("this page wasn't found");
});
server.listen(PORT || 3000, () => {
    console.log(`listening for requests on port ${PORT}`);
});
