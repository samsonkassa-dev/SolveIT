import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from '@angular/router';
import { CompetitionService } from '../competition.service';

@Component({
    selector: 'app-competition-projects',
    templateUrl: './competitionProjects.component.html',
    styleUrls: ['competitionProjects.component.css']
})

export class CompetitionProjectsComponent implements OnInit {

    public competitionId: any;

    constructor(public route: ActivatedRoute, public router: Router, public service: CompetitionService) {

    }

    ngOnInit() {
        this.competitionId = this.route.snapshot.paramMap.get('competitionId');
        this.getProjects();
    }

    getProjects() {
        this.service.getProjects(this.competitionId);
    }

    viewProject(project) {
        //navigate to project detail
        this.router.navigate(['/my-projects/', project.id]);
    }
}