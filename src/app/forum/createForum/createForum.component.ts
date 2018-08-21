import { Component } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { ForumService } from "../forum.service";

@Component({
    selector: "app-forum-create",
    templateUrl: "./createForum.component.html",
    styleUrls: ["./createForum.component.css"]
})

export class CreateForum {

    private forum = {};
    private forumForm: FormGroup;

    constructor(private service: ForumService) {

    }

    createForum() {
        this.service.createForum(this.forum);
    }
}