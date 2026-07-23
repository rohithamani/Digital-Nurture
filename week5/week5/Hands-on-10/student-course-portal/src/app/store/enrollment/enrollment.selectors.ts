import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EnrollmentState } from './enrollment.reducer';
import { selectAllCourses } from '../course/course.selectors';

// Feature selector for enrollment state
export const selectEnrollmentState = createFeatureSelector<EnrollmentState>('enrollment');

// Selector for enrolled IDs array
export const selectEnrolledIds = createSelector(
  selectEnrollmentState,
  (state) => state.enrolledCourseIds
);

/*
 * Step 99: Cross-slice selector combining course state (selectAllCourses)
 * and enrollment state (selectEnrolledIds) to produce derived joined data
 * without duplicating state tree values.
 */
export const selectEnrolledCourses = createSelector(
  selectAllCourses,
  selectEnrolledIds,
  (courses, enrolledIds) => courses.filter((c) => enrolledIds.includes(c.id))
);
