import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  dep: Depense = new Depense()
  constructor(private depenseService : DepenseService , private fb :FormBuilder) { }

  ngOnInit(): void {
    this.depenses=this.depenseService.getDepenses().pipe(
      catchError(err => {
        this.errorMessage=err.message;
        return throwError(err);
      })
    );
    this.newDepenseFormGroup=this.fb.group({
      id:this.fb.control('',[Validators.required]),
      dateDepense : this.fb.control('',[Validators.required]),
      client :  this.fb.control('',[Validators.required]),
      produit_Projet :  this.fb.control('',[Validators.required]),
      typeI :   this.fb.control('',[Validators.required]),
      typeD :   this.fb.control('',[Validators.required]),
      montant : this.fb.control('',[Validators.required]),
      status :  this.fb.control('',[Validators.required]),
      employeDTO: this.fb.group({
        id: ['',[Validators.required]],
        fullName:['',[Validators.required]],
        userName:['',[Validators.required]],
        email:['',[Validators.required]]
      }),
    });
  }
  handleEditDepense(dep : Depense){
    this.newDepenseFormGroup.controls['id'].setValue(dep.id);
    this.newDepenseFormGroup.controls['client'].setValue(dep.client);
    this.newDepenseFormGroup.controls['produit_Projet'].setValue(dep.produit_Projet);
    this.newDepenseFormGroup.controls['montant'].setValue(dep.montant);
    this.newDepenseFormGroup.controls['status'].setValue(dep.status);
    this.newDepenseFormGroup.controls['fullName'].setValue(dep.employeDTO.fullName)
  }

  //updateDepense(){
    //this.dep.id=this.newDepenseFormGroup.value.id;
    //this.dep.dateDepense=this.newDepenseFormGroup.value.dateDepense;
    /*this.dep.client=this.newDepenseFormGroup.value.client;
    this.dep.produit_Projet=this.newDepenseFormGroup.value.produit_Projet;
    this.dep.typeI=this.newDepenseFormGroup.value.typeI;
    this.dep.typeD=this.newDepenseFormGroup.value.typeD;
    this.dep.montant=this.newDepenseFormGroup.value.montant;
    this.dep.status=this.newDepenseFormGroup.value.status;

    this.depenseService.editDepenses(this.dep.id,this.dep).subscribe(res=>{
      console.log(res);
    },err=>{
      console.log(err);
    })
  }*/

}
