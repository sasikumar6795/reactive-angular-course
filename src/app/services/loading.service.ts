import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class LoadingService {

  private loadingSubject = new BehaviorSubject<boolean>(false);

  loading$ : Observable<boolean> = this.loadingSubject.asObservable();

  constructor() { }

  showLoadingUntillCompleted<T>(obs$: Observable<T>) : Observable<T> {
    return 
  }


  loadingOn() {
    this.loadingSubject.next(true);
  }

  loadingOff() {
    this.loadingSubject.next(false);
  }
}
