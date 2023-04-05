import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';

import { AdminService } from '../services/admin.service';




@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  
  constructor(private adminService: AdminService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log('AdminGuard: checking authentication...');
    return this.adminService.isAuthenticated().pipe(
      map(authenticated => {
        console.log('AdminGuard: isAuthenticated', authenticated);
        if (authenticated) {
          console.log('AdminGuard: authentication successful');
         
          return true;
        } else {
          console.log('AdminGuard: authentication failed, redirecting to /admin');
          this.router.navigate(['/admin']); // Redirect to the login page if not authenticated
          return false;
        }
      })
    );
  }
}
