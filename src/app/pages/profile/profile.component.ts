import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Purchase } from 'src/app/models/purchase.models';
import { RoleType } from 'src/app/models/roleType.enum';
import { User } from 'src/app/models/user.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { PurchaseService } from 'src/app/services/purchase.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  purchasList: Array<Purchase> = [];
  errorMessage: string = '';
  currentUser: User = new User();

  constructor(
    private userService: UserService,
    private purchaseService: PurchaseService,
    private authenticationService: AuthenticationService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.authenticationService.currentUser.subscribe((data) => {
      this.currentUser = data;
    });

    this.purchaseService.getAllPurchaseItems().subscribe((data) => {
      this.purchasList = data;
    });
  }

  changeRole() {
    const newRole = this.currentUser.roles.some(
      (role) => role.roleName === RoleType.ADMIN,
    )
      ? RoleType.STUDENT
      : RoleType.ADMIN;

    this.userService.changeRole(newRole).subscribe(
      () => {
        this.authenticationService.logOut();
        this.router.navigate(['/login']);
      },
      (err) => {
        this.errorMessage = 'Unexpected error occurred';
        console.log(err);
      },
    );
  }
}
