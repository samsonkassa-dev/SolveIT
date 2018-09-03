import { Component } from "@angular/core";

@Component({
    selector: "app-event",
    templateUrl: "./event.component.html",
    styleUrls: ["./event.component.css"]
})

export class Events {

    private selected = "events-list";

    toggleView(view) {
        this.selected = view;
    }
    
}