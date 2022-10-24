import { v4 } from "uuid";
import { checkPostRequest } from "./checkPostRequest";


export const post = (user: { name: string, age: number, hobbies: [string] }, store: any) => {

  if (checkPostRequest(user) === true) {

    let newUser = {
      "id": v4(),
      "name": user.name,
      "age": user.age,
      "hobbies": user.hobbies ? user.hobbies : [],
    }

    store.push(newUser);
    return { "user": newUser, "code": 201 };
  }

  return {
    "user": "You must required all the fields",
    "code": 400
  }
};