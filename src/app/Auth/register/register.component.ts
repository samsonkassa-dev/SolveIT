import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {Router} from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public user = {
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    rePassword: ''
  };
  public registerForm: FormGroup;

  constructor(public authService: AuthService, public router: Router) { }

  ngOnInit() {
    this.registerForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      middleName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      phoneNumber: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      rePassword: new FormControl('', Validators.required)
    });
  }

  onRegister() {
    this.authService.register(this.user)
      .subscribe(res => {
        if (res.firstName) {
          this.router.navigate(['login']);
        }
      });
  }

}
