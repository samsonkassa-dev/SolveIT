import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { SolveitTeamService } from "../../solveitTeam.service";
import { AuthService } from "../../../Auth/services/auth.service";

@Component({
  selector: "app-event-list",
  templateUrl: "./eventList.component.html",
  styleUrls: ["./eventList.component.css"]
})
export class EventListComponent implements OnInit {
  public events = [];
  public store = [];
  public selected = "events-list";
  public searchKey = "";
  public p = 1;
  public selectedEvent = null;
  @Output() edit = new EventEmitter();

  constructor(
    public service: SolveitTeamService,
    public authService: AuthService
  ) {}

  ngOnInit() {
    this.getEventsList();
  }

  filterByCity(city) {
    if (city !== '') {
      this.events = this.store.filter(event => {
        return event.city.toLowerCase() === city.toLowerCase();
      });
    } else {
      this.events = this.store;
    }
  }

  isOngoing(event) {
    const now = new Date();
    return (
      event.startDate <= now.toISOString() && now.toISOString() < event.endDate
    );
  }

  isPassed(event) {
    const now = new Date();
    return event.endDate < now.toISOString();
  }

  getEventsList() {
    this.service.getEventsList().subscribe(res => {
      this.events = res;
      this.store = this.events;
    });
  }

  viewEvent() {
    this.selected = "view-event";
  }

  onSearch($event) {
    this.events = this.events.filter(event => {
      return event.title.indexOf(this.searchKey) !== -1;
    });
  }

  viewEventDetail(event) {
    this.selectedEvent = event;
  }

  getDate(date) {
    return {
      date:
        new Date(date).getDate() +
        " - " +
        new Date(date).getMonth() +
        " - " +
        new Date(date).getFullYear(),
      clock: new Date(date).getHours() + " : " + new Date(date).getMinutes()
    };
  }

  getLimmitedEventTitle(title, limmit) {
    if (title.length > limmit) {
      return title.slice(0, limmit) + "...";
    } else {
      return title;
    }
  }

  onEdit(event) {
    this.edit.emit({ event: event });
  }
}
