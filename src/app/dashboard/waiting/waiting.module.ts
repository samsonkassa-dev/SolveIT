import { NgxSpinnerModule } from "ngx-spinner";
import { WaitingService } from "./waiting.service";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../../shared/shared.module";
import { ToastyModule } from "ng2-toasty";
import { NgxPaginationModule } from "ngx-pagination";
import { WaitingListComponent } from "./waiting-list/waiting-list.component";

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
  declarations: [WaitingListComponent],
  exports: [WaitingListComponent],
  providers: [WaitingService]
})
export class WaitingModule {}
