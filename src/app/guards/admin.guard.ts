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
    console.log('AdminGuard: checking authentication...');
    return this.adminService.isAuthenticated().pipe(
      tap(isAuthenticated => {
        console.log('AdminGuard: isAuthenticated', isAuthenticated);

        if (!isAuthenticated) {
          console.log('AdminGuard: authentication failed, redirecting to /admin');
          this.router.navigate(['/admin']);
        }
      }),
      map(isAuthenticated => {
        if (isAuthenticated) {
          let result = true;

          this.adminService.getRole().subscribe(userRole => {
            if (userRole === 'Author' && state.url === '/admin-dashboard') {
              console.log('AdminGuard: author trying to access admin dashboard, redirecting');
              this.router.navigate(['/author-dashboard']);
              result = false;
            }
          });

          return result;
        }

        return false;
      })
    );
  }
}
