{
  'use strict';

  //przygotuj referencję do szablonu oraz listy .books-list
  const select = {
    templateOf: {
      booksList: '#template-book',
    },
    containerOf: {
      bookList: '.books-list',
    },
    class: {
      favouriteBook: 'favorite',
    },
    book: {
      bookImage: '.book__image',
    },
    attribute: {
      dataId: '.data-id',
    },
  };

  const templates = {
    booksList: Handlebars.compile(document.querySelector(select.templateOf.booksList).innerHTML),
  };

  const menuContainer = document.querySelector(select.containerOf.bookList);
  const allBooks = [];
  const favouriteBooks = [];

  //dodaj nową funkcję render
  const render = function(){
    //wewnątrz render przejdź po każdym elemencie z dataSource.books
    for(let book of dataSource.books){
      //wewnątrz pętli zadbaj o wygenerowanie kodu HTML na podstawie szablonu oraz danych o konkretnej książce
      const generatedHTML = templates.booksList(book);
      console.log('generatedHTML', generatedHTML);
      //na podstawie tego kodu HTML wygeneruj element DOM
      const element = utils.createDOMFromHTML(generatedHTML);
      console.log('element', element);
      //wygenerowany element DOM dołącz jako nowe dziecko DOM do lisy .books-list
      menuContainer.appendChild(element);
      allBooks.push(element);
      console.log('allBooks', allBooks);
    }

  };

  const initActions = function(){
    for(let book of allBooks){
      const bookCover = book.querySelector(select.book.bookImage);
      console.log('bookCover', bookCover);

      bookCover.addEventListener('dblclick', function(event){
        event.preventDefault();
        const id = bookCover.getAttribute(select.attribute.dataId);
        console.log('id:', id);

        if(!bookCover.classList.contains(select.class.favouriteBook)){
          bookCover.classList.add(select.class.favouriteBook);
          favouriteBooks.push(id);
          console.log('favouriteBooks', favouriteBooks);
        } else {
          bookCover.classList.remove(select.class.favouriteBook);
          favouriteBooks.splice(favouriteBooks.indexOf(id));
          console.log('favouriteBooks', favouriteBooks);
        }
      });
    }
  };

  render();
  initActions();

}
