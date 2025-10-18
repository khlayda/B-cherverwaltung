'use strict';
const nano = require("nano")("http://alfa:alfa@127.0.0.1:5984");

const booksDB = nano.db.use("books");// Nutzt die Datenbank "books" von CouchDB

// Neues Buch hinzufügen
async function addBook(req, res) {
  const { title, author, note, status } = req.body;
  const newBook = { 
    title,
    author,
    note, 
    status: status || "Verfügbar" };

  try {
    const response = await booksDB.insert(newBook);
    res.status(201).json({ id: response.id, ...newBook });
  } catch (err) {
    console.error("❌ Fehler beim Speichern:", err);
    res.status(500).json({ error: "Fehler beim Speichern in CouchDB" });
  }
}


//  Alle Bücher abrufen
async function getAllBooks(req, res) {
  try {
    const all = await booksDB.list({ include_docs: true });
    const books = all.rows.map(row => row.doc);
    res.json(books);
  } catch (err) {
    console.error("❌ Fehler beim Laden:", err);
    res.status(500).json({ error: "Fehler beim Laden aus CouchDB" });
  }
}


// Buch löschen
async function deleteBook(req, res) {
  const id = req.params.id;
  const rev = req.query.rev;

  try {
    await booksDB.destroy(id, rev);
    res.status(200).json({ message: "Buch gelöscht" });
  } catch (err) {
    console.error("❌ Fehler beim Löschen:", err);
    res.status(500).json({ error: "Fehler beim Löschen aus CouchDB" });
  }
}

//  Buch aktualisieren
async function updateBook(req, res) {
  const bookId = req.params.id;
  const updatedData = req.body;

  try {
    const existingBook = await booksDB.get(bookId);
    const updatedBook = { ...existingBook, ...updatedData, _id: bookId, _rev: existingBook._rev };
    const response = await booksDB.insert(updatedBook);
    res.status(200).json({ message: "Buch aktualisiert", id: response.id });
  } catch (err) {
    console.error("Fehler beim Aktualisieren:", err);
    res.status(500).json({ error: "Fehler beim Aktualisieren" });
  }
}

// Exportiert alle Funktionen, damit sie im Router verwendet werden können
module.exports = {
  addBook,
  getAllBooks,
  deleteBook,
  updateBook
};