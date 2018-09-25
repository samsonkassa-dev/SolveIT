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

    constructor(public route: ActivatedRoute, public router: Router, public service: ForumService,
                public authService: AuthService, public sharedService: SharedService) {

    }

    ngOnInit() {
        this.slung = this.route.snapshot.paramMap.get('slung');
        this.getForum(this.slung);
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
                this.allDiscussions = res;
                this.discussions = res;
            }
        );
    }

    getFavouriteDiscussions() {
      try {
        this.authService.getUserInfo()
          .subscribe(res => {
            this.service.getFavouriteDiscussions(res.id)
              .subscribe(res2 => {
                this.pinnedDiscussions = res2;
                console.log("pinned discussions", this.pinnedDiscussions);
              });
          });
      } catch (e) {
        console.log("error");
        this.pinnedDiscussions = [];
      }
    }

    countComments(discussion) {
        let count = 0;
        this.service.countComments(discussion.id).subscribe(
            res => {
                count = res.count;
            }
        );
        return count;
    }

    addToFavourites($event) {
      console.log('adding to favorite');
        try {
          this.authService.getUserInfo().subscribe(
            res => {
              const userId = res.id;
              const content = {
                discussionId: $event.id,
                userId: userId
              };
              this.service.addToFavourites(content).subscribe(
                res1 => {
                  console.log('added to favorites');
                  this.service.getFavouriteDiscussions(userId)
                    .subscribe(favs => {
                      this.pinnedDiscussions = favs;
                    }, error1 => {
                      console.log('error');
                    });
                  this.sharedService.addToast('Success', 'Added To Favourites!.', 'success');
                },
                err => {
                  if (err.status = 422) {
                    this.sharedService.addToast('', 'Error occured!', 'error');
                  }
                }
              );
            }
          );
        } catch (e) {
          return;
        }
    }

    onSearch($event) {
        if (this.keyword !== '') {
          this.pinnedDiscussions = this.pinnedDiscussions.filter(item => item.content.includes(this.keyword));
          this.discussions = this.discussions.filter(item => item.content.includes(this.keyword));
        } else {
          this.pinnedDiscussions = this.allDiscussions.filter(item => item.pinned);
          this.discussions = this.allDiscussions.filter(item => !item.pinned);
        }
    }

    discussionDetail(discussion) {
      this.selectedDiscussion = discussion.slung;
      this.toggleView('discussion-detail');
    }

    removeFromFavorite($event) {
      try {
        this.authService.getUserInfo()
          .subscribe(res => {
            this.service.removeFromFavorites(res.id, $event.id)
              .subscribe(res1 => {
                console.log('removed from favorites');
                this.getFavouriteDiscussions();8
              }, error => {
                console.log('error while removing from favorites');
              });
          });
      } catch (e) {
        console.log('You are not signed in.');
        return;
      }
    }
}
