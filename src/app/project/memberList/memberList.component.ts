import { FormGroup, FormBuilder } from "@angular/forms";
import { Component, Input, OnInit } from "@angular/core";
import { ProjectService } from "../project.service";
import { AuthService } from "../../Auth/services/auth.service";
import { Router } from "@angular/router";
import { SharedService } from "../../shared/services/shared.service";

declare var $: any;

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
  memberToRemove = null;
  addMemberForm: FormGroup;

  constructor(
    public fb: FormBuilder,
    public service: ProjectService,
    private sharedService: SharedService,
    public authService: AuthService,
    private router: Router
  ) {
    this.addMemberForm = this.fb.group({
      firstName: "",
      middleName: ""
    });
  }
  addMember(form) {
    if (!this.project.unregisteredMembers) {
      this.project.unregisteredMembers = [];
      this.project.unregisteredMembers.push(form);
    } else {
      this.project.unregisteredMembers.push(form);
    }
    this.service.updateProject(this.project.id, this.project).subscribe(res => {
      this.sharedService.addToast(
        "Success",
        "Member Added successfully!",
        "success"
      );
    });
  }
  ngOnInit() {
    this.getMembers();
  }

  showUserProfile(member) {
    if (
      this.authService.isAdmin() ||
      this.authService.isSolveitManager() ||
      this.authService.isSolveitTeam() ||
      this.authService.isSolveitMentor()
    ) {
      this.router.navigate(["/dashboard/userProfile", member.id]);
    }
  }

  getMembers() {
    this.service.getMembers(this.project.id).subscribe(res => {
      this.members = res;
      this.members = this.members.filter(member => {
        if (member.role) {
          return member.role.name == "solve-it-participants";
        }
        return false;
      });
      if (this.project.unregisteredMembers) {
        this.members = [...this.members, ...this.project.unregisteredMembers];
      }

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

  removeMember(member) {
    const temp = {
      userId: member.id,
      projectId: this.project.id
    };
    this.service.removeProjectMember({ member: temp }).subscribe(
      res => {
        this.members.splice(this.members.indexOf(member), 1);
        this.toggleModal(null);
        this.sharedService.addToast(
          "Success",
          "Member removed successfully!",
          "success"
        );
      },
      error => {
        //console.log(error);
        this.sharedService.addToast("", "Error occurred!", "error");
      }
    );
  }

  toggleModal(member) {
    this.memberToRemove = member;
    $("#removeMemberModal").modal("toggle");
  }
}
