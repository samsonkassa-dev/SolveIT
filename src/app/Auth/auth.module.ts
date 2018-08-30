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


@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    AdressComponent,
    QuestionariesComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    CommonModule,
    SharedModule
  ],
  providers: [AuthService],
  exports: [],
})
export class AuthModule { }
