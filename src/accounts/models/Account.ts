import { User } from "src/identity/models/User";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { AccountStatus } from "../status";

@Entity({name: "tb_account"})
export class Account {

    @PrimaryGeneratedColumn("uuid")
    account_id : string;

    @Column({type: "varchar", length: 45, nullable: false})
    account_name: string

    @ManyToOne((type) => User, {cascade: ["update"], eager: true})
    @JoinColumn({name: "account_owner"})
    account_owner: User;

    @Column({type: "timestamp", nullable: false})
    created_at : Date;

    @Column({type: "enum", enum: AccountStatus, default: AccountStatus.active})
    status: AccountStatus

}