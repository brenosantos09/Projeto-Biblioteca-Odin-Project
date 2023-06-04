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
