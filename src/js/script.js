{
  'use strict';

  //przygotuj referencję do szablonu oraz listy .books-list
  const select = {
    templateOf: {
      bookTemplate: '#template-book',
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
    bookTemplate: Handlebars.compile(document.querySelector(select.templateOf.bookTemplate).innerHTML),
  };

  const menuContainer = document.querySelector(select.containerOf.bookList);
  const allBooks = [];
  const favouriteBooks = [];

  //dodaj nową funkcję render
  const render = function(){
    //wewnątrz render przejdź po każdym elemencie z dataSource.books
    for(let book of dataSource.books){
      //wewnątrz pętli zadbaj o wygenerowanie kodu HTML na podstawie szablonu oraz danych o konkretnej książce
      const generatedHTML = templates.bookTemplate(book);
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
    menuContainer.addEventListener('dblclick', function(event){

      const clickedElement = event.target.offsetParent;
      console.log('clickedElement', clickedElement);
      console.log(!clickedElement.classList.contains(select.book.bookImage));

      if(!clickedElement.classList.contains(select.book.bookImage)){
        const id = clickedElement.getAttribute(select.attribute.dataId);
        console.log('id', id);
        if(!clickedElement.classList.contains(select.class.favouriteBook)){
          clickedElement.classList.add(select.class.favouriteBook);
          favouriteBooks.push(id);
          console.log('favouriteBooks', favouriteBooks);
        } else {
          clickedElement.classList.remove(select.class.favouriteBook);
          favouriteBooks.splice(favouriteBooks.indexOf(id));
          console.log('favouriteBooks', favouriteBooks);
        }
      }
    });
  };

  render();
  initActions();

}
