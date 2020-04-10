import { CommonService } from "./../services/common.service";
import { SharedService } from "./../services/shared.service";
import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../Auth/services/auth.service";
import { Router } from "@angular/router";
declare var $: any;
@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  userId;
  notificationList = [];
  constructor(
    public authService: AuthService,
    public router: Router,
    private commonService: CommonService
  ) {}

  ngOnInit() {
    this.userId = this.authService.getUserId();
    $("a").on("click", function(e) {
      e.preventDefault();
      if (document.querySelector(".nav-transparent")) {
        document.querySelector(".nav-transparent").classList.remove("open");
        document.querySelector(".navbar-collapse").classList.remove("in");
      }
    });
    //console.log(this.userId)
    if (this.userId) {
      this.getNotifications(this.userId);
    }
  }
  getUserProfile() {
    // [routerLink]="['/userProfile', authService.getUserId()]"
    //console.log(this.authService.getUserId())
    this.router.navigate([
      "dashboard",
      "userProfile",
      this.authService.getUserId()
    ]);
  }
  getNotifications(userId) {
    this.commonService.getNotification(userId).subscribe(res => {
      this.notificationList = res;
    });
  }

  deleteNotification(notification) {
    //console.log(notification)
    if (notification.projectId) {
      this.router
        .navigate(["my-projects", notification.projectId])
        .then(val => {
          if (val) {
            this.commonService
              .deleteNotification(notification)
              .subscribe(res => {
                this.ngOnInit();
              });
          }
        });
    } else {
      this.commonService.deleteNotification(notification).subscribe(res => {
        this.ngOnInit();
      });
    }
  }
}
