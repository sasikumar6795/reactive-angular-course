import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable()
export class MessageService {

  

  private subject = new BehaviorSubject<String[]>([]);

  errors$: Observable<String[]> = this.subject.asObservable().pipe(
    filter( messages => messages && messages.length > 0)
  );

  showErrors(...errors: string[]) {
    this.subject.next(errors);
  }

  constructor() { }
}
