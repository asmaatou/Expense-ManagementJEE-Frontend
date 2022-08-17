import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError,map, Observable, throwError } from 'rxjs';
import { Admin } from '../model/admin.model';
import { AdminService } from '../services/admin.service';

declare var window:any;
@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.css']
})
export class AdminsComponent implements OnInit {

  admins! : Observable<Array<Admin>>;
  errorMessage! : string;
  searchFormGroup : FormGroup | undefined ;
  formModal:any;
  newAdminFormGroup! : FormGroup
  constructor(private adminService : AdminService, private fb : FormBuilder , private router:Router) { }

  ngOnInit(): void {
    this.searchFormGroup=this.fb.group({
      keyword : this.fb.control("")
    });
    this.admins=this.adminService.getAdmins().pipe(
      catchError(err => {
        this.errorMessage=err.message;
        return throwError(err);
      })
    );
    this.formModal=new window.bootstrap.Modal(
      document.getElementById("exampleModal")
    );
    this.newAdminFormGroup=this.fb.group({
      fullName:this.fb.control(null,[Validators.required]),
      userName:this.fb.control(null,[Validators.required]),
      email:this.fb.control(null,[Validators.required,Validators.email])
    });
  }
  handleSearchAdmins(){
    let kw = this.searchFormGroup?.value.keyword;
    this.admins=this.adminService.searchAdmins(kw).pipe(
      catchError(err => {
        this.errorMessage=err.message;
        return throwError(err);
      })
    );
  }
  handleSaveAdmin(){
    let admin:Admin=this.newAdminFormGroup.value;
    this.adminService.saveAdmins(admin).subscribe({
      next: data =>{
        alert("Admin has been successfully saved!");
      },error : err => {
        console.log(err);
      }
    });
  }
  handleDeleteAdmin(a: Admin){
    let conf = confirm("Are you sure?")
    if(!conf) return;
    this.adminService.deleteAdmins(a.id).subscribe({
      next : (resp) =>{
        this.admins=this.admins.pipe(
          map(data=>{
            let index=data.indexOf(a);
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
