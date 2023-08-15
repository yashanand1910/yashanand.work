import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, startWith, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit {
  layout!: Observable<string>;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.layout = this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      startWith(true),
      switchMap(() => {
        let route = this.route;
        while (route.firstChild) {
          route = route.firstChild;
        }

        return route.data;
      }),
      map((data) => data.layout)
    );
  }
}
