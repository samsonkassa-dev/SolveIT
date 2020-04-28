import { FormGroup, FormBuilder } from "@angular/forms";
import { CommonService } from "./../../shared/services/common.service";
import { Component, Input, OnInit } from "@angular/core";
import { ForumService } from "../forum.service";
import { SharedService } from "../../shared/services/shared.service";
import { AuthService } from "../../Auth/services/auth.service";

@Component({
  selector: "add-member",
  templateUrl: "./addMember.component.html",
  styleUrls: ["./addMember.component.css"]
})
export class AddMember implements OnInit {
  @Input() forum;
  public users = [];
  public members = [];
  public cities = [];
  public page = 1;
  public keyword = "";
  public cityForm: FormGroup;
  constructor(
    public service: ForumService,
    public sharedService: SharedService,
    public commonService: CommonService,
    public authService: AuthService,
    public fb: FormBuilder
  ) {
    this.cityForm = this.fb.group({
      city: [null]
    });
  }

  ngOnInit() {
    this.getMembers();
    this.getCities();
  }

  getCities() {
    this.commonService.getCities().subscribe(cities => {
      this.cities = cities;
    });
  }

  addCityMembers(val) {
    console.log(val);
    this.service.addCityMembers(val.city, this.forum.id).subscribe(res => {
      console.log(res);
    });
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

  searchUser($event) {
    if (this.keyword.trim() !== "") {
      this.service
        .searchUser(this.keyword, this.authService.getUserId())
        .subscribe(res => {
          this.users = res.Result.filter(item => {
            return this.members.findIndex(x => x.id === item.id) === -1;
          });
        });
    } else {
      this.users = [];
    }
  }
}
