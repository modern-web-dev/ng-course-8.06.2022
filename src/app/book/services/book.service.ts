import {Book, BookProperties} from '../model/book';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class BookService {
  constructor(private readonly http: HttpClient) {
  }

  findAll(): Observable<Book[]> {
    return this.http.get<Book[]>('api/books');
  }

  update(bookToUpdate: Book): Observable<Book> {
    return this.http.put<Book>(`api/books/${bookToUpdate.id}`, bookToUpdate);
  }

  save(newBook: BookProperties): Observable<Book> {
    return this.http.post<Book>(`api/books`, newBook);
  }

  getOne(bookId: number): Observable<Book> {
    return this.http.get<Book>(`api/books/${bookId}`);
  }
}
