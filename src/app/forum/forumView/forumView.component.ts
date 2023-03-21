import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { switchMap } from "rxjs/operators";
import { ForumService } from "../forum.service";
import { AuthService } from "../../Auth/services/auth.service";
import { SharedService } from "../../shared/services/shared.service";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-forum-view",
  templateUrl: "./forumView.component.html",
  styleUrls: ["./forumView.component.css"]
})
export class ForumViewComponent implements OnInit {
  public selected = "discussion-list";
  public selectedFilter = "All";
  public discussions = [];
  public pinnedDiscussions = [];
  public blacklistedDiscussions = [];
  public allDiscussions = [];
  public forum = { private: false, description: null, id: "" };
  public discussionPage = 1;
  public pinnedPage = 1;
  public keyword = "";
  public selectedDiscussion = "";
  public slung = null;
  public allDiscussionCommentCount = {};
  public pinnedDiscussionCommentCount = {};
  public blacklistedDiscussionCommentCount = {};
  public tags = [];
  public selectedTag = "";
  public editedDiscussion: any = {
    userAccountId: 0,
    forumId: 0,
    slung: "",
    title: "",
    imgContent: {}
  };
  public isEdit = false;

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public service: ForumService,
    public authService: AuthService,
    public sharedService: SharedService,
    private spinner: NgxSpinnerService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params && params["id"]) {
        //console.log(params, "params");
        this.editedDiscussion["userAccountId"] = params["userAccountId"];
        this.editedDiscussion["slung"] = params["slung"];
        this.editedDiscussion["title"] = params["title"];
        this.editedDiscussion["forumId"] = params["forumId"];
        this.editedDiscussion["content"] = params["content"];
        this.editedDiscussion["createdAt"] = params["createdAt"];
        this.editedDiscussion["imgContent"] = {};
        this.editedDiscussion["id"] = params["id"];
        this.isEdit = true;
        this.selected = "discussion-create";
        this.slung = JSON.parse(params["forum"]).slung;
        //console.log(JSON.parse(params["forum"]));
      } else {
        this.slung = this.route.snapshot.paramMap.get("slung");
      }
      this.getForum(this.slung, "All");
      this.service.getTags().subscribe(res => {
        this.tags = res;
      });
    });
  }

  toggleView(view) {
    console.log("zview is", view);
    if (
      view === "All" ||
      view === "Blacklisted" ||
      view === "Favourited" ||
      view === "discussion-list"
    ) {
      this.getForum(this.slung, view);
    }
    this.selected = view;
  }

  getForum(slung, view) {
    this.spinner.show();
    this.service.getForum(slung).subscribe(
      res => {
        if (res.Result.length === 0) {
          this.spinner.hide();
          this.router.navigate(["/404"]);
        } else {
          this.forum = res.Result[0];
          this.getDiscussions(this.forum, view);
        }
      },
      err => {
        this.router.navigate(["/404"]);
      }
    );
  }

  viewDiscussion(discussion) {
    this.router.navigate(["/forums/discussion", discussion.slung]);
  }

  getDiscussions(forum, view) {
    // fetch favorite discussions
    // this.getFavouriteDiscussions();
    console.log("in hreres");
    if (view === "Blacklisted") {
      this.getBlacklistedDiscussions();
      this.spinner.hide();
      console.log("in black");
    } else if (view === "Favourited") {
      this.getFavouriteDiscussions();
      this.spinner.hide();
    } else {
      this.service.getDiscussions(forum.id).subscribe(
        res => {
          this.allDiscussionCommentCount = [];
          this.allDiscussions = res;
          this.allDiscussions.forEach(item => {
            this.countComments(item, this.allDiscussionCommentCount);
          });
          this.discussions = res;
          this.spinner.hide();
        },
        error => {
          this.spinner.hide();
        }
      );
    }
  }

  getFavouriteDiscussions() {
    const userId = this.authService.getUserId();
    if (userId) {
      console.log("in favs");
      this.service.getFavouriteDiscussions(userId).subscribe(res => {
        this.service.getDiscussions(this.forum.id).subscribe(des => {
          console.log("in favs");
          for (let index = 0; index < res.length; index++) {
            const element = res[index];
            console.log(element);

            this.pinnedDiscussions = des.filter(d => {
              // console.log(d);
              return d.id === element.id;
            });
            console.log(this.pinnedDiscussions);
          }
          this.discussions = this.pinnedDiscussions;
          if (this.discussions.length > 0) {
            this.discussions = this.discussions.filter(d => {
              return d.forumId === this.forum.id;
            });
          }
          this.discussions.forEach(item => {
            this.countComments(item, this.allDiscussionCommentCount);
          });
        });
      });
    }
  }

  getBlacklistedDiscussions() {
    const userId = this.authService.getUserId();
    if (userId) {
      this.service.getBlacklistedDiscussions().subscribe(res => {
        this.service.getDiscussions(this.forum.id).subscribe(des => {
          for (let index = 0; index < res.length; index++) {
            const element = res[index];
            console.log(element);
            this.blacklistedDiscussions = des.filter(d => {
              return d.id === element.discussionId;
            });
          }
          console.log(this.blacklistedDiscussions);

          this.discussions = this.blacklistedDiscussions;
          if (this.discussions.length > 0) {
            this.discussions = this.discussions.filter(d => {
              return d.forumId === this.forum.id;
            });
          }
          this.discussions.forEach(item => {
            this.countComments(item, this.allDiscussionCommentCount);
          });
        });
      });
    }
  }

  countComments(discussion, store) {
    this.service.countComments(discussion.id).subscribe(
      res => {
        store[discussion.id] = res.count;
      },
      error => {
        store[discussion.id] = 0;
      }
    );
  }

  onSearch($event) {
    if (this.keyword !== "") {
      this.pinnedDiscussions = this.pinnedDiscussions.filter(item => {
        return (
          item.content.toUpperCase().includes(this.keyword.toUpperCase()) ||
          item.titel.toUpperCase().includes(this.keyword.toUpperCase())
        );
      });
      this.discussions = this.discussions.filter(item => {
        return (
          item.content.toUpperCase().includes(this.keyword.toUpperCase()) ||
          item.title.toUpperCase().includes(this.keyword.toUpperCase())
        );
      });
    } else {
      this.pinnedDiscussions = this.allDiscussions.filter(item => item.pinned);
      this.discussions = this.allDiscussions.filter(item => !item.pinned);
    }
  }

  discussionDetail(discussion) {
    this.router.navigate([`forums/discussions/${discussion.slung}`]);
  }

  discussionCreated() {
    this.toggleView("discussion-list");
    this.sharedService.addToast("Success", "Discussion Created!.", "success");
  }

  handleRadioButtonChange($evnt) {
    this.selectedTag = $evnt.target.value;
    this.filterDiscussionByTag(this.selectedTag);
  }

  filterDiscussionByTag(tagId) {
    if (tagId !== "") {
      this.service.filterDiscussionByTag(tagId).subscribe(res => {
        this.discussions = res;
      });
    } else {
      this.discussions = this.allDiscussions;
    }
  }
}
