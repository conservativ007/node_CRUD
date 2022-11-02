import { v4 } from "uuid";
import { checkPostRequest } from "./checkPostRequest";
import { Person } from "./types";


export const post = (user: Person, store: Person[]) => {

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