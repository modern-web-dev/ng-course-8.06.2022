import {Component, OnDestroy} from '@angular/core';
import {Book, BookProperties} from '../../model/book';
import {BookService} from '../../services/book.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Subject, takeUntil} from 'rxjs';

@Component({
  selector: 'ba-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnDestroy {
  book: Book | null = null;

  private readonly unsubscribe = new Subject<void>()

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly books: BookService
  ) {
    this.book = activatedRoute.snapshot.data['book'] ?? null;
  }

  save(event: Event) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const authorInputElement = form.querySelector<HTMLInputElement>('#author');
    const titleInputElement = form.querySelector<HTMLInputElement>('#title');
    const existingBook = this.book != null;

    const bookProps: BookProperties = {
      author: authorInputElement?.value ?? '',
      title: titleInputElement?.value ?? ''
    }
    const saveOrUpdate = existingBook ?
      this.books.update({...bookProps, id: this.book!.id}) : this.books.save(bookProps);

    saveOrUpdate
      .pipe(
        takeUntil(this.unsubscribe)
      )
      .subscribe(() => this.router.navigateByUrl('/books'));
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
