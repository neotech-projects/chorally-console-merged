import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-tool-tip-icon',
  templateUrl: './tool-tip-icon.component.html',
  styleUrls: ['./tool-tip-icon.component.scss'],
  standalone: true,
  imports: [CommonModule, MatTooltipModule, MatIconModule],
})
export class ToolTipIconComponent {
  @Input() tooltipHelp: string = '';
  @Input() icon: string = 'help_outline';
}
