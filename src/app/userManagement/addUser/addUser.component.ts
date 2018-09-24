import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';
import { AuthService } from '../../Auth/services/auth.service';
import { SharedService } from '../../shared/services/shared.service';
import {PasswordValidation} from '../../Auth/validator/passwordValidation';
import {PhoneNumberValidation} from '../../Auth/validator/phoneNumberValidation';

@Component({
    selector: 'app-add-user',
    templateUrl: 'addUser.component.html',
    styleUrls: ['addUser.component.css']
})

export class AddUserComponent implements OnInit{

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


    constructor(public service: AuthService, public sharedService: SharedService, public formBuilder: FormBuilder) {
    }

  ngOnInit() {
      this.userForm = this.formBuilder.group({
        firstName: ['', Validators.required],
        middleName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', Validators.required],
        phoneNumber: ['', Validators.required],
        role: ['', Validators.required],
        password: ['', Validators.required],
        rePassword: ['', Validators.required]
      }, {
        validator: Validators.compose([PasswordValidation.MatchPassword, PhoneNumberValidation.Validate])
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
