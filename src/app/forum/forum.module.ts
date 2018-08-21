import { NgModule } from '@angular/core';

import { ForumService } from './forum.service';
import { Forum } from './forum.component';
import { CreateForum } from './createForum/createForum.component';
import { ForumList } from './forumList/forumList.component';
import { ForumView } from "./forumView/forumView.component";

@NgModule({
    declarations: [
        Forum,
        CreateForum,
        ForumList,
        ForumView
    ],
    imports: [
        
    ],
    providers: [ForumService],
    exports: []
})

export class ForumModule {

}