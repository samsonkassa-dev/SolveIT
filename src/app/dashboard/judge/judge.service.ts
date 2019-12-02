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

  getAllJudges(){
    return this.apiService.get(`${this.endpoint}`);
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
    return this.apiService.delete(`${this.endpoint}/${judge.id}`);
  }

  getRegions() {
    return this.apiService.get(`Regions/`);
  }
}
