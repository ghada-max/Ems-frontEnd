import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-simple-pop-ups',
  imports: [],
  templateUrl: './simple-pop-ups.component.html',
  styleUrl: './simple-pop-ups.component.scss'
})
export class SimplePopUpsComponent {
  msg:string

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<SimplePopUpsComponent>) {
    this.msg = data.msg;
  }
 

}
