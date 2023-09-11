import { IsNotEmpty, IsEmail } from "class-validator";

export class CongeDto {

    @IsNotEmpty()
    userId: string;

    @IsEmail()
    userEmail: string;

    @IsNotEmpty()
    dateDeConge: string;

    @IsNotEmpty()
    dateDeReprise: string;

    @IsNotEmpty()
    nombreDeJours: number;

    @IsNotEmpty()
    type: string;

    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    etat: string;

    @IsNotEmpty()
    file: string;

    @IsNotEmpty()
    date_creation: string;

    //@Transform(date => moment().format('DD/MM/YY'))
    @IsNotEmpty()
    date_mise_a_jour: Date;

    @IsNotEmpty()
    verifier_par: string;
}