import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, tap, catchError, retry, switchMap } from 'rxjs/operators';
import { Course } from '../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private apiUrl = 'http://localhost:3000/courses';
  private studentsUrl = 'http://localhost:3000/students';

  constructor(private http: HttpClient) {}

  // Step 79, 83, 84, 85, 86: GET courses with map, tap, retry(2), and catchError
  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.apiUrl).pipe(
      // Step 86: Retry failed HTTP requests up to 2 times before throwing error
      retry(2),
      // Step 83: map operator transforms data stream (filters courses with credits > 0)
      map(courses => courses.filter(c => c.credits > 0)),
      /*
       * Step 85: tap is preferred over map for side effects (like logging)
       * because tap executes side-effects without altering or mutating the data stream,
       * leaving map strictly for pure data transformations.
       */
      tap(courses => console.log('Courses loaded:', courses.length)),
      // Step 84: catchError handles HTTP failures gracefully
      catchError(err => {
        console.error('Error fetching courses:', err);
        return throwError(() => new Error('Failed to load courses. Please try again.'));
      })
    );
  }

  // Step 79: GET course by ID
  getCourseById(id: number): Observable<Course> {
    return this.http.get<Course>(`${this.apiUrl}/${id}`).pipe(
      retry(2),
      catchError(err => {
        console.error('Error fetching course by ID:', err);
        return throwError(() => new Error('Course not found.'));
      })
    );
  }

  // Step 81: POST create new course
  createCourse(course: Omit<Course, 'id'>): Observable<Course> {
    return this.http.post<Course>(this.apiUrl, course).pipe(
      catchError(err => {
        console.error('Error creating course:', err);
        return throwError(() => new Error('Failed to create course.'));
      })
    );
  }

  // Step 82: PUT update existing course
  updateCourse(id: number, course: Course): Observable<Course> {
    return this.http.put<Course>(`${this.apiUrl}/${id}`, course);
  }

  // Step 82: DELETE course
  deleteCourse(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Step 87: GET students by courseId for switchMap demo
  getStudentsByCourse(courseId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.studentsUrl}?courseId=${courseId}`);
  }

  /*
   * Step 87: switchMap cancels the previous inner HTTP Observable subscription
   * when a new courseId arrives, ensuring only the latest request's response is processed
   * and preventing race conditions or out-of-order API responses.
   */
  getStudentsForCourseStream(courseIdStream$: Observable<number>): Observable<any[]> {
    return courseIdStream$.pipe(
      switchMap(courseId => this.getStudentsByCourse(courseId))
    );
  }

  getCourseCount(): number {
    return 6;
  }
}
