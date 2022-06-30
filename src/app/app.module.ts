import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TimePipe } from './time.pipe';
import { BtnPrimaryModule } from './widgets/btn-primary/btn-primary.module';

@NgModule({
  declarations: [AppComponent, TimePipe],
  imports: [BrowserModule, BtnPrimaryModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
