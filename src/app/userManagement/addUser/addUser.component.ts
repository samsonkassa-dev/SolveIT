import {Component, EventEmitter, Output} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import { AuthService } from '../../Auth/services/auth.service';
import { SharedService } from '../../shared/services/shared.service';

@Component({
    selector: 'app-add-user',
    templateUrl: 'addUser.component.html',
    styleUrls: ['addUser.component.css']
})

export class AddUserComponent {

    private user = {};
    private selected = 'participant';
    private userForm: FormGroup;
    @Output() back = new EventEmitter();

    constructor(private service: AuthService, private sharedService: SharedService) {
        this.userForm = new FormGroup({
            firstName: new FormControl('', Validators.required),
            middleName: new FormControl('', Validators.required),
            lastName: new FormControl('', Validators.required),
            email: new FormControl('', Validators.required),
            phoneNumber: new FormControl('', Validators.required),
            password: new FormControl('', Validators.required),
            rePassword: new FormControl('', Validators.required)
        });
    }

    addUser() {
        this.service.register(this.user)
        .subscribe(res => {
            this.sharedService.addToast('Success', 'New User Added!.', 'success');
        },
		err => {
			if (err.status = 422) {
				this.sharedService.addToast('', 'Error occured!', 'error');
			}
        });
    }

    toggleView(view) {
        this.selected = view;
    }

    backToList() {
      this.back.emit();
      console.log('emmited');
    }
}
