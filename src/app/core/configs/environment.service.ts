import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnvironmentService {
  private _env: any;

  get environment(): any {
    return this._env;
  }

  setEnv(env: any) {
    this._env = { ...env };
  }

  isInitialized(): boolean {
    return !!this._env;
  }

  constructor() { }
}
