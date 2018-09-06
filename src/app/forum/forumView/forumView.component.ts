import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ForumService } from '../forum.service';
import { AuthService } from '../../Auth/services/auth.service';

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

    constructor(public route: ActivatedRoute, public router: Router, public service: ForumService, public _authService: AuthService) {
    }

    ngOnInit() {
        const slung = this.route.snapshot.paramMap.get('slung');
        this.getForum(slung);
    }

    toggleView(view) {
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
        this.service.getDiscussions(forum.id).subscribe(
            res => {
                this.allDiscussions = res;
                res.filter(item => {
                    if (item.pinned) {
                      this.pinnedDiscussions.push(item);
                    } else if (!item.pinned) {
                      this.discussions.push(item);
                    }
                });
            }
        );
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

    addToFavourites(discussion) {
        this._authService.getUserInfo().subscribe(
            res => {
                const userId = res.id;
                const content = {
                    discussionId: discussion.id,
                    userId: userId
                };
                this.service.addToFavourites(content).subscribe(
                    res1 => {
                        console.log(res1);
                    }
                );
            }
        );
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
}
