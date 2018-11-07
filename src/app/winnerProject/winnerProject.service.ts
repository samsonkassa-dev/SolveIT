import {Injectable} from '@angular/core';
import {ApiService} from '../shared/services/api.service';


@Injectable()

export class WinnerProjectService {

  constructor(public apiService: ApiService) {

  }

  labelCompetitionWinner(winner) {
    return this.apiService.post(`competitionWinner/`, winner);
  }

  labelWeeklyWinner(winner) {
    return this.apiService.post(`weekTopProjects/`, winner);
  }

  getWeeklyWinners() {
    return this.apiService.get(`weekTopProjects?filter={"include": "solveitproject"}`);
  }

  getCompetitionWinners() {
    return this.apiService.get(`competitionWinner?filter={"include": ["solveitproject", "competition"]}`);
  }

  removeCompetitionWinnerLabel(winnerId) {
    return this.apiService.patch(`competitionWinner/${winnerId}`, {active: false});
  }

  removeWeeklyWinnerLabel(winnerId) {
    return this.apiService.patch(`weekTopProjects/${winnerId}`, {active: false});
  }

}
