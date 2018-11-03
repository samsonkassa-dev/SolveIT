import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ProjectService } from '../project.service';
import { CompetitionService } from '../../competition/competition.service';
import {ApiService} from '../../shared/services/api.service';

declare var $: any;

@Component({
    selector: 'app-project-view',
    templateUrl: 'projectView.component.html',
    styleUrls: ['projectView.component.css']
})

export class ProjectViewComponent implements OnInit {
  public views = [
    'report',
    'members',
    'add-member',
  ];
  public selected = this.views[0];
  public uploadReport = false;
  public project: any = null;
  public progressReports: any = [];
  public selectedProgressReport = null;
  public isEnrolled = false;

  // for joining cometition
  public activeCompetitions = [];
  private isJoinCompetitionSuccessfull = null;

  constructor(public route: ActivatedRoute, public router: Router, public service: ProjectService,
              public competitionService: CompetitionService, public apiService: ApiService) {

  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.getProject(id);
    this.competitionService.getCompetitions()
      .subscribe(res => {
        this.activeCompetitions = res;
      }, error => {
        console.log('Error while fetching competition ,', error);
      });
  }

  toggleView(view) {
    this.selected = view;
  }

  getProject(projectId) {
    this.service.getProject(projectId).subscribe(
      res => {
        this.project = res;
        this.getProgressReports();
        this.isProjectRegisteredToCompetition();
      }
    );
  }

  public getProgressReports() {
    this.service.getAllProgressReport(this.project.id)
      .subscribe(res1 => {
        this.progressReports = res1;
        console.log(res1);
      });
  }

  addProjectMember() {
    const member = {
      projectId: this.project.id,
      userId: 0
    };
    this.service.addProjectMember(member).subscribe(
      res => {
        console.log(res);
      }
    );
  }

  toggleUploadReport(value) {
    this.uploadReport = value;
  }

  downloadProposal(content) {
    this.service.downloadProposal(content)
      .subscribe(res => {
        console.log(res);
        const url = window.URL.createObjectURL(res.data);
        const a = document.createElement('a');
        document.body.appendChild(a);
        a.setAttribute('style', 'display: none');
        a.href = url;
        a.download = res.fileName;
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove(); // remove the element
      }, error => {
        console.log('error', error);
      });
  }

  reportCreated() {
    this.uploadReport = false;
    this.getProgressReports();
  }

  onJoinCompetition($event) {
    this.service.joinCompetition(this.project, $event.data)
      .subscribe(res => {
        this.isJoinCompetitionSuccessfull = true;
      }, error => {
        this.isJoinCompetitionSuccessfull = false;
      });
  }

  viewProgressReport(report) {
    this.selectedProgressReport = report;
    console.log(this.selectedProgressReport);
  }

  back() {
    this.selectedProgressReport = null;
  }

  isProjectRegisteredToCompetition() {
    this.service.getProjectCompetitions(this.project.id)
      .subscribe(res => {
        if (res.length == 0) {
          this.isEnrolled = false;
        } else {
          this.isEnrolled = true;
        }
      });
  }

  onProjectUpdated() {
    $('#createProjectModal').modal('hide');
  }

}
