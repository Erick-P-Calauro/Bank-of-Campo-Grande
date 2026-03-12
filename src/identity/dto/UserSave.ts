import { PartialType } from "@nestjs/swagger";

export class UserSave  {
    name: string;
    cpf: string;
    phone: string;
    created_at: Date;
    user_role: string;

    constructor(name, cpf, phone, created_at, user_role) {
        this.name = name;
        this.cpf = cpf;
        this.phone = phone;
        this.created_at = created_at;
        this.user_role = user_role;
    }
}

export class UserUpdate extends PartialType(UserSave) {}