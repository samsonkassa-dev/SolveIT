import { Component, OnInit } from "@angular/core";
import { AuthService } from "../services/auth.service";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from "@angular/forms";
import { Router } from "@angular/router";
import { User } from "../models/user";
import { r } from "../../../../node_modules/@angular/core/src/render3";
import { PasswordValidation } from "../validator/passwordValidation";
import { PhoneNumberValidation } from "../validator/phoneNumberValidation";
import { UserManagementService } from "../../userManagement/userManagament.service";
import { NgxSpinnerService } from 'ngx-spinner';

declare var $: any;

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  public educationLevels = [
    "Elementary",
    "HighSchool",
    "University Degree",
    "Post Graduate",
    "University Dropout",
    "HighSchool Dropout",
    "Elementary Dropout",
    "Other"
  ];
  public status = [
    "Employee (Full time)",
    "Employee (Part time)",
    "Unemployed",
    "Business Owner",
    "Student",
    "Other"
  ];
  public user: User = {
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    birthDate: "",
    gender: "",
    workStatus: "",
    educationLevel: "",
    address: {},
    cityId: ""
  };
  public address = {
    regionId: "",
    cityId: "",
    wereda: "",
    houseNo: "",
    emergencyContact: {
      fullName: "",
      phoneNumber: ""
    }
  };
  public extraParams = {
    rePassword: "",
    otherEducationLevel: "",
    otherStatus: ""
  };
  public registerForm: FormGroup;
  public isBasicFormActive = true;
  public isAddressFormActive = false;
  public isQuestionariesActive = false;
  public isLoading = false;

  constructor(
    public authService: AuthService,
    public router: Router,
    public formBuilder: FormBuilder,
    public userService: UserManagementService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group(
      {
        firstName: ["", Validators.required],
        middleName: ["", Validators.required],
        lastName: ["", Validators.required],
        username: ["", Validators.required],
        email: ["", Validators.required, this.isEmailUnique.bind(this)],
        phoneNumber: ["", Validators.required],
        password: ["", Validators.required],
        rePassword: ["", Validators.required],
        sex: ["", Validators.required],
        age: ["", Validators.required],
        status: ["", Validators.required],
        educationLevel: ["", Validators.required],
        otherStatus: [""],
        otherEduvationLevel: [""]
      },
      {
        validator: Validators.compose([
          PasswordValidation.MatchPassword,
          PhoneNumberValidation.Validate
        ])
      }
    );
  }

  isFormValid() {
    if (this.registerForm.valid) {
      if (
        (this.user.educationLevel === "Other" &&
          this.extraParams.otherEducationLevel === "") ||
        (this.user.workStatus === "Other" &&
          this.extraParams.otherStatus === "")
      ) {
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
      this.user.email = this.user.email.toLowerCase();
      this.isBasicFormActive = false;
    } else {
      this.markFormGroupTouched(this.registerForm);
    }
  }

  onAdressNext() {
    this.isLoading = true;
    this.user.cityId = this.address.cityId;
    const temp = {
      wereda: this.address.wereda,
      houseNo: this.address.houseNo,
      emergencyContact: {
        fullName: this.address.emergencyContact.fullName,
        phoneNumber: this.address.emergencyContact.phoneNumber
      }
    };
    this.user.address = temp;
    this.spinner.show();
    this.authService.register({ user: this.user }).subscribe(
      res => {
        this.spinner.hide();
        this.isLoading = false;
        this.router.navigate(["login"]);
        $("#registerationInfo").modal("show");
      },
      err => {
        this.isLoading = false;
        this.spinner.hide();
      }
    );
  }

  onAdressBack() {
    this.isBasicFormActive = true;
    this.isAddressFormActive = false;
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

  isEmailUnique(control: FormControl) {
    const q = new Promise((resolve, reject) => {
      setTimeout(() => {
        this.authService.isEmailUnique(this.user.email).subscribe(
          res => {
            if (res) {
              resolve(null);
            } else {
              resolve({ isEmailUnique: true });
            }
          },
          () => {
            resolve(null);
          }
        );
      }, 1000);
    });
    return q;
  }
}