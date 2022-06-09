import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Book} from '../../model/book';
import {BookService} from '../../services/book.service';
import {
  debounceTime,
  distinct,
  distinctUntilChanged,
  flatMap,
  fromEvent,
  map,
  Observable,
  OperatorFunction,
  pipe,
  switchMap
} from 'rxjs';

@Component({
  selector: 'ba-book-overview',
  templateUrl: './book-overview.component.html',
  styleUrls: ['./book-overview.component.scss']
})
export class BookOverviewComponent implements OnInit, OnDestroy, AfterViewInit {
  readonly bookService: BookService;
  readonly books$: Observable<Book[]>;
  results$: Observable<string[]> | undefined;
  selectedBook: Book | null = null;
  @ViewChild("searchInput")
  private searchInputElementRef: ElementRef | undefined;

  // private timeoutHandle: number | null = null;

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

  ngAfterViewInit(): void {
    const searchInputElement = this.searchInputElementRef?.nativeElement as HTMLInputElement;
    fromEvent(searchInputElement, 'input')
      .pipe(
        mapFromEventToTargetValue(),
        debounceTime(500),
        distinctUntilChanged(),
        switchMap(query => this.bookService.search(query))
      )
      .subscribe(results => {
        console.log(results);
      })
  }
}

function mapFromEventToTargetValue(): OperatorFunction<Event, string> {
  return map(event => {
    const searchInput = event.target as HTMLInputElement;
    return searchInput.value;
  })
}
