import { SharedService } from "./../../shared/services/shared.service";
import { configs } from "./../../app.config";
import { FileUploader } from "ng2-file-upload";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CompetitionService } from "../competition.service";
import { CityService } from "../../dashboard/city/city.service";
import { NgxSpinnerService } from "ngx-spinner";
import { AuthService } from "../../Auth/services/auth.service";
import { UserManagementService } from "../../userManagement/userManagament.service";
import { fromPromise } from "rxjs/observable/fromPromise";
declare var $: any;
@Component({
  selector: "app-competition-projects",
  templateUrl: "./competitionProjects.component.html",
  styleUrls: ["competitionProjects.component.css"]
})
export class CompetitionProjectsComponent implements OnInit {
  public projectForm: FormGroup;
  public URL = `${configs.rootUrl}storages/proposals/upload`;
  public uploader: FileUploader = new FileUploader({ url: this.URL });
  public progress = 0;
  public isUploading = false;
  public isFileSelected = false;
  public error = false;
  public submitted = false;
  @Input() competition = null;
  competitionId = "";
  public isEdit = false;
  public projects = [];
  public backupProjects = [];
  public keyword = "";
  public page = 1;
  public cities = [];
  selectedCity = "";
  selectedProject = null;
  constructor(
    private spinner: NgxSpinnerService,
    public route: ActivatedRoute,
    public router: Router,
    public service: CompetitionService,
    public cityService: CityService,
    public authService: AuthService,
    public userService: UserManagementService,
    public sharedService: SharedService
  ) {
    this.projectForm = new FormGroup({
      title: new FormControl("", Validators.required),
      description: new FormControl("", Validators.required)
    });
  }

  ngOnInit() {
    this.getProjects();
    this.getCompetition();
    window.localStorage.setItem(
      "competitionId",
      this.route.snapshot.params["id"]
    );
    // this.getCities();
  }
  projectCreated() {
    this.getProjects();
    $("#createProjectModal").modal("hide");
  }
  getCompetition() {
    this.service.getCompetition(this.route.snapshot.params["id"]).subscribe(
      res => {
        this.competition = res;
      },
      error => {
        this.router.navigate(["404"]);
      }
    );
  }

  getProjects() {
    this.competitionId = this.route.snapshot.params["id"];
    const user = this.authService.getUserSession();
    if (user.role === "solve-it-team") {
      this.spinner.show();
      this.userService.getAssignedCities(user.userId).subscribe(
        res => {
          const assignedCities = !res.error ? res : { cities: [] };
          const competitionProjects = this.service.getProjects(
            this.competitionId
          );
          const cities = this.cityService.getCities();
          fromPromise(Promise.all([competitionProjects, cities])).subscribe(
            responses => {
              console.log(responses);
              responses[1].subscribe(citiesResponse => {
                this.cities = citiesResponse.filter(
                  city => assignedCities.cities.indexOf(city.id) !== -1
                );
                responses[0].subscribe(projects => {
                  let temp = [];
                  this.backupProjects = projects.filter(
                    project => project.solveitproject
                  );
                  this.backupProjects.forEach(project => {
                    this.cities.forEach(city => {
                      if (project.cities.indexOf(city.id) !== -1) {
                        temp.push(project);
                      }
                    });
                  });
                  this.backupProjects = temp;
                  this.projects = this.backupProjects;
                  this.spinner.hide();
                });
              });
            },
            error => {
              this.spinner.hide();
            }
          );
        },
        err => {
          this.spinner.hide();
        }
      );
    } else {
      this.spinner.show();
      this.getCities();
      this.service.getProjects(this.competitionId).subscribe(
        res => {
          this.backupProjects = res.filter(project => project.solveitproject);
          this.projects = this.backupProjects;
          console.log(this.projects);
          this.spinner.hide();
        },
        error => {
          this.spinner.hide();
        }
      );
    }
  }
  deleteCompetitionProject() {
    console.log(this.selectedProject);
    this.service
      .deleteCompetitionProject(this.selectedProject)
      .subscribe(res => {
        this.ngOnInit();
        this.sharedService.addToast(
          "Success",
          "Successfully removed project from competition",
          "success"
        );
      });
  }

  selectProject(project) {
    this.selectedProject = project;
  }
  getCities() {
    this.cityService.getCities().subscribe(
      res => {
        this.cities = res;
      },
      error => {
        //console.log("Error while fetching cities");
      }
    );
  }

  viewProject(project) {
    // navigate to project detail
    this.router.navigate(["/my-projects/", project.id]);
  }

  searchProject($event) {
    if (this.keyword !== "") {
      this.projects = this.backupProjects.filter(item => {
        return item.solveitproject.title
          .toUpperCase()
          .includes(this.keyword.toUpperCase());
      });
    } else {
      this.projects = this.backupProjects;
    }
  }

  filterByCity() {
    if (this.selectedCity !== "") {
      localStorage.setItem("cityId", this.selectedCity);
      console.log("City Id " + this.selectedCity);
      this.projects = this.backupProjects.filter(project => {
        console.log(project);
        return project.cities.indexOf(this.selectedCity) !== -1;
      });
    } else {
      this.projects = this.backupProjects;
    }
  }
}
