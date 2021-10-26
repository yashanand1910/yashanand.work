import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'readingTime'
})
export class ReadingTimePipe implements PipeTransform {
  private _wpm = 265;

  transform(wordCount: number | undefined, ...args: unknown[]): string {
    return wordCount !== undefined ? `${Math.round(wordCount / 265)} min read` : '';
  }
}
