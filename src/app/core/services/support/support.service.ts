import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../../configs/config.service';
import { FunctionToggleModel } from '../../models/function-toggle/function-toggle.model';
import { ModuleToggleModel } from '../../models/module-toggle/module-toggle.model';

@Injectable({
  providedIn: 'root',
})
export class SupportService {
  private _url = this._configService.config.baseUrl + '/package/api/v1';

  constructor(
    private _httpClient: HttpClient,
    private _configService: ConfigService
  ) {}

  getFunctions(): Observable<FunctionToggleModel[]> {
    return this._httpClient.get<FunctionToggleModel[]>(this._url + '/functions');
  }

  getModules(): Observable<ModuleToggleModel[]> {
    return this._httpClient.get<ModuleToggleModel[]>(this._url + '/modules');
  }
}
