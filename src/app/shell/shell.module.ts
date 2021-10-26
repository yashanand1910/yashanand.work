import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';

import { I18nModule } from '@app/i18n';
import { ShellComponent } from './shell.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  imports: [CommonModule, TranslateModule, I18nModule, RouterModule],
  declarations: [FooterComponent, ShellComponent, NavbarComponent]
})
export class ShellModule {}
