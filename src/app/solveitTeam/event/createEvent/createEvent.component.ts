import {Component, EventEmitter, Output} from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { SolveitTeamService } from '../../solveitTeam.service';
import { SharedService } from '../../../shared/services/shared.service';

@Component({
    selector: 'app-event-create',
    templateUrl: './createEvent.component.html',
    styleUrls: ['./createEvent.component.css']
})

export class CreateEventComponent {

    public event = {
      title: '',
      description: '',
      city: '',
      place: '',
      venue: '',
      startDate: '',
      endDate: ''
    };
    public eventForm: FormGroup;
    @Output() created = new EventEmitter();

    constructor(public service: SolveitTeamService, private sharedService: SharedService) {
        this.eventForm = new FormGroup({
            title: new FormControl('', Validators.required),
            description: new FormControl('', Validators.required),
            city: new FormControl('', Validators.required),
            place: new FormControl('', Validators.required),
            venue: new FormControl('', Validators.required),
            startDate: new FormControl(new Date(), Validators.required),
            endDate: new FormControl(new Date(), Validators.required)
        });
    }

  createEvent() {
    if (this.eventForm.valid) {
      this.service.createEvent(this.event).subscribe(
        res => {
          this.toggleCreated();
          this.sharedService.addToast('Success', 'Event created!', 'success');
        },
        err => {
          if (err.status = 422) {
            this.sharedService.addToast('', 'Error occurred!', 'error');
          }
        }
      );
    } else  {
      this.markFormGroupTouched(this.eventForm);
    }
  }

  toggleCreated() {
      this.created.emit();
  }

  /**
   * Marks all controls in a form group as touched
   * @param formGroup - The form group to touch
   */
  private markFormGroupTouched(formGroup: any) {
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }

}
