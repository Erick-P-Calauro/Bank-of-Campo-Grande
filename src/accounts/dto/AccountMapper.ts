import { UserRelation } from "src/identity/dto/UserRelation";
import { AccountStatus } from "../status";
import { AccountRequest } from "./AccountRequest";
import { AccountSave } from "./AccountSave";
import { Account } from "../models/Account";
import { AccountResponse } from "./AccountResponse";

export class AccountMapper {
    static toAccountSaveDto(account : AccountRequest, userId: string, created_at: Date) {
        return new AccountSave(account.account_name, new UserRelation(userId), created_at, AccountStatus.active);
    }

    static toAccountResponseDto(account: Account) {
        const sanitizedStatus = account.status == 0 ? "Active" : account.status == 1 ? "Paused" : "Cancelled";
        
        return new AccountResponse(
            account.account_id, 
            account.account_name, 
            {
                user_id: account.account_owner.user_id,
                name: account.account_owner.name,
                cpf: account.account_owner.cpf
            },
            account.created_at,
            sanitizedStatus
        );
    }
}