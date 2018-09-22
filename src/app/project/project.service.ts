import { Injectable } from "@angular/core";
import { ApiService } from "../shared/services/api.service";
import { CompetitionService } from "../competition/competition.service";

@Injectable()

export class ProjectService {
    
    constructor(public apiService: ApiService, public competitionService: CompetitionService) {
        
    }

    createProject(project) {
        return this.apiService.post(`/Solveitprojects`, project);
    }

    getProject(projectId) {
        return this.apiService.get(`/Solveitprojects/${projectId}`);
    }

    getMyProjects(userId) {
        return this.apiService.get(`/UserAccounts/${userId}/projects`);
    }

    getAllProjects() {
        return this.apiService.get(`/Solveitprojects`)
    }

    addProjectMember(member) {
        return this.apiService.post(`/project-members`, member);
    }

    getMembers(projectId) {
        return this.apiService.get(`Solveitprojects/${projectId}/members`);
    }

    joinCompetition(project) {
        this.competitionService.getActiveCompetition().subscribe(
            res => {
                project.competitionId = res.Result.id;
                return this.apiService.put(`Solveitprojects/${project.id}`, project);
            }
        )
    }
}