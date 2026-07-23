import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseCard } from '../../components/course-card/course-card';

@Component({
  selector: 'app-course-list',
  imports: [CommonModule, CourseCard],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css',
})
export class CourseList {
  courses = [
    { id: 1, code: 'CS101', name: 'Introduction to Computer Science', credits: 4 },
    { id: 2, code: 'CS202', name: 'Data Structures & Algorithms', credits: 4 },
    { id: 3, code: 'MATH210', name: 'Linear Algebra & Applications', credits: 3 },
    { id: 4, code: 'WEB301', name: 'DSP', credits: 4 },
    { id: 5, code: 'AI405', name: 'Artificial Intelligence & ML', credits: 4 },
    { id: 6, code: 'ENG105', name: 'Technical Writing & Communication', credits: 2 },
  ];

  enrolledCourseId = 0;

  onEnroll(courseId: number): void {
    this.enrolledCourseId = courseId;
    console.log('Enrolling in course ID:', courseId);
  }
}
