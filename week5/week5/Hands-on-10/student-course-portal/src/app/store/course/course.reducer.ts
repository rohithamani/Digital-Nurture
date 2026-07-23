import { createReducer, on } from '@ngrx/store';
import { Course } from '../../models/course.model';
import { loadCourses, loadCoursesSuccess, loadCoursesFailure } from './course.actions';

// Step 94: Define CourseState interface
export interface CourseState {
  courses: Course[];
  loading: boolean;
  error: string | null;
}

// Initial state
export const initialCourseState: CourseState = {
  courses: [],
  loading: false,
  error: null,
};

// Step 94: Create reducer with on() handlers
export const courseReducer = createReducer(
  initialCourseState,

  on(loadCourses, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(loadCoursesSuccess, (state, { courses }) => ({
    ...state,
    courses,
    loading: false,
    error: null,
  })),

  on(loadCoursesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
