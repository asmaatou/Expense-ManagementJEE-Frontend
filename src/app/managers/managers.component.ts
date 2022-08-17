import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError,map, Observable, throwError } from 'rxjs';
import { Manager } from '../model/manager.model';
import { ManagerService } from '../services/manager.service';

declare var window:any;
@Component({
  selector: 'app-managers',
  templateUrl: './managers.component.html',
  styleUrls: ['./managers.component.css']
})
export class ManagersComponent implements OnInit {
  managers! : Observable<Array<Manager>>;
  errorMessage! : string;
  searchFormGroup : FormGroup | undefined ;
  formModal:any;
  newManagerFormGroup! : FormGroup
  constructor(private managerService : ManagerService, private fb : FormBuilder , private router:Router) { }

  ngOnInit(): void {
    this.searchFormGroup=this.fb.group({
      keyword : this.fb.control("")
    });
    this.managers=this.managerService.getManagers().pipe(
      catchError(err => {
        this.errorMessage=err.message;
        return throwError(err);
      })
    );
    this.formModal=new window.bootstrap.Modal(
      document.getElementById("exampleModal")
    );
    this.newManagerFormGroup=this.fb.group({
      fullName:this.fb.control(null,[Validators.required]),
      userName:this.fb.control(null,[Validators.required]),
      email:this.fb.control(null,[Validators.required,Validators.email])
    });
  }
  handleSearchManagers(){
    let kw = this.searchFormGroup?.value.keyword;
    this.managers=this.managerService.searchManagers(kw).pipe(
      catchError(err => {
        this.errorMessage=err.message;
        return throwError(err);
      })
    );
  }
  handleSaveManager(){
    let manager:Manager=this.newManagerFormGroup.value;
    this.managerService.saveManagers(manager).subscribe({
      next: data =>{
        alert("Manager has been successfully saved!");
      },error : err => {
        console.log(err);
      }
    });
  }
  handleDeleteManager(m: Manager){
    let conf = confirm("Are you sure?")
    if(!conf) return;
    this.managerService.deleteManagers(m.id).subscribe({
      next : (resp) =>{
        this.managers=this.managers.pipe(
          map(data=>{
            let index=data.indexOf(m);
            data.slice(index,1)
            return data;
          })
        );
      }, error : err => {
        console.log(err);
      }
    })
  }
  openModal(){
    this.formModal.show();
  }
}
