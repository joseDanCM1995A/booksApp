const { Schema, model } = require("mongoose");

const booksSchema = new Schema({
    title: { type: String, require: true },
    description: { type: String, require: true },
    author: { type: String, require: true },
    isbn: { type: String, require: true },
    imagePath: { type: String },
    createdAt: { type: Date, default: Date.now() }
});

module.exports = model('Book', booksSchema);