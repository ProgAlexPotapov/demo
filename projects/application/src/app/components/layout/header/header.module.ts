import { NgModule } from '@angular/core';
import { HeaderComponent } from './header.component';
import { AboutMeComponent } from './about-me/about-me.component';
import { SharedModule } from '../../../modules/shared/shared.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [HeaderComponent, AboutMeComponent],
  imports: [SharedModule, RouterModule],
  exports: [HeaderComponent, HeaderComponent]
})
export class HeaderModule {
}
