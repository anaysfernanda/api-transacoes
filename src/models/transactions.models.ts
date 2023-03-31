import { v4 as createUuid } from "uuid";

export const transactionTypes = ["Income", "Outcome"] as const;

export type TypeTransaction = typeof transactionTypes[number];

export class Transaction {
  private _id: string;

  constructor(
    private _title: string,
    private _value: number,
    private _type: TypeTransaction
  ) {
    this._id = createUuid();
  }

  public get id(): string {
    return this._id;
  }

  //   getter e setter _title
  public get title(): string {
    return this._title;
  }

  public set title(title: string) {
    this._title = title;
  }

  public get value(): number {
    return this._value;
  }

  public set value(value: number) {
    this._value = value;
  }

  public get type() {
    return this._type;
  }

  public set type(type: TypeTransaction) {
    this._type = type;
  }

  public toJson() {
    return {
      id: this._id,
      title: this._title,
      value: this._value,
      type: this._type,
    };
  }

  public static create(
    id: string,
    value: number,
    type: TypeTransaction,
    title: string
  ) {
    const transaction = new Transaction(title, value, type);
    transaction._id = id;

    return transaction;
  }
}
