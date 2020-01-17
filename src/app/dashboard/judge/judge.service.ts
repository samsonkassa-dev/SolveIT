import {Injectable} from '@angular/core';
import {ApiService} from '../../shared/services/api.service';

@Injectable()

export class JudgeService {

  public endpoint = 'judges';

  constructor(public apiService: ApiService) {

  }
  getEvents(){
    return this.apiService.get(`events`);
  }

  getAllJudges(roleId){
    return this.apiService.get(`judges?filter={"include":["judge"]}`);
  }

  getRoles(){
    return this.apiService.get(`Icog-Roles/`);
  }
  getUser(userId) {
    return this.apiService.get(
      `UserAccounts/${userId}?filter={"include":["role","city"]}`
    );
  }

  getJudge(judge_id){
    return this.apiService.get(`${this.endpoint}/${judge_id}`)
  }
  addJudge(judge) {
    return this.apiService.post(this.endpoint, judge);
  }
  updateJudge(judge){
    return this.apiService.put(`${this.endpoint}/${judge.id}`,judge);
  }
  deleteJudge(judge) {
    return this.apiService.delete(`UserAccounts/${judge.id}`);
  }
  approveJudge(judge) {
    return this.apiService.patch(`${this.endpoint}/${judge.id}`, {approved: true});
  }

  assignCompetitions(judge, comp) {
    return this.apiService.patch(`${this.endpoint}/${judge.id}`, {competitions: comp.competitions});
  }
  getRegions() {
    return this.apiService.get(`Regions/`);
  }

  getCompetitions(){
    return this.apiService.get('solvieITCompetitions')
  }
}
