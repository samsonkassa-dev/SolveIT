import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ForumService } from './forum.service';
import { ForumComponent } from './forum.component';
import { CreateForum } from './createForum/createForum.component';
import { ForumList } from './forumList/forumList.component';
import { ForumView } from "./forumView/forumView.component";
import { DiscussionView } from './discussionView/discussionView.component';
import { CreateDiscussion } from './createDiscussion/createDiscussion.component';
import { SharedModule } from '../shared/shared.module';
import { CommentList } from './commentList/commentList.component';

@NgModule({
    declarations: [
        ForumComponent,
        CreateForum,
        ForumList,
        ForumView,
        DiscussionView,
        CreateDiscussion,
        CommentList
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule
    ],
    providers: [ForumService],
    exports: []
})

export class ForumModule {

}
