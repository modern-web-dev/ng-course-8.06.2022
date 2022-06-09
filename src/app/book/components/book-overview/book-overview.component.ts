import {Component, OnDestroy} from '@angular/core';
import {Book} from '../../model/book';
import {BookService} from '../../services/book.service';
import {Observable, Subject, takeUntil} from 'rxjs';

@Component({
  selector: 'ba-book-overview',
  templateUrl: './book-overview.component.html',
  styleUrls: ['./book-overview.component.scss']
})
export class BookOverviewComponent implements OnDestroy {
  readonly books$: Observable<Book[]>;
  selectedBook: Book | null = null;

  readonly unsubscribe = new Subject<void>();

  constructor(private readonly bookService: BookService) {
    this.books$ = this.bookService.findAll();
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  selectBook(book: Book): void {
    this.selectedBook = book;
  }

  isSelectedBookOf(book: Book): boolean {
    return this.selectedBook === book;
  }

  updateBooksWith(book: Book) {
    this.bookService.update(book)
      .pipe(
        takeUntil(this.unsubscribe)
      )
      .subscribe(updatedBook => this.selectedBook = updatedBook);
  }
}
