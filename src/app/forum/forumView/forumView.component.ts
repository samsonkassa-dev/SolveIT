import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ForumService } from '../forum.service';

@Component({
    selector: 'app-forum-view',
    templateUrl: './forumView.component.html',
    styleUrls: ['./forumView.component.css']
})

export class ForumView implements OnInit {

    private selected = 'discussion-list';
    private discussions = [];
    private pinnedDiscussions = [];
    private allDiscussions = [];
    private forum = {};
    private discussionPage = 1;
    private pinnedPage = 1;
    private keyword = '';

    constructor(private route: ActivatedRoute, private router: Router, private service: ForumService) {

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

    addToFavourites() {
        const content = {
            'discussionId': 0,
            'userId': 0
        };
        this.service.addToFavourites(content).subscribe(
            res => {
                console.log(res);
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
}
