"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.put = void 0;
function put(store, chunk, findUser) {
    let newStore = store.map((item) => {
        if (item.id === findUser.id) {
            console.log("map: ", chunk);
            return Object.assign({ id: findUser.id }, chunk);
        }
        return item;
    });
    return newStore;
    console.log("newStore :", newStore);
    store = newStore;
    console.log("store :", store);
}
exports.put = put;
