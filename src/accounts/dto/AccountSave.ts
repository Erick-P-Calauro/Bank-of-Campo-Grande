import { UserRelation } from 'src/identity/dto/UserRelation';
import { AccountStatus } from '../status';

export class AccountSave {
  account_name: string;
  account_owner: UserRelation;
  created_at: Date;
  account_status: AccountStatus;

  constructor(
    accountName: string,
    accountOwner: UserRelation,
    created_at: Date,
    account_status: AccountStatus,
  ) {
    this.account_name = accountName;
    this.account_owner = accountOwner;
    this.created_at = created_at;
    this.account_status = account_status;
  }
}
