import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { CourseList } from './pages/course-list/course-list';
import { CourseDetail } from './pages/course-detail/course-detail';
import { StudentProfile } from './pages/student-profile/student-profile';
import { EnrollmentForm } from './pages/enrollment-form/enrollment-form';
import { ReactiveEnrollmentForm } from './pages/reactive-enrollment-form/reactive-enrollment-form';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'home', component: Home },
  { path: 'courses', component: CourseList },
  { path: 'courses/:id', component: CourseDetail },
  { path: 'profile', component: StudentProfile },
  { path: 'enroll', component: EnrollmentForm },
  { path: 'enroll-reactive', component: ReactiveEnrollmentForm },
];
