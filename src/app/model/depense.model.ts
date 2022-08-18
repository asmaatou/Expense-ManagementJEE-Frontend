import { DatePipe } from "@angular/common";
import { Employe } from "./employe.model";

export interface Depense{
  id : number;
  dateDepense : Date;
  client : string;
  produit_Projet: string;
  typeI : string;
  typeD : string;
  montant : number;
  status : string;
  employe : Employe;

}
