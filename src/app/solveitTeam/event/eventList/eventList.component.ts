import { Component, OnInit } from '@angular/core';
import { SolveitTeamService } from '../../solveitTeam.service';
import {AuthService} from '../../../Auth/services/auth.service';

@Component({
    selector: 'app-event-list',
    templateUrl: './eventList.component.html',
    styleUrls: ['./eventList.component.css']
})

export class EventListComponent implements OnInit {

    private events = [];
    public store = [];
    public selected = 'events-list';
    public searchKey = '';
    public p = 1;
    public selectedEvent = null;

    constructor(public service: SolveitTeamService, public authService: AuthService) {

    }

    ngOnInit() {
        this.getEventsList();
    }

    getEventsList() {
        this.service.getEventsList().subscribe(
            res => {
                this.events = res;
                this.store = this.events;
            }
        );
    }

    viewEvent() {
        this.selected = 'view-event';
    }

    onSearch($event) {
      console.log($event);
      this.events = this.events.filter(event => {
        return event.title.indexOf(this.searchKey) !== -1;
      });
      console.log(this.events);
    }

    viewEventDetail(event) {
      this.selectedEvent = {
        title: event.title,
        description: event.description,
        date: new Date(event.date).getDate() + ' - ' + new Date(event.date).getMonth() + ' - ' + new Date(event.date).getFullYear() ,
        clock: new Date(event.date).getHours() + ' : ' + new Date(event.date).getMinutes()
      };
    }

    getDate(date) {
      return {
        date:  new Date(date).getDate() + ' - ' + new Date(date).getMonth() + ' - ' + new Date(date).getFullYear(),
        clock: new Date(date).getHours() + ' : ' + new Date(date).getMinutes()
      };
    }

}
