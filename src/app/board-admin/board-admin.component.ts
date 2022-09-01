import { Component, OnInit } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../model/User.model';
import { map } from 'rxjs';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.css']
})
export class BoardAdminComponent implements OnInit {
  content?: string;
  admin! : Observable<Array<User>>;
  errorMessage! : string;
  newAdminFormGroup! : FormGroup;
  emp : User = new User();

  constructor(private userService: UserService,private fb :FormBuilder) { }

  ngOnInit(): void {
    this.userService.getAdminBoard().subscribe({
      next: data => {
        this.content = data;
      },
      error: err => {
        this.content = JSON.parse(err.error).message;
      }
    });
    this.admin=this.userService.getAdmin().pipe(
      catchError(err =>{
        this.errorMessage=err.message;
        return throwError(err);
      })
    );
    this.newAdminFormGroup=this.fb.group({
      id:this.fb.control('',[Validators.required]),
      username:this.fb.control('',[Validators.required]),
      password:this.fb.control('',[Validators.required]),
      email:this.fb.control('',[Validators.required,Validators.email])
    });
  }
  handleEditAdmin(user : User){
    this.newAdminFormGroup.controls['id'].setValue(user.id);
    this.newAdminFormGroup.controls['username'].setValue(user.username);
    this.newAdminFormGroup.controls['password'].setValue(user.password);
    this.newAdminFormGroup.controls['email'].setValue(user.email);
  }

  updateAdmin(){
    this.emp.id=this.newAdminFormGroup.value.id;
    this.emp.username=this.newAdminFormGroup.value.username;
    this.emp.password=this.newAdminFormGroup.value.password;
    this.emp.email=this.newAdminFormGroup.value.email;

    this.userService.updateUsers(this.emp.id,this.emp).subscribe(res=>{
      console.log(res);
    },err=>{
      console.log(err);
    })
  }

  handleDeleteAdmin(u: User){
    let conf = confirm("Are you sure?")
    if(!conf) return;
    this.userService.deleteUser(u.id).subscribe({
      next : (resp) =>{
        this.admin=this.admin.pipe(
          map(data=>{
            let index=data.indexOf(u);
            data.slice(index,1)
            return data;
          })
        );
      }, error : err => {
        console.log(err);
      }
    })
  }
}
