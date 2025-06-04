import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DepartmentServiceService {
  APIurl="http://localhost:8764/api/Ems/Department"

  constructor(private http:HttpClient) { }
    getAllDepartments(){  console.log('Calling API...');

    return this.http.get(this.APIurl+"/getAllDepartments")
  }
}
