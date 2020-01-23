import { Utilisateur } from './utilisateur';

export interface Election {
    id: number;
    libele: string,
    dateDebut: string,
    dateFin: string;
    etat: boolean,
    type: String;
    candidats:Utilisateur[]
} 
