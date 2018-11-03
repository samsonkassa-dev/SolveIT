/** @kal **/

import { NgModule } from '@angular/core';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { AuthService } from './services/auth.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import { AdressComponent } from './adress/adress.component';
import { QuestionariesComponent } from './questionaries/questionaries.component';
import { EmailConfirmationComponent } from './email-confirmation/email-confirmation.component';
import {NotSignedinGuardService} from './services/not-signedin-guard.service';
import {AdminGuardService} from './services/admin-guard.service';
import {DashboardGuardService} from './services/dashboard-guard.service';
import {OwlDateTimeModule, OwlNativeDateTimeModule} from 'ng-pick-datetime';


@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    AdressComponent,
    QuestionariesComponent,
    EmailConfirmationComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    CommonModule,
    SharedModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule
  ],
  providers: [AuthService, NotSignedinGuardService, AdminGuardService, DashboardGuardService],
  exports: [],
})
export class AuthModule { }
