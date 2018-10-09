import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";
import { NgModule } from "@angular/core";
import { AddUserComponent } from "./addUser/addUser.component";
import { UserListComponent } from "./userList/userList.component";
import { ManageUserComponent } from "./manageUser/manageUser.component";
import { UserManagementService } from "./userManagament.service";
import { NgxPaginationModule } from 'ngx-pagination';
import { UserProfileCompomnent } from "./userProfile/userProfile.component";

@NgModule({
    declarations: [
        AddUserComponent,
        UserListComponent,
        ManageUserComponent,
        UserProfileCompomnent
    ],
    imports: [
        SharedModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgxPaginationModule
    ],
    providers: [UserManagementService],
    exports: [ManageUserComponent]
})

export class UserManagementModule {

}
