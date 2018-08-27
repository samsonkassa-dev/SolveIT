import { Component, OnInit } from "@angular/core";
import { SolveitTeamService } from "../../solveitTeam.service";

@Component({
    selector: "app-event-view",
    templateUrl: "./viewEvent.component.html",
    styleUrls: ["./viewEvent.component.css"]
})

export class EventView implements OnInit{

    private event = {};

    constructor(private service: SolveitTeamService) {

    }

    ngOnInit() {
        this.getEvent(1);
    }

    getEvent(eventId) {
        this.service.getEvent(eventId).subscribe(
            res => {
                this.event = res;
            }
        );
    }
    
}