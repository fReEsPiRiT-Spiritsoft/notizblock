let booklist = ["test"]
let readedBooks = []


function addBook() {
    let inputBook = document.getElementById('input').value
    booklist.push(inputBook);
    // booklist.push(inputBook);
    renderBooklist();
    
    
}


function renderBooklist() {
    let booklistRef = document.getElementById('booklist');
    booklistRef.innerHTML = '';
    for (let indexBook = 0; indexBook < booklist.length; indexBook++) {
        booklistRef.innerHTML += getBookTemplate(indexBook);
    }
}



function getBookTemplate(indexBook) {
    return `
    <div class="book-card">
        <div class="book-title">${booklist[indexBook]}</div>
        <button onclick="deleteBook(${indexBook})">Delete</button>
        <button onclick="pushReadedBook(${indexBook})">Read</button>
    </div>
    `;
}

function init() {
    renderBooklist();
}

function deleteBook(indexBook) {
    booklist.splice(indexBook, 1);
    renderBooklist();
}

function pushReadedBook(indexBook) {
    readedBooks.push(booklist[indexBook]);
    booklist.splice(indexBook, 1);
    renderBooklist();
    renderReadedBooks();
}