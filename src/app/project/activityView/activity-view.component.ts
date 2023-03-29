import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../Auth/services/auth.service";
import { ProjectService } from "../project.service";
import { SharedService } from "../../shared/services/shared.service";
import { FileItem, FileUploader, ParsedResponseHeaders } from "ng2-file-upload";
import { configs } from "../../app.config";

@Component({
  selector: "app-activity-view",
  templateUrl: "./activity-view.component.html",
  styleUrls: ["./activity-view.component.css"]
})
export class ActivityViewComponent implements OnInit, OnChanges {
  @Input() project: any = {};
  @Input() activity;
  @Output() back = new EventEmitter();
  // public reportCommentForm: FormGroup;
  public reportScoreForm: FormGroup;
  public reportForm: FormGroup;
  public allowedMimeType = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ];
  public URL = `${configs.rootUrl}storages/reports/upload`;
  public uploader: FileUploader = new FileUploader({
    url: this.URL,
    allowedMimeType: this.allowedMimeType
  });
  public isUploading = false;
    public isSubmitting = false;
    public isFileSelected = false;
  isSubmit = false;
  public report: any = {
    title: "",
    type: null,
    report: "",
    userId: "",
    activityId: null
  };
  public error = false;
  public errorType = false;
  public progress = 0;

  // public reportComments = [];
  // public reportComment = {
  //   content: "",
  //   userId: "",
  //   reportId: "",
  //   createdAt: new Date()
  // };

  // public types = [
  //   { id: "attachment", name: "Attach Document" },
  //   { id: "simple", name: "Simple Report" },
  //   { id: "communication", name: "Communication Report" },
  //   { id: "activity", name: "Activity Report" }
  // ];
  public userId = "";

  constructor(
    public formBuilder: FormBuilder,
    public authService: AuthService,
    public service: ProjectService,
    public sharedService: SharedService
  ) {}

  ngOnInit() {
    // this.reportCommentForm = this.formBuilder.group({
    //   content: ["", Validators.required]
    // });

    this.reportScoreForm = this.formBuilder.group({
      activity_score: ["", Validators.required]
    });
    this.reportForm = this.formBuilder.group({
      title: [this.activity.activity_name, Validators.required],
      description: [this.activity.description, Validators.required],
      type: ["activity", Validators.required],
      report: [""],
      date: [""],
      communicationAbout: [""],
      progress: [""],
      meetingDate: [""],
      modeOfCommunication: [""],
      activityId: [null]
    });
    this.userId = this.authService.getUserId();
    // this.getProjectReportComments();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // this.reportCommentForm = this.formBuilder.group({
    //   content: ["", Validators.required]
    // });
    this.userId = this.authService.getUserId();
    // this.getProjectReportComments();
  }
  // remove() {
  //   this.service.removeReport(this.activity).subscribe(res => {
  //     this.back.emit();
  //   });
  // }
  // approve() {
  //   const user = this.authService.getUserId();
  //   const temp = { ...this.report, isApproved: true, approvedBy: user, approvedAt: new Date() };
  //   this.service.addPogressReportScore(temp).subscribe(res => {
  //     this.report = temp;
  //     this.ngOnInit();
  //     this.sharedService.addToast(
  //       "Success",
  //       "Report Approved!",
  //       "success"
  //     );
  //   });
  // }
  // getProjectReportComments() {
  //   this.service.fetchProjectReportComments(this.report.id).subscribe(res => {
  //     this.reportComments = res;
  //   });
  // }

  // addComment() {
  //   const userId = this.authService.getUserId();
  //   if (userId) {
  //     this.reportComment.reportId = this.report.id;
  //     this.reportComment.userId = userId;
  //     this.reportComment.createdAt = new Date();
  //     this.service.addPogressReportComment(this.reportComment).subscribe(
  //       res => {
  //         this.getProjectReportComments();
  //         this.reportCommentForm.reset();
  //         this.sharedService.addToast(
  //           "Success",
  //           "Comment Created!.",
  //           "success"
  //         );
  //       },
  //       err => {
  //         this.sharedService.addToast("", "Error occurred!", "error");
  //       }
  //     );
  //   }
  // }

  addScore() {
    let tempReport = {
      ...this.activity,
      ...this.reportScoreForm.value
    };

    this.service.addPogressReportScore(tempReport).subscribe(
      res => {
        this.sharedService.addToast("Success", "Score Added!.", "success");
        this.back.emit();

      },
      err => {
        this.sharedService.addToast("", "Error occurred!", "error");
      }
    );
  }

  toggleIsSubmitting() {
    console.log("i am here clogging");
    this.isSubmitting = true;
  }

  showDocument(content) {
    this.service.downloadProjectReport(content).subscribe(
      res => {
        const url = window.URL.createObjectURL(res.data);
        const a = document.createElement("a");
        document.body.appendChild(a);
        a.setAttribute("style", "display: none");
        a.href = url;
        a.download = res.fileName;
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove(); // remove the element
      },
      error => {
        //console.log('error', error);
      }
    );
  }

  uploadProgressReport() {
    this.isSubmit = true;

    if (this.isFormValid()) {
      this.isSubmit = true;
      this.report.createdAt = new Date();
      this.report.projectId = this.project.id;
      const userId = this.authService.getUserId();
      this.report.userId = userId;
      if (this.report.type == "activity") {
        this.error = false;
        if (this.uploader.queue[0]) {
          this.errorType = false;
          this.isUploading = true;
          this.uploader.queue[0].upload();
        } else {
          this.uploader.queue.pop();
          this.errorType = true;
          return;
        }
        this.uploader.onSuccessItem = (
          item: FileItem,
          response: string,
          status: number,
          headers: ParsedResponseHeaders
        ) => {
          this.report.content = JSON.parse(response).result.files.file[0];
          this.report = {
            ...this.report,
            ...this.reportForm.value
          };
          this.service.uploadProgressReport(this.report).subscribe(
            res => {
              this.sharedService.addToast(
                "Success",
                "Activity Submitted!.",
                "success"
              );
              this.isUploading = false;
              this.isSubmitting =false;
              this.back.emit();
            },
            err => {
              console.log(err);
              if ((err.status = 422)) {
                this.sharedService.addToast("", "Error occurred!", "error");
              }
            }
          );
          this.uploader.queue.pop();
        };
        this.uploader.onProgressItem = (fileItem: FileItem, progress: any) => {
          //console.log("progress => ", progress);
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
          this.uploader.queue.pop();
        };
        this.uploader.onErrorItem = (
          item: FileItem,
          response: string,
          status: number,
          headers: ParsedResponseHeaders
        ) => {
          //console.log("error");
          this.error = true;
          this.isUploading = false;
          this.uploader.queue.pop();
        };
      }
    } else {
      //console.log(this.report)
      //console.log(this.report.type == this.types[2].id)
      this.sharedService.addToast("", "Error occurred!", "error");
    }
  }

  isFormValid() {
    // if (this.report.title !== "" && this.report.type !== "") {
      // if (this.report.type === this.types[0].id) {
      //   return this.isFileSelected;
      // } else if (this.report.type === this.types[1].id) {
      //   return this.report.report !== "";
      // } else if (this.report.type === this.commId) {
      //   return this.reportForm.controls.communicationAbout.value !== "";
      // }
      if (this.report.type === "activity") {
        return this.report.activity || this.isFileSelected;
      }

      // return false;
    // }

    return false;
  }

  backToProgressReportList() {
    this.back.emit();
    this.isSubmitting =false;

  }
  handleFileSelection($event) {
    this.isFileSelected = true;
  }
}
