import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LeaveService {
  APIurl="http://localhost:8674/api/Ems/leaves"

  constructor(private http:HttpClient) { }
  getLeaveById(id:number){
    console.log('Calling API...');

    return this.http.get(this.APIurl+"/getALlLeaves?id="+id)
  }
}

