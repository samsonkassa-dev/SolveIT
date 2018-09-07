import { Component } from "@angular/core";
import { CompetitionService } from "../competition.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { SharedService } from "../../shared/services/shared.service";

@Component({
    selector: 'app-competition-create',
    templateUrl: 'competitionCreate.component.html',
    styleUrls: ['competitionCreate.component.css']
})

export class CompetitionCreateComponent {

    private competition = {};
    private competitionForm: FormGroup;

    constructor(private service: CompetitionService, private sharedService: SharedService) {
        this.competitionForm = new FormGroup({

        })
    }

    createCompetition() {
        this.service.createCompetition(this.competition).subscribe(
            res => {
                this.sharedService.addToast("Success", "Competition Created!.", 'success');
            },
            err => {
                if (err.status = 422) {
                    this.sharedService.addToast("", "Error occured!", 'error');
                }
            }
        );
    }
}