import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CompetitionService } from "../competition.service";

@Component({
    selector: 'app-competition-view',
    templateUrl: './competitionView.component.html',
    styleUrls: ['competitionView.component.css']
})

export class CompetitionViewComponent implements OnInit{

    private projects = [];
    private projectsBackup = [];
    private keyword = '';
    private competitionId: any;

    constructor(private service: CompetitionService, private route: ActivatedRoute, private router: Router) {
        
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

}