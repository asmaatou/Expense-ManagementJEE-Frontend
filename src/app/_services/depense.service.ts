import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Depense } from '../model/Depense.model';
import { param } from 'jquery';

const API_URL = 'http://localhost:8087/api/dep/';

@Injectable({
  providedIn: 'root'
})

export class DepenseService {

  constructor(private http: HttpClient) { }

  getDepense(username? : string):Observable<Array<Depense>>{
    return this.http.get<Array<Depense>>(API_URL+'depense?keyword='+username);
  }

  saveDepense(depense : Depense):Observable<Depense>{
    return this.http.post<Depense>(API_URL+"depense",depense);
  }

  deleteDepense(id : number){
    return this.http.delete(API_URL+"depense/"+id);
  }

  editDepense(id:number,depense:Depense):Observable<Depense>{
    return this.http.post<Depense>(API_URL+"depense/"+id,depense);
  }


  getDepenses():Observable<Array<Depense>>{
    return this.http.get<Array<Depense>>(API_URL+'getDepense');
  }
  acceptDepense(id :number,depense:Depense){
    return this.http.post(API_URL+"acceptdep/"+id,depense);
  }
  denyDepense(id :number,depense:Depense){
    return this.http.post(API_URL+"denydep/"+id,depense);
  }

  getAcceptedDepenses():Observable<Array<Depense>>{
    return this.http.get<Array<Depense>>(API_URL+'getAcceptedDepense');
  }

  getDeniedDepenses():Observable<Array<Depense>>{
    return this.http.get<Array<Depense>>(API_URL+'getDeniedDepense');
  }
}
