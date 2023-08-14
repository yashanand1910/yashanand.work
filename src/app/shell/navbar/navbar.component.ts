import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, startWith, switchMap } from 'rxjs/operators';

interface NavItem {
  name: string;
  link: string;
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  atHome?: Observable<boolean>;
  layout!: Observable<string>;

  navItems: NavItem[] = [
    {
      name: 'about',
      link: 'about'
    },
    {
      name: 'blog',
      link: 'blog'
    }
  ];

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.atHome = this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => this.router.url == '/')
      )
      .pipe(startWith(this.router.url == '/'));

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
