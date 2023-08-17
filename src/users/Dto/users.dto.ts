import { IsNotEmpty, IsEmail, IsEnum } from "class-validator";
import { Role } from "src/auth/enums/role.enum";

export class UserDto {
    @IsNotEmpty()
    firstname: string;

    @IsNotEmpty()
    lastname: string;

    @IsEmail()
    email: string;

    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    password: string;

    @IsEnum(Role)
    @IsNotEmpty()
    role: Role;
}