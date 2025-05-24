import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
   APIurl="http://localhost:8673/api/Ems"
  constructor(private http:HttpClient) { }
  getAllEmployees(){
    console.log('Calling API...');

    return this.http.get(this.APIurl+"/getAllEmployee")
  }

  createEmployee(data:any){
    console.log('Calling API(create)...');

    return this.http.post(this.APIurl+"/createEmployee",data)
  }

  deleteEmployee(id:number){
    return this.http.delete(`${this.APIurl}/deleteEmployee/${id}`);
  }
  updateEmployee(id: number, empl: any) {
    return this.http.post(`${this.APIurl}/updateEmployee/${id}`, empl, { responseType: 'text' });
  }
  
}
