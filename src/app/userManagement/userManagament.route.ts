import { Routes } from '@angular/router';
import { ManageUserComponent } from './manageUser/manageUser.component';

export const UserManagementRoutes: Routes = [
	{
		path: "manage-user",
		children: [
			{path: '', component: ManageUserComponent}
		]
	}
];
