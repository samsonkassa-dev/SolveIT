import { Component, OnInit, Input } from '@angular/core';
import { ForumService } from '../forum.service';

@Component({
    selector: 'app-comment-list',
    templateUrl: './commentList.component.html',
    styleUrls: ['./commentList.component.css']
})

export class CommentListComponent implements OnInit {

    @Input() comments = [];
    private page = 1;

    constructor(private service: ForumService) {

    }

    ngOnInit() {
    }

}
