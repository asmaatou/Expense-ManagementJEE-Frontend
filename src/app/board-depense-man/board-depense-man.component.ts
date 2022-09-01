import { Component, OnInit } from '@angular/core';
import { catchError,map, Observable, throwError } from 'rxjs';
import { Depense } from '../model/Depense.model';
import { DepenseService } from '../_services/depense.service';

@Component({
  selector: 'app-board-depense-man',
  templateUrl: './board-depense-man.component.html',
  styleUrls: ['./board-depense-man.component.css']
})
export class BoardDepenseManComponent implements OnInit {
  depense! : Observable<Array<Depense>>;
  errorMessage! : string;
   constructor(private depenseService : DepenseService) { }

  ngOnInit(): void {
    this.depense=this.depenseService.getDepenses().pipe(
      catchError(err => {
        this.errorMessage=err.message;
        return throwError(err);
      })
    );
  }
  handleAcceptDepense(d: Depense){
    let conf = confirm("Are you sure you want to accept this expense?")
    if(!conf) return;
    this.depenseService.acceptDepense(d.id,d).subscribe({
      next : (resp) =>{
        this.depense=this.depense.pipe(
          map(data=>{
            return data;
          })
        );
      }, error : err => {
        console.log(err);
      }
    })
  }

  handleDenyDepense(d: Depense){
    let conf = confirm("Are you sure you want to deny this expense?")
    if(!conf) return;
    this.depenseService.denyDepense(d.id,d).subscribe({
      next : (resp) =>{
        this.depense=this.depense.pipe(
          map(data=>{
            return data;
          })
        );
      }, error : err => {
        console.log(err);
      }
    })
  }

}
