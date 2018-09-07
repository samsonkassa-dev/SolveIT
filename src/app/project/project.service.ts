import { Injectable } from "@angular/core";
import { ApiService } from "../shared/services/api.service";
import { CompetitionService } from "../competition/competition.service";

@Injectable()

export class ProjectService {
    
    constructor(private apiService: ApiService, private competitionService: CompetitionService) {
        
    }

    createProject(project) {
        return this.apiService.post(`/solveit-projects`, project);
    }

    getProject(projectId) {
        return this.apiService.get(`/solveit-projects/${projectId}`);
    }

    getMyProjects(userId) {
        return this.apiService.get(`/UserAccounts/${userId}/projects`);
    }

    getAllProjects() {
        return this.apiService.get(`/solveit-projects`)
    }

    addProjectMember(member) {
        return this.apiService.post(``, member);
    }

    getMembers(projectId) {
        return this.apiService.get(`solveit-projects/${projectId}/members`);
    }

    joinCompetition(project) {
        this.competitionService.getActiveCompetition().subscribe(
            res => {
                project.competitionId = res.Result.id;
                return this.apiService.put(`solveit-projects/${project.id}`, project);
            }
        )
    }
}