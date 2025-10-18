'use strict';

// Wartet bis das ganze HTML geladen ist
document.addEventListener("DOMContentLoaded", () => {
    //  Verbindungen zu den HTML-Elementen
  const bookForm = document.getElementById("bookForm");
  const titleInput = document.getElementById("title");
  const authorInput = document.getElementById("author");
  const noteInput = document.getElementById("note");
  const statusSelect = document.getElementById("status");
  const bookList = document.getElementById("bookList");
  const deleteBtn = document.getElementById("deleteBtn");

  
  //  Merkt sich, ob ein Buch bearbeitet wird
  let currentBook = null;

// Bücher von der Datenbank laden und anzeigen
  async function loadBooks() {
    try {
      const res = await fetch("/books");// Holt alle Bücher vom Server
      const books = await res.json();// Wandelt die Antwort in JSON um


      bookList.innerHTML = "";// Leert die Buchliste zuerst

    //  Für jedes Buch ein <li> erstellen und zur Liste hinzufügen
      books.forEach(book => {
        const li = document.createElement("li");
        li.textContent = `${book.title} – ${book.author} (${book.status})`;
        li.style.cursor = "pointer";

       //  Wenn man auf ein Buch klickt, erscheinen die Infos im Formular
        li.addEventListener("click", () => {
          titleInput.value = book.title;
          authorInput.value = book.author;
          noteInput.value = book.note || "";
          statusSelect.value = book.status || "verfügbar";
          currentBook = book;
        });
        bookList.appendChild(li);
      });
    } catch (err) {
      console.error("Fehler beim Laden:", err);
    }
  }

  // 💾 Formular für Buch speichern oder aktualisieren
  bookForm.addEventListener("submit", async (e) => {
    e.preventDefault();


    // 🧾 Daten aus dem Formular
    const data = {
      title: titleInput.value,
      author: authorInput.value,
      note: noteInput.value,
      status: statusSelect.value
    };

    let method = "POST"; // Standard: neues Buch
    let url = "/books";

  // Wenn es ein bestehendes Buch ist → Update (PUT)
    if (currentBook && currentBook._id) {
      data._id = currentBook._id;
      data._rev = currentBook._rev;
      method = "PUT";
      url = `/books/${data._id}`;
    }

    try {
         //  Anfrage an den Server schicken
      await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

            // Formular leeren, aktuelles Buch zurücksetzen, Liste neu laden
      bookForm.reset();
      currentBook = null;
      loadBooks();
    } catch (err) {
      console.error("Fehler beim Speichern:", err);
    }
  });

   //  Buch löschen
  deleteBtn.addEventListener("click", async () => {
      // Prüft, ob ein Buch gewählt wurde
    if (!currentBook || !currentBook._id || !currentBook._rev) return;

    try {
      // DELETE-Anfrage mit ID und Rev
      await fetch(`/books/${currentBook._id}?rev=${currentBook._rev}`, {
        method: "DELETE"
      });

            // Formular leeren, Buch zurücksetzen, Liste neu laden
      bookForm.reset();
      currentBook = null;
      // Beim Start Bücher laden
      loadBooks();
    } catch (err) {
      console.error("Fehler beim Löschen:", err);
    }
  });

  loadBooks();
});
