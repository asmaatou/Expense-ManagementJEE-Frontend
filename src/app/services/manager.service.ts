import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Manager } from '../model/manager.model';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  constructor(private http:HttpClient) { }
  public getManagers():Observable<Array<Manager>>{
    return this.http.get<Array<Manager>>(environment.backendHost+"/managers")
  }
  public searchManagers(keyword : string):Observable<Array<Manager>>{
    return this.http.get<Array<Manager>>(environment.backendHost+"/managers/search?keyword="+keyword)
  }
  public saveManagers(manager : Manager):Observable<Manager>{
    return this.http.post<Manager>(environment.backendHost+"/managers",manager)
  }
  public deleteManagers(id:number){
    return this.http.delete(environment.backendHost+"/managers/"+id)
  }
  public editManagers(id:number,manager : Manager):Observable<Manager>{
    return this.http.put<Manager>(environment.backendHost+"/employes/"+id,manager)
  }
}

