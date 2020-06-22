const exprees = require('express');
const router = exprees.Router();
const { unlink } = require('fs-extra');
const path = require('path');

const Book = require('../models/Book'); // llamando al modelo

// rutas
router.get('/', async(req, res) => {
    const books = await Book.find(); // llamando todos los datos de la bd
    res.json(books);
});


// peticiones
// almacenar
router.post('/', async(req, res) => {
    const { title, description, author, isbn } = req.body;
    const imagePath = '/uploads/' + req.file.filename;
    const newBook = new Book({ title, description, author, isbn, imagePath });
    await newBook.save();
    res.json({ message: 'Libro guardado' });
});

//eliminar
router.delete('/:id', async(req, res) => {
    const bookDeleted = await Book.findByIdAndDelete(req.params.id);
    unlink(path.resolve('./backEnd/public/' + bookDeleted.imagePath));
    res.json({ message: 'Libro eliminado' });
});




module.exports = router;