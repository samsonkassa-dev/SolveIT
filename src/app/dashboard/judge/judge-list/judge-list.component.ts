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
  backupJudgeList = []
  key = ""
  constructor(
    public sharedService: SharedService,
    public judgeService: JudgeService
  ) { }

  ngOnInit() {
    this.judgeService.getAllJudges().subscribe(res =>{
      this.judgeList = res
      this.backupJudgeList = res
    })
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

}
