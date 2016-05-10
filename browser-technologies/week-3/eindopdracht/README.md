# Opdrachten week 3
Feature Detection

## Eindopdracht
*Maak een demo op basis van een use case. Zorg dat alle gebruikers, met alle browsers, in iedere context minimaal de core functionaliteit te zien/horen/voelen krijgen. Bouw je demo in 3 lagen, volgens het principe van Progressive Enhancement. Gebruik als enhanced feature een (hippe, innovatieve, vooruitstrevende) Browser Technologie die je gaat onderzoeken op functionaliteit, toegankelijkheid en (browser) ondersteuning.*

- Browser Technologies onderzoeken en implementeren als *enhancement*
- Core functionaliteit van een *use case* doorgronden

**Let's go!**

## Use Case
*Ik wil favoriete t-shirts-met-nerdy-teksten kunnen opslaan, en een volgende keer dat ik de site bezoek kunnen gebruiken - Web storage*

[Demo](https://sennykalidien.github.io/browser-technologies/)

![Website](https://raw.githubusercontent.com/sennykalidien/EW/master/browser-technologies/week-3/eindopdracht/readme/site.png)

### De 3 lagen
De website is opgebouwd in de 3 lagen volgens de principes van *progressive enhancement*:

1. HTMl
2. CSS
3. JavaScript.

In deze volgorde is er gewerkt om de website neer te zetten voor deze use case. Het is van belang dat de website (grotendeels) functioneel is als JavaScript uitgeschakeld wordt en ook als CSS uitgeschakeld wordt.

#### HTML
- De HTML is opgebouwd in HTML5 elementen. De website bestaat uit 1 pagina: De homepagina. Elk t-shirt zit in een <article> element omringt in een <section> container. De favorietenlijst is een <aside> met een <article> als elk favoriet t-shirt. Voor screenreaders is het een absolute must om HTML5 elementen te gebruiken. Er is overigens geen gebruik gemaakt van ARIA, omdat dit onnodig is gebleken voor de doeleinde van deze site.

#### CSS
- De CSS houdt rekening met de ondersteuning van zoveel mogelijk browsers. Er wordt niet gebruik gemaakt van de moderne technieken zoals FlexBox. Oudere versies van Internet Explorer ondersteunen dat niet. Daarnaast wordt er fallback gebruikt voor CSS die mogelijk niet ondersteund worden door oudere browsers. Een voorbeeld is voor EM's, door dit eerder te definieren als pixels:


```
/*--------------------------------------------------------------
# TYPOGRAPHY, ICONS & COLORS
--------------------------------------------------------------*/
body, button, input, select, textarea   {
    font-size: 16px; font: 1em/1.4 'Raleway', 'Helvetica neue', sans-serif;
}
```

- De CSS-classes zijn opgebouwd volgens de BEM-methode. Dit houdt in dat elk HTML-element een unieke CSS-class heeft. Voor *Progressive Enhancement* zal dit geen meerwaarde zijn. Voor overzicht en performance kan dit een (klein) verschil maken.

#### JavaScript
De JavaScript zorgt ervoor dat de shirts die toegevoegd worden als 'favoriet' worden opgeslagen in de WebStorage. WebStorage zal de *feature* zijn van deze eindopdracht.


### De feature
Webstorage kan LocalStorage of cookies zijn. Bij het toevoegen van een shirt aan de favorieten wordt de unieke ID van dat shirt opgeslagen in een 'array' (lijst) in de LocalStorage. Mocht LocalStorage niet beschikbaar zijn wordt er een Browser Cookie aangemaakt die hetzelfde functioneert als de LocalStorage. Cookies worden beter ondersteund door oudere browsers (Internet Explorer 7 of lager).

**Browser Support**
![Browser Support](https://raw.githubusercontent.com/sennykalidien/EW/master/browser-technologies/week-3/eindopdracht/readme/browser-support.png)

**Een array in Local Storage**
![Array in a Local Storage](https://raw.githubusercontent.com/sennykalidien/EW/master/browser-technologies/week-3/eindopdracht/readme/localstorage-array.png)

#### De fallback
Als Local Storage niet wordt ondersteund, valt het terug op cookies. Hiervoor heb ik gebruik gemaakt van dit voorbeeld (wat geen polyfill is maar een feature detection):
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

Door middel van een try kan er uitgeprobeerd worden of iets succesvol uitgevoerd kan worden. Zo niet, dan kan er iets uitgevoerd worden. In dit geval wordt er gekeken of het lukt om een Key + Value toe te voegen aan de LocalStorage. Als dit lukt moet de variabel lsSupport op true staan, zo niet dan moet het op false komen te staan.

Met de variabel lsSupport kunnen we dus vaststellen of er een Local Storage item aangemaakt moet worden of een Cookie!

```
if (lsSupport) { // Use LocalStorage
    localStorage.setItem(key, value);
} else { // Use cookie
    createCookie(key, '', -1);
}

```


## Testen

### Test 1: Screen Reader
**Pluspunten**
- De screenreader leest alle links en buttons goed voor aan de gebruiker.
- De volgorde die de screenreader volgt klopt, dus de paginastructuur lijkt in orde.

**Minpunten:**
- Elk t-shirt containerblok noemt de screen reader een 'article', dit kan verwarrend zijn voor een gebruiker.
- De afbeeldingen van de t-shirts bevatten geen goede alt text.

**Alt text op afbeeldingen**
Het probleem dat ik tegenkwam is de afbeeldingen van de t-shirts die een andere tekst als ALT moeten hebben dan de titel. Voor een visueel beperkte persoon heeft het geen nut om de titel 2xx voorgelezen te krijgen. Bovendien is de titel van een t-shirt niet altijd de tekst wat op een t-sirt staat, meer de benaming van de t-shirt. Als oplossing heb zelf een description toegevoegd per t-shirt dat beschrijft wat er op de t-shirts staan.

### Test 2: CSS uit
Als CSS uitstaat, ziet de HTML-structuur er nog goed uit.

![CSS off](https://raw.githubusercontent.com/sennykalidien/EW/master/browser-technologies/week-3/eindopdracht/readme/browser-support.png)

### Test 3: JavaScript uit
Als JavaScript uit staat kan de gebruiker alsnog de content (de t-shirts) zien. Voor het toevoegen van een shirt als favoriet is echter wel JavaScript vereist. Zonder JavaScript kan er geen gebruik gemaakt worden van LocalStorage of Cookies.

**Toch een soort van fallback**
Met de CSS *:target* selector is er gezorgd dat er 1 shirt toegevoegd kan worden als favoriet.


### Test 4: Local Storage Fallback
De fallback is getest in Safari private modus. In deze modus ondersteunt Safari geen Local Storage. Perfect dus om te testen en IE 7 en minder (enigzins) na te bootsen!

**Voor herladen pagina**
![Cookie before refresh](https://raw.githubusercontent.com/sennykalidien/EW/master/browser-technologies/week-3/eindopdracht/readme/cookie_before-refresh.png)

**Na herladen pagina**
![Cookie after refresh](https://raw.githubusercontent.com/sennykalidien/EW/master/browser-technologies/week-3/eindopdracht/readme/cookie_after-refresh.png)

De cookie wordt dus succesvol aangemaakt, en de IDs worden als array opgeslagen.

### Demo
[Demo](https://sennykalidien.github.io/browser-technologies/)
