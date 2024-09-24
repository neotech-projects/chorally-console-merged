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
import { MatSelectModule } from '@angular/material/select';
import { ToolTipIconComponent } from '../../tool-tip-icon/tool-tip-icon.component';

@Component({
  selector: 'app-dynamic-select',
  templateUrl: './dynamic-select.component.html',
  styleUrls: ['./dynamic-select.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    ToolTipIconComponent
  ],
})
export class DynamicSelectComponent implements OnInit {
  @Input() label!: string;
  @Input() placeholder!: string;
  @Input() control!: FormControl;
  @Input() options!: { value: string; description: string }[];
  @Input() errorMessageRequired: string = 'Questo campo è obbligatorio';
  @Input() isSmall: boolean = false;
  @Input() tooltipHelp: string = '';

  constructor() {}

  ngOnInit(): void {
    if (!this.control) {
      this.control = new FormControl('', Validators.required);
    }
  }
}
