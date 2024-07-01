import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { User } from 'src/app/models/user.model';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: User = new User();
  faUser = faUserCircle;
  errorMessage: string = "";

  constructor(
     private authenticationService: AuthenticationService,
     private router: Router
    ) { }

  ngOnInit(): void {
    if (this.authenticationService.currentUserValue?.userId) {
      this.router.navigate(['/profile'])
      return;
    }
  }

  register() {
    this.authenticationService.register(this.user).subscribe(
      data => {
        this.router.navigate(['/login']);
      },
      err => {
        this.handleRegistrationError(err);
      }
    );
  }

  private handleRegistrationError(err: any) {
    if (err.status === 409) {
      this.errorMessage = this.getErrorMessageByType(err.error.type, err.error.userMessage);
    } else {
      this.errorMessage = "Unexpected error occurred.";
    }
  }

  private getErrorMessageByType(type: string, userMessage: string): string {
    const errorMessages: { [key: string]: string } = {
      'EMAIL_DUPLICATE': "Email already exists.",
      'CPF_DUPLICATE': "CPF already exists."
    };
    return errorMessages[type] || userMessage || "Unexpected error occurred.";
  }
}
