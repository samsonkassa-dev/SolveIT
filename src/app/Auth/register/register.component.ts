import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {User} from '../models/user';
import {r} from '../../../../node_modules/@angular/core/src/render3';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public ageRange = [];
  public educationLevels = [
    'Elementary',
    'HighSchool',
    'University Degree',
    'Post Graduate',
    'University Dropout',
    'HighSchool Dropout',
    'Elementary Dropout',
    'Other'
  ];
  public status = [
    'Employee (Full time)',
    'Employee (Part time)',
    'Unemployed',
    'Business Owner',
    'Student',
    'Other'
  ];
  public user: User = {
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    age: 18,
    sex: '',
    workStatus: '',
    educationLevel: '',
    address: {}
  };
  public address = {
    region: '',
    city: '',
    wereda: '',
    houseNo: '',
    emergencyContact: {
      fullName: '',
      phoneNumber: ''
    }
  };
  public extraParams = {
    rePassword: '',
    otherEducationLevel: '',
    otherStatus: ''
  };
  public registerForm: FormGroup;
  public isBasicFormActive = true;
  public isAddressFormActive = false;
  public isQuestionariesActive = false;

  constructor(public authService: AuthService, public router: Router) {}

  ngOnInit() {

    for (let i = 10; i < 25; i++) {
      this.ageRange.push(i);
    }

    this.registerForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      middleName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      phoneNumber: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      rePassword: new FormControl('', Validators.required),
      sex: new FormControl('', Validators.required),
      age: new FormControl(this.user.age, Validators.required),
      status: new FormControl(''),
      educationLevel: new FormControl('', Validators.required),
      otherStatus: new FormControl(''),
      otherEducationLevel: new FormControl('')
    });
  }

  isFormValid() {
    if (this.registerForm.valid) {
      if ((this.user.educationLevel === 'Other' && this.extraParams.otherEducationLevel === '') || (this.user.workStatus === 'Other' && this.extraParams.otherStatus === '')) {
        return false;
      } else {
        return true;
      }
    }
    return false;
  }

  onRegister() {
    if (this.isFormValid()) {

      this.isAddressFormActive = true;
      this.isBasicFormActive = false;
    } else {
      console.log('Register form is not valid');
    }
  }

  debugg($event) {
    console.log(this.registerForm.controls.otherEducationLevel);
  }

  onAdressNext() {
    this.user.address = this.address;
    console.log(this.user);
    this.authService.register({user: this.user})
      .subscribe(res => {
        console.log(res);
        this.router.navigate(['login']);
      }, err => {
        console.log('Error while registering User', err);
      });
    console.log(this.user);
  }

  onAdressBack() {
    this.isBasicFormActive = true;
    this.isAddressFormActive = false;
  }

}
