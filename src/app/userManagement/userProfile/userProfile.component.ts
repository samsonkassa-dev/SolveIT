import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { UserManagementService } from "../userManagament.service";
import { SharedService } from "../../shared/services/shared.service";

@Component({
    selector: 'app-user-profile',
    templateUrl: 'userProfile.component.html',
    styleUrls: ['userProfile.component.css']
})

export class UserProfileCompomnent implements OnInit{

    public userId: any;
    public user: any;
    public selected = 'view';

    constructor(public service: UserManagementService, public sharedService: SharedService, public route: ActivatedRoute, public router: Router) {
        
    }

    ngOnInit() {
        this.userId = this.route.snapshot.paramMap.get('userId');
        this.getUser();
    }

    getUser() {
        this.service.getUser(this.userId).subscribe(
            res => {
                this.user = res;
                console.log(this.user);
            }
        )
    }

    updateStatus() {
        this.service.updateStatus(this.user).subscribe(
            res => {
                this.sharedService.addToast('Success', 'Status Updated!.', 'success');
            }, err => {
                this.sharedService.addToast('', 'Error occured!', 'error');
            }
        );
    }

    toggleView(view) {
        this.selected = view;
    }
}