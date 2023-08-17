import { Role } from "./enums/role.enum";

export interface JwtPayload {
    id: string;
    roles: Role[];
}