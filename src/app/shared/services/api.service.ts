import {Injectable} from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import {configs} from '../../app.config';
import {Observable} from '../../../../node_modules/rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class ApiService {

  public ROOT_PATH = configs.rootUrl;
  TOKEN_KEY = 'access_token';
  headers: Headers = new Headers({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  });

  constructor(public http: Http) {
  }

  public get(path: string): Observable<any> {
    this.setHeaders(window.localStorage.getItem(this.TOKEN_KEY));
    return this.http.get(`${this.ROOT_PATH}${path}`, {headers: this.headers})
      .map((res: Response) => res.json());

  }

  public post(path: string, body): Observable<any> {
    this.setHeaders(window.localStorage.getItem(this.TOKEN_KEY));
    return this.http.post(`${this.ROOT_PATH}${path}`, body, {headers: this.headers})
      .map((res: Response) => res.json());
  }

  public put(path: string, body): Observable<any> {
    this.setHeaders(window.localStorage.getItem(this.TOKEN_KEY));
    return this.http.put(`${this.ROOT_PATH}${path}`, body, {headers: this.headers})
      .map((res: Response) => res.json());
  }

  public delete(path: string): Observable<any> {
    this.setHeaders(window.localStorage.getItem(this.TOKEN_KEY));
    return this.http.delete(`${this.ROOT_PATH}${path}`, {headers: this.headers})
      .map((res: Response) => res.json());
  }

  public patch(path: string, body: any): Observable<any> {
    this.setHeaders(window.localStorage.getItem(this.TOKEN_KEY));
    return this.http.patch(`${this.ROOT_PATH}${path}`, body, {headers: this.headers})
      .map((res: Response) => res.json());
  }

  public setHeaders(token) {
    if (token != null) {
      this.headers.set('Authorization', 'Bearer ' + token);
    }
  }

}
