import { Injectable } from "@angular/core";
import { ApiService } from "../shared/services/api.service";
import { from } from "../../../node_modules/rxjs/observable/from";

@Injectable()
export class ProjectService {
  constructor(public apiService: ApiService) {}

  createProject(project) {
    return this.apiService.post(`/Solveitprojects`, project);
  }

  getProject(projectId) {
    return this.apiService.get(`Solveitprojects/${projectId}`);
  }

  getJudges(competitionId) {
    return this.apiService.get(`judges`);
  }
  addScore(projectId, score) {
    return this.apiService.patch(`Solveitprojects/${projectId}`, score);
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

  removeProjectMember(member) {
    return this.apiService.post("/project-members/removeMember", member);
  }

  getMembers(projectId) {
    return this.apiService.get(
      `Solveitprojects/${projectId}/members?filter={"include": "role"}`
    );
  }

  joinCompetition(project, data) {
    const temp = {
      competitionId: data.competition,
      projectId: project.id,
      questionnaireAnswers: {
        innovationInfo: data.innovationInfo,
        furtherInfo: data.furtherInfo
      }
    };
    return this.apiService.post("CompetitionProjects/enroll", temp);
  }

  getProjectCompetitions(projectId) {
    return this.apiService.get(`Solveitprojects/${projectId}/competitions`);
  }

  uploadProgressReport(report) {
    return this.apiService.post("ProgressReports", report);
  }

  downloadProposal(file) {
    return this.apiService.download(
      `storages/proposals/download/${file}`,
      file
    );
  }

  downloadProjectReport(file) {
    return this.apiService.download(`storages/reports/download/${file}`, file);
  }

  getAllProgressReport(projectId) {
    return this.apiService.get(
      `Solveitprojects/${projectId}/reports?filter={"include": ["user","activity"]}`
    );
  }

  addPogressReportScore(report) {
    return this.apiService.put(`ProgressReports/${report.id}`, report);
  }

  removeReport(report) {
    return this.apiService.delete(`ProgressReports/${report.id}`);
  }

  addPogressReportComment(comment) {
    return this.apiService.post("progressComments", comment);
  }

  fetchProjectReportComments(reportId) {
    return this.apiService.get(
      `ProgressReports/${reportId}/progressComments?filter={"include": "user"}`
    );
  }

  updateProject(projectId, data) {
    return this.apiService.patch(`Solveitprojects/${projectId}`, data);
  }

  bookmarkProject(bookmarkObject) {
    return this.apiService.post(`projectBookmarks`, bookmarkObject);
  }

  removeBookmark(bookmarkId) {
    return this.apiService.delete(`projectBookmarks/${bookmarkId}`);
  }

  rateProject(ratingObject) {
    return this.apiService.post(`projectRatings`, ratingObject);
  }

  getRecommendedProjects() {
    return this.apiService.get(`CompetitionProjects/recommendations`);
  }

  getMostViewedProjects() {
    return this.apiService.get(`projectViews/mostViewed`);
  }

  getTopRatedProjects() {
    return this.apiService.get(`projectRatings/topRated`);
  }

  getBookmarkedProjects() {
    return this.apiService.get(`projectBookmarks/userBookmarks`);
  }

  getProjectRatings(projectId) {
    return this.apiService.get(`projectRatings/${projectId}/ratings`);
  }

  registerView(projectViewObject) {
    return this.apiService.post(`projectViews/registerView`, {
      projectViewObject: { projectViewObject }
    });
  }

  getSectors() {
    return this.apiService.get(`sectors`);
  }

  getProductTypes() {
    return this.apiService.get(`productTypes`);
  }

  getActivities(level) {
    return this.apiService.get(
      `activities?filter={"where":{ "level" : ${level}}}`
    );
  }

  addProductTypeView(viewObject) {
    return this.apiService.post(`productTypeViews`, viewObject);
  }

  addSectorView(viewObject) {
    return this.apiService.post(`sectorViews`, viewObject);
  }

  fetchInvestorProfile(userId) {
    return this.apiService.get(`UserAccounts/${userId}/profile`);
  }

  patchInvestorProfile(profileId, profile) {
    return this.apiService.patch(`investorProfiles/${profileId}`, profile);
  }

  getCompetitionAllProjects() {
    return this.apiService.get(`solvieITCompetitions/all-projects`);
  }
}
