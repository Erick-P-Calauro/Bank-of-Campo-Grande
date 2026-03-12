import { User, UserRole } from "../models/User";
import { UserRequest } from "./UserRequest";
import { UserResponse } from "./UserResponse";
import { UserSave } from "./UserSave";

export class UserMapper {

    static toUserSaveDto(user: UserRequest, created_at : Date, user_role: UserRole): UserSave {
        return new UserSave(user.name, user.cpf, user.phone, new Date(Date.now()), user_role);
    }

    static toUserResponseDto(user : User) : UserResponse {
        const userRoleName = user.user_role == '0' ? "manager" : "client";
        const sanitizedPhone = user.phone ?? "";

        return new UserResponse(user.user_id, user.name, user.cpf, sanitizedPhone, user.created_at, userRoleName);
    }

}