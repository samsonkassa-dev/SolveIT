import { NgSelectModule } from "@ng-select/ng-select";
import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProjectsListComponent } from "./projects-list/projects-list.component";
import { SharedModule } from "../../shared/shared.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ProjectService } from "./project.service";
import { ToastyModule } from "ng2-toasty";
import { NgxPaginationModule } from "ngx-pagination";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    ToastyModule,
    NgxPaginationModule,
    NgMultiSelectDropDownModule,
    NgSelectModule
  ],
  declarations: [ProjectsListComponent],
  exports: [ProjectsListComponent],
  providers: [ProjectService]
})
export class ProjectModule {}
