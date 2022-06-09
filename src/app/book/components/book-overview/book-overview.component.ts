import {Component} from '@angular/core';
import {Book} from '../../model/book';
import {BookService} from '../../services/book.service';

@Component({
  selector: 'ba-book-overview',
  templateUrl: './book-overview.component.html',
  styleUrls: ['./book-overview.component.scss']
})
export class BookOverviewComponent {
  books: Book[] = [];
  selectedBook: Book | null = null;

  constructor() {
    const books = new BookService();
    const bookResultPromise = books.findAll();
    bookResultPromise
      .then(
        resultBooks => {
          console.log('Books are there...');
          this.books = resultBooks;
        },
        () => this.books = []
      )
    console.log('Constructor finished...');
  }

  selectBook(book: Book): void {
    this.selectedBook = book;
  }

  isSelectedBookOf(book: Book): boolean {
    return this.selectedBook === book;
  }

  updateBooksWith(updatedBook: Book) {
    console.log(updatedBook);
  }
}
