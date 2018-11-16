import { Component, OnInit } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-email-confirmation",
  templateUrl: "./email-confirmation.component.html",
  styleUrls: ["./email-confirmation.component.css"]
})
export class EmailConfirmationComponent implements OnInit {
  public param: string;
  public loading = true;
  public error = false;

  constructor(
    public authService: AuthService,
    public route: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe(res => {
      this.param = res.id;
      // split the userId and cId
      const temp = this.param.split("-");
      this.authService.confirmEmail(temp[0], temp[1]).subscribe(
        res1 => {
          this.loading = false;
          this.router.navigate(["login"]);
        },
        err => {
          this.loading = false;
        }
      );
    });
  }
}
