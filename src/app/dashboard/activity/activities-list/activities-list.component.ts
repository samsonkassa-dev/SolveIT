import { Component, OnInit } from "@angular/core";
import { ActivityService } from "../activity.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../../Auth/services/auth.service";
import { SharedService } from "../../../shared/services/shared.service";

@Component({
  selector: "app-activities-list",
  templateUrl: "./activities-list.component.html",
  styleUrls: ["./activities-list.component.css"]
})
export class ActivitiesListComponent implements OnInit {
  public levels = [1, 2, 3, 4, 5];
  public activities = [];
  public backUpactivities = [];
  public key = "";
  public activityForm: FormGroup;
  public editActivityForm: FormGroup;
  public page = 1;

  constructor(
    public service: ActivityService,
    public fb: FormBuilder,
    public authService: AuthService,
    public sharedService: SharedService
  ) {}

  ngOnInit() {
    this.getActivities();
    this.activityForm = this.fb.group({
      activity_name: ["", Validators.required],
      passing_grade: ["", Validators.required],
      level: ["", [Validators.required]],
      description: ["", Validators.required]
    });
    this.editActivityForm = this.fb.group({
      id: ["", Validators.required],
      activity_name: ["", Validators.required],
      passing_grade: ["", Validators.required],
      level: ["", [Validators.required]],
      description: ["", Validators.required]
    });
  }

  selectActivity(activity) {
    this.editActivityForm.patchValue(activity);
  }
  onSearch($event) {
    if (this.key !== "" && this.backUpactivities.length > 0) {
      this.activities = this.backUpactivities.filter(
        item =>
          item.activity.toUpperCase().indexOf(this.key.toUpperCase()) !== -1
      );
    } else if (this.key === "") {
      this.activities = this.backUpactivities;
    }
  }

  oncreateActivity() {
    this.service.addActivity(this.activityForm.value).subscribe(
      res => {
        this.sharedService.addToast(
          "Success",
          "New Activity Added!.",
          "success"
        );
        this.activityForm.reset();
        this.activities.push(res);
      },
      err => {
        this.sharedService.addToast("Error", "Error occurred!", "error");
      }
    );
  }

  getActivities() {
    this.service.getActivities().subscribe(res => {
      this.activities = res;
      this.backUpactivities = this.activities;
    });
  }

  updateActivity(activity) {
    this.service.updateActivity(activity).subscribe(
      res => {
        this.ngOnInit();
        this.sharedService.addToast(
          "Success",
          "Updated Activity Successfully!.",
          "success"
        );
      },
      err => {
        this.sharedService.addToast("Error", "Error occurred!.", "error");
      }
    );
  }

  deleteActivity(activity) {
    this.service.deleteActivity(activity).subscribe(
      res => {
        this.activities.splice(this.activities.indexOf(activity), 1);
        this.sharedService.addToast(
          "Success",
          "Deleted Activity Successfully!.",
          "success"
        );
      },
      err => {
        this.sharedService.addToast("Error", "Error occurred!.", "error");
      }
    );
  }
}
