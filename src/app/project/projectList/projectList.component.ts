import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from "@angular/core";
import { ProjectService } from "../project.service";
import { Router } from "@angular/router";
import { AuthService } from "../../Auth/services/auth.service";

@Component({
  selector: "app-project-list",
  templateUrl: "projectList.component.html",
  styleUrls: ["projectList.component.css"]
})
export class ProjectListComponent implements OnInit, OnChanges {
  @Output() create = new EventEmitter();
  @Input() projects = [];
  @Input() isEnrolled = [];

  public p = 1;

  constructor(
    public service: ProjectService,
    public router: Router,
    public authService: AuthService
  ) {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    this.projects = changes.projects.currentValue;
  }

  viewProject(project) {
    this.router.navigate(["/my-projects/", project.id]);
  }

  onCreateProject() {
    this.create.emit();
  }
}
