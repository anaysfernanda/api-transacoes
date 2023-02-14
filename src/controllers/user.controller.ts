import { Request, Response } from "express";
import { UserDatabase } from "../database/user.database";
import { User } from "../models/user.models";

export class UserController {
  public static create(req: Request, res: Response) {
    try {
      const { name, cpf, email, age } = req.body;
      const user = new User(name, age, email, cpf);

      const database = new UserDatabase();
      database.create(user);

      return res.status(201).send({
        ok: true,
        message: "User was successfully create!",
        data: user,
      });
    } catch (error: any) {
      return res.status(500).send({
        ok: false,
        message: error.toString(),
      });
    }
  }

  public static getUser(req: Request, res: Response) {
    try {
      const { userId } = req.params;

      const database = new UserDatabase();
      const user = database.get(userId);

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

  public static getUsersList(req: Request, res: Response) {
    try {
      const { name, email, cpf } = req.query;

      const database = new UserDatabase();
      let userList = database.list();

      if (name) {
        userList = userList.filter((user) => user.name === name);
      }

      if (email) {
        userList = userList.filter((user) => user.email === email);
      }
      if (cpf) {
        userList = userList.filter((user) => user.cpf === cpf);
      }

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

  public static editUser(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const { name, age, email, cpf } = req.body;

      const updateUser = new UserDatabase().get(userId);

      if (!updateUser) {
        return res.status(404).send({
          ok: false,
          message: "User not found",
        });
      }

      if (name) {
        updateUser.name = name;
      }
      if (cpf) {
        updateUser.cpf = cpf;
      }
      if (email) {
        updateUser.email = email;
      }
      if (age) {
        updateUser.age = age;
      }

      return res.status(200).send({
        ok: true,
        message: "User updated",
        data: updateUser,
      });
    } catch (error: any) {
      return res.status(500).send({
        ok: false,
        message: error.toString(),
      });
    }
  }

  public static delete(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const database = new UserDatabase();
      const userIndex = database.getIndex(userId);

      if (userIndex < 0) {
        return res.status(404).send({
          ok: false,
          message: "User not found",
        });
      }

      database.delete(userIndex);

      return res.status(200).send({
        ok: true,
        message: "User deleted",
      });
    } catch (error: any) {
      return res.status(500).send({
        ok: false,
        message: error.toString(),
      });
    }
  }
}
