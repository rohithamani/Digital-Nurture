import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SimpleChange } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

import { CourseCard } from './course-card';
import { enrollInCourse } from '../../store/enrollment/enrollment.actions';
import { selectEnrolledIds } from '../../store/enrollment/enrollment.selectors';

describe('CourseCardComponent', () => {
  let component: CourseCard;
  let fixture: ComponentFixture<CourseCard>;
  let store: MockStore;

  const mockCourse = {
    id: 1,
    name: 'Data Structures',
    code: 'CS101',
    credits: 4,
    gradeStatus: 'passed' as const,
  };

  beforeEach(async () => {
    // Step 101: Configure TestBed for CourseCardComponent with MockStore & Router
    await TestBed.configureTestingModule({
      imports: [CourseCard],
      providers: [
        provideRouter([]),
        provideMockStore({
          selectors: [{ selector: selectEnrolledIds, value: [] }],
        }),
      ],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(CourseCard);
    component = fixture.componentInstance;
    component.course = mockCourse;
    fixture.detectChanges();
  });

  // Step 102: Test component creation
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Step 103: Test @Input rendering in h3 tag
  it('should render course name in h3 using @Input', () => {
    component.course = {
      id: 1,
      name: 'Data Structures',
      code: 'CS101',
      credits: 4,
      gradeStatus: 'passed',
    };
    fixture.detectChanges();

    const h3Element = fixture.debugElement.query(By.css('h3')).nativeElement;
    expect(h3Element.textContent).toContain('Data Structures');
  });

  // Step 104: Test button click event and action dispatch
  it('should dispatch enroll action when Enroll button is clicked', () => {
    const dispatchSpy = vi.spyOn(store, 'dispatch');

    const buttonElement = fixture.debugElement.query(By.css('button')).nativeElement;
    buttonElement.click();
    fixture.detectChanges();

    expect(dispatchSpy).toHaveBeenCalledWith(enrollInCourse({ courseId: 1 }));
  });

  // Step 105: Test ngOnChanges with SimpleChange object
  it('should log previous and current value on ngOnChanges', () => {
    const logSpy = vi.spyOn(console, 'log');

    const change = new SimpleChange(null, mockCourse, true);
    component.ngOnChanges({ course: change });

    expect(logSpy).toHaveBeenCalledWith('Previous value:', null);
    expect(logSpy).toHaveBeenCalledWith('Current value:', mockCourse);
  });
});
