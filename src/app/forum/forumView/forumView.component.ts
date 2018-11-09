import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ForumService } from '../forum.service';
import { AuthService } from '../../Auth/services/auth.service';
import { SharedService } from '../../shared/services/shared.service';

@Component({
    selector: 'app-forum-view',
    templateUrl: './forumView.component.html',
    styleUrls: ['./forumView.component.css']
})

export class ForumViewComponent implements OnInit {

    public selected = 'discussion-list';
    public discussions = [];
    public pinnedDiscussions = [];
    public allDiscussions = [];
    public forum = {};
    public discussionPage = 1;
    public pinnedPage = 1;
    public keyword = '';
    public selectedDiscussion = '';
    public slung = null;
    public allDiscussionCommentCount = [];
    public pinnedDiscussionCommentCount = [];
    public tags = [];
    public selectedTag = '';

    constructor(public route: ActivatedRoute, public router: Router, public service: ForumService,
                public authService: AuthService, public sharedService: SharedService) {

    }

    ngOnInit() {
      console.log('on forum view');
        this.slung = this.route.snapshot.paramMap.get('slung');
        this.getForum(this.slung);
        this.service.getTags()
          .subscribe(res => {
            this.tags = res;
          });
    }

    toggleView(view) {
        if (this.selected !== 'discussion-list' && view === 'discussion-list') {
          this.getForum(this.slung);
        }
      this.selected = view;
    }

    getForum(slung) {
        this.service.getForum(slung).subscribe(
            res => {
                this.forum = res.Result[0];
                this.getDiscussions(this.forum);
            }
        );
    }

    viewDiscussion(discussion) {
        this.router.navigate(['/forums/discussion', discussion.slung]);
    }

    getDiscussions(forum) {
        // fetch favorite discussions
        this.getFavouriteDiscussions();

        this.service.getDiscussions(forum.id).subscribe(
            res => {
              this.allDiscussionCommentCount = [];
                this.allDiscussions = res;
                this.allDiscussions.forEach(item => {
                  this.countComments(item, this.allDiscussionCommentCount);
                });
                this.discussions = res;
            }
        );
    }

    getFavouriteDiscussions() {
      const userId = this.authService.getUserId();
      if (userId) {
        this.service.getFavouriteDiscussions(userId)
          .subscribe(res => {
            this.pinnedDiscussions = res;
            this.pinnedDiscussions.forEach(item => {
              this.countComments(item, this.pinnedDiscussionCommentCount);
            });
            console.log('pinned discussions ', this.pinnedDiscussions);
          });
      }
    }

    countComments(discussion, store) {
        this.service.countComments(discussion.id).subscribe(
            res => {
                store.push(res.count);
            },
          error => {
              store.push(0);
          }
        );
    }

    onSearch($event) {
        if (this.keyword !== '') {
          this.pinnedDiscussions = this.pinnedDiscussions.filter(item => {
            return item.content.toUpperCase().includes(this.keyword.toUpperCase()) ||
                    item.titel.toUpperCase().includes(this.keyword.toUpperCase());
          });
          this.discussions = this.discussions.filter(item => {
            return item.content.toUpperCase().includes(this.keyword.toUpperCase()) ||
                    item.title.toUpperCase().includes(this.keyword.toUpperCase());
          });
        } else {
          this.pinnedDiscussions = this.allDiscussions.filter(item => item.pinned);
          this.discussions = this.allDiscussions.filter(item => !item.pinned);
        }
    }

    discussionDetail(discussion) {
      this.router.navigate([`discussions/${discussion.slung}`]);
    }

    discussionCreated() {
        this.toggleView('discussion-list');
        this.sharedService.addToast('Success', 'Discussion Created!.', 'success');
    }

    handleRadioButtonChange($evnt) {
      this.selectedTag = $evnt.target.value;
      this.filterDiscussionByTag(this.selectedTag);
    }

    filterDiscussionByTag(tagId) {
      if (tagId !== '') {
        this.service.filterDiscussionByTag(tagId)
          .subscribe(res => {
            this.discussions = res;
          });
      } else {
        this.discussions = this.allDiscussions;
      }
    }
}
