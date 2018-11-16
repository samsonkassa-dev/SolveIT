import { Component, Input, OnInit } from "@angular/core";
import { ProjectService } from "../project.service";

@Component({
  selector: "project-member-list",
  templateUrl: "./memberList.component.html",
  styleUrls: ["./memberList.component.css"]
})
export class ProjectMemberList implements OnInit {
  @Input() project;

  public members = [];
  public membersBackup = [];
  public keyword = "";
  public page = 1;

  constructor(public service: ProjectService) {}

  ngOnInit() {
    this.getMembers();
  }

  getMembers() {
    this.service.getMembers(this.project.id).subscribe(res => {
      this.members = res;
      this.membersBackup = res;
    });
  }

  searchMember() {
    if (this.keyword !== "") {
      this.members = this.membersBackup.filter(item =>
        item.email.includes(this.keyword)
      );
    } else {
      this.members = this.membersBackup.filter(item => item.pinned);
    }
  }
}
