import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError,map, Observable, throwError } from 'rxjs';
import { Manager } from '../model/manager.model';
import { ManagerService } from '../services/manager.service';


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
  mng: Manager = new Manager()
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
    this.newManagerFormGroup=this.fb.group({
      id:this.fb.control(null,[Validators.required]),
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
  handleEditManager(manager:Manager){
    this.newManagerFormGroup.controls['id'].setValue(manager.id);
    this.newManagerFormGroup.controls['fullName'].setValue(manager.fullName);
    this.newManagerFormGroup.controls['userName'].setValue(manager.userName);
    this.newManagerFormGroup.controls['email'].setValue(manager.email);
  }
  updateManager(){
    this.mng.id=this.newManagerFormGroup.value.id;
    this.mng.fullName=this.newManagerFormGroup.value.fullName;
    this.mng.userName=this.newManagerFormGroup.value.userName;
    this.mng.email=this.newManagerFormGroup.value.email;
    this.managerService.editManagers(this.mng.id,this.mng).subscribe(res=>{
      console.log(res);
    },err=>{
      console.log(err);
    })
  }

  addManager(){
    console.log(this.newManagerFormGroup);
    this.mng.id=this.newManagerFormGroup.value.id;
    this.mng.fullName=this.newManagerFormGroup.value.fullName;
    this.mng.userName=this.newManagerFormGroup.value.userName;
    this.mng.email=this.newManagerFormGroup.value.email;

    this.managerService.saveManagers(this.mng).subscribe(res=>{
      console.log(res);
    },err=>{
      console.log(err);
    })
  }
}
