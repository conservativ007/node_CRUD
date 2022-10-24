import http from "http";
import { v4 } from "uuid";

import { post } from "./functions/post";
import { getUserId } from "./functions/getUserId";

// let testObj = {
//   name: "string",
//   age: 22,
//   hobbies: ["web development"]
// }
TestCrud();
function TestCrud() {

  const reqUrl = "/api/users";
  const store: [] = [];

  const getAllUsers = () => {
    return {
      code: 200,
      data: JSON.stringify(store)
    }
  };

  const put = () => { };

  const del = () => { };

  http.createServer((request, response) => {
    if (request.url === reqUrl && request.method === "GET") {
      response.statusCode = getAllUsers().code;
      response.end(getAllUsers().data);
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

    // response.end();
  }).listen(3000);
}