import {
  createParamDecorator,
  ExecutionContext,
  HttpException,
} from '@nestjs/common';
import { Account } from './models/Account';

// Should be used with AccountOwnership guard
export const OwnedAccount = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const req: Request = context.switchToHttp().getRequest();
    const account: Account | null = req['account'];

    if (!account) {
      throw new HttpException('Please try access your own account.', 403);
    }

    return account;
  },
);
