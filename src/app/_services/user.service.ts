import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/User.model';

const API_URL = 'http://localhost:8087/api/test/';
const API_URL1 = 'http://localhost:8087/api/usr/';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + 'all', { responseType: 'text' });
  }

  getEmployeBoard(): Observable<any> {
    return this.http.get(API_URL + 'employe', { responseType: 'text' });
  }

  getManagerBoard(): Observable<any> {
    return this.http.get(API_URL + 'manager', { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(API_URL + 'admin', { responseType: 'text' });
  }

  getEmploye():Observable<Array<User>>{
    return this.http.get<Array<User>>(API_URL1+'getEmploye');
  }

  getManager():Observable<Array<User>>{
    return this.http.get<Array<User>>(API_URL1+'getManager');
  }
  getAdmin():Observable<Array<User>>{
    return this.http.get<Array<User>>(API_URL1+'getAdmin');
  }

  updateUsers(id:number,user:User):Observable<User>{
    return this.http.put<User>(API_URL1+'user/'+id,user);
  }

  deleteUser(id:number){
    return this.http.delete(API_URL1+'user/'+id);
  }
}
