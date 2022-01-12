import { Injectable } from '@angular/core';
import {NavItem} from "../model/NavItem ";
import { Event, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

export const menu: NavItem[] = [
  {
    displayName: 'Home',
    iconName: 'home',
    route: ''
  },
  {
    displayName: 'Profile',
    iconName: 'person',
    route: 'profile'
  },
  {
    displayName: 'About',
    iconName: 'info',
    route: 'about'
  },
  {
    displayName: 'Test',
    iconName: 'info',
    route: 'test'
  }
];

@Injectable({
  providedIn: 'root'
})
export class NavService {

  private currentUrl = new BehaviorSubject<string>('');

  constructor(private router: Router) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl.next(event.urlAfterRedirects);
      }
    });
  }

  public getCurrentUrl(): BehaviorSubject<string> {
    if (!this.currentUrl.value) {
      // handles redirect after login
      const url = this.router.url;
      this.currentUrl.next(url);
    }

    return this.currentUrl;
  }


}
