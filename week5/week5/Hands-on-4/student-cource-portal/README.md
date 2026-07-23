# Student Course Portal — Angular Learning Project

## Project Overview

This is a beginner Angular project built step by step across 4 hands-on exercises.

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
      enrollment-form/     — Enrollment request form (Hands-On 4)
    services/
      course.service.ts    — Shared data service
    app.routes.ts          — Route definitions
    app.ts                 — Root component
    app.html               — Root template
```
