import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";

import { ForumService } from './forum.service';
import { Forum } from './forum.component';
import { CreateForum } from './createForum/createForum.component';
import { ForumList } from './forumList/forumList.component';
import { ForumView } from "./forumView/forumView.component";
import { Discussion } from "./discussion/discussion.component";
import { DiscussionView } from './discussionView/discussionView.component';
import { CreateDiscussion } from './createDiscussion/createDiscussion.component';
import { DiscussionComment } from './comment/comment.component';

@NgModule({
    declarations: [
        Forum,
        CreateForum,
        ForumList,
        ForumView,
        Discussion,
        DiscussionView,
        CreateDiscussion,
        DiscussionComment
    ],
    imports: [
        CommonModule
    ],
    providers: [ForumService],
    exports: []
})

export class ForumModule {

}