import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable()
export class CommonService {
  public endpoint = 'cities';
  newsUrl = 'news';

  constructor(public apiService: ApiService) {

  }

  // Cities common services
  getCities() {
    return this.apiService.get(this.endpoint + `?filter={"include": "region"}`);
  }

  getRegions() {
    return this.apiService.get(`Regions/`);
  }
  // News common services
  fetchAllNews() {
    return this.apiService.get(`${this.newsUrl}?filter={"order": "createdAt DESC", "include": "user"}`);
  }

  // Forum common services
  getCategories() {
    return this.apiService.get(`forumCategories`);
  }

  removeFromBlackList(discussionId) {
    return this.apiService.post(
      'BlackListedDiscussions/removeFromBlackList',
      discussionId
    );
  }

  getBlacklistedDiscussions() {
    return this.apiService.get(
      `BlackListedDiscussions?filter={"include": "Solveitdiscussion"}`
    );
  }

  removeDiscussion(discussionId) {
    return this.apiService.delete(`Solveitdiscussions/${discussionId}`);
  }

  searchUser(keyword, userId) {
    return this.apiService.get(`UserAccounts/search/${keyword}/${userId}`);
  }

  getWeeklyWinners() {
    return this.apiService.get(
      `weekTopProjects?filter={"where": {"active": true}, "include": "solveitproject"}`
    );
  }
}
