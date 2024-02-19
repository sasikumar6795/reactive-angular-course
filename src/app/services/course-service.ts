import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Course } from "../model/course";
import { map, shareReplay } from "rxjs/operators";
import { Lesson } from "../model/lesson";


@Injectable({
        providedIn: 'root',
})
export class CourseService {

    constructor(private http:HttpClient) {}


    loadCourseById(courseId: Number): Observable<Course> {
        return this.http.get<Course>(`/api/course/${courseId}`).pipe(
            shareReplay()
        )
    }


    loadAllCourses() : Observable<Course[]> {
        return this.http.get<Course[]>('/api/courses')
        .pipe(
            map(res => res['payload']),
            shareReplay()
        )
    }

    saveCourse(courseId: string, changes:Partial<Course>): Observable<any> {
        return this.http.put(`/api/courses/${courseId}`,changes).pipe(
            shareReplay()
        );
    }

    searchCourse(search: string): Observable<Lesson[]> {
        const data = this.http.get<Lesson[]>(`/api/lessons`, {
            params: {
                filter: search,
                pageSize: 100
            }
        }).pipe(
            map(res => res['payload']),
            shareReplay()
        )

        console.log("data",data);
        return data;
    }
}