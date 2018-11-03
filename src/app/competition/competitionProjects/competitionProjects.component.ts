import {Component, Input, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompetitionService } from '../competition.service';

@Component({
    selector: 'app-competition-projects',
    templateUrl: './competitionProjects.component.html',
    styleUrls: ['competitionProjects.component.css']
})

export class CompetitionProjectsComponent implements OnInit {

    @Input() competition = null;
    public isEdit = false;
    public projects = [];
    public backupProjects = [];
    public keyword = '';
    public page = 1;

    constructor(public route: ActivatedRoute, public router: Router, public service: CompetitionService) {

    }

    ngOnInit() {
      this.getProjects();
    }

    getProjects() {
        this.service.getProjects(this.competition.id).subscribe(
            res => {
                this.projects = res;
                this.backupProjects = res;
            }
        );
    }

    viewProject(project) {
        // navigate to project detail
        this.router.navigate(['/my-projects/', project.id]);
    }

    searchProject() {
        if (this.keyword !== '') {
            this.projects = this.backupProjects.filter(item => {
              return item.title.includes(this.keyword) ;
            });
        } else {
          this.projects = this.backupProjects;
        }
    }
}
