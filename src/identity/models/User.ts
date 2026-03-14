import { UserRole } from "src/auth/roles";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "tb_user"})
export class User {

    @PrimaryGeneratedColumn("uuid")
    user_id: string;

    @Column({type: "varchar", length: 45, nullable: false, unique: true})
    name: string;

    @Column({type: "varchar", length: 45, nullable: false, unique: true})
    login: string;

    @Column({type: "text", nullable: false})
    password: string;

    @Column({type: "varchar", length: 11, nullable: false, unique: true})
    cpf: string;

    @Column({type: "varchar", length: 11, nullable: true})
    phone: string | undefined;

    @Column({type: "varchar", length: 60, nullable: true, unique: true})
    email: string | undefined;

    @Column({type: "timestamp", nullable: false,})
    created_at: Date;

    @Column({type: "enum", enum: UserRole, default: UserRole.client})
    user_role: string;

}