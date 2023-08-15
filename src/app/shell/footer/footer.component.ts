import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  currentYear = new Date().getFullYear();
  socialLinks = [
    {
      name: 'email',
      link: 'mailto:hi@yashanand.dev'
    },
    {
      name: 'linkedin',
      link: 'https://linkedin.com/in/yashanand1910'
    },
    {
      name: 'github',
      link: 'https://github.com/yashanand1910'
    }
  ];

  constructor() {
    // empty
  }

  ngOnInit() {
    // empty
  }
}
