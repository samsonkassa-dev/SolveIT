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
  public attendance = {cityId: 0, eventId : 0, attendance_date : null}
  public page = 1;
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
      city:['', Validators.required],
      event:['', Validators.required]
    })
   }

  ngOnInit() {
    this.getCities();
    this.getEvents();
    this.attendanceService.getAllAttendance()
    .subscribe(response =>{
      console.log(response)
      this.attendanceList = response
    })
  }

  viewDetails(attendance){
    this.router.navigate(['dashboard', 'attendance', attendance.id])
  }

  getCities(){
    this.cityService.getCities().subscribe(cities =>{
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
    console.log(this.attendance)
    this.attendanceService.addAttendance(this.attendance)
    .subscribe(res =>{
      this.sharedService.addToast('Success','Attendance Created.', 'success');
      this.attendanceForm.reset()
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
}
