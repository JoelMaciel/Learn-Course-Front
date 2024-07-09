import { Component, OnInit, ViewChild } from '@angular/core';
import { CourseSaveComponent } from 'src/app/components/course-save/course-save.component';
import { Course } from 'src/app/models/course.models';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  courseList: Array<Course> = [];
  selectedCourse: Course = new Course();
  errorMessage: string = "";

  // @ViewChild(CourseDeleteComponent) deleteComponent: CourseDeleteComponent | undefined;
  @ViewChild(CourseSaveComponent) saveComponent: CourseSaveComponent | undefined;
  constructor(private courseService: CourseService) { }

  ngOnInit(): void {
    this.courseService.getAllCourses().subscribe(data => {
      this.courseList = data;
    });
  }

  createCourseRequest() {
    this.selectedCourse = new Course();
    this.saveComponent?.showCourseModal();
  }

  editCourseRequest(item: Course) {
    this.selectedCourse = Object.assign({}, item);
    this.saveComponent?.showCourseModal();
  }

  deleteCourseRequest(item: Course) {
    this.selectedCourse = item;
    // this.deleteComponent?.showDeleteModal();
  }

  saveCourseWatcher(course: Course) {
    let itemIndex = this.courseList.findIndex(item => item.courseId === course.courseId);

    if (itemIndex !== -1) {
      this.courseList[itemIndex] = course;
    } else {
      this.courseList.push(course);
    }
  }

  deleteCourse() {
    let itemIndex = this.courseList.findIndex(item => item.courseId === this.selectedCourse.courseId);

    this.courseService.deleteCourse(this.selectedCourse).subscribe(data => {
      this.courseList.splice(itemIndex, 1);
    }, err => {
      this.errorMessage = 'Unexpected error occurred.';
      console.log(err);
    })
  }

}
