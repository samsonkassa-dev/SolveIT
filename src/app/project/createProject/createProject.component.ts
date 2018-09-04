import {Component, EventEmitter, Output} from '@angular/core';
import {FileItem, FileUploader, ParsedResponseHeaders} from 'ng2-file-upload';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProjectService } from '../project.service';
import {configs} from '../../app.config';
import {Router} from '@angular/router';
import { SharedService } from '../../shared/services/shared.service';

@Component({
    selector: 'app-project-create',
    templateUrl: 'createProject.component.html',
    styleUrls: ['createProject.component.css']
})

export class CreateProjectComponent {

  private project: any = {};
  public projectForm: FormGroup;
  public URL =  `${configs.rootUrl}storages/proposals/upload`;
  public uploader: FileUploader = new FileUploader({url: this.URL});
  public progress = 0;
  public isUploading = false;
  public isFileSelected = false;
  public error = false;
  @Output() created = new EventEmitter();

  constructor(private service: ProjectService, public router: Router, private sharedService: SharedService) {
      this.projectForm = new FormGroup({
          title: new FormControl('', Validators.required),
          description: new FormControl('', Validators.required)
      });
  }

  createProject() {
    this.error = false;
    this.isUploading = true;
    this.uploader.queue[0].upload();
    this.uploader.onSuccessItem = (item: FileItem, response: string, status: number, headers: ParsedResponseHeaders) => {
      console.log(JSON.parse(response).result.files.file[0]);
      this.project.proposal = JSON.parse(response).result.files.file[0];
      this.service.createProject(this.project).subscribe(
        res => {
          this.sharedService.addToast("Success", "Project Created!.", 'success');
          this.isUploading = false;
          this.toggleProjectsList()
        },
        err => {
          if (err.status = 422) {
            this.sharedService.addToast("", "Error occured!", 'error');
          }
        }
      );
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
      this.error = true;
      this.isUploading = false;
      this.uploader.queue.pop();
    };
  }

  handleFileSelection($event) {
    this.isFileSelected = true;
  }

  toggleProjectsList() {
    this.created.emit();
  }

}
