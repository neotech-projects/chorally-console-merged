import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule]
})
export class SwitchComponent {
  @Input() checked = false;
  @Input() disabled = false;
  @Input() label = '';
  @Input() control!: FormControl;

  @Output() change = new EventEmitter<boolean>();

  constructor() { }

  onToggle() {
    this.control.patchValue(!this.control.value);
    this.change.emit(this.control.value);
  }

}
