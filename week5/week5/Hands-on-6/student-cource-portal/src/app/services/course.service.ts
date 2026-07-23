import { Injectable } from '@angular/core';
import { Course } from '../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private courses: Course[] = [
    { id: 1, code: 'CS101', name: 'Introduction to Computer Science', credits: 4, gradeStatus: 'passed' },
    { id: 2, code: 'CS202', name: 'Data Structures & Algorithms', credits: 4, gradeStatus: 'pending' },
    { id: 3, code: 'MATH210', name: 'Linear Algebra & Applications', credits: 3, gradeStatus: 'passed' },
    { id: 4, code: 'WEB301', name: 'DSP', credits: 4, gradeStatus: 'failed' },
    { id: 5, code: 'AI405', name: 'Artificial Intelligence & ML', credits: 4, gradeStatus: 'pending' },
    { id: 6, code: 'ENG105', name: 'Technical Writing & Communication', credits: 2, gradeStatus: 'passed' },
  ];

  getCourses(): Course[] {
    return this.courses;
  }

  getCourseById(id: number): Course | undefined {
    return this.courses.find(course => course.id === id);
  }

  getCourseCount(): number {
    return this.courses.length;
  }

  addCourse(course: Course): void {
    this.courses.push(course);
  }
}
