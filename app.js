const libray = []

function Book(author, title, numOfPages, isRead) {
  this.author = author
  this.title = title
  this.numOfPages = numOfPages
  this.isRead = isRead
}

const addBookBtn = document.getElementById('addBookBtn')
const addBookModal = document.getElementById('addBookModal')
const modal = document.getElementById('myModal')
const openModalBtn = document.getElementById('open-modal')
const form = document.getElementById('addBookForm')

// Get the <span> element that closes the modal
const span = document.getElementsByClassName('close')[0]
const closeModal = () => modal.style.display = 'none'

openModalBtn.onclick = function () {
  modal.style.display = 'block'
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  closeModal()
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    closeModal()
  }
}

function addBookToLibrary(e) {
  e.preventDefault()
  console.log('SUBMIT')

  const bookAuthor = document.getElementById('author').value
  const bookTitle = document.getElementById('title').value
  const bookPages = document.getElementById('pages').value
  const bookIsRead = document.getElementById('is-read').checked

  console.log(bookAuthor, bookTitle, bookPages, bookIsRead)

  const newBook = new Book(bookAuthor, bookTitle, bookPages, bookIsRead)

  libray.push(newBook)
  closeModal()
}

form.addEventListener('submit', addBookToLibrary)

function displayBooks() {
  libray.forEach(book => {
    document.getElementById('main').innerHTML += `<article>
    <h3>${book.title}</h3><br>
    Author: ${book.author}<br>
    Pages: ${book.numOfPages}
    </article>`
  })
}

displayBooks()
