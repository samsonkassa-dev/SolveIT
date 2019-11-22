import { AuthService } from './../../../Auth/services/auth.service';
import { SharedService } from './../../../shared/services/shared.service';
import { JudgeService } from './../judge.service';
import { configs } from './../../../app.config';
import { FileUploader } from 'ng2-file-upload';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-judge-registration',
  templateUrl: './judge-registration.component.html',
  styleUrls: ['./judge-registration.component.css']
})
export class JudgeRegistrationComponent implements OnInit {
  public judge = {fullName : ""}
  public judgeForm: FormGroup
  public isUploading = false;
  public isFileSelected = false;
  public isCreateButtonClicked = false;
  public filePreviewPath: any = '';
  public progress = 0;
  private uploadUrl = `${configs.rootUrl}storages/juddge/upload`;
  public uploader: FileUploader = new FileUploader({ url: this.uploadUrl });
  constructor(
    public judgeService: JudgeService,
    public sharedService: SharedService,
    public authService: AuthService,
    public fb:FormBuilder

  ) { 
    this.judgeForm = fb.group({
      fullName: ['', Validators.required]
    })
  }

  ngOnInit() {
  }

  registerJudge(judgeForm){
    this.judgeService.addJudge(judgeForm)
    .subscribe(res =>{
      this.sharedService.addToast(
        "Success",
        "Registration Successful!.",
        "success"
      );
    }, err =>{
      this.sharedService.addToast("Error", "Error occurred!", "error");
    })
  }

}
