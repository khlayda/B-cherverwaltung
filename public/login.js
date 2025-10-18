'use strict';


// Event Listener für das Login-Formular
document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();// verhindert das Standardverhalten (Seite neu laden)

     // Benutzerdaten aus dem Formular
     //  holen
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
  


       // Anfrage an den Server schicken (POST /auth/login)
    const res = await fetch("/auth/login", {
      method: "POST",// Methode: POST
      headers: {
        "Content-Type": "application/json", // Wir senden JSON-Daten
      },
      body: JSON.stringify({ username, password }),
    });
  

        // Antwort vom Server lesen
    const data = await res.json();
  
    const status = document.getElementById("loginStatus");

        // Wenn der Login erfolgreich war
    if (res.ok) {
      status.textContent = "✅ Login erfolgreich!";
          // Nach 1 Sekunde zur Bücher-Seite weiterleiten
      setTimeout(() => {
        window.location.href = "books.html";
      }, 1000); 
    
    } else {
        // Fehler anzeigen (z.B. falsches Passwort)
      status.textContent = "❌ " + (data.error || "Login fehlgeschlagen");
    }
  });
  
  // login.js ist Teil des Frontends (im Browser)
// Es sammelt die Benutzerdaten (Benutzername & Passwort)
// und sendet sie per Fetch-Request an das Backend (/auth/login).