import { User } from "../models/user.models";
import { Users } from "./users";

export class UserDatabase {
  public list() {
    return [...Users];
  }

  public get(id: string) {
    return Users.find((user) => user.id === id);
  }

  public getByCpf(cpf: string) {
    return Users.find((user) => user.cpf === cpf);
  }

  public getIndex(id: string) {
    return Users.findIndex((user) => user.id === id);
  }

  public create(user: User) {
    Users.push(user);
  }

  public delete(index: number) {
    Users.splice(index, 1);
  }
}
