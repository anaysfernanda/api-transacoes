import { NextFunction, Request, Response } from "express";
import { UserDatabase } from "../database/user.database";
import { transactionTypes } from "../models/transactions.models";

export class TransactionValidatorMiddleware {
  public static userValid(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;

      if (!userId) {
        return res.status(400).send({
          ok: false,
          msg: "User not provided",
        });
      }

      const user = new UserDatabase().get(userId);

      if (!user) {
        return res.status(404).send({
          ok: false,
          msg: "User not found",
        });
      }

      next();
    } catch (error: any) {
      return res.status(500).send({
        ok: false,
        msg: error.toString(),
      });
    }
  }

  public static validateMandatoryFields(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { title, value, type } = req.body;

      if (!title) {
        return res.status(400).send({
          ok: false,
          msg: "Title was not provided",
        });
      }

      if (!value) {
        return res.status(400).send({
          ok: false,
          msg: "Value was not provided",
        });
      }

      if (!type) {
        return res.status(400).send({
          ok: false,
          msg: "Type was not provided",
        });
      }

      if (!transactionTypes.includes(type)) {
        return res.status(400).send({
          ok: false,
          msg: "Select the correct transaction type: 'Income' or 'Outcome'.",
        });
      }

      next();
    } catch (error: any) {
      return res.status(500).send({
        ok: false,
        msg: error.toString(),
      });
    }
  }
}
