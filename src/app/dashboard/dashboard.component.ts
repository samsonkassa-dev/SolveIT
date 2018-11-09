import {Component, OnInit} from '@angular/core';
import {AuthService} from '../Auth/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

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

  constructor(public authService: AuthService) { }



  toggleView(view) {
    this.selected = view;
  }

  ngOnInit(): void {

    this.selected = this.authService.isAdmin() || this.authService.isSolveitManager() ? this.views[0] : this.views[1];

  }
}

