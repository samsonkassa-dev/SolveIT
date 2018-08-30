import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ForumService } from "../forum.service";

@Component({
    selector: "app-forum-view",
    templateUrl: "./forumView.component.html",
    styleUrls: ["./forumView.component.css"]
})

export class ForumView implements OnInit{
    
    private selected = "discussion-list";
    private discussions = [];
    private pinnedDiscussions = [];
    private forum = {};

    constructor(private route: ActivatedRoute, private router: Router, private service: ForumService) {

    }

    ngOnInit() {
        let slung = this.route.snapshot.paramMap.get("slung");
        this.getForum(slung);
        this.getDiscussions(this.forum);
    }

    toggleView(view) {
        this.selected = view;
    }

    getForum(slung) {
        this.service.getForum(slung).subscribe(
            res => {
                this.forum = res.Result[0];
            }
        );
    }

    viewDiscussion(discussion) {
        this.router.navigate(['/forums/discussion', "sl"]);
    }

    getDiscussions(forum) {
        this.service.getDiscussions(forum.id).subscribe(
            res => {
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
        let content = {
            "discussionId": 0,
            "userId": 0
        };
        this.service.addToFavourites(content).subscribe(
            res => {
                console.log(res);
            }
        );
    }
}