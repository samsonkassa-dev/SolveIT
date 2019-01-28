import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Auth/services/auth.service';
import { Router } from '@angular/router';
import { configs } from '../app.config';
import { CommonService } from '../shared/services/common.service';

declare var $: any;

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  news: any = [];

  constructor(
    public authService: AuthService,
    public router: Router,
    public newsService: CommonService
  ) {}

  ngOnInit() {
    this.newsService.fetchAllNews().subscribe(res => {
      if (res.length > 3) {
        this.news = res.slice(0, 3);
      } else {
        this.news = res;
      }
    });
  }

  getImageSource(image) {
    return `${configs.rootUrl}storages/news/download/${image}`;
  }

  getContent(content) {
    if (content.length > 122) {
      return content.slice(0, 122);
    } else {
      return content;
    }
  }

  toggleMenu() {
    if ($('#menus').css('display') === 'none') {
      $('#menus').css('display', 'block');
      $('#menus').css('background', 'white');
    } else {
      $('#menus').css('display', 'none');
    }
  }
}
