import { Component, OnInit, Input } from "@angular/core";
import { ForumService } from "../forum.service";

@Component({
    selector: "app-comment-list",
    templateUrl: "./commentList.component.html",
    styleUrls: ["./commentList.component.css"]
})

export class CommentList implements OnInit{

    @Input() discussionId;
    private comments = [];

    constructor(private service: ForumService) {
        
    }

    ngOnInit() {
        console.log(this.discussionId);
        this.getCommentList();
    }

    getCommentList() {
        this.service.getComments(this.discussionId).subscribe(
            res => {
                this.comments = res;
            }
        )
    }
    
}