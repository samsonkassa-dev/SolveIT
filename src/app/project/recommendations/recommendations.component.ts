import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Auth/services/auth.service';
import { ProjectService } from '../project.service';
import { Router } from '@angular/router';
import { StarRatingComponent } from 'ng-starrating';

@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.css']
})
export class RecommendationsComponent implements OnInit {

  public selected = 'projects';
  public people = [{name: 'projects', id: 0}, {name: 'asfa', id: 1}];
  public productTypes = [];
  public selectedProductType = this.productTypes[0];
  public sectors = [];
  public selectedSector = this.sectors[0];
  public allProjects = [];
  public allProjectsBackup = [];
  public topRatedProjects = [];
  public mostViewedProjects = [];
  public recommendedProjects = [];
  public bookmarks = [];
  public keyword = '';
  public page = 1;

  constructor(public authService: AuthService, public service: ProjectService, public router: Router) { }

  ngOnInit() {
    this.getProjects();
    this.getMostViewedProjects();
    this.getRecommendedProjects();
    this.getTopRatedProjects();
    this.getProductTypes();
    this.getSectors();
  }

  toggleView(view) {
    this.selected = view;
    if (this.selected == 'bookmarks') {
      this.getBookmarkedProjects();
    }
  }

  navigateToProjectDetail(project) {
    this.router.navigate(["/my-projects/investor-view/", project.id]);
    // this.router.navigate(["/my-projects/", project.id]);
  }

  unique(arr, prop) {
      return arr.map(function(e) { return e[prop]; }).filter(function(e,i,a){
          return i === a.indexOf(e);
      });
  }

  getProjects() {
    this.service.getCompetitionAllProjects().subscribe(res1 => {
      this.allProjects = res1;
      this.allProjectsBackup = res1;
    });
  }

  bookmark(project) {
    let bookmarkObject = {projectId: project.id, userId: this.authService.getUserId()};
    this.service.bookmarkProject(bookmarkObject).subscribe(res => {
      this.bookmarks.push({id: res.id, userId: this.authService.getUserId(), projectId: project.id, solveitproject: project});
    });
  }

  removeBookmark(bookmarkId) {
    this.service.removeBookmark(bookmarkId).subscribe(res => {
      // remove from list
    });
  }

  getBookmarkedProjects() {
    let userId = this.authService.getUserId();
    this.service.getBookmarkedProjects().subscribe(res => {
      this.bookmarks = res;
    });
  }

  getTopRatedProjects() {
    this.service.getTopRatedProjects().subscribe(res => {
      this.topRatedProjects = res;
    });
  }

  getMostViewedProjects() {
    this.service.getMostViewedProjects().subscribe(res => {
      this.mostViewedProjects = res;
    });
  }

  getRecommendedProjects() {
    this.service.getRecommendedProjects().subscribe(res => {
      this.recommendedProjects = res;
    });
  }

  getProductTypes() {
    this.service.getProductTypes().subscribe(res => {
      this.productTypes = res;
    });
  }

  getSectors() {
    this.service.getSectors().subscribe(res => {
      this.sectors = res;
    })
  }

  search() {
    // if (this.keyword == '') {
    //   this.allProjects = this.allProjectsBackup;
    // } else {
    //   this.allProjects = this.allProjectsBackup.filter(item => {
    //     return item.solveitproject.title.indexOf(this.keyword) > -1;
    //   })
    // }
    //console.log(this.keyword);
  }

  addSectorView($event) {
    let viewObject = {userId: this.authService.getUserId(), sectorId: $event.id};
    this.allProjects = this.allProjectsBackup.filter(item => {
      return item.questionnaireAnswers.innovationInfo.sector == $event.sector;
    })
    this.service.addSectorView(viewObject).subscribe(res => {
      //console.log('view registered!');
    })
  }

  addProductTypeView($event) {
    let viewObject = {productTypeId: $event.id, userId: this.authService.getUserId()};
    this.allProjects = this.allProjectsBackup.filter(item => {
      return item.questionnaireAnswers.innovationInfo.productType == $event.productType;
    })
    this.service.addProductTypeView(viewObject).subscribe(res => {
      //console.log('view registered!');
    })
  }

}
