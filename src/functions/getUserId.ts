export const getUserId = (user: string, store: any) => {
  let lastSlah = user.lastIndexOf("/");
  let userId = user.slice(lastSlah + 1);

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