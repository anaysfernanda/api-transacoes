import { Request, Response } from "express";
import { UserDatabase } from "../database/repositories/user.database";
import { Transaction } from "../models/transactions.models";

export class TransactionController {
  public static create(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const { title, value, type } = req.body;

      const user = new UserDatabase().get(userId);
      if (!user) {
        return res.status(404).send({
          ok: false,
          message: "User not found!",
        });
      }

      const transaction = new Transaction(title, value, type);

      // user.transactions = [...user.transactions, transaction];

      return res.status(200).send({
        ok: true,
        message: "Transaction added!",
        data: transaction,
      });
    } catch (error: any) {
      return res.status(500).send({
        ok: false,
        message: error.toString(),
      });
    }
  }

  public static getTransaction(req: Request, res: Response) {
    try {
      const { userId, transactionId } = req.params;
      const user = new UserDatabase().get(userId);

      if (!user) {
        return res.status(404).send({
          ok: false,
          message: "User not found",
        });
      }

      // const transaction = user.transactions.find(
      //   (item) => item.id === transactionId
      // );

      // if (!transaction) {
      //   return res.status(404).send({
      //     ok: false,
      //     message: "Transaction not found",
      //   });
      // }

      return res.status(200).send({
        ok: true,
        message: "Displaying transaction",
      });
    } catch (error: any) {
      console.error(error);
      return res.status(500).send({
        ok: false,
        message: error.toString(),
      });
    }
  }

  // public static getTransactionList(req: Request, res: Response) {
  //   try {
  //     const { userId } = req.params;
  //     const { title, type } = req.params;
  //     const user = new UserDatabase().get(userId);

  //     if (!user) {
  //       return res.status(404).send({
  //         ok: false,
  //         message: "User not found!",
  //       });
  //     }

  //     if (title) {
  //       user.transactions.filter((item) => item.title === title);
  //     }

  //     if (type) {
  //       if (type === "Income" || type === "Outcome") {
  //         user.transactions.filter((item) => item.type === type);
  //       }
  //     }

  //     let incomes = user.transactions
  //       .filter((item) => item.type === "Income")
  //       .reduce((current, total) => {
  //         return current + total.value;
  //       }, 0);

  //     let outcomes = user.transactions
  //       .filter((item) => item.type === "Outcome")
  //       .reduce((current, total) => {
  //         return current + total.value;
  //       }, 0);

  //     let total = incomes - outcomes;

  //     return res.status(200).send({
  //       ok: true,
  //       transactions: user.transactions,
  //       balance: {
  //         income: incomes,
  //         outcome: outcomes,
  //         total: total,
  //       },
  //     });
  //   } catch (error: any) {
  //     return res.status(500).send({
  //       ok: false,
  //       message: error.toString(),
  //     });
  //   }
  // }

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
