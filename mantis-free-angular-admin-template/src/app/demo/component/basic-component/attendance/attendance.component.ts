import { Component, ViewChild, inject } from '@angular/core';
import tableData from 'src/fake-data/default-data.json';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from 'src/app/services/employee.service';
import { employee } from 'src/app/interfaces/employee';
import { AttendanceCreateRequest } from 'src/app/interfaces/attendance';
import { AttendanceService } from 'src/app/services/attendance.service';
import { error } from 'console';
import { SimplePopUpsComponent } from 'src/app/demo/dialogBoxs/popups/simple-pop-ups/simple-pop-ups.component';
@Component({
  selector: 'app-attendance',
  imports: [MatTableModule, MatPaginatorModule,
    CommonModule,
    MatTableModule,
    FormsModule,
    MatPaginatorModule,
    MatTooltipModule],
  templateUrl: './attendance.component.html',
  styleUrl: './attendance.component.scss'
})
export class AttendanceComponent {
  selectedStatus: string ; // default value

  displayedColumns: string[] = ['id', 'name', 'clockIn', 'clockOut', 'status', 'markedBy'];
  dataSource = new MatTableDataSource<employee>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit()

    : void {

    this.getAllEmployees();


  }

  employeesList: employee[] = []
  empl!: employee; // means: I will assign it later

  dialogRef!: MatDialogRef<any>;
  readonly dialog=inject(MatDialog)

  markedBy: string = "HR sofia"
  filterEmployees() { }
  emplServ = inject(EmployeeService)

  getAllEmployees() {
    this.emplServ.getAllEmployees().subscribe({
      next: (data: any) => {
        const filteredEmployees = data.map((emp: any) => ({
          id: emp.id,

          name: emp.name,
          email: emp.email,
          status: true,
          department: emp.departmentid,
          contact: emp.contact,
          markedBy: "HR sofia",

        }));
        this.employeesList = filteredEmployees;
        console.log("employeeslist: ");
        console.log(this.employeesList)

      },
      error: (err) => console.error('Error fetching employees:', err),

    });
  }
  filteredEmployeesList: employee[] = []; // For displaying after filter

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();

    this.filteredEmployeesList = this.employeesList.filter(emp =>
      emp.name.toLowerCase().includes(filterValue)
    );
  }

  clockInDone?: boolean = false
  clockOutDone?: boolean = false
  clockInTime?: Date;
  clockOutTime?: Date;
  attdnceServ = inject(AttendanceService)

  employeeClockStatus: { [key: number]: { clockInDone: boolean; clockOutDone: boolean } } = {};
  employeeStatusMap: { [key: number]: string } = {};

  markClockIn(id: number) {
      const selectedStatus = this.employeeStatusMap[id]; // ✅ get the correct status for this employee

    this.clockInDone = true
    const Attence: AttendanceCreateRequest = {
      employeeid: id,
      attendancestatus: this.selectedStatus,

    };
    this.attdnceServ.createAttendance(Attence).subscribe((response: any) => {

   
            console.log("createAttendance")
      console.log(Attence)

    }, (error) => 
      {
        this.employeeClockStatus = {
          ...this.employeeClockStatus,
          [id]: {
            clockInDone: true,
            clockOutDone: false
          }
        };
        
      console.log("error during ..")
      console.log(error)
 }
    )

  }
  msg:string;

  markClockOut(employeeid: any) {
    this.clockOutDone = true;
    this.attdnceServ.updateClockOutAttendance(employeeid).subscribe(
      (response: any) => {
        this.employeeClockStatus[employeeid] = this.employeeClockStatus[employeeid] || { clockInDone: false, clockOutDone: false };
        this.employeeClockStatus[employeeid].clockOutDone = true;
  
        this.msg = "Attendance created successfully";
        const dialogRef = this.dialog.open(SimplePopUpsComponent, {
          data: { msg: this.msg }
        });
  
        setTimeout(() => {
          dialogRef.close();
        }, 3000); // Close after 3 seconds
      },
      (error) => {
        console.log(error);
        this.employeeClockStatus = {
          ...this.employeeClockStatus,
          [employeeid]: {
            clockInDone: true,
            clockOutDone:  true
          }
        };
        
        this.msg = "Attendance created successfully";

        const dialogRef = this.dialog.open(SimplePopUpsComponent, {
          data: { msg: this.msg }
        });
  
        setTimeout(() => {
          dialogRef.close();
        }, 1000); // Close after 3 seconds
      }
    );
  }
  

}
