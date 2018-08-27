import { Component, OnInit } from '@angular/core';
import {ResourcesService} from '../service/resources.service';
import {Resource} from '../models/resource';
import {Router} from '@angular/router';

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

  constructor(public resourceService: ResourcesService, public router: Router) { }

  ngOnInit() {
    this.resourceService.getResources()
      .subscribe(res => {
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
}
