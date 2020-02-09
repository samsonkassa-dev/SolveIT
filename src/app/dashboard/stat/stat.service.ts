import { AuthService } from "./../../Auth/services/auth.service";
import { ApiService } from "./../../shared/services/api.service";
import { Injectable } from "@angular/core";

@Injectable()
export class StatService {
  constructor(
    private apiService: ApiService,
    private authService: AuthService
  ) {}

  getUser(userId) {
    return this.apiService.get(
      `UserAccounts/${userId}?filter={"include":["role","city"]}`
    );
  }
  getCompetitions() {
    return this.apiService.get(`solvieITCompetitions/`);
  }
  getProjects(competitionId) {
    return this.apiService.post(`solvieITCompetitions/competition-projects`, {
      competitionId
    });
  }
  activateDeactivateUser(userid, status) {
    return this.apiService.patch(`UserAccounts/${userid}`, status);
  }

  getRoles() {
    return this.apiService.get(`Icog-Roles/`);
  }

  getRegions() {
    return this.apiService.get(`Regions/`);
  }

  getCities() {
    return this.apiService.get(`cities/`);
  }

  updateStatus(patch) {
    return this.apiService.patch(
      `UserAccounts/${this.authService.getUserId()}`,
      patch
    );
  }

  updateProfile(user) {
    return this.apiService.patch(`UserAccounts/${user.id}`, user);
  }

  grantModeratorAccess(user) {
    return this.apiService.patch(`UserAccounts/${user.id}`, {
      isModerator: true
    });
  }

  detainModeratorAccess(user) {
    return this.apiService.patch(`UserAccounts/${user.id}`, {
      isModerator: false
    });
  }

  getUserList() {
    return this.apiService.get(`UserAccounts?filter={"include":["profile"]}`);
  }

  assignCities(data) {
    return this.apiService.post("AssignedCities/assign", { data: data });
  }

  getAssignedCities(userId) {
    return this.apiService.get(`UserAccounts/${userId}/get-assigned-cities`);
  }

  approveInvestor(profileId) {
    return this.apiService.patch(`investorProfiles/${profileId}`, {
      approved: true
    });
  }
}
