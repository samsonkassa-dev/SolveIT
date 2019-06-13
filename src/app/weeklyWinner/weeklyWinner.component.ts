import { Component, OnInit } from "@angular/core";
import { CommonService } from "../shared/services/common.service";

@Component({
    selector: 'app-weekly-winner',
    templateUrl: 'weeklyWinner.component.html',
    styleUrls: ['weeklyWinner.component.css']
})

export class WeeklyWinnerComponent implements OnInit {

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
        );
    }

    getTitle(title: string) {
        // tslint:disable-next-line: max-line-length
        return title.length < 27 ? ` <h3 class="title project-title text-center">${this.service.toCammelCase(title)}</h3><br>` : `<h3 class="title project-title text-center">${this.service.toCammelCase(title)}</h3>`;
    }
}