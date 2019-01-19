import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CompetitionService } from "../competition.service";
import { CityService } from '../../dashboard/city/city.service';

@Component({
  selector: "app-competition-projects",
  templateUrl: "./competitionProjects.component.html",
  styleUrls: ["competitionProjects.component.css"]
})
export class CompetitionProjectsComponent implements OnInit {
  @Input() competition = null;
  public isEdit = false;
  public projects = [];
  public backupProjects = [];
  public keyword = '';
  public page = 1;
  public cities = [];
  selectedCity = '';

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public service: CompetitionService,
    public cityService: CityService
  ) {}

  ngOnInit() {
    this.getProjects();
    this.getCities();
  }

  getProjects() {
    this.service.getProjects(this.competition.id).subscribe(res => {
      this.projects = res;
      this.backupProjects = res;
    });
  }

  getCities() {
    this.cityService.getCities()
      .subscribe(res => {
        this.cities = res;
      }, error => {
        console.log('Error while fetching cities');
      });
  }

  viewProject(project) {
    // navigate to project detail
    this.router.navigate(["/my-projects/", project.id]);
  }

  searchProject($event) {
    if (this.keyword !== "") {
      this.projects = this.backupProjects.filter(item => {
        return item.title.toUpperCase().includes(this.keyword.toUpperCase());
      });
    } else {
      this.projects = this.backupProjects;
    }
  }

  filterByCity() {
    if (this.selectedCity !== '') {
      this.projects = this.backupProjects.filter(project => {
        console.log(this.selectedCity, project.cities);
        return project.cities.indexOf(this.selectedCity) !== -1;
      });
    } else {
      this.projects = this.backupProjects;
    }
  }

}
