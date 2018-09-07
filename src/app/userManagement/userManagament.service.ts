import { Injectable } from "@angular/core";
import { ApiService } from "../shared/services/api.service";

@Injectable()

export class UserManagementService {

    constructor(private apiService: ApiService) {
        
    }

    getUserList(roleId) {
        return this.apiService.get(`UserAccounts/role/${roleId}/users`);
    }

    activateDeactivateUser(user) {
        return this.apiService.put(`UserAccounts/${user.id}`, user);
    }
}