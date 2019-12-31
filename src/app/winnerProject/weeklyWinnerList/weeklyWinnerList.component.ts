import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit } from "@angular/core";
import { WinnerProjectService } from "../winnerProject.service";
import { SharedService } from "../../shared/services/shared.service";

@Component({
  selector: "app-weekly-winner-list",
  templateUrl: "weeklyWinnerList.component.html",
  styleUrls: ["weeklyWinnerList.component.css"]
})
export class WeeklyWinnerListComponent implements OnInit {
  public weeklyWinners = [];
  public page: number = 1;
  public weeklyWinner = {
    id:"",
    week: "",
    rank: "",
  };
  public weeklyWinnerForm: FormGroup;
  constructor(
    public service: WinnerProjectService,
    public sharedService: SharedService,
    private fb:FormBuilder
  ) { 
    this.weeklyWinnerForm = this.fb.group({
      week: ["", Validators.required],
      
      rank: ["", Validators.required],

    });
  }

  ngOnInit() {
    this.getWeeklyinners();
  }

  getWeeklyinners() {
    this.service.getWeeklyWinners().subscribe(res => {
      this.weeklyWinners = res;
    });
  }
  deleteWeeklyWinner(winner){
    this.service.removeWeeklyWinner(winner.id).subscribe(res =>{
      this.sharedService.addToast(
        "Success",
        "Weekly Winner Removed!",
        "success"
      );
      this.ngOnInit()
    })
  }
  updateWeeklyWinner(){
    if (this.weeklyWinnerForm.valid) {
      this.service.updateWeeklyWinner(this.weeklyWinner).subscribe(
        res => {
          this.sharedService.addToast(
            "Success",
            "Weekly Winner Updated!",
            "success"
          );
          this.ngOnInit()
        },
        err => {
          this.sharedService.addToast("Error", "Error occurred!", "error");
        }
      );
    } else {
      this.markFormGroupTouched(this.weeklyWinnerForm);
    }
  }
  removeWeeklyWinnerLabel(winner) {
    this.service.removeWeeklyWinnerLabel(winner.id).subscribe(
      res => {
        winner.active = false;
        this.sharedService.addToast(
          "Success",
          "Weekly Winner Removed!.",
          "success"
        );
      },
      err => {
        this.sharedService.addToast("Error", "Error occurred!", "error");
      }
    );
  }
  setUpEditWinners(winner){
    this.weeklyWinner = winner
    this.weeklyWinnerForm.patchValue(winner)
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
