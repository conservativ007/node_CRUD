export const getUserId = (url: string, store: any) => {
  let lastSlah = url.lastIndexOf("/");
  let userId = url.slice(lastSlah + 1);

  if (userId.length !== 36) {
    return {
      code: 400,
      data: "you must enter valid user id!"
    }
  }

  let foundUser = false;
  store.forEach((i: any) => {
    if (i.id === userId) {
      foundUser = i;
      return;
    }
  });

  if (foundUser === false) {
    return {
      data: "user not found",
      code: 404
    };
  }

  return {
    data: foundUser,
    code: 200
  };
}