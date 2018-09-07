import { Injectable } from '@angular/core';
import { ApiService } from '../shared/services/api.service';

@Injectable()

export class ForumService {

    constructor(private apiService: ApiService) {}

    createDiscussion(discussion) {
        return this.apiService.post(`SolveIT-Discussions`, discussion);
    }

    pinDiscussion(discussion) {
        const update = discussion;
        update.pinned = true;
        return this.apiService.put(`SolveIT-Discussions/${discussion.id}`, update);
    }

    getMembers(forumId){
        return this.apiService.get(`SolveITForums/${forumId}/members`);
    }

    getFavouriteDiscussions(userId){
        return this.apiService.get(`UserAccounts/${userId}/favouriteDiscussions`);
    }

    getDiscussion(slung) {
        return this.apiService.get(`SolveIT-Discussions/${slung}/discussion`);
    }

    countComments(discussionId) {
        return this.apiService.get(`SolveIT-Discussions/${discussionId}/comments/count`);
    }

    getDiscussions(forumId) {
        return this.apiService.get(`SolveITForums/${forumId}/discussions`);
    }

    getComments(discussionId) {
        return this.apiService.get(`SolveIT-Discussions/${discussionId}/comments`);
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
        return this.apiService.post(`forum-members`, member);
    }

    addToFavourites(favourite) {
        return this.apiService.post(`favourite-discussions`, favourite);
    }

    getCategories() {
        return this.apiService.get(`forumCategories`);
    }

    searchUser(keyword) {
        return this.apiService.get(`UserAccounts/search/${keyword}`);
    }
}
