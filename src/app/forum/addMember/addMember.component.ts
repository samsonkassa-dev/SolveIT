import { Component, Input, OnInit } from "@angular/core";
import { ForumService } from "../forum.service";
import { SharedService } from "../../shared/services/shared.service";

@Component({
  selector: "add-member",
  templateUrl: "./addMember.component.html",
  styleUrls: ["./addMember.component.css"]
})
export class AddMember implements OnInit {
  @Input() forum;
  private users = [];
  private members = [];
  private page = 1;
  private keyword = "";

  constructor(
    private service: ForumService,
    private sharedService: SharedService
  ) {}

  ngOnInit() {
    this.getMembers();
  }

  addMember(user) {
    const member = {
      forumId: this.forum.id,
      userId: user.id
    };
    this.service.addMember(member).subscribe(
      res => {
        this.members.push(user);
        this.users.splice(this.users.indexOf(user), 1);
        this.sharedService.addToast("Success", "New Member Added!.", "success");
      },
      err => {
        if ((err.status = 422)) {
          this.sharedService.addToast("", "Error occured!", "error");
        }
      }
    );
  }

  getMembers() {
    this.service.getMembers(this.forum.id).subscribe(res => {
      this.members = res;
    });
  }

  searchUser() {
    if (this.keyword.trim() !== "") {
      this.service.searchUser(this.keyword).subscribe(res => {
        this.users = res.Result.filter(item => {
          return this.members.findIndex(x => x.id == item.id) == -1;
        });
      });
    } else {
      this.users = [];
    }
  }
}
