import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  APIurl="http://localhost:8676/api/Ems/attendance"
  constructor(private http:HttpClient) { }

  createAttendance(data:any){
    console.log('Calling API(create)...');

    return this.http.post(this.APIurl+"/createAttendance",data)
  }

  updateClockOutAttendance(employeeid:any){

    return this.http.post(this.APIurl + "/updateOutClock?employeeid=" + employeeid, null);
  }
  
}
