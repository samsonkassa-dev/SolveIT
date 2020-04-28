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

@Component({
  selector: "app-report-view",
  templateUrl: "./report-view.component.html",
  styleUrls: ["./report-view.component.css"]
})
export class ReportViewComponent implements OnInit, OnChanges {
  @Input() report;
  @Output() back = new EventEmitter();
  public reportCommentForm: FormGroup;
  public reportScoreForm: FormGroup;
  public reportComments = [];
  public reportComment = {
    content: "",
    userId: "",
    reportId: "",
    createdAt: new Date()
  };

  public types = [
    { id: "attachment", name: "Attach Document" },
    { id: "simple", name: "Simple Report" },
    { id: "communication", name: "Communication Report" },
    { id: "activity", name: "Activity Report" }
  ];
  public userId = "";

  constructor(
    public formBuilder: FormBuilder,
    public authService: AuthService,
    public service: ProjectService,
    public sharedService: SharedService
  ) {}

  ngOnInit() {
    this.reportCommentForm = this.formBuilder.group({
      content: ["", Validators.required]
    });

    this.reportScoreForm = this.formBuilder.group({
      activity_score: [""]
    });
    this.userId = this.authService.getUserId();
    this.getProjectReportComments();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.reportCommentForm = this.formBuilder.group({
      content: ["", Validators.required]
    });
    this.userId = this.authService.getUserId();
    this.getProjectReportComments();
  }
  remove() {
    this.service.removeReport(this.report).subscribe(res => {
      this.back.emit();
    });
  }
  getProjectReportComments() {
    this.service.fetchProjectReportComments(this.report.id).subscribe(res => {
      this.reportComments = res;
    });
  }

  addComment() {
    const userId = this.authService.getUserId();
    if (userId) {
      this.reportComment.reportId = this.report.id;
      this.reportComment.userId = userId;
      this.reportComment.createdAt = new Date();
      this.service.addPogressReportComment(this.reportComment).subscribe(
        res => {
          this.getProjectReportComments();
          this.reportCommentForm.reset();
          this.sharedService.addToast(
            "Success",
            "Comment Created!.",
            "success"
          );
        },
        err => {
          this.sharedService.addToast("", "Error occurred!", "error");
        }
      );
    }
  }

  addScore() {
    let tempReport = {
      ...this.report,
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

  backToProgressReportList() {
    this.back.emit();
  }
}
