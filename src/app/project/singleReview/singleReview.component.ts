import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { ProjectService } from "../project.service";
import { AuthService } from "../../Auth/services/auth.service";
import { SharedService } from "../../shared/services/shared.service";
import { StarRatingComponent } from 'ng-starrating';
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-single-review",
  templateUrl: "./singleReview.component.html",
  styleUrls: ["./singleReview.component.css"]
})
export class SingleReviewComponent implements OnInit {

  @Input() review: any = null;

  constructor(
    public service: ProjectService,
    public authService: AuthService,
    public sharedService: SharedService
  ) {}

  ngOnInit() {

  }

  onRate($event:{oldValue:number, newValue:number, starRating:StarRatingComponent}) {
    alert(`Old Value:${$event.oldValue}, 
      New Value: ${$event.newValue}, 
      Checked Color: ${$event.starRating.checkedcolor}, 
      Unchecked Color: ${$event.starRating.uncheckedcolor}`);
  }

  formatReview(review) {
    if (review.indexOf("\n") !== -1) {
      const temp = review.split("\n");
      for (let i = 0; i < temp.length; i++) {
        const sentence = temp[i];
        if (
          sentence.indexOf("http://") !== -1 ||
          sentence.indexOf("www.") !== -1 ||
          sentence.indexOf("t.me") !== -1
        ) {
          temp[i] = `<a target="_blank" href="${sentence}">${sentence}</a>`;
        }
      }
      return temp.join("<br>");
    } else {
      if (
        review.indexOf("http://") !== -1 ||
        review.indexOf("www.") !== -1 ||
        review.indexOf("t.me") !== -1
      ) {
        const temp = review.split(" ");
        for (let i = 0; i < temp.length; i++) {
          const element = temp[i];
          if (
            element.indexOf("http://") !== -1 ||
            element.indexOf("www.") !== -1 ||
            element.indexOf("t.me") !== -1
          ) {
            if (element.indexOf("t.me") !== -1) {
              temp[
                i
              ] = `<a target="_blank" href="https://${element}">${element}</a>`;
            } else {
              temp[i] = `<a target="_blank" href="${element}">${element}</a>`;
            }
          }
        }
        return temp.join(" ");
      }
      return review;
    }
  }
}
