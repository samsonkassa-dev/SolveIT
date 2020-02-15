import { DomSanitizer } from "@angular/platform-browser";
import { AuthService } from "./../../Auth/services/auth.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { FileUploader } from "ng2-file-upload";
import { ParsedResponseHeaders } from "ng2-file-upload";
import { FileItem } from "ng2-file-upload";
import { Component, OnInit } from "@angular/core";
import { WinnerProjectService } from "../winnerProject.service";
import { SharedService } from "../../shared/services/shared.service";
import { configs } from "../../app.config";

@Component({
  selector: "app-competition-winner-list",
  templateUrl: "competitionWinnerList.component.html",
  styleUrls: ["competitionWinnerList.component.css"]
})
export class CompetitionWinnerListComponent implements OnInit {
  public competitionWinner: any = {
    competitionId: "",
    projectId: "",
    city: "",
    thumnbinal: {}
  };
  public competitionWinnerForm: FormGroup;
  public competitionWinners = [];
  public page: number = 1;
  public isUploading = false;
  public isFileSelected = false;
  public isCreateButtonClicked = false;
  public filePreviewPath: any = "";
  public progress = 0;
  private uploadUrl = `${configs.rootUrl}storages/winner-thumbinals/upload`;
  public uploader: FileUploader = new FileUploader({ url: this.uploadUrl });
  constructor(
    public sanitizer: DomSanitizer,
    public authService: AuthService,
    public service: WinnerProjectService,
    public sharedService: SharedService,
    public fb: FormBuilder
  ) {
    this.competitionWinnerForm = this.fb.group({
      description: [""],
      rank: [""]
    });
  }

  ngOnInit() {
    this.getCompetitionWinners();
  }

  getCompetitionWinners() {
    this.service.getCompetitionWinners().subscribe(res => {
      this.competitionWinners = res;
    });
  }
  setUpEditWinners(winner) {
    //console.log(winner)
    this.competitionWinner = winner;
    //console.log(this.competitionWinner)
    this.filePreviewPath = this.getImageUrl(winner.thumbinal);
    this.competitionWinnerForm.patchValue(this.competitionWinner);
  }
  removeCompetitionWinnerLabel(winner) {
    this.service.removeCompetitionWinnerLabel(winner.id).subscribe(
      res => {
        winner.active = false;
        this.sharedService.addToast(
          "Success",
          "Competition Winner Removed!.",
          "success"
        );
      },
      err => {
        this.sharedService.addToast("Error", "Error occurred!", "error");
      }
    );
  }

  addCompetitionWinner(form) {
    this.isCreateButtonClicked = true;
    if (this.competitionWinnerForm.valid && this.isFileSelected) {
      this.isUploading = true;
      this.uploader.queue[this.uploader.queue.length - 1].upload();
      this.uploader.onSuccessItem = (
        item: FileItem,
        response: string,
        status: number,
        headers: ParsedResponseHeaders
      ) => {
        this.competitionWinner.description = form.description;
        this.competitionWinner.thumbinal = JSON.parse(
          response
        ).result.files.file[0];
        this.competitionWinner.rank = form.rank;
        this.service.editCompetitionWinner(this.competitionWinner).subscribe(
          res => {
            this.sharedService.addToast(
              "Success",
              "Competition Winner Info Updated Successfully!.",
              "success"
            );
            this.ngOnInit();
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
      this.uploader.onProgressItem = (fileItem: FileItem, progress: any) => {
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
    } else {
      this.competitionWinner.description = form.description;
      this.competitionWinner.rank = form.rank;
      this.service.editCompetitionWinner(this.competitionWinner).subscribe(
        res => {
          this.sharedService.addToast(
            "Success",
            "Competition Winner Info Updated Successfully!.",
            "success"
          );
          this.ngOnInit();
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
    }
  }
  handleFileSelection($event) {
    this.isFileSelected = true;
    this.filePreviewPath = this.sanitizer.bypassSecurityTrustUrl(
      window.URL.createObjectURL(
        this.uploader.queue[this.uploader.queue.length - 1]._file
      )
    );
    //console.log(this.filePreviewPath);
  }
  getImageUrl(item) {
    return `${configs.rootUrl}storages/${item.container}/download/${item.name}`;
  }
}
