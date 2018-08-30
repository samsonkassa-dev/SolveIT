import { Component } from "@angular/core";
import { FormGroup, Validators, FormBuilder, FormControl } from "@angular/forms";
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
        this.eventForm = new FormGroup({
            title: new FormControl('', Validators.required),
            description: new FormControl('', Validators.required)
        });
    }

    createEvent() {
        this.service.createEvent(this.event).subscribe(
            res => {
                console.log(res);
            }
        );
    }
    
}