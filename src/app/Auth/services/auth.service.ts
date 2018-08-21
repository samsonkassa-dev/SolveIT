import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {tokenNotExpired} from 'angular2-jwt';
import { ApiService } from '../../shared/services/api.service';

@Injectable()
export class AuthService implements CanActivate{

  public TOKEN = 'access_token';
  public SESSION = 'session';
  public login_path = 'UserAccounts/logout';
  public logout_path = 'logout';
  public register_path = 'register';

  constructor (public router: Router, public apiService: ApiService) {

  }
  setInfo(token: string, session: string) {
    window.localStorage.setItem(this.TOKEN, token);
    window.localStorage.setItem(this.SESSION, session);
  }

  login(user) {
    return this.apiService
      .post(`${this.login_path}`, user);
  }

  signOut() {
    if (this.isAuthenticated()) {
      this.apiService.post(`${this.logout_path}`, '')
        .subscribe(
          res => {
            window.localStorage.removeItem(this.TOKEN);
            window.localStorage.removeItem('username');
            this.router.navigate(['', 'login']);
          }
        );
    }
  }

  register(user) {
    return this.apiService.post(`${this.register_path}`, user);
  }

  isAuthenticated(): boolean {
    try {
      return tokenNotExpired(this.TOKEN);
    } catch (e) {
      return false;
    }

  }

  canActivate(): boolean {
    const isAuth = this.isAuthenticated();

    if (!isAuth) {
      this.router.navigate(['', 'login']);
    }

    return isAuth;
  }

}
