import { Component } from "@angular/core";
import { CompetitionService } from "../competition.service";
import { SharedService } from "../../shared/services/shared.service";

@Component({
    selector: 'app-competition-list',
    templateUrl: './competitionList.component.html',
    styleUrls: ['competitionList.component.css']
})

export class CompetitionListComponent {

    private competitions = [];

    constructor(private service: CompetitionService, private sharedService: SharedService) {
        
    }

    getCompetitions() {
        this.service.getCompetitions().subscribe(
            res => {
                this.competitions = res;
            }
        )
    }

    viewCompetition(competition) {
        //
    }

    activateCompetition(competition) {
        let updatedCompetition = competition;
        updatedCompetition.active = true;
        this.service.activateDeactivateCompetition(updatedCompetition).subscribe(
            res => {
                this.sharedService.addToast("Success", "Competition Deactivated!.", 'success');
                competition.active = true;
            },
            err => {
                if (err.status = 422) {
                    this.sharedService.addToast("", "Error occured!", 'error');
                }
            }
        );
    }

    deactivateCompetition(competition) {
        let updatedCompetition = competition;
        updatedCompetition.active = false;
        this.service.activateDeactivateCompetition(updatedCompetition).subscribe(
            res => {
                this.sharedService.addToast("Success", "Competition Deactivated!.", 'success');
                competition.active = false;
            },
            err => {
                if (err.status = 422) {
                    this.sharedService.addToast("", "Error occured!", 'error');
                }
            }
        );
    }
}