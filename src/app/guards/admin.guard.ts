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
    if (this.adminService.isSessionExpired()) {
      localStorage.removeItem('userRole');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('sessionExpiration');
      this.router.navigate(['/admin']);
      return false;
    }
  
    const userRole = localStorage.getItem('userRole');
    if (!userRole) {
      this.router.navigate(['/admin']);
      return false;
    }
  
    if (userRole === 'Author' && state.url === '/admin-dashboard') {
      this.router.navigate(['/author-dashboard']);
      return false;
    }
  
    return true;
  }
  }

