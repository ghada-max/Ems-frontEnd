// Angular import

import { Component, OnInit, TemplateRef, ViewChild, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatTableDataSource,MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { EmplBoxComponent } from 'src/app/demo/dialogBoxs/empl-box/empl-box.component';
import { employee } from 'src/app/interfaces/employee';
import { EmployeeService } from 'src/app/services/employee.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EmplPopUpComponent } from 'src/app/demo/dialogBoxs/popups/empl-pop-up/empl-pop-up.component';
// Angular import


// project import


// angular import
import { CommonModule } from '@angular/common';

// project import
import tableData from 'src/fake-data/default-data.json';

import { MonthlyBarChartComponent } from 'src/app/theme/shared/apexchart/monthly-bar-chart/monthly-bar-chart.component';
import { IncomeOverviewChartComponent } from 'src/app/theme/shared/apexchart/income-overview-chart/income-overview-chart.component';
import { AnalyticsChartComponent } from 'src/app/theme/shared/apexchart/analytics-chart/analytics-chart.component';
import { SalesReportChartComponent } from 'src/app/theme/shared/apexchart/sales-report-chart/sales-report-chart.component';

// icons
import { IconService, IconDirective } from '@ant-design/icons-angular';
import { FallOutline, GiftOutline, MessageOutline, RiseOutline, SettingOutline } from '@ant-design/icons-angular/icons';
import { CardComponent } from 'src/app/theme/shared/components/card/card.component';
import { BoxDialogComponent } from 'src/app/demo/dialogBoxs/box-dialog/box-dialog.component';


@Component({
  selector: 'app-color',
  imports: [MatTableModule,MatPaginatorModule,
    CommonModule,
    CardComponent,
    IconDirective,],
  templateUrl: './color.component.html',
  styleUrl: './color.component.scss'
})
export class ColorComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['id','name', 'email', 'department', 'contact','actions'];
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





