import { Injectable } from "@angular/core";
import { ApiService } from "../shared/services/api.service";

@Injectable()
export class CompetitionService {
  constructor(private apiService: ApiService) {}

  getProjects(competitionId) {
    return this.apiService.post(`solvieITCompetitions/competition-projects`, {
      competitionId
    });
  }

  getCompetitions() {
    return this.apiService.get(`solvieITCompetitions/`);
  }

  getCompetition(id) {
    return this.apiService.get(`solvieITCompetitions/${id}`);
  }

  deleteCompetitionProject(id) {
    return this.apiService.delete(`CompetitionProjects/${id}`);
  }
  updateProject(body) {
    return this.apiService.put(`Solveitprojects/${body.id}`, body);
  }
  createCompetition(competition) {
    return this.apiService.post(`solvieITCompetitions/`, competition);
  }

  getActiveCompetition() {
    return this.apiService.get(`solvieITCompetitions/active`);
  }

  activateDeactivateCompetition(competition) {
    return this.apiService.put(
      `solvieITCompetitions/${competition.id}`,
      competition
    );
  }

  getWinnerProject() {
    return this.apiService.get(
      `competitionWinners?filter={"where": {"active": true}, "include": ["solveitproject", "competition"]}`
    );
  }

  getWeeklyWinners() {
    return this.apiService.get(
      `weekTopProjects?filter={"where": {"active": true}, "include": "solveitproject"}`
    );
  }

  addProjectMember(member) {
    return this.apiService.post(`/project-members`, member);
  }
  createProject(project) {
    return this.apiService.post(`/Solveitprojects`, project);
  }
  addToCompetition(projectCompetition) {
    return this.apiService.post(`/CompetitionProjects`, projectCompetition);
  }

  updateCompetition(competition) {
    return this.apiService.patch(
      `solvieITCompetitions/${competition.id}`,
      competition
    );
  }

  getCities() {
    return this.apiService.get("cities");
  }
}
