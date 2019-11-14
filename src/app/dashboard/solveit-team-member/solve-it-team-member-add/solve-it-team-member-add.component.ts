import { SharedService } from './../../../shared/services/shared.service';
import { configs } from './../../../app.config';
import { AuthService } from './../../../Auth/services/auth.service';
import { CommonService } from './../../../shared/services/common.service';
import { Component, OnInit } from "@angular/core";
import { DomSanitizer } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SolveItTeamMemberService } from "../solveit-team-member.service";
import { FileUploader, FileItem, ParsedResponseHeaders } from "ng2-file-upload";
@Component({
  selector: 'app-solve-it-team-member-add',
  templateUrl: './solve-it-team-member-add.component.html',
  styleUrls: ['./solve-it-team-member-add.component.css']
})
export class SolveItTeamMemberAddComponent implements OnInit {
  public solveItMember: any = { fullName: "", position: "", linkedln_link: '', twitter_link: "", image:{} };
  public solveItMemberForm: FormGroup;
  public projects = [];
  public projectsBackup = [];
  public competitions = [];
  public cities = [];
  public isUploading = false;
  public isFileSelected = false;
  public isCreateButtonClicked = false;
  public filePreviewPath: any = '';
  public progress = 0;
  private uploadUrl = `${configs.rootUrl}storages/solveit-team/upload`;
  public uploader: FileUploader = new FileUploader({ url: this.uploadUrl });

  constructor(
    public service: SolveItTeamMemberService,
    public fb: FormBuilder,
    public sharedService: SharedService,
    public competitionService: CommonService,
    public authService: AuthService,
    private sanitizer: DomSanitizer
  ) {
    this.solveItMemberForm = this.fb.group({
      fullName: ["", Validators.required],
      position: ["", Validators.required],
      linkedln_link: [""],
      twitter_link : [""]
    });
  }

  ngOnInit() {

  }

  addTeamMember(teamMember) {
    this.isCreateButtonClicked = true;
    if (this.solveItMemberForm.valid && this.isFileSelected) {
      this.isUploading = true;
      this.uploader.queue[this.uploader.queue.length - 1].upload();
      this.uploader.onSuccessItem = (
        item: FileItem,
        response: string,
        status: number,
        headers: ParsedResponseHeaders
      ) => {
        this.solveItMember = {...teamMember};
        this.solveItMember.picture = JSON.parse(response).result.files.file[0];
        this.service.addSolveItTeamMember(this.solveItMember).subscribe(
          res => {
            this.sharedService.addToast(
              "Success",
              "New Competition Winner Added!.",
              "success"
            );
            this.solveItMember = { fullName: "", position: "", linkedln_link: '', twitter_link: "", image:{} };
            this.solveItMemberForm.reset();
            this.isUploading = false;
            this.isCreateButtonClicked = false;
            this.isFileSelected = false;
          },
          err => {
            this.sharedService.addToast("Error", "Error occurred!", "error");
            this.isUploading = false;
            this.isCreateButtonClicked = false;
            this.isFileSelected = false;
          }
        );
        for (let i = 0; i < this.uploader.queue.length; i++) {
          this.uploader.queue.pop();
        }
      };
      this.uploader.onProgressItem = (
        fileItem: FileItem,
        progress: any
      ) => {
        this.progress = progress;
      };
      this.uploader.onCancelItem = (
        item: FileItem,
        response: string,
        status: number,
        headers: ParsedResponseHeaders
      ) => {
        console.log("Canceled");
        this.isUploading = false;
        this.isCreateButtonClicked = false;
        this.isFileSelected = false;
        for (let i = 0; i < this.uploader.queue.length; i++) {
          this.uploader.queue.pop();
        }
      };
      this.uploader.onErrorItem = (
        item: FileItem,
        response: string,
        status: number,
        headers: ParsedResponseHeaders
      ) => {
        console.log("error");
        this.isUploading = false;
        this.isCreateButtonClicked = false;
        this.isFileSelected = false;
        for (let i = 0; i < this.uploader.queue.length; i++) {
          this.uploader.queue.pop();
        }
      };
    } else {
      this.markFormGroupTouched(this.solveItMemberForm);
    }
  }

  



  handleFileSelection($event) {
    this.isFileSelected = true;
    this.filePreviewPath = this.sanitizer.
      bypassSecurityTrustUrl((window.URL.createObjectURL(this.uploader.queue[this.uploader.queue.length - 1]._file)));
    console.log(this.filePreviewPath);
  }

  /**
   * Marks all controls in a form group as touched
   * @param formGroup - The form group to touch
   */
  public markFormGroupTouched(formGroup: any) {
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
