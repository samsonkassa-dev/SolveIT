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

    public user = {};
    public selected = 'participant';
    public userForm: FormGroup;
    public roles = [
        'solve-it-mgt',
        'solve-it-team',
        'solve-it-participants',
    ];
    public role = this.roles[0];
    @Output() back = new EventEmitter();
    @Output() created = new EventEmitter();


    constructor(public service: AuthService, public sharedService: SharedService) {
        this.userForm = new FormGroup({
            firstName: new FormControl('', Validators.required),
            middleName: new FormControl('', Validators.required),
            lastName: new FormControl('', Validators.required),
            email: new FormControl('', Validators.required),
            phoneNumber: new FormControl('', Validators.required),
            role: new FormControl('', Validators.required),
            password: new FormControl('', Validators.required),
            rePassword: new FormControl('', Validators.required)
        });
    }

    addUser() {
        this.service.addUser(this.user, this.role)
            .subscribe(res => {
                this.sharedService.addToast('Success', 'New User Added!.', 'success');
                this.showUsersList();
            }, err => {
                this.sharedService.addToast('', 'Error occured!', 'error');
            });
    }

    toggleView(view) {
        this.selected = view;
    }

    showUsersList() {
        this.created.emit();
    }

    backToList() {
      this.back.emit();
      console.log('emmited');
    }
}
