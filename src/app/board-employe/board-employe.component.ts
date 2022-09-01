import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs';
import { catchError, Observable, throwError } from 'rxjs';
import { User } from '../model/User.model';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-board-employe',
  templateUrl: './board-employe.component.html',
  styleUrls: ['./board-employe.component.css']
})
export class BoardEmployeComponent implements OnInit {

  employe! : Observable<Array<User>>;
  errorMessage! : string;
  content?: string;
  newEmployeFormGroup! : FormGroup;
  emp : User = new User();

  constructor(private userService: UserService,private fb :FormBuilder) { }

  ngOnInit(): void {
    this.userService.getEmployeBoard().subscribe({
      next: data => {
        this.content = data;
      },
      error: err => {
        this.content = JSON.parse(err.error).message;
      }
    });

    this.employe=this.userService.getEmploye().pipe(
      catchError(err =>{
        this.errorMessage=err.message;
        return throwError(err);
      })
    );
    this.newEmployeFormGroup=this.fb.group({
      id:this.fb.control('',[Validators.required]),
      username:this.fb.control('',[Validators.required]),
      password:this.fb.control('',[Validators.required]),
      email:this.fb.control('',[Validators.required,Validators.email])
    });

  }
  handleEditEmploye(user : User){
    this.newEmployeFormGroup.controls['id'].setValue(user.id);
    this.newEmployeFormGroup.controls['username'].setValue(user.username);
    this.newEmployeFormGroup.controls['password'].setValue(user.password);
    this.newEmployeFormGroup.controls['email'].setValue(user.email);
  }

  updateEmploye(){
    this.emp.id=this.newEmployeFormGroup.value.id;
    this.emp.username=this.newEmployeFormGroup.value.username;
    this.emp.password=this.newEmployeFormGroup.value.password;
    this.emp.email=this.newEmployeFormGroup.value.email;

    this.userService.updateUsers(this.emp.id,this.emp).subscribe(res=>{
      console.log(res);
    },err=>{
      console.log(err);
    })
  }

  handleDeleteEmploye(u: User){
    let conf = confirm("Are you sure?")
    if(!conf) return;
    this.userService.deleteUser(u.id).subscribe({
      next : (resp) =>{
        this.employe=this.employe.pipe(
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
