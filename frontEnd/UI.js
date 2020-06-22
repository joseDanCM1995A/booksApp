// importando el servicio
import BookService from './services/BookService';
import { format } from 'timeago.js';

// importando para formatear la fecha


//instanciando el servicio de manera global a que e verticalAlign:  a utilizar en todos los métodos
const bookService = new BookService();


// en la iagen se hace referencia al localhost:3000 para que cargue la imagen
class UI {

    async renderBooks() {
        const books = await bookService.getBooks();
        const booksContainer = document.getElementById('books-cards');
        booksContainer.innerHTML = ''; // limpiando cada que se cargue el dom
        books.forEach(book => {
            const div = document.createElement('div');
            div.innerHTML = `
            <div class="card mb-3 bg-light text-dark " style="max-width: 540px;">
                <div class="row no-gutters">
                    <div class="col-md-4">
                        <img src="${book.imagePath}" class="img-fluid" >
                    </div>
                    <div class="col-md-8">
                        <div class="card-body pb-0 ">
                            <h5 class="card-title">${book.title}</h5>
                            <p class="card-text">${book.author}.</p>
                            <a href="#" class="btn btn-danger delete" _id="${book._id}">X</a>
                        </div>
                    </div>
                </div>
                <div class="card-footer d-flex justify-content-center">
                    <p class="card-text"><small class="text-muted">${format(book.createdAt)}</small></p>
                </div>
            </div>
            `;
            booksContainer.appendChild(div);
        });
    }

    async addNewBook(book) {
        await bookService.postBook(book); // agregando el libro
        this.clearBookForm(); // limpiando el formulario
        this.renderBooks(); // renderizando los libros

    }

    clearBookForm() {
        document.getElementById('book-form').reset(); // reseteando los campos del formulario
    }

    async deleteBook(bookId) {
        await bookService.deleteBook(bookId); // llammando a servicio eliminar
        this.renderBooks();
    }

    renderMessage(message, colorMessage, secondsToRemove) {
        const div = document.createElement('div');
        div.className = `alert alert-${colorMessage} message mt-4`;
        div.appendChild(document.createTextNode(message));

        const container = document.querySelector('.col-md-4');
        const bookForm = document.querySelector('#book-form');

        container.insertBefore(div, bookForm);
        setTimeout(() => {
            document.querySelector('.message').remove();
        }, secondsToRemove);
    }



}

export default UI;