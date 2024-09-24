import { Component, signal } from '@angular/core';
import { SupportService } from './core/services/support/support.service';
import * as FUNCTIONS from 'src/app/core/constants/functions';
import * as MODULS from 'src/app/core/constants/modules';

@Component({
  selector: 'app-root',
  template: '<router-outlet />',
  styles: [],
})
export class AppComponent {
  title = 'console-frontend';
  constructor(private _supportService: SupportService) {
    this._supportService.getFunctions().subscribe((functions) => {
      functions.forEach((f) => FUNCTIONS.list.push(f));
    });
    this._supportService.getModules().subscribe((modules) => {
      modules.forEach((m) => MODULS.list.push(m));
    });
  }
}
