import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActivitiesListComponent } from "./activities-list/activities-list.component";
import { SharedModule } from "../../shared/shared.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ActivityService } from "./activity.service";
import { ToastyModule } from "ng2-toasty";
import { NgxPaginationModule } from "ngx-pagination";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    ToastyModule,
    NgxPaginationModule
  ],
  declarations: [ActivitiesListComponent],
  exports: [ActivitiesListComponent],
  providers: [ActivityService]
})
export class ActivityModule {}
