import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import { Router } from '@angular/router';
import { UserManagementService } from '../userManagament.service';
import { SharedService } from '../../shared/services/shared.service';

@Component({
    selector: 'app-user-list',
    templateUrl: 'userList.component.html',
    styleUrls: ['userList.component.css']
})

export class UserListComponent implements OnInit {

    @Output() create = new EventEmitter();
    public selected = '0';
    public page = 1;
    public keyword = '';
    public backupUsers = [];
    public allUsers = [];
    public selectedUsers = [];
    public views = [
      { name: 'solveitmgmt', id: '' },
      { name: 'solveitteam', id: '' },
      { name: 'participant', id: '' }
    ];
    public regions = [];
    public selectedRole = this.views[0];
    public selectedRegion = 0;


    constructor(public service: UserManagementService, public sharedService: SharedService, public router: Router) {

    }

    ngOnInit() {
        this.populateUsersList();
    }

    getAllUsers() {
      this.service.getUserList()
        .subscribe(res => {
          this.allUsers = res;
          this.filterUsers();
        });
    }

    getRegions() {
        this.service.getRegions().subscribe(res => {
            this.regions = res;
        });
    }

    populateUsersList() {
        this.service.getRoles()
          .subscribe(res => {
            for (let i = 0; i < res.length; ++i) {
              if (res[i].name === 'solve-it-team') {
                this.views[1].id = res[i].id;
              } else if (res[i].name === 'solve-it-mgt') {
                this.views[0].id = res[i].id;
              } else if (res[i].name === 'solve-it-participants') {
                this.views[2].id = res[i].id;
              }
            }
            this.getAllUsers();
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

    toggleView(index: string) {
        this.page = 1;
        this.selectedRole = this.views[parseInt(index)];
        this.filterUsers();
    }

    filterUsers() {
        if (this.selectedRegion === 0) {
            this.selectedUsers = this.allUsers.filter(item => {
                return item.roleId === this.selectedRole.id;
            });      
        } else {
            this.selectedUsers = this.allUsers.filter(item => {
                return (item.roleId === this.selectedRole.id && item.regionId === this.selectedRegion);
            });
        }
        this.backupUsers = this.selectedUsers;
        console.log('all users', this.allUsers);
        console.log('Selected users', this.selectedUsers);
    }

    searchUser() {
        if (this.keyword !== '') {
            this.selectedUsers = this.backupUsers.filter(item => {
              return item.email.includes(this.keyword) || item.firstName.includes(this.keyword) || item.middleName.includes(this.keyword) || item.lastName.includes(this.keyword);
            });
        } else {
          this.selectedUsers = this.backupUsers;
        }
    }

    createUser() {
      this.create.emit();
    }

    viewUserProfile(user) {
        this.router.navigate(['/manage-user/', user.id]);
    }
}
