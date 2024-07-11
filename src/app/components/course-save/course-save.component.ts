import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Course } from 'src/app/models/course.models';
import { CourseService } from 'src/app/services/course.service';

declare var $: any;

@Component({
  selector: 'app-course-save',
  templateUrl: './course-save.component.html',
  styleUrls: ['./course-save.component.css'],
})
export class CourseSaveComponent implements OnInit {
  errorMessage: string = '';

  @Input() course: Course = new Course();
  @Output() save = new EventEmitter<any>();

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {}

  saveCourse() {
    if (this.course.courseId) {
      this.courseService.updateCourse(this.course).subscribe(
        (data) => {
          this.save.emit(data);
          $('#courseModal').modal('hide');
          this.errorMessage = '';
        },
        (err) => {
          this.handleError(err);
        },
      );
    } else {
      this.courseService.saveCourse(this.course).subscribe(
        (data) => {
          this.save.emit(data);
          $('#courseModal').modal('hide');
          this.errorMessage = '';
        },
        (err) => {
          this.handleError(err);
        },
      );
    }
  }

  handleError(err: any) {
    if (err.status === 404) {
      this.errorMessage = 'Resource not found. Please try again.';
    } else {
      this.errorMessage = 'Unexpected error occurred.';
    }
    console.error(err);
  }

  showCourseModal() {
    $('#courseModal').modal('show');
  }
}
