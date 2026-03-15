import { UserRelation } from 'src/identity/dto/UserRelation';
import { AccountStatus } from '../status';
import { AccountRequest } from './AccountRequest';
import { AccountSave } from './AccountSave';
import { Account } from '../models/Account';
import { AccountResponse } from './AccountResponse';

export class AccountMapper {
  static toAccountSaveDto(
    account: AccountRequest,
    userId: string,
    created_at: Date,
  ) {
    return new AccountSave(
      account.account_name,
      new UserRelation(userId),
      created_at,
      AccountStatus.active,
    );
  }

  static toAccountResponseDto(account: Account) {
    const sanitizedStatus =
      account.status == AccountStatus.active
        ? 'Active'
        : account.status == AccountStatus.paused
          ? 'Paused'
          : 'Cancelled';

    return new AccountResponse(
      account.account_id,
      account.account_name,
      {
        user_id: account.account_owner.user_id,
        user_name: account.account_owner.user_name,
        user_cpf: account.account_owner.user_cpf,
      },
      account.created_at,
      sanitizedStatus,
    );
  }
}
