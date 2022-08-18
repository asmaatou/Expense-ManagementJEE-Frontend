import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdmindashComponent } from './admindash/admindash.component';
import { AdminsComponent } from './admins/admins.component';
import { DepensesComponent } from './depenses/depenses.component';
import { EmployeesComponent } from './employees/employees.component';
import { ManagersComponent } from './managers/managers.component';

const routes: Routes = [
  {path:"admindash", component:AdmindashComponent},
  {path:"employees", component:EmployeesComponent},
  {path:"admins",component:AdminsComponent},
  {path:"managers",component:ManagersComponent},
  {path:"expenses",component:DepensesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
