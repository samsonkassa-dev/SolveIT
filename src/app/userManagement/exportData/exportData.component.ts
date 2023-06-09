import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ApiService } from '../../shared/services/api.service';
import { UserManagementService } from '../userManagament.service';
import { AuthService } from '../../Auth/services/auth.service';
import { configs } from '../../app.config';

@Component({
    selector: 'app-export-data',
    templateUrl: 'exportData.component.html',
    styleUrls: ['exportData.component.css']
})

export class ExportDataComponent implements OnInit {

    public selectionOptions = {sex: 'both', educationLevel: 'none', selectedCity: 0 , selectedStatus : 0, selectedAge: 0};
    public cities = [];
    public status = [
      "Employee (Full time)",
      "Employee (Part time)",
      "Unemployed",
      "Business Owner",
      "Student",
      "Other"
    ];

    public ageGroups = [
      19,20,21,22,23,24,25,26,27,28
    ]
    public optionForm: FormGroup;
    public educationLevels = [
      'Elementary',
      'HighSchool',
      'University Degree',
      'Post Graduate',
      'University Dropout',
      'HighSchool Dropout',
      'Elementary Dropout',
      'Other'
    ];

    constructor(public apiService: ApiService, public service: UserManagementService, public fb: FormBuilder, public authService: AuthService) {

    }

    ngOnInit() {
        this.getCities();
        this.optionForm = this.fb.group({
            sex: [''],
            educationLevel: [''],
            status:[''],
            city: [''],
            age:['']
          });
    }

    exportReport() {
      const options = {selectionOptions: this.selectionOptions};
      //console.log(options)
      this.apiService.downloadExcel(`${configs.rootUrl}UserAccounts/exportData`, options).subscribe(
        res => {
          this.exportData(res);
        }
      );
  }

	exportData(data) {
        const blob = data;
        const a = document.createElement('a');
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
        );
    }

  

}
