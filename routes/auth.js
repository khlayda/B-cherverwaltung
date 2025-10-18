'use strict';
// Importiert das Express-Framework, um Server und Routen zu erstellen
const express = require("express");

// Einen Router von Express erstellen
const router = express.Router();

// Importiert die loginUser-Funktion vom Controller (die die Logik behandelt)
const { loginUser } = require("../controllers/authController");


// Definiert eine Route für POST-Anfragen an /auth/login und ruft loginUser auf
router.post("/login", loginUser);


// Exportiert den Router, damit er im Hauptserver verwendet werden kann
module.exports = router;


//  auth.js ist eine Route im Backend
// Sie empfängt die Anfragen vom Frontend (z.B. von login.js)
// und leitet diese weiter an den passenden Controller (authController).