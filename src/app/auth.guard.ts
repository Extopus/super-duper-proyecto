import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class authGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const isAuthenticated = !!localStorage.getItem('username'); 
    if (!isAuthenticated) {
      this.router.navigate(['/access-denied']); 
      return false;
    }
    return true;
  }
}
