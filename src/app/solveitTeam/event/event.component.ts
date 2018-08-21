import { Component } from "@angular/core";

@Component({
    selector: "app-event",
    templateUrl: "./event.component.html",
    styleUrls: ["./event.component.css"]
})

export class Events {

    private selected = "add-event";

    toggleView(view) {
        this.selected = view;
    }
    
}