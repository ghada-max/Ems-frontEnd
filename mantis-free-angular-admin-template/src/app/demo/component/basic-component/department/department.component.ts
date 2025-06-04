import { Component, ViewChild, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatTableDataSource,MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { employee } from 'src/app/interfaces/employee';
import { EmployeeService } from 'src/app/services/employee.service';
import { EmplPopUpComponent } from 'src/app/demo/dialogBoxs/popups/empl-pop-up/empl-pop-up.component';
import { CommonModule } from '@angular/common';

import tableData from 'src/fake-data/default-data.json';

import { IconService } from '@ant-design/icons-angular';
import { FallOutline, GiftOutline, MessageOutline, RiseOutline, SettingOutline } from '@ant-design/icons-angular/icons';
import { BoxDialogComponent } from 'src/app/demo/dialogBoxs/box-dialog/box-dialog.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { department } from 'src/app/interfaces/department';
import { DepartmentServiceService } from 'src/app/services/department-service.service';

@Component({
  selector: 'app-department',
  imports: [MatTableModule,MatPaginatorModule,
    CommonModule,
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatTooltipModule,

  ],  templateUrl: './department.component.html',
  styleUrl: './department.component.scss'
})
export class DepartmentComponent {
recentOrder = [
  { id: 'TRK001', name: 'Website Redesign', status: 'In Progress', status_type: 'badge-warning', quantity: 5, amount: '2025-06-30' },
  { id: 'TRK002', name: 'Mobile App Launch', status: 'Completed', status_type: 'badge-success', quantity: 8, amount: '2025-04-15' },
  { id: 'TRK003', name: 'Cloud Migration', status: 'Pending', status_type: 'badge-secondary', quantity: 3, amount: '2025-08-01' },
  { id: 'TRK004', name: 'Security Audit', status: 'In Progress', status_type: 'badge-warning', quantity: 6, amount: '2025-07-20' },
  { id: 'TRK005', name: 'ERP Implementation', status: 'Completed', status_type: 'badge-success', quantity: 10, amount: '2025-03-10' },
  { id: 'TRK006', name: 'Data Warehouse Setup', status: 'In Progress', status_type: 'badge-warning', quantity: 4, amount: '2025-09-15' },
  { id: 'TRK007', name: 'CRM Integration', status: 'Pending', status_type: 'badge-secondary', quantity: 7, amount: '2025-10-01' },
  { id: 'TRK008', name: 'DevOps Pipeline', status: 'Completed', status_type: 'badge-success', quantity: 5, amount: '2025-05-05' },
];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
    staus:boolean
  displayedColumns: string[] = ['id','name', 'status','actions'];
  dataSource = new MatTableDataSource<employee>();
  departmentlist:department[]=[]
  dprtmnt!: department; // means: I will assign it later
  departmentForm:FormGroup=new FormGroup({
    id: new FormControl(''),

    name: new FormControl(''),
    
  })
  dialogRef!: MatDialogRef<any>;
  private iconService = inject(IconService);

  // constructor
  constructor(private dprtmntService: DepartmentServiceService) {
    this.iconService.addIcon(...[RiseOutline, FallOutline, SettingOutline, GiftOutline, MessageOutline]);
  }


  readonly dialog=inject(MatDialog)
  edit=false


  openDialog():void{
    {
      this.dialog.open(BoxDialogComponent, {
    data:{
      edit:!this.edit

        }
    });
  }  
}

 

  ngOnInit()
  
  : void {
    this.staus= true;

    this.getAllDepartments();

  }
  //emplServ=inject(EmployeeService)



  getAllDepartments() {
    this.dprtmntService.getAllDepartments().subscribe({
      next: (response: any[]) => {
        // Do what you want with the departments here
        console.log("Departments:", response);
        // For example, if you're using it in a dropdown:
        this.dataSource.data = response;
      },
      error: (err) => console.error('Error fetching departments:', err)
    });
  }
  
  
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
  
  
    });

  
  }
  EditDepartment(id:number,dprtmnt:department){
    this.dialog.open(BoxDialogComponent, {
  data:{
   id:id ,
   dprtmnt:dprtmnt,
   edit:this.edit
      }
  });

}


  deleteDepartment(id:number){
    console.log( "id:",id)
    this.dialog.open(EmplPopUpComponent, {
      data: {
        id: id,
      }
    });
  }



   

}





