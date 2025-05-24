// empl-box.component.ts

import { CommonModule } from '@angular/common';
import { Component, Inject, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { employee } from 'src/app/interfaces/employee';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-empl-box',
  // If you want this component to be standalone, add `standalone: true` here.
  // Otherwise, remove `imports` and ensure ReactiveFormsModule is imported in your NgModule.
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './empl-box.component.html',
  styleUrls: ['./empl-box.component.scss']
})
export class EmplBoxComponent {
  isEditing: true;
id:number;
emp:employee

  // Properly declare a constructor that injects MAT_DIALOG_DATA and MatDialogRef
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<EmplBoxComponent>
  ) {
    this.id=data.id;
    this.emp=data.emp;
    this.isEditing=data.isEditing
    this.isEditing=data.edit
    console.log('id', this.id);


  }

  popupTitle: string = '';
  popupSubtitle: any;
  showCloseIcon = false;

  employeeForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    departmentid: new FormControl(''),
    email: new FormControl(''),
    contact: new FormControl('')
  });

  // Inject EmployeeService and MatDialog if you need to open other dialogs
  private EmplServ = inject(EmployeeService);

  // If you need MatDialog inside this component, uncomment the following:
  // private dialog = inject(MatDialog);
  ngOnInit(): void {
    // If “emp” exists (i.e. we’re in Edit mode), patch the form:
    if (this.emp) {
      this.employeeForm.patchValue({
        id:           this.emp.id,
        name:         this.emp.name,
        departmentid: this.data.emp.department.toString(), // must be string
        email:        this.emp.email,
        contact:      this.emp.contact
      });
    }
  }
  showPopUp(title: string, subtitle: string) {
    this.popupTitle = title;
    this.popupSubtitle = subtitle;

    const modal = document.getElementById('popup');
    if (modal) {
      modal.hidden = false;
      modal.style.display = 'block';
    }
    setTimeout(() => {
      const m = document.getElementById('popup');
      if (m) {
        m.hidden = true;
      }
    }, 3000);
  }

  // Call this when you want to close the dialog (e.g. Cancel or after saving)
  closePopUp() {
    this.dialogRef.close(false);
  }

  OnSaveEmployee() {
    if (this.employeeForm.valid) {
      this.EmplServ.createEmployee(this.employeeForm.value).subscribe(
        (response: any) => {
          this.showCloseIcon = true;
          console.log('Employee saved:', response);
          this.showPopUp('Employee Created Successfully', 'Employee has been added to the system');
          window.location.reload();
        },
        (error) => {
          console.error('Error:', error);
          this.showPopUp('Error during Creating', error);window.location.reload();

        }
      );
    } else {
      console.warn('Form is invalid!');
    }
  }

  OnEditEmployee() {
    const updatedEmployee = this.employeeForm.value;
    console.log(updatedEmployee)

    this.EmplServ.updateEmployee(this.id,updatedEmployee).subscribe((response:any)=>{
      this.dialogRef.close(true);  // Close the dialog and optionally send `true` to indicate success
      window.location.reload();

    },(error)=>{
      this.dialogRef.close(true);  // Close the dialog and optionally send `true` to indicate success

      console.log(error,"")
      window.location.reload();

    })
  }

  OnAddEmployee(){
    console.log("employee:"+this.isEditing,this.emp)
    window.location.reload();

  }
}
