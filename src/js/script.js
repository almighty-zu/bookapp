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
  };

  const templates = {
    booksList: Handlebars.compile(document.querySelector(select.templateOf.booksList).innerHTML),
  };

  const menuContainer = document.querySelector(select.containerOf.bookList);
  const allBooks = [];

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

  render();

}
