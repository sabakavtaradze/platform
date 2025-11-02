import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { WelcomepageComponent } from './welcomepage/welcomepage.component';
import { RegisterComponent } from './register/register.component';
import { RegisterconfromComponent } from './register/registerconfrom/registerconfrom.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SharedmoduleModule } from '../sharedmodule/sharedmodule.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AuthenticationService } from 'src/app/services/user/authentication/authentication.service';

const routes: Routes = [
  { path: 'login', component: LoginComponent, pathMatch: 'full', },
  { path: 'register', component: RegisterComponent, pathMatch: 'full', },
  { path: 'registerconfrom', component: RegisterconfromComponent, pathMatch: 'full', },
  { path: 'welcome', component: WelcomepageComponent, pathMatch: 'full', },
];

@NgModule({
  declarations: [
    LoginComponent,
    WelcomepageComponent,
    RegisterComponent,
    RegisterconfromComponent,
    
  ],
  imports: [
    CommonModule,
    FormsModule, // Contains NgModel, fixing ngModel errors
    ReactiveFormsModule,
    MatFormFieldModule, // Contains mat-form-field and mat-label, fixing related errors
    MatInputModule, // Contains matInput
    MatMenuModule,
    MatDatepickerModule,
    MatNativeDateModule,
    SharedmoduleModule,
    MatCheckboxModule,
    RouterModule.forChild(routes) // Contains routerLink, fixing related errors
  ]

})
export class AuthModule { }