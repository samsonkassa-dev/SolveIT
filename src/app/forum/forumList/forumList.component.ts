import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import { Router } from '@angular/router';
import { ForumService } from '../forum.service';
import { AuthService } from '../../Auth/services/auth.service';
import { retry } from 'rxjs/operator/retry';

@Component({
    selector: 'app-forum-list',
    templateUrl: './forumList.component.html',
    styleUrls: ['./forumList.component.css']
})

export class ForumListComponent implements OnInit {

    @Input() selected;
    @Input() categories;
    @Output() create = new EventEmitter();

    public popularforums = [];
    public forumsBackup = [];
    public forums = [];
    public keyword = '';
    public forumType = '';
    public page = 1;

    constructor(public service: ForumService, public router: Router, public authService: AuthService) {

    }

    ngOnInit() {
        
      this.fetchForumsList();
    }

    fetchForumsList() {
        if (this.selected === 'forum-list-public') {
            this.service.getAllForumList().subscribe(
                res => {
                    this.forumsBackup = res.filter(forum => {
                        return !forum.private;
                    });
                    this.forums = this.forumsBackup;
                    console.log('Public backup', this.forumsBackup);
                }
            );
        }else if (this.selected === 'forum-list-private') {
            this.authService.getUserInfo()
                .subscribe(res => {
                    this.service.getMyForumList(res.id)
                      .subscribe(forums => {
                          this.forums = forums.filter(forum => {
                              return forum.private;
                          });
                          this.forumsBackup = this.forums;
                      })
                });
            
        }
    }


    getForumDiscussionCount(forumId) {
        // this.service.getDiscussionCount(forumId)
        //     .subscribe(res => {
        //         console.log('discussion count ', res);
        //         return res;
        //     }, error => {
        //         console.log('error while fetching discussion count', error);
        //         return null;
        //     });
        console.log("hello");
        return null;
    }

    viewForum(slung) {
        this.router.navigate(['/forums', slung]);
    }

    onSearch($event) {
        if (this.keyword !== '') {
          if (this.forums.length === 0) {
            this.forums = this.forumsBackup;
          }
          this.forums = this.forums.filter(item => item.slung.includes(this.keyword));
        } else {
          this.forums = this.forumsBackup;
        }
    }

    onCreateForum() {
      this.create.emit();
    }

}
