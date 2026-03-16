import {
  createParamDecorator,
  ExecutionContext,
  HttpException,
} from '@nestjs/common';
import { UserPayload } from './user-payload.type';

// Should be used with AuthGuard
export const AuthUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const req: Request = context.switchToHttp().getRequest();

    const user_payload: UserPayload | null = req['user'];

    if (!user_payload) {
      throw new HttpException('Please authenticate to access resource.', 401);
    }

    return user_payload;
  },
);
