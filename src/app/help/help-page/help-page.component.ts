import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-help-page",
  templateUrl: "./help-page.component.html",
  styleUrls: ["./help-page.component.css"]
})
export class HelpPageComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    setTimeout(() => {
      this.loadScript("help.js");
    }, 1000);
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
}
