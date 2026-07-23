import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  courses = [
    { id: 1, code: 'CS101', name: 'Introduction to Computer Science', credits: 4 },
    { id: 2, code: 'CS202', name: 'Data Structures & Algorithms', credits: 4 },
    { id: 3, code: 'MATH210', name: 'Linear Algebra & Applications', credits: 3 },
    { id: 4, code: 'WEB301', name: 'DSP', credits: 4 },
    { id: 5, code: 'AI405', name: 'Artificial Intelligence & ML', credits: 4 },
    { id: 6, code: 'ENG105', name: 'Technical Writing & Communication', credits: 2 },
  ];

  getCourses() {
    return this.courses;
  }

  getCourseCount() {
    return this.courses.length;
  }

  getCourseById(id: number) {
    return this.courses.find(course => course.id === id);
  }
}
