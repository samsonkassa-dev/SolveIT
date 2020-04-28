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
import { FacebookService } from "ngx-facebook";

declare var $: any;
declare var window: any;

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
  currentUser: any;
  constructor(
    public service: ProjectService,
    public router: Router,
    public authService: AuthService,
    public fb: FacebookService
  ) {}

  ngOnInit() {
    this.currentUser = this.authService.getUserSession().user;
    window.FB.XFBML.parse();
    $("#likeUsOnFB").modal("show");
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.projects = changes.projects.currentValue;
  }

  viewProject(project) {
    console.log(this.currentUser.is_waiting);
    if (this.currentUser.is_waiting) {
      $("#registrationClosed").modal("show");
    } else {
      this.router.navigate(["/my-projects/", project.id]);
    }
  }

  onCreateProject() {
    if (this.currentUser.is_waiting) {
      $("#registrationClosed").modal("show");
    } else {
      this.create.emit();
    }
  }
}
