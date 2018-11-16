import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SharedService } from "../../shared/services/shared.service";
import { WinnerProjectService } from "../winnerProject.service";
import { CompetitionService } from "../../competition/competition.service";
import { AuthService } from "../../Auth/services/auth.service";

@Component({
  selector: "app-add-competition-winner",
  templateUrl: "addCompetitionWinner.component.html",
  styleUrls: ["addCompetitionWinner.component.css"]
})
export class AddCompetitionWinnerComponent implements OnInit {
  public competitionWinner = { active: true, competitionId: "", projectId: "" };
  public competitionWinnerForm: FormGroup;
  public projects = [];
  public competitions = [];

  constructor(
    public service: WinnerProjectService,
    public fb: FormBuilder,
    public sharedService: SharedService,
    public competitionService: CompetitionService,
    public authService: AuthService
  ) {
    this.competitionWinnerForm = this.fb.group({
      project: ["", Validators.required],
      competition: ["", Validators.required]
    });
  }

  ngOnInit() {
    this.getCompetition();
  }

  addCompetitionWinner() {
    if (this.competitionWinnerForm.valid) {
      this.service.labelCompetitionWinner(this.competitionWinner).subscribe(
        res => {
          this.sharedService.addToast(
            "Success",
            "New Competition Winner Added!.",
            "success"
          );
        },
        err => {
          this.sharedService.addToast("Error", "Error occurred!", "error");
        }
      );
    } else {
      this.markFormGroupTouched(this.competitionWinnerForm);
    }
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

  /**
   * Marks all controls in a form group as touched
   * @param formGroup - The form group to touch
   */
  public markFormGroupTouched(formGroup: any) {
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
