import {Book} from '../model/book';

export type FindAllCallbackFn = (books: Book[]) => void;

export class BookService {
  private readonly books: Book[] = [
    {
      author: 'John Smith',
      title: 'Angular for nerds'
    },
    {
      author: 'J. K. Rowling',
      title: 'Harry Potter'
    },
    {
      author: 'Stephen King',
      title: 'It'
    }
  ];

  findAll(): Promise<Book[]> {
    return fetch('http://localhost/books')
      .then(response => {
        return response.json();
      });


    // return new Promise<Book[]>((resolve, fail) => {
    //   setTimeout(() => {
    //     // resolve(this.books);
    //     fail('Could not connect to server');
    //   }, 2000);
    // });
  }
}
