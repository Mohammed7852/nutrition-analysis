import {Component, OnDestroy} from '@angular/core';
import {filter, map, Subscription} from "rxjs";
import {MediaChange, MediaObserver} from "@angular/flex-layout";
import {Router} from "@angular/router";
import {NavItem} from "../../model/NavItem ";
import {menu} from "../../services/nav.service";

@Component({
  selector: 'app-side-main-nav',
  templateUrl: './side-main-nav.component.html',
  styleUrls: ['./side-main-nav.component.css']
})
export class SideMainNavComponent implements OnDestroy {

  public opened = false;
  private mediaWatcher: Subscription;
  public menu: NavItem[] = menu;

  constructor(
    private media: MediaObserver,
    private router: Router
  ) {
    this.mediaWatcher = this.media.asObservable().pipe(
      filter((changes: MediaChange[]) => changes.length > 0),
      map((changes: MediaChange[]) => changes[0])
    )
      .subscribe((mediaChange: MediaChange) => {
        this.handleMediaChange(mediaChange);
      });
  }

  private handleMediaChange(mediaChange: MediaChange): void {
    if (this.media.isActive('lt-md')) {
      this.opened = false;
    } else {
      this.opened = true;
    }
  }

  ngOnDestroy(): void {
    this.mediaWatcher.unsubscribe();
  }

  signout() {
    this.router.navigate(['/signin'])
  }

}
