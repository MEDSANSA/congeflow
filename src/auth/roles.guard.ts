import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from './enums/role.enum';
import { ROLES_KEY } from './roles.decorator';
import { UsersService } from 'src/users/users.service';
import { AuthenticatedRequest } from './auth.interface';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (!requiredRoles) {
            return true;
        }
        console.log('Required Roles:', requiredRoles);

        const request = context.switchToHttp().getRequest();
        const user = request.user;
        console.log(request.user);

        if (!user) {
            return false;
        }

        return requiredRoles.some(req => user.role === req);
    }
}