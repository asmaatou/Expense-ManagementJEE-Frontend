import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { ReactiveFormsModule } from '@angular/forms';

import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { BoardManagerComponent } from './board-manager/board-manager.component';
import { BoardEmployeComponent } from './board-employe/board-employe.component';
import { BoardDepenseEmpComponent } from './board-depense-emp/board-depense-emp.component';
import { BoardDepenseManComponent } from './board-depense-man/board-depense-man.component';
import { AcceptedDepManComponent } from './accepted-dep-man/accepted-dep-man.component';
import { DeniedDepManComponent } from './denied-dep-man/denied-dep-man.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    BoardAdminComponent,
    BoardManagerComponent,
    BoardEmployeComponent,
    BoardDepenseEmpComponent,
    BoardDepenseManComponent,
    AcceptedDepManComponent,
    DeniedDepManComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
