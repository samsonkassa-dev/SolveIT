import { Component, OnInit } from "@angular/core";
import { CompetitionService } from "../competition.service";

@Component({
    selector: 'app-weekly-winner',
    templateUrl: 'weeklyWinner.component.html',
    styleUrls: ['weeklyWinner.component.css']
})

export class WeeklyWinnerComponent implements OnInit{

    public winners = [];

    constructor(public service: CompetitionService) { }

    ngOnInit() {
        this.getWeeklyWinners();
    }

    getWeeklyWinners() {
        this.service.getWeeklyWinners().subscribe(
            res => {
                this.winners = res;
            }
        )
    }
}