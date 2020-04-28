import { AuthService } from "../../../Auth/services/auth.service";
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from "@angular/router";
import { SharedService } from "../../../shared/services/shared.service";
import { WaitingService } from "../waiting.service";
import { Component, OnInit } from "@angular/core";
declare var $: any;

@Component({
  selector: "app-waiting-list",
  templateUrl: "./waiting-list.component.html",
  styleUrls: ["./waiting-list.component.css"]
})
export class WaitingListComponent implements OnInit {
  public selected = "0";
  public page = 1;
  public keyword = "";
  public backupUsers = [];
  public allUsers = [];
  public selectedUsers = [];
  public selectedCity = 0;
  public selectedCityComp = "";
  public selectedStatus = "";
  public views = [
    { name: "solveitmgmt", id: "" },
    { name: "solveitteam", id: "" },
    { name: "participant", id: "" },
    { name: "investor", id: "" }
  ];
  public cities = [];
  public selectedYear = "2020";

  constructor(
    public service: WaitingService,
    public authService: AuthService,
    public sharedService: SharedService,
    public router: Router,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.populateUsersList();
    this.getCities();
  }

  getAllUsers() {
    this.service.getUserList().subscribe(
      res => {
        this.allUsers = res;
        this.filterUsers();
      },
      error => {
        this.spinner.hide();
      }
    );
  }

  getCities() {
    this.service.getCities().subscribe(res => {
      this.cities = res;
    });
  }

  populateUsersList() {
    this.spinner.show();
    this.service.getRoles().subscribe(res => {
      for (let i = 0; i < res.length; ++i) {
        if (res[i].name === "solve-it-team") {
          this.views[1].id = res[i].id;
        } else if (res[i].name === "solve-it-mgt") {
          this.views[0].id = res[i].id;
        } else if (res[i].name === "solve-it-participants") {
          this.views[2].id = res[i].id;
        } else if (res[i].name === "solve-it-investor") {
          this.views[3].id = res[i].id;
        }
      }
      this.getAllUsers();
    });
  }

  activateUser(user) {
    this.service
      .activateDeactivateUser(user.id, { status: "ACTIVE" })
      .subscribe(
        res => {
          this.sharedService.addToast(
            "Success",
            "Account Activated!",
            "success"
          );
          this.allUsers[this.allUsers.indexOf(user)].status = "ACTIVE";
        },
        err => {
          if ((err.status = 422)) {
            this.sharedService.addToast("", "Error occured!", "error");
          }
        }
      );
  }

  deactivateUser(user) {
    this.service
      .activateDeactivateUser(user.id, { status: "INACTIVE" })
      .subscribe(
        res => {
          this.sharedService.addToast(
            "Success",
            "Account Deactivated!",
            "success"
          );
          this.allUsers[this.allUsers.indexOf(user)].status = "INACTIVE";
        },
        err => {
          if ((err.status = 422)) {
            this.sharedService.addToast("", "Error occured!", "error");
          }
        }
      );
  }
  transferUser(user) {
    this.service
      .activateDeactivateUser(user.id, { is_waiting: false })
      .subscribe(
        res => {
          this.sharedService.addToast(
            "Success",
            "Account Activated!",
            "success"
          );
          this.ngOnInit();
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

    this.filterUsers();
  }
  filterUsersPerCity() {
    let temp = [];
    let counter = 0;
    this.cities.forEach(city => {
      let res: any = [];
      res = this.allUsers.filter(item => {
        var date = new Date(item.created);
        var year = date.getFullYear();

        return item.cityId === city.id && item.created >= parseInt("2020");
      });
      if (res) {
        temp.push("City Name " + city.name + " Amount " + res.length);
        counter += res.length;
      }
    });
  }
  filterUsers() {
    this.filterUsersPerCity();
    if (
      !this.selectedCityComp ||
      parseInt(this.selectedCityComp.toString()) === 0
    ) {
      this.selectedUsers = this.allUsers.filter(item => {
        var date = new Date(item.created);
        var year = date.getFullYear();
        if (this.selectedStatus === "confirmed") {
          return item.emailVerified && year >= parseInt(this.selectedYear);
        } else if (this.selectedStatus === "unconfirmed") {
          return !item.emailVerified && year >= parseInt(this.selectedYear);
        } else {
          return year >= parseInt(this.selectedYear);
        }
      });
    } else {
      this.selectedUsers = this.allUsers.filter(item => {
        var date = new Date(item.created);
        var year = date.getFullYear();
        if (this.selectedStatus === "confirmed") {
          return (
            item.cityId === this.selectedCityComp.toString() &&
            item.emailVerified &&
            year >= parseInt(this.selectedYear)
          );
        } else if (this.selectedStatus === "unconfirmed") {
          return (
            item.cityId === this.selectedCityComp.toString() &&
            !item.emailVerified &&
            year >= parseInt(this.selectedYear)
          );
        } else {
          return (
            item.cityId === this.selectedCityComp.toString() &&
            year >= parseInt(this.selectedYear)
          );
        }
      });
    }

    this.backupUsers = this.selectedUsers;
    this.spinner.hide();
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

  createUser() {}

  viewUserProfile(user) {
    this.router.navigate(["dashboard/userProfile/", user.id]);
  }

  verifyEmail(user) {
    let verifiedUser = user;
    verifiedUser.emailVerified = true;
    if (verifiedUser.address === "None") {
      verifiedUser.address = {};
    }
    if (verifiedUser.birthDate === "None") {
      verifiedUser.birthDate = null;
    }
    this.service.updateProfile(verifiedUser).subscribe(
      res => {
        if (res.error) {
          this.sharedService.addToast("", "Error occurred!", "error");
        } else {
          this.sharedService.addToast("", "Confirmed Successfully!", "success");

          this.selectedUsers.splice(this.selectedUsers.indexOf(user), 1);
        }
      },
      error => {
        this.sharedService.addToast("", "Error occurred!", "error");
      }
    );
  }
}
