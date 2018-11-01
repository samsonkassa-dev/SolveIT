import { Injectable } from "@angular/core";
import { ApiService } from "../shared/services/api.service";
import { CompetitionService } from "../competition/competition.service";
import {from} from '../../../node_modules/rxjs/observable/from';

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
        return this.apiService.get(`/Solveitprojects`);
    }

    addProjectMember(member) {
        return this.apiService.post(`/project-members`, member);
    }

    getMembers(projectId) {
        return this.apiService.get(`Solveitprojects/${projectId}/members`);
    }

    joinCompetition(project, data) {
      const temp = {
        competitionId: data.competitionId,
        projectId: project.id,
        questionnairesAnswer: {innovationInfo: data.innovationInfo, furtherInfo: data.furtherInfo}
      };
      return this.apiService.post('CompetitionProjects', temp);
    }

    getProjectCompetitions(projectId) {
      return this.apiService.get(`Solveitprojects/${projectId}/competitions`);
    }

    uploadProgressReport(report) {
      return this.apiService.post('ProgressReports', report);
    }

  downloadProposal(file) {
    return this.apiService.download(`storages/proposals/download/${file}`, file);
  }

  downloadProjectReport(file) {
      return this.apiService.download(`storages/reports/download/${file}`, file);
  }

  getAllProgressReport(projectId) {
      return this.apiService.get(`Solveitprojects/${projectId}/reports`);
  }

  addPogressReportComment(comment) {
      return this.apiService.post('progressComments', comment);
  }

  fetchProjectReportComments(reportId) {
      return this.apiService.get(`ProgressReports/${reportId}/progressComments?filter={"include": "user"}`);
  }
}
