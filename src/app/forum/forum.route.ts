import { Routes } from '@angular/router';
import { Forum } from "./forum.component";
import { ForumView } from './forumView/forumView.component';
import { DiscussionView } from "./discussionView/discussionView.component";

export const ForumRoutes: Routes = [
	{
		path: "forums",
		children: [
			{path: '', component: Forum},
			{path: ':slung', component: ForumView},
			{path: 'discussion/:slung', component: DiscussionView}
		]
	}
];
