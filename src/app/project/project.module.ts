import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { NgSelectModule } from '@ng-select/ng-select';
import { RatingModule } from 'ng-starrating';

import { ProjectService } from "./project.service";
import { FileUploadModule } from "ng2-file-upload";
import { CreateProjectComponent } from "./createProject/createProject.component";
import { ProjectListComponent } from "./projectList/projectList.component";
import { ProjectViewComponent } from "./projectView/projectView.component";
import { ProjectContainerComponent } from "./projectContainer.component";
import { SharedModule } from "../shared/shared.module";
import { NgxPaginationModule } from "ngx-pagination";
import {
  NgCircleProgressModule,
  CircleProgressOptions
} from "ng-circle-progress";
import { AddProjectMemberComponent } from "./addMember/addMember.component";
import { ProjectMemberList } from "./memberList/memberList.component";
import { CreateProgressReportComponent } from "./create-progress-report/create-progress-report.component";
import { ReportViewComponent } from "./report-view/report-view.component";
import { MomentModule } from "angular2-moment";
import { JoinCompetitionComponent } from "./join-competition/join-competition.component";
import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";
import { RouterModule } from "@angular/router";
import { ProjectRoutes } from "./project.route";
import { FacebookModule } from "ngx-facebook";
import { RecommendationsComponent } from './recommendations/recommendations.component';
import { ProjectInvestorViewComponent } from "./projectInvestorView/projectInvestorView.component";
import { ProjectReviewListComponent } from "./projectReviewList/projectReviewList.component";
import { SingleReviewComponent } from "./singleReview/singleReview.component";
import { InvestorProfileModalComponent } from "./investorProfileModal/investorProfileModal.component";
import { ActivityViewComponent } from "./activityView/activity-view.component";

@NgModule({
  declarations: [
    CreateProjectComponent,
    ProjectListComponent,
    ProjectViewComponent,
    ProjectContainerComponent,
    AddProjectMemberComponent,
    ProjectMemberList,
    CreateProgressReportComponent,
    ActivityViewComponent,
    ReportViewComponent,
    JoinCompetitionComponent,
    RecommendationsComponent,
    ProjectInvestorViewComponent,
    ProjectReviewListComponent,
    SingleReviewComponent,
    InvestorProfileModalComponent
  ],
  imports: [
    RouterModule.forChild(ProjectRoutes),
    NgxPaginationModule,
    SharedModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FileUploadModule,
    NgCircleProgressModule,
    MomentModule,
    NgMultiSelectDropDownModule,
    FacebookModule.forRoot(),
    NgSelectModule,
    RatingModule
  ],
  providers: [ProjectService, CircleProgressOptions],
  exports: []
})
export class ProjectModule {}
