import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CompetitionService } from "../competition.service";

@Component({
    selector: 'app-competition-view',
    templateUrl: './competitionView.component.html',
    styleUrls: ['competitionView.component.css']
})

export class CompetitionViewComponent implements OnInit{

    public projects = [];
    public projectsBackup = [];
    public keyword = '';
    public competitionId: any;
    public views = [
        'competition-list',
        'create-competition'
    ];
    public selected = this.views[0];
    
    constructor(public service: CompetitionService, public route: ActivatedRoute, public router: Router) {
        
    }

    ngOnInit() {
        this.competitionId = this.route.snapshot.paramMap.get("id");
        if (this.competitionId) {
            this.getProjects();   
        }
    }

    getProjects() {
        this.service.getProjects(this.competitionId).subscribe(
            res => {
                this.projects = res;
                this.projectsBackup = res;
            }
        )
    }

    searchProject() {
        if (this.keyword !== '') {
            this.projects = this.projectsBackup.filter(item => item.title.includes(this.keyword));
          } else {
            this.projects = this.projectsBackup;
          }
    }

    toggleView(viewName: string) {
        this.selected = viewName;
    }

    debug() {
        console.log('getting emitted event');
    }

}