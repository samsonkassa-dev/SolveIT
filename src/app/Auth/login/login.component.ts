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
  public user = {
    email: '',
    password: ''
  };

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
    this.authService.login(this.user)
      .subscribe(res => {
        this.authService.setSession(res);
        this.router.navigate(['']);
      }, error1 => {
        console.log(error1);
      });


  }

}
