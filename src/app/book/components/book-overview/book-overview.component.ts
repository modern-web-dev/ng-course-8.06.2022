import {Component, OnDestroy, OnInit} from '@angular/core';
import {Book} from '../../model/book';
import {BookService} from '../../services/book.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'ba-book-overview',
  templateUrl: './book-overview.component.html',
  styleUrls: ['./book-overview.component.scss']
})
export class BookOverviewComponent implements OnInit, OnDestroy {
  readonly bookService: BookService;
  readonly books$: Observable<Book[]>;
  selectedBook: Book | null = null;

  constructor() {
    this.bookService = new BookService();
    this.books$ = this.bookService.findAll();
  }

  ngOnInit(): void {
    // this.books$.pipe()

  }

  ngOnDestroy(): void {
    // this.subscription?.unsubscribe();
  }

  selectBook(book: Book): void {
    this.selectedBook = book;
  }

  isSelectedBookOf(book: Book): boolean {
    return this.selectedBook === book;
  }

  updateBooksWith(book: Book) {
    this.bookService.update(book)
      .subscribe(updatedBook => this.selectedBook = updatedBook);
  }
}
