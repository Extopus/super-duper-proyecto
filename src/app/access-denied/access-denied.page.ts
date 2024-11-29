import { Component  } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-access-denied',
  templateUrl: './access-denied.page.html',
  styleUrls: ['./access-denied.page.scss'],
})
export class AccessDeniedPage {

  constructor(private router: Router) { }

 goToLogin(){
  this.router.navigate(['/login']);
 }

}
