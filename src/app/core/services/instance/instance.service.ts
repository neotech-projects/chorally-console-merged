import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigService } from '../../configs/config.service';
import { InstanceModel } from '../../models/instance/instance.model';

@Injectable({
  providedIn: 'root'
})
export class InstanceService {

  public _url = this._configService.config.baseUrl + '/package/api/v1';

  constructor(private _httpClient: HttpClient, private _configService: ConfigService) { }

  getInstances(): Observable<InstanceModel[]>{
    return this._httpClient.get<InstanceModel[]>(`${this._url}/instances`);
  }

  getInstance(id: string): Observable<InstanceModel> {
    return this._httpClient.get<InstanceModel>(`${this._url}/instances/${id}`);
  }

  addInstance(clientData: InstanceModel,packageId: string): Observable<InstanceModel> {
    return this._httpClient.post<InstanceModel>(`${this._url}/instances/${packageId}`, clientData);
  }

  updateInstance(clientData: InstanceModel): Observable<InstanceModel> {
    return this._httpClient.patch<InstanceModel>(`${this._url}/instances/${clientData.id}`, clientData);
  }

  deleteInstance(id: string) {
    return this._httpClient.delete(`${this._url}/instances/${id}`);
  }

  
  activateInstance(id: string) {
    return this._httpClient.put(`${this._url}/activate/${id}`, {});
  }
  

  pauseInstance(id: string) {
    return this._httpClient.put(`${this._url}/pause/${id}`, {});
  }

  assignInstance(id: string, packageId: string) {
    return this._httpClient.patch(`${this._url}/instances/${id}/${packageId}`, {});
  }

  updateExpiryDate(id: number, expiryDate: string) {
    return this._httpClient.put(`${this._url}/instances/${id}?expiryDate=${expiryDate}`, {});
  }
  
  assignClientToPackage(accountId: string, packageId: string) {
    return this._httpClient.patch(`${this._url}/instances/${accountId}/${packageId}`, {});
  }

}
