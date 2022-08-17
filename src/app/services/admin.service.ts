import { Injectable } from '@angular/core';
import { Admin } from '../model/admin.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpClient) { }
  public getAdmins():Observable<Array<Admin>>{
    return this.http.get<Array<Admin>>(environment.backendHost+"/admins")
  }
  public searchAdmins(keyword : string):Observable<Array<Admin>>{
    return this.http.get<Array<Admin>>(environment.backendHost+"/admins/search?keyword="+keyword)
  }
  public saveAdmins(admin : Admin):Observable<Admin>{
    return this.http.post<Admin>(environment.backendHost+"/admins",admin)
  }
  public deleteAdmins(id:number){
    return this.http.delete(environment.backendHost+"/admins/"+id)
  }
}
