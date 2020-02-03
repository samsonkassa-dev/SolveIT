import { SharedService } from "./../../shared/services/shared.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { ProjectService } from "../project.service";
import { ApiService } from "../../shared/services/api.service";
import { AuthService } from "../../Auth/services/auth.service";
import { CommonService } from "../../shared/services/common.service";

declare var $: any;

@Component({
  selector: "app-project-view",
  templateUrl: "projectView.component.html",
  styleUrls: ["projectView.component.css"]
})
export class ProjectViewComponent implements OnInit {
  public views = ["report", "members", "add-member", "score"];
  public selected = this.views[0];
  public uploadReport = false;
  public project: any = null;
  public progressReports: any = [];
  public selectedProgressReport = null;
  public isEnrolled = false;
  public count = 0;
  public members = [];
  public judges: any = [];
  public competitionId;

  // for joining cometition
  public activeCompetitions = [];
  public isJoinCompetitionSuccessfull = null;

  public projects = { judge: null };
  public addScoreForm: FormGroup;
  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public service: ProjectService,
    public competitionService: CommonService,
    public apiService: ApiService,
    public authService: AuthService,
    public sharedService: SharedService,
    public fb: FormBuilder
  ) {
    this.addScoreForm = this.fb.group({
      score: ["", Validators.required],
      judge: ""
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get("id");
    this.getProject(id);
    this.competitionService.getCompetitions().subscribe(
      res => {
        this.activeCompetitions = res;
        this.activeCompetitions = this.activeCompetitions.filter(item => {
          return item.active;
        });
        let userRegisteredYear = new Date(
          this.authService.getUserSession().user.created
        ).getFullYear();
        let year = new Date("2020, 1,1").getFullYear();
        if (userRegisteredYear < year) {
          this.activeCompetitions = [];
        }
      },
      error => {}
    );
    this.service.getMembers(id).subscribe(res => {
      res.forEach(item => {
        this.members.push(item.id);
      });
    });
  }
  getJudges(competitionId) {
    let temp = [];
    this.service.getJudges(competitionId).subscribe(res => {
      res.forEach(element => {
        if (
          element.competitions &&
          element.competitions != undefined &&
          element.competitions.indexOf(competitionId) >= 0
        ) {
          temp.push(element);
        }
      });

      this.judges = [...temp];
    });
  }
  toggleView(view) {
    this.selected = view;
  }
  setupScore() {
    console.log("Setting");
    if (this.authService.isSolveitJudge()) {
      if (this.project.score) {
        console.log(this.project.score);
        this.project.score.forEach(element => {
          if (element.judgeId == this.authService.getUserId()) {
            let score = { score: element.score };
            this.addScoreForm.patchValue(score);
          }
        });
      }
    }
  }

  selectJudge() {
    this.project.score.forEach(element => {
      if (element.judgeId == this.projects.judge) {
        let score = { score: element.score };
        this.addScoreForm.patchValue(score);
      }
    });
  }
  addScore() {
    if (!this.addScoreForm.invalid) {
      let formVal = this.addScoreForm.value;
      if (formVal && formVal != undefined) {
        let judgeScoreFound = false;
        let judgeId = null;
        if (this.authService.isSolveitJudge()) {
          judgeId = this.authService.getUserId();
        } else {
          if (!formVal.judge) {
            return;
          } else {
            judgeId = formVal.judge;
          }
        }
        this.project.score =
          this.project.score == undefined ? [] : this.project.score;
        this.project.score.forEach(element => {
          if (element.judgeId == judgeId) {
            element.score = formVal.score;
            judgeScoreFound = true;
          }
        });
        console.log(this.project.score);
        let projectScore = this.project.score;
        if (!judgeScoreFound) {
          projectScore.push({ judgeId: judgeId, score: formVal.score });
        }
        this.service
          .addScore(this.project.id, { score: projectScore })
          .subscribe(res => {
            this.project = res;
            this.sharedService.addToast(
              "Success",
              "Score Has Been Added",
              "success"
            );
          });
      }
    }
  }
  getProject(projectId) {
    this.service.getProject(projectId).subscribe(
      res => {
        this.project = res;
        this.getProgressReports();
        this.isProjectRegisteredToCompetition();
      },
      error1 => {
        this.router.navigate(["/404"]);
      }
    );
  }

  public getProgressReports() {
    this.service.getAllProgressReport(this.project.id).subscribe(res1 => {
      this.progressReports = res1;
    });
  }

  addProjectMember() {
    const member = {
      projectId: this.project.id,
      userId: 0
    };
    this.service.addProjectMember(member).subscribe(res => {});
  }

  toggleUploadReport(value) {
    this.uploadReport = value;
  }

  downloadProposal(content) {
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

  reportCreated() {
    this.uploadReport = false;
    this.getProgressReports();
  }

  onJoinCompetition($event) {
    this.service.joinCompetition(this.project, $event.data).subscribe(
      res => {
        this.isJoinCompetitionSuccessfull = true;
      },
      error => {
        this.isJoinCompetitionSuccessfull = false;
      }
    );
  }

  viewProgressReport(report) {
    this.selectedProgressReport = report;
  }

  back() {
    this.selectedProgressReport = null;
  }

  backToCompetitionProjects() {
    let temp = window.localStorage.getItem("competitionId");
    this.router.navigate([`dashboard/competitions/${temp}`]);
  }

  isProjectRegisteredToCompetition() {
    this.service.getProjectCompetitions(this.project.id).subscribe(res => {
      if (res.length == 0) {
        this.isEnrolled = false;
      } else {
        this.competitionId = res[0].id;
        this.getJudges(res[0].id);
        this.isEnrolled = true;
      }
      if (!this.isEnrolled && this.count === 0) {
        $("#myModal").modal("show");
        this.count += 1;
      }
    });
  }

  onProjectUpdated() {
    $("#createProjectModal").modal("hide");
  }

  limitProjectProposalTitle(title, limit) {
    if (title.length > limit) {
      return title.slice(0, limit) + "...";
    } else {
      return title;
    }
  }

  isMember(id) {
    if (id !== false) {
      return this.members.indexOf(id) !== -1;
    } else {
      return false;
    }
  }
}
