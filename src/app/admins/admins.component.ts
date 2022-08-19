import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError,map, Observable, throwError } from 'rxjs';
import { Admin } from '../model/admin.model';
import { AdminService } from '../services/admin.service';


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
  adm: Admin = new Admin()
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
    this.newAdminFormGroup=this.fb.group({
      id:this.fb.control(null,[Validators.required]),
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
  handleEditAdmin(admin:Admin){
    this.newAdminFormGroup.controls['id'].setValue(admin.id);
    this.newAdminFormGroup.controls['fullName'].setValue(admin.fullName);
    this.newAdminFormGroup.controls['userName'].setValue(admin.userName);
    this.newAdminFormGroup.controls['email'].setValue(admin.email);
  }
  updateAdmin(){
    this.adm.id=this.newAdminFormGroup.value.id;
    this.adm.fullName=this.newAdminFormGroup.value.fullName;
    this.adm.userName=this.newAdminFormGroup.value.userName;
    this.adm.email=this.newAdminFormGroup.value.email;
    this.adminService.editAdmins(this.adm.id,this.adm).subscribe(res=>{
      console.log(res);
    },err=>{
      console.log(err);
    })
  }

  addAdmin(){
    console.log(this.newAdminFormGroup);
    this.adm.id=this.newAdminFormGroup.value.id;
    this.adm.fullName=this.newAdminFormGroup.value.fullName;
    this.adm.userName=this.newAdminFormGroup.value.userName;
    this.adm.email=this.newAdminFormGroup.value.email;

    this.adminService.saveAdmins(this.adm).subscribe(res=>{
      console.log(res);
    },err=>{
      console.log(err);
    })
  }


}
