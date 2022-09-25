import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad, CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean {

    // if (this.authService.auth.id) {
    //   return true;
    // }
    // console.log('locked by authGuard - canActivate');
    // return false;
    return this.authService.checkAuth()
      .pipe(
        tap(
          isAuthenticate => {
            if (!isAuthenticate) {
              this.router.navigate(['./auth/login']);
            }
          }
        )
      )


  }

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean> | Promise<boolean> | boolean {



    return this.authService.checkAuth()
    .pipe(
      tap(
        isAuthenticate => {
          if (!isAuthenticate) {
            this.router.navigate(['./auth/login']);
          }
        }
      )
    )


    // return this.authService.checkAuth();

    // if (this.authService.auth.id) {
    //   return true;
    // }
    // console.log('locked by authGuard - canLoad');
    // return false;
  }

}
