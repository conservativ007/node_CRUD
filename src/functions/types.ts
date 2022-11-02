export type Person = {
  id?: number | string,
  name: string,
  age: number | string,
  hobbies: string[]
}

export type ServerAnswer = {
  code: number,
  data: string | Person
}