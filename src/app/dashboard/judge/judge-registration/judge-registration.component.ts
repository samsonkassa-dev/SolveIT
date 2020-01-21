import { Router } from '@angular/router';
import { CommonService } from './../../../shared/services/common.service';
import { CityService } from './../../city/city.service';
import { AuthService } from './../../../Auth/services/auth.service';
import { SharedService } from './../../../shared/services/shared.service';
import { JudgeService } from './../judge.service';
import { configs } from './../../../app.config';
import { FileUploader } from 'ng2-file-upload';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-judge-registration',
  templateUrl: './judge-registration.component.html',
  styleUrls: ['./judge-registration.component.css']
})
export class JudgeRegistrationComponent implements OnInit {
  public judgeForm: FormGroup
  public judge = {cities : [], professionalBackground:null, educationalBackground:null, interestInInvesting:null, sector: null}
  public cities = [];
  public isCreateButtonClicked = false;
  dropdownSettings = {
    singleSelection: false,
    idField: "item_id",
    textField: "item_text",
    selectAllText: "Select All",
    unSelectAllText: "UnSelect All",
    itemsShowLimit: 3,
    allowSearchFilter: true
  };

  educationalBackgroundOptions = [
    "Undergraduate",
    "Bachelor Degree",
    "Master degree",
    "Doctorate or higher"
  ]

  professionalBackgroundOptions = [
    "Employee (Full time)",
    "Employee (Part time)",
    "Unemployed",
    "Business Owner",
    "Student",
    "Other"
  ]
  
  investmentOptions = [
   "Yes",
   "No",
    "Maybe",

  ]


  genderOptions = [
    "Male",
    "Female"
  ]


  fieldOfExpertiseOptions = [
    "Business",
    "Technical",
    "Other"
  ]

  public sectors = [
    "Agriculture and Fishery",
    "Health",
    "Education",
    "Finance",
    "Construction Industry",
    "Metallurgical Industry",
    "Transportation Sector",
    "Food and Beverage Processing",
    "Entertainment",
    "Tourism and Culture",
    "Other"
  ];


  constructor(
    public judgeService: JudgeService,
    public sharedService: SharedService,
    public authService: AuthService,
    public fb:FormBuilder,
    private commonService: CommonService,
    public router:Router
  ) { 
    this.judgeForm = fb.group({
      fullName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      email: ['', Validators.required],
      password:['123123123',Validators.required],
      educationalBackground: [''],
      professionalBackground: [''],
      solveItKnowledge:['', Validators.required],
      judgeExperience:[''],
      cities:['', Validators.required],
      interestInInvesting:['', Validators.required],
      shortDescription: ['', Validators.required],
      techOpinion:[''],
      fieldOfExpertise:[null],
      investmentCapital:[''],
      sector:[''],
      gender:[null, Validators.required],
      dateOfBirth:['', Validators.required]
    })
  }

  ngOnInit() {
    this.educationalBackgroundOptions = this.format(this.educationalBackgroundOptions)
    this.investmentOptions = this.format(this.investmentOptions)
    this.professionalBackgroundOptions = this.format(this.professionalBackgroundOptions)
    this.fieldOfExpertiseOptions = this.format(this.fieldOfExpertiseOptions)
    this.sectors = this.format(this.sectors)
    this.genderOptions = this.format(this.genderOptions)
    //console.log(this.investmentOptions)
    this.getCities()
  }
  getCities(){
    this.commonService.getCities().subscribe(cities =>{
      //console.log(cities)
      this.cities = cities
    })
  }
  registerJudge(judgeForm){
    console.log(judgeForm)
    this.authService.registerJudge({ user: judgeForm })
    .subscribe(res =>{
      this.sharedService.addToast(
        "Success",
        "Registration Successful!.",
        "success"
      );
      this.judgeForm.reset()
      this.router.navigate(['/'])
    }, err =>{
      this.sharedService.addToast("Error", "Error occurred!", "error");
    })
  }
  format(arrayOfStrings){
    let result = []
    arrayOfStrings.forEach(element => {
      result.push({label:element, value:element})
    });
    return result
  }
  mapCitiesToDropDownList(cities) {
    let cityList = [];
    cities.forEach(item => {
      cityList.push({ item_id: item.id, item_text: item.name });
    });

    return cityList;
  }

  onItemSelected(item) {
    if (this.judge.cities.indexOf(item.item_id) === -1) {
      this.judge.cities.push(item.item_id);
    }
  }

  onItemDeselected(item) {
    this.judge.cities.splice(
      this.judge.cities.indexOf(item.item_id),
      1
    );
  }

  onSelectAll(items) {
    items.forEach(item => {
      this.onItemSelected(item);
    });
  }

  onDeselectAll(items) {
    this.judge.cities = [];
  }


}
