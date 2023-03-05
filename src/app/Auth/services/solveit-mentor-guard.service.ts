import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs';

@Injectable()
export class SolveitMentorGuardService implements CanActivate {

  constructor(public authService: AuthService, public router: Router) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.isAuthenticated() && this.authService.isSolveitMentor()) {
      return true;
    } else {
      this.router.navigate(['']);
      return false
    }
  }
}
