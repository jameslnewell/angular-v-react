import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ButtonComponent } from './ui/button/button.component';
import { HeadingComponent } from './ui/heading/heading.component';
import { SpinnerComponent } from './ui/spinner/spinner.component';
import { InputComponent } from './ui/input/input.component';
import { BoxComponent } from './ui/box/box.component';
import { AlertComponent } from './ui/alert/alert.component';

@NgModule({
  declarations: [
    AppComponent,
    ButtonComponent,
    HeadingComponent,
    SpinnerComponent,
    InputComponent,
    BoxComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
