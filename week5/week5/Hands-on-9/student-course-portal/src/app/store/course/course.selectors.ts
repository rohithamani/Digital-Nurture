import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CourseState } from './course.reducer';

// Step 95: Create feature selector for course state
export const selectCourseState = createFeatureSelector<CourseState>('course');

// Select all courses array (memoised selector)
export const selectAllCourses = createSelector(
  selectCourseState,
  (state) => state.courses
);

// Select loading state boolean
export const selectCoursesLoading = createSelector(
  selectCourseState,
  (state) => state.loading
);

// Select error string or null
export const selectCoursesError = createSelector(
  selectCourseState,
  (state) => state.error
);
