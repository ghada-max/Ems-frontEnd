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

@Component({
  selector: 'app-default',
  imports: [MatTableModule,MatPaginatorModule,
    CommonModule,
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatTooltipModule,

  ],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss'
})
export class EmployeeComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
    staus:boolean
  displayedColumns: string[] = ['id','name', 'email', 'department','status', 'contact','actions'];
  dataSource = new MatTableDataSource<employee>();
  employeesList:employee[]=[]
  empl!: employee; // means: I will assign it later
  employeeForm:FormGroup=new FormGroup({
    id: new FormControl(''),

    name: new FormControl(''),
    department: new FormControl(''),
    email:new FormControl(''),
    contact:new FormControl('')
  })
  dialogRef!: MatDialogRef<any>;
  private iconService = inject(IconService);

  // constructor
  constructor(private emplServ: EmployeeService) {
    this.iconService.addIcon(...[RiseOutline, FallOutline, SettingOutline, GiftOutline, MessageOutline]);
  }

  recentOrder = tableData;

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

    this.getAllEmployees();

  }
  //emplServ=inject(EmployeeService)

  
  getAllEmployees() {
    this.emplServ.getAllEmployees().subscribe({
      next: (data: any) => {
        const filteredEmployees = data.map((emp: any) => ({
          id: emp.id,

          name: emp.name,
          email: emp.email,
          status:true,
          department: emp.departmentid,
          contact: emp.contact,
        }));
        this.dataSource.data = filteredEmployees;
        console.log(filteredEmployees);
      },
      error: (err) => console.error('Error fetching employees:', err),
    });
  }
  
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
  
  
    });

  
  }
  EditEmployee(id:number,emp:employee){
    this.dialog.open(BoxDialogComponent, {
  data:{
   id:id ,
   emp:emp,
   edit:this.edit
      }
  });
  console.log(emp)

}


  deleteEmployee(id:number){
    console.log( "id:",id)
    this.dialog.open(EmplPopUpComponent, {
      data: {
        id: id,
      }
    });
  }



   

}





