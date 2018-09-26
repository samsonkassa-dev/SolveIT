import { Component, OnInit } from '@angular/core';
import {ResourcesService} from '../service/resources.service';
import {Resource} from '../models/resource';
import {Router} from '@angular/router';
import {configs} from '../../app.config';
import {SolveitTeamGuardService} from '../../Auth/services/solveit-team-guard.service';
import {AuthService} from '../../Auth/services/auth.service';

@Component({
  selector: 'app-resources-list',
  templateUrl: './resources-list.component.html',
  styleUrls: ['./resources-list.component.css'],
})
export class ResourcesListComponent implements OnInit {

  public resources: Resource[] = [];
  public doc_resources: Resource[] = [];
  public vid_resources: Resource[] = [];
  public filterCategory = '';
  public keyword = '';
  public downloadLink = configs.rootUrl + 'storages/resources/download/';
  public choosenResource: Resource = null;
  docResourcePage = 1;
  vidResourcePage = 1;
  p =1;
  collections = [1,2];

  constructor(public resourceService: ResourcesService, public router: Router, public authService: AuthService) { }

  ngOnInit() {
    this.resourceService.getResources()
      .subscribe(res => {
        console.log('resoruce list ', res);
        this.resources = res;
        res.filter(item => {
          if (item.type === 'document') {
            this.doc_resources.push(item);
          } else if (item.type === 'video') {
            this.vid_resources.push(item);
          }
        });

        console.log(res);
      }, err => {
        console.log('error while fetching resource', err);
      });
  }

  uploadResource() {
    this.router.navigate(['upload-resource']);
  }

  filterResource($event) {
    if (this.filterCategory !== '') {
      this.vid_resources = this.vid_resources.filter(item => item.categories.indexOf(this.filterCategory) !== -1);
      this.doc_resources = this.doc_resources.filter(item => item.categories.indexOf(this.filterCategory) !== -1);
    } else {
      this.vid_resources = this.resources.filter(item => item.type === 'video');
      this.doc_resources = this.resources.filter(item => item.type === 'document');
    }
  }

  onSearch($event) {
    if (this.keyword !== '') {
      this.vid_resources = this.vid_resources.filter(item => item.title.includes(this.keyword));
      this.doc_resources = this.doc_resources.filter(item => item.title.includes(this.keyword));
    } else {
      this.vid_resources = this.resources.filter(item => item.type === 'video');
      this.doc_resources = this.resources.filter(item => item.type === 'document');
    }
  }

  downloadResource(content) {
    this.resourceService.downloadResource(content.name)
      .subscribe(res => {
        console.log(res);
        const url = window.URL.createObjectURL(res.data);
        let a = document.createElement('a');
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

  onChoosingVideoResource(resource: Resource) {
    this.choosenResource = resource;
  }

}
