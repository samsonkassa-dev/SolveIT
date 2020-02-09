import { NgxSpinnerModule } from "ngx-spinner";
import { StatService } from "./stat.service";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../../shared/shared.module";
import { ToastyModule } from "ng2-toasty";
import { NgxPaginationModule } from "ngx-pagination";
import { StatListComponent } from "./stat-list/stat-list.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    ToastyModule,
    NgxPaginationModule,
    NgxSpinnerModule
  ],
  declarations: [StatListComponent],
  exports: [StatListComponent],
  providers: [StatService]
})
export class StatModule {}
