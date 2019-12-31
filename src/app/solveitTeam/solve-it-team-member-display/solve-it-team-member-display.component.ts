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
  formation = [2,1,4,3]
  defaultFormation = 4
  solveitTeamInFormation = []
  constructor(public commonService: CommonService) { }

  ngOnInit() {
    this.commonService.getSolveItTeam()
    .subscribe(res =>{
      this.solveItTeam = res
      let result = []
      let temp = []
      let formationIndex = 0
      let currentFormation = this.formation[formationIndex]
      let counter = 0
      this.solveItTeam.forEach(team=>{
        counter ++
        if(counter == currentFormation){
          temp.push(team)
          counter = 0
          result.push(temp)
          temp = []
          formationIndex += 1
          if(formationIndex >= this.formation.length){
            currentFormation = this.defaultFormation
          }else{
            currentFormation = this.formation[formationIndex]
          }
        }else{
          temp.push(team)
        }
      })
      if(temp.length >0){
        result.push(temp)
      }
      temp = []
     
      this.solveitTeamInFormation = result
      
    })
  }

  getImageUrl(item) {
    return `${configs.rootUrl}storages/${item.container}/download/${item.name}`;
  }

}
