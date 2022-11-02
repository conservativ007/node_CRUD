"use strict";
exports.__esModule = true;
var http_1 = require("http");
require("dotenv/config");
var post_1 = require("./functions/post");
var getUserId_1 = require("./functions/getUserId");
var put_1 = require("./functions/put");
var PORT = process.env.PORT || 3000;
var reqUrl = "/api/users";
// {id: string, name: string, age: number, hobbies: []}
var store = [];
var server = http_1["default"].createServer(function (request, response) {
    var _a;
    if (request.url === reqUrl && request.method === "GET") {
        response.statusCode = 200;
        response.end(JSON.stringify(store));
        return;
    }
    if (request.method === "GET" && ((_a = request.url) === null || _a === void 0 ? void 0 : _a.startsWith("/api/users/"))) {
        var x = (0, getUserId_1.getUserId)(request.url, store);
        response.statusCode = x.code;
        response.end(JSON.stringify(x.data));
        return;
    }
    if (request.url === reqUrl && request.method === "POST") {
        var x_1;
        request.on("data", function (chunk) {
            chunk = JSON.parse(chunk.toString());
            x_1 = (0, post_1.post)(chunk, store);
            response.statusCode = x_1.code;
            response.end(JSON.stringify(x_1.user));
        });
        return;
    }
    if (request.method === "PUT") {
        var url = request.url;
        var findUser_1 = (0, getUserId_1.getUserId)(url, store);
        if (typeof findUser_1.data === "string") {
            response.statusCode = findUser_1.code;
            response.end(JSON.stringify(findUser_1.data));
        }
        request.on("data", function (chunk) {
            chunk = JSON.parse(chunk.toString());
            var newStore = (0, put_1.put)(store, chunk, findUser_1.data);
            store = newStore;
            response.end(JSON.stringify(chunk));
        });
        return;
    }
    if (request.method === "DELETE") {
        var url = request.url;
        var user_1 = (0, getUserId_1.getUserId)(url, store);
        if (typeof user_1.data === "string") {
            response.statusCode = user_1.data.code;
            response.end(JSON.stringify(user_1.data));
        }
        var filteredStore = store.filter(function (i) { return i.id !== user_1.data.id; });
        store = filteredStore;
        response.statusCode = 204;
        response.end();
        return;
    }
    response.statusCode = 404;
    response.end("this page wasn't found");
});
// .listen(PORT ? PORT : 3000);
server.listen(PORT || 3000, function () {
    console.log("listening for requests on port ".concat(PORT));
});
