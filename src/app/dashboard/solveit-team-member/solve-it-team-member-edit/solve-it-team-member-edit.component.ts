import { ActivatedRoute, Router } from '@angular/router';
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
  selector: 'app-solve-it-team-member-edit',
  templateUrl: './solve-it-team-member-edit.component.html',
  styleUrls: ['./solve-it-team-member-edit.component.css']
})
export class SolveItTeamMemberEditComponent implements OnInit {
  public solveitMember_id = ""
  public solveItMember: any = { fullName: "", position: "", linkedln_link: '', twitter_link: "", image: {} };
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
    private sanitizer: DomSanitizer,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.solveitMember_id = this.activatedRoute.snapshot.paramMap.get("member_id");
    //console.log(this.solveitMember_id)
    this.solveItMemberForm = this.fb.group({
      fullName: ["", Validators.required],
      position: ["", Validators.required],
      linkedln_link: [""],
      twitter_link: [""]
    });
  }

  ngOnInit() {
    this.getTeamMember();
  }
  getTeamMember() {
    this.service.getTeamMember(this.solveitMember_id)
      .subscribe((res) => {
        this.solveItMemberForm.patchValue(res)
        this.solveItMember = res
        this.filePreviewPath = this.getImageUrl(res.picture)
        //console.log(this.solveItMember)
      })
  }



  updateTeamMember(teamMember) {
    //console.log(this.solveItMember)
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
        this.solveItMember = {...this.solveItMember, ...teamMember };
        this.solveItMember.picture = JSON.parse(response).result.files.file[0];
        this.service.updateSolveItTeamMember(this.solveItMember).subscribe(
          res => {
            this.sharedService.addToast(
              "Success",
              "Updated Team Member Profile!.",
              "success"
            );
            this.solveItMember = { fullName: "", position: "", linkedln_link: '', twitter_link: "", image: {} };
            this.solveItMemberForm.reset();
            this.isUploading = false;
            this.isCreateButtonClicked = false;
            this.isFileSelected = false;
            this.router.navigate(["dashboard", "solveit-team"])
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
        //console.log("Canceled");
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
        //console.log("error");
        this.isUploading = false;
        this.isCreateButtonClicked = false;
        this.isFileSelected = false;
        for (let i = 0; i < this.uploader.queue.length; i++) {
          this.uploader.queue.pop();
        }
      };
    } else if (this.solveItMemberForm.valid) {
      this.solveItMember = {...this.solveItMember, ...teamMember };
      //console.log(this.solveItMember)
      this.service.updateSolveItTeamMember(this.solveItMember).subscribe(
        res => {
          this.sharedService.addToast(
            "Success",
            "Updated Team Member Profile!.",
            "success"
          );
          this.solveItMember = { fullName: "", position: "", linkedln_link: '', twitter_link: "", image: {} };
          this.solveItMemberForm.reset();
          this.isUploading = false;
          this.isCreateButtonClicked = false;
          this.isFileSelected = false;
          this.router.navigate(["dashboard", "solveit-team"])
        },
        err => {
          this.sharedService.addToast("Error", "Error occurred!", "error");
          this.isUploading = false;
          this.isCreateButtonClicked = false;
          this.isFileSelected = false;
        }
      );

    } else {
      this.markFormGroupTouched(this.solveItMemberForm);
    }
  }





  handleFileSelection($event) {
    this.isFileSelected = true;
    this.filePreviewPath = this.sanitizer.
      bypassSecurityTrustUrl((window.URL.createObjectURL(this.uploader.queue[this.uploader.queue.length - 1]._file)));
    //console.log(this.filePreviewPath);
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

  getImageUrl(item) {
    return `${configs.rootUrl}storages/${item.container}/download/${item.name}`;
  }

}
