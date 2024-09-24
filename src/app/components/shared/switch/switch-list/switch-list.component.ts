import { CommonModule } from '@angular/common';
import { Component, Input, signal } from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

@Component({
  selector: 'app-switch-list',
  templateUrl: './switch-list.component.html',
  styleUrls: ['./switch-list.component.scss'],
  standalone: true,
  imports: [
    MatExpansionModule,
    CommonModule,
    MatSlideToggleModule
  ]
    

})
export class SwitchListComponent {
  @Input() modules: any[] = [];
  @Input() title: string = 'Moduli*';
  @Input() expanded = false;
  @Input() isTouched = signal(false);
  panelOpen: boolean = true;

  isLast(index: number, array: any[]): boolean {
    return index === array.length - 1;
  }

  onSelect(module: any, modulesList: any[]): void {
    this.isTouched.set(true);
    module.selected = !module.selected;
  }
}
