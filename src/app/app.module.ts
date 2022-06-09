import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {BookModule} from './book/book.module';
import {BookService} from './book/services/book.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, BookModule
  ],
  providers: [BookService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
