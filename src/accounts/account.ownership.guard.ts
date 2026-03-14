import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { UserRole } from 'src/auth/roles';

@Injectable()
export class AccountOwnershipGuard implements CanActivate {
  constructor(private AccountService: AccountsService){}

  public async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    
    const req = context.switchToHttp().getRequest();

    const user = req['user'];
    const accountId = req.params.accountId;

    const account = await this.AccountService.findById(accountId);

    if(account?.account_owner.user_id != user.user_id && user.user_role != UserRole.manager) {
      return false;
    }

    req['account'] = account;

    return true;
  }
}
