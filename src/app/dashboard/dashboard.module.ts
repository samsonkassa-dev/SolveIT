import { ProjectModule } from "./project/project.module";
import { WaitingModule } from "./waiting/waiting.module";
import { ActivityModule } from "./activity/activity.module";
import { StatModule } from "./stat/stat.module";
import { JudgeModule } from "./judge/judge.module";
import { SolveItTeamMemberModule } from "./solveit-team-member/solveit-team-member.module";
import { NgModule } from "@angular/core";
import { HeaderComponent } from "../shared/header/header.component";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { ToastyModule, ToastyService } from "ng2-toasty";
import { ApiService } from "../shared/services/api.service";
import { SharedService } from "../shared/services/shared.service";
import { SharedModule } from "../shared/shared.module";
import { UserManagementModule } from "../userManagement/userManagement.module";
import { DashboardComponent } from "./dashboard.component";
import { CompetitionModule } from "../competition/competition.module";
import { CategoryModule } from "./category/category.module";
import { TagModule } from "./tag/tag.module";
import { AdminGuardService } from "../Auth/services/admin-guard.service";
import { SolveitMentorGuardService } from "../Auth/services/solveit-mentor-guard.service";
import { CityModule } from "./city/city.module";
import { DASHBOARD_ROUTES } from "./dashboard.routes";
import { ReviewDiscussionComponent } from "./reviewDiscussion/reviewDiscussion.component";
import { NgxPaginationModule } from "ngx-pagination";
import { AttendanceModule } from "./attendance/attendance.module";

@NgModule({
  declarations: [DashboardComponent, ReviewDiscussionComponent],
  imports: [
    RouterModule.forChild(DASHBOARD_ROUTES),
    CommonModule,
    RouterModule,
    ToastyModule,
    SharedModule,
    UserManagementModule,
    CompetitionModule,
    CategoryModule,
    TagModule,
    StatModule,
    CityModule,
    ActivityModule,
    ProjectModule,
    WaitingModule,
    SolveItTeamMemberModule,
    AttendanceModule,
    JudgeModule,
    NgxPaginationModule
  ],
  providers: [ApiService, ToastyService, SharedService, AdminGuardService],
  exports: [HeaderComponent]
})
export class DashboardModule {}
