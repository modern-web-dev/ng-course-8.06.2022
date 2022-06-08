import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Book} from '../../model/book';

@Component({
  selector: 'ba-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent {
  @Input()
  book: Book | null | undefined;

  @Output()
  bookChange = new EventEmitter<Book>();

  save(event: Event) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const authorInputElement = form.querySelector<HTMLInputElement>('#author');
    const titleInputElement = form.querySelector<HTMLInputElement>('#title');
    const updatedBook: Book = {
      author: authorInputElement?.value ?? '',
      title: titleInputElement?.value ?? ''
    }
    this.bookChange.emit(updatedBook);
  }
}
