import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { Router } from "@angular/router";
import { UserManagementService } from "../userManagament.service";
import { SharedService } from "../../shared/services/shared.service";
import { AuthService } from "../../Auth/services/auth.service";

@Component({
  selector: "app-user-list",
  templateUrl: "userList.component.html",
  styleUrls: ["userList.component.css"]
})
export class UserListComponent implements OnInit {
  @Output() create = new EventEmitter();
  public selected = "0";
  public page = 1;
  public keyword = "";
  public backupUsers = [];
  public allUsers = [];
  public selectedUsers = [];
  public views = [
    { name: "solveitmgmt", id: "" },
    { name: "solveitteam", id: "" },
    { name: "participant", id: "" }
  ];
  public cities = [];
  public selectedRole = this.views[0];
  public selectedCity = 0;

  constructor(
    public service: UserManagementService,
    public sharedService: SharedService,
    public router: Router
  ) {}

  ngOnInit() {
    this.populateUsersList();
    this.getCities();
  }

  getAllUsers() {
    this.service.getUserList().subscribe(res => {
      this.allUsers = res;
      this.filterUsers();
    });
  }

  getCities() {
    this.service.getCities().subscribe(res => {
      this.cities = res;
    });
  }

  populateUsersList() {
    this.service.getRoles().subscribe(res => {
      for (let i = 0; i < res.length; ++i) {
        if (res[i].name === "solve-it-team") {
          this.views[1].id = res[i].id;
        } else if (res[i].name === "solve-it-mgt") {
          this.views[0].id = res[i].id;
        } else if (res[i].name === "solve-it-participants") {
          this.views[2].id = res[i].id;
        }
      }
      this.getAllUsers();
    });
  }

  activateUser(user) {
    const updatedUser = user;
    updatedUser.status = "ACTIVE";
    this.service.activateDeactivateUser(updatedUser).subscribe(
      res => {
        this.sharedService.addToast("Success", "Account Activated!", "success");
        user.status = "ACTIVE";
      },
      err => {
        if ((err.status = 422)) {
          this.sharedService.addToast("", "Error occured!", "error");
        }
      }
    );
  }

  deactivateUser(user) {
    const updatedUser = user;
    updatedUser.status = "INACTIVE";
    this.service.activateDeactivateUser(updatedUser).subscribe(
      res => {
        this.sharedService.addToast(
          "Success",
          "Account Deactivated!",
          "success"
        );
        user.status = "INACTIVE";
      },
      err => {
        if ((err.status = 422)) {
          this.sharedService.addToast("", "Error occured!", "error");
        }
      }
    );
  }

  toggleView(index: string) {
    this.page = 1;
    this.selectedRole = this.views[parseInt(index)];
    this.filterUsers();
  }

  filterUsers() {
    if (this.selectedRole.name === "participant") {
      if (parseInt(this.selectedCity.toString()) === 0) {
        this.selectedUsers = this.allUsers.filter(item => {
          return item.roleId === this.selectedRole.id;
        });
      } else {
        this.selectedUsers = this.allUsers.filter(item => {
          return (
            item.roleId === this.selectedRole.id &&
            item.cityId === this.selectedCity.toString()
          );
        });
      }
    } else {
      this.selectedUsers = this.allUsers.filter(item => {
        return item.roleId === this.selectedRole.id;
      });
    }
    this.backupUsers = this.selectedUsers;
  }

  searchUser($event) {
    if (this.keyword !== "") {
      this.selectedUsers = this.backupUsers.filter(item => {
        return (
          item.email.toUpperCase().includes(this.keyword.toUpperCase()) ||
          item.firstName.toUpperCase().includes(this.keyword.toUpperCase()) ||
          item.middleName.toUpperCase().includes(this.keyword.toUpperCase()) ||
          item.lastName.toUpperCase().includes(this.keyword.toUpperCase())
        );
      });
    } else {
      this.selectedUsers = this.backupUsers;
    }
  }

  createUser() {
    this.create.emit();
  }

  viewUserProfile(user) {
    this.router.navigate(["/userProfile/", user.id]);
  }

  processModerator(user) {
    if (!user.isModerator) {
      this.service.grantModeratorAccess(user).subscribe(
        res => {
          this.sharedService.addToast(
            "Success",
            "Moderator Access Granted!",
            "success"
          );
          user.isModerator = true;
        },
        err => {
          if ((err.status = 422)) {
            this.sharedService.addToast("", "Error occured!", "error");
          }
        }
      );
    } else {
      this.service.detainModeratorAccess(user).subscribe(
        res => {
          this.sharedService.addToast(
            "Success",
            "Moderator Access Detained!",
            "success"
          );
          user.isModerator = false;
        },
        err => {
          if ((err.status = 422)) {
            this.sharedService.addToast("", "Error occured!", "error");
          }
        }
      );
    }
  }
}
