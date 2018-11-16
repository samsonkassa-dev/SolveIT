import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";
import { Router } from "@angular/router";
import { ForumService } from "../forum.service";
import { AuthService } from "../../Auth/services/auth.service";
import { retry } from "rxjs/operator/retry";
import { OnChanges } from "@angular/core/src/metadata/lifecycle_hooks";
import { SimpleChange } from "@angular/core/src/change_detection/change_detection_util";

@Component({
  selector: "app-forum-list",
  templateUrl: "./forumList.component.html",
  styleUrls: ["./forumList.component.css"]
})
export class ForumListComponent implements OnInit, OnChanges {
  @Input() selected;
  @Input() categories;
  @Output() create = new EventEmitter();

  public popularforums = [];
  public forumsBackup = [];
  public forums = [];
  // public keyword = '';
  public forumType = "";
  public page = 1;
  public discussionCounts = [];
  @Input() keyword;

  constructor(
    public service: ForumService,
    public router: Router,
    public authService: AuthService
  ) {}

  ngOnInit() {
    console.log(this.authService.isSolveitParticipant());
    this.fetchForumsList();
  }

  ngOnChanges(changes) {
    this.onSearch();
  }

  fetchForumsList() {
    this.discussionCounts = [];
    if (this.selected === "forum-list-public") {
      this.service.getAllForumList().subscribe(res => {
        this.forumsBackup = res.filter(forum => {
          return !forum.private;
        });
        this.forumsBackup.forEach(item => {
          this.getForumDiscussionCount(item.id);
        });
        this.forums = this.forumsBackup;
        console.log("Public backup", this.forumsBackup);
      });
    } else if (this.selected === "forum-list-private") {
      const userId = this.authService.getUserId();
      if (userId) {
        this.service.getMyForumList(userId).subscribe(forums => {
          this.forums = forums.filter(forum => {
            return forum.private;
          });
          this.forumsBackup = this.forums;
          this.forumsBackup.forEach(item => {
            this.getForumDiscussionCount(item.id);
          });
        });
      }
    }
  }

  getForumDiscussionCount(forumId) {
    this.service.getDiscussionCount(forumId).subscribe(
      res => {
        console.log("discussion count ", res.count);
        this.discussionCounts.push(res.count);
        console.log(this.discussionCounts);
      },
      error => {
        console.log("error while fetching discussion count", error);
        this.discussionCounts.push(0);
      }
    );
    console.log("finished");
  }

  viewForum(slung) {
    this.router.navigate(["/forums", slung]);
  }

  onSearch() {
    if (this.keyword !== "") {
      if (this.forums.length === 0) {
        this.forums = this.forumsBackup;
      }
      this.forums = this.forums.filter(item =>
        item.slung.toUpperCase().includes(this.keyword.toUpperCase())
      );
    } else {
      this.forums = this.forumsBackup;
    }
  }

  onCreateForum() {
    this.create.emit();
  }
}
