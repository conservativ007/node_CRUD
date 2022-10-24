export function put(store: [], chunk: {}, findUser: { id: string }) {
  let newStore: any = store.map((item: { id: string, name: string, age: number, hobbies: [] }) => {
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

  console.log("newStore :", newStore);

  store = newStore;

  console.log("store :", store);
}