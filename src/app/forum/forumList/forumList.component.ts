import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import { Router } from '@angular/router';
import { ForumService } from '../forum.service';
import { AuthService } from '../../Auth/services/auth.service';

@Component({
    selector: 'app-forum-list',
    templateUrl: './forumList.component.html',
    styleUrls: ['./forumList.component.css']
})

export class ForumListComponent implements OnInit {

    @Input() selected;
    @Input() categories;
    @Output() create = new EventEmitter();

    private popularforums = [];
    private forumsBackup = [];
    private forums = [];
    private keyword = '';
    private forumType = '';
    private page = 1;

    constructor(private service: ForumService, private router: Router, private _authService: AuthService) {

    }

    ngOnInit() {
      console.log(this.selected);
      this.fetchForumsList();
      this.getAllForums();
    }

    fetchForumsList() {
        this.service.getForumList().subscribe(
            res => {
                this.popularforums = res.Result;
            }
        );
    }

    getAllForums() {
      console.log('Fetching all forums');
        if (this.selected === 'forum-list-public') {
            this.forumType = 'Public Forums';
            this.service.getAllForumList().subscribe(
                res => {
                  console.log('public forums', res);
                  this.forums = res;
                  this.forumsBackup = res;
                }
            );
        } else if (this.selected === 'forum-list-private') {
            this.forumType = 'My Forums';
            this._authService.getUserInfo().subscribe(
                res => {
                    const userId = res.id;
                    this.service.getMyForumList(userId).subscribe(
                        response => {
                            this.forums = response;
                            this.forumsBackup = response;
                        }
                    );
                }
            );
        }
    }

    viewForum(slung) {
        this.router.navigate(['/forums', slung]);
    }

    onSearch($event) {
      console.log('searching');
        if (this.keyword !== '') {
          if (this.forums.length === 0) {
            this.forums = this.forumsBackup;
          }
          this.forums = this.forums.filter(item => item.slung.includes(this.keyword));
        } else if (this.keyword === '') {
          this.forums = this.forumsBackup;
        }
    }

    onCreateForum() {
      this.create.emit();
    }

}
