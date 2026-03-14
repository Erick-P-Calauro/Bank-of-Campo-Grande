export class UserResponse {
    user_id: string;
    name: string;
    password: string;
    cpf: string;
    phone: string;
    email: string;
    created_at: Date;
    user_role: string;

    constructor(user_id, name, password, cpf, phone, email, created_at, user_role) {
        this.user_id = user_id;
        this.name = name;
        this.password = password;
        this.cpf = cpf;
        this.phone = phone;
        this.email = email;
        this.created_at = created_at;
        this.user_role = user_role;
    }
}