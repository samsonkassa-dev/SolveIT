import { Component, OnInit } from '@angular/core';
import { ForumService } from './forum.service';
import { AuthService } from '../Auth/services/auth.service';

@Component({
    selector: 'app-forum',
    templateUrl: './forum.component.html',
    styleUrls: ['./forum.component.css']
})

export class ForumComponent implements OnInit {

    private selected = 'forum-list-public';
    private categories = [];
    private favouritePage = 1;
    private favouriteDiscussions = [];
    private favouriteDiscussionsBackup = [];
    private keyword = '';

    constructor(private service: ForumService, private _authService: AuthService) {}

    ngOnInit() {
        this.getCategories();
    }

    toggleView(view) {
        this.selected = view;
    }

    getCategories() {
        this.service.getCategories().subscribe(
            res => {
                this.categories = res;
            }
        );
    }

    getFavouriteDiscussions() {
        this.selected = 'favourite-discussions';

        this._authService.getUserInfo().subscribe(
            res => {
                const userId = res.id;
                this.service.getFavouriteDiscussions(userId).subscribe(
                    res => {
                        this.favouriteDiscussions = res;
                        this.favouriteDiscussionsBackup = res;
                    }
                );
            }
        );
    }

    onSearch($event) {
        if (this.keyword !== '') {
          this.favouriteDiscussions = this.favouriteDiscussions.filter(item => item.content.includes(this.keyword));
        } else {
          this.favouriteDiscussions = this.favouriteDiscussionsBackup;
        }
    }

    countComments(discussion) {
        let count = 0;
        this.service.countComments(discussion.id).subscribe(
            res => {
                count = res.count;
            }
        );
        return count;
    }
}
