import { Component, OnInit, Input } from "@angular/core";
import { Router } from '@angular/router';
import { ForumService } from "../forum.service";

@Component({
    selector: "app-forum-list",
    templateUrl: "./forumList.component.html",
    styleUrls: ["./forumList.component.css"]
})

export class ForumList implements OnInit {
    
    @Input() selected;
    @Input() categories;
    private popularforums = [];
    private popularforumsBackup = [];
    private forums = [];
    private keyword = '';

    constructor(private service: ForumService, private router: Router) {
        
    }

    ngOnInit() {
        this.fetchForumsList();
        this.getAllForums();
    }

    fetchForumsList() {
        this.service.getForumList().subscribe(
            res => {
                this.popularforums = res.Result;
                this.popularforumsBackup = res.Result;
            }
        );
    }

    getAllForums() {
        this.service.getAllForumList().subscribe(
            res => {
                this.forums = res;
            }
        )
    }

    viewForum(slung) {
        this.router.navigate(['/forums', slung]);
    }

    onSearch($event) {
        if (this.keyword !== '') {
          this.popularforums = this.forums.filter(item => item.slung.includes(this.keyword));
        } else {
          this.popularforums = this.popularforumsBackup;
        }
    }

}