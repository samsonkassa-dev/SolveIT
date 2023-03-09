import { FormGroup, FormBuilder } from "@angular/forms";
import { AuthService } from "./../../../Auth/services/auth.service";
import { Router } from "@angular/router";
import { JudgeService } from "./../judge.service";
import { SharedService } from "./../../../shared/services/shared.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-judge-list",
  templateUrl: "./judge-list.component.html",
  styleUrls: ["./judge-list.component.css"]
})
export class JudgeListComponent implements OnInit {
  judgeList = [];
  competitions = [];
  selectedCompetitions = [];
  backupJudgeList = [];
  key = "";
  selectedJudge;
  assignCompetition: FormGroup;
  constructor(
    public sharedService: SharedService,
    public judgeService: JudgeService,
    public authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.assignCompetition = this.fb.group({
      competitions: [null]
    });
  }

  ngOnInit() {
    this.judgeService.getRoles().subscribe(roles => {
      roles.forEach(element => {
        if (element.name == "solve-it-judge") {
          this.judgeService.getAllJudges(element.id).subscribe(res => {
            console.log(res);
            this.judgeService.getCompetitions().subscribe(competitions => {
              console.log(competitions);
              this.competitions = competitions;
              var tempJudge = [];
              for (let index = 0; index < res.length; index++) {
                var judge = res[index];
                const comps = judge.competitions;
                var tempString = "";

                for (let yindex = 0; yindex < comps.length; yindex++) {
                  const comp = comps[yindex];
                  for (let zindex = 0; zindex < competitions.length; zindex++) {
                    if (comp === competitions[zindex].id)
                      tempString =
                        tempString + competitions[zindex].name + "\n";
                    console.log("tempString: ", tempString);
                  }
                  judge = { ...judge, competitionNames: tempString };
                }
                tempJudge.push(judge);
              }
              console.log("temp: ", tempJudge);

              this.judgeList = tempJudge;
              this.backupJudgeList = tempJudge;
            });
          });
        }
      });
    });
  }

  selectJudge(judge) {
    this.selectedJudge = judge;
    var tempComps = [];
    for (let index = 0; index < this.competitions.length; index++) {
      const comp = this.competitions[index];
      if (judge.competitionNames.includes(comp.name)) tempComps.push(comp);
    }
    this.selectedCompetitions = tempComps;
    console.log(this.selectedCompetitions);
    console.log(this.competitions);
    this.ngOnInit();
  }
  assignCompetitionToJudge(comp) {
    var temp = comp.competitions.map((c)=> c.id);    
    this.judgeService
      .assignCompetitions(this.selectedJudge, temp)
      .subscribe(res => {
        console.log(res);
        this.sharedService.addToast(
          "Success",
          "Assigned Judge Successfully!.",
          "success"
        );
    this.ngOnInit();

      });
  }

  viewDetails(judge) {
    this.router.navigate(["dashboard", "judges", judge.id]);
  }
  onSearch($event) {
    if (this.key !== "" && this.judgeList.length > 0) {
      this.judgeList = this.backupJudgeList.filter(
        item =>
          item.fullName.toUpperCase().indexOf(this.key.toUpperCase()) !== -1
      );
    } else if (this.key === "") {
      this.judgeList = this.backupJudgeList;
    }
  }
  deleteJudge(judge) {
    this.judgeService.deleteJudge(judge).subscribe(
      res => {
        this.ngOnInit();
        this.sharedService.addToast(
          "Success",
          "Deleted Judge Successfully!.",
          "success"
        );
      },
      err => {
        this.sharedService.addToast("Error", "Error occurred!.", "error");
      }
    );
  }

  approveJudge(judge) {
    this.judgeService.approveJudge(judge).subscribe(
      res => {
        this.ngOnInit();
        this.sharedService.addToast(
          "Success",
          "Approved Judge Successfully!.",
          "success"
        );
      },
      err => {
        this.sharedService.addToast("Error", "Error occurred!.", "error");
      }
    );
  }
}
