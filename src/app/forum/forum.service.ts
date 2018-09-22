import { Injectable } from '@angular/core';
import { ApiService } from '../shared/services/api.service';
import {AuthService} from '../Auth/services/auth.service';

@Injectable()

export class ForumService {

    constructor(public apiService: ApiService, public authService: AuthService) {}

    createDiscussion(discussion) {
        return this.apiService.post(`Solveitdiscussions`, discussion);
    }

    togglePinDiscussion(discussion) {
        const update = discussion;
        update.pinned = !discussion.pinned;
        return this.apiService.put(`Solveitdiscussions/${discussion.id}`, update);
    }

    getMembers(forumId) {
        return this.apiService.get(`SolveITForums/${forumId}/members`);
    }

    getFavouriteDiscussions(userId) {
        return this.apiService.get(`UserAccounts/${userId}/favouriteDiscussions`);
    }

    getDiscussion(slung) {
        return this.apiService.get(`Solveitdiscussions/${slung}/discussion`);
    }

    countComments(discussionId) {
        return this.apiService.get(`Solveitdiscussions/${discussionId}/comments/count`);
    }

    getDiscussions(forumId) {
        return this.apiService.get(`SolveITForums/${forumId}/discussions`);
    }

    getComments(discussionId) {
        return this.apiService.get(`Solveitdiscussions/${discussionId}/comments`);
    }

    createForum(forum) {
        return this.apiService.post(`SolveITForums`, forum);
    }

    getForumList() {
        return this.apiService.get(`SolveITForums/forumList`);
    }

    getAllForumList() {
        return this.apiService.get(`SolveITForums`);
    }

    getMyForumList(userId) {
        return this.apiService.get(`UserAccounts/${userId}/forums`);
    }

    getForum(slung) {
        return this.apiService.get(`SolveITForums/${slung}/forum`);
    }

    addComment(comment) {
        return this.apiService.post(`SolveIT-Discussion-Comments`, comment);
    }

    addMember(member) {
        return this.apiService.post(`forum_members`, member);
    }

    addToFavourites(favourite) {
        return this.apiService.post(`Favouritediscussions`, favourite);
    }

    removeFromFavorites(userId, discussionId) {
      return this.apiService.delete( `UserAccounts/${userId}/favouriteDiscussions/${discussionId}`);
    }

    getCategories() {
        return this.apiService.get(`forumCategories`);
    }

    searchUser(keyword) {
        return this.apiService.get(`UserAccounts/search/${keyword}`);
    }
}
