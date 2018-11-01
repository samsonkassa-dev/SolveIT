import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ForumService } from '../forum.service';
import { SharedService } from '../../shared/services/shared.service';
import { AuthService } from '../../Auth/services/auth.service';
import {configs} from '../../app.config';
import {FileItem, FileUploader, ParsedResponseHeaders} from 'ng2-file-upload';

@Component({
    selector: 'app-discussion-create',
    templateUrl: './createDiscussion.component.html',
    styleUrls: ['./createDiscussion.component.css']
})

export class CreateDiscussionComponent implements OnInit {

    @Input() forum;
    @Output() created = new EventEmitter();
    public discussion = {userAccountId: 0, forumId: 0, slung: '', title: '', imgContent: {}};
    public discussionForm: FormGroup;
    public tags = [];
    public discussionTags = [];
    public tag = '';
    public URL =  `${configs.rootUrl}storages/discussions/upload`;
    public uploader: FileUploader = new FileUploader({url: this.URL});
    public progress = 0;
    public isFileSelected = false;
    dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
    dropDownListTags = [];

    constructor(public authService: AuthService, public service: ForumService,
                public sharedService: SharedService, public router: Router) {
        this.discussionForm = new FormGroup({
            title: new FormControl('', Validators.required),
            content: new FormControl('', Validators.required),
            tags: new FormControl('', Validators.required)
        });
    }

    ngOnInit() {
        this.getTags();
        this.discussion.forumId = this.forum.id;
        this.discussion.userAccountId = this.authService.getUserId() ? this.authService.getUserId() : 0;
    }

    getTags() {
      this.service.getTags()
        .subscribe(res => {
          this.tags = res;
          this.mapTagsToDropDownList(this.tags);
        });
    }

    mapTagsToDropDownList(tags) {
      let list = [];
      tags.forEach(item => {
        list.push({item_id: item.id, item_text: item.name});
      });
      return list;
    }

    onTagSelected(item) {
      if (this.discussionTags.indexOf(item.item_id) === -1) {
        this.discussionTags.push(item.item_id);
      }
    }

    onTagDeselected(item) {
      this.discussionTags.slice(this.dropDownListTags.indexOf(item), 1);
    }

    onAllTagSelected(items) {
      items.forEach(item => {
        if (this.discussionTags.indexOf(item.item_id) === -1) {
          this.discussionTags.push(item.item_id);
        }
      });
    }

    onAllTagsDeselected(items) {
      this.discussionTags = [];
    }

    selectTag(tag) {
        if (this.discussionTags.indexOf(tag) !== -1) {
          this.discussionTags.splice(this.discussionTags.indexOf(tag), 1);
        } else {
          this.discussionTags.push(tag);
        }
    }

    addTag(discussionId, tagId) {
      this.service.addTagToDiscussion(discussionId, tagId)
        .subscribe(res => {
          console.log('tag added');
        });
    }

    createDiscussion() {
        if (this.discussionForm.valid) {
          if (this.isFileSelected) {
            alert('uploading file');
            this.uploader.queue[0].upload();
            this.uploader.onSuccessItem = (item: FileItem, response: string, status: number, headers: ParsedResponseHeaders) => {
              console.log('uploding successful');
              this.discussion.imgContent = JSON.parse(response).result.files.file[0];
              this.onCreateDiscussion();
              this.uploader.queue.pop();
            };
            this.uploader.onProgressItem = (fileItem: FileItem, progress: any) => {
              console.log('progress => ', progress);
              this.progress = progress;
            };
            this.uploader.onCancelItem = (item: FileItem, response: string, status: number, headers: ParsedResponseHeaders) => {
              console.log('Canceled');
              this.uploader.queue.pop();
            };
            this.uploader.onErrorItem = (item: FileItem, response: string, status: number, headers: ParsedResponseHeaders) => {
              console.log('error');
              this.uploader.queue.pop();
            };
          } else {
            this.onCreateDiscussion();
          }
         } else {
          console.log(this.discussionForm);
        }

    }

  private onCreateDiscussion() {
      alert('creating discussion');
    this.discussion.slung = this.discussion.title.replace(' ', '-');
    this.service.createDiscussion(this.discussion).subscribe(
      res => {
        this.toggleDiscussionList();
        this.discussionTags.forEach(tag => {
          this.addTag(res.id, tag.id);
        });
        this.sharedService.addToast('Success', 'Discussion Created!.', 'success');
      },
      err => {
        if (err.status = 422) {
          this.sharedService.addToast('', 'Error occured!', 'error');
        }
      }
    );
  }

  toggleDiscussionList() {
      this.created.emit();
    }

    onSignIn() {
      this.router.navigate(['login']);
    }

  handleFileSelection($event) {
    this.isFileSelected = true;
  }
}
