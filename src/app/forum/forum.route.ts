import { Routes } from '@angular/router';
import { ForumComponent } from "./forum.component";
import { ForumView } from './forumView/forumView.component';
import { DiscussionView } from "./discussionView/discussionView.component";

export const ForumRoutes: Routes = [
	{
		path: "forums",
		children: [
			{path: '', component: ForumComponent},
			{path: ':name', component: ForumView},
			{path: 'discussion/:name', component: DiscussionView}
		]
	}
];
