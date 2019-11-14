import {Injectable} from '@angular/core';
import {ApiService} from '../../shared/services/api.service';

@Injectable()

export class SolveItTeamMemberService {

  public endpoint = 'solveit-team';

  constructor(public apiService: ApiService) {

  }
  
  getTeamMembers() {
    return this.apiService.get(this.endpoint);
  }

  getTeamMember(member_id){
    return this.apiService.get(`${this.endpoint}/${member_id}`)
  }

  addSolveItTeamMember(solveItTeamMember) {
    return this.apiService.post(this.endpoint, solveItTeamMember);
  }
  updateSolveItTeamMember(solveItTeamMember){
    return this.apiService.put(`${this.endpoint}/${solveItTeamMember.id}`,solveItTeamMember);
  }
  deleteSolveItTeamMember(solveItTeamMember) {
    return this.apiService.delete(`${this.endpoint}/${solveItTeamMember.id}`);
  }

  getRegions() {
    return this.apiService.get(`Regions/`);
  }
}
