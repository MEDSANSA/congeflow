import * as mongoose from 'mongoose';

//modele de la base de donnee

export const UserSchema = new mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true }
});

export interface User extends mongoose.Document {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    username: string;
    password: string;
    role: string;
}