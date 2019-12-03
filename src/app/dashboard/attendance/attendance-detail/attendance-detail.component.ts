import { SharedService } from './../../../shared/services/shared.service';
import { AttendanceService } from './../attendance.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { subscribeOn } from 'rxjs/operator/subscribeOn';

@Component({
  selector: 'app-attendance-detail',
  templateUrl: './attendance-detail.component.html',
  styleUrls: ['./attendance-detail.component.css']
})
export class AttendanceDetailComponent implements OnInit {

  public attendance_id;
  public attendance :any;
  public participants = []
  public backupParticipants = []
  public key = '';
  constructor(
    public activatedRoute: ActivatedRoute,
    public attendanceService: AttendanceService,
    public sharedService: SharedService,
    public Router: Router
  ) { 
    this.attendance_id = this.activatedRoute.snapshot.paramMap.get("attendance_id");
  }

  ngOnInit() {
    this.getAttendance()

  }
  onSearch($event) {
    if (this.key !== '' && this.participants.length > 0) {
      this.participants = this.backupParticipants.filter(item => item.participant.firstName.toUpperCase().indexOf(this.key.toUpperCase()) !== -1 || item.participant.lastName.toUpperCase().indexOf(this.key.toUpperCase()) !== -1);
  } else if (this.key === '') {
      this.participants = this.backupParticipants;
    }
  }
  getAttendance(){
    this.attendanceService.getAttendance(this.attendance_id)
    .subscribe(attendance => {
      this.attendance = attendance
      //console.log(attendance)
      this.participants = attendance.participants
      this.backupParticipants =attendance.participants
    })
  }

  save(){
    //console.log(this.attendance)
    this.attendanceService.updateAttendance(this.attendance)
    .subscribe(attendance =>{
      this.sharedService.addToast('Success','Attendance Created.', 'success');

    },(error)=>{
      this.sharedService.addToast('Error', 'Error Occured', 'error');
    })
  }

}
