import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";
import { NgModule } from "@angular/core";
import { AddUserComponent } from "./addUser/addUser.component";
import { UserListComponent } from "./userList/userList.component";
import { ExportDataComponent } from "./exportData/exportData.component";
import { ManageUserComponent } from "./manageUser/manageUser.component";
import { UserManagementService } from "./userManagament.service";
import { NgxPaginationModule } from "ngx-pagination";
import { UserProfileComponent } from "./userProfile/userProfile.component";
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

@NgModule({
  declarations: [
    AddUserComponent,
    UserListComponent,
    ExportDataComponent,
    ManageUserComponent,
    UserProfileComponent,
    EditProfileComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
  ],
  providers: [UserManagementService],
  exports: [ManageUserComponent, ExportDataComponent]
})
export class UserManagementModule {}
