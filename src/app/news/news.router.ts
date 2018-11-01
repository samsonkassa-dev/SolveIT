import {Routes} from '@angular/router';
import {NewsListComponent} from './news-list/news-list.component';
import {NewsDetailComponent} from './news-detail/news-detail.component';
import {CreateNewsComponent} from './create-news/create-news.component';

export const NEWS_ROUTES: Routes = [
  { path: 'news', component: NewsListComponent },
  { path: 'news/:id', component: NewsDetailComponent },
  { path: 'news/create', component: CreateNewsComponent }
];
