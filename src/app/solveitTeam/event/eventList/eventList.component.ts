import { Component } from "@angular/core";
import { SolveitTeamService } from "../../solveitTeam.service";

@Component({
    selector: "app-event-list",
    templateUrl: "./eventList.component.html",
    styleUrls: ["./eventList.component.css"]
})

export class EventList {

    private events = [];
    private selected = "events-list";

    constructor(private service: SolveitTeamService) {

    }

    getEventsList() {
        this.service.getEventsList().subscribe(
            res => {
                this.events = res;
            }
        );
    }

    viewEvent() {
        this.selected = "view-event";
    }
    
}