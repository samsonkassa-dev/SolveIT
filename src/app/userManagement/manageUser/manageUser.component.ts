import { Component } from "@angular/core";

@Component({
    selector: 'app-manage-user',
    templateUrl: 'manageUser.component.html',
    styleUrls: ['manageUser.component.css']
})

export class ManageUserComponent {

    private selected = 'user-list';

    constructor() {
        
    }

    toggleView(view) {
        this.selected = view;
    }
}