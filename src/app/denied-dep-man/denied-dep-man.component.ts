import { Component, OnInit } from '@angular/core';
import { catchError,map, Observable, throwError } from 'rxjs';
import { Depense } from '../model/Depense.model';
import { DepenseService } from '../_services/depense.service';

@Component({
  selector: 'app-denied-dep-man',
  templateUrl: './denied-dep-man.component.html',
  styleUrls: ['./denied-dep-man.component.css']
})
export class DeniedDepManComponent implements OnInit {
  depense! : Observable<Array<Depense>>;
  errorMessage! : string;
  constructor(private depenseService : DepenseService) { }

  ngOnInit(): void {
    this.depense=this.depenseService.getDeniedDepenses().pipe(
      catchError(err => {
        this.errorMessage=err.message;
        return throwError(err);
      })
    );
  }

}
