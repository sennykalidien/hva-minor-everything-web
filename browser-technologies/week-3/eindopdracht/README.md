# eindopdrachten week 3
Feature Detection

## Eindeindopdracht
*Maak een demo op basis van een use case. Zorg dat alle gebruikers, met alle browsers, in iedere context minimaal de core functionaliteit te zien/horen/voelen krijgen. Bouw je demo in 3 lagen, volgens het principe van Progressive Enhancement. Gebruik als enhanced feature een (hippe, innovatieve, vooruitstrevende) Browser Technologie die je gaat onderzoeken op functionaliteit, toegankelijkheid en (browser) ondersteuning.*

- Browser Technologies onderzoeken en implementeren als enhancement
- Core functionaliteit van een use case doorgronden

**Let's go!**

### Use Case
*Ik wil favoriete t-shirts-met-nerdy-teksten kunnen opslaan, en een volgende keer dat ik de site bezoek kunnen gebruiken - Web storage*

![Website](https://raw.githubusercontent.com/sennykalidien/EW/master/browser-technologies/week-3/eindopdracht/readme/site.png)

**De 3 lagen**
De website wordt een mobiele webapplicatie, opgebouwd in de 3 lagen:
- HTMl
- CSS
- JavaScript.

**HTML**
- De HTML is opgebouwd met HTML5 elementen. Elke 'pagina' heeft een aparte section, en elke t-shirt zit in een article element.

**CSS**
- De CSS classes zijn opgebouwd volgend de BEM-methode.

**JavaScript**
Met JavaScript:
- doen we de routing van de pagina's
- halen we data (JSON objecten) binnen met een GET request
- renderen wij deze objecten in HTML templates.

De applicatie kan geen data (de artikelen) inladen als de gebruiker:
- JavaScript heeft uitstaan
- geen internet heeft.


**JavaScript uit**

JavaScript is een vereiste voor deze Web App, omdat de applicatie een *AJAX GET request* moet doen om JSON objecten binnen te halen van alle shirts.

Een bruikbare fallback inbouwen wordt dus lastig, behalve het tonen van een bericht waarmee je de gebruiker mededeelt dat JavaScript vereist is om de Web App te gebruiken.

![CSS off](https://raw.githubusercontent.com/sennykalidien/EW/master/browser-technologies/week-3/eindopdracht/readme/javascript-off.png)

### De feature
WebStorage doormiddel van Local Storage is de feature die erin is gebouwd om t-shirts toe te voegen aan de favorieten. Als de gebruiker een t-shirt toevoegt aan zijn favorieten, wordt de ID van het t-shirt direct als een array opgeslagen in de Local Storage. Bij het drukken van de knop zie je dus de ID toegevoegd worden aan de Local Storage.

**Browser Support**
![Browser Support](https://raw.githubusercontent.com/sennykalidien/EW/master/browser-technologies/week-3/eindopdracht/readme/browser-supprt.png)


**Een array in Local Storage**
![Array in a Local Storage](https://raw.githubusercontent.com/sennykalidien/EW/master/browser-technologies/week-3/eindopdracht/readme/localstorage-array.png)

**De fallback**

Als Local Storage niet wordt ondersteund, valt het terug op cookies. hierbij heb ik gebruik gemaakt van dit voorbeeld (no polyfills):
[Fluid Byte @ github](https://gist.github.com/Fluidbyte/4718380)


**Local Storage detection**
```
var lsSupport;

try {
    localStorage.test = 1;
    lsSupport = true;
} catch (e) {
    lsSupport = false;
}
```
Met de variabele lsSupport kunnen we dus een Local Storage item aanmaken of een Cookie!

## Test

### Test 1: Screen Reader
**Pluspunten**
- De screenreader leest alle links en buttons goed voor.
- Pagina structuur lijkt in orde

Minpunten:
- Elk t-shirt blok noemt de screen reader een 'article', dit kan verwarrend zijn voor een gebruiker.
- De afbeeldingen van de t-shirts bevatten geen goede alt text.

**Alt text op afbeeldingen**
Het probleem waar ik op stuitte is dat de afbeeldingen van de t-shirts een andere tekst als ALT moeten hebben dan de titel. Dus ik heb zelf een description moeten toevoegen per t-shirt in het JSON bestand dat uitlegt wat er op de t-shirts staan. Deze kunnen namelijk uitwijken van de titel. Vanzelfsprekend kunnen blinden niet zien wat er op een t-shirt staat. Dus het is fijn dat het voorgelezen kan worden!

### Test 2: CSS uit
Als CSS uitstaat, ziet de HTML structuur er nog goed uit.

![CSS off](https://raw.githubusercontent.com/sennykalidien/EW/master/browser-technologies/week-3/eindopdracht/readme/css-off.png)

### Test 3: Local Storage Fallback
De fallback is getest in Safari private mode. In deze mode slaat ondersteunt safari geen Local Storage. Perfect dus om te testen en IE (enigzins) te bootsen!

**Voor herhalen pagina**
![Cookie before refresh](https://raw.githubusercontent.com/sennykalidien/EW/master/browser-technologies/week-3/eindopdracht/readme/cookie_before-refresh.png)

**Na herhalen pagina**
![Cookie after refresh](https://raw.githubusercontent.com/sennykalidien/EW/master/browser-technologies/week-3/eindopdracht/readme/cookie_after-refresh.png)

De cookie wordt dus succesvol aangemaakt, en de IDs worden als array opgeslagen.
