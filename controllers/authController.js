'use strict';

// Verbindet sich mit der CouchDB über die URL mit Benutzername und Passwort
const nano = require("nano")("http://alfa:alfa@127.0.0.1:5984");
// Verwendet die Datenbank "users"
const usersDB = nano.db.use("users");


async function loginUser(req, res) {
  const { username, password } = req.body; // Extrahiert Benutzerdaten aus dem Request-Body

  try {
        // Holt alle Benutzer-Dokumente aus der Datenbank
    const allUsers = await usersDB.list({ include_docs: true });

        // Sucht nach einem Benutzer mit übereinstimmendem Benutzernamen und Passwort
    const matchedUser = allUsers.rows.find(
      (row) =>
        row.doc.username === username &&
        row.doc.password === password
    );

    if (matchedUser) {
      res.json({ message: "✅ Login erfolgreich!" });
    } else {
      res.status(401).json({ error: "❌ Benutzername oder Passwort falsch" });
    }
  } catch (err) {
    console.error("Fehler beim Login:", err);
    res.status(500).json({ error: "❌ Serverfehler beim Login" });
  }
}

// Exportiert die Funktion, damit sie in der Route verwendet werden kann
module.exports = { loginUser };


// authController.js enthält die Geschäftslogik
// Es verbindet sich mit der Datenbank (CouchDB),
// prüft die Zugangsdaten und gibt eine passende Antwort zurück.