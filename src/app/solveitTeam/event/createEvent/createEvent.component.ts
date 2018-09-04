import {Component, EventEmitter, Output} from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { SolveitTeamService } from '../../solveitTeam.service';

@Component({
    selector: 'app-event-create',
    templateUrl: './createEvent.component.html',
    styleUrls: ['./createEvent.component.css']
})

export class CreateEventComponent {

    public event = {
      title: '',
      description: '',
      date: new Date()
    };
    public eventForm: FormGroup;
    @Output() created = new EventEmitter();

    constructor(public service: SolveitTeamService) {
        this.eventForm = new FormGroup({
            title: new FormControl('', Validators.required),
            description: new FormControl('', Validators.required),
            date: new FormControl(new Date(), Validators.required)
        });
    }

  createEvent() {
    this.service.createEvent(this.event).subscribe(
    res => {
        console.log(res);
        this.toggleCreated();
      }
    );
  }

  toggleCreated() {
      this.created.emit();
  }

}
