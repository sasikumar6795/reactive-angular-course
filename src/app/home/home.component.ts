import {Component, OnInit} from '@angular/core';
import {Course, sortCoursesBySeqNo} from '../model/course';
import {interval, noop, Observable, of, throwError, timer} from 'rxjs';
import {catchError, delay, delayWhen, filter, finalize, map, retryWhen, shareReplay, tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {CourseDialogComponent} from '../course-dialog/course-dialog.component';
import { CourseService } from '../services/course-service';
import { LoadingService } from '../services/loading.service';
import { MessageService } from '../services/message.service';
import { CoursesStore } from '../store/courses.store';


@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  beginnerCourses$: Observable<Course[]>;

  advancedCourses$: Observable<Course[]>;


  constructor(private coursesStore: CoursesStore) {

  }

  ngOnInit() {

    // this.http.get('/api/courses')
    //   .subscribe(
    //     res => {

    //       const courses: Course[] = res["payload"].sort(sortCoursesBySeqNo);

    //       this.beginnerCourses = courses.filter(course => course.category == "BEGINNER");

    //       this.advancedCourses = courses.filter(course => course.category == "ADVANCED");

    //     });
    this.reloadCourses();
   


  }

  reloadCourses() {
    // const courses$ = this.courseService.loadAllCourses().pipe(
    //   map(courses => courses.sort(sortCoursesBySeqNo),
    //   catchError(err => {
    //     const message =  "could not load courses";
    //     this.messageService.showErrors(err);
    //     return throwError(err)
    //   })
    //   )
    // );

    // const showCourses$ = this.loadingService.showLoadingUntillCompleted(courses$);

    // this.beginnerCourses$ = showCourses$.pipe(
    //   map(courses => courses.filter(course => course.category == "BEGINNER"))
    // )

    // this.advancedCourses$ = showCourses$.pipe(
    //   map(courses => courses.filter(course => course.category == "ADVANCED"))
    // )

    
    this.beginnerCourses$ = this.coursesStore.filterByCategory("BEGINNER");
    this.advancedCourses$ = this.coursesStore.filterByCategory("ADVANCED");
  }

 

}




