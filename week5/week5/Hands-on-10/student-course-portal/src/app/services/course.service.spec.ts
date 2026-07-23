import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { CourseService } from './course.service';
import { Course } from '../models/course.model';

describe('CourseService', () => {
  let service: CourseService;
  let httpMock: HttpTestingController;

  const mockCourses: Course[] = [
    { id: 1, code: 'CS101', name: 'Intro to CS', credits: 4, gradeStatus: 'passed' },
    { id: 2, code: 'CS202', name: 'Data Structures', credits: 4, gradeStatus: 'pending' },
  ];

  beforeEach(() => {
    // Step 106: Configure TestBed with provideHttpClient & provideHttpClientTesting
    TestBed.configureTestingModule({
      providers: [
        CourseService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(CourseService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Step 107: Assert no unexpected/outstanding HTTP requests remain
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // Step 107: Test getCourses() with HttpTestingController flush & verify
  it('should fetch courses list via GET request', () => {
    service.getCourses().subscribe((courses) => {
      expect(courses.length).toBe(2);
      expect(courses).toEqual(mockCourses);
    });

    const req = httpMock.expectOne('http://localhost:3000/courses');
    expect(req.request.method).toBe('GET');
    req.flush(mockCourses);
  });

  // Step 108: Test HTTP error handling with retry(2) strategy when server returns 500
  it('should handle HTTP error gracefully after retries when API fails', () => {
    service.getCourses().subscribe({
      next: () => expect.fail('Should have failed with HTTP 500 error'),
      error: (error) => {
        expect(error.message).toContain('Failed to load courses');
      },
    });

    // 1st attempt + 2 retries = 3 requests
    const req1 = httpMock.expectOne('http://localhost:3000/courses');
    req1.flush('Server Error', { status: 500, statusText: 'Server Error' });

    const req2 = httpMock.expectOne('http://localhost:3000/courses');
    req2.flush('Server Error', { status: 500, statusText: 'Server Error' });

    const req3 = httpMock.expectOne('http://localhost:3000/courses');
    req3.flush('Server Error', { status: 500, statusText: 'Server Error' });
  });
});
