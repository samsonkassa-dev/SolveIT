import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  public views = [
    'users',
    'competitions',
    'categories',
    'tags',
    'reviewDiscussions',
    'city',
    'exportData'
  ];
  public selected = this.views[0];

  constructor() { }


  toggleView(view) {
    this.selected = view;
  }
}


