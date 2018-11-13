import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { UserManagementService } from "../userManagament.service";
import { SharedService } from "../../shared/services/shared.service";
import { AuthService } from "../../Auth/services/auth.service";

@Component({
  selector: "app-user-profile",
  templateUrl: "userProfile.component.html",
  styleUrls: ["userProfile.component.css"]
})
export class UserProfileCompomnent implements OnInit {
  public userId: any;
  public user: any;
  public selected = "view";

  constructor(
    public service: UserManagementService,
    public sharedService: SharedService,
    public route: ActivatedRoute,
    public router: Router
  ) {}

    public userId: any;
    public user: any;
    public selected = 'view';
    public disabled = true;

    constructor(public service: UserManagementService, public sharedService: SharedService, public route: ActivatedRoute, public router: Router, public authService: AuthService) {
        
    }

  updateStatus() {
    this.service.updateStatus(this.user).subscribe(
      res => {
        this.sharedService.addToast("Success", "Status Updated!.", "success");
      },
      err => {
        this.sharedService.addToast("", "Error occured!", "error");
      }
    );
  }

  toggleView(view) {
    this.selected = view;
  }
}

    updateStatus(status) {
        let patch = {userType: status};
        this.service.updateStatus(patch).subscribe(
            res => {
                this.sharedService.addToast('Success', 'Status Updated!.', 'success');
                this.user.userType = status;
            }, err => {
                this.sharedService.addToast('', 'Error occured!', 'error');
            }
        );
    }

    toggleView(view) {
        this.selected = view;
    }
}