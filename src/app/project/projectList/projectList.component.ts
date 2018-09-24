import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { ProjectService } from '../project.service';
import { Router } from '@angular/router';
import { AuthService } from '../../Auth/services/auth.service';

@Component({
    selector: 'app-project-list',
    templateUrl: 'projectList.component.html',
    styleUrls: ['projectList.component.css']
})

export class ProjectListComponent implements OnInit {

  @Output() create = new EventEmitter();

  public projects = [];
  public p = 1;

  constructor(public service: ProjectService, public router: Router, public authService: AuthService) {
  }

  ngOnInit() {
      this.getProjectList();
  }

  getProjectList() {
    this.authService.getUserInfo()
        .subscribe(res => {
            this.service.getMyProjects(res.id).subscribe(
                res => {
                    this.projects = res;
                }
            ); 
        });
  }

  viewProject(project) {
      this.router.navigate(['/projects/', project.id]);
  }

  onCreateProject() {
    this.create.emit();
  }
}