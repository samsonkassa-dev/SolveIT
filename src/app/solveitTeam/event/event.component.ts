import { Component } from '@angular/core';
import {AuthService} from '../../Auth/services/auth.service';

@Component({
    selector: 'app-event',
    templateUrl: './event.component.html',
    styleUrls: ['./event.component.css']
})

export class EventsComponent {

    private selected = 'events-list';

    constructor(public authService: AuthService) {

    }

    toggleView(view) {
        this.selected = view;
    }

}
