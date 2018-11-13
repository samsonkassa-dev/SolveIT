import { Routes } from "@angular/router";
import { ManageUserComponent } from "./manageUser/manageUser.component";
import { UserProfileCompomnent } from "./userProfile/userProfile.component";

export const UserManagementRoutes: Routes = [
  {
    path: "manage-user",
    children: [
      { path: "", component: ManageUserComponent },
      { path: ":userId", component: UserProfileCompomnent }
    ]
  }
];
