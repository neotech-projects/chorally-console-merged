import { Injectable, Injector } from '@angular/core';
import { ENV } from '../../../main';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  public config: any;

  constructor(private injector: Injector) {}

  init() {
    this.config = this.injector.get(ENV);
    return Promise.resolve();
  }

}
