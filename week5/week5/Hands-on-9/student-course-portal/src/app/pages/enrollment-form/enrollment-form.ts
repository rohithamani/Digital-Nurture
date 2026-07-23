import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-enrollment-form',
  imports: [FormsModule, CommonModule],
  templateUrl: './enrollment-form.html',
  styleUrl: './enrollment-form.css',
})
export class EnrollmentForm {
  studentName = '';
  studentEmail = '';
  courseId: number | null = null;
  preferredSemester = '';
  agreeToTerms = false;
  submitted = false;

  constructor(private courseService: CourseService) {}

  onSubmit(form: NgForm): void {
    console.log('Form Value:', form.value);
    console.log('Form Valid:', form.valid);
    if (form.valid) {
      // Step 81: Call POST createCourse API on submit
      this.courseService
        .createCourse({
          code: `CS${this.courseId || 999}`,
          name: `${this.studentName}'s Selected Course`,
          credits: 4,
          gradeStatus: 'pending',
        })
        .subscribe(() => {
          this.submitted = true;
        });
    }
  }
}
