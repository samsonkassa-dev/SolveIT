import { configs } from './../app.config';
import { CommonService } from './../shared/services/common.service';
import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { AuthService } from "../Auth/services/auth.service";
import { Router } from "@angular/router";
import { Http } from "@angular/http";


declare var $: any;

@Component({
  selector: "app-landing-page",
  templateUrl: "./landing-page.component.html",
  styleUrls: [

    "./landing-page.component.css"]
})
export class LandingPageComponent implements OnInit {



  news: any = [];
  solveItTeam = [];
  constructor(
    public authService: AuthService,
    private commonService: CommonService,
    public router: Router,
    public http: Http
  ) { }

  ngOnInit() {
    var i = 0;
    var txt = 'Be part of This Initiative';
    var speed = 50;

    function typeWriter() {
      console.log("Called")
      if (i < txt.length) {
        document.getElementById("be-part").innerHTML += txt.charAt(i);
        i++;
        setTimeout(typeWriter, speed);
      }
    }
    $(window).scroll(function () {
      if ($('#be-part').offset() != undefined) {
        var hT = $('#be-part').offset().top,
          hH = $('#be-part').outerHeight(),
          wH = $(window).height(),
          wS = $(this).scrollTop();
        if (wS > (hT + hH - wH)) {
          setTimeout(typeWriter, 1000);
        }
      }

    });

    this.commonService.getSolveItTeam()
      .subscribe(res => {
        if (res.length > 4) {
          this.solveItTeam = res.slice(0, 4)
        } else {
          this.solveItTeam = res

        }
      })






  }

  toggleMenu() {
    if ($("#menus").css("display") === "none") {
      $("#menus").css("display", "block");
      $("#menus").css("background", "white");
    } else {
      $("#menus").css("display", "none");
    }
  }

  getImageUrl(item) {
    return `${configs.rootUrl}storages/${item.container}/download/${item.name}`;
  }

}
