import { Component, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm_dialog',
  templateUrl: './confirm_dialog.component.html',
  styleUrls: ['./confirm_dialog.component.scss'],
})
export class ConfirmDialogComponent {
  message: string = 'Are you sure?';
  confirmButtonText = 'Yes';
  cancelButtonText = 'Cancel';
  
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    public dialogRef: MatDialogRef<ConfirmDialogComponent>
  ) {}

  onConfirmClick(): void {
    this.dialogRef.close(true);
  }
}
