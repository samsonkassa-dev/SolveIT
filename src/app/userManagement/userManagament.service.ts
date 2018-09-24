import { Injectable } from "@angular/core";
import { ApiService } from "../shared/services/api.service";

@Injectable()

export class UserManagementService {

    constructor(private apiService: ApiService) {
        
    }

    getUserList() {
        return this.apiService.get(`UserAccounts/`);
    }

    activateDeactivateUser(user) {
        return this.apiService.put(`UserAccounts/${user.id}`, user);
    }

    getRoles() {
    	return this.apiService.get(`IcogRole/`);
    }
}