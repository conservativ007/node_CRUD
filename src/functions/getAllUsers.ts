export const getAllUsers = (store: []) => {
  return {
    code: 200,
    data: JSON.stringify(store)
  }
};