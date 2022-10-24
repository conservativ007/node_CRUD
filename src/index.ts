import http from "http";

import { post } from "./functions/post";
import { getUserId } from "./functions/getUserId";
import { put } from "./functions/put";

import dotenv from "dotenv";
const PORT = dotenv.config().parsed?.PORT;

const reqUrl = "/api/users";
let store: any = [];

http.createServer((request, response) => {
  if (request.url === reqUrl && request.method === "GET") {
    response.statusCode = 200;
    response.end(JSON.stringify(store));
    return;
  }

  if (request.method === "GET" && request.url?.startsWith("/api/users/")) {
    let x: any = getUserId(request.url, store);

    response.statusCode = x.code;
    response.end(JSON.stringify(x.data));
    return;
  }

  if (request.url === reqUrl && request.method === "POST") {
    let x: any;

    request.on("data", (chunk) => {
      chunk = JSON.parse(chunk.toString());

      x = post(chunk, store);
      response.statusCode = x.code;
      response.end(JSON.stringify(x.user));
    });
    return;
  }

  if (request.method === "PUT") {

    let url: any = request.url;
    let findUser: any = getUserId(url, store);

    if (typeof findUser.data === "string") {
      response.statusCode = findUser.code;
      response.end(JSON.stringify(findUser.data));
    }

    request.on("data", (chunk) => {
      chunk = JSON.parse(chunk.toString());

      let newStore = put(store, chunk, findUser.data);
      store = newStore;

      response.end(JSON.stringify(chunk));
    });
    return;
  }

  if (request.method === "DELETE") {
    let url: any = request.url;
    let user: any = getUserId(url, store);

    if (typeof user.data === "string") {
      response.statusCode = user.data.code;
      response.end(JSON.stringify(user.data));
    }

    let filteredStore = store.filter((i: any) => i.id !== user.data.id);
    store = filteredStore;

    response.statusCode = 204;
    response.end();
    return;
  }

  response.statusCode = 404;
  response.end("this page wasn't found");
}).listen(PORT ? PORT : 3000);
