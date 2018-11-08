import { Injectable } from '@angular/core';
import { ApiService } from '../shared/services/api.service';

@Injectable()

export class SolveitTeamService {

    constructor(private apiService: ApiService) {}

    createEvent(event) {
        return this.apiService.post(`events`, event);
    }

    getEventsList() {
        return this.apiService.get(`events`);
    }

    getEvent(eventId) {
        return this.apiService.get(`events/${eventId}`);
    }

    fetchNews() {

    }

}
