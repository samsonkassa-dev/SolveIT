import { CommonService } from './../services/common.service';
import { SharedService } from './../services/shared.service';
import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../Auth/services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userId;
  notificationList = []
  constructor(public authService: AuthService, 
              public router: Router,
              private commonService: CommonService) { }

  ngOnInit() {
    this.userId = this.authService.getUserId()
    console.log(this.userId)
    if(this.userId){
      this.getNotifications(this.userId)
    }
  }

  getNotifications(userId){
    this.commonService.getNotification(userId)
    .subscribe((res =>{
      console.log(res)
      this.notificationList = res;
    }))
  }

  deleteNotification(notification){
    this.commonService.deleteNotification(notification)
    .subscribe(res =>{
      this.ngOnInit()
    })
  }

}
