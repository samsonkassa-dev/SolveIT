import { Component } from "@angular/core";
import { SolveitMgmtService } from "../../solveitMgmt.service"
import { FormGroup, Validators, FormBuilder } from "@angular/forms";

@Component({
    selector: "app-resource-share",
    templateUrl: "./shareResource.component.html",
    styleUrls: ["./shareResource.component.css"]
})

export class ShareResource {

    private resource = {};
    private resourceForm: FormGroup;

    constructor(private service: SolveitMgmtService) {

    }

    addResource() {
        this.service.addResource(this.resource);
    }
    
}