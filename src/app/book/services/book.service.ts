import {Book, BookProperties} from '../model/book';
import {BehaviorSubject, delay, Observable} from 'rxjs';

export class BookService {
  private idSeq = 0;

  private readonly booksSubject = new BehaviorSubject<Book[]>([
    {
      id: this.idSeq++,
      author: 'John Smith',
      title: 'Angular for nerds'
    },
    {
      id: this.idSeq++,
      author: 'J. K. Rowling',
      title: 'Harry Potter'
    },
    {
      id: this.idSeq++,
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

  save(newBook: BookProperties): Observable<Book> {
    return new Observable<Book>(subscriber => {
      const book = {...newBook, id: this.idSeq++};
      const currentBooks = this.booksSubject.getValue();
      const newBooks = [...currentBooks, book];
      this.booksSubject.next(newBooks);
      subscriber.next(book);
      subscriber.complete();
    });
  }

  getOne(bookId: number): Observable<Book> {
    return new Observable<Book>(subscriber => {
      const currentBooks = this.booksSubject.getValue();
      const foundBook = currentBooks.find(book => book.id === bookId);
      if (foundBook) {
        subscriber.next(foundBook);
        subscriber.complete();
      } else {
        subscriber.error(`Book with ID ${bookId} could not be found!`);
      }
    });
  }
}
