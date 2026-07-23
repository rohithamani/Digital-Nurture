import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { CourseCard } from '../../components/course-card/course-card';
import { CourseService } from '../../services/course.service';
import { LoadingService } from '../../services/loading';
import { Course } from '../../models/course.model';

import { loadCourses } from '../../store/course/course.actions';
import { selectAllCourses, selectCoursesError, selectCoursesLoading } from '../../store/course/course.selectors';

@Component({
  selector: 'app-course-list',
  imports: [CommonModule, CourseCard, FormsModule],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css',
})
export class CourseList implements OnInit {
  // Step 96: Observable stream selected from NgRx store
  courses$: Observable<Course[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;

  searchTerm = '';
  selectedCourseStudents: any[] = [];
  selectedCourseId: number | null = null;

  private selectedCourseSubject = new Subject<number>();

  constructor(
    private store: Store,
    private courseService: CourseService,
    public loadingService: LoadingService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // Step 96: Select state from NgRx Store
    this.courses$ = this.store.select(selectAllCourses);
    this.loading$ = this.store.select(selectCoursesLoading);
    this.error$ = this.store.select(selectCoursesError);
  }

  ngOnInit(): void {
    // Step 96: Dispatch load action on init
    this.store.dispatch(loadCourses());

    const search = this.route.snapshot.queryParamMap.get('search');
    if (search) {
      this.searchTerm = search;
    }

    this.selectedCourseSubject
      .pipe(switchMap((id) => this.courseService.getStudentsByCourse(id)))
      .subscribe((students) => (this.selectedCourseStudents = students));
  }

  selectCourseForStudents(courseId: number): void {
    this.selectedCourseId = courseId;
    this.selectedCourseSubject.next(courseId);
  }

  onSearch(): void {
    this.router.navigate(['courses'], { queryParams: { search: this.searchTerm } });
  }

  deleteCourse(id: number): void {
    this.courseService.deleteCourse(id).subscribe(() => {
      this.store.dispatch(loadCourses());
    });
  }
}
