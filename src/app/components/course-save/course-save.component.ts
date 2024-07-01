import { Component, EventEmitter, Output } from '@angular/core';
import { Course } from 'src/app/models/course.models';
import { CourseService } from 'src/app/services/course.service';

declare var $: any;

@Component({
  selector: 'app-course-save',
  templateUrl: './course-save.component.html',
  styleUrls: ['./course-save.component.css']
})
export class CourseSaveComponent {
  course: Course = new Course();
  errorMessage: string = "";

  @Output() save = new EventEmitter<any>();

  constructor(private courseService: CourseService) { }

  saveCourse() {
    this.courseService.saveCourse(this.course).subscribe(data => {
      this.save.emit(data);
      $('#courseModal').modal('hide');
    }, err => {
      this.errorMessage = "Unexpected error occurred.";
      console.log(err);
    });
  }

  showCourseModal() {
    $('#courseModal').modal('show');
  }

  isPriceInvalid(): boolean {
    return this.course.price <= 0;
  }
}
