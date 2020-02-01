import { Subscription } from "rxjs";
import { Router, NavigationStart } from "@angular/router";
import { Component, OnDestroy } from "@angular/core";
export let browserRefresh = false;
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnDestroy {
  title = "crm";
  subscription: Subscription;
  constructor(private router: Router) {
    this.subscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        browserRefresh = !router.navigated;
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
