import {Component, EventEmitter, Output} from '@angular/core';
import {FileItem, FileUploader, ParsedResponseHeaders} from 'ng2-file-upload';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProjectService } from '../project.service';
import {configs} from '../../app.config';
import {Router} from '@angular/router';
import { SharedService } from '../../shared/services/shared.service';
import { AuthService } from '../../Auth/services/auth.service';

@Component({
    selector: 'app-project-create',
    templateUrl: 'createProject.component.html',
    styleUrls: ['createProject.component.css']
})

export class CreateProjectComponent {

  public project: any = {};
  public projectForm: FormGroup;
  public URL =  `${configs.rootUrl}storages/proposals/upload`;
  public uploader: FileUploader = new FileUploader({url: this.URL});
  public progress = 0;
  public isUploading = false;
  public isFileSelected = false;
  public error = false;
  @Output() created = new EventEmitter();

  constructor(public service: ProjectService, public router: Router, public sharedService: SharedService, public authService: AuthService) {
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
      this.project.proposal = JSON.parse(response).result.files.file[0];
      this.service.createProject(this.project).subscribe(
        res => {
          this.sharedService.addToast('Success', 'Project Created!.', 'success');
          const userId = this.authService.getUserId();
          if (userId) {
            this.service.addProjectMember({projectId: res.id, userId: userId})
              .subscribe(res1 => {
                console.log('project added successfully');
                this.isUploading = false;
                this.toggleProjectsList();
              });
          }
        },
        err => {
          if (err.status = 422) {
            this.sharedService.addToast('', 'Error occurred!', 'error');
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
