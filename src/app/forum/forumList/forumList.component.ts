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
        
    //   console.log(this.selected);
      this.fetchForumsList();
    //   this.getAllForums();
        this.showForums();
    }

    fetchForumsList() {
        this.service.getForumList().subscribe(
            res => {
                this.forums = res.Result;
                this.forumsBackup = res.Result;
                console.log('All Frorums', this.forums);
            }
        );
    }


    showForums() {
        if(this.selected === 'forum-list-public') {
            // todo: show public forums
            this.forums = this.forumsBackup.filter(forum => {
                return !forum.private
            });
            console.log('Public forums => ', this.forums);
        } else if(this.selected === 'forum-list-private') {
            // todo: show private forums which the user is a member
            // this.service.getMyForumList()
            this.authService.getUserInfo()
                .subscribe(res => {
                    this.service.getMyForumList(res.id)
                      .subscribe(forums => {
                          this.forums = forums.filter(forum => {
                              return forum.private;
                          })
                      })
                });
            
        }
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
            this.authService.getUserInfo().subscribe(
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
