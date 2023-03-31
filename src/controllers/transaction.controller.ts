import { Request, Response } from "express";
import { title } from "process";
import { TransactionDatabase } from "../database/repositories/transaction.database";
import { UserDatabase } from "../database/repositories/user.database";
import { Transaction } from "../models/transactions.models";
import { User } from "../models/user.models";

export class TransactionController {
  public static async create(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const { title, value, type } = req.body;

      if (!title) {
        return res.status(400).send({
          ok: false,
          message: "Title was not provided",
        });
      }

      if (!value) {
        return res.status(400).send({
          ok: false,
          message: "Value was not provided",
        });
      }

      if (!type) {
        return res.status(400).send({
          ok: false,
          message: "Type was not provided",
        });
      }

      if (!userId) {
        return res.status(400).send({
          ok: false,
          message: "User was not provided!",
        });
      }

      const userDatabase = new UserDatabase();
      const user = await userDatabase.get(userId);
      if (!user) {
        return res.status(404).send({
          ok: false,
          message: "User not found!",
        });
      }

      const newTransaction = new Transaction(title, value, type);
      const transaction = await new TransactionDatabase().create(
        userId,
        newTransaction
      );
      const result = {
        title: transaction.title,
        value: transaction.value,
        type: transaction.type,
      };
      console.log(transaction);
      // user.transactions = [...user.transactions, transaction];

      return res.status(201).send({
        ok: true,
        message: "Transaction added!",
        data: result,
      });
    } catch (error: any) {
      return res.status(500).send({
        ok: false,
        message: error.toString(),
      });
    }
  }

  public static async getTransaction(req: Request, res: Response) {
    try {
      const { transactionId } = req.params;
      const transaction = await new TransactionDatabase().get(transactionId);

      if (transaction === 0) {
        return res.status(404).send({
          ok: false,
          message: "Transaction not found",
        });
      }

      return res.status(200).send({
        ok: true,
        message: "Displaying transaction",
        data: transaction,
      });
    } catch (error: any) {
      console.error(error);
      return res.status(500).send({
        ok: false,
        message: error.toString(),
      });
    }
  }

  public static async getTransactionList(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const database = new TransactionDatabase();
      const list = await database.list(userId);
      const result = list.map((transaction) => {
        return {
          id: transaction.id,
          value: transaction.value,
          title: transaction.title,
          type: transaction.type,
        };
      });
      console.log(result);

      return res.status(200).send({
        ok: true,
        message: "Transactions success listed",
        data: result,
      });
    } catch (error: any) {
      return res.status(500).send({
        ok: false,
        message: error.toString(),
      });
    }
  }

  // public static edit(req: Request, res: Response) {
  //   try {
  //     const { title, value, type } = req.body;
  //     const { userId, transactionId } = req.params;

  //     const user = new UserDatabase().get(userId);
  //     const transactionSelect = user?.transactions.find(
  //       (item) => item.id === transactionId
  //     );

  //     if (!user) {
  //       return res.status(404).send({
  //         ok: false,
  //         message: "User not found!",
  //       });
  //     }

  //     if (!transactionSelect) {
  //       return res.status(404).send({
  //         ok: false,
  //         message: "Transaction not found!",
  //       });
  //     }

  //     if (title) {
  //       transactionSelect.title = title;
  //     }

  //     if (value) {
  //       transactionSelect.value = value;
  //     }

  //     if (type) {
  //       transactionSelect.type = type;
  //     }

  //     res.status(200).send({
  //       ok: true,
  //       message: "Transaction updated",
  //       data: transactionSelect,
  //     });
  //   } catch (error: any) {
  //     return res.status(500).send({
  //       ok: false,
  //       message: error.toString(),
  //     });
  //   }
  // }

  // public static delete(req: Request, res: Response) {
  //   try {
  //     const { userId, transactionId } = req.params;
  //     const user = new UserDatabase().get(userId);

  //     if (!user) {
  //       return res.status(404).send({
  //         ok: false,
  //         message: "User not found!",
  //       });
  //     }

  //     let transactionSelect = user?.transactions.findIndex(
  //       (item) => item.id === transactionId
  //     );

  //     if (transactionSelect < 0) {
  //       return res.status(404).send({
  //         ok: false,
  //         message: "Transaction not found",
  //       });
  //     }

  //     user.transactions.splice(transactionSelect, 1);

  //     return res.status(200).send({
  //       ok: true,
  //       message: "Transaction deleted",
  //     });
  //   } catch (error: any) {
  //     return res.status(500).send({
  //       ok: false,
  //       message: error.toString(),
  //     });
  //   }
  // }
}
