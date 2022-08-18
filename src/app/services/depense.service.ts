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

}
