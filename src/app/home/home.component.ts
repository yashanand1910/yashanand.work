import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { from, of } from 'rxjs';
import { concatMap, delay } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit {
  name: string = '';
  role: string = '';
  @ViewChild('firstCursor') firstCursor: ElementRef | undefined;
  @ViewChild('secondCursor') secondCursor: ElementRef | undefined;
  private typeDelayFirst = 40;
  private typeDelaySecond = 30;

  constructor(private translate: TranslateService) {}

  ngAfterViewInit() {
    this.secondCursor?.nativeElement.style.setProperty('display', 'none');
    this.type(this.translate.instant('NAME'), this.typeDelayFirst).subscribe(
      (letter) => {
        this.name += letter;
      },
      () => {},
      () => {
        this.firstCursor?.nativeElement.style.setProperty('display', 'none');
        this.secondCursor?.nativeElement.style.setProperty('display', 'inline');
        this.type(this.translate.instant('ROLE'), this.typeDelaySecond)
          .pipe(delay(1000))
          .subscribe((letter) => {
            this.role += letter;
          });
      }
    );
  }

  type(str: string, delayTime: number) {
    return from(str.split('')).pipe(concatMap((x: string) => of(x).pipe(delay(delayTime))));
  }
}
