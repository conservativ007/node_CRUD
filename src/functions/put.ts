import { Person } from "./types";

export function put(store: Person[], chunk: {}, findUser: { id: string }) {
  let newStore: any = store.map((item: Person) => {

    if (item.id === findUser.id) {
      console.log("map: ", chunk);
      return {
        id: findUser.id,
        ...chunk
      }
    }

    return item;
  });
  return newStore;
}