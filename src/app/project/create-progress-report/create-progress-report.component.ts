import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {configs} from '../../app.config';
import {FileItem, FileUploader, ParsedResponseHeaders} from 'ng2-file-upload';
import {ProjectService} from '../project.service';
import {SharedService} from '../../shared/services/shared.service';

@Component({
  selector: 'app-create-progress-report',
  templateUrl: './create-progress-report.component.html',
  styleUrls: ['./create-progress-report.component.css']
})
export class CreateProgressReportComponent implements OnInit {

  public reportForm: FormGroup;
  public report: any = {
    title: ''
  };
  public URL =  `${configs.rootUrl}storages/reports/upload`;
  public uploader: FileUploader = new FileUploader({url: this.URL});
  public progress = 0;
  public isUploading = false;
  public isFileSelected = false;
  public error = false;

  constructor(public formBuilder: FormBuilder, public service: ProjectService, public sharedService: SharedService) { }

  ngOnInit() {
    this.reportForm = this.formBuilder.group({
      title: ['', Validators.required]
    });
  }

  uploadProgressReport() {
    this.error = false;
    this.isUploading = true;
    this.uploader.queue[0].upload();
    this.uploader.onSuccessItem = (item: FileItem, response: string, status: number, headers: ParsedResponseHeaders) => {
      this.report.data = JSON.parse(response).result.files.file[0];
      this.service.uploadProgressReport(this.report)
        .subscribe(
        res => {
          this.sharedService.addToast('Success', 'Project Created!.', 'success');
          this.isUploading = false;
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
    console.log($event);
    console.log(this.reportForm);
  }

}
