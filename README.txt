
### Frontend för Registrering och Inloggning

Denna repository innehåller koden för frontend till ett enkelt projekt med registrering och inloggning av användare. Projektet är byggt med Parcel och använder HTML, CSS och JavaScript för att hantera användargränssnitt och CRUD-operationer för en meny.

### Installation
För att installera och köra projektet lokalt, följ dessa steg:

### Klona detta repository till din lokala maskin:
git clone https://github.com/ditt-anvandarnamn/moment5_projekt_fronten.git

### Navigera till projektmappen:
cd moment5_projekt_fronten

### Installera alla nödvändiga npm-paket:
npm install

### Kör projektet lokalt:
npm start

### Struktur
Projektet består av följande filer och mappar:

- index.html: Huvudsidan med meny och information om företaget.
- login.html: Sida för inloggning.
- protected.html: Skyddad sida för att hantera menyn.
- src/: Innehåller alla JavaScript- och CSS-filer för projektet.
- main.js: JavaScript-fil för hantering av huvudsidans funktioner.
- logIn.js: JavaScript-fil för hantering av inloggningssidan.
- protected.js: JavaScript-fil för hantering av den skyddade sidan.
- style.css: CSS-fil för stilisering av huvudsidans utseende.
- styleLogIn.css: CSS-fil för stilisering av inloggningssidan.
- styleProtected.css: CSS-fil för stilisering av den skyddade sidan.

### Användning
Projektet kan nås med olika HTTP-metoder och ändpunkter för att utföra olika åtgärder. Nedan beskrivs hur man använder de viktigaste funktionerna:

### Huvudsida (index.html)
Huvudsidan visar information om företaget och en meny som hämtas från backend.

Vid sidladdning hämtas menyn automatiskt och visas på sidan.
Hamburgarmeny finns för navigering på små skärmar.

### Inloggning (login.html)
Inloggningssidan tillåter användare att logga in.

Användarnamn och lösenord skickas till backend för autentisering.
Om inloggningen lyckas omdirigeras användaren till den skyddade sidan.

### Skyddad Sida (protected.html)
Den skyddade sidan tillåter användare att skapa, uppdatera och radera menyobjekt.

### Metod	Ändpunkt	    Beskrivning
    GET	    /api/menu	    Hämtar alla menyobjekt
    POST	/api/createMenu	Skapar ett nytt menyobjekt
    PUT	    /api/menu/:id	Uppdaterar ett menyobjekt med angivet ID
    DELETE	/api/menu/:id	Raderar ett menyobjekt med angivet ID

### CRUD-operationer

### Skapa Meny
Fyll i formuläret "Lägg till maträtt" med maträttens namn, beskrivning och pris.
Klicka på "Lägg till" för att skicka data till backend och uppdatera menyn.

## Uppdatera Meny
Klicka på "Uppdatera"-knappen bredvid ett menyobjekt.
Fyll i formuläret "Uppdatera maträtt" med ny information.
Klicka på "Uppdatera" för att skicka data till backend och uppdatera menyn.

### Radera Meny
Klicka på "Radera"-knappen bredvid ett menyobjekt.
Bekräfta raderingen för att ta bort objektet från backend och uppdatera menyn.

### Kursobjekt

Nedan är ett exempel på ett objekt som returneras eller skickas i JSON-format:

{
  "name": "Korv med bröd",
  "description": "En klassisk korv med bröd och senap",
  "price": "25",
  "_id": "60d5ec49f1b88e001cf39a99"
}