import {AbstractControl} from '@angular/forms';

export class PhoneNumberValidation {
  static Validate(AC: AbstractControl) {
    let phoneNumber = AC.get('phoneNumber').value;
    let isOnlyNumbers = /^\d+$/.test(phoneNumber);
    if ( !isOnlyNumbers || phoneNumber.length > 0 && phoneNumber.length !== 9 || !phoneNumber.startsWith('9')) {
      console.log('valid phoneNumber ', false);
      AC.get('phoneNumber').setErrors({incorrect: true});
    } else {
      console.log('valid phoneNumber ', true);
      return null;
    }
  }
}
