import { Injectable } from "@angular/core";
import { ApiService } from "../../shared/services/api.service";

@Injectable()
export class ProjectService {
  public endpoint = "projects";

  constructor(public apiService: ApiService) {}

  getProjects(competitionId) {
    return this.apiService.post(`solvieITCompetitions/competition-projects`, {
      competitionId
    });
  }
  addProject(project) {
    return this.apiService.post(this.endpoint, project);
  }

  getCompetitions() {
    return this.apiService.get(`solvieITCompetitions/`);
  }

  updateCompetitionProject(id, project) {
    return this.apiService.patch(`CompetitionProjects/${id}`, project);
  }
  updateProject(project) {
    return this.apiService.put(`${this.endpoint}/${project.id}`, project);
  }
  deleteProject(project) {
    return this.apiService.delete(`${this.endpoint}/${project.id}`);
  }
}
