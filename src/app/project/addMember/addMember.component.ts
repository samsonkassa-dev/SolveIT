import { Component, Input, OnInit } from "@angular/core";
import { ProjectService } from "../project.service";
import { ForumService } from "../../forum/forum.service";
import { SharedService } from "../../shared/services/shared.service";

@Component({
  selector: "app-add-project-member",
  templateUrl: "./addMember.component.html",
  styleUrls: ["./addMember.component.css"]
})
export class AddProjectMemberComponent implements OnInit {
  @Input() project;
  private users = [];
  private page = 1;
  private keyword = "";
  private members = [];

  constructor(
    private service: ProjectService,
    private forumService: ForumService,
    private sharedService: SharedService
  ) {}

  ngOnInit() {
    this.getMembers();
  }

  addMember(user) {
    const member = {
      projectId: this.project.id,
      userId: user.id
    };
    this.service.addProjectMember(member).subscribe(
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
    this.service.getMembers(this.project.id).subscribe(res => {
      this.members = res;
    });
  }

  searchUser() {
    if (this.keyword.trim() !== "") {
      this.forumService.searchUser(this.keyword.trim()).subscribe(res => {
        this.users = res.Result.filter(item => {
          return this.members.findIndex(x => x.id == item.id) == -1;
        });
      });
    } else {
      this.users = [];
    }
  }
}
