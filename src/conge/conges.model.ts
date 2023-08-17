import * as mongoose from 'mongoose';

//modele de la base de donnee

export const CongeSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    userEmail: { type: String, required: true },
    dateDeConge: { type: String, required: true },
    dateDeReprise: { type: String, required: true },
    nombreDeJours: { type: Number, required: true },
    type: { type: String, required: true },
    description: { type: String, required: true },
    etat: { type: String, required: true },
    file: { type: String, required: true },
    date_creation: { type: String, required: true },
    date_mise_a_jour: { type: Date, required: true },
    verifier_par: { type: String, required: true }
});

export interface Conge extends mongoose.Document {
    userId: string;
    userEmail: string;
    dateDeConge: string;
    dateDeReprise: string;
    nombreDeJours: number;
    type: string;
    description: string;
    etat: string;
    file: string;
    date_creation: string;
    date_mise_a_jour: Date;
    verifier_par: string;
}