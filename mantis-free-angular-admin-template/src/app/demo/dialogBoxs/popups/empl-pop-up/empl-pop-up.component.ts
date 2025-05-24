import { CommonModule } from '@angular/common';
import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-empl-pop-up',
  imports: [CommonModule],
  templateUrl: './empl-pop-up.component.html',
  styleUrl: './empl-pop-up.component.scss'
})
export class EmplPopUpComponent {
id:number
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<EmplPopUpComponent>) {
    this.id = data.id;
  }
  popupIsShown:boolean=true
  popupTitle: string = '';
  popupSubtitle: any; 
  showCloseIcon:boolean=false
  showPopup = true;
  EmplServ=inject(EmployeeService)

  deleteEmployee(){
    console.log(this.id)
    this.EmplServ.deleteEmployee(this.id).subscribe((respone:any)=>{
      console.log(respone)
      this.dialogRef.close(true); 
      window.location.reload();
 // Close the dialog and optionally send `true` to indicate success
    },(error)=>{
      console.log(error)
      this.dialogRef.close(true);  // Close the dialog and optionally send `true` to indicate success
      window.location.reload();

    })
  }


  closePopUp() {
    this.dialogRef.close(false); // You can send false or nothing to indicate cancel
  }

}
