import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ForumService } from './forum.service';
import { ForumComponent } from './forum.component';
import { CreateForumComponent } from './createForum/createForum.component';
import { ForumListComponent } from './forumList/forumList.component';
import { ForumViewComponent } from "./forumView/forumView.component";
import { DiscussionViewComponent } from './discussionView/discussionView.component';
import { CreateDiscussionComponent } from './createDiscussion/createDiscussion.component';
import { SharedModule } from '../shared/shared.module';
import { CommentListComponent } from './commentList/commentList.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { MemberList } from './memberList/memberList.component';
import { AddMember } from './addMember/addMember.component';
import {MomentModule} from 'angular2-moment';

@NgModule({
    declarations: [
        ForumComponent,
        CreateForumComponent,
        ForumListComponent,
        ForumViewComponent,
        DiscussionViewComponent,
        CreateDiscussionComponent,
        CommentListComponent,
        MemberList,
        AddMember
    ],
    imports: [
      CommonModule,
      NgxPaginationModule,
      FormsModule,
      ReactiveFormsModule,
      SharedModule,
      MomentModule
    ],
    providers: [ForumService],
    exports: []
})

export class ForumModule {

}
