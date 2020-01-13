import { AuthService } from './../Auth/services/auth.service';
import { Component, OnInit } from "@angular/core";
import { CommonService } from "../shared/services/common.service";

declare var $: any;

@Component({
    selector: 'app-weekly-winner',
    templateUrl: 'weeklyWinner.component.html',
    styleUrls: ['weeklyWinner.component.css']
})

export class WeeklyWinnerComponent implements OnInit {

    public winners = [];
    rankConversion = {
        "Gold":"First",
        "Silver":"Second",
        "Bronze":"Third",
        "Honorable-Mentions":"Special Recognition"
    }
    constructor(
        public authService: AuthService,
        public service: CommonService) { }

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

    getTitle(title: string, full = false) {
        // tslint:disable-next-line: max-line-length
        if (!full) {
            return title.length < 25 ? this.service.toCammelCase(title) : `${this.service.toCammelCase(title).slice(0)} ...`;
        }
        return this.service.toCammelCase(title);
    }
}
