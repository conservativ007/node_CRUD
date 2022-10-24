"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const post_1 = require("./functions/post");
const getUserId_1 = require("./functions/getUserId");
const put_1 = require("./functions/put");
const dotenv_1 = __importDefault(require("dotenv"));
const PORT = (_a = dotenv_1.default.config().parsed) === null || _a === void 0 ? void 0 : _a.PORT;
const reqUrl = "/api/users";
let store = [];
http_1.default.createServer((request, response) => {
    var _a;
    if (request.url === reqUrl && request.method === "GET") {
        response.statusCode = 200;
        response.end(JSON.stringify(store));
        return;
    }
    if (request.method === "GET" && ((_a = request.url) === null || _a === void 0 ? void 0 : _a.startsWith("/api/users/"))) {
        let x = (0, getUserId_1.getUserId)(request.url, store);
        response.statusCode = x.code;
        response.end(JSON.stringify(x.data));
        return;
    }
    if (request.url === reqUrl && request.method === "POST") {
        let x;
        request.on("data", (chunk) => {
            chunk = JSON.parse(chunk.toString());
            x = (0, post_1.post)(chunk, store);
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
}).listen(PORT ? PORT : 3000);
