import { NextFunction, Request, Response } from "express";
import { cpf as cpfValidator } from "cpf-cnpj-validator";

export class CpfValidatorMiddleware {
  public static validCpf(req: Request, res: Response, next: NextFunction) {
    try {
      const { cpf } = req.body;

      if (!cpf) {
        return res.status(400).send({
          ok: false,
          message: "CPF was not provided (middleware)",
        });
      }

      const cpfText = cpf.toString().padStart(11, "0");

      let isValid = cpfValidator.isValid(cpfText);

      if (!isValid) {
        return res.status(400).send({
          ok: false,
          message: "CPF is invalid",
        });
      }

      next();
    } catch (error: any) {
      return res.status(500).send({
        ok: false,
        message: error.toString(),
      });
    }
  }
}
