import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from './../../../Auth/services/auth.service';
import { Router } from '@angular/router';
import { JudgeService } from './../judge.service';
import { SharedService } from './../../../shared/services/shared.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-judge-list',
  templateUrl: './judge-list.component.html',
  styleUrls: ['./judge-list.component.css']
})
export class JudgeListComponent implements OnInit {
  judgeList = []
  competitions = []
  backupJudgeList = []
  key = ""
  selectedJudge;
  assignCompetition : FormGroup;
  constructor(
    public sharedService: SharedService,
    public judgeService: JudgeService,
    public authService: AuthService,
    private router:Router,
    private fb: FormBuilder
  ) { 
    this.assignCompetition = this.fb.group({
      competitions: [null]
    })
  }

  ngOnInit() {
    
    this.judgeService.getRoles().subscribe(roles =>{
      roles.forEach(element => {
        if(element.name == "solve-it-judge"){
          this.judgeService.getAllJudges(element.id).subscribe(res =>{
            console.log(res)
            this.judgeList = res
            this.backupJudgeList = res
          })
        }
      });
    })

    this.judgeService.getCompetitions().subscribe(competitions =>{
      console.log(competitions)
        this.competitions = competitions
    })
   
  }


  selectJudge(judge){
    this.selectedJudge = judge
  }
  assignCompetitionToJudge(comp){
    console.log(comp)
    this.judgeService.assignCompetitions(this.selectedJudge, comp).subscribe(res=>{
      console.log(res)
    })
  }

  viewDetails(judge){
    this.router.navigate(['dashboard','judges',judge.id])
  }
  onSearch($event) {
    if (this.key !== '' && this.judgeList.length > 0) {
      this.judgeList = this.backupJudgeList.filter(item => item.fullName.toUpperCase().indexOf(this.key.toUpperCase()) !== -1 );
  } else if (this.key === '') {
      this.judgeList = this.backupJudgeList;
    }
  }
  deleteJudge(judge){
    this.judgeService.deleteJudge(judge)
    .subscribe(res => {
      this.ngOnInit()
      this.sharedService.addToast('Success', 'Deleted Judge Successfully!.', 'success');
    }, err => {
      this.sharedService.addToast('Error', 'Error occurred!.', 'error');
    });
  }

  approveJudge(judge){
    this.judgeService.approveJudge(judge)
    .subscribe(res => {
      this.ngOnInit()
      this.sharedService.addToast('Success', 'Deleted Judge Successfully!.', 'success');
    }, err => {
      this.sharedService.addToast('Error', 'Error occurred!.', 'error');
    });
  }

}
