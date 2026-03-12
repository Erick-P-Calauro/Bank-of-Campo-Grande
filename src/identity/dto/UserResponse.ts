export class UserResponse {
    user_id: string;
    name: string;
    cpf: string;
    phone: string;
    created_at: Date;
    user_role: string;

    constructor(user_id, name, cpf, phone, created_at, user_role) {
        this.user_id = user_id;
        this.name = name;
        this.cpf = cpf;
        this.phone = phone;
        this.created_at = created_at;
        this.user_role = user_role;
    }
}