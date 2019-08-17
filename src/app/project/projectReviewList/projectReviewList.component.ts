import { Component, OnInit, Input } from '@angular/core';
import { ProjectService } from '../project.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../Auth/services/auth.service';
import { SharedService } from '../../shared/services/shared.service';

@Component({
    selector: 'app-review-list',
    templateUrl: './projectReviewList.component.html',
    styleUrls: ['./projectReviewList.component.css']
})

export class ProjectReviewListComponent implements OnInit {

    @Input() reviews = [];
    public page = 1;

    constructor(public service: ProjectService, public authService: AuthService, public sharedService: SharedService) {

    }

    ngOnInit() {

    }

}