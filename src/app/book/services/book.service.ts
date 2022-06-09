import {Book} from '../model/book';
import {BehaviorSubject, Observable} from 'rxjs';

export class BookService {
  private readonly booksSubject = new BehaviorSubject<Book[]>([
    {
      id: 0,
      author: 'John Smith',
      title: 'Angular for nerds'
    },
    {
      id: 1,
      author: 'J. K. Rowling',
      title: 'Harry Potter'
    },
    {
      id: 2,
      author: 'Stephen King',
      title: 'It'
    }
  ]);
  readonly books$ = this.booksSubject.asObservable();

  findAll(): Observable<Book[]> {
    return this.books$;
  }

  update(bookToUpdate: Book): Observable<Book> {
    return new Observable<Book>(subscriber => {
      const newBook = {...bookToUpdate};
      const currentBooks = this.booksSubject.getValue();
      const newBooks = currentBooks.map(book => book.id === bookToUpdate.id ? newBook : book);
      this.booksSubject.next(newBooks);

      subscriber.next(newBook);
      subscriber.complete();
    });
  }
}
