import { Request, Response, Router } from "express";
import { TransactionController } from "../controllers/transaction.controller";
import { UserController } from "../controllers/user.controller";
import { CpfValidatorMiddleware } from "../middlewares/cpf-validator.middleware";
import { TransactionValidatorMiddleware } from "../middlewares/transaction.validator.middleware";
import { UserValidatorMiddleware } from "../middlewares/user.validator.middleware";

export const userRoutes = () => {
  const app = Router();

  app.post(
    "/users",

    [
      UserValidatorMiddleware.validateMandatoryMiddleware,
      CpfValidatorMiddleware.validCpf,
    ],

    UserController.create
  );

  app.get("/users/:userId", UserController.getUser);

  app.get("/users", UserController.getUsersList);

  app.put("/users/:userId", UserController.editUser);

  app.delete("/users/:userId", UserController.delete);

  app.post(
    "/users/:userId/transactions",
    [
      TransactionValidatorMiddleware.validateMandatoryFields,
      TransactionValidatorMiddleware.userValid,
    ],
    TransactionController.create
  );

  app.get(
    "/users/:userId/transactions/:transactionId",
    [TransactionValidatorMiddleware.userValid],
    TransactionController.getTransaction
  );

  // app.get(
  //   "/users/:userId/transactions/",
  //   [TransactionValidatorMiddleware.userValid],
  //   TransactionController.getTransactionList
  // );

  // app.put(
  //   "/users/:userId/transactions/:transactionId",
  //   [TransactionValidatorMiddleware.userValid],
  //   TransactionController.edit
  // );

  // app.delete(
  //   "/users/:userId/transactions/:transactionId",
  //   [TransactionValidatorMiddleware.userValid],
  //   TransactionController.delete
  // );

  app.all("/*", (req, res) => {
    res.status(500).send({
      ok: false,
      message: "Rota inválida",
    });
  });

  return app;
};
