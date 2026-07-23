import { Routes } from '@angular/router';
import { unsavedChangesGuard } from '../../guards/unsaved-changes-guard';

export const enrollmentRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('../enrollment-form/enrollment-form').then(m => m.EnrollmentForm),
  },
  {
    path: 'reactive',
    loadComponent: () =>
      import('../reactive-enrollment-form/reactive-enrollment-form').then(m => m.ReactiveEnrollmentForm),
    canDeactivate: [unsavedChangesGuard],
  },
];
