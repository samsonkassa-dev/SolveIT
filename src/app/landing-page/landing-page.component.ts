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
    private commonService : CommonService,
    public router: Router,
    public http: Http
  ) {}

  ngOnInit() {
    
    this.commonService.getSolveItTeam()
    .subscribe(res =>{
      if(res.length > 4){
        this.solveItTeam = res.slice(0,4)
      }else{
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
