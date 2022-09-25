import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Hero } from '../../interfaces/hero.interface';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html'
})
export class ConfirmComponent implements OnInit {

  constructor(private dialogref: MatDialogRef<ConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Hero) { }

  ngOnInit(): void {
    console.log(this.data);
  }

  delete() {
    this.dialogref.close(true);
  }

  close() {
    this.dialogref.close();
  }

}
