import {Component} from '@angular/core';
import {Book} from '../../model/book';

@Component({
  selector: 'ba-book-overview',
  templateUrl: './book-overview.component.html',
  styleUrls: ['./book-overview.component.scss']
})
export class BookOverviewComponent {
  readonly books: Book[];
  selectedBook: Book | null = null;

  constructor() {
    this.books = [
      {
        author: 'John Smith',
        title: 'Angular for nerds'
      },
      {
        author: 'J. K. Rowling',
        title: 'Harry Potter'
      },
      {
        author: 'Stephen King',
        title: 'It'
      }
    ];
  }

  selectBook(book: Book): void {
    this.selectedBook = book;
  }

  isSelectedBookOf(book: Book): boolean {
    return this.selectedBook === book;
  }
}
