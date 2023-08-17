import { Controller, Post, Get, UseGuards, Request, UnauthorizedException  } from "@nestjs/common";
import { LocalAuthGuard } from "./auth/local-auth.guard";
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from "./auth/jwt-auth.guard";

@Controller()
export class AppController {
    constructor(private authService: AuthService) { }

    @UseGuards(LocalAuthGuard)
    @Post('auth/login')
    login(@Request() req): Promise<any> {
        if (!req.user) {
            throw new UnauthorizedException('Invalid credentials');
        }
        //console.log(req.user);
        return this.authService.login(req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Get('auth/profile')
    getProfile(@Request() req) {
        return req.user;
    }
}