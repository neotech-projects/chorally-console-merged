import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PackageModel } from '../../models/package/package.model';
import { Observable } from 'rxjs';
import { ConfigService } from '../../configs/config.service';

@Injectable({
  providedIn: 'root'
})
export class PackageService {

  public _url = this._configService.config.baseUrl + '/package/api/v1/packages';

  constructor(private _httpClient: HttpClient, private _configService: ConfigService) {}

  getPackages(): Observable<PackageModel[]>{
    return this._httpClient.get<PackageModel[]>(this._url);
  }

  getPackage(id: string): Observable<PackageModel> {
    return this._httpClient.get<PackageModel>(`${this._url}/${id}`);
  }

  addPackage(packageData: PackageModel): Observable<PackageModel> {
    return this._httpClient.post<PackageModel>(this._url, packageData);
  }

  updatePackage(packageData: PackageModel): Observable<PackageModel> {
    return this._httpClient.patch<PackageModel>(this._url, packageData);;
  }

  deletePackage(id: string) {
    return this._httpClient.delete(`${this._url}/${id}`);
  }
}
