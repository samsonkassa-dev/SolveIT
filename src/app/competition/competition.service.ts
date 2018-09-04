import { Injectable } from "@angular/core";
import { ApiService } from "../shared/services/api.service";

@Injectable()

export class CompetitionService {

    constructor(private apiService: ApiService) {
        
    }

    getProjects(competitionId) {
        return this.apiService.get(`solvieITCompetitions/${competitionId}/solveit-project`);
    }

    getCompetitions() {
        return this.apiService.get(`solvieITCompetitions/`);
    }

    createCompetition(competition) {
        return this.apiService.post(`solvieITCompetitions/`, competition);
    }
}