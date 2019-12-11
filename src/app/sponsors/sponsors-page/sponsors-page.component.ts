import { Component, OnInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-sponsors-page',
  templateUrl: './sponsors-page.component.html',
  styleUrls: ['./sponsors-page.component.css']
})
export class SponsorsPageComponent implements OnInit {
  whatYear : any = "2019";
  showArchivedPartner = false;
  options = [
    "archived",
    "2019"
  ]
  constructor() { }

  ngOnInit() {
    
  }

  toggleArchived(){
    this.showArchivedPartner = !this.showArchivedPartner
  }

}
