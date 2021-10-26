import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoaderComponent } from './loader/loader.component';
import { ReadingTimePipe } from './pipes/reading-time.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [LoaderComponent, ReadingTimePipe],
  exports: [LoaderComponent, ReadingTimePipe]
})
export class SharedModule {}
