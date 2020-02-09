import { configs } from "./../app.config";
import { CommonService } from "./../shared/services/common.service";
import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { AuthService } from "../Auth/services/auth.service";
import { Router } from "@angular/router";
import { Http } from "@angular/http";

declare var $: any;

@Component({
  selector: "app-landing-page",
  templateUrl: "./landing-page.component.html",
  styleUrls: ["./landing-page.component.css"]
})
export class LandingPageComponent implements OnInit {
  news: any = [];
  solveItTeam = [];
  counterLoaded = false;
  constructor(
    public authService: AuthService,
    private commonService: CommonService,
    public router: Router,
    public http: Http
  ) {}

  ngOnInit() {
    setTimeout(() => {
      this.loadScript("landing.js");
    }, 1000);
    var array = ["First", "Second", "Third", "Special Recognition"];

    $("a").on("click", function(e) {
      e.preventDefault();
      document.querySelector(".nav-transparent").classList.remove("open");
      document.querySelector(".navbar-collapse").classList.remove("in");
    });

    var i = 0;
    var txt = "Be part of This Initiative";
    var speed = 125;
    let called = [];
    function typeWriter() {
      if (
        i < txt.length &&
        called.indexOf(i) <= 0 &&
        txt.includes(document.getElementById("be-part").innerHTML)
      ) {
        document.getElementById("be-part").innerHTML += txt.charAt(i);
        called.push(i);
        i++;
        setTimeout(typeWriter, speed);
      } else {
        document.getElementById("be-part").innerHTML = txt;
        i = txt.length;
      }
    }
    $(window).scroll(function() {
      if ($("#be-part").offset() != undefined) {
        var hT = $("#be-part").offset().top,
          hH = $("#be-part").outerHeight(),
          wH = $(window).height(),
          wS = $(this).scrollTop();
        if (wS > hT + hH - wH) {
          setTimeout(typeWriter, 1000);
        }
      }
      if ($("#count-container").offset() != undefined) {
        var hT = $("#count-container").offset().top,
          hH = $("#count-container").outerHeight(),
          wH = $(window).height(),
          wS = $(this).scrollTop();
        if (wS > hT + hH - wH) {
          if (!this.counterLoaded) {
            this.counterLoaded = true;
            $(".counter").each(function() {
              $(this)
                .prop("Counter", 0)
                .animate(
                  {
                    Counter: $(this).text()
                  },
                  {
                    duration: 4000,
                    easing: "swing",
                    step: function(now) {
                      $(this).text(Math.ceil(now));
                    }
                  }
                );
            });
          }
        }
      }
    });

    this.commonService.getSolveItTeam().subscribe(res => {
      if (res.length > 4) {
        this.solveItTeam = res.slice(0, 4);
      } else {
        this.solveItTeam = res;
      }
    });
  }

  goTo(link) {
    window.open(link, "_blank");
  }
  public loadScript(jsFile) {
    let body = <HTMLDivElement>document.body;
    let script = document.createElement("script");
    script.src = "../../../assets/js/" + jsFile;
    script.async = true;
    script.defer = true;
    body.appendChild(script);
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
