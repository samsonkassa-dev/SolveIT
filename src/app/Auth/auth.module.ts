/** @kal **/

import { NgModule } from '@angular/core';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { AuthService } from './services/auth.service';


@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    RouterModule
  ],
  providers: [AuthService],
  exports: []
})
export class AuthModule { }
