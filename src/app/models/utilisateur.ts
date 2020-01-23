import { Election } from './election';

export interface Utilisateur{
    id: number;
    cin: string;
    nationnalite: string;
    nom: string;
    prenom: string;
    date_naissance: string;
    addresse: string;
    tel: string;
    sexe: string;
    situation_familiale: string;
    origine: string;
    password: string;
    type: string;
    elections: Election[];
 
}
