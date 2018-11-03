import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {PhoneNumberValidation} from '../validator/phoneNumberValidation';
import {UserManagementService} from '../../userManagement/userManagament.service';


@Component({
  selector: 'app-adress',
  templateUrl: './adress.component.html',
  styleUrls: ['./adress.component.css']
})
export class AdressComponent implements OnInit {

  @Output() next = new EventEmitter();
  @Output() back = new EventEmitter();

  public addressForm: FormGroup;
  public regions = [];
  @Input() address;

  constructor(public formBuilder: FormBuilder, public userService: UserManagementService) { }

  ngOnInit() {

    this.userService.getRegions()
      .subscribe(res => {
        this.regions = res;
      });

    this.addressForm = this.formBuilder.group({
      city: ['', Validators.required],
      wereda: ['', Validators.required],
      houseNo: ['', Validators.required],
      fullName: ['', Validators.required],
      phoneNumber: ['', Validators.required]
    }, {
      validator: Validators.compose([PhoneNumberValidation.Validate])
    });
  }

  onDone() {
    console.log(this.addressForm);
    if (this.addressForm.valid) {
      this.next.emit();
      console.log('Next');
    } else {
      this.markFormGroupTouched(this.addressForm);
      console.log('Address Form is not valid');
    }
  }

  onBack() {
    this.back.emit();
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
