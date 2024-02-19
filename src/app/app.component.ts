import {Component, OnInit} from '@angular/core';
import { LoadingService } from './services/loading.service';
import { MessageService } from './services/message.service';
import { AuthStore } from './store/auth.store';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: []
})
export class AppComponent implements  OnInit {

    constructor(public auth : AuthStore) {

    }

    ngOnInit() {


    }

  logout() {
    this.auth.logOut();
  }

}
