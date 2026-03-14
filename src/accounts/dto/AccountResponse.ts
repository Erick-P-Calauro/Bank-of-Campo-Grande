export class AccountResponse {

    account_id : string;
    account_name: string;
    account_owner: {
        user_id: string;
        name: string;
        cpf: string;
    }
    created_at: Date;
    status: string;

    constructor(accountId, accountName, accountOwner, created_at, status) {
        this.account_id = accountId;
        this.account_name = accountName;
        this.account_owner = accountOwner;
        this.created_at = created_at;
        this.status = status;
    }

}