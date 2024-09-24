import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  standalone: true,
  imports: [MatButtonModule, CommonModule, MatTooltipModule, MatIconModule],
})
export class ButtonComponent {
  @Input() text: string = '';
  @Input() type: string = 'button';
  @Input() color: string = 'primary';
  @Input() disabled: boolean = false;
  @Input() icon: string = '';
  @Input() class = ['btn', 'btn-blue-outline-border'];
  @Input() tooltip: string = '';
  @Input() marginBottom: string = '';
  @Input() classIcon = "material-icons-outlined"
  @Input() routerLink = '';

  @Output() onClick = new EventEmitter();

  handleClick() {
    this.onClick.emit();
  }
}
