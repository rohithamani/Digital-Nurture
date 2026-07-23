import { createReducer, on } from '@ngrx/store';
import { enrollInCourse, unenrollFromCourse, setEnrolledCourses } from './enrollment.actions';

export interface EnrollmentState {
  enrolledCourseIds: number[];
}

export const initialEnrollmentState: EnrollmentState = {
  enrolledCourseIds: [],
};

// Step 99: Reducer managing immutable array of enrolledCourseIds
export const enrollmentReducer = createReducer(
  initialEnrollmentState,

  on(enrollInCourse, (state, { courseId }) => {
    if (state.enrolledCourseIds.includes(courseId)) {
      return state;
    }
    return {
      ...state,
      enrolledCourseIds: [...state.enrolledCourseIds, courseId],
    };
  }),

  on(unenrollFromCourse, (state, { courseId }) => ({
    ...state,
    enrolledCourseIds: state.enrolledCourseIds.filter((id) => id !== courseId),
  })),

  on(setEnrolledCourses, (state, { enrolledIds }) => ({
    ...state,
    enrolledCourseIds: enrolledIds,
  }))
);
