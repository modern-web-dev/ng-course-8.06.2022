import {ActivatedRouteSnapshot, Resolve, Router} from '@angular/router';
import {Book} from '../../model/book';
import {catchError, Observable, throwError} from 'rxjs';
import {BookService} from '../../services/book.service';
import {Injectable} from '@angular/core';

@Injectable()
export class BookResolver implements Resolve<Book> {
  constructor(
    private readonly books: BookService,
    private readonly router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<Book> {
    const bookIdAsString = route.params['bookId'];
    const bookId = +bookIdAsString;
    if (!isNaN(bookId)) {
      return this.books.getOne(bookId)
        .pipe(catchError(error => {
          this.goToCreateNewBookDialogEventually();
          return throwError(() => error);
        }));
    } else {
      this.goToCreateNewBookDialogEventually();
      return throwError(
        () => new Error(`${bookIdAsString} could not be parsed as Book ID`));
    }
  }

  private goToCreateNewBookDialogEventually(): void {
    setTimeout(() => this.router.navigateByUrl('/books/new'));
  }
}


