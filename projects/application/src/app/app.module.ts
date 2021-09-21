import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './layout/app.component';
import { HeaderComponent } from './layout/header/header.component';
import { AboutMeComponent } from './layout/header/about-me/about-me.component';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  imports: [
    // angular
    BrowserAnimationsModule,
    BrowserModule,

    // core & shared
    CoreModule,
    SharedModule,

    // app
    AppRoutingModule,
    ToastrModule.forRoot()
  ],
  declarations: [AppComponent, HeaderComponent, AboutMeComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
