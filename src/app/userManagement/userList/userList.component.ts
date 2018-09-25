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
    public solveitTeamroleId = 0;
    public solveitMgmtroleId = 0;
    public page = 1;
    public keyword = '';
  private solveitParticipanttroleId = 0;

    constructor(public service: UserManagementService, public sharedService: SharedService) {

    }

    ngOnInit() {
        this.getRoleIds();
    }

    getUserList() {
        this.service.getUserList().subscribe(
            res => {
                this.users = res;
                res.filter(item => {
                    if (item.roleId === this.solveitMgmtroleId) {
                      this.solveitMgmtUsers.push(item);
                    } else if (item.roleId === this.solveitTeamroleId) {
                      this.solveitTeamUsers.push(item);
                    } else if (item.roleId === this.solveitParticipanttroleId) {
                        this.participantUsers.push(item);
                    }
                });
                console.log(this.users);
                console.log('team ', this.solveitTeamUsers);
                console.log('mgt ', this.solveitMgmtUsers);
                console.log('part ', this.participantUsers);

            }
        );
    }

    getRoleIds() {
        this.service.getRoles().subscribe(res => {
            for (let i = 0; i < res.length; ++i) {
                if (res[i].name === 'solve-it-team') {
                    this.solveitTeamroleId = res[i].id;
                } else if (res[i].name === 'solve-it-mgt') {
                    this.solveitMgmtroleId = res[i].id;
                } else if (res[i].name === 'solve-it-participants') {
                    this.solveitParticipanttroleId = res[i].id;
                }
            }
          console.log('team ', this.solveitTeamroleId);
          console.log('mgt  ', this.solveitMgmtroleId);
          console.log('part ', this.solveitParticipanttroleId);
            this.getUserList();
        });
    }

    activateUser(user) {
        const updatedUser = user;
        updatedUser.status = 'ACTIVE';
        this.service.activateDeactivateUser(updatedUser).subscribe(
            res => {
                this.sharedService.addToast('Success', 'Account Activated!.', 'success');
                user.status = 'ACTIVE';
            },
            err => {
                if (err.status = 422) {
                    this.sharedService.addToast('', 'Error occured!', 'error');
                }
            }
        );
    }

    deactivateUser(user) {
        const updatedUser = user;
        updatedUser.status = 'INACTIVE';
        this.service.activateDeactivateUser(updatedUser).subscribe(
            res => {
                this.sharedService.addToast('Success', 'Account Deactivated!.', 'success');
                user.status = 'INACTIVE';
            },
            err => {
                if (err.status = 422) {
                    this.sharedService.addToast('', 'Error occured!', 'error');
                }
            }
        );
    }

    toggleView(view) {
        this.page = 1;
        this.selected = view;
    }

    searchUser() {
        if (this.keyword !== '') {
            this.participantUsers = this.users.filter(item => item.email.includes(this.keyword) && (item.roleId === this.solveitParticipanttroleId));
            this.solveitMgmtUsers = this.users.filter(item => item.email.includes(this.keyword) && (item.roleId === this.solveitMgmtroleId));
            this.solveitTeamUsers = this.users.filter(item => item.email.includes(this.keyword) && (item.roleId === this.solveitTeamroleId));
        } else {
            this.participantUsers = this.users.filter(item => item.roleId ===this.solveitParticipanttroleId);
            this.solveitMgmtUsers = this.users.filter(item => item.roleId ===this.solveitMgmtroleId);
            this.solveitTeamUsers = this.users.filter(item => item.roleId ===this.solveitTeamroleId);
        }
    }

    createUser() {
      this.create.emit();
      console.log('creating user');
    }
}
