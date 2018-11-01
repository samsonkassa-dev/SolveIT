import { Routes } from '@angular/router';
import { ForumComponent } from './forum.component';
import { ForumViewComponent } from './forumView/forumView.component';
import { DiscussionViewComponent } from './discussionView/discussionView.component';

export const ForumRoutes: Routes = [
  {
    path: 'forums',
    children: [
      {path: '', component: ForumComponent},
      {path: ':slung', component: ForumViewComponent},
    ]
  },
  { path: 'discussions/:slung', component: DiscussionViewComponent }
];
