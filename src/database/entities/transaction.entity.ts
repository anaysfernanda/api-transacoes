import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { UserEntity } from "./user.entity";

@Entity("transaction")
export class TransactionEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  type: string;

  @Column()
  value: number;

  @ManyToOne(() => UserEntity)
  @JoinColumn({
    name: "id_user",
  })
  user: UserEntity;
}
