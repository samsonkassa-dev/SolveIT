import { Component, OnInit } from "@angular/core";
import { CompetitionService } from "../competition.service";

@Component({
    selector: 'app-competition-winner',
    templateUrl: 'competitionWinner.component.html',
    styleUrls: ['competitionWinner.component.css']
})

export class CompetitionWinnerComponent implements OnInit{

    public project: any;

    constructor(public service: CompetitionService) { }

    ngOnInit() {
        this.getWinnerProject();
    }

    getWinnerProject() {
        this.service.getWinnerProject().subscribe(
            res => {
                this.project = res;
            }
        )
    }
}