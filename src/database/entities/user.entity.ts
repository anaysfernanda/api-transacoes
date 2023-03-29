import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({
  name: "user",
})
export class UserEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  age: number;

  @Column()
  cpf: number;

  @Column()
  email: string;

  @Column({
    type: "timestamp",
    name: "dthr_atualizacao",
  })
  dthrAtualizacao: Date;
}
