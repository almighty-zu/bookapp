{
  'use strict';

  //przygotuj referencję do szablonu oraz listy .books-list
  const select = {
    templateOf: {
      bookTemplate: '#template-book',
    },
    containerOf: {
      bookList: '.books-list',
      filters: '.filters',
    },
  };

  const templates = {
    bookTemplate: Handlebars.compile(document.querySelector(select.templateOf.bookTemplate).innerHTML),
  };

  const menuContainer = document.querySelector(select.containerOf.bookList);
  const filterWrapper = document.querySelector(select.containerOf.filters);
  const allBooks = [];
  const favouriteBooks = [];
  const filters = [];


  const render = function(){

    for(let book of dataSource.books){

      const generatedHTML = templates.bookTemplate(book);
      console.log('generatedHTML', generatedHTML);

      const element = utils.createDOMFromHTML(generatedHTML);
      console.log('element', element);

      menuContainer.appendChild(element);
      allBooks.push(element);
      console.log('allBooks', allBooks);
    }

  };

  const initActions = function(){
    menuContainer.addEventListener('dblclick', function(event){

      const clickedElement = event.target.offsetParent;
      console.log('clickedElement', clickedElement);
      console.log(!clickedElement.classList.contains('.book__image'));

      if(!clickedElement.classList.contains('.book__image')){
        const id = clickedElement.getAttribute('data-id');
        console.log('id', id);
        if(!clickedElement.classList.contains('favorite')){
          favouriteBooks.push(id);
          clickedElement.classList.add('favorite');
          console.log('favouriteBooks', favouriteBooks);
        } else {
          favouriteBooks.splice(favouriteBooks.indexOf(id), 1);
          clickedElement.classList.remove('favorite');
          console.log('favouriteBooks', favouriteBooks);
        }
      }

      filterWrapper.addEventListener('click', function(event){
        event.preventDefault();

        const clickedElement = event.target;

        if(clickedElement.tagName === 'INPUT' && clickedElement.type === 'checkbox' && clickedElement.name === 'filter'){
          console.log(clickedElement.value);
          console.log(filters);
          if(clickedElement.checked){
            filters.push(clickedElement.value);
            filterBooks();
          } else {
            filters.splice(filters.indexOf(clickedElement.value), 1);
            filterBooks();
          }
        }
      });
    });


  };

  filterBooks = function(){

  }

  render();
  initActions();

}
