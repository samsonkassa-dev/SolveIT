import { FormGroup } from '@angular/forms';

export class RePasswordValidator {
    static validate(form: FormGroup) {
        let password = form.controls.password.value;
        let rePassword = form.controls.rePassword.value;

        console.log("password ", password, "re-Password ", rePassword)

        if (rePassword.length <= 0) {
            return null;
        }

        if (rePassword !== password) {
            return { match: true }
        }

        return null;
    }
}