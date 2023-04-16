import { AdminService } from './../services/admin.service';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable, tap, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private adminService: AdminService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.adminService.isAuthenticated().pipe(
      tap(isAuthenticated => {
        if (!isAuthenticated) {
          this.router.navigate(['/admin']);
        }
      }),
      map(isAuthenticated => {
        if (isAuthenticated) {
          const userRole = localStorage.getItem('userRole');
          if ((userRole === 'Author' && state.url === '/admin-dashboard') || 
              (userRole === 'Admin' && state.url === '/author-dashboard')) {
            this.router.navigate(['/admin']); // Redirect to the login page if the user tries to access the wrong dashboard
            return false;
          }
          return true;
        }
        return false;
      })
    );
  }
}
