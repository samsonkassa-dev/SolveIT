import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormBuilder, FormControl } from "@angular/forms";
import { Router } from '@angular/router';
import { ForumService } from "../forum.service";

@Component({
    selector: "app-discussion-create",
    templateUrl: "./createDiscussion.component.html",
    styleUrls: ["./createDiscussion.component.css"]
})

export class CreateDiscussion {

    private discussion = {userAccountId: 0, forumId: 0};
    private discussionForm: FormGroup;

    constructor(private router: Router, private service: ForumService) {
        this.discussionForm = new FormGroup({
            slung: new FormControl('', Validators.required),
            content: new FormControl('', Validators.required)
        });
    }

    createDiscussion() {
        this.service.createDiscussion(this.discussion).subscribe(
            res => {
                console.log(res);
            }
        );
    }
}