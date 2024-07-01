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
  courseList: Course[] = [];

  @ViewChild(CourseSaveComponent) saveComponent: CourseSaveComponent | undefined;
  constructor(private courseService: CourseService) { }

  ngOnInit(): void {
    this.courseService.getAllCourses().subscribe(data => {
      this.courseList = data;
    })
  }

  createCourseRequest() {
    this.saveComponent?.showCourseModal();
  }

  saveCourseWatcher(course: Course) {
    this.courseList.push(course);
  }
}
