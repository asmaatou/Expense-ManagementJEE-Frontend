import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { BoardEmployeComponent } from './board-employe/board-employe.component';
import { BoardManagerComponent } from './board-manager/board-manager.component';
import { BoardDepenseEmpComponent } from './board-depense-emp/board-depense-emp.component';
import { BoardDepenseManComponent } from './board-depense-man/board-depense-man.component';
import { AcceptedDepManComponent } from './accepted-dep-man/accepted-dep-man.component';
import { DeniedDepManComponent } from './denied-dep-man/denied-dep-man.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'employe', component: BoardEmployeComponent },
  { path: 'manager', component: BoardManagerComponent },
  { path: 'admin', component: BoardAdminComponent },
  { path: 'depense', component:  BoardDepenseEmpComponent},
  { path: 'manageDepense', component : BoardDepenseManComponent},
  { path: 'acceptedDepense', component : AcceptedDepManComponent},
  { path: 'deniedDepense', component : DeniedDepManComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
