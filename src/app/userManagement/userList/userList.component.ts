import { Component, OnInit, AfterViewInit } from "@angular/core";
import { UserManagementService } from "../userManagament.service";

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

    constructor(private service: UserManagementService) {
        
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
                console.log(res)
            }
        );
    }

    deactivateUser(user) {
        this.service.deactivateUser(user).subscribe(
            res => {
                console.log(res)
            }
        );
    }

    toggleView(view, roleId) {
        this.roleId = roleId;
        this.selected = view;
        this.getUserList();
        this.showDatatable();
    }
}