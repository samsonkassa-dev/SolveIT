import { Injectable } from "@angular/core";
import { ApiService } from "../shared/services/api.service";

@Injectable()

export class ForumService {

    constructor(private apiService: ApiService) {}

    createDiscussion(discussion) {
        return this.apiService.post(`/SolveIT-Discussions`, discussion);
    }

    getDiscussion(slung) {
        return this.apiService.get(`/SolveIT-Discussions/${slung}/discussion`);
    }

    countComments(discussionId) {
        return this.apiService.get(`/SolveIT-Discussions/${discussionId}/comments/count`);
    }

    getDiscussions(forumId) {
        return this.apiService.get(`/SolveIT-Forums/${forumId}/discussions`);
    }

    getComments(discussionId) {
        return this.apiService.get(`/SolveIT-Discussions/${discussionId}/comments`);
    }

    createForum(forum) {
        return this.apiService.post(`/SolveIT-Forums`, forum);
    }

    getForumList() {

    }

    getForum(forumId) {
        return this.apiService.get(`/SolveIT-Forums/${forumId}`);
    }

    addComment(comment) {
        return this.apiService.post(`SolveIT-Discussion-Comments`, comment);
    }

    addMember(member) {
        return this.apiService.post(`/forum-members`, member);
    }

    addToFavourites(favourite) {
        return this.apiService.post(`/favourite-discussions`, favourite)
    }

    getCategories() {
        return this.apiService.get(`/forum-categories`);
    }
}