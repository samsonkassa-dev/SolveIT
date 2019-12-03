import { Router } from '@angular/router';
import { SharedService } from './../../../shared/services/shared.service';
import { AuthService } from './../../../Auth/services/auth.service';
import { CityService } from './../../city/city.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AttendanceService } from './../attendance.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-attendance-list',
  templateUrl: './attendance-list.component.html',
  styleUrls: ['./attendance-list.component.css']
})
export class AttendanceListComponent implements OnInit {
  attendanceList = []
  backupAttendanceList = []
  cities = []
  events = []
  public attendanceForm:FormGroup;
  public attendance = {cities: [], attendance_date : null, cityIds : [], title:'',description:'',place:'', venue:''}
  public page = 1;
  dropdownSettings = {
    singleSelection: false,
    idField: "item_id",
    textField: "item_text",
    selectAllText: "Select All",
    unSelectAllText: "UnSelect All",
    itemsShowLimit: 3,
    allowSearchFilter: true
  };
  constructor(
    private sharedService:SharedService,
    private authService:AuthService,
    private attendanceService : AttendanceService,
    private cityService: CityService,
    private fb : FormBuilder,
    private router : Router
  ) {
    this.attendanceForm = fb.group({
      attendance_date : ['', Validators.required],
      cities:['', Validators.required],
      title:['', Validators.required],
      description:['',Validators.required],
      place:['', Validators.required],
      venue:['',Validators.required]
    })
   }

  ngOnInit() {
    this.getCities();
    this.getEvents();
    this.attendanceService.getAllAttendance()
    .subscribe(response =>{
      this.attendanceList = response
    })
  }

  viewDetails(attendance){
    this.router.navigate(['dashboard', 'attendance', attendance.id])
  }

  getCities(){
    this.cityService.getCities().subscribe(cities =>{
      //console.log(cities)
      this.cities = cities
    })
  }

  getEvents(){
    this.attendanceService.getEvents().subscribe(events =>{
      this.events = events
    })
  }

  createAttendance(attendanceForm){
    this.attendance.attendance_date = attendanceForm.attendance_date
    this.attendance.cityIds = this.attendance.cities;
    this.attendanceService.addAttendance(this.attendance)
    .subscribe(res =>{
      this.sharedService.addToast('Success','Attendance Created.', 'success');
      this.attendanceForm.reset()
      this.attendance =  {cities: [], attendance_date : null, cityIds : [], title:'',description:'',place:'', venue:''}
      this.ngOnInit()
     
    },(err =>{
      this.sharedService.addToast('Error', 'Error Occured', 'error');
    }))
  }

  deleteAttendance(attendance){
    this.attendanceService.deleteAttendance(attendance)
    .subscribe(res => {
      this.ngOnInit()
      this.sharedService.addToast('Success', 'Deleted Attendance Successfully!.', 'success');
    }, err => {
      this.sharedService.addToast('Error', 'Error occurred!.', 'error');
    });
  }

  mapCitiesToDropDownList(cities) {
    let cityList = [];
    this.cities.forEach(item => {
      cityList.push({ item_id: item.id, item_text: item.name });
    });

    return cityList;
  }

  onItemSelected(item) {
    if (this.attendance.cities.indexOf(item.item_id) === -1) {
      this.attendance.cities.push(item.item_id);
    }
  }

  onItemDeselected(item) {
    this.attendance.cities.splice(
      this.attendance.cities.indexOf(item.item_id),
      1
    );
  }

  onSelectAll(items) {
    items.forEach(item => {
      this.onItemSelected(item);
    });
  }

  onDeselectAll(items) {
    this.attendance.cities = [];
  }

}
