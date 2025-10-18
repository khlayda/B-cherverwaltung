'use strict';
const express = require("express");// Importiert das Express-Framework
const path = require("path");

const app = express(); // Erstellt eine neue Express-Anwendung
const PORT = 3000; // Definiert den Port, auf dem der Server läuft


// Routen-Module importieren
const booksRoutes = require("./routes/books");
const authRoutes = require("./routes/auth");

// Middleware: Erlaubt dem Server, JSON-Daten im Request-Body zu verarbeiten
app.use(express.json());

// Stellt statische Dateien aus dem "public"-Ordner zur Verfügung (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, "public")));


// Registriert die Bücher-Routen unter dem Pfad /books
app.use("/books", booksRoutes);
// Registriert die Authentifizierungs-Routen unter dem Pfad /auth
app.use("/auth", authRoutes);

// Weiterleitung der Startseite "/" zur Login-Seite
app.get("/", (req, res) => {
  res.redirect("/login.html");
});

// Startet den Server und gibt eine Bestätigung in der Konsole aus
app.listen(PORT, () => {
  console.log(`✅ Server läuft auf http://localhost:${PORT}`);
});


// server.js ist das Herzstück der Anwendung.
// Er verbindet das Frontend (HTML, CSS, JS) mit den Back-End-Routen (auth.js, books.js),
// leitet Anfragen weiter und startet den Server auf Port 3000