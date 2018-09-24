import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';
import {User} from '../models/user';
import {r} from '../../../../node_modules/@angular/core/src/render3';
import {PasswordValidation} from '../validator/passwordValidation';
import {PhoneNumberValidation} from '../validator/phoneNumberValidation';


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

  constructor(public authService: AuthService, public router: Router, public formBuilder: FormBuilder) {}

  ngOnInit() {

    for (let i = 10; i < 25; i++) {
      this.ageRange.push(i);
    }

    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      middleName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      password: ['', Validators.required],
      rePassword: ['', Validators.required],
      sex: ['', Validators.required],
      age: ['', Validators.required],
      status: ['', Validators.required],
      educationLevel: ['', Validators.required],
      otherStatus: [''],
      otherEduvationLevel: ['']
    }, {
      validator: Validators.compose([PasswordValidation.MatchPassword, PhoneNumberValidation.Validate])
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
      console.log(this.registerForm);
      console.log('Register form is not valid');
    }
  }

  debug($event) {
    console.log(this.registerForm.controls);
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
