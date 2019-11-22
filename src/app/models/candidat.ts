import { Election } from './election';

export interface Candidat{
    candidat_id: number;
    email: string;
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
    //elections: Election;
 
}
