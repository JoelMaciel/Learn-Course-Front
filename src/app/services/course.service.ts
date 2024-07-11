import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RequestBaseService } from './request-base.service';
import { AuthenticationService } from './authentication.service';
import { HttpClient } from '@angular/common/http';
import { Course } from '../models/course.models';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const API_URL = environment.BASE_URL + '/learn-course/api/courses';

@Injectable({
  providedIn: 'root',
})
export class CourseService extends RequestBaseService {
  constructor(authenticationService: AuthenticationService, http: HttpClient) {
    super(authenticationService, http);
  }

  saveCourse(course: Course): Observable<any> {
    const { courseId, ...courseData } = course;
    return this.http.post(API_URL, courseData, {
      headers: this.getHeaders,
    });
  }

  updateCourse(course: Course): Observable<any> {
    return this.http.put<Course>(`${API_URL}/${course.courseId}`, course, {
      headers: this.getHeaders,
    });
  }

  deleteCourse(course: Course): Observable<any> {
    return this.http.delete(API_URL + '/' + course.courseId, {
      headers: this.getHeaders,
    });
  }

  getAllCourses(): Observable<Course[]> {
    return this.http.get<any>(API_URL, { headers: this.getHeaders }).pipe(
      map((response) =>
        response.content.map((course: Course) => {
          return {
            courseId: course.courseId,
            title: course.title,
            subtitle: course.subtitle,
            price: course.price,
            creationDate: new Date(course.creationDate),
          } as Course;
        }),
      ),
    );
  }
}
