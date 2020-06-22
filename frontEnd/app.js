import './styles/styles.css';
//importando la clase donde estan los métodos para CRUD
import UI from './UI';

// cargando la data cuando carga el dom
document.addEventListener('DOMContentLoaded', () => {
    const ui = new UI();
    ui.renderBooks();
});


// trayendo los elementos del formulario
document.getElementById('book-form').addEventListener('submit', function(e) {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const isbn = document.getElementById('isbn').value;
    const image = document.getElementById('image').files;

    // poniendo los datos en un formulario
    const formData = new FormData();
    formData.append('image', image[0]);
    formData.append('title', title);
    formData.append('author', author);
    formData.append('isbn', isbn);

    // instanciando la clase UI
    const ui = new UI();
    ui.addNewBook(formData);
    ui.renderMessage('Libro guardado', 'success', 3000);

    e.preventDefault(); // para que no se reinicie la pagina
});


document.getElementById('books-cards')
    .addEventListener('click', e => {
        if (e.target.classList.contains('delete')) {
            const ui = new UI();
            ui.deleteBook(e.target.getAttribute('_id'));
            ui.renderMessage('Libro elimidado', 'danger', 3000);
        }
    });