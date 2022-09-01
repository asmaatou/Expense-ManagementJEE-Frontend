import { Component, OnInit } from '@angular/core';
import { catchError,map, Observable, throwError } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Depense } from '../model/Depense.model';
import { DepenseService } from '../_services/depense.service';
import { TokenStorageService } from '../_services/token-storage.service';


@Component({
  selector: 'app-board-depense-emp',
  templateUrl: './board-depense-emp.component.html',
  styleUrls: ['./board-depense-emp.component.css']
})
export class BoardDepenseEmpComponent implements OnInit {
  depense! : Observable<Array<Depense>>;
  errorMessage! : string;
  isLoggedIn = false;
  username?: string;
  newDepenseFormGroup! : FormGroup;
  dep : Depense = new Depense();
  constructor( private depenseService : DepenseService, private tokenStorageService: TokenStorageService, private fb : FormBuilder) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.username = user.username;
    }

    this.depense=this.depenseService.getDepense(this.username).pipe(
      catchError(err => {
        this.errorMessage=err.message;
        return throwError(err);
      })
    );

    this.newDepenseFormGroup=this.fb.group({
      id:this.fb.control('',[Validators.required]),
      dateDepense:this.fb.control('',[Validators.required]),
      client:this.fb.control('',[Validators.required]),
      produit_Projet:this.fb.control('',[Validators.required]),
      typeI:this.fb.control('',[Validators.required]),
      typeD:this.fb.control('',[Validators.required]),
      montant:this.fb.control('',[Validators.required]),
      status:this.fb.control('In progress',[Validators.required]),
      username:this.fb.control(this.username,[Validators.required]),
    })
  }

  addDepense(){
    console.log(this.newDepenseFormGroup);
    this.dep.id=this.newDepenseFormGroup.value.id;
    this.dep.dateDepense=this.newDepenseFormGroup.value.dateDepense;
    this.dep.client=this.newDepenseFormGroup.value.client;
    this.dep.produit_Projet=this.newDepenseFormGroup.value.produit_Projet;
    this.dep.typeI=this.newDepenseFormGroup.value.typeI;
    this.dep.typeD=this.newDepenseFormGroup.value.typeD;
    this.dep.montant=this.newDepenseFormGroup.value.montant;
    this.dep.status=this.newDepenseFormGroup.value.status;
    this.dep.username=this.newDepenseFormGroup.value.username;

    this.depenseService.saveDepense(this.dep).subscribe(res=>{
      console.log(res);
    },err=>{
      console.log(err);
    })
  }
  handleDeleteDepense(d: Depense){
    let conf = confirm("Are you sure?")
    if(!conf) return;
    this.depenseService.deleteDepense(d.id).subscribe({
      next : (resp) =>{
        this.depense=this.depense.pipe(
          map(data=>{
            let index=data.indexOf(d);
            data.slice(index,1)
            return data;
          })
        );
      }, error : err => {
        console.log(err);
      }
    })
  }

  handleEditDepense(depense:Depense){
    this.newDepenseFormGroup.controls['id'].setValue(depense.id);
    this.newDepenseFormGroup.controls['dateDepense'].setValue(depense.dateDepense);
    this.newDepenseFormGroup.controls['client'].setValue(depense.client);
    this.newDepenseFormGroup.controls['produit_Projet'].setValue(depense.produit_Projet);
    this.newDepenseFormGroup.controls['typeI'].setValue(depense.typeI);
    this.newDepenseFormGroup.controls['typeD'].setValue(depense.typeD);
    this.newDepenseFormGroup.controls['montant'].setValue(depense.montant);
    this.newDepenseFormGroup.controls['status'].setValue(depense.status);
    this.newDepenseFormGroup.controls['username'].setValue(depense.username);
  }

  updateDepense(){
    this.dep.id=this.newDepenseFormGroup.value.id;
    this.dep.dateDepense=this.newDepenseFormGroup.value.dateDepense;
    this.dep.client=this.newDepenseFormGroup.value.client;
    this.dep.produit_Projet=this.newDepenseFormGroup.value.produit_Projet;
    this.dep.typeI=this.newDepenseFormGroup.value.typeI;
    this.dep.typeD=this.newDepenseFormGroup.value.typeD;
    this.dep.montant=this.newDepenseFormGroup.value.montant;
    this.dep.status=this.newDepenseFormGroup.value.status;
    this.dep.username=this.newDepenseFormGroup.value.username;

    this.depenseService.editDepense(this.dep.id,this.dep).subscribe(res=>{
      console.log(res);
    },err=>{
      console.log(err);
    })
  }
}
