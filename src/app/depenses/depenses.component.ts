import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError,first,map, Observable, throwError } from 'rxjs';
import { Depense } from '../model/depense.model';
import { DepenseService } from '../services/depense.service';


@Component({
  selector: 'app-depenses',
  templateUrl: './depenses.component.html',
  styleUrls: ['./depenses.component.css']
})
export class DepensesComponent implements OnInit {
  depenses! : Observable<Array<Depense>>;
  errorMessage! : string;
  searchFormGroup : FormGroup | undefined ;
  formModal:any;
  newDepenseFormGroup! : FormGroup;

  constructor(private depenseService : DepenseService , private fb :FormBuilder,) { }

  ngOnInit(): void {
    this.depenses=this.depenseService.getDepenses().pipe(
      catchError(err => {
        this.errorMessage=err.message;
        return throwError(err);
      })
    );

    this.newDepenseFormGroup=this.fb.group({
      dateDepense :    this.fb.control('',[Validators.required]),
      client :  this.fb.control('',[Validators.required]),
      produit_Projet :  this.fb.control('',[Validators.required]),
      typeI :   this.fb.control('',[Validators.required]),
      typeD :   this.fb.control('',[Validators.required]),
      montant : this.fb.control('',[Validators.required]),
      status :  this.fb.control('',[Validators.required]),
      employe : this.fb.control('',[Validators.required]),
    });
  }

}
