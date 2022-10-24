export const checkPutRequest = (url: any, store: any) => {

  let lastSlashIndex: any = url.lastIndexOf("/");
  let userId: any = url.slice(lastSlashIndex + 1);

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

  return foundUser;
};