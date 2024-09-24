import { Component, inject, signal } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common'; 
import {MatCheckboxModule} from '@angular/material/checkbox';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatCheckboxModule]
})
export class DialogComponent {
  dialogRef = inject(MatDialogRef);

  title = signal(this.dialogRef._containerInstance._config.data?.title || '');
  message = signal(this.dialogRef._containerInstance._config.data?.message || '');
  innerHtml = signal(this.dialogRef._containerInstance._config.data?.innerHtml || '');
  type = signal(this.dialogRef._containerInstance._config.data?.type || '');
  dissmissButton = signal(this.dialogRef._containerInstance._config.data?.dissmissButton || '');
  confirmButton = signal(this.dialogRef._containerInstance._config.data?.confirmButton || '');
  needToDoubleConfirm = signal(this.dialogRef._containerInstance._config.data?.needToDoubleConfirm || false);
  doubleConfirmLable = signal(this.dialogRef._containerInstance._config.data?.doubleConfirmLable || '');
  
  doubleConfirmValue = false;

  function() {
    if(this.dialogRef._containerInstance._config.data?.function) {
      this.dialogRef._containerInstance._config.data?.function();
    }
  }

}
