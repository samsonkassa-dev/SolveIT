import { Component, OnInit } from "@angular/core";
import { ForumService } from "./forum.service";

@Component({
    selector: 'app-forum',
    templateUrl: './forum.component.html',
    styleUrls: ['./forum.component.css']
})

export class Forum implements OnInit{
    
    private selected = "forum-list-public";
    private categories = [];

    constructor(private service: ForumService) {}

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
}
