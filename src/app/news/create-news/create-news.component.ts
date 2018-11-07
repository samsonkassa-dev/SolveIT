import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {configs} from '../../app.config';
import {FileItem, FileUploader, ParsedResponseHeaders} from 'ng2-file-upload';
import {NewsService} from '../news.service';
import {SharedService} from '../../shared/services/shared.service';

@Component({
  selector: 'app-create-news',
  templateUrl: './create-news.component.html',
  styleUrls: ['./create-news.component.css']
})
export class CreateNewsComponent implements OnInit {

  public newsForm: FormGroup;
  public URL =  `${configs.rootUrl}storages/news/upload`;
  public uploader: FileUploader = new FileUploader({url: this.URL});
  public progress = 0;
  public isUploading = false;
  public isFileSelected = false;
  public news = {
    title: '',
    content: '',
    img: null,
    createdAt: new Date()
  };
  @Output() created = new EventEmitter();
  @Output() newsList = new EventEmitter();


  constructor(public fb: FormBuilder, public service: NewsService, public sharedService: SharedService) { }

  ngOnInit() {
    this.newsForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required]
    });

  }

  isFormValid() {
    return this.newsForm.valid && this.isFileSelected;
  }

  onCreateNews() {
    if (this.isFormValid()) {
      this.isUploading = true;
      this.uploader.queue[0].upload();
      this.uploader.onSuccessItem = (item: FileItem, response: string, status: number, headers: ParsedResponseHeaders) => {
        this.news.img = JSON.parse(response).result.files.file[0];
        this.news.createdAt = new Date();
        this.service.createNews(this.news)
          .subscribe(res => {
              this.created.emit();
              this.sharedService.addToast('Success', 'New Resource Added!.', 'success');
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
        this.progress = progress;
      };
      this.uploader.onCancelItem = (item: FileItem, response: string, status: number, headers: ParsedResponseHeaders) => {
        this.isUploading = false;
        this.uploader.queue.pop();
      };
      this.uploader.onErrorItem = (item: FileItem, response: string, status: number, headers: ParsedResponseHeaders) => {
        this.isUploading = false;
        this.uploader.queue.pop();
      };
    } else {
      this.markFormGroupTouched(this.newsForm);
    }
  }

  handleFileSelection() {
    this.isFileSelected = true;
  }

  ShowNewsList() {
    this.newsList.emit();
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
