import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public views = [
    'users',
    'competitions'
  ];
  public selected = this.views[0];

  constructor() { }

  ngOnInit() {
  }

  toggleView(view) {
    this.selected = view;
  }
}


