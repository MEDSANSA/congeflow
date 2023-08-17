import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService) { }

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findByUsername(username);
        if (user && user.password === pass) {
            const { username, password, ...result } = user;
            console.log(result);
            return result;
        }
        return null;
    }

    async login(user: any) {
        if (!user) {
            throw new UnauthorizedException('missing user');
        }
        const payload = { id: user.id, roles: user.role };
        console.log(payload);
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
