import { Component, OnInit } from "@angular/core";
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ApiService } from "../../shared/services/api.service";
import { UserManagementService } from "../userManagament.service";
import { AuthService } from "../../Auth/services/auth.service";
import { configs } from '../../app.config';

@Component({
    selector: 'app-export-data',
    templateUrl: 'exportData.component.html',
    styleUrls: ['exportData.component.css']
})

export class ExportDataComponent implements OnInit{

    public selectionOptions = {sex:'both', educationLevel: 'none', selectedCity: 0};
    public cities = [];
    public optionForm: FormGroup;

    constructor(public apiService: ApiService, public service: UserManagementService, public fb: FormBuilder, public authService: AuthService) {

    }

    ngOnInit() {
        this.getCities();
        this.optionForm = this.fb.group({
            sex: [''],
            educationLevel: [''],
            city: ['']
          });
    }

    exportReport() {
		let options = {selectionOptions: this.selectionOptions};
		this.apiService.downloadExcel(`${configs.rootUrl}UserAccounts/exportData`, options).subscribe(
			res => {
				this.exportData(res);
			}
		);
	}

	exportData(data){
        let blob = data;
        let a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = 'fileName.xls';
        document.body.appendChild(a);
        a.click();
    }

    getCities() {
        this.service.getCities().subscribe(
            res => {
                this.cities = res;
            }
        )
    }

}
