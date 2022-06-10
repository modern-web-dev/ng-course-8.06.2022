import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {BookModule} from './book/book.module';
import {BookService} from './book/services/book.service';
import {RouterModule} from '@angular/router';
import {BookOverviewComponent} from './book/components/book-overview/book-overview.component';
import {BookDetailsComponent} from './book/components/book-details/book-details.component';
import {BookResolver} from './book/components/book-details/book.resolver';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: '', redirectTo: '/books', pathMatch: 'full'},
      {
        path: 'books',
        children: [
          {
            path: '',
            component: BookOverviewComponent,
          },
          {
            path: 'new',
            component: BookDetailsComponent
          },
          {
            path: ':bookId',
            component: BookDetailsComponent,
            resolve: {
              book: BookResolver
            }
          }
        ]
      }
    ]),
    BookModule
  ],
  providers: [BookService, BookResolver],
  bootstrap: [AppComponent]
})
export class AppModule {
}
