import {Component, Input, OnInit} from '@angular/core';
import {Resource} from '../models/resource';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Input() resource: Resource;
  public isClose = false;

  constructor(public sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.isClose = false;
  }

  getUrl() {
    if (this.resource) {
      if (!this.isClose) {
        const tempUrl = this.resource.url.slice(this.resource.url.indexOf('?v=') + 3, this.resource.url.length) + '?control=1';
        console.log(tempUrl);
        return  tempUrl;

      } else {
        this.isClose = false;
        return '';
      }
    }
    return '';
  }

  resetResource() {
    this.isClose = true;
    console.log(this.isClose);
  }

}
