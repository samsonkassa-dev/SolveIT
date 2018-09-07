import { Component } from "@angular/core";
import { CompetitionService } from "../competition.service";

@Component({
    selector: 'app-competition-list',
    templateUrl: './competitionList.component.html',
    styleUrls: ['competitionList.component.css']
})

export class CompetitionListComponent {

    private competitions = [];

    constructor(private service: CompetitionService) {
        
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
}