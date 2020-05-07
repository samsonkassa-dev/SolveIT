import { ProjectsListComponent } from "./project/projects-list/projects-list.component";
import { WaitingListComponent } from "./waiting/waiting-list/waiting-list.component";
import { ActivitiesListComponent } from "./activity/activities-list/activities-list.component";
import { StatListComponent } from "./stat/stat-list/stat-list.component";
import { JudgeProfileComponent } from "./judge/judge-profile/judge-profile.component";
import { JudgeListComponent } from "./judge/judge-list/judge-list.component";
import { AttendanceDetailComponent } from "./attendance/attendance-detail/attendance-detail.component";
import { SolveItTeamMemberEditComponent } from "./solveit-team-member/solve-it-team-member-edit/solve-it-team-member-edit.component";
import { SolveItTeamMemberAddComponent } from "./solveit-team-member/solve-it-team-member-add/solve-it-team-member-add.component";
import { SolveItTeamMemberListComponent } from "./solveit-team-member/solve-it-team-member-list/solve-it-team-member-list.component";
import { Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard.component";
import { DashboardGuardService } from "../Auth/services/dashboard-guard.service";
import { CompetitionProjectsComponent } from "../competition/competitionProjects/competitionProjects.component";
import { UserProfileComponent } from "../userManagement/userProfile/userProfile.component";
import { UserListComponent } from "../userManagement/userList/userList.component";
import { CompetitionViewComponent } from "../competition/competitionView/competitionView.component";
import { ManageUserComponent } from "../userManagement/manageUser/manageUser.component";
import { CategoriesListComponent } from "./category/categories-list/categories-list.component";
import { TagManagmentComponent } from "./tag/tag-managment/tag-managment.component";
import { ReviewDiscussionComponent } from "./reviewDiscussion/reviewDiscussion.component";
import { CityListComponent } from "./city/cityList/cityList.component";
import { ExportDataComponent } from "../userManagement/exportData/exportData.component";
import { AdminGuardService } from "../Auth/services/admin-guard.service";
import { SolveitMgmtGuardService } from "../Auth/services/solveit-mgmt-guard.service";
import { UserModuleGuardService } from "../Auth/services/userModuleGuard.service";
import { AttendanceListComponent } from "./attendance/attendance-list/attendance-list.component";

export const DASHBOARD_ROUTES: Routes = [
  {
    path: "",
    component: DashboardComponent,
    canActivate: [DashboardGuardService],
    children: [
      {
        path: "",
        pathMatch: "full",
        redirectTo: "users"
      },
      {
        path: "users",
        component: ManageUserComponent,
        canActivate: [UserModuleGuardService]
      },
      {
        path: "competitions",
        children: [
          { path: "", component: CompetitionViewComponent },
          { path: ":id", component: CompetitionProjectsComponent }
        ]
      },
      { path: "categories", component: CategoriesListComponent },
      { path: "activities", component: ActivitiesListComponent },
      { path: "projects", component: ProjectsListComponent },

      { path: "waiting", component: WaitingListComponent },

      { path: "tags", component: TagManagmentComponent },
      { path: "review-discussion", component: ReviewDiscussionComponent },
      { path: "stats", component: StatListComponent },
      { path: "cities", component: CityListComponent },
      { path: "judges", component: JudgeListComponent },
      { path: "judges/:judge_id", component: JudgeProfileComponent },
      { path: "attendance", component: AttendanceListComponent },
      {
        path: "attendance/:attendance_id",
        component: AttendanceDetailComponent
      },
      { path: "solveit-team", component: SolveItTeamMemberListComponent },
      { path: "solveit-team/add", component: SolveItTeamMemberAddComponent },
      {
        path: "solveit-team/edit/:member_id",
        component: SolveItTeamMemberEditComponent
      },
      { path: "export-data", component: ExportDataComponent }
    ]
  },
  {
    path: "competitions/:competitionId",
    component: CompetitionProjectsComponent,
    canActivate: [DashboardGuardService]
  },
  { path: "userProfile/:userId", component: UserProfileComponent }
];
