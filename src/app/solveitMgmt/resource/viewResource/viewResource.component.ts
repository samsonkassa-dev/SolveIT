import { Component } from "@angular/core";
import { SolveitMgmtService } from "../../solveitMgmt.service"

@Component({
    selector: "app-resource-view",
    templateUrl: "./viewResource.component.html",
    styleUrls: ["./viewResource.component.css"]
})

export class ViewResource {

    private resources = [];

    constructor(private service: SolveitMgmtService) {

    }

    getResources() {
        this.service.getResources();
    }
    
    downloadResource() {
        
    }
}