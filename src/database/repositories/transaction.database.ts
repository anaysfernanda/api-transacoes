import { Transaction, TypeTransaction } from "../../models/transactions.models";
import { DatabaseConnection } from "../config/database.connection";
import { TransactionEntity } from "../entities/transaction.entity";

export class TransactionDatabase {
  private repository =
    DatabaseConnection.connection.getRepository(TransactionEntity);

  public async list(id: string) {
    const result = await this.repository.find({
      where: {
        user: {
          id: id,
        },
      },
    });

    return result.map((item) => TransactionDatabase.mapEntityToModel(item));
  }

  public static mapEntityToModel(entity: TransactionEntity): Transaction {
    return Transaction.create(
      entity.id,
      entity.value,
      entity.type,
      entity.title
    );
  }

  public async get(id: string) {
    const result = await this.repository.findOneBy({ id });

    if (!result) {
      return 0;
    }

    return result;
  }

  public async create(id: string, transaction: Transaction) {
    const transactionEntity = this.repository.create({
      id: transaction.id,
      value: transaction.value,
      type: transaction.type,
      title: transaction.title,
      user: {
        id: id,
      },
    });

    const result = await this.repository.save(transactionEntity);
    return TransactionDatabase.mapEntityToModel(result);
  }

  public async update(
    id: string,
    value: number,
    title: string,
    type: string
  ): Promise<any> {
    const result = await this.repository.update(
      {
        id,
      },
      {
        value,
        title,
        type,
      }
    );

    return result;
  }

  public async delete(id: string): Promise<number> {
    const result = await this.repository.delete({
      id,
    });

    return result.affected ?? 0;
  }
}
