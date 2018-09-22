import { Component, EventEmitter, Output } from "@angular/core";
import { CompetitionService } from "../competition.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { SharedService } from "../../shared/services/shared.service";

@Component({
    selector: 'app-competition-create',
    templateUrl: 'competitionCreate.component.html',
    styleUrls: ['competitionCreate.component.css']
})

export class CompetitionCreateComponent {

    public competition = {
        name: '',
        start_date: new Date()
    };
    public competitionForm: FormGroup;
    @Output() back = new EventEmitter();

    constructor(public service: CompetitionService, public sharedService: SharedService) {
        this.competitionForm = new FormGroup({
            name: new FormControl('', Validators.required),
            start_date: new FormControl('', Validators.required)
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

    backToList() {
        this.back.emit();
    }
}