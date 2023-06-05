'use strict';

const buttonChangeTheme = document.querySelector('#change-theme');
const library = document.querySelector('.library');
const libraryBtn = document.querySelector('.library__btn');

const authorInput = document.querySelector('#author');
const titleInput = document.querySelector('#title');
const pageNumbersInput = document.querySelector('#page-numbers');
const readStatusCheckbox = document.querySelector('#read-status');
const addBookButton = document.querySelector('#add-book');
const submitBookButton = document.querySelector('#submit-book');
const closeFormButton = document.querySelector('#close-form');
const bookListContainer = document.querySelector('#book-list');
const libraryFormContainer = document.querySelector('#library-form-container');

const libraryForm = document.querySelector('#library-form');

let myLibrary = [];

libraryForm.addEventListener('submit', (e) => {
  e.preventDefault();

  if (
    authorInput.value === '' ||
    titleInput.value === '' ||
    pageNumbersInput.value === ''
  ) {
    alert('Por favor, preencha todos os campos do formulário.');
  } else {
    addBookToLibrary();
    displayBooks();
    libraryFormContainer.classList.remove('show--form');
    authorInput.value = '';
    titleInput.value = '';
    pageNumbersInput.value = '';
  }
});

//show modal
addBookButton.addEventListener('click', () => {
  libraryFormContainer.classList.add('show--form');
});

//close modal
closeFormButton.addEventListener('click', (e) => {
  libraryFormContainer.classList.remove('show--form');
});

function addBookToLibrary() {
  const bookAuthor = authorInput.value.trim();
  const bookTitle = titleInput.value.trim();
  const bookPageNumbers = pageNumbersInput.value.trim();
  const bookReadStatus = readStatusCheckbox.checked;
  const books = new Book(
    bookAuthor,
    bookTitle,
    bookPageNumbers,
    bookReadStatus
  );
  myLibrary.push(books);
  authorInput.value = '';
  titleInput.value = '';
  pageNumbersInput.value = '';
}

function Book(author, title, pageNumbers, readStatus) {
  this.author = author;
  this.title = title;
  this.pageNumbers = pageNumbers;
  this.readStatus = readStatus;
}

Book.prototype.ToggleReadStatus = function () {
  this.readStatus = !this.readStatus;
};

function displayBooks() {
  bookListContainer.innerHTML = '';
  myLibrary.forEach((book, index) => {
    const bookCard = document.createElement('div');

    const bookCardAuthor = document.createElement('h3');
    const bookCardTitle = document.createElement('h4');
    const bookCardPages = document.createElement('h5');
    const bookRemoveButton = document.createElement('button');
    const bookToggleStatusButton = document.createElement('button');

    bookRemoveButton.classList.add('btn__library');
    bookToggleStatusButton.classList.add('btn__library');

    bookCardAuthor.innerText = `Autor: ${book.author}`;
    bookCardTitle.innerText = `Título: ${book.title}`;
    bookCardPages.innerText = `Número de Páginas: ${book.pageNumbers}`;
    bookRemoveButton.innerText = 'Remover';
    bookToggleStatusButton.innerText = book.readStatus ? 'lido' : 'não lido';

    bookCard.setAttribute('data', index);

    bookRemoveButton.addEventListener('click', () => {
      removeBook(index);
    });

    bookToggleStatusButton.addEventListener('click', () => {
      toggleStatus(index);
    });

    bookCard.append(bookCardAuthor);
    bookCard.append(bookCardTitle);
    bookCard.append(bookCardPages);
    bookCard.append(bookRemoveButton);
    bookCard.append(bookToggleStatusButton);

    bookListContainer.appendChild(bookCard);
  });
}

function toggleStatus(index) {
  myLibrary[index].ToggleReadStatus();
  displayBooks();
}
function removeBook(index) {
  myLibrary.splice(index, 1);
  displayBooks();
}

//dark mode
document.querySelector('#change-theme').addEventListener('change', () => {
  library.classList.toggle('dark--theme');
});
