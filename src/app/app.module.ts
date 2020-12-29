import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DigitalDisplayComponent } from '../components/digital-display/digital-display.component';
import { TimesListComponent } from '../components/times-list/times-list.component';

import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent,
    DigitalDisplayComponent,
    TimesListComponent,
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {

}
