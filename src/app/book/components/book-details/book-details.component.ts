import {Component, OnDestroy} from '@angular/core';
import {Book, BookProperties} from '../../model/book';
import {BookService} from '../../services/book.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Subject, takeUntil} from 'rxjs';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'ba-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnDestroy {
  book: Book | null = null;
  readonly bookForm: FormGroup;

  private readonly unsubscribe = new Subject<void>()

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly books: BookService
  ) {
    this.bookForm = new FormGroup({
      author: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      title: new FormControl('', Validators.required)
    });
    this.book = activatedRoute.snapshot.data['book'] ?? null;
    if (this.book) {
      this.bookForm.patchValue(this.book)
    }
  }

  save() {
    if (this.bookForm.valid) {
      const author = this.bookForm.get('author')?.value ?? '';
      const title = this.bookForm.get('title')?.value ?? '';
      const existingBook = this.book != null;

      const bookProps: BookProperties = {author, title};
      const saveOrUpdate = existingBook ?
        this.books.update({...bookProps, id: this.book!.id}) : this.books.save(bookProps);

      saveOrUpdate
        .pipe(
          takeUntil(this.unsubscribe)
        )
        .subscribe(() => this.router.navigateByUrl('/books'));
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  getErrorsOf(control: AbstractControl | null): string {
    const errors = control?.errors;
    if (errors) {
      const errorMessages = Object.keys(errors)
        .map(errorKey => {
          let errorMessage = '';
          const errorMeta = errors[errorKey];
          switch (errorKey) {
            case 'required':
              errorMessage = 'Please provide a value';
              break;
            case 'maxlength':
              errorMessage = `Value too long (${errorMeta['actualLength']} / ${errorMeta['requiredLength']})`;
              break;
            default:
              errorMessage = 'Unknown error';
              break;
          }
          return errorMessage;
        });
      return errorMessages.join(', ');
    }
    return '';
  }
}
