import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ToolTipIconComponent } from '../../tool-tip-icon/tool-tip-icon.component';

@Component({
  selector: 'app-dynamic-input',
  templateUrl: './dynamic-input.component.html',
  styleUrls: ['./dynamic-input.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    ToolTipIconComponent
  ],
})
export class DynamicInputComponent implements OnInit {
  @Input() label!: string;
  @Input() placeholder!: string;
  @Input() control!: FormControl;
  @Input() isInvalid: boolean = false;
  @Input() errorMessageRequired: string = 'Questo campo è obbligatorio';
  @Input() errorMessageInvalid: string = 'Questo valore esiste già';
  @Input() invalidKey: string = 'exist';
  @Input() isSmall: boolean = false;
  @Input() tooltipHelp: string = '';

  constructor() {}

  ngOnInit(): void {
    if (!this.control) {
      this.control = new FormControl('', Validators.required);
    }
  }
}
