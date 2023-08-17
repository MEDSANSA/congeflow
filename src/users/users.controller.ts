import { Controller, Post, Get, Param, Patch, Delete, Body, Query,UseGuards } from "@nestjs/common";
import { UsersService } from './users.service';
import { UserDto } from "./Dto/users.dto";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { Roles } from "src/auth/roles.decorator";
import { Role } from "src/auth/enums/role.enum";
import { RolesGuard } from "src/auth/roles.guard";


@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
    constructor(private readonly userservice: UsersService) { }

    @Post()
    async addUser(@Body() UserDto: UserDto) {
        const { firstname, lastname, email, username, password, role } = UserDto;
        const userId = await this.userservice.insertUser(firstname, lastname, email, username, password, role);
        return { id: userId };
    }

    //@Roles(Role.Admin)
    @Get()
    async getAllUsers() {
        const users = await this.userservice.getUsers();
        return users;
    }

    @Get(':id')
    getUser(@Param('id') userId: string) {
        return this.userservice.getSingleUser(userId);
    }

    @Patch(':id')
    async updateUser(@Param('id') userId: string, @Body() UserDto: UserDto): Promise<any> {
        await this.userservice.updateUser(userId, UserDto);
        return null;
    }

    @Delete(':id')
    async removeUser(@Param('id') userId: string) {
        await this.userservice.deleteUser(userId);
        return null;
    }

    @Post('/search')
    async searchUsersByName(@Query('key') key) {
        const users = await this.userservice.searchByName(key);
        return users;
    }

}
