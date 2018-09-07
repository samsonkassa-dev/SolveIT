import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";
import { NgModule } from "@angular/core";

import { CompetitionViewComponent } from "./competitionView/competitionView.component";
import { CompetitionListComponent } from "./competitionList/competitionList.component";
import { CompetitionCreateComponent } from "./competitionCreate/competitionCreate.component";
import { CompetitionService } from "./competition.service";

@NgModule({
    declarations: [
        CompetitionViewComponent,
        CompetitionListComponent,
        CompetitionCreateComponent
    ],
    imports: [
        SharedModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    providers: [CompetitionService],
    exports: []
})

export class CompetitionModule {

}
