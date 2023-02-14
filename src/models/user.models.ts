import { v4 as createUuid } from "uuid";
import { cpf as cpfValidator } from "cpf-cnpj-validator";
import { Transaction } from "./transactions.models";

export class User {
  private _id: string;
  private _transactions?: Transaction[];

  constructor(
    private _name: string,
    private _age: number,
    private _email: string,
    private _cpf: string
  ) {
    this._id = createUuid();
  }

  public get id() {
    return this._id;
  }

  public get transactions() {
    return this._transactions || [];
  }

  public set transactions(transactions: Transaction[]) {
    this._transactions = transactions;
  }

  public get name() {
    return this._name;
  }

  public set name(name: string) {
    this._name = name;
  }

  public get age() {
    return this._age;
  }

  public set age(age: number) {
    this._age = age;
  }

  public get email() {
    return this._email;
  }

  public set email(email: string) {
    this._email = email;
  }

  public get cpf() {
    return this._cpf;
  }

  public set cpf(cpf: string) {
    this._cpf = cpf;
  }

  public toJson() {
    return {
      id: this._id,
      nome: this._name,
      idade: this._age,
      email: this._email,
      cpf: cpfValidator.format(this._cpf.toString().padStart(11, "0")),
    };
  }
}
