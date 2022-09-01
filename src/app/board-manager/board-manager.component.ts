import { Component, OnInit } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../model/User.model';
import { map } from 'rxjs';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-board-manager',
  templateUrl: './board-manager.component.html',
  styleUrls: ['./board-manager.component.css']
})
export class BoardManagerComponent implements OnInit {

  content?: string;
  manager! : Observable<Array<User>>;
  errorMessage! : string;
  newManagerFormGroup! : FormGroup;
  emp : User = new User();

  constructor(private userService:UserService,private fb :FormBuilder) { }

  ngOnInit(): void {
    this.userService.getManagerBoard().subscribe({
      next: data => {
        this.content = data;
      },
      error: err => {
        this.content = JSON.parse(err.error).message;
      }
    });
    this.manager=this.userService.getManager().pipe(
      catchError(err =>{
        this.errorMessage=err.message;
        return throwError(err);
      })
    );
    this.newManagerFormGroup=this.fb.group({
      id:this.fb.control('',[Validators.required]),
      username:this.fb.control('',[Validators.required]),
      password:this.fb.control('',[Validators.required]),
      email:this.fb.control('',[Validators.required,Validators.email])
    });
  }

  handleEditManager(user : User){
    this.newManagerFormGroup.controls['id'].setValue(user.id);
    this.newManagerFormGroup.controls['username'].setValue(user.username);
    this.newManagerFormGroup.controls['password'].setValue(user.password);
    this.newManagerFormGroup.controls['email'].setValue(user.email);
  }

  updateManager(){
    this.emp.id=this.newManagerFormGroup.value.id;
    this.emp.username=this.newManagerFormGroup.value.username;
    this.emp.password=this.newManagerFormGroup.value.password;
    this.emp.email=this.newManagerFormGroup.value.email;

    this.userService.updateUsers(this.emp.id,this.emp).subscribe(res=>{
      console.log(res);
    },err=>{
      console.log(err);
    })
  }

  handleDeleteManager(u: User){
    let conf = confirm("Are you sure?")
    if(!conf) return;
    this.userService.deleteUser(u.id).subscribe({
      next : (resp) =>{
        this.manager=this.manager.pipe(
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
