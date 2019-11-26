import {Injectable} from '@angular/core';
import {ApiService} from '../../shared/services/api.service';

@Injectable()

export class AttendanceService {

  public endpoint = 'attendances';

  constructor(public apiService: ApiService) {

  }
  getEvents(){
    return this.apiService.get(`events`);
  }

  getAllAttendance(){
    return this.apiService.get(`${this.endpoint}?filter={"include": ["cities","event"]}`);
  }

  getAttendance(attendance_id){
    return this.apiService.get(`${this.endpoint}/${attendance_id}?filter={"include": ["city","event"]}`)
  }
  addAttendance(attendance) {
    return this.apiService.post(this.endpoint, attendance);
  }
  updateAttendance(attendance){
    return this.apiService.put(`${this.endpoint}/${attendance.id}`,attendance);
  }
  deleteAttendance(attendance) {
    return this.apiService.delete(`${this.endpoint}/${attendance.id}`);
  }

  getRegions() {
    return this.apiService.get(`Regions/`);
  }
}
