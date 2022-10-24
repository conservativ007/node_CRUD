import http from "http";
import { v4 } from "uuid";

import { post } from "./functions/post";
import { getUserId } from "./functions/getUserId";
import { getAllUsers } from "./functions/getAllUsers";
import { checkPutRequest } from "./functions/checkPutRequest";
import { put } from "./functions/put";

// let testObj = {
//   name: "string",
//   age: 22,
//   hobbies: ["web development"]
// }

TestCrud();
function TestCrud() {

  const reqUrl = "/api/users";
  let store: any = [];

  const del = () => { };

  http.createServer((request, response) => {
    if (request.url === reqUrl && request.method === "GET") {
      response.statusCode = 200;
      response.end(JSON.stringify(store));
    }

    if (request.method === "GET" && request.url?.startsWith("/api/users/")) {
      let x: any = getUserId(request.url, store);

      response.statusCode = x.code;
      response.end(JSON.stringify(x.data));
    }

    if (request.url === reqUrl && request.method === "POST") {
      let x: any;

      request.on("data", (chunk) => {
        chunk = JSON.parse(chunk.toString());

        x = post(chunk, store);
        response.statusCode = x.code;
        response.end(JSON.stringify(x.user));
      });
    }

    if (request.method === "PUT") {

      let findUser: any = checkPutRequest(request.url, store);

      if (typeof findUser.code === "number") {
        response.statusCode = findUser.code;
        response.end(JSON.stringify(findUser.data));
      }

      request.on("data", (chunk) => {
        chunk = JSON.parse(chunk.toString());

        let newStore = put(store, chunk, findUser);
        store = newStore;

        response.end(JSON.stringify(chunk));
      });
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
    }

    // response.end();
  }).listen(3000);
}