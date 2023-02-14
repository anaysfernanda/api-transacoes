import { NextFunction, Request, Response } from "express";

export class UserValidatorMiddleware {
  public static validateMandatoryMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { name, cpf, email, age } = req.body;

      if (!name) {
        return res.status(400).send({
          ok: false,
          msg: "Name was not provided",
        });
      }

      if (!cpf) {
        return res.status(400).send({
          ok: false,
          msg: "CPF was not provided",
        });
      }

      if (!email) {
        return res.status(400).send({
          ok: false,
          msg: "E-mail was not provided",
        });
      }

      if (!age) {
        return res.status(400).send({
          ok: false,
          msg: "Age was not provided",
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
