import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-adress',
  templateUrl: './adress.component.html',
  styleUrls: ['./adress.component.css']
})
export class AdressComponent implements OnInit {

  @Output() next = new EventEmitter();
  @Output() back = new EventEmitter();

  public addressForm: FormGroup;
  public regions = ['Afar', 'Amhara', 'Benshangul-Gumz', 'Gambela', 'Harari', 'Oromia', 'SNNP', 'Tigray', 'Addis Ababa', 'Dire Dawa'];
  @Input() address;

  constructor() { }

  ngOnInit() {
    this.addressForm = new FormGroup({
      region: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      wereda: new FormControl('', Validators.required),
      houseNo: new FormControl('', Validators.required),
      fullName: new FormControl('', Validators.required),
      phoneNumber: new FormControl('', Validators.required)
    });
  }

  onDone() {
    console.log(this.addressForm);
    if (this.addressForm.valid) {
      this.next.emit();
      console.log('Next');
    } else {
      console.log('Address Form is not valid');
    }
  }

  onBack() {
    this.back.emit();
  }

}
