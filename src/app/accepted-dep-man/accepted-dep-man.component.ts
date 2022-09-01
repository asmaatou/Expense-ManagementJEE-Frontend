import { Component, OnInit } from '@angular/core';
import { catchError,map, Observable, throwError } from 'rxjs';
import { Depense } from '../model/Depense.model';
import { DepenseService } from '../_services/depense.service';

@Component({
  selector: 'app-accepted-dep-man',
  templateUrl: './accepted-dep-man.component.html',
  styleUrls: ['./accepted-dep-man.component.css']
})
export class AcceptedDepManComponent implements OnInit {
  depense! : Observable<Array<Depense>>;
  errorMessage! : string;
  constructor(private depenseService : DepenseService) { }

  ngOnInit(): void {
    this.depense=this.depenseService.getAcceptedDepenses().pipe(
      catchError(err => {
        this.errorMessage=err.message;
        return throwError(err);
      })
    );
  }

}
