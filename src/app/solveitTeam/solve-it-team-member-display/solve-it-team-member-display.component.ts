import { configs } from './../../app.config';
import { CommonService } from './../../shared/services/common.service';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-solve-it-team-member-display',
  templateUrl: './solve-it-team-member-display.component.html',
  styleUrls: ['./solve-it-team-member-display.component.css']
})
export class SolveItTeamMemberDisplayComponent implements OnInit {
  solveItTeam = []
  constructor(public commonService: CommonService) { }

  ngOnInit() {
    this.commonService.getSolveItTeam()
    .subscribe(res =>{
      this.solveItTeam = res
    })
  }

  getImageUrl(item) {
    return `${configs.rootUrl}storages/${item.container}/download/${item.name}`;
  }

}
