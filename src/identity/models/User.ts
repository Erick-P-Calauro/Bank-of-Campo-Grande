import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { UserResponse } from "../dto/UserResponse";

export enum UserRole {
    "manager",
    "client"
}

@Entity({name: "tb_user"})
export class User {

    @PrimaryGeneratedColumn("uuid")
    user_id: string;

    @Column({type: "varchar", length: 45, nullable: false, unique: true})
    name: string;

    @Column({type: "varchar", length: 11, nullable: false})
    cpf: string;

    @Column({type: "varchar", length: 11, nullable: true})
    phone: string | undefined;

    @Column({type: "timestamp", nullable: false,})
    created_at: Date;

    @Column({type: "enum", enum: UserRole, default: UserRole.client})
    user_role: string;

}