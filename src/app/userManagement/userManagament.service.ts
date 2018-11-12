import { Injectable } from '@angular/core';
import { ApiService } from '../shared/services/api.service';

@Injectable()

export class UserManagementService {

    constructor(private apiService: ApiService) {

    }

    getUserList() {
        return this.apiService.get(`UserAccounts/`);
    }

    getUser(userId) {
        return this.apiService.get(`UserAccounts/${userId}?filter={"include":["role","city"]}`);
    }

    activateDeactivateUser(user) {
        return this.apiService.put(`UserAccounts/${user.id}`, user);
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

    updateStatus(user) {
        return this.apiService.put(`UserAccounts/${user.id}`, user);
    }

    grantModeratorAccess(user) {
        return this.apiService.patch(`UserAccounts/${user.id}`, {isModerator: true});
    }

    detainModeratorAccess(user) {
        return this.apiService.patch(`UserAccounts/${user.id}`, {isModerator: false});
    }
}
