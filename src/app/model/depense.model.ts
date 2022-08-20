import { Employe } from "./employe.model";

export class Depense{
  id : number=0;
  dateDepense : Date = new Date();
  client : string='';
  produit_Projet: string='';
  typeI : string='';
  typeD : string='';
  montant : number=0;
  status : string='';
  employeDTO : Employe = new Employe();
}


