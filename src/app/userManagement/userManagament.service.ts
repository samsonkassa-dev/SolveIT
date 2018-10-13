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
        return this.apiService.get(`UserAccounts/${userId}?filter={"include":["role","region"]}`);
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

    updateStatus(user) {
        return this.apiService.put(`UserAccounts/${user.id}`, user);
    }
}
