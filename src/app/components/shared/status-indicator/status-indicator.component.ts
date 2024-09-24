import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ClientState, ClientStateDescriptions } from 'src/app/core/enums/client-state';

@Component({
  selector: 'app-status-indicator',
  templateUrl: './status-indicator.component.html',
  styleUrls: ['./status-indicator.component.scss'],
  standalone: true,
  imports: [CommonModule, MatIconModule, MatTooltipModule]
})
export class StatusIndicatorComponent {
  @Input() stato: string = ClientState.Activated;
  icon = 'check_circle';

  getStatusClass(): {icon: string, class: string, description: string, fill: boolean} {
    switch(this.stato) {
      case ClientState.Activated: return {class:'status-active', icon: 'check_circle', description: ClientStateDescriptions[this.stato], fill: false};
      case ClientState.Step1: return {class:'status-step1', icon: 'error', description: ClientStateDescriptions[this.stato], fill: false};
      case ClientState.Step2: return {class:'status-step2', icon: 'error', description: ClientStateDescriptions[this.stato], fill: false};
      case ClientState.Step3: return {class:'status-step3', icon: 'warning', description: ClientStateDescriptions[this.stato], fill: false};
      case ClientState.Activating: return {class:'status-in-active', icon: 'schedule', description: ClientStateDescriptions[this.stato], fill: false};
      case ClientState.Paused: return {class:'status-paused', icon: 'pause_circle', description: ClientStateDescriptions[this.stato], fill: false};
      case ClientState.Expired: return {class:'status-expired', icon: 'error', description: ClientStateDescriptions[this.stato], fill: false};
      default: return {class:'status-active', icon: 'alarm_smart_wake', description: 'Attivo', fill: true};
    }
  }
}
