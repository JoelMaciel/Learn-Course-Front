import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { User } from 'src/app/models/user.model';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User = new User();
  faUser = faUserCircle;
  errorMessage: string = "";

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.authenticationService.currentUserValue?.userId) {
      this.router.navigate(["/profile"])
      return;
    }
  }

login() {
  this.authenticationService.login(this.user).subscribe(data => {
    console.log('Token JWT recebido:', data.token);
    this.router.navigate(['/profile']);
  }, err => {
    this.errorMessage = 'Username or Password is incorrect.';
    console.error('Erro durante o login:', err);
  });
 }
}
