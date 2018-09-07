import { Component, OnInit, AfterViewInit } from "@angular/core";
import { UserManagementService } from "../userManagament.service";
import { SharedService } from "../../shared/services/shared.service";

declare var $:any;
@Component({
    selector: 'app-user-list',
    templateUrl: 'userList.component.html',
    styleUrls: ['userList.component.css']
})

export class UserListComponent implements OnInit, AfterViewInit{

    private users = [];
    private solveitTeamUsers = [];
    private solveitMgmtUsers = [];
    private participantUsers = [];
    private selected = 'solveitmgmt';
    private roleId = 1;
    private page: number = 1;
    private keyword = '';

    constructor(private service: UserManagementService, private sharedService: SharedService) {
        
    }

    ngOnInit() {
        this.getUserList();
    }

    showDatatable() {
        setTimeout(() => {
            $('.datatable').DataTable();
        }, 1000);
    }
    ngAfterViewInit(): void {
        setTimeout(() => {
          $('.datatable').DataTable();
        }, 1000);
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
        )
    }

    activateUser(user) {
        
        this.service.activateUser(user).subscribe(
            res => {
                this.sharedService.addToast("Success", "Account Activated!.", 'success');
            },
            err => {
                if (err.status = 422) {
                    this.sharedService.addToast("", "Error occured!", 'error');
                }
            }
        );
    }

    deactivateUser(user) {
        this.service.deactivateUser(user).subscribe(
            res => {
                this.sharedService.addToast("Success", "Account Deactivated!.", 'success');
            },
            err => {
                if (err.status = 422) {
                    this.sharedService.addToast("", "Error occured!", 'error');
                }
            }
        );
    }

    toggleView(view, roleId) {
        this.page = 1;
        this.roleId = roleId;
        this.selected = view;
        this.getUserList();
        this.showDatatable();
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
}