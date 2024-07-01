import { Component } from '@angular/core';
import { User } from './models/user.model';
import { AuthenticationService } from './services/authentication.service';
import { Router } from '@angular/router';
import { RoleType } from './models/roleType.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  currentUser: User = new User;

  constructor(private authenticationService: AuthenticationService, private router: Router){
    this.authenticationService.currentUser.subscribe(data => {
      this.currentUser = data;
       console.log('Usuário atual:', this.currentUser);
    })
  }

isAdmin(): boolean {
  if (this.currentUser?.roles) {
    return this.currentUser.roles.some(role => role.roleName.includes(RoleType.ADMIN));
  }

  return false;
}


  logOut() {
    this.authenticationService.logOut();
    this.router.navigate(["/login"]);
  }
}
