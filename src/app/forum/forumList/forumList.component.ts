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
    private forumsBackup = [];
    private forums = [];
    private keyword = '';
    private forumType = '';
    private page: number = 1;

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
            }
        );
    }

    getAllForums() {
        if (this.selected == 'forums-list-public') {
            this.forumType = 'Public Forums';
            this.service.getAllForumList().subscribe(
                res => {
                    this.forums = res;
                    this.forumsBackup = res;
                }
            );
        } else if (this.selected == 'forums-list-private') {
            this.forumType = 'My Forums';
            this.service.getMyForumList(0).subscribe(
                res => {
                    this.forums = res;
                    this.forumsBackup = res;
                }
            );
        }
    }

    viewForum(slung) {
        this.router.navigate(['/forums', slung]);
    }

    onSearch($event) {
        if (this.keyword !== '') {
          this.forums = this.forums.filter(item => item.slung.includes(this.keyword));
        } else {
          this.forums = this.forumsBackup;
        }
    }

}