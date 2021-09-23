const myLibrary = []

const mainEl = document.getElementsByTagName('MAIN')[0]
const addButton = document.querySelector('.add')
const modal = document.querySelector('.modal')
const backdrop = document.querySelector('.modal-backdrop')
const close = document.querySelector('.close')
const form = document.querySelector('.book-form')

addButton.addEventListener('click', () => {
  modal.classList.add('show')
  backdrop.classList.add('show')
})

close.addEventListener('click', () => {
  modal.classList.remove('show')
  backdrop.classList.remove('show')
})

form.addEventListener('submit', e => {
  e.preventDefault()
  const author = form.elements['author'].value
  const title = form.elements['title'].value
  const pages = form.elements['pages'].value
  const read = form.elements['read'].checked

  if (
    author == null ||
    author == '' ||
    title == null ||
    title == '' ||
    pages == null ||
    pages == ''
  ) {
    alert('Please fill all fields')
  } else {
    addBookToLibary(author, title, pages, read)
    modal.classList.remove('show')
    backdrop.classList.remove('show')
  }
})

function Book(title, author, pages, read) {
  this.title = title
  this.author = author
  this.pages = pages
  this.isRead = read
}

Book.prototype.toggleStatus = function () {
  this.isRead ? (this.isRead = false) : (this.isRead = true)
}

function addBookToLibary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read)
  myLibrary.push(newBook)
  displayBooks(myLibrary)
}

const displayBooks = books => {
  // reset content
  mainEl.innerHTML = ''
  books.forEach((book, idx) => {
    const { title, author, pages, isRead } = book
    const content = `
      <h1>${title}</h1>
      <h2>Written by: ${author}</h2>
      <h3>Pages: ${pages}</h3>
      <p>${isRead ? 'Already read' : 'not read'}</p>
      <button class="delete" data-idx="${idx}">delete</button>
      <button class="toggle" data-idx="${idx}">Toggle read</button>
    `
    const div = document.createElement('DIV')

    div.className = 'card'
    div.innerHTML = content
    div.setAttribute('data-idx', idx)
    mainEl.appendChild(div)
  })

  // add Event Listener to every toggle button
  const toggleButtons = [...document.querySelectorAll('.toggle')]

  toggleButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = btn.getAttribute('data-idx')
      myLibrary[idx].toggleStatus()
      displayBooks(myLibrary)
    })
  })

  // add Event Listener to every delete button
  const deleteButtons = [...document.querySelectorAll('.delete')]

  deleteButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = btn.getAttribute('data-idx')
      myLibrary.splice(idx, 1)
      displayBooks(myLibrary)
    })
  })
}

displayBooks(myLibrary)
