import { Component, OnInit } from "@angular/core";
import { AuthService } from "../services/auth.service";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { User } from "../models/user";
import { r } from "../../../../node_modules/@angular/core/src/render3";
import { PasswordValidation } from "../validator/passwordValidation";
import { PhoneNumberValidation } from "../validator/phoneNumberValidation";
import { NgxSpinnerService } from "ngx-spinner";

declare var $: any;

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  agreeTos: any;
  public educationLevels = [
    "Elementary",
    "HighSchool",
    "Private College",
    "TVET",
    "University",
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

  parentOccupationOptions = [
    "Employee (Full time)",
    "Employee (Part time)",
    "Unemployed",
    "Business Owner",
    "Student"
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
    cityId: null,
    previousCompetitions: "",
    previousInnovations: "",
    parentsOccupation: null,
    supportNeeded: "",
    financialKnowHow: "",
    financialAccess: "",
    languageOption: "",
    parentFullName: "",
    parentContact: "",
    is_waiting: false
  };
  public address = {
    regionId: null,
    cityId: null,
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
  public agreeTosError = null;
  constructor(
    public authService: AuthService,
    public router: Router,
    public formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.parentOccupationOptions = this.format(this.parentOccupationOptions);
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
        otherEduvationLevel: [""],
        parentFullName: [""],
        parentContact: [""],
        parentsOccupation: [null]
      },
      {
        validator: Validators.compose([
          PasswordValidation.MatchPassword,
          PhoneNumberValidation.Validate
        ])
      }
    );

    this.activatedRoute.queryParams.subscribe(params => {
      this.user.firstName = params["first_name"];
      this.user.middleName = params["middle_name"];
      this.user.lastName = params["last_name"];
      this.user.email = params["email"]
        ? params["email"]
        : params["id"] + "@facebook.com";
      this.user.birthDate = new Date(params["birthday"]);
      this.user.gender = this.setGender(params["gender"]);
      this.user.username = params["name"];
      this.user.facebook = params["fbStatus"]
        ? JSON.parse(params["fbStatus"])
        : null;
    });
  }

  setGender(gender) {
    if (gender === "male") {
      return "M";
    } else if (gender === "female") {
      return "F";
    } else {
      return "";
    }
  }

  format(arrayOfStrings) {
    let result = [];
    arrayOfStrings.forEach(element => {
      result.push({ label: element, value: element });
    });
    return result;
  }

  isFormValid() {
    if (!this.agreeTos) {
      this.agreeTosError = true;
    }
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
  onChange() {
    this.agreeTos = !this.agreeTos;
    //console.log(this.agreeTos)
    if (this.agreeTos) {
      this.agreeTosError = false;
    } else {
      this.agreeTosError = true;
    }
  }
  onRegister() {
    if (this.isFormValid()) {
      if (this.agreeTos) {
        this.isAddressFormActive = true;
        this.user.email = this.user.email.toLowerCase();
        this.isBasicFormActive = false;
      } else {
        this.agreeTosError = true;
      }
    } else {
      this.markFormGroupTouched(this.registerForm);
    }
  }

  onAdressNext(form) {
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
    this.user = {
      ...this.user,
      is_waiting: form.is_waiting,
      previousCompetitions: form.previousCompetitions,
      previousInnovations: form.previousInnovations,
      supportNeeded: form.supportNeeded,
      financialKnowHow: form.financialKnowHow,
      financialAccess: form.financialAccess,
      educationalInstitute: form.educationalInstitute,
      englishReading: form.englishReading,
      englishWriting: form.englishWriting,
      englishSpeaking: form.englishSpeaking
    };
    //console.log(this.user)
    this.spinner.show();
    this.authService.registerParticipant({ user: this.user }).subscribe(
      res => {
        this.spinner.hide();
        this.isLoading = false;
        this.router.navigate(["login"]);
        if (!this.user.facebook) {
          $("#registerationInfo").modal("show");
        }
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
