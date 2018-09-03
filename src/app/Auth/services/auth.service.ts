import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import { ApiService } from '../../shared/services/api.service';

@Injectable()
export class AuthService {

  public TOKEN = 'access_token';
  public SESSION = 'session';
  public user_Path = 'UserAccounts';
  public login_path = 'UserAccounts/login';
  public logout_path = 'UserAccounts/logout';
  public register_path = 'UserAccounts/register-participants';
  public ICOG_ROLE = [
    'solve-it-mgt',
    'solve-it-team',
    'solve-it-participants',
    'admin'
  ];

  constructor (public router: Router, public apiService: ApiService) {
  }

  setSession(data: any) {
    this.getUserRole(data.userId)
      .subscribe(res => {
        console.log('Role', res);
        data['role'] = res.name;
        window.localStorage.setItem(this.TOKEN, JSON.stringify(data));
      });
  }

  isTokenExpired(key: string) {
    try {
      const data = JSON.parse(window.localStorage.getItem(key));
      if (data != null) {
        const exp_date = new Date(data.created);
        exp_date.setDate(exp_date.getDate() + data.ttl / (60 * 60 * 24));
        return exp_date < new Date();
      } else {
        return true;
      }
    } catch (e) {
      return true;
    }
  }

  login(user) {
    return this.apiService.post(`${this.login_path}`, user);
  }

  getUserRole(id) {
    return this.apiService.get(`${this.user_Path}/${id}/role`);
  }

  getUserInfo() {
    const temp = window.localStorage.getItem(this.TOKEN);
    if (temp != null) {
      const session = JSON.parse(temp);
      return this.apiService.get(`UserAccounts/${session.userId}`);
    }
  }

  signOut() {
    if (this.isAuthenticated()) {
      // remove token from the server
      window.localStorage.removeItem(this.TOKEN);
    }
  }

  register(user) {
    return this.apiService.post(`${this.register_path}`, user);
  }

  isAuthenticated(): boolean {
    try {
     return !this.isTokenExpired(this.TOKEN);
    } catch (e) {
      return false;
    }
  }

  isSolveitManager() {
    try {
      const data = JSON.parse(window.localStorage.getItem(this.TOKEN));
      return data.role === this.ICOG_ROLE[0];
    } catch (e) {
      return false;
    }
  }

  isSolveitTeam() {
    try {
      const data = JSON.parse(window.localStorage.getItem(this.TOKEN));
      return data.role === this.ICOG_ROLE[1];
    } catch (e) {
      return false;
    }
  }

  isSolveitParticipant() {
    try {
      const data = JSON.parse(window.localStorage.getItem(this.TOKEN));
      return data.role === this.ICOG_ROLE[2];
    } catch (e) {
      return false;
    }
  }
}
