import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Employe } from '../model/employe.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeService {

  constructor(private http:HttpClient) { }
  public getEmployees():Observable<Array<Employe>>{
    return this.http.get<Array<Employe>>(environment.backendHost+"/employes")
  }
  public searchEmployees(keyword : string):Observable<Array<Employe>>{
    return this.http.get<Array<Employe>>(environment.backendHost+"/employes/search?keyword="+keyword)
  }
  public saveEmployees(employe : Employe):Observable<Employe>{
    return this.http.post<Employe>(environment.backendHost+"/employes",employe)
  }
  public deleteEmployees(id:number){
    return this.http.delete(environment.backendHost+"/employes/"+id)
  }
}
