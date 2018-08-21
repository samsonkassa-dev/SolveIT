import { Component } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { SolveitTeamService } from "../../solveitTeam.service";

@Component({
    selector: "app-event-create",
    templateUrl: "./createEvent.component.html",
    styleUrls: ["./createEvent.component.css"]
})

export class CreateEvent {

    private event = {};
    private eventForm: FormGroup;

    constructor(private service: SolveitTeamService) {

    }

    createEvent() {
        this.service.createEvent(this.event);
    }
    
}