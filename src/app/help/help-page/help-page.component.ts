import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-help-page",
  templateUrl: "./help-page.component.html",
  styleUrls: ["./help-page.component.css"]
})
export class HelpPageComponent implements OnInit {
  constructor() { }

  ngAfterViewInit() {
    this.loadScript("help.js");
  }
  ngOnInit() {

  }
  goTo(link) {
    window.open(link, "_blank");
  }
  download(link, name) {
    var a = document.createElement("a");
    a.href = link;
    a.setAttribute("download", name);
    a.click();
    // window.open(link, "_blank");
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
