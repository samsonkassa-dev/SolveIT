import { Component, OnInit } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public loginError = false;
  public user = {
    email: "",
    password: ""
  };
  public ICOG_ROLE = [
    "solve-it-mgt",
    "solve-it-team",
    "solve-it-participants",
    "admin"
  ];
  public isLoading = false;

  constructor(public authService: AuthService, public router: Router, private spinner: NgxSpinnerService) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required)
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      this.spinner.show();
      this.isLoading = true;
      this.user.email = this.user.email.toLowerCase();
      this.authService.login(this.user).subscribe(
        res => {
          this.authService.setSession(res);
          this.isLoading = false;
          this.authService.getUserRole(res.userId).subscribe(res1 => {
            if (res1.name === this.ICOG_ROLE[2]) {
              this.router.navigate(["/my-projects"]);
            } else {
              this.router.navigate(["/dashboard"]);
            }
          });
          this.spinner.hide();
        },
        error1 => {
          this.loginError = true;
          this.isLoading = false;
          this.spinner.hide();
        }
      );
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

  forgetPassword() {
    this.router.navigate(["/forget-password"]);
  }
}
