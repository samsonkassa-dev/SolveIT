import { Routes } from '@angular/router';
import { Events } from "./event/event.component";
import { Newsfeed } from "./newsFeed/newsfeed.component";

export const SolveitMgmtRoutes: Routes = [
	{

		path: "team",
		children: [
			{path: "events", component: Events},
			{path: "newsfeed", component: Newsfeed}
		]
		
	}
]
