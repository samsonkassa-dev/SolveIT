import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable()
export class CommonService {
  public endpoint = 'cities';

  constructor(public apiService: ApiService) {

  }

  getCities() {
    return this.apiService.get(this.endpoint + `?filter={"include": "region"}`);
  }

  getRegions() {
    return this.apiService.get(`Regions/`);
  }
}
