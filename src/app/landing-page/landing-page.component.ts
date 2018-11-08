import { Component, OnInit } from '@angular/core';
import {AuthService} from '../Auth/services/auth.service';
import {Router} from '@angular/router';
import {NewsService} from '../news/news.service';
import {configs} from '../app.config';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  news: any = [];

  constructor(public authService: AuthService, public router: Router, public newsService: NewsService) { }

  ngOnInit() {
    this.newsService.fetchAllNews()
      .subscribe(res => {
        this.news = res;
        console.log(res);
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

}
