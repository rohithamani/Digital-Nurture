import { describe, it, expect, beforeEach } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

import { CourseList } from './course-list';
import { Course } from '../../models/course.model';
import { selectAllCourses, selectCoursesLoading, selectCoursesError } from '../../store/course/course.selectors';
import { selectEnrolledIds } from '../../store/enrollment/enrollment.selectors';

describe('CourseListComponent (NgRx Connected Component)', () => {
  let component: CourseList;
  let fixture: ComponentFixture<CourseList>;
  let store: MockStore;

  const mockCourses: Course[] = [
    { id: 1, code: 'CS101', name: 'Intro to CS', credits: 4, gradeStatus: 'passed' },
    { id: 2, code: 'CS202', name: 'Data Structures', credits: 4, gradeStatus: 'pending' },
  ];

  beforeEach(async () => {
    // Step 109: Configure TestBed with provideMockStore
    await TestBed.configureTestingModule({
      imports: [CourseList],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
        provideMockStore({
          selectors: [
            { selector: selectAllCourses, value: mockCourses },
            { selector: selectCoursesLoading, value: false },
            { selector: selectCoursesError, value: null },
            { selector: selectEnrolledIds, value: [] },
          ],
        }),
      ],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(CourseList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Step 109: Assert rendered course cards match initial mock store state
  it('should render course cards matching the initial NgRx store state', () => {
    const courseCards = fixture.debugElement.queryAll(By.css('app-course-card'));
    expect(courseCards.length).toBe(2);
  });

  // Step 110: Test store.setState / overrideSelector to simulate loading state
  it('should display loading spinner when store state loading is true', () => {
    store.overrideSelector(selectCoursesLoading, true);
    store.overrideSelector(selectAllCourses, []);
    store.refreshState();
    fixture.detectChanges();

    const loadingSpinner = fixture.debugElement.query(By.css('.loading-spinner'));
    expect(loadingSpinner).toBeTruthy();
    expect(loadingSpinner.nativeElement.textContent).toContain('Loading data');
  });
});
