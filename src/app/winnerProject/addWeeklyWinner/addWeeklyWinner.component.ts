import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { WinnerProjectService } from "../winnerProject.service";
import { SharedService } from "../../shared/services/shared.service";
import { CompetitionService } from "../../competition/competition.service";
import { AuthService } from "../../Auth/services/auth.service";

@Component({
  selector: "app-add-weekly-winner",
  templateUrl: "addWeeklyWinner.component.html",
  styleUrls: ["addWeeklyWinner.component.css"]
})
export class AddWeeklyWinnerComponent implements OnInit {
  public weeklyWinner = { active: true };
  public weeklyWinnerForm: FormGroup;
  public projects = [];
  public competitions = [];

  constructor(
    public service: WinnerProjectService,
    public fb: FormBuilder,
    public sharedService: SharedService,
    public competitionService: CompetitionService,
    public authService: AuthService
  ) {
    this.weeklyWinnerForm = this.fb.group({
      week: ["", Validators.required],
      rank: ["", Validators.required],
      competition: ["", Validators.required],
      project: ["", Validators.required]
    });
  }

  ngOnInit() {
    this.getCompetition();
  }

  addWeeklyWinner() {
    this.service.labelWeeklyWinner(this.weeklyWinner).subscribe(
      res => {
        this.sharedService.addToast(
          "Success",
          "New Weekly Winner Added!.",
          "success"
        );
      },
      err => {
        this.sharedService.addToast("Error", "Error occurred!", "error");
      }
    );
  }

  getCompetition() {
    this.competitionService.getActiveCompetition().subscribe(res => {
      this.competitions = res.Result;
      if (this.competitions.length != 0) {
        this.getProjects(this.competitions[0].id);
      }
    });
  }

  getProjects(competitionId) {
    this.competitionService.getProjects(competitionId).subscribe(res => {
      this.projects = res;
    });
  }
}
