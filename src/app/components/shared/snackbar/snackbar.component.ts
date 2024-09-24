import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule, MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss'],
  standalone: true,
  imports: [MatButtonModule, MatSnackBarModule, MatIconModule]
})
export class SnackbarComponent {
  snackBarRef = inject(MatSnackBarRef);
  message = 'Message';
  type = 'success';
  duration = 5_000;

  constructor() {
    this.message = this.snackBarRef.containerInstance.snackBarConfig.data?.message || this.message;
    this.type = this.snackBarRef.containerInstance.snackBarConfig.data?.type || this.type;
    this.snackBarRef.containerInstance.snackBarConfig.duration = this.duration;
    
  }

}
