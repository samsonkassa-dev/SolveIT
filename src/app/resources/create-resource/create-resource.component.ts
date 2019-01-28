import { Component, OnInit } from '@angular/core';
import {ResourcesService} from '../service/resources.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {FileItem, FileUploader, ParsedResponseHeaders} from 'ng2-file-upload';
import {Resource} from '../models/resource';
import {configs} from '../../app.config';
import {Router} from '@angular/router';
import { SharedService } from '../../shared/services/shared.service';
import {ForumService} from '../../forum/forum.service';

@Component({
  selector: 'app-create-resource',
  templateUrl: './create-resource.component.html',
  styleUrls: ['./create-resource.component.css']
})
export class CreateResourceComponent implements OnInit {

  public URL =  `${configs.rootUrl}storages/resources/upload`;
  public uploader: FileUploader = new FileUploader({url: this.URL});
  public resourceForm: FormGroup;
  public progress = 0;
  public isUploading = false;
  public isFileSelected = false;
  public categories = [];
  public resource: Resource = {
    title: '',
    type: '',
    content: {},
    url: '',
    category: '',
    description: ''
  };

  constructor(public resourceService: ResourcesService, public router: Router,
              public sharedService: SharedService, public service: ForumService) { }

  ngOnInit() {
    this.resourceForm = new FormGroup({
      type: new FormControl('', Validators.required),
      url: new FormControl(''),
      title: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
    });

    this.service.getCategories()
      .subscribe (res => {
        this.categories = res;
      });
  }

  isResourceFormValid() {
    if (this.resourceForm.valid && /** this.resource.categories.length >  0 && **/  this.resource.type !== '') {
      return this.resource.url !== '' || this.isFileSelected;
    }
    return false;
  }

  handleFileSelection($event) {
    this.isFileSelected = true;
    console.log($event);
  }

  onCreateResource() {
    if (this.isResourceFormValid()) {
      this.isUploading = true;
      if (this.resource.type !== 'video') {
        this.uploader.queue[0].upload();
        this.uploader.onSuccessItem = (item: FileItem, response: string, status: number, headers: ParsedResponseHeaders) => {
          console.log(JSON.parse(response).result.files.file[0]);
          this.resource.content = JSON.parse(response).result.files.file[0];
          this.resource.createdAt = new Date();
          this.resourceService.createResource(this.resource)
            .subscribe(res => {
              this.router.navigate(['resources']);
              this.sharedService.addToast('Success', 'New Resource Added!', 'success');
              this.isUploading = false;
            },
            err => {
              if (err.status = 422) {
                this.sharedService.addToast('', 'Error occured!', 'error');
                this.isUploading = false;
              }
            });
          this.uploader.queue.pop();
        };
        this.uploader.onProgressItem = (fileItem: FileItem, progress: any) => {
          console.log('progress => ', progress);
          this.progress = progress;
        };
        this.uploader.onCancelItem = (item: FileItem, response: string, status: number, headers: ParsedResponseHeaders) => {
          console.log('Canceled');
          this.isUploading = false;
          this.uploader.queue.pop();
        };
        this.uploader.onErrorItem = (item: FileItem, response: string, status: number, headers: ParsedResponseHeaders) => {
          console.log('error');
          this.isUploading = false;
          this.uploader.queue.pop();
        };
      } else {
        this.resource.createdAt = new Date();
        this.resourceService.createResource(this.resource)
          .subscribe(res => {
            this.router.navigate(['resources']);
            this.sharedService.addToast('Success', 'New Resource Added!', 'success');
            this.isUploading = false;
          },
          err => {
            if (err.status = 422) {
              this.sharedService.addToast('', 'Error occured!', 'error');
              this.isUploading = false;
            }
          });
      }
    } else {
      this.markFormGroupTouched(this.resourceForm);
    }
  }

  /**
   * Marks all controls in a form group as touched
   * @param formGroup - The form group to touch
   */
  private markFormGroupTouched(formGroup: any) {
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }

}