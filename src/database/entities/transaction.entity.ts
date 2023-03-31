import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { TypeTransaction } from "../../models/transactions.models";
import { UserEntity } from "./user.entity";

@Entity("transaction")
export class TransactionEntity {
  @PrimaryColumn({
    name: "id_transaction",
  })
  id: string;

  @Column()
  title: string;

  @Column()
  type: TypeTransaction;

  @Column()
  value: number;

  @ManyToOne(() => UserEntity)
  @JoinColumn({
    name: "id_user",
  })
  user: UserEntity;
}
