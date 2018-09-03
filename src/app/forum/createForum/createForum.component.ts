import { Component, OnInit, Input } from "@angular/core";
import { FormGroup, Validators, FormBuilder, FormControl } from "@angular/forms";
import { ForumService } from "../forum.service";

@Component({
    selector: "app-forum-create",
    templateUrl: "./createForum.component.html",
    styleUrls: ["./createForum.component.css"]
})

export class CreateForum {

    @Input() categories;
    private forum = { userAccountId:0 };
    private forumForm: FormGroup;

    constructor(private service: ForumService) {
        this.forumForm = new FormGroup({
            name: new FormControl('', Validators.required),
            slung: new FormControl('', Validators.required),
            category: new FormControl('', Validators.required),
            type: new FormControl('', Validators.required),
        });
    }

    createForum() {
        this.service.createForum(this.forum).subscribe(
            res => {
                console.log(res);
            }
        );
    }
}