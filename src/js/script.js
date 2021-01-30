{
  'use strict';

  const select = {
    containerOf: {
      booksList: '.books-list',
      filters: '.filters',
    },
    templateOf: {
      bookTemplate: '#template-book',
    },
  };

  const templates = {
    bookTemplate: Handlebars.compile(document.querySelector(select.templateOf.bookTemplate).innerHTML),
  };

  class BooksList {
    constructor() {
      const thisBooksList = this;
      thisBooksList.initData();
      thisBooksList.getElements();
      thisBooksList.render();
      thisBooksList.initActions();
    }

    initData() {
      const thisBooksList = this;
      thisBooksList.data = dataSource.books;
      console.log(thisBooksList.data);
    }

    getElements() {
      const thisBooksList = this;

      thisBooksList.menuContainer = document.querySelector(select.containerOf.booksList);
      thisBooksList.filterWrapper = document.querySelector(select.containerOf.filters);
      thisBooksList.favouritesBooks = [];
      thisBooksList.filters = [];
    }

    render() {
      const thisBooksList = this;

      for (let book of thisBooksList.data) {

        book.ratingBgc = thisBooksList.determineRatingBgc(book.rating);
        book.ratingWidth = book.rating * 10;

        console.log(book.ratingBgc, book.ratingWidth);

        const generatedHTML = templates.bookTemplate(book);
        console.log(generatedHTML);

        const element = utils.createDOMFromHTML(generatedHTML);

        thisBooksList.menuContainer.appendChild(element);

      }
    }

    filterBooks() {
      const thisBooksList = this;

      for (let book of thisBooksList.data) {

        const bookToBeHidden = document.querySelector('.book__image[data-id="' + book.id + '"]');

        let shouldBeHiden = false;

        for (let filter of thisBooksList.filters) {
          if (!book.details[filter]) {
            shouldBeHiden = true;
            break;
          }
        }
        if (shouldBeHiden) {
          bookToBeHidden.classList.add('hidden');
        } else {
          bookToBeHidden.classList.remove('hidden');
        }
      }
    }

    determineRatingBgc(rating) {

      let bgc = '';

      if (rating < 6) {
        bgc = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%);';
      }
      if (rating > 6 && rating <= 8) {
        bgc = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%);';
      }
      if (rating > 8 && rating <= 9) {
        bgc = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%);';
      }
      if (rating > 9) {
        bgc = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%);';
      }

      return bgc;
    }

    initActions() {
      const thisBooksList = this;

      thisBooksList.menuContainer.addEventListener('dblclick', function (event) {

        event.preventDefault();
        const clickedElement = event.target.offsetParent;
        console.log(clickedElement);

        if (!clickedElement.classList.contains('.book__image')) {
          const id = clickedElement.getAttribute('data-id');
          console.log('id', id);
          if (!clickedElement.classList.contains('favorite')) {
            thisBooksList.favouritesBooks.push(id);
            clickedElement.classList.add('favorite');
          } else {
            thisBooksList.favouritesBooks.splice(thisBooksList.favouritesBooks.indexOf(id), 1);
            clickedElement.classList.remove('favorite');
          }
        }
      });

      thisBooksList.filterWrapper.addEventListener('click', function (event) {
        const clickedElement = event.target;

        if (clickedElement.tagName === 'INPUT' && clickedElement.type === 'checkbox' && clickedElement.name === 'filter') {
          if (clickedElement.checked) {
            thisBooksList.filters.push(clickedElement.value);
            thisBooksList.filterBooks();
          } else {
            thisBooksList.filters.splice(thisBooksList.filters.indexOf(clickedElement.value), 1);
            thisBooksList.filterBooks();
          }
        }
      });
    }

  }

  const app = {
    initializeProject: function () {
      new BooksList();
    }
  };
  app.initializeProject();
}
