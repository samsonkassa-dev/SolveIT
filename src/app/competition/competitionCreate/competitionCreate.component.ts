import { Component } from "@angular/core";
import { CompetitionService } from "../competition.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
    selector: 'app-competition-create',
    templateUrl: 'competitionCreate.component.html',
    styleUrls: ['competitionCreate.component.css']
})

export class CompetitionCreateComponent {

    private competition = {};
    private competitionForm: FormGroup;

    constructor(private service: CompetitionService) {
        this.competitionForm = new FormGroup({

        })
    }

    createCompetition() {
        this.service.createCompetition(this.competition).subscribe(
            res => {
                console.log(res);
            }
        );
    }
}