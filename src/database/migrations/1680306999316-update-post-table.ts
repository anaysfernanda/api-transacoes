import { MigrationInterface, QueryRunner } from "typeorm";

export class updatePostTable1680306999316 implements MigrationInterface {
  name = "updatePostTable1680306999316";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "teste"."user" ("id" character varying NOT NULL, "name" character varying NOT NULL, "age" integer NOT NULL, "cpf" integer NOT NULL, "email" character varying NOT NULL, "dthr_atualizacao" TIMESTAMP NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "teste"."transaction" ("id_transaction" character varying NOT NULL, "title" character varying NOT NULL, "type" character varying NOT NULL, "value" integer NOT NULL, "id_user" character varying, CONSTRAINT "PK_15c7d2864bdcfc14485f5200917" PRIMARY KEY ("id_transaction"))`
    );
    await queryRunner.query(
      `ALTER TABLE "teste"."transaction" ADD CONSTRAINT "FK_2a481f3c342fc4260014d0b6dad" FOREIGN KEY ("id_user") REFERENCES "teste"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "teste"."transaction" DROP CONSTRAINT "FK_2a481f3c342fc4260014d0b6dad"`
    );
    await queryRunner.query(`DROP TABLE "teste"."transaction"`);
    await queryRunner.query(`DROP TABLE "teste"."user"`);
  }
}
