import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { Router } from '@angular/router';
import { ForumService } from "../forum.service";

@Component({
    selector: "app-discussion-create",
    templateUrl: "./createDiscussion.component.html",
    styleUrls: ["./createDiscussion.component.css"]
})

export class CreateDiscussion {

    private discussion = {};
    private discussionForm: FormGroup;

    constructor(private router: Router, private service: ForumService) { }

    createDiscussion() {
        this.service.createDiscussion(this.discussion).subscribe(
            res => {
                console.log(res);
            }
        );
    }
}