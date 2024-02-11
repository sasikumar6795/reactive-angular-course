import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { Course, sortCoursesBySeqNo } from "../model/course";
import { catchError, map, shareReplay, tap } from "rxjs/operators";
import { LoadingService } from "../services/loading.service";
import { MessageService } from "../services/message.service";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class CoursesStore {

    private subject = new BehaviorSubject<Course[]>([]);

    courses$: Observable<Course[]> = this.subject.asObservable();

    constructor(private loadingService: LoadingService, 
        private messageService: MessageService,
        private httpClient: HttpClient) {

        this.loadCourses()  
    }


    private loadCourses() {
        const loadCourses$ = this.httpClient.get<Course[]>('/api/courses')
        .pipe(
            map(res => res['payload']),
            shareReplay(),
            catchError(err => {
            const message =  "could not load courses";
            this.messageService.showErrors(err);
            return throwError(err)}),
            tap(courses=> this.subject.next(courses))
        )
       this.loadingService.showLoadingUntillCompleted(loadCourses$).subscribe();
    }

    saveCourse(courseId: String, changes: Partial<Course>): Observable<any>{
       const courses = this.subject.getValue();

       const index =  courses.findIndex(course => course.id === courseId);

       const newCourse : Course = {
        ...courses[index],
        ...changes
       }

       const newCourses: Course[] =  courses.slice(0);

       newCourses[index] = newCourse;

       this.subject.next(newCourses);

       return this.httpClient.put(`/api/courses/${courseId}`,changes).pipe(
        catchError(err => {
            const message =  "could not save course";
            this.messageService.showErrors(err);
            return throwError(err)}),
            shareReplay()
       )
       
    }

    filterByCategory(category: String): Observable<Course[]> {
        return this.courses$.pipe(
            map(courses => 
                courses.filter(course => course.category === category)
                .sort(sortCoursesBySeqNo))
        )
    }

}