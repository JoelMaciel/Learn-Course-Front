import { Component, OnInit } from '@angular/core';
import { faUserGraduate } from '@fortawesome/free-solid-svg-icons';
import { Course } from 'src/app/models/course.models';
import { Purchase } from 'src/app/models/purchase.models';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CourseService } from 'src/app/services/course.service';
import { PurchaseService } from 'src/app/services/purchase.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  courseList: Array<Course> = [];
  faUserGraduate = faUserGraduate;
  errorMessage: string = '';
  infoMessage: string = '';

  constructor(
    private authenticationService: AuthenticationService,
    private courseService: CourseService,
    private purchaseService: PurchaseService,
  ) {}

  ngOnInit(): void {
    this.courseService.getAllCourses().subscribe((data) => {
      this.courseList = data;
    });
  }

  purchase(item: Course) {
    if (!this.authenticationService.currentUserValue?.sub) {
      this.errorMessage = 'You should login to buy a course';
      return;
    }

    const purchase = new Purchase(
      this.authenticationService.currentUserValue.sub,
      item.courseId,
      item.title,
      item.price,
    );

    this.purchaseService.savePurchase(purchase).subscribe(
      (data) => {
        this.infoMessage = 'Mission is completed';
      },
      (err) => {
        this.errorMessage = 'Unexpected error ocurred';
        console.log(err);
      },
    );
  }
}
