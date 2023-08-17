import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/users/users.model';
import { Conge } from './conges.model';
import { CongeDto } from './Dto/conges.dto';

@Injectable()
export class CongeService {

    constructor(@InjectModel('Conge') private readonly congeModel: Model<Conge>, @InjectModel('User') private readonly userModel: Model<User>) { }

    async addConge(conge: any, userId: string): Promise<Conge> {
        const user = await this.userModel.findById(userId).exec();

        if (!user) {
            throw new Error('User not found');
        }

        const newConge = new this.congeModel({
            ...conge,
            userId: user._id,
            userEmail: user.email,
            date_creation: new Date(),
        });

        return newConge.save();
    }

    async getAllConges(): Promise<Conge[]> {
        const conges = await this.congeModel.find().exec();
        return conges;
    }

    async getById(id: string) {
        const conge = await this.congeModel.findById(id).exec();
        return conge;
    }

    async getByUserId(userId: string) {
        const conges = await this.congeModel.find({ userId: userId }).exec();
        return conges;
    }

    async deleteConge(id: string) {
        const conge = await this.congeModel.findByIdAndDelete(id).exec();
        return conge;
    }

    /*async updateConge(id: string, congeDto) {
        const updatedConge = await this.getById(id);
        const { dateDeConge, dateDeReprise, nombreDeJours, type, description, etat, file, verifier_par } = congeDto;

        updatedConge.date_mise_a_jour = new Date();

        if (dateDeConge) {
            updatedConge.dateDeConge = dateDeConge;
        }
        if (dateDeReprise) {
            updatedConge.dateDeReprise = dateDeReprise;
        }
        if (nombreDeJours) {
            updatedConge.nombreDeJours = nombreDeJours;
        }
        if (type) {
            updatedConge.type = type;
        }
        if (description) {
            updatedConge.description = description;
        }
        if (etat) {
            updatedConge.etat = etat;
        }
        if (file) {
            updatedConge.file = file;
        }
        if (verifier_par) {
            updatedConge.verifier_par = verifier_par;
        }

        updatedConge.save();
    }*/

    async updateConge(id: string, congedto: CongeDto) {
        const updatedConge = await this.getById(id);
        updatedConge.date_mise_a_jour = new Date();
        updatedConge.dateDeConge = congedto.dateDeConge;
        updatedConge.dateDeReprise = congedto.dateDeReprise;
        updatedConge.nombreDeJours = congedto.nombreDeJours;
        updatedConge.type = congedto.type;
        updatedConge.description = congedto.description;
        updatedConge.etat = congedto.etat;
        updatedConge.file = congedto.file;
        updatedConge.verifier_par = congedto.verifier_par;
        updatedConge.save();
    }

}
