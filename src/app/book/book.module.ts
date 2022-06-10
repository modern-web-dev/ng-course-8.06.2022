import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BookDetailsComponent} from './components/book-details/book-details.component';
import {BookOverviewComponent} from './components/book-overview/book-overview.component';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    BookDetailsComponent,
    BookOverviewComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [BookOverviewComponent]
})
export class BookModule {
}
