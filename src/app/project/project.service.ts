import { Injectable } from "@angular/core";
import { ApiService } from "../shared/services/api.service";

@Injectable()

export class ProjectService {
    
    constructor(private apiService: ApiService) {
        
    }

    createProject(project) {
        return this.apiService.post(``, project);
    }

    getProject(projectId) {
        return this.apiService.get(``);
    }

    getMyProjects(userId) {
        return this.apiService.get(``);
    }

    addProjectMember(member) {
        return this.apiService.post(``, member);
    }
}