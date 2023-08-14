// Book Class

class Book {
    constructor(title, author, year) {
        this.title = title; 
        this.author = author;  
        this.year = year;
    }
}

// Localstorage Class

class Store {

    static getBooks(){
        let books;

        if(localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }

        return books
    }

    static addBook(book) {
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem("books", JSON.stringify(books));
    }

    static removeBook(year) {
        const books = Store.getBooks();
        books.forEach((book, i) => {
            if(book.year === year){
                books.splice(i, 1);
            }
        })

        localStorage.setItem('books', JSON.stringify(books));
    }
}

// Ui operations
class UI {
    static displayBooks() {
        const books = Store.getBooks();
        
        books.forEach((book) => UI.addBookToList(book))
    }
    
    static addBookToList(book) {
        const list = document.getElementById('book-list');
        
        const row = document.createElement('tr');
        
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.year}</td>
        <td>
        <a href="#" class="btn btn-danger btn-sm delete">X</a>
        </td>
        
        `
        
        list.appendChild(row);
        
    }

    static clearFields(){
        document.getElementById("title").value = '';
        document.getElementById("author").value = '';
        document.getElementById("year").value = '';
    }

    static showAlert(message, className) {
        const div = document.createElement('div');

        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));

        const container = document.querySelector('.container');
        const form = document.getElementById("book-form");

        container.insertBefore(div,form) // This will place the container beetween div and form

        setTimeout(() => {
            document.querySelector('.alert').remove()
        }, 1000);
    }

    static deleteBook(book) {
        if(book.classList.contains("delete")){
            book.parentElement.parentElement.remove();
        }
    }
}

// Display a book

document.addEventListener('DOMContentLoaded', UI.displayBooks);
// Remove a book

document.querySelector('#book-list').addEventListener('click', (e) => {
    UI.deleteBook(e.target);
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
    UI.showAlert("Book deleted 🚮", "warning");
});

// Adding a book
document.addEventListener('submit', (e) => {
    e.preventDefault();

    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const year = document.querySelector("#year").value;

    if(title === "" || author === "" || year === ""){
        UI.showAlert("Please fill in all fields 😒", "danger");
    } else {

        const book = new Book(title, author, year);

        UI.addBookToList(book);
        Store.addBook(book);
        UI.showAlert("Book added successfully!! 😃", "success");
        UI.clearFields();
    }
})