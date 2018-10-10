import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { UserManagementService } from "../userManagament.service";

@Component({
    selector: 'app-user-profile',
    templateUrl: 'userProfile.component.html',
    styleUrls: ['userProfile.component.css']
})

export class UserProfileCompomnent implements OnInit{

    public userId: any;
    public user: any;

    constructor(public service: UserManagementService, public route: ActivatedRoute, public router: Router) {
        
    }

    ngOnInit() {
        this.userId = this.route.snapshot.paramMap.get('userId');
        this.getUser();
    }

    getUser() {
        this.service.getUser(this.userId).subscribe(
            res => {
                this.user = res;
            }
        )
    }

    updateProfile() {
        
    }
}