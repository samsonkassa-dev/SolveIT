import { Component, OnInit, Input } from "@angular/core";
import { FormGroup, Validators, FormBuilder, FormControl } from "@angular/forms";
import { ForumService } from "../forum.service";
import { AuthService } from "../../Auth/services/auth.service";
import { SharedService } from "../../shared/services/shared.service";

@Component({
    selector: "app-forum-create",
    templateUrl: "./createForum.component.html",
    styleUrls: ["./createForum.component.css"]
})

export class CreateForum {

    @Input() categories;
    private forum = { userAccountId:0 };
    private forumForm: FormGroup;

    constructor(private service: ForumService, private _authService: AuthService, private sharedService: SharedService) {
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
                this.sharedService.addToast("Success", "Forum Created!.", 'success');
                let forumId = res.id;
                this._authService.getUserInfo().subscribe(
                    res1 => {
                        let userId = res1.id;
                        let member = {
                            forumId: forumId,
                            userId: userId
                        }
                        this.service.addMember(member).subscribe(
                            res2 => {
                                console.log(res2);
                            }
                        );
                    }
                );
            },
            err => {
                if (err.status = 422) {
                    this.sharedService.addToast("", "Error occured!", 'error');
                }
            }
        );
    }
}