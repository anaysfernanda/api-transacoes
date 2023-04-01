import { User } from "../../models/user.models";
import { DatabaseConnection } from "../config/database.connection";
import { UserEntity } from "../entities/user.entity";
import { Users } from "../users";

export class UserDatabase {
  private repository = DatabaseConnection.connection.getRepository(UserEntity);

  public async list(): Promise<User[]> {
    const result = await this.repository.find();

    return result.map((user: any) => this.mapEntityToModel(user));
  }

  private mapEntityToModel(entity: UserEntity): User {
    return User.create(
      entity.id,
      entity.name,
      entity.age,
      entity.cpf,
      entity.email
    );
  }

  public async create(user: User) {
    const userEntity = this.repository.create({
      id: user.id,
      name: user.name,
      age: user.age,
      cpf: user.cpf,
      email: user.email,
    });

    const result = await this.repository.save(userEntity);
    return this.mapEntityToModel(result);
  }

  public async get(id: string) {
    const result = await this.repository.findOneBy({
      id,
    });

    if (!result) {
      return null;
    }

    return this.mapEntityToModel(result);
  }

  public async update(id: string, name: string, age: number): Promise<any> {
    const result = await this.repository.update(
      {
        id,
      },
      {
        name,
        age,
        dthrAtualizacao: new Date(),
      }
    );

    return result.affected ?? 0;
  }

  public async delete(id: string): Promise<number> {
    const result = await this.repository.delete({
      id,
    });

    return result.affected ?? 0;
  }

  public async login(user: any): Promise<any> {
    const result = await this.repository.findOne({
      where: {
        email: user.email,
        cpf: user.cpf,
      },
    });

    return result;
  }
}
