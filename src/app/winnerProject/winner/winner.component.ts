import { Component } from "@angular/core";

@Component({
    selector: 'app-winner',
    templateUrl: "winner.component.html",
    styleUrls: ["winner.component.html"]
})

export class WinnerComponent {

    public selected = 'winner-list-weekly';

    constructor() { }

    toggleView(view) {
        this.selected = view;
    }
    
}