import { Request, Response } from "express";
import { UserDatabase } from "../database/repositories/user.database";
import { User } from "../models/user.models";

export class UserController {
  public static async create(req: Request, res: Response) {
    try {
      const { name, cpf, email, age } = req.body;
      const user = new User(name, age, email, cpf);

      const database = new UserDatabase();
      const result = await database.create(user);

      return res.status(201).send({
        ok: true,
        message: "User was successfully create!",
        data: result,
      });
    } catch (error: any) {
      return res.status(500).send({
        ok: false,
        message: error.toString(),
      });
    }
  }

  public static async getUser(req: Request, res: Response) {
    try {
      const { userId } = req.params;

      const database = new UserDatabase();
      const user = await database.get(userId);

      if (!user) {
        return res.status(404).send({
          ok: false,
          message: "User not found",
        });
      }

      res.status(200).send({
        ok: true,
        message: "User found successfully",
        data: user.toJson(),
      });
    } catch (error: any) {
      return res.status(500).send({
        ok: false,
        message: error.toString(),
      });
    }
  }

  public static async getUsersList(req: Request, res: Response) {
    try {
      const database = new UserDatabase();
      let userList = await database.list();

      const list = userList.map((user) => user.toJson());

      return res.status(200).send({
        ok: true,
        message: "User list",
        data: list,
      });
    } catch (error: any) {
      return res.status(500).send({
        ok: false,
        message: error.toString(),
      });
    }
  }

  public static async editUser(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const { name, age } = req.body;

      const updateUser = new UserDatabase();
      const result = await updateUser.update(userId, name, age);

      if (result === 0) {
        return res.status(404).send({
          ok: false,
          message: "User not found",
        });
      }

      return res.status(200).send({
        ok: true,
        message: "User updated",
        data: userId,
      });
    } catch (error: any) {
      return res.status(500).send({
        ok: false,
        message: error.toString(),
      });
    }
  }

  public static async delete(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const database = new UserDatabase();
      const userIndex = await database.delete(userId);

      if (userIndex === 0) {
        return res.status(404).send({
          ok: false,
          message: "User not found",
        });
      }

      return res.status(200).send({
        ok: true,
        message: "User deleted",
        data: userId,
      });
    } catch (error: any) {
      return res.status(500).send({
        ok: false,
        message: error.toString(),
      });
    }
  }

  public static async login(req: Request, res: Response) {
    try {
      const { email, cpf } = req.body;
      const database = new UserDatabase();

      if (!email) {
        return res.status(404).send({
          ok: false,
          message: "Email not found",
        });
      }

      if (!cpf) {
        return res.status(404).send({
          ok: false,
          message: "CPF not found",
        });
      }

      const user = {
        email,
        cpf,
      };
      const result = await database.login(user);

      const userId = {
        id: result.id,
      };

      return res.status(200).send({
        ok: true,
        message: "Logged successfully",
        data: userId,
      });
    } catch (error: any) {
      return res.status(500).send({
        ok: false,
        message: error.toString(),
      });
    }
  }
}
