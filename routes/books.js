'use strict';
// Importiert das Express-Framework
const express = require("express");

// Erstellt ein neues Router-Objekt von Express
const router = express.Router();

// 📦 Importiert die Funktionen aus dem Controller
const {
  addBook,
  getAllBooks,
  deleteBook,
  updateBook
} = require("../controllers/booksController");

//  Definiert die Route zum Hinzufügen eines Buches (POST)
router.post("/", addBook);
//  Definiert die Route zum Abrufen aller Bücher (GET)
router.get("/", getAllBooks);
//  Definiert die Route zum Löschen eines Buches nach ID (DELETE)
router.delete("/:id", deleteBook);
// Definiert die Route zum Aktualisieren eines Buches nach ID (PUT)
router.put("/:id", updateBook);


// Exportiert den Router, damit er im Server verwendet werden kann

module.exports = router;