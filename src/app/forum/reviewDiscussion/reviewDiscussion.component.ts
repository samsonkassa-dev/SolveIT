import { Component, OnInit } from "@angular/core";
import { ForumService } from "../forum.service";
import { SharedService } from "../../shared/services/shared.service";
import { Router } from "@angular/router";

@Component({
    selector: 'app-review-discussion',
    templateUrl: 'reviewDiscussion.component.html',
    styleUrls: ['reviewDiscussion.component.css']
})

export class ReviewDiscussionComponent implements OnInit{

    public blackList = [];
    public discussions = [];
    public page = 1;

    constructor(public service: ForumService, public sharedService: SharedService, public router: Router) { }

    ngOnInit() {
        this.getBlackListedDiscussions();
    }

    countFlags(discussionId) {
        return this.blackList.filter((item) => {
            return item.discussionId == discussionId;
        }).length;
    }

    viewDiscussion(discussion) {
        this.router.navigate(['/forums/discussion', discussion.slung]);
    }

    getBlackListedDiscussions() {
        this.service.getBlacklistedDiscussions().subscribe(
            res => {
                this.blackList = res;
                for (const item of res) {
                    if (this.discussions.indexOf(item.solveitdiscussion) == -1) {
                        this.discussions.push(item.solveitdiscussion);
                    }
                }
            }
        )
    }

    removeDiscussion(discussion) {
        this.service.removeFromBlackList(discussion.id).subscribe(
            res => {
                this.service.removeDiscussion(discussion.id).subscribe(
                    res1 => {
                        this.discussions.splice(this.discussions.indexOf(discussion), 1);
                        this.sharedService.addToast('Success', 'Discussion Deleted!.', 'success');
                    },
                    err => {
                        if (err.status = 422) {
                            this.sharedService.addToast('', 'Error occured while deleting discussion!', 'error');
                        }
                    }
                );
            },
            err => {
                if (err.status = 422) {
                    this.sharedService.addToast('', 'Error occured while removing from blacklist!', 'error');
                }
            }
        )
    }

    relieveDiscussion(discussion) {       
        this.service.removeFromBlackList(discussion.id).subscribe(
            res => {
                this.discussions.splice(this.discussions.indexOf(discussion), 1);
                this.sharedService.addToast('Success', 'Discussion Relieved!.', 'success');
            },
            err => {
                if (err.status = 422) {
                    this.sharedService.addToast('', 'Error occured!', 'error');
                }
            }
        )
    }
}