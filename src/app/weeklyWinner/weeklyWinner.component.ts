import { Component, OnInit } from "@angular/core";
import { CommonService } from "../shared/services/common.service";

@Component({
    selector: 'app-weekly-winner',
    templateUrl: 'weeklyWinner.component.html',
    styleUrls: ['weeklyWinner.component.css']
})

export class WeeklyWinnerComponent implements OnInit{

    public winners = [];

    constructor(public service: CommonService) { }

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