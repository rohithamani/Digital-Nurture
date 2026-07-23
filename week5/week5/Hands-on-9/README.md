# Student Course Portal — Angular Learning Project

## Project Overview

This is a beginner-to-advanced Angular project built step by step across 9 hands-on exercises.

---

## Hands-On 1 — Project Structure & Components

**What was done:**
- Understood Angular workspace files: `angular.json`, `tsconfig.json`, `package.json`, `main.ts`
- Created 3 page components: `Home`, `CourseList`, `StudentProfile`
- Created 2 reusable components: `Header`, `CourseCard`
- Set up `app.html` with `<app-header>` and `<router-outlet>`
- Added simple CSS for each component

**Files:**
- `src/app/app.ts`, `app.html`
- `src/app/components/header/`
- `src/app/pages/home/`, `course-list/`, `student-profile/`

---

## Hands-On 2 — Data Binding, Input/Output & Lifecycle Hooks

**What was done:**
- String Interpolation `{{ }}` — show TS property in template
- Property Binding `[disabled]` — control button state from TypeScript
- Event Binding `(click)` — call method on button click
- Two-Way Binding `[(ngModel)]` — sync input with TypeScript property
- `@Input()` — pass data from parent (CourseList) to child (CourseCard)
- `@Output()` + `EventEmitter` — send event from child (CourseCard) to parent (CourseList)
- Lifecycle hooks: `ngOnInit`, `ngOnDestroy`, `ngOnChanges`

**Files:**
- `src/app/pages/home/home.ts`, `home.html`
- `src/app/components/course-card/course-card.ts`, `course-card.html`
- `src/app/pages/course-list/course-list.ts`, `course-list.html`

---

## Hands-On 3 — Services & Dependency Injection

**What was done:**
- Created `CourseService` with `@Injectable({ providedIn: 'root' })`
- Moved course data out of the component into the service
- `getCourses()` and `getCourseCount()` methods in service
- Injected `CourseService` into `CourseList` and `Home` via constructor
- Both components share one single source of data

**Files:**
- `src/app/services/course.service.ts` — NEW
- `src/app/pages/course-list/course-list.ts` — Updated
- `src/app/pages/home/home.ts` — Updated

---

## Hands-On 4 — Template-Driven Forms & Validation

**What was done:**
- Generated `EnrollmentForm` component at `pages/enrollment-form`
- Added `/enroll` route in `app.routes.ts`
- Built form using `<form #enrollForm="ngForm" (ngSubmit)="onSubmit(enrollForm)">`
- Added 5 form fields each with `[(ngModel)]` and `name` attribute:
  - `studentName` (text), `studentEmail` (email), `courseId` (number)
  - `preferredSemester` (select: Odd/Even), `agreeToTerms` (checkbox)
- Submit button disabled using `[disabled]="enrollForm.invalid"`
- `onSubmit(form: NgForm)` logs `form.value` and `form.valid` to console
- Built-in validators: `required`, `minlength="3"`, `email`
- Template reference variables (`#nameCtrl="ngModel"`) to access control state
- Error messages using `*ngIf="nameCtrl.touched && nameCtrl.errors?.['required']"`
- CSS classes: `.ng-invalid.ng-touched { border-color: red }` and `.ng-valid.ng-touched { border-color: green }`
- Success message shown with `submitted` boolean and `*ngIf`
- Reset button calls `enrollForm.resetForm()`

**Files:**
- `src/app/pages/enrollment-form/enrollment-form.ts` — NEW
- `src/app/pages/enrollment-form/enrollment-form.html` — NEW
- `src/app/pages/enrollment-form/enrollment-form.css` — NEW
- `src/app/app.routes.ts` — Updated
- `src/app/components/header/header.html` — Added Enroll nav link

---

## How to Run

```
npm install
ng serve
```

Open browser at: `http://localhost:4200`

---

## Project Folder Structure

```
src/
  app/
    components/
      header/              — Navigation bar
      course-card/         — Single course card (reusable)
    pages/
      home/                — Home page
      course-list/         — List of all courses
      course-detail/       — Detail view for one course
      student-profile/     — Student profile page
      enrollment-form/         — Enrollment request form (Hands-On 4)
      reactive-enrollment-form/— Reactive enrollment form (Hands-On 5)
    services/
      course.service.ts    — Shared data service
    app.routes.ts          — Route definitions
    app.ts                 — Root component
    app.html               — Root template
```

---

## Hands-On 5 — Reactive Forms, FormBuilder, FormArray & Custom Validators

**What was done:**
- Generated `ReactiveEnrollmentForm` component at `pages/reactive-enrollment-form`
- Added `/enroll-reactive` route in `app.routes.ts`
- Added `ReactiveFormsModule` to component imports
- Injected `FormBuilder` via constructor
- Built form in `ngOnInit` using `this.fb.group({ ... })`
- Bound form in template using `[formGroup]="enrollForm"` and `formControlName="..."` (no ngModel)
- Submit button disabled using `[disabled]="enrollForm.invalid"`
- `onSubmit()` logs `enrollForm.value` (excludes disabled) and `enrollForm.getRawValue()` (includes disabled)
- Custom sync validator `noCourseCode` — returns error if courseId starts with 'XX'
- Custom async validator `simulateEmailCheck` — returns `emailTaken` error after 800ms if email contains 'test@'
- `FormArray` for dynamic additional courses — `addCourse()` pushes new `FormControl`, `removeCourse(i)` removes it
- Getter `get additionalCourses(): FormArray<FormControl>` — typed getter avoids casting in template

**Files:**
- `src/app/pages/reactive-enrollment-form/reactive-enrollment-form.ts` — NEW
- `src/app/pages/reactive-enrollment-form/reactive-enrollment-form.html` — NEW
- `src/app/pages/reactive-enrollment-form/reactive-enrollment-form.css` — NEW
- `src/app/app.routes.ts` — Updated
- `src/app/components/header/header.html` — Added Reactive Enroll nav link

---

## Hands-On 6 — Services & Dependency Injection Hierarchy

**What was done:**
- Created `Course` interface in `models/course.model.ts` with `gradeStatus`
- Updated `CourseService` with typed methods
- Created `EnrollmentService` injecting `CourseService` (service-to-service DI)
- Added `CourseSummaryWidget` injecting `CourseService` to verify singleton state
- Created `NotificationComponent` with component-level provider `providers: [NotificationService]`

---

## Hands-On 7 — Angular Routing, Guards & Lazy Loading

**What was done:**
- Configured routes: `/`, `/courses`, `/courses/:id`, `/profile`, `/enroll` (lazy-loaded), and `**` (wildcard 404)
- Created `ActivatedRoute` parameter reading in `CourseDetail`
- Implemented `AuthGuard` (`CanActivateFn`) to protect `/profile` and `/enroll` routes
- Implemented `UnsavedChangesGuard` (`CanDeactivateFn`) to warn on dirty form navigation
- Created lazy-loaded `enrollmentRoutes` module chunking

---

## Hands-On 8 — HTTP Client, Observables, RxJS & Interceptors

**What was done:**
- Configured `provideHttpClient()` with interceptors in `app.config.ts`
- Created `db.json` mock backend with courses, students, and enrollments
- Refactored `CourseService` to use `HttpClient` GET, POST, PUT, DELETE
- Applied RxJS operators:
  - `map` — transform API payload
  - `tap` — log side effects cleanly
  - `retry(2)` — retry failed HTTP requests up to 2 times
  - `catchError` — handle errors gracefully with error banner
  - `switchMap` — chain student lookup & cancel previous requests
- Implemented 3 HTTP Interceptors:
  - `authInterceptor` — adds `Authorization: Bearer mock-token-12345` header
  - `errorHandlerInterceptor` — catches 401 (redirects to home) and 500 status codes
  - `loadingInterceptor` — tracks loading state using `LoadingService` BehaviorSubject and `finalize`

---

## Hands-On 9 — State Management with NgRx (Store, Actions, Reducers, Effects & Selectors)

**What was done:**
- Installed `@ngrx/store`, `@ngrx/effects`, `@ngrx/entity`, `@ngrx/store-devtools`
- Registered `provideStore()`, `provideState()`, `provideEffects()`, and `provideStoreDevtools({ maxAge: 25 })` in `app.config.ts`
- **Course State Management**:
  - `course.actions.ts`: `loadCourses`, `loadCoursesSuccess`, `loadCoursesFailure`
  - `course.reducer.ts`: `CourseState` interface + `courseReducer` handling `loadCourses`, `loadCoursesSuccess`, `loadCoursesFailure`
  - `course.selectors.ts`: `selectCourseState`, `selectAllCourses`, `selectCoursesLoading`, `selectCoursesError`
  - `course.effects.ts`: `loadCourses$` effect listening to `loadCourses` action, executing `CourseService.getCourses()`, and dispatching success/failure
- **Refactored Components to NgRx**:
  - `CourseList`: Dispatches `loadCourses()` in `ngOnInit`, selects `courses$`, `loading$`, `error$` via `this.store.select(...)`, renders using `async` pipe
- **Enrollment State & Cross-Slice Selector**:
  - `enrollment.actions.ts`: `enrollInCourse`, `unenrollFromCourse`, `setEnrolledCourses`
  - `enrollment.reducer.ts`: `EnrollmentState` managing `enrolledCourseIds: number[]` array
  - `enrollment.selectors.ts`: `selectEnrolledIds` and cross-slice selector `selectEnrolledCourses` (joining course state & enrollment state)
  - `CourseCard`: Dispatches `enrollInCourse`/`unenrollFromCourse` on click, uses `(enrolledIds$ | async)?.includes(course.id)` to toggle button label between `Enroll` and `Unenroll`
  - `StudentProfile`: Selects `selectEnrolledCourses` cross-slice selector directly from Store to display enrolled courses dynamically


