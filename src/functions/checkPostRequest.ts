export function checkPostRequest(user: { name: string, age: number, hobbies: [string] }) {
  let userName = false;
  let age = false;
  let hobbies = false;

  if (user.name && user.name.length > 3) userName = true;
  if (user.age && user.age > 0) age = true;
  if (user.hobbies && Array.isArray(user.hobbies)) hobbies = true;

  if (userName === true && age === true && hobbies === true) return true;
  return false;
}