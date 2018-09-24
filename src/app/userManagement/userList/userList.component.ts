import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import { UserManagementService } from '../userManagament.service';
import { SharedService } from '../../shared/services/shared.service';

@Component({
    selector: 'app-user-list',
    templateUrl: 'userList.component.html',
    styleUrls: ['userList.component.css']
})

export class UserListComponent implements OnInit {

    @Output() create = new EventEmitter();
    public users = [];
    public solveitTeamUsers = [];
    public solveitMgmtUsers = [];
    public participantUsers = [];
    public selected = 'solveitmgmt';
    public roleId = 1;
    public page = 1;
    public keyword = '';

    constructor(public service: UserManagementService, public sharedService: SharedService) {

    }

    ngOnInit() {
        this.getUserList();
    }

    getUserList() {
        this.service.getUserList(this.roleId).subscribe(
            res => {
                this.users = res.Result;
                res.Result.filter(item => {
                    if (item.roleId === 2) {
                      this.solveitMgmtUsers.push(item);
                    } else if (item.roleId === 3) {
                      this.solveitTeamUsers.push(item);
                    } else if (item.roleId === 4) {
                        this.participantUsers.push(item);
                    }
                });
            }
        );
    }

    activateUser(user) {
        let updatedUser = user;
        updatedUser.status = "ACTIVE"
        this.service.activateDeactivateUser(updatedUser).subscribe(
            res => {
                this.sharedService.addToast("Success", "Account Activated!.", 'success');
                user.status = "ACTIVE";
            },
            err => {
                if (err.status = 422) {
                    this.sharedService.addToast('', 'Error occured!', 'error');
                }
            }
        );
    }

    deactivateUser(user) {
        let updatedUser = user;
        updatedUser.status = "INACTIVE"
        this.service.activateDeactivateUser(updatedUser).subscribe(
            res => {
                this.sharedService.addToast("Success", "Account Deactivated!.", 'success');
                user.status = "INACTIVE";
            },
            err => {
                if (err.status = 422) {
                    this.sharedService.addToast('', 'Error occured!', 'error');
                }
            }
        );
    }

    toggleView(view, roleId) {
        this.page = 1;
        this.roleId = roleId;
        this.selected = view;
        this.getUserList();
    }

    searchUser() {
        if (this.keyword != '') {
            this.participantUsers = this.users.filter(item => item.email.includes(this.keyword) && (item.roleId == 4));
            this.solveitMgmtUsers = this.users.filter(item => item.email.includes(this.keyword) && (item.roleId == 2));
            this.solveitTeamUsers = this.users.filter(item => item.email.includes(this.keyword) && (item.roleId == 3));
        } else {
            this.participantUsers = this.users.filter(item => item.roleId == 4);
            this.solveitMgmtUsers = this.users.filter(item => item.roleId == 2);
            this.solveitTeamUsers = this.users.filter(item => item.roleId == 3);
        }
    }

    createUser() {
      this.create.emit();
      console.log('creating user');
    }
}
