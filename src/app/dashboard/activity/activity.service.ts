import { Injectable } from "@angular/core";
import { ApiService } from "../../shared/services/api.service";

@Injectable()
export class ActivityService {
  public endpoint = "activities";

  constructor(public apiService: ApiService) {}

  getActivities() {
    return this.apiService.get(this.endpoint);
  }

  addActivity(activity) {
    return this.apiService.post(this.endpoint, activity);
  }
  updateActivity(activity) {
    return this.apiService.put(`${this.endpoint}/${activity.id}`, activity);
  }
  deleteActivity(activity) {
    return this.apiService.delete(`${this.endpoint}/${activity.id}`);
  }
}
