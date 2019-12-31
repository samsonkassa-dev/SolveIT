import { configs } from './../../app.config';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FileUploader, ParsedResponseHeaders, FileItem } from 'ng2-file-upload';
import { AuthService } from './../../Auth/services/auth.service';
import { SharedService } from './../../shared/services/shared.service';
import { Router } from '@angular/router';
import { CompetitionService } from './../competition.service';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-competition-create-project',
  templateUrl: './competition-create-project.component.html',
  styleUrls: ['./competition-create-project.component.css']
})
export class CompetitionCreateProjectComponent implements OnInit {
  public projectForm: FormGroup;
  public URL = `${configs.rootUrl}storages/proposals/upload`;
  public uploader: FileUploader = new FileUploader({ url: this.URL });
  public progress = 0;
  public isUploading = false;
  public isFileSelected = false;
  public error = false;
  public submitted = false;

  @Output() created = new EventEmitter();
  @Input() isEdit = false;
  @Input() project: any = {};

  constructor(
    public service: CompetitionService,
    public router: Router,
    public sharedService: SharedService,
    public authService: AuthService
  ) {
    this.projectForm = new FormGroup({
      title: new FormControl("", Validators.required),
      description: new FormControl("", Validators.required)
    });
  }

  createProject() {
    //console.log("Create Called")
    if (this.projectForm.valid) {
      //console.log("Project Valid")
      if (this.isFileSelected) {
        //console.log('File Selected')
        this.isUploading = true;
        this.error = false;
        this.uploader.queue[0].upload();
        this.uploader.onSuccessItem = (
          item: FileItem,
          response: string,
          status: number,
          headers: ParsedResponseHeaders
        ) => {
          this.project.proposal = JSON.parse(response).result.files.file[0];
          this.project.createdAt = new Date();
          this.uploader.queue.pop();
        };
        this.uploader.onProgressItem = (fileItem: FileItem, progress: any) => {
          this.progress = progress;
        };
        this.uploader.onCancelItem = (
          item: FileItem,
          response: string,
          status: number,
          headers: ParsedResponseHeaders
        ) => {
          this.isUploading = false;
          this.uploader.queue.pop();
        };
        this.uploader.onErrorItem = (
          item: FileItem,
          response: string,
          status: number,
          headers: ParsedResponseHeaders
        ) => {
          this.error = true;
          this.isUploading = false;
          this.uploader.queue.pop();
        };
      }
      this.createProjectService(this.project)

    } else {
      this.markFormGroupTouched(this.projectForm);
    }
  }

  createProjectService(project){
    this.service.createProject(project).subscribe(
      res => {
        const userId = this.authService.getUserId();
        if (userId) {
          this.service
            .addProjectMember({ projectId: res.id, userId: userId })
            .subscribe(res1 => {
              this.isUploading = false;
              this.sharedService.addToast(
                "Success",
                "Project Created!",
                "success"
              );
              this.created.emit();
            });
        }
      },
      err => {
        if ((err.status = 422)) {
          this.sharedService.addToast("", "Error occurred!", "error");
          this.isUploading = false;
        }
      }
    );
  }


  onFormSubmit() {

      this.submitted = true;
      this.createProject();
    
  }

  
  handleFileSelection($event) {
    this.isFileSelected = true;
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

  reset() {
    this.submitted = false;
    if (!this.isEdit) {
      this.project = {};
      this.projectForm.reset();
    }
  }
  ngOnInit() {
  }

}
