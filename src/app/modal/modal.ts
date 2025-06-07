import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-modal',
  imports: [CommonModule,
    MatDialogModule,
    MatButtonModule, ReactiveFormsModule],
  templateUrl: './modal.html',
  styleUrl: './modal.scss'
})
export class Modal {
  dialogRef = inject(MatDialogRef<Modal>);
  private _data = inject(MAT_DIALOG_DATA);
  data: { firstname: string, lastname: string, username: string } = this._data;


  form = new FormGroup({
    firstname: new FormControl(this._data.firstname),
    lastname: new FormControl(this._data.lastname),
    username: new FormControl(this._data.username),
  });

  onClose(): void {
    this.dialogRef.close(); 
  }

  onValidate(): void {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value); 
    }
  }
}
