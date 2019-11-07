import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../Auth/services/auth.service";
import { ProjectService } from "../project.service";
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { StarRatingComponent } from "ng-starrating";
import { prepareProfile } from "selenium-webdriver/firefox";

@Component({
  selector: "app-project-investor-view",
  templateUrl: "./projectInvestorView.component.html",
  styleUrls: ["./projectInvestorView.component.css"]
})
export class ProjectInvestorViewComponent implements OnInit {
  public project: any = null;
  public previousProfile: any = null;
  public ratings = [];
  public ratingForm: FormGroup;
  public rating: any = { ratorId: this.authService.getUserId(), review: "" };
  public downloadButtonClicked = false;
  public showModal = false;

  constructor(
    public route: ActivatedRoute,
    public authService: AuthService,
    public service: ProjectService,
    public router: Router
  ) {}

  ngOnInit() {
    this.ratingForm = new FormGroup({
      review: new FormControl("")
    });

    const id = this.route.snapshot.paramMap.get("id");
    let projectViewObject = {
      userId: this.authService.getUserId(),
      projectId: id
    };
    this.rating.projectId = id;
    this.registerView(projectViewObject);
    this.getProject(id);
    this.getProjectRatings(id);
    this.fetchProfile();
  }

  onRate($event: {
    oldValue: number;
    newValue: number;
    starRating: StarRatingComponent;
  }) {
    this.rating.rating = $event.newValue;
    if ($event.newValue < 3) {
      this.ratingForm.controls.review.setValidators([Validators.required]);
    } else {
      this.ratingForm.controls.review.setValidators(null);
    }
    this.ratingForm.controls.review.updateValueAndValidity();
  }

  registerView(projectViewObject) {
    this.service.registerView(projectViewObject).subscribe(res => {});
  }

  getProject(projectId) {
    this.service.getProject(projectId).subscribe(res => {
      this.project = res;
    });
  }

  getProjectRatings(projectId) {
    this.service.getProjectRatings(projectId).subscribe(res => {
      this.ratings = res;
    });
  }

  findWithAttr(array, attr, value) {
    for (var i = 0; i < array.length; i += 1) {
      if (array[i][attr] === value) {
        return i;
      }
    }
    return -1;
  }

  rateProject() {
    this.service.rateProject(this.rating).subscribe(
      res => {
        if (
          this.findWithAttr(
            this.ratings,
            "ratorId",
            this.authService.getUserId()
          ) == -1
        ) {
          this.ratings.push({
            id: res.id,
            ratorId: this.authService.getUserId(),
            review: res.review,
            rating: res.rating
          });
        } else {
          this.rating[
            this.findWithAttr(
              this.ratings,
              "ratorId",
              this.authService.getUserId()
            )
          ].rating = res.rating;
          this.rating[
            this.findWithAttr(
              this.ratings,
              "ratorId",
              this.authService.getUserId()
            )
          ].review = res.review;
        }
      },
      err => {
        this.ratings[
          this.findWithAttr(
            this.ratings,
            "ratorId",
            this.authService.getUserId()
          )
        ].rating = this.rating.rating;
        this.ratings[
          this.findWithAttr(
            this.ratings,
            "ratorId",
            this.authService.getUserId()
          )
        ].review = this.rating.review;
      }
    );
  }

  toggleModal(who, content) {
    if (who == "writeup") {
      console.log(this.previousProfile);
      if (this.previousProfile[0].underReview) {
        this.downloadWriteup(this.project.proposal.name);
      } else {
        this.showModal = true;
      }
    } else if (who == "plan") {
      if (this.previousProfile[0].approved) {
        this.downloadPlan(this.project.proposal.name);
      } else {
        this.showModal = true;
      }
    }
  }

  downloadWriteup(content) {
    this.service.downloadProposal(content).subscribe(
      res => {
        const url = window.URL.createObjectURL(res.data);
        const a = document.createElement("a");
        document.body.appendChild(a);
        a.setAttribute("style", "display: none");
        a.href = url;
        a.download = res.fileName;
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove(); // remove the element
      },
      error => {}
    );
  }

  downloadPlan(content) {
    this.service.downloadProposal(content).subscribe(
      res => {
        const url = window.URL.createObjectURL(res.data);
        const a = document.createElement("a");
        document.body.appendChild(a);
        a.setAttribute("style", "display: none");
        a.href = url;
        a.download = res.fileName;
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove(); // remove the element
      },
      error => {}
    );
  }

  fetchProfile() {
    this.service
      .fetchInvestorProfile(this.authService.getUserId())
      .subscribe(res => {
        this.previousProfile = res;
      });
  }

  bookmark(project) {
    let bookmarkObject = {
      projectId: project.id,
      userId: this.authService.getUserId()
    };
    this.service.bookmarkProject(bookmarkObject).subscribe(res => {
      console.log("bookmarked");
    });
  }
}
