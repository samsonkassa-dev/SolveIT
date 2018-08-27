import { Component } from '@angular/core';

@Component({
    selector: 'app-resource',
    templateUrl: './resource.component.html',
    styleUrls: ['./resource.component.css']
})

export class Resource {

    private selected = 'add-resource';

    toggleView(view) {
        this.selected = view;
    }

}
