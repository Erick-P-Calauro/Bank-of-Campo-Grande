import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from 'src/utils/global.decorators';
import { UserRole } from './roles.enum.';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private Reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRole = this.Reflector.getAllAndOverride<UserRole>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (requiredRole == null) {
      return true;
    }

    const req = context.switchToHttp().getRequest();
    const { user } = req;

    // By Ownwership
    if (req.params.id === user.user_id) {
      return true;
    }

    // By Top Acess Level
    if (user.user_role == UserRole.manager) {
      return true;
    }

    return false;
  }
}
