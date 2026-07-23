import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CourseCard } from '../../components/course-card/course-card';
import { CourseService } from '../../services/course.service';
import { LoadingService } from '../../services/loading';
import { Course } from '../../models/course.model';
import { Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-course-list',
  imports: [CommonModule, CourseCard, FormsModule],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css',
})
export class CourseList implements OnInit {
  courses: Course[] = [];
  searchTerm = '';
  errorMessage = '';
  isLoading = true;
  selectedCourseStudents: any[] = [];
  selectedCourseId: number | null = null;

  private selectedCourseSubject = new Subject<number>();

  constructor(
    private courseService: CourseService,
    public loadingService: LoadingService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Step 80: Subscribe with next, error, and complete callbacks
    this.courseService.getCourses().subscribe({
      next: (courses) => (this.courses = courses),
      error: (err) => (this.errorMessage = err.message || 'Failed to load courses'),
      complete: () => (this.isLoading = false),
    });

    const search = this.route.snapshot.queryParamMap.get('search');
    if (search) {
      this.searchTerm = search;
    }

    // Step 87: switchMap stream cancels previous student request when new course selected
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
      this.courses = this.courses.filter((c) => c.id !== id);
    });
  }
}
