import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError,first,map, Observable, throwError } from 'rxjs';
import { Employe } from '../model/employe.model';
import { EmployeService } from '../services/employe.service';



@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  employees! : Observable<Array<Employe>>;
  errorMessage! : string;
  searchFormGroup : FormGroup | undefined ;
  formModal:any;
  newEmployeFormGroup! : FormGroup;

  constructor(private employeService : EmployeService, private fb : FormBuilder , private router:Router) { }

  ngOnInit(): void {

    this.searchFormGroup=this.fb.group({
      keyword : this.fb.control("")
    });
    this.employees=this.employeService.getEmployees().pipe(
      catchError(err => {
        this.errorMessage=err.message;
        return throwError(err);
      })
    );

    this.newEmployeFormGroup=this.fb.group({
      fullName:this.fb.control('',[Validators.required]),
      userName:this.fb.control('',[Validators.required]),
      email:this.fb.control('',[Validators.required,Validators.email])
    });

  }
  handleSearchEmployees(){
    let kw = this.searchFormGroup?.value.keyword;
    this.employees=this.employeService.searchEmployees(kw).pipe(
      catchError(err => {
        this.errorMessage=err.message;
        return throwError(err);
      })
    );
  }
  handleSaveEmploye(){
    let employe:Employe=this.newEmployeFormGroup.value;
    this.employeService.saveEmployees(employe).subscribe({
      next: data =>{
        console.log("Employe has been successfully saved!");
      },error : err => {
        console.log(err);
      }
    });
  }

  handleDeleteEmploye(e: Employe){
    let conf = confirm("Are you sure?")
    if(!conf) return;
    this.employeService.deleteEmployees(e.id).subscribe({
      next : (resp) =>{
        this.employees=this.employees.pipe(
          map(data=>{
            let index=data.indexOf(e);
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
