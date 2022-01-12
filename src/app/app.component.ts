import { Component } from '@angular/core';
import {environment} from "../environments/environment";
import firebase from "firebase/compat";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'nutrition-analysis';
  constructor() {
    // Initialize Firebase
    const app = initializeApp(environment.firebaseConfig);
    const analytics = getAnalytics(app);
    console.log('app',app);
    console.log('analytics',analytics);
  }
}
