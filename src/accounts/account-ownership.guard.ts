import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { UserRole } from 'src/auth/roles.enum.';
import { Request } from 'express';
import { UserPayload } from 'src/auth/user-payload.type';

@Injectable()
export class AccountOwnershipGuard implements CanActivate {
  constructor(private AccountService: AccountsService) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const req: Request = context.switchToHttp().getRequest();

    const user: UserPayload = req['user'];
    const accountId: string = req.params.accountId.toString();

    const account = await this.AccountService.findActiveOrPausedById(accountId);

    if (
      account?.account_owner.user_id != user.user_id &&
      user.user_role != UserRole.manager
    ) {
      return false;
    }

    req['account'] = account;

    return true;
  }
}
