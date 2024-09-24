import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ToolTipIconComponent } from '../../tool-tip-icon/tool-tip-icon.component';

@Component({
  selector: 'app-dynamic-email',
  templateUrl: './dynamic-email.component.html',
  styleUrls: ['./dynamic-email.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    FormsModule,
    ReactiveFormsModule,
    ToolTipIconComponent
  ],
})
export class DynamicEmailComponent implements OnInit {
  @Input() label!: string;
  @Input() placeholder!: string;
  @Input() control!: FormControl;
  @Input() errorMessageRequired: string = 'Questo campo è obbligatorio';
  @Input() errorMessageInvalid: string = 'Email non valida';
  @Input() isSmall: boolean = false;
  @Input() tooltipHelp: string = '';

  constructor() {}

  ngOnInit(): void {
    if (!this.control) {
      this.control = new FormControl('', [
        Validators.required,
        Validators.email,
      ]);
    }
  }
}
