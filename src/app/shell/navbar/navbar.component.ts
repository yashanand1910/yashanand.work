import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, startWith } from 'rxjs/operators';

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

  constructor(public router: Router) {}

  ngOnInit(): void {
    this.atHome = this.router.events
      .pipe(
        filter((e) => e instanceof NavigationEnd),
        map((e: any) => e == '/' || e.url == '/')
      )
      .pipe(startWith(this.router.url == '/'));
  }
}
