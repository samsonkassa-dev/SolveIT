import { Component } from "@angular/core";
import { AuthService } from "../../Auth/services/auth.service";

@Component({
  selector: "app-event",
  templateUrl: "./event.component.html",
  styleUrls: ["./event.component.css"]
})
export class EventsComponent {
  public selected = "events-list";
  public isEdit = false;
  public event = {
    title: "",
    description: "",
    city: "",
    place: "",
    venue: "",
    startDate: "",
    endDate: ""
  };

  constructor(public authService: AuthService) {}

  toggleView(view) {
    this.selected = view;
  }

  editEvent($event) {
    console.log($event.event);
    this.event = $event.event;
    this.isEdit = true;
    this.toggleView("create-event");
  }
  showList() {
    this.toggleView("events-list");
    this.event = {
      title: "",
      description: "",
      city: "",
      place: "",
      venue: "",
      startDate: "",
      endDate: ""
    };
    this.isEdit = false;
  }
}
