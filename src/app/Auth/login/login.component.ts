import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public loginError = false;
  public user = {
    email: '',
    password: ''
  };
  public isLoading = false;

  constructor(public authService: AuthService, public router: Router) { }

  ngOnInit() {
    console.log('Authenticated', this.authService.isAuthenticated());
    console.log('isSolveitParticipant', this.authService.isSolveitParticipant());
    console.log('isSolveitTeam', this.authService.isSolveitTeam());
    console.log('isSolveitManagement', this.authService.isSolveitManager());
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.authService.login(this.user)
        .subscribe(res => {
          this.authService.setSession(res);
          this.isLoading = false;
          this.router.navigate(['']);
        }, error1 => {
          this.loginError = true;
          this.isLoading = false;
        });
    } else {
      this.markFormGroupTouched(this.loginForm);
    }
  }

  /**
   * Marks all controls in a form group as touched
   * @param formGroup - The form group to touch
   */
  public markFormGroupTouched(formGroup: any) {
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }

}
