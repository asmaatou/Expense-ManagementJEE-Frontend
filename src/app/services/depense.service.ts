import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Depense } from '../model/depense.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DepenseService {

  constructor(private http:HttpClient) {}
    public getDepenses():Observable<Array<Depense>>{
      return this.http.get<Array<Depense>>(environment.backendHost+"/depenses")
    }
    public saveDepenses(depense : Depense):Observable<Depense>{
      return this.http.post<Depense>(environment.backendHost+"/depenses",depense)
    }
    public deleteDepenses(id:number){
      return this.http.delete(environment.backendHost+"/depenses/"+id)
    }
    public editDepenses(id : number , depense:Depense):Observable<Depense>{
      return this.http.put<Depense>(environment.backendHost+"/depenses/"+id,depense)
    }

}
