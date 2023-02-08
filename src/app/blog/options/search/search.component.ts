import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  tags: Observable<string[]> | undefined;

  constructor() {
    // empty
  }

  ngOnInit(): void {
    this.tags = of(['dev', 'daily', 'principles']);
  }
}
