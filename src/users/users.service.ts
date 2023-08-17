import { Injectable } from '@nestjs/common';
import { User } from './users.model';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class UsersService {

    constructor(@InjectModel('User') private readonly userModel: Model<User>) { }

    async insertUser(firstname: string, lastname: string, email: string, username: string, password: string, role: string) {
        const newUser = new this.userModel({
            firstname: firstname,
            lastname: lastname,
            email: email,
            username: username,
            password: password,
            role: role
        });
        const result = await newUser.save();
        return result.id as string;
    }

    async getUsers() {
        const users = await this.userModel.find().exec();
        return users;
    }

    async getSingleUser(userId: string) {
        const user = await this.findUser(userId);
        return user;
    }

    private async findUser(id: string): Promise<User> {
        let user;
        try {
            user = await this.userModel.findById(id).exec();
        }
        catch (error) {
            throw new error('Could not find user.');
        }
        if (!user) {
            throw new Error('Could not find user.');
        }
        return user;
    }

    async updateUser(userId: string, UserDto) {
        const updatedUser = await this.findUser(userId);
        const { firstname, lastname, email, username, password, role } = UserDto;
        if (firstname) {
            updatedUser.firstname = firstname;
        }
        if (lastname) {
            updatedUser.lastname = lastname;
        }
        if (email) {
            updatedUser.email = email;
        }
        if (username) {
            updatedUser.username = username;
        }
        if (password) {
            updatedUser.password = password;
        }
        if (role) {
            updatedUser.role = role;
        }
        updatedUser.save();
    }

    async deleteUser(userId: string) {
        const result = await this.userModel.deleteOne({ _id: userId }).exec();
        if (result.deletedCount === 0) {
            throw new Error('Could not find user.');
        }
    }

    async searchByName(key: string) {
        const nameRegExp = new RegExp(key, 'i');
        const users = await this.userModel.find({
            $or: [
                { firstname: nameRegExp },
                { lastname: nameRegExp },
            ],
        }).exec();
        return users.map(user => ({
            id: user.id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            username: user.username,
            password: user.password,
            role: user.role,
        }));
    }

    async findByUsername(username: string) {
        const user = await this.userModel.findOne({ username: username });
        return {
            id: user.id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            username: user.username,
            password: user.password,
            role: user.role,
        };
    }
}
