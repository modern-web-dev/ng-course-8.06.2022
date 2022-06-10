import {BookDetailsComponent} from './book-details.component';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {Book} from '../../model/book';

describe('BookDetailsComponent', function () {
  let testBook: Book;

  beforeEach(function () {
    testBook = {id: 1, author: 'Author', title: 'Title'};
  });

  describe('(class tests)', function () {
    it('notifies on updated book after calling save()', function () {
      // 1. given
      const eventStub: any = {
        preventDefault: jasmine.createSpy('preventDefault'),
        target: {
          querySelector(selector: string) {
            return {value: selector === '#author' ? 'Updated Author' : 'Updated Title'};
          }
        }
      };
      const component = new BookDetailsComponent();
      component.book = testBook;
      component.bookChange.subscribe(updatedBook => {
        // 3. then
        expect(eventStub.preventDefault).toHaveBeenCalled();
        expect(updatedBook).toBeTruthy();
        expect(updatedBook.author).toBe('Updated Author');
        expect(updatedBook.title).toBe('Updated Title');
      });
      // 2. when
      component.save(eventStub);
    })
  });

  describe('(DOM tests)', function () {
    let fixture: ComponentFixture<BookDetailsComponent>;
    let component: BookDetailsComponent;
    let element: HTMLElement;

    beforeEach(function () {
      fixture = TestBed.createComponent(BookDetailsComponent);
      element = fixture.nativeElement as HTMLElement;
      component = fixture.componentInstance;
    });

    it('populates passed book to inputs', function () {
      // given
      component.book = testBook;
      // when
      fixture.detectChanges();
      // then
      const form = element.querySelector<HTMLFormElement>('form');
      const authorInput = form?.querySelector<HTMLInputElement>('#author');
      expect(authorInput?.value).toBe(testBook.author);

      const titleInput = form?.querySelector<HTMLInputElement>('#title');
      expect(titleInput?.value).toBe(testBook.title);
    });

    it('notifies on book change on button click', function () {
      // given
      component.book = testBook;
      // when button click
      // then event fired
    });
  });
});
